'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Users,
  Activity,
  Clock,
  TrendingUp,
  MoreVertical,
  Calendar,
  Target,
} from 'lucide-react'

interface StudentActivityCardProps {
  classId: string
}

const activityData = [
  {
    period: 'Today',
    studentsActive: 18,
    totalStudents: 23,
    avgSessionTime: '45m',
    completionRate: 78,
    trend: 'up',
  },
  {
    period: 'This Week',
    studentsActive: 22,
    totalStudents: 23,
    avgSessionTime: '3.2h',
    completionRate: 85,
    trend: 'up',
  },
  {
    period: 'This Month',
    studentsActive: 23,
    totalStudents: 23,
    avgSessionTime: '12.5h',
    completionRate: 82,
    trend: 'up',
  },
]

const topPerformers = [
  { name: 'Emma Wilson', score: 95, streak: 12, avatar: 'EW' },
  { name: 'Marcus Johnson', score: 92, streak: 8, avatar: 'MJ' },
  { name: 'Sophia Chen', score: 88, streak: 15, avatar: 'SC' },
  { name: 'David Rodriguez', score: 85, streak: 6, avatar: 'DR' },
]

const recentActivities = [
  {
    student: 'Emma Wilson',
    action: 'Completed Math Assignment #12',
    score: 98,
    time: '2 min ago',
  },
  {
    student: 'Marcus Johnson',
    action: 'Finished Reading Comprehension',
    score: 85,
    time: '5 min ago',
  },
  {
    student: 'Sophia Chen',
    action: 'Achieved Science Badge',
    score: null,
    time: '12 min ago',
  },
  {
    student: 'David Rodriguez',
    action: 'Completed Daily Challenge',
    score: 92,
    time: '18 min ago',
  },
]

export function StudentActivityCard({ classId }: StudentActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-purple-600" />
            Student Activity
          </CardTitle>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Activity Overview */}
        <div className="grid grid-cols-1 gap-4">
          {activityData.map((data, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {data.period}
                </span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-sm font-semibold text-green-600">
                    {data.completionRate}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">
                    {data.studentsActive}/{data.totalStudents}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">{data.avgSessionTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">{data.completionRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Performers */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Top Performers</h4>
          <div className="space-y-2">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 w-4">
                      #{index + 1}
                    </span>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {performer.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {performer.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {performer.streak} day streak
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {performer.score}%
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {activity.student}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {activity.action}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {activity.score && (
                    <Badge variant="outline" className="text-xs">
                      {activity.score}%
                    </Badge>
                  )}
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}