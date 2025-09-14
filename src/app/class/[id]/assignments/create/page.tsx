'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  X
} from 'lucide-react'
import { AssignmentBasicInfoStep } from '@/components/features/assignments/wizard-steps/assignment-basic-info-step'
import { AssignmentSkillConfigStep } from '@/components/features/assignments/wizard-steps/assignment-skill-config-step'
import { AssignmentSettingsStep } from '@/components/features/assignments/wizard-steps/assignment-settings-step'
import { AssignmentStudentSelectionStep } from '@/components/features/assignments/wizard-steps/assignment-student-selection-step'
import { AssignmentReviewStep } from '@/components/features/assignments/wizard-steps/assignment-review-step'

interface AssignmentFormData {
  // Step 1: Basic Info
  title: string
  description: string
  type: 'Practice' | 'Assessment' | 'Placement' | 'Quiz'
  selectedSkills: string[]

  // Step 2: Skill Configuration
  skillConfigs: Record<string, {
    questionCount: number
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Adaptive'
    timeLimit?: number
  }>

  // Step 3: Settings
  dueDate: Date | null
  startDate: Date | null
  timeLimit: number | null
  attemptsAllowed: number
  showCorrectAnswers: boolean
  shuffleQuestions: boolean

  // Step 4: Student Selection
  selectedStudents: string[]
  differentiatedAssignments: Record<string, {
    skillOverrides?: Record<string, any>
    settingOverrides?: Record<string, any>
  }>

  // Draft state
  isDraft: boolean
}

const initialFormData: AssignmentFormData = {
  title: '',
  description: '',
  type: 'Practice',
  selectedSkills: [],
  skillConfigs: {},
  dueDate: null,
  startDate: null,
  timeLimit: null,
  attemptsAllowed: 3,
  showCorrectAnswers: true,
  shuffleQuestions: false,
  selectedStudents: [],
  differentiatedAssignments: {},
  isDraft: false
}

export default function CreateAssignmentPage() {
  const params = useParams()
  const router = useRouter()
  const classId = params.id as string

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<AssignmentFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    {
      id: 1,
      title: 'Basic Info',
      description: 'Assignment details and skill selection',
      component: AssignmentBasicInfoStep
    },
    {
      id: 2,
      title: 'Skill Configuration',
      description: 'Configure questions and difficulty',
      component: AssignmentSkillConfigStep
    },
    {
      id: 3,
      title: 'Settings',
      description: 'Dates, limits, and preferences',
      component: AssignmentSettingsStep
    },
    {
      id: 4,
      title: 'Students',
      description: 'Select and differentiate for students',
      component: AssignmentStudentSelectionStep
    },
    {
      id: 5,
      title: 'Review',
      description: 'Review and assign',
      component: AssignmentReviewStep
    }
  ]

  const currentStepData = steps.find(step => step.id === currentStep)
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === steps.length
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100

  const updateFormData = (updates: Partial<AssignmentFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)
    try {
      // Save as draft logic here
      console.log('Saving draft...', { ...formData, isDraft: true })
      // await saveAssignmentDraft(classId, { ...formData, isDraft: true })
    } catch (error) {
      console.error('Failed to save draft:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Submit assignment logic here
      console.log('Creating assignment...', { ...formData, isDraft: false })
      // await createAssignment(classId, { ...formData, isDraft: false })
      router.push(`/class/${classId}/assignments`)
    } catch (error) {
      console.error('Failed to create assignment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push(`/class/${classId}/assignments`)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.selectedSkills.length > 0
      case 2:
        return formData.selectedSkills.every(skill =>
          formData.skillConfigs[skill]?.questionCount > 0
        )
      case 3:
        return formData.dueDate !== null
      case 4:
        return formData.selectedStudents.length > 0
      case 5:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Assignments
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">
                Create New Assignment
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSubmitting || !formData.title.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}: {currentStepData?.title}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full mb-6" />

          {/* Step Navigation */}
          <div className="flex items-center justify-center">
            <div className="flex space-x-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    step.id === currentStep
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : step.id < currentStep
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-white">
                    {step.id}
                  </span>
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            {currentStepData && (
              <currentStepData.component
                formData={formData}
                updateFormData={updateFormData}
                classId={classId}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>

            {isLastStep ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}