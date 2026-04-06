'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Field, SelectField, ConsentCheckbox, FileDropZone } from './FormPrimitives'
import ApplySuccess from './ApplySuccess'
import SlideProgressBar from './SlideProgressBar'
import SlideNavRow from './SlideNavRow'

/* ─── CONSTANTS ──────────────────────────────────────────── */

const TOTAL = 7

const PROVINCES_STATES = [
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

/* ─── FORM DATA ──────────────────────────────────────────── */

type FormData = {
  // Slide 1 — Business Info
  companyName: string; businessType: string; industry: string; website: string
  // Slide 2 — Address
  street: string; city: string; provinceState: string; postalZip: string; country: string
  // Slide 3 — Contact
  fullName: string; email: string; phone: string; jobTitle: string
  // Slide 4 — Financials
  revenue: string; yearsRegistered: string; fundingAmount: string; fundingPurpose: string
  // Slide 5 — ID Verification
  dob: string; idType: string; idNumber: string; idIssuingProvince: string
  // Slide 6 — Documents
  idFront: File | null; idBack: File | null; businessReg: File | null
  bankStatement1: File | null; bankStatement2: File | null; bankStatement3: File | null
  // Slide 7 — Referral & Consent
  referredBy: string; smsConsent1: boolean; smsConsent2: boolean
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

/* ─── SHARED TYPES ───────────────────────────────────────── */

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void

type SlideProps = {
  form: FormData
  set: (field: keyof FormData) => ChangeHandler
  setFile: (field: keyof FormData) => (file: File | null) => void
}

/* ─── SLIDE 1 — BUSINESS INFO ────────────────────────────── */

function Slide1({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label={`${f.companyName} *`} value={form.companyName} onChange={set('companyName')} placeholder="Acme Corp" required />
      <SelectField label={`${f.businessType.label} *`} value={form.businessType} onChange={set('businessType')} options={f.businessType.options} placeholder={t.apply.selectPlaceholder} required />
      <SelectField label={`${f.industry.label} *`} value={form.industry} onChange={set('industry')} options={f.industry.options} placeholder={t.apply.selectPlaceholder} required />
      <Field label={f.website} value={form.website} onChange={set('website')} placeholder="https://acme.com" />
    </div>
  )
}

/* ─── SLIDE 2 — ADDRESS ──────────────────────────────────── */

function Slide2({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-5">
      <Field label={`${f.street} *`} value={form.street} onChange={set('street')} placeholder="123 Main Street, Suite 400" required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label={`${f.city} *`} value={form.city} onChange={set('city')} placeholder="New York" required />
        <SelectField label={`${f.provinceState} *`} value={form.provinceState} onChange={set('provinceState')} options={PROVINCES_STATES} placeholder={t.apply.selectPlaceholder} required />
        <Field label={`${f.postalZip} *`} value={form.postalZip} onChange={set('postalZip')} placeholder="10001" required />
        <SelectField label={`${f.country.label} *`} value={form.country} onChange={set('country')} options={f.country.options} placeholder={t.apply.selectPlaceholder} required />
      </div>
    </div>
  )
}

/* ─── SLIDE 3 — CONTACT INFO ─────────────────────────────── */

function Slide3({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label={`${f.fullName} *`} value={form.fullName} onChange={set('fullName')} placeholder="Jane Smith" required />
      <Field label={`${f.email} *`} type="email" value={form.email} onChange={set('email')} placeholder="jane@acme.com" required />
      <Field label={f.phone} type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
      <Field label={f.jobTitle} value={form.jobTitle} onChange={set('jobTitle')} placeholder="CEO" />
    </div>
  )
}

/* ─── SLIDE 4 — FINANCIAL PROFILE ────────────────────────── */

function Slide4({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <SelectField label={`${f.revenue.label} *`} value={form.revenue} onChange={set('revenue')} options={f.revenue.options} placeholder={t.apply.selectPlaceholder} required />
      <SelectField label={`${f.yearsRegistered.label} *`} value={form.yearsRegistered} onChange={set('yearsRegistered')} options={f.yearsRegistered.options} placeholder={t.apply.selectPlaceholder} required />
      <SelectField label={`${f.fundingAmount.label} *`} value={form.fundingAmount} onChange={set('fundingAmount')} options={f.fundingAmount.options} placeholder={t.apply.selectPlaceholder} required />
      <SelectField label={`${f.fundingPurpose.label} *`} value={form.fundingPurpose} onChange={set('fundingPurpose')} options={f.fundingPurpose.options} placeholder={t.apply.selectPlaceholder} required />
    </div>
  )
}

/* ─── SLIDE 5 — ID VERIFICATION ─────────────────────────── */

function Slide5({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label={`${f.dob} *`} type="date" value={form.dob} onChange={set('dob')} required />
        <SelectField label={`${f.idType.label} *`} value={form.idType} onChange={set('idType')} options={f.idType.options} placeholder={t.apply.selectPlaceholder} required />
        <Field label={`${f.idNumber} *`} value={form.idNumber} onChange={set('idNumber')} placeholder="e.g. DL-1234567" required />
        <Field label={f.idIssuingProvince} value={form.idIssuingProvince} onChange={set('idIssuingProvince')} placeholder="California" />
      </div>
      <div className="bg-ff-surface border border-ff-border rounded-xl px-5 py-4">
        <p className="text-ff-muted text-xs leading-relaxed">{t.apply.idDisclaimer}</p>
      </div>
    </div>
  )
}

/* ─── SLIDE 6 — DOCUMENT UPLOAD ──────────────────────────── */

function Slide6({ form, setFile }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FileDropZone label={`${f.idFront} *`} hint={f.idFrontHint} file={form.idFront} onChange={setFile('idFront')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
        <FileDropZone label={f.idBack} hint={f.idBackHint} file={form.idBack} onChange={setFile('idBack')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
      </div>
      <FileDropZone label={f.businessReg} hint={f.businessRegHint} file={form.businessReg} onChange={setFile('businessReg')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
      <div>
        <p className="text-ff-text text-sm font-medium mb-3">
          {f.bankStatements}{' '}
          <span className="text-ff-accent">*</span>
          <span className="text-ff-muted font-normal ml-2 text-xs">{f.bankStatementsNote}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FileDropZone label={`${f.month1} *`} hint={f.mostRecent} file={form.bankStatement1} onChange={setFile('bankStatement1')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
          <FileDropZone label={f.month2} hint="" file={form.bankStatement2} onChange={setFile('bankStatement2')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
          <FileDropZone label={f.month3} hint="" file={form.bankStatement3} onChange={setFile('bankStatement3')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
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
      <SelectField label={`${f.referredBy.label} *`} value={form.referredBy} onChange={set('referredBy')} options={f.referredBy.options} placeholder={t.apply.selectPlaceholder} required />
      <div className="space-y-4 pt-4 border-t border-ff-border">
        <ConsentCheckbox id="sms1" checked={form.smsConsent1} onChange={set('smsConsent1')} label={f.smsConsent1} />
        <ConsentCheckbox id="sms2" checked={form.smsConsent2} onChange={set('smsConsent2')} label={f.smsConsent2} />
      </div>
    </div>
  )
}

/* ─── SLIDE REGISTRY ─────────────────────────────────────── */

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7] as const

/* ─── MAIN COMPONENT ─────────────────────────────────────── */

export default function ApplyForm() {
  const { t } = useLanguage()
  const [form, setFormState] = useState<FormData>(EMPTY)
  const [cur, setCur] = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const set = useCallback((field: keyof FormData): ChangeHandler => (e) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value
    setFormState((prev) => ({ ...prev, [field]: value }))
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

  const handleReset = () => { setSubmitted(false); setFormState(EMPTY); setCur(0) }
  const valid = slideValid(cur, form)
  const slideProps: SlideProps = { form, set, setFile }

  if (submitted) return <ApplySuccess onReset={handleReset} />

  return (
    <div className="no-snap">
      {/* Fixed viewport below navbar */}
      <div
        className="fixed bg-ff-bg overflow-hidden"
        style={{ top: 'var(--ff-navbar-offset)', left: 0, right: 0, bottom: 0 }}
      >
        {SLIDES.map((SlideComp, idx) => {
          const isActive  = idx === cur
          const isExiting = idx === exiting
          const meta = t.apply.slides[idx]

          return (
            <div
              key={idx}
              className="absolute inset-0 overflow-y-auto"
              style={{
                transition: 'opacity 0.38s ease, transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity:   isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : isExiting ? 'translateX(-48px)' : 'translateX(48px)',
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
                    <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-ff-text mb-2 whitespace-pre-line">
                      {meta.heading}
                    </h1>
                    <p className="text-ff-muted text-sm">{meta.sub}</p>
                  </div>

                  {/* Fields */}
                  <div className="bg-ff-surface border border-ff-border rounded-2xl p-6 md:p-8">
                    <SlideComp {...slideProps} />
                  </div>

                  <SlideNavRow
                    current={cur}
                    total={TOTAL}
                    canAdvance={valid}
                    onBack={() => go(-1)}
                    onNext={() => go(1)}
                    onSubmit={() => { if (valid) setSubmitted(true) }}
                  />

                  <SlideProgressBar current={cur} total={TOTAL} />

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
