'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { validateOrdersCookie } from '@/lib/cookies'

interface Order {
  id: string
  customerName: string
  customerPhone: string
  deliveryAddress: string
  status: 'CREATED' | 'COURIER_WAIT' | 'COURIER_PICKED' | 'ENROUTE' | 'DELIVERED' | 'CANCELED'
  createdAt: string
  updatedAt: string
  customerComment?: string
  cancelComment?: string
  orderItems: any[]
}

interface OrdersContextType {
  orders: Order[]
  getTotalOrders: () => number
  refreshOrders: () => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Функция для загрузки полных данных заказов из API по ID
  const loadOrdersFromAPI = async (orderIds: string[]) => {
    if (orderIds.length === 0) {
      setOrders([])
      return
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: orderIds }),
      })

      if (response.ok) {
        const ordersData = await response.json()
        setOrders(ordersData)
      } else {
        console.error('Ошибка загрузки заказов из API', response.status)
        setOrders([])
      }
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error)
      setOrders([])
    }
  }

  const refreshOrders = async () => {
    try {
      // Получаем ID заказов из куков
      const orderIds = validateOrdersCookie()
      await loadOrdersFromAPI(orderIds)
    } catch (err) {
      console.error('Ошибка загрузки заказов:', err)
      setOrders([])
    }
  }

  // Загружаем заказы при инициализации
  useEffect(() => {
    // Загружаем ID из куков и получаем полные данные из API
    const orderIds = validateOrdersCookie()
    loadOrdersFromAPI(orderIds)
  }, [])

  const getTotalOrders = () => {
    return orders.length
  }

  return (
    <OrdersContext.Provider value={{
      orders,
      getTotalOrders,
      refreshOrders
    }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}
