import { useInterview } from '../../hooks/useInterview'
import { getSection } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextArea from '../interview/fields/TextArea'

function GroupLabel({ children }: { children: string }) {
  return (
    <div className="mt-8 mb-3 first:mt-0">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{children}</h3>
      <div className="mt-2 border-t border-border" />
    </div>
  )
}

export default function DigitalLifeSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('digital')

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'digital', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <GroupLabel>Core access</GroupLabel>

      <TextArea
        label="Email accounts"
        value={state.digital.emailAccounts}
        onChange={(v) => update('emailAccounts', v)}
        placeholder="List your email accounts and how to access them. e.g., Personal: john@gmail.com (password in 1Password). Work: john@company.com (contact IT department)"
        helpText="Your email is the master key to most of your digital life"
      />

      <TextArea
        label="Password manager"
        value={state.digital.passwordManager}
        onChange={(v) => update('passwordManager', v)}
        placeholder="Which password manager do you use? How can your family access the master vault? e.g., 1Password — master password is in the sealed envelope in the safe"
        helpText="Some people prefer to note where the password is stored rather than writing it directly — but it's your document, include whatever your family will need"
      />

      <TextArea
        label="Two-factor authentication"
        value={state.digital.twoFactorAuth}
        onChange={(v) => update('twoFactorAuth', v)}
        placeholder="Which authenticator app do you use? Where are the backup/recovery codes stored? e.g., Google Authenticator on my iPhone. Recovery codes are in 1Password"
        helpText="Without 2FA access, your family may be locked out of important accounts"
      />

      <GroupLabel>Online presence</GroupLabel>

      <TextArea
        label="Social media accounts"
        value={state.digital.socialMediaWishes}
        onChange={(v) => update('socialMediaWishes', v)}
        placeholder="List your social media accounts and what you'd like done with them. e.g., Facebook — memorialize. Twitter — delete. LinkedIn — leave active for 6 months then delete"
        helpText="What would you like done with each account? Delete, memorialize, or archive?"
      />

      <TextArea
        label="Domain names & websites"
        value={state.digital.domainNames}
        onChange={(v) => update('domainNames', v)}
        placeholder="Any domain names you own? Websites you maintain? Where are they registered? e.g., mywebsite.com registered at Namecheap, auto-renews annually"
      />

      <GroupLabel>Digital assets</GroupLabel>

      <TextArea
        label="Cloud storage"
        value={state.digital.cloudStorage}
        onChange={(v) => update('cloudStorage', v)}
        placeholder="Google Drive, Dropbox, iCloud — what's important in each? e.g., Google Drive has all tax documents in a folder called 'Taxes'. iCloud has family photos"
      />

      <TextArea
        label="Digital purchases & loyalty programs"
        value={state.digital.digitalPurchases}
        onChange={(v) => update('digitalPurchases', v)}
        placeholder="Kindle library, iTunes purchases, Steam games, airline miles, hotel points, credit card rewards — anything with significant value"
      />

      <GroupLabel>Services & subscriptions</GroupLabel>

      <TextArea
        label="Subscriptions & recurring payments"
        value={state.digital.subscriptions}
        onChange={(v) => update('subscriptions', v)}
        placeholder="List active subscriptions that should be cancelled. e.g., Netflix ($15/mo), Spotify ($10/mo), NYT ($4/mo), gym membership at Planet Fitness ($25/mo)"
        helpText="These drain the account if nobody knows to cancel them"
      />

      <TextArea
        label="Anything else digital"
        value={state.digital.otherDigital}
        onChange={(v) => update('otherDigital', v)}
        placeholder="Any other digital accounts, services, or information your family should know about"
      />
    </div>
  )
}
