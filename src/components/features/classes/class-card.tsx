'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ClassWithStats } from '@/lib/types'
import {
  Users,
  MoreHorizontal,
  Edit2,
  Archive,
  Copy,
  ExternalLink,
  Calculator,
  BookOpen,
  Circle,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface ClassCardProps {
  classItem: ClassWithStats
}

export function ClassCard({ classItem }: ClassCardProps) {
  const { setCurrentClassId } = useAppStore()
  const [copied, setCopied] = useState(false)

  const handleEnterClass = () => {
    setCurrentClassId(classItem.id)
  }

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(classItem.class_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getSubjectIcon = () => {
    return classItem.subject === 'math' ? (
      <Calculator className="w-4 h-4" />
    ) : (
      <BookOpen className="w-4 h-4" />
    )
  }

  const getSubjectColor = () => {
    return classItem.subject === 'math' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight line-clamp-2 mb-2">
              {classItem.name}
            </CardTitle>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-xs">
                Grade {classItem.grade}
              </Badge>
              <Badge className={`text-xs ${getSubjectColor()}`}>
                <div className="flex items-center">
                  {getSubjectIcon()}
                  <span className="ml-1 capitalize">{classItem.subject}</span>
                </div>
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyCode}>
                <Copy className="mr-2 h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Class Code'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Class
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Archive className="mr-2 h-4 w-4" />
                Archive Class
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Class Code Display */}
        <div className="flex items-center space-x-2">
          <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-mono">
            {classItem.class_code}
          </div>
          <button
            onClick={handleCopyCode}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            {copied ? '✓' : 'Copy'}
          </button>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              <span>{classItem.student_count} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Circle className="w-2 h-2 fill-green-500 text-green-500" />
              <span className="text-xs text-gray-500">
                {classItem.active_students} online
              </span>
            </div>
          </div>

          {/* Activity Indicator */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Recent activity</span>
            <span>{classItem.recent_activity} actions today</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((classItem.recent_activity / 20) * 100, 100)}%`
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            asChild
            className="flex-1"
            onClick={handleEnterClass}
          >
            <Link href={`/class/${classItem.id}/dashboard` as any}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Enter Class
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link href={`/class/${classItem.id}/students` as any}>
              <Users className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Quick Info */}
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          Created {new Date(classItem.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}