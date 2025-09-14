'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Users,
  Plus,
  Download,
  Upload,
  Search,
  MoreVertical,
  UserPlus,
  FileSpreadsheet
} from 'lucide-react'
import { AddStudentDialog } from './add-student-dialog'

interface StudentsHeaderProps {
  classId: string
}

export function StudentsHeader({ classId }: StudentsHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [addStudentOpen, setAddStudentOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Students
          </CardTitle>

          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAddStudentOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    More Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Upload className="mr-2 h-4 w-4" />
                    Import from CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Download Template
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Student List
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>24 total students</span>
            <span>•</span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              8 online now
            </span>
            <span>•</span>
            <span>16 offline</span>
          </div>
          <div className="text-xs text-gray-500">
            Last activity: 2 minutes ago
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