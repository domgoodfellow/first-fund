'use client'

import { useMemo, useState } from 'react'
import { Field, SelectField } from '@/components/forms/FormPrimitives'
import type {
  ApplicationRecord,
  ApplicationSectionKey,
  ApplicationSectionRecord,
  JsonRecord,
} from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface ApplicationStepperProps {
  application: ApplicationRecord
  sections: ApplicationSectionRecord[]
}

function mapSectionsToDrafts(sections: ApplicationSectionRecord[]) {
  return sections.reduce<Record<string, JsonRecord>>((accumulator, section) => {
    accumulator[section.section_key] = section.data
    return accumulator
  }, {})
}

export default function ApplicationStepper({
  application,
  sections,
}: ApplicationStepperProps) {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState<ApplicationSectionKey>('business_details')
  const [drafts, setDrafts] = useState<Record<string, JsonRecord>>(() => mapSectionsToDrafts(sections))
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sectionOrder = useMemo(
    () =>
      [
        { key: 'business_details', title: t.portal.application.sectionTitles.business },
        { key: 'business_address', title: t.portal.application.sectionTitles.address },
        { key: 'contact_details', title: t.portal.application.sectionTitles.contact },
        { key: 'financial_profile', title: t.portal.application.sectionTitles.financial },
      ] as const,
    [t],
  )

  const currentDraft = drafts[activeSection] ?? {}
  const applyFields = t.apply.fields

  function setDraftValue(field: string, value: string) {
    setDrafts((current) => ({
      ...current,
      [activeSection]: {
        ...(current[activeSection] ?? {}),
        [field]: value,
      },
    }))
  }

  async function saveCurrentSection() {
    setIsSaving(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/applications/save-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionKey: activeSection,
          data: currentDraft,
        }),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error ?? t.portal.errors.generic)
      }
      setMessage(t.portal.application.saved)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.portal.errors.generic)
    } finally {
      setIsSaving(false)
    }
  }

  async function submitCurrentApplication() {
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: application.id }),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error ?? t.portal.errors.generic)
      }
      setMessage(t.portal.application.submitted)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.portal.errors.generic)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem,1fr]">
      <aside className="rounded-2xl border border-ff-border bg-white p-5 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
          {t.portal.application.progressEyebrow}
        </p>
        <div className="mt-5 space-y-2">
          {sectionOrder.map((section, index) => (
            <button
              key={section.key}
              type="button"
              onClick={() => setActiveSection(section.key)}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                activeSection === section.key
                  ? 'border-ff-accent bg-ff-raised'
                  : 'border-ff-border bg-white hover:border-ff-border-blue'
              }`}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-ff-accent">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-ff-text">{section.title}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="rounded-2xl border border-ff-border bg-white p-6 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
              {t.portal.application.workspaceEyebrow}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-ff-text">
              {sectionOrder.find((item) => item.key === activeSection)?.title}
            </h2>
          </div>
          <span className="rounded-full bg-ff-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ff-muted">
            {application.status.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {activeSection === 'business_details' ? (
            <>
              <Field label={applyFields.companyName} value={String(currentDraft.companyName ?? '')} onChange={(event) => setDraftValue('companyName', event.target.value)} />
              <SelectField label={applyFields.businessType.label} value={String(currentDraft.businessType ?? '')} onChange={(event) => setDraftValue('businessType', event.target.value)} options={applyFields.businessType.options} placeholder={t.apply.selectPlaceholder} />
              <SelectField label={applyFields.industry.label} value={String(currentDraft.industry ?? '')} onChange={(event) => setDraftValue('industry', event.target.value)} options={applyFields.industry.options} placeholder={t.apply.selectPlaceholder} />
              <Field label={applyFields.website} value={String(currentDraft.website ?? '')} onChange={(event) => setDraftValue('website', event.target.value)} />
            </>
          ) : null}
          {activeSection === 'business_address' ? (
            <>
              <Field label={applyFields.street} value={String(currentDraft.street ?? '')} onChange={(event) => setDraftValue('street', event.target.value)} />
              <Field label={applyFields.city} value={String(currentDraft.city ?? '')} onChange={(event) => setDraftValue('city', event.target.value)} />
              <SelectField label={applyFields.country.label} value={String(currentDraft.country ?? '')} onChange={(event) => setDraftValue('country', event.target.value)} options={applyFields.country.options} placeholder={t.apply.selectPlaceholder} />
              <Field label={applyFields.postalZip} value={String(currentDraft.postalZip ?? '')} onChange={(event) => setDraftValue('postalZip', event.target.value)} />
            </>
          ) : null}
          {activeSection === 'contact_details' ? (
            <>
              <Field label={applyFields.fullName} value={String(currentDraft.fullName ?? '')} onChange={(event) => setDraftValue('fullName', event.target.value)} />
              <Field label={applyFields.email} type="email" value={String(currentDraft.email ?? '')} onChange={(event) => setDraftValue('email', event.target.value)} />
              <Field label={applyFields.phone} value={String(currentDraft.phone ?? '')} onChange={(event) => setDraftValue('phone', event.target.value)} />
              <Field label={applyFields.jobTitle} value={String(currentDraft.jobTitle ?? '')} onChange={(event) => setDraftValue('jobTitle', event.target.value)} />
            </>
          ) : null}
          {activeSection === 'financial_profile' ? (
            <>
              <SelectField label={applyFields.revenue.label} value={String(currentDraft.revenue ?? '')} onChange={(event) => setDraftValue('revenue', event.target.value)} options={applyFields.revenue.options} placeholder={t.apply.selectPlaceholder} />
              <SelectField label={applyFields.yearsRegistered.label} value={String(currentDraft.yearsRegistered ?? '')} onChange={(event) => setDraftValue('yearsRegistered', event.target.value)} options={applyFields.yearsRegistered.options} placeholder={t.apply.selectPlaceholder} />
              <SelectField label={applyFields.fundingAmount.label} value={String(currentDraft.fundingAmount ?? '')} onChange={(event) => setDraftValue('fundingAmount', event.target.value)} options={applyFields.fundingAmount.options} placeholder={t.apply.selectPlaceholder} />
              <SelectField label={applyFields.fundingPurpose.label} value={String(currentDraft.fundingPurpose ?? '')} onChange={(event) => setDraftValue('fundingPurpose', event.target.value)} options={applyFields.fundingPurpose.options} placeholder={t.apply.selectPlaceholder} />
            </>
          ) : null}
        </div>

        {error ? <p className="mt-6 text-sm text-rose-600">{error}</p> : null}
        {message ? <p className="mt-6 text-sm text-emerald-700">{message}</p> : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={saveCurrentSection}
            disabled={isSaving}
            className="rounded-xl border border-ff-border px-5 py-3 text-sm font-semibold text-ff-text transition-colors hover:border-ff-accent hover:text-ff-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? t.portal.application.saving : t.portal.application.save}
          </button>
          <button
            type="button"
            onClick={submitCurrentApplication}
            disabled={isSubmitting}
            className="rounded-xl bg-ff-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ff-glow disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? t.portal.application.submitting : t.portal.application.submit}
          </button>
        </div>
      </div>
    </div>
  )
}
