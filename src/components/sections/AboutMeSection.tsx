import { useInterview } from '../../hooks/useInterview'
import { getSection, DOCUMENT_REASONS } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import SelectField from '../interview/fields/SelectField'
import TextArea from '../interview/fields/TextArea'
import { Phone } from 'lucide-react'

export default function AboutMeSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('aboutMe')

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'aboutMe', field, value })
  }

  return (
    <div>
      <SectionIntro {...section} />

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Your full name"
          value={state.aboutMe.fullName}
          onChange={(v) => update('fullName', v)}
          placeholder="As you'd like it on the document"
        />
        <TextField
          label="Date of birth"
          value={state.aboutMe.dateOfBirth}
          onChange={(v) => update('dateOfBirth', v)}
          placeholder="e.g., March 15, 1982"
        />
      </div>

      <TextField
        label="Where do you live?"
        value={state.aboutMe.location}
        onChange={(v) => update('location', v)}
        placeholder="City, Region — e.g., San Francisco, CA or London, UK"
        helpText="Optional. Helps with region-specific legal considerations. Leave blank if you'd rather not say."
      />

      <SelectField
        label="Why are you creating this?"
        value={state.aboutMe.reason}
        onChange={(v) => update('reason', v)}
        options={DOCUMENT_REASONS}
        placeholder="Select a reason..."
      />

      <TextField
        label="Who is this document for?"
        value={state.aboutMe.intendedFor}
        onChange={(v) => update('intendedFor', v)}
        placeholder="e.g., My spouse David, my kids Emma and Jack, my sister Lisa"
        helpText="The people who will need this information"
      />

      <TextArea
        label="Anything else you want to say upfront?"
        value={state.aboutMe.personalContext}
        onChange={(v) => update('personalContext', v)}
        placeholder={"Optional. Share why now, what prompted this, or a few words about yourself.\n\ne.g., \"I'm 42, married to David, and we have two kids. After a friend's sudden passing, I realized our family had no idea where anything was.\""}
      />

      {/* Crisis resources — shown when a sensitive reason is selected */}
      {(state.aboutMe.reason === 'Recent health diagnosis' ||
        state.aboutMe.reason === 'Major life change (marriage, baby, divorce)') && (
        <div className="mt-6 flex items-start gap-3 px-4 py-3 rounded-md bg-card border border-input">
          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            If you or someone you know is in crisis, call or text <strong className="text-foreground">988</strong> (Suicide & Crisis Lifeline) or text <strong className="text-foreground">HOME</strong> to <strong className="text-foreground">741741</strong> (Crisis Text Line). You are not alone.
          </p>
        </div>
      )}
    </div>
  )
}
