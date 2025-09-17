'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  Users,
  BookOpen,
  Trophy,
  Target,
  Clock,
  TrendingUp,
} from 'lucide-react'

interface ReportsNavigationProps {
  classId: string
}

const reportCategories = [
  {
    id: 'overview',
    name: 'Overview',
    icon: BarChart3,
    count: 4,
    active: true,
  },
  {
    id: 'student-progress',
    name: 'Student Progress',
    icon: Users,
    count: 12,
  },
  {
    id: 'curriculum',
    name: 'Curriculum',
    icon: BookOpen,
    count: 8,
  },
  {
    id: 'assignments',
    name: 'Assignments',
    icon: Target,
    count: 15,
  },
  {
    id: 'achievements',
    name: 'Achievements',
    icon: Trophy,
    count: 6,
  },
  {
    id: 'time-tracking',
    name: 'Time Tracking',
    icon: Clock,
    count: 3,
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: TrendingUp,
    count: 9,
  },
]

export function ReportsNavigation({ classId }: ReportsNavigationProps) {
  const [activeCategory, setActiveCategory] = useState('overview')

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          {reportCategories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id

            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="h-auto p-3 flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className="ml-1"
                >
                  {category.count}
                </Badge>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}