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
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  BookOpen,
  Calculator,
  Clock,
  BarChart3,
  Settings,
  HelpCircle
} from 'lucide-react'

interface AssignmentSkillConfigStepProps {
  formData: any
  updateFormData: (data: any) => void
  classId: string
}

// Mock skills data (should match the data from Step 1)
const mockSkills = [
  {
    id: 'add-sub-whole',
    name: 'Addition and Subtraction of Whole Numbers',
    description: 'Basic addition and subtraction operations with whole numbers',
    category: 'Number Operations',
    grade: 3,
    difficulty: 'Easy',
    recommendedQuestions: 15,
    estimatedTimePerQuestion: 30 // seconds
  },
  {
    id: 'mult-div-whole',
    name: 'Multiplication and Division of Whole Numbers',
    description: 'Basic multiplication and division operations with whole numbers',
    category: 'Number Operations',
    grade: 3,
    difficulty: 'Medium',
    recommendedQuestions: 12,
    estimatedTimePerQuestion: 45
  },
  {
    id: 'fractions-intro',
    name: 'Introduction to Fractions',
    description: 'Understanding fractions as parts of a whole',
    category: 'Fractions and Decimals',
    grade: 3,
    difficulty: 'Medium',
    recommendedQuestions: 10,
    estimatedTimePerQuestion: 60
  },
  {
    id: 'place-value',
    name: 'Place Value to Thousands',
    description: 'Understanding place value up to the thousands place',
    category: 'Number Sense',
    grade: 3,
    difficulty: 'Easy',
    recommendedQuestions: 12,
    estimatedTimePerQuestion: 25
  },
  {
    id: 'geometry-shapes',
    name: 'Basic Geometric Shapes',
    description: 'Identifying and classifying 2D and 3D shapes',
    category: 'Geometry',
    grade: 3,
    difficulty: 'Easy',
    recommendedQuestions: 8,
    estimatedTimePerQuestion: 20
  },
  {
    id: 'word-problems',
    name: 'Multi-Step Word Problems',
    description: 'Solving word problems involving multiple operations',
    category: 'Problem Solving',
    grade: 3,
    difficulty: 'Hard',
    recommendedQuestions: 6,
    estimatedTimePerQuestion: 120
  },
  {
    id: 'measurement-time',
    name: 'Time and Measurement',
    description: 'Reading clocks, measuring length, weight, and volume',
    category: 'Measurement',
    grade: 3,
    difficulty: 'Medium',
    recommendedQuestions: 10,
    estimatedTimePerQuestion: 50
  },
  {
    id: 'data-graphs',
    name: 'Data and Graphs',
    description: 'Reading and creating bar graphs, pictographs, and line plots',
    category: 'Data Analysis',
    grade: 3,
    difficulty: 'Medium',
    recommendedQuestions: 8,
    estimatedTimePerQuestion: 40
  }
]

export function AssignmentSkillConfigStep({
  formData,
  updateFormData,
  classId
}: AssignmentSkillConfigStepProps) {
  const [useRecommended, setUseRecommended] = useState(true)

  // Initialize skill configurations if not already set
  useEffect(() => {
    if (!formData.skillConfigs || Object.keys(formData.skillConfigs).length === 0) {
      const initialConfigs = formData.selectedSkills.reduce((acc: any, skillId: string) => {
        const skill = mockSkills.find(s => s.id === skillId)
        if (skill) {
          acc[skillId] = {
            questionCount: skill.recommendedQuestions,
            difficulty: 'Adaptive',
            timeLimit: Math.ceil(skill.recommendedQuestions * skill.estimatedTimePerQuestion / 60) // Convert to minutes
          }
        }
        return acc
      }, {})
      updateFormData({ skillConfigs: initialConfigs })
    }
  }, [formData.selectedSkills, formData.skillConfigs, updateFormData])

  const selectedSkills = formData.selectedSkills
    .map((skillId: string) => mockSkills.find(s => s.id === skillId))
    .filter(Boolean)

  const updateSkillConfig = (skillId: string, updates: any) => {
    const newSkillConfigs = {
      ...formData.skillConfigs,
      [skillId]: {
        ...formData.skillConfigs[skillId],
        ...updates
      }
    }
    updateFormData({ skillConfigs: newSkillConfigs })
  }

  const applyRecommendedSettings = () => {
    const recommendedConfigs = formData.selectedSkills.reduce((acc: any, skillId: string) => {
      const skill = mockSkills.find(s => s.id === skillId)
      if (skill) {
        acc[skillId] = {
          questionCount: skill.recommendedQuestions,
          difficulty: 'Adaptive',
          timeLimit: Math.ceil(skill.recommendedQuestions * skill.estimatedTimePerQuestion / 60)
        }
      }
      return acc
    }, {})
    updateFormData({ skillConfigs: recommendedConfigs })
  }

  const getTotalQuestions = () => {
    return Object.values(formData.skillConfigs || {}).reduce(
      (total: number, config: any) => total + (config.questionCount || 0),
      0
    )
  }

  const getEstimatedTime = () => {
    return Object.entries(formData.skillConfigs || {}).reduce(
      (total: number, [skillId, config]: [string, any]) => {
        const skill = mockSkills.find(s => s.id === skillId)
        if (skill) {
          return total + (config.questionCount * skill.estimatedTimePerQuestion / 60)
        }
        return total
      },
      0
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Number Operations':
        return <Calculator className="h-4 w-4 text-blue-600" />
      case 'Geometry':
        return <BookOpen className="h-4 w-4 text-green-600" />
      default:
        return <BookOpen className="h-4 w-4 text-purple-600" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 border-green-300 bg-green-50'
      case 'Medium':
        return 'text-yellow-600 border-yellow-300 bg-yellow-50'
      case 'Hard':
        return 'text-red-600 border-red-300 bg-red-50'
      case 'Adaptive':
        return 'text-blue-600 border-blue-300 bg-blue-50'
      default:
        return 'text-gray-600 border-gray-300 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Configuration Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Assignment Overview
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="use-recommended" className="text-sm">
                Use Recommended Settings
              </Label>
              <Switch
                id="use-recommended"
                checked={useRecommended}
                onCheckedChange={(checked) => {
                  setUseRecommended(checked)
                  if (checked) {
                    applyRecommendedSettings()
                  }
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{selectedSkills.length}</div>
              <div className="text-sm text-gray-600">Skills Selected</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{getTotalQuestions()}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{Math.round(getEstimatedTime())}</div>
              <div className="text-sm text-gray-600">Est. Minutes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-600" />
            Configure Questions & Difficulty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {selectedSkills.map((skill) => {
              const config = formData.skillConfigs?.[skill.id] || {}

              return (
                <div key={skill.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(skill.category)}
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{skill.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{skill.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{skill.category}</Badge>
                          <Badge
                            variant="outline"
                            className={getDifficultyColor(skill.difficulty)}
                          >
                            {skill.difficulty}
                          </Badge>
                          <Badge variant="outline">Grade {skill.grade}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Number of Questions</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="1"
                          max="50"
                          value={config.questionCount || ''}
                          onChange={(e) =>
                            updateSkillConfig(skill.id, {
                              questionCount: parseInt(e.target.value) || 0
                            })
                          }
                          disabled={useRecommended}
                        />
                        {useRecommended && (
                          <div className="flex items-center text-xs text-gray-500">
                            <HelpCircle className="h-3 w-3 mr-1" />
                            Recommended: {skill.recommendedQuestions}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Difficulty Level</Label>
                      <Select
                        value={config.difficulty || 'Adaptive'}
                        onValueChange={(value) =>
                          updateSkillConfig(skill.id, { difficulty: value })
                        }
                        disabled={useRecommended}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Adaptive">Adaptive (Recommended)</SelectItem>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Limit (minutes)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="1"
                          max="120"
                          value={config.timeLimit || ''}
                          onChange={(e) =>
                            updateSkillConfig(skill.id, {
                              timeLimit: parseInt(e.target.value) || 0
                            })
                          }
                          disabled={useRecommended}
                        />
                        {useRecommended && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            Auto-calculated
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Estimated completion time: {Math.round((config.questionCount || 0) * skill.estimatedTimePerQuestion / 60)} minutes</span>
                      <span>Questions per minute: {Math.round((config.questionCount || 0) / ((config.questionCount || 0) * skill.estimatedTimePerQuestion / 60) || 0)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Validation Messages */}
      {getTotalQuestions() === 0 && (
        <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded">
          Please configure at least one question for each selected skill.
        </div>
      )}

      {getTotalQuestions() > 100 && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          Warning: This assignment has {getTotalQuestions()} questions, which may be too many for students. Consider reducing the number of questions per skill.
        </div>
      )}
    </div>
  )
}