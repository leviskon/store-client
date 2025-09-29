'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (orderData: OrderFormData) => void
  totalAmount: number
  isLoading?: boolean
}

export interface OrderFormData {
  customerName: string
  customerPhone: string
  deliveryAddress: string
  customerComment?: string
}

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  totalAmount,
  isLoading = false 
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    customerComment: ''
  })
  const [errors, setErrors] = useState<Partial<OrderFormData>>({})

  const formatPrice = (price: number) => `${price.toFixed(0)} сом`

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderFormData> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Введите ваше имя'
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Введите номер телефона'
    } else if (!/^\+?996\s?\d{3}\s?\d{3}\s?\d{3}$/.test(formData.customerPhone.replace(/\s/g, ''))) {
      newErrors.customerPhone = 'Введите корректный номер телефона (+996 XXX XXX XXX)'
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Введите адрес доставки'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Очищаем ошибку при вводе
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePhoneChange = (value: string) => {
    // Автоматическое форматирование номера телефона
    let formatted = value.replace(/\D/g, '')
    
    if (formatted.startsWith('996')) {
      formatted = '+' + formatted
    } else if (formatted.startsWith('0')) {
      formatted = '+996' + formatted.slice(1)
    } else if (!formatted.startsWith('+996') && formatted.length > 0) {
      formatted = '+996' + formatted
    }

    // Добавляем пробелы для читаемости
    if (formatted.length > 4) {
      formatted = formatted.slice(0, 4) + ' ' + formatted.slice(4)
    }
    if (formatted.length > 8) {
      formatted = formatted.slice(0, 8) + ' ' + formatted.slice(8)
    }
    if (formatted.length > 12) {
      formatted = formatted.slice(0, 12) + ' ' + formatted.slice(12, 15)
    }

    handleInputChange('customerPhone', formatted)
  }

  // Блокируем скролл страницы
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm sm:max-w-md mx-2 sm:mx-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Оформление заказа</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-gray-700 font-medium">Итого к оплате:</span>
            <span className="text-lg sm:text-xl font-bold text-orange-600">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ваше имя *
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-500 text-sm sm:text-base ${
                errors.customerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите ваше имя"
              disabled={isLoading}
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
            )}
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефона *
            </label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-500 text-sm sm:text-base ${
                errors.customerPhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+996 XXX XXX XXX"
              disabled={isLoading}
            />
            {errors.customerPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
            )}
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Адрес доставки *
            </label>
            <textarea
              value={formData.deliveryAddress}
              onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
              rows={2}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none text-gray-900 bg-white placeholder-gray-500 text-sm sm:text-base ${
                errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите полный адрес доставки (город, улица, дом, квартира)"
              disabled={isLoading}
            />
            {errors.deliveryAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress}</p>
            )}
          </div>

          {/* Customer Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Комментарий к заказу
            </label>
            <textarea
              value={formData.customerComment || ''}
              onChange={(e) => handleInputChange('customerComment', e.target.value)}
              rows={2}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none text-gray-900 bg-white placeholder-gray-500 text-sm sm:text-base"
              placeholder="Дополнительная информация к заказу (необязательно)"
              disabled={isLoading}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
              disabled={isLoading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-orange-500 text-white rounded-lg sm:rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Оформление...' : 'Подтвердить'}
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
          <p className="text-xs text-gray-600 text-center">
            После подтверждения с вами свяжется менеджер для уточнения деталей доставки
          </p>
        </div>
      </div>
    </div>
  )
}
