import { createContext, type Dispatch } from 'react'
import { initialState, type Action, type InterviewState } from './interview-state'

interface InterviewContextType {
  state: InterviewState
  dispatch: Dispatch<Action>
}

export const InterviewContext = createContext<InterviewContextType>({
  state: initialState,
  dispatch: () => {},
})
