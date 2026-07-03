import { useInterview } from '../../hooks/useInterview'
import { getSection } from '../../lib/interview-data'
import { useI18n } from '../../i18n'
import SectionIntro from '../interview/SectionIntro'
import TextArea from '../interview/fields/TextArea'

export default function WishesSection() {
  const { state, dispatch } = useInterview()
  const { t } = useI18n()
  const section = getSection('wishes', t)
  const copy = t.forms.wishes

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'wishes', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <div className="bg-accent/50 rounded-md p-4 mb-8 text-sm text-secondary-foreground">
        {copy.intro}
      </div>

      <TextArea
        label={copy.healthcare}
        value={state.wishes.healthcareWishes}
        onChange={(v) => update('healthcareWishes', v)}
        placeholder={copy.healthcarePlaceholder}
        helpText={copy.healthcareHelp}
      />

      <TextArea
        label={copy.funeral}
        value={state.wishes.funeralPreferences}
        onChange={(v) => update('funeralPreferences', v)}
        placeholder={copy.funeralPlaceholder}
      />

      <TextArea
        label={copy.organDonation}
        value={state.wishes.organDonation}
        onChange={(v) => update('organDonation', v)}
        placeholder={copy.organDonationPlaceholder}
      />

      <TextArea
        label={copy.personalMessages}
        value={state.wishes.personalMessages}
        onChange={(v) => update('personalMessages', v)}
        placeholder={copy.personalMessagesPlaceholder}
        helpText={copy.personalMessagesHelp}
      />

      <TextArea
        label={copy.values}
        value={state.wishes.valuesStatement}
        onChange={(v) => update('valuesStatement', v)}
        placeholder={copy.valuesPlaceholder}
        helpText={copy.valuesHelp}
      />

      <TextArea
        label={copy.anythingElse}
        value={state.wishes.otherWishes}
        onChange={(v) => update('otherWishes', v)}
        placeholder={copy.anythingElsePlaceholder}
      />
    </div>
  )
}
