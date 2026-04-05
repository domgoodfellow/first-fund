import DocumentReviewList from '@/components/admin/DocumentReviewList'
import SetupNotice from '@/components/ui/SetupNotice'
import { getAdminDocuments } from '@/lib/db/queries'
import { isSupabaseConfigured } from '@/lib/auth/config'

export default async function AdminDocumentsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SetupNotice
        title="Connect Supabase to review documents"
        description="Uploaded files and signed access links depend on the private storage bucket and document metadata table."
      />
    )
  }

  const documents = await getAdminDocuments()
  return <DocumentReviewList documents={documents} />
}
