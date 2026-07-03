import { useInterview } from '../../hooks/useInterview'
import { getSection, INSURANCE_TYPES } from '../../lib/interview-data'
import { localizeOptions, useI18n } from '../../i18n'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

export default function InsuranceSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('insurance', t)
  const copy = t.forms.insurance
  const yesNoOptions = [
    { value: 'Yes', label: t.common.yes },
    { value: 'No', label: t.common.no },
  ]

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label={copy.groupLabel}
        items={state.insurancePolicies}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'insurancePolicies' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'insurancePolicies', index: i })}
        addLabel={copy.addLabel}
      >
        {(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label={copy.carrier}
                value={state.insurancePolicies[index].carrier}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'carrier', value: v })}
                placeholder={copy.carrierPlaceholder}
              />
              <SelectField
                label={copy.type}
                value={state.insurancePolicies[index].insuranceType}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'insuranceType', value: v })}
                options={localizeOptions(INSURANCE_TYPES, t.options.insuranceTypes)}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label={copy.policyNumberLocation}
                value={state.insurancePolicies[index].policyNumberLocation}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'policyNumberLocation', value: v })}
                placeholder={copy.policyNumberPlaceholder}
              />
              <TextField
                label={copy.agentContact}
                value={state.insurancePolicies[index].agentContact}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'agentContact', value: v })}
                placeholder={copy.agentPlaceholder}
              />
            </div>
            <RadioGroup
              label={copy.throughEmployer}
              value={state.insurancePolicies[index].isEmployerProvided}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'isEmployerProvided', value: v })}
              options={yesNoOptions}
            />
            {state.insurancePolicies[index].isEmployerProvided === 'Yes' && (
              <TextField
                label={copy.employerContact}
                value={state.insurancePolicies[index].employerContact}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'employerContact', value: v })}
                placeholder={copy.employerPlaceholder}
                helpText={copy.employerHelp}
              />
            )}
            <TextArea
              label={copy.notes}
              value={state.insurancePolicies[index].notes}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'insurancePolicies', index, field: 'notes', value: v })}
              placeholder={copy.notesPlaceholder}
            />
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
