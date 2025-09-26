'use client'

import { Search, Filter, Home, ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  onFilterClick: () => void
}

export default function Header({ onFilterClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeNavItem, setActiveNavItem] = useState('home')
  const { t } = useLanguage()
  const { favorites } = useFavorites()

  const navItems = [
    { id: 'home', icon: Home, label: t.home },
    { id: 'cart', icon: ShoppingCart, label: t.cart },
    { id: 'favorites', icon: Heart, label: t.favorites }
  ]

  return (
    <div className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      {/* Desktop Navigation */}
      <div className="hidden md:block border-b border-orange-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <nav className="flex items-center justify-between py-3">
            <div className="flex items-center justify-center flex-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                const isActive = activeNavItem === item.id
                
                const NavButton = ({ children }: { children: React.ReactNode }) => (
                  <button
                    onClick={() => setActiveNavItem(item.id)}
                    className={`relative flex items-center space-x-2 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-orange-500 text-white shadow-sm' 
                        : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    {children}
                  </button>
                )
                
                if (item.id === 'favorites') {
                  return (
                    <Link key={item.id} href="/favorites">
                      <NavButton>
                        <div className="relative">
                          <IconComponent className="w-4 h-4" />
                          {favorites.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                              {favorites.length > 9 ? '9+' : favorites.length}
                            </span>
                          )}
                        </div>
                        <span>{item.label}</span>
                      </NavButton>
                    </Link>
                  )
                }
                
                return (
                  <NavButton key={item.id}>
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavButton>
                )
              })}
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t.searchProducts}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 text-sm border border-orange-200 rounded-xl bg-orange-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-200"
            />
          </div>
          
          {/* Language Switcher - только для мобильных */}
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
          
          {/* Filter Button */}
          <button
            onClick={onFilterClick}
            className="px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
