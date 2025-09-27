'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Package, ClipboardList, Truck, CheckCircle, Clock, User } from 'lucide-react'
import { getOrdersCookie } from '@/lib/cookies'
import Link from 'next/link'

// Типы для отслеживания заказа
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

interface StatusStep {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  completed: boolean
  current: boolean
}


export default function TrackOrderPage() {
  const params = useParams()
  const orderId = params?.id as string
  
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузка данных заказа
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Сначала проверяем куки
        const cookieOrders = getOrdersCookie()
        const cookieOrder = cookieOrders.find(o => o.id === orderId)

        // Пытаемся получить из API
        try {
          const response = await fetch(`/api/orders/${orderId}`)
          if (response.ok) {
            const apiOrder = await response.json()
            setOrder(apiOrder)
          } else if (cookieOrder) {
            // Если API не работает, используем данные из куков
            setOrder(cookieOrder as Order)
          } else {
            setError('Заказ не найден')
          }
        } catch {
          console.warn('API недоступно, используем данные из куков')
          if (cookieOrder) {
            setOrder(cookieOrder as Order)
          } else {
            setError('Заказ не найден')
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки заказа:', err)
        setError('Ошибка загрузки заказа')
      } finally {
        setIsLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])


  const getStatusSteps = (currentStatus: Order['status']): StatusStep[] => {
    const allStatuses = ['CREATED', 'COURIER_WAIT', 'COURIER_PICKED', 'ENROUTE', 'DELIVERED'] as const
    const currentIndex = allStatuses.indexOf(currentStatus as typeof allStatuses[number])
    
    return [
      {
        key: 'CREATED',
        label: 'Заказ размещен',
        icon: ClipboardList,
        completed: currentIndex >= 0,
        current: currentStatus === 'CREATED'
      },
      {
        key: 'COURIER_WAIT',
        label: 'Ожидает курьера',
        icon: Clock,
        completed: currentIndex >= 1,
        current: currentStatus === 'COURIER_WAIT'
      },
      {
        key: 'COURIER_PICKED',
        label: 'Забрал курьер',
        icon: User,
        completed: currentIndex >= 2,
        current: currentStatus === 'COURIER_PICKED'
      },
      {
        key: 'ENROUTE',
        label: 'В пути',
        icon: Truck,
        completed: currentIndex >= 3,
        current: currentStatus === 'ENROUTE'
      },
      {
        key: 'DELIVERED',
        label: 'Доставлен',
        icon: CheckCircle,
        completed: currentStatus === 'DELIVERED',
        current: currentStatus === 'DELIVERED'
      }
    ]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: number) => `${price.toFixed(0)} сом`

  const calculateOrderTotal = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + (Number(item.price) * item.amount), 0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4 mx-auto"></div>
          <p className="text-gray-500">Загрузка заказа...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
          <div className="flex items-center justify-between">
            <Link href="/orders" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Заказ</h1>
            <div className="w-10" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Заказ не найден</h3>
          <p className="text-gray-500 text-center">{error || 'Заказ с таким ID не существует'}</p>
        </div>
      </div>
    )
  }

  const statusSteps = getStatusSteps(order.status)
  const totalAmount = calculateOrderTotal(order.orderItems)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          <Link href="/orders" className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Детали заказа</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Product Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Товары в заказе</h3>
          <div className="space-y-4">
            {order.orderItems.map((item) => {
              const productImage = item.product.imageUrl && Array.isArray(item.product.imageUrl) && item.product.imageUrl.length > 0 
                ? item.product.imageUrl[0] 
                : null

              return (
                <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {productImage ? (
                      <img 
                        src={productImage} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      Категория: {item.product.category.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Количество: {item.amount} шт
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(Number(item.price))}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Детали заказа
          </h3>
          
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Имя клиента</span>
              <span className="text-sm font-medium text-gray-900">{order.customerName}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Телефон</span>
              <span className="text-sm font-medium text-gray-900">{order.customerPhone}</span>
            </div>
            
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">Адрес доставки</span>
              <span className="text-sm font-medium text-gray-900 text-right max-w-xs">
                {order.deliveryAddress}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Дата создания</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(order.createdAt)}</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <span className="text-base font-semibold text-gray-900">Итого</span>
              <span className="text-lg font-bold text-orange-600">{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Статус доставки
          </h3>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {statusSteps.map((step) => {
                const IconComponent = step.icon
                
                return (
                  <div key={step.key} className="relative flex items-start">
                    {/* Status Circle */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-orange-500' 
                        : step.current
                        ? 'bg-orange-200'
                        : 'bg-gray-200'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        step.completed 
                          ? 'text-white' 
                          : step.current
                          ? 'text-orange-600'
                          : 'text-gray-400'
                      }`} />
                    </div>

                    {/* Status Content */}
                    <div className="ml-4 flex-1">
                      <h4 className={`text-sm font-medium ${
                        step.completed || step.current
                          ? 'text-gray-900' 
                          : 'text-gray-500'
                      }`}>
                        {step.label}
                      </h4>
                      {step.current && (
                        <p className="text-xs text-orange-600 font-medium">
                          Текущий статус
                        </p>
                      )}
                      {step.completed && !step.current && (
                        <p className="text-xs text-gray-500">
                          Выполнено
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Cancel Information */}
        {order.status === 'CANCELED' && order.cancelComment && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              Причина отмены
            </h4>
            <p className="text-sm text-red-700">
              {order.cancelComment}
            </p>
          </div>
        )}

        {/* Customer Comment */}
        {order.customerComment && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Комментарий к заказу
            </h4>
            <p className="text-sm text-blue-700">
              {order.customerComment}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
