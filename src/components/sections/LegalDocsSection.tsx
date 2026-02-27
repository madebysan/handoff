import { useInterview } from '../../hooks/useInterview'
import { getSection, LEGAL_DOC_TYPES } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'
import { Info } from 'lucide-react'

function getLocationPlaceholder(docType: string): string {
  switch (docType) {
    case 'Will':
      return "e.g., Original with attorney Jane Smith. Copy in home safe"
    case 'Trust':
      return "e.g., With trustee at First National Bank. Copy in filing cabinet"
    case 'Power of Attorney (Financial)':
    case 'Power of Attorney (Healthcare)':
      return "e.g., Original with attorney. Copy given to designated agent"
    case 'Advance directive / Living will':
      return "e.g., Copy with doctor, copy in bedside table drawer"
    case 'Tax returns (recent)':
      return "e.g., Filing cabinet in office. Digital copies on Google Drive"
    default:
      return "e.g., Filing cabinet in office, with attorney John Smith"
  }
}

function getDocHelpText(docType: string): string | undefined {
  switch (docType) {
    case 'Will':
      return "If you don't have a will, note that here — it's one of the most important documents to create"
    case 'Power of Attorney (Financial)':
      return "Authorizes someone to make financial decisions if you're incapacitated"
    case 'Power of Attorney (Healthcare)':
      return "Authorizes someone to make medical decisions if you can't"
    case 'Advance directive / Living will':
      return "States your wishes for end-of-life medical care"
    default:
      return undefined
  }
}

export default function LegalDocsSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('legal')

  return (
    <div>
      <SectionIntro {...section} />

      <p className="text-sm text-muted-foreground mb-6 -mt-4">
        You don't need to create any legal documents here — just record where they are so your family can find them. If you don't have some of these yet, that's okay — noting what's missing is just as valuable.
      </p>

      <RepeatableGroup
        label="Legal Documents"
        items={state.legalDocuments}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'legalDocuments' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'legalDocuments', index: i })}
        addLabel="Add another document"
      >
        {(index) => {
          const docType = state.legalDocuments[index].documentType
          const helpText = getDocHelpText(docType)
          return (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <SelectField
                  label="Document type"
                  value={docType}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'documentType', value: v })}
                  options={LEGAL_DOC_TYPES}
                />
                <TextField
                  label="Last updated"
                  value={state.legalDocuments[index].lastUpdated}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'lastUpdated', value: v })}
                  placeholder="e.g., March 2024 (or 'Don't have yet')"
                />
              </div>
              {helpText && (
                <p className="text-xs text-muted-foreground -mt-1">{helpText}</p>
              )}
              <TextField
                label="Where is it?"
                value={state.legalDocuments[index].location}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'location', value: v })}
                placeholder={getLocationPlaceholder(docType)}
              />
              <TextArea
                label="Notes"
                value={state.legalDocuments[index].notes}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'notes', value: v })}
                placeholder="Any additional details about this document..."
                helpText="Include where your family can access it — physical location, Google Drive link, Dropbox URL, or who holds a copy"
              />
            </div>
          )
        }}
      </RepeatableGroup>

      {/* Guidance callout */}
      <div className="mt-8 bg-card/50 rounded-md p-5 border border-input">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Don't have a will or other key documents?</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
              You're not alone — over half of American adults don't have a will. While Handoff can't create legal documents for you (each state has specific requirements for witnesses, notarization, etc.), documenting what you <em>do</em> and <em>don't</em> have is a critical first step.
            </p>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
              The four documents that matter most:
            </p>
            <ul className="text-sm text-secondary-foreground space-y-1.5 mb-3">
              <li className="flex gap-2"><span className="text-primary font-medium">1.</span> <span><strong>Will</strong> — who gets what, and who's in charge of making it happen</span></li>
              <li className="flex gap-2"><span className="text-primary font-medium">2.</span> <span><strong>Financial power of attorney</strong> — who manages your money if you can't</span></li>
              <li className="flex gap-2"><span className="text-primary font-medium">3.</span> <span><strong>Healthcare power of attorney</strong> — who makes medical decisions for you</span></li>
              <li className="flex gap-2"><span className="text-primary font-medium">4.</span> <span><strong>Advance directive</strong> — your wishes for end-of-life care</span></li>
            </ul>
            <p className="text-xs text-muted-foreground leading-relaxed">
              An estate attorney can create all four in a single session. Many offer flat-fee packages. You can also use online services like Trust & Will, FreeWill, or LegalZoom as a starting point.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
