'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Field, SelectField, ConsentCheckbox, FileDropZone } from './FormPrimitives'
import ApplySuccess from './ApplySuccess'
import SlideProgressBar from './SlideProgressBar'
import SlideNavRow from './SlideNavRow'

const TOTAL = 10

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

type FormData = {
  companyName: string; businessType: string; industry: string; website: string
  street: string; city: string; provinceState: string; postalZip: string; country: string
  fullName: string; email: string; phone: string; jobTitle: string
  revenue: string; yearsRegistered: string; fundingAmount: string; fundingPurpose: string; businessTaxId: string
  dob: string; idType: string; idNumber: string; idIssuingProvince: string
  idFront: File | null; idBack: File | null; idSelfie: File | null
  businessReg: File | null
  bankStatement1: File | null; bankStatement2: File | null; bankStatement3: File | null
  mtdStatement: File | null
  referredBy: string; smsConsent1: boolean; smsConsent2: boolean; legalConsent: boolean
}

const EMPTY: FormData = {
  companyName: '', businessType: '', industry: '', website: '',
  street: '', city: '', provinceState: '', postalZip: '', country: '',
  fullName: '', email: '', phone: '', jobTitle: '',
  revenue: '', yearsRegistered: '', fundingAmount: '', fundingPurpose: '', businessTaxId: '',
  dob: '', idType: '', idNumber: '', idIssuingProvince: '',
  idFront: null, idBack: null, idSelfie: null,
  businessReg: null,
  bankStatement1: null, bankStatement2: null, bankStatement3: null,
  mtdStatement: null,
  referredBy: '', smsConsent1: false, smsConsent2: false, legalConsent: false,
}

function slideValid(slide: number, form: FormData): boolean {
  switch (slide) {
    case 0: return !!(form.companyName && form.businessType && form.industry)
    case 1: return !!(form.street && form.city && form.provinceState && form.postalZip && form.country)
    case 2: return !!(form.fullName && form.email && form.phone)
    case 3: return !!(form.revenue && form.yearsRegistered && form.fundingAmount && form.fundingPurpose && form.businessTaxId)
    case 4: return !!(form.dob && form.idType && form.idNumber)
    case 5: return !!(form.idFront && form.idBack)
    case 6: return !!form.idSelfie
    case 7: return !!form.bankStatement1
    case 8: return !!form.mtdStatement
    case 9: return !!(form.referredBy && form.smsConsent1 && form.smsConsent2 && form.legalConsent)
    default: return true
  }
}

function allSlidesValid(form: FormData): boolean {
  for (let i = 0; i < TOTAL; i += 1) {
    if (!slideValid(i, form)) return false
  }
  return true
}

function firstIncompleteSlide(form: FormData): number {
  for (let i = 0; i < TOTAL; i += 1) {
    if (!slideValid(i, form)) return i
  }
  return TOTAL - 1
}

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void

type SlideProps = {
  form: FormData
  set: (field: keyof FormData) => ChangeHandler
  setFile: (field: keyof FormData) => (file: File | null) => void
}

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

function Slide3({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label={`${f.fullName} *`} value={form.fullName} onChange={set('fullName')} placeholder="Jane Smith" required />
      <Field label={`${f.email} *`} type="email" value={form.email} onChange={set('email')} placeholder="jane@acme.com" required />
      <Field label={`${f.phone} *`} type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" required />
      <Field label={f.jobTitle} value={form.jobTitle} onChange={set('jobTitle')} placeholder="CEO" />
    </div>
  )
}

function Slide4({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <SelectField label={`${f.revenue.label} *`} value={form.revenue} onChange={set('revenue')} options={f.revenue.options} placeholder={t.apply.selectPlaceholder} required />
      <SelectField label={`${f.yearsRegistered.label} *`} value={form.yearsRegistered} onChange={set('yearsRegistered')} options={f.yearsRegistered.options} placeholder={t.apply.selectPlaceholder} required />
      <SelectField label={`${f.fundingAmount.label} *`} value={form.fundingAmount} onChange={set('fundingAmount')} options={f.fundingAmount.options} placeholder={t.apply.selectPlaceholder} required />
      <SelectField label={`${f.fundingPurpose.label} *`} value={form.fundingPurpose} onChange={set('fundingPurpose')} options={f.fundingPurpose.options} placeholder={t.apply.selectPlaceholder} required />
      <Field label={`${f.businessTaxId} *`} value={form.businessTaxId} onChange={set('businessTaxId')} placeholder="123456789RT0001" required />
    </div>
  )
}

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

function Slide6({ form, setFile }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-ff-border bg-ff-bg px-5 py-4">
        <p className="text-ff-text text-sm font-medium mb-1">{t.apply.documentSequenceTitle}</p>
        <p className="text-ff-muted text-xs leading-relaxed">{t.apply.documentSequenceText}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FileDropZone label={`${f.idFront} *`} hint={f.idFrontHint} file={form.idFront} onChange={setFile('idFront')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
        <FileDropZone label={`${f.idBack} *`} hint={f.idBackHint} file={form.idBack} onChange={setFile('idBack')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
      </div>
    </div>
  )
}

function Slide7({ form, setFile }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-ff-border bg-ff-bg px-5 py-4">
        <p className="text-ff-text text-sm font-medium mb-1">{t.apply.documentSelfieTitle}</p>
        <p className="text-ff-muted text-xs leading-relaxed">{t.apply.documentSelfieText}</p>
      </div>
      <FileDropZone label={`${f.idSelfie} *`} hint={f.idSelfieHint} file={form.idSelfie} onChange={setFile('idSelfie')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
    </div>
  )
}

function Slide8({ form, setFile }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-ff-border bg-ff-bg px-5 py-4">
        <p className="text-ff-text text-sm font-medium mb-1">{t.apply.documentStatementsTitle}</p>
        <p className="text-ff-muted text-xs leading-relaxed">{t.apply.documentStatementsText}</p>
      </div>
      <FileDropZone label={f.businessReg} hint={f.businessRegHint} file={form.businessReg} onChange={setFile('businessReg')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
      <div>
        <p className="text-ff-text text-sm font-medium mb-3">
          {f.bankStatements} <span className="text-ff-accent">*</span>
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

function Slide9({ form, setFile }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-ff-border bg-ff-bg px-5 py-4">
        <p className="text-ff-text text-sm font-medium mb-1">{t.apply.documentMtdTitle}</p>
        <p className="text-ff-muted text-xs leading-relaxed">{t.apply.documentMtdText}</p>
      </div>
      <FileDropZone label={`${f.mtdStatement} *`} hint={f.mtdStatementHint} file={form.mtdStatement} onChange={setFile('mtdStatement')} dropHint={t.apply.dropHint} dropBrowse={t.apply.dropBrowse} />
    </div>
  )
}

function Slide10({ form, set }: SlideProps) {
  const { t } = useLanguage()
  const f = t.apply.fields
  return (
    <div className="space-y-6">
      <SelectField label={`${f.referredBy.label} *`} value={form.referredBy} onChange={set('referredBy')} options={f.referredBy.options} placeholder={t.apply.selectPlaceholder} required />
      <div className="space-y-4 pt-4 border-t border-ff-border">
        <ConsentCheckbox id="sms1" checked={form.smsConsent1} onChange={set('smsConsent1')} label={f.smsConsent1} />
        <ConsentCheckbox id="sms2" checked={form.smsConsent2} onChange={set('smsConsent2')} label={f.smsConsent2} />
        <ConsentCheckbox
          id="apply-legal-consent"
          checked={form.legalConsent}
          onChange={set('legalConsent')}
          label={(
            <>
              {f.legalConsent}{' '}
              <a href="/terms" className="text-ff-accent underline underline-offset-2">{t.apply.termsLabel}</a>
              {' '}{t.apply.andWord}{' '}
              <a href="/privacy" className="text-ff-accent underline underline-offset-2">{t.apply.privacyLabel}</a>.
            </>
          )}
        />
      </div>
    </div>
  )
}

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10] as const

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
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const handleReset = () => { setSubmitted(false); setFormState(EMPTY); setCur(0) }
  const valid = slideValid(cur, form)
  const readyToSubmit = allSlidesValid(form)
  const slideProps: SlideProps = { form, set, setFile }

  if (submitted) return <ApplySuccess onReset={handleReset} />

  return (
    <div className="no-snap">
      <div
        className="fixed bg-ff-bg overflow-hidden"
        style={{ top: 'var(--ff-navbar-offset)', left: 0, right: 0, bottom: 0 }}
      >
        {SLIDES.map((SlideComp, idx) => {
          const isActive = idx === cur
          const isExiting = idx === exiting
          const meta = t.apply.slides[idx]

          return (
            <div
              key={idx}
              className="absolute inset-0 overflow-y-auto"
              style={{
                transition: 'opacity 0.38s ease, transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : isExiting ? 'translateX(-48px)' : 'translateX(48px)',
                pointerEvents: isActive ? 'all' : 'none',
              }}
            >
              <div className="min-h-full flex flex-col justify-center">
                <div className="max-w-3xl mx-auto px-6 md:px-12 py-10 w-full">
                  <div className="mb-8">
                    <p className="text-ff-muted text-xs font-mono tracking-widest uppercase mb-3">
                      {meta.eyebrow}
                    </p>
                    <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-ff-text mb-2 whitespace-pre-line">
                      {meta.heading}
                    </h1>
                    <p className="text-ff-muted text-sm">{meta.sub}</p>
                  </div>

                  <div className="bg-ff-surface border border-ff-border rounded-2xl p-6 md:p-8">
                    <SlideComp {...slideProps} />
                  </div>

                  <SlideNavRow
                    current={cur}
                    total={TOTAL}
                    canAdvance={valid}
                    onBack={() => go(-1)}
                    onNext={() => go(1)}
                    onSubmit={() => {
                      if (!readyToSubmit) {
                        goTo(firstIncompleteSlide(form))
                        return
                      }
                      setSubmitted(true)
                    }}
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
