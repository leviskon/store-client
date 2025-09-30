import AboutPage from '@/components/AboutPage'
import AppLayout from '@/components/AppLayout'

export default function About() {
  return (
    <AppLayout showHeader={false} showBottomNav={true}>
      <AboutPage />
    </AppLayout>
  )
}
