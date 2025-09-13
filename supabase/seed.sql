-- Mock Data for Prodigy Teacher Portal
-- This file creates realistic test data for development

-- Insert sample teachers
INSERT INTO teachers (id, email, full_name, school, settings) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'sarah.johnson@example.com', 'Sarah Johnson', 'Maple Elementary School', '{"theme": "light", "notifications": true}'),
  ('550e8400-e29b-41d4-a716-446655440002', 'mike.chen@example.com', 'Mike Chen', 'Oak Ridge Elementary', '{"theme": "dark", "notifications": false}'),
  ('550e8400-e29b-41d4-a716-446655440003', 'emily.davis@example.com', 'Emily Davis', 'Sunrise Middle School', '{"theme": "light", "notifications": true}');

-- Insert sample classes
INSERT INTO classes (id, teacher_id, name, grade, subject, class_code, school_year, archived) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Room 12A - Math Wizards', 3, 'math', 'ABC123', '2024-2025', false),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Room 12B - Number Ninjas', 3, 'math', 'DEF456', '2024-2025', false),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Grade 2 Reading Stars', 2, 'english', 'GHI789', '2024-2025', false),
  ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Grade 5 Math Masters', 5, 'math', 'JKL012', '2024-2025', false),
  ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Advanced Math 6', 6, 'math', 'MNO345', '2024-2025', false),
  ('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'Grade 7 Pre-Algebra', 7, 'math', 'PQR678', '2024-2025', false);

-- Insert sample students with realistic names
INSERT INTO students (id, first_name, last_initial, username, password_hash, login_method) VALUES
  -- Class 1 students (Grade 3 Math Wizards)
  ('750e8400-e29b-41d4-a716-446655440001', 'Emma', 'S', 'emma_s_2024', '$2a$10$dummy_hash_1', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440002', 'Liam', 'J', 'liam_j_2024', '$2a$10$dummy_hash_2', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440003', 'Olivia', 'B', 'olivia_b_2024', '$2a$10$dummy_hash_3', ARRAY['google']),
  ('750e8400-e29b-41d4-a716-446655440004', 'Noah', 'W', 'noah_w_2024', '$2a$10$dummy_hash_4', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440005', 'Ava', 'M', 'ava_m_2024', '$2a$10$dummy_hash_5', ARRAY['clever']),
  ('750e8400-e29b-41d4-a716-446655440006', 'Ethan', 'D', 'ethan_d_2024', '$2a$10$dummy_hash_6', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440007', 'Sophia', 'T', 'sophia_t_2024', '$2a$10$dummy_hash_7', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440008', 'Mason', 'H', 'mason_h_2024', '$2a$10$dummy_hash_8', ARRAY['google']),
  ('750e8400-e29b-41d4-a716-446655440009', 'Isabella', 'L', 'isabella_l_2024', '$2a$10$dummy_hash_9', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-44665544000A', 'William', 'K', 'william_k_2024', '$2a$10$dummy_hash_10', ARRAY['prodigy']),

  -- Class 2 students (Grade 3 Number Ninjas)
  ('750e8400-e29b-41d4-a716-44665544000B', 'Charlotte', 'R', 'charlotte_r_2024', '$2a$10$dummy_hash_11', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-44665544000C', 'James', 'P', 'james_p_2024', '$2a$10$dummy_hash_12', ARRAY['clever']),
  ('750e8400-e29b-41d4-a716-44665544000D', 'Amelia', 'G', 'amelia_g_2024', '$2a$10$dummy_hash_13', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-44665544000E', 'Benjamin', 'N', 'benjamin_n_2024', '$2a$10$dummy_hash_14', ARRAY['google']),
  ('750e8400-e29b-41d4-a716-44665544000F', 'Mia', 'V', 'mia_v_2024', '$2a$10$dummy_hash_15', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440010', 'Lucas', 'C', 'lucas_c_2024', '$2a$10$dummy_hash_16', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440011', 'Harper', 'F', 'harper_f_2024', '$2a$10$dummy_hash_17', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440012', 'Henry', 'Y', 'henry_y_2024', '$2a$10$dummy_hash_18', ARRAY['clever']),

  -- More students for other classes...
  ('750e8400-e29b-41d4-a716-446655440013', 'Evelyn', 'A', 'evelyn_a_2024', '$2a$10$dummy_hash_19', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440014', 'Alexander', 'Z', 'alexander_z_2024', '$2a$10$dummy_hash_20', ARRAY['google']),
  ('750e8400-e29b-41d4-a716-446655440015', 'Abigail', 'Q', 'abigail_q_2024', '$2a$10$dummy_hash_21', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440016', 'Michael', 'X', 'michael_x_2024', '$2a$10$dummy_hash_22', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440017', 'Elizabeth', 'U', 'elizabeth_u_2024', '$2a$10$dummy_hash_23', ARRAY['prodigy']),
  ('750e8400-e29b-41d4-a716-446655440018', 'Daniel', 'I', 'daniel_i_2024', '$2a$10$dummy_hash_24', ARRAY['clever']);

-- Enroll students in classes
INSERT INTO class_enrollments (class_id, student_id, math_grade_override, status) VALUES
  -- Grade 3 Math Wizards (10 students)
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440002', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440003', 2, 'active'), -- Grade override
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440004', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440005', 4, 'active'), -- Advanced student
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440006', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440007', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440008', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440009', 2, 'active'), -- Needs support
  ('650e8400-e29b-41d4-a716-44665544000A', '750e8400-e29b-41d4-a716-44665544000A', NULL, 'active'),

  -- Grade 3 Number Ninjas (8 students)
  ('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-44665544000B', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-44665544000C', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-44665544000D', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-44665544000E', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-44665544000F', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440010', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440011', NULL, 'active'),
  ('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440012', NULL, 'active');

-- Insert sample assignments
INSERT INTO assignments (id, class_id, name, type, skills, question_limit, start_date, end_date, status) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'Addition and Subtraction Practice', 'skills',
   '[{"id": "add_sub_3", "name": "Addition and Subtraction within 100", "questions": 5}, {"id": "word_prob_3", "name": "Word Problems", "questions": 3}]'::jsonb,
   20, NOW() - INTERVAL '7 days', NOW() + INTERVAL '7 days', 'active'),

  ('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'Multiplication Tables 1-5', 'skills',
   '[{"id": "mult_1_5", "name": "Multiplication Tables 1-5", "questions": 10}]'::jsonb,
   30, NOW() - INTERVAL '3 days', NOW() + INTERVAL '10 days', 'active'),

  ('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', 'Number Sense Assessment', 'placement',
   '[]'::jsonb, 50, NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 days', 'active');

-- Insert assignment targets (all students get the default assignment)
INSERT INTO assignment_targets (assignment_id, student_id)
SELECT a.id, ce.student_id
FROM assignments a
JOIN classes c ON c.id = a.class_id
JOIN class_enrollments ce ON ce.class_id = c.id
WHERE a.id IN ('850e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440003');

-- Insert realistic student performance data
INSERT INTO student_performance (student_id, assignment_id, questions_answered, correct_answers, time_spent, last_activity, completed) VALUES
  -- High performing students
  ('750e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 20, 18, 1200, NOW() - INTERVAL '2 hours', true),
  ('750e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440001', 20, 20, 900, NOW() - INTERVAL '1 hour', true),
  ('750e8400-e29b-41d4-a716-446655440007', '850e8400-e29b-41d4-a716-446655440001', 20, 19, 1100, NOW() - INTERVAL '3 hours', true),

  -- Average performing students
  ('750e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001', 15, 11, 1800, NOW() - INTERVAL '1 day', false),
  ('750e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440001', 18, 13, 2100, NOW() - INTERVAL '4 hours', false),
  ('750e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440001', 20, 15, 2400, NOW() - INTERVAL '1 day', true),

  -- Struggling students
  ('750e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 8, 4, 1500, NOW() - INTERVAL '2 days', false),
  ('750e8400-e29b-41d4-a716-446655440009', '850e8400-e29b-41d4-a716-446655440001', 6, 3, 1200, NOW() - INTERVAL '3 days', false),

  -- Haven't started yet
  ('750e8400-e29b-41d4-a716-446655440008', '850e8400-e29b-41d4-a716-446655440001', 0, 0, 0, NULL, false),
  ('750e8400-e29b-41d4-a716-44665544000A', '850e8400-e29b-41d4-a716-446655440001', 0, 0, 0, NULL, false);

-- Insert student activity (online/offline status)
INSERT INTO student_activity (student_id, class_id, online, last_seen, current_assignment_id) VALUES
  -- Currently online students
  ('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', true, NOW() - INTERVAL '5 minutes', '850e8400-e29b-41d4-a716-446655440002'),
  ('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', true, NOW() - INTERVAL '2 minutes', '850e8400-e29b-41d4-a716-446655440001'),
  ('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440001', true, NOW() - INTERVAL '1 minute', NULL),

  -- Recently offline students
  ('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', false, NOW() - INTERVAL '30 minutes', NULL),
  ('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440001', false, NOW() - INTERVAL '2 hours', '850e8400-e29b-41d4-a716-446655440001'),
  ('750e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440001', false, NOW() - INTERVAL '4 hours', NULL),
  ('750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440001', false, NOW() - INTERVAL '1 day', NULL),

  -- Long-time offline students
  ('750e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440001', false, NOW() - INTERVAL '3 days', NULL),
  ('750e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440001', false, NOW() - INTERVAL '1 week', NULL),
  ('750e8400-e29b-41d4-a716-44665544000A', '650e8400-e29b-41d4-a716-446655440001', false, NOW() - INTERVAL '2 weeks', NULL);

-- Update some students' last_active timestamps
UPDATE students SET last_active = NOW() - INTERVAL '5 minutes' WHERE id = '750e8400-e29b-41d4-a716-446655440001';
UPDATE students SET last_active = NOW() - INTERVAL '2 minutes' WHERE id = '750e8400-e29b-41d4-a716-446655440002';
UPDATE students SET last_active = NOW() - INTERVAL '1 minute' WHERE id = '750e8400-e29b-41d4-a716-446655440005';
UPDATE students SET last_active = NOW() - INTERVAL '30 minutes' WHERE id = '750e8400-e29b-41d4-a716-446655440003';
UPDATE students SET last_active = NOW() - INTERVAL '2 hours' WHERE id = '750e8400-e29b-41d4-a716-446655440004';