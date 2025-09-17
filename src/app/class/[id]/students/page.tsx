'use client'

import { useParams } from 'next/navigation'
import { StudentsTable } from '@/components/features/students/students-table'
import { StudentsHeader } from '@/components/features/students/students-header'
import { StudentsActions } from '@/components/features/students/students-actions'
import { Button } from '@/components/ui/button'
import { UserPlus, Activity, Eye, Printer } from 'lucide-react'

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

// Mock student data
const students: Student[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastInitial: 'S',
    username: 'EmmaS42',
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
    username: 'JakeM92',
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
    username: 'SophiaL156',
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
    username: 'MichaelR3',
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
    username: 'AvaK240',
    password: 'unicorn555',
    isOnline: true,
    lastPlayed: 'Just now',
    gradeOverride: null,
    loginMethod: 'prodigy',
    device: 'desktop'
  }
]

export default function StudentsPage() {
  const params = useParams()
  const classId = params.id as string

  const totalStudents = students.length
  const onlineStudents = students.filter(s => s.isOnline).length
  const offlineStudents = students.filter(s => !s.isOnline).length
  const lastActivity = students
    .filter(s => s.lastPlayed && s.lastPlayed !== 'Yesterday')
    .sort((a, b) => {
      // Simple sort by recency - in real app would use actual timestamps
      if (a.lastPlayed?.includes('Just now')) return -1
      if (b.lastPlayed?.includes('Just now')) return 1
      if (a.lastPlayed?.includes('minute')) return -1
      if (b.lastPlayed?.includes('minute')) return 1
      return 0
    })[0]?.lastPlayed || 'No recent activity'

  return (
    <div className="space-y-6">
      <StudentsHeader
        classId={classId}
        totalStudents={totalStudents}
        onlineStudents={onlineStudents}
        offlineStudents={offlineStudents}
        lastActivity={lastActivity}
      />

      {/* Action Buttons Row */}
      <div className="flex items-center space-x-3">
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add students
        </Button>
        <Button variant="outline">
          <Activity className="mr-2 h-4 w-4" />
          Activity board
        </Button>
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          View student logins
        </Button>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print parent letters
        </Button>
      </div>

      <StudentsTable classId={classId} students={students} />
    </div>
  )
}