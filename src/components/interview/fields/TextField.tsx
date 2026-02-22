import type { ReactNode } from 'react'

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  helpText?: string
  type?: string
  icon?: ReactNode
}

export default function TextField({ label, value, onChange, placeholder, helpText, type = 'text', icon }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-charcoal mb-1.5">
        {label}
      </label>
      {helpText && (
        <p className="text-xs text-charcoal-muted mb-1.5">{helpText}</p>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2.5 bg-white border border-warm-gray rounded-lg text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/30 transition-colors ${icon ? 'pr-10' : ''}`}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted/40 pointer-events-none">
            {icon}
          </span>
        )}
      </div>
    </div>
  )
}
