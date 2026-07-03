import { useInterview } from '../../hooks/useInterview'
import { getSection, ACCOUNT_TYPES } from '../../lib/interview-data'
import { localizeOptions, useI18n } from '../../i18n'
import type { Translation } from '../../i18n/translations'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

// Dynamic placeholders based on account type
function getPlaceholders(accountType: string, copy: Translation['forms']['financial']) {
  switch (accountType) {
    case 'Cryptocurrency':
      return {
        institution: copy.placeholders.cryptoInstitution,
        access: copy.placeholders.cryptoAccess,
        value: copy.placeholders.cryptoValue,
      }
    case 'Physical (cash, gold, etc.)':
      return {
        institution: copy.placeholders.physicalInstitution,
        access: copy.placeholders.physicalAccess,
        value: copy.placeholders.physicalValue,
      }
    default:
      return {
        institution: copy.placeholders.defaultInstitution,
        access: copy.placeholders.defaultAccess,
        value: copy.placeholders.defaultValue,
      }
  }
}

export default function FinancialSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('financial', t)
  const copy = t.forms.financial
  const yesNoUnsureOptions = [
    { value: 'Yes', label: t.common.yes },
    { value: 'No', label: t.common.no },
    { value: 'Not sure', label: t.common.notSure },
  ]

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label={copy.groupLabel}
        items={state.financialAccounts}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'financialAccounts' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'financialAccounts', index: i })}
        addLabel={copy.addLabel}
      >
        {(index) => {
          const accountType = state.financialAccounts[index].accountType
          const placeholders = getPlaceholders(accountType, copy)

          return (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <SelectField
                  label={copy.accountType}
                  value={accountType}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'accountType', value: v })}
                  options={localizeOptions(ACCOUNT_TYPES, t.options.accountTypes)}
                />
                <TextField
                  label={accountType === 'Physical (cash, gold, etc.)' ? copy.physicalLocation : copy.institution}
                  value={state.financialAccounts[index].institution}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'institution', value: v })}
                  placeholder={placeholders.institution}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 items-end">
                <TextField
                  label={copy.approximateValue}
                  value={state.financialAccounts[index].approxValue}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'approxValue', value: v })}
                  placeholder={placeholders.value}
                  helpText={copy.approximateValueHelp}
                />
                <RadioGroup
                  label={copy.namedBeneficiary}
                  value={state.financialAccounts[index].hasBeneficiary}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'hasBeneficiary', value: v })}
                  options={yesNoUnsureOptions}
                />
              </div>
              <TextArea
                label={copy.access}
                value={state.financialAccounts[index].accessNotes}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'accessNotes', value: v })}
                placeholder={placeholders.access}
              />
            </div>
          )
        }}
      </RepeatableGroup>
    </div>
  )
}
