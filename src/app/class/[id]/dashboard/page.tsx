'use client'

import { useParams } from 'next/navigation'
import { QuickStats } from '@/components/features/dashboard/quick-stats'
import { RecentActivity } from '@/components/features/dashboard/recent-activity'
import { AssignmentsWidget } from '@/components/features/dashboard/assignments-widget'
import { ClassChallengeCard } from '@/components/features/dashboard/class-challenge-card'
import { QuickActions } from '@/components/features/dashboard/quick-actions'

export default function ClassDashboardPage() {
  const params = useParams()
  const classId = params.id as string

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <QuickStats classId={classId} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <RecentActivity classId={classId} />
          <AssignmentsWidget classId={classId} />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <QuickActions classId={classId} />
          <ClassChallengeCard classId={classId} />
        </div>
      </div>
    </div>
  )
}