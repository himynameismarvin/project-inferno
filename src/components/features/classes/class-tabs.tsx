'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Users,
  FileText,
  ClipboardList
} from 'lucide-react'

interface ClassTabsProps {
  classId: string
}

export function ClassTabs({ classId }: ClassTabsProps) {
  const pathname = usePathname()

  const tabs = [
    {
      name: 'Dashboard',
      href: `/class/${classId}/dashboard` as any,
      icon: BarChart3,
      current: pathname === `/class/${classId}/dashboard`
    },
    {
      name: 'Students',
      href: `/class/${classId}/students` as any,
      icon: Users,
      current: pathname === `/class/${classId}/students`
    },
    {
      name: 'Assignments',
      href: `/class/${classId}/assignments` as any,
      icon: ClipboardList,
      current: pathname === `/class/${classId}/assignments`
    },
    {
      name: 'Reports',
      href: `/class/${classId}/reports` as any,
      icon: FileText,
      current: pathname === `/class/${classId}/reports`
    }
  ]

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                tab.current
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <Icon
                className={cn(
                  'mr-2 h-5 w-5',
                  tab.current
                    ? 'text-blue-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}