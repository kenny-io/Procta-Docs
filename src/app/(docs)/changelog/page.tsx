import { DocLayout } from '@/components/docs/doc-layout'
import type { DocEntry } from '@/data/docs'

const Placeholder = () => null

const doc: DocEntry = {
  id: 'changelog',
  title: 'Changelog',
  description: 'Track notable improvements to the Procta platform.',
  slug: ['changelog'],
  href: '/changelog',
  group: 'Updates',
  keywords: ['changelog'],
  component: Placeholder,
  timeEstimate: '2 min',
  lastUpdated: new Date().toISOString().slice(0, 10),
}

export const metadata = {
  title: doc.title,
  description: doc.description,
}

export default function ChangelogPage() {

  return (
    <DocLayout doc={doc}>
      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold">v0.2.0</h2>
          <p className="text-sm text-foreground/60">KYB for organizations, email verification, and improved validation.</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-foreground/80">
            <li>Organization owners can now submit KYB documents (business name, registration, CEO details, LinkedIn)</li>
            <li>New <code>PENDING_REVIEW</code> verification status for KYB submissions awaiting admin review</li>
            <li>Organization owners can create up to 1 agent while KYB is pending review</li>
            <li>Email OTP verification required before dashboard login</li>
            <li>Admin endpoints for reviewing and approving/rejecting KYB submissions</li>
            <li>Presigned R2 uploads for KYB business documents</li>
            <li>Improved URL validation with auto-prepend <code>https://</code> for website and LinkedIn fields</li>
            <li>Human-readable validation error messages on KYB submission</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">v0.1.0</h2>
          <p className="text-sm text-foreground/60">Initial release of the Procta trust and attestation platform.</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-foreground/80">
            <li>Owner registration with KYC verification via Sumsub</li>
            <li>Agent lifecycle management — create, suspend, revoke, reinstate</li>
            <li>Verifiable credential issuance and verification (W3C JWT)</li>
            <li>Real-time agent action verification with scope and limit checks</li>
            <li>Audit trail with pagination and CSV export</li>
            <li>Relying party registration and API key management</li>
            <li>Agent profile image uploads via Cloudflare R2</li>
            <li>Agent lookup and verified agents listing endpoints</li>
          </ul>
        </div>
      </div>
    </DocLayout>
  )
}

