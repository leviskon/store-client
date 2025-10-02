'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/AppLayout'

export default function Returns() {
  const { language } = useLanguage()
  const router = useRouter()

  return (
    <AppLayout showHeader={false} showBottomNav={true}>
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
                  {language === 'kg' ? 'Артка' : 'Назад'}
                </span>
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {language === 'kg' ? 'Кайтаруу' : 'Возврат'}
              </h1>
              <div className="w-16 sm:w-20"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'kg' ? 'Кайтаруу шарттары' : 'Условия возврата'}
            </h2>
            <p className="text-gray-600">
              {language === 'kg' 
                ? 'Товарды алуудан кийин 14 күн ичинде кайтарууга болот.'
                : 'Товар можно вернуть в течение 14 дней после получения.'
              }
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
