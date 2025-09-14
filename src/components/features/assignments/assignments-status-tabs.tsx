'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AssignmentsStatusTabsProps {
  classId: string
}

export function AssignmentsStatusTabs({ classId }: AssignmentsStatusTabsProps) {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    {
      id: 'all',
      label: 'All',
      count: 8,
      color: 'bg-gray-100 text-gray-700'
    },
    {
      id: 'active',
      label: 'Active',
      count: 3,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'draft',
      label: 'Draft',
      count: 2,
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'completed',
      label: 'Completed',
      count: 3,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'overdue',
      label: 'Overdue',
      count: 0,
      color: 'bg-red-100 text-red-700'
    }
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{tab.label}</span>
              <Badge
                variant="secondary"
                className={`ml-1 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : tab.color
                }`}
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}