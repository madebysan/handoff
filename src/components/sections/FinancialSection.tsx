import { useInterview } from '../../hooks/useInterview'
import { SECTIONS, ACCOUNT_TYPES } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

export default function FinancialSection() {
  const { state, dispatch } = useInterview()
  const section = SECTIONS[1]

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label="Financial Accounts"
        items={state.financialAccounts}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'financialAccounts' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'financialAccounts', index: i })}
        addLabel="Add another account"
      >
        {(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Institution"
                value={state.financialAccounts[index].institution}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'institution', value: v })}
                placeholder="Chase, Fidelity, Vanguard..."
              />
              <SelectField
                label="Account type"
                value={state.financialAccounts[index].accountType}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'accountType', value: v })}
                options={ACCOUNT_TYPES}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Approximate value"
                value={state.financialAccounts[index].approxValue}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'approxValue', value: v })}
                placeholder="e.g., $10,000 - $50,000"
                helpText="A rough range is fine"
              />
              <RadioGroup
                label="Named beneficiary?"
                value={state.financialAccounts[index].hasBeneficiary}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'hasBeneficiary', value: v })}
                options={['Yes', 'No', 'Not sure']}
              />
            </div>
            <TextArea
              label="How to access"
              value={state.financialAccounts[index].accessNotes}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'accessNotes', value: v })}
              placeholder="e.g., Login is in 1Password, or statements are in the filing cabinet in the office"
              rows={2}
            />
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
