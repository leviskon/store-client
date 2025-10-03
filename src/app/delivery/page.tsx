import type { Metadata } from 'next'
import DeliveryPage from '@/components/DeliveryPage'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = {
  title: "Доставка и оплата - Store Client",
  description: "Информация о доставке и способах оплаты в Store Client. Быстрая доставка по Кыргызстану, удобные способы оплаты, условия доставки.",
  keywords: ["доставка", "оплата", "способы оплаты", "курьерская доставка", "самовывоз", "стоимость доставки"],
  openGraph: {
    title: "Доставка и оплата - Store Client",
    description: "Информация о доставке и способах оплаты в Store Client. Быстрая доставка по Кыргызстану, удобные способы оплаты.",
    type: "website",
    url: "/delivery",
  },
  alternates: {
    canonical: '/delivery',
  },
}

export default function Delivery() {
  return (
    <AppLayout>
      <DeliveryPage />
    </AppLayout>
  )
}
