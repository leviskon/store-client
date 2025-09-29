'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Search, Filter, Star, ShoppingCart, Heart, Eye, Clock, Tag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DiscountsPage() {
  const { t } = useLanguage()
  
  const formatPrice = (price: number) => `${price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} сом`
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('discount-high')
  const [discountRange, setDiscountRange] = useState('all')

  const discountedProducts = [
    {
      id: 1,
      name: t.language === 'kg' ? 'Классикалык футболка' : 'Классическая футболка',
      nameKg: 'Классикалык футболка',
      nameRu: 'Классическая футболка',
      price: 1200,
      originalPrice: 2000,
      discount: 40,
      image: '/api/placeholder/300/400',
      rating: 4.7,
      reviews: 32,
      category: t.language === 'kg' ? 'Эркектер' : 'Мужчины',
      colors: ['Кара', 'Ак', 'Кызыл'],
      sizes: ['S', 'M', 'L', 'XL'],
      timeLeft: '2 күн 15 саат',
      isHot: true
    },
    {
      id: 2,
      name: t.language === 'kg' ? 'Элеганттуу көйнөк' : 'Элегантное платье',
      nameKg: 'Элеганттуу көйнөк',
      nameRu: 'Элегантное платье',
      price: 2800,
      originalPrice: 4000,
      discount: 30,
      image: '/api/placeholder/300/400',
      rating: 4.9,
      reviews: 28,
      category: t.language === 'kg' ? 'Аялдар' : 'Женщины',
      colors: ['Кара', 'Көк', 'Жашыл'],
      sizes: ['XS', 'S', 'M', 'L'],
      timeLeft: '5 күн 8 саат',
      isHot: false
    },
    {
      id: 3,
      name: t.language === 'kg' ? 'Спорттуу куртка' : 'Спортивная куртка',
      nameKg: 'Спорттуу куртка',
      nameRu: 'Спортивная куртка',
      price: 3600,
      originalPrice: 5000,
      discount: 28,
      image: '/api/placeholder/300/400',
      rating: 4.6,
      reviews: 45,
      category: t.language === 'kg' ? 'Спорт' : 'Спорт',
      colors: ['Кара', 'Ак', 'Кызыл'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      timeLeft: '1 күн 12 саат',
      isHot: true
    },
    {
      id: 4,
      name: t.language === 'kg' ? 'Джинс шым' : 'Джинсы',
      nameKg: 'Джинс шым',
      nameRu: 'Джинсы',
      price: 2200,
      originalPrice: 3200,
      discount: 31,
      image: '/api/placeholder/300/400',
      rating: 4.8,
      reviews: 67,
      category: t.language === 'kg' ? 'Эркектер' : 'Мужчины',
      colors: ['Көк', 'Кара', 'Ак'],
      sizes: ['28', '30', '32', '34', '36'],
      timeLeft: '3 күн 6 саат',
      isHot: false
    },
    {
      id: 5,
      name: t.language === 'kg' ? 'Жайкы көйнөк' : 'Летнее платье',
      nameKg: 'Жайкы көйнөк',
      nameRu: 'Летнее платье',
      price: 1800,
      originalPrice: 2500,
      discount: 28,
      image: '/api/placeholder/300/400',
      rating: 4.7,
      reviews: 41,
      category: t.language === 'kg' ? 'Аялдар' : 'Женщины',
      colors: ['Ак', 'Кызыл', 'Сары'],
      sizes: ['XS', 'S', 'M', 'L'],
      timeLeft: '4 күн 20 саат',
      isHot: false
    },
    {
      id: 6,
      name: t.language === 'kg' ? 'Балалардын кийими' : 'Детская одежда',
      nameKg: 'Балалардын кийими',
      nameRu: 'Детская одежда',
      price: 900,
      originalPrice: 1500,
      discount: 40,
      image: '/api/placeholder/300/400',
      rating: 4.9,
      reviews: 23,
      category: t.language === 'kg' ? 'Балдар' : 'Дети',
      colors: ['Кызыл', 'Көк', 'Жашыл'],
      sizes: ['2-3', '4-5', '6-7', '8-9'],
      timeLeft: '6 күн 14 саат',
      isHot: true
    },
    {
      id: 7,
      name: t.language === 'kg' ? 'Кроссовкалар' : 'Кроссовки',
      nameKg: 'Кроссовкалар',
      nameRu: 'Кроссовки',
      price: 3200,
      originalPrice: 4500,
      discount: 29,
      image: '/api/placeholder/300/400',
      rating: 4.8,
      reviews: 89,
      category: t.language === 'kg' ? 'Аяк кийимдери' : 'Обувь',
      colors: ['Ак', 'Кара', 'Кызыл'],
      sizes: ['38', '39', '40', '41', '42', '43'],
      timeLeft: '1 күн 3 саат',
      isHot: true
    },
    {
      id: 8,
      name: t.language === 'kg' ? 'Сумка' : 'Сумка',
      nameKg: 'Сумка',
      nameRu: 'Сумка',
      price: 1500,
      originalPrice: 2200,
      discount: 32,
      image: '/api/placeholder/300/400',
      rating: 4.5,
      reviews: 34,
      category: t.language === 'kg' ? 'Аксессуарлар' : 'Аксессуары',
      colors: ['Кара', 'Коричневый', 'Көк'],
      sizes: ['Орто'],
      timeLeft: '7 күн 10 саат',
      isHot: false
    }
  ]

  const filteredProducts = discountedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameKg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDiscount = discountRange === 'all' || 
      (discountRange === 'high' && product.discount >= 30) ||
      (discountRange === 'medium' && product.discount >= 20 && product.discount < 30) ||
      (discountRange === 'low' && product.discount < 20)
    
    return matchesSearch && matchesDiscount
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'discount-high':
        return b.discount - a.discount
      case 'discount-low':
        return a.discount - b.discount
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'time-left':
        return a.timeLeft.localeCompare(b.timeLeft)
      default:
        return b.discount - a.discount
    }
  })

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
              {t.language === 'kg' ? 'Арзандатуулар' : 'Скидки'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-4 sm:p-6 lg:p-8 text-white mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <Tag className="w-6 h-6 sm:w-8 sm:h-8" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              {t.language === 'kg' ? 'Улуу арзандатуулар!' : 'Большие скидки!'}
            </h2>
          </div>
          <p className="text-red-100 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
            {t.language === 'kg' 
              ? 'Эң жогору арзандатуулар менен сатып алыңыз. Убактылуу акциялар!'
              : 'Покупайте со скидками до 50%. Временные акции!'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="bg-white bg-opacity-20 px-3 sm:px-4 py-2 rounded-full">
              <span className="text-xs sm:text-sm font-medium">
                {t.language === 'kg' ? 'Арзандатуулар: 50+' : 'Скидки: 50+'}
              </span>
            </div>
            <div className="bg-white bg-opacity-20 px-3 sm:px-4 py-2 rounded-full">
              <span className="text-xs sm:text-sm font-medium">
                {t.language === 'kg' ? 'Эң жогору: 50%' : 'Максимум: 50%'}
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={t.language === 'kg' ? 'Товарларды издөө...' : 'Поиск товаров...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <select
                value={discountRange}
                onChange={(e) => setDiscountRange(e.target.value)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">
                  {t.language === 'kg' ? 'Бардык арзандатуулар' : 'Все скидки'}
                </option>
                <option value="high">
                  {t.language === 'kg' ? 'Жогору (30%+)' : 'Высокие (30%+)'}
                </option>
                <option value="medium">
                  {t.language === 'kg' ? 'Орто (20-30%)' : 'Средние (20-30%)'}
                </option>
                <option value="low">
                  {t.language === 'kg' ? 'Төмөн (20%-)' : 'Низкие (20%-)'}
                </option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="discount-high">
                  {t.language === 'kg' ? 'Арзандатуу: жогору' : 'Скидка: высокая'}
                </option>
                <option value="discount-low">
                  {t.language === 'kg' ? 'Арзандатуу: төмөн' : 'Скидка: низкая'}
                </option>
                <option value="price-low">
                  {t.language === 'kg' ? 'Баа: төмөн' : 'Цена: низкая'}
                </option>
                <option value="price-high">
                  {t.language === 'kg' ? 'Баа: жогору' : 'Цена: высокая'}
                </option>
                <option value="rating">
                  {t.language === 'kg' ? 'Рейтинг' : 'Рейтинг'}
                </option>
                <option value="time-left">
                  {t.language === 'kg' ? 'Убакыт' : 'Время'}
                </option>
              </select>
              <button className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {t.language === 'kg' ? 'Фильтр' : 'Фильтр'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col space-y-1 sm:space-y-2">
                  <span className="bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                    -{product.discount}%
                  </span>
                  {product.isHot && (
                    <span className="bg-orange-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                      {t.language === 'kg' ? 'Ысык' : 'ХИТ'}
                    </span>
                  )}
                </div>
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <div className="flex items-center space-x-1 bg-black bg-opacity-50 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">{product.timeLeft}</span>
                    <span className="sm:hidden">{product.timeLeft.split(' ')[0]}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                      <Eye className="w-4 h-4 inline mr-1" />
                      {t.language === 'kg' ? 'Көрүү' : 'Смотреть'}
                    </button>
                    <button className="flex-1 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                      <ShoppingCart className="w-4 h-4 inline mr-1" />
                      {t.language === 'kg' ? 'Сатып алуу' : 'Купить'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    {product.category}
                  </span>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-green-600 font-medium">
                      {t.language === 'kg' ? 'Экономия:' : 'Экономия:'}
                    </div>
                    <div className="text-sm text-green-600 font-bold">
                      {formatPrice(product.originalPrice - product.price)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <div>
                    <span className="text-xs text-gray-600">
                      {t.language === 'kg' ? 'Түстөр:' : 'Цвета:'}
                    </span>
                    <div className="flex space-x-1 mt-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color === 'Кара' ? '#000' : color === 'Ак' ? '#fff' : color === 'Кызыл' ? '#ef4444' : color === 'Көк' ? '#3b82f6' : color === 'Жашыл' ? '#10b981' : color === 'Сары' ? '#f59e0b' : color === 'Коричневый' ? '#8b4513' : '#6b7280' }}
                        ></div>
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs text-gray-600">
                      {t.language === 'kg' ? 'Өлчөмдөр:' : 'Размеры:'}
                    </span>
                    <div className="flex space-x-1 mt-1">
                      {product.sizes.slice(0, 3).map((size, index) => (
                        <span
                          key={index}
                          className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded"
                        >
                          {size}
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.sizes.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.language === 'kg' ? 'Товарлар табылган жок' : 'Товары не найдены'}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.language === 'kg' 
                ? 'Издеген товарыңыз табылган жок. Башка сөздөрдү колдонуп көрүңүз.'
                : 'Искомый товар не найден. Попробуйте использовать другие слова.'
              }
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {t.language === 'kg' ? 'Бардык товарларды көрсөтүү' : 'Показать все товары'}
            </button>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
            {t.language === 'kg' ? 'Көбүрөөк көрсөтүү' : 'Показать больше'}
          </button>
        </div>
      </div>
    </div>
  )
}
