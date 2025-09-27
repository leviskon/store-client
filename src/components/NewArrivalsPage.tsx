'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Search, Filter, Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewArrivalsPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const newProducts = [
    {
      id: 1,
      name: t.language === 'kg' ? 'Жаңы стилдүү футболка' : 'Новая стильная футболка',
      nameKg: 'Жаңы стилдүү футболка',
      nameRu: 'Новая стильная футболка',
      price: 1500,
      originalPrice: 2000,
      discount: 25,
      image: '/api/placeholder/300/400',
      rating: 4.8,
      reviews: 24,
      isNew: true,
      category: t.language === 'kg' ? 'Эркектер' : 'Мужчины',
      colors: ['Кара', 'Ак', 'Кызыл'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: t.language === 'kg' ? 'Элеганттуу көйнөк' : 'Элегантное платье',
      nameKg: 'Элеганттуу көйнөк',
      nameRu: 'Элегантное платье',
      price: 3500,
      originalPrice: 4000,
      discount: 12,
      image: '/api/placeholder/300/400',
      rating: 4.9,
      reviews: 18,
      isNew: true,
      category: t.language === 'kg' ? 'Аялдар' : 'Женщины',
      colors: ['Кара', 'Көк', 'Жашыл'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: 3,
      name: t.language === 'kg' ? 'Спорттуу куртка' : 'Спортивная куртка',
      nameKg: 'Спорттуу куртка',
      nameRu: 'Спортивная куртка',
      price: 4500,
      originalPrice: 5000,
      discount: 10,
      image: '/api/placeholder/300/400',
      rating: 4.7,
      reviews: 32,
      isNew: true,
      category: t.language === 'kg' ? 'Спорт' : 'Спорт',
      colors: ['Кара', 'Ак', 'Кызыл'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: 4,
      name: t.language === 'kg' ? 'Классикалык шым' : 'Классические джинсы',
      nameKg: 'Классикалык шым',
      nameRu: 'Классические джинсы',
      price: 2800,
      originalPrice: 3200,
      discount: 12,
      image: '/api/placeholder/300/400',
      rating: 4.6,
      reviews: 45,
      isNew: true,
      category: t.language === 'kg' ? 'Эркектер' : 'Мужчины',
      colors: ['Көк', 'Кара', 'Ак'],
      sizes: ['28', '30', '32', '34', '36']
    },
    {
      id: 5,
      name: t.language === 'kg' ? 'Жайкы көйнөк' : 'Летнее платье',
      nameKg: 'Жайкы көйнөк',
      nameRu: 'Летнее платье',
      price: 2200,
      originalPrice: 2500,
      discount: 12,
      image: '/api/placeholder/300/400',
      rating: 4.8,
      reviews: 28,
      isNew: true,
      category: t.language === 'kg' ? 'Аялдар' : 'Женщины',
      colors: ['Ак', 'Кызыл', 'Сары'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: 6,
      name: t.language === 'kg' ? 'Балалардын кийими' : 'Детская одежда',
      nameKg: 'Балалардын кийими',
      nameRu: 'Детская одежда',
      price: 1200,
      originalPrice: 1500,
      discount: 20,
      image: '/api/placeholder/300/400',
      rating: 4.9,
      reviews: 15,
      isNew: true,
      category: t.language === 'kg' ? 'Балдар' : 'Дети',
      colors: ['Кызыл', 'Көк', 'Жашыл'],
      sizes: ['2-3', '4-5', '6-7', '8-9']
    }
  ]

  const filteredProducts = newProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.nameKg.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.nameRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
      default:
        return b.id - a.id
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
              {t.language === 'kg' ? 'Жаңы келгендер' : 'Новинки'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {t.language === 'kg' ? 'Жаңы коллекция!' : 'Новая коллекция!'}
          </h2>
          <p className="text-orange-100 text-lg mb-6">
            {t.language === 'kg' 
              ? 'Эң акыркы мода тенденциялары менен таанышыңыз. Жаңы товарлар ар дайым эң жакшы баада!'
              : 'Ознакомьтесь с последними модными тенденциями. Новые товары всегда по лучшим ценам!'
            }
          </p>
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {t.language === 'kg' ? 'Жаңы товарлар: 50+' : 'Новых товаров: 50+'}
              </span>
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {t.language === 'kg' ? 'Арзандатуулар: 20%' : 'Скидки: 20%'}
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.language === 'kg' ? 'Товарларды издөө...' : 'Поиск товаров...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="newest">
                  {t.language === 'kg' ? 'Жаңылар' : 'Новинки'}
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
              </select>
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {t.language === 'kg' ? 'Фильтр' : 'Фильтр'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {t.language === 'kg' ? 'ЖАҢЫ' : 'НОВИНКА'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    -{product.discount}%
                  </span>
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
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price} {t.language === 'kg' ? 'сом' : 'сом'}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice} {t.language === 'kg' ? 'сом' : 'сом'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-600">
                      {t.language === 'kg' ? 'Түстөр:' : 'Цвета:'}
                    </span>
                    <div className="flex space-x-1 mt-1">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color === 'Кара' ? '#000' : color === 'Ак' ? '#fff' : color === 'Кызыл' ? '#ef4444' : color === 'Көк' ? '#3b82f6' : color === 'Жашыл' ? '#10b981' : color === 'Сары' ? '#f59e0b' : '#6b7280' }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs text-gray-600">
                      {t.language === 'kg' ? 'Өлчөмдөр:' : 'Размеры:'}
                    </span>
                    <div className="flex space-x-1 mt-1">
                      {product.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                        >
                          {size}
                        </span>
                      ))}
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
