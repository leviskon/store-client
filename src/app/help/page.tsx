import type { Metadata } from 'next'
import HelpPage from '@/components/HelpPage'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = {
  title: "Помощь и поддержка - Store Client",
  description: "Центр помощи Store Client. Часто задаваемые вопросы, инструкции по заказу, контактная информация. Получите помощь по любым вопросам.",
  keywords: ["помощь", "поддержка", "FAQ", "часто задаваемые вопросы", "контакты", "техническая поддержка"],
  openGraph: {
    title: "Помощь и поддержка - Store Client",
    description: "Центр помощи Store Client. Часто задаваемые вопросы, инструкции по заказу, контактная информация.",
    type: "website",
    url: "/help",
  },
  alternates: {
    canonical: '/help',
  },
}

export default function Help() {
  return (
    <AppLayout>
      <HelpPage />
    </AppLayout>
  )
}
