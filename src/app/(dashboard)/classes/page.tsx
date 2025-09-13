'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTeacher } from '@/lib/hooks/useAuth'
import { useClasses } from '@/lib/hooks/useClasses'
import { Plus, Users, BookOpen } from 'lucide-react'

export default function ClassesPage() {
  const { data: teacher } = useTeacher()
  const { data: classes, isLoading, error } = useClasses(teacher?.id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">
          Error loading classes: {error.message}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {teacher?.full_name || 'Teacher'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your classes and track student progress
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Class
        </Button>
      </div>

      {!classes || classes.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No classes</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first class.
          </p>
          <div className="mt-6">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Class
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription>
                      Grade {classItem.grade} • {classItem.subject === 'math' ? 'Math' : 'English'}
                    </CardDescription>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {classItem.class_code}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {classItem.student_count} students
                  </div>
                  <div className="text-xs text-gray-500">
                    {classItem.active_students} online
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Enter Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}