import { Link } from 'react-router-dom'
import { useInterview } from '../hooks/useInterview'
import { getSections } from '../lib/interview-data'
import { useI18n } from '../i18n'
import type { Translation } from '../i18n/translations'
import type { InterviewState } from '../context/InterviewContext'
import {
  ArrowLeft, ArrowRight, Check, Minus,
  CircleUser, Users, Landmark, Shield, Home, Monitor,
  FileText, CreditCard, Briefcase, Heart, PenLine, Fingerprint,
  type LucideIcon,
} from 'lucide-react'

// Map icon name strings from SECTIONS to actual Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  CircleUser, Users, Landmark, Shield, Home, Monitor, FileText,
  CreditCard, Briefcase, Heart, PenLine, Fingerprint,
}

// --- Field counting helpers ---

/** Count non-empty string values in a flat object */
function countFilledFields(obj: Record<string, string>): { filled: number; total: number } {
  const entries = Object.values(obj)
  const filled = entries.filter(v => typeof v === 'string' && v.trim() !== '').length
  return { filled, total: entries.length }
}

/** Count items in an array where at least one string field is non-empty (skip 'id' and 'direction') */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function countFilledItems(items: any[]): number {
  return items.filter(item =>
    Object.entries(item).some(([key, val]) =>
      key !== 'id' && key !== 'direction' && typeof val === 'string' && (val as string).trim() !== ''
    )
  ).length
}

interface SectionSummary {
  sectionId: string
  letter: string
  title: string
  icon: string
  isFilled: boolean
  label: string
}

function getSectionSummaries(state: InterviewState, t: Translation): SectionSummary[] {
  return getSections(t).map((section) => {
    let isFilled = false
    let label = t.review.noInfo

    switch (section.id) {
      case 'aboutMe': {
        const { filled, total } = countFilledFields(state.aboutMe)
        isFilled = filled > 0
        label = isFilled ? t.review.fieldsFilled(filled, total) : t.review.noInfo
        break
      }
      case 'contacts': {
        const count = countFilledItems(state.contacts)
        isFilled = count > 0
        label = isFilled
          ? t.review.contactsAdded(count)
          : t.review.noContacts
        break
      }
      case 'financial': {
        const count = countFilledItems(state.financialAccounts)
        isFilled = count > 0
        label = isFilled
          ? t.review.accountsAdded(count)
          : t.review.noAccounts
        break
      }
      case 'insurance': {
        const count = countFilledItems(state.insurancePolicies)
        isFilled = count > 0
        label = isFilled
          ? t.review.policiesAdded(count)
          : t.review.noPolicies
        break
      }
      case 'property': {
        const count = countFilledItems(state.properties)
        isFilled = count > 0
        label = isFilled
          ? t.review.propertiesAdded(count)
          : t.review.noProperties
        break
      }
      case 'digital': {
        const { filled, total } = countFilledFields(state.digital)
        isFilled = filled > 0
        label = isFilled ? t.review.fieldsFilled(filled, total) : t.review.noInfo
        break
      }
      case 'legal': {
        const count = countFilledItems(state.legalDocuments)
        isFilled = count > 0
        label = isFilled
          ? t.review.documentsAdded(count)
          : t.review.noDocuments
        break
      }
      case 'debts': {
        const count = countFilledItems(state.debts)
        isFilled = count > 0
        label = isFilled
          ? t.review.debtsAdded(count)
          : t.review.noDebts
        break
      }
      case 'business': {
        const { filled, total } = countFilledFields(state.business)
        isFilled = filled > 0
        label = isFilled ? t.review.fieldsFilled(filled, total) : t.review.noInfo
        break
      }
      case 'dependents': {
        const { filled, total } = countFilledFields(state.dependents)
        isFilled = filled > 0
        label = isFilled ? t.review.fieldsFilled(filled, total) : t.review.noInfo
        break
      }
      case 'wishes': {
        const { filled, total } = countFilledFields(state.wishes)
        isFilled = filled > 0
        label = isFilled ? t.review.fieldsFilled(filled, total) : t.review.noInfo
        break
      }
      case 'verification': {
        const hasName = !!state.verification?.fullName?.trim()
        const hasSig = !!state.verification?.signatureData
        isFilled = hasName || hasSig
        if (hasName && hasSig) {
          label = t.review.signedAndVerified
        } else if (hasName) {
          label = t.review.nameNoSignature
        } else if (hasSig) {
          label = t.review.signatureNoName
        } else {
          label = t.review.notSigned
        }
        break
      }
    }

    return {
      sectionId: section.id,
      letter: section.letter,
      title: section.title,
      icon: section.icon,
      isFilled,
      label,
    }
  })
}

export default function ReviewPage() {
  const { state } = useInterview()
  const { t } = useI18n()
  const summaries = getSectionSummaries(state, t)
  const filledCount = summaries.filter(s => s.isFilled).length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16 animate-fade-in">
        <Link
          to="/interview/verification"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.review.backToInterview}
        </Link>

        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t.review.title}
          </h1>
          <p className="text-base sm:text-lg text-secondary-foreground/90 leading-relaxed">
            {t.review.body}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t.review.sectionsHaveInfo(filledCount, summaries.length)}
          </p>
        </div>

        {/* Section summary grid */}
        <div className="grid gap-4 sm:grid-cols-2 mb-10 sm:mb-12">
          {summaries.map((summary) => {
            const IconComponent = ICON_MAP[summary.icon]

            return (
              <Link
                key={summary.sectionId}
                to={`/interview/${summary.sectionId}`}
                className={`flex min-w-0 items-start gap-4 p-4 sm:p-5 rounded-xl border-2 transition-all text-left group ${
                  summary.isFilled
                    ? 'bg-white border-border hover:border-primary hover:shadow-sm shadow-theme'
                    : 'bg-secondary/50 border-border/50 hover:border-border hover:bg-secondary'
                }`}
              >
                {/* Icon & status indicator */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  summary.isFilled
                    ? 'bg-ring text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {summary.isFilled ? (
                    <Check className="w-4.5 h-4.5" />
                  ) : IconComponent ? (
                    <IconComponent className="w-4.5 h-4.5" />
                  ) : (
                    <Minus className="w-4.5 h-4.5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex min-w-0 items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {summary.letter}
                    </span>
                    <h3 className={`min-w-0 text-sm font-semibold truncate ${
                      summary.isFilled ? 'text-foreground' : 'text-secondary-foreground'
                    }`}>
                      {summary.title}
                    </h3>
                  </div>
                  <p className={`text-sm ${
                    summary.isFilled ? 'text-secondary-foreground' : 'text-muted-foreground'
                  }`}>
                    {summary.label}
                  </p>
                </div>

                {/* Edit indicator */}
                <span className="hidden sm:inline text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center flex-shrink-0">
                  {t.common.edit}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Bottom navigation */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 border-t border-border">
          <Link
            to="/interview/verification"
            className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.review.backToInterview}
          </Link>

          <Link
            to="/export"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-button font-semibold hover:bg-primary/90 transition-colors min-h-[44px]"
          >
            {t.review.downloadDocument}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
