import { useState } from 'react'
import { Copy, Check, Users } from 'lucide-react'

const INVITE_TEXT = `I just used Handoff to organize all my important information for our family — accounts, documents, contacts, everything they'd need to know. It took about 30 minutes.

You should do one too. It's free, nothing gets stored online, and you keep the document yourself.

Here's the link: ${typeof window !== 'undefined' ? window.location.origin : 'https://handoff.app'}`

export default function DoItTogetherInvite() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(INVITE_TEXT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
          <Users className="w-5 h-5 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Do it together</h2>
      </div>

      <p className="text-secondary-foreground leading-relaxed mb-4">
        Thinking about sharing this with a parent or partner? The easiest way to start that conversation is to do it yourself first, then share. Here's a message you can copy and send:
      </p>

      <div className="bg-white rounded-xl border border-border p-5 relative shadow-theme">
        <p className="text-sm text-secondary-foreground whitespace-pre-line pr-10">
          {INVITE_TEXT}
        </p>
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
          title="Copy invite text"
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        The best way to start this conversation isn't "you need to do this." It's "I just did this — want to do yours?"
      </p>
    </div>
  )
}
