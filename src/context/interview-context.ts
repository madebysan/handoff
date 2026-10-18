import { createContext, type Dispatch } from 'react'
import { initialState, type Action, type InterviewState } from './interview-state'

interface InterviewContextType {
  state: InterviewState
  dispatch: Dispatch<Action>
  /** Shows the one-time privacy note (answers are stored unencrypted in this browser). */
  showPrivacyNotice: () => void
}

export const InterviewContext = createContext<InterviewContextType>({
  state: initialState,
  dispatch: () => {},
  showPrivacyNotice: () => {},
})
