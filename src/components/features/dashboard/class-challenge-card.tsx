'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Trophy,
  Target,
  Clock,
  Users,
  Zap
} from 'lucide-react'

interface ClassChallengeCardProps {
  classId: string
}

export function ClassChallengeCard({ classId }: ClassChallengeCardProps) {
  // Mock challenge data - replace with real data from useClassChallenge hook
  const challenge = {
    id: 1,
    title: 'Multiplication Masters',
    description: 'Complete 100 multiplication problems this week',
    type: 'Weekly Challenge',
    startDate: '2025-09-14',
    endDate: '2025-09-21',
    totalProblems: 100,
    completedProblems: 67,
    participatingStudents: 18,
    totalStudents: 24,
    topPerformers: ['Emma S.', 'Jake M.', 'Sophia L.'],
    reward: '🏆 Golden Calculator Badge',
    isActive: true
  }

  const progressPercentage = (challenge.completedProblems / challenge.totalProblems) * 100
  const participationRate = (challenge.participatingStudents / challenge.totalStudents) * 100

  const getDaysRemaining = () => {
    const today = new Date()
    const endDate = new Date(challenge.endDate)
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <Card className="border-l-4 border-l-yellow-500">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center text-lg">
              <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
              Class Challenge
            </CardTitle>
            {challenge.isActive && (
              <Badge className="mt-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                <Zap className="h-3 w-3 mr-1" />
                Active
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">
            {challenge.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {challenge.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 space-x-3">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {getDaysRemaining()} days left
            </span>
            <span>•</span>
            <span>{challenge.reward}</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Class Progress</span>
            <span className="font-medium">
              {challenge.completedProblems}/{challenge.totalProblems}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>

        {/* Participation Stats */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center text-sm text-gray-500 mb-1">
              <Users className="h-4 w-4 mr-1" />
              Participating
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {challenge.participatingStudents}/{challenge.totalStudents}
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-sm text-gray-500 mb-1">
              <Target className="h-4 w-4 mr-1" />
              Completion
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {Math.round(participationRate)}%
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            🌟 Top Performers
          </h4>
          <div className="space-y-1">
            {challenge.topPerformers.map((student, index) => (
              <div key={student} className="flex items-center text-sm">
                <span className="w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                  {index + 1}
                </span>
                <span className="text-gray-700">{student}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 space-y-2">
          <Button className="w-full" size="sm">
            <Trophy className="h-4 w-4 mr-2" />
            View Leaderboard
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            Challenge Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}