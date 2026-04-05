import DocumentUploader from '@/components/portal/DocumentUploader'
import SetupNotice from '@/components/ui/SetupNotice'
import { getAuthContext } from '@/lib/auth/guards'
import { getPortalDashboard } from '@/lib/db/queries'
import { isSupabaseConfigured } from '@/lib/auth/config'

export default async function PortalDocumentsPage() {
  const context = await getAuthContext()

  if (!isSupabaseConfigured() || !context.user) {
    return (
      <SetupNotice
        title="Connect Supabase to enable document uploads"
        description="Private storage, signed upload URLs, and metadata writes all depend on the Supabase integration being configured."
      />
    )
  }

  const snapshot = await getPortalDashboard(context.user.id)

  if (!snapshot.application) {
    return (
      <SetupNotice
        title="Create a draft application first"
        description="Documents are attached to a specific application. Open the application workspace to generate your draft."
      />
    )
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
          Secure uploads
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-ff-text">
          Manage supporting documents
        </h1>
      </section>

      <DocumentUploader
        applicationId={snapshot.application.id}
        initialDocuments={snapshot.documents}
      />
    </div>
  )
}
