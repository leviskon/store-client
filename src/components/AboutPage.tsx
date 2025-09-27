'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft, Users, Award, Heart, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const { t } = useLanguage()
  const router = useRouter()

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
              {t.language === 'kg' ? 'Биз жөнүндө' : 'О нас'}
            </h1>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.language === 'kg' ? 'Store Client' : 'Store Client'}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t.language === 'kg' 
              ? 'Биздин дүкөндө эң сонун жана сапаттуу кийимдерди табасыз. Биз ар бир кардарыбызды баалайбыз жана аларга эң жакшы кызмат көрсөтүүгө аракет кылабыз.'
              : 'В нашем магазине вы найдете самую красивую и качественную одежду. Мы ценим каждого нашего клиента и стремимся предоставить им лучший сервис.'
            }
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              {t.language === 'kg' ? 'Кардарлардын саны' : 'Количество клиентов'}
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500">10,000+</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">
              {t.language === 'kg' ? 'Ырааттуу кардарлар' : 'Постоянных клиентов'}
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              {t.language === 'kg' ? 'Жылдардын тажрыйбасы' : 'Опыт работы'}
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500">5+</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">
              {t.language === 'kg' ? 'Жылдар' : 'Лет'}
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              {t.language === 'kg' ? 'Товарлардын саны' : 'Количество товаров'}
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500">500+</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">
              {t.language === 'kg' ? 'Ар кандай товарлар' : 'Различных товаров'}
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              {t.language === 'kg' ? 'Ырааты' : 'Надежность'}
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500">100%</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">
              {t.language === 'kg' ? 'Кардарлардын канааттануусу' : 'Удовлетворенность клиентов'}
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t.language === 'kg' ? 'Биздин тарых' : 'Наша история'}
          </h3>
          <div className="prose max-w-none">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
              {t.language === 'kg' 
                ? 'Store Client 2019-жылы негизделген жана алгачкы күндөрүнөн тартып биздин негизги максат - кардарларга сапаттуу жана стилдүү кийимдерди жеткирүү болгон. Биз ар бир кардарыбыздын муктаждыктарын түшүнүп, аларга эң жакшы кызмат көрсөтүүгө аракет кылабыз.'
                : 'Store Client был основан в 2019 году, и с первых дней нашей основной целью было предоставление качественной и стильной одежды нашим клиентам. Мы понимаем потребности каждого клиента и стремимся предоставить им лучший сервис.'
              }
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t.language === 'kg' 
                ? 'Бүгүнкү күндө биз Кыргызстандын алдыңкы онлайн дүкөнү болуп саналат жана ар бир күнү жаңы кардарларды тартууда улантабыз. Биздин команда профессионалдык кызматкерлерден турат, алар сизге эң жакшы кызмат көрсөтүү үчүн дайыма даяр.'
                : 'Сегодня мы являемся ведущим интернет-магазином Кыргызстана и продолжаем привлекать новых клиентов каждый день. Наша команда состоит из профессиональных сотрудников, которые всегда готовы предоставить вам лучший сервис.'
              }
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t.language === 'kg' ? 'Биздин баалуулуктар' : 'Наши ценности'}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-600">
                  {t.language === 'kg' 
                    ? 'Сапат - биздин негизги баалуулук. Биз ар бир товардын сапатына көңүл бурабыз.'
                    : 'Качество - наша основная ценность. Мы уделяем внимание качеству каждого товара.'
                  }
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-600">
                  {t.language === 'kg' 
                    ? 'Кардарлардын канааттануусу - биздин негизги максат.'
                    : 'Удовлетворенность клиентов - наша основная цель.'
                  }
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-600">
                  {t.language === 'kg' 
                    ? 'Инновация - биз дайыма жаңы технологияларды колдонобуз.'
                    : 'Инновации - мы всегда используем новые технологии.'
                  }
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-600">
                  {t.language === 'kg' 
                    ? 'Ырааттуулук - биздин кардарлар бизге ишенишет.'
                    : 'Надежность - наши клиенты доверяют нам.'
                  }
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t.language === 'kg' ? 'Биздин миссия' : 'Наша миссия'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
              {t.language === 'kg' 
                ? 'Биздин миссия - ар бир адамга өз стилин табууга жана өзүн жакшы сезүүгө жардам берүү. Биз сапаттуу, стилдүү жана арзан баадагы кийимдерди сунуштайбыз.'
                : 'Наша миссия - помочь каждому человеку найти свой стиль и чувствовать себя хорошо. Мы предлагаем качественную, стильную и доступную по цене одежду.'
              }
            </p>
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-base text-orange-800 font-medium">
                {t.language === 'kg' 
                  ? '"Биздин максат - сизди эң жакшы көрүнүшүңүздү табууга жардам берүү"'
                  : '"Наша цель - помочь вам найти свой лучший образ"'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-orange-500 rounded-lg p-4 sm:p-6 lg:p-8 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {t.language === 'kg' ? 'Биз менен байланышыңыз' : 'Свяжитесь с нами'}
          </h3>
          <p className="text-orange-100 mb-4 sm:mb-6 text-sm sm:text-base">
            {t.language === 'kg' 
              ? 'Сорууларыңыз барбы? Биз сизге жардам берүүгө дайымыз!'
              : 'Есть вопросы? Мы готовы помочь вам!'
            }
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="bg-white text-orange-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            {t.language === 'kg' ? 'Байланышуу' : 'Связаться'}
          </button>
        </div>
      </div>
    </div>
  )
}
