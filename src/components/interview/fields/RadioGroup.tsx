interface RadioGroupProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  helpText?: string
}

export default function RadioGroup({ label, value, onChange, options, helpText }: RadioGroupProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      {helpText && (
        <p className="text-xs text-muted-foreground mb-1.5">{helpText}</p>
      )}
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2.5 rounded-button text-sm font-medium border transition-colors min-h-[44px] ${
              value === opt
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-white text-secondary-foreground border-input hover:border-primary'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
