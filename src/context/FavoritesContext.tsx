'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { setFavoritesCookie, getFavoritesCookie } from '@/lib/cookies'

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

  // Функция для проверки активности товаров
  const checkProductsStatus = async (items: FavoriteItem[]) => {
    try {
      const activeItems: FavoriteItem[] = []
      
      for (const item of items) {
        const response = await fetch(`/api/products/${item.id}`)
        if (response.ok) {
          const product = await response.json()
          // Если товар активен, добавляем его в список
          if (product && product.status === 'ACTIVE') {
            activeItems.push(item)
          }
        }
        // Если товар не найден или неактивен, просто не добавляем его
      }
      
      setFavorites(activeItems)
    } catch (_error) {
      // Ошибка проверки статуса товаров
      // В случае ошибки оставляем все товары
      setFavorites(items)
    }
  }

  // Загружаем избранные из куков при инициализации
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true)
        
        // Сначала пытаемся загрузить из куков
        const savedFavorites = getFavoritesCookie()
        if (savedFavorites && savedFavorites.length > 0) {
          // Валидируем загруженные данные
          const validFavorites = savedFavorites.filter(item => 
            item && item.id && item.category?.id && item.category?.name
          )
          
          // Сначала загружаем все товары сразу для быстрого отображения
          setFavorites(validFavorites)
          
          // Затем асинхронно проверяем активность товаров в фоне
          // Это не должно блокировать отображение
          setTimeout(() => {
            checkProductsStatus(validFavorites)
          }, 1000)
          
          setIsLoading(false)
          return
        }

        // Если в куках нет, проверяем localStorage для миграции
        if (typeof window !== 'undefined') {
          const localStorageFavorites = localStorage.getItem('favorites')
          if (localStorageFavorites) {
            try {
              const parsedFavorites = JSON.parse(localStorageFavorites)
              if (parsedFavorites && parsedFavorites.length > 0) {
                setFavorites(parsedFavorites)
                // Сохраняем в куки и удаляем из localStorage
                setFavoritesCookie(parsedFavorites)
                localStorage.removeItem('favorites')
              }
            } catch (_error) {
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

  // Сохраняем избранные в куки при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFavoritesCookie(favorites)
    }
  }, [favorites])

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

    // Затем асинхронно проверяем активность товара
    try {
      const response = await fetch(`/api/products/${product.id}`)
      if (!response.ok) {
        // Товар не найден или неактивен
        // Удаляем товар из избранного если он неактивен
        setFavorites(prev => prev.filter(item => item.id !== product.id))
        return
      }
      
      const productData = await response.json()
      if (!productData || productData.status !== 'ACTIVE') {
        // Товар неактивен
        // Удаляем товар из избранного если он неактивен
        setFavorites(prev => prev.filter(item => item.id !== product.id))
        return
      }
    } catch (_error) {
      // Ошибка проверки статуса товара
      // В случае ошибки сети оставляем товар в избранном
    }
  }

  const removeFromFavorites = (productId: string, _productName?: string) => {
    setFavorites(prev => prev.filter(item => item.id !== productId))
    
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
    try {
      if (isFavorite(product.id)) {
        removeFromFavorites(product.id)
      } else {
        await addToFavorites(product)
      }
    } catch (error) {
      // Ошибка переключения избранного
      throw error // Пробрасываем ошибку для обработки в компоненте
    }
  }

  const clearFavorites = () => {
    setFavorites([])
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
