import { useInterview } from '../../hooks/useInterview'
import { getSection } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextArea from '../interview/fields/TextArea'

export default function DependentsSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('dependents')

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'dependents', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <TextArea
        label="Minor children"
        value={state.dependents.minorChildren}
        onChange={(v) => update('minorChildren', v)}
        placeholder="Names, ages, schools, any custody arrangements. Include anything a caregiver would need to know about their daily routine."
        helpText="If you have minor children, this may be the most important section"
      />

      <TextArea
        label="Guardianship preferences"
        value={state.dependents.guardianshipPreferences}
        onChange={(v) => update('guardianshipPreferences', v)}
        placeholder="Who would you want to raise your children if you couldn't? Have you discussed this with them? Is this documented in your will?"
        helpText="This is a preference, not a legal designation — but it helps guide your family"
      />

      <TextArea
        label="Elderly dependents"
        value={state.dependents.elderlyDependents}
        onChange={(v) => update('elderlyDependents', v)}
        placeholder="Do you care for or financially support any elderly family members? What does their care look like? Who else can step in?"
      />

      <TextArea
        label="Pets"
        value={state.dependents.pets}
        onChange={(v) => update('pets', v)}
        placeholder="Names, species, vet info, dietary needs, medications. Who would take care of them? e.g., Golden retriever named Max, Dr. Smith at Riverside Vet, takes daily joint supplement"
      />

      <TextArea
        label="Special needs or ongoing medical care"
        value={state.dependents.specialNeeds}
        onChange={(v) => update('specialNeeds', v)}
        placeholder="Any dependents with special needs, ongoing therapies, or medical considerations that a new caregiver would need to understand?"
      />

      <TextArea
        label="Other care notes"
        value={state.dependents.otherCareNotes}
        onChange={(v) => update('otherCareNotes', v)}
        placeholder="Anything else about the people or animals who depend on you"
      />
    </div>
  )
}
