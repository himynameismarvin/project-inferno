# Product Requirements Document
## Teacher Portal - Educational Web Application Prototype

**Version:** 2.0  
**Date:** January 2025  
**Status:** Final  
**Product Name:** Prodigy Teacher Portal Clone

---

## 1. Executive Summary

### 1.1 Purpose
Create a lightweight, modular clone of the Prodigy teacher portal that enables rapid prototyping and UX experimentation. This web application will serve teachers in grades 1-8, allowing them to manage classes, students, and assignments while monitoring real-time student performance data.

### 1.2 Technical Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript
- **UI Library:** shadcn/ui with Tailwind CSS
- **Backend/Auth:** Supabase (PostgreSQL + Auth + Realtime)
- **Visualizations:** Chart.js
- **Design System:** Component-based, easily themeable

### 1.3 Core Principles
- Non-technical teacher friendly (low tech literacy assumed)
- Responsive design (desktop-first, mobile-capable)
- Real-time data updates
- Modular, maintainable codebase
- WCAG AA compliant

---

## 2. Information Architecture

### 2.1 Navigation Structure
```
Root
├── Classes Overview (Landing page when logged in)
├── [Class Context] - When inside a specific class:
│   ├── Dashboard
│   ├── Assignments
│   ├── Reports  
│   └── Students
├── Account Settings
└── Help
```

### 2.2 Primary Navigation Components
- **Left Sidebar** (Persistent):
  - Prodigy logo → Classes overview
  - Class selector/switcher dropdown
  - Navigation items (context-aware)
  - "All classes" link
  - Help
  - User account menu

- **Top Bar**:
  - Class code display (when in class context)
  - Page title
  - Math/English subject toggle

---

## 3. Feature Specifications

### 3.1 Authentication & Onboarding
**Page:** Login/Signup
- Email/password authentication via Supabase
- Password reset flow
- New teacher onboarding wizard (Phase 2)

### 3.2 Classes Overview
**Page:** `/classes`
**Purpose:** Central hub for managing all teacher's classes

**Features:**
- **Class Cards Grid:**
  - Grade level badge
  - Class name
  - Student count indicator
  - Unique class code
  - Settings gear (edit/archive)
  - "Enter class" CTA button
  
- **Actions:**
  - Create new class
  - Toggle Active/Archived view
  - Search/filter classes (for teachers with many)

**Create Class Modal:**
- Class name (required)
- Grade level (1-8 dropdown)
- Subject (Math default / English)
- Auto-generate class code

### 3.3 Class Dashboard
**Page:** `/class/[id]/dashboard`
**Purpose:** Quick overview and actions for a specific class

**Components:**

1. **Reward Assignment Card**
   - Monthly themed challenge display
   - Quick assignment creation
   - Days remaining indicator
   - Call-to-action button

2. **Class Challenge Widget**
   - Live leaderboard position
   - Correct answers counter
   - Real-time updates
   - "Present live results" button

3. **Student Leaderboard Table**
   - Columns: Rank, Name, Correct Answered, Most Recent Activity, Actions
   - Time period selector (This week, Last week, This month, etc.)
   - Trophy icons for top 3
   - "Check who's online" feature with live status

4. **Quick Stats** (Phase 2):
   - Active students now
   - Assignments due this week
   - Students needing attention

### 3.4 Assignments Management
**Page:** `/class/[id]/assignments`
**Purpose:** Create and manage all assignments for the class

**List View Features:**
- **Assignment Table:**
  - Icon + Assignment name
  - Assigned to (All students / specific groups)
  - Date range
  - Status badge (In Progress / Ended)
  - View report action
  
- **Filters:**
  - All assignments / Active / Completed
  - Date range picker
  - Search by name

- **Actions:**
  - Create assignment button
  - Bulk actions (Phase 2)

### 3.5 Create Assignment Flow
**Page:** `/class/[id]/assignments/create`
**Purpose:** Multi-step assignment creation wizard

**Step 1: Basic Info & Skill Selection**
- Assignment name field
- Curriculum filter (Ontario, Common Core, etc.)
- Grade level filter
- Skill search bar
- **Skill Browser:**
  - Hierarchical categories (expandable)
  - Sub-skills with selection count
  - Visual preview of student experience
  - Up to 50 skills selectable

**Step 2: Skill Configuration**
- Selected skills list with checkboxes
- Questions per skill (+/- controls, default: 3)
- "Deselect all" option
- **Assignment Summary Panel:**
  - Total skills selected
  - Total questions
  - Estimated play time

**Step 3: Assignment Settings**
- **Question Limit Options:**
  - Fixed number of questions
  - Unlimited practice mode
  
- **Date/Time Settings:**
  - Start date & time
  - End date & time (optional)
  - Available immediately checkbox

**Step 4: Student Selection**
- **Assignment Target:**
  - All students (default)
  - Select specific students (checkbox list)
  - Create groups (Phase 2)
  
- **Differentiation** (Phase 2):
  - Different skills per student/group
  - Different question counts

**Final Step: Review & Assign**
- Summary of all settings
- Save as draft option
- Assign button

### 3.6 Students Management
**Page:** `/class/[id]/students`
**Purpose:** Manage class roster and student accounts

**Features:**
- **Action Bar:**
  - Add students button
  - Activity Board (Phase 2)
  - View student logins
  - Print parent letters (Phase 2)

- **Status Tabs:**
  - All
  - Online (real-time)
  - Offline
  - Never played

- **Student Table:**
  - Select checkbox
  - Name (First name, Last initial)
  - Username
  - Password (masked, click to reveal)
  - Login method icon (Prodigy/Google/Clever)
  - Last played date
  - Math grade override dropdown
  - Edit action

- **Bulk Actions:**
  - Select all
  - Remove selected
  - Move to different class
  - Reset passwords

### 3.7 Reports Overview
**Page:** `/class/[id]/reports`
**Purpose:** Access various reporting tools

**Report Cards:**
1. **Curriculum Progress**
   - Description text
   - Icon illustration
   - "View report" button

2. **Student Activity**
   - Description text
   - Icon illustration
   - "View report" button

3. **Recent Assignments**
   - List of last 3-5 assignments
   - Status badges
   - Quick view links
   - "View all assignments" link

4. **Placement Test**
   - Description text
   - Icon illustration
   - "View report" button

*Note: Detailed report views will be implemented in Phase 2*

### 3.8 Add Students Flow
**Options:**
1. **Individual Entry:**
   - First name
   - Last initial
   - Auto-generate username
   - Auto-generate password
   - Add another button

2. **Bulk Upload:**
   - CSV template download
   - File upload
   - Preview & validation
   - Confirm import

3. **Integration Import** (Phase 2):
   - Google Classroom sync
   - Clever sync

---

## 4. Data Models

### 4.1 Core Database Schema

```sql
-- Teachers
teachers (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  school text,
  created_at timestamp,
  settings jsonb
)

-- Classes
classes (
  id uuid PRIMARY KEY,
  teacher_id uuid REFERENCES teachers(id),
  name text NOT NULL,
  grade integer CHECK (grade BETWEEN 1 AND 8),
  subject text DEFAULT 'math',
  class_code text UNIQUE NOT NULL,
  school_year text,
  archived boolean DEFAULT false,
  created_at timestamp,
  settings jsonb
)

-- Students
students (
  id uuid PRIMARY KEY,
  first_name text NOT NULL,
  last_initial text NOT NULL,
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  login_method text[], -- ['prodigy', 'google', 'clever']
  created_at timestamp,
  last_active timestamp
)

-- Class Enrollments (many-to-many)
class_enrollments (
  id uuid PRIMARY KEY,
  class_id uuid REFERENCES classes(id),
  student_id uuid REFERENCES students(id),
  enrolled_at timestamp,
  math_grade_override integer,
  status text DEFAULT 'active',
  UNIQUE(class_id, student_id)
)

-- Assignments
assignments (
  id uuid PRIMARY KEY,
  class_id uuid REFERENCES classes(id),
  name text NOT NULL,
  type text, -- 'skills', 'unlimited', 'placement'
  skills jsonb, -- Array of skill objects
  question_limit integer,
  start_date timestamp,
  end_date timestamp,
  created_at timestamp,
  status text DEFAULT 'draft'
)

-- Assignment Targets
assignment_targets (
  id uuid PRIMARY KEY,
  assignment_id uuid REFERENCES assignments(id),
  student_id uuid REFERENCES students(id),
  custom_skills jsonb, -- For differentiation
  assigned_at timestamp
)

-- Student Performance (Real-time updates)
student_performance (
  id uuid PRIMARY KEY,
  student_id uuid REFERENCES students(id),
  assignment_id uuid REFERENCES assignments(id),
  questions_answered integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  time_spent integer DEFAULT 0, -- seconds
  last_activity timestamp,
  completed boolean DEFAULT false
)

-- Real-time Activity
student_activity (
  id uuid PRIMARY KEY,
  student_id uuid REFERENCES students(id),
  class_id uuid REFERENCES classes(id),
  online boolean DEFAULT false,
  last_seen timestamp,
  current_assignment_id uuid
)
```

### 4.2 Mock Data Requirements
- Generate 3-6 classes per teacher
- 10-30 students per class with realistic name distribution
- Normal distribution for performance metrics
- 20% of students showing "struggling" patterns
- Realistic time-based activity (peak during school hours)
- Various assignment completion states

---

## 5. Technical Implementation

### 5.1 Project Structure
```
/app
  /(auth)
    /login
    /signup
  /(dashboard)
    /classes
    /class/[id]
      /dashboard
      /assignments
        /create
      /reports
      /students
/components
  /ui (shadcn components)
  /features
    /classes
    /assignments
    /students
    /reports
/lib
  /supabase
  /utils
  /hooks
/styles
  /tokens (design system)
```

### 5.2 Real-time Features
- Student online/offline status
- Live assignment progress
- Class challenge updates
- Active student count

### 5.3 State Management
- Server state: React Query / SWR for caching
- Client state: Zustand for UI state
- Real-time: Supabase subscriptions

### 5.4 Performance Requirements
- Initial page load: < 2 seconds
- Navigation between pages: < 500ms
- Real-time updates: < 1 second latency
- Support 100+ concurrent users

---

## 6. Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Next.js + Supabase setup
- [ ] Authentication flow
- [ ] Design system setup (colors, typography, spacing)
- [ ] Base layout (sidebar, top bar)
- [ ] Classes overview page
- [ ] Create/edit class

### Phase 2: Core Class Features (Week 2)
- [ ] Class dashboard with static data
- [ ] Students page (list, add individual)
- [ ] Basic assignments list
- [ ] Navigation between class contexts

### Phase 3: Assignment Creation (Week 3)
- [ ] Multi-step assignment wizard
- [ ] Skill selection interface
- [ ] Assignment settings
- [ ] Student selection
- [ ] Save and assign flow

### Phase 4: Real-time & Polish (Week 4)
- [ ] Real-time student status
- [ ] Live performance updates
- [ ] Mock data generators
- [ ] Responsive design fixes
- [ ] Loading states and error handling

### Phase 5: Extended Features (As Needed)
- [ ] Bulk student import
- [ ] Report detail views
- [ ] Google Classroom / Clever integration
- [ ] Reward assignments
- [ ] Class challenges
- [ ] Activity board

---

## 7. Success Criteria

### 7.1 Functional Requirements
- [ ] Teacher can create account and login
- [ ] Teacher can create multiple classes
- [ ] Teacher can add students individually
- [ ] Teacher can create skill-based assignments
- [ ] Teacher can view student list with status
- [ ] Real-time updates working
- [ ] Responsive on tablet/mobile

### 7.2 Non-Functional Requirements
- [ ] WCAG AA compliant
- [ ] Page loads under 2 seconds
- [ ] Modular, maintainable code
- [ ] Comprehensive error handling
- [ ] Smooth animations/transitions

### 7.3 Prototype Goals
- Easy to modify UI/UX flows
- Quick to test new features
- Realistic data patterns
- Stable for user testing
- Clear separation of concerns

---

## 8. Future Considerations

### Near-term Additions
- Detailed report views
- Bulk import workflows
- Parent communication tools
- Integration setup flows
- Advanced differentiation

### Experimentation Areas
- Dashboard layout variations
- Insight discovery methods
- Onboarding flow optimization
- Mobile-specific features
- Gamification depth

---

## Appendix: Component Library Requirements

### Core Components Needed
- **Navigation:** Sidebar, TopBar, Breadcrumbs
- **Data Display:** Table, Card, StatCard, Badge
- **Forms:** Input, Select, Checkbox, Radio, DatePicker
- **Feedback:** Alert, Toast, Modal, Loading
- **Charts:** LineChart, BarChart, PieChart
- **Custom:** StudentStatus, SkillSelector, AssignmentCard