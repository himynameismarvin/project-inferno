'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ClipboardList, Plus } from 'lucide-react'

export default function AssignmentsPage() {
  const params = useParams()
  const classId = params.id as string

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Assignments
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Assignment Management
            </h3>
            <p className="text-gray-500 mb-4">
              This page will show assignment creation, management, and progress tracking.
            </p>
            <p className="text-sm text-gray-400">
              Coming in the next phase of development...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}