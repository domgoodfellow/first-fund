import SetupNotice from '@/components/ui/SetupNotice'
import { getAdminClients } from '@/lib/db/queries'
import { isSupabaseConfigured } from '@/lib/auth/config'

export default async function AdminClientsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SetupNotice
        title="Connect Supabase to review clients"
        description="Client records are sourced from the profiles table created by the rollout migration."
      />
    )
  }

  const clients = await getAdminClients()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
        Clients
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold text-slate-900">
        Client directory
      </h1>

      <div className="mt-6 space-y-3">
        {clients.map((client) => (
          <div key={client.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-sm font-semibold text-slate-900">{client.email}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
              {client.market.toUpperCase()} · {client.language.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
