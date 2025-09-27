'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { setCookie, getCookie } from '@/lib/cookies'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl?: string[] | null
  quantity: number
  selectedSize?: string
  selectedColor?: string
  category: {
    id: string
    name: string
  }
  seller: {
    fullname: string
  }
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => Promise<boolean>
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Функции для работы с куками корзины
export function setCartCookie(cartItems: CartItem[]) {
  const cartJson = JSON.stringify(cartItems)
  setCookie('cart', cartJson)
}

export function getCartCookie(): CartItem[] {
  try {
    const cartJson = getCookie('cart')
    if (cartJson) {
      return JSON.parse(cartJson)
    }
  } catch {
    // Игнорируем ошибки парсинга
  }
  return []
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Функция для валидации товаров в корзине
  const validateCartItems = (items: CartItem[]) => {
    // Просто валидируем структуру данных без проверки статуса
    const validItems = items.filter(item => 
      item && item.id && item.category?.id && item.category?.name && item.quantity > 0
    )
    
    setCartItems(validItems)
  }

  // Загружаем корзину из куков при инициализации
  useEffect(() => {
    const savedCart = getCartCookie()
    if (savedCart && savedCart.length > 0) {
      // Валидируем загруженные данные
      validateCartItems(savedCart)
    }
  }, [])

  // Сохраняем корзину в куки при изменении
  useEffect(() => {
    if (cartItems.length >= 0) {
      setCartCookie(cartItems)
    }
  }, [cartItems])

  const addToCart = async (product: Omit<CartItem, 'quantity'>, quantity: number = 1): Promise<boolean> => {
    // Валидируем структуру товара перед добавлением
    if (!product || !product.id || !product.category?.id || !product.category?.name) {
      return false
    }

    setCartItems(prev => {
      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
      )

      if (existingItemIndex >= 0) {
        // Если товар уже есть, увеличиваем количество
        const newItems = [...prev]
        newItems[existingItemIndex].quantity += quantity
        return newItems
      } else {
        // Если товара нет, добавляем новый
        return [...prev, { ...product, quantity }]
      }
    })
    
    return true
  }

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor)
    ))
  }

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    if (quantity <= 0) {
      // Если нужно удалить товар, ищем по ID, размеру и цвету
      setCartItems(prev => prev.filter(item => 
        !(item.id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor)
      ))
      return
    }

    setCartItems(prev => 
      prev.map(item => {
        // Обновляем только если совпадают ID, размер и цвет
        if (item.id === productId && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor) {
          return { ...item, quantity }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
