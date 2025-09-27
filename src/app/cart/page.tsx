'use client'

import { useState } from 'react'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import { useNotification } from '@/context/NotificationContext'
import { useOrders } from '@/context/OrdersContext'
import { addOrderToCookie } from '@/lib/cookies'
import ConfirmModal from '@/components/ConfirmModal'
import CheckoutModal, { OrderFormData } from '@/components/CheckoutModal'
import AppLayout from '@/components/AppLayout'
import SwipeableCartItem from '@/components/SwipeableCartItem'

export default function CartPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()
  const { showNotification } = useNotification()
  const { refreshOrders } = useOrders()
  const [removeItemId, setRemoveItemId] = useState<string | null>(null)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)

  const formatPrice = (price: number) => `${price.toFixed(0)} сом`

  const handleRemoveItem = (itemId: string) => {
    setRemoveItemId(itemId)
  }

  const confirmRemoveItem = () => {
    if (removeItemId) {
      // Находим товар по ID и удаляем с учетом размера и цвета
      const item = cartItems.find(item => item.id === removeItemId)
      if (item) {
        removeFromCart(removeItemId, item.selectedSize, item.selectedColor)
      }
      setRemoveItemId(null)
    }
  }

  const handleQuantityChange = (itemId: string, newQuantity: number, selectedSize?: string, selectedColor?: string) => {
    updateQuantity(itemId, newQuantity, selectedSize, selectedColor)
  }

  const subtotal = getTotalPrice()
  const deliveryFee = 25.00
  const discount = subtotal > 500 ? 35.00 : 0
  const total = subtotal + deliveryFee - discount

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true)
  }

  const handleOrderSubmit = async (orderData: OrderFormData) => {
    setIsProcessingOrder(true)
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderData,
          cartItems
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Сохраняем заказ в куки для отображения на фронте
        if (result.order) {
          addOrderToCookie(result.order)
        }
        
        // Обновляем счетчик заказов
        refreshOrders()
        
        // Очищаем корзину после успешного оформления
        clearCart()
        
        // Показываем уведомление об успехе
        showNotification('Заказ успешно оформлен! С вами свяжутся в ближайшее время.', 'success')
        
        // Закрываем модальное окно
        setIsCheckoutModalOpen(false)
        
        // Перенаправляем на страницу заказов
        router.push('/orders')
      } else {
        showNotification(result.error || 'Ошибка при оформлении заказа', 'error')
      }
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error)
      showNotification('Произошла ошибка. Попробуйте снова.', 'error')
    } finally {
      setIsProcessingOrder(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <AppLayout showHeader={false} showBottomNav={true}>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <h1 className="text-lg font-medium text-white">{t.myCart}</h1>
            
            <div className="w-10 h-10"></div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-16 h-16 md:w-20 md:h-20 text-orange-300" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
              {t.emptyCartTitle}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
              {t.emptyCartSubtitle}
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              {t.startShopping}
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout showHeader={false} showBottomNav={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-medium text-white">{t.myCart}</h1>
          
          <div className="w-10 h-10"></div>
        </div>

        {/* Mobile Cart Items */}
        <div className="md:hidden">
          <div className="px-4 py-4 space-y-4">
            {cartItems.map((item) => (
              <SwipeableCartItem
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
                onQuantityChange={(itemId, newQuantity) => handleQuantityChange(itemId, newQuantity, item.selectedSize, item.selectedColor)}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>

        {/* Desktop Cart Items */}
        <div className="hidden md:block max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Товары в корзине</h2>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-6 p-4 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        {item.imageUrl && Array.isArray(item.imageUrl) && item.imageUrl.length > 0 ? (
                          <img 
                            src={item.imageUrl[0]} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300"></div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <div className="text-sm text-gray-500 mb-3 space-y-1">
                          {item.selectedSize && (
                            <div className="flex items-center">
                              <span className="text-gray-400">{t.size}:</span>
                              <span className="ml-1 font-medium text-gray-600">{item.selectedSize}</span>
                            </div>
                          )}
                          {item.selectedColor && (
                            <div className="flex items-center">
                              <span className="text-gray-400">{t.color}:</span>
                              <span className="ml-1 font-medium text-gray-600">{item.selectedColor}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-lg font-bold text-gray-900">{formatPrice(Number(item.price))}</div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <div className="px-4 py-2 text-base font-medium text-gray-900 min-w-[3rem] text-center">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Сводка заказа</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>{t.subtotal}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t.deliveryFee}</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{t.discount}</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>{t.totalCost}</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  {t.proceedToCheckout}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Order Summary */}
        <div className="md:hidden bg-white border-t border-gray-100 p-4 sticky bottom-0">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t.subtotal}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t.deliveryFee}</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>{t.discount}</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>{t.totalCost}</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {t.proceedToCheckout}
          </button>
        </div>

        {/* Remove Confirmation Modal */}
        <ConfirmModal
          isOpen={removeItemId !== null}
          onClose={() => setRemoveItemId(null)}
          onConfirm={confirmRemoveItem}
          title={t.confirmRemoveFromCartTitle}
          message={t.confirmRemoveFromCartMessage}
          confirmText={t.yesRemove}
          cancelText={t.cancel}
          isDestructive={true}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          onSubmit={handleOrderSubmit}
          totalAmount={total}
          isLoading={isProcessingOrder}
        />
      </div>
    </AppLayout>
  )
}
