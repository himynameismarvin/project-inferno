'use client'

import { Button } from '@/components/ui/button'
import { useTeacher } from '@/lib/hooks/useAuth'
import { useClasses } from '@/lib/hooks/useClasses'
import { ClassCard } from '@/components/features/classes/class-card'
import { CreateClassDialog } from '@/components/features/classes/create-class-dialog'
import { Plus, BookOpen, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export default function ClassesPage() {
  const { data: teacher } = useTeacher()
  const { data: classes, isLoading, error } = useClasses(teacher?.id)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'math' | 'english'>('all')

  const filteredClasses = classes?.filter((classItem) => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.class_code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || classItem.subject === selectedSubject
    return matchesSearch && matchesSubject
  }) || []

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
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {teacher?.full_name || 'Teacher'}!
          </h1>
          <p className="text-gray-600 mt-1">
            You have {classes?.length || 0} classes • {classes?.reduce((sum, c) => sum + c.student_count, 0) || 0} total students
          </p>
        </div>
        <CreateClassDialog>
          <Button size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Create New Class
          </Button>
        </CreateClassDialog>
      </div>

      {/* Search and Filters */}
      {classes && classes.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search classes by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <div className="flex space-x-1">
              <Badge
                variant={selectedSubject === 'all' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSubject('all')}
              >
                All
              </Badge>
              <Badge
                variant={selectedSubject === 'math' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSubject('math')}
              >
                Math
              </Badge>
              <Badge
                variant={selectedSubject === 'english' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSubject('english')}
              >
                English
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {!classes || classes.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No classes yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Get started by creating your first class. You&apos;ll be able to add students, create assignments, and track progress.
          </p>
          <CreateClassDialog>
            <Button size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Class
            </Button>
          </CreateClassDialog>
        </div>
      ) : filteredClasses.length === 0 ? (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      )}
    </div>
  )
}