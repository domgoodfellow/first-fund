import ApplicationStepper from '@/components/portal/ApplicationStepper'
import SetupNotice from '@/components/ui/SetupNotice'
import { getAuthContext } from '@/lib/auth/guards'
import { getPortalDashboard } from '@/lib/db/queries'
import { isSupabaseConfigured } from '@/lib/auth/config'

export default async function PortalApplicationPage() {
  const context = await getAuthContext()

  if (!isSupabaseConfigured() || !context.user) {
    return (
      <SetupNotice
        title="Connect Supabase to enable secure applications"
        description="This workspace needs Supabase Auth, Postgres, and Storage configured before draft applications can be created and saved."
      />
    )
  }

  const snapshot = await getPortalDashboard(context.user.id)

  if (!snapshot.application) {
    return (
      <SetupNotice
        title="Application setup is incomplete"
        description="The portal could not create a draft application. Check your migration and profile trigger setup."
      />
    )
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
          Application workspace
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-ff-text">
          Complete your financing profile
        </h1>
      </section>

      <ApplicationStepper
        application={snapshot.application}
        sections={snapshot.sections}
        documents={snapshot.documents}
      />
    </div>
  )
}
