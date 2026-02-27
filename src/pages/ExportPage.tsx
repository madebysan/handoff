import { Link } from 'react-router-dom'
import { useInterview } from '../hooks/useInterview'
import { generateMarkdown } from '../lib/markdown-generator'
import { generatePDF } from '../lib/pdf-generator'
import { FileText, FileDown, ArrowLeft, Copy, Check, AlertCircle, Loader2, Scale } from 'lucide-react'
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
    a.download = `handoff-letter-of-instruction-${new Date().toISOString().split('T')[0]}.md`
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
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16 animate-fade-in">
        <Link to="/interview/verification" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors min-h-[44px]">
          <ArrowLeft className="w-4 h-4" />
          Back to interview
        </Link>

        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            You just created something invaluable.
          </h1>
          <p className="text-base sm:text-lg text-secondary-foreground/90 leading-relaxed">
            Most people never organize this information. Your family will thank you for taking the time. Download your letter of instruction below and store it somewhere safe.
          </p>
        </div>

        {/* Empty state warning */}
        {!dataExists && (
          <div className="flex gap-3 bg-secondary rounded-xl p-4 mb-8 border border-border">
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">No information entered yet</p>
              <p className="text-sm text-secondary-foreground">
                Your document will be mostly empty. <Link to="/interview/contacts" className="text-accent-foreground hover:text-primary underline">Go back to the interview</Link> to fill in your information first.
              </p>
            </div>
          </div>
        )}

        {/* Download Options */}
        <div className="grid gap-4 sm:grid-cols-2 mb-10 sm:mb-16">
          <button
            onClick={handleDownloadPDF}
            disabled={generatingPDF}
            className="flex items-center gap-4 p-5 sm:p-6 bg-white rounded-xl border-2 border-border hover:border-primary hover:shadow-sm transition-all text-left disabled:opacity-60 disabled:cursor-wait shadow-theme"
          >
            <div className="w-12 h-12 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
              {generatingPDF ? (
                <Loader2 className="w-6 h-6 text-accent-foreground animate-spin" />
              ) : (
                <FileDown className="w-6 h-6 text-accent-foreground" />
              )}
            </div>
            <div>
              <div className="font-semibold text-foreground">
                {generatingPDF ? 'Generating...' : 'Download PDF'}
              </div>
              <div className="text-sm text-secondary-foreground">Professional format, ready to print or share</div>
            </div>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-4 p-5 sm:p-6 bg-white rounded-xl border-2 border-border hover:border-primary hover:shadow-sm transition-all text-left shadow-theme"
          >
            <div className="w-12 h-12 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Download Markdown</div>
              <div className="text-sm text-secondary-foreground">Portable, editable, future-proof format</div>
            </div>
          </button>
        </div>

        {/* Legal disclaimer */}
        <div className="flex gap-3 bg-secondary rounded-xl p-4 sm:p-5 mb-10 border border-border">
          <Scale className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">This is not a legal document.</p>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              Your letter of instruction is a practical guide for your family — it organizes what they need to know. To make any of your wishes legally binding, share this document with an estate attorney who can help you create or update a will, power of attorney, and other legal instruments.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
          >
            {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to clipboard' : 'Copy as text'}
          </button>
        </div>

        <hr className="border-border my-10 sm:my-12" />

        <GuidanceSection />

        <hr className="border-border my-10 sm:my-12" />

        <DoItTogetherInvite />

        <div className="mt-12 sm:mt-16 text-center text-sm text-muted-foreground">
          <p>Generated with Handoff — free, private, yours to keep.</p>
        </div>
      </div>
    </div>
  )
}
