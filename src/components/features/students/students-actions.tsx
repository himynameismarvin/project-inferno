'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  UserPlus,
  BarChart3,
  Eye,
  FileText
} from 'lucide-react'
import { AddStudentDialog } from './add-student-dialog'

interface StudentsActionsProps {
  classId: string
}

export function StudentsActions({ classId }: StudentsActionsProps) {
  const [addStudentOpen, setAddStudentOpen] = useState(false)

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => setAddStudentOpen(true)}
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Add students
      </Button>

      <Button variant="outline" className="hidden lg:flex">
        <BarChart3 className="h-4 w-4 mr-2" />
        Activity board
      </Button>

      <Button variant="outline">
        <Eye className="h-4 w-4 mr-2" />
        View student logins
      </Button>

      <Button variant="outline">
        <FileText className="h-4 w-4 mr-2" />
        Print parent letters
      </Button>

      <AddStudentDialog
        open={addStudentOpen}
        onOpenChange={setAddStudentOpen}
        classId={classId}
      />
    </div>
  )
}