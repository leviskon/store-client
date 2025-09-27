'use client'

import { useState } from 'react'
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
    deliveryAddress: ''
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Оформление заказа</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-orange-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Итого к оплате:</span>
            <span className="text-xl font-bold text-orange-600">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ваше имя *
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-500 ${
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
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-500 ${
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
              rows={3}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none text-gray-900 bg-white placeholder-gray-500 ${
                errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите полный адрес доставки (город, улица, дом, квартира)"
              disabled={isLoading}
            />
            {errors.deliveryAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Оформление...' : 'Подтвердить заказ'}
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-4 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 text-center">
            После подтверждения заказа с вами свяжется наш менеджер для уточнения деталей доставки
          </p>
        </div>
      </div>
    </div>
  )
}
