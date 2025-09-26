'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Categories from '@/components/Categories'
import ProductGrid from '@/components/ProductGrid'
import BottomNavigation from '@/components/BottomNavigation'
import FilterModal from '@/components/FilterModal'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

interface FilterState {
  categories: string[]
  priceRange: { min: number; max: number }
  sortBy: string
  seller?: string
  rating?: number
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 10000 },
    sortBy: 'newest',
    seller: '',
    rating: 0
  })
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const { t } = useLanguage()

  useEffect(() => {
    // Загружаем категории для фильтра
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    // Сбрасываем фильтры при выборе категории
    if (categoryId !== null) {
      setFilters({
        categories: [],
        priceRange: { min: 0, max: 10000 },
        sortBy: 'newest',
        seller: '',
        rating: 0
      })
    }
  }

  const handleFilterClick = () => {
    setIsFilterOpen(true)
  }

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters)
    // Если в фильтрах выбраны категории, сбрасываем выбранную категорию
    if (newFilters.categories.length > 0) {
      setSelectedCategory(null)
    }
  }

  const getProductsTitle = () => {
    if (selectedCategory && categories.length > 0) {
      const category = categories.find(cat => cat.id === selectedCategory)
      return category ? `${category.name} ${t.categoryProducts}` : t.featuredProducts
    }
    if (filters.categories.length > 0) {
      return t.filteredProducts
    }
    return t.featuredProducts
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header onFilterClick={handleFilterClick} />
      
      {/* Hero Section - Carousel */}
      <HeroSection />
      
      {/* Categories from Database */}
      <Categories 
        onCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
      />
      
      {/* Products from Database */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-20 md:pb-12">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            {getProductsTitle()}
          </h2>
          <ProductGrid 
            selectedCategory={selectedCategory}
            filters={filters}
          />
        </div>
      </div>
      
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        categories={categories}
      />
      
      {/* Footer */}
      <Footer />
      
      {/* Bottom Navigation - только для мобильных */}
      <BottomNavigation />
    </div>
  )
}