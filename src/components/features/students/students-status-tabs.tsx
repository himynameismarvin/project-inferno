'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Circle, Users, UserX, Clock } from 'lucide-react'

interface StudentsStatusTabsProps {
  classId: string
}

type StatusTab = 'all' | 'online' | 'offline' | 'never_played'

export function StudentsStatusTabs({ classId }: StudentsStatusTabsProps) {
  const [activeTab, setActiveTab] = useState<StatusTab>('all')

  const tabs = [
    {
      id: 'all' as StatusTab,
      name: 'All',
      count: 24,
      icon: Users,
      color: 'text-gray-600'
    },
    {
      id: 'online' as StatusTab,
      name: 'Online',
      count: 8,
      icon: Circle,
      color: 'text-green-600'
    },
    {
      id: 'offline' as StatusTab,
      name: 'Offline',
      count: 14,
      icon: UserX,
      color: 'text-gray-600'
    },
    {
      id: 'never_played' as StatusTab,
      name: 'Never Played',
      count: 2,
      icon: Clock,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg border border-gray-200">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors",
              isActive
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4",
                tab.id === 'online' && isActive && "text-green-600",
                tab.id === 'online' && !isActive && "text-green-500",
                tab.id === 'never_played' && "text-orange-500"
              )}
            />
            <span>{tab.name}</span>
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={cn(
                "ml-1",
                isActive && "bg-blue-600 text-white"
              )}
            >
              {tab.count}
            </Badge>
          </button>
        )
      })}
    </div>
  )
}