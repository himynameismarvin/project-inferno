'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
  loginMethods: ('prodigy' | 'google' | 'clever' | 'microsoft')[]
  device: 'desktop' | 'mobile' | null
}

type StatusTab = 'all' | 'online' | 'offline' | 'never_played'
type SortField = 'name' | 'username' | 'lastPlayed'
type SortDirection = 'asc' | 'desc'

export function StudentsTable({ classId, students }: StudentsTableProps) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<StatusTab>('all')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredAndSortedStudents.length && filteredAndSortedStudents.length > 0) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredAndSortedStudents.map(s => s.id))
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
        return <div className="h-4 w-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
      case 'clever':
        return <div className="h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
      case 'microsoft':
        return <div className="h-4 w-4 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
      default:
        return <div className="h-4 w-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>
    }
  }

  const getProviderName = (method: string) => {
    switch (method) {
      case 'google':
        return 'Google Classroom'
      case 'clever':
        return 'Clever'
      case 'microsoft':
        return 'Class Link'
      default:
        return 'Prodigy'
    }
  }

  const sortLoginMethods = (methods: string[]) => {
    const priorityOrder = ['clever', 'google', 'microsoft', 'prodigy']
    return [...methods].sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a)
      const bIndex = priorityOrder.indexOf(b)
      return aIndex - bIndex
    })
  }

  const getDeviceIcon = (device: string | null) => {
    if (device === 'mobile') {
      return <Smartphone className="h-4 w-4 text-gray-500" />
    }
    return null
  }

  const sortStudents = (students: Student[], field: SortField, direction: SortDirection) => {
    return [...students].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (field) {
        case 'name':
          aValue = `${a.firstName} ${a.lastInitial}`.toLowerCase()
          bValue = `${b.firstName} ${b.lastInitial}`.toLowerCase()
          break
        case 'username':
          aValue = a.username.toLowerCase()
          bValue = b.username.toLowerCase()
          break
        case 'lastPlayed':
          // Sort by last played: null values (never played) go to the end
          if (!a.lastPlayed && !b.lastPlayed) return 0
          if (!a.lastPlayed) return 1
          if (!b.lastPlayed) return -1
          aValue = a.lastPlayed.toLowerCase()
          bValue = b.lastPlayed.toLowerCase()
          break
        default:
          return 0
      }

      if (direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }

  const filteredAndSortedStudents = useMemo(() => {
    const filtered = students.filter(student => {
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

    return sortStudents(filtered, sortField, sortDirection)
  }, [students, activeTab, sortField, sortDirection])

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
    <TooltipProvider>
      <div className="relative">
        <Card>
        <CardContent className="p-6 pb-0">
          {/* Status Filters */}
          <div className="grid grid-cols-4 gap-1 p-4 md:flex md:gap-2 md:overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-col items-center justify-center px-2 py-2 rounded-lg font-medium text-xs transition-colors h-16",
                    "md:flex-row md:items-center md:px-4 md:space-x-2 md:text-sm md:whitespace-nowrap md:h-auto md:justify-start",
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 hidden md:block",
                      tab.id === 'online' && isActive && "text-green-600",
                      tab.id === 'online' && !isActive && "text-green-500",
                      tab.id === 'never_played' && "text-orange-500"
                    )}
                  />
                  <span className="leading-tight text-center md:mr-1 md:text-left">{tab.name}</span>
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full mt-1 md:mt-0 min-w-[20px] flex items-center justify-center",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>


          {/* Desktop Table - hidden on mobile */}
          <div className="overflow-hidden -mx-6 -mt-px hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 pl-6">
                    <Checkbox
                      checked={selectedStudents.length === filteredAndSortedStudents.length && filteredAndSortedStudents.length > 0}
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
                {filteredAndSortedStudents.map((student) => (
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
                      <div className="flex items-center">
                        {sortLoginMethods(student.loginMethods).map((method, index) => (
                          <Tooltip key={method}>
                            <TooltipTrigger asChild>
                              <div
                                className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
                                style={{
                                  marginLeft: index > 0 ? '-10px' : '0',
                                  zIndex: student.loginMethods.length - index
                                }}
                              >
                                {getLoginMethodIcon(method)}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{getProviderName(method)}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {student.isOnline ? (
                          <span className="text-gray-600 font-medium">
                            Online
                          </span>
                        ) : student.lastPlayed ? (
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

          {/* Mobile Select All - shown on mobile */}
          <div className="py-3 border-b md:hidden -mx-6">
            <label className="flex items-center space-x-2 cursor-pointer px-4">
              <Checkbox
                checked={selectedStudents.length === filteredAndSortedStudents.length && filteredAndSortedStudents.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm font-medium">Select All</span>
            </label>
          </div>

          {/* Mobile Card Layout - shown on mobile */}
          <div className="md:hidden -mx-6">
            {filteredAndSortedStudents.map((student) => (
              <div
                key={student.id}
                className={cn(
                  "border-b border-gray-200 bg-white",
                  selectedStudents.includes(student.id) && "bg-blue-50"
                )}
              >
                {/* Student Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => toggleStudentSelection(student.id)}
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <Circle
                          className={`h-3 w-3 ${
                            student.isOnline ? 'text-green-500 fill-green-500' : 'text-gray-300 fill-gray-300'
                          }`}
                        />
                        <span className="font-medium text-base">
                          {student.firstName} {student.lastInitial}.
                        </span>
                        {getDeviceIcon(student.device)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {student.username}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 text-sm border-blue-200 hover:bg-blue-50"
                  >
                    Edit
                  </Button>
                </div>

                {/* Metadata Rows */}
                <div className="divide-y divide-gray-200">
                  {/* Password Row */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-gray-600">Password:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">
                        {showPasswords[student.id] ? student.password : '••••••••••'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => togglePasswordVisibility(student.id)}
                      >
                        {showPasswords[student.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* SSO Providers Row */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-gray-600">SSO Providers:</span>
                    <div className="flex items-center space-x-1">
                      {sortLoginMethods(student.loginMethods).map((method) => (
                        <Tooltip key={method}>
                          <TooltipTrigger asChild>
                            <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors">
                              {getLoginMethodIcon(method)}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getProviderName(method)}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  {/* Last Played Row */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-gray-600">Last Played:</span>
                    <div>
                      {student.isOnline ? (
                        <span className="text-sm text-gray-900 font-medium">
                          Online
                        </span>
                      ) : student.lastPlayed ? (
                        <span className="text-sm text-gray-900">
                          {student.lastPlayed}
                        </span>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-300">
                          Never played
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Grade Override Row */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-gray-600">Grade Override:</span>
                    <div className="w-32">
                      <Select defaultValue={student.gradeOverride?.toString() || 'default'}>
                        <SelectTrigger className="w-full h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">None</SelectItem>
                          <SelectItem value="1">Grade 1</SelectItem>
                          <SelectItem value="2">Grade 2</SelectItem>
                          <SelectItem value="3">Grade 3</SelectItem>
                          <SelectItem value="4">Grade 4</SelectItem>
                          <SelectItem value="5">Grade 5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Floating Bulk Actions Bar */}
      {selectedStudents.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-[calc(125px+50vw)] md:transform md:-translate-x-1/2 md:w-[calc(100vw-280px)] md:max-w-[800px] md:right-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4">
            <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <span className="text-sm font-medium text-gray-900">
                  {selectedStudents.length} student{selectedStudents.length === 1 ? '' : 's'} selected
                </span>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    Move to Class
                  </Button>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    Reset Passwords
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 w-full md:w-auto">
                    Remove Selected
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStudents([])}
                className="text-gray-500 hover:text-gray-700 w-full md:w-auto"
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </TooltipProvider>
  )
}