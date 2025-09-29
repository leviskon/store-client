'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { validateFavoritesCookie, addFavoriteToCookie, removeFavoriteFromCookie, clearFavoritesCookie } from '@/lib/cookies'

interface FavoriteItem {
  id: string
  name: string
  price: number
  imageUrl?: string[] | null
  category: {
    id: string
    name: string
  }
  seller: {
    fullname: string
  }
  reviews: {
    rating: number
  }[]
  _count: {
    reviews: number
  }
  averageRating: number
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addToFavorites: (product: FavoriteItem) => Promise<void>
  removeFromFavorites: (productId: string, _productName?: string) => void
  isFavorite: (productId: string) => boolean
  toggleFavorite: (product: FavoriteItem) => Promise<void>
  clearFavorites: () => void
  isLoading: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Функция для загрузки полных данных товаров из БД по ID
  const loadFavoritesFromDatabase = async (favoriteIds: string[]) => {
    if (favoriteIds.length === 0) {
      setFavorites([])
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: favoriteIds }),
      })

      if (response.ok) {
        const products = await response.json()
        
        const fullFavorites: FavoriteItem[] = products.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          seller: product.seller,
          reviews: product.reviews,
          _count: product._count,
          averageRating: product.averageRating
        }))

        setFavorites(fullFavorites)
      } else {
        console.error('Ошибка загрузки товаров из БД', response.status)
        setFavorites([])
      }
    } catch (error) {
      console.error('Ошибка при загрузке товаров избранных:', error)
      setFavorites([])
    } finally {
      setIsLoading(false)
    }
  }

  // Загружаем избранные из куков при инициализации
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true)
        
        // Получаем ID избранных из куков
        const favoriteIds = validateFavoritesCookie()
        
        // Если в куках есть ID, загружаем полные данные из БД
        if (favoriteIds.length > 0) {
          await loadFavoritesFromDatabase(favoriteIds)
          return
        }

        // Если в куках нет, проверяем localStorage для миграции
        if (typeof window !== 'undefined') {
          const localStorageFavorites = localStorage.getItem('favorites')
          if (localStorageFavorites) {
            try {
              const parsedFavorites = JSON.parse(localStorageFavorites)
              if (parsedFavorites && parsedFavorites.length > 0) {
                // Мигрируем старые данные - извлекаем только ID
                const favoriteIds = parsedFavorites
                  .filter((item: any) => item && item.id)
                  .map((item: any) => item.id)
                
                if (favoriteIds.length > 0) {
                  // Сохраняем ID в новые куки
                  favoriteIds.forEach((id: string) => addFavoriteToCookie(id))
                  // Удаляем старые данные из localStorage
                  localStorage.removeItem('favorites')
                  // Загружаем полные данные
                  await loadFavoritesFromDatabase(favoriteIds)
                  return
                }
              }
            } catch {
              // Ошибка миграции избранного из localStorage
            }
          }
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Ошибка загрузки избранных:', error)
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [])

  const addToFavorites = async (product: FavoriteItem) => {
    // Валидируем структуру товара перед добавлением
    if (!product || !product.id || !product.category?.id || !product.category?.name) {
      // Неверная структура товара в избранном
      return
    }

    // Проверяем, не добавлен ли уже товар
    if (favorites.find(item => item.id === product.id)) {
      // Товар уже в избранном
      return
    }

    // Сначала добавляем товар в избранное для быстрого отклика UI
    setFavorites(prev => {
      // Двойная проверка на случай race condition
      if (prev.find(item => item.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })

    // Добавляем ID в куки
    addFavoriteToCookie(product.id)

    // Затем асинхронно проверяем активность товара
    try {
      const response = await fetch(`/api/products/${product.id}`)
      if (!response.ok) {
        // Товар не найден или неактивен
        // Удаляем товар из избранного если он неактивен
        setFavorites(prev => prev.filter(item => item.id !== product.id))
        removeFavoriteFromCookie(product.id)
        return
      }
      
      const productData = await response.json()
      if (!productData || productData.status !== 'ACTIVE') {
        // Товар неактивен
        // Удаляем товар из избранного если он неактивен
        setFavorites(prev => prev.filter(item => item.id !== product.id))
        removeFavoriteFromCookie(product.id)
        return
      }
    } catch {
      // Ошибка проверки статуса товара
      // В случае ошибки сети оставляем товар в избранном
    }
  }

  const removeFromFavorites = (productId: string, _productName?: string) => {
    setFavorites(prev => prev.filter(item => item.id !== productId))
    
    // Удаляем ID из куки
    removeFavoriteFromCookie(productId)
    
    // Показываем уведомление об удалении
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('showNotification', {
        detail: {
          type: 'favorites',
          message: 'Удалено из избранного',
          duration: 2000
        }
      })
      window.dispatchEvent(event)
    }
  }

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId)
  }

  const toggleFavorite = async (product: FavoriteItem) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      await addToFavorites(product)
    }
  }

  const clearFavorites = () => {
    setFavorites([])
    clearFavoritesCookie()
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
      isLoading
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
