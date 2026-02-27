import { MessageCircle, FolderOpen, Share2, Calendar } from 'lucide-react'

export default function GuidanceSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">What to do with your document</h2>

      <div className="space-y-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
            <MessageCircle className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Tell someone it exists</h3>
            <ul className="text-secondary-foreground space-y-1.5 text-sm leading-relaxed">
              <li>The most important step: tell at least one trusted person that this document exists and where to find it</li>
              <li>If nobody knows it's there, it can't help your family when they need it</li>
              <li>Consider telling your executor, spouse/partner, or closest family member</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
            <FolderOpen className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Store it safely</h3>
            <ul className="text-secondary-foreground space-y-1.5 text-sm leading-relaxed">
              <li>Print a copy and keep it in a fireproof safe or filing cabinet</li>
              <li>Save a digital copy in cloud storage shared with your intended recipient</li>
              <li>Give a copy to your attorney alongside your will</li>
              <li>Put a copy on a USB drive in a safe deposit box or give it to a trusted person</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
            <Share2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Share it wisely</h3>
            <ul className="text-secondary-foreground space-y-1.5 text-sm leading-relaxed">
              <li><strong>Immediate share:</strong> Give the document directly to your spouse, partner, or executor now</li>
              <li><strong>Sealed envelope:</strong> Print it, seal it with instructions, give to your attorney or place in your safe</li>
              <li><strong>The family conversation:</strong> Use this document to start a family discussion about the plan</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
            <Calendar className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Keep it current</h3>
            <p className="text-secondary-foreground text-sm leading-relaxed">
              Revisit and regenerate your document annually or after major life events: marriage, divorce, birth of a child, home purchase, new accounts, job change. Handoff is always here when you need to update it.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
