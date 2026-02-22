import { createContext, useReducer, useEffect, useState, type ReactNode } from 'react'
import { loadFromLocalStorage, hasSavedData, hasSecurityWarningBeenShown, markSecurityWarningShown, clearLocalStorage } from '../lib/storage'
import { useAutoSave } from '../hooks/useAutoSave'

// --- Types ---

export interface Contact {
  id: string
  name: string
  phone: string
  email: string
  relationship: string
  role: string
  notes: string
}

export interface FinancialAccount {
  id: string
  institution: string
  accountType: string
  approxValue: string
  hasBeneficiary: string
  accessNotes: string
}

export interface InsurancePolicy {
  id: string
  carrier: string
  insuranceType: string
  policyNumberLocation: string
  agentContact: string
  isEmployerProvided: string
  employerContact: string
  notes: string
}

export interface Property {
  id: string
  propertyType: string
  description: string
  location: string
  deedTitleLocation: string
  hasMortgage: string
  notes: string
}

export interface LegalDocument {
  id: string
  documentType: string
  location: string
  lastUpdated: string
  notes: string
}

export interface Debt {
  id: string
  direction: string
  debtType: string
  lender: string
  approxBalance: string
  isCosigned: string
  payoffNotes: string
}

export interface InterviewState {
  // Section A: About You
  aboutMe: {
    fullName: string
    dateOfBirth: string
    location: string
    reason: string
    intendedFor: string
    personalContext: string
  }
  // Section B: Contacts
  contacts: Contact[]
  // Section B: Financial
  financialAccounts: FinancialAccount[]
  // Section C: Insurance
  insurancePolicies: InsurancePolicy[]
  // Section D: Property
  properties: Property[]
  // Section E: Digital Life
  digital: {
    emailAccounts: string
    passwordManager: string
    socialMediaWishes: string
    subscriptions: string
    crypto: string
    twoFactorAuth: string
    cloudStorage: string
    domainNames: string
    digitalPurchases: string
    loyaltyPrograms: string
    otherDigital: string
  }
  // Section F: Legal Documents
  legalDocuments: LegalDocument[]
  // Section G: Debts
  debts: Debt[]
  // Section H: Business
  business: {
    hasBusiness: string
    entityType: string
    businessName: string
    keyContacts: string
    operatingAgreementLocation: string
    bankAccountAccess: string
    successionPlan: string
    otherBusinessNotes: string
  }
  // Section I: Dependents
  dependents: {
    minorChildren: string
    guardianshipPreferences: string
    elderlyDependents: string
    pets: string
    specialNeeds: string
    otherCareNotes: string
  }
  // Section J: Wishes
  wishes: {
    healthcareWishes: string
    funeralPreferences: string
    organDonation: string
    personalMessages: string
    valuesStatement: string
    otherWishes: string
  }
  // Section K: Verification
  verification: {
    fullName: string
    verificationDate: string
    familyPassphrase: string
    signatureData: string
  }
  // Meta
  lastSaved: string | null
  currentSection: string
}

// --- Initial State ---

export function createEmptyContact(): Contact {
  return { id: crypto.randomUUID(), name: '', phone: '', email: '', relationship: '', role: '', notes: '' }
}

export function createEmptyAccount(): FinancialAccount {
  return { id: crypto.randomUUID(), institution: '', accountType: '', approxValue: '', hasBeneficiary: '', accessNotes: '' }
}

export function createEmptyPolicy(): InsurancePolicy {
  return { id: crypto.randomUUID(), carrier: '', insuranceType: '', policyNumberLocation: '', agentContact: '', isEmployerProvided: '', employerContact: '', notes: '' }
}

export function createEmptyProperty(): Property {
  return { id: crypto.randomUUID(), propertyType: '', description: '', location: '', deedTitleLocation: '', hasMortgage: '', notes: '' }
}

export function createEmptyLegalDoc(): LegalDocument {
  return { id: crypto.randomUUID(), documentType: '', location: '', lastUpdated: '', notes: '' }
}

export function createEmptyDebt(): Debt {
  return { id: crypto.randomUUID(), direction: 'I owe', debtType: '', lender: '', approxBalance: '', isCosigned: '', payoffNotes: '' }
}

export const initialState: InterviewState = {
  aboutMe: {
    fullName: '',
    dateOfBirth: '',
    location: '',
    reason: '',
    intendedFor: '',
    personalContext: '',
  },
  contacts: [createEmptyContact()],
  financialAccounts: [createEmptyAccount()],
  insurancePolicies: [createEmptyPolicy()],
  properties: [createEmptyProperty()],
  digital: {
    emailAccounts: '',
    passwordManager: '',
    socialMediaWishes: '',
    subscriptions: '',
    crypto: '',
    twoFactorAuth: '',
    cloudStorage: '',
    domainNames: '',
    digitalPurchases: '',
    loyaltyPrograms: '',
    otherDigital: '',
  },
  legalDocuments: [createEmptyLegalDoc()],
  debts: [createEmptyDebt()],
  business: {
    hasBusiness: '',
    entityType: '',
    businessName: '',
    keyContacts: '',
    operatingAgreementLocation: '',
    bankAccountAccess: '',
    successionPlan: '',
    otherBusinessNotes: '',
  },
  dependents: {
    minorChildren: '',
    guardianshipPreferences: '',
    elderlyDependents: '',
    pets: '',
    specialNeeds: '',
    otherCareNotes: '',
  },
  wishes: {
    healthcareWishes: '',
    funeralPreferences: '',
    organDonation: '',
    personalMessages: '',
    valuesStatement: '',
    otherWishes: '',
  },
  verification: {
    fullName: '',
    verificationDate: '',
    familyPassphrase: '',
    signatureData: '',
  },
  lastSaved: null,
  currentSection: 'aboutMe',
}

// --- Actions ---

type Action =
  | { type: 'SET_FIELD'; section: string; field: string; value: string }
  | { type: 'SET_NESTED_FIELD'; section: string; field: string; value: string }
  | { type: 'UPDATE_REPEATABLE_ITEM'; section: string; index: number; field: string; value: string }
  | { type: 'ADD_REPEATABLE_ITEM'; section: string }
  | { type: 'REMOVE_REPEATABLE_ITEM'; section: string; index: number }
  | { type: 'SET_CURRENT_SECTION'; section: string }
  | { type: 'SET_LAST_SAVED'; timestamp: string }
  | { type: 'LOAD_STATE'; state: InterviewState }
  | { type: 'RESET_STATE' }

// --- Reducer ---

function interviewReducer(state: InterviewState, action: Action): InterviewState {
  switch (action.type) {
    case 'SET_NESTED_FIELD': {
      const section = action.section as keyof InterviewState
      const current = state[section]
      if (typeof current === 'object' && current !== null && !Array.isArray(current)) {
        return {
          ...state,
          [section]: { ...current, [action.field]: action.value },
        }
      }
      return state
    }

    case 'UPDATE_REPEATABLE_ITEM': {
      const section = action.section as keyof InterviewState
      const items = state[section]
      if (Array.isArray(items)) {
        const updated = [...items]
        updated[action.index] = { ...updated[action.index], [action.field]: action.value }
        return { ...state, [section]: updated }
      }
      return state
    }

    case 'ADD_REPEATABLE_ITEM': {
      const creators: Record<string, () => unknown> = {
        contacts: createEmptyContact,
        financialAccounts: createEmptyAccount,
        insurancePolicies: createEmptyPolicy,
        properties: createEmptyProperty,
        legalDocuments: createEmptyLegalDoc,
        debts: createEmptyDebt,
      }
      const creator = creators[action.section]
      if (creator) {
        const items = state[action.section as keyof InterviewState]
        if (Array.isArray(items)) {
          return { ...state, [action.section]: [...items, creator()] }
        }
      }
      return state
    }

    case 'REMOVE_REPEATABLE_ITEM': {
      const section = action.section as keyof InterviewState
      const items = state[section]
      if (Array.isArray(items) && items.length > 1) {
        const updated = items.filter((_, i) => i !== action.index)
        return { ...state, [section]: updated }
      }
      return state
    }

    case 'SET_CURRENT_SECTION':
      return { ...state, currentSection: action.section }

    case 'SET_LAST_SAVED':
      return { ...state, lastSaved: action.timestamp }

    case 'LOAD_STATE':
      return { ...action.state }

    case 'RESET_STATE':
      return { ...initialState }

    default:
      return state
  }
}

// --- Context ---

interface InterviewContextType {
  state: InterviewState
  dispatch: React.Dispatch<Action>
}

export const InterviewContext = createContext<InterviewContextType>({
  state: initialState,
  dispatch: () => {},
})

export function InterviewProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(interviewReducer, initialState)
  const [showResume, setShowResume] = useState(false)
  const [showSecurityWarning, setShowSecurityWarning] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Check for saved data on mount
  useEffect(() => {
    if (hasSavedData()) {
      setShowResume(true)
    }
    setLoaded(true)
  }, [])

  // Auto-save
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

  const handleStartFresh = () => {
    clearLocalStorage()
    dispatch({ type: 'RESET_STATE' })
    setShowResume(false)
  }

  const handleDismissWarning = () => {
    markSecurityWarningShown()
    setShowSecurityWarning(false)
  }

  if (!loaded) return null

  return (
    <InterviewContext.Provider value={{ state, dispatch }}>
      {/* Resume prompt */}
      {showResume && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-charcoal mb-2">Welcome back</h3>
            <p className="text-charcoal-light text-sm mb-6">
              You have a saved session{state.lastSaved ? ` from ${new Date(state.lastSaved).toLocaleDateString()}` : ''}. Would you like to continue where you left off?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleResume}
                className="flex-1 bg-charcoal text-cream px-4 py-2.5 rounded-full font-semibold hover:bg-charcoal-light transition-colors"
              >
                Continue
              </button>
              <button
                onClick={handleStartFresh}
                className="flex-1 border border-border text-charcoal-light px-4 py-2.5 rounded-full font-medium hover:bg-warm-gray-light transition-colors"
              >
                Start fresh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security warning */}
      {showSecurityWarning && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-charcoal mb-2">A note about privacy</h3>
            <p className="text-charcoal-light text-sm mb-4">
              Your responses are saved locally in this browser only. They are not encrypted and could be read by anyone with access to this device.
            </p>
            <p className="text-charcoal-light text-sm mb-6">
              When you're done, you can clear your data from the sidebar. Nothing is ever sent to any server.
            </p>
            <button
              onClick={handleDismissWarning}
              className="w-full bg-charcoal text-cream px-4 py-2.5 rounded-full font-semibold hover:bg-charcoal-light transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {children}
    </InterviewContext.Provider>
  )
}
