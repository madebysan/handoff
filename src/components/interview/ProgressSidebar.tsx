import { SECTIONS } from '../../lib/interview-data'
import { mockState } from '../../lib/mock-data'
import { initialState } from '../../context/InterviewContext'
import { Link } from 'react-router-dom'
import { useInterview } from '../../hooks/useInterview'
import { CheckCircle2 } from 'lucide-react'

interface ProgressSidebarProps {
  currentSectionId: string
  onNavigate: (sectionId: string) => void
}

// Helper to check if a section has any data filled in
function sectionHasData(state: ReturnType<typeof useInterview>['state'], sectionId: string): boolean {
  switch (sectionId) {
    case 'contacts':
      return state.contacts.some(c => c.name.trim() !== '')
    case 'financial':
      return state.financialAccounts.some(a => a.institution.trim() !== '')
    case 'insurance':
      return state.insurancePolicies.some(p => p.carrier.trim() !== '')
    case 'property':
      return state.properties.some(p => p.description.trim() !== '' || p.propertyType.trim() !== '')
    case 'digital':
      return Object.values(state.digital).some(v => v.trim() !== '')
    case 'legal':
      return state.legalDocuments.some(d => d.documentType.trim() !== '')
    case 'debts':
      return state.debts.some(d => d.lender.trim() !== '')
    case 'business':
      return Object.values(state.business).some(v => v.trim() !== '')
    case 'dependents':
      return Object.values(state.dependents).some(v => v.trim() !== '')
    case 'wishes':
      return Object.values(state.wishes).some(v => v.trim() !== '')
    default:
      return false
  }
}

export default function ProgressSidebar({ currentSectionId, onNavigate }: ProgressSidebarProps) {
  const { state, dispatch } = useInterview()

  const isDemoMode = state.contacts.length > 0 && state.contacts[0].name === 'David Mitchell'

  const handleToggleDemo = () => {
    if (isDemoMode) {
      dispatch({ type: 'LOAD_STATE', state: { ...initialState, currentSection: state.currentSection } })
    } else {
      dispatch({ type: 'LOAD_STATE', state: { ...mockState, currentSection: state.currentSection } })
    }
  }

  return (
    <aside className="w-72 h-screen sticky top-0 border-r border-border bg-white p-6 overflow-y-auto">
      <Link to="/" className="block mb-6">
        <h2 className="text-lg font-bold text-charcoal">Relay</h2>
        <p className="text-xs text-charcoal-muted">Your letter of instruction</p>
      </Link>

      {/* Demo mode toggle */}
      <button
        onClick={handleToggleDemo}
        className="w-full flex items-center justify-between mb-6 px-3 py-2 rounded-lg border border-border bg-warm-gray-light hover:bg-warm-gray transition-colors"
      >
        <span className="text-xs font-medium text-charcoal-light">
          {isDemoMode ? 'Prefilled demo' : 'Empty state'}
        </span>
        <div className={`relative w-9 h-5 rounded-full transition-colors ${isDemoMode ? 'bg-sage' : 'bg-charcoal-muted/30'}`}>
          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isDemoMode ? 'left-[18px]' : 'left-0.5'}`} />
        </div>
      </button>

      <nav className="space-y-1">
        {SECTIONS.map((section) => {
          const isActive = section.id === currentSectionId
          const hasData = sectionHasData(state, section.id)

          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-sage-bg text-sage-dark font-medium'
                  : 'text-charcoal-light hover:bg-warm-gray-light hover:text-charcoal'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                isActive ? 'bg-sage text-cream' : hasData ? 'bg-sage-light text-cream' : 'bg-warm-gray text-charcoal-muted'
              }`}>
                {hasData && !isActive ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  section.letter
                )}
              </span>
              <span className="text-sm truncate">{section.title}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-border">
        <Link
          to="/export"
          className="block w-full text-center bg-sage text-cream px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors"
        >
          Generate Document
        </Link>
      </div>

      {state.lastSaved && (
        <p className="mt-4 text-xs text-charcoal-muted text-center">
          Saved {new Date(state.lastSaved).toLocaleTimeString()}
        </p>
      )}
    </aside>
  )
}
