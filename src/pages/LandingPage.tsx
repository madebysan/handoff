import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-charcoal tracking-tight mb-6">
          Get your life organized so your family never has to guess.
        </h1>
        <p className="text-xl text-charcoal-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Relay guides you through everything your family would need to know — accounts, documents, wishes, and more — and produces a single, comprehensive document you control entirely.
        </p>
        <Link
          to="/interview"
          className="inline-block bg-sage text-cream px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sage-dark transition-colors"
        >
          Start Your Relay
        </Link>
        <p className="mt-6 text-charcoal-muted text-sm">
          Free forever. No account needed. Nothing stored on our servers.
        </p>
      </div>
    </div>
  )
}
