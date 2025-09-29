'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Star, ShoppingBag, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'
import ConfirmModal from '@/components/ConfirmModal'
import AppLayout from '@/components/AppLayout'
import Link from 'next/link'

export default function FavoritesPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { favorites, removeFromFavorites, isLoading } = useFavorites()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [productToRemove, setProductToRemove] = useState<string | null>(null)

  const formatPrice = (price: number) => `${price.toFixed(0)} сом`

  const handleRemoveClick = (productId: string) => {
    setProductToRemove(productId)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmRemove = () => {
    if (productToRemove) {
      removeFromFavorites(productToRemove)
      setProductToRemove(null)
    }
  }

  const handleCloseModal = () => {
    setIsConfirmModalOpen(false)
    setProductToRemove(null)
  }

  // Получаем уникальные категории из избранных товаров
  const categories = useMemo(() => {
    // Используем Set для хранения уникальных ID категорий
    const uniqueCategoryIds = new Set<string>()
    const uniqueCategories: { id: string; name: string }[] = []
    
    favorites.forEach(item => {
      // Проверяем, что у товара есть категория и все нужные поля
      if (item?.category?.id && item?.category?.name && !uniqueCategoryIds.has(item.category.id)) {
        uniqueCategoryIds.add(item.category.id)
        uniqueCategories.push({
          id: item.category.id,
          name: item.category.name
        })
      }
    })

    // Сортируем категории по имени для консистентности
    uniqueCategories.sort((a, b) => a.name.localeCompare(b.name))
    
    return [{ id: 'all', name: t.all }, ...uniqueCategories]
  }, [favorites, t.all])

  // Фильтруем товары по выбранной категории
  const filteredFavorites = useMemo(() => {
    if (selectedCategory === 'all') {
      return favorites
    }
    return favorites.filter(item => item?.category?.id === selectedCategory)
  }, [favorites, selectedCategory])

  // Показываем индикатор загрузки пока данные загружаются
  if (isLoading) {
    return (
      <AppLayout showHeader={false} showBottomNav={true}>
        {/* Header */}
        <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-medium text-white">{t.myWishlist}</h1>
          
          <div className="w-10 h-10"></div>
        </div>

        {/* Loading State */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-500">Загрузка избранных...</p>
        </div>
      </AppLayout>
    )
  }

  if (favorites.length === 0) {
    return (
      <AppLayout showHeader={false} showBottomNav={true}>
        {/* Header */}
        <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-medium text-white">{t.myWishlist}</h1>
          
          <div className="w-10 h-10"></div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-16 h-16 md:w-20 md:h-20 text-orange-300" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
            {t.noFavoritesTitle}
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
            {t.noFavoritesSubtitle}
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            {t.startShopping}
          </button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout showHeader={false} showBottomNav={true}>
      {/* Header */}
      <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <h1 className="text-lg font-medium text-white">{t.myWishlist}</h1>
        
        <div className="w-10 h-10 flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {favorites.length}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={`category-${category.id}`}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-300'
                }`}
                style={{
                  minWidth: 'fit-content'
                }}
              >
                <span className="relative z-10">
                  {category.name}
                  {category.id !== 'all' && (
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                      selectedCategory === category.id
                        ? 'bg-white/25 text-white'
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      {favorites.filter(item => item?.category?.id === category.id).length}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredFavorites.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/product/${product.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  {/* Product Image */}
                  <div className="relative p-4">
                    <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                      {product.imageUrl && Array.isArray(product.imageUrl) && product.imageUrl.length > 0 ? (
                        <img 
                          src={product.imageUrl[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-300"></div>
                      )}
                      
                      {/* Remove from favorites button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleRemoveClick(product.id)
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 group"
                      >
                        <X className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                      </button>

                      {/* Heart indicator */}
                      <div className="absolute top-3 left-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="px-4 pb-4 space-y-2">
                    {/* Title and Rating in one line */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-black text-sm md:text-base leading-tight flex-1 truncate">
                        {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                        <span className="text-xs text-gray-600 font-medium">
                          {product.averageRating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="font-bold text-black text-base">
                      {formatPrice(Number(product.price))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* No results for filtered category */}
        {filteredFavorites.length === 0 && selectedCategory !== 'all' && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t.language === 'kg' ? 'Бул категорияда товар жок' : 'Нет товаров в этой категории'}
            </h3>
            <p className="text-gray-600 text-center">
              {t.language === 'kg' 
                ? 'Башка категорияны тандап көрүңүз' 
                : 'Попробуйте выбрать другую категорию'
              }
            </p>
          </div>
        )}
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20 md:h-0"></div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRemove}
        title={t.confirmRemoveTitle}
        message={t.confirmRemoveMessage}
        confirmText={t.remove}
        cancelText={t.cancel}
        isDestructive={true}
      />
    </AppLayout>
  )
}
