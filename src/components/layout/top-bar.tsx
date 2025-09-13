'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Menu, X, Calculator, BookOpen } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { usePathname } from 'next/navigation'

interface TopBarProps {
  title?: string
  classCode?: string
  showSubjectToggle?: boolean
  currentSubject?: 'math' | 'english'
  onSubjectChange?: (subject: 'math' | 'english') => void
}

export function TopBar({
  title,
  classCode,
  showSubjectToggle = false,
  currentSubject = 'math',
  onSubjectChange,
}: TopBarProps) {
  const { sidebarOpen, setSidebarOpen } = useAppStore()
  const pathname = usePathname()

  // Determine page title based on pathname if not provided
  const getPageTitle = () => {
    if (title) return title

    if (pathname === '/classes') return 'All Classes'
    if (pathname.includes('/dashboard')) return 'Class Dashboard'
    if (pathname.includes('/students')) return 'Students'
    if (pathname.includes('/assignments')) return 'Assignments'
    if (pathname.includes('/reports')) return 'Reports'

    return 'Dashboard'
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>

            {classCode && (
              <Badge variant="secondary" className="text-xs">
                {classCode}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {showSubjectToggle && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Subject:</span>
              <Select value={currentSubject} onValueChange={onSubjectChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">
                    <div className="flex items-center">
                      <Calculator className="w-4 h-4 mr-2" />
                      Math
                    </div>
                  </SelectItem>
                  <SelectItem value="english">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      English
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Additional actions can be added here */}
        </div>
      </div>
    </div>
  )
}