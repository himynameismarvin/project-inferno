import { ProtectedRoute } from '@/components/auth/protected-route'
import { Sidebar } from '@/components/layout/sidebar'
import { TopBar } from '@/components/layout/top-bar'
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
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <TopBar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}