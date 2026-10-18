import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { I18nProvider, getPathLocale } from '.'
import { InterviewProvider } from '../context/InterviewContext'
import LandingPage from '../pages/LandingPage'
import { translations } from './translations'

const storage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(window, 'localStorage', { value: storage, configurable: true })

function renderLanding(path: string) {
  window.history.pushState({}, '', path)
  return render(
    <I18nProvider>
      <InterviewProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/es" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </InterviewProvider>
    </I18nProvider>,
  )
}

describe('Spanish landing address', () => {
  afterEach(() => {
    window.localStorage.clear()
    window.history.pushState({}, '', '/')
  })

  it('treats only /es as the Spanish address', () => {
    expect(getPathLocale('/es')).toBe('es')
    expect(getPathLocale('/es/')).toBe('es')
    expect(getPathLocale('/')).toBeNull()
    expect(getPathLocale('/estate')).toBeNull()
    expect(getPathLocale('/interview/basics')).toBeNull()
  })

  it('opens /es in Spanish even when English was saved', () => {
    window.localStorage.setItem('handoff-locale', 'en')
    renderLanding('/es')
    expect(screen.getByText(translations.es.landing.heroTitle)).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('es')
    expect(document.title).toBe(translations.es.meta.title)
  })

  it('moves between / and /es when the language changes on the landing page', () => {
    renderLanding('/')
    fireEvent.click(screen.getAllByRole('button', { name: 'ES' })[0])
    expect(window.location.pathname).toBe('/es')
    fireEvent.click(screen.getAllByRole('button', { name: 'EN' })[0])
    expect(window.location.pathname).toBe('/')
  })
})
