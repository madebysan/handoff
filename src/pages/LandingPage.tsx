import { Link } from 'react-router-dom'
import { ClipboardList, ShieldCheck, Heart } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        <span className="text-xl font-bold text-charcoal">Relay</span>
        <Link
          to="/interview"
          className="text-sm font-medium text-sage-dark hover:text-sage transition-colors min-h-[44px] flex items-center"
        >
          Start now
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-charcoal tracking-tight mb-6 leading-tight">
          Get your life organized so your family never has to guess.
        </h1>
        <p className="text-base sm:text-xl text-charcoal-light mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
          Relay guides you through everything your family would need to know — accounts, documents, wishes, and more — and produces a single, comprehensive document you control entirely.
        </p>
        <Link
          to="/interview"
          className="inline-block bg-sage text-cream px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sage-dark transition-colors shadow-sm"
        >
          Start Your Relay
        </Link>
        <p className="mt-5 text-charcoal-muted text-sm">
          Free forever. No account needed. Nothing stored on our servers.
        </p>
      </section>

      {/* Value Prop Pillars */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-sage-bg rounded-xl flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-sage-dark" />
            </div>
            <h3 className="font-semibold text-charcoal mb-2">Structured completeness</h3>
            <p className="text-sm text-charcoal-light leading-relaxed">
              Modeled on the process estate attorneys use with their clients. Ten sections that surface the things most people forget.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-sage-bg rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-sage-dark" />
            </div>
            <h3 className="font-semibold text-charcoal mb-2">Zero-trust privacy</h3>
            <p className="text-sm text-charcoal-light leading-relaxed">
              Nothing leaves your browser. No accounts, no servers, no data collection. Your information stays on your device, period.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-sage-bg rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-sage-dark" />
            </div>
            <h3 className="font-semibold text-charcoal mb-2">A gift to your family</h3>
            <p className="text-sm text-charcoal-light leading-relaxed">
              Most people never organize this information. Thirty minutes now saves your family weeks of confusion and stress later.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl font-bold text-charcoal text-center mb-8 sm:mb-10">How it works</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-sage text-cream flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-0.5">1</span>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Answer guided questions</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Walk through ten sections covering contacts, accounts, insurance, digital life, legal documents, debts, dependents, and your personal wishes. Skip anything that doesn't apply.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-sage text-cream flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-0.5">2</span>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Download your document</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Get a professionally formatted PDF or Markdown file — your personal letter of instruction. Everything your family would need, organized and clear.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-sage text-cream flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-0.5">3</span>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Store it, share it, done</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  Put a copy in your safe, share with your spouse, or give to your attorney. You control where it lives and who sees it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do It Together */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-sage-bg/60 rounded-2xl p-6 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Do it together</h2>
          <p className="text-charcoal-light leading-relaxed mb-2 max-w-xl mx-auto">
            Thinking about suggesting this to a parent? You're not alone. The easiest way to start the conversation is to do it yourself first, then share:
          </p>
          <p className="text-sage-dark font-medium italic mb-8">
            "I just organized all my information for the family. Took 30 minutes. Want to do yours?"
          </p>
          <Link
            to="/interview"
            className="inline-block bg-sage text-cream px-6 py-3 rounded-lg font-semibold hover:bg-sage-dark transition-colors"
          >
            Start Your Relay
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-charcoal-muted">
            <span className="font-medium text-charcoal">Relay</span> — Free, open-source, yours to keep.
          </div>
          <div className="flex gap-6 text-sm text-charcoal-muted">
            <a href="https://github.com/madebysan/relay" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
