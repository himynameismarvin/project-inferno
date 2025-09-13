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
  return useQuery({
    queryKey: ['classes', teacherId],
    queryFn: async (): Promise<ClassWithStats[]> => {
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
    enabled: !!teacherId,
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