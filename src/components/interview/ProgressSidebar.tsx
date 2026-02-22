import { useRef } from 'react'
import { SECTIONS } from '../../lib/interview-data'
import { mockState } from '../../lib/mock-data'
import { initialState } from '../../context/InterviewContext'
import { Link } from 'react-router-dom'
import { useInterview } from '../../hooks/useInterview'
import {
  CheckCircle2, ShieldCheck, Download, Upload, CircleUser,
  Users, Landmark, Shield, Home, Monitor, FileText,
  CreditCard, Briefcase, Heart, PenLine, Fingerprint,
  type LucideIcon,
} from 'lucide-react'

// Map icon name strings from SECTIONS to actual Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  CircleUser, Users, Landmark, Shield, Home, Monitor, FileText,
  CreditCard, Briefcase, Heart, PenLine, Fingerprint,
}

interface ProgressSidebarProps {
  currentSectionId: string
  onNavigate: (sectionId: string) => void
}

// Helper to check if a section has any data filled in
function sectionHasData(state: ReturnType<typeof useInterview>['state'], sectionId: string): boolean {
  switch (sectionId) {
    case 'aboutMe':
      return !!(state.aboutMe?.fullName?.trim() || state.aboutMe?.reason?.trim() || state.aboutMe?.personalContext?.trim())
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
    case 'verification':
      return !!(state.verification?.fullName?.trim() || state.verification?.signatureData || state.verification?.familyPassphrase?.trim())
    default:
      return false
  }
}

export default function ProgressSidebar({ currentSectionId, onNavigate }: ProgressSidebarProps) {
  const { state, dispatch } = useInterview()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isDemoMode = state.contacts.length > 0 && state.contacts[0].name === 'David Mitchell'

  const handleToggleDemo = () => {
    if (isDemoMode) {
      dispatch({ type: 'LOAD_STATE', state: { ...initialState, currentSection: state.currentSection } })
    } else {
      dispatch({ type: 'LOAD_STATE', state: { ...mockState, currentSection: state.currentSection } })
    }
  }

  // Export progress as JSON file
  const handleExport = () => {
    const data = JSON.stringify(state, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `handoff-draft-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Import progress from JSON file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string)
        // Basic validation — check for a known field
        if (imported && Array.isArray(imported.contacts)) {
          dispatch({ type: 'LOAD_STATE', state: imported })
        }
      } catch {
        // Invalid file — silently fail
      }
    }
    reader.readAsText(file)
    // Reset input so the same file can be re-selected
    e.target.value = ''
  }

  return (
    <aside className="w-72 h-screen sticky top-0 border-r border-border bg-white p-6 overflow-y-auto">
      <Link to="/" className="block mb-6">
        <h2 className="text-lg font-bold text-charcoal">Handoff</h2>
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
          const IconComponent = ICON_MAP[section.icon]

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
              <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                isActive ? 'bg-sage text-cream' : hasData ? 'bg-sage-light text-cream' : 'bg-warm-gray text-charcoal-muted'
              }`}>
                {hasData && !isActive ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : IconComponent ? (
                  <IconComponent className="w-3.5 h-3.5" />
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
          className="block w-full text-center bg-charcoal text-cream px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-charcoal-light transition-colors"
        >
          Generate Document
        </Link>

        {/* Export/Import */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleExport}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-charcoal-muted hover:text-charcoal py-2 rounded-full border border-border hover:bg-warm-gray-light transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Save draft
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-charcoal-muted hover:text-charcoal py-2 rounded-full border border-border hover:bg-warm-gray-light transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Load draft
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>

      {state.lastSaved && (
        <p className="mt-4 text-xs text-charcoal-muted text-center">
          Saved {new Date(state.lastSaved).toLocaleTimeString()}
        </p>
      )}

      <div className="mt-6 flex items-start gap-2 px-2">
        <ShieldCheck className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-charcoal-muted leading-relaxed">
          Your data never leaves your device. Everything is stored locally in your browser — nothing is sent to any server.
        </p>
      </div>
    </aside>
  )
}
