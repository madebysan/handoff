export type VisibleLocale = 'en' | 'es'
export type Locale = VisibleLocale | 'pseudo'

export interface LocalizedOption {
  value: string
  label: string
}

const en = {
  meta: {
    title: 'Handoff - Everything your family would need to know',
    description:
      'Everything your family would need to know. Accounts, documents, wishes, organized into a single document you control entirely. 100% private, no accounts, no servers.',
  },
  language: {
    label: 'Language',
    english: 'English',
    spanish: 'Spanish',
  },
  common: {
    appName: 'Handoff',
    getStarted: 'Get Started',
    continue: 'Continue',
    skip: 'Skip',
    previous: 'Previous',
    reviewAndFinish: 'Review & Finish',
    edit: 'Edit',
    yes: 'Yes',
    no: 'No',
    notSure: 'Not sure',
    select: 'Select...',
    savedAt: (time: string) => `Saved ${time}`,
    removeConfirm: "Remove this item? This can't be undone.",
    remove: 'Remove',
    addAnother: 'Add another',
    signHere: 'sign here',
    clearSignature: 'Clear signature',
    copiedToClipboard: 'Copied to clipboard',
  },
  errorBoundary: {
    title: 'Something went wrong',
    body: "Don't worry. Your data is still saved in your browser. Try refreshing the page.",
    action: 'Refresh page',
  },
  sections: {
    aboutMe: {
      title: 'The Basics',
      intro:
        "Let's start with the basics: who you are and why you're creating this. It gives context to everything that follows.",
      scenario:
        "Your family finds a list of accounts and passwords, but there's no context: who wrote this? When? Was it current? A brief introduction makes all the difference.",
    },
    contacts: {
      title: 'Immediate Contacts',
      intro:
        'If something happens to you, who should your family call first? This section ensures the most important people are reachable immediately.',
      scenario:
        "Your spouse is overwhelmed and can't remember the name of your financial advisor, your attorney, or even which friend to call for help.",
    },
    financial: {
      title: 'Financial Accounts',
      intro:
        'A complete picture of where your money lives. Bank accounts, investments, retirement funds, crypto wallets, even physical cash or gold, all in one place so nothing gets missed.',
      scenario:
        'Your family discovers a 401(k) statement in the mail six months later, with no idea how to access it or who the beneficiary is. Or worse, your crypto wallet has no recovery phrase.',
    },
    insurance: {
      title: 'Insurance',
      intro:
        'Insurance policies are often the first financial lifeline your family reaches for. Knowing what exists and how to file a claim matters enormously.',
      scenario:
        "There's a life insurance policy through your employer, but your family doesn't know it exists because you never mentioned it.",
    },
    property: {
      title: 'Property & Assets',
      intro:
        'Real estate, vehicles, valuables, storage units: your family needs to know what you own and where the paperwork lives.',
      scenario:
        "The deed to the house is in a safe deposit box your family didn't know about, and the mortgage company is sending overdue notices.",
    },
    digital: {
      title: 'Digital Life',
      intro:
        'This is the section most people forget, and where the most frustration happens. Email accounts, passwords, subscriptions, social media: your digital footprint is vast.',
      scenario:
        "Your family can't access your email to reset passwords, cancel subscriptions draining the account, or find login credentials for important services.",
    },
    legal: {
      title: 'Legal Documents',
      intro:
        "You don't need to create legal documents here, just record where they are. Your family will need to find your will, powers of attorney, and other critical papers.",
      scenario:
        'The attorney has the will, but nobody knows which attorney. The advance directive is in a drawer somewhere, but which drawer?',
    },
    debts: {
      title: 'Debts & Obligations',
      intro:
        "Debts don't disappear. Your family needs to know what's owed, to whom, and whether there are any co-signers or payoff provisions.",
      scenario:
        "A co-signed student loan goes into default because nobody knew it existed, damaging your child's credit.",
    },
    business: {
      title: 'Business Interests',
      intro:
        "If you own a business, freelance, or have partnership interests, this section ensures your professional life doesn't become a mystery.",
      scenario:
        "Your business partner doesn't have access to the business bank account, and the operating agreement is on your laptop with no password.",
    },
    dependents: {
      title: 'Dependents & Care',
      intro:
        'The people and pets who depend on you need a plan. Guardianship preferences, care instructions, and ongoing needs should be documented.',
      scenario:
        'Your elderly parent relies on you for weekly medication management, and nobody else knows the routine or the pharmacy details.',
    },
    wishes: {
      title: 'Wishes & Messages',
      intro:
        'This is the most personal section. Your preferences, your values, and anything you want your family to know. Take your time here.',
      scenario:
        'Your family is arguing about funeral arrangements because nobody knows what you would have wanted.',
    },
    verification: {
      title: 'Sign & Finish',
      intro:
        'The final step. Your signature and a personal detail confirm this document was created by you, with intention and care.',
      scenario:
        "Your family finds a document but isn't sure when it was written, whether it's current, or if someone else filled it out.",
    },
  },
  landing: {
    navCta: 'Get Started',
    heroTitle: 'One document so your family never has to guess.',
    heroBody:
      'Handoff guides you through everything your family would need to know: accounts, documents, wishes, and more. Then it produces a single document you control entirely.',
    heroNote: 'Free forever. No account needed. Nothing stored online.',
    whyEyebrow: 'Why Handoff',
    whyTitle: 'Everything your family would need, in one place.',
    whyBody:
      'Most people never organize this information. When something happens, families are left scrambling: searching through drawers, guessing at passwords, calling banks. Handoff fixes that.',
    featureVisual: {
      documentTitle: 'Your Handoff Document',
      sectionsCount: '12 sections',
      dataFlowTitle: 'How your data flows',
      typeAnswersTitle: 'You type answers',
      typeAnswersBody: 'Data stays in your browser tab',
      noNetworkTitle: 'No network requests',
      noNetworkBody: 'Zero data sent to any server',
      noTrackingTitle: 'No tracking or analytics',
      noTrackingBody: "We don't know you exist",
      downloadGoneTitle: "Download and it's gone",
      downloadGoneBody: 'Clear browser data anytime',
      withoutTitle: 'Without a Handoff document',
      withTitle: 'With a Handoff document',
      withBody: 'Everything answered, organized, in one place.',
      builtTitle: 'Built for real life',
      minutesTitle: 'Minutes to complete',
      minutesBody: 'Most people finish in one sitting',
      skipTitle: "Skip what doesn't apply",
      skipBody: 'No section is required',
      saveTitle: 'Save draft, come back later',
      saveBody: 'Your progress is saved locally',
      familyQuestions: [
        'Where are the insurance policies?',
        'What bank accounts did they have?',
        'Who is the estate attorney?',
        'What are the login credentials?',
        'Did they have a storage unit?',
      ],
    },
    features: [
      {
        key: 'completeness',
        title: 'Structured completeness',
        description:
          'Twelve sections modeled on what estate attorneys cover with clients. Surfaces everything most people forget.',
      },
      {
        key: 'privacy',
        title: 'Zero-trust privacy',
        description:
          'Nothing leaves your browser. No accounts, no servers, no data collection. Your information stays on your device.',
      },
      {
        key: 'gift',
        title: 'A gift to your family',
        description:
          'Thirty minutes now saves your family weeks of confusion and stress when it matters most.',
      },
      {
        key: 'quick',
        title: 'Complete in one sitting',
        description:
          "Skip what doesn't apply, fill in what does. Save your draft and come back anytime.",
      },
    ],
    sectionsPreview: [
      'The Basics',
      'Key Contacts',
      'Financial Accounts',
      'Insurance Policies',
      'Property & Assets',
      'Digital Life',
      'Legal Documents',
      'Debts & Liabilities',
      'Business Interests',
      'Dependents & Pets',
      'Personal Wishes',
      'Sign & Finish',
    ],
    howEyebrow: 'How it works',
    howTitle: 'Three steps. Thirty minutes. Done forever.',
    howSteps: [
      {
        title: 'Answer guided questions',
        body:
          "Walk through twelve sections covering contacts, accounts, insurance, digital life, legal documents, debts, dependents, and personal wishes. Skip anything that doesn't apply.",
      },
      {
        title: 'Download your document',
        body:
          'Get a professionally formatted PDF or Markdown file, your Handoff document. Everything your family needs, organized and clear.',
      },
      {
        title: 'Store it, share it, done',
        body:
          'Put a copy in your safe, share with your spouse, or give to your attorney. You control where it lives and who sees it.',
      },
    ],
    privacyEyebrow: 'Privacy',
    privacyTitle: 'Your data never leaves your device.',
    privacyBody:
      "Handoff runs entirely in your browser. We don't have servers, accounts, or analytics. There's no database to hack because there's no database, period.",
    privacyBullets: [
      'No account creation required',
      'No data transmitted to any server',
      'Everything saved locally in your browser',
      'Export your document and clear your data anytime',
    ],
    privacyCardTitle:
      'The most secure personal document tool is the one that never sees your data.',
    privacyCardBody:
      'Unlike cloud-based services, Handoff has no server to breach. Your sensitive information: bank accounts, insurance policies, passwords, stays in your browser and in the document you download.',
    togetherTitle: 'Do it together',
    togetherBody:
      'Thinking about suggesting this to a parent or partner? The easiest way to start the conversation is to do it yourself first, then share yours.',
    artCredit:
      'Auguste Allonge, Autumn Landscape in the Forest of Fontainebleau, c. 1860.',
    artSource: 'National Gallery of Art',
    footerTagline: 'Free, open-source, yours to keep.',
    madeBy: 'Made by',
  },
  options: {
    documentReasons: {
      'Just being proactive — everyone should do this': 'Just being proactive, everyone should do this',
      'Recent health diagnosis': 'Recent health diagnosis',
      'Getting older, want to be prepared': 'Getting older, want to be prepared',
      'Major life change (marriage, baby, divorce)': 'Major life change (marriage, baby, divorce)',
      'Traveling or doing something risky': 'Traveling or doing something risky',
      'Someone asked me to': 'Someone asked me to',
      Other: 'Other',
    },
    contactRoles: {
      'Executor / Decision-maker': 'Executor / Decision-maker',
      'Spouse / Partner': 'Spouse / Partner',
      'Family member': 'Family member',
      Attorney: 'Attorney',
      'Financial advisor': 'Financial advisor',
      'Accountant / CPA': 'Accountant / CPA',
      'Insurance agent': 'Insurance agent',
      'Doctor / Primary care': 'Doctor / Primary care',
      'Clergy / Spiritual advisor': 'Clergy / Spiritual advisor',
      'Close friend': 'Close friend',
      Other: 'Other',
    },
    accountTypes: {
      Checking: 'Checking',
      Savings: 'Savings',
      Brokerage: 'Brokerage',
      '401(k)': '401(k)',
      'IRA / Roth IRA': 'IRA / Roth IRA',
      Pension: 'Pension',
      HSA: 'HSA',
      '529 Plan': '529 Plan',
      Annuity: 'Annuity',
      CD: 'CD',
      Cryptocurrency: 'Cryptocurrency',
      'Physical (cash, gold, etc.)': 'Physical (cash, gold, etc.)',
      'Trust fund': 'Trust fund',
      Other: 'Other',
    },
    insuranceTypes: {
      'Life insurance': 'Life insurance',
      'Health insurance': 'Health insurance',
      'Homeowners / Renters': 'Homeowners / Renters',
      Auto: 'Auto',
      Umbrella: 'Umbrella',
      Disability: 'Disability',
      'Long-term care': 'Long-term care',
      Other: 'Other',
    },
    propertyTypes: {
      'Primary residence': 'Primary residence',
      'Rental property': 'Rental property',
      'Vacation home': 'Vacation home',
      Vehicle: 'Vehicle',
      'Jewelry / Valuables': 'Jewelry / Valuables',
      'Art / Collectibles': 'Art / Collectibles',
      'Safe deposit box': 'Safe deposit box',
      'Storage unit': 'Storage unit',
      Other: 'Other',
    },
    legalDocTypes: {
      Will: 'Will',
      Trust: 'Trust',
      'Power of Attorney (Financial)': 'Power of Attorney (Financial)',
      'Power of Attorney (Healthcare)': 'Power of Attorney (Healthcare)',
      'Advance directive / Living will': 'Advance directive / Living will',
      'Marriage certificate': 'Marriage certificate',
      'Divorce decree': 'Divorce decree',
      'Birth certificate': 'Birth certificate',
      Passport: 'Passport',
      'Social Security card': 'Social Security card',
      'Tax returns (recent)': 'Tax returns (recent)',
      Other: 'Other',
    },
    debtTypes: {
      Mortgage: 'Mortgage',
      'Car loan': 'Car loan',
      'Student loan': 'Student loan',
      'Personal loan': 'Personal loan',
      'Credit card': 'Credit card',
      'Business loan': 'Business loan',
      'Co-signed obligation': 'Co-signed obligation',
      Other: 'Other',
    },
    debtDirections: {
      'I owe': 'I owe',
      'Owed to me': 'Owed to me',
    },
  },
  interview: {
    whyThisMatters: 'Why this matters:',
    sidebarSubtitle: 'Your Handoff document',
    reviewAndFinish: 'Save Changes',
    saveDraft: 'Save',
    loadDraft: 'Load',
    prefilledDemo: 'Prefilled demo',
    emptyState: 'Empty state',
    demo: 'Demo',
    empty: 'Empty',
    switchToEmpty: 'Switch to empty state',
    switchToDemo: 'Switch to demo data',
    privacyNote:
      'Your data never leaves your device. Everything is stored locally in your browser. Nothing is sent to any server.',
    resume: {
      title: 'Welcome back',
      body: (date: string | null) =>
        `You have a saved session${date ? ` from ${date}` : ''}. Would you like to continue where you left off?`,
      continue: 'Continue',
      startFresh: 'Start fresh',
      confirmFresh: 'Delete and start over?',
    },
    security: {
      title: 'A note about privacy',
      body:
        'Your responses are saved locally in this browser only. They are not encrypted and could be read by anyone with access to this device.',
      followup:
        "When you're done, you can clear your data from the sidebar. Nothing is ever sent to any server.",
      action: 'Got it',
    },
  },
  forms: {
    aboutMe: {
      fullName: 'Your full name',
      fullNamePlaceholder: "As you'd like it on the document",
      dateOfBirth: 'Date of birth',
      dateOfBirthPlaceholder: 'e.g., March 15, 1982',
      location: 'Where do you live?',
      locationPlaceholder: 'City, Region, e.g., San Francisco, CA or London, UK',
      locationHelp:
        "Optional. Helps with region-specific legal considerations. Leave blank if you'd rather not say.",
      reason: 'Why are you creating this?',
      reasonPlaceholder: 'Select a reason...',
      intendedFor: 'Who is this document for?',
      intendedForPlaceholder: 'e.g., My spouse David, my kids Emma and Jack, my sister Lisa',
      intendedForHelp: 'The people who will need this information',
      personalContext: 'Anything else you want to say upfront?',
      personalContextPlaceholder:
        'Share why now, what prompted this, or a few words about yourself...',
      personalContextHelp:
        'Optional. This helps give your family context about who you are and why you created this.',
      crisis:
        'If you or someone you know is in crisis, call or text 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line). You are not alone.',
    },
    contacts: {
      groupLabel: 'Key Contacts',
      addLabel: 'Add another contact',
      fullName: 'Full name',
      fullNamePlaceholder: 'Jane Doe',
      role: 'Role',
      rolePlaceholder: 'Select role...',
      phone: 'Phone',
      phonePlaceholder: '(555) 123-4567',
      email: 'Email',
      emailPlaceholder: 'jane@example.com',
      relationship: 'Relationship',
      relationshipPlaceholder: 'Spouse, sibling, friend...',
      notes: 'Notes',
      notesPlaceholder: "Any additional context about this person's role...",
    },
    financial: {
      groupLabel: 'Financial Accounts & Assets',
      addLabel: 'Add another account or asset',
      accountType: 'Account type',
      institution: 'Institution or platform',
      physicalLocation: 'Where is it stored?',
      approximateValue: 'Approximate value',
      approximateValueHelp: 'A rough range is fine',
      namedBeneficiary: 'Named beneficiary?',
      access: 'How to access',
      placeholders: {
        cryptoInstitution: 'Coinbase, Ledger wallet, MetaMask...',
        cryptoAccess:
          'Where is the seed phrase / recovery phrase stored? Which exchanges hold funds? What wallets are used? e.g., Seed phrase is on a metal plate in the fireproof safe',
        cryptoValue: 'e.g., ~2 BTC + various altcoins',
        physicalInstitution: 'Home safe, safe deposit box, buried...',
        physicalAccess:
          'Where is it physically stored? Who else knows? How to access it? e.g., $5,000 cash in the safe behind the painting in the office. Combination is...',
        physicalValue: 'e.g., $5,000 cash + gold coins',
        defaultInstitution: 'Chase, Fidelity, Vanguard, Coinbase...',
        defaultAccess:
          'e.g., Login is in 1Password, or statements are in the filing cabinet in the office',
        defaultValue: 'e.g., $10,000 - $50,000',
      },
    },
    insurance: {
      groupLabel: 'Insurance Policies',
      addLabel: 'Add another policy',
      carrier: 'Insurance carrier',
      carrierPlaceholder: 'State Farm, Blue Cross, MetLife...',
      type: 'Type',
      policyNumberLocation: 'Where to find policy number',
      policyNumberPlaceholder: 'e.g., Filing cabinet, email from agent',
      agentContact: 'Agent contact',
      agentPlaceholder: 'Agent name or phone',
      throughEmployer: 'Through employer?',
      employerContact: 'Employer & HR/benefits contact',
      employerPlaceholder: 'e.g., Acme Corp, HR benefits line: (555) 123-4567',
      employerHelp: 'Your family will need this to file a claim through your employer',
      notes: 'Notes',
      notesPlaceholder: 'Any additional details about this policy...',
    },
    property: {
      groupLabel: 'Property & Assets',
      addLabel: 'Add another property or asset',
      type: 'Type',
      description: 'Description',
      descriptionPlaceholder: 'e.g., 3BR house on Main St',
      location: 'Location / Address',
      locationPlaceholder: 'Address or location description',
      deedTitle: 'Where is the deed/title?',
      deedTitlePlaceholder: "e.g., Safe, attorney's office",
      mortgage: 'Has mortgage or lien?',
      notes: 'Notes',
      notesPlaceholder: 'Any other details: lender info, key location, combination to safe...',
    },
    digital: {
      coreAccess: 'Core access',
      onlinePresence: 'Online presence',
      digitalAssets: 'Digital assets',
      services: 'Services & subscriptions',
      deviceAccess: 'Device access',
      deviceAccessPlaceholder:
        'Phone PIN, laptop password, tablet passcode: how to unlock the devices you use daily',
      deviceAccessHelp: 'Your phone or laptop is often the first thing your family needs to access',
      emailAccounts: 'Email accounts',
      emailAccountsPlaceholder:
        'List your email accounts and how to access them. e.g., Personal: john@gmail.com (password in 1Password). Work: john@company.com (contact IT department)',
      emailAccountsHelp: 'Your email is the master key to most of your digital life',
      passwordManager: 'Password manager',
      passwordManagerPlaceholder:
        'Which password manager do you use? How can your family access the master vault? e.g., 1Password, master password is in the sealed envelope in the safe',
      passwordManagerHelp:
        "Some people prefer to note where the password is stored rather than writing it directly, but it's your document. Include whatever your family will need.",
      twoFactorAuth: 'Two-factor authentication',
      twoFactorAuthPlaceholder:
        'Which authenticator app do you use? Where are the backup/recovery codes stored? e.g., Google Authenticator on my iPhone. Recovery codes are in 1Password',
      twoFactorAuthHelp: 'Without 2FA access, your family may be locked out of important accounts',
      socialMedia: 'Social media accounts',
      socialMediaPlaceholder:
        'List your social media accounts and what you would like done with them. e.g., Facebook: memorialize. X: delete. LinkedIn: leave active for 6 months then delete',
      socialMediaHelp: 'What would you like done with each account? Delete, memorialize, or archive?',
      domains: 'Domain names & websites',
      domainsPlaceholder:
        'Any domain names you own? Websites you maintain? Where are they registered? e.g., mywebsite.com registered at Namecheap, auto-renews annually',
      cloudStorage: 'Cloud storage',
      cloudStoragePlaceholder:
        "Google Drive, Dropbox, iCloud: what's important in each? e.g., Google Drive has all tax documents in a folder called 'Taxes'. iCloud has family photos",
      digitalPurchases: 'Digital purchases & loyalty programs',
      digitalPurchasesPlaceholder:
        'Kindle library, iTunes purchases, Steam games, airline miles, hotel points, credit card rewards: anything with significant value',
      subscriptions: 'Subscriptions & recurring payments',
      subscriptionsPlaceholder:
        'List active subscriptions that should be cancelled. e.g., Netflix ($15/mo), Spotify ($10/mo), NYT ($4/mo), gym membership at Planet Fitness ($25/mo)',
      subscriptionsHelp: 'These drain the account if nobody knows to cancel them',
      otherDigital: 'Anything else digital',
      otherDigitalPlaceholder:
        'Any other digital accounts, services, or information your family should know about',
      legacyTitle: 'Set up digital legacy contacts now',
      legacyBody:
        'Most major platforms let you designate someone to access or manage your account. These take just a few minutes to configure:',
      legacyItems: [
        {
          label: 'Google',
          body: 'Inactive Account Manager (sends data to your contact after inactivity)',
        },
        {
          label: 'Apple',
          body: 'Legacy Contact (gives access to your Apple ID data)',
        },
        {
          label: 'Facebook',
          body: 'Memorialization Contact (manages your profile)',
        },
        {
          label: 'Instagram',
          body: 'Memorialization request through Facebook settings',
        },
      ],
      legacyFooter:
        'Search "[platform name] legacy contact" or "inactive account" in your account settings to find these options.',
    },
    legal: {
      intro:
        "You don't need to create any legal documents here, just record where they are so your family can find them. If you don't have some of these yet, that's okay. Noting what's missing is just as valuable.",
      groupLabel: 'Legal Documents',
      addLabel: 'Add another document',
      documentType: 'Document type',
      lastUpdated: 'Last updated',
      lastUpdatedPlaceholder: "e.g., March 2024 (or 'Don't have yet')",
      whereIsIt: 'Where is it?',
      notes: 'Notes',
      notesPlaceholder: 'Any additional details about this document...',
      notesHelp:
        'Include where your family can access it: physical location, Google Drive link, Dropbox URL, or who holds a copy.',
      missingTitle: "Don't have a will or other key documents?",
      missingBody:
        "You're not alone. Over half of American adults don't have a will. While Handoff can't create legal documents for you because each state has specific requirements for witnesses, notarization, and more, documenting what you do and don't have is a critical first step.",
      importantDocs: 'The four documents that matter most:',
      will: "Will: who gets what, and who's in charge of making it happen",
      financialPoa: "Financial power of attorney: who manages your money if you can't",
      healthcarePoa: "Healthcare power of attorney: who makes medical decisions for you",
      advanceDirective: 'Advance directive: your wishes for end-of-life care',
      missingFooter:
        'An estate attorney can create all four in a single session. Many offer flat-fee packages. You can also use online services like Trust & Will, FreeWill, or LegalZoom as a starting point.',
      placeholders: {
        Will: 'e.g., Original with attorney Jane Smith. Copy in home safe',
        Trust: 'e.g., With trustee at First National Bank. Copy in filing cabinet',
        poa: 'e.g., Original with attorney. Copy given to designated agent',
        advanceDirective: 'e.g., Copy with doctor, copy in bedside table drawer',
        taxReturns: 'e.g., Filing cabinet in office. Digital copies on Google Drive',
        default: 'e.g., Filing cabinet in office, with attorney John Smith',
      },
      help: {
        Will: "If you don't have a will, note that here. It's one of the most important documents to create.",
        financialPoa: "Authorizes someone to make financial decisions if you're incapacitated.",
        healthcarePoa: "Authorizes someone to make medical decisions if you can't.",
        advanceDirective: 'States your wishes for end-of-life medical care.',
      },
    },
    debts: {
      groupLabel: 'Debts & Obligations',
      addLabel: 'Add another entry',
      direction: 'Direction',
      type: 'Type',
      whoOwesYou: 'Who owes you?',
      lender: 'Lender',
      owedToMePlaceholder: 'e.g., Brother Mike, friend Sarah',
      lenderPlaceholder: 'e.g., Wells Fargo, Sallie Mae',
      approximateBalance: 'Approximate balance',
      approximateBalancePlaceholder: 'e.g., ~$150,000',
      cosigned: 'Co-signed?',
      details: 'Details',
      payoffNotes: 'Payoff notes',
      owedToMeDetailsPlaceholder:
        'Any agreement in writing? When is it due? How should your family handle collecting it?',
      payoffNotesPlaceholder:
        'Is there a payoff clause, life insurance tied to this debt, or anything else your family should know?',
    },
    business: {
      ownsBusiness: 'Do you own a business, freelance, or have partnership interests?',
      businessName: 'Business name',
      businessNamePlaceholder: 'Your business name',
      entityType: 'Entity type',
      entityTypePlaceholder: 'e.g., LLC, S-Corp, sole proprietor',
      keyContacts: 'Key contacts',
      keyContactsPlaceholder:
        'Business partner, accountant, attorney: names and contact info for anyone involved in running the business',
      operatingAgreement: 'Where is the operating agreement?',
      operatingAgreementPlaceholder: "e.g., Attorney's office, Google Drive, filing cabinet",
      bankAccess: 'Business bank account access',
      bankAccessPlaceholder: 'How can your family or business partner access business bank accounts?',
      successionPlan: 'Succession or wind-down plan',
      successionPlanPlaceholder:
        'What should happen to the business? Who takes over? Should it be sold, wound down, or continued?',
      otherNotes: 'Other business notes',
      otherNotesPlaceholder: 'Anything else about your business your family should know',
      noBusiness: 'No worries. You can skip this section entirely or come back if anything changes.',
    },
    dependents: {
      minorChildren: 'Minor children',
      minorChildrenPlaceholder:
        'Names, ages, schools, any custody arrangements. Include anything a caregiver would need to know about their daily routine.',
      minorChildrenHelp: 'If you have minor children, this may be the most important section',
      guardianship: 'Guardianship preferences',
      guardianshipPlaceholder:
        "Who would you want to raise your children if you couldn't? Have you discussed this with them? Is this documented in your will?",
      guardianshipHelp:
        'This is a preference, not a legal designation, but it helps guide your family.',
      elderly: 'Elderly dependents',
      elderlyPlaceholder:
        'Do you care for or financially support any elderly family members? What does their care look like? Who else can step in?',
      pets: 'Pets',
      petsPlaceholder:
        'Names, species, vet info, dietary needs, medications. Who would take care of them? e.g., Golden retriever named Max, Dr. Smith at Riverside Vet, takes daily joint supplement',
      specialNeeds: 'Special needs or ongoing medical care',
      specialNeedsPlaceholder:
        'Any dependents with special needs, ongoing therapies, or medical considerations that a new caregiver would need to understand?',
      otherCare: 'Other care notes',
      otherCarePlaceholder: 'Anything else about the people or animals who depend on you',
    },
    wishes: {
      intro:
        'Take a moment with this section. There are no right or wrong answers, just what matters to you. Many people find this section unexpectedly meaningful.',
      healthcare: 'Healthcare & end-of-life wishes',
      healthcarePlaceholder:
        'DNR preferences, wishes about life support, ventilators, feeding tubes, or medical treatments you want or want to avoid...',
      healthcareHelp:
        'Even if you have an advance directive, writing your wishes here in plain language helps your family understand your intent.',
      funeral: 'Funeral or memorial preferences',
      funeralPlaceholder:
        'Burial or cremation? Any specific wishes for a service? Music, readings, location? Do you want a celebration of life, a traditional service, or something else entirely?',
      organDonation: 'Organ donation',
      organDonationPlaceholder:
        "Are you registered as an organ donor? Any specific wishes about organ or tissue donation? e.g., Yes, registered through the DMV. I'm comfortable with any organ donation.",
      personalMessages: 'Personal messages',
      personalMessagesPlaceholder:
        "Is there anything you want specific people to know? This could be as simple as 'Tell my kids I was proud of them' or as detailed as individual letters. Write whatever feels right.",
      personalMessagesHelp:
        'This is entirely optional, but many people find it the most meaningful part.',
      values: 'Values and what matters most',
      valuesPlaceholder:
        'What do you want your family to remember about what mattered to you? What principles guided your life? This is your chance to say it in your own words.',
      valuesHelp: "Sometimes called an 'ethical will': a statement of values rather than valuables.",
      anythingElse: 'Anything else',
      anythingElsePlaceholder:
        'Charitable giving wishes, specific instructions, or anything else your family should know about your preferences',
    },
    verification: {
      statement:
        'By signing below, I confirm that I created this document voluntarily, that the information is accurate to the best of my knowledge, and that it reflects my current wishes.',
      fullLegalName: 'Full legal name',
      fullLegalNamePlaceholder: 'As it appears on your ID',
      date: 'Date',
      datePlaceholder: "Today's date",
      signature: 'Your signature',
      draw: 'Draw',
      type: 'Type',
      drawHelp: 'Draw your signature using your mouse, trackpad, or finger',
      typePlaceholder: 'Type your full name',
      personalProof: 'Personal proof',
      proofLabel: 'Something only you would know',
      proofPlaceholder: 'A personal detail or memory that only you and your closest family would know...',
      proofHelp: "This isn't a security password. It's a personal detail that proves you wrote this.",
    },
  },
  review: {
    backToInterview: 'Back to interview',
    title: 'Review your Handoff',
    body: "Here's what you've filled in so far. Edit any section before downloading.",
    sectionsHaveInfo: (filled: number, total: number) =>
      `${filled} of ${total} sections have information.`,
    noInfo: 'No information yet',
    fieldsFilled: (filled: number, total: number) => `${filled} of ${total} fields filled`,
    contactsAdded: (count: number) => `${count} contact${count !== 1 ? 's' : ''} added`,
    noContacts: 'No contacts yet',
    accountsAdded: (count: number) => `${count} account${count !== 1 ? 's' : ''} added`,
    noAccounts: 'No accounts yet',
    policiesAdded: (count: number) => `${count} polic${count !== 1 ? 'ies' : 'y'} added`,
    noPolicies: 'No policies yet',
    propertiesAdded: (count: number) => `${count} propert${count !== 1 ? 'ies' : 'y'} added`,
    noProperties: 'No properties yet',
    documentsAdded: (count: number) => `${count} document${count !== 1 ? 's' : ''} added`,
    noDocuments: 'No documents yet',
    debtsAdded: (count: number) => `${count} debt${count !== 1 ? 's' : ''} added`,
    noDebts: 'No debts added',
    signedAndVerified: 'Signed and verified',
    nameNoSignature: 'Name entered, signature missing',
    signatureNoName: 'Signature added, name missing',
    notSigned: 'Not signed yet',
    downloadDocument: 'Download your document',
  },
  export: {
    backToReview: 'Back to review',
    title: 'You just created something invaluable.',
    body:
      'Most people never organize this information. Your family will thank you for taking the time. Download your Handoff document below and store it somewhere safe.',
    emptyTitle: 'No information entered yet',
    emptyBodyPrefix: 'Your document will be mostly empty.',
    emptyLink: 'Go back to the interview',
    emptyBodySuffix: 'to fill in your information first.',
    generating: 'Generating...',
    downloadPdf: 'Download PDF',
    pdfBody: 'Professional format, ready to print or share',
    downloadMarkdown: 'Download Markdown',
    markdownBody: 'Portable, editable, future-proof format',
    legalTitle: 'This is not a legal document.',
    legalBody:
      'Your Handoff document is a practical guide for your family. It organizes what they need to know. To make any of your wishes legally binding, share this document with an estate attorney who can help you create or update a will, power of attorney, and other legal instruments.',
    copyAsText: 'Copy as text',
    footer: 'Generated with Handoff: free, private, yours to keep.',
  },
  guidance: {
    title: 'What to do with your document',
    tellTitle: 'Tell someone it exists',
    tellItems: [
      'The most important step: tell at least one trusted person that this document exists and where to find it',
      "If nobody knows it's there, it can't help your family when they need it",
      'Consider telling your executor, spouse/partner, or closest family member',
    ],
    storeTitle: 'Store it safely',
    storeItems: [
      'Print a copy and keep it in a fireproof safe or filing cabinet',
      'Save a digital copy in cloud storage shared with your intended recipient',
      'Give a copy to your attorney alongside your will',
      'Put a copy on a USB drive in a safe deposit box or give it to a trusted person',
    ],
    shareTitle: 'Share it wisely',
    shareItems: [
      {
        label: 'Immediate share:',
        body: 'Give the document directly to your spouse, partner, or executor now',
      },
      {
        label: 'Sealed envelope:',
        body: 'Print it, seal it with instructions, give to your attorney or place in your safe',
      },
      {
        label: 'The family conversation:',
        body: 'Use this document to start a family discussion about the plan',
      },
    ],
    currentTitle: 'Keep it current',
    currentBody:
      'Revisit and regenerate your document annually or after major life events: marriage, divorce, birth of a child, home purchase, new accounts, job change. Handoff is always here when you need to update it.',
  },
  invite: {
    title: 'Do it together',
    body:
      "Thinking about sharing this with a parent or partner? The easiest way to start that conversation is to do it yourself first, then share. Here's a message you can copy and send:",
    copyTitle: 'Copy invite text',
    footer:
      'The best way to start this conversation is not "you need to do this." It is "I just did this, want to do yours?"',
    text: (origin: string) =>
      `I just used Handoff to organize all my important information for our family: accounts, documents, contacts, everything they would need to know. It took about 30 minutes.\n\nYou should do one too. It is free, nothing gets stored online, and you keep the document yourself.\n\nHere is the link: ${origin}`,
  },
  document: {
    dateLocale: 'en-US',
    title: 'Handoff Document',
    generated: 'Generated',
    important:
      'Important: This is not a legal document. It is a practical guide intended to help your family locate important information and understand your wishes. Consult an attorney for legal estate planning documents.',
    generatedWith: 'Generated with Handoff: free, private, yours to keep.',
    contents: 'CONTENTS',
    coverDocument: 'Document',
    coverFooter: 'Generated with Handoff',
    emergencyTitle: 'In Case of Emergency',
    emergencySubtitle: 'The most important information at a glance',
    whoToCall: 'Who to call first',
    whereWill: 'Where the will is',
    primaryBank: 'Primary bank access',
    familyPassphrase: 'Family passphrase / Personal proof',
    seeFullDocument: 'See the full document for complete details.',
    accessDetails: 'ACCESS DETAILS',
    signature: 'SIGNATURE',
    owedToMe: 'owed to me',
    businessFallback: 'Business',
    labels: {
      fullName: 'Full Name',
      dateOfBirth: 'Date of Birth',
      location: 'Location',
      reason: 'Reason for Creating This',
      intendedFor: 'Intended For',
      personalContext: 'Personal Context',
      role: 'Role',
      relationship: 'Relationship',
      phone: 'Phone',
      email: 'Email',
      notes: 'Notes',
      approximateValue: 'Approximate value',
      namedBeneficiary: 'Named beneficiary',
      howToAccess: 'How to access',
      policyNumberLocation: 'Policy number location',
      policyNumberShort: 'Policy number / location',
      agent: 'Agent',
      agentContact: 'Agent contact',
      throughEmployer: 'Through employer',
      employerContact: 'Employer/HR contact',
      type: 'Type',
      deedTitleLocation: 'Deed/title location',
      deedTitleShort: 'Deed / title location',
      mortgageLien: 'Mortgage / lien',
      deviceAccess: 'Device Access',
      emailAccounts: 'Email Accounts',
      passwordManager: 'Password Manager',
      twoFactorAuth: 'Two-Factor Authentication',
      socialMedia: 'Social Media',
      cloudStorage: 'Cloud Storage',
      subscriptions: 'Subscriptions & Recurring Payments',
      domains: 'Domain Names & Websites',
      digitalPurchases: 'Digital Purchases & Loyalty Programs',
      otherDigital: 'Other Digital',
      document: 'Document',
      lastUpdated: 'Last updated',
      approximateBalance: 'Approximate balance',
      cosigned: 'Co-signed',
      details: 'Details',
      payoffNotes: 'Payoff notes',
      entityType: 'Entity type',
      keyContacts: 'Key Contacts',
      operatingAgreement: 'Operating Agreement Location',
      bankAccess: 'Bank Account Access',
      successionPlan: 'Succession Plan',
      otherBusinessNotes: 'Other Notes',
      minorChildren: 'Minor Children',
      guardianship: 'Guardianship Preferences',
      elderlyDependents: 'Elderly Dependents',
      pets: 'Pets',
      specialNeeds: 'Special Needs',
      otherCareNotes: 'Other Care Notes',
      healthcareWishes: 'Healthcare & End-of-Life Wishes',
      funeralPreferences: 'Funeral or Memorial Preferences',
      organDonation: 'Organ Donation',
      personalMessages: 'Personal Messages',
      valuesStatement: 'Values & What Matters Most',
      otherWishes: 'Other Wishes',
      signedBy: 'Signed by',
      date: 'Date',
      personalProof: 'Personal Proof',
      institution: 'Institution',
      value: 'Value',
      beneficiary: 'Beneficiary',
      carrier: 'Carrier',
      passphrase: 'Passphrase',
    },
    verificationStatement:
      'I confirm that I created this document voluntarily, that the information is accurate to the best of my knowledge, and that it reflects my current wishes.',
    disclaimer:
      'This is not a legal document. It is a practical guide intended to help your family locate important information and understand your wishes. Consult an attorney for legal estate planning.',
  },
}

export type Translation = typeof en

const es: Translation = {
  meta: {
    title: 'Handoff - Todo lo que tu familia necesitaría saber',
    description:
      'Todo lo que tu familia necesitaría saber. Cuentas, documentos y deseos organizados en un solo documento que controlas por completo. 100% privado, sin cuentas y sin servidores.',
  },
  language: {
    label: 'Idioma',
    english: 'Inglés',
    spanish: 'Español',
  },
  common: {
    appName: 'Handoff',
    getStarted: 'Empezar',
    continue: 'Continuar',
    skip: 'Saltar',
    previous: 'Anterior',
    reviewAndFinish: 'Revisar y terminar',
    edit: 'Editar',
    yes: 'Sí',
    no: 'No',
    notSure: 'No sé',
    select: 'Seleccionar...',
    savedAt: (time: string) => `Guardado ${time}`,
    removeConfirm: '¿Eliminar este elemento? Esta acción no se puede deshacer.',
    remove: 'Eliminar',
    addAnother: 'Añadir otro',
    signHere: 'firma aquí',
    clearSignature: 'Borrar firma',
    copiedToClipboard: 'Copiado al portapapeles',
  },
  errorBoundary: {
    title: 'Algo salió mal',
    body:
      'No te preocupes. Tus datos siguen guardados en tu navegador. Intenta actualizar la página.',
    action: 'Actualizar página',
  },
  sections: {
    aboutMe: {
      title: 'Lo básico',
      intro:
        'Empecemos por lo básico: quién eres y por qué estás creando esto. Le da contexto a todo lo que sigue.',
      scenario:
        'Tu familia encuentra una lista de cuentas y contraseñas, pero no hay contexto: ¿quién escribió esto? ¿Cuándo? ¿Estaba actualizado? Una breve introducción marca la diferencia.',
    },
    contacts: {
      title: 'Contactos inmediatos',
      intro:
        'Si te pasa algo, ¿a quién debería llamar primero tu familia? Esta sección asegura que las personas más importantes sean fáciles de contactar.',
      scenario:
        'Tu pareja está abrumada y no recuerda el nombre de tu asesor financiero, tu abogado o incluso a qué amigo llamar para pedir ayuda.',
    },
    financial: {
      title: 'Cuentas financieras',
      intro:
        'Una imagen completa de dónde está tu dinero. Cuentas bancarias, inversiones, jubilación, cripto, efectivo o metales: todo en un solo lugar para que nada se pierda.',
      scenario:
        'Tu familia recibe un estado de cuenta de un 401(k) seis meses después, sin saber cómo acceder ni quién es el beneficiario. O peor: tu billetera cripto no tiene frase de recuperación.',
    },
    insurance: {
      title: 'Seguros',
      intro:
        'Las pólizas de seguro suelen ser el primer salvavidas financiero para tu familia. Saber qué existe y cómo presentar un reclamo importa muchísimo.',
      scenario:
        'Hay una póliza de vida a través de tu empleador, pero tu familia no sabe que existe porque nunca la mencionaste.',
    },
    property: {
      title: 'Propiedades y bienes',
      intro:
        'Bienes raíces, vehículos, objetos valiosos, depósitos: tu familia necesita saber qué tienes y dónde está la documentación.',
      scenario:
        'La escritura de la casa está en una caja de seguridad que tu familia no conocía, y la compañía hipotecaria está enviando avisos de atraso.',
    },
    digital: {
      title: 'Vida digital',
      intro:
        'Esta es la sección que más se olvida y donde más frustración aparece. Correos, contraseñas, suscripciones, redes sociales: tu huella digital es enorme.',
      scenario:
        'Tu familia no puede acceder a tu correo para restablecer contraseñas, cancelar suscripciones que siguen cobrando o encontrar credenciales de servicios importantes.',
    },
    legal: {
      title: 'Documentos legales',
      intro:
        'No necesitas crear documentos legales aquí, solo registrar dónde están. Tu familia necesitará encontrar tu testamento, poderes notariales y otros papeles importantes.',
      scenario:
        'El abogado tiene el testamento, pero nadie sabe qué abogado. La directiva anticipada está en algún cajón, pero ¿en cuál?',
    },
    debts: {
      title: 'Deudas y obligaciones',
      intro:
        'Las deudas no desaparecen. Tu familia necesita saber qué se debe, a quién, y si hay cofirmantes o condiciones de pago.',
      scenario:
        'Un préstamo estudiantil cofirmado entra en mora porque nadie sabía que existía, dañando el crédito de tu hijo.',
    },
    business: {
      title: 'Intereses comerciales',
      intro:
        'Si tienes un negocio, trabajas por tu cuenta o tienes participaciones, esta sección evita que tu vida profesional se vuelva un misterio.',
      scenario:
        'Tu socio no tiene acceso a la cuenta bancaria del negocio, y el acuerdo operativo está en tu laptop sin contraseña.',
    },
    dependents: {
      title: 'Dependientes y cuidados',
      intro:
        'Las personas y mascotas que dependen de ti necesitan un plan. Preferencias de tutela, instrucciones de cuidado y necesidades continuas deben quedar documentadas.',
      scenario:
        'Tu padre mayor depende de ti para organizar medicamentos cada semana, y nadie más conoce la rutina ni los datos de la farmacia.',
    },
    wishes: {
      title: 'Deseos y mensajes',
      intro:
        'Esta es la sección más personal. Tus preferencias, tus valores y cualquier cosa que quieras que tu familia sepa. Tómate tu tiempo.',
      scenario:
        'Tu familia discute sobre los arreglos funerarios porque nadie sabe qué habrías querido.',
    },
    verification: {
      title: 'Firmar y terminar',
      intro:
        'El paso final. Tu firma y un detalle personal confirman que este documento fue creado por ti, con intención y cuidado.',
      scenario:
        'Tu familia encuentra un documento, pero no sabe cuándo fue escrito, si está actualizado o si alguien más lo llenó.',
    },
  },
  landing: {
    navCta: 'Empezar',
    heroTitle: 'Un documento para que tu familia no tenga que adivinar.',
    heroBody:
      'Handoff te guía por todo lo que tu familia necesitaría saber: cuentas, documentos, deseos y más. Luego crea un solo documento que controlas por completo.',
    heroNote: 'Gratis para siempre. Sin cuenta. Nada se guarda en línea.',
    whyEyebrow: 'Por qué Handoff',
    whyTitle: 'Todo lo que tu familia necesitaría, en un solo lugar.',
    whyBody:
      'La mayoría de las personas nunca organiza esta información. Cuando pasa algo, las familias quedan buscando en cajones, adivinando contraseñas y llamando bancos. Handoff resuelve eso.',
    featureVisual: {
      documentTitle: 'Tu documento Handoff',
      sectionsCount: '12 secciones',
      dataFlowTitle: 'Cómo fluyen tus datos',
      typeAnswersTitle: 'Escribes tus respuestas',
      typeAnswersBody: 'Los datos se quedan en la pestaña del navegador',
      noNetworkTitle: 'Sin solicitudes de red',
      noNetworkBody: 'Cero datos enviados a un servidor',
      noTrackingTitle: 'Sin rastreo ni analíticas',
      noTrackingBody: 'No sabemos que existes',
      downloadGoneTitle: 'Descargas y desaparece',
      downloadGoneBody: 'Puedes borrar los datos del navegador cuando quieras',
      withoutTitle: 'Sin un documento Handoff',
      withTitle: 'Con un documento Handoff',
      withBody: 'Todo respondido, organizado y en un solo lugar.',
      builtTitle: 'Hecho para la vida real',
      minutesTitle: 'Minutos para completarlo',
      minutesBody: 'La mayoría termina en una sola sesión',
      skipTitle: 'Salta lo que no aplique',
      skipBody: 'Ninguna sección es obligatoria',
      saveTitle: 'Guarda el borrador y vuelve después',
      saveBody: 'Tu progreso se guarda localmente',
      familyQuestions: [
        '¿Dónde están las pólizas de seguro?',
        '¿Qué cuentas bancarias tenía?',
        '¿Quién es el abogado patrimonial?',
        '¿Cuáles son las credenciales de acceso?',
        '¿Tenía una unidad de almacenamiento?',
      ],
    },
    features: [
      {
        key: 'completeness',
        title: 'Cobertura estructurada',
        description:
          'Doce secciones basadas en lo que los abogados patrimoniales suelen revisar con sus clientes. Saca a la luz lo que más se olvida.',
      },
      {
        key: 'privacy',
        title: 'Privacidad de confianza cero',
        description:
          'Nada sale de tu navegador. Sin cuentas, sin servidores, sin recolección de datos. Tu información se queda en tu dispositivo.',
      },
      {
        key: 'gift',
        title: 'Un regalo para tu familia',
        description:
          'Treinta minutos ahora pueden ahorrarle a tu familia semanas de confusión y estrés cuando más importa.',
      },
      {
        key: 'quick',
        title: 'Completa en una sesión',
        description:
          'Salta lo que no aplique y llena lo que sí. Guarda tu borrador y vuelve cuando quieras.',
      },
    ],
    sectionsPreview: [
      'Lo básico',
      'Contactos clave',
      'Cuentas financieras',
      'Pólizas de seguro',
      'Propiedades y bienes',
      'Vida digital',
      'Documentos legales',
      'Deudas y obligaciones',
      'Intereses comerciales',
      'Dependientes y mascotas',
      'Deseos personales',
      'Firmar y terminar',
    ],
    howEyebrow: 'Cómo funciona',
    howTitle: 'Tres pasos. Treinta minutos. Listo.',
    howSteps: [
      {
        title: 'Responde preguntas guiadas',
        body:
          'Recorre doce secciones sobre contactos, cuentas, seguros, vida digital, documentos legales, deudas, dependientes y deseos personales. Salta lo que no aplique.',
      },
      {
        title: 'Descarga tu documento',
        body:
          'Obtén un PDF con formato profesional o un archivo Markdown: tu documento Handoff. Todo lo que tu familia necesita, organizado y claro.',
      },
      {
        title: 'Guárdalo, compártelo y listo',
        body:
          'Pon una copia en tu caja fuerte, compártela con tu pareja o entrégala a tu abogado. Tú controlas dónde vive y quién lo ve.',
      },
    ],
    privacyEyebrow: 'Privacidad',
    privacyTitle: 'Tus datos nunca salen de tu dispositivo.',
    privacyBody:
      'Handoff funciona completamente en tu navegador. No tenemos servidores, cuentas ni analíticas. No hay base de datos que hackear porque no hay base de datos.',
    privacyBullets: [
      'No requiere crear cuenta',
      'No se transmite ningún dato a servidores',
      'Todo se guarda localmente en tu navegador',
      'Exporta tu documento y borra tus datos cuando quieras',
    ],
    privacyCardTitle:
      'La herramienta más segura para un documento personal es la que nunca ve tus datos.',
    privacyCardBody:
      'A diferencia de servicios en la nube, Handoff no tiene un servidor que puedan vulnerar. Tu información sensible: cuentas bancarias, pólizas, contraseñas, se queda en tu navegador y en el documento que descargas.',
    togetherTitle: 'Háganlo juntos',
    togetherBody:
      '¿Quieres sugerírselo a un padre o pareja? La forma más fácil de iniciar la conversación es hacerlo tú primero y luego compartir el tuyo.',
    artCredit:
      'Auguste Allonge, Autumn Landscape in the Forest of Fontainebleau, c. 1860.',
    artSource: 'National Gallery of Art',
    footerTagline: 'Gratis, open-source y tuyo para conservar.',
    madeBy: 'Hecho por',
  },
  options: {
    documentReasons: {
      'Just being proactive — everyone should do this': 'Solo estoy siendo previsor; todos deberían hacer esto',
      'Recent health diagnosis': 'Diagnóstico de salud reciente',
      'Getting older, want to be prepared': 'Estoy envejeciendo y quiero estar preparado',
      'Major life change (marriage, baby, divorce)': 'Cambio importante de vida (matrimonio, bebé, divorcio)',
      'Traveling or doing something risky': 'Voy a viajar o hacer algo riesgoso',
      'Someone asked me to': 'Alguien me lo pidió',
      Other: 'Otro',
    },
    contactRoles: {
      'Executor / Decision-maker': 'Albacea / persona que toma decisiones',
      'Spouse / Partner': 'Cónyuge / pareja',
      'Family member': 'Familiar',
      Attorney: 'Abogado',
      'Financial advisor': 'Asesor financiero',
      'Accountant / CPA': 'Contador / CPA',
      'Insurance agent': 'Agente de seguros',
      'Doctor / Primary care': 'Médico / atención primaria',
      'Clergy / Spiritual advisor': 'Clero / asesor espiritual',
      'Close friend': 'Amigo cercano',
      Other: 'Otro',
    },
    accountTypes: {
      Checking: 'Cuenta corriente',
      Savings: 'Cuenta de ahorros',
      Brokerage: 'Corretaje / inversiones',
      '401(k)': '401(k)',
      'IRA / Roth IRA': 'IRA / Roth IRA',
      Pension: 'Pensión',
      HSA: 'HSA',
      '529 Plan': 'Plan 529',
      Annuity: 'Anualidad',
      CD: 'Certificado de depósito',
      Cryptocurrency: 'Criptomoneda',
      'Physical (cash, gold, etc.)': 'Físico (efectivo, oro, etc.)',
      'Trust fund': 'Fideicomiso',
      Other: 'Otro',
    },
    insuranceTypes: {
      'Life insurance': 'Seguro de vida',
      'Health insurance': 'Seguro médico',
      'Homeowners / Renters': 'Propietario / inquilino',
      Auto: 'Auto',
      Umbrella: 'Responsabilidad adicional',
      Disability: 'Discapacidad',
      'Long-term care': 'Cuidado a largo plazo',
      Other: 'Otro',
    },
    propertyTypes: {
      'Primary residence': 'Residencia principal',
      'Rental property': 'Propiedad de alquiler',
      'Vacation home': 'Casa de vacaciones',
      Vehicle: 'Vehículo',
      'Jewelry / Valuables': 'Joyas / objetos valiosos',
      'Art / Collectibles': 'Arte / coleccionables',
      'Safe deposit box': 'Caja de seguridad',
      'Storage unit': 'Unidad de almacenamiento',
      Other: 'Otro',
    },
    legalDocTypes: {
      Will: 'Testamento',
      Trust: 'Fideicomiso',
      'Power of Attorney (Financial)': 'Poder notarial (financiero)',
      'Power of Attorney (Healthcare)': 'Poder notarial (salud)',
      'Advance directive / Living will': 'Directiva anticipada / testamento vital',
      'Marriage certificate': 'Certificado de matrimonio',
      'Divorce decree': 'Sentencia de divorcio',
      'Birth certificate': 'Certificado de nacimiento',
      Passport: 'Pasaporte',
      'Social Security card': 'Tarjeta del Seguro Social',
      'Tax returns (recent)': 'Declaraciones de impuestos (recientes)',
      Other: 'Otro',
    },
    debtTypes: {
      Mortgage: 'Hipoteca',
      'Car loan': 'Préstamo de auto',
      'Student loan': 'Préstamo estudiantil',
      'Personal loan': 'Préstamo personal',
      'Credit card': 'Tarjeta de crédito',
      'Business loan': 'Préstamo comercial',
      'Co-signed obligation': 'Obligación cofirmada',
      Other: 'Otro',
    },
    debtDirections: {
      'I owe': 'Yo debo',
      'Owed to me': 'Me deben a mí',
    },
  },
  interview: {
    whyThisMatters: 'Por qué importa:',
    sidebarSubtitle: 'Tu documento Handoff',
    reviewAndFinish: 'Guardar Cambios',
    saveDraft: 'Guardar',
    loadDraft: 'Cargar',
    prefilledDemo: 'Demo con datos',
    emptyState: 'Estado vacío',
    demo: 'Demo',
    empty: 'Vacío',
    switchToEmpty: 'Cambiar a estado vacío',
    switchToDemo: 'Cambiar a datos demo',
    privacyNote:
      'Tus datos nunca salen de tu dispositivo. Todo se guarda localmente en tu navegador. Nada se envía a ningún servidor.',
    resume: {
      title: 'Bienvenido de vuelta',
      body: (date: string | null) =>
        `Tienes una sesión guardada${date ? ` del ${date}` : ''}. ¿Quieres continuar donde la dejaste?`,
      continue: 'Continuar',
      startFresh: 'Empezar de cero',
      confirmFresh: '¿Eliminar y empezar de cero?',
    },
    security: {
      title: 'Una nota sobre privacidad',
      body:
        'Tus respuestas se guardan solo de forma local en este navegador. No están cifradas y podrían ser leídas por cualquier persona con acceso a este dispositivo.',
      followup:
        'Cuando termines, puedes borrar tus datos desde la barra lateral. Nada se envía nunca a ningún servidor.',
      action: 'Entendido',
    },
  },
  forms: {
    aboutMe: {
      fullName: 'Tu nombre completo',
      fullNamePlaceholder: 'Como quieres que aparezca en el documento',
      dateOfBirth: 'Fecha de nacimiento',
      dateOfBirthPlaceholder: 'p. ej., 15 de marzo de 1982',
      location: '¿Dónde vives?',
      locationPlaceholder: 'Ciudad, región, p. ej., San Francisco, CA o Madrid, España',
      locationHelp:
        'Opcional. Ayuda con consideraciones legales según la región. Déjalo en blanco si prefieres no decirlo.',
      reason: '¿Por qué estás creando esto?',
      reasonPlaceholder: 'Selecciona una razón...',
      intendedFor: '¿Para quién es este documento?',
      intendedForPlaceholder: 'p. ej., Mi esposo David, mis hijos Emma y Jack, mi hermana Lisa',
      intendedForHelp: 'Las personas que necesitarán esta información',
      personalContext: '¿Algo más que quieras decir al principio?',
      personalContextPlaceholder:
        'Comparte por qué ahora, qué motivó esto o unas palabras sobre ti...',
      personalContextHelp:
        'Opcional. Esto le da contexto a tu familia sobre quién eres y por qué creaste esto.',
      crisis:
        'Si tú o alguien que conoces está en crisis, llama o envía un mensaje al 988 (Suicide & Crisis Lifeline) o envía HOME al 741741 (Crisis Text Line). No estás solo.',
    },
    contacts: {
      groupLabel: 'Contactos clave',
      addLabel: 'Añadir otro contacto',
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Jane Doe',
      role: 'Rol',
      rolePlaceholder: 'Selecciona un rol...',
      phone: 'Teléfono',
      phonePlaceholder: '(555) 123-4567',
      email: 'Email',
      emailPlaceholder: 'jane@example.com',
      relationship: 'Relación',
      relationshipPlaceholder: 'Cónyuge, hermano, amigo...',
      notes: 'Notas',
      notesPlaceholder: 'Cualquier contexto adicional sobre el rol de esta persona...',
    },
    financial: {
      groupLabel: 'Cuentas financieras y bienes',
      addLabel: 'Añadir otra cuenta o bien',
      accountType: 'Tipo de cuenta',
      institution: 'Institución o plataforma',
      physicalLocation: '¿Dónde está guardado?',
      approximateValue: 'Valor aproximado',
      approximateValueHelp: 'Un rango aproximado está bien',
      namedBeneficiary: '¿Beneficiario nombrado?',
      access: 'Cómo acceder',
      placeholders: {
        cryptoInstitution: 'Coinbase, billetera Ledger, MetaMask...',
        cryptoAccess:
          '¿Dónde está guardada la frase semilla / frase de recuperación? ¿Qué exchanges tienen fondos? ¿Qué billeteras se usan? p. ej., La frase semilla está en una placa metálica en la caja fuerte',
        cryptoValue: 'p. ej., ~2 BTC + varias altcoins',
        physicalInstitution: 'Caja fuerte en casa, caja de seguridad, enterrado...',
        physicalAccess:
          '¿Dónde está guardado físicamente? ¿Quién más lo sabe? ¿Cómo se accede? p. ej., $5,000 en efectivo en la caja fuerte detrás del cuadro de la oficina. La combinación es...',
        physicalValue: 'p. ej., $5,000 en efectivo + monedas de oro',
        defaultInstitution: 'Chase, Fidelity, Vanguard, Coinbase...',
        defaultAccess:
          'p. ej., El acceso está en 1Password, o los estados de cuenta están en el archivador de la oficina',
        defaultValue: 'p. ej., $10,000 - $50,000',
      },
    },
    insurance: {
      groupLabel: 'Pólizas de seguro',
      addLabel: 'Añadir otra póliza',
      carrier: 'Aseguradora',
      carrierPlaceholder: 'State Farm, Blue Cross, MetLife...',
      type: 'Tipo',
      policyNumberLocation: 'Dónde encontrar el número de póliza',
      policyNumberPlaceholder: 'p. ej., Archivador, email del agente',
      agentContact: 'Contacto del agente',
      agentPlaceholder: 'Nombre o teléfono del agente',
      throughEmployer: '¿A través del empleador?',
      employerContact: 'Empleador y contacto de RR. HH./beneficios',
      employerPlaceholder: 'p. ej., Acme Corp, línea de beneficios de RR. HH.: (555) 123-4567',
      employerHelp: 'Tu familia necesitará esto para presentar un reclamo a través de tu empleador',
      notes: 'Notas',
      notesPlaceholder: 'Detalles adicionales sobre esta póliza...',
    },
    property: {
      groupLabel: 'Propiedades y bienes',
      addLabel: 'Añadir otra propiedad o bien',
      type: 'Tipo',
      description: 'Descripción',
      descriptionPlaceholder: 'p. ej., Casa de 3 habitaciones en Main St',
      location: 'Ubicación / dirección',
      locationPlaceholder: 'Dirección o descripción de ubicación',
      deedTitle: '¿Dónde está la escritura/título?',
      deedTitlePlaceholder: 'p. ej., Caja fuerte, oficina del abogado',
      mortgage: '¿Tiene hipoteca o gravamen?',
      notes: 'Notas',
      notesPlaceholder:
        'Cualquier otro detalle: información del prestamista, ubicación de llaves, combinación de caja fuerte...',
    },
    digital: {
      coreAccess: 'Acceso principal',
      onlinePresence: 'Presencia en línea',
      digitalAssets: 'Activos digitales',
      services: 'Servicios y suscripciones',
      deviceAccess: 'Acceso a dispositivos',
      deviceAccessPlaceholder:
        'PIN del teléfono, contraseña de laptop, código de tablet: cómo desbloquear los dispositivos que usas a diario',
      deviceAccessHelp: 'Tu teléfono o laptop suele ser lo primero que tu familia necesita acceder',
      emailAccounts: 'Cuentas de email',
      emailAccountsPlaceholder:
        'Lista tus cuentas de email y cómo acceder. p. ej., Personal: john@gmail.com (contraseña en 1Password). Trabajo: john@company.com (contactar a IT)',
      emailAccountsHelp: 'Tu email es la llave maestra de gran parte de tu vida digital',
      passwordManager: 'Gestor de contraseñas',
      passwordManagerPlaceholder:
        '¿Qué gestor usas? ¿Cómo puede tu familia acceder a la bóveda principal? p. ej., 1Password, la contraseña maestra está en el sobre sellado en la caja fuerte',
      passwordManagerHelp:
        'Algunas personas prefieren anotar dónde está guardada la contraseña en vez de escribirla directamente, pero es tu documento. Incluye lo que tu familia necesite.',
      twoFactorAuth: 'Autenticación de dos factores',
      twoFactorAuthPlaceholder:
        '¿Qué app de autenticación usas? ¿Dónde están los códigos de respaldo/recuperación? p. ej., Google Authenticator en mi iPhone. Códigos de recuperación en 1Password',
      twoFactorAuthHelp: 'Sin acceso 2FA, tu familia puede quedar bloqueada de cuentas importantes',
      socialMedia: 'Cuentas de redes sociales',
      socialMediaPlaceholder:
        'Lista tus redes sociales y qué quieres que hagan con ellas. p. ej., Facebook: memorializar. X: eliminar. LinkedIn: dejar activo 6 meses y luego eliminar',
      socialMediaHelp: '¿Qué quieres que se haga con cada cuenta? ¿Eliminar, memorializar o archivar?',
      domains: 'Dominios y sitios web',
      domainsPlaceholder:
        '¿Tienes dominios? ¿Sitios que mantienes? ¿Dónde están registrados? p. ej., mywebsite.com registrado en Namecheap, renovación automática anual',
      cloudStorage: 'Almacenamiento en la nube',
      cloudStoragePlaceholder:
        "Google Drive, Dropbox, iCloud: ¿qué es importante en cada uno? p. ej., Google Drive tiene todos los impuestos en una carpeta llamada 'Taxes'. iCloud tiene fotos familiares",
      digitalPurchases: 'Compras digitales y programas de puntos',
      digitalPurchasesPlaceholder:
        'Biblioteca Kindle, compras de iTunes, juegos de Steam, millas, puntos de hotel, recompensas de tarjetas: cualquier cosa con valor significativo',
      subscriptions: 'Suscripciones y pagos recurrentes',
      subscriptionsPlaceholder:
        'Lista suscripciones activas que deben cancelarse. p. ej., Netflix ($15/mes), Spotify ($10/mes), NYT ($4/mes), gimnasio Planet Fitness ($25/mes)',
      subscriptionsHelp: 'Estos pagos siguen drenando la cuenta si nadie sabe cancelarlos',
      otherDigital: 'Algo más digital',
      otherDigitalPlaceholder:
        'Cualquier otra cuenta, servicio o información digital que tu familia deba conocer',
      legacyTitle: 'Configura contactos de legado digital ahora',
      legacyBody:
        'La mayoría de las plataformas principales te permiten designar a alguien para acceder o administrar tu cuenta. Configurarlo toma solo unos minutos:',
      legacyItems: [
        {
          label: 'Google',
          body: 'Administrador de Cuenta Inactiva (envía datos a tu contacto después de inactividad)',
        },
        {
          label: 'Apple',
          body: 'Contacto de legado (da acceso a los datos de tu Apple ID)',
        },
        {
          label: 'Facebook',
          body: 'Contacto de conmemoración (administra tu perfil)',
        },
        {
          label: 'Instagram',
          body: 'Solicitud de conmemoración a través de configuración de Facebook',
        },
      ],
      legacyFooter:
        'Busca "[nombre de plataforma] contacto de legado" o "cuenta inactiva" en la configuración de tu cuenta para encontrar estas opciones.',
    },
    legal: {
      intro:
        'No necesitas crear documentos legales aquí, solo registrar dónde están para que tu familia pueda encontrarlos. Si aún no tienes algunos, está bien. Anotar lo que falta también es valioso.',
      groupLabel: 'Documentos legales',
      addLabel: 'Añadir otro documento',
      documentType: 'Tipo de documento',
      lastUpdated: 'Última actualización',
      lastUpdatedPlaceholder: "p. ej., marzo de 2024 (o 'Aún no lo tengo')",
      whereIsIt: '¿Dónde está?',
      notes: 'Notas',
      notesPlaceholder: 'Detalles adicionales sobre este documento...',
      notesHelp:
        'Incluye dónde puede acceder tu familia: ubicación física, enlace de Google Drive, URL de Dropbox o quién tiene una copia.',
      missingTitle: '¿No tienes testamento u otros documentos clave?',
      missingBody:
        'No eres el único. Más de la mitad de los adultos en EE. UU. no tiene testamento. Aunque Handoff no puede crear documentos legales por ti porque cada estado tiene requisitos específicos de testigos, notarización y más, documentar lo que tienes y no tienes es un primer paso crucial.',
      importantDocs: 'Los cuatro documentos más importantes:',
      will: 'Testamento: quién recibe qué y quién se encarga de hacerlo cumplir',
      financialPoa: 'Poder financiero: quién administra tu dinero si tú no puedes',
      healthcarePoa: 'Poder médico: quién toma decisiones médicas por ti',
      advanceDirective: 'Directiva anticipada: tus deseos para cuidados al final de la vida',
      missingFooter:
        'Un abogado patrimonial puede crear los cuatro en una sola sesión. Muchos ofrecen paquetes de precio fijo. También puedes usar servicios en línea como Trust & Will, FreeWill o LegalZoom como punto de partida.',
      placeholders: {
        Will: 'p. ej., Original con la abogada Jane Smith. Copia en la caja fuerte de casa',
        Trust: 'p. ej., Con el fiduciario en First National Bank. Copia en el archivador',
        poa: 'p. ej., Original con el abogado. Copia entregada al agente designado',
        advanceDirective: 'p. ej., Copia con el médico, copia en el cajón de la mesa de noche',
        taxReturns: 'p. ej., Archivador en la oficina. Copias digitales en Google Drive',
        default: 'p. ej., Archivador en la oficina, con el abogado John Smith',
      },
      help: {
        Will: 'Si no tienes testamento, anótalo aquí. Es uno de los documentos más importantes para crear.',
        financialPoa: 'Autoriza a alguien a tomar decisiones financieras si quedas incapacitado.',
        healthcarePoa: 'Autoriza a alguien a tomar decisiones médicas si tú no puedes.',
        advanceDirective: 'Expresa tus deseos para atención médica al final de la vida.',
      },
    },
    debts: {
      groupLabel: 'Deudas y obligaciones',
      addLabel: 'Añadir otra entrada',
      direction: 'Dirección',
      type: 'Tipo',
      whoOwesYou: '¿Quién te debe?',
      lender: 'Prestamista',
      owedToMePlaceholder: 'p. ej., Mi hermano Mike, mi amiga Sarah',
      lenderPlaceholder: 'p. ej., Wells Fargo, Sallie Mae',
      approximateBalance: 'Saldo aproximado',
      approximateBalancePlaceholder: 'p. ej., ~$150,000',
      cosigned: '¿Cofirmado?',
      details: 'Detalles',
      payoffNotes: 'Notas de pago',
      owedToMeDetailsPlaceholder:
        '¿Hay un acuerdo por escrito? ¿Cuándo vence? ¿Cómo debería tu familia manejar el cobro?',
      payoffNotesPlaceholder:
        '¿Hay una cláusula de liquidación, seguro de vida ligado a esta deuda o algo más que tu familia deba saber?',
    },
    business: {
      ownsBusiness: '¿Tienes un negocio, trabajas freelance o tienes participaciones?',
      businessName: 'Nombre del negocio',
      businessNamePlaceholder: 'Nombre de tu negocio',
      entityType: 'Tipo de entidad',
      entityTypePlaceholder: 'p. ej., LLC, S-Corp, propietario único',
      keyContacts: 'Contactos clave',
      keyContactsPlaceholder:
        'Socio, contador, abogado: nombres y datos de contacto de cualquiera involucrado en operar el negocio',
      operatingAgreement: '¿Dónde está el acuerdo operativo?',
      operatingAgreementPlaceholder: 'p. ej., Oficina del abogado, Google Drive, archivador',
      bankAccess: 'Acceso a cuentas bancarias del negocio',
      bankAccessPlaceholder:
        '¿Cómo puede tu familia o socio acceder a las cuentas bancarias del negocio?',
      successionPlan: 'Plan de sucesión o cierre',
      successionPlanPlaceholder:
        '¿Qué debería pasar con el negocio? ¿Quién lo toma? ¿Debe venderse, cerrarse o continuar?',
      otherNotes: 'Otras notas del negocio',
      otherNotesPlaceholder: 'Cualquier otra cosa sobre tu negocio que tu familia deba saber',
      noBusiness: 'Sin problema. Puedes saltar esta sección por completo o volver si algo cambia.',
    },
    dependents: {
      minorChildren: 'Hijos menores',
      minorChildrenPlaceholder:
        'Nombres, edades, escuelas, acuerdos de custodia. Incluye cualquier cosa que un cuidador necesitaría saber sobre su rutina diaria.',
      minorChildrenHelp: 'Si tienes hijos menores, esta puede ser la sección más importante',
      guardianship: 'Preferencias de tutela',
      guardianshipPlaceholder:
        '¿Quién querrías que criara a tus hijos si tú no pudieras? ¿Lo hablaste con esa persona? ¿Está documentado en tu testamento?',
      guardianshipHelp:
        'Esto es una preferencia, no una designación legal, pero ayuda a orientar a tu familia.',
      elderly: 'Dependientes mayores',
      elderlyPlaceholder:
        '¿Cuidas o apoyas económicamente a familiares mayores? ¿Cómo es su cuidado? ¿Quién más puede ayudar?',
      pets: 'Mascotas',
      petsPlaceholder:
        'Nombres, especie, veterinario, dieta, medicamentos. ¿Quién los cuidaría? p. ej., Golden retriever llamado Max, Dra. Smith en Riverside Vet, toma suplemento diario para articulaciones',
      specialNeeds: 'Necesidades especiales o cuidado médico continuo',
      specialNeedsPlaceholder:
        '¿Hay dependientes con necesidades especiales, terapias continuas o consideraciones médicas que un nuevo cuidador deba entender?',
      otherCare: 'Otras notas de cuidado',
      otherCarePlaceholder: 'Cualquier otra cosa sobre las personas o animales que dependen de ti',
    },
    wishes: {
      intro:
        'Tómate un momento con esta sección. No hay respuestas correctas o incorrectas, solo lo que importa para ti. Muchas personas encuentran esta sección inesperadamente significativa.',
      healthcare: 'Deseos médicos y de final de vida',
      healthcarePlaceholder:
        'Preferencias sobre DNR, soporte vital, ventiladores, sondas de alimentación o tratamientos médicos que quieres o quieres evitar...',
      healthcareHelp:
        'Aunque tengas una directiva anticipada, escribir tus deseos aquí en lenguaje claro ayuda a tu familia a entender tu intención.',
      funeral: 'Preferencias funerarias o conmemorativas',
      funeralPlaceholder:
        '¿Entierro o cremación? ¿Deseos específicos para un servicio? Música, lecturas, ubicación. ¿Quieres una celebración de vida, un servicio tradicional u otra cosa?',
      organDonation: 'Donación de órganos',
      organDonationPlaceholder:
        '¿Estás registrado como donante? ¿Algún deseo específico sobre donación de órganos o tejidos? p. ej., Sí, registrado a través del DMV. Estoy cómodo con cualquier donación.',
      personalMessages: 'Mensajes personales',
      personalMessagesPlaceholder:
        "¿Hay algo que quieras que ciertas personas sepan? Puede ser tan simple como 'Dile a mis hijos que estaba orgulloso de ellos' o cartas individuales detalladas. Escribe lo que sientas correcto.",
      personalMessagesHelp:
        'Esto es totalmente opcional, pero muchas personas lo encuentran la parte más significativa.',
      values: 'Valores y lo que más importa',
      valuesPlaceholder:
        '¿Qué quieres que tu familia recuerde sobre lo que te importaba? ¿Qué principios guiaron tu vida? Esta es tu oportunidad de decirlo con tus propias palabras.',
      valuesHelp: "A veces se llama 'testamento ético': una declaración de valores, no de objetos.",
      anythingElse: 'Algo más',
      anythingElsePlaceholder:
        'Deseos sobre donaciones, instrucciones específicas o cualquier otra cosa que tu familia deba saber sobre tus preferencias',
    },
    verification: {
      statement:
        'Al firmar abajo, confirmo que creé este documento voluntariamente, que la información es precisa según mi leal saber y entender, y que refleja mis deseos actuales.',
      fullLegalName: 'Nombre legal completo',
      fullLegalNamePlaceholder: 'Como aparece en tu identificación',
      date: 'Fecha',
      datePlaceholder: 'Fecha de hoy',
      signature: 'Tu firma',
      draw: 'Dibujar',
      type: 'Escribir',
      drawHelp: 'Dibuja tu firma con mouse, trackpad o dedo',
      typePlaceholder: 'Escribe tu nombre completo',
      personalProof: 'Prueba personal',
      proofLabel: 'Algo que solo tú sabrías',
      proofPlaceholder: 'Un detalle o recuerdo personal que solo tú y tu familia más cercana conocerían...',
      proofHelp:
        'Esto no es una contraseña de seguridad. Es un detalle personal que prueba que tú escribiste esto.',
    },
  },
  review: {
    backToInterview: 'Volver a la entrevista',
    title: 'Revisa tu Handoff',
    body: 'Esto es lo que has completado hasta ahora. Edita cualquier sección antes de descargar.',
    sectionsHaveInfo: (filled: number, total: number) =>
      `${filled} de ${total} secciones tienen información.`,
    noInfo: 'Aún no hay información',
    fieldsFilled: (filled: number, total: number) => `${filled} de ${total} campos completados`,
    contactsAdded: (count: number) => `${count} contacto${count !== 1 ? 's' : ''} añadido${count !== 1 ? 's' : ''}`,
    noContacts: 'Aún no hay contactos',
    accountsAdded: (count: number) => `${count} cuenta${count !== 1 ? 's' : ''} añadida${count !== 1 ? 's' : ''}`,
    noAccounts: 'Aún no hay cuentas',
    policiesAdded: (count: number) => `${count} póliza${count !== 1 ? 's' : ''} añadida${count !== 1 ? 's' : ''}`,
    noPolicies: 'Aún no hay pólizas',
    propertiesAdded: (count: number) => `${count} propiedad${count !== 1 ? 'es' : ''} añadida${count !== 1 ? 's' : ''}`,
    noProperties: 'Aún no hay propiedades',
    documentsAdded: (count: number) => `${count} documento${count !== 1 ? 's' : ''} añadido${count !== 1 ? 's' : ''}`,
    noDocuments: 'Aún no hay documentos',
    debtsAdded: (count: number) => `${count} deuda${count !== 1 ? 's' : ''} añadida${count !== 1 ? 's' : ''}`,
    noDebts: 'No hay deudas añadidas',
    signedAndVerified: 'Firmado y verificado',
    nameNoSignature: 'Nombre ingresado, falta la firma',
    signatureNoName: 'Firma añadida, falta el nombre',
    notSigned: 'Aún no firmado',
    downloadDocument: 'Descargar tu documento',
  },
  export: {
    backToReview: 'Volver a revisión',
    title: 'Acabas de crear algo invaluable.',
    body:
      'La mayoría de las personas nunca organiza esta información. Tu familia agradecerá que te hayas tomado el tiempo. Descarga tu documento Handoff y guárdalo en un lugar seguro.',
    emptyTitle: 'Aún no ingresaste información',
    emptyBodyPrefix: 'Tu documento estará casi vacío.',
    emptyLink: 'Vuelve a la entrevista',
    emptyBodySuffix: 'para completar tu información primero.',
    generating: 'Generando...',
    downloadPdf: 'Descargar PDF',
    pdfBody: 'Formato profesional, listo para imprimir o compartir',
    downloadMarkdown: 'Descargar Markdown',
    markdownBody: 'Formato portable, editable y duradero',
    legalTitle: 'Esto no es un documento legal.',
    legalBody:
      'Tu documento Handoff es una guía práctica para tu familia. Organiza lo que necesitan saber. Para que cualquiera de tus deseos sea legalmente vinculante, comparte este documento con un abogado patrimonial que pueda ayudarte a crear o actualizar un testamento, poder notarial y otros instrumentos legales.',
    copyAsText: 'Copiar como texto',
    footer: 'Generado con Handoff: gratis, privado y tuyo para conservar.',
  },
  guidance: {
    title: 'Qué hacer con tu documento',
    tellTitle: 'Dile a alguien que existe',
    tellItems: [
      'El paso más importante: dile a al menos una persona de confianza que este documento existe y dónde encontrarlo',
      'Si nadie sabe que está ahí, no podrá ayudar a tu familia cuando lo necesite',
      'Considera decírselo a tu albacea, cónyuge/pareja o familiar más cercano',
    ],
    storeTitle: 'Guárdalo de forma segura',
    storeItems: [
      'Imprime una copia y guárdala en una caja fuerte contra incendios o archivador',
      'Guarda una copia digital en almacenamiento en la nube compartido con tu destinatario previsto',
      'Entrega una copia a tu abogado junto con tu testamento',
      'Pon una copia en una memoria USB dentro de una caja de seguridad o entrégala a alguien de confianza',
    ],
    shareTitle: 'Compártelo con cuidado',
    shareItems: [
      {
        label: 'Compartir de inmediato:',
        body: 'Entrega el documento directamente a tu cónyuge, pareja o albacea ahora',
      },
      {
        label: 'Sobre sellado:',
        body: 'Imprímelo, séllalo con instrucciones y entrégalo a tu abogado o colócalo en tu caja fuerte',
      },
      {
        label: 'Conversación familiar:',
        body: 'Usa este documento para iniciar una conversación familiar sobre el plan',
      },
    ],
    currentTitle: 'Mantenlo actualizado',
    currentBody:
      'Revísalo y vuelve a generar tu documento cada año o después de eventos importantes: matrimonio, divorcio, nacimiento de un hijo, compra de casa, cuentas nuevas, cambio de trabajo. Handoff siempre estará aquí cuando necesites actualizarlo.',
  },
  invite: {
    title: 'Háganlo juntos',
    body:
      '¿Piensas compartir esto con un padre o pareja? La forma más fácil de iniciar esa conversación es hacerlo tú primero y luego compartir. Aquí tienes un mensaje que puedes copiar y enviar:',
    copyTitle: 'Copiar texto de invitación',
    footer:
      'La mejor forma de empezar esta conversación no es "tienes que hacer esto". Es "yo acabo de hacerlo, ¿quieres hacer el tuyo?"',
    text: (origin: string) =>
      `Acabo de usar Handoff para organizar toda mi información importante para nuestra familia: cuentas, documentos, contactos, todo lo que necesitarían saber. Me tomó unos 30 minutos.\n\nTú también deberías hacer uno. Es gratis, nada se guarda en línea y tú conservas el documento.\n\nAquí está el enlace: ${origin}`,
  },
  document: {
    dateLocale: 'es-ES',
    title: 'Documento Handoff',
    generated: 'Generado',
    important:
      'Importante: Esto no es un documento legal. Es una guía práctica destinada a ayudar a tu familia a encontrar información importante y entender tus deseos. Consulta a un abogado para documentos legales de planificación patrimonial.',
    generatedWith: 'Generado con Handoff: gratis, privado y tuyo para conservar.',
    contents: 'CONTENIDO',
    coverDocument: 'Documento',
    coverFooter: 'Generado con Handoff',
    emergencyTitle: 'En caso de emergencia',
    emergencySubtitle: 'La información más importante de un vistazo',
    whoToCall: 'A quién llamar primero',
    whereWill: 'Dónde está el testamento',
    primaryBank: 'Acceso bancario principal',
    familyPassphrase: 'Frase familiar / prueba personal',
    seeFullDocument: 'Consulta el documento completo para ver todos los detalles.',
    accessDetails: 'DETALLES DE ACCESO',
    signature: 'FIRMA',
    owedToMe: 'me deben a mí',
    businessFallback: 'Negocio',
    labels: {
      fullName: 'Nombre completo',
      dateOfBirth: 'Fecha de nacimiento',
      location: 'Ubicación',
      reason: 'Razón para crear esto',
      intendedFor: 'Destinado a',
      personalContext: 'Contexto personal',
      role: 'Rol',
      relationship: 'Relación',
      phone: 'Teléfono',
      email: 'Email',
      notes: 'Notas',
      approximateValue: 'Valor aproximado',
      namedBeneficiary: 'Beneficiario nombrado',
      howToAccess: 'Cómo acceder',
      policyNumberLocation: 'Ubicación del número de póliza',
      policyNumberShort: 'Número de póliza / ubicación',
      agent: 'Agente',
      agentContact: 'Contacto del agente',
      throughEmployer: 'A través del empleador',
      employerContact: 'Contacto de empleador/RR. HH.',
      type: 'Tipo',
      deedTitleLocation: 'Ubicación de escritura/título',
      deedTitleShort: 'Ubicación de escritura / título',
      mortgageLien: 'Hipoteca / gravamen',
      deviceAccess: 'Acceso a dispositivos',
      emailAccounts: 'Cuentas de email',
      passwordManager: 'Gestor de contraseñas',
      twoFactorAuth: 'Autenticación de dos factores',
      socialMedia: 'Redes sociales',
      cloudStorage: 'Almacenamiento en la nube',
      subscriptions: 'Suscripciones y pagos recurrentes',
      domains: 'Dominios y sitios web',
      digitalPurchases: 'Compras digitales y programas de puntos',
      otherDigital: 'Otros datos digitales',
      document: 'Documento',
      lastUpdated: 'Última actualización',
      approximateBalance: 'Saldo aproximado',
      cosigned: 'Cofirmado',
      details: 'Detalles',
      payoffNotes: 'Notas de pago',
      entityType: 'Tipo de entidad',
      keyContacts: 'Contactos clave',
      operatingAgreement: 'Ubicación del acuerdo operativo',
      bankAccess: 'Acceso a cuenta bancaria',
      successionPlan: 'Plan de sucesión',
      otherBusinessNotes: 'Otras notas',
      minorChildren: 'Hijos menores',
      guardianship: 'Preferencias de tutela',
      elderlyDependents: 'Dependientes mayores',
      pets: 'Mascotas',
      specialNeeds: 'Necesidades especiales',
      otherCareNotes: 'Otras notas de cuidado',
      healthcareWishes: 'Deseos médicos y de final de vida',
      funeralPreferences: 'Preferencias funerarias o conmemorativas',
      organDonation: 'Donación de órganos',
      personalMessages: 'Mensajes personales',
      valuesStatement: 'Valores y lo que más importa',
      otherWishes: 'Otros deseos',
      signedBy: 'Firmado por',
      date: 'Fecha',
      personalProof: 'Prueba personal',
      institution: 'Institución',
      value: 'Valor',
      beneficiary: 'Beneficiario',
      carrier: 'Aseguradora',
      passphrase: 'Frase',
    },
    verificationStatement:
      'Confirmo que creé este documento voluntariamente, que la información es precisa según mi leal saber y entender, y que refleja mis deseos actuales.',
    disclaimer:
      'Esto no es un documento legal. Es una guía práctica destinada a ayudar a tu familia a encontrar información importante y entender tus deseos. Consulta a un abogado para planificación patrimonial legal.',
  },
}

const PSEUDO_MAP: Record<string, string> = {
  a: 'å',
  b: 'ƀ',
  c: 'ç',
  d: 'đ',
  e: 'é',
  f: 'ƒ',
  g: 'ĝ',
  h: 'ħ',
  i: 'ï',
  j: 'ĵ',
  k: 'ķ',
  l: 'ľ',
  m: 'ɱ',
  n: 'ñ',
  o: 'ø',
  p: 'ƥ',
  q: 'ɋ',
  r: 'ř',
  s: 'š',
  t: 'ţ',
  u: 'û',
  v: 'ṽ',
  w: 'ŵ',
  x: 'ẋ',
  y: 'ý',
  z: 'ž',
  A: 'Å',
  B: 'Ɓ',
  C: 'Ç',
  D: 'Đ',
  E: 'É',
  F: 'Ƒ',
  G: 'Ĝ',
  H: 'Ħ',
  I: 'Ï',
  J: 'Ĵ',
  K: 'Ķ',
  L: 'Ŀ',
  M: 'Ṃ',
  N: 'Ñ',
  O: 'Ø',
  P: 'Ƥ',
  Q: 'Ɋ',
  R: 'Ř',
  S: 'Š',
  T: 'Ţ',
  U: 'Û',
  V: 'Ṽ',
  W: 'Ŵ',
  X: 'Ẋ',
  Y: 'Ý',
  Z: 'Ž',
}

function pseudoText(value: string): string {
  if (value.trim().length === 0) return value

  const accented = value
    .split('')
    .map(character => PSEUDO_MAP[character] ?? character)
    .join('')
  const expansion = accented.slice(0, Math.min(18, Math.max(4, Math.ceil(accented.length * 0.25))))

  return `[!! ${accented} ${expansion} !!]`
}

function createPseudoTranslation(source: Translation): Translation {
  function convert(value: unknown, path: string[] = []): unknown {
    if (typeof value === 'string') {
      if (path.join('.') === 'document.dateLocale') return value
      return pseudoText(value)
    }

    if (typeof value === 'function') {
      const sourceFn = value as (...args: unknown[]) => string
      return (...args: unknown[]) => pseudoText(sourceFn(...args))
    }

    if (Array.isArray(value)) {
      return value.map((item, index) => convert(item, [...path, String(index)]))
    }

    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, item]) => [
          key,
          convert(item, [...path, key]),
        ]),
      )
    }

    return value
  }

  return convert(source) as Translation
}

export const translations: Record<Locale, Translation> = {
  en,
  es,
  pseudo: createPseudoTranslation(en),
}
