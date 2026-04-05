'use client'

import { useState } from 'react'
import type { ApplicationStatus } from '@/lib/types'

interface StatusChangeFormProps {
  applicationId: string
  currentStatus: ApplicationStatus
}

const STATUS_OPTIONS: ApplicationStatus[] = [
  'draft',
  'submitted',
  'under_review',
  'needs_documents',
  'approved',
  'declined',
]

export default function StatusChangeForm({
  applicationId,
  currentStatus,
}: StatusChangeFormProps) {
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus)
  const [note, setNote] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, status, note }),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to update status.')
      }
      setMessage('Application status updated.')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to update status.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
        Status controls
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900">
        Move the application forward
      </h2>

      <div className="mt-6 space-y-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Status
          </span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ApplicationStatus)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Note
          </span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={4}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
            placeholder="Optional note about this status change"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save status'}
      </button>
    </form>
  )
}
