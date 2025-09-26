'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const { t } = useLanguage()

  const slides = [
    {
      id: 1,
      title: t.newCollection,
      subtitle: t.discount50,
      buttonText: t.shopNow,
      background: 'bg-gradient-to-r from-orange-300 to-orange-200'
    },
    {
      id: 2,
      title: t.summerSale,
      subtitle: t.upTo70Off,
      buttonText: t.explore,
      background: 'bg-gradient-to-r from-orange-400 to-orange-300'
    },
    {
      id: 3,
      title: t.newArrivals,
      subtitle: t.freshStyles,
      buttonText: t.discover,
      background: 'bg-gradient-to-r from-orange-500 to-orange-400'
    }
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
    // Возобновляем автопрокрутку через 5 секунд
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlay, nextSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX
    
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const touchEndX = endEvent.changedTouches[0].clientX
      const difference = touchStartX - touchEndX
      
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          // Swipe left - next slide
          setCurrentSlide((prev) => (prev + 1) % slides.length)
        } else {
          // Swipe right - previous slide
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        setIsAutoPlay(false)
        setTimeout(() => setIsAutoPlay(true), 5000)
      }
      
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchend', handleTouchEnd)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
      <div 
        className="relative rounded-2xl overflow-hidden h-[200px] md:h-[280px] lg:h-[320px] cursor-pointer shadow-lg"
        onTouchStart={handleTouchStart}
      >
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 relative">
              <div className={`absolute inset-0 ${slide.background}`}></div>
              
              <div className="relative z-10 p-6 md:p-8 lg:p-10 h-full flex flex-col justify-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 md:mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 md:mb-8 max-w-md whitespace-pre-line leading-relaxed">
                  {slide.subtitle}
                </p>
                <button className="bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-semibold w-fit hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-black' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
