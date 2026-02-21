import { useInterview } from '../../hooks/useInterview'
import { SECTIONS } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'

export default function BusinessSection() {
  const { state, dispatch } = useInterview()
  const section = SECTIONS[7]

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'business', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <RadioGroup
        label="Do you own a business, freelance, or have partnership interests?"
        value={state.business.hasBusiness}
        onChange={(v) => update('hasBusiness', v)}
        options={['Yes', 'No']}
      />

      {state.business.hasBusiness === 'Yes' && (
        <div className="mt-6 space-y-1">
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Business name"
              value={state.business.businessName}
              onChange={(v) => update('businessName', v)}
              placeholder="Your business name"
            />
            <TextField
              label="Entity type"
              value={state.business.entityType}
              onChange={(v) => update('entityType', v)}
              placeholder="e.g., LLC, S-Corp, sole proprietor"
            />
          </div>
          <TextArea
            label="Key contacts"
            value={state.business.keyContacts}
            onChange={(v) => update('keyContacts', v)}
            placeholder="Business partner, accountant, attorney — names and contact info for anyone involved in running the business"
            rows={3}
          />
          <TextField
            label="Where is the operating agreement?"
            value={state.business.operatingAgreementLocation}
            onChange={(v) => update('operatingAgreementLocation', v)}
            placeholder="e.g., Attorney's office, Google Drive, filing cabinet"
          />
          <TextArea
            label="Business bank account access"
            value={state.business.bankAccountAccess}
            onChange={(v) => update('bankAccountAccess', v)}
            placeholder="How can your family or business partner access business bank accounts?"
            rows={2}
          />
          <TextArea
            label="Succession or wind-down plan"
            value={state.business.successionPlan}
            onChange={(v) => update('successionPlan', v)}
            placeholder="What should happen to the business? Who takes over? Should it be sold, wound down, or continued?"
            rows={3}
          />
          <TextArea
            label="Other business notes"
            value={state.business.otherBusinessNotes}
            onChange={(v) => update('otherBusinessNotes', v)}
            placeholder="Anything else about your business your family should know"
            rows={2}
          />
        </div>
      )}

      {state.business.hasBusiness === 'No' && (
        <p className="mt-4 text-sm text-charcoal-muted">
          No worries — you can skip this section entirely or come back if anything changes.
        </p>
      )}
    </div>
  )
}
