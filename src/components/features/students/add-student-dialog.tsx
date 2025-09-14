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
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserPlus, RefreshCw } from 'lucide-react'

const addStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastInitial: z.string().min(1, 'Last initial is required').max(1, 'Only one character allowed'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type AddStudentForm = z.infer<typeof addStudentSchema>

interface AddStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classId: string
}

export function AddStudentDialog({
  open,
  onOpenChange,
  classId,
}: AddStudentDialogProps) {
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<AddStudentForm>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      firstName: '',
      lastInitial: '',
      username: '',
      password: '',
    },
  })

  const firstName = watch('firstName')
  const lastInitial = watch('lastInitial')

  // Auto-generate username when first name and last initial change
  const generateUsername = () => {
    if (firstName && lastInitial) {
      const username = `${firstName.toLowerCase()}.${lastInitial.toLowerCase()}.2024`
      setValue('username', username)
    }
  }

  // Generate random password
  const generatePassword = () => {
    const adjectives = ['happy', 'bright', 'clever', 'quick', 'brave', 'kind', 'smart']
    const nouns = ['cat', 'dog', 'star', 'moon', 'tree', 'bird', 'fish']
    const numbers = Math.floor(Math.random() * 999) + 100

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    const password = `${adjective}${noun}${numbers}`

    setValue('password', password)
  }

  const onSubmit = async (data: AddStudentForm) => {
    try {
      setError(null)

      // Here you would normally call your API to add the student
      console.log('Adding student:', data, 'to class:', classId)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      onOpenChange(false)
      reset()
    } catch (err: any) {
      setError(err.message || 'Failed to add student')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Add New Student
          </DialogTitle>
          <DialogDescription>
            Add a student to your class. Username and password will be generated automatically.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Emma"
                {...register('firstName')}
                onChange={(e) => {
                  register('firstName').onChange(e)
                  // Auto-generate username when typing
                  setTimeout(generateUsername, 100)
                }}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastInitial">Last Initial</Label>
              <Input
                id="lastInitial"
                placeholder="S"
                maxLength={1}
                {...register('lastInitial')}
                onChange={(e) => {
                  register('lastInitial').onChange(e)
                  // Auto-generate username when typing
                  setTimeout(generateUsername, 100)
                }}
                className="text-center"
              />
              {errors.lastInitial && (
                <p className="text-sm text-red-500">{errors.lastInitial.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="username">Username</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generateUsername}
                className="h-6 px-2 text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Generate
              </Button>
            </div>
            <Input
              id="username"
              placeholder="emma.s.2024"
              {...register('username')}
              className="font-mono"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generatePassword}
                className="h-6 px-2 text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Generate
              </Button>
            </div>
            <Input
              id="password"
              placeholder="rainbow123"
              {...register('password')}
              className="font-mono"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
            <p><strong>Note:</strong></p>
            <p>Students will use their username and password to log into Prodigy Math.</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Student...' : 'Add Student'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}