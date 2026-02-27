/** All theme tokens with their default values and human-readable labels.
 *  Single source of truth — matches :root in index.css.
 *  Token names follow shadcn/ui convention for portability. */

export interface ThemeToken {
  cssVar: string
  label: string
  defaultValue: string
  category: 'color' | 'font' | 'radius' | 'spacing' | 'shadow' | 'border'
}

export const THEME_TOKENS: ThemeToken[] = [
  // Colors — shadcn standard semantic names
  { cssVar: '--background', label: 'Background', defaultValue: '#FAF8F4', category: 'color' },
  { cssVar: '--foreground', label: 'Foreground (text)', defaultValue: '#1C1917', category: 'color' },
  { cssVar: '--card', label: 'Card', defaultValue: '#F0EDE6', category: 'color' },
  { cssVar: '--card-foreground', label: 'Card foreground', defaultValue: '#1C1917', category: 'color' },
  { cssVar: '--popover', label: 'Popover', defaultValue: '#FFFFFF', category: 'color' },
  { cssVar: '--popover-foreground', label: 'Popover foreground', defaultValue: '#1C1917', category: 'color' },
  { cssVar: '--primary', label: 'Primary (accent)', defaultValue: '#7C6E54', category: 'color' },
  { cssVar: '--primary-foreground', label: 'Primary foreground', defaultValue: '#FFFFFF', category: 'color' },
  { cssVar: '--secondary', label: 'Secondary', defaultValue: '#F5F3EE', category: 'color' },
  { cssVar: '--secondary-foreground', label: 'Secondary foreground', defaultValue: '#44403C', category: 'color' },
  { cssVar: '--muted', label: 'Muted', defaultValue: '#E8E5D9', category: 'color' },
  { cssVar: '--muted-foreground', label: 'Muted foreground', defaultValue: '#78716C', category: 'color' },
  { cssVar: '--accent', label: 'Accent', defaultValue: '#F0EDE6', category: 'color' },
  { cssVar: '--accent-foreground', label: 'Accent foreground', defaultValue: '#5C5240', category: 'color' },
  { cssVar: '--destructive', label: 'Destructive', defaultValue: '#B54839', category: 'color' },
  { cssVar: '--destructive-foreground', label: 'Destructive foreground', defaultValue: '#FFFFFF', category: 'color' },
  { cssVar: '--border', label: 'Border', defaultValue: '#DBD8CE', category: 'color' },
  { cssVar: '--input', label: 'Input border', defaultValue: '#DBD8CE', category: 'color' },
  { cssVar: '--ring', label: 'Ring (focus)', defaultValue: '#A89B80', category: 'color' },
  { cssVar: '--destructive-bg', label: 'Destructive background', defaultValue: '#FDF0EE', category: 'color' },

  // Fonts
  { cssVar: '--font-sans', label: 'Body font (sans-serif)', defaultValue: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif", category: 'font' },
  { cssVar: '--font-mono', label: 'Code font (monospace)', defaultValue: "'IBM Plex Mono', ui-monospace, monospace", category: 'font' },

  // Radius — base value for cards/inputs, Tailwind derives sm/md/lg/xl via calc()
  { cssVar: '--radius', label: 'Border radius', defaultValue: '0.625rem', category: 'radius' },
  { cssVar: '--radius-button', label: 'Button radius', defaultValue: '2rem', category: 'radius' },

  // Shadow — applied to cards/containers
  { cssVar: '--shadow', label: 'Card shadow', defaultValue: 'none', category: 'shadow' },

  // Input border width
  { cssVar: '--input-border-width', label: 'Input borders', defaultValue: '1px', category: 'border' },

  // Spacing
  { cssVar: '--spacing', label: 'Base spacing unit', defaultValue: '0.25rem', category: 'spacing' },
]

export function getTokensByCategory(category: ThemeToken['category']): ThemeToken[] {
  return THEME_TOKENS.filter(t => t.category === category)
}

export function getTokenDefault(cssVar: string): string | undefined {
  return THEME_TOKENS.find(t => t.cssVar === cssVar)?.defaultValue
}
