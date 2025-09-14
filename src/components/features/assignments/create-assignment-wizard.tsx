'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  X
} from 'lucide-react'
import { AssignmentBasicInfoStep } from './wizard-steps/assignment-basic-info-step'
import { AssignmentSkillConfigStep } from './wizard-steps/assignment-skill-config-step'
import { AssignmentSettingsStep } from './wizard-steps/assignment-settings-step'
import { AssignmentStudentSelectionStep } from './wizard-steps/assignment-student-selection-step'
import { AssignmentReviewStep } from './wizard-steps/assignment-review-step'

interface CreateAssignmentWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classId: string
}

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

export function CreateAssignmentWizard({
  open,
  onOpenChange,
  classId
}: CreateAssignmentWizardProps) {
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
      onOpenChange(false)
      setCurrentStep(1)
      setFormData(initialFormData)
    } catch (error) {
      console.error('Failed to create assignment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setCurrentStep(1)
    setFormData(initialFormData)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col bg-white text-gray-900 p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-gray-900">Create New Assignment</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}: {currentStepData?.title}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-center px-6 py-4 border-b bg-white">
          <div className="flex space-x-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                  step.id === currentStep
                    ? 'bg-blue-100 text-blue-700'
                    : step.id < currentStep
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span>{step.id}</span>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-auto p-6">
          {currentStepData && (
            <currentStepData.component
              formData={formData}
              updateFormData={updateFormData}
              classId={classId}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting || !formData.title.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {isLastStep ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
              >
                <Send className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}