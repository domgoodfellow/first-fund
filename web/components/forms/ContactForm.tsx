'use client'

import { useState } from 'react'
import BlurFade from '@/components/motion/BlurFade'

interface FormState {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

const SUBJECTS = [
  'General Inquiry',
  'Application Status',
  'Product Questions',
  'Partnership Opportunity',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ fullName: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const isValid = form.fullName && form.email && form.subject && form.message

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <BlurFade className="bg-ff-surface border border-ff-border-blue rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-ff-raised border-2 border-ff-accent flex items-center justify-center text-ff-accent mx-auto mb-5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-ff-text mb-2">Message Received</h3>
        <p className="text-ff-muted text-sm mb-6">Our team will get back to you within one business day.</p>
        <button onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', phone: '', subject: '', message: '' }) }} className="text-ff-accent text-sm hover:underline">
          Send another message
        </button>
      </BlurFade>
    )
  }

  const inputClass = 'w-full bg-ff-bg border border-ff-border text-ff-text placeholder:text-ff-muted text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-ff-accent focus:ring-1 focus:ring-ff-border-blue transition-colors'
  const labelClass = 'block text-ff-muted text-xs font-semibold mb-1.5 uppercase tracking-wide'

  return (
    <BlurFade>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input className={inputClass} placeholder="Jane Smith" value={form.fullName} onChange={set('fullName')} required />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" className={inputClass} placeholder="you@business.com" value={form.email} onChange={set('email')} required />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" className={inputClass} placeholder="+1 (555) 000-0000" value={form.phone} onChange={set('phone')} />
          </div>
          <div>
            <label className={labelClass}>Subject *</label>
            <select className={inputClass} value={form.subject} onChange={set('subject')} required>
              <option value="">Select a subject</option>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Message *</label>
          <textarea className={`${inputClass} resize-none`} rows={5} placeholder="Tell us how we can help..." value={form.message} onChange={set('message')} required />
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-ff-accent text-white font-bold text-sm py-3.5 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_1px_3px_rgba(30,64,175,0.3)]"
        >
          Send Message
        </button>
      </form>
    </BlurFade>
  )
}
