// Section definitions with intro copy and field schemas

export interface SectionDef {
  id: string
  letter: string
  title: string
  intro: string
  scenario: string
  icon: string // lucide icon name
}

export const SECTIONS: SectionDef[] = [
  {
    id: 'aboutMe',
    letter: 'A',
    title: 'The Basics',
    intro: 'Let\'s start with the basics — who you are and why you\'re creating this. It gives context to everything that follows.',
    scenario: 'Your family finds a list of accounts and passwords, but there\'s no context \u2014 who wrote this? When? Was it current? A brief introduction makes all the difference.',
    icon: 'CircleUser',
  },
  {
    id: 'contacts',
    letter: 'B',
    title: 'Immediate Contacts',
    intro: 'If something happens to you, who should your family call first? This section ensures the most important people are reachable immediately.',
    scenario: 'Your spouse is overwhelmed and can\'t remember the name of your financial advisor, your attorney, or even which friend to call for help.',
    icon: 'Users',
  },
  {
    id: 'financial',
    letter: 'C',
    title: 'Financial Accounts',
    intro: 'A complete picture of where your money lives. Bank accounts, investments, retirement funds, crypto wallets, even physical cash or gold \u2014 all in one place so nothing gets missed.',
    scenario: 'Your family discovers a 401(k) statement in the mail six months later, with no idea how to access it or who the beneficiary is. Or worse \u2014 your crypto wallet has no recovery phrase.',
    icon: 'Landmark',
  },
  {
    id: 'insurance',
    letter: 'D',
    title: 'Insurance',
    intro: 'Insurance policies are often the first financial lifeline your family reaches for. Knowing what exists and how to file a claim matters enormously.',
    scenario: 'There\'s a life insurance policy through your employer, but your family doesn\'t know it exists because you never mentioned it.',
    icon: 'Shield',
  },
  {
    id: 'property',
    letter: 'E',
    title: 'Property & Assets',
    intro: 'Real estate, vehicles, valuables, storage units \u2014 your family needs to know what you own and where the paperwork lives.',
    scenario: 'The deed to the house is in a safe deposit box your family didn\'t know about, and the mortgage company is sending overdue notices.',
    icon: 'Home',
  },
  {
    id: 'digital',
    letter: 'F',
    title: 'Digital Life',
    intro: 'This is the section most people forget, and where the most frustration happens. Email accounts, passwords, subscriptions, social media \u2014 your digital footprint is vast.',
    scenario: 'Your family can\'t access your email to reset passwords, cancel subscriptions draining the account, or find login credentials for important services.',
    icon: 'Monitor',
  },
  {
    id: 'legal',
    letter: 'G',
    title: 'Legal Documents',
    intro: 'You don\'t need to create legal documents here \u2014 just record where they are. Your family will need to find your will, powers of attorney, and other critical papers.',
    scenario: 'The attorney has the will, but nobody knows which attorney. The advance directive is in a drawer somewhere, but which drawer?',
    icon: 'FileText',
  },
  {
    id: 'debts',
    letter: 'H',
    title: 'Debts & Obligations',
    intro: 'Debts don\'t disappear. Your family needs to know what\'s owed, to whom, and whether there are any co-signers or payoff provisions.',
    scenario: 'A co-signed student loan goes into default because nobody knew it existed, damaging your child\'s credit.',
    icon: 'CreditCard',
  },
  {
    id: 'business',
    letter: 'I',
    title: 'Business Interests',
    intro: 'If you own a business, freelance, or have partnership interests, this section ensures your professional life doesn\'t become a mystery.',
    scenario: 'Your business partner doesn\'t have access to the business bank account, and the operating agreement is on your laptop with no password.',
    icon: 'Briefcase',
  },
  {
    id: 'dependents',
    letter: 'J',
    title: 'Dependents & Care',
    intro: 'The people and pets who depend on you need a plan. Guardianship preferences, care instructions, and ongoing needs should be documented.',
    scenario: 'Your elderly parent relies on you for weekly medication management, and nobody else knows the routine or the pharmacy details.',
    icon: 'Heart',
  },
  {
    id: 'wishes',
    letter: 'K',
    title: 'Wishes & Messages',
    intro: 'This is the most personal section. Your preferences, your values, and anything you want your family to know. Take your time here.',
    scenario: 'Your family is arguing about funeral arrangements because nobody knows what you would have wanted.',
    icon: 'PenLine',
  },
  {
    id: 'verification',
    letter: 'L',
    title: 'Sign & Finish',
    intro: 'The final step. Your signature and a personal detail confirm this document was created by you, with intention and care.',
    scenario: 'Your family finds a document but isn\'t sure when it was written, whether it\'s current, or if someone else filled it out.',
    icon: 'Fingerprint',
  },
]

// Lookup helper — avoids fragile numeric indices
export function getSection(id: string): SectionDef {
  return SECTIONS.find(s => s.id === id)!
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
