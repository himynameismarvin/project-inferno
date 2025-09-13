// Core data types for the Prodigy Teacher Portal
// These match the Supabase database schema

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
  skills?: Skill[]
  question_limit?: number
  start_date?: string
  end_date?: string
  created_at: string
  status: 'draft' | 'active' | 'completed' | 'archived'
}

export interface Skill {
  id: string
  name: string
  questions: number
}

export interface AssignmentTarget {
  id: string
  assignment_id: string
  student_id: string
  custom_skills?: Skill[]
  assigned_at: string
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

// Combined types for UI components
export interface StudentWithPerformance extends Student {
  performance?: StudentPerformance
  activity?: StudentActivity
  enrollment?: ClassEnrollment
}

export interface ClassWithStats extends Class {
  student_count: number
  active_students: number
  recent_activity: number
}

export interface AssignmentWithProgress extends Assignment {
  total_students: number
  completed_students: number
  average_score: number
  average_time: number
}

// Form types for creating/editing
export interface CreateClassForm {
  name: string
  grade: number
  subject: 'math' | 'english'
}

export interface CreateStudentForm {
  first_name: string
  last_initial: string
  username?: string
  password?: string
}

export interface CreateAssignmentForm {
  name: string
  type: 'skills' | 'unlimited' | 'placement'
  skills: Skill[]
  question_limit?: number
  start_date?: string
  end_date?: string
  student_ids: string[]
}