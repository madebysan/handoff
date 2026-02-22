import { useInterview } from '../../hooks/useInterview'
import { getSection, DEBT_TYPES } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

export default function DebtsSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('debts')

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label="Debts & Obligations"
        items={state.debts}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'debts' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'debts', index: i })}
        addLabel="Add another debt"
      >
        {(index) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <SelectField
                label="Type"
                value={state.debts[index].debtType}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'debtType', value: v })}
                options={DEBT_TYPES}
              />
              <TextField
                label="Lender"
                value={state.debts[index].lender}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'lender', value: v })}
                placeholder="e.g., Wells Fargo, Sallie Mae"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Approximate balance"
                value={state.debts[index].approxBalance}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'approxBalance', value: v })}
                placeholder="e.g., ~$150,000"
              />
              <RadioGroup
                label="Co-signed?"
                value={state.debts[index].isCosigned}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'isCosigned', value: v })}
                options={['Yes', 'No']}
              />
            </div>
            <TextArea
              label="Payoff notes"
              value={state.debts[index].payoffNotes}
              onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'payoffNotes', value: v })}
              placeholder="Is there a payoff clause, life insurance tied to this debt, or anything else your family should know?"
              rows={2}
            />
          </div>
        )}
      </RepeatableGroup>
    </div>
  )
}
