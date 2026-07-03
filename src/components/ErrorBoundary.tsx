import { Component, type ReactNode } from 'react'
import { getTranslationForStoredLocale } from '../i18n'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      const t = getTranslationForStoredLocale()

      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-3">{t.errorBoundary.title}</h1>
            <p className="text-muted-foreground mb-6">
              {t.errorBoundary.body}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t.errorBoundary.action}
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
