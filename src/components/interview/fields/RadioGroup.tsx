import type { LocalizedOption } from '../../../i18n/translations'

interface RadioGroupProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly (string | LocalizedOption)[]
  helpText?: string
}

function normalizeOption(option: string | LocalizedOption): LocalizedOption {
  return typeof option === 'string' ? { value: option, label: option } : option
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
        {options.map((option) => {
          const opt = normalizeOption(option)

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-4 py-2.5 rounded-button text-sm font-medium border transition-colors min-h-[44px] ${
                value === opt.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white text-secondary-foreground border-input hover:border-primary'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
