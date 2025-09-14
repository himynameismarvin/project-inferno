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
  FileText
} from 'lucide-react'

interface AssignmentsTableProps {
  classId: string
}

interface Assignment {
  id: string
  title: string
  type: 'Practice' | 'Assessment' | 'Placement' | 'Quiz'
  status: 'active' | 'draft' | 'completed' | 'overdue'
  dueDate: string
  createdDate: string
  studentsAssigned: number
  studentsCompleted: number
  avgScore: number | null
  skills: string[]
  duration: string
}

export function AssignmentsTable({ classId }: AssignmentsTableProps) {
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([])

  // Extended mock assignments data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Weekly Math Challenge',
      type: 'Practice',
      status: 'active',
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
      type: 'Assessment',
      status: 'active',
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
      type: 'Practice',
      status: 'active',
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
      type: 'Practice',
      status: 'draft',
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
      type: 'Assessment',
      status: 'completed',
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
      type: 'Quiz',
      status: 'overdue',
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
    if (selectedAssignments.length === assignments.length) {
      setSelectedAssignments([])
    } else {
      setSelectedAssignments(assignments.map(a => a.id))
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
        } else if (completionRate > 50) {
          return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>
        } else {
          return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Just Started</Badge>
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
    const colors = {
      Practice: 'bg-purple-100 text-purple-700',
      Assessment: 'bg-blue-100 text-blue-700',
      Placement: 'bg-green-100 text-green-700',
      Quiz: 'bg-yellow-100 text-yellow-700'
    }

    return (
      <Badge variant="outline" className={colors[type]}>
        {type}
      </Badge>
    )
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    if (diffDays > 1) return `Due in ${diffDays} days`
    return `${Math.abs(diffDays)} days overdue`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Bulk Actions Bar */}
        {selectedAssignments.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-blue-50 border-b">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedAssignments.length} assignments selected
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm">
                  Export Reports
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAssignments([])}
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
                  checked={selectedAssignments.length === assignments.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Avg Score</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
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
                      {formatDate(assignment.dueDate)}
                    </div>
                    <div className={`text-xs ${
                      assignment.status === 'overdue'
                        ? 'text-red-600 font-medium'
                        : 'text-gray-500'
                    }`}>
                      {getDaysUntilDue(assignment.dueDate)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {assignment.studentsAssigned > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        {assignment.studentsCompleted}/{assignment.studentsAssigned}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
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
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    {assignment.duration}
                  </div>
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
      </CardContent>
    </Card>
  )
}