import AdminNoteComposer from '@/components/admin/AdminNoteComposer'
import ApplicationReviewPanel from '@/components/admin/ApplicationReviewPanel'
import DocumentReviewList from '@/components/admin/DocumentReviewList'
import StatusChangeForm from '@/components/admin/StatusChangeForm'
import SetupNotice from '@/components/ui/SetupNotice'
import { getAdminApplicationDetail } from '@/lib/db/queries'
import { isSupabaseConfigured } from '@/lib/auth/config'

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!isSupabaseConfigured()) {
    return (
      <SetupNotice
        title="Connect Supabase to review applications"
        description="This page needs the application tables, document metadata, and admin note policies available."
      />
    )
  }

  const detail = await getAdminApplicationDetail(id)

  if (!detail.application) {
    return (
      <SetupNotice
        title="Application not found"
        description="The requested application could not be loaded. Check the application ID and database records."
      />
    )
  }

  return (
    <div className="space-y-8">
      <ApplicationReviewPanel
        application={detail.application}
        clientProfile={detail.clientProfile}
        sections={detail.sections}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <DocumentReviewList documents={detail.documents} />
        <div className="space-y-6">
          <StatusChangeForm
            applicationId={detail.application.id}
            currentStatus={detail.application.status}
          />
          <AdminNoteComposer applicationId={detail.application.id} />
        </div>
      </div>
    </div>
  )
}
