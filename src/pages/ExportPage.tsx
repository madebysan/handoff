import { Link } from 'react-router-dom'
import { useInterview } from '../hooks/useInterview'
import { generateMarkdown } from '../lib/markdown-generator'
import { generatePDF } from '../lib/pdf-generator'
import { FileText, FileDown, ArrowLeft, Copy, Check, AlertCircle, Loader2 } from 'lucide-react'
import { useState, useMemo } from 'react'
import GuidanceSection from '../components/export/GuidanceSection'
import DoItTogetherInvite from '../components/export/DoItTogetherInvite'

function hasAnyData(state: ReturnType<typeof useInterview>['state']): boolean {
  const hasContacts = state.contacts.some(c => c.name.trim() !== '')
  const hasAccounts = state.financialAccounts.some(a => a.institution.trim() !== '')
  const hasInsurance = state.insurancePolicies.some(p => p.carrier.trim() !== '')
  const hasProperty = state.properties.some(p => p.description.trim() !== '' || p.propertyType.trim() !== '')
  const hasDigital = Object.values(state.digital).some(v => v.trim() !== '')
  const hasLegal = state.legalDocuments.some(d => d.documentType.trim() !== '')
  const hasDebts = state.debts.some(d => d.lender.trim() !== '')
  const hasBusiness = Object.values(state.business).some(v => v.trim() !== '')
  const hasDependents = Object.values(state.dependents).some(v => v.trim() !== '')
  const hasWishes = Object.values(state.wishes).some(v => v.trim() !== '')
  return hasContacts || hasAccounts || hasInsurance || hasProperty || hasDigital || hasLegal || hasDebts || hasBusiness || hasDependents || hasWishes
}

export default function ExportPage() {
  const { state } = useInterview()
  const [copied, setCopied] = useState(false)
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const dataExists = useMemo(() => hasAnyData(state), [state])

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown(state)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relay-letter-of-instruction-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true)
    // Use setTimeout to let the UI update before blocking with PDF generation
    setTimeout(() => {
      generatePDF(state)
      setGeneratingPDF(false)
    }, 50)
  }

  const handleCopyMarkdown = () => {
    const md = generateMarkdown(state)
    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16 animate-fade-in">
        <Link to="/interview/wishes" className="inline-flex items-center gap-2 text-charcoal-muted hover:text-charcoal mb-6 sm:mb-8 transition-colors min-h-[44px]">
          <ArrowLeft className="w-4 h-4" />
          Back to interview
        </Link>

        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            You just created something invaluable.
          </h1>
          <p className="text-base sm:text-lg text-charcoal-light leading-relaxed">
            Most people never organize this information. Your family will thank you for taking the time. Download your letter of instruction below and store it somewhere safe.
          </p>
        </div>

        {/* Empty state warning */}
        {!dataExists && (
          <div className="flex gap-3 bg-warm-gray-light rounded-xl p-4 mb-8 border border-border">
            <AlertCircle className="w-5 h-5 text-charcoal-muted flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-charcoal mb-1">No information entered yet</p>
              <p className="text-sm text-charcoal-light">
                Your document will be mostly empty. <Link to="/interview/contacts" className="text-sage-dark hover:text-sage underline">Go back to the interview</Link> to fill in your information first.
              </p>
            </div>
          </div>
        )}

        {/* Download Options */}
        <div className="grid gap-4 sm:grid-cols-2 mb-10 sm:mb-16">
          <button
            onClick={handleDownloadPDF}
            disabled={generatingPDF}
            className="flex items-center gap-4 p-5 sm:p-6 bg-white rounded-xl border border-border hover:border-sage transition-colors text-left disabled:opacity-60 disabled:cursor-wait"
          >
            <div className="w-12 h-12 bg-sage-bg rounded-lg flex items-center justify-center flex-shrink-0">
              {generatingPDF ? (
                <Loader2 className="w-6 h-6 text-sage-dark animate-spin" />
              ) : (
                <FileDown className="w-6 h-6 text-sage-dark" />
              )}
            </div>
            <div>
              <div className="font-semibold text-charcoal">
                {generatingPDF ? 'Generating...' : 'Download PDF'}
              </div>
              <div className="text-sm text-charcoal-muted">Professional format, ready to print or share</div>
            </div>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-4 p-5 sm:p-6 bg-white rounded-xl border border-border hover:border-sage transition-colors text-left"
          >
            <div className="w-12 h-12 bg-sage-bg rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-sage-dark" />
            </div>
            <div>
              <div className="font-semibold text-charcoal">Download Markdown</div>
              <div className="text-sm text-charcoal-muted">Portable, editable, future-proof format</div>
            </div>
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-2 text-sm text-charcoal-muted hover:text-charcoal transition-colors min-h-[44px]"
          >
            {copied ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to clipboard' : 'Copy as text'}
          </button>
        </div>

        <hr className="border-border my-10 sm:my-12" />

        <GuidanceSection />

        <hr className="border-border my-10 sm:my-12" />

        <DoItTogetherInvite />

        <div className="mt-12 sm:mt-16 text-center text-sm text-charcoal-muted">
          <p>Generated with Relay — free, private, yours to keep.</p>
        </div>
      </div>
    </div>
  )
}
