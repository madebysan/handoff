interface SectionIntroProps {
  title: string
  letter: string
  intro: string
  scenario: string
}

export default function SectionIntro({ title, letter, intro, scenario }: SectionIntroProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-full bg-sage text-cream flex items-center justify-center font-semibold text-lg">
          {letter}
        </span>
        <h2 className="text-2xl font-bold text-charcoal">{title}</h2>
      </div>
      <p className="text-charcoal-light leading-relaxed mb-4">{intro}</p>
      <div className="bg-sage-bg rounded-lg p-4 border-l-4 border-sage">
        <p className="text-sm text-sage-dark italic">
          <span className="font-medium not-italic">Why this matters: </span>
          {scenario}
        </p>
      </div>
    </div>
  )
}
