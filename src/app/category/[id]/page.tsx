'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Package, Star, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useCart } from '@/context/CartContext'
import { useNotification } from '@/context/NotificationContext'
import AppLayout from '@/components/AppLayout'

interface Category {
  id: string
  name: string
  description?: string
  imageUrl?: string
  subCategories: Category[]
}

interface Product {
  id: string
  name: string
  price: number
  imageUrl?: string[] | null
  category: {
    id: string
    name: string
  }
  seller: {
    fullname: string
  }
  averageRating: number
  _count: {
    reviews: number
  }
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const { t: _t } = useLanguage()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  const { showNotification } = useNotification()
  
  const [category, setCategory] = useState<Category | null>(null)
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true)
        
        // Загружаем данные категории
        const categoryResponse = await fetch(`/api/categories/${params.id}`)
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json()
          setCategory(categoryData)
          setSubcategories(categoryData.subCategories || [])
        }

        // Загружаем товары из категории
        await fetchProducts(params.id as string)
        
      } catch (error) {
        console.error('Ошибка загрузки данных категории:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCategoryData()
    }
  }, [params.id])

  const fetchProducts = async (categoryId: string) => {
    try {
      setProductsLoading(true)
      const response = await fetch(`/api/products?categoryId=${categoryId}&includeSubcategories=true`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error)
    } finally {
      setProductsLoading(false)
    }
  }

  const handleSubcategoryClick = async (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId)
    await fetchProducts(subcategoryId)
  }

  const handleBackToCategory = async () => {
    if (category) {
      setSelectedSubcategory(null)
      await fetchProducts(category.id)
    }
  }

  const _handleAddToCart = async (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      seller: product.seller
    }

    const success = await addToCart(cartItem, 1)
    
    if (success) {
      showNotification({
        type: 'cart',
        message: 'Добавлено в корзину',
        duration: 2000
      })
    }
  }

  const handleToggleFavorite = async (product: Product) => {
    const favoriteItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      seller: product.seller,
      reviews: [],
      _count: product._count,
      averageRating: product.averageRating
    }
    
    const wasInFavorites = isFavorite(product.id)
    await toggleFavorite(favoriteItem)
    
    if (!wasInFavorites) {
      showNotification({
        type: 'favorites',
        message: 'Добавлено в избранное',
        duration: 2000
      })
    }
  }

  const formatPrice = (price: number) => `${price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} сом`

  const _renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <AppLayout showHeader={false} showBottomNav={true}>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <h1 className="text-lg font-medium text-white">{t.loadingText}</h1>
            
            <div className="w-10 h-10"></div>
          </div>

          {/* Loading skeleton */}
          <div className="px-4 py-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-xl aspect-square"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!category) {
    return (
      <AppLayout showHeader={false} showBottomNav={true}>
        <div className="min-h-screen bg-white">
          <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <h1 className="text-lg font-medium text-white">Категория</h1>
            
            <div className="w-10 h-10"></div>
          </div>
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Категория не найдена</h3>
            <p className="text-gray-500 text-center">Категория с таким ID не существует</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout showHeader={false} showBottomNav={true}>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-orange-500 z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-medium text-white">
            {selectedSubcategory 
              ? subcategories.find(sub => sub.id === selectedSubcategory)?.name || 'Подкатегория'
              : category.name
            }
          </h1>
          
          <div className="w-10 h-10"></div>
        </div>

        <div className="px-4 py-6">
          {/* Subcategories */}
          {subcategories.length > 0 && !selectedSubcategory && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Подкатегории
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    onClick={() => handleSubcategoryClick(subcategory.id)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden border border-gray-200 hover:border-orange-300 flex-shrink-0 w-24"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={subcategory.imageUrl || '/api/placeholder/300/300'}
                        alt={subcategory.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-2">
                      <h3 className="font-medium text-gray-900 text-xs group-hover:text-orange-500 transition-colors line-clamp-2 text-center">
                        {subcategory.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to category button */}
          {selectedSubcategory && (
            <div className="mb-6">
              <button
                onClick={handleBackToCategory}
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Назад к категории "{category.name}"</span>
              </button>
            </div>
          )}

          {/* Products */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Товары {selectedSubcategory ? 'в подкатегории' : 'в категории'}
              </h2>
              {products.length > 0 && (
                <span className="text-sm text-gray-500">
                  {products.length} товаров
                </span>
              )}
            </div>

            {productsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-xl mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {products.map((product) => {
                  const productImage = product.imageUrl && Array.isArray(product.imageUrl) && product.imageUrl.length > 0 
                    ? product.imageUrl[0] 
                    : null

                  return (
                    <div
                      key={product.id}
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                    >
                      {/* Product Image */}
                      <div className="relative p-4">
                        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-300"></div>
                          )}
                          
                          {/* Favorite button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggleFavorite(product)
                            }}
                            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
                          >
                            <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-black text-black' : 'text-gray-600'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="px-4 pb-4 space-y-2">
                        {/* Title and Rating in one line */}
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-black text-sm md:text-base leading-tight flex-1 truncate">
                            {product.name.length > 25 ? `${product.name.substring(0, 25)}...` : product.name}
                          </h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                            <span className="text-xs text-gray-600 font-medium">
                              {product.averageRating.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-black text-base">
                            {formatPrice(Number(product.price))}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Товары не найдены
                </h3>
                <p className="text-gray-500">
                  В {selectedSubcategory ? 'этой подкатегории' : 'этой категории'} пока нет товаров
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
