'use client'

import { Shirt } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface Category {
  id: string
  name: string
  imageUrl?: string | null
}

// Иконки для категорий по умолчанию
const getDefaultIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  
  if (name.includes('shirt') || name.includes('футболк')) {
    return Shirt
  } else if (name.includes('pant') || name.includes('брюк') || name.includes('джинс')) {
    const PantIcon = () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4l-2 14h4V8h4v12h4L16 6V2H8z" />
      </svg>
    )
    PantIcon.displayName = 'PantIcon'
    return PantIcon
  } else if (name.includes('dress') || name.includes('плать')) {
    const DressIcon = () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L8 6v12a2 2 0 002 2h4a2 2 0 002-2V6l-4-4z" />
      </svg>
    )
    DressIcon.displayName = 'DressIcon'
    return DressIcon
  } else if (name.includes('jacket') || name.includes('курт') || name.includes('пиджак')) {
    const JacketIcon = () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
    JacketIcon.displayName = 'JacketIcon'
    return JacketIcon
  }
  
  // Иконка по умолчанию
  const DefaultIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  )
  DefaultIcon.displayName = 'DefaultIcon'
  return DefaultIcon
}

interface CategoriesProps {
  onCategoryClick: (categoryId: string | null) => void
  selectedCategory: string | null
}

export default function Categories({ onCategoryClick, selectedCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-black">{t.categories}</h2>
          <button className="text-sm font-semibold text-gray-600">
            {t.seeAll}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-orange-100 rounded-2xl animate-pulse"></div>
              <div className="w-12 h-3 bg-orange-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-black">{t.categories}</h2>
        <button 
          onClick={() => onCategoryClick(null)}
          className={`text-sm font-semibold transition-colors ${
            selectedCategory === null ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
          }`}
        >
          {t.seeAll}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
        {/* Кнопка "Все товары" */}
        <div 
          className="flex flex-col items-center space-y-3 cursor-pointer group"
          onClick={() => onCategoryClick(null)}
        >
          <div className={`w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-2xl flex items-center justify-center transition-all duration-200 ${
            selectedCategory === null 
              ? 'bg-orange-500 text-white shadow-lg scale-105' 
              : 'bg-orange-50 hover:bg-orange-100 text-orange-600 group-hover:scale-105 group-hover:shadow-md'
          }`}>
            <svg className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${selectedCategory === null ? 'text-white' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className={`text-xs md:text-sm text-center leading-tight font-medium ${
            selectedCategory === null ? 'text-orange-500' : 'text-gray-600 group-hover:text-orange-500'
          }`}>
            {t.allProducts}
          </span>
        </div>

        {categories.map((category) => {
          const IconComponent = getDefaultIcon(category.name)
          const isSelected = selectedCategory === category.id
          
          return (
            <div 
              key={category.id} 
              className="flex flex-col items-center space-y-3 cursor-pointer group"
              onClick={() => onCategoryClick(category.id)}
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isSelected 
                  ? 'bg-orange-500 text-white shadow-lg scale-105' 
                  : 'bg-orange-50 hover:bg-orange-100 text-orange-600 group-hover:scale-105 group-hover:shadow-md'
              }`}>
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 object-contain"
                  />
                ) : (
                  <IconComponent className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${isSelected ? 'text-white' : 'text-orange-600'}`} />
                )}
              </div>
              <span className={`text-xs md:text-sm text-center leading-tight font-medium ${
                isSelected ? 'text-orange-500' : 'text-gray-600 group-hover:text-orange-500'
              }`}>
                {category.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
