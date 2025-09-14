'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Circle,
  Users,
  Search,
  Settings,
  Chrome,
  Smartphone
} from 'lucide-react'

interface Student {
  id: string
  firstName: string
  lastInitial: string
  username: string
  isOnline: boolean
  lastPlayed: string | null
  gradeOverride: number | null
  loginMethod: 'prodigy' | 'google' | 'clever'
  device: 'desktop' | 'mobile' | null
}

interface AssignmentStudentSelectionStepProps {
  formData: any
  updateFormData: (data: any) => void
  classId: string
}

export function AssignmentStudentSelectionStep({
  formData,
  updateFormData,
  classId
}: AssignmentStudentSelectionStepProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDifferentiation, setShowDifferentiation] = useState<Record<string, boolean>>({})

  // Mock student data - in real app, this would come from props or API
  const students: Student[] = [
    {
      id: '1',
      firstName: 'Emma',
      lastInitial: 'S',
      username: 'emma.s.2024',
      isOnline: true,
      lastPlayed: '2 minutes ago',
      gradeOverride: null,
      loginMethod: 'prodigy',
      device: 'desktop'
    },
    {
      id: '2',
      firstName: 'Jake',
      lastInitial: 'M',
      username: 'jake.m.2024',
      isOnline: true,
      lastPlayed: '5 minutes ago',
      gradeOverride: 4,
      loginMethod: 'google',
      device: 'mobile'
    },
    {
      id: '3',
      firstName: 'Sophia',
      lastInitial: 'L',
      username: 'sophia.l.2024',
      isOnline: false,
      lastPlayed: '1 hour ago',
      gradeOverride: null,
      loginMethod: 'prodigy',
      device: null
    },
    {
      id: '4',
      firstName: 'Liam',
      lastInitial: 'T',
      username: 'liam.t.2024',
      isOnline: false,
      lastPlayed: '2 days ago',
      gradeOverride: 2,
      loginMethod: 'clever',
      device: 'desktop'
    },
    {
      id: '5',
      firstName: 'Ava',
      lastInitial: 'R',
      username: 'ava.r.2024',
      isOnline: true,
      lastPlayed: '10 minutes ago',
      gradeOverride: null,
      loginMethod: 'prodigy',
      device: 'mobile'
    }
  ]

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastInitial}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedStudents = formData.selectedStudents || []
  const selectedCount = selectedStudents.length

  const handleStudentToggle = (studentId: string) => {
    const updatedSelected = selectedStudents.includes(studentId)
      ? selectedStudents.filter((id: string) => id !== studentId)
      : [...selectedStudents, studentId]

    updateFormData({ selectedStudents: updatedSelected })
  }

  const handleSelectAll = () => {
    const allStudentIds = filteredStudents.map(s => s.id)
    const isAllSelected = allStudentIds.every(id => selectedStudents.includes(id))

    if (isAllSelected) {
      // Deselect all filtered students
      const remaining = selectedStudents.filter((id: string) => !allStudentIds.includes(id))
      updateFormData({ selectedStudents: remaining })
    } else {
      // Select all filtered students
      const combined = [...new Set([...selectedStudents, ...allStudentIds])]
      updateFormData({ selectedStudents: combined })
    }
  }

  const getLoginMethodIcon = (method: string) => {
    switch (method) {
      case 'google':
        return <Chrome className="h-3 w-3 text-blue-500" />
      case 'clever':
        return <div className="w-3 h-3 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">C</div>
      default:
        return <div className="w-3 h-3 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
    }
  }

  const getDeviceIcon = (device: string | null) => {
    if (device === 'mobile') {
      return <Smartphone className="h-3 w-3 text-gray-500" />
    } else if (device === 'desktop') {
      return <Chrome className="h-3 w-3 text-gray-500" />
    }
    return null
  }

  const isAllFilteredSelected = filteredStudents.length > 0 &&
    filteredStudents.every(student => selectedStudents.includes(student.id))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Select Students
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Choose which students will receive this assignment
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {selectedCount} selected
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle className="text-base">Class Students</CardTitle>

            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={filteredStudents.length === 0}
              >
                {isAllFilteredSelected ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllFilteredSelected}
                    onCheckedChange={handleSelectAll}
                    disabled={filteredStudents.length === 0}
                  />
                </TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Login Method</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchQuery ? 'No students found matching your search.' : 'No students in this class.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => handleStudentToggle(student.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-700">
                              {student.firstName[0]}{student.lastInitial}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {student.firstName} {student.lastInitial}.
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.username}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Circle
                          className={`h-2 w-2 ${
                            student.isOnline
                              ? 'fill-green-500 text-green-500'
                              : 'fill-gray-400 text-gray-400'
                          }`}
                        />
                        <span className={`text-xs font-medium ${
                          student.isOnline ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {student.isOnline ? 'Online' : 'Offline'}
                        </span>
                        {student.device && getDeviceIcon(student.device)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-500">
                        {student.lastPlayed || 'Never'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {getLoginMethodIcon(student.loginMethod)}
                        <span className="text-xs text-gray-500 capitalize">
                          {student.loginMethod}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDifferentiation(prev => ({
                          ...prev,
                          [student.id]: !prev[student.id]
                        }))}
                        className="h-8 w-8 p-0"
                        disabled={!selectedStudents.includes(student.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Differentiation Panel */}
      {Object.keys(showDifferentiation).some(id => showDifferentiation[id]) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Differentiation Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 text-center py-8">
              Individual student customization coming soon...
              <br />
              <span className="text-xs">Override skills, difficulty, and time limits per student</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selection Summary */}
      {selectedCount > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-900">
                  {selectedCount} student{selectedCount !== 1 ? 's' : ''} selected
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateFormData({ selectedStudents: [] })}
              >
                Clear Selection
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {selectedStudents.slice(0, 8).map((studentId: string) => {
                const student = students.find(s => s.id === studentId)
                return student ? (
                  <Badge key={studentId} variant="secondary" className="text-xs">
                    {student.firstName} {student.lastInitial}.
                  </Badge>
                ) : null
              })}
              {selectedCount > 8 && (
                <Badge variant="secondary" className="text-xs">
                  +{selectedCount - 8} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}