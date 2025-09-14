'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  MoreHorizontal,
  UserCheck,
  Chrome,
  Smartphone
} from 'lucide-react'

interface StudentsTableProps {
  classId: string
}

interface Student {
  id: string
  firstName: string
  lastInitial: string
  username: string
  password: string
  isOnline: boolean
  lastPlayed: string | null
  gradeOverride: number | null
  loginMethod: 'prodigy' | 'google' | 'clever'
  device: 'desktop' | 'mobile' | null
}

export function StudentsTable({ classId }: StudentsTableProps) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})

  // Mock student data
  const students: Student[] = [
    {
      id: '1',
      firstName: 'Emma',
      lastInitial: 'S',
      username: 'emma.s.2024',
      password: 'rainbow123',
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
      password: 'soccer456',
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
      password: 'butterfly789',
      isOnline: false,
      lastPlayed: '1 hour ago',
      gradeOverride: null,
      loginMethod: 'prodigy',
      device: null
    },
    {
      id: '4',
      firstName: 'Michael',
      lastInitial: 'R',
      username: 'michael.r.2024',
      password: 'dragon101',
      isOnline: false,
      lastPlayed: 'Yesterday',
      gradeOverride: null,
      loginMethod: 'clever',
      device: null
    },
    {
      id: '5',
      firstName: 'Ava',
      lastInitial: 'K',
      username: 'ava.k.2024',
      password: 'unicorn555',
      isOnline: true,
      lastPlayed: 'Just now',
      gradeOverride: null,
      loginMethod: 'prodigy',
      device: 'desktop'
    }
  ]

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(students.map(s => s.id))
    }
  }

  const togglePasswordVisibility = (studentId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }))
  }

  const getLoginMethodIcon = (method: string) => {
    switch (method) {
      case 'google':
        return <Chrome className="h-4 w-4 text-blue-600" />
      case 'clever':
        return <UserCheck className="h-4 w-4 text-green-600" />
      default:
        return <div className="h-4 w-4 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>
    }
  }

  const getDeviceIcon = (device: string | null) => {
    if (device === 'mobile') {
      return <Smartphone className="h-4 w-4 text-gray-500" />
    }
    return null
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Bulk Actions Bar */}
        {selectedStudents.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-blue-50 border-b">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedStudents.length} students selected
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Move to Class
                </Button>
                <Button variant="outline" size="sm">
                  Reset Passwords
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  Remove Selected
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStudents([])}
            >
              Clear Selection
            </Button>
          </div>
        )}

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedStudents.length === students.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Login Method</TableHead>
              <TableHead>Last Played</TableHead>
              <TableHead>Grade Override</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => toggleStudentSelection(student.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Circle
                        className={`h-3 w-3 ${
                          student.isOnline ? 'text-green-500 fill-green-500' : 'text-gray-300 fill-gray-300'
                        }`}
                      />
                      <span className="font-medium">
                        {student.firstName} {student.lastInitial}.
                      </span>
                      {getDeviceIcon(student.device)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{student.username}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">
                      {showPasswords[student.id] ? student.password : '••••••••'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => togglePasswordVisibility(student.id)}
                    >
                      {showPasswords[student.id] ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getLoginMethodIcon(student.loginMethod)}
                    <span className="text-sm capitalize">{student.loginMethod}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {student.lastPlayed ? (
                      <span className={student.isOnline ? 'text-green-600 font-medium' : 'text-gray-600'}>
                        {student.lastPlayed}
                      </span>
                    ) : (
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        Never played
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Select defaultValue={student.gradeOverride?.toString() || 'default'}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="1">Grade 1</SelectItem>
                      <SelectItem value="2">Grade 2</SelectItem>
                      <SelectItem value="3">Grade 3</SelectItem>
                      <SelectItem value="4">Grade 4</SelectItem>
                      <SelectItem value="5">Grade 5</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Student
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove from Class
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}