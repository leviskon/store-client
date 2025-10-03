import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Возвраты и обмен товаров - Store Client",
  description: "Политика возврата и обмена товаров в Store Client. Условия возврата, пошаговая инструкция, контактная информация. Возврат при доставке и проверка товара.",
  keywords: ["возврат товара", "обмен", "политика возврата", "возврат при доставке", "проверка товара", "гарантия"],
  openGraph: {
    title: "Возвраты и обмен товаров - Store Client",
    description: "Политика возврата и обмена товаров в Store Client. Условия возврата, пошаговая инструкция, контактная информация.",
    type: "website",
    url: "/returns",
  },
  twitter: {
    card: "summary",
    title: "Возвраты и обмен товаров - Store Client",
    description: "Политика возврата и обмена товаров в Store Client. Условия возврата, пошаговая инструкция, контактная информация.",
  },
  alternates: {
    canonical: '/returns',
  },
}

// Ленивая загрузка компонента
const ReturnsPage = dynamic(() => import('@/components/ReturnsPage'), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка...</p>
      </div>
    </div>
  ),
})

export default function Returns() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <ReturnsPage />
    </Suspense>
  )
}
