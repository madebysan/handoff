import jsPDF from 'jspdf'
import type { InterviewState } from '../context/InterviewContext'
import { SECTIONS } from './interview-data'

const COLORS = {
  charcoal: [26, 26, 26] as [number, number, number],
  charcoalLight: [74, 74, 74] as [number, number, number],
  charcoalMuted: [138, 138, 138] as [number, number, number],
  sage: [124, 144, 130] as [number, number, number],
  sageDark: [94, 114, 100] as [number, number, number],
  cream: [250, 250, 248] as [number, number, number],
  border: [224, 222, 216] as [number, number, number],
}

export function generatePDF(state: InterviewState) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 25
  const contentWidth = pageWidth - margin * 2
  let y = 0

  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // --- Cover Page ---
  doc.setFillColor(...COLORS.cream)
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F')

  y = 80
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(32)
  doc.setTextColor(...COLORS.charcoal)
  doc.text('Letter of Instruction', pageWidth / 2, y, { align: 'center' })

  y += 15
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(...COLORS.charcoalLight)
  doc.text(`Generated ${timestamp}`, pageWidth / 2, y, { align: 'center' })

  y += 30
  doc.setDrawColor(...COLORS.border)
  doc.line(margin + 40, y, pageWidth - margin - 40, y)

  y += 15
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.charcoalMuted)
  const disclaimer = 'This is not a legal document. It is a personal letter of instruction intended to help your family locate important information and understand your wishes. Consult an attorney for legal estate planning documents.'
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth - 20)
  doc.text(disclaimerLines, pageWidth / 2, y, { align: 'center' })

  // Footer on cover
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.charcoalMuted)
  doc.text('Generated with Relay', pageWidth / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' })

  // --- Content Pages ---
  function newPage() {
    doc.addPage()
    doc.setFillColor(...COLORS.cream)
    doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F')
    y = margin
    // Page footer
    doc.setFontSize(7)
    doc.setTextColor(...COLORS.charcoalMuted)
    doc.text('Generated with Relay', pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
  }

  function checkPageBreak(needed: number) {
    if (y + needed > doc.internal.pageSize.getHeight() - 25) {
      newPage()
    }
  }

  function addSectionHeader(letter: string, title: string) {
    checkPageBreak(20)
    doc.setFillColor(...COLORS.sage)
    doc.circle(margin + 5, y + 3, 5, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255)
    doc.text(letter, margin + 5, y + 4.5, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(...COLORS.charcoal)
    doc.text(title, margin + 14, y + 5)
    y += 15
  }

  function addField(label: string, value: string) {
    if (!value?.trim()) return
    checkPageBreak(15)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.charcoalMuted)
    doc.text(label, margin, y)
    y += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...COLORS.charcoal)
    const lines = doc.splitTextToSize(value, contentWidth)
    lines.forEach((line: string) => {
      checkPageBreak(6)
      doc.text(line, margin, y)
      y += 5
    })
    y += 3
  }

  function addSubheader(text: string) {
    checkPageBreak(12)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...COLORS.charcoal)
    doc.text(text, margin, y)
    y += 8
  }

  function addDivider() {
    checkPageBreak(10)
    y += 3
    doc.setDrawColor(...COLORS.border)
    doc.line(margin, y, pageWidth - margin, y)
    y += 8
  }

  // --- Sections ---

  // Section A: Contacts
  const filledContacts = state.contacts.filter(c => c.name.trim())
  if (filledContacts.length > 0) {
    newPage()
    addSectionHeader('A', SECTIONS[0].title)
    filledContacts.forEach((c, i) => {
      if (i > 0) { y += 3 }
      addSubheader(c.name)
      addField('Role', c.role)
      addField('Relationship', c.relationship)
      addField('Phone', c.phone)
      addField('Email', c.email)
      addField('Notes', c.notes)
    })
  }

  // Section B: Financial
  const filledAccounts = state.financialAccounts.filter(a => a.institution.trim())
  if (filledAccounts.length > 0) {
    newPage()
    addSectionHeader('B', SECTIONS[1].title)
    filledAccounts.forEach((a, i) => {
      if (i > 0) addDivider()
      addSubheader(`${a.institution}${a.accountType ? ` — ${a.accountType}` : ''}`)
      addField('Approximate value', a.approxValue)
      addField('Named beneficiary', a.hasBeneficiary)
      addField('How to access', a.accessNotes)
    })
  }

  // Section C: Insurance
  const filledPolicies = state.insurancePolicies.filter(p => p.carrier.trim())
  if (filledPolicies.length > 0) {
    newPage()
    addSectionHeader('C', SECTIONS[2].title)
    filledPolicies.forEach((p, i) => {
      if (i > 0) addDivider()
      addSubheader(`${p.carrier}${p.insuranceType ? ` — ${p.insuranceType}` : ''}`)
      addField('Policy number location', p.policyNumberLocation)
      addField('Agent', p.agentContact)
      addField('Through employer', p.isEmployerProvided)
      addField('Notes', p.notes)
    })
  }

  // Section D: Property
  const filledProperties = state.properties.filter(p => p.propertyType.trim() || p.description.trim())
  if (filledProperties.length > 0) {
    newPage()
    addSectionHeader('D', SECTIONS[3].title)
    filledProperties.forEach((p, i) => {
      if (i > 0) addDivider()
      addSubheader(p.description || p.propertyType)
      if (p.propertyType && p.description) addField('Type', p.propertyType)
      addField('Location', p.location)
      addField('Deed/title location', p.deedTitleLocation)
      addField('Has mortgage/lien', p.hasMortgage)
      addField('Notes', p.notes)
    })
  }

  // Section E: Digital Life
  const digitalEntries = [
    { key: 'emailAccounts', label: 'Email Accounts' },
    { key: 'passwordManager', label: 'Password Manager' },
    { key: 'twoFactorAuth', label: 'Two-Factor Authentication' },
    { key: 'socialMediaWishes', label: 'Social Media' },
    { key: 'cloudStorage', label: 'Cloud Storage' },
    { key: 'subscriptions', label: 'Subscriptions & Recurring Payments' },
    { key: 'crypto', label: 'Cryptocurrency' },
    { key: 'domainNames', label: 'Domain Names & Websites' },
    { key: 'digitalPurchases', label: 'Digital Purchases & Loyalty Programs' },
    { key: 'otherDigital', label: 'Other' },
  ]
  const hasDigital = digitalEntries.some(e => (state.digital as Record<string, string>)[e.key]?.trim())
  if (hasDigital) {
    newPage()
    addSectionHeader('E', SECTIONS[4].title)
    digitalEntries.forEach(e => {
      const val = (state.digital as Record<string, string>)[e.key]
      if (val?.trim()) {
        addField(e.label, val)
      }
    })
  }

  // Section F: Legal Documents
  const filledDocs = state.legalDocuments.filter(d => d.documentType.trim())
  if (filledDocs.length > 0) {
    newPage()
    addSectionHeader('F', SECTIONS[5].title)
    filledDocs.forEach((d, i) => {
      if (i > 0) addDivider()
      addSubheader(d.documentType)
      addField('Location', d.location)
      addField('Last updated', d.lastUpdated)
      addField('Notes', d.notes)
    })
  }

  // Section G: Debts
  const filledDebts = state.debts.filter(d => d.lender.trim())
  if (filledDebts.length > 0) {
    newPage()
    addSectionHeader('G', SECTIONS[6].title)
    filledDebts.forEach((d, i) => {
      if (i > 0) addDivider()
      addSubheader(`${d.lender}${d.debtType ? ` — ${d.debtType}` : ''}`)
      addField('Approximate balance', d.approxBalance)
      addField('Co-signed', d.isCosigned)
      addField('Notes', d.payoffNotes)
    })
  }

  // Section H: Business
  if (state.business.hasBusiness === 'Yes') {
    const bizEntries = [
      { key: 'keyContacts', label: 'Key Contacts' },
      { key: 'operatingAgreementLocation', label: 'Operating Agreement Location' },
      { key: 'bankAccountAccess', label: 'Bank Account Access' },
      { key: 'successionPlan', label: 'Succession Plan' },
      { key: 'otherBusinessNotes', label: 'Other Notes' },
    ]
    const hasBizData = bizEntries.some(e => (state.business as Record<string, string>)[e.key]?.trim())
    if (hasBizData) {
      newPage()
      addSectionHeader('H', SECTIONS[7].title)
      addField('Business name', state.business.businessName)
      addField('Entity type', state.business.entityType)
      bizEntries.forEach(e => {
        addField(e.label, (state.business as Record<string, string>)[e.key])
      })
    }
  }

  // Section I: Dependents
  const depEntries = [
    { key: 'minorChildren', label: 'Minor Children' },
    { key: 'guardianshipPreferences', label: 'Guardianship Preferences' },
    { key: 'elderlyDependents', label: 'Elderly Dependents' },
    { key: 'pets', label: 'Pets' },
    { key: 'specialNeeds', label: 'Special Needs' },
    { key: 'otherCareNotes', label: 'Other Care Notes' },
  ]
  const hasDepData = depEntries.some(e => (state.dependents as Record<string, string>)[e.key]?.trim())
  if (hasDepData) {
    newPage()
    addSectionHeader('I', SECTIONS[8].title)
    depEntries.forEach(e => {
      addField(e.label, (state.dependents as Record<string, string>)[e.key])
    })
  }

  // Section J: Wishes
  const wishEntries = [
    { key: 'funeralPreferences', label: 'Funeral or Memorial Preferences' },
    { key: 'organDonation', label: 'Organ Donation' },
    { key: 'personalMessages', label: 'Personal Messages' },
    { key: 'valuesStatement', label: 'Values & What Matters Most' },
    { key: 'otherWishes', label: 'Other Wishes' },
  ]
  const hasWishData = wishEntries.some(e => (state.wishes as Record<string, string>)[e.key]?.trim())
  if (hasWishData) {
    newPage()
    addSectionHeader('J', SECTIONS[9].title)
    wishEntries.forEach(e => {
      addField(e.label, (state.wishes as Record<string, string>)[e.key])
    })
  }

  // Download
  doc.save(`relay-letter-of-instruction-${new Date().toISOString().split('T')[0]}.pdf`)
}
