'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  Target,
} from 'lucide-react'

interface CurriculumProgressCardProps {
  classId: string
}

const curriculumAreas = [
  {
    id: 'math',
    name: 'Mathematics',
    progress: 78,
    studentsCompleted: 18,
    totalStudents: 23,
    avgTimeSpent: '4.2h',
    trend: 'up',
    status: 'on-track',
  },
  {
    id: 'reading',
    name: 'Reading',
    progress: 65,
    studentsCompleted: 15,
    totalStudents: 23,
    avgTimeSpent: '3.8h',
    trend: 'up',
    status: 'on-track',
  },
  {
    id: 'science',
    name: 'Science',
    progress: 42,
    studentsCompleted: 9,
    totalStudents: 23,
    avgTimeSpent: '2.1h',
    trend: 'down',
    status: 'behind',
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    progress: 89,
    studentsCompleted: 21,
    totalStudents: 23,
    avgTimeSpent: '5.1h',
    trend: 'up',
    status: 'ahead',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ahead':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'on-track':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'behind':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 60) return 'bg-blue-500'
  if (progress >= 40) return 'bg-yellow-500'
  return 'bg-orange-500'
}

export function CurriculumProgressCard({ classId }: CurriculumProgressCardProps) {
  const overallProgress = Math.round(
    curriculumAreas.reduce((sum, area) => sum + area.progress, 0) / curriculumAreas.length
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
            Curriculum Progress
          </CardTitle>
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-lg font-semibold text-gray-900">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Individual Areas */}
        <div className="space-y-4">
          {curriculumAreas.map((area) => (
            <div
              key={area.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {area.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className={getStatusColor(area.status)}
                    >
                      {area.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`h-3 w-3 ${
                      area.trend === 'up' ? 'text-green-500' : 'text-orange-500'
                    }`} />
                    <span className="text-sm font-semibold text-gray-900">
                      {area.progress}%
                    </span>
                  </div>
                </div>

                <Progress
                  value={area.progress}
                  className="h-1.5 mb-2"
                />

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{area.studentsCompleted}/{area.totalStudents} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{area.avgTimeSpent} avg</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">4</div>
            <div className="text-xs text-gray-500">Subjects</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">23</div>
            <div className="text-xs text-gray-500">Students</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">3.8h</div>
            <div className="text-xs text-gray-500">Avg Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}