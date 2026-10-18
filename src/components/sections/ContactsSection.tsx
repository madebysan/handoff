import { useInterview } from '../../hooks/useInterview'
import { getSection, CONTACT_ROLES } from '../../lib/interview-data'
import { localizeOptions, useI18n } from '../../i18n'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RepeatableGroup from '../interview/fields/RepeatableGroup'
import TextArea from '../interview/fields/TextArea'
import { Phone, Mail, User, Users } from 'lucide-react'

export default function ContactsSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('contacts', t)
  const copy = t.forms.contacts

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label={copy.groupLabel}
        items={state.contacts}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'contacts' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'contacts', index: i })}
        addLabel={copy.addLabel}
      >
        {(index) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label={copy.fullName}
              value={state.contacts[index].name}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'name', value: v })}
              placeholder={copy.fullNamePlaceholder}
              icon={<User className="w-4 h-4" />}
            />
            <SelectField
              label={copy.role}
              value={state.contacts[index].role}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'role', value: v })}
              options={localizeOptions(CONTACT_ROLES, t.options.contactRoles)}
              placeholder={copy.rolePlaceholder}
            />
            <TextField
              label={copy.phone}
              value={state.contacts[index].phone}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'phone', value: v })}
              placeholder={copy.phonePlaceholder}
              type="tel"
              icon={<Phone className="w-4 h-4" />}
            />
            <TextField
              label={copy.email}
              value={state.contacts[index].email}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'email', value: v })}
              placeholder={copy.emailPlaceholder}
              type="email"
              icon={<Mail className="w-4 h-4" />}
            />
            <div className="sm:col-span-2">
              <TextField
                label={copy.relationship}
                value={state.contacts[index].relationship}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'relationship', value: v })}
                placeholder={copy.relationshipPlaceholder}
                icon={<Users className="w-4 h-4" />}
              />
            </div>
            <div className="sm:col-span-2">
              <TextArea
                label={copy.notes}
                value={state.contacts[index].notes}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'contacts', index, field: 'notes', value: v })}
                placeholder={copy.notesPlaceholder}
              />
            </div>
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
