import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../supabase'
import { Teacher } from '../types'

export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useTeacher() {
  const { data: session } = useAuth()

  return useQuery({
    queryKey: ['teacher', session?.user?.id],
    queryFn: async (): Promise<Teacher | null> => {
      if (!session?.user?.id) return null

      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // No rows returned
        throw error
      }

      return data
    },
    enabled: !!session?.user?.id,
  })
}

export function useSignIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      queryClient.invalidateQueries({ queryKey: ['teacher'] })
    },
  })
}

export function useSignUp() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      email,
      password,
      fullName,
      school
    }: {
      email: string;
      password: string;
      fullName?: string;
      school?: string;
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            school,
          }
        }
      })

      if (error) throw error

      // Create teacher profile
      if (data.user) {
        const { error: teacherError } = await supabase
          .from('teachers')
          .insert({
            id: data.user.id,
            email,
            full_name: fullName,
            school,
          })

        if (teacherError) throw teacherError
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      queryClient.invalidateQueries({ queryKey: ['teacher'] })
    },
  })
}

export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.clear() // Clear all cached data
    },
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updates: Partial<Teacher>) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('teachers')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacher', data.id] })
    },
  })
}