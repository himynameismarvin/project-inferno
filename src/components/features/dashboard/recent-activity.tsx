'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Trophy,
  Target,
  CheckCircle,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react'

interface RecentActivityProps {
  classId: string
}

export function RecentActivity({ classId }: RecentActivityProps) {
  // Mock activity data - replace with real data from useClassActivity hook
  const activities = [
    {
      id: 1,
      type: 'achievement',
      student: 'Emma S.',
      action: 'earned a trophy in Addition & Subtraction',
      time: '2 minutes ago',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 2,
      type: 'assignment',
      student: 'Jake M.',
      action: 'completed Weekly Math Challenge',
      score: '95%',
      time: '5 minutes ago',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      type: 'skill_mastery',
      student: 'Sophia L.',
      action: 'mastered Multiplication Tables',
      time: '8 minutes ago',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      type: 'progress',
      student: 'Michael R.',
      action: 'improved accuracy by 15% in Fractions',
      time: '12 minutes ago',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 5,
      type: 'login',
      student: 'Ava K.',
      action: 'started practicing Division',
      time: '15 minutes ago',
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      id: 6,
      type: 'assignment',
      student: 'Liam B.',
      action: 'submitted Geometry Basics quiz',
      score: '88%',
      time: '18 minutes ago',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${activity.bgColor}`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.student}</span>
                    {' '}
                    <span>{activity.action}</span>
                    {activity.score && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {activity.score}
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}