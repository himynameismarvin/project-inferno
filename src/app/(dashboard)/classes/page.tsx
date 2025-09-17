'use client'

import { Button } from '@/components/ui/button'
import { useTeacher } from '@/lib/hooks/useAuth'
import { useClasses } from '@/lib/hooks/useClasses'
import { ClassCard } from '@/components/features/classes/class-card'
import { CreateClassDialog } from '@/components/features/classes/create-class-dialog'
import { Plus, BookOpen, Search, ArrowUpDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export default function ClassesPage() {
  const { data: teacher } = useTeacher()
  const { data: classes, isLoading, error } = useClasses(teacher?.id)
  const { setCurrentClassId } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'date_created' | 'grade' | 'school_year' | 'provider'>('name')

  // Clear current class ID when on classes page
  useEffect(() => {
    setCurrentClassId(null)
  }, [setCurrentClassId])

  const filteredAndSortedClasses = classes
    ?.filter((classItem) => {
      const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           classItem.class_code.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
    ?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'date_created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime() // newest first
        case 'grade':
          return a.grade - b.grade
        case 'school_year':
          if (!a.school_year && !b.school_year) return 0
          if (!a.school_year) return 1
          if (!b.school_year) return -1
          return b.school_year.localeCompare(a.school_year) // newest year first
        case 'provider':
          if (!a.provider && !b.provider) return 0
          if (!a.provider) return 1
          if (!b.provider) return -1
          return a.provider.localeCompare(b.provider)
        default:
          return 0
      }
    }) || []

  const hasEnoughClassesForSearch = (classes?.length || 0) >= 10

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
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">A to Z</SelectItem>
                <SelectItem value="date_created">Date Created</SelectItem>
                <SelectItem value="grade">Grade</SelectItem>
                <SelectItem value="school_year">School Year</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CreateClassDialog>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create class
            </Button>
          </CreateClassDialog>
        </div>
      </div>

      {/* Search */}
      {classes && classes.length > 0 && hasEnoughClassesForSearch && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search classes by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Class
            </Button>
          </CreateClassDialog>
        </div>
      ) : filteredAndSortedClasses.length === 0 ? (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedClasses.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      )}
    </div>
  )
}