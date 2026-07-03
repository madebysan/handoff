import { Info } from 'lucide-react'
import { useInterview } from '../../hooks/useInterview'
import { getSection } from '../../lib/interview-data'
import { useI18n } from '../../i18n'
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
  const { t } = useI18n()
  const section = getSection('digital', t)
  const copy = t.forms.digital

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'digital', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <GroupLabel>{copy.coreAccess}</GroupLabel>

      <TextArea
        label={copy.deviceAccess}
        value={state.digital.deviceAccess}
        onChange={(v) => update('deviceAccess', v)}
        placeholder={copy.deviceAccessPlaceholder}
        helpText={copy.deviceAccessHelp}
      />

      <TextArea
        label={copy.emailAccounts}
        value={state.digital.emailAccounts}
        onChange={(v) => update('emailAccounts', v)}
        placeholder={copy.emailAccountsPlaceholder}
        helpText={copy.emailAccountsHelp}
      />

      <TextArea
        label={copy.passwordManager}
        value={state.digital.passwordManager}
        onChange={(v) => update('passwordManager', v)}
        placeholder={copy.passwordManagerPlaceholder}
        helpText={copy.passwordManagerHelp}
      />

      <TextArea
        label={copy.twoFactorAuth}
        value={state.digital.twoFactorAuth}
        onChange={(v) => update('twoFactorAuth', v)}
        placeholder={copy.twoFactorAuthPlaceholder}
        helpText={copy.twoFactorAuthHelp}
      />

      <GroupLabel>{copy.onlinePresence}</GroupLabel>

      <TextArea
        label={copy.socialMedia}
        value={state.digital.socialMediaWishes}
        onChange={(v) => update('socialMediaWishes', v)}
        placeholder={copy.socialMediaPlaceholder}
        helpText={copy.socialMediaHelp}
      />

      <TextArea
        label={copy.domains}
        value={state.digital.domainNames}
        onChange={(v) => update('domainNames', v)}
        placeholder={copy.domainsPlaceholder}
      />

      <GroupLabel>{copy.digitalAssets}</GroupLabel>

      <TextArea
        label={copy.cloudStorage}
        value={state.digital.cloudStorage}
        onChange={(v) => update('cloudStorage', v)}
        placeholder={copy.cloudStoragePlaceholder}
      />

      <TextArea
        label={copy.digitalPurchases}
        value={state.digital.digitalPurchases}
        onChange={(v) => update('digitalPurchases', v)}
        placeholder={copy.digitalPurchasesPlaceholder}
      />

      <GroupLabel>{copy.services}</GroupLabel>

      <TextArea
        label={copy.subscriptions}
        value={state.digital.subscriptions}
        onChange={(v) => update('subscriptions', v)}
        placeholder={copy.subscriptionsPlaceholder}
        helpText={copy.subscriptionsHelp}
      />

      <TextArea
        label={copy.otherDigital}
        value={state.digital.otherDigital}
        onChange={(v) => update('otherDigital', v)}
        placeholder={copy.otherDigitalPlaceholder}
      />

      <div className="mt-8 bg-card/50 rounded-md p-5 border border-input">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">{copy.legacyTitle}</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
              {copy.legacyBody}
            </p>
            <ul className="text-sm text-secondary-foreground space-y-1.5">
              {copy.legacyItems.map(item => (
                <li key={item.label} className="flex gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span><strong>{item.label}</strong>: {item.body}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              {copy.legacyFooter}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
