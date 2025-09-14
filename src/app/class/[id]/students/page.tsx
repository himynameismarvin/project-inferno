'use client'

import { useParams } from 'next/navigation'
import { StudentsTable } from '@/components/features/students/students-table'
import { StudentsHeader } from '@/components/features/students/students-header'
import { StudentsStatusTabs } from '@/components/features/students/students-status-tabs'

export default function StudentsPage() {
  const params = useParams()
  const classId = params.id as string

  return (
    <div className="space-y-6">
      <StudentsHeader classId={classId} />
      <StudentsStatusTabs classId={classId} />
      <StudentsTable classId={classId} />
    </div>
  )
}