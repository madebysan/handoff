import { useInterview } from '../../hooks/useInterview'
import { getSection } from '../../lib/interview-data'
import { useI18n } from '../../i18n'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'

export default function BusinessSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('business', t)
  const copy = t.forms.business
  const yesNoOptions = [
    { value: 'Yes', label: t.common.yes },
    { value: 'No', label: t.common.no },
  ]

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'business', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <RadioGroup
        label={copy.ownsBusiness}
        value={state.business.hasBusiness}
        onChange={(v) => update('hasBusiness', v)}
        options={yesNoOptions}
      />

      {state.business.hasBusiness === 'Yes' && (
        <div className="mt-6 space-y-1 animate-fade-in">
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label={copy.businessName}
              value={state.business.businessName}
              onChange={(v) => update('businessName', v)}
              placeholder={copy.businessNamePlaceholder}
            />
            <TextField
              label={copy.entityType}
              value={state.business.entityType}
              onChange={(v) => update('entityType', v)}
              placeholder={copy.entityTypePlaceholder}
            />
          </div>
          <TextArea
            label={copy.keyContacts}
            value={state.business.keyContacts}
            onChange={(v) => update('keyContacts', v)}
            placeholder={copy.keyContactsPlaceholder}
          />
          <TextField
            label={copy.operatingAgreement}
            value={state.business.operatingAgreementLocation}
            onChange={(v) => update('operatingAgreementLocation', v)}
            placeholder={copy.operatingAgreementPlaceholder}
          />
          <TextArea
            label={copy.bankAccess}
            value={state.business.bankAccountAccess}
            onChange={(v) => update('bankAccountAccess', v)}
            placeholder={copy.bankAccessPlaceholder}
          />
          <TextArea
            label={copy.successionPlan}
            value={state.business.successionPlan}
            onChange={(v) => update('successionPlan', v)}
            placeholder={copy.successionPlanPlaceholder}
          />
          <TextArea
            label={copy.otherNotes}
            value={state.business.otherBusinessNotes}
            onChange={(v) => update('otherBusinessNotes', v)}
            placeholder={copy.otherNotesPlaceholder}
          />
        </div>
      )}

      {state.business.hasBusiness === 'No' && (
        <p className="mt-4 text-sm text-muted-foreground">
          {copy.noBusiness}
        </p>
      )}
    </div>
  )
}
