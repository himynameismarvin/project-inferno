-- Prodigy Teacher Portal Database Schema
-- Based on the Product Requirements Document

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Teachers table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  school TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  settings JSONB DEFAULT '{}'::jsonb
);

-- Classes table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  grade INTEGER CHECK (grade BETWEEN 1 AND 8),
  subject TEXT DEFAULT 'math' CHECK (subject IN ('math', 'english')),
  class_code TEXT UNIQUE NOT NULL,
  school_year TEXT,
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  settings JSONB DEFAULT '{}'::jsonb
);

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_initial TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  login_method TEXT[] DEFAULT ARRAY['prodigy'], -- ['prodigy', 'google', 'clever']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE
);

-- Class Enrollments (many-to-many relationship)
CREATE TABLE class_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  math_grade_override INTEGER CHECK (math_grade_override BETWEEN 1 AND 8),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  UNIQUE(class_id, student_id)
);

-- Assignments table
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'skills' CHECK (type IN ('skills', 'unlimited', 'placement')),
  skills JSONB DEFAULT '[]'::jsonb, -- Array of skill objects
  question_limit INTEGER,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived'))
);

-- Assignment Targets (for differentiation and specific student assignments)
CREATE TABLE assignment_targets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  custom_skills JSONB, -- For differentiation, overrides assignment.skills
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(assignment_id, student_id)
);

-- Student Performance (tracks real-time progress)
CREATE TABLE student_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- seconds
  last_activity TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT false,
  UNIQUE(student_id, assignment_id)
);

-- Real-time Student Activity (for online/offline status)
CREATE TABLE student_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_assignment_id UUID REFERENCES assignments(id) ON DELETE SET NULL,
  UNIQUE(student_id, class_id)
);

-- Indexes for performance
CREATE INDEX idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX idx_class_enrollments_class_id ON class_enrollments(class_id);
CREATE INDEX idx_class_enrollments_student_id ON class_enrollments(student_id);
CREATE INDEX idx_assignments_class_id ON assignments(class_id);
CREATE INDEX idx_assignment_targets_assignment_id ON assignment_targets(assignment_id);
CREATE INDEX idx_assignment_targets_student_id ON assignment_targets(student_id);
CREATE INDEX idx_student_performance_student_id ON student_performance(student_id);
CREATE INDEX idx_student_performance_assignment_id ON student_performance(assignment_id);
CREATE INDEX idx_student_activity_student_id ON student_activity(student_id);
CREATE INDEX idx_student_activity_class_id ON student_activity(class_id);
CREATE INDEX idx_students_username ON students(username);
CREATE INDEX idx_classes_class_code ON classes(class_code);

-- Row Level Security (RLS) Policies
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_activity ENABLE ROW LEVEL SECURITY;

-- Teachers can only access their own data
CREATE POLICY "Teachers can view own data" ON teachers
  FOR ALL USING (auth.uid()::text = id::text);

-- Teachers can only access their own classes
CREATE POLICY "Teachers can manage own classes" ON classes
  FOR ALL USING (teacher_id::text = auth.uid()::text);

-- Teachers can only access students in their classes
CREATE POLICY "Teachers can manage students in their classes" ON students
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM class_enrollments ce
      JOIN classes c ON c.id = ce.class_id
      WHERE ce.student_id = students.id
      AND c.teacher_id::text = auth.uid()::text
    )
  );

-- Similar policies for other tables...
CREATE POLICY "Teachers can manage enrollments in their classes" ON class_enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = class_enrollments.class_id
      AND c.teacher_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Teachers can manage assignments in their classes" ON assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = assignments.class_id
      AND c.teacher_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Teachers can manage assignment targets in their classes" ON assignment_targets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM assignments a
      JOIN classes c ON c.id = a.class_id
      WHERE a.id = assignment_targets.assignment_id
      AND c.teacher_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Teachers can view performance in their classes" ON student_performance
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM assignments a
      JOIN classes c ON c.id = a.class_id
      WHERE a.id = student_performance.assignment_id
      AND c.teacher_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Teachers can view activity in their classes" ON student_activity
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM classes c
      WHERE c.id = student_activity.class_id
      AND c.teacher_id::text = auth.uid()::text
    )
  );

-- Function to generate unique class codes
CREATE OR REPLACE FUNCTION generate_class_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check INTEGER;
BEGIN
  LOOP
    -- Generate 6-character alphanumeric code
    code := upper(substring(md5(random()::text) from 1 for 6));

    -- Check if code already exists
    SELECT COUNT(*) INTO exists_check FROM classes WHERE class_code = code;

    EXIT WHEN exists_check = 0;
  END LOOP;

  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function to update last_seen timestamp
CREATE OR REPLACE FUNCTION update_last_seen()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_seen = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update last_seen in student_activity
CREATE TRIGGER trigger_update_last_seen
  BEFORE UPDATE ON student_activity
  FOR EACH ROW
  EXECUTE FUNCTION update_last_seen();