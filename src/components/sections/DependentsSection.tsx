import { useInterview } from '../../hooks/useInterview'
import { getSection } from '../../lib/interview-data'
import { useI18n } from '../../i18n'
import SectionIntro from '../interview/SectionIntro'
import TextArea from '../interview/fields/TextArea'

export default function DependentsSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('dependents', t)
  const copy = t.forms.dependents

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'dependents', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <TextArea
        label={copy.minorChildren}
        value={state.dependents.minorChildren}
        onChange={(v) => update('minorChildren', v)}
        placeholder={copy.minorChildrenPlaceholder}
        helpText={copy.minorChildrenHelp}
      />

      <TextArea
        label={copy.guardianship}
        value={state.dependents.guardianshipPreferences}
        onChange={(v) => update('guardianshipPreferences', v)}
        placeholder={copy.guardianshipPlaceholder}
        helpText={copy.guardianshipHelp}
      />

      <TextArea
        label={copy.elderly}
        value={state.dependents.elderlyDependents}
        onChange={(v) => update('elderlyDependents', v)}
        placeholder={copy.elderlyPlaceholder}
      />

      <TextArea
        label={copy.pets}
        value={state.dependents.pets}
        onChange={(v) => update('pets', v)}
        placeholder={copy.petsPlaceholder}
      />

      <TextArea
        label={copy.specialNeeds}
        value={state.dependents.specialNeeds}
        onChange={(v) => update('specialNeeds', v)}
        placeholder={copy.specialNeedsPlaceholder}
      />

      <TextArea
        label={copy.otherCare}
        value={state.dependents.otherCareNotes}
        onChange={(v) => update('otherCareNotes', v)}
        placeholder={copy.otherCarePlaceholder}
      />
    </div>
  )
}
