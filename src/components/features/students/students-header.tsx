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
}

export function StudentsHeader({
  classId,
  totalStudents,
  onlineStudents,
  offlineStudents
}: StudentsHeaderProps) {
  const [addStudentOpen, setAddStudentOpen] = useState(false)

  // Generate a mock class code for display
  const classCode = "XK34LQ"

  return (
    <Card className="relative">
      <CardHeader className="relative">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="flex items-center pr-20 md:pr-0">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Students
          </CardTitle>
        </div>
        {/* Mobile class code - anchored to right on mobile */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-end md:hidden">
          <div className="text-xs text-gray-500 whitespace-nowrap">Class code</div>
          <div className="text-sm font-mono font-bold text-gray-800 tracking-wider">
            {classCode}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-3 md:space-x-4 text-sm text-gray-600">
          <span>{totalStudents} total student{totalStudents === 1 ? '' : 's'}</span>
          <span className="hidden md:block">•</span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
            {onlineStudents} online now
          </span>
          <span className="hidden md:block">•</span>
          <span>{offlineStudents} offline</span>
        </div>
      </CardContent>

      {/* Absolutely positioned class code - hidden on mobile */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex-col items-center hidden md:flex">
        <div className="text-xs text-gray-500 mb-1">Class code</div>
        <div className="text-2xl font-mono font-bold text-gray-800 tracking-wider">
          {classCode}
        </div>
      </div>


      <AddStudentDialog
        open={addStudentOpen}
        onOpenChange={setAddStudentOpen}
        classId={classId}
      />
    </Card>
  )
}