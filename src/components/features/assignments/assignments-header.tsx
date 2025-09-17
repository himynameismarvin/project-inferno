'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ClipboardList } from 'lucide-react'

interface AssignmentsHeaderProps {
  classId: string
}

export function AssignmentsHeader({ classId }: AssignmentsHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClipboardList className="h-5 w-5 mr-2 text-blue-600" />
          Assignments
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>8 total assignments</span>
            <span>•</span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              3 active
            </span>
            <span>•</span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-1" />
              2 due this week
            </span>
            <span>•</span>
            <span>3 completed</span>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: 5 minutes ago
          </div>
        </div>
      </CardContent>
    </Card>
  )
}