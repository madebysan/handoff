import { FolderOpen, Share2, Calendar } from 'lucide-react'

export default function GuidanceSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-charcoal mb-6">What to do with your document</h2>

      <div className="space-y-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-sage-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <FolderOpen className="w-5 h-5 text-sage-dark" />
          </div>
          <div>
            <h3 className="font-semibold text-charcoal mb-2">Store it safely</h3>
            <ul className="text-charcoal-light space-y-1.5 text-sm leading-relaxed">
              <li>Print a copy and keep it in a fireproof safe or filing cabinet</li>
              <li>Save a digital copy in cloud storage shared with your intended recipient</li>
              <li>Give a copy to your attorney alongside your will</li>
              <li>Put a copy on a USB drive in a safe deposit box or give it to a trusted person</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 bg-sage-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Share2 className="w-5 h-5 text-sage-dark" />
          </div>
          <div>
            <h3 className="font-semibold text-charcoal mb-2">Share it wisely</h3>
            <ul className="text-charcoal-light space-y-1.5 text-sm leading-relaxed">
              <li><strong>Immediate share:</strong> Give the document directly to your spouse, partner, or executor now</li>
              <li><strong>Sealed envelope:</strong> Print it, seal it with instructions, give to your attorney or place in your safe</li>
              <li><strong>The family conversation:</strong> Use this document to start a family discussion about the plan</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 bg-sage-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Calendar className="w-5 h-5 text-sage-dark" />
          </div>
          <div>
            <h3 className="font-semibold text-charcoal mb-2">Keep it current</h3>
            <p className="text-charcoal-light text-sm leading-relaxed">
              Revisit and regenerate your document annually or after major life events: marriage, divorce, birth of a child, home purchase, new accounts, job change. Handoff is always here when you need to update it.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
