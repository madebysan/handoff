import { translations, type Translation } from '../i18n/translations'

// Section definitions with stable metadata and localized copy.

export interface SectionDef {
  id: string
  letter: string
  title: string
  intro: string
  scenario: string
  icon: string // lucide icon name
}

type SectionMeta = Pick<SectionDef, 'id' | 'letter' | 'icon'>

const SECTION_META: SectionMeta[] = [
  {
    id: 'aboutMe',
    letter: 'A',
    icon: 'CircleUser',
  },
  {
    id: 'contacts',
    letter: 'B',
    icon: 'Users',
  },
  {
    id: 'financial',
    letter: 'C',
    icon: 'Landmark',
  },
  {
    id: 'insurance',
    letter: 'D',
    icon: 'Shield',
  },
  {
    id: 'property',
    letter: 'E',
    icon: 'Home',
  },
  {
    id: 'digital',
    letter: 'F',
    icon: 'Monitor',
  },
  {
    id: 'legal',
    letter: 'G',
    icon: 'FileText',
  },
  {
    id: 'debts',
    letter: 'H',
    icon: 'CreditCard',
  },
  {
    id: 'business',
    letter: 'I',
    icon: 'Briefcase',
  },
  {
    id: 'dependents',
    letter: 'J',
    icon: 'Heart',
  },
  {
    id: 'wishes',
    letter: 'K',
    icon: 'PenLine',
  },
  {
    id: 'verification',
    letter: 'L',
    icon: 'Fingerprint',
  },
]

export function getSections(t: Translation = translations.en): SectionDef[] {
  return SECTION_META.map(section => ({
    ...section,
    ...t.sections[section.id as keyof Translation['sections']],
  }))
}

export const SECTIONS: SectionDef[] = getSections()

// Lookup helper. Avoids fragile numeric indices.
export function getSection(id: string, t: Translation = translations.en): SectionDef {
  return getSections(t).find(s => s.id === id)!
}

// Reasons for creating this document
export const DOCUMENT_REASONS = [
  'Just being proactive \u2014 everyone should do this',
  'Recent health diagnosis',
  'Getting older, want to be prepared',
  'Major life change (marriage, baby, divorce)',
  'Traveling or doing something risky',
  'Someone asked me to',
  'Other',
] as const

// Contact roles for Section B
export const CONTACT_ROLES = [
  'Executor / Decision-maker',
  'Spouse / Partner',
  'Family member',
  'Attorney',
  'Financial advisor',
  'Accountant / CPA',
  'Insurance agent',
  'Doctor / Primary care',
  'Clergy / Spiritual advisor',
  'Close friend',
  'Other',
] as const

// Account types for Section C
export const ACCOUNT_TYPES = [
  'Checking',
  'Savings',
  'Brokerage',
  '401(k)',
  'IRA / Roth IRA',
  'Pension',
  'HSA',
  '529 Plan',
  'Annuity',
  'CD',
  'Cryptocurrency',
  'Physical (cash, gold, etc.)',
  'Trust fund',
  'Other',
] as const

// Insurance types for Section D
export const INSURANCE_TYPES = [
  'Life insurance',
  'Health insurance',
  'Homeowners / Renters',
  'Auto',
  'Umbrella',
  'Disability',
  'Long-term care',
  'Other',
] as const

// Property types for Section E
export const PROPERTY_TYPES = [
  'Primary residence',
  'Rental property',
  'Vacation home',
  'Vehicle',
  'Jewelry / Valuables',
  'Art / Collectibles',
  'Safe deposit box',
  'Storage unit',
  'Other',
] as const

// Legal document types for Section G
export const LEGAL_DOC_TYPES = [
  'Will',
  'Trust',
  'Power of Attorney (Financial)',
  'Power of Attorney (Healthcare)',
  'Advance directive / Living will',
  'Marriage certificate',
  'Divorce decree',
  'Birth certificate',
  'Passport',
  'Social Security card',
  'Tax returns (recent)',
  'Other',
] as const

// Debt types for Section H
export const DEBT_TYPES = [
  'Mortgage',
  'Car loan',
  'Student loan',
  'Personal loan',
  'Credit card',
  'Business loan',
  'Co-signed obligation',
  'Other',
] as const
