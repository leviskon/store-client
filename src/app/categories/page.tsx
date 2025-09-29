import CategoriesPage from '@/components/CategoriesPage'
import AppLayout from '@/components/AppLayout'

export default function Categories() {
  return (
    <AppLayout showHeader={false} showBottomNav={true}>
      <CategoriesPage />
    </AppLayout>
  )
}
