'use client'

import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'

export default function Footer() {
  const { t } = useLanguage()
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }
  
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-400">Store Client</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.language === 'kg' 
                ? 'Биздин дүкөндө эң сонун жана сапаттуу кийимдерди табасыз. Биз ар бир кардарыбызды баалайбыз.'
                : 'В нашем магазине вы найдете самую красивую и качественную одежду. Мы ценим каждого нашего клиента.'
              }
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t.language === 'kg' ? 'Тез шилтемелер' : 'Быстрые ссылки'}
            </h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/about')}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm text-left"
                >
                  {t.language === 'kg' ? 'Биз жөнүндө' : 'О нас'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/discounts')}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm text-left"
                >
                  {t.language === 'kg' ? 'Арзандатуулар' : 'Скидки'}
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t.language === 'kg' ? 'Кардарларды тейлөө' : 'Служба поддержки'}
            </h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/returns')}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm text-left"
                >
                  {t.language === 'kg' ? 'Кайтаруу' : 'Возвраты'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/privacy')}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm text-left"
                >
                  {t.language === 'kg' ? 'Жеке маалыматтын коопсуздугу' : 'Конфиденциальность'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t.language === 'kg' ? 'Байланыш' : 'Контакты'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+996 555 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@storeclient.kg</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  {t.language === 'kg' 
                    ? 'Бишкек шаары, Чүй проспекти 123'
                    : 'г. Бишкек, пр. Чуй 123'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 Store Client. {t.language === 'kg' ? 'Бардык укуктар корголгон.' : 'Все права защищены.'}
          </div>
          <div className="flex space-x-6 text-sm">
            <button 
              onClick={() => handleNavigation('/terms')}
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              {t.language === 'kg' ? 'Колдонуу шарттары' : 'Условия использования'}
            </button>
            <button 
              onClick={() => handleNavigation('/privacy')}
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              {t.language === 'kg' ? 'Жеке маалыматтын коопсуздугу' : 'Конфиденциальность'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
