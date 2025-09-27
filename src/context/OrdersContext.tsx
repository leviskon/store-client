'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getOrdersCookie } from '@/lib/cookies'

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

  const refreshOrders = async () => {
    try {
      // Получаем заказы из куков (локальные заказы)
      const cookieOrders = getOrdersCookie()
      
      // Пытаемся получить заказы из API
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const apiOrders = await response.json()
          
          // Объединяем заказы из API и куков, убираем дубликаты
          const allOrders = [...apiOrders]
          
          // Добавляем заказы из куков, которых нет в API
          cookieOrders.forEach(cookieOrder => {
            if (!apiOrders.find((apiOrder: Order) => apiOrder.id === cookieOrder.id)) {
              allOrders.push(cookieOrder)
            }
          })
          
          setOrders(allOrders)
        } else {
          // Если API недоступно, используем только заказы из куков
          setOrders(cookieOrders as Order[])
        }
      } catch (apiError) {
        console.warn('API недоступно, используем заказы из куков:', apiError)
        setOrders(cookieOrders as Order[])
      }
    } catch (err) {
      console.error('Ошибка загрузки заказов:', err)
      // В случае ошибки все равно пытаемся показать заказы из куков
      const cookieOrders = getOrdersCookie()
      setOrders(cookieOrders as Order[])
    }
  }

  // Загружаем заказы при инициализации
  useEffect(() => {
    // Сначала загружаем из куков для мгновенного отображения счетчика
    const cookieOrders = getOrdersCookie()
    setOrders(cookieOrders as Order[])
    
    // Затем обновляем из API
    refreshOrders()
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
