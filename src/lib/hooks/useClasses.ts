import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Class, ClassWithStats, CreateClassForm } from '../types'

// Generate unique class code
function generateClassCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function useClasses(teacherId?: string) {
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'

  return useQuery({
    queryKey: ['classes', teacherId, bypassAuth],
    queryFn: async (): Promise<ClassWithStats[]> => {
      // Return mock classes data when bypassing auth
      if (bypassAuth) {
        return [
          {
            id: 'mock-class-1',
            teacher_id: 'mock-teacher-id',
            name: 'Room 12A - Math Wizards',
            grade: 3,
            subject: 'math',
            class_code: 'ABC123',
            school_year: '2024-2025',
            archived: false,
            created_at: new Date().toISOString(),
            settings: {},
            student_count: 24,
            active_students: 8,
            recent_activity: 12
          },
          {
            id: 'mock-class-2',
            teacher_id: 'mock-teacher-id',
            name: 'Room 12B - Number Ninjas',
            grade: 3,
            subject: 'math',
            class_code: 'DEF456',
            school_year: '2024-2025',
            archived: false,
            created_at: new Date().toISOString(),
            settings: {},
            student_count: 18,
            active_students: 5,
            recent_activity: 7
          },
          {
            id: 'mock-class-3',
            teacher_id: 'mock-teacher-id',
            name: 'Grade 2 Reading Stars',
            grade: 2,
            subject: 'english',
            class_code: 'GHI789',
            school_year: '2024-2025',
            archived: false,
            created_at: new Date().toISOString(),
            settings: {},
            student_count: 22,
            active_students: 3,
            recent_activity: 15
          }
        ]
      }

      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          class_enrollments!inner(count)
        `)
        .eq('teacher_id', teacherId)
        .eq('archived', false)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform the data to include stats
      return data.map(classItem => ({
        ...classItem,
        student_count: classItem.class_enrollments?.[0]?.count || 0,
        active_students: 0, // Will be calculated with real-time data
        recent_activity: 0, // Will be calculated with real-time data
      }))
    },
    enabled: !!teacherId || bypassAuth,
  })
}

export function useClass(classId?: string) {
  return useQuery({
    queryKey: ['class', classId],
    queryFn: async (): Promise<Class> => {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('id', classId)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!classId,
  })
}

export function useCreateClass() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: CreateClassForm & { teacherId: string }): Promise<Class> => {
      const classCode = generateClassCode()

      const { data, error } = await supabase
        .from('classes')
        .insert({
          teacher_id: formData.teacherId,
          name: formData.name,
          grade: formData.grade,
          subject: formData.subject,
          class_code: classCode,
          school_year: '2024-2025', // Default for now
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['classes', data.teacher_id] })
    },
  })
}

export function useUpdateClass() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ classId, updates }: { classId: string; updates: Partial<Class> }): Promise<Class> => {
      const { data, error } = await supabase
        .from('classes')
        .update(updates)
        .eq('id', classId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['classes', data.teacher_id] })
      queryClient.invalidateQueries({ queryKey: ['class', data.id] })
    },
  })
}

export function useArchiveClass() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (classId: string): Promise<void> => {
      const { error } = await supabase
        .from('classes')
        .update({ archived: true })
        .eq('id', classId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    },
  })
}