'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PortalSettingsPage() {
  const { language, setLanguage, t } = useLanguage()
  const [market, setMarket] = useState<'us' | 'ca'>('us')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave(event: React.FormEvent) {
    event.preventDefault()
    setIsSaving(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/profile/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, market }),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error ?? t.portal.errors.generic)
      }
      setMessage(t.portal.settings.saved)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.portal.errors.generic)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="max-w-2xl rounded-2xl border border-ff-border bg-white p-8 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
        {t.portal.settings.eyebrow}
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold text-ff-text">
        {t.portal.settings.title}
      </h1>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="block text-ff-muted text-xs font-semibold uppercase tracking-wide">
            {t.portal.settings.language}
          </span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'en' | 'es')}
            className="rounded-xl border border-ff-border bg-ff-bg px-4 py-3 text-sm text-ff-text"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="block text-ff-muted text-xs font-semibold uppercase tracking-wide">
            {t.portal.settings.market}
          </span>
          <select
            value={market}
            onChange={(event) => setMarket(event.target.value === 'ca' ? 'ca' : 'us')}
            className="rounded-xl border border-ff-border bg-ff-bg px-4 py-3 text-sm text-ff-text"
          >
            <option value="us">United States</option>
            <option value="ca">Canada</option>
          </select>
        </label>
      </div>

      {error ? <p className="mt-6 text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="mt-6 text-sm text-emerald-700">{message}</p> : null}

      <button
        type="submit"
        disabled={isSaving}
        className="mt-8 rounded-xl bg-ff-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ff-glow disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving ? t.portal.settings.saving : t.portal.settings.save}
      </button>
    </form>
  )
}
