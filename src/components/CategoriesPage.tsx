'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Search, Filter, ChevronRight, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Category {
  id: string
  name: string
  description?: string
  imageUrl?: string
  subCategories: Category[]
}

// Рекурсивный компонент для отображения подкатегорий
const SubCategoryList = ({ 
  subcategories, 
  level = 0, 
  expandedItems, 
  onToggle, 
  onNavigate 
}: {
  subcategories: Category[]
  level?: number
  expandedItems: Set<string>
  onToggle: (id: string) => void
  onNavigate: (id: string) => void
}) => {
  if (!subcategories || subcategories.length === 0) return null

  console.log(`SubCategoryList level ${level}:`, subcategories.map(cat => ({ name: cat.name, id: cat.id, hasSubs: cat.subCategories?.length || 0 })))

  return (
    <div className={`space-y-1 ${level > 0 ? 'ml-4' : ''}`}>
      {subcategories.map((subcategory) => (
        <div key={subcategory.id} className="space-y-1">
          {/* Подкатегория */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate(subcategory.id)}
              className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors ${
                level === 0 
                  ? 'bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 text-sm' 
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50 text-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>
                  {level > 0 && '• '}{subcategory.name}
                </span>
                {subcategory.subCategories && subcategory.subCategories.length > 0 && (
                  <span className="text-xs text-gray-400 ml-2">
                    ({subcategory.subCategories.length})
                  </span>
                )}
              </div>
            </button>
            
            {/* Кнопка для показа подподкатегорий */}
            {subcategory.subCategories && subcategory.subCategories.length > 0 && (
              <button
                onClick={() => onToggle(subcategory.id)}
                className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
              >
                {expandedItems.has(subcategory.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
            )}
          </div>
          
          {/* Рекурсивно отображаем подподкатегории */}
          {subcategory.subCategories && subcategory.subCategories.length > 0 && expandedItems.has(subcategory.id) && (
            <SubCategoryList
              subcategories={subcategory.subCategories}
              level={level + 1}
              expandedItems={expandedItems}
              onToggle={onToggle}
              onNavigate={onNavigate}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function CategoriesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set())

  // Загружаем категории из API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          console.log('Загруженные категории:', data)
          console.log('Количество корневых категорий:', data.length)
          
          // Проверяем глубину иерархии
          const checkDepth = (categories: Category[], level = 0) => {
            categories.forEach(cat => {
              console.log(`${'  '.repeat(level)}${cat.name} (ID: ${cat.id}) - подкатегорий: ${cat.subCategories?.length || 0}`)
              if (cat.subCategories && cat.subCategories.length > 0) {
                checkDepth(cat.subCategories, level + 1)
              }
            })
          }
          checkDepth(data)
          
          setCategories(data)
        } else {
          console.error('Ошибка загрузки категорий')
        }
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Функция для переключения отображения подподкатегорий
  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(subcategoryId)) {
        newSet.delete(subcategoryId)
      } else {
        newSet.add(subcategoryId)
      }
      return newSet
    })
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {t.language === 'kg' ? 'Артка' : 'Назад'}
                </span>
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                {t.categories}
              </h1>
              <div className="w-20"></div>
            </div>
          </div>
        </div>

        {/* Loading skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-6 bg-gray-200 rounded-full w-16"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">
                {t.language === 'kg' ? 'Артка' : 'Назад'}
              </span>
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {t.categories}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.language === 'kg' ? 'Категорияларды издөө...' : 'Поиск категорий...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {t.language === 'kg' ? 'Фильтр' : 'Фильтр'}
              </span>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={category.imageUrl || '/api/placeholder/300/200'}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                    {category.name}
                  </h3>
                  {category.subCategories && category.subCategories.length > 0 && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.subCategories.length} {t.language === 'kg' ? 'подкатегория' : 'подкатегорий'}
                    </span>
                  )}
                </div>
                
                {category.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-600">
                    {t.language === 'kg' ? 'Подкатегориялар:' : 'Подкатегории:'}
                  </h4>
                  <SubCategoryList
                    subcategories={category.subCategories}
                    expandedItems={expandedSubcategories}
                    onToggle={toggleSubcategory}
                    onNavigate={(id) => router.push(`/category/${id}`)}
                  />
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => router.push(`/category/${category.id}`)}
                    className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors"
                  >
                    {t.language === 'kg' ? 'Бардыгын көрүү →' : 'Смотреть все →'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.language === 'kg' ? 'Категориялар табылган жок' : 'Категории не найдены'}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.language === 'kg' 
                ? 'Издеген категорияңыз табылган жок. Башка сөздөрдү колдонуп көрүңүз.'
                : 'Искомая категория не найдена. Попробуйте использовать другие слова.'
              }
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {t.language === 'kg' ? 'Бардык категорияларды көрсөтүү' : 'Показать все категории'}
            </button>
          </div>
        )}

        {/* Popular Categories */}
        {categories.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t.language === 'kg' ? 'Популярдуу категориялар' : 'Популярные категории'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((category) => (
                <div
                  key={category.id}
                  className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => router.push(`/category/${category.id}`)}
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors">
                    <span className="text-2xl font-bold text-orange-500">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-orange-500 transition-colors">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
