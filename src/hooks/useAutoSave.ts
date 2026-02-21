import { useEffect, useRef } from 'react'
import type { InterviewState } from '../context/InterviewContext'
import { saveToLocalStorage } from '../lib/storage'

export function useAutoSave(state: InterviewState, dispatch: React.Dispatch<{ type: 'SET_LAST_SAVED'; timestamp: string }>) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    // Debounce: save 1 second after last change
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      saveToLocalStorage(state)
      dispatch({ type: 'SET_LAST_SAVED', timestamp: new Date().toISOString() })
    }, 1000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [state, dispatch])
}
