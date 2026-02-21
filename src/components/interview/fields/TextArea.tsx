interface TextAreaProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  helpText?: string
  rows?: number
}

export default function TextArea({ label, value, onChange, placeholder, helpText, rows = 4 }: TextAreaProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-charcoal mb-1.5">
        {label}
      </label>
      {helpText && (
        <p className="text-xs text-charcoal-muted mb-1.5">{helpText}</p>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 bg-white border border-border rounded-lg text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-colors resize-y"
      />
    </div>
  )
}
