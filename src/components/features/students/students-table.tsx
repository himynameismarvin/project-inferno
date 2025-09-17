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
  Smartphone,
  Users,
  UserX,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StudentsTableProps {
  classId: string
  students: Student[]
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

type StatusTab = 'all' | 'online' | 'offline' | 'never_played'

export function StudentsTable({ classId, students }: StudentsTableProps) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<StatusTab>('all')

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id))
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

  const filteredStudents = students.filter(student => {
    switch (activeTab) {
      case 'online':
        return student.isOnline
      case 'offline':
        return !student.isOnline
      case 'never_played':
        return !student.lastPlayed
      default:
        return true
    }
  })

  const tabs = [
    {
      id: 'all' as StatusTab,
      name: 'All',
      count: students.length,
      icon: Users,
      color: 'text-gray-600'
    },
    {
      id: 'online' as StatusTab,
      name: 'Online',
      count: students.filter(s => s.isOnline).length,
      icon: Circle,
      color: 'text-green-600'
    },
    {
      id: 'offline' as StatusTab,
      name: 'Offline',
      count: students.filter(s => !s.isOnline).length,
      icon: UserX,
      color: 'text-gray-600'
    },
    {
      id: 'never_played' as StatusTab,
      name: 'Never Played',
      count: students.filter(s => !s.lastPlayed).length,
      icon: Clock,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="relative">
      <Card>
        <CardContent className="p-0">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      tab.id === 'online' && isActive && "text-green-600",
                      tab.id === 'online' && !isActive && "text-green-500",
                      tab.id === 'never_played' && "text-orange-500"
                    )}
                  />
                  <span>{tab.name}</span>
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className={cn(
                      "ml-1",
                      isActive && "bg-blue-600 text-white"
                    )}
                  >
                    {tab.count}
                  </Badge>
                </button>
              )
            })}
          </div>


          {/* Table */}
          <div className="overflow-hidden -mx-6 -mt-px">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 pl-6">
                    <Checkbox
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Login Method</TableHead>
                  <TableHead>Last Played</TableHead>
                  <TableHead>Grade Override</TableHead>
                  <TableHead className="w-12 pr-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className={cn(
                      "cursor-pointer hover:bg-gray-50 transition-colors",
                      selectedStudents.includes(student.id) && "bg-blue-50 hover:bg-blue-100"
                    )}
                    onClick={(e) => {
                      // Don't trigger row selection if clicking on interactive elements
                      const target = e.target as HTMLElement
                      const isInteractive = target.closest('button, input, select, [role="combobox"], [role="button"]')
                      if (!isInteractive) {
                        toggleStudentSelection(student.id)
                      }
                    }}
                  >
                    <TableCell className="pl-6">
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
                      <span className="text-sm">{student.username}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
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
                          <span className="text-gray-600">
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
                          <SelectItem value="default">Adaptive Path</SelectItem>
                          <SelectItem value="1">Grade 1</SelectItem>
                          <SelectItem value="2">Grade 2</SelectItem>
                          <SelectItem value="3">Grade 3</SelectItem>
                          <SelectItem value="4">Grade 4</SelectItem>
                          <SelectItem value="5">Grade 5</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="pr-6">
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
          </div>
        </CardContent>
      </Card>

      {/* Floating Bulk Actions Bar */}
      {selectedStudents.length > 0 && (
        <div className="fixed bottom-4 z-50" style={{ left: 'calc(125px + 50vw)', transform: 'translateX(-50%)', width: 'calc(100vw - 280px)', maxWidth: '800px' }}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">
                  {selectedStudents.length} student{selectedStudents.length === 1 ? '' : 's'} selected
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
                className="text-gray-500 hover:text-gray-700"
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}