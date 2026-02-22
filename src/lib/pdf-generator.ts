import jsPDF from 'jspdf'
import type { InterviewState } from '../context/InterviewContext'
import { SECTIONS, getSection } from './interview-data'

const COLORS = {
  charcoal: [28, 25, 23] as [number, number, number],
  charcoalLight: [68, 64, 60] as [number, number, number],
  charcoalMuted: [120, 113, 108] as [number, number, number],
  sage: [124, 110, 84] as [number, number, number],
  sageDark: [92, 82, 64] as [number, number, number],
  sageLight: [168, 155, 128] as [number, number, number],
  sageBg: [240, 237, 230] as [number, number, number],
  cream: [250, 248, 244] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  border: [219, 216, 206] as [number, number, number],
  warmGray: [232, 229, 217] as [number, number, number],
}

export function generatePDF(state: InterviewState) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 0
  let pageNum = 0

  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // ─── Helpers ───────────────────────────────────────────────

  function addPageBackground() {
    doc.setFillColor(...COLORS.cream)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
  }

  function addPageFooter() {
    pageNum++
    doc.setFontSize(7)
    doc.setTextColor(...COLORS.charcoalMuted)
    doc.text('Handoff — Letter of Instruction', margin, pageHeight - 10)
    doc.text(`${pageNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' })
  }

  function newPage() {
    doc.addPage()
    addPageBackground()
    y = margin + 5
    addPageFooter()
  }

  function checkPageBreak(needed: number) {
    if (y + needed > pageHeight - 20) {
      newPage()
    }
  }

  // Draws a rounded rectangle (card)
  function drawCard(x: number, yPos: number, w: number, h: number) {
    const r = 2
    doc.setFillColor(...COLORS.white)
    doc.setDrawColor(...COLORS.border)
    doc.setLineWidth(0.3)
    doc.roundedRect(x, yPos, w, h, r, r, 'FD')
  }

  // Section header: full-width sage bar with white letter + title
  function addSectionHeader(letter: string, title: string) {
    checkPageBreak(22)
    // Sage bar
    doc.setFillColor(...COLORS.sage)
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F')

    // Letter circle
    doc.setFillColor(...COLORS.sageDark)
    doc.circle(margin + 10, y + 7, 4.5, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...COLORS.white)
    doc.text(letter, margin + 10, y + 8.5, { align: 'center' })

    // Title
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...COLORS.white)
    doc.text(title, margin + 19, y + 8.8)
    y += 20
  }

  // A single label: value pair within a card
  function addFieldInCard(label: string, value: string, cardX: number, fieldWidth: number) {
    if (!value?.trim()) return
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(...COLORS.sage)
    doc.text(label.toUpperCase(), cardX, y)
    y += 4
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...COLORS.charcoal)
    const lines = doc.splitTextToSize(value, fieldWidth)
    lines.forEach((line: string) => {
      checkPageBreak(5)
      doc.text(line, cardX, y)
      y += 4.5
    })
    y += 2
  }

  // Standalone field (no card, for free-text sections)
  function addField(label: string, value: string) {
    if (!value?.trim()) return
    checkPageBreak(14)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(...COLORS.sage)
    doc.text(label.toUpperCase(), margin + 2, y)
    y += 4.5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...COLORS.charcoal)
    const lines = doc.splitTextToSize(value, contentWidth - 4)
    lines.forEach((line: string) => {
      checkPageBreak(5)
      doc.text(line, margin + 2, y)
      y += 4.5
    })
    y += 4
  }

  // Measure the height a card will need for a set of fields
  function measureFields(fields: { label: string; value: string }[], fieldWidth: number): number {
    let h = 8 // top padding
    fields.forEach(f => {
      if (!f.value?.trim()) return
      h += 4 // label
      const lines = doc.splitTextToSize(f.value, fieldWidth)
      h += lines.length * 4.5
      h += 2 // gap
    })
    h += 4 // bottom padding
    return h
  }

  // Draw a card with fields inside
  function addCard(title: string, fields: { label: string; value: string }[]) {
    const cardX = margin
    const cardPadding = 6
    const innerX = cardX + cardPadding
    const innerWidth = contentWidth - cardPadding * 2

    // Measure
    const titleHeight = title ? 10 : 0
    const fieldsHeight = measureFields(fields, innerWidth)
    const totalHeight = titleHeight + fieldsHeight

    checkPageBreak(totalHeight + 4)

    const cardY = y
    drawCard(cardX, cardY, contentWidth, totalHeight)

    // Card title
    if (title) {
      y = cardY + 7
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(title, innerX, y)
      y += 7
    } else {
      y = cardY + 6
    }

    // Fields
    fields.forEach(f => {
      addFieldInCard(f.label, f.value, innerX, innerWidth)
    })

    y = cardY + totalHeight + 5
  }

  // Two-column card layout for compact items (contacts, etc.)
  function addTwoColumnCards(items: { title: string; fields: { label: string; value: string }[] }[]) {
    const colWidth = (contentWidth - 5) / 2
    const cardPadding = 5
    const innerWidth = colWidth - cardPadding * 2

    for (let i = 0; i < items.length; i += 2) {
      const left = items[i]
      const right = items[i + 1]

      const leftHeight = 10 + measureFields(left.fields, innerWidth)
      const rightHeight = right ? 10 + measureFields(right.fields, innerWidth) : 0
      const rowHeight = Math.max(leftHeight, rightHeight)

      checkPageBreak(rowHeight + 6)

      const rowY = y

      // Left card
      drawCard(margin, rowY, colWidth, rowHeight)
      y = rowY + 7
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(left.title, margin + cardPadding, y)
      y += 6
      left.fields.forEach(f => addFieldInCard(f.label, f.value, margin + cardPadding, innerWidth))

      // Right card
      if (right) {
        const rightX = margin + colWidth + 5
        drawCard(rightX, rowY, colWidth, rowHeight)
        y = rowY + 7
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.setTextColor(...COLORS.charcoal)
        doc.text(right.title, rightX + cardPadding, y)
        y += 6
        right.fields.forEach(f => addFieldInCard(f.label, f.value, rightX + cardPadding, innerWidth))
      }

      y = rowY + rowHeight + 5
    }
  }

  // ─── Cover Page ────────────────────────────────────────────

  addPageBackground()

  // Sage accent line at top
  doc.setFillColor(...COLORS.sage)
  doc.rect(0, 0, pageWidth, 3, 'F')

  // Title block
  y = 75
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...COLORS.sage)
  doc.text('RELAY', pageWidth / 2, y, { align: 'center' })

  y += 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(36)
  doc.setTextColor(...COLORS.charcoal)
  doc.text('Letter of', pageWidth / 2, y, { align: 'center' })
  y += 14
  doc.text('Instruction', pageWidth / 2, y, { align: 'center' })

  y += 15
  doc.setDrawColor(...COLORS.sage)
  doc.setLineWidth(0.8)
  doc.line(pageWidth / 2 - 20, y, pageWidth / 2 + 20, y)

  y += 12
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...COLORS.charcoalLight)
  doc.text(timestamp, pageWidth / 2, y, { align: 'center' })

  // Table of contents
  y += 30
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.charcoalMuted)
  doc.text('CONTENTS', pageWidth / 2, y, { align: 'center' })
  y += 10

  const tocSections = SECTIONS.filter((_, i) => {
    // Check if section has data
    return sectionHasData(state, SECTIONS[i].id)
  })

  tocSections.forEach(section => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...COLORS.charcoalLight)
    doc.text(`${section.letter}`, pageWidth / 2 - 30, y, { align: 'right' })
    doc.setFillColor(...COLORS.sage)
    doc.circle(pageWidth / 2 - 23, y - 1.2, 1.2, 'F')
    doc.text(section.title, pageWidth / 2 - 18, y)
    y += 7
  })

  // Disclaimer at bottom
  y = pageHeight - 45
  doc.setFillColor(...COLORS.sageBg)
  doc.roundedRect(margin + 15, y, contentWidth - 30, 22, 2, 2, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...COLORS.charcoalMuted)
  const disclaimer = 'This is not a legal document. It is a personal letter of instruction intended to help your family locate important information and understand your wishes. Consult an attorney for legal estate planning.'
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth - 40)
  doc.text(disclaimerLines, pageWidth / 2, y + 8, { align: 'center' })

  // Cover footer
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.charcoalMuted)
  doc.text('Generated with Handoff', pageWidth / 2, pageHeight - 12, { align: 'center' })

  // ─── Content Pages ─────────────────────────────────────────

  // Section A: About You
  const hasAboutMe = state.aboutMe?.fullName?.trim() || state.aboutMe?.reason?.trim() || state.aboutMe?.personalContext?.trim()
  if (hasAboutMe) {
    newPage()
    addSectionHeader(getSection('aboutMe').letter, getSection('aboutMe').title)

    const aboutFields: { label: string; value: string }[] = []
    if (state.aboutMe.fullName?.trim()) aboutFields.push({ label: 'Full Name', value: state.aboutMe.fullName })
    if (state.aboutMe.dateOfBirth?.trim()) aboutFields.push({ label: 'Date of Birth', value: state.aboutMe.dateOfBirth })
    if (state.aboutMe.location?.trim()) aboutFields.push({ label: 'Location', value: state.aboutMe.location })
    if (state.aboutMe.reason?.trim()) aboutFields.push({ label: 'Reason for Creating This', value: state.aboutMe.reason })
    if (state.aboutMe.intendedFor?.trim()) aboutFields.push({ label: 'Intended For', value: state.aboutMe.intendedFor })
    if (state.aboutMe.personalContext?.trim()) aboutFields.push({ label: 'Personal Context', value: state.aboutMe.personalContext })

    addCard('', aboutFields)
  }

  // Section B: Contacts
  const filledContacts = state.contacts.filter(c => c.name.trim())
  if (filledContacts.length > 0) {
    newPage()
    addSectionHeader(getSection('contacts').letter, getSection('contacts').title)

    const contactCards = filledContacts.map(c => ({
      title: c.name,
      fields: [
        { label: 'Role', value: c.role },
        { label: 'Relationship', value: c.relationship },
        { label: 'Phone', value: c.phone },
        { label: 'Email', value: c.email },
        { label: 'Notes', value: c.notes },
      ],
    }))

    if (contactCards.length <= 6) {
      addTwoColumnCards(contactCards)
    } else {
      contactCards.forEach(card => addCard(card.title, card.fields))
    }
  }

  // Section C: Financial Accounts
  const filledAccounts = state.financialAccounts.filter(a => a.institution.trim())
  if (filledAccounts.length > 0) {
    newPage()
    addSectionHeader(getSection('financial').letter, getSection('financial').title)

    // Summary table
    checkPageBreak(10 + filledAccounts.length * 7)
    const tableY = y
    const colWidths = [contentWidth * 0.28, contentWidth * 0.18, contentWidth * 0.18, contentWidth * 0.36]
    const cols = [margin, margin + colWidths[0], margin + colWidths[0] + colWidths[1], margin + colWidths[0] + colWidths[1] + colWidths[2]]

    // Table header
    doc.setFillColor(...COLORS.sageBg)
    doc.rect(margin, tableY, contentWidth, 7, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(...COLORS.sageDark)
    doc.text('INSTITUTION', cols[0] + 3, tableY + 5)
    doc.text('TYPE', cols[1] + 3, tableY + 5)
    doc.text('VALUE', cols[2] + 3, tableY + 5)
    doc.text('BENEFICIARY', cols[3] + 3, tableY + 5)
    y = tableY + 7

    // Table rows
    filledAccounts.forEach((a, i) => {
      checkPageBreak(7)
      if (i % 2 === 1) {
        doc.setFillColor(...COLORS.warmGray)
        doc.rect(margin, y, contentWidth, 7, 'F')
      }
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.5)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(a.institution.substring(0, 25), cols[0] + 3, y + 5)
      doc.text(a.accountType.substring(0, 15), cols[1] + 3, y + 5)
      doc.setFont('helvetica', 'bold')
      doc.text(a.approxValue || '—', cols[2] + 3, y + 5)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...COLORS.charcoalLight)
      doc.text((a.hasBeneficiary || '—').substring(0, 30), cols[3] + 3, y + 5)
      y += 7
    })
    y += 6

    // Detailed access notes as cards
    const accountsWithNotes = filledAccounts.filter(a => a.accessNotes?.trim())
    if (accountsWithNotes.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(...COLORS.charcoalMuted)
      doc.text('ACCESS DETAILS', margin + 2, y)
      y += 6

      accountsWithNotes.forEach(a => {
        addCard(`${a.institution} — ${a.accountType}`, [
          { label: 'How to access', value: a.accessNotes },
        ])
      })
    }
  }

  // Section D: Insurance
  const filledPolicies = state.insurancePolicies.filter(p => p.carrier.trim())
  if (filledPolicies.length > 0) {
    newPage()
    addSectionHeader(getSection('insurance').letter, getSection('insurance').title)

    filledPolicies.forEach(p => {
      addCard(`${p.carrier}${p.insuranceType ? ` — ${p.insuranceType}` : ''}`, [
        { label: 'Policy number / location', value: p.policyNumberLocation },
        { label: 'Agent contact', value: p.agentContact },
        { label: 'Through employer', value: p.isEmployerProvided },
        { label: 'Notes', value: p.notes },
      ])
    })
  }

  // Section E: Property
  const filledProperties = state.properties.filter(p => p.propertyType.trim() || p.description.trim())
  if (filledProperties.length > 0) {
    newPage()
    addSectionHeader(getSection('property').letter, getSection('property').title)

    filledProperties.forEach(p => {
      addCard(p.description || p.propertyType, [
        ...(p.propertyType && p.description ? [{ label: 'Type', value: p.propertyType }] : []),
        { label: 'Location', value: p.location },
        { label: 'Deed / title location', value: p.deedTitleLocation },
        { label: 'Mortgage / lien', value: p.hasMortgage },
        { label: 'Notes', value: p.notes },
      ])
    })
  }

  // Section F: Digital Life
  const digitalEntries = [
    { key: 'emailAccounts', label: 'Email Accounts' },
    { key: 'passwordManager', label: 'Password Manager' },
    { key: 'twoFactorAuth', label: 'Two-Factor Authentication' },
    { key: 'socialMediaWishes', label: 'Social Media' },
    { key: 'cloudStorage', label: 'Cloud Storage' },
    { key: 'subscriptions', label: 'Subscriptions & Recurring Payments' },
    { key: 'domainNames', label: 'Domain Names & Websites' },
    { key: 'digitalPurchases', label: 'Digital Purchases & Loyalty Programs' },
    { key: 'otherDigital', label: 'Other' },
  ]
  const hasDigital = digitalEntries.some(e => (state.digital as Record<string, string>)[e.key]?.trim())
  if (hasDigital) {
    newPage()
    addSectionHeader(getSection('digital').letter, getSection('digital').title)
    digitalEntries.forEach(e => {
      const val = (state.digital as Record<string, string>)[e.key]
      if (val?.trim()) {
        addField(e.label, val)
      }
    })
  }

  // Section G: Legal Documents
  const filledDocs = state.legalDocuments.filter(d => d.documentType.trim())
  if (filledDocs.length > 0) {
    newPage()
    addSectionHeader(getSection('legal').letter, getSection('legal').title)

    // Summary table
    checkPageBreak(10 + filledDocs.length * 7)
    const tableY = y
    const colW = [contentWidth * 0.3, contentWidth * 0.5, contentWidth * 0.2]
    const colX = [margin, margin + colW[0], margin + colW[0] + colW[1]]

    doc.setFillColor(...COLORS.sageBg)
    doc.rect(margin, tableY, contentWidth, 7, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(...COLORS.sageDark)
    doc.text('DOCUMENT', colX[0] + 3, tableY + 5)
    doc.text('LOCATION', colX[1] + 3, tableY + 5)
    doc.text('LAST UPDATED', colX[2] + 3, tableY + 5)
    y = tableY + 7

    filledDocs.forEach((d, i) => {
      checkPageBreak(7)
      if (i % 2 === 1) {
        doc.setFillColor(...COLORS.warmGray)
        doc.rect(margin, y, contentWidth, 7, 'F')
      }
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(d.documentType.substring(0, 28), colX[0] + 3, y + 5)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...COLORS.charcoalLight)
      doc.text((d.location || '—').substring(0, 50), colX[1] + 3, y + 5)
      doc.text(d.lastUpdated || '—', colX[2] + 3, y + 5)
      y += 7
    })
    y += 6

    // Notes cards
    const docsWithNotes = filledDocs.filter(d => d.notes?.trim())
    if (docsWithNotes.length > 0) {
      docsWithNotes.forEach(d => {
        addCard(d.documentType, [
          { label: 'Notes', value: d.notes },
        ])
      })
    }
  }

  // Section H: Debts
  const filledDebts = state.debts.filter(d => d.lender.trim())
  if (filledDebts.length > 0) {
    newPage()
    addSectionHeader(getSection('debts').letter, getSection('debts').title)

    filledDebts.forEach(d => {
      addCard(`${d.lender}${d.debtType ? ` — ${d.debtType}` : ''}`, [
        { label: 'Approximate balance', value: d.approxBalance },
        { label: 'Co-signed', value: d.isCosigned },
        { label: 'Payoff notes', value: d.payoffNotes },
      ])
    })
  }

  // Section I: Business
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
      addSectionHeader(getSection('business').letter, getSection('business').title)

      // Business name + entity as a header card
      addCard(state.business.businessName || 'Business', [
        { label: 'Entity type', value: state.business.entityType },
        ...bizEntries.map(e => ({
          label: e.label,
          value: (state.business as Record<string, string>)[e.key],
        })),
      ])
    }
  }

  // Section J: Dependents
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
    addSectionHeader(getSection('dependents').letter, getSection('dependents').title)
    depEntries.forEach(e => {
      const val = (state.dependents as Record<string, string>)[e.key]
      if (val?.trim()) {
        addField(e.label, val)
      }
    })
  }

  // Section K: Wishes
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
    addSectionHeader(getSection('wishes').letter, getSection('wishes').title)
    wishEntries.forEach(e => {
      const val = (state.wishes as Record<string, string>)[e.key]
      if (val?.trim()) {
        addField(e.label, val)
      }
    })
  }

  // Section L: Verification
  if (state.verification?.fullName?.trim() || state.verification?.familyPassphrase?.trim()) {
    newPage()
    addSectionHeader(getSection('verification').letter, getSection('verification').title)

    // Verification statement card
    checkPageBreak(40)
    doc.setFillColor(...COLORS.sageBg)
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F')
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.charcoalLight)
    const statementLines = doc.splitTextToSize(
      'I confirm that I created this document voluntarily, that the information is accurate to the best of my knowledge, and that it reflects my current wishes.',
      contentWidth - 10
    )
    doc.text(statementLines, margin + 5, y + 7)
    y += 24

    // Name and date
    if (state.verification.fullName) addField('Signed by', state.verification.fullName)
    if (state.verification.verificationDate) addField('Date', state.verification.verificationDate)

    // Signature image
    if (state.verification.signatureData) {
      checkPageBreak(40)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(...COLORS.charcoalMuted)
      doc.text('SIGNATURE', margin + 2, y)
      y += 4

      try {
        doc.addImage(state.verification.signatureData, 'PNG', margin, y, 70, 28)
      } catch {
        // Signature data might be invalid
      }
      y += 32

      // Signature line
      doc.setDrawColor(...COLORS.border)
      doc.setLineWidth(0.3)
      doc.line(margin, y, margin + 70, y)
      y += 8
    }

    // Family passphrase
    if (state.verification.familyPassphrase?.trim()) {
      addField('Family Passphrase', state.verification.familyPassphrase)
    }
  }

  // Download
  doc.save(`handoff-letter-of-instruction-${new Date().toISOString().split('T')[0]}.pdf`)
}

// Helper to check if a section has data (used for TOC)
function sectionHasData(state: InterviewState, sectionId: string): boolean {
  switch (sectionId) {
    case 'aboutMe':
      return !!(state.aboutMe?.fullName?.trim() || state.aboutMe?.reason?.trim() || state.aboutMe?.personalContext?.trim())
    case 'contacts':
      return state.contacts.some(c => c.name.trim() !== '')
    case 'financial':
      return state.financialAccounts.some(a => a.institution.trim() !== '')
    case 'insurance':
      return state.insurancePolicies.some(p => p.carrier.trim() !== '')
    case 'property':
      return state.properties.some(p => p.description.trim() !== '' || p.propertyType.trim() !== '')
    case 'digital':
      return Object.values(state.digital).some(v => v.trim() !== '')
    case 'legal':
      return state.legalDocuments.some(d => d.documentType.trim() !== '')
    case 'debts':
      return state.debts.some(d => d.lender.trim() !== '')
    case 'business':
      return state.business.hasBusiness === 'Yes' && Object.values(state.business).some(v => v.trim() !== '')
    case 'dependents':
      return Object.values(state.dependents).some(v => v.trim() !== '')
    case 'wishes':
      return Object.values(state.wishes).some(v => v.trim() !== '')
    case 'verification':
      return !!(state.verification?.fullName?.trim() || state.verification?.signatureData || state.verification?.familyPassphrase?.trim())
    default:
      return false
  }
}
