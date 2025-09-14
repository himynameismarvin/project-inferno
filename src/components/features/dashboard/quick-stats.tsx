'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useClassById } from '@/lib/hooks/useClasses'
import {
  Users,
  UserCheck,
  ClipboardList,
  TrendingUp,
  Circle
} from 'lucide-react'

interface QuickStatsProps {
  classId: string
}

export function QuickStats({ classId }: QuickStatsProps) {
  const { data: classData, isLoading } = useClassById(classId)

  if (isLoading || !classData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Students',
      value: classData.student_count,
      icon: Users,
      description: 'Enrolled in this class',
      color: 'text-blue-600'
    },
    {
      title: 'Online Now',
      value: classData.active_students,
      icon: UserCheck,
      description: 'Currently active',
      color: 'text-green-600'
    },
    {
      title: 'Active Assignments',
      value: 3,
      icon: ClipboardList,
      description: 'Due this week',
      color: 'text-purple-600'
    },
    {
      title: 'Avg Progress',
      value: '76%',
      icon: TrendingUp,
      description: 'Class performance',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon className={`h-4 w-4 mr-2 ${stat.color}`} />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500">
                {stat.description}
              </p>
              {stat.title === 'Online Now' && (
                <div className="flex items-center mt-2">
                  <Circle className="h-2 w-2 fill-green-500 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">Live</span>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}