import { Plus, Trash2 } from 'lucide-react'
import { type ReactNode } from 'react'

interface RepeatableGroupProps {
  label: string
  items: unknown[]
  onAdd: () => void
  onRemove: (index: number) => void
  children: (index: number) => ReactNode
  addLabel?: string
}

export default function RepeatableGroup({ label, items, onAdd, onRemove, children, addLabel }: RepeatableGroupProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-foreground mb-4">{label}</h3>
      <div className="space-y-4">
        {items.map((_, index) => (
          <div key={index} className="relative bg-white rounded-xl border border-input shadow-theme p-4 sm:p-5">
            {items.length > 1 && (
              <button
                onClick={() => {
                  if (window.confirm('Remove this item? This can\'t be undone.')) {
                    onRemove(index)
                  }
                }}
                className="absolute top-2 right-2 p-2.5 text-muted-foreground hover:text-destructive rounded-md hover:bg-destructive-bg transition-colors"
                title="Remove"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            {children(index)}
          </div>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm text-accent-foreground hover:text-primary hover:border-primary font-medium transition-colors border-2 border-dashed border-input rounded-xl py-3 min-h-[44px]"
      >
        <Plus className="w-4 h-4" />
        {addLabel || 'Add another'}
      </button>
    </div>
  )
}
