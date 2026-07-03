import { MessageCircle, FolderOpen, Share2, Calendar } from 'lucide-react'
import { useI18n } from '../../i18n'

export default function GuidanceSection() {
  const { t } = useI18n()

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">{t.guidance.title}</h2>

      <div className="space-y-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
            <MessageCircle className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">{t.guidance.tellTitle}</h3>
            <ul className="text-secondary-foreground space-y-1.5 text-sm leading-relaxed">
              {t.guidance.tellItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
            <FolderOpen className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">{t.guidance.storeTitle}</h3>
            <ul className="text-secondary-foreground space-y-1.5 text-sm leading-relaxed">
              {t.guidance.storeItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
            <Share2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">{t.guidance.shareTitle}</h3>
            <ul className="text-secondary-foreground space-y-1.5 text-sm leading-relaxed">
              {t.guidance.shareItems.map(item => (
                <li key={item.label}><strong>{item.label}</strong> {item.body}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
            <Calendar className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">{t.guidance.currentTitle}</h3>
            <p className="text-secondary-foreground text-sm leading-relaxed">
              {t.guidance.currentBody}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
