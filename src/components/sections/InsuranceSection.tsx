import { useInterview } from '../../hooks/useInterview'
import { getSection, INSURANCE_TYPES } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

export default function InsuranceSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('insurance')

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label="Insurance Policies"
        items={state.insurancePolicies}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'insurancePolicies' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'insurancePolicies', index: i })}
        addLabel="Add another policy"
      >
        {(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Insurance carrier"
                value={state.insurancePolicies[index].carrier}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'carrier', value: v })}
                placeholder="State Farm, Blue Cross, MetLife..."
              />
              <SelectField
                label="Type"
                value={state.insurancePolicies[index].insuranceType}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'insuranceType', value: v })}
                options={INSURANCE_TYPES}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Where to find policy number"
                value={state.insurancePolicies[index].policyNumberLocation}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'policyNumberLocation', value: v })}
                placeholder="e.g., Filing cabinet, email from agent"
              />
              <TextField
                label="Agent contact"
                value={state.insurancePolicies[index].agentContact}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'agentContact', value: v })}
                placeholder="Agent name or phone"
              />
            </div>
            <RadioGroup
              label="Through employer?"
              value={state.insurancePolicies[index].isEmployerProvided}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'isEmployerProvided', value: v })}
              options={['Yes', 'No']}
            />
            {state.insurancePolicies[index].isEmployerProvided === 'Yes' && (
              <TextField
                label="Employer & HR/benefits contact"
                value={state.insurancePolicies[index].employerContact}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'employerContact', value: v })}
                placeholder="e.g., Acme Corp — HR benefits line: (555) 123-4567"
                helpText="Your family will need this to file a claim through your employer"
              />
            )}
            <TextArea
              label="Notes"
              value={state.insurancePolicies[index].notes}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'notes', value: v })}
              placeholder="Any additional details about this policy..."
              rows={2}
            />
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
