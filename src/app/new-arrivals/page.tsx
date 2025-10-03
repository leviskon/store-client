import type { Metadata } from 'next'
import NewArrivalsPage from '@/components/NewArrivalsPage'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = {
  title: "Новинки - Store Client",
  description: "Последние поступления одежды в Store Client. Новые коллекции, актуальные тренды, свежие стили. Будьте в курсе модных новинок!",
  keywords: ["новинки", "новые поступления", "модные тренды", "новая коллекция", "актуальная мода", "свежие стили"],
  openGraph: {
    title: "Новинки - Store Client",
    description: "Последние поступления одежды в Store Client. Новые коллекции, актуальные тренды, свежие стили.",
    type: "website",
    url: "/new-arrivals",
  },
  alternates: {
    canonical: '/new-arrivals',
  },
}

export default function NewArrivals() {
  return (
    <AppLayout>
      <NewArrivalsPage />
    </AppLayout>
  )
}
