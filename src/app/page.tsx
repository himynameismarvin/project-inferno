'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'

export default function HomePage() {
  const { data: session, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'

    if (!isLoading) {
      if (session || bypassAuth) {
        router.push('/classes')
      } else {
        router.push('/login')
      }
    }
  }, [session, isLoading, router])

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8">
            Prodigy Teacher Portal
          </h1>
          <div className="flex items-center justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </main>
    )
  }

  return null // Will redirect
}