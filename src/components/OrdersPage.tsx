'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Package } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { validateOrdersCookie } from '@/lib/cookies'
import Link from 'next/link'

// Типы для заказов (обновленные для соответствия БД)
interface OrderItem {
  id: string
  amount: number
  price: number
  product: {
    id: string
    name: string
    imageUrl?: string[] | null
    category: {
      name: string
    }
  }
}

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
  orderItems: OrderItem[]
}


type OrderStatus = 'active' | 'completed' | 'cancelled'

export default function OrdersPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<OrderStatus>('active')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузка заказов из API по ID из cookies
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Получаем ID заказов из куков
        const orderIds = validateOrdersCookie()
        console.log('OrdersPage: Loaded order IDs from cookies:', orderIds.length)
        
        if (orderIds.length === 0) {
          setOrders([])
          setIsLoading(false)
          return
        }

        // Загружаем полные данные заказов из API
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: orderIds }),
        })

        if (response.ok) {
          const ordersData = await response.json()
          console.log('OrdersPage: Loaded orders from API:', ordersData.length)
          setOrders(ordersData)
        } else {
          console.error('Ошибка загрузки заказов из API', response.status)
          setError('Не удалось загрузить заказы')
          setOrders([])
        }
      } catch (err) {
        console.error('Ошибка загрузки заказов:', err)
        setError('Не удалось загрузить заказы')
        setOrders([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'CREATED':
        return 'Создан'
      case 'COURIER_WAIT':
        return 'Ожидает курьера'
      case 'COURIER_PICKED':
        return 'Забрал курьер'
      case 'ENROUTE':
        return 'В пути'
      case 'DELIVERED':
        return 'Доставлен'
      case 'CANCELED':
        return 'Отменен'
      default:
        return status
    }
  }

  const getFilteredOrders = (): Order[] => {
    console.log('OrdersPage: Filtering orders. Total orders:', orders.length, 'Active tab:', activeTab)
    
    let filtered: Order[] = []
    switch (activeTab) {
      case 'active':
        filtered = orders.filter(order => 
          ['CREATED', 'COURIER_WAIT', 'COURIER_PICKED', 'ENROUTE'].includes(order.status)
        )
        break
      case 'completed':
        filtered = orders.filter(order => order.status === 'DELIVERED')
        break
      case 'cancelled':
        filtered = orders.filter(order => order.status === 'CANCELED')
        break
      default:
        filtered = []
    }
    
    console.log('OrdersPage: Filtered orders count:', filtered.length)
    return filtered
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: number) => `${price.toFixed(0)} сом`
  
  const calculateOrderTotal = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + (Number(item.price) * item.amount), 0)
  }

  const filteredOrders = getFilteredOrders()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        
        <h1 className="text-lg font-medium text-white">{t.myOrders || 'Мои заказы'}</h1>
        
        <div className="w-10 h-10"></div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 md:px-6 lg:px-8 py-4 bg-white">
        <div className="flex justify-center w-full">
          <div className="flex w-full max-w-md justify-between">
            {[
              { key: 'active', label: t.active || 'Активные' },
              { key: 'completed', label: t.completed || 'Завершенные' },
              { key: 'cancelled', label: t.cancelled || 'Отмененные' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as OrderStatus)}
                className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors text-center ${
                  activeTab === tab.key
                    ? 'text-orange-500 border-orange-500'
                    : 'text-gray-400 border-transparent hover:text-orange-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 md:px-6 lg:px-8 pb-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-500">Загрузка заказов...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-16 h-16 md:w-20 md:h-20 text-orange-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
              Ошибка загрузки
            </h3>
            <p className="text-gray-600 text-center text-sm max-w-md leading-relaxed">
              {error}
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-16 h-16 md:w-20 md:h-20 text-orange-300" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
              {t.noOrdersTitle || 'Нет заказов'}
            </h2>
            <p className="text-gray-600 text-center text-sm max-w-md leading-relaxed">
              {t.noOrdersSubtitle || 'У вас пока нет заказов в этой категории'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const firstItem = order.orderItems[0]
              const totalAmount = calculateOrderTotal(order.orderItems)
              const productImage = firstItem?.product.imageUrl && Array.isArray(firstItem.product.imageUrl) && firstItem.product.imageUrl.length > 0 
                ? firstItem.product.imageUrl[0] 
                : null

              return (
                <div key={order.id} className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-orange-100 hover:border-orange-200 transition-colors">
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="flex items-start space-x-3">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                        {productImage ? (
                          <img 
                            src={productImage} 
                            alt={firstItem?.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-300">
                            <Package className="w-6 h-6 text-orange-600" />
                          </div>
                        )}
                      </div>

                      {/* Order Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header Row */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">
                              {firstItem?.product.name || 'Товар'}
                              {order.orderItems.length > 1 && (
                                <span className="text-gray-500 text-xs ml-1">
                                  +{order.orderItems.length - 1}
                                </span>
                              )}
                            </h3>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                order.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {getStatusText(order.status)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(order.createdAt).split(',')[0]}
                              </span>
                            </div>
                          </div>
                          
                          {/* Price and Button */}
                          <div className="flex flex-col items-end gap-1">
                            <p className="font-bold text-orange-600 text-sm whitespace-nowrap">
                              {formatPrice(totalAmount)}
                            </p>
                            <Link href={`/orders/${order.id}/track`}>
                              <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded-lg font-medium transition-colors">
                                Детали
                              </button>
                            </Link>
                          </div>
                        </div>
                        
                        {/* Contact Info */}
                        <div className="text-xs text-gray-400 space-y-0.5">
                          <p className="truncate">📞 {order.customerPhone}</p>
                          <p className="truncate">📍 {order.deliveryAddress.length > 35 ? order.deliveryAddress.substring(0, 35) + '...' : order.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                      {productImage ? (
                        <img 
                          src={productImage} 
                          alt={firstItem?.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-300">
                          <Package className="w-8 h-8 text-orange-600" />
                        </div>
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">
                            {firstItem?.product.name || 'Товар'}
                            {order.orderItems.length > 1 && (
                              <span className="text-gray-500 ml-1">
                                +{order.orderItems.length - 1} товар(ов)
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center mb-1">
                            <span className="text-xs text-gray-500">Статус:</span>
                            <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                              order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                              order.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">
                            Заказ от {formatDate(order.createdAt)}
                          </p>
                          <p className="font-bold text-orange-600 text-base">
                            {formatPrice(totalAmount)}
                          </p>
                        </div>

                        {/* Track Order Button */}
                        <Link href={`/orders/${order.id}/track`}>
                          <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-2 rounded-xl font-medium transition-colors">
                            {t.trackOrder || 'Подробнее'}
                          </button>
                        </Link>
                      </div>
                      
                      {/* Order Info */}
                      <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-100">
                        <p>📞 {order.customerPhone}</p>
                        <p>📍 {order.deliveryAddress.length > 50 ? order.deliveryAddress.substring(0, 50) + '...' : order.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
