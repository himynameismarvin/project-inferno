import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prodigy Teacher Portal',
  description: 'Educational web application for managing classes, students, and assignments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}