'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ClipboardList,
  Users,
  Calendar,
  Clock,
  Target,
  Settings,
  CheckCircle,
  Eye,
  EyeOff,
  Shuffle,
  RotateCcw,
  Globe,
  Chrome,
  Smartphone
} from 'lucide-react'

interface AssignmentReviewStepProps {
  formData: any
  updateFormData: (data: any) => void
  classId: string
}

// Mock skills data for display
const skillsDatabase: Record<string, { name: string; category: string; grade: string }> = {
  'addition-basic': { name: 'Basic Addition', category: 'Number Operations', grade: 'Grade 1-2' },
  'subtraction-basic': { name: 'Basic Subtraction', category: 'Number Operations', grade: 'Grade 1-2' },
  'multiplication-single': { name: 'Single-digit Multiplication', category: 'Number Operations', grade: 'Grade 3' },
  'division-basic': { name: 'Basic Division', category: 'Number Operations', grade: 'Grade 3-4' },
  'fractions-intro': { name: 'Introduction to Fractions', category: 'Fractions', grade: 'Grade 3-4' },
  'geometry-shapes': { name: 'Basic Shapes', category: 'Geometry', grade: 'Grade 1-2' },
  'measurement-length': { name: 'Length Measurement', category: 'Measurement', grade: 'Grade 2-3' },
  'time-telling': { name: 'Telling Time', category: 'Time & Money', grade: 'Grade 1-3' }
}

// Mock students data
const studentsData = [
  { id: '1', firstName: 'Emma', lastInitial: 'S', username: 'emma.s.2024', isOnline: true },
  { id: '2', firstName: 'Jake', lastInitial: 'M', username: 'jake.m.2024', isOnline: true },
  { id: '3', firstName: 'Sophia', lastInitial: 'L', username: 'sophia.l.2024', isOnline: false },
  { id: '4', firstName: 'Liam', lastInitial: 'T', username: 'liam.t.2024', isOnline: false },
  { id: '5', firstName: 'Ava', lastInitial: 'R', username: 'ava.r.2024', isOnline: true }
]

export function AssignmentReviewStep({
  formData,
  updateFormData,
  classId
}: AssignmentReviewStepProps) {
  const selectedStudents = (formData.selectedStudents || []).map((id: string) =>
    studentsData.find(s => s.id === id)
  ).filter(Boolean)

  const totalQuestions = Object.values(formData.skillConfigs || {}).reduce(
    (sum: number, config: any) => sum + (config.questionCount || 0),
    0
  )

  const estimatedTime = Object.values(formData.skillConfigs || {}).reduce(
    (sum: number, config: any) => sum + ((config.questionCount || 0) * 1.5),
    0
  )

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not set'
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Practice': return <Target className="h-4 w-4" />
      case 'Assessment': return <CheckCircle className="h-4 w-4" />
      case 'Placement': return <Globe className="h-4 w-4" />
      case 'Quiz': return <ClipboardList className="h-4 w-4" />
      default: return <ClipboardList className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Practice': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Assessment': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Placement': return 'bg-green-100 text-green-700 border-green-200'
      case 'Quiz': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">
          Review Assignment
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Review all settings before creating the assignment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <ClipboardList className="h-4 w-4 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">{formData.title || 'Untitled Assignment'}</h4>
              {formData.description && (
                <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Badge className={`border ${getTypeColor(formData.type)}`}>
                {getTypeIcon(formData.type)}
                <span className="ml-1">{formData.type}</span>
              </Badge>
            </div>

            <Separator />

            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Selected Skills ({formData.selectedSkills?.length || 0})</h5>
              <div className="space-y-2">
                {(formData.selectedSkills || []).map((skillId: string) => {
                  const skill = skillsDatabase[skillId]
                  const config = formData.skillConfigs?.[skillId]
                  return skill ? (
                    <div key={skillId} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500 ml-2">({skill.category})</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{config?.questionCount || 0} questions</span>
                        <span>•</span>
                        <span>{config?.difficulty || 'Easy'}</span>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Settings className="h-4 w-4 mr-2" />
              Assignment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Start Date</h5>
                <p className="text-sm text-gray-600">{formatDate(formData.startDate)}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900">Due Date</h5>
                <p className="text-sm text-gray-600">{formatDate(formData.dueDate)}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Attempts Allowed</h5>
                <p className="text-sm text-gray-600">{formData.attemptsAllowed || 3}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900">Time Limit</h5>
                <p className="text-sm text-gray-600">
                  {formData.timeLimit ? `${formData.timeLimit} minutes` : 'No limit'}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-900">Preferences</h5>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  {formData.showCorrectAnswers ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={formData.showCorrectAnswers ? 'text-green-700' : 'text-gray-500'}>
                    Show Correct Answers
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {formData.shuffleQuestions ? (
                    <Shuffle className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Shuffle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={formData.shuffleQuestions ? 'text-blue-700' : 'text-gray-500'}>
                    Shuffle Questions
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Target className="h-4 w-4 mr-2" />
              Assignment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
                <div className="text-sm text-blue-600">Total Questions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">~{Math.round(estimatedTime)}</div>
                <div className="text-sm text-green-600">Est. Minutes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Users className="h-4 w-4 mr-2" />
              Selected Students ({selectedStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStudents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No students selected</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedStudents.slice(0, 8).map((student: any) => (
                  <div key={student.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-700">
                          {student.firstName[0]}{student.lastInitial}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {student.firstName} {student.lastInitial}.
                        </div>
                        <div className="text-xs text-gray-500">
                          {student.username}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${
                        student.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <span className={`text-xs ${
                        student.isOnline ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {student.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                ))}
                {selectedStudents.length > 8 && (
                  <div className="text-center pt-2">
                    <Badge variant="secondary" className="text-xs">
                      +{selectedStudents.length - 8} more students
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Assignment Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <Eye className="h-4 w-4 mr-2" />
            Assignment Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{formData.title || 'Untitled Assignment'}</h4>
                {formData.description && (
                  <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
                )}
              </div>
              <Badge className={`border ${getTypeColor(formData.type)}`}>
                {formData.type}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <ClipboardList className="h-4 w-4" />
                  <span>{totalQuestions} questions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>~{Math.round(estimatedTime)} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{selectedStudents.length} students</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Due: {formatDate(formData.dueDate)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Check */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-medium text-green-900">Ready to Create Assignment</h4>
              <p className="text-sm text-green-700">
                All required information has been provided. Click &quot;Create Assignment&quot; to proceed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}