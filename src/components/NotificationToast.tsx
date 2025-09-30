'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Heart, ShoppingBag, X, AlertCircle } from 'lucide-react'

interface NotificationToastProps {
  type: 'cart' | 'favorites' | 'success' | 'error'
  message: string
  isVisible: boolean
  onClose: () => void
  productName?: string
  duration?: number
}

export default function NotificationToast({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  productName,
  duration = 3000 
}: NotificationToastProps) {
  const [progress, setProgress] = useState(100)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  const handleClose = () => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      onClose()
    }, 300) // Время анимации исчезновения
  }

  useEffect(() => {
    if (isVisible) {
      // Анимация прогресс-бара
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (duration / 50))
          return Math.max(0, newProgress)
        })
      }, 50)

      // Автоматическое закрытие
      const closeTimer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => {
        clearInterval(progressInterval)
        clearTimeout(closeTimer)
      }
    }
  }, [isVisible, duration, handleClose])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'cart':
        return <ShoppingBag className="w-5 h-5 text-white" />
      case 'favorites':
        return <Heart className="w-5 h-5 text-white fill-white" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-white" />
      default:
        return <CheckCircle className="w-5 h-5 text-white" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'cart':
        return {
          background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.85) 0%, rgba(234, 88, 12, 0.85) 100%)',
          iconBg: 'bg-orange-400/30',
          progressBg: 'bg-orange-300/40'
        }
      case 'favorites':
        return {
          background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.85) 0%, rgba(234, 88, 12, 0.85) 100%)',
          iconBg: 'bg-orange-400/30',
          progressBg: 'bg-orange-300/40'
        }
      case 'error':
        return {
          background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.85) 0%, rgba(234, 88, 12, 0.85) 100%)',
          iconBg: 'bg-orange-400/30',
          progressBg: 'bg-orange-300/40'
        }
      default:
        return {
          background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.85) 0%, rgba(234, 88, 12, 0.85) 100%)',
          iconBg: 'bg-orange-400/30',
          progressBg: 'bg-orange-300/40'
        }
    }
  }

  const styles = getStyles()

  return (
    <div 
      className={`
        relative
        text-white 
        p-3 md:p-4
        rounded-xl md:rounded-2xl 
        shadow-2xl
        flex items-center 
        gap-3 md:gap-4
        w-full md:max-w-sm 
        backdrop-blur-xl
        border border-white/20
        transition-all duration-500 ease-out
        transform-gpu
        ${isAnimatingOut 
          ? 'opacity-0 translate-x-full scale-95 animate-slide-out-right' 
          : isVisible 
            ? 'opacity-100 translate-x-0 scale-100 animate-slide-in-right' 
            : 'opacity-0 translate-x-full scale-95'
        }
      `}
      style={{
        background: styles.background,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
      }}
    >
      {/* Иконка */}
      <div className={`
        flex-shrink-0 
        w-10 h-10 md:w-12 md:h-12 
        rounded-full 
        ${styles.iconBg}
        flex items-center justify-center
        backdrop-blur-sm
        border border-white/30
        animate-bounce-in
      `}>
        {getIcon()}
      </div>
      
      {/* Контент */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm md:text-base leading-tight mb-1">
          {message}
        </p>
        {productName && (
          <p className="text-xs text-white/80 truncate">
            {productName}
          </p>
        )}
      </div>

      {/* Кнопка закрытия */}
      <button
        onClick={handleClose}
        className="
          flex-shrink-0
          w-7 h-7 md:w-8 md:h-8
          flex items-center justify-center
          hover:bg-white/20 
          rounded-full 
          transition-all duration-200
          hover:scale-110
          active:scale-95
          group
        "
      >
        <X className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-90 transition-transform duration-200" />
      </button>

      {/* Прогресс-бар */}
      <div className={`
        absolute bottom-0 left-0 right-0 
        h-1 
        ${styles.progressBg}
        rounded-b-xl md:rounded-b-2xl 
        overflow-hidden
      `}>
        <div 
          className="h-full bg-white/60 transition-all duration-75 ease-linear rounded-b-xl md:rounded-b-2xl"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute top-3 md:top-4 right-5 md:right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300" />
      
      {/* Дополнительный блик */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl md:rounded-t-2xl pointer-events-none" />
    </div>
  )
}
