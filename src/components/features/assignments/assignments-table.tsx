'use client'

import { useState, useMemo } from 'react'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Calendar,
  Users,
  BarChart3,
  Eye,
  Edit2,
  Copy,
  Trash2,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  List,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AssignmentsTableProps {
  classId: string
  searchQuery?: string
}

interface Assignment {
  id: string
  title: string
  type: 'Assignment' | 'Quick Quiz'
  status: 'active' | 'draft' | 'completed' | 'overdue'
  startDate: string
  dueDate: string
  createdDate: string
  studentsAssigned: number
  studentsCompleted: number
  avgScore: number | null
  skills: string[]
  duration: string
}

type StatusTab = 'all' | 'in_progress' | 'draft' | 'completed' | 'overdue'

export function AssignmentsTable({ classId, searchQuery = '' }: AssignmentsTableProps) {
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<StatusTab>('all')

  // Extended mock assignments data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Weekly Math Challenge',
      type: 'Assignment',
      status: 'active',
      startDate: '2025-09-14',
      dueDate: '2025-09-16',
      createdDate: '2025-09-10',
      studentsAssigned: 24,
      studentsCompleted: 18,
      avgScore: 87,
      skills: ['Addition', 'Subtraction', 'Word Problems'],
      duration: '30 min'
    },
    {
      id: '2',
      title: 'Multiplication Tables Quiz',
      type: 'Quick Quiz',
      status: 'active',
      startDate: '2025-09-18',
      dueDate: '2025-09-18',
      createdDate: '2025-09-12',
      studentsAssigned: 24,
      studentsCompleted: 12,
      avgScore: 92,
      skills: ['Multiplication', 'Times Tables'],
      duration: '20 min'
    },
    {
      id: '3',
      title: 'Geometry Basics',
      type: 'Assignment',
      status: 'active',
      startDate: '2025-09-18',
      dueDate: '2025-09-20',
      createdDate: '2025-09-13',
      studentsAssigned: 24,
      studentsCompleted: 5,
      avgScore: 78,
      skills: ['Shapes', 'Area', 'Perimeter'],
      duration: '45 min'
    },
    {
      id: '4',
      title: 'Fractions Introduction',
      type: 'Assignment',
      status: 'draft',
      startDate: '2025-09-22',
      dueDate: '2025-09-25',
      createdDate: '2025-09-14',
      studentsAssigned: 0,
      studentsCompleted: 0,
      avgScore: null,
      skills: ['Fractions', 'Basic Operations'],
      duration: '35 min'
    },
    {
      id: '5',
      title: 'Division Mastery Test',
      type: 'Assignment',
      status: 'completed',
      startDate: '2025-09-08',
      dueDate: '2025-09-10',
      createdDate: '2025-09-03',
      studentsAssigned: 24,
      studentsCompleted: 24,
      avgScore: 83,
      skills: ['Division', 'Long Division'],
      duration: '25 min'
    },
    {
      id: '6',
      title: 'Place Value Quiz',
      type: 'Quick Quiz',
      status: 'overdue',
      startDate: '2025-09-12',
      dueDate: '2025-09-12',
      createdDate: '2025-09-05',
      studentsAssigned: 24,
      studentsCompleted: 20,
      avgScore: 76,
      skills: ['Place Value', 'Number Sense'],
      duration: '15 min'
    }
  ]

  const toggleAssignmentSelection = (assignmentId: string) => {
    setSelectedAssignments(prev =>
      prev.includes(assignmentId)
        ? prev.filter(id => id !== assignmentId)
        : [...prev, assignmentId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedAssignments.length === filteredAssignments.length && filteredAssignments.length > 0) {
      setSelectedAssignments([])
    } else {
      setSelectedAssignments(filteredAssignments.map(a => a.id))
    }
  }

  const getStatusBadge = (assignment: Assignment) => {
    const completionRate = assignment.studentsAssigned > 0
      ? (assignment.studentsCompleted / assignment.studentsAssigned) * 100
      : 0

    switch (assignment.status) {
      case 'active':
        if (completionRate === 100) {
          return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Complete</Badge>
        } else if (completionRate > 0) {
          return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        } else {
          return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        }
      case 'draft':
        return <Badge variant="outline" className="text-gray-600 border-gray-400">Draft</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: Assignment['type']) => {
    const config = {
      Assignment: {
        color: 'bg-purple-100 text-purple-700',
        icon: List
      },
      'Quick Quiz': {
        color: 'bg-orange-100 text-orange-700',
        icon: Zap
      }
    }

    const { color, icon: Icon } = config[type]

    return (
      <Badge variant="outline" className={color}>
        <Icon className="h-3 w-3 mr-1" />
        {type}
      </Badge>
    )
  }

  const getDaysUntilDue = (dueDate: string, studentsAssigned: number, studentsCompleted: number) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // If all students completed, show "Completed" when past due
    const allCompleted = studentsAssigned > 0 && studentsCompleted === studentsAssigned

    if (diffDays === 0) return { text: 'Due today', isOverdue: false }
    if (diffDays === 1) return { text: 'Due tomorrow', isOverdue: false }
    if (diffDays > 1) return { text: `Due in ${diffDays} days`, isOverdue: false }

    // Past due date
    if (allCompleted) {
      return { text: '', isOverdue: false }
    }

    const daysOverdue = Math.abs(diffDays)
    const dayWord = daysOverdue === 1 ? 'day' : 'days'
    return {
      text: `${daysOverdue} ${dayWord} overdue`,
      isOverdue: true
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDateRange = (startDate: string, dueDate: string) => {
    if (startDate === dueDate) {
      return formatDate(startDate)
    }

    const start = new Date(startDate)
    const end = new Date(dueDate)

    // Same year
    if (start.getFullYear() === end.getFullYear()) {
      // Same month
      if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`
      } else {
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${end.getFullYear()}`
      }
    } else {
      return `${formatDate(startDate)} - ${formatDate(dueDate)}`
    }
  }

  const fuzzySearch = (text: string, query: string): boolean => {
    if (!query.trim()) return true

    const searchText = text.toLowerCase()
    const searchQuery = query.toLowerCase()

    // Direct substring match
    if (searchText.includes(searchQuery)) return true

    // Fuzzy match: check if characters appear in order
    let queryIndex = 0
    for (let i = 0; i < searchText.length && queryIndex < searchQuery.length; i++) {
      if (searchText[i] === searchQuery[queryIndex]) {
        queryIndex++
      }
    }
    return queryIndex === searchQuery.length
  }

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      // Status filter
      const statusMatch = (() => {
        switch (activeTab) {
          case 'in_progress':
            return assignment.status === 'active'
          case 'draft':
            return assignment.status === 'draft'
          case 'completed':
            return assignment.status === 'completed'
          case 'overdue':
            return assignment.status === 'overdue'
          default:
            return true
        }
      })()

      if (!statusMatch) return false

      // Search filter
      if (searchQuery.trim()) {
        const titleMatch = fuzzySearch(assignment.title, searchQuery)
        const skillsMatch = assignment.skills.some(skill => fuzzySearch(skill, searchQuery))
        return titleMatch || skillsMatch
      }

      return true
    })
  }, [assignments, activeTab, searchQuery])

  // Filter assignments by search query first, then apply status counts
  const searchFilteredAssignments = useMemo(() => {
    if (!searchQuery.trim()) return assignments

    return assignments.filter(assignment => {
      const titleMatch = fuzzySearch(assignment.title, searchQuery)
      const skillsMatch = assignment.skills.some(skill => fuzzySearch(skill, searchQuery))
      return titleMatch || skillsMatch
    })
  }, [assignments, searchQuery])

  const tabs = [
    {
      id: 'all' as StatusTab,
      name: 'All',
      count: searchFilteredAssignments.length,
      countColor: 'bg-gray-200 text-gray-700'
    },
    {
      id: 'in_progress' as StatusTab,
      name: 'In Progress',
      count: searchFilteredAssignments.filter(a => a.status === 'active').length,
      countColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'draft' as StatusTab,
      name: 'Draft',
      count: searchFilteredAssignments.filter(a => a.status === 'draft').length,
      countColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'completed' as StatusTab,
      name: 'Completed',
      count: searchFilteredAssignments.filter(a => a.status === 'completed').length,
      countColor: 'bg-green-100 text-green-700'
    },
    {
      id: 'overdue' as StatusTab,
      name: 'Overdue',
      count: searchFilteredAssignments.filter(a => a.status === 'overdue').length,
      countColor: 'bg-red-100 text-red-700'
    }
  ]

  return (
    <div className="relative">
      <Card>
        <CardContent className="p-6 pb-0">
          {/* Status Filters */}
          <div className="grid grid-cols-5 gap-1 p-4 md:flex md:gap-2 md:overflow-x-auto">
            {tabs.map((tab) => {
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
                  <span className="leading-tight text-center md:mr-1 md:text-left">{tab.name}</span>
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full mt-1 md:mt-0 min-w-[20px] flex items-center justify-center",
                      isActive
                        ? "bg-blue-600 text-white"
                        : tab.countColor
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Desktop Table - hidden on mobile */}
          <div className="overflow-hidden -mx-6 -mt-px">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 pl-6">
                    <Checkbox
                      checked={selectedAssignments.length === filteredAssignments.length && filteredAssignments.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead className="w-12 pr-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => (
                  <TableRow
                    key={assignment.id}
                    className={cn(
                      "cursor-pointer hover:bg-gray-50 transition-colors",
                      selectedAssignments.includes(assignment.id) && "bg-blue-50 hover:bg-blue-100"
                    )}
                    onClick={(e) => {
                      // Don't trigger row selection if clicking on interactive elements
                      const target = e.target as HTMLElement
                      const isInteractive = target.closest('button, input, select, [role="combobox"], [role="button"]')
                      if (!isInteractive) {
                        toggleAssignmentSelection(assignment.id)
                      }
                    }}
                  >
                    <TableCell className="pl-6">
                      <Checkbox
                        checked={selectedAssignments.includes(assignment.id)}
                        onCheckedChange={() => toggleAssignmentSelection(assignment.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-gray-500">
                          {assignment.skills.slice(0, 2).join(', ')}
                          {assignment.skills.length > 2 && ` +${assignment.skills.length - 2} more`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(assignment.type)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(assignment)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDateRange(assignment.startDate, assignment.dueDate)}
                        </div>
                        {(() => {
                          const dueInfo = getDaysUntilDue(assignment.dueDate, assignment.studentsAssigned, assignment.studentsCompleted)
                          return (
                            <div className={`text-xs ${
                              dueInfo.isOverdue
                                ? 'text-red-600 font-medium'
                                : 'text-gray-500'
                            }`}>
                              {dueInfo.text}
                            </div>
                          )
                        })()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {assignment.studentsAssigned > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            {assignment.studentsCompleted}/{assignment.studentsAssigned}
                          </div>
                          <div className="w-full max-w-40 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(assignment.studentsCompleted / assignment.studentsAssigned) * 100}%`
                              }}
                            />
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.round((assignment.studentsCompleted / assignment.studentsAssigned) * 100)}% complete
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {assignment.avgScore !== null ? (
                        <div className="flex items-center">
                          <BarChart3 className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="font-medium">{assignment.avgScore}%</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No data</span>
                      )}
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit Assignment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Export Report
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Assignment
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
      {selectedAssignments.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-[calc(125px+50vw)] md:transform md:-translate-x-1/2 md:w-[calc(100vw-280px)] md:max-w-[800px] md:right-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4">
            <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <span className="text-sm font-medium text-gray-900">
                  {selectedAssignments.length} assignment{selectedAssignments.length === 1 ? '' : 's'} selected
                </span>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    Export Reports
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 w-full md:w-auto">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAssignments([])}
                className="text-gray-500 hover:text-gray-700 w-full md:w-auto"
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