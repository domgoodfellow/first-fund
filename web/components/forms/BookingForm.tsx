'use client'

import { useState } from 'react'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'

interface FormState {
  fullName: string
  businessName: string
  email: string
  phone: string
  fundingGoal: string
  callTime: string
  notes: string
}

export default function BookingForm() {
  const { t } = useLanguage()
  const f = t.bookACallPage.form

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
        <h3 className="font-heading text-2xl font-bold text-ff-text mb-2">{f.successHeading}</h3>
        <p className="text-ff-muted text-sm mb-6">{f.successMessage}</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ fullName: '', businessName: '', email: '', phone: '', fundingGoal: '', callTime: '', notes: '' }) }}
          className="text-ff-accent text-sm hover:underline"
        >
          {f.submitAnother}
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
            <label className={labelClass}>{f.labels.fullName}{f.required}</label>
            <input className={inputClass} placeholder={f.placeholders.fullName} value={form.fullName} onChange={set('fullName')} required />
          </div>
          <div>
            <label className={labelClass}>{f.labels.businessName}</label>
            <input className={inputClass} placeholder={f.placeholders.businessName} value={form.businessName} onChange={set('businessName')} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{f.labels.email}{f.required}</label>
            <input type="email" className={inputClass} placeholder={f.placeholders.email} value={form.email} onChange={set('email')} required />
          </div>
          <div>
            <label className={labelClass}>{f.labels.phone}{f.required}</label>
            <input type="tel" className={inputClass} placeholder={f.placeholders.phone} value={form.phone} onChange={set('phone')} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>{f.labels.fundingGoal}{f.required}</label>
          <select className={inputClass} value={form.fundingGoal} onChange={set('fundingGoal')} required>
            <option value="">{f.placeholders.selectFunding}</option>
            {f.fundingGoals.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>{f.labels.callTime}{f.required}</label>
          <select className={inputClass} value={form.callTime} onChange={set('callTime')} required>
            <option value="">{f.placeholders.selectTime}</option>
            {f.callTimes.map((ct) => <option key={ct}>{ct}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>{f.labels.notes}</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            placeholder={f.placeholders.notes}
            value={form.notes}
            onChange={set('notes')}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-ff-accent text-white font-bold text-sm py-3.5 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_1px_3px_rgba(30,64,175,0.3)]"
        >
          {f.submitBtn}
        </button>
        <p className="text-ff-muted text-xs text-center">{f.note}</p>
      </form>
    </BlurFade>
  )
}
