import { useCallback, useState, useReducer, type ReactNode } from 'react'
import { useI18n } from '../i18n'
import { useAutoSave } from '../hooks/useAutoSave'
import {
  clearLocalStorage,
  hasSavedData,
  hasSecurityWarningBeenShown,
  loadFromLocalStorage,
  markSecurityWarningShown,
} from '../lib/storage'
import { InterviewContext } from './interview-context'
import { initialState, interviewReducer } from './interview-state'

export function InterviewProvider({ children }: { children: ReactNode }) {
  const { locale, t } = useI18n()
  const [state, dispatch] = useReducer(interviewReducer, initialState)
  const [showResume, setShowResume] = useState(() => hasSavedData())
  const [showSecurityWarning, setShowSecurityWarning] = useState(false)
  const [confirmingFresh, setConfirmingFresh] = useState(false)

  useAutoSave(state, dispatch)

  const handleResume = () => {
    const saved = loadFromLocalStorage()
    if (saved) {
      dispatch({ type: 'LOAD_STATE', state: saved })
      if (!hasSecurityWarningBeenShown()) {
        setShowSecurityWarning(true)
      }
    }
    setShowResume(false)
  }

  const handleStartFresh = useCallback(() => {
    if (!confirmingFresh) {
      setConfirmingFresh(true)
      return
    }
    clearLocalStorage()
    dispatch({ type: 'RESET_STATE' })
    setShowResume(false)
    setConfirmingFresh(false)
  }, [confirmingFresh])

  // Called when the questionnaire opens, so the note appears before anything is typed.
  // While the resume dialog is up, resuming shows it instead.
  const showPrivacyNotice = useCallback(() => {
    if (!showResume && !hasSecurityWarningBeenShown()) {
      setShowSecurityWarning(true)
    }
  }, [showResume])

  const handleDismissWarning = () => {
    markSecurityWarningShown()
    setShowSecurityWarning(false)
  }

  const savedDate = state.lastSaved
    ? new Date(state.lastSaved).toLocaleDateString(locale)
    : null

  return (
    <InterviewContext.Provider value={{ state, dispatch, showPrivacyNotice }}>
      {showResume && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-2">{t.interview.resume.title}</h3>
            <p className="text-secondary-foreground text-sm mb-6">
              {t.interview.resume.body(savedDate)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleResume}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-button font-semibold hover:bg-primary/90 transition-colors"
              >
                {t.interview.resume.continue}
              </button>
              <button
                onClick={handleStartFresh}
                className={`flex-1 px-4 py-2.5 rounded-button font-medium transition-colors ${
                  confirmingFresh
                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    : 'border border-border text-secondary-foreground hover:bg-secondary'
                }`}
              >
                {confirmingFresh ? t.interview.resume.confirmFresh : t.interview.resume.startFresh}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSecurityWarning && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-2">{t.interview.security.title}</h3>
            <p className="text-secondary-foreground text-sm mb-4">
              {t.interview.security.body}
            </p>
            <p className="text-secondary-foreground text-sm mb-6">
              {t.interview.security.followup}
            </p>
            <button
              onClick={handleDismissWarning}
              className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-button font-semibold hover:bg-primary/90 transition-colors"
            >
              {t.interview.security.action}
            </button>
          </div>
        </div>
      )}

      {children}
    </InterviewContext.Provider>
  )
}
