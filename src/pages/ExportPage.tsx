import { Link } from 'react-router-dom'
import { useInterview } from '../hooks/useInterview'
import { generateMarkdown } from '../lib/markdown-generator'
import { generatePDF } from '../lib/pdf-generator'
import { FileText, FileDown, ArrowLeft, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import GuidanceSection from '../components/export/GuidanceSection'
import DoItTogetherInvite from '../components/export/DoItTogetherInvite'

export default function ExportPage() {
  const { state } = useInterview()
  const [copied, setCopied] = useState(false)

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

  const handleDownloadPDF = () => {
    generatePDF(state)
  }

  const handleCopyMarkdown = () => {
    const md = generateMarkdown(state)
    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/interview/wishes" className="inline-flex items-center gap-2 text-charcoal-muted hover:text-charcoal mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to interview
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">
            You just created something invaluable.
          </h1>
          <p className="text-lg text-charcoal-light leading-relaxed">
            Most people never organize this information. Your family will thank you for taking the time. Download your letter of instruction below and store it somewhere safe.
          </p>
        </div>

        {/* Download Options */}
        <div className="grid gap-4 sm:grid-cols-2 mb-16">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-4 p-6 bg-white rounded-xl border border-border hover:border-sage transition-colors text-left"
          >
            <div className="w-12 h-12 bg-sage-bg rounded-lg flex items-center justify-center flex-shrink-0">
              <FileDown className="w-6 h-6 text-sage-dark" />
            </div>
            <div>
              <div className="font-semibold text-charcoal">Download PDF</div>
              <div className="text-sm text-charcoal-muted">Professional format, ready to print or share</div>
            </div>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-4 p-6 bg-white rounded-xl border border-border hover:border-sage transition-colors text-left"
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
            className="inline-flex items-center gap-2 text-sm text-charcoal-muted hover:text-charcoal transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to clipboard' : 'Copy as text'}
          </button>
        </div>

        <hr className="border-border my-12" />

        <GuidanceSection />

        <hr className="border-border my-12" />

        <DoItTogetherInvite />

        <div className="mt-16 text-center text-sm text-charcoal-muted">
          <p>Generated with Relay — free, private, yours to keep.</p>
        </div>
      </div>
    </div>
  )
}
