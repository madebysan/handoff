import { useState } from 'react'
import { Copy, Check, Users } from 'lucide-react'
import { useI18n } from '../../i18n'

export default function DoItTogetherInvite() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://handoff.app'
  const inviteText = t.invite.text(origin)

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
          <Users className="w-5 h-5 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{t.invite.title}</h2>
      </div>

      <p className="text-secondary-foreground leading-relaxed mb-4">
        {t.invite.body}
      </p>

      <div className="bg-white rounded-xl border border-border p-5 relative shadow-theme">
        <p className="text-sm text-secondary-foreground whitespace-pre-line pr-10">
          {inviteText}
        </p>
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
          title={t.invite.copyTitle}
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        {t.invite.footer}
      </p>
    </div>
  )
}
