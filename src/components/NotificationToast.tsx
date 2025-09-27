'use client'

import { useEffect } from 'react'
import { CheckCircle, Heart, ShoppingBag, X, AlertCircle } from 'lucide-react'

interface NotificationToastProps {
  type: 'cart' | 'favorites' | 'success' | 'error'
  message: string
  isVisible: boolean
  onClose: () => void
  _productName?: string
  duration?: number
}

export default function NotificationToast({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  _productName: _,
  duration = 3000 
}: NotificationToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, duration])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'cart':
        return <ShoppingBag className="w-4 h-4 md:w-6 md:h-6 text-white" />
      case 'favorites':
        return <Heart className="w-4 h-4 md:w-6 md:h-6 text-white fill-white" />
      case 'error':
        return <AlertCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
      default:
        return <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'cart':
        return 'bg-orange-500'
      case 'favorites':
        return 'bg-orange-500'
      case 'error':
        return 'bg-red-600'
      default:
        return 'bg-orange-500'
    }
  }

  return (
    <div 
      className={`
        ${getBackgroundColor()} 
        text-white 
        px-4 py-3 
        rounded-lg 
        shadow-lg 
        flex items-center 
        gap-3 
        max-w-sm 
        backdrop-blur-sm
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-tight">
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
