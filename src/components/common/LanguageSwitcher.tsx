import { VISIBLE_LOCALES, useI18n } from '../../i18n'
import type { VisibleLocale } from '../../i18n/translations'

interface LanguageSwitcherProps {
  compact?: boolean
}

const LOCALE_LABELS: Record<VisibleLocale, string> = {
  en: 'EN',
  es: 'ES',
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-white p-1 ${compact ? '' : 'gap-1'}`}
      aria-label={t.language.label}
    >
      {VISIBLE_LOCALES.map(option => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={`min-h-[32px] rounded-full px-3 text-xs font-semibold transition-colors ${
            locale === option
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-pressed={locale === option}
          title={option === 'en' ? t.language.english : t.language.spanish}
        >
          {LOCALE_LABELS[option]}
        </button>
      ))}
    </div>
  )
}
