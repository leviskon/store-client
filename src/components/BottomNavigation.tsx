'use client'

import { Home, ShoppingCart, Heart, Package } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useOrders } from '@/context/OrdersContext'

export default function BottomNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { favorites } = useFavorites()
  const { getTotalItems } = useCart()
  const { getTotalOrders } = useOrders()

  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: t.home,
      href: '/'
    },
    {
      id: 'cart',
      icon: ShoppingCart,
      label: t.cart,
      href: '/cart'
    },
    {
      id: 'orders',
      icon: Package,
      label: t.orders,
      href: '/orders'
    },
    {
      id: 'favorites',
      icon: Heart,
      label: t.favorites,
      href: '/favorites'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white md:hidden shadow-lg z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const active = isActive(item.href)
          
          if (item.id === 'cart') {
            return (
              <Link key={item.id} href={item.href} className="flex-1">
                <button
                  className={`w-full flex flex-col items-center justify-center p-2 min-w-0 transition-colors ${
                    active ? 'text-orange-500' : 'text-gray-400'
                  }`}
                >
                  <div className={`p-2 rounded-full ${active ? 'bg-orange-500/10' : ''}`}>
                    <div className="relative">
                      <IconComponent className="w-6 h-6" />
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          {getTotalItems() > 9 ? '9+' : getTotalItems()}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </Link>
            )
          }
          
          if (item.id === 'orders') {
            return (
              <Link key={item.id} href={item.href} className="flex-1">
                <button
                  className={`w-full flex flex-col items-center justify-center p-2 min-w-0 transition-colors ${
                    active ? 'text-orange-500' : 'text-gray-400'
                  }`}
                >
                  <div className={`p-2 rounded-full ${active ? 'bg-orange-500/10' : ''}`}>
                    <div className="relative">
                      <IconComponent className="w-6 h-6" />
                      {getTotalOrders() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          {getTotalOrders() > 9 ? '9+' : getTotalOrders()}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </Link>
            )
          }

          if (item.id === 'favorites') {
            return (
              <Link key={item.id} href={item.href} className="flex-1">
                <button
                  className={`w-full flex flex-col items-center justify-center p-2 min-w-0 transition-colors ${
                    active ? 'text-orange-500' : 'text-gray-400'
                  }`}
                >
                  <div className={`p-2 rounded-full ${active ? 'bg-orange-500/10' : ''}`}>
                    <div className="relative">
                      <IconComponent className="w-6 h-6" />
                      {favorites.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          {favorites.length > 9 ? '9+' : favorites.length}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </Link>
            )
          }
          
          return (
            <Link key={item.id} href={item.href} className="flex-1">
              <button
                className={`w-full flex flex-col items-center justify-center p-2 min-w-0 transition-colors ${
                  active ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                <div className={`p-2 rounded-full ${active ? 'bg-orange-500/10' : ''}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
