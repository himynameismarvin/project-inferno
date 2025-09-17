'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  UserPlus
} from 'lucide-react'
import { AddStudentDialog } from './add-student-dialog'

interface StudentsHeaderProps {
  classId: string
  totalStudents: number
  onlineStudents: number
  offlineStudents: number
  lastActivity: string
}

export function StudentsHeader({
  classId,
  totalStudents,
  onlineStudents,
  offlineStudents,
  lastActivity
}: StudentsHeaderProps) {
  const [addStudentOpen, setAddStudentOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Students
          </CardTitle>

        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>{totalStudents} total student{totalStudents === 1 ? '' : 's'}</span>
            <span>•</span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              {onlineStudents} online now
            </span>
            <span>•</span>
            <span>{offlineStudents} offline</span>
          </div>
          <div className="text-xs text-gray-500">
            Last activity: {lastActivity}
          </div>
        </div>
      </CardContent>

      <AddStudentDialog
        open={addStudentOpen}
        onOpenChange={setAddStudentOpen}
        classId={classId}
      />
    </Card>
  )
}