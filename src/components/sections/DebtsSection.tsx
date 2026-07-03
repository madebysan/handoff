import { useInterview } from '../../hooks/useInterview'
import { getSection, DEBT_TYPES } from '../../lib/interview-data'
import { localizeOptions, useI18n } from '../../i18n'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

export default function DebtsSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('debts', t)
  const copy = t.forms.debts

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label={copy.groupLabel}
        items={state.debts}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'debts' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'debts', index: i })}
        addLabel={copy.addLabel}
      >
        {(index) => {
          const isOwedToMe = state.debts[index].direction === 'Owed to me'
          return (
            <div className="space-y-3">
              <RadioGroup
                label={copy.direction}
                value={state.debts[index].direction || 'I owe'}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'direction', value: v })}
                options={localizeOptions(['I owe', 'Owed to me'], t.options.debtDirections)}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <SelectField
                  label={copy.type}
                  value={state.debts[index].debtType}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'debtType', value: v })}
                  options={localizeOptions(DEBT_TYPES, t.options.debtTypes)}
                />
                <TextField
                  label={isOwedToMe ? copy.whoOwesYou : copy.lender}
                  value={state.debts[index].lender}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'lender', value: v })}
                  placeholder={isOwedToMe ? copy.owedToMePlaceholder : copy.lenderPlaceholder}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label={copy.approximateBalance}
                  value={state.debts[index].approxBalance}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'approxBalance', value: v })}
                  placeholder={copy.approximateBalancePlaceholder}
                />
                {!isOwedToMe && (
                  <RadioGroup
                    label={copy.cosigned}
                    value={state.debts[index].isCosigned}
                    onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'isCosigned', value: v })}
                    options={[
                      { value: 'Yes', label: t.common.yes },
                      { value: 'No', label: t.common.no },
                    ]}
                  />
                )}
              </div>
              <TextArea
                label={isOwedToMe ? copy.details : copy.payoffNotes}
                value={state.debts[index].payoffNotes}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'debts', index, field: 'payoffNotes', value: v })}
                placeholder={isOwedToMe
                  ? copy.owedToMeDetailsPlaceholder
                  : copy.payoffNotesPlaceholder}
              />
            </div>
          )
        }}
      </RepeatableGroup>
    </div>
  )
}
