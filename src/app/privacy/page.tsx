import PrivacyPage from '@/components/PrivacyPage'
import AppLayout from '@/components/AppLayout'

export default function Privacy() {
  return (
    <AppLayout showHeader={false} showBottomNav={true}>
      <PrivacyPage />
    </AppLayout>
  )
}
