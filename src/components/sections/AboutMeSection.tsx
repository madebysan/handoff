import { useInterview } from '../../hooks/useInterview'
import { getSection, DOCUMENT_REASONS } from '../../lib/interview-data'
import { localizeOptions, useI18n } from '../../i18n'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import TextArea from '../interview/fields/TextArea'
import { Phone } from 'lucide-react'

export default function AboutMeSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('aboutMe', t)
  const copy = t.forms.aboutMe

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'aboutMe', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label={copy.fullName}
          value={state.aboutMe.fullName}
          onChange={(v) => update('fullName', v)}
          placeholder={copy.fullNamePlaceholder}
        />
        <TextField
          label={copy.dateOfBirth}
          value={state.aboutMe.dateOfBirth}
          onChange={(v) => update('dateOfBirth', v)}
          placeholder={copy.dateOfBirthPlaceholder}
        />
      </div>

      <TextField
        label={copy.location}
        value={state.aboutMe.location}
        onChange={(v) => update('location', v)}
        placeholder={copy.locationPlaceholder}
        helpText={copy.locationHelp}
      />

      <SelectField
        label={copy.reason}
        value={state.aboutMe.reason}
        onChange={(v) => update('reason', v)}
        options={localizeOptions(DOCUMENT_REASONS, t.options.documentReasons)}
        placeholder={copy.reasonPlaceholder}
      />

      <TextField
        label={copy.intendedFor}
        value={state.aboutMe.intendedFor}
        onChange={(v) => update('intendedFor', v)}
        placeholder={copy.intendedForPlaceholder}
        helpText={copy.intendedForHelp}
      />

      <TextArea
        label={copy.personalContext}
        value={state.aboutMe.personalContext}
        onChange={(v) => update('personalContext', v)}
        placeholder={copy.personalContextPlaceholder}
        helpText={copy.personalContextHelp}
      />

      {/* Crisis resources — shown when a sensitive reason is selected */}
      {(state.aboutMe.reason === 'Recent health diagnosis' ||
        state.aboutMe.reason === 'Major life change (marriage, baby, divorce)') && (
        <div className="mt-6 flex items-start gap-3 px-4 py-3 rounded-md bg-card border border-input">
          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {copy.crisis}
          </p>
        </div>
      )}
    </div>
  )
}
