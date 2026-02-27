import { useInterview } from '../../hooks/useInterview'
import { getSection, ACCOUNT_TYPES } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import RadioGroup from '../interview/fields/RadioGroup'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'

// Dynamic placeholders based on account type
function getPlaceholders(accountType: string) {
  switch (accountType) {
    case 'Cryptocurrency':
      return {
        institution: 'Coinbase, Ledger wallet, MetaMask...',
        access: 'Where is the seed phrase / recovery phrase stored? Which exchanges hold funds? What wallets are used? e.g., Seed phrase is on a metal plate in the fireproof safe',
        value: 'e.g., ~2 BTC + various altcoins',
      }
    case 'Physical (cash, gold, etc.)':
      return {
        institution: 'Home safe, safe deposit box, buried...',
        access: 'Where is it physically stored? Who else knows? How to access it? e.g., $5,000 cash in the safe behind the painting in the office. Combination is...',
        value: 'e.g., $5,000 cash + gold coins',
      }
    default:
      return {
        institution: 'Chase, Fidelity, Vanguard, Coinbase...',
        access: 'e.g., Login is in 1Password, or statements are in the filing cabinet in the office',
        value: 'e.g., $10,000 - $50,000',
      }
  }
}

export default function FinancialSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('financial')

  return (
    <div>
      <SectionIntro {...section} />

      <RepeatableGroup
        label="Financial Accounts & Assets"
        items={state.financialAccounts}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'financialAccounts' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'financialAccounts', index: i })}
        addLabel="Add another account or asset"
      >
        {(index) => {
          const accountType = state.financialAccounts[index].accountType
          const placeholders = getPlaceholders(accountType)

          return (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <SelectField
                  label="Account type"
                  value={accountType}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'accountType', value: v })}
                  options={ACCOUNT_TYPES}
                />
                <TextField
                  label={accountType === 'Physical (cash, gold, etc.)' ? 'Where is it stored?' : 'Institution or platform'}
                  value={state.financialAccounts[index].institution}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'institution', value: v })}
                  placeholder={placeholders.institution}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 items-end">
                <TextField
                  label="Approximate value"
                  value={state.financialAccounts[index].approxValue}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'approxValue', value: v })}
                  placeholder={placeholders.value}
                  helpText="A rough range is fine"
                />
                <RadioGroup
                  label="Named beneficiary?"
                  value={state.financialAccounts[index].hasBeneficiary}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'financialAccounts', index, field: 'hasBeneficiary', value: v })}
                  options={['Yes', 'No', 'Not sure']}
                />
              </div>
              <TextArea
                label="How to access"
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
