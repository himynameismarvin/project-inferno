'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
} from 'lucide-react'
import { useSignOut, useTeacher } from '@/lib/hooks/useAuth'
import { useAppStore } from '@/lib/store'
import { useClassById } from '@/lib/hooks/useClasses'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  description: string
}

const navigation: NavItem[] = [
  {
    name: 'All Classes',
    href: '/classes',
    icon: GraduationCap,
    description: 'View and manage all your classes',
  },
  {
    name: 'Dashboard',
    href: '/class/[id]/dashboard',
    icon: BookOpen,
    description: 'Class overview and quick actions',
  },
  {
    name: 'Students',
    href: '/class/[id]/students',
    icon: Users,
    description: 'Manage class roster and student accounts',
  },
  {
    name: 'Assignments',
    href: '/class/[id]/assignments',
    icon: FileText,
    description: 'Create and manage assignments',
  },
  {
    name: 'Reports',
    href: '/class/[id]/reports',
    icon: BarChart3,
    description: 'View student progress and analytics',
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: teacher } = useTeacher()
  const signOutMutation = useSignOut()
  const { currentClassId, sidebarOpen } = useAppStore()
  const { data: classData } = useClassById(currentClassId)

  const handleSignOut = async () => {
    try {
      await signOutMutation.mutateAsync()
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  const getNavHref = (href: string) => {
    if (href.includes('[id]') && currentClassId) {
      return href.replace('[id]', currentClassId)
    }
    return href
  }

  const isNavItemActive = (href: string) => {
    const navHref = getNavHref(href)
    if (href === '/classes') {
      return pathname === '/classes'
    }
    return pathname.startsWith(navHref.split('[id]')[0])
  }

  const isInClassContext = currentClassId && pathname.includes('/class/')

  return (
    <div className={cn(
      "flex flex-col h-full bg-white border-r border-gray-200",
      sidebarOpen ? "w-64" : "w-16"
    )}>
      {/* Logo */}
      <div className="flex items-center px-4 py-4 border-b border-gray-200">
        <Link href="/classes" className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">Prodigy</h1>
              <p className="text-xs text-gray-500">Teacher Portal</p>
            </div>
          )}
        </Link>
      </div>

      {/* Class Context Info */}
      {isInClassContext && sidebarOpen && classData && (
        <div className="px-4 py-3 border-b border-gray-200 bg-blue-50">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            Current Class
          </p>
          <p className="text-sm font-medium text-gray-900">{classData.name}</p>
          <p className="text-xs text-gray-500">
            Grade {classData.grade} • {classData.subject === 'math' ? 'Math' : 'English'} • {classData.class_code}
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const href = getNavHref(item.href)
          const isActive = isNavItemActive(item.href)
          const isDisabled = item.href.includes('[id]') && !currentClassId

          if (isDisabled) {
            return (
              <div
                key={item.name}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors text-gray-400 cursor-not-allowed"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-300" />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              href={href as any}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  isActive
                    ? "text-blue-500"
                    : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              {sidebarOpen && (
                <span className="truncate">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-2 space-y-1">
        <button
          className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full text-left"
          onClick={() => {}}
        >
          <HelpCircle className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          {sidebarOpen && <span>Help</span>}
        </button>

        <button
          className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full text-left"
          onClick={() => {}}
        >
          <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          {sidebarOpen && <span>Settings</span>}
        </button>

        {sidebarOpen && teacher && (
          <div className="px-2 py-2 border-t border-gray-200 mt-2">
            <p className="text-xs font-medium text-gray-500 truncate">
              {teacher.full_name || teacher.email}
            </p>
            {teacher.school && (
              <p className="text-xs text-gray-400 truncate">{teacher.school}</p>
            )}
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          disabled={signOutMutation.isPending}
          className={cn(
            "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            !sidebarOpen && "px-2"
          )}
        >
          <LogOut className="h-4 w-4 mr-3" />
          {sidebarOpen && (signOutMutation.isPending ? 'Signing out...' : 'Sign Out')}
        </Button>
      </div>
    </div>
  )
}