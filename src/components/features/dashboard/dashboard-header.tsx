'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  BookOpen,
  RefreshCw,
  Settings,
  MoreVertical,
  Users,
  Circle,
} from 'lucide-react'
import { useClassById } from '@/lib/hooks/useClasses'

interface DashboardHeaderProps {
  classId: string
}

export function DashboardHeader({ classId }: DashboardHeaderProps) {
  const { data: classData, isLoading } = useClassById(classId)

  if (isLoading || !classData) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Class Dashboard
              </CardTitle>
              <div className="h-4 bg-gray-200 rounded w-64 mt-2 animate-pulse"></div>
            </div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Class Dashboard
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
              <span>Grade {classData.grade}</span>
              <span>•</span>
              <span className="capitalize">{classData.subject === 'math' ? 'Math' : 'English'}</span>
              <span>•</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                {classData.class_code}
              </span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{classData.student_count} total students</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                <span>{classData.active_students} online now</span>
              </div>
              {classData.school_year && (
                <>
                  <span>•</span>
                  <span>SY {classData.school_year}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Refresh Data */}
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>

            {/* More Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Class Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  View Full Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Export Summary
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}