import type { InterviewState } from '../context/InterviewContext'
import { translations, type Translation } from '../i18n/translations'
import { getSection } from './interview-data'

function translateStoredValue(value: string, t: Translation): string {
  const optionGroups = Object.values(t.options) as Record<string, string>[]
  const optionLabel = optionGroups.find(group => group[value])?.[value]
  if (optionLabel) return optionLabel
  if (value === 'Yes') return t.common.yes
  if (value === 'No') return t.common.no
  if (value === 'Not sure') return t.common.notSure
  return value
}

function sectionHeading(id: string, t: Translation): string {
  const section = getSection(id, t)
  return `## ${section.letter}. ${section.title}`
}

export function generateMarkdown(
  state: InterviewState,
  t: Translation = translations.en,
): string {
  const lines: string[] = []
  const labels = t.document.labels
  const timestamp = new Date().toLocaleDateString(t.document.dateLocale, {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  lines.push(`# ${t.document.title}`)
  lines.push('')
  lines.push(`**${t.document.generated}:** ${timestamp}`)
  lines.push('')
  lines.push(`> **${t.document.important}**`)
  lines.push('')
  lines.push('---')
  lines.push('')

  const hasAboutMe = state.aboutMe?.fullName?.trim() || state.aboutMe?.reason?.trim() || state.aboutMe?.personalContext?.trim()
  if (hasAboutMe) {
    lines.push(sectionHeading('aboutMe', t))
    lines.push('')
    if (state.aboutMe.fullName?.trim()) lines.push(`**${labels.fullName}:** ${state.aboutMe.fullName}`)
    if (state.aboutMe.dateOfBirth?.trim()) lines.push(`**${labels.dateOfBirth}:** ${state.aboutMe.dateOfBirth}`)
    if (state.aboutMe.location?.trim()) lines.push(`**${labels.location}:** ${state.aboutMe.location}`)
    if (state.aboutMe.reason?.trim()) lines.push(`**${labels.reason}:** ${translateStoredValue(state.aboutMe.reason, t)}`)
    if (state.aboutMe.intendedFor?.trim()) lines.push(`**${labels.intendedFor}:** ${state.aboutMe.intendedFor}`)
    lines.push('')
    if (state.aboutMe.personalContext?.trim()) {
      lines.push(`### ${labels.personalContext}`)
      lines.push('')
      lines.push(state.aboutMe.personalContext.trim())
      lines.push('')
    }
    lines.push('---')
    lines.push('')
  }

  if (state.contacts.some(c => c.name.trim())) {
    lines.push(sectionHeading('contacts', t))
    lines.push('')
    state.contacts.filter(c => c.name.trim()).forEach(c => {
      lines.push(`### ${c.name}`)
      if (c.role) lines.push(`- **${labels.role}:** ${translateStoredValue(c.role, t)}`)
      if (c.relationship) lines.push(`- **${labels.relationship}:** ${c.relationship}`)
      if (c.phone) lines.push(`- **${labels.phone}:** ${c.phone}`)
      if (c.email) lines.push(`- **${labels.email}:** ${c.email}`)
      if (c.notes) lines.push(`- **${labels.notes}:** ${c.notes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  if (state.financialAccounts.some(a => a.institution.trim())) {
    lines.push(sectionHeading('financial', t))
    lines.push('')
    state.financialAccounts.filter(a => a.institution.trim()).forEach(a => {
      const accountType = translateStoredValue(a.accountType, t)
      lines.push(`### ${a.institution}${a.accountType ? ` (${accountType})` : ''}`)
      if (a.approxValue) lines.push(`- **${labels.approximateValue}:** ${a.approxValue}`)
      if (a.hasBeneficiary) lines.push(`- **${labels.namedBeneficiary}:** ${translateStoredValue(a.hasBeneficiary, t)}`)
      if (a.accessNotes) lines.push(`- **${labels.howToAccess}:** ${a.accessNotes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  if (state.insurancePolicies.some(p => p.carrier.trim())) {
    lines.push(sectionHeading('insurance', t))
    lines.push('')
    state.insurancePolicies.filter(p => p.carrier.trim()).forEach(p => {
      const insuranceType = translateStoredValue(p.insuranceType, t)
      lines.push(`### ${p.carrier}${p.insuranceType ? ` - ${insuranceType}` : ''}`)
      if (p.policyNumberLocation) lines.push(`- **${labels.policyNumberLocation}:** ${p.policyNumberLocation}`)
      if (p.agentContact) lines.push(`- **${labels.agent}:** ${p.agentContact}`)
      if (p.isEmployerProvided) lines.push(`- **${labels.throughEmployer}:** ${translateStoredValue(p.isEmployerProvided, t)}`)
      if (p.employerContact) lines.push(`- **${labels.employerContact}:** ${p.employerContact}`)
      if (p.notes) lines.push(`- **${labels.notes}:** ${p.notes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  if (state.properties.some(p => p.propertyType.trim() || p.description.trim())) {
    lines.push(sectionHeading('property', t))
    lines.push('')
    state.properties.filter(p => p.propertyType.trim() || p.description.trim()).forEach(p => {
      const propertyType = translateStoredValue(p.propertyType, t)
      const title = p.description || propertyType
      lines.push(`### ${title}`)
      if (p.propertyType && p.description) lines.push(`- **${labels.type}:** ${propertyType}`)
      if (p.location) lines.push(`- **${labels.location}:** ${p.location}`)
      if (p.deedTitleLocation) lines.push(`- **${labels.deedTitleLocation}:** ${p.deedTitleLocation}`)
      if (p.hasMortgage) lines.push(`- **${labels.mortgageLien}:** ${translateStoredValue(p.hasMortgage, t)}`)
      if (p.notes) lines.push(`- **${labels.notes}:** ${p.notes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  const digitalFields = [
    { key: 'deviceAccess', label: labels.deviceAccess },
    { key: 'emailAccounts', label: labels.emailAccounts },
    { key: 'passwordManager', label: labels.passwordManager },
    { key: 'twoFactorAuth', label: labels.twoFactorAuth },
    { key: 'socialMediaWishes', label: labels.socialMedia },
    { key: 'cloudStorage', label: labels.cloudStorage },
    { key: 'subscriptions', label: labels.subscriptions },
    { key: 'domainNames', label: labels.domains },
    { key: 'digitalPurchases', label: labels.digitalPurchases },
    { key: 'otherDigital', label: labels.otherDigital },
  ]
  const hasDigital = digitalFields.some(f => (state.digital as Record<string, string>)[f.key]?.trim())
  if (hasDigital) {
    lines.push(sectionHeading('digital', t))
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

  if (state.legalDocuments.some(d => d.documentType.trim())) {
    lines.push(sectionHeading('legal', t))
    lines.push('')
    state.legalDocuments.filter(d => d.documentType.trim()).forEach(d => {
      lines.push(`### ${translateStoredValue(d.documentType, t)}`)
      if (d.location) lines.push(`- **${labels.location}:** ${d.location}`)
      if (d.lastUpdated) lines.push(`- **${labels.lastUpdated}:** ${d.lastUpdated}`)
      if (d.notes) lines.push(`- **${labels.notes}:** ${d.notes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  if (state.debts.some(d => d.lender.trim())) {
    lines.push(sectionHeading('debts', t))
    lines.push('')
    state.debts.filter(d => d.lender.trim()).forEach(d => {
      const isOwedToMe = d.direction === 'Owed to me'
      const debtType = translateStoredValue(d.debtType, t)
      const dirLabel = isOwedToMe ? ` *(${t.document.owedToMe})*` : ''
      lines.push(`### ${d.lender}${d.debtType ? ` - ${debtType}` : ''}${dirLabel}`)
      if (d.approxBalance) lines.push(`- **${labels.approximateBalance}:** ${d.approxBalance}`)
      if (!isOwedToMe && d.isCosigned) lines.push(`- **${labels.cosigned}:** ${translateStoredValue(d.isCosigned, t)}`)
      if (d.payoffNotes) lines.push(`- **${labels.notes}:** ${d.payoffNotes}`)
      lines.push('')
    })
    lines.push('---')
    lines.push('')
  }

  const hasBusiness = state.business.hasBusiness === 'Yes' &&
    Object.entries(state.business).some(([key, value]) => key !== 'hasBusiness' && value.trim())
  if (hasBusiness) {
    lines.push(sectionHeading('business', t))
    lines.push('')
    if (state.business.businessName) lines.push(`**${t.document.businessFallback}:** ${state.business.businessName}`)
    if (state.business.entityType) lines.push(`**${labels.entityType}:** ${state.business.entityType}`)
    lines.push('')
    const businessFields = [
      { key: 'keyContacts', label: labels.keyContacts },
      { key: 'operatingAgreementLocation', label: labels.operatingAgreement },
      { key: 'bankAccountAccess', label: labels.bankAccess },
      { key: 'successionPlan', label: labels.successionPlan },
      { key: 'otherBusinessNotes', label: labels.otherBusinessNotes },
    ]
    businessFields.forEach(f => {
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

  const dependentFields = [
    { key: 'minorChildren', label: labels.minorChildren },
    { key: 'guardianshipPreferences', label: labels.guardianship },
    { key: 'elderlyDependents', label: labels.elderlyDependents },
    { key: 'pets', label: labels.pets },
    { key: 'specialNeeds', label: labels.specialNeeds },
    { key: 'otherCareNotes', label: labels.otherCareNotes },
  ]
  const hasDependents = dependentFields.some(f => (state.dependents as Record<string, string>)[f.key]?.trim())
  if (hasDependents) {
    lines.push(sectionHeading('dependents', t))
    lines.push('')
    dependentFields.forEach(f => {
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

  const wishFields = [
    { key: 'healthcareWishes', label: labels.healthcareWishes },
    { key: 'funeralPreferences', label: labels.funeralPreferences },
    { key: 'organDonation', label: labels.organDonation },
    { key: 'personalMessages', label: labels.personalMessages },
    { key: 'valuesStatement', label: labels.valuesStatement },
    { key: 'otherWishes', label: labels.otherWishes },
  ]
  const hasWishes = wishFields.some(f => (state.wishes as Record<string, string>)[f.key]?.trim())
  if (hasWishes) {
    lines.push(sectionHeading('wishes', t))
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

  if (state.verification?.fullName?.trim() || state.verification?.familyPassphrase?.trim()) {
    lines.push(sectionHeading('verification', t))
    lines.push('')
    if (state.verification.fullName) lines.push(`**${labels.signedBy}:** ${state.verification.fullName}`)
    if (state.verification.verificationDate) lines.push(`**${labels.date}:** ${state.verification.verificationDate}`)
    lines.push('')
    lines.push(t.document.verificationStatement)
    lines.push('')
    if (state.verification.familyPassphrase?.trim()) {
      lines.push(`### ${labels.personalProof}`)
      lines.push('')
      lines.push(state.verification.familyPassphrase.trim())
      lines.push('')
    }
    lines.push('---')
    lines.push('')
  }

  lines.push(`*${t.document.generatedWith}*`)

  return lines.join('\n')
}
