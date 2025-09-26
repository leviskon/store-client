'use client'

import { useState } from 'react'
import Header from './Header'
import BottomNavigation from './BottomNavigation'
import FilterModal from './FilterModal'

interface AppLayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  showBottomNav?: boolean
}

export default function AppLayout({ 
  children, 
  showHeader = true, 
  showBottomNav = true 
}: AppLayoutProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterClick = () => {
    setIsFilterOpen(true)
  }

  const handleApplyFilters = () => {
    // Эта логика будет обрабатываться на главной странице
    setIsFilterOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {showHeader && <Header onFilterClick={handleFilterClick} />}
      
      <main className={showBottomNav ? 'pb-20 md:pb-0' : ''}>
        {children}
      </main>
      
      {showBottomNav && <BottomNavigation />}
      
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        categories={[]}
      />
    </div>
  )
}



