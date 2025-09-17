import { ProtectedRoute } from '@/components/auth/protected-route'
import { Sidebar } from '@/components/layout/sidebar'
import { MobileHeader } from '@/components/layout/mobile-header'
import { DevBanner } from '@/components/dev/dev-banner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <DevBanner />
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Sidebar (desktop only) */}
          <Sidebar />

          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}