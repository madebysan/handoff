import { Info } from 'lucide-react'
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
        label="Device access"
        value={state.digital.deviceAccess}
        onChange={(v) => update('deviceAccess', v)}
        placeholder="Phone PIN, laptop password, tablet passcode — how to unlock the devices you use daily"
        helpText="Your phone or laptop is often the first thing your family needs to access"
      />

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

      <div className="mt-8 bg-card/50 rounded-md p-5 border border-input">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Set up digital legacy contacts now</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
              Most major platforms let you designate someone to access or manage your account. These take just a few minutes to configure:
            </p>
            <ul className="text-sm text-secondary-foreground space-y-1.5">
              <li className="flex gap-2"><span className="text-primary font-medium">•</span> <span><strong>Google</strong> — Inactive Account Manager (sends data to your contact after inactivity)</span></li>
              <li className="flex gap-2"><span className="text-primary font-medium">•</span> <span><strong>Apple</strong> — Legacy Contact (gives access to your Apple ID data)</span></li>
              <li className="flex gap-2"><span className="text-primary font-medium">•</span> <span><strong>Facebook</strong> — Memorialization Contact (manages your profile)</span></li>
              <li className="flex gap-2"><span className="text-primary font-medium">•</span> <span><strong>Instagram</strong> — Memorialization request through Facebook settings</span></li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Search "[platform name] legacy contact" or "inactive account" in your account settings to find these options.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
