import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Assignment, AssignmentWithProgress, CreateAssignmentForm, StudentPerformance } from '../types'

export function useAssignments(classId?: string) {
  return useQuery({
    queryKey: ['assignments', 'class', classId],
    queryFn: async (): Promise<AssignmentWithProgress[]> => {
      const { data, error } = await supabase
        .from('assignments')
        .select(`
          *,
          assignment_targets(count),
          student_performance(
            completed,
            correct_answers,
            questions_answered,
            time_spent
          )
        `)
        .eq('class_id', classId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(assignment => {
        const performances = assignment.student_performance || []
        const totalStudents = assignment.assignment_targets?.[0]?.count || 0
        const completedStudents = performances.filter((p: any) => p.completed).length
        const totalCorrect = performances.reduce((sum: number, p: any) => sum + p.correct_answers, 0)
        const totalAnswered = performances.reduce((sum: number, p: any) => sum + p.questions_answered, 0)
        const totalTime = performances.reduce((sum: number, p: any) => sum + p.time_spent, 0)

        return {
          ...assignment,
          total_students: totalStudents,
          completed_students: completedStudents,
          average_score: totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0,
          average_time: performances.length > 0 ? totalTime / performances.length : 0,
        }
      })
    },
    enabled: !!classId,
  })
}

export function useAssignment(assignmentId?: string) {
  return useQuery({
    queryKey: ['assignment', assignmentId],
    queryFn: async (): Promise<Assignment> => {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('id', assignmentId)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!assignmentId,
  })
}

export function useAssignmentPerformance(assignmentId?: string) {
  return useQuery({
    queryKey: ['assignment', assignmentId, 'performance'],
    queryFn: async (): Promise<StudentPerformance[]> => {
      const { data, error } = await supabase
        .from('student_performance')
        .select(`
          *,
          students(first_name, last_initial),
          student_activity(online)
        `)
        .eq('assignment_id', assignmentId)
        .order('correct_answers', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!assignmentId,
  })
}

export function useCreateAssignment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: CreateAssignmentForm & { classId: string }): Promise<Assignment> => {
      const { data: assignment, error: assignmentError } = await supabase
        .from('assignments')
        .insert({
          class_id: formData.classId,
          name: formData.name,
          type: formData.type,
          skills: formData.skills,
          question_limit: formData.question_limit,
          start_date: formData.start_date,
          end_date: formData.end_date,
          status: 'active',
        })
        .select()
        .single()

      if (assignmentError) throw assignmentError

      // Create assignment targets for selected students
      if (formData.student_ids.length > 0) {
        const targets = formData.student_ids.map(studentId => ({
          assignment_id: assignment.id,
          student_id: studentId,
        }))

        const { error: targetsError } = await supabase
          .from('assignment_targets')
          .insert(targets)

        if (targetsError) throw targetsError

        // Initialize performance records
        const performances = formData.student_ids.map(studentId => ({
          student_id: studentId,
          assignment_id: assignment.id,
          questions_answered: 0,
          correct_answers: 0,
          time_spent: 0,
          completed: false,
        }))

        const { error: performancesError } = await supabase
          .from('student_performance')
          .insert(performances)

        if (performancesError) throw performancesError
      }

      return assignment
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['assignments', 'class', data.class_id] })
    },
  })
}

export function useUpdateAssignment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      assignmentId,
      updates
    }: {
      assignmentId: string;
      updates: Partial<Assignment>
    }): Promise<Assignment> => {
      const { data, error } = await supabase
        .from('assignments')
        .update(updates)
        .eq('id', assignmentId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['assignments', 'class', data.class_id] })
      queryClient.invalidateQueries({ queryKey: ['assignment', data.id] })
    },
  })
}

export function useDeleteAssignment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (assignmentId: string): Promise<void> => {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', assignmentId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] })
    },
  })
}