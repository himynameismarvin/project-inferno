'use client'

import { ReactNode, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import { useAppStore } from '@/lib/store'

interface ClassLayoutProps {
  children: ReactNode
}

export default function ClassLayout({ children }: ClassLayoutProps) {
  const params = useParams()
  const classId = params.id as string
  const { setCurrentClassId } = useAppStore()

  useEffect(() => {
    if (classId) {
      setCurrentClassId(classId)
    }
  }, [classId, setCurrentClassId])

  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}