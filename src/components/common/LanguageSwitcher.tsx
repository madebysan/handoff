import { useLocation, useNavigate } from 'react-router-dom'
import { SPANISH_LANDING_PATH, VISIBLE_LOCALES, getPathLocale, useI18n } from '../../i18n'
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
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // On the landing page, keep the address in step with the language (/ or /es).
  const chooseLocale = (option: VisibleLocale) => {
    setLocale(option)
    if (option === 'es' && pathname === '/') navigate(SPANISH_LANDING_PATH, { replace: true })
    if (option !== 'es' && getPathLocale(pathname)) navigate('/', { replace: true })
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-white p-1 ${compact ? '' : 'gap-1'}`}
      aria-label={t.language.label}
    >
      {VISIBLE_LOCALES.map(option => (
        <button
          key={option}
          type="button"
          onClick={() => chooseLocale(option)}
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
