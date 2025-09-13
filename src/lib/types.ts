// Core data types for the Prodigy Teacher Portal

export interface Teacher {
  id: string
  email: string
  full_name?: string
  school?: string
  created_at: string
  settings?: Record<string, any>
}

export interface Class {
  id: string
  teacher_id: string
  name: string
  grade: number // 1-8
  subject: 'math' | 'english'
  class_code: string
  school_year?: string
  archived: boolean
  created_at: string
  settings?: Record<string, any>
}

export interface Student {
  id: string
  first_name: string
  last_initial: string
  username: string
  password_hash: string
  login_method: string[]
  created_at: string
  last_active?: string
}

export interface ClassEnrollment {
  id: string
  class_id: string
  student_id: string
  enrolled_at: string
  math_grade_override?: number
  status: 'active' | 'inactive'
}

export interface Assignment {
  id: string
  class_id: string
  name: string
  type: 'skills' | 'unlimited' | 'placement'
  skills?: any[] // JSON array of skill objects
  question_limit?: number
  start_date?: string
  end_date?: string
  created_at: string
  status: 'draft' | 'active' | 'completed' | 'archived'
}

export interface StudentPerformance {
  id: string
  student_id: string
  assignment_id: string
  questions_answered: number
  correct_answers: number
  time_spent: number // seconds
  last_activity?: string
  completed: boolean
}

export interface StudentActivity {
  id: string
  student_id: string
  class_id: string
  online: boolean
  last_seen?: string
  current_assignment_id?: string
}