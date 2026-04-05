import ClientDashboardCards from '@/components/portal/ClientDashboardCards'
import SetupNotice from '@/components/ui/SetupNotice'
import StatusTimeline from '@/components/portal/StatusTimeline'
import { getAuthContext } from '@/lib/auth/guards'
import { getPortalDashboard } from '@/lib/db/queries'
import { isSupabaseConfigured } from '@/lib/auth/config'

export default async function PortalDashboardPage() {
  const context = await getAuthContext()

  if (!isSupabaseConfigured() || !context.user) {
    return (
      <SetupNotice
        title="Connect Supabase to enable the portal"
        description="Add your Supabase URL, anon key, Turnstile settings, and run the SQL migration before testing the client portal."
      />
    )
  }

  const snapshot = await getPortalDashboard(context.user.id)

  return (
    <div className="space-y-8">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
          Client portal
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-ff-text">
          Welcome back
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ff-muted">
          Resume your application, upload supporting files, and track every status change from draft through final decision.
        </p>
      </section>

      <ClientDashboardCards
        application={snapshot.application}
        documents={snapshot.documents}
        sections={snapshot.sections}
      />

      <StatusTimeline
        currentStatus={snapshot.application?.status}
        history={snapshot.history}
      />
    </div>
  )
}
