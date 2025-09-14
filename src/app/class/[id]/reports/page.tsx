'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'

export default function ReportsPage() {
  const params = useParams()
  const classId = params.id as string

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Reports
            </CardTitle>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Progress Reports
            </h3>
            <p className="text-gray-500 mb-4">
              This page will show detailed progress reports, analytics, and data export options.
            </p>
            <p className="text-sm text-gray-400">
              Coming in the next phase of development...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}