'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AssignmentsHeader } from '@/components/features/assignments/assignments-header'
import { AssignmentsTable } from '@/components/features/assignments/assignments-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Search,
  Filter,
  Calendar
} from 'lucide-react'

export default function AssignmentsPage() {
  const params = useParams()
  const router = useRouter()
  const classId = params.id as string
  const [searchQuery, setSearchQuery] = useState('')

  const handleCreateAssignment = () => {
    router.push(`/class/${classId}/assignments/create`)
  }

  return (
    <div className="space-y-6">
      <AssignmentsHeader classId={classId} />

      {/* Action Buttons Row */}
      <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
          <Button className="w-full lg:w-auto" onClick={handleCreateAssignment}>
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
          <Button variant="outline" className="w-full lg:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-64"
            />
          </div>

          {/* Filter Button */}
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <AssignmentsTable classId={classId} searchQuery={searchQuery} />

      {/* Bottom spacing to prevent bulk action bar from covering table */}
      <div className="h-12"></div>
    </div>
  )
}