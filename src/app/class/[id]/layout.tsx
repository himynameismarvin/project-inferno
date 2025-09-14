'use client'

import { ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import { ClassTabs } from '@/components/features/classes/class-tabs'
import { useClassById } from '@/lib/hooks/useClasses'
import { Card } from '@/components/ui/card'

interface ClassLayoutProps {
  children: ReactNode
}

export default function ClassLayout({ children }: ClassLayoutProps) {
  const params = useParams()
  const classId = params.id as string
  const { data: classData, isLoading } = useClassById(classId)

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AppLayout>
    )
  }

  if (!classData) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Class Not Found</h1>
          <p className="text-gray-600">The class you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Class Header */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {classData.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Grade {classData.grade}</span>
                <span>•</span>
                <span className="capitalize">{classData.subject}</span>
                <span>•</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {classData.class_code}
                </span>
                <span>•</span>
                <span>{classData.student_count} students</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Class Navigation */}
        <ClassTabs classId={classId} />

        {/* Page Content */}
        {children}
      </div>
    </AppLayout>
  )
}