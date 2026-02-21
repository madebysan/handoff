# Relay — V0 Implementation Plan

**The Estate Attorney in Your Browser**

---

## 1. Project Overview

Relay is a free, static-site tool that replicates the structured interview process estate attorneys use with high-net-worth clients — and makes it accessible to everyone. It guides users through 10 comprehensive sections covering every dimension of their life infrastructure, then generates a downloadable letter of instruction. No backend, no accounts, no data ever leaves the browser. The entire experience happens client-side, and the output is a file the user owns and controls.

The v0 goal: a fully functional guided interview (all 10 sections) with PDF and Markdown export, auto-save via localStorage, and a landing page that reframes death preparation as life organization. Wealthsimple-inspired design — clean typography, muted tones, editorial feel.

---

## 2. Tech Stack

| Layer | Choice | Reasoning |
|---|---|---|
| **Framework** | React 18 + Vite | Fast dev server, excellent DX, static build output |
| **Styling** | Tailwind CSS | Utility-first, rapid prototyping, responsive by default |
| **Components** | shadcn/ui | Accessible, customizable, Tailwind-native. No dependency lock-in. |
| **PDF generation** | jsPDF + jspdf-autotable | Client-side, no server needed. Mature library. |
| **Routing** | React Router v6 | Landing page, interview flow, export/guidance pages |
| **State** | React Context + useReducer | Global interview state without Redux overhead |
| **Persistence** | localStorage | Auto-save interview progress, clear on export or manual clear |
| **Icons** | Lucide React | Consistent, lightweight, works with shadcn/ui |
| **Build output** | Static HTML/CSS/JS | Deploy anywhere — Vercel, GitHub Pages, Netlify |
| **License** | MIT | Open-source, forkable, survives creator |

**Not using:** No backend, no database, no API calls, no analytics (v0), no auth, no encryption (deferred to v1).

---

## 3. Features

### 3.1 Landing Page
- Hero section with positioning: "Get your life organized so your family never has to guess"
- Value proposition (3 pillars): structured completeness, zero-trust privacy, free forever
- Single CTA: "Start Your Relay" → begins interview
- "Do It Together" section: framing for adult children + aging parents, with shareable invite copy
- Tone: warm, direct, life-organization framing (not death preparation)

### 3.2 Interview Engine (10 Sections, A-J)
Multi-step form wizard with sidebar progress indicator. Each section follows the same pattern:
- **Section intro:** 2-3 sentences explaining why this matters, with a real-world scenario
- **Structured fields** for key items (contacts, accounts, policies)
- **Guided free-text** for complex/personal content (wishes, messages, digital life details)
- **Repeatable entries** for sections with multiple items (accounts, insurance, property)
- **Skip-friendly:** every section optional, no judgment for empty sections

**Sections in order (emotional arc: practical → deep → meaningful):**

| # | Section | Primary Input Type | Key Fields |
|---|---------|-------------------|------------|
| A | Immediate Contacts | Structured | Name, phone, relationship, role (executor, attorney, etc.) |
| B | Financial Accounts | Structured + repeatable | Institution, type, approx value range, beneficiary Y/N, access notes |
| C | Insurance | Structured + repeatable | Carrier, type, policy # location, agent contact, employer-provided Y/N |
| D | Property & Assets | Hybrid | Type, location, deed/title location, mortgage Y/N, notes |
| E | Digital Life | Hybrid | Email accounts, password manager, social media wishes, subscriptions, crypto, 2FA setup |
| F | Legal Documents | Structured | Document type, location, last updated |
| G | Debts & Obligations | Structured + repeatable | Lender, type, approx balance, co-signed Y/N, payoff clause notes |
| H | Business Interests | Hybrid | Entity type, key contacts, operating agreement location, succession notes |
| I | Dependents & Care | Hybrid | Dependents list, guardianship preferences, pet care, special needs |
| J | Wishes & Messages | Free-text guided | Funeral preferences, organ donation, personal messages, values statement |

### 3.3 Auto-Save (localStorage)
- Interview progress saves automatically after each field change (debounced)
- Visible indicator: "Saved locally in this browser" with timestamp
- Security warning on first save: "Your responses are stored in this browser only. They are not encrypted and could be read by anyone with access to this device. Clear your data when you're done."
- "Clear all data" button always accessible from sidebar
- Resume prompt when returning: "You have a saved session from [date]. Continue or start fresh?"

### 3.4 PDF Export
- Professional document layout: cover page, table of contents, sections with headers
- "Not a legal document" disclaimer prominent on first page
- "Last updated: [timestamp]" on cover
- Subtle footer: "Generated with Relay — relay.app"
- Clean typography, adequate spacing — should feel like something from a lawyer's office
- Only includes sections the user actually filled in (skip empty sections)

### 3.5 Markdown Export
- Same content as PDF but in clean, structured Markdown
- Portable, editable, future-proof format
- Includes the same disclaimers and metadata as PDF

### 3.6 Post-Interview Guidance
- Appears after document generation, before/alongside download
- Storage recommendations (physical copy, cloud, attorney, USB)
- Sharing strategies (immediate share, sealed envelope, split knowledge, family conversation)
- Update cadence guidance (annually + major life events)
- "Do It Together" invite: copyable text + shareable link for the adult-child use case

### 3.7 Mobile Responsive
- Interview must work well on phone (the "together over video call" use case)
- Sidebar collapses to top progress bar on mobile
- Touch-friendly inputs, adequate tap targets
- PDF generation works on mobile browsers

---

## 4. File Structure

```
relay/
  public/
    favicon.svg
  src/
    components/
      landing/
        Hero.tsx
        ValueProp.tsx
        DoItTogether.tsx
        Footer.tsx
      interview/
        InterviewLayout.tsx       # Sidebar + main content shell
        SectionIntro.tsx          # Reusable "why this matters" intro block
        ProgressSidebar.tsx       # Desktop sidebar with section list
        ProgressBar.tsx           # Mobile top progress bar
        SectionRenderer.tsx       # Routes to correct section component
        fields/
          TextField.tsx           # Single-line text input
          TextArea.tsx            # Multi-line guided free-text
          RepeatableGroup.tsx     # Add/remove rows for accounts, contacts, etc.
          SelectField.tsx         # Dropdown
          RadioGroup.tsx          # Yes/No or option selection
          FieldLabel.tsx          # Label with optional help text
      sections/
        ContactsSection.tsx       # Section A
        FinancialSection.tsx      # Section B
        InsuranceSection.tsx      # Section C
        PropertySection.tsx       # Section D
        DigitalLifeSection.tsx    # Section E
        LegalDocsSection.tsx      # Section F
        DebtsSection.tsx          # Section G
        BusinessSection.tsx       # Section H
        DependentsSection.tsx     # Section I
        WishesSection.tsx         # Section J
      export/
        ExportPage.tsx            # Download options + guidance
        GuidanceSection.tsx       # Storage/sharing recommendations
        DoItTogetherInvite.tsx    # Shareable invite copy
      ui/                         # shadcn/ui components (auto-generated)
    lib/
      interview-data.ts           # Section definitions, intro copy, field schemas
      pdf-generator.ts            # jsPDF document builder
      markdown-generator.ts       # Markdown string builder
      storage.ts                  # localStorage save/load/clear
      utils.ts                    # shadcn/ui utils (cn function)
    context/
      InterviewContext.tsx         # Global state: all section responses
    hooks/
      useAutoSave.ts              # Debounced localStorage persistence
      useInterview.ts             # Context consumer hook
    pages/
      LandingPage.tsx
      InterviewPage.tsx
      ExportPage.tsx
    App.tsx
    main.tsx
    index.css                     # Tailwind directives + custom theme
  tailwind.config.js
  components.json                 # shadcn/ui config
  tsconfig.json
  vite.config.ts
  package.json
  README.md
  LICENSE
```

---

## 5. Competitive Context

### Market Opportunity
- Only **24% of Americans have a will** (2025), down from 40% in 2016. **55% have no estate plan at all.**
- The estate planning services market is **$1.26B in 2025**, projected to reach **$2.43B by 2034**.
- **Fewer than 1 in 4 people** leave clear digital access instructions.
- The "Great Wealth Transfer" will move **$105 trillion** over the next 25 years.

### Competitive Gap
- **No free, open-source letter of instruction tool exists.** The only GitHub project (EstateTrust) is a full backend app, not a static guided tool.
- **Trust & Will** ($199-599) focuses on legal document creation, not the information gap.
- **Everplans** ($99.99/yr) is a vault, not a guided interview. Subscription model means it can vanish.
- **GoodTrust** ($149+) bundles wills + vault but doesn't replicate the attorney interview process.
- **FreeWill** is free but only handles basic wills, not letters of instruction.
- **IronClad Family** focuses on encrypted vault storage with delivery triggers — requires ongoing subscription.
- **AI tools** (Relaw.ai, Vanilla V/AI) target attorneys, not consumers. Generic AI chat lacks structured completeness.

### Relay's Position
The only tool that combines: guided interview (attorney's process) + zero-trust (no server) + free forever + open-source (survives creator). Against AI chat, Relay wins on structured completeness and emotional design.

---

## 6. Design Direction

### Visual Language: Wealthsimple-Inspired
- **Typography:** Clean sans-serif. Inter or similar. Large section headers, comfortable body text.
- **Colors:** Muted, warm palette. Off-white background, dark charcoal text, single accent color (warm sage green or muted teal). No bright primaries.
- **Spacing:** Generous whitespace. Content breathes. Nothing feels cramped.
- **Layout:** Single-column interview flow. Sidebar for navigation (desktop). Cards for grouped content.
- **Tone:** Editorial, not app-like. Feels like reading a well-designed article, not filling out a government form.

### Emotional Design
- **Opening sections (A-D):** Practical, low-stakes. "Organizing" energy. Clean, efficient UI.
- **Middle sections (E-H):** Deeper, more detailed. Completeness instinct kicks in. Contextual prompts surface things users forgot.
- **Closing sections (I-J):** Meaningful, personal. UI softens slightly. More free-text, fewer structured fields. Space for reflection.
- **Post-completion:** Accomplishment, not morbid duty. "You just created something invaluable for your family."

### Key UI Patterns
- Section intro blocks with a warm, scenario-based explanation
- Smooth transitions between sections (no jarring page reloads)
- Persistent progress indicator showing completion per section
- Subtle auto-save indicator ("Saved just now")
- "Skip this section" always visible, never judgmental
- Export page feels like a milestone, not a checkout

---

## 7. Implementation Order

Features are ordered by dependency — each builds on the previous.

1. **Project scaffold** — Vite + React + Tailwind + shadcn/ui + React Router
2. **Interview state & context** — InterviewContext with useReducer, section data schema
3. **Interview layout** — Sidebar + progress + section shell (desktop + mobile)
4. **Reusable field components** — TextField, TextArea, RepeatableGroup, SelectField, RadioGroup
5. **All 10 sections (A-J)** — Build in emotional arc order, each with intro copy + fields
6. **Auto-save (localStorage)** — Debounced save, resume prompt, clear data, security warning
7. **Landing page** — Hero, value prop, Do It Together, CTA to interview
8. **Markdown export** — Generate structured Markdown from interview state
9. **PDF export** — jsPDF document with cover page, TOC, professional formatting
10. **Export page + guidance** — Download options, storage/sharing recommendations, invite copy
11. **Mobile responsive pass** — Sidebar → progress bar, touch targets, responsive typography
12. **Polish pass** — Transitions, loading states, empty states, copy review

---

## 8. Open Question Decisions (Locked for V0)

| Question | Decision | Reasoning |
|---|---|---|
| Save/resume via localStorage? | **Yes, with security warning** | 30-60 min interview needs persistence. Clear warning about browser-only storage. |
| Completeness score? | **No** | Gamification feels wrong for this subject. Skip-friendly means no judgment. |
| Adaptive vs fixed interview? | **Fixed, show all 10 sections** | Surfaces things users forgot — that's the core value. Every section is skip-friendly. |
| Default export format? | **PDF primary, Markdown secondary** | PDF is universal. Markdown for portability. Both offered side by side. |
| Print-first mode? | **No (v0)** | PDF serves print needs. Dedicated booklet format is a v1 consideration. |
| Encryption? | **Deferred to v1** | Focus v0 on nailing the interview UX, not security features. |

---

## 9. V1 Backlog (Not V0)

- Client-side AES-256 encryption (password-protected PDF)
- Privacy-respecting analytics (Plausible/Umami)
- AI-powered conversational interview layer
- Print-optimized booklet format
- Community templates (single parents, crypto holders, small business)
- Couples/family mode
- Localization (non-US jurisdictions)

---

run_contract:
  max_iterations: 30
  completion_promise: "V0_COMPLETE"
  on_stuck: defer_and_continue
  on_ambiguity: choose_simpler_option
  on_regression: revert_to_last_clean_commit
  human_intervention: never
  visual_qa_max_passes: 3
  visual_qa_agentation: auto
  phase_skip:
    qa_console: false
    visual_qa: false
    security: false
  complexity_overrides:
    landing_page: "hero + value prop + do-it-together + single CTA, Wealthsimple editorial feel"
    interview_engine: "hybrid approach — structured fields for contacts/accounts/insurance + guided free-text for wishes/digital life/business"
    interview_sections: "all 10 sections A-J, fixed order, every section optional"
    auto_save: "localStorage with debounce, security warning, resume prompt, clear data button"
    pdf_export: "jsPDF client-side, professional layout with cover/TOC/sections, skip empty sections"
    markdown_export: "client-side string templating, clean structured format"
    post_interview_guidance: "static content — storage recs, sharing strategies, update cadence, invite copy"
    mobile_responsive: "sidebar collapses to progress bar, touch-friendly, works on phone"
    theme: "light mode only, Wealthsimple-inspired — muted warm palette, clean sans-serif, generous whitespace"
    encryption: "SKIP — deferred to v1"
    analytics: "SKIP — deferred to v1"
    auth: "NONE — zero backend"
