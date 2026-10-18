import { useInterview } from '../../hooks/useInterview'
import { getSection, PROPERTY_TYPES } from '../../lib/interview-data'
import { localizeOptions, useI18n } from '../../i18n'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

export default function PropertySection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('property', t)
  const copy = t.forms.property
  const yesNoOptions = [
    { value: 'Yes', label: t.common.yes },
    { value: 'No', label: t.common.no },
  ]

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label={copy.groupLabel}
        items={state.properties}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'properties' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'properties', index: i })}
        addLabel={copy.addLabel}
      >
        {(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <SelectField
                label={copy.type}
                value={state.properties[index].propertyType}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'propertyType', value: v })}
                options={localizeOptions(PROPERTY_TYPES, t.options.propertyTypes)}
              />
              <TextField
                label={copy.description}
                value={state.properties[index].description}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'description', value: v })}
                placeholder={copy.descriptionPlaceholder}
              />
            </div>
            <TextField
              label={copy.location}
              value={state.properties[index].location}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'location', value: v })}
              placeholder={copy.locationPlaceholder}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label={copy.deedTitle}
                value={state.properties[index].deedTitleLocation}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'deedTitleLocation', value: v })}
                placeholder={copy.deedTitlePlaceholder}
              />
              <RadioGroup
                label={copy.mortgage}
                value={state.properties[index].hasMortgage}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'hasMortgage', value: v })}
                options={yesNoOptions}
              />
            </div>
            <TextArea
              label={copy.notes}
              value={state.properties[index].notes}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'properties', index, field: 'notes', value: v })}
              placeholder={copy.notesPlaceholder}
            />
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
