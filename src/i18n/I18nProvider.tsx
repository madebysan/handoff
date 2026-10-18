import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations, type Locale, type Translation } from './translations'
import {
  I18nContext,
  LOCALE_STORAGE_KEY,
  SITE_URL,
  SPANISH_LANDING_PATH,
  getPathLocale,
  getStoredLocale,
  type I18nContextValue,
} from './core'

function setMetaTag(selector: string, value: string) {
  const element = document.querySelector<HTMLMetaElement>(selector)
  if (element) element.content = value
}

function setLinkHref(selector: string, value: string) {
  const element = document.querySelector<HTMLLinkElement>(selector)
  if (element) element.href = value
}

function applyDocumentMetadata(locale: Locale, t: Translation) {
  document.documentElement.lang = locale === 'pseudo' ? 'en-x-pseudo' : locale
  document.title = t.meta.title
  setMetaTag('meta[name="description"]', t.meta.description)
  setMetaTag('meta[property="og:title"]', t.meta.title)
  setMetaTag('meta[property="og:description"]', t.meta.description)
  setMetaTag('meta[name="twitter:title"]', t.meta.title)
  setMetaTag('meta[name="twitter:description"]', t.meta.description)
  const pageUrl = getPathLocale() ? `${SITE_URL}${SPANISH_LANDING_PATH}` : `${SITE_URL}/`
  setLinkHref('link[rel="canonical"]', pageUrl)
  setMetaTag('meta[property="og:url"]', pageUrl)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getStoredLocale())

  const value = useMemo<I18nContextValue>(() => {
    const setLocale = (nextLocale: Locale) => {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
      setLocaleState(nextLocale)
    }

    return {
      locale,
      setLocale,
      t: translations[locale],
    }
  }, [locale])

  useEffect(() => {
    applyDocumentMetadata(locale, translations[locale])
  }, [locale])

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}
