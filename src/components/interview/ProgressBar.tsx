import { SECTIONS } from '../../lib/interview-data'

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
        <span className="text-sm font-medium text-charcoal">
          {SECTIONS[currentIndex]?.letter}. {SECTIONS[currentIndex]?.title}
        </span>
        <span className="text-xs text-charcoal-muted">
          {currentIndex + 1} of {SECTIONS.length}
        </span>
      </div>
      <div className="h-1 bg-warm-gray">
        <div
          className="h-full bg-sage transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section dots for quick nav */}
      <div className="px-4 py-2 flex gap-1.5 overflow-x-auto">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-colors ${
              i === currentIndex
                ? 'bg-sage text-cream'
                : 'bg-warm-gray text-charcoal-muted hover:bg-warm-gray-light'
            }`}
            title={section.title}
          >
            {section.letter}
          </button>
        ))}
      </div>
    </div>
  )
}
