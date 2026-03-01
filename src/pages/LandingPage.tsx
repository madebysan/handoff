import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ShieldCheck, Clock, FileText, Heart, Users, Lock, ArrowRight, CheckCircle2, Eye, EyeOff, WifiOff, Timer, Save } from 'lucide-react'

const FEATURES = [
  {
    key: 'completeness',
    title: 'Structured completeness',
    description: 'Twelve sections modeled on what estate attorneys cover with clients. Surfaces everything most people forget.',
    icon: FileText,
  },
  {
    key: 'privacy',
    title: 'Zero-trust privacy',
    description: 'Nothing leaves your browser. No accounts, no servers, no data collection. Your information stays on your device.',
    icon: Lock,
  },
  {
    key: 'gift',
    title: 'A gift to your family',
    description: 'Thirty minutes now saves your family weeks of confusion and stress when it matters most.',
    icon: Heart,
  },
  {
    key: 'quick',
    title: 'Complete in one sitting',
    description: 'Skip what doesn\'t apply, fill in what does. Save your draft and come back anytime.',
    icon: Clock,
  },
]

const SECTIONS_PREVIEW = [
  'The Basics',
  'Key Contacts',
  'Financial Accounts',
  'Insurance Policies',
  'Property & Assets',
  'Digital Life',
  'Legal Documents',
  'Debts & Liabilities',
  'Business Interests',
  'Dependents & Pets',
  'Personal Wishes',
  'Sign & Finish',
]

// Animation constants
const EASE = [0.25, 0.1, 0.25, 1] as const

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

const scrollReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

const featureFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

function FeatureVisual({ featureKey }: { featureKey: string }) {
  switch (featureKey) {
    case 'completeness':
      return (
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-theme">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <FileText className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Your Handoff Document</p>
              <p className="text-xs text-muted-foreground">12 sections</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SECTIONS_PREVIEW.map((name) => (
              <div key={name} className="flex items-center gap-2 px-3 py-2 rounded-md bg-background text-xs text-secondary-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-ring flex-shrink-0" />
                {name}
              </div>
            ))}
          </div>
        </div>
      )

    case 'privacy':
      return (
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-theme">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-accent-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">How your data flows</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">You type answers</p>
                <p className="text-[11px] text-muted-foreground">Data stays in your browser tab</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <WifiOff className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">No network requests</p>
                <p className="text-[11px] text-muted-foreground">Zero data sent to any server</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <EyeOff className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">No tracking or analytics</p>
                <p className="text-[11px] text-muted-foreground">We don't know you exist</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Download and it's gone</p>
                <p className="text-[11px] text-muted-foreground">Clear browser data anytime</p>
              </div>
            </div>
          </div>
        </div>
      )

    case 'gift':
      return (
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-theme">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <Heart className="w-4 h-4 text-accent-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">Without a Handoff document</p>
          </div>
          <div className="space-y-2 mb-5">
            {[
              'Where are the insurance policies?',
              'What bank accounts did they have?',
              'Who is the estate attorney?',
              'What are the login credentials?',
              'Did they have a storage unit?',
            ].map((q) => (
              <div key={q} className="flex items-center gap-2 px-3 py-2.5 rounded-md bg-destructive-bg/60 text-xs text-secondary-foreground">
                <span className="text-destructive flex-shrink-0">?</span>
                {q}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">With a Handoff document</p>
          </div>
          <div className="px-3 py-2.5 rounded-md bg-accent text-xs text-accent-foreground font-medium">
            Everything answered, organized, in one place.
          </div>
        </div>
      )

    case 'quick':
      return (
        <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-theme">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <Timer className="w-4 h-4 text-accent-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">Built for real life</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-xs font-semibold text-accent-foreground">~30</div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Minutes to complete</p>
                <p className="text-[11px] text-muted-foreground">Most people finish in one sitting</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Skip what doesn't apply</p>
                <p className="text-[11px] text-muted-foreground">No section is required</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Save className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Save draft, come back later</p>
                <p className="text-[11px] text-muted-foreground">Your progress is saved locally</p>
              </div>
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // When reduced motion is preferred, skip all animations
  const noMotion = {
    hidden: {},
    visible: {},
  }
  const noMotionItem = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  }
  const noMotionFade = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
  }

  const stagger = prefersReducedMotion ? noMotion : heroStagger
  const item = prefersReducedMotion ? noMotionItem : heroItem
  const scroll = prefersReducedMotion ? noMotionItem : scrollReveal
  const fade = prefersReducedMotion ? noMotionFade : featureFade

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
        <span className="text-xl font-bold text-foreground tracking-tight">Handoff</span>
        <Link
          to="/interview"
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-button text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-14 sm:pb-20">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6"
            variants={item}
          >
            One document so your family never has to guess.
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-secondary-foreground/90 leading-relaxed mb-10 max-w-2xl"
            variants={item}
          >
            Handoff guides you through everything your family would need to know — accounts, documents, wishes, and more — and produces a single document you control entirely.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            variants={item}
          >
            <Link
              to="/interview"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-button text-base font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-muted-foreground text-sm">
              Free forever. No account needed. Nothing stored online.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features — interactive two-column */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-14 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left column — heading + visual */}
          <div>
            <span className="inline-block text-xs font-medium text-muted-foreground bg-secondary border border-border px-3.5 py-1.5 rounded-full mb-5">
              Why Handoff
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight mb-6">
              Everything your family would need, in one place.
            </h2>
            <p className="text-secondary-foreground leading-relaxed mb-8">
              Most people never organize this information. When something happens, families are left scrambling — searching through drawers, guessing at passwords, calling banks. Handoff fixes that.
            </p>

            <div className="min-h-[340px] sm:min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={FEATURES[activeFeature].key}
                  {...fade}
                >
                  <FeatureVisual featureKey={FEATURES[activeFeature].key} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right column — clickable feature items */}
          <div className="space-y-3 lg:pt-16">
            {FEATURES.map((feature, i) => (
              <button
                key={feature.key}
                onClick={() => setActiveFeature(i)}
                className={`w-full text-left rounded-xl p-6 transition-colors cursor-pointer ${
                  i === activeFeature
                    ? 'bg-secondary border border-border'
                    : 'hover:bg-secondary border border-transparent'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1.5">{feature.title}</h3>
                    <p className="text-sm text-secondary-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <span className="inline-block text-xs font-medium text-muted-foreground bg-background border border-border px-3.5 py-1.5 rounded-full mb-5">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight mb-12 max-w-xl">
            Three steps. Thirty minutes. Done forever.
          </h2>
          <motion.div
            className="grid gap-8 sm:gap-12 sm:grid-cols-3"
            variants={scroll}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground font-semibold text-sm mb-4">1</span>
              <h3 className="font-semibold text-foreground mb-2 text-lg">Answer guided questions</h3>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                Walk through twelve sections covering contacts, accounts, insurance, digital life, legal documents, debts, dependents, and personal wishes. Skip anything that doesn't apply.
              </p>
            </div>
            <div>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground font-semibold text-sm mb-4">2</span>
              <h3 className="font-semibold text-foreground mb-2 text-lg">Download your document</h3>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                Get a professionally formatted PDF or Markdown file — your Handoff document. Everything your family needs, organized and clear.
              </p>
            </div>
            <div>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground font-semibold text-sm mb-4">3</span>
              <h3 className="font-semibold text-foreground mb-2 text-lg">Store it, share it, done</h3>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                Put a copy in your safe, share with your spouse, or give to your attorney. You control where it lives and who sees it.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy callout */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <motion.div
          className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center"
          variants={scroll}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div>
            <span className="inline-block text-xs font-medium text-muted-foreground bg-secondary border border-border px-3.5 py-1.5 rounded-full mb-5">
              Privacy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight mb-6">
              Your data never leaves your device.
            </h2>
            <p className="text-secondary-foreground leading-relaxed mb-6">
              Handoff runs entirely in your browser. We don't have servers, accounts, or analytics. There's no database to hack because there's no database, period.
            </p>
            <div className="space-y-3">
              {[
                'No account creation required',
                'No data transmitted to any server',
                'Everything saved locally in your browser',
                'Export your document and clear your data anytime',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-secondary-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-secondary rounded-xl border border-border p-8 sm:p-10">
            <Lock className="w-10 h-10 text-accent-foreground mb-5" />
            <p className="text-lg font-semibold text-foreground mb-3">
              The most secure personal document tool is the one that never sees your data.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unlike cloud-based services, Handoff has zero attack surface. Your sensitive information — bank accounts, insurance policies, passwords — exists only on your machine, in your document.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Do it together */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-12 sm:pb-16">
        <motion.div
          className="relative rounded-xl overflow-hidden"
          variants={scroll}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <img
            src="/footer-painting.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
                Do it together
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Thinking about suggesting this to a parent or partner? The easiest way to start the conversation is to do it yourself first, then share yours.
              </p>
              <Link
                to="/interview"
                className="inline-flex items-center gap-2 bg-background text-foreground px-7 py-3.5 rounded-button text-base font-semibold hover:bg-white transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-8 text-[10px] text-white/40">
              Auguste Allongé, <em>Autumn Landscape in the Forest of Fontainebleau</em>, c. 1860.{' '}
              <a href="https://www.nga.gov/artworks/219032-autumn-landscape-forest-fontainebleau" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/60 transition-colors">
                National Gallery of Art
              </a>, Washington.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Handoff</span> — Free, open-source, yours to keep.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="https://github.com/madebysan/handoff" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <span>
              Made by{' '}
              <a href="https://santiagoalonso.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline underline-offset-2">
                santiagoalonso.com
              </a>
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}
