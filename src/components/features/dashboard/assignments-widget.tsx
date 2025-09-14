'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ClipboardList,
  Plus,
  Calendar,
  Users,
  BarChart3,
  ExternalLink
} from 'lucide-react'

interface AssignmentsWidgetProps {
  classId: string
}

export function AssignmentsWidget({ classId }: AssignmentsWidgetProps) {
  // Mock assignments data - replace with real data from useAssignments hook
  const assignments = [
    {
      id: 1,
      title: 'Weekly Math Challenge',
      type: 'Practice',
      dueDate: '2025-09-16',
      studentsAssigned: 24,
      studentsCompleted: 18,
      avgScore: 87,
      status: 'active'
    },
    {
      id: 2,
      title: 'Multiplication Tables Quiz',
      type: 'Assessment',
      dueDate: '2025-09-18',
      studentsAssigned: 24,
      studentsCompleted: 12,
      avgScore: 92,
      status: 'active'
    },
    {
      id: 3,
      title: 'Geometry Basics',
      type: 'Practice',
      dueDate: '2025-09-20',
      studentsAssigned: 24,
      studentsCompleted: 5,
      avgScore: 78,
      status: 'active'
    }
  ]

  const getStatusBadge = (assignment: any) => {
    const completionRate = (assignment.studentsCompleted / assignment.studentsAssigned) * 100

    if (completionRate === 100) {
      return <Badge variant="outline" className="text-green-600 border-green-600">Complete</Badge>
    } else if (completionRate > 50) {
      return <Badge variant="outline" className="text-blue-600 border-blue-600">In Progress</Badge>
    } else {
      return <Badge variant="outline" className="text-orange-600 border-orange-600">Just Started</Badge>
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    if (diffDays > 1) return `Due in ${diffDays} days`
    return 'Overdue'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-gray-600" />
            Active Assignments
          </CardTitle>
          <Button size="sm" className="h-8">
            <Plus className="h-4 w-4 mr-2" />
            New Assignment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {assignment.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {getDaysUntilDue(assignment.dueDate)}
                    </span>
                    <span>•</span>
                    <span>{assignment.type}</span>
                  </div>
                </div>
                {getStatusBadge(assignment)}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-1">
                    <Users className="h-4 w-4 mr-1" />
                    Students
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {assignment.studentsCompleted}/{assignment.studentsAssigned}
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-1">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Avg Score
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {assignment.avgScore}%
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Progress</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {Math.round((assignment.studentsCompleted / assignment.studentsAssigned) * 100)}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(assignment.studentsCompleted / assignment.studentsAssigned) * 100}%`
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  View Report
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all assignments →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}