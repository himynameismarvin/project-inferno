'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, isLoading } = useAuth()
  const router = useRouter()

  // Check if auth bypass is enabled for development
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'

  useEffect(() => {
    if (!bypassAuth && !isLoading && !session) {
      router.push('/login')
    }
  }, [session, isLoading, router, bypassAuth])

  if (!bypassAuth && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!bypassAuth && !session) {
    return null // Will redirect to login
  }

  return <>{children}</>
}