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
  aboutMe: {
    fullName: string
    dateOfBirth: string
    location: string
    reason: string
    intendedFor: string
    personalContext: string
  }
  contacts: Contact[]
  financialAccounts: FinancialAccount[]
  insurancePolicies: InsurancePolicy[]
  properties: Property[]
  digital: {
    deviceAccess: string
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
  legalDocuments: LegalDocument[]
  debts: Debt[]
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
  dependents: {
    minorChildren: string
    guardianshipPreferences: string
    elderlyDependents: string
    pets: string
    specialNeeds: string
    otherCareNotes: string
  }
  wishes: {
    healthcareWishes: string
    funeralPreferences: string
    organDonation: string
    personalMessages: string
    valuesStatement: string
    otherWishes: string
  }
  verification: {
    fullName: string
    verificationDate: string
    familyPassphrase: string
    signatureData: string
  }
  lastSaved: string | null
  currentSection: string
}

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
    deviceAccess: '',
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

export type Action =
  | { type: 'SET_FIELD'; section: string; field: string; value: string }
  | { type: 'SET_NESTED_FIELD'; section: string; field: string; value: string }
  | { type: 'UPDATE_REPEATABLE_ITEM'; section: string; index: number; field: string; value: string }
  | { type: 'ADD_REPEATABLE_ITEM'; section: string }
  | { type: 'REMOVE_REPEATABLE_ITEM'; section: string; index: number }
  | { type: 'SET_CURRENT_SECTION'; section: string }
  | { type: 'SET_LAST_SAVED'; timestamp: string }
  | { type: 'LOAD_STATE'; state: InterviewState }
  | { type: 'RESET_STATE' }

export function interviewReducer(state: InterviewState, action: Action): InterviewState {
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
