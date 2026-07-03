import type { InterviewState } from '../context/InterviewContext'
import { getSection, getSections } from './interview-data'
import { translations, type Translation } from '../i18n/translations'

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

function translateStoredValue(value: string, t: Translation): string {
  const optionGroups = Object.values(t.options) as Record<string, string>[]
  const optionLabel = optionGroups.find(group => group[value])?.[value]
  if (optionLabel) return optionLabel
  if (value === 'Yes') return t.common.yes
  if (value === 'No') return t.common.no
  if (value === 'Not sure') return t.common.notSure
  return value
}

export async function generatePDF(
  state: InterviewState,
  t: Translation = translations.en,
) {
  const { default: jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 0
  let pageNum = 0
  const labels = t.document.labels
  const sections = getSections(t)

  const timestamp = new Date().toLocaleDateString(t.document.dateLocale, {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // ─── Helpers ───────────────────────────────────────────────

  function truncate(text: string, max: number): string {
    if (!text) return '—'
    return text.length > max ? text.substring(0, max - 1) + '…' : text
  }

  function addPageBackground() {
    doc.setFillColor(...COLORS.cream)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
  }

  function addPageFooter() {
    pageNum++
    doc.setFontSize(7)
    doc.setTextColor(...COLORS.charcoalMuted)
    doc.text('Handoff', margin, pageHeight - 10)
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

  // A single label: value pair within a card (no page break — card must fit on page)
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
    const maxCardHeight = pageHeight - 40 // max space for a card on a fresh page

    // Measure
    const titleHeight = title ? 10 : 0
    const fieldsHeight = measureFields(fields, innerWidth)
    const totalHeight = titleHeight + fieldsHeight

    // If the card is too tall for any single page, render as individual fields (no card bg)
    if (totalHeight > maxCardHeight) {
      if (title) {
        checkPageBreak(14)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(...COLORS.charcoal)
        doc.text(title, margin + 2, y)
        y += 8
      }
      fields.forEach(f => addField(f.label, f.value))
      return
    }

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
    const maxCardHeight = pageHeight - 40

    for (let i = 0; i < items.length; i += 2) {
      const left = items[i]
      const right = items[i + 1]

      const leftHeight = 10 + measureFields(left.fields, innerWidth)
      const rightHeight = right ? 10 + measureFields(right.fields, innerWidth) : 0
      const rowHeight = Math.max(leftHeight, rightHeight)

      // If row is too tall, fall back to single-column cards
      if (rowHeight > maxCardHeight) {
        addCard(left.title, left.fields)
        if (right) addCard(right.title, right.fields)
        continue
      }

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

      // Right card — reset y to same row start
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
  doc.text('HANDOFF', pageWidth / 2, y, { align: 'center' })

  y += 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(36)
  doc.setTextColor(...COLORS.charcoal)
  doc.text('Handoff', pageWidth / 2, y, { align: 'center' })
  y += 14
  doc.text(t.document.coverDocument, pageWidth / 2, y, { align: 'center' })

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
  doc.text(t.document.contents, pageWidth / 2, y, { align: 'center' })
  y += 10

  const tocSections = sections.filter(section => sectionHasData(state, section.id))

  const tocMaxY = pageHeight - 55 // stop before disclaimer
  tocSections.forEach(section => {
    if (y > tocMaxY) return // prevent overlap with disclaimer
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
  const disclaimer = t.document.disclaimer
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth - 40)
  doc.text(disclaimerLines, pageWidth / 2, y + 8, { align: 'center' })

  // Cover footer
  doc.setFontSize(7)
  doc.setTextColor(...COLORS.charcoalMuted)
  doc.text(t.document.coverFooter, pageWidth / 2, pageHeight - 12, { align: 'center' })

  // ─── Emergency Quick-Reference Page ────────────────────────

  const hasEmergencyData = (() => {
    const hasContacts = state.contacts.some(c => c.name.trim())
    const hasWill = state.legalDocuments.some(d => d.documentType === 'Will' && d.location?.trim())
    const hasBank = state.financialAccounts.some(a => a.institution.trim())
    const hasInsurance = state.insurancePolicies.some(p => p.carrier.trim())
    const hasPassphrase = !!state.verification?.familyPassphrase?.trim()
    return hasContacts || hasWill || hasBank || hasInsurance || hasPassphrase
  })()

  if (hasEmergencyData) {
    newPage()

    const iceCardPadding = 6
    const iceInnerWidth = contentWidth - iceCardPadding * 2

    // Page title — styled like a section header
    doc.setFillColor(...COLORS.sage)
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...COLORS.white)
    doc.text(t.document.emergencyTitle, margin + 6, y + 8.8)
    y += 20

    // Subtitle
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9.5)
    doc.setTextColor(...COLORS.charcoalMuted)
    doc.text(t.document.emergencySubtitle, margin + 2, y)
    y += 10

    // 1. Who to call first
    const emergencyContacts = state.contacts.filter(c => c.name.trim()).slice(0, 3)
    if (emergencyContacts.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(t.document.whoToCall, margin + 2, y)
      y += 5

      emergencyContacts.forEach(c => {
        const fields: { label: string; value: string }[] = [
          { label: labels.role, value: translateStoredValue(c.role, t) },
          { label: labels.phone, value: c.phone },
        ]
        const cardH = 10 + measureFields(fields, iceInnerWidth)
        checkPageBreak(cardH + 4)
        const cardY = y
        drawCard(margin, cardY, contentWidth, cardH)
        y = cardY + 7
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.setTextColor(...COLORS.charcoal)
        doc.text(c.name, margin + iceCardPadding, y)
        y += 6
        fields.forEach(f => addFieldInCard(f.label, f.value, margin + iceCardPadding, iceInnerWidth))
        y = cardY + cardH + 4
      })
      y += 2
    }

    // 2. Where the will is
    const willDoc = state.legalDocuments.find(d => d.documentType === 'Will' && d.location?.trim())
    if (willDoc) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(t.document.whereWill, margin + 2, y)
      y += 5

      const fields = [{ label: labels.location, value: willDoc.location }]
      const cardH = 8 + measureFields(fields, iceInnerWidth)
      checkPageBreak(cardH + 4)
      const cardY = y
      drawCard(margin, cardY, contentWidth, cardH)
      y = cardY + 6
      fields.forEach(f => addFieldInCard(f.label, f.value, margin + iceCardPadding, iceInnerWidth))
      y = cardY + cardH + 6
    }

    // 3. Primary bank access
    const primaryAccount = state.financialAccounts.find(a => a.institution.trim())
    if (primaryAccount) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(t.document.primaryBank, margin + 2, y)
      y += 5

      const fields: { label: string; value: string }[] = [
        { label: labels.institution, value: primaryAccount.institution },
        { label: labels.type, value: translateStoredValue(primaryAccount.accountType, t) },
      ]
      if (primaryAccount.accessNotes?.trim()) {
        fields.push({ label: labels.howToAccess, value: primaryAccount.accessNotes })
      }
      const cardH = 8 + measureFields(fields, iceInnerWidth)
      checkPageBreak(cardH + 4)
      const cardY = y
      drawCard(margin, cardY, contentWidth, cardH)
      y = cardY + 6
      fields.forEach(f => addFieldInCard(f.label, f.value, margin + iceCardPadding, iceInnerWidth))
      y = cardY + cardH + 6
    }

    // 4. Insurance
    const primaryPolicy = state.insurancePolicies.find(p => p.carrier.trim())
    if (primaryPolicy) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(getSection('insurance', t).title, margin + 2, y)
      y += 5

      const fields = [
        { label: labels.carrier, value: primaryPolicy.carrier },
        { label: labels.type, value: translateStoredValue(primaryPolicy.insuranceType, t) },
      ]
      const cardH = 8 + measureFields(fields, iceInnerWidth)
      checkPageBreak(cardH + 4)
      const cardY = y
      drawCard(margin, cardY, contentWidth, cardH)
      y = cardY + 6
      fields.forEach(f => addFieldInCard(f.label, f.value, margin + iceCardPadding, iceInnerWidth))
      y = cardY + cardH + 6
    }

    // 5. Family passphrase / Personal proof
    if (state.verification?.familyPassphrase?.trim()) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.charcoal)
      doc.text(t.document.familyPassphrase, margin + 2, y)
      y += 5

      const fields = [{ label: labels.passphrase, value: state.verification.familyPassphrase }]
      const cardH = 8 + measureFields(fields, iceInnerWidth)
      checkPageBreak(cardH + 4)
      const cardY = y
      drawCard(margin, cardY, contentWidth, cardH)
      y = cardY + 6
      fields.forEach(f => addFieldInCard(f.label, f.value, margin + iceCardPadding, iceInnerWidth))
      y = cardY + cardH + 6
    }

    // Footer note
    checkPageBreak(10)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(...COLORS.charcoalMuted)
    doc.text(t.document.seeFullDocument, pageWidth / 2, y + 4, { align: 'center' })
  }

  // ─── Content Pages ─────────────────────────────────────────

  // Section A: About You
  const hasAboutMe = state.aboutMe?.fullName?.trim() || state.aboutMe?.reason?.trim() || state.aboutMe?.personalContext?.trim()
  if (hasAboutMe) {
    const section = getSection('aboutMe', t)
    newPage()
    addSectionHeader(section.letter, section.title)

    const aboutFields: { label: string; value: string }[] = []
    if (state.aboutMe.fullName?.trim()) aboutFields.push({ label: labels.fullName, value: state.aboutMe.fullName })
    if (state.aboutMe.dateOfBirth?.trim()) aboutFields.push({ label: labels.dateOfBirth, value: state.aboutMe.dateOfBirth })
    if (state.aboutMe.location?.trim()) aboutFields.push({ label: labels.location, value: state.aboutMe.location })
    if (state.aboutMe.reason?.trim()) aboutFields.push({ label: labels.reason, value: translateStoredValue(state.aboutMe.reason, t) })
    if (state.aboutMe.intendedFor?.trim()) aboutFields.push({ label: labels.intendedFor, value: state.aboutMe.intendedFor })
    if (state.aboutMe.personalContext?.trim()) aboutFields.push({ label: labels.personalContext, value: state.aboutMe.personalContext })

    addCard('', aboutFields)
  }

  // Section B: Contacts
  const filledContacts = state.contacts.filter(c => c.name.trim())
  if (filledContacts.length > 0) {
    const section = getSection('contacts', t)
    newPage()
    addSectionHeader(section.letter, section.title)

    const contactCards = filledContacts.map(c => ({
      title: c.name,
      fields: [
        { label: labels.role, value: translateStoredValue(c.role, t) },
        { label: labels.relationship, value: c.relationship },
        { label: labels.phone, value: c.phone },
        { label: labels.email, value: c.email },
        { label: labels.notes, value: c.notes },
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
    const section = getSection('financial', t)
    newPage()
    addSectionHeader(section.letter, section.title)

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
    doc.text(labels.institution.toUpperCase(), cols[0] + 3, tableY + 5)
    doc.text(labels.type.toUpperCase(), cols[1] + 3, tableY + 5)
    doc.text(labels.value.toUpperCase(), cols[2] + 3, tableY + 5)
    doc.text(labels.beneficiary.toUpperCase(), cols[3] + 3, tableY + 5)
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
      doc.text(truncate(a.institution, 25), cols[0] + 3, y + 5)
      doc.text(truncate(translateStoredValue(a.accountType, t), 15), cols[1] + 3, y + 5)
      doc.setFont('helvetica', 'bold')
      doc.text(a.approxValue || '—', cols[2] + 3, y + 5)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...COLORS.charcoalLight)
      doc.text(truncate(translateStoredValue(a.hasBeneficiary, t), 30), cols[3] + 3, y + 5)
      y += 7
    })
    y += 6

    // Detailed access notes as cards
    const accountsWithNotes = filledAccounts.filter(a => a.accessNotes?.trim())
    if (accountsWithNotes.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(...COLORS.charcoalMuted)
      doc.text(t.document.accessDetails, margin + 2, y)
      y += 6

      accountsWithNotes.forEach(a => {
        addCard(`${a.institution} - ${translateStoredValue(a.accountType, t)}`, [
          { label: labels.howToAccess, value: a.accessNotes },
        ])
      })
    }
  }

  // Section D: Insurance
  const filledPolicies = state.insurancePolicies.filter(p => p.carrier.trim())
  if (filledPolicies.length > 0) {
    const section = getSection('insurance', t)
    newPage()
    addSectionHeader(section.letter, section.title)

    filledPolicies.forEach(p => {
      addCard(`${p.carrier}${p.insuranceType ? ` - ${translateStoredValue(p.insuranceType, t)}` : ''}`, [
        { label: labels.policyNumberShort, value: p.policyNumberLocation },
        { label: labels.agentContact, value: p.agentContact },
        { label: labels.throughEmployer, value: translateStoredValue(p.isEmployerProvided, t) },
        { label: labels.employerContact, value: p.employerContact },
        { label: labels.notes, value: p.notes },
      ])
    })
  }

  // Section E: Property
  const filledProperties = state.properties.filter(p => p.propertyType.trim() || p.description.trim())
  if (filledProperties.length > 0) {
    const section = getSection('property', t)
    newPage()
    addSectionHeader(section.letter, section.title)

    filledProperties.forEach(p => {
      addCard(p.description || translateStoredValue(p.propertyType, t), [
        ...(p.propertyType && p.description ? [{ label: labels.type, value: translateStoredValue(p.propertyType, t) }] : []),
        { label: labels.location, value: p.location },
        { label: labels.deedTitleShort, value: p.deedTitleLocation },
        { label: labels.mortgageLien, value: translateStoredValue(p.hasMortgage, t) },
        { label: labels.notes, value: p.notes },
      ])
    })
  }

  // Section F: Digital Life
  const digitalEntries = [
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
  const hasDigital = digitalEntries.some(e => (state.digital as Record<string, string>)[e.key]?.trim())
  if (hasDigital) {
    const section = getSection('digital', t)
    newPage()
    addSectionHeader(section.letter, section.title)
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
    const section = getSection('legal', t)
    newPage()
    addSectionHeader(section.letter, section.title)

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
    doc.text(labels.document.toUpperCase(), colX[0] + 3, tableY + 5)
    doc.text(labels.location.toUpperCase(), colX[1] + 3, tableY + 5)
    doc.text(labels.lastUpdated.toUpperCase(), colX[2] + 3, tableY + 5)
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
      doc.text(truncate(translateStoredValue(d.documentType, t), 28), colX[0] + 3, y + 5)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...COLORS.charcoalLight)
      doc.text(truncate(d.location, 50), colX[1] + 3, y + 5)
      doc.text(d.lastUpdated || '—', colX[2] + 3, y + 5)
      y += 7
    })
    y += 6

    // Notes cards
    const docsWithNotes = filledDocs.filter(d => d.notes?.trim())
    if (docsWithNotes.length > 0) {
      docsWithNotes.forEach(d => {
        addCard(translateStoredValue(d.documentType, t), [
          { label: labels.notes, value: d.notes },
        ])
      })
    }
  }

  // Section H: Debts
  const filledDebts = state.debts.filter(d => d.lender.trim())
  if (filledDebts.length > 0) {
    const section = getSection('debts', t)
    newPage()
    addSectionHeader(section.letter, section.title)

    filledDebts.forEach(d => {
      const isOwedToMe = d.direction === 'Owed to me'
      const dirLabel = isOwedToMe ? ` (${t.document.owedToMe})` : ''
      addCard(`${d.lender}${d.debtType ? ` - ${translateStoredValue(d.debtType, t)}` : ''}${dirLabel}`, [
        { label: labels.approximateBalance, value: d.approxBalance },
        ...(!isOwedToMe ? [{ label: labels.cosigned, value: translateStoredValue(d.isCosigned, t) }] : []),
        { label: isOwedToMe ? labels.details : labels.payoffNotes, value: d.payoffNotes },
      ])
    })
  }

  // Section I: Business
  if (state.business.hasBusiness === 'Yes') {
    const bizEntries = [
      { key: 'keyContacts', label: labels.keyContacts },
      { key: 'operatingAgreementLocation', label: labels.operatingAgreement },
      { key: 'bankAccountAccess', label: labels.bankAccess },
      { key: 'successionPlan', label: labels.successionPlan },
      { key: 'otherBusinessNotes', label: labels.otherBusinessNotes },
    ]
    const hasBizData = bizEntries.some(e => (state.business as Record<string, string>)[e.key]?.trim())
    if (hasBizData) {
      const section = getSection('business', t)
      newPage()
      addSectionHeader(section.letter, section.title)

      // Business name + entity as a header card
      addCard(state.business.businessName || t.document.businessFallback, [
        { label: labels.entityType, value: state.business.entityType },
        ...bizEntries.map(e => ({
          label: e.label,
          value: (state.business as Record<string, string>)[e.key],
        })),
      ])
    }
  }

  // Section J: Dependents
  const depEntries = [
    { key: 'minorChildren', label: labels.minorChildren },
    { key: 'guardianshipPreferences', label: labels.guardianship },
    { key: 'elderlyDependents', label: labels.elderlyDependents },
    { key: 'pets', label: labels.pets },
    { key: 'specialNeeds', label: labels.specialNeeds },
    { key: 'otherCareNotes', label: labels.otherCareNotes },
  ]
  const hasDepData = depEntries.some(e => (state.dependents as Record<string, string>)[e.key]?.trim())
  if (hasDepData) {
    const section = getSection('dependents', t)
    newPage()
    addSectionHeader(section.letter, section.title)
    depEntries.forEach(e => {
      const val = (state.dependents as Record<string, string>)[e.key]
      if (val?.trim()) {
        addField(e.label, val)
      }
    })
  }

  // Section K: Wishes
  const wishEntries = [
    { key: 'healthcareWishes', label: labels.healthcareWishes },
    { key: 'funeralPreferences', label: labels.funeralPreferences },
    { key: 'organDonation', label: labels.organDonation },
    { key: 'personalMessages', label: labels.personalMessages },
    { key: 'valuesStatement', label: labels.valuesStatement },
    { key: 'otherWishes', label: labels.otherWishes },
  ]
  const hasWishData = wishEntries.some(e => (state.wishes as Record<string, string>)[e.key]?.trim())
  if (hasWishData) {
    const section = getSection('wishes', t)
    newPage()
    addSectionHeader(section.letter, section.title)
    wishEntries.forEach(e => {
      const val = (state.wishes as Record<string, string>)[e.key]
      if (val?.trim()) {
        addField(e.label, val)
      }
    })
  }

  // Section L: Verification
  if (state.verification?.fullName?.trim() || state.verification?.familyPassphrase?.trim()) {
    const section = getSection('verification', t)
    newPage()
    addSectionHeader(section.letter, section.title)

    // Verification statement card
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    const statementLines = doc.splitTextToSize(
      t.document.verificationStatement,
      contentWidth - 10
    )
    const statementBoxH = statementLines.length * 4.5 + 10
    checkPageBreak(statementBoxH + 20)
    doc.setFillColor(...COLORS.sageBg)
    doc.roundedRect(margin, y, contentWidth, statementBoxH, 2, 2, 'F')
    doc.setTextColor(...COLORS.charcoalLight)
    doc.text(statementLines, margin + 5, y + 7)
    y += statementBoxH + 4

    // Name and date
    if (state.verification.fullName) addField(labels.signedBy, state.verification.fullName)
    if (state.verification.verificationDate) addField(labels.date, state.verification.verificationDate)

    // Signature
    if (state.verification.signatureData) {
      checkPageBreak(40)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(...COLORS.charcoalMuted)
      doc.text(t.document.signature, margin + 2, y)
      y += 4

      if (state.verification.signatureData.startsWith('typed:')) {
        // Typed signature — render as italic text
        const typedName = state.verification.signatureData.slice(6)
        if (typedName.trim()) {
          y += 8
          doc.setFont('helvetica', 'bolditalic')
          doc.setFontSize(22)
          doc.setTextColor(...COLORS.charcoal)
          doc.text(typedName, margin + 2, y)
          y += 12
        }
      } else {
        // Drawn signature — embed as image
        try {
          doc.addImage(state.verification.signatureData, 'PNG', margin, y, 70, 28)
        } catch {
          // Signature data might be invalid
        }
        y += 32
      }

      // Signature line
      doc.setDrawColor(...COLORS.border)
      doc.setLineWidth(0.3)
      doc.line(margin, y, margin + 70, y)
      y += 8
    }

    // Family passphrase
    if (state.verification.familyPassphrase?.trim()) {
      addField(labels.personalProof, state.verification.familyPassphrase)
    }
  }

  // Download
  doc.save(`handoff-${new Date().toISOString().split('T')[0]}.pdf`)
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
