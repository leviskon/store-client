import ReturnsPage from '@/components/ReturnsPage'
import AppLayout from '@/components/AppLayout'

export default function Returns() {
  return (
    <AppLayout showHeader={false} showBottomNav={true}>
      <ReturnsPage />
    </AppLayout>
  )
}
