'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ClassWithStats } from '@/lib/types'
import {
  Users,
  ExternalLink,
  Circle,
  Zap,
  Chrome,
  Settings,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface ClassCardProps {
  classItem: ClassWithStats
}

export function ClassCard({ classItem }: ClassCardProps) {
  const { setCurrentClassId } = useAppStore()

  const handleEnterClass = () => {
    setCurrentClassId(classItem.id)
  }


  const getProviderIcon = () => {
    if (!classItem.provider) return null

    switch (classItem.provider) {
      case 'clever':
        return <Zap className="w-4 h-4 text-orange-600" />
      case 'google_classroom':
        return <Chrome className="w-4 h-4 text-blue-600" />
      default:
        return null
    }
  }

  const formatSchoolYear = (schoolYear?: string) => {
    if (!schoolYear) return null
    // Convert format like "2024-2025" to "SY 2024-25"
    if (schoolYear.includes('-')) {
      const [startYear, endYear] = schoolYear.split('-')
      const abbreviatedEnd = endYear.slice(-2)
      return `SY ${startYear}-${abbreviatedEnd}`
    }
    return `SY ${schoolYear}`
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Top row: Grade and School Year badges */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Grade {classItem.grade}
                </Badge>
                {formatSchoolYear(classItem.school_year) && (
                  <Badge variant="outline" className="text-xs">
                    {formatSchoolYear(classItem.school_year)}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {getProviderIcon()}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Class name */}
            <CardTitle className="text-lg leading-tight line-clamp-2 mb-2">
              {classItem.name}
            </CardTitle>
          </div>
        </div>

      </CardHeader>

      <CardContent className="pt-2">
        {/* Stats */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <Link
              href={`/class/${classItem.id}/students` as any}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4 mr-1" />
              <span className="underline decoration-dotted underline-offset-2">
                {classItem.student_count} students
              </span>
            </Link>
            <div className="flex items-center space-x-1">
              <Circle className="w-2 h-2 fill-green-500 text-green-500" />
              <span className="text-xs text-gray-500">
                {classItem.active_students} online
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
          onClick={handleEnterClass}
        >
          <Link href={`/class/${classItem.id}/dashboard` as any}>
            Enter class
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}