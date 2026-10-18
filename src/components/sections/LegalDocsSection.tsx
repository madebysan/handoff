import { useInterview } from '../../hooks/useInterview'
import { getSection, LEGAL_DOC_TYPES } from '../../lib/interview-data'
import { localizeOptions, useI18n } from '../../i18n'
import type { Translation } from '../../i18n/translations'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import TextArea from '../interview/fields/TextArea'
import RepeatableGroup from '../interview/fields/RepeatableGroup'
import { Info } from 'lucide-react'

function getLocationPlaceholder(docType: string, copy: Translation['forms']['legal']): string {
  switch (docType) {
    case 'Will':
      return copy.placeholders.Will
    case 'Trust':
      return copy.placeholders.Trust
    case 'Power of Attorney (Financial)':
    case 'Power of Attorney (Healthcare)':
      return copy.placeholders.poa
    case 'Advance directive / Living will':
      return copy.placeholders.advanceDirective
    case 'Tax returns (recent)':
      return copy.placeholders.taxReturns
    default:
      return copy.placeholders.default
  }
}

function getDocHelpText(docType: string, copy: Translation['forms']['legal']): string | undefined {
  switch (docType) {
    case 'Will':
      return copy.help.Will
    case 'Power of Attorney (Financial)':
      return copy.help.financialPoa
    case 'Power of Attorney (Healthcare)':
      return copy.help.healthcarePoa
    case 'Advance directive / Living will':
      return copy.help.advanceDirective
    default:
      return undefined
  }
}

export default function LegalDocsSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('legal', t)
  const copy = t.forms.legal

  return (
    <div>
      <SectionIntro {...section} />

      <p className="text-sm text-muted-foreground mb-6 -mt-4">
        {copy.intro}
      </p>

      <RepeatableGroup
        label={copy.groupLabel}
        items={state.legalDocuments}
        onAdd={() => dispatch({ type: 'ADD_REPEATABLE_ITEM', section: 'legalDocuments' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_REPEATABLE_ITEM', section: 'legalDocuments', index: i })}
        addLabel={copy.addLabel}
      >
        {(index) => {
          const docType = state.legalDocuments[index].documentType
          const helpText = getDocHelpText(docType, copy)
          return (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <SelectField
                  label={copy.documentType}
                  value={docType}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'documentType', value: v })}
                  options={localizeOptions(LEGAL_DOC_TYPES, t.options.legalDocTypes)}
                />
                <TextField
                  label={copy.lastUpdated}
                  value={state.legalDocuments[index].lastUpdated}
                  onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'lastUpdated', value: v })}
                  placeholder={copy.lastUpdatedPlaceholder}
                />
              </div>
              {helpText && (
                <p className="text-xs text-muted-foreground -mt-1">{helpText}</p>
              )}
              <TextField
                label={copy.whereIsIt}
                value={state.legalDocuments[index].location}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'location', value: v })}
                placeholder={getLocationPlaceholder(docType, copy)}
              />
              <TextArea
                label={copy.notes}
                value={state.legalDocuments[index].notes}
                onChange={(v) => dispatch({ type: 'UPDATE_REPEATABLE_ITEM', section: 'legalDocuments', index, field: 'notes', value: v })}
                placeholder={copy.notesPlaceholder}
                helpText={copy.notesHelp}
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
            <h4 className="text-sm font-semibold text-foreground mb-2">{copy.missingTitle}</h4>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
              {copy.missingBody}
            </p>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
              {copy.importantDocs}
            </p>
            <ul className="text-sm text-secondary-foreground space-y-1.5 mb-3">
              {[copy.will, copy.financialPoa, copy.healthcarePoa, copy.advanceDirective].map((item, index) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary font-medium">{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {copy.missingFooter}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
