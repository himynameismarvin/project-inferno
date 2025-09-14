'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  UserPlus,
  FileText,
  Send,
  Settings,
  Download
} from 'lucide-react'

interface QuickActionsProps {
  classId: string
}

export function QuickActions({ classId }: QuickActionsProps) {
  const actions = [
    {
      title: 'Create Assignment',
      description: 'Set up new practice or assessment',
      icon: Plus,
      onClick: () => console.log('Create assignment'),
      variant: 'default' as const
    },
    {
      title: 'Add Students',
      description: 'Invite or import new students',
      icon: UserPlus,
      onClick: () => console.log('Add students'),
      variant: 'outline' as const
    },
    {
      title: 'Generate Report',
      description: 'Create progress or activity report',
      icon: FileText,
      onClick: () => console.log('Generate report'),
      variant: 'outline' as const
    },
    {
      title: 'Send Message',
      description: 'Communicate with students or parents',
      icon: Send,
      onClick: () => console.log('Send message'),
      variant: 'outline' as const
    },
    {
      title: 'Class Settings',
      description: 'Manage class preferences',
      icon: Settings,
      onClick: () => console.log('Class settings'),
      variant: 'outline' as const
    },
    {
      title: 'Export Data',
      description: 'Download student progress data',
      icon: Download,
      onClick: () => console.log('Export data'),
      variant: 'outline' as const
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant={action.variant}
                className="w-full h-auto p-4 flex flex-col items-start space-y-2"
                onClick={action.onClick}
              >
                <div className="flex items-center w-full">
                  <Icon className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm opacity-70 font-normal">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}