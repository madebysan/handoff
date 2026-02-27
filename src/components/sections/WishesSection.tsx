import { useInterview } from '../../hooks/useInterview'
import { getSection } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextArea from '../interview/fields/TextArea'

export default function WishesSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('wishes')

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'wishes', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <div className="bg-accent/50 rounded-md p-4 mb-8 text-sm text-secondary-foreground">
        Take a moment with this section. There are no right or wrong answers — just what matters to you. Many people find this section unexpectedly meaningful.
      </div>

      <TextArea
        label="Healthcare & end-of-life wishes"
        value={state.wishes.healthcareWishes}
        onChange={(v) => update('healthcareWishes', v)}
        placeholder="DNR preferences, wishes about life support, ventilators, feeding tubes, or medical treatments you want or want to avoid..."
        helpText="Even if you have an advance directive, writing your wishes here in plain language helps your family understand your intent"
      />

      <TextArea
        label="Funeral or memorial preferences"
        value={state.wishes.funeralPreferences}
        onChange={(v) => update('funeralPreferences', v)}
        placeholder="Burial or cremation? Any specific wishes for a service? Music, readings, location? Do you want a celebration of life, a traditional service, or something else entirely?"
      />

      <TextArea
        label="Organ donation"
        value={state.wishes.organDonation}
        onChange={(v) => update('organDonation', v)}
        placeholder="Are you registered as an organ donor? Any specific wishes about organ or tissue donation? e.g., Yes, registered through the DMV. I'm comfortable with any organ donation."
      />

      <TextArea
        label="Personal messages"
        value={state.wishes.personalMessages}
        onChange={(v) => update('personalMessages', v)}
        placeholder="Is there anything you want specific people to know? This could be as simple as 'Tell my kids I was proud of them' or as detailed as individual letters. Write whatever feels right."
        helpText="This is entirely optional, but many people find it the most meaningful part"
      />

      <TextArea
        label="Values and what matters most"
        value={state.wishes.valuesStatement}
        onChange={(v) => update('valuesStatement', v)}
        placeholder="What do you want your family to remember about what mattered to you? What principles guided your life? This is your chance to say it in your own words."
        helpText="Sometimes called an 'ethical will' — a statement of values rather than valuables"
      />

      <TextArea
        label="Anything else"
        value={state.wishes.otherWishes}
        onChange={(v) => update('otherWishes', v)}
        placeholder="Charitable giving wishes, specific instructions, or anything else your family should know about your preferences"
      />
    </div>
  )
}
