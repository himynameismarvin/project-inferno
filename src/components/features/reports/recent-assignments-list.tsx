'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  FileText,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Filter,
} from 'lucide-react'

interface RecentAssignmentsListProps {
  classId: string
}

const assignments = [
  {
    id: '1',
    title: 'Multiplication Tables Review',
    type: 'Practice',
    status: 'active',
    dueDate: '2025-09-16',
    progress: 78,
    studentsCompleted: 18,
    totalStudents: 23,
    avgScore: 85,
    timeSpent: '2.5h',
    trend: 'up',
  },
  {
    id: '2',
    title: 'Reading Comprehension: Chapter 5',
    type: 'Assignment',
    status: 'active',
    dueDate: '2025-09-15',
    progress: 65,
    studentsCompleted: 15,
    totalStudents: 23,
    avgScore: 78,
    timeSpent: '1.8h',
    trend: 'up',
  },
  {
    id: '3',
    title: 'Science Lab: Plant Growth',
    type: 'Lab',
    status: 'overdue',
    dueDate: '2025-09-12',
    progress: 45,
    studentsCompleted: 10,
    totalStudents: 23,
    avgScore: 72,
    timeSpent: '3.2h',
    trend: 'down',
  },
  {
    id: '4',
    title: 'Historical Timeline Project',
    type: 'Project',
    status: 'completed',
    dueDate: '2025-09-10',
    progress: 100,
    studentsCompleted: 23,
    totalStudents: 23,
    avgScore: 92,
    timeSpent: '4.1h',
    trend: 'up',
  },
  {
    id: '5',
    title: 'Daily Math Challenge',
    type: 'Challenge',
    status: 'active',
    dueDate: '2025-09-14',
    progress: 90,
    studentsCompleted: 21,
    totalStudents: 23,
    avgScore: 88,
    timeSpent: '0.5h',
    trend: 'up',
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-blue-100 text-blue-700">Active</Badge>
    case 'completed':
      return <Badge className="bg-green-100 text-green-700">Completed</Badge>
    case 'overdue':
      return <Badge className="bg-red-100 text-red-700">Overdue</Badge>
    case 'draft':
      return <Badge variant="outline">Draft</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'overdue':
      return <AlertCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-blue-500" />
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const getDaysUntilDue = (dueDate: string) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`
  if (diffDays === 0) return 'Due today'
  if (diffDays === 1) return 'Due tomorrow'
  return `${diffDays} days left`
}

export function RecentAssignmentsList({ classId }: RecentAssignmentsListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-orange-600" />
            Recent Assignments
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  {getStatusIcon(assignment.status)}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {assignment.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {assignment.type}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        Due {formatDate(assignment.dueDate)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className={`text-xs font-medium ${
                        assignment.status === 'overdue'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}>
                        {getDaysUntilDue(assignment.dueDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(assignment.status)}
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs font-medium text-gray-900">
                    {assignment.progress}%
                  </span>
                </div>
                <Progress value={assignment.progress} className="h-1.5" />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">
                    {assignment.studentsCompleted}/{assignment.totalStudents}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className={`h-3 w-3 ${
                    assignment.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className="text-gray-600">{assignment.avgScore}% avg</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">{assignment.timeSpent}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-600">
                    {assignment.studentsCompleted} submitted
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">5</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">3</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-600">1</div>
            <div className="text-xs text-gray-500">Overdue</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}