import {
  CircleUser, Users, Landmark, Shield, Home, Monitor, FileText,
  CreditCard, Briefcase, Heart, PenLine, Fingerprint,
  type LucideIcon,
} from 'lucide-react'

// Same icon map used in ProgressSidebar
const ICON_MAP: Record<string, LucideIcon> = {
  CircleUser, Users, Landmark, Shield, Home, Monitor, FileText,
  CreditCard, Briefcase, Heart, PenLine, Fingerprint,
}

interface SectionIntroProps {
  title: string
  letter: string
  intro: string
  scenario: string
  icon?: string
}

export default function SectionIntro({ title, letter, intro, scenario, icon }: SectionIntroProps) {
  const IconComponent = icon ? ICON_MAP[icon] : null

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-lg">
          {IconComponent ? <IconComponent className="w-5 h-5" /> : letter}
        </span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-secondary-foreground leading-relaxed mb-4">{intro}</p>
      <div className="bg-accent rounded-md p-4 border-l-4 border-primary flex gap-3">
        <span className="text-primary text-lg leading-none mt-0.5">&#8220;</span>
        <p className="text-sm text-accent-foreground leading-relaxed">
          <span className="font-medium">Why this matters: </span>
          {scenario}
        </p>
      </div>
    </div>
  )
}
