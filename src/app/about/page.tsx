import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "О нас - История и ценности Store Client",
  description: "Узнайте больше о Store Client - интернет-магазине качественной одежды. Наша история, ценности, миссия и достижения. Более 10 лет опыта в сфере моды.",
  keywords: ["о нас", "история компании", "Store Client", "интернет-магазин одежды", "ценности", "миссия", "качество"],
  openGraph: {
    title: "О нас - История и ценности Store Client",
    description: "Узнайте больше о Store Client - интернет-магазине качественной одежды. Наша история, ценности, миссия и достижения.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "О нас - История и ценности Store Client",
    description: "Узнайте больше о Store Client - интернет-магазине качественной одежды. Наша история, ценности, миссия и достижения.",
  },
  alternates: {
    canonical: '/about',
  },
}

// Ленивая загрузка компонента
const AboutPage = dynamic(() => import('@/components/AboutPage'), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка...</p>
      </div>
    </div>
  ),
})

export default function About() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <AboutPage />
    </Suspense>
  )
}
