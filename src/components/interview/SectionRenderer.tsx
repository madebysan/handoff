import { SECTIONS } from '../../lib/interview-data'
import { motion, useReducedMotion } from 'motion/react'
import AboutMeSection from '../sections/AboutMeSection'
import ContactsSection from '../sections/ContactsSection'
import FinancialSection from '../sections/FinancialSection'
import InsuranceSection from '../sections/InsuranceSection'
import PropertySection from '../sections/PropertySection'
import DigitalLifeSection from '../sections/DigitalLifeSection'
import LegalDocsSection from '../sections/LegalDocsSection'
import DebtsSection from '../sections/DebtsSection'
import BusinessSection from '../sections/BusinessSection'
import DependentsSection from '../sections/DependentsSection'
import WishesSection from '../sections/WishesSection'
import VerificationSection from '../sections/VerificationSection'
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react'

interface SectionRendererProps {
  sectionId: string
  onNext: () => void
  onPrev?: () => void
  onSkip: () => void
  isFirst: boolean
  isLast: boolean
}

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  aboutMe: AboutMeSection,
  contacts: ContactsSection,
  financial: FinancialSection,
  insurance: InsuranceSection,
  property: PropertySection,
  digital: DigitalLifeSection,
  legal: LegalDocsSection,
  debts: DebtsSection,
  business: BusinessSection,
  dependents: DependentsSection,
  wishes: WishesSection,
  verification: VerificationSection,
}

const EASE = [0.25, 0.1, 0.25, 1] as const

export default function SectionRenderer({ sectionId, onNext, onPrev, onSkip, isFirst, isLast }: SectionRendererProps) {
  const SectionComponent = SECTION_COMPONENTS[sectionId]
  const currentSection = SECTIONS.find(s => s.id === sectionId)
  const prefersReducedMotion = useReducedMotion()

  if (!SectionComponent || !currentSection) return null

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: EASE }}
    >
      <SectionComponent />

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-border flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          {!isFirst && onPrev && (
            <button
              onClick={onPrev}
              className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSkip}
            className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] px-3"
          >
            <SkipForward className="w-3.5 h-3.5" />
            Skip
          </button>
          <button
            onClick={onNext}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-button font-semibold hover:bg-primary/90 transition-colors flex-1 sm:flex-initial min-h-[44px]"
          >
            {isLast ? 'Generate Document' : 'Continue'}
            {!isLast && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
