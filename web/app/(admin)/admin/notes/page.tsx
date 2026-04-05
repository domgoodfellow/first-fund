import SetupNotice from '@/components/ui/SetupNotice'
import { getAdminNotes } from '@/lib/db/queries'
import { isSupabaseConfigured } from '@/lib/auth/config'

export default async function AdminNotesPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SetupNotice
        title="Connect Supabase to review notes"
        description="Internal underwriting notes live in the secure admin-only application_notes table."
      />
    )
  }

  const notes = await getAdminNotes()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
        Notes
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold text-slate-900">
        Internal note stream
      </h1>

      <div className="mt-6 space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-sm text-slate-800">{note.body}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-500">
              {note.created_at ? new Date(note.created_at).toLocaleString() : 'Pending timestamp'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
