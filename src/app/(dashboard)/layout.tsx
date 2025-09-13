import { ProtectedRoute } from '@/components/auth/protected-route'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar will go here later */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}