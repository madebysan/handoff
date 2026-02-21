import { SECTIONS } from '../../lib/interview-data'
import { Link } from 'react-router-dom'

interface ProgressBarProps {
  currentSectionId: string
  onNavigate: (sectionId: string) => void
}

export default function ProgressBar({ currentSectionId, onNavigate }: ProgressBarProps) {
  const currentIndex = SECTIONS.findIndex(s => s.id === currentSectionId)
  const progress = ((currentIndex + 1) / SECTIONS.length) * 100

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-sm font-bold text-charcoal mr-3">Relay</Link>
        <span className="text-sm font-medium text-charcoal flex-1 truncate">
          {SECTIONS[currentIndex]?.letter}. {SECTIONS[currentIndex]?.title}
        </span>
        <span className="text-xs text-charcoal-muted ml-2 flex-shrink-0">
          {currentIndex + 1}/{SECTIONS.length}
        </span>
      </div>
      <div className="h-1 bg-warm-gray">
        <div
          className="h-full bg-sage transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section dots for quick nav */}
      <div className="px-3 py-2 flex gap-1 overflow-x-auto scrollbar-none">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-colors ${
              i === currentIndex
                ? 'bg-sage text-cream'
                : 'bg-warm-gray text-charcoal-muted active:bg-warm-gray-light'
            }`}
            aria-label={section.title}
          >
            {section.letter}
          </button>
        ))}
      </div>
    </div>
  )
}
