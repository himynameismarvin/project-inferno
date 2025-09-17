'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  GraduationCap,
  TrendingUp,
  Users,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  PlayCircle,
} from 'lucide-react'

interface PlacementTestCardProps {
  classId: string
}

const placementStats = {
  totalStudents: 23,
  completed: 20,
  inProgress: 2,
  notStarted: 1,
  avgCompletionTime: '18 min',
  avgAccuracy: 78,
}

const gradeDistribution = [
  { grade: 'Grade 3', count: 5, percentage: 25, color: 'bg-blue-500' },
  { grade: 'Grade 4', count: 12, percentage: 60, color: 'bg-green-500' },
  { grade: 'Grade 5', count: 4, percentage: 20, color: 'bg-purple-500' },
  { grade: 'Grade 6', count: 2, percentage: 10, color: 'bg-orange-500' },
]

const recentResults = [
  {
    name: 'Emma Wilson',
    grade: 'Grade 5',
    accuracy: 92,
    time: '15 min',
    status: 'completed',
    avatar: 'EW',
  },
  {
    name: 'Marcus Johnson',
    grade: 'Grade 4',
    accuracy: 85,
    time: '22 min',
    status: 'completed',
    avatar: 'MJ',
  },
  {
    name: 'Sophia Chen',
    grade: 'Grade 4',
    accuracy: null,
    time: '8 min',
    status: 'in-progress',
    avatar: 'SC',
  },
  {
    name: 'David Rodriguez',
    grade: null,
    accuracy: null,
    time: null,
    status: 'not-started',
    avatar: 'DR',
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'in-progress':
      return <PlayCircle className="h-4 w-4 text-blue-500" />
    case 'not-started':
      return <AlertCircle className="h-4 w-4 text-gray-400" />
    default:
      return null
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-700">Completed</Badge>
    case 'in-progress':
      return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
    case 'not-started':
      return <Badge variant="outline">Not Started</Badge>
    default:
      return null
  }
}

export function PlacementTestCard({ classId }: PlacementTestCardProps) {
  const completionRate = Math.round((placementStats.completed / placementStats.totalStudents) * 100)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
            Placement Tests
          </CardTitle>
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Manage Tests
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Completion Progress</span>
            <span className="text-lg font-semibold text-gray-900">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2 mb-3" />

          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="text-center">
              <div className="text-sm font-semibold text-green-600">{placementStats.completed}</div>
              <div className="text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-600">{placementStats.inProgress}</div>
              <div className="text-gray-500">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-600">{placementStats.notStarted}</div>
              <div className="text-gray-500">Not Started</div>
            </div>
          </div>
        </div>

        {/* Grade Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Grade Level Distribution</h4>
          <div className="space-y-3">
            {gradeDistribution.map((grade, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-20 text-xs text-gray-600">{grade.grade}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{grade.count} students</span>
                    <span className="text-xs font-medium text-gray-700">{grade.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${grade.color}`}
                      style={{ width: `${grade.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-lg font-semibold text-gray-900">
                {placementStats.avgAccuracy}%
              </span>
            </div>
            <div className="text-xs text-gray-500">Avg Accuracy</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-blue-500" />
              <span className="text-lg font-semibold text-gray-900">
                {placementStats.avgCompletionTime}
              </span>
            </div>
            <div className="text-xs text-gray-500">Avg Time</div>
          </div>
        </div>

        {/* Recent Results */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Results</h4>
          <div className="space-y-2">
            {recentResults.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {result.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {result.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.grade ? `Placed in ${result.grade}` : 'Placement pending'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {result.accuracy && (
                    <Badge variant="outline" className="text-xs">
                      {result.accuracy}%
                    </Badge>
                  )}
                  {result.time && (
                    <span className="text-xs text-gray-400">{result.time}</span>
                  )}
                  {getStatusBadge(result.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-200">
          <Button className="w-full" variant="outline">
            <PlayCircle className="h-4 w-4 mr-2" />
            Send Placement Test Reminders
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}