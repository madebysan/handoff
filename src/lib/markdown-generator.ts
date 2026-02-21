import type { InterviewState } from '../context/InterviewContext'
import { SECTIONS } from './interview-data'

export function generateMarkdown(state: InterviewState): string {
  const lines: string[] = []
  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  lines.push('# Letter of Instruction')
  lines.push('')
  lines.push(`**Generated:** ${timestamp}`)
  lines.push('')
  lines.push('> **Important:** This is not a legal document. It is a personal letter of instruction intended to help your family locate important information and understand your wishes. Consult an attorney for legal estate planning documents.')
  lines.push('')
  lines.push('---')
  lines.push('')

  // Section A: Contacts
  if (state.contacts.some(c => c.name.trim())) {
    lines.push(`## ${SECTIONS[0].letter}. ${SECTIONS[0].title}`)
    lines.push('')
    state.contacts.filter(c => c.name.trim()).forEach(c => {
      lines.push(`### ${c.name}`)
      if (c.role) lines.push(`- **Role:** ${c.role}`)
      if (c.relationship) lines.push(`- **Relationship:** ${c.relationship}`)
      if (c.phone) lines.push(`- **Phone:** ${c.phone}`)
      if (c.email) lines.push(`- **Email:** ${c.email}`)
      if (c.notes) lines.push(`- **Notes:** ${c.notes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  // Section B: Financial
  if (state.financialAccounts.some(a => a.institution.trim())) {
    lines.push(`## ${SECTIONS[1].letter}. ${SECTIONS[1].title}`)
    lines.push('')
    state.financialAccounts.filter(a => a.institution.trim()).forEach(a => {
      lines.push(`### ${a.institution}${a.accountType ? ` (${a.accountType})` : ''}`)
      if (a.approxValue) lines.push(`- **Approximate value:** ${a.approxValue}`)
      if (a.hasBeneficiary) lines.push(`- **Named beneficiary:** ${a.hasBeneficiary}`)
      if (a.accessNotes) lines.push(`- **How to access:** ${a.accessNotes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  // Section C: Insurance
  if (state.insurancePolicies.some(p => p.carrier.trim())) {
    lines.push(`## ${SECTIONS[2].letter}. ${SECTIONS[2].title}`)
    lines.push('')
    state.insurancePolicies.filter(p => p.carrier.trim()).forEach(p => {
      lines.push(`### ${p.carrier}${p.insuranceType ? ` — ${p.insuranceType}` : ''}`)
      if (p.policyNumberLocation) lines.push(`- **Policy number location:** ${p.policyNumberLocation}`)
      if (p.agentContact) lines.push(`- **Agent:** ${p.agentContact}`)
      if (p.isEmployerProvided) lines.push(`- **Through employer:** ${p.isEmployerProvided}`)
      if (p.notes) lines.push(`- **Notes:** ${p.notes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  // Section D: Property
  if (state.properties.some(p => p.propertyType.trim() || p.description.trim())) {
    lines.push(`## ${SECTIONS[3].letter}. ${SECTIONS[3].title}`)
    lines.push('')
    state.properties.filter(p => p.propertyType.trim() || p.description.trim()).forEach(p => {
      const title = p.description || p.propertyType
      lines.push(`### ${title}`)
      if (p.propertyType && p.description) lines.push(`- **Type:** ${p.propertyType}`)
      if (p.location) lines.push(`- **Location:** ${p.location}`)
      if (p.deedTitleLocation) lines.push(`- **Deed/title location:** ${p.deedTitleLocation}`)
      if (p.hasMortgage) lines.push(`- **Has mortgage/lien:** ${p.hasMortgage}`)
      if (p.notes) lines.push(`- **Notes:** ${p.notes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  // Section E: Digital Life
  const digitalFields = [
    { key: 'emailAccounts', label: 'Email Accounts' },
    { key: 'passwordManager', label: 'Password Manager' },
    { key: 'twoFactorAuth', label: 'Two-Factor Authentication' },
    { key: 'socialMediaWishes', label: 'Social Media' },
    { key: 'cloudStorage', label: 'Cloud Storage' },
    { key: 'subscriptions', label: 'Subscriptions & Recurring Payments' },
    { key: 'crypto', label: 'Cryptocurrency' },
    { key: 'domainNames', label: 'Domain Names & Websites' },
    { key: 'digitalPurchases', label: 'Digital Purchases & Loyalty Programs' },
    { key: 'otherDigital', label: 'Other Digital' },
  ]
  const hasDigital = digitalFields.some(f => (state.digital as Record<string, string>)[f.key]?.trim())
  if (hasDigital) {
    lines.push(`## ${SECTIONS[4].letter}. ${SECTIONS[4].title}`)
    lines.push('')
    digitalFields.forEach(f => {
      const val = (state.digital as Record<string, string>)[f.key]
      if (val?.trim()) {
        lines.push(`### ${f.label}`)
        lines.push('')
        lines.push(val.trim())
        lines.push('')
      }
    })
    lines.push('---')
    lines.push('')
  }

  // Section F: Legal Documents
  if (state.legalDocuments.some(d => d.documentType.trim())) {
    lines.push(`## ${SECTIONS[5].letter}. ${SECTIONS[5].title}`)
    lines.push('')
    state.legalDocuments.filter(d => d.documentType.trim()).forEach(d => {
      lines.push(`### ${d.documentType}`)
      if (d.location) lines.push(`- **Location:** ${d.location}`)
      if (d.lastUpdated) lines.push(`- **Last updated:** ${d.lastUpdated}`)
      if (d.notes) lines.push(`- **Notes:** ${d.notes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  // Section G: Debts
  if (state.debts.some(d => d.lender.trim())) {
    lines.push(`## ${SECTIONS[6].letter}. ${SECTIONS[6].title}`)
    lines.push('')
    state.debts.filter(d => d.lender.trim()).forEach(d => {
      lines.push(`### ${d.lender}${d.debtType ? ` — ${d.debtType}` : ''}`)
      if (d.approxBalance) lines.push(`- **Approximate balance:** ${d.approxBalance}`)
      if (d.isCosigned) lines.push(`- **Co-signed:** ${d.isCosigned}`)
      if (d.payoffNotes) lines.push(`- **Notes:** ${d.payoffNotes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  // Section H: Business
  const hasBusiness = state.business.hasBusiness === 'Yes' &&
    Object.entries(state.business).some(([k, v]) => k !== 'hasBusiness' && v.trim())
  if (hasBusiness) {
    lines.push(`## ${SECTIONS[7].letter}. ${SECTIONS[7].title}`)
    lines.push('')
    if (state.business.businessName) lines.push(`**Business:** ${state.business.businessName}`)
    if (state.business.entityType) lines.push(`**Entity type:** ${state.business.entityType}`)
    lines.push('')
    const bizFields = [
      { key: 'keyContacts', label: 'Key Contacts' },
      { key: 'operatingAgreementLocation', label: 'Operating Agreement Location' },
      { key: 'bankAccountAccess', label: 'Bank Account Access' },
      { key: 'successionPlan', label: 'Succession Plan' },
      { key: 'otherBusinessNotes', label: 'Other Notes' },
    ]
    bizFields.forEach(f => {
      const val = (state.business as Record<string, string>)[f.key]
      if (val?.trim()) {
        lines.push(`### ${f.label}`)
        lines.push('')
        lines.push(val.trim())
        lines.push('')
      }
    })
    lines.push('---')
    lines.push('')
  }

  // Section I: Dependents
  const depFields = [
    { key: 'minorChildren', label: 'Minor Children' },
    { key: 'guardianshipPreferences', label: 'Guardianship Preferences' },
    { key: 'elderlyDependents', label: 'Elderly Dependents' },
    { key: 'pets', label: 'Pets' },
    { key: 'specialNeeds', label: 'Special Needs' },
    { key: 'otherCareNotes', label: 'Other Care Notes' },
  ]
  const hasDependents = depFields.some(f => (state.dependents as Record<string, string>)[f.key]?.trim())
  if (hasDependents) {
    lines.push(`## ${SECTIONS[8].letter}. ${SECTIONS[8].title}`)
    lines.push('')
    depFields.forEach(f => {
      const val = (state.dependents as Record<string, string>)[f.key]
      if (val?.trim()) {
        lines.push(`### ${f.label}`)
        lines.push('')
        lines.push(val.trim())
        lines.push('')
      }
    })
    lines.push('---')
    lines.push('')
  }

  // Section J: Wishes
  const wishFields = [
    { key: 'funeralPreferences', label: 'Funeral or Memorial Preferences' },
    { key: 'organDonation', label: 'Organ Donation' },
    { key: 'personalMessages', label: 'Personal Messages' },
    { key: 'valuesStatement', label: 'Values & What Matters Most' },
    { key: 'otherWishes', label: 'Other Wishes' },
  ]
  const hasWishes = wishFields.some(f => (state.wishes as Record<string, string>)[f.key]?.trim())
  if (hasWishes) {
    lines.push(`## ${SECTIONS[9].letter}. ${SECTIONS[9].title}`)
    lines.push('')
    wishFields.forEach(f => {
      const val = (state.wishes as Record<string, string>)[f.key]
      if (val?.trim()) {
        lines.push(`### ${f.label}`)
        lines.push('')
        lines.push(val.trim())
        lines.push('')
      }
    })
  }

  lines.push('---')
  lines.push('')
  lines.push('*Generated with Relay — free, private, yours to keep.*')

  return lines.join('\n')
}
