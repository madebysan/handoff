interface TextAreaProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  helpText?: string
  rows?: number
}

export default function TextArea({ label, value, onChange, placeholder, helpText, rows = 6 }: TextAreaProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      {helpText && (
        <p className="text-xs text-muted-foreground mb-1.5">{helpText}</p>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 bg-white border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors resize-y"
      />
    </div>
  )
}
