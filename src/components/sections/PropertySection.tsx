import { useInterview } from '../../hooks/useInterview'
import { SECTIONS, PROPERTY_TYPES } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

export default function PropertySection() {
  const { state, dispatch } = useInterview()
  const section = SECTIONS[3]

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label="Property & Assets"
        items={state.properties}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'properties' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'properties', index: i })}
        addLabel="Add another property or asset"
      >
        {(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <SelectField
                label="Type"
                value={state.properties[index].propertyType}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'propertyType', value: v })}
                options={PROPERTY_TYPES}
              />
              <TextField
                label="Description"
                value={state.properties[index].description}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'description', value: v })}
                placeholder="e.g., 3BR house on Main St"
              />
            </div>
            <TextField
              label="Location / Address"
              value={state.properties[index].location}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'location', value: v })}
              placeholder="Address or location description"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Where is the deed/title?"
                value={state.properties[index].deedTitleLocation}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'deedTitleLocation', value: v })}
                placeholder="e.g., Safe, attorney's office"
              />
              <RadioGroup
                label="Has mortgage or lien?"
                value={state.properties[index].hasMortgage}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'hasMortgage', value: v })}
                options={['Yes', 'No']}
              />
            </div>
            <TextArea
              label="Notes"
              value={state.properties[index].notes}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'notes', value: v })}
              placeholder="Any other details — lender info, key location, combination to safe..."
              rows={2}
            />
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
