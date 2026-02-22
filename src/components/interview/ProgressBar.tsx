import { SECTIONS } from '../../lib/interview-data'
import { mockState } from '../../lib/mock-data'
import { initialState } from '../../context/InterviewContext'
import { useInterview } from '../../hooks/useInterview'
import { Link } from 'react-router-dom'
import {
  CircleUser, Users, Landmark, Shield, Home, Monitor, FileText,
  CreditCard, Briefcase, Heart, PenLine, Fingerprint,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  CircleUser, Users, Landmark, Shield, Home, Monitor, FileText,
  CreditCard, Briefcase, Heart, PenLine, Fingerprint,
}

interface ProgressBarProps {
  currentSectionId: string
  onNavigate: (sectionId: string) => void
}

export default function ProgressBar({ currentSectionId, onNavigate }: ProgressBarProps) {
  const { state, dispatch } = useInterview()
  const currentIndex = SECTIONS.findIndex(s => s.id === currentSectionId)
  const progress = ((currentIndex + 1) / SECTIONS.length) * 100

  const isDemoMode = state.contacts.length > 0 && state.contacts[0].name === 'David Mitchell'

  const handleToggleDemo = () => {
    if (isDemoMode) {
      dispatch({ type: 'LOAD_STATE', state: { ...initialState, currentSection: state.currentSection } })
    } else {
      dispatch({ type: 'LOAD_STATE', state: { ...mockState, currentSection: state.currentSection } })
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-sm font-bold text-charcoal mr-3">Handoff</Link>
        <span className="text-sm font-medium text-charcoal flex-1 truncate">
          {SECTIONS[currentIndex]?.title}
        </span>
        <button
          onClick={handleToggleDemo}
          className="flex items-center gap-1.5 ml-2 flex-shrink-0"
          aria-label={isDemoMode ? 'Switch to empty state' : 'Switch to demo data'}
        >
          <span className="text-[10px] text-charcoal-muted">{isDemoMode ? 'Demo' : 'Empty'}</span>
          <div className={`relative w-7 h-4 rounded-full transition-colors ${isDemoMode ? 'bg-sage' : 'bg-charcoal-muted/30'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${isDemoMode ? 'left-[14px]' : 'left-0.5'}`} />
          </div>
        </button>
      </div>
      <div className="h-1 bg-warm-gray">
        <div
          className="h-full bg-sage transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section icons for quick nav */}
      <div className="px-3 py-2 flex gap-1 overflow-x-auto scrollbar-none">
        {SECTIONS.map((section, i) => {
          const IconComponent = ICON_MAP[section.icon]
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                i === currentIndex
                  ? 'bg-sage text-cream'
                  : 'bg-warm-gray text-charcoal-muted active:bg-warm-gray-light'
              }`}
              aria-label={section.title}
            >
              {IconComponent ? (
                <IconComponent className="w-3.5 h-3.5" />
              ) : (
                section.letter
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
