'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Star, Package } from 'lucide-react'

interface RelatedProduct {
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

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
  limit?: number
}

export default function RelatedProducts({ 
  categoryId, 
  currentProductId, 
  limit = 6 
}: RelatedProductsProps) {
  const router = useRouter()
  const [products, setProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/products?categoryId=${categoryId}&limit=${limit + 1}`)
        
        if (response.ok) {
          const data = await response.json()
          // Исключаем текущий товар из списка
          const filteredProducts = data.filter((product: RelatedProduct) => 
            product.id !== currentProductId
          ).slice(0, limit)
          
          setProducts(filteredProducts)
        } else {
          setError('Ошибка загрузки товаров')
        }
      } catch (err) {
        console.error('Ошибка загрузки связанных товаров:', err)
        setError('Ошибка загрузки товаров')
      } finally {
        setLoading(false)
      }
    }

    if (categoryId && currentProductId) {
      fetchRelatedProducts()
    }
  }, [categoryId, currentProductId, limit])

  const formatPrice = (price: number) => `${price.toFixed(0)} сом`

  const renderStars = (rating: number) => {
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

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  if (loading) {
    return (
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Другие товары из этой категории
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || products.length === 0) {
    return null // Не показываем секцию, если нет товаров или ошибка
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Другие товары из этой категории
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => {
          const productImage = product.imageUrl && Array.isArray(product.imageUrl) && product.imageUrl.length > 0 
            ? product.imageUrl[0] 
            : null

          return (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="group cursor-pointer bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 overflow-hidden">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-300">
                    <Package className="w-8 h-8 text-orange-400" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                {product.averageRating > 0 && (
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(product.averageRating)}
                    <span className="text-xs text-gray-500">
                      ({product._count.reviews})
                    </span>
                  </div>
                )}
                
                {/* Price */}
                <div className="text-lg font-bold text-orange-500">
                  {formatPrice(Number(product.price))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
