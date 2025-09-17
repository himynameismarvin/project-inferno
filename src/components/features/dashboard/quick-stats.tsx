'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useClassById } from '@/lib/hooks/useClasses'
import {
  Flame,
  HelpCircle,
  Activity,
  AlertTriangle,
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
      title: 'Class Streak',
      value: '5 days',
      icon: Flame,
      description: 'Consecutive activity',
      color: 'text-orange-600'
    },
    {
      title: 'Questions Answered',
      value: '1,247',
      icon: HelpCircle,
      description: 'This week total',
      color: 'text-blue-600'
    },
    {
      title: 'Engagement Rate',
      value: '78%',
      icon: Activity,
      description: 'Active this week',
      color: 'text-green-600'
    },
    {
      title: 'Need Help',
      value: '4 students',
      icon: AlertTriangle,
      description: 'Struggling this week',
      color: 'text-red-600'
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
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}