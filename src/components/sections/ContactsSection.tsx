import { useInterview } from '../../hooks/useInterview'
import { SECTIONS, CONTACT_ROLES } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RepeatableGroup from '../interview/fields/RepeatableGroup'
import TextArea from '../interview/fields/TextArea'

export default function ContactsSection() {
  const { state, dispatch } = useInterview()
  const section = SECTIONS[0]

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label="Key Contacts"
        items={state.contacts}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'contacts' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'contacts', index: i })}
        addLabel="Add another contact"
      >
        {(index) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Full name"
              value={state.contacts[index].name}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'name', value: v })}
              placeholder="Jane Doe"
            />
            <SelectField
              label="Role"
              value={state.contacts[index].role}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'role', value: v })}
              options={CONTACT_ROLES}
              placeholder="Select role..."
            />
            <TextField
              label="Phone"
              value={state.contacts[index].phone}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'phone', value: v })}
              placeholder="(555) 123-4567"
              type="tel"
            />
            <TextField
              label="Email"
              value={state.contacts[index].email}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'email', value: v })}
              placeholder="jane@example.com"
              type="email"
            />
            <TextField
              label="Relationship"
              value={state.contacts[index].relationship}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'relationship', value: v })}
              placeholder="Spouse, sibling, friend..."
            />
            <div className="sm:col-span-2">
              <TextArea
                label="Notes"
                value={state.contacts[index].notes}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'notes', value: v })}
                placeholder="Any additional context about this person's role..."
                rows={2}
              />
            </div>
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
