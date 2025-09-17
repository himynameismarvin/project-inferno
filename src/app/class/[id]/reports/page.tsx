'use client'

import { useParams } from 'next/navigation'
import { ReportsHeader } from '@/components/features/reports/reports-header'
import { CurriculumProgressCard } from '@/components/features/reports/curriculum-progress-card'
import { StudentActivityCard } from '@/components/features/reports/student-activity-card'
import { RecentAssignmentsList } from '@/components/features/reports/recent-assignments-list'
import { PlacementTestCard } from '@/components/features/reports/placement-test-card'
import { ReportsNavigation } from '@/components/features/reports/reports-navigation'

export default function ReportsPage() {
  const params = useParams()
  const classId = params.id as string

  return (
    <div className="space-y-6">
      <ReportsHeader classId={classId} />
      <ReportsNavigation classId={classId} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <CurriculumProgressCard classId={classId} />
          <StudentActivityCard classId={classId} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RecentAssignmentsList classId={classId} />
          <PlacementTestCard classId={classId} />
        </div>
      </div>
    </div>
  )
}