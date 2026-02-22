import type { InterviewState } from '../context/InterviewContext'
import { getSection } from './interview-data'

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

  // Section A: About You
  const hasAboutMe = state.aboutMe?.fullName?.trim() || state.aboutMe?.reason?.trim() || state.aboutMe?.personalContext?.trim()
  if (hasAboutMe) {
    lines.push(`## ${getSection('aboutMe').letter}. ${getSection('aboutMe').title}`)
    lines.push('')
    if (state.aboutMe.fullName?.trim()) lines.push(`**Full Name:** ${state.aboutMe.fullName}`)
    if (state.aboutMe.dateOfBirth?.trim()) lines.push(`**Date of Birth:** ${state.aboutMe.dateOfBirth}`)
    if (state.aboutMe.location?.trim()) lines.push(`**Location:** ${state.aboutMe.location}`)
    if (state.aboutMe.reason?.trim()) lines.push(`**Reason for Creating This:** ${state.aboutMe.reason}`)
    if (state.aboutMe.intendedFor?.trim()) lines.push(`**Intended For:** ${state.aboutMe.intendedFor}`)
    lines.push('')
    if (state.aboutMe.personalContext?.trim()) {
      lines.push('### Personal Context')
      lines.push('')
      lines.push(state.aboutMe.personalContext.trim())
      lines.push('')
    }
    lines.push('---')
    lines.push('')
  }

  // Section B: Contacts
  if (state.contacts.some(c => c.name.trim())) {
    lines.push(`## ${getSection('contacts').letter}. ${getSection('contacts').title}`)
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

  // Section C: Financial
  if (state.financialAccounts.some(a => a.institution.trim())) {
    lines.push(`## ${getSection('financial').letter}. ${getSection('financial').title}`)
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

  // Section D: Insurance
  if (state.insurancePolicies.some(p => p.carrier.trim())) {
    lines.push(`## ${getSection('insurance').letter}. ${getSection('insurance').title}`)
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

  // Section E: Property
  if (state.properties.some(p => p.propertyType.trim() || p.description.trim())) {
    lines.push(`## ${getSection('property').letter}. ${getSection('property').title}`)
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

  // Section F: Digital Life
  const digitalFields = [
    { key: 'emailAccounts', label: 'Email Accounts' },
    { key: 'passwordManager', label: 'Password Manager' },
    { key: 'twoFactorAuth', label: 'Two-Factor Authentication' },
    { key: 'socialMediaWishes', label: 'Social Media' },
    { key: 'cloudStorage', label: 'Cloud Storage' },
    { key: 'subscriptions', label: 'Subscriptions & Recurring Payments' },
{ key: 'domainNames', label: 'Domain Names & Websites' },
    { key: 'digitalPurchases', label: 'Digital Purchases & Loyalty Programs' },
    { key: 'otherDigital', label: 'Other Digital' },
  ]
  const hasDigital = digitalFields.some(f => (state.digital as Record<string, string>)[f.key]?.trim())
  if (hasDigital) {
    lines.push(`## ${getSection('digital').letter}. ${getSection('digital').title}`)
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

  // Section G: Legal Documents
  if (state.legalDocuments.some(d => d.documentType.trim())) {
    lines.push(`## ${getSection('legal').letter}. ${getSection('legal').title}`)
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

  // Section H: Debts
  if (state.debts.some(d => d.lender.trim())) {
    lines.push(`## ${getSection('debts').letter}. ${getSection('debts').title}`)
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

  // Section I: Business
  const hasBusiness = state.business.hasBusiness === 'Yes' &&
    Object.entries(state.business).some(([k, v]) => k !== 'hasBusiness' && v.trim())
  if (hasBusiness) {
    lines.push(`## ${getSection('business').letter}. ${getSection('business').title}`)
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

  // Section J: Dependents
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
    lines.push(`## ${getSection('dependents').letter}. ${getSection('dependents').title}`)
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

  // Section K: Wishes
  const wishFields = [
    { key: 'funeralPreferences', label: 'Funeral or Memorial Preferences' },
    { key: 'organDonation', label: 'Organ Donation' },
    { key: 'personalMessages', label: 'Personal Messages' },
    { key: 'valuesStatement', label: 'Values & What Matters Most' },
    { key: 'otherWishes', label: 'Other Wishes' },
  ]
  const hasWishes = wishFields.some(f => (state.wishes as Record<string, string>)[f.key]?.trim())
  if (hasWishes) {
    lines.push(`## ${getSection('wishes').letter}. ${getSection('wishes').title}`)
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

  // Section L: Verification
  if (state.verification?.fullName?.trim() || state.verification?.familyPassphrase?.trim()) {
    lines.push(`## ${getSection('verification').letter}. ${getSection('verification').title}`)
    lines.push('')
    if (state.verification.fullName) {
      lines.push(`**Signed by:** ${state.verification.fullName}`)
    }
    if (state.verification.verificationDate) {
      lines.push(`**Date:** ${state.verification.verificationDate}`)
    }
    lines.push('')
    lines.push('I confirm that I created this document voluntarily, that the information is accurate to the best of my knowledge, and that it reflects my current wishes.')
    lines.push('')
    if (state.verification.familyPassphrase?.trim()) {
      lines.push('### Family Passphrase')
      lines.push('')
      lines.push(state.verification.familyPassphrase.trim())
      lines.push('')
    }
    lines.push('---')
    lines.push('')
  }

  lines.push('*Generated with Handoff — free, private, yours to keep.*')

  return lines.join('\n')
}
