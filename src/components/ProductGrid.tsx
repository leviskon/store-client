'use client'

import { Heart, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useFavorites } from '@/context/FavoritesContext'
import { useNotification } from '@/context/NotificationContext'

interface Product {
  id: string
  name: string
  price: number
  imageUrl?: string[] | null
  category: {
    name: string
  }
  seller: {
    fullname: string
  }
  reviews: {
    rating: number
  }[]
  _count: {
    reviews: number
  }
}

interface ProductWithLike extends Product {
  averageRating: number
}

interface ProductGridProps {
  selectedCategory: string | null
  includeSubcategories?: boolean
  searchQuery?: string
  filters?: {
    categories: string[]
    priceRange: { min: number; max: number }
    sortBy: string
    seller?: string
    rating?: number
  }
}

export default function ProductGrid({ selectedCategory, includeSubcategories, searchQuery, filters }: ProductGridProps) {
  const [products, setProducts] = useState<ProductWithLike[]>([])
  const [loading, setLoading] = useState(true)
  const { toggleFavorite, isFavorite } = useFavorites()
  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '/api/products'
        const params = new URLSearchParams()
        
        // ProductGrid fetchProducts вызван
        
        if (selectedCategory) {
          params.append('categoryId', selectedCategory)
          if (includeSubcategories === true) {
            params.append('includeSubcategories', 'true')
          }
        }
        
        if (filters?.categories && filters.categories.length > 0) {
          filters.categories.forEach(cat => params.append('categories', cat))
        }
        
        if (filters?.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < 10000)) {
          params.append('minPrice', filters.priceRange.min.toString())
          params.append('maxPrice', filters.priceRange.max.toString())
        }
        
        if (filters?.sortBy && filters.sortBy !== 'newest') {
          params.append('sortBy', filters.sortBy)
        }

        if (filters?.rating && filters.rating > 0) {
          params.append('minRating', filters.rating.toString())
        }

        if (filters?.seller && filters.seller.trim()) {
          params.append('seller', filters.seller.trim())
        }

        if (searchQuery && searchQuery.trim()) {
          params.append('search', searchQuery.trim())
        }
        
        if (params.toString()) {
          url += '?' + params.toString()
        }

        // Загружаем товары
        const response = await fetch(url)
        if (response.ok) {
          const data: Product[] = await response.json()
          const productsWithLikes = data.map(product => ({
            ...product,
            averageRating: product.reviews.length > 0 
              ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
              : 0
          }))
          setProducts(productsWithLikes)
        } else {
          // Ошибка загрузки товаров
        }
      } catch (_error) {
        // Ошибка загрузки товаров
      } finally {
        setLoading(false)
      }
    }

    setLoading(true)
    fetchProducts()
  }, [selectedCategory, includeSubcategories, searchQuery, filters])

  const handleToggleFavorite = async (product: ProductWithLike) => {
    try {
      // Валидируем структуру товара перед добавлением в избранное
      if (!product || !product.id || !product.category?.id || !product.category?.name) {
        // Неверные данные товара
        showNotification({
          type: 'error',
          message: 'Ошибка: недостаточно данных о товаре',
          duration: 2000
        })
        return
      }

      const favoriteItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        seller: product.seller,
        reviews: product.reviews,
        _count: product._count,
        averageRating: product.averageRating
      }
      
      const wasInFavorites = isFavorite(product.id)
      
      // Вызываем toggleFavorite без await для мгновенного отклика
      toggleFavorite(favoriteItem)
      
      // Показываем уведомление только при добавлении
      if (!wasInFavorites) {
        showNotification({
          type: 'favorites',
          message: 'Добавлено в избранное',
          duration: 2000
        })
      }
    } catch (_error) {
      // Ошибка переключения избранного
      showNotification({
        type: 'error',
        message: 'Ошибка при добавлении в избранное',
        duration: 2000
      })
    }
  }


  const formatPrice = (price: number) => `${price.toFixed(0)} сом`

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden border border-orange-100 shadow-sm">
            <div className="aspect-[3/4] bg-orange-100 animate-pulse"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-orange-100 rounded animate-pulse"></div>
              <div className="h-3 bg-orange-100 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-orange-100 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {products.filter(product => product && product.id && product.category?.id).map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:scale-105 group cursor-pointer">
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
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleToggleFavorite(product)
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
              >
                <Heart 
                  className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-black text-black' : 'text-gray-600'}`} 
                />
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
        </Link>
      ))}
    </div>
  )
}
