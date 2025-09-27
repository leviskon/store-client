'use client'

import { useState, useRef, useEffect } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { CartItem } from '@/context/CartContext'

interface SwipeableCartItemProps {
  item: CartItem
  onQuantityChange: (itemId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void
  onRemove: (itemId: string) => void
}

export default function SwipeableCartItem({ item, onQuantityChange, onRemove }: SwipeableCartItemProps) {
  const { t } = useLanguage()
  const [isSwipeActive, setIsSwipeActive] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  const formatPrice = (price: number) => `${price.toFixed(0)} сом`

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentX = e.touches[0].clientX
    const diffX = startX - currentX

    // Ограничиваем свайп только влево и не более чем на 80px
    if (diffX > 0 && diffX <= 80) {
      setTranslateX(-diffX)
    } else if (diffX <= 0) {
      setTranslateX(0)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    
    // Если свайпнули больше чем на 40px, показываем кнопку удаления
    if (Math.abs(translateX) > 40) {
      setTranslateX(-80)
      setIsSwipeActive(true)
    } else {
      setTranslateX(0)
      setIsSwipeActive(false)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX)
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const currentX = e.clientX
    const diffX = startX - currentX

    if (diffX > 0 && diffX <= 80) {
      setTranslateX(-diffX)
    } else if (diffX <= 0) {
      setTranslateX(0)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    
    if (Math.abs(translateX) > 40) {
      setTranslateX(-80)
      setIsSwipeActive(true)
    } else {
      setTranslateX(0)
      setIsSwipeActive(false)
    }
  }

  const handleRemoveClick = () => {
    onRemove(item.id)
  }

  // Закрываем свайп при клике вне элемента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setTranslateX(0)
        setIsSwipeActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={itemRef} className="relative bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Delete Button (показывается при свайпе) */}
      <div className="absolute right-0 top-0 h-full w-20 bg-red-500 flex items-center justify-center">
        <button
          onClick={handleRemoveClick}
          className="w-full h-full flex items-center justify-center text-white"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div
        className="bg-white p-4 transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
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
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
            <div className="text-xs text-gray-500 mb-2 space-y-1">
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
            <div className="text-sm font-bold text-gray-900">{formatPrice(Number(item.price))}</div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
              className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-30"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <div className="px-4 py-2 text-sm font-medium text-gray-900 min-w-[3rem] text-center">
              {item.quantity}
            </div>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* Hint text when swiped */}
          {isSwipeActive && (
            <div className="text-xs text-gray-500">
              ← {t.removeFromCart}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
