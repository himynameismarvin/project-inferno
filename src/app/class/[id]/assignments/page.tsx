'use client'

import { useParams } from 'next/navigation'
import { AssignmentsHeader } from '@/components/features/assignments/assignments-header'
import { AssignmentsStatusTabs } from '@/components/features/assignments/assignments-status-tabs'
import { AssignmentsTable } from '@/components/features/assignments/assignments-table'

export default function AssignmentsPage() {
  const params = useParams()
  const classId = params.id as string

  return (
    <div className="space-y-6">
      <AssignmentsHeader classId={classId} />
      <AssignmentsStatusTabs classId={classId} />
      <AssignmentsTable classId={classId} />
    </div>
  )
}