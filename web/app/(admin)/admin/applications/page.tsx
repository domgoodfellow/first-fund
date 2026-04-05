import ApplicationsTable from '@/components/admin/ApplicationsTable'
import SetupNotice from '@/components/ui/SetupNotice'
import { getAdminApplications } from '@/lib/db/queries'
import { isSupabaseConfigured } from '@/lib/auth/config'

export default async function AdminApplicationsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SetupNotice
        title="Connect Supabase to review applications"
        description="Admin tools depend on the Supabase schema, storage bucket, and profile roles defined in the rollout migration."
      />
    )
  }

  const applications = await getAdminApplications()

  return (
    <div className="space-y-8">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
          Admin
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-slate-900">
          Application queue
        </h1>
      </section>

      <ApplicationsTable applications={applications} />
    </div>
  )
}
