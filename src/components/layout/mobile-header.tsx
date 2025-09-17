'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { useClassById } from '@/lib/hooks/useClasses'
import { MobileNav } from './mobile-nav'

export function MobileHeader() {
  const pathname = usePathname()
  const { currentClassId } = useAppStore()
  const { data: classData } = useClassById(currentClassId || undefined)

  const isInClassContext = currentClassId && pathname.includes('/class/')

  return (
    <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Left side - Mobile Nav trigger */}
      <div className="flex items-center">
        <MobileNav />
      </div>

      {/* Center - Current class name */}
      <div className="flex items-center flex-1 justify-center">
        {isInClassContext && classData ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 truncate max-w-[200px]">
              {classData.name}
            </p>
          </div>
        ) : (
          <Link href="/classes" className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Prodigy</h1>
          </Link>
        )}
      </div>

      {/* Right side - placeholder for future actions */}
      <div className="w-10"></div>
    </header>
  )
}