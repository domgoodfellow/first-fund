'use client'

import { useState } from 'react'
import BlurFade from '@/components/motion/BlurFade'

interface FormState {
  fullName: string
  businessName: string
  email: string
  phone: string
  fundingGoal: string
  callTime: string
  notes: string
}

const FUNDING_GOALS = ['$10,000 – $50,000', '$50,000 – $150,000', '$150,000 – $500,000', '$500,000+', 'Not sure yet']
const CALL_TIMES = ['Morning (9am – 12pm)', 'Afternoon (12pm – 3pm)', 'Late Afternoon (3pm – 6pm)', 'Flexible']

export default function BookingForm() {
  const [form, setForm] = useState<FormState>({
    fullName: '', businessName: '', email: '', phone: '',
    fundingGoal: '', callTime: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const isValid = form.fullName && form.email && form.phone && form.fundingGoal && form.callTime

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <BlurFade className="bg-ff-surface border border-ff-border-blue rounded-2xl p-10 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-ff-raised border-2 border-ff-accent flex items-center justify-center text-ff-accent mx-auto mb-5">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-ff-text mb-2">You are booked in!</h3>
        <p className="text-ff-muted text-sm mb-6">
          Our team will reach out to confirm your call time within a few hours. Check your email for next steps.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ fullName: '', businessName: '', email: '', phone: '', fundingGoal: '', callTime: '', notes: '' }) }}
          className="text-ff-accent text-sm hover:underline"
        >
          Submit another request
        </button>
      </BlurFade>
    )
  }

  const inputClass = 'w-full bg-ff-bg border border-ff-border text-ff-text placeholder:text-ff-muted text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-ff-accent focus:ring-1 focus:ring-ff-border-blue transition-colors'
  const labelClass = 'block text-ff-muted text-xs font-semibold mb-1.5 uppercase tracking-wide'

  return (
    <BlurFade>
      <form onSubmit={handleSubmit} className="bg-ff-surface border border-ff-border rounded-2xl p-8 space-y-5 max-w-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input className={inputClass} placeholder="Jane Smith" value={form.fullName} onChange={set('fullName')} required />
          </div>
          <div>
            <label className={labelClass}>Business Name</label>
            <input className={inputClass} placeholder="Acme Inc." value={form.businessName} onChange={set('businessName')} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" className={inputClass} placeholder="you@business.com" value={form.email} onChange={set('email')} required />
          </div>
          <div>
            <label className={labelClass}>Phone *</label>
            <input type="tel" className={inputClass} placeholder="+1 (555) 000-0000" value={form.phone} onChange={set('phone')} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Funding Goal *</label>
          <select className={inputClass} value={form.fundingGoal} onChange={set('fundingGoal')} required>
            <option value="">Select a range</option>
            {FUNDING_GOALS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Preferred Call Time *</label>
          <select className={inputClass} value={form.callTime} onChange={set('callTime')} required>
            <option value="">Select a time window</option>
            {CALL_TIMES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Anything else we should know?</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            placeholder="Brief context about your business or funding need..."
            value={form.notes}
            onChange={set('notes')}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-ff-accent text-white font-bold text-sm py-3.5 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_1px_3px_rgba(30,64,175,0.3)]"
        >
          Request My Call
        </button>
        <p className="text-ff-muted text-xs text-center">
          We will confirm within a few hours during business hours.
        </p>
      </form>
    </BlurFade>
  )
}
