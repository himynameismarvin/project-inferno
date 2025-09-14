'use client'

export function DevBanner() {
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'

  if (!bypassAuth) return null

  return (
    <div className="bg-yellow-400 text-yellow-900 px-4 py-2 text-center text-sm font-medium">
      🛠️ DEVELOPMENT MODE: Authentication bypassed for testing
    </div>
  )
}