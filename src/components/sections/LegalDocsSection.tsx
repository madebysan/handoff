import { useInterview } from '../../hooks/useInterview'
import { SECTIONS, LEGAL_DOC_TYPES } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

export default function LegalDocsSection() {
  const { state, dispatch } = useInterview()
  const section = SECTIONS[5]

  return (
    <div>
      <SectionIntro {...section} />

      <p className="text-sm text-charcoal-muted mb-6 -mt-4">
        You don't need to create any legal documents here — just record where they are so your family can find them.
      </p>

      <RepeatableGroup
        label="Legal Documents"
        items={state.legalDocuments}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'legalDocuments' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'legalDocuments', index: i })}
        addLabel="Add another document"
      >
        {(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <SelectField
                label="Document type"
                value={state.legalDocuments[index].documentType}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'documentType', value: v })}
                options={LEGAL_DOC_TYPES}
              />
              <TextField
                label="Last updated"
                value={state.legalDocuments[index].lastUpdated}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'lastUpdated', value: v })}
                placeholder="e.g., March 2024"
              />
            </div>
            <TextField
              label="Where is it?"
              value={state.legalDocuments[index].location}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'location', value: v })}
              placeholder="e.g., Filing cabinet in office, with attorney John Smith"
            />
            <TextArea
              label="Notes"
              value={state.legalDocuments[index].notes}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'notes', value: v })}
              placeholder="Any additional details..."
              rows={2}
            />
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
