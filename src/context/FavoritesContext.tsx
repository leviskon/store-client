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
  addToFavorites: (product: FavoriteItem) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
  toggleFavorite: (product: FavoriteItem) => void
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  // Загружаем избранные из куков при инициализации
  useEffect(() => {
    // Сначала пытаемся загрузить из куков
    const savedFavorites = getFavoritesCookie()
    if (savedFavorites && savedFavorites.length > 0) {
      setFavorites(savedFavorites)
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
        } catch (error) {
          console.error('Error migrating favorites from localStorage:', error)
        }
      }
    }
  }, [])

  // Сохраняем избранные в куки при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFavoritesCookie(favorites)
    }
  }, [favorites])

  const addToFavorites = (product: FavoriteItem) => {
    setFavorites(prev => {
      // Проверяем, не добавлен ли уже товар
      if (prev.find(item => item.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId)
  }

  const toggleFavorite = (product: FavoriteItem) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
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
      clearFavorites
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
