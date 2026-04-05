'use client'

import { useState } from 'react'

interface AdminNoteComposerProps {
  applicationId: string
}

export default function AdminNoteComposer({
  applicationId,
}: AdminNoteComposerProps) {
  const [body, setBody] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, body }),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to save note.')
      }
      setBody('')
      setMessage('Internal note saved.')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to save note.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
        Internal notes
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900">
        Add an underwriting note
      </h2>

      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={5}
        className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
        placeholder="Document requests, risk observations, follow-up items, or lender notes"
      />

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting || !body.trim()}
        className="mt-6 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save note'}
      </button>
    </form>
  )
}
