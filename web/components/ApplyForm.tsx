'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCountry } from '@/contexts/CountryContext'

const INDUSTRIES = [
  'Retail', 'Restaurant / Food & Beverage', 'E-commerce', 'Healthcare',
  'Construction', 'Manufacturing', 'Professional Services', 'Automotive',
  'Hospitality / Hotel', 'Technology', 'Transportation', 'Beauty / Wellness', 'Other',
]

type FormData = {
  companyName: string
  fullName: string
  email: string
  phone: string
  revenue: string
  yearsRegistered: string
  industry: string
  referredBy: string
  smsConsent1: boolean
  smsConsent2: boolean
}

const EMPTY: FormData = {
  companyName: '', fullName: '', email: '', phone: '',
  revenue: '', yearsRegistered: '', industry: '', referredBy: '',
  smsConsent1: false, smsConsent2: false,
}

const required = ['fullName', 'email', 'revenue', 'yearsRegistered', 'industry', 'referredBy'] as const

function requiredFields(data: FormData) {
  return required.every((k) => !!data[k])
}


export default function ApplyForm() {
  const { t, brandName } = useCountry()
  const f = t.apply.fields
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)

  const filled = required.filter((k) => !!form[k]).length
  const progress = Math.round((filled / required.length) * 100)

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!requiredFields(form)) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="min-h-screen bg-ff-bg flex items-center justify-center pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-ff-raised border-2 border-ff-accent flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-ff-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-white mb-3">Application Received!</h2>
          <p className="text-ff-muted mb-8">Our team will review your file and reach out within 24 hours. Welcome to {brandName}.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-ff-accent text-sm underline underline-offset-4"
          >
            Submit another application
          </button>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="no-snap min-h-screen bg-ff-bg pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-3">{t.apply.heading}</h1>
          <p className="text-ff-muted">{t.apply.sub}</p>
        </motion.div>

        {/* Form + vertical progress sidebar */}
        <div className="flex gap-6 items-start justify-center">

          {/* Invisible spacer — balances sidebar so form stays centered */}
          <div className="hidden md:block w-8 shrink-0" />

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex-1 min-w-0 bg-ff-surface border border-ff-border rounded-2xl p-7 md:p-10 space-y-6"
          >
            {/* Company + Full Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label={f.companyName} value={form.companyName} onChange={set('companyName')} placeholder="Acme Corp" />
              <Field label={`${f.fullName} *`} value={form.fullName} onChange={set('fullName')} placeholder="Jane Smith" required />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label={`${f.email} *`} type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" required />
              <Field label={f.phone} type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
            </div>

            {/* Monthly Revenue */}
            <SelectField
              label={`${f.revenue.label} *`}
              value={form.revenue}
              onChange={set('revenue')}
              options={f.revenue.options}
              required
            />

            {/* Years Registered */}
            <SelectField
              label={`${f.yearsRegistered.label} *`}
              value={form.yearsRegistered}
              onChange={set('yearsRegistered')}
              options={f.yearsRegistered.options}
              required
            />

            {/* Industry */}
            <SelectField
              label={`${f.industry} *`}
              value={form.industry}
              onChange={set('industry')}
              options={INDUSTRIES}
              required
            />

            {/* Referred By */}
            <Field
              label={`${f.referredBy} *`}
              value={form.referredBy}
              onChange={set('referredBy')}
              placeholder="Name or company"
              required
            />

            {/* SMS Consents */}
            <div className="space-y-4 pt-2 border-t border-ff-border">
              <ConsentCheckbox
                id="sms1"
                checked={form.smsConsent1}
                onChange={set('smsConsent1')}
                label={f.smsConsent1}
              />
              <ConsentCheckbox
                id="sms2"
                checked={form.smsConsent2}
                onChange={set('smsConsent2')}
                label={f.smsConsent2}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!requiredFields(form)}
              className="w-full bg-ff-accent text-ff-bg font-bold text-base py-4 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed animate-pulse-glow"
            >
              {f.submit}
            </button>

            <p className="text-ff-muted text-xs text-center">
              By submitting, you agree to our{' '}
              <a href="/terms" className="text-ff-accent underline underline-offset-2">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-ff-accent underline underline-offset-2">Privacy Policy</a>.
            </p>
          </motion.form>

          {/* Vertical progress bar — desktop only */}
          <div className="hidden md:flex sticky top-28 flex-col items-center self-start w-8 shrink-0 pt-1">
            <div className="relative w-0.5 bg-ff-border rounded-full" style={{ height: '320px' }}>
              {/* Fill */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-ff-accent to-ff-glow rounded-full origin-top"
                animate={{ height: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              {/* Single moving dot with percentage */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ top: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-ff-accent border-2 border-ff-bg shadow-[0_0_10px_rgba(0,167,62,0.8)]" />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-ff-accent text-[10px] font-bold tabular-nums whitespace-nowrap">
                  {progress}%
                </span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function Field({
  label, value, onChange, type = 'text', placeholder, required,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-ff-bg border border-ff-border rounded-lg px-4 py-3 text-white placeholder:text-ff-muted text-sm focus:outline-none focus:border-ff-accent transition-colors"
      />
    </div>
  )
}

function SelectField({
  label, value, onChange, options, required,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: readonly string[]
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="bg-ff-bg border border-ff-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-ff-accent transition-colors appearance-none cursor-pointer"
        style={{ color: value ? '#fcfcfc' : '#8b8b8b' }}
      >
        <option value="" disabled>Select an option</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-white bg-ff-surface">{o}</option>
        ))}
      </select>
    </div>
  )
}

function ConsentCheckbox({
  id, checked, onChange, label,
}: {
  id: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}) {
  return (
    <label htmlFor={id} className="flex gap-3 cursor-pointer group">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 w-4 h-4 shrink-0 rounded border-ff-border bg-ff-bg accent-ff-accent cursor-pointer"
      />
      <span className="text-ff-muted text-xs leading-relaxed group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  )
}
