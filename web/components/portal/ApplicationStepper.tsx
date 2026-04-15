'use client'

import { useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/auth/client'
import { Field, SelectField } from '@/components/forms/FormPrimitives'
import type {
  ApplicationRecord,
  ApplicationSectionRecord,
  DocumentCategory,
  DocumentRecord,
  JsonRecord,
} from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface ApplicationStepperProps {
  application: ApplicationRecord
  sections: ApplicationSectionRecord[]
  documents: DocumentRecord[]
}

type SavedSectionKey =
  | 'business_details'
  | 'business_address'
  | 'contact_details'
  | 'financial_profile'

type DocumentSlotKey =
  | 'id_front'
  | 'id_back'
  | 'selfie_with_id'
  | 'bank_statements'
  | 'mtd_statement'

type StepKey =
  | 'business_profile'
  | 'contact_financial'
  | 'identity_verification'
  | 'bank_statements'
  | 'final_review'

interface UploadSlot {
  category: DocumentCategory
  prefix: string
  multiple?: boolean
}

const UPLOAD_SLOTS: Record<DocumentSlotKey, UploadSlot> = {
  id_front: { category: 'government_id', prefix: 'id-front__' },
  id_back: { category: 'government_id', prefix: 'id-back__' },
  selfie_with_id: { category: 'government_id', prefix: 'selfie-id__' },
  bank_statements: {
    category: 'bank_statements',
    prefix: 'bank-statement__',
    multiple: true,
  },
  mtd_statement: { category: 'bank_statements', prefix: 'mtd-statement__' },
}

const STEP_SEQUENCE: StepKey[] = [
  'business_profile',
  'contact_financial',
  'identity_verification',
  'bank_statements',
  'final_review',
]

function mapSectionsToDrafts(sections: ApplicationSectionRecord[]) {
  return sections.reduce<Record<string, JsonRecord>>((accumulator, section) => {
    accumulator[section.section_key] = section.data
    return accumulator
  }, {})
}

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function matchesSlot(document: DocumentRecord, slotKey: DocumentSlotKey) {
  const slot = UPLOAD_SLOTS[slotKey]
  return document.category === slot.category && document.file_name.startsWith(slot.prefix)
}

export default function ApplicationStepper({
  application,
  sections,
  documents: initialDocuments,
}: ApplicationStepperProps) {
  const { t } = useLanguage()
  const fields = t.apply.fields

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [drafts, setDrafts] = useState<Record<string, JsonRecord>>(() => mapSectionsToDrafts(sections))
  const [documents, setDocuments] = useState(initialDocuments)
  const [fileSelections, setFileSelections] = useState<Partial<Record<DocumentSlotKey, File[]>>>({})
  const [idType, setIdType] = useState(normalizeString((drafts.contact_details ?? {}).idType))
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isWorking, setIsWorking] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const businessDetailsDraft = drafts.business_details ?? {}
  const businessAddressDraft = drafts.business_address ?? {}
  const contactDetailsDraft = drafts.contact_details ?? {}
  const financialProfileDraft = drafts.financial_profile ?? {}
  const currentStep = STEP_SEQUENCE[currentStepIndex]

  const steps = [
    { key: 'business_profile' as const, title: 'Business Profile' },
    { key: 'contact_financial' as const, title: 'Contact and Financing' },
    { key: 'identity_verification' as const, title: 'Identity Verification' },
    { key: 'bank_statements' as const, title: 'Bank Statements' },
    { key: 'final_review' as const, title: 'Final Review' },
  ]

  function setDraftValue(sectionKey: SavedSectionKey, field: string, value: string) {
    setDrafts((current) => ({
      ...current,
      [sectionKey]: {
        ...(current[sectionKey] ?? {}),
        [field]: value,
      },
    }))
  }

  function getDocumentsForSlot(slotKey: DocumentSlotKey) {
    return documents.filter((document) => matchesSlot(document, slotKey))
  }

  function businessProfileValid() {
    return Boolean(
      normalizeString(businessDetailsDraft.companyName) &&
        normalizeString(businessDetailsDraft.businessType) &&
        normalizeString(businessDetailsDraft.industry) &&
        normalizeString(businessAddressDraft.street) &&
        normalizeString(businessAddressDraft.city) &&
        normalizeString(businessAddressDraft.country) &&
        normalizeString(businessAddressDraft.postalZip),
    )
  }

  function contactFinancialValid() {
    return Boolean(
      normalizeString(contactDetailsDraft.fullName) &&
        normalizeString(contactDetailsDraft.email) &&
        normalizeString(contactDetailsDraft.phone) &&
        normalizeString(contactDetailsDraft.jobTitle) &&
        normalizeString(financialProfileDraft.revenue) &&
        normalizeString(financialProfileDraft.yearsRegistered) &&
        normalizeString(financialProfileDraft.fundingAmount) &&
        normalizeString(financialProfileDraft.fundingPurpose) &&
        normalizeString(financialProfileDraft.businessTaxId),
    )
  }

  function identityStepValid() {
    return Boolean(
      normalizeString(idType) &&
        getDocumentsForSlot('id_front').length > 0 &&
        getDocumentsForSlot('id_back').length > 0 &&
        getDocumentsForSlot('selfie_with_id').length > 0,
    )
  }

  function bankStepValid() {
    return Boolean(
      getDocumentsForSlot('bank_statements').length > 0 &&
        getDocumentsForSlot('mtd_statement').length > 0,
    )
  }

  async function saveSection(sectionKey: SavedSectionKey, data?: JsonRecord) {
    const response = await fetch('/api/applications/save-section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sectionKey,
        data: data ?? drafts[sectionKey] ?? {},
      }),
    })

    const payload = await response.json()
    if (!response.ok) {
      throw new Error(payload.error ?? t.portal.errors.generic)
    }
  }

  async function uploadFiles(slotKey: DocumentSlotKey) {
    const selectedFiles = fileSelections[slotKey] ?? []
    const slot = UPLOAD_SLOTS[slotKey]

    if (!selectedFiles.length) {
      throw new Error('Upload the required file before moving to the next step.')
    }

    const supabase = createBrowserSupabaseClient()

    for (const file of selectedFiles) {
      const uploadFileName = `${slot.prefix}${file.name}`

      const signResponse = await fetch('/api/uploads/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: application.id,
          category: slot.category,
          fileName: uploadFileName,
          mimeType: file.type,
          sizeBytes: file.size,
        }),
      })
      const signPayload = await signResponse.json()
      if (!signResponse.ok) {
        throw new Error(signPayload.error ?? t.portal.errors.generic)
      }

      const { error: uploadError } = await supabase.storage
        .from('application-documents')
        .uploadToSignedUrl(signPayload.path, signPayload.token, file)

      if (uploadError) {
        throw uploadError
      }

      const completeResponse = await fetch('/api/uploads/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: application.id,
          category: slot.category,
          fileName: uploadFileName,
          mimeType: file.type,
          sizeBytes: file.size,
          storagePath: signPayload.path,
        }),
      })
      const completePayload = await completeResponse.json()
      if (!completeResponse.ok) {
        throw new Error(completePayload.error ?? t.portal.errors.generic)
      }

      setDocuments((current) => [
        {
          id: crypto.randomUUID(),
          application_id: application.id,
          owner_profile_id: '',
          category: slot.category,
          file_name: uploadFileName,
          storage_path: signPayload.path,
          mime_type: file.type,
          size_bytes: file.size,
          status: 'uploaded',
        },
        ...current,
      ])
    }

    setFileSelections((current) => ({
      ...current,
      [slotKey]: [],
    }))
  }

  async function handleNext() {
    setIsWorking(true)
    setError(null)
    setMessage(null)

    try {
      if (currentStep === 'business_profile') {
        if (!businessProfileValid()) {
          throw new Error('Complete all required business fields before moving on.')
        }
        await saveSection('business_details')
        await saveSection('business_address')
      } else if (currentStep === 'contact_financial') {
        if (!contactFinancialValid()) {
          throw new Error('Complete all required contact and financing fields before moving on.')
        }
        const contactData = {
          ...(drafts.contact_details ?? {}),
          idType,
        }
        setDrafts((current) => ({
          ...current,
          contact_details: contactData,
        }))
        await saveSection('contact_details', contactData)
        await saveSection('financial_profile')
      } else if (currentStep === 'identity_verification') {
        if (!normalizeString(idType)) {
          throw new Error('Select the type of ID before moving to the next step.')
        }
        if (!identityStepValid()) {
          await uploadFiles('id_front')
          await uploadFiles('id_back')
          await uploadFiles('selfie_with_id')
        }
      } else if (currentStep === 'bank_statements') {
        if (!bankStepValid()) {
          await uploadFiles('bank_statements')
          await uploadFiles('mtd_statement')
        }
      }

      if (currentStepIndex < STEP_SEQUENCE.length - 1) {
        setCurrentStepIndex((current) => current + 1)
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.portal.errors.generic)
    } finally {
      setIsWorking(false)
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      if (!businessProfileValid()) {
        setCurrentStepIndex(0)
        throw new Error('Complete the business profile before submitting.')
      }
      if (!contactFinancialValid()) {
        setCurrentStepIndex(1)
        throw new Error('Complete the contact and financing step before submitting.')
      }
      if (!identityStepValid()) {
        setCurrentStepIndex(2)
        throw new Error('Complete the identity verification step before submitting.')
      }
      if (!bankStepValid()) {
        setCurrentStepIndex(3)
        throw new Error('Upload the bank statements and month-to-date statement before submitting.')
      }

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

  function renderDocumentUpload(slotKey: DocumentSlotKey, label: string, multiple?: boolean) {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="block text-xs font-semibold uppercase tracking-wide text-ff-muted">
          {label}
        </span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          multiple={Boolean(multiple)}
          onChange={(event) =>
            setFileSelections((current) => ({
              ...current,
              [slotKey]: Array.from(event.target.files ?? []),
            }))
          }
          className="rounded-xl border border-ff-border bg-ff-bg px-4 py-3 text-sm text-ff-text"
        />
      </label>
    )
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[16rem,1fr]">
      <aside className="rounded-2xl border border-ff-border bg-white p-5 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
          {t.portal.application.progressEyebrow}
        </p>
        <div className="mt-5 space-y-2">
          {steps.map((step, index) => {
            const active = index === currentStepIndex
            const complete = index < currentStepIndex
            return (
              <div
                key={step.key}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                  active
                    ? 'border-ff-accent bg-ff-raised'
                    : complete
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-ff-border bg-white'
                }`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-ff-accent">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-ff-text">{step.title}</span>
              </div>
            )
          })}
        </div>
      </aside>

      <div className="rounded-2xl border border-ff-border bg-white p-6 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
              {t.portal.application.workspaceEyebrow}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-ff-text">
              {steps[currentStepIndex].title}
            </h2>
          </div>
          <span className="rounded-full bg-ff-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ff-muted">
            {application.status.replace(/_/g, ' ')}
          </span>
        </div>

        {currentStep === 'business_profile' ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Field label={fields.companyName} value={String(businessDetailsDraft.companyName ?? '')} onChange={(event) => setDraftValue('business_details', 'companyName', event.target.value)} />
            <SelectField label={fields.businessType.label} value={String(businessDetailsDraft.businessType ?? '')} onChange={(event) => setDraftValue('business_details', 'businessType', event.target.value)} options={fields.businessType.options} placeholder={t.apply.selectPlaceholder} />
            <SelectField label={fields.industry.label} value={String(businessDetailsDraft.industry ?? '')} onChange={(event) => setDraftValue('business_details', 'industry', event.target.value)} options={fields.industry.options} placeholder={t.apply.selectPlaceholder} />
            <Field label={fields.website} value={String(businessDetailsDraft.website ?? '')} onChange={(event) => setDraftValue('business_details', 'website', event.target.value)} />
            <Field label={fields.street} value={String(businessAddressDraft.street ?? '')} onChange={(event) => setDraftValue('business_address', 'street', event.target.value)} />
            <Field label={fields.city} value={String(businessAddressDraft.city ?? '')} onChange={(event) => setDraftValue('business_address', 'city', event.target.value)} />
            <SelectField label={fields.country.label} value={String(businessAddressDraft.country ?? '')} onChange={(event) => setDraftValue('business_address', 'country', event.target.value)} options={fields.country.options} placeholder={t.apply.selectPlaceholder} />
            <Field label={fields.postalZip} value={String(businessAddressDraft.postalZip ?? '')} onChange={(event) => setDraftValue('business_address', 'postalZip', event.target.value)} />
          </div>
        ) : null}

        {currentStep === 'contact_financial' ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Field label={fields.fullName} value={String(contactDetailsDraft.fullName ?? '')} onChange={(event) => setDraftValue('contact_details', 'fullName', event.target.value)} />
            <Field label={fields.email} type="email" value={String(contactDetailsDraft.email ?? '')} onChange={(event) => setDraftValue('contact_details', 'email', event.target.value)} />
            <Field label={fields.phone} value={String(contactDetailsDraft.phone ?? '')} onChange={(event) => setDraftValue('contact_details', 'phone', event.target.value)} />
            <Field label={fields.jobTitle} value={String(contactDetailsDraft.jobTitle ?? '')} onChange={(event) => setDraftValue('contact_details', 'jobTitle', event.target.value)} />
            <SelectField label={fields.revenue.label} value={String(financialProfileDraft.revenue ?? '')} onChange={(event) => setDraftValue('financial_profile', 'revenue', event.target.value)} options={fields.revenue.options} placeholder={t.apply.selectPlaceholder} />
            <SelectField label={fields.yearsRegistered.label} value={String(financialProfileDraft.yearsRegistered ?? '')} onChange={(event) => setDraftValue('financial_profile', 'yearsRegistered', event.target.value)} options={fields.yearsRegistered.options} placeholder={t.apply.selectPlaceholder} />
            <SelectField label={fields.fundingAmount.label} value={String(financialProfileDraft.fundingAmount ?? '')} onChange={(event) => setDraftValue('financial_profile', 'fundingAmount', event.target.value)} options={fields.fundingAmount.options} placeholder={t.apply.selectPlaceholder} />
            <SelectField label={fields.fundingPurpose.label} value={String(financialProfileDraft.fundingPurpose ?? '')} onChange={(event) => setDraftValue('financial_profile', 'fundingPurpose', event.target.value)} options={fields.fundingPurpose.options} placeholder={t.apply.selectPlaceholder} />
            <Field label={fields.businessTaxId} value={String(financialProfileDraft.businessTaxId ?? '')} onChange={(event) => setDraftValue('financial_profile', 'businessTaxId', event.target.value)} />
          </div>
        ) : null}

        {currentStep === 'identity_verification' ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <p className="max-w-2xl text-sm leading-6 text-ff-muted">
                Select the ID type and upload the front, back, and a selfie holding that same ID.
              </p>
              <label className="flex flex-col gap-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wide text-ff-muted">
                  ID type
                </span>
                <select
                  value={idType}
                  onChange={(event) => setIdType(event.target.value)}
                  className="rounded-xl border border-ff-border bg-ff-bg px-4 py-3 text-sm text-ff-text"
                >
                  <option value="">Select ID type</option>
                  <option value="driver_license">Driver&apos;s license</option>
                  <option value="passport">Passport</option>
                  <option value="state_id">State or provincial ID</option>
                  <option value="other">Other government ID</option>
                </select>
              </label>
              <div className="grid gap-5 md:grid-cols-2">
                {renderDocumentUpload('id_front', 'Front of ID')}
                {renderDocumentUpload('id_back', 'Back of ID')}
              </div>
              {renderDocumentUpload('selfie_with_id', 'Selfie with ID')}
            </div>
            <div className="rounded-2xl border border-ff-border bg-ff-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
                Uploaded files
              </p>
              <div className="mt-4 space-y-2 text-sm text-ff-text">
                {getDocumentsForSlot('id_front').map((document) => (
                  <div key={document.id}>{document.file_name.replace(UPLOAD_SLOTS.id_front.prefix, '')}</div>
                ))}
                {getDocumentsForSlot('id_back').map((document) => (
                  <div key={document.id}>{document.file_name.replace(UPLOAD_SLOTS.id_back.prefix, '')}</div>
                ))}
                {getDocumentsForSlot('selfie_with_id').map((document) => (
                  <div key={document.id}>{document.file_name.replace(UPLOAD_SLOTS.selfie_with_id.prefix, '')}</div>
                ))}
                {!getDocumentsForSlot('id_front').length &&
                !getDocumentsForSlot('id_back').length &&
                !getDocumentsForSlot('selfie_with_id').length ? (
                  <div className="text-ff-muted">No identity files uploaded yet.</div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {currentStep === 'bank_statements' ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="max-w-2xl text-sm leading-6 text-ff-muted">
                Upload business bank statements and the current month-to-date statement as part of the same step.
              </p>
              {renderDocumentUpload('bank_statements', 'Business bank statements', true)}
              {renderDocumentUpload('mtd_statement', 'Month-to-date statement')}
            </div>
            <div className="rounded-2xl border border-ff-border bg-ff-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
                Uploaded files
              </p>
              <div className="mt-4 space-y-2 text-sm text-ff-text">
                {getDocumentsForSlot('bank_statements').map((document) => (
                  <div key={document.id}>{document.file_name.replace(UPLOAD_SLOTS.bank_statements.prefix, '')}</div>
                ))}
                {getDocumentsForSlot('mtd_statement').map((document) => (
                  <div key={document.id}>{document.file_name.replace(UPLOAD_SLOTS.mtd_statement.prefix, '')}</div>
                ))}
                {!getDocumentsForSlot('bank_statements').length && !getDocumentsForSlot('mtd_statement').length ? (
                  <div className="text-ff-muted">No statements uploaded yet.</div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {currentStep === 'final_review' ? (
          <div className="mt-8 space-y-6">
            <p className="max-w-2xl text-sm leading-6 text-ff-muted">
              Review the application sequence and submit when every required section and document has been completed.
            </p>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {steps.slice(0, -1).map((step, index) => (
                <div key={step.key} className="rounded-2xl border border-ff-border bg-ff-surface px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-muted">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ff-text">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {error ? <p className="mt-6 text-sm text-rose-600">{error}</p> : null}
        {message ? <p className="mt-6 text-sm text-emerald-700">{message}</p> : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setError(null)
              setMessage(null)
              setCurrentStepIndex((current) => Math.max(current - 1, 0))
            }}
            disabled={currentStepIndex === 0 || isWorking || isSubmitting}
            className="rounded-xl border border-ff-border px-5 py-3 text-sm font-semibold text-ff-text transition-colors hover:border-ff-accent hover:text-ff-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          {currentStep === 'final_review' ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-xl bg-ff-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ff-glow disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? t.portal.application.submitting : t.portal.application.submit}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={isWorking}
              className="rounded-xl bg-ff-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ff-glow disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isWorking ? t.portal.application.saving : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
