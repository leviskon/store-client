'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Star, ShoppingBag, Plus, Minus } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string[] | null
  category: {
    id: string
    name: string
  }
  seller: {
    id: string
    fullname: string
  }
  sizes: Array<{
    id: string
    name: string
  }>
  colors: Array<{
    id: string
    name: string
    colorCode?: string
  }>
  reviews: Array<{
    id: string
    clientName: string
    text: string
    rating: number
  }>
  averageRating: number
  _count: {
    reviews: number
  }
  attributes?: any
  createdAt: string
  updatedAt: string
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const { toggleFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
          // Устанавливаем первый размер и цвет по умолчанию
          if (data.sizes.length > 0) setSelectedSize(data.sizes[0].id)
          if (data.colors.length > 0) setSelectedColor(data.colors[0].id)
        } else {
          console.error('Товар не найден')
        }
      } catch (error) {
        console.error('Ошибка загрузки товара:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleToggleFavorite = () => {
    if (product) {
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
      toggleFavorite(favoriteItem)
    }
  }

  const formatPrice = (price: number) => `${price.toFixed(0)} сом`

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Loading skeleton for desktop and mobile */}
        <div className="animate-pulse">
          {/* Header */}
          <div className="sticky top-0 bg-white z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-gray-100">
            <div className="w-8 h-8 bg-orange-100 rounded-full"></div>
            <div className="w-32 h-6 bg-orange-100 rounded"></div>
            <div className="w-8 h-8 bg-orange-100 rounded-full"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image skeleton */}
              <div className="aspect-square bg-orange-100 rounded-2xl"></div>
              
              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="h-4 bg-orange-100 rounded w-1/3"></div>
                <div className="h-8 bg-orange-100 rounded"></div>
                <div className="h-6 bg-orange-100 rounded w-1/2"></div>
                <div className="h-20 bg-orange-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.productNotFound}</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {t.goBack}
          </button>
        </div>
      </div>
    )
  }

  const images = product.imageUrl && Array.isArray(product.imageUrl) ? product.imageUrl : []

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-50 px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <h1 className="text-lg font-medium text-gray-900">{t.productDetails}</h1>
        
        <button
          onClick={handleToggleFavorite}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Heart className={`w-5 h-5 ${product && isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images - Left Column */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                  <span className="text-orange-600 text-lg">{t.noImage}</span>
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-orange-500 ring-2 ring-orange-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Right Column */}
          <div className="space-y-6">
            {/* Category and Rating */}
            <div className="flex items-center justify-between">
              <span className="text-orange-500 text-sm font-medium">{product.category.name}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="text-gray-900 font-medium">{product.averageRating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">({product._count.reviews})</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-orange-500">
              {formatPrice(Number(product.price))}
            </div>

            {/* Product Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">{t.productDetails}</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'}
                {product.description && product.description.length > 100 && (
                  <button className="text-orange-500 font-medium ml-1 hover:text-orange-600">
                    {t.readMore}
                  </button>
                )}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{t.selectSize}</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`min-w-[3rem] h-12 px-4 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all ${
                        selectedSize === size.id
                          ? 'border-orange-500 bg-orange-500 text-white shadow-lg'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.selectColor}: <span className="text-gray-600 font-normal">
                    {product.colors.find(c => c.id === selectedColor)?.name || product.colors[0]?.name}
                  </span>
                </h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.id
                          ? 'border-orange-500 ring-2 ring-orange-200 scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{
                        backgroundColor: color.colorCode || '#8B4513'
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{t.selectColor}</h3>
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <span className="text-gray-500 text-sm">{t.noColorsAvailable}</span>
                </div>
              </div>
            )}

            {/* Product Attributes */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{t.specifications}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(product.attributes as Record<string, any>).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {typeof value === 'boolean' 
                          ? (value ? (t.language === 'kg' ? 'Ооба' : 'Да') : (t.language === 'kg' ? 'Жок' : 'Нет'))
                          : String(value)
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">{t.quantity}</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="px-4 py-3 text-base font-medium text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-500 text-sm">{t.totalPrice}</span>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(Number(product.price) * quantity)}
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                <ShoppingBag className="w-5 h-5" />
                <span>{t.addToCart}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Section - показывается только на мобильных */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 safe-area-inset-bottom">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-sm">{t.totalPrice}</span>
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(Number(product.price) * quantity)}
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold transition-colors">
            <ShoppingBag className="w-4 h-4" />
            <span>{t.addToCart}</span>
          </button>
        </div>
      </div>

      {/* Spacing for mobile bottom section */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}