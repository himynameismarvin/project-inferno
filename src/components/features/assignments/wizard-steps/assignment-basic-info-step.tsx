'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  BookOpen,
  Calculator,
  PenTool,
  Search,
  X,
  ChevronRight,
  ChevronDown
} from 'lucide-react'

interface AssignmentBasicInfoStepProps {
  formData: any
  updateFormData: (data: any) => void
  classId: string
}

interface Skill {
  id: string
  name: string
  description: string
  category: string
  grade: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const mockSkills: Skill[] = [
  {
    id: 'add-sub-whole',
    name: 'Addition and Subtraction of Whole Numbers',
    description: 'Basic addition and subtraction operations with whole numbers',
    category: 'Number Operations',
    grade: 3,
    difficulty: 'Easy'
  },
  {
    id: 'mult-div-whole',
    name: 'Multiplication and Division of Whole Numbers',
    description: 'Basic multiplication and division operations with whole numbers',
    category: 'Number Operations',
    grade: 3,
    difficulty: 'Medium'
  },
  {
    id: 'fractions-intro',
    name: 'Introduction to Fractions',
    description: 'Understanding fractions as parts of a whole',
    category: 'Fractions and Decimals',
    grade: 3,
    difficulty: 'Medium'
  },
  {
    id: 'place-value',
    name: 'Place Value to Thousands',
    description: 'Understanding place value up to the thousands place',
    category: 'Number Sense',
    grade: 3,
    difficulty: 'Easy'
  },
  {
    id: 'geometry-shapes',
    name: 'Basic Geometric Shapes',
    description: 'Identifying and classifying 2D and 3D shapes',
    category: 'Geometry',
    grade: 3,
    difficulty: 'Easy'
  },
  {
    id: 'word-problems',
    name: 'Multi-Step Word Problems',
    description: 'Solving word problems involving multiple operations',
    category: 'Problem Solving',
    grade: 3,
    difficulty: 'Hard'
  },
  {
    id: 'measurement-time',
    name: 'Time and Measurement',
    description: 'Reading clocks, measuring length, weight, and volume',
    category: 'Measurement',
    grade: 3,
    difficulty: 'Medium'
  },
  {
    id: 'data-graphs',
    name: 'Data and Graphs',
    description: 'Reading and creating bar graphs, pictographs, and line plots',
    category: 'Data Analysis',
    grade: 3,
    difficulty: 'Medium'
  }
]

export function AssignmentBasicInfoStep({
  formData,
  updateFormData,
  classId
}: AssignmentBasicInfoStepProps) {
  const [skillSearch, setSkillSearch] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Number Operations'])

  const filteredSkills = mockSkills.filter(skill =>
    skill.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
    skill.description.toLowerCase().includes(skillSearch.toLowerCase()) ||
    skill.category.toLowerCase().includes(skillSearch.toLowerCase())
  )

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const toggleSkill = (skillId: string) => {
    const isSelected = formData.selectedSkills.includes(skillId)
    const updatedSkills = isSelected
      ? formData.selectedSkills.filter((id: string) => id !== skillId)
      : [...formData.selectedSkills, skillId]

    updateFormData({ selectedSkills: updatedSkills })
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const getSelectedSkillsDisplay = () => {
    return formData.selectedSkills.map((skillId: string) => {
      const skill = mockSkills.find(s => s.id === skillId)
      return skill?.name || skillId
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Number Operations':
        return <Calculator className="h-4 w-4 text-blue-600" />
      case 'Geometry':
        return <PenTool className="h-4 w-4 text-green-600" />
      default:
        return <BookOpen className="h-4 w-4 text-purple-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Basic Assignment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title *</Label>
              <Input
                id="title"
                placeholder="Enter assignment title..."
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Assignment Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateFormData({ type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Practice">Practice</SelectItem>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Placement">Placement Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter assignment description..."
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Selected Skills Summary */}
          {formData.selectedSkills.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Skills ({formData.selectedSkills.length})</Label>
              <div className="flex flex-wrap gap-2">
                {getSelectedSkillsDisplay().map((skillName: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skillName}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => toggleSkill(formData.selectedSkills[index])}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skill Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Skills *</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search skills..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category} className="border rounded-lg">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(category)}
                    <span className="font-medium">{category}</span>
                    <Badge variant="outline">{skills.length}</Badge>
                  </div>
                  {expandedCategories.includes(category) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {expandedCategories.includes(category) && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="space-y-3">
                      {skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-start space-x-3 p-3 bg-white rounded border"
                        >
                          <Checkbox
                            checked={formData.selectedSkills.includes(skill.id)}
                            onCheckedChange={() => toggleSkill(skill.id)}
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{skill.name}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="outline"
                                  className={
                                    skill.difficulty === 'Easy' ? 'text-green-600 border-green-300' :
                                    skill.difficulty === 'Medium' ? 'text-yellow-600 border-yellow-300' :
                                    'text-red-600 border-red-300'
                                  }
                                >
                                  {skill.difficulty}
                                </Badge>
                                <Badge variant="outline">Grade {skill.grade}</Badge>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{skill.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {Object.keys(groupedSkills).length === 0 && skillSearch && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>No skills found matching &quot;{skillSearch}&quot;</p>
              <Button
                variant="link"
                onClick={() => setSkillSearch('')}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Validation Message */}
      {formData.selectedSkills.length === 0 && (
        <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded">
          Please select at least one skill to continue.
        </div>
      )}
    </div>
  )
}