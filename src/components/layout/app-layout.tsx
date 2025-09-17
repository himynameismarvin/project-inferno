'use client'

import { ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { MobileHeader } from './mobile-header'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Sidebar (desktop only) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        {children}
      </main>
    </div>
  )
}