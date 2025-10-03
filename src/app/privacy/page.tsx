import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Политика конфиденциальности - Store Client",
  description: "Политика конфиденциальности Store Client. Узнайте, как мы собираем, используем и защищаем ваши персональные данные. Ваши права и обязанности.",
  keywords: ["политика конфиденциальности", "защита данных", "персональные данные", "безопасность", "права пользователей"],
  openGraph: {
    title: "Политика конфиденциальности - Store Client",
    description: "Политика конфиденциальности Store Client. Узнайте, как мы собираем, используем и защищаем ваши персональные данные.",
    type: "website",
    url: "/privacy",
  },
  twitter: {
    card: "summary",
    title: "Политика конфиденциальности - Store Client",
    description: "Политика конфиденциальности Store Client. Узнайте, как мы собираем, используем и защищаем ваши персональные данные.",
  },
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: false, // Обычно страницы политики не индексируют для follow
  },
}

// Ленивая загрузка компонента
const PrivacyPage = dynamic(() => import('@/components/PrivacyPage'), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка...</p>
      </div>
    </div>
  ),
})

export default function Privacy() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <PrivacyPage />
    </Suspense>
  )
}
