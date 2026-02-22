import type { InterviewState } from '../context/InterviewContext'

const STORAGE_KEY = 'handoff-interview-data'
const WARNING_SHOWN_KEY = 'handoff-security-warning-shown'

export function saveToLocalStorage(state: InterviewState): void {
  try {
    const data = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, data)
  } catch {
    // localStorage might be full or disabled — silently fail
  }
}

export function loadFromLocalStorage(): InterviewState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data) as InterviewState
    }
  } catch {
    // Corrupted data — silently fail
  }
  return null
}

export function clearLocalStorage(): void {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(WARNING_SHOWN_KEY)
}

export function hasSecurityWarningBeenShown(): boolean {
  return localStorage.getItem(WARNING_SHOWN_KEY) === 'true'
}

export function markSecurityWarningShown(): void {
  localStorage.setItem(WARNING_SHOWN_KEY, 'true')
}

export function hasSavedData(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null
}
