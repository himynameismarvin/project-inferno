'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateClass } from '@/lib/hooks/useClasses'
import { useTeacher } from '@/lib/hooks/useAuth'
import { Plus } from 'lucide-react'

const createClassSchema = z.object({
  name: z.string().min(2, 'Class name must be at least 2 characters'),
  grade: z.number().min(1).max(8),
  subject: z.enum(['math', 'english']),
})

type CreateClassForm = z.infer<typeof createClassSchema>

interface CreateClassDialogProps {
  children?: React.ReactNode
}

export function CreateClassDialog({ children }: CreateClassDialogProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: teacher } = useTeacher()
  const createClassMutation = useCreateClass()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateClassForm>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      subject: 'math',
      grade: 3,
    },
  })

  const selectedGrade = watch('grade')
  const selectedSubject = watch('subject')

  const onSubmit = async (data: CreateClassForm) => {
    if (!teacher?.id) {
      setError('Teacher information not available')
      return
    }

    try {
      setError(null)
      await createClassMutation.mutateAsync({
        ...data,
        teacherId: teacher.id,
      })

      setOpen(false)
      reset()
    } catch (err: any) {
      setError(err.message || 'Failed to create class')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Class
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>
            Set up a new class for your students. You can always edit these details later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Class Name</Label>
            <Input
              id="name"
              placeholder="e.g. Room 12A - Math Wizards"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade Level</Label>
              <Select
                value={selectedGrade?.toString()}
                onValueChange={(value) => setValue('grade', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.grade && (
                <p className="text-sm text-red-500">{errors.grade.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={selectedSubject}
                onValueChange={(value) => setValue('subject', value as 'math' | 'english')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
            <p><strong>Preview:</strong></p>
            <p>Grade {selectedGrade} {selectedSubject === 'math' ? 'Math' : 'English'}</p>
            <p>A unique class code will be generated automatically.</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || createClassMutation.isPending}
            >
              {(isSubmitting || createClassMutation.isPending) ? 'Creating...' : 'Create Class'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}