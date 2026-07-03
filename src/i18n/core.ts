import { createContext, useContext } from 'react'
import { translations, type Locale, type LocalizedOption, type Translation, type VisibleLocale } from './translations'

export const LOCALE_STORAGE_KEY = 'handoff-locale'
export const VISIBLE_LOCALES: VisibleLocale[] = ['en', 'es']
export const SUPPORTED_LOCALES: Locale[] = [...VISIBLE_LOCALES, 'pseudo']

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translation
}

export const I18nContext = createContext<I18nContextValue | null>(null)

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && SUPPORTED_LOCALES.includes(value as Locale)
}

function canUseStoredLocale(locale: Locale): boolean {
  return locale !== 'pseudo' || !import.meta.env.PROD
}

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en'

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (isLocale(storedLocale) && canUseStoredLocale(storedLocale)) return storedLocale

  const browserLocale = window.navigator.language.toLowerCase()
  return browserLocale.startsWith('es') ? 'es' : 'en'
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }
  return context
}

export function getTranslationForStoredLocale(): Translation {
  return translations[getStoredLocale()]
}

export function localizeOptions(
  values: readonly string[],
  labels: Record<string, string>,
): LocalizedOption[] {
  return values.map(value => ({
    value,
    label: labels[value] ?? value,
  }))
}

export function translateStoredValue(value: string, labels: Record<string, string>): string {
  return labels[value] ?? value
}
