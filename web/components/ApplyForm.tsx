'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage, brandName } from '@/contexts/LanguageContext'

/* ─── CONSTANTS ──────────────────────────────────────────── */

const TOTAL = 7

const INDUSTRIES = [
  'Retail', 'Restaurant / Food & Beverage', 'E-commerce', 'Healthcare',
  'Construction', 'Manufacturing', 'Professional Services', 'Automotive',
  'Hospitality / Hotel', 'Technology', 'Transportation', 'Beauty / Wellness', 'Other',
]

const BUSINESS_TYPES = [
  'Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'Other',
]

const PROVINCES_STATES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island',
  'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon',
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
]

const REVENUE_OPTIONS = [
  'Between $10,000 and $50,000',
  'Between $50,000 and $150,000',
  'More than $150,000',
]

const YEARS_OPTIONS = ['Less than 1 year', '1–5 years', '5 years or more']

const FUNDING_AMOUNTS = [
  '$10,000 – $50,000',
  '$50,000 – $150,000',
  '$150,000 – $500,000',
  '$500,000+',
]

const FUNDING_PURPOSES = [
  'Working Capital',
  'Equipment Purchase',
  'Business Expansion',
  'Inventory',
  'Debt Refinancing',
  'Other',
]

const ID_TYPES = ["Driver's License", 'Passport', 'Provincial ID / State ID']

const REFERRAL_OPTIONS = [
  'Facebook',
  'Instagram',
  'Friend',
  'Google',
  'Other',
]

/* ─── FORM DATA ──────────────────────────────────────────── */

type FormData = {
  // Slide 1 — Business Info
  companyName: string
  businessType: string
  industry: string
  website: string
  // Slide 2 — Address
  street: string
  city: string
  provinceState: string
  postalZip: string
  country: string
  // Slide 3 — Contact
  fullName: string
  email: string
  phone: string
  jobTitle: string
  // Slide 4 — Financials
  revenue: string
  yearsRegistered: string
  fundingAmount: string
  fundingPurpose: string
  // Slide 5 — ID Verification
  dob: string
  idType: string
  idNumber: string
  idIssuingProvince: string
  // Slide 6 — Documents (UI only, not uploaded)
  idFront: File | null
  idBack: File | null
  businessReg: File | null
  bankStatement1: File | null
  bankStatement2: File | null
  bankStatement3: File | null
  // Slide 7 — Referral & Consent
  referredBy: string
  smsConsent1: boolean
  smsConsent2: boolean
}

const EMPTY: FormData = {
  companyName: '', businessType: '', industry: '', website: '',
  street: '', city: '', provinceState: '', postalZip: '', country: '',
  fullName: '', email: '', phone: '', jobTitle: '',
  revenue: '', yearsRegistered: '', fundingAmount: '', fundingPurpose: '',
  dob: '', idType: '', idNumber: '', idIssuingProvince: '',
  idFront: null, idBack: null, businessReg: null,
  bankStatement1: null, bankStatement2: null, bankStatement3: null,
  referredBy: '', smsConsent1: false, smsConsent2: false,
}

/* ─── PER-SLIDE VALIDATION ───────────────────────────────── */

function slideValid(slide: number, form: FormData): boolean {
  switch (slide) {
    case 0: return !!(form.companyName && form.businessType && form.industry)
    case 1: return !!(form.street && form.city && form.provinceState && form.postalZip && form.country)
    case 2: return !!(form.fullName && form.email)
    case 3: return !!(form.revenue && form.yearsRegistered && form.fundingAmount && form.fundingPurpose)
    case 4: return !!(form.dob && form.idType && form.idNumber)
    case 5: return !!(form.idFront && form.bankStatement1)
    case 6: return !!form.referredBy
    default: return true
  }
}

/* ─── SLIDE METADATA ─────────────────────────────────────── */

const SLIDE_META = [
  {
    eyebrow: '01 · Business Info',
    heading: 'Tell us about\nyour business.',
    sub: 'Basic details about your company.',
  },
  {
    eyebrow: '02 · Business Address',
    heading: 'Where is your\nbusiness located?',
    sub: 'Your registered business address.',
  },
  {
    eyebrow: '03 · Contact Info',
    heading: "Who's the primary\npoint of contact?",
    sub: "We'll use this to reach you about your application.",
  },
  {
    eyebrow: '04 · Financial Profile',
    heading: "What's your\nfunding need?",
    sub: 'Help us understand your business finances.',
  },
  {
    eyebrow: '05 · ID Verification',
    heading: 'Verify your\nidentity.',
    sub: 'Required by regulation for all applicants.',
  },
  {
    eyebrow: '06 · Documents',
    heading: 'Upload your\nsupporting documents.',
    sub: 'All uploads are encrypted and securely stored.',
  },
  {
    eyebrow: '07 · Final Details',
    heading: 'Almost there.',
    sub: 'Last step before we review your application.',
  },
]

/* ─── SHARED TYPES ───────────────────────────────────────── */

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void

type SlideProps = {
  form: FormData
  set: (field: keyof FormData) => ChangeHandler
  setFile: (field: keyof FormData) => (file: File | null) => void
}

/* ─── SLIDE 1 — BUSINESS INFO ────────────────────────────── */

function Slide1({ form, set }: SlideProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Company Name *" value={form.companyName} onChange={set('companyName')} placeholder="Acme Corp" required />
      <SelectField label="Business Type *" value={form.businessType} onChange={set('businessType')} options={BUSINESS_TYPES} required />
      <SelectField label="Industry *" value={form.industry} onChange={set('industry')} options={INDUSTRIES} required />
      <Field label="Website" value={form.website} onChange={set('website')} placeholder="https://acme.com" />
    </div>
  )
}

/* ─── SLIDE 2 — ADDRESS ──────────────────────────────────── */

function Slide2({ form, set }: SlideProps) {
  return (
    <div className="space-y-5">
      <Field
        label="Street Address *"
        value={form.street}
        onChange={set('street')}
        placeholder="123 Main Street, Suite 400"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="City *" value={form.city} onChange={set('city')} placeholder="Toronto" required />
        <SelectField label="Province / State *" value={form.provinceState} onChange={set('provinceState')} options={PROVINCES_STATES} required />
        <Field label="Postal / ZIP Code *" value={form.postalZip} onChange={set('postalZip')} placeholder="M5V 3L9" required />
        <SelectField label="Country *" value={form.country} onChange={set('country')} options={['Canada', 'United States']} required />
      </div>
    </div>
  )
}

/* ─── SLIDE 3 — CONTACT INFO ─────────────────────────────── */

function Slide3({ form, set }: SlideProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Full Name *" value={form.fullName} onChange={set('fullName')} placeholder="Jane Smith" required />
      <Field label="Email Address *" type="email" value={form.email} onChange={set('email')} placeholder="jane@acme.com" required />
      <Field label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
      <Field label="Job Title" value={form.jobTitle} onChange={set('jobTitle')} placeholder="CEO" />
    </div>
  )
}

/* ─── SLIDE 4 — FINANCIAL PROFILE ────────────────────────── */

function Slide4({ form, set }: SlideProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <SelectField label="Monthly Revenue *" value={form.revenue} onChange={set('revenue')} options={REVENUE_OPTIONS} required />
      <SelectField label="Years in Business *" value={form.yearsRegistered} onChange={set('yearsRegistered')} options={YEARS_OPTIONS} required />
      <SelectField label="Funding Amount Requested *" value={form.fundingAmount} onChange={set('fundingAmount')} options={FUNDING_AMOUNTS} required />
      <SelectField label="Purpose of Funds *" value={form.fundingPurpose} onChange={set('fundingPurpose')} options={FUNDING_PURPOSES} required />
    </div>
  )
}

/* ─── SLIDE 5 — ID VERIFICATION ─────────────────────────── */

function Slide5({ form, set }: SlideProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Date of Birth *"
          type="date"
          value={form.dob}
          onChange={set('dob')}
          required
        />
        <SelectField label="Government ID Type *" value={form.idType} onChange={set('idType')} options={ID_TYPES} required />
        <Field label="ID Number *" value={form.idNumber} onChange={set('idNumber')} placeholder="e.g. DL-1234567" required />
        <Field label="Issuing Province / State" value={form.idIssuingProvince} onChange={set('idIssuingProvince')} placeholder="Ontario" />
      </div>
      <div className="bg-ff-surface border border-ff-border rounded-xl px-5 py-4">
        <p className="text-ff-muted text-xs leading-relaxed">
          Your identity information is used solely for compliance and fraud prevention purposes.
          It is encrypted in transit and at rest, and never shared with third parties.
        </p>
      </div>
    </div>
  )
}

/* ─── SLIDE 6 — DOCUMENT UPLOAD ──────────────────────────── */

function Slide6({ form, setFile }: SlideProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FileDropZone
          label="Government ID — Front *"
          hint="Driver's Licence, Passport, or Provincial ID"
          file={form.idFront}
          onChange={setFile('idFront')}
          required
        />
        <FileDropZone
          label="Government ID — Back"
          hint="Required for Driver's Licence and Provincial ID"
          file={form.idBack}
          onChange={setFile('idBack')}
        />
      </div>
      <FileDropZone
        label="Business Registration / Articles of Incorporation"
        hint="Certificate of incorporation, business licence, or registration document"
        file={form.businessReg}
        onChange={setFile('businessReg')}
      />
      <div>
        <p className="text-white text-sm font-medium mb-3">
          Bank Statements — Last 3 Months{' '}
          <span className="text-ff-accent">*</span>
          <span className="text-ff-muted font-normal ml-2 text-xs">(at least Month 1 required)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FileDropZone label="Month 1 *" hint="Most recent" file={form.bankStatement1} onChange={setFile('bankStatement1')} required />
          <FileDropZone label="Month 2" hint="" file={form.bankStatement2} onChange={setFile('bankStatement2')} />
          <FileDropZone label="Month 3" hint="" file={form.bankStatement3} onChange={setFile('bankStatement3')} />
        </div>
      </div>
    </div>
  )
}

/* ─── SLIDE 7 — REFERRAL & CONSENT ──────────────────────── */

function Slide7({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-6">
      <SelectField
        label="Referred By *"
        value={form.referredBy}
        onChange={set('referredBy')}
        options={REFERRAL_OPTIONS}
        required
      />
      <div className="space-y-4 pt-4 border-t border-ff-border">
        <ConsentCheckbox id="sms1" checked={form.smsConsent1} onChange={set('smsConsent1')} label={f.smsConsent1} />
        <ConsentCheckbox id="sms2" checked={form.smsConsent2} onChange={set('smsConsent2')} label={f.smsConsent2} />
      </div>
    </div>
  )
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7] as const

export default function ApplyForm() {
  const [form, setFormState] = useState<FormData>(EMPTY)
  const [cur, setCur] = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const set = useCallback((field: keyof FormData): ChangeHandler => {
    return (e) => {
      const value = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
      setFormState((prev) => ({ ...prev, [field]: value }))
    }
  }, [])

  const setFile = useCallback((field: keyof FormData) => (file: File | null) => {
    setFormState((prev) => ({ ...prev, [field]: file }))
  }, [])

  const goTo = useCallback((n: number) => {
    if (n < 0 || n >= TOTAL || n === cur) return
    setExiting(cur)
    setTimeout(() => setExiting(null), 450)
    setCur(n)
  }, [cur])

  const go = useCallback((dir: number) => {
    if (dir > 0 && !slideValid(cur, form)) return
    goTo(cur + dir)
  }, [cur, form, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tag)) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const handleSubmit = () => {
    if (slideValid(TOTAL - 1, form)) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="no-snap bg-ff-bg fixed inset-0 flex items-center justify-center" style={{ top: 64 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-6"
        >
          <div className="w-20 h-20 rounded-full bg-ff-raised border-2 border-ff-accent flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-ff-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-white mb-3">Application Received!</h2>
          <p className="text-ff-muted mb-8">
            Our team will review your file and reach out within 24 hours. Welcome to {brandName}.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormState(EMPTY); setCur(0) }}
            className="text-ff-accent text-sm underline underline-offset-4"
          >
            Submit another application
          </button>
        </motion.div>
      </div>
    )
  }

  const progress = ((cur + 1) / TOTAL) * 100
  const valid = slideValid(cur, form)
  const slideProps: SlideProps = { form, set, setFile }

  return (
    <div className="no-snap">

      {/* ── Slides container — fixed below the navbar ── */}
      <div
        className="fixed bg-ff-bg overflow-hidden"
        style={{ top: 64, left: 0, right: 0, bottom: 0 }}
      >
        {SLIDES.map((SlideComp, idx) => {
          const isActive  = idx === cur
          const isExiting = idx === exiting
          const meta = SLIDE_META[idx]
          return (
            <div
              key={idx}
              className="absolute inset-0 overflow-y-auto"
              style={{
                transition: 'opacity 0.38s ease, transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? 'translateX(0)'
                  : isExiting
                  ? 'translateX(-48px)'
                  : 'translateX(48px)',
                pointerEvents: isActive ? 'all' : 'none',
              }}
            >
              <div className="min-h-full flex flex-col justify-center">
              <div className="max-w-3xl mx-auto px-6 md:px-12 py-10 w-full">

                {/* Slide header */}
                <div className="mb-8">
                  <p className="text-ff-muted text-xs font-mono tracking-widest uppercase mb-3">
                    {meta.eyebrow}
                  </p>
                  <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-2 whitespace-pre-line">
                    {meta.heading}
                  </h1>
                  <p className="text-ff-muted text-sm">{meta.sub}</p>
                </div>

                {/* Slide fields — inside a surface card */}
                <div className="bg-ff-surface border border-ff-border rounded-2xl p-6 md:p-8">
                  <SlideComp {...slideProps} />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-ff-border">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    disabled={cur === 0}
                    className="flex items-center gap-1.5 text-ff-muted hover:text-white transition-colors text-sm font-medium disabled:opacity-0 disabled:pointer-events-none"
                  >
                    ‹ Back
                  </button>

                  {cur < TOTAL - 1 ? (
                    <button
                      type="button"
                      onClick={() => go(1)}
                      disabled={!valid}
                      className="bg-ff-accent text-ff-bg font-bold text-sm px-7 py-3 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue ›
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!valid}
                      className="bg-ff-accent text-ff-bg font-bold text-sm px-7 py-3 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed animate-pulse-glow"
                    >
                      Submit Application
                    </button>
                  )}
                </div>

                {cur === TOTAL - 1 && (
                  <p className="text-ff-muted text-xs text-center mt-4">
                    By submitting, you agree to our{' '}
                    <a href="/terms" className="text-ff-accent underline underline-offset-2">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-ff-accent underline underline-offset-2">Privacy Policy</a>.
                  </p>
                )}

                {/* Progress bar */}
                <div className="flex items-center gap-3 mt-8">
                  <div className="flex-1 h-0.5 bg-ff-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ff-accent rounded-full"
                      style={{ width: `${progress}%`, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    />
                  </div>
                  <span className="text-ff-muted text-xs font-mono tabular-nums shrink-0">
                    {String(cur + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
                  </span>
                </div>
              </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── PRIMITIVES ─────────────────────────────────────────── */

function Field({
  label, value, onChange, type = 'text', placeholder, required,
}: {
  label: string
  value: string
  onChange: ChangeHandler
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
        style={type === 'date' ? { colorScheme: 'dark' } : undefined}
      />
    </div>
  )
}

function SelectField({
  label, value, onChange, options, required,
}: {
  label: string
  value: string
  onChange: ChangeHandler
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
  onChange: ChangeHandler
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

function FileDropZone({
  label, hint, file, onChange, required, accept = '.pdf,.jpg,.jpeg,.png',
}: {
  label: string
  hint?: string
  file: File | null
  onChange: (f: File | null) => void
  required?: boolean
  accept?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) onChange(f)
  }

  const fmtSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white text-sm font-medium">{label}</label>
      {file ? (
        <div className="flex items-center gap-3 bg-ff-bg border border-ff-accent rounded-lg px-4 py-3">
          <svg className="w-5 h-5 text-ff-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm truncate">{file.name}</p>
            <p className="text-ff-muted text-xs">{fmtSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-ff-muted hover:text-white transition-colors ml-1 shrink-0 text-sm"
            aria-label="Remove file"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg px-4 py-6 flex flex-col items-center gap-2 cursor-pointer transition-colors ${
            dragging
              ? 'border-ff-accent bg-ff-surface'
              : 'border-ff-border hover:border-ff-accent hover:bg-ff-surface/40'
          }`}
        >
          <svg className="w-7 h-7 text-ff-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-ff-muted text-sm text-center">
            Drop file here or <span className="text-ff-accent">browse</span>
          </p>
          {hint && <p className="text-ff-muted text-xs text-center">{hint}</p>}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}