import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Student, StudentWithPerformance, CreateStudentForm } from '../types'

// Generate unique username
function generateUsername(firstName: string, lastInitial: string): string {
  const base = `${firstName.toLowerCase()}_${lastInitial.toLowerCase()}_${new Date().getFullYear()}`
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${base}_${random}`
}

// Generate secure password
function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function useStudentsInClass(classId?: string) {
  return useQuery({
    queryKey: ['students', 'class', classId],
    queryFn: async (): Promise<StudentWithPerformance[]> => {
      const { data, error } = await supabase
        .from('class_enrollments')
        .select(`
          *,
          students!inner(*),
          student_activity(online, last_seen, current_assignment_id)
        `)
        .eq('class_id', classId)
        .eq('status', 'active')
        .order('students.first_name', { ascending: true })

      if (error) throw error

      return data.map(enrollment => ({
        ...enrollment.students,
        enrollment,
        activity: enrollment.student_activity?.[0],
      }))
    },
    enabled: !!classId,
  })
}

export function useStudent(studentId?: string) {
  return useQuery({
    queryKey: ['student', studentId],
    queryFn: async (): Promise<Student> => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!studentId,
  })
}

export function useCreateStudent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      studentData,
      classId
    }: {
      studentData: CreateStudentForm;
      classId: string
    }): Promise<Student> => {
      const username = studentData.username || generateUsername(studentData.first_name, studentData.last_initial)
      const password = studentData.password || generatePassword()

      // Hash password (in production, use proper password hashing)
      const passwordHash = `$2a$10$dummy_hash_${Math.random().toString(36).substring(7)}`

      // Create student
      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert({
          first_name: studentData.first_name,
          last_initial: studentData.last_initial,
          username,
          password_hash: passwordHash,
          login_method: ['prodigy'],
        })
        .select()
        .single()

      if (studentError) throw studentError

      // Enroll in class
      const { error: enrollmentError } = await supabase
        .from('class_enrollments')
        .insert({
          class_id: classId,
          student_id: student.id,
        })

      if (enrollmentError) throw enrollmentError

      // Create initial activity record
      const { error: activityError } = await supabase
        .from('student_activity')
        .insert({
          student_id: student.id,
          class_id: classId,
          online: false,
        })

      if (activityError) throw activityError

      return student
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['students', 'class', variables.classId] })
    },
  })
}

export function useUpdateStudent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      studentId,
      updates
    }: {
      studentId: string;
      updates: Partial<Student>
    }): Promise<Student> => {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', studentId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

export function useRemoveStudentFromClass() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ studentId, classId }: { studentId: string; classId: string }): Promise<void> => {
      const { error } = await supabase
        .from('class_enrollments')
        .update({ status: 'inactive' })
        .eq('student_id', studentId)
        .eq('class_id', classId)

      if (error) throw error
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['students', 'class', variables.classId] })
    },
  })
}

export function useBulkCreateStudents() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      studentsData,
      classId
    }: {
      studentsData: CreateStudentForm[];
      classId: string
    }): Promise<Student[]> => {
      const studentsToInsert = studentsData.map(studentData => {
        const username = studentData.username || generateUsername(studentData.first_name, studentData.last_initial)
        const password = studentData.password || generatePassword()
        const passwordHash = `$2a$10$dummy_hash_${Math.random().toString(36).substring(7)}`

        return {
          first_name: studentData.first_name,
          last_initial: studentData.last_initial,
          username,
          password_hash: passwordHash,
          login_method: ['prodigy'],
        }
      })

      // Create students
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .insert(studentsToInsert)
        .select()

      if (studentsError) throw studentsError

      // Create enrollments
      const enrollmentsToInsert = students.map(student => ({
        class_id: classId,
        student_id: student.id,
      }))

      const { error: enrollmentError } = await supabase
        .from('class_enrollments')
        .insert(enrollmentsToInsert)

      if (enrollmentError) throw enrollmentError

      // Create activity records
      const activitiesToInsert = students.map(student => ({
        student_id: student.id,
        class_id: classId,
        online: false,
      }))

      const { error: activityError } = await supabase
        .from('student_activity')
        .insert(activitiesToInsert)

      if (activityError) throw activityError

      return students
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['students', 'class', variables.classId] })
    },
  })
}