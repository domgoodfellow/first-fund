'use client'

import { useState } from 'react'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'
import { Field, SelectField, TextareaField, SubmitButton } from './FormPrimitives'
import TurnstileWidget from './TurnstileWidget'

interface FormState {
  fullName: string
  businessName: string
  email: string
  phone: string
  fundingGoal: string
  callTime: string
  notes: string
}

const EMPTY: FormState = {
  fullName: '', businessName: '', email: '', phone: '',
  fundingGoal: '', callTime: '', notes: '',
}

export default function BookingForm() {
  const { t } = useLanguage()
  const f = t.bookACallPage.form

  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const isValid = !!(form.fullName && form.email && form.phone && form.fundingGoal && form.callTime)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/book-a-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          turnstileToken,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to submit the booking request.')
      }

      setSubmitted(true)
      setTurnstileToken('')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to submit the booking request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <BlurFade className="bg-ff-surface border border-ff-border-blue rounded-2xl p-10 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-ff-raised border-2 border-ff-accent flex items-center justify-center text-ff-accent mx-auto mb-5">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-ff-text mb-2">{f.successHeading}</h3>
        <p className="text-ff-muted text-sm mb-6">{f.successMessage}</p>
        <button
          onClick={() => { setSubmitted(false); setForm(EMPTY) }}
          className="text-ff-accent text-sm hover:underline"
        >
          {f.submitAnother}
        </button>
      </BlurFade>
    )
  }

  return (
    <BlurFade>
      <form onSubmit={handleSubmit} className="bg-ff-surface border border-ff-border rounded-2xl p-8 space-y-5 max-w-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label={`${f.labels.fullName}${f.required}`} value={form.fullName} onChange={set('fullName')} placeholder={f.placeholders.fullName} required />
          <Field label={f.labels.businessName} value={form.businessName} onChange={set('businessName')} placeholder={f.placeholders.businessName} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label={`${f.labels.email}${f.required}`} type="email" value={form.email} onChange={set('email')} placeholder={f.placeholders.email} required />
          <Field label={`${f.labels.phone}${f.required}`} type="tel" value={form.phone} onChange={set('phone')} placeholder={f.placeholders.phone} required />
        </div>

        <SelectField
          label={`${f.labels.fundingGoal}${f.required}`}
          value={form.fundingGoal}
          onChange={set('fundingGoal') as React.ChangeEventHandler<HTMLSelectElement>}
          options={f.fundingGoals}
          placeholder={f.placeholders.selectFunding}
          required
        />

        <SelectField
          label={`${f.labels.callTime}${f.required}`}
          value={form.callTime}
          onChange={set('callTime') as React.ChangeEventHandler<HTMLSelectElement>}
          options={f.callTimes}
          placeholder={f.placeholders.selectTime}
          required
        />

        <TextareaField
          label={f.labels.notes}
          value={form.notes}
          onChange={set('notes') as React.ChangeEventHandler<HTMLTextAreaElement>}
          placeholder={f.placeholders.notes}
          rows={3}
        />

        <TurnstileWidget onTokenChange={setTurnstileToken} />
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <SubmitButton label={isSubmitting ? `${f.submitBtn}...` : f.submitBtn} disabled={!isValid || isSubmitting || !turnstileToken} />
        <p className="text-ff-muted text-xs text-center">{f.note}</p>
      </form>
    </BlurFade>
  )
}
