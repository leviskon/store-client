'use client'

import { useState } from 'react'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useCart, CartItem } from '@/context/CartContext'
import { useNotification } from '@/context/NotificationContext'
import { useOrders } from '@/context/OrdersContext'
import CheckoutModal from '@/components/CheckoutModal'
import ConfirmModal from '@/components/ConfirmModal'
import SwipeableCartItem from '@/components/SwipeableCartItem'
import AppLayout from '@/components/AppLayout'

export default function CartPageClient() {
  const { t } = useLanguage()
  const router = useRouter()
  const { cartItems: items, updateQuantity, removeFromCart: removeItem, getTotalPrice, clearCart } = useCart()
  const { showNotification } = useNotification()
  const { addOrder } = useOrders()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [confirmRemove, setConfirmRemove] = useState<{ isOpen: boolean; item: CartItem | null }>({
    isOpen: false,
    item: null
  })

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const item = items.find(item => item.id === id)
      if (item) {
        setConfirmRemove({ isOpen: true, item })
      }
    } else {
      const item = items.find(item => item.id === id)
      if (item) {
        updateQuantity(id, newQuantity, item.selectedSizeId, item.selectedColorId)
      }
    }
  }

  const handleRemoveItem = (itemId: string) => {
    const item = items.find(item => item.id === itemId)
    if (item) {
      setConfirmRemove({ isOpen: true, item })
    }
  }

  const confirmRemoveItem = () => {
    if (confirmRemove.item) {
      removeItem(confirmRemove.item.id, confirmRemove.item.selectedSizeId, confirmRemove.item.selectedColorId)
      showNotification({ message: t.removeFromCart, type: 'success' })
    }
    setConfirmRemove({ isOpen: false, item: null })
  }

  const handleCheckout = async (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    customerComment?: string;
  }) => {
    try {
      const order = {
        id: Date.now().toString(),
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        deliveryAddress: orderData.deliveryAddress,
        status: 'CREATED' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        orderItems: items.map(item => ({
          id: item.id,
          amount: item.quantity,
          price: item.price,
          product: {
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            category: {
              name: item.category.name
            }
          }
        }))
      }
      
      addOrder(order)
      clearCart()
      showNotification({ message: 'Заказ оформлен', type: 'success' })
      setIsCheckoutOpen(false)
      router.push('/orders')
    } catch {
      showNotification({ message: 'Ошибка при оформлении заказа', type: 'error' })
    }
  }


  const subtotal = getTotalPrice()
  const deliveryFee = subtotal > 2000 ? 0 : 200
  const discount = subtotal > 5000 ? subtotal * 0.1 : 0
  const total = subtotal + deliveryFee - discount

  if (items.length === 0) {
    return (
      <AppLayout showHeader={false} showBottomNav={true}>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="sticky top-0 bg-white z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-gray-200">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <h1 className="text-lg font-medium text-gray-900">{t.myCart}</h1>
            
            <div className="w-10 h-10"></div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t.emptyCartTitle}</h2>
            <p className="text-gray-600 text-center mb-8 max-w-sm">{t.emptyCartSubtitle}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
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
        <div className="sticky top-0 bg-white z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-gray-200">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-medium text-gray-900">{t.myCart}</h1>
          
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 font-medium text-sm">{items.length}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <SwipeableCartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Итого</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>{t.subtotal}</span>
                <span>{subtotal.toLocaleString()} сом</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>{t.deliveryFee}</span>
                <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                  {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee.toLocaleString()} сом`}
                </span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t.discount}</span>
                  <span>-{discount.toLocaleString()} сом</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>{t.totalCost}</span>
                  <span>{total.toLocaleString()} сом</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors"
          >
            {t.proceedToCheckout}
          </button>
        </div>

        {/* Bottom spacing for mobile navigation */}
        <div className="h-20"></div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckout}
        totalAmount={total}
      />

      {/* Confirm Remove Modal */}
      <ConfirmModal
        isOpen={confirmRemove.isOpen}
        onClose={() => setConfirmRemove({ isOpen: false, item: null })}
        onConfirm={confirmRemoveItem}
        title={t.confirmRemoveFromCartTitle}
        message={t.confirmRemoveFromCartMessage}
        confirmText={t.yesRemove}
      />

    </AppLayout>
  )
}
