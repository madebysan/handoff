import type { LocalizedOption } from '../../../i18n/translations'
import { useI18n } from '../../../i18n'

interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly (string | LocalizedOption)[]
  placeholder?: string
  helpText?: string
}

function normalizeOption(option: string | LocalizedOption): LocalizedOption {
  return typeof option === 'string' ? { value: option, label: option } : option
}

export default function SelectField({ label, value, onChange, options, placeholder, helpText }: SelectFieldProps) {
  const { t } = useI18n()

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      {helpText && (
        <p className="text-xs text-muted-foreground mb-1.5">{helpText}</p>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-3 pr-9 py-2.5 bg-white border border-input rounded-md text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors"
        >
          <option value="">{placeholder || t.common.select}</option>
          {options.map((option) => {
            const opt = normalizeOption(option)

            return (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )
          })}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>
    </div>
  )
}
