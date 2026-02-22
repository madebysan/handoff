interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
  placeholder?: string
  helpText?: string
}

export default function SelectField({ label, value, onChange, options, placeholder, helpText }: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-charcoal mb-1.5">
        {label}
      </label>
      {helpText && (
        <p className="text-xs text-charcoal-muted mb-1.5">{helpText}</p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 pr-10 py-2.5 bg-white border border-warm-gray rounded-lg text-sm text-charcoal focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/30 transition-colors"
      >
        <option value="">{placeholder || 'Select...'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
