import { type ReactNode } from 'react'
import ProgressSidebar from './ProgressSidebar'
import ProgressBar from './ProgressBar'

interface InterviewLayoutProps {
  children: ReactNode
  currentSectionId: string
  onNavigate: (sectionId: string) => void
}

export default function InterviewLayout({ children, currentSectionId, onNavigate }: InterviewLayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Mobile progress bar */}
      <div className="lg:hidden">
        <ProgressBar currentSectionId={currentSectionId} onNavigate={onNavigate} />
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <ProgressSidebar currentSectionId={currentSectionId} onNavigate={onNavigate} />
        </div>

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
