'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Clock,
  Settings,
  AlertCircle,
  CheckCircle2,
  Users,
  Eye,
  Shuffle
} from 'lucide-react'

interface AssignmentSettingsStepProps {
  formData: any
  updateFormData: (data: any) => void
  classId: string
}

export function AssignmentSettingsStep({
  formData,
  updateFormData,
  classId
}: AssignmentSettingsStepProps) {
  const [useDefaultSettings, setUseDefaultSettings] = useState(true)

  // Initialize default settings if not set
  useEffect(() => {
    if (useDefaultSettings && (!formData.dueDate || !formData.startDate)) {
      const now = new Date()
      const startDate = new Date(now)
      const dueDate = new Date(now)
      dueDate.setDate(now.getDate() + 7) // Default due in 1 week

      updateFormData({
        startDate: startDate,
        dueDate: dueDate,
        timeLimit: null, // No overall time limit by default
        attemptsAllowed: 3,
        showCorrectAnswers: true,
        shuffleQuestions: true
      })
    }
  }, [useDefaultSettings, formData.dueDate, formData.startDate, updateFormData])

  const handleDateChange = (field: string, value: string) => {
    if (value) {
      const date = new Date(value)
      updateFormData({ [field]: date })
    } else {
      updateFormData({ [field]: null })
    }
  }

  const formatDateForInput = (date: Date | null) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const formatTimeForInput = (date: Date | null) => {
    if (!date) return ''
    return date.toTimeString().slice(0, 5)
  }

  const handleTimeChange = (field: string, value: string) => {
    const currentDate = formData[field] || new Date()
    if (value) {
      const [hours, minutes] = value.split(':').map(Number)
      const newDate = new Date(currentDate)
      newDate.setHours(hours, minutes, 0, 0)
      updateFormData({ [field]: newDate })
    }
  }

  const applyDefaultSettings = () => {
    const now = new Date()
    const startDate = new Date(now)
    const dueDate = new Date(now)
    dueDate.setDate(now.getDate() + 7)

    updateFormData({
      startDate: startDate,
      dueDate: dueDate,
      timeLimit: null,
      attemptsAllowed: 3,
      showCorrectAnswers: true,
      shuffleQuestions: true
    })
  }

  const getDurationDisplay = () => {
    if (formData.startDate && formData.dueDate) {
      const start = new Date(formData.startDate)
      const due = new Date(formData.dueDate)
      const diffTime = due.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) return '1 day'
      if (diffDays === 7) return '1 week'
      if (diffDays === 14) return '2 weeks'
      return `${diffDays} days`
    }
    return 'Not set'
  }

  const getTimeLimitDisplay = () => {
    if (formData.timeLimit) {
      if (formData.timeLimit < 60) {
        return `${formData.timeLimit} minutes`
      } else {
        const hours = Math.floor(formData.timeLimit / 60)
        const minutes = formData.timeLimit % 60
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hour${hours > 1 ? 's' : ''}`
      }
    }
    return 'No limit'
  }

  const isValidDateRange = () => {
    if (!formData.startDate || !formData.dueDate) return false
    return new Date(formData.dueDate) > new Date(formData.startDate)
  }

  return (
    <div className="space-y-6">
      {/* Settings Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-600" />
              Assignment Settings
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="use-defaults" className="text-sm">
                Use Default Settings
              </Label>
              <Switch
                id="use-defaults"
                checked={useDefaultSettings}
                onCheckedChange={(checked) => {
                  setUseDefaultSettings(checked)
                  if (checked) {
                    applyDefaultSettings()
                  }
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-blue-600">{getDurationDisplay()}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-green-600">{getTimeLimitDisplay()}</div>
              <div className="text-sm text-gray-600">Time Limit</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Users className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-orange-600">{formData.attemptsAllowed || 3}</div>
              <div className="text-sm text-gray-600">Max Attempts</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              {formData.showCorrectAnswers ? (
                <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              ) : (
                <AlertCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              )}
              <div className="text-lg font-semibold text-purple-600">
                {formData.showCorrectAnswers ? 'Show' : 'Hide'}
              </div>
              <div className="text-sm text-gray-600">Answers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-600" />
            Schedule & Timing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Assignment Available From</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    type="date"
                    value={formatDateForInput(formData.startDate)}
                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                    disabled={useDefaultSettings}
                  />
                  <Input
                    type="time"
                    value={formatTimeForInput(formData.startDate)}
                    onChange={(e) => handleTimeChange('startDate', e.target.value)}
                    disabled={useDefaultSettings}
                  />
                </div>
                {useDefaultSettings && (
                  <p className="text-xs text-gray-500 mt-1">Available immediately</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Due Date & Time *</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    type="date"
                    value={formatDateForInput(formData.dueDate)}
                    onChange={(e) => handleDateChange('dueDate', e.target.value)}
                    disabled={useDefaultSettings}
                  />
                  <Input
                    type="time"
                    value={formatTimeForInput(formData.dueDate)}
                    onChange={(e) => handleTimeChange('dueDate', e.target.value)}
                    disabled={useDefaultSettings}
                  />
                </div>
                {useDefaultSettings && (
                  <p className="text-xs text-gray-500 mt-1">Due in 1 week at 11:59 PM</p>
                )}
              </div>
            </div>
          </div>

          {!isValidDateRange() && formData.startDate && formData.dueDate && (
            <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle className="h-4 w-4" />
              <span>Due date must be after the start date.</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label>Overall Time Limit (Optional)</Label>
              <Select
                value={formData.timeLimit?.toString() || 'none'}
                onValueChange={(value) =>
                  updateFormData({ timeLimit: value === 'none' ? null : parseInt(value) })
                }
                disabled={useDefaultSettings}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No time limit</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                This is different from individual skill time limits. It applies to the entire assignment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignment Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-gray-600" />
            Assignment Rules & Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Maximum Attempts</Label>
                <Select
                  value={formData.attemptsAllowed?.toString() || '3'}
                  onValueChange={(value) =>
                    updateFormData({ attemptsAllowed: parseInt(value) })
                  }
                  disabled={useDefaultSettings}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 attempt</SelectItem>
                    <SelectItem value="2">2 attempts</SelectItem>
                    <SelectItem value="3">3 attempts (Recommended)</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="999">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-1">
                  <Label>Show Correct Answers</Label>
                  <p className="text-xs text-gray-500">
                    Students can see correct answers after completing
                  </p>
                </div>
                <Switch
                  checked={formData.showCorrectAnswers || false}
                  onCheckedChange={(checked) =>
                    updateFormData({ showCorrectAnswers: checked })
                  }
                  disabled={useDefaultSettings}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-1">
                  <Label className="flex items-center">
                    <Shuffle className="h-4 w-4 mr-2" />
                    Shuffle Questions
                  </Label>
                  <p className="text-xs text-gray-500">
                    Questions appear in random order for each student
                  </p>
                </div>
                <Switch
                  checked={formData.shuffleQuestions || false}
                  onCheckedChange={(checked) =>
                    updateFormData({ shuffleQuestions: checked })
                  }
                  disabled={useDefaultSettings}
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Assignment Type: {formData.type}</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  {formData.type === 'Assessment' && (
                    <>
                      <p>• Students cannot see correct answers until after due date</p>
                      <p>• Limited attempts recommended</p>
                      <p>• Questions may be shuffled for security</p>
                    </>
                  )}
                  {formData.type === 'Practice' && (
                    <>
                      <p>• Students can see immediate feedback</p>
                      <p>• Multiple attempts encouraged</p>
                      <p>• Focus on learning, not evaluation</p>
                    </>
                  )}
                  {formData.type === 'Quiz' && (
                    <>
                      <p>• Short, focused assessment</p>
                      <p>• Typically 1-2 attempts</p>
                      <p>• Quick feedback available</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Messages */}
      {!formData.dueDate && (
        <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          Please set a due date to continue.
        </div>
      )}

      {formData.dueDate && new Date(formData.dueDate) <= new Date() && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          Due date should be in the future.
        </div>
      )}
    </div>
  )
}