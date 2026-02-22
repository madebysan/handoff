import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { InterviewProvider } from '../context/InterviewContext'
import LandingPage from '../pages/LandingPage'
import InterviewPage from '../pages/InterviewPage'
import ExportPage from '../pages/ExportPage'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock crypto.randomUUID
Object.defineProperty(globalThis, 'crypto', {
  value: { randomUUID: () => Math.random().toString(36).slice(2) },
})

function renderWithProviders(ui: React.ReactElement, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <InterviewProvider>
        {ui}
      </InterviewProvider>
    </MemoryRouter>
  )
}

function renderInterviewPage({ route = '/interview' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <InterviewProvider>
        <Routes>
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/interview/:sectionId" element={<InterviewPage />} />
        </Routes>
      </InterviewProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
})

describe('Landing Page', () => {
  it('renders the hero section', () => {
    renderWithProviders(<LandingPage />)
    expect(screen.getByText(/Get your life organized/)).toBeInTheDocument()
    expect(screen.getAllByText('Get Started').length).toBeGreaterThan(0)
  })

  it('renders value propositions', () => {
    renderWithProviders(<LandingPage />)
    expect(screen.getByText('Structured completeness')).toBeInTheDocument()
    expect(screen.getByText('Zero-trust privacy')).toBeInTheDocument()
    expect(screen.getByText('A gift to your family')).toBeInTheDocument()
  })

  it('renders how it works section', () => {
    renderWithProviders(<LandingPage />)
    expect(screen.getByText('How it works')).toBeInTheDocument()
    expect(screen.getByText('Answer guided questions')).toBeInTheDocument()
    expect(screen.getByText('Download your document')).toBeInTheDocument()
    expect(screen.getByText('Store it, share it, done')).toBeInTheDocument()
  })

  it('has a link to the interview', () => {
    renderWithProviders(<LandingPage />)
    const links = screen.getAllByRole('link')
    const interviewLinks = links.filter(link => link.getAttribute('href') === '/interview')
    expect(interviewLinks.length).toBeGreaterThan(0)
  })
})

describe('Interview Page', () => {
  it('renders the about me section by default', () => {
    renderInterviewPage({ route: '/interview' })
    expect(screen.getAllByText('About You').length).toBeGreaterThan(0)
    expect(screen.getByText('Continue')).toBeInTheDocument()
  })

  it('renders contacts section with the correct fields', () => {
    renderInterviewPage({ route: '/interview/contacts' })
    expect(screen.getByText('Full name')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders the skip button', () => {
    renderInterviewPage({ route: '/interview/contacts' })
    expect(screen.getByText('Skip')).toBeInTheDocument()
  })

  it('does not show Previous on the first section', () => {
    renderInterviewPage({ route: '/interview/aboutMe' })
    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
  })
})

describe('Export Page', () => {
  it('renders the export heading', () => {
    renderWithProviders(<ExportPage />, { route: '/export' })
    expect(screen.getByText(/You just created something invaluable/)).toBeInTheDocument()
  })

  it('renders download buttons', () => {
    renderWithProviders(<ExportPage />, { route: '/export' })
    expect(screen.getByText('Download PDF')).toBeInTheDocument()
    expect(screen.getByText('Download Markdown')).toBeInTheDocument()
  })

  it('shows empty state warning when no data entered', () => {
    renderWithProviders(<ExportPage />, { route: '/export' })
    expect(screen.getByText('No information entered yet')).toBeInTheDocument()
  })

  it('renders guidance section', () => {
    renderWithProviders(<ExportPage />, { route: '/export' })
    expect(screen.getByText('What to do with your document')).toBeInTheDocument()
  })

  it('renders do it together section', () => {
    renderWithProviders(<ExportPage />, { route: '/export' })
    expect(screen.getByText('Do it together')).toBeInTheDocument()
  })
})

describe('Interview State', () => {
  it('can type into text fields', () => {
    renderInterviewPage({ route: '/interview/contacts' })
    const nameInput = screen.getByPlaceholderText('Jane Doe')
    fireEvent.change(nameInput, { target: { value: 'John Smith' } })
    expect(nameInput).toHaveValue('John Smith')
  })

  it('can add another contact', () => {
    renderInterviewPage({ route: '/interview/contacts' })
    const addButton = screen.getByText('Add another contact')
    fireEvent.click(addButton)
    const nameInputs = screen.getAllByPlaceholderText('Jane Doe')
    expect(nameInputs.length).toBe(2)
  })
})
