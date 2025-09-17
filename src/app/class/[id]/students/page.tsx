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
  loginMethods: ('prodigy' | 'google' | 'clever' | 'microsoft')[]
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
    loginMethods: ['prodigy', 'google'],
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
    loginMethods: ['google', 'microsoft', 'clever'],
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
    loginMethods: ['prodigy'],
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
    loginMethods: ['clever', 'prodigy', 'google', 'microsoft'],
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
    loginMethods: ['prodigy', 'microsoft'],
    device: 'desktop'
  }
]

export default function StudentsPage() {
  const params = useParams()
  const classId = params.id as string

  const totalStudents = students.length
  const onlineStudents = students.filter(s => s.isOnline).length
  const offlineStudents = students.filter(s => !s.isOnline).length

  return (
    <div className="space-y-6">
      <StudentsHeader
        classId={classId}
        totalStudents={totalStudents}
        onlineStudents={onlineStudents}
        offlineStudents={offlineStudents}
      />

      {/* Action Buttons Row */}
      <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
        <Button className="w-full lg:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add students
        </Button>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:space-x-3 xl:gap-0">
          <Button variant="outline" className="!hidden lg:!flex w-full lg:w-auto">
            <Activity className="mr-2 h-4 w-4" />
            Activity board
          </Button>
          <Button variant="outline" className="w-full xl:w-auto">
            <Eye className="mr-2 h-4 w-4" />
            View student logins
          </Button>
          <Button variant="outline" className="w-full xl:w-auto">
            <Printer className="mr-2 h-4 w-4" />
            Print parent letters
          </Button>
        </div>
      </div>

      <StudentsTable classId={classId} students={students} />

      {/* Bottom spacing to prevent bulk action bar from covering table */}
      <div className="h-12"></div>
    </div>
  )
}