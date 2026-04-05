'use client'

import { useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/auth/client'
import type { DocumentCategory, DocumentRecord } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface DocumentUploaderProps {
  applicationId: string
  initialDocuments: DocumentRecord[]
}

const CATEGORY_OPTIONS: DocumentCategory[] = [
  'bank_statements',
  'government_id',
  'void_cheque',
  'incorporation_docs',
  'tax_returns',
  'financial_statements',
  'other_supporting_docs',
]

export default function DocumentUploader({
  applicationId,
  initialDocuments,
}: DocumentUploaderProps) {
  const { t } = useLanguage()
  const [documents, setDocuments] = useState(initialDocuments)
  const [category, setCategory] = useState<DocumentCategory>('bank_statements')
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function uploadDocument() {
    if (!file) return

    setIsUploading(true)
    setError(null)
    setMessage(null)

    try {
      const signResponse = await fetch('/api/uploads/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          category,
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        }),
      })
      const signPayload = await signResponse.json()
      if (!signResponse.ok) {
        throw new Error(signPayload.error ?? t.portal.errors.generic)
      }

      const supabase = createBrowserSupabaseClient()
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
          applicationId,
          category,
          fileName: file.name,
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
          application_id: applicationId,
          owner_profile_id: '',
          category,
          file_name: file.name,
          storage_path: signPayload.path,
          mime_type: file.type,
          size_bytes: file.size,
          status: 'uploaded',
        },
        ...current,
      ])
      setFile(null)
      setMessage(t.portal.documents.uploadSuccess)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.portal.errors.generic)
    } finally {
      setIsUploading(false)
    }
  }

  async function openSignedUrl(storagePath: string) {
    const response = await fetch('/api/documents/signed-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storagePath }),
    })
    const payload = await response.json()

    if (response.ok && payload.url) {
      window.open(payload.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="rounded-2xl border border-ff-border bg-white p-6 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
          {t.portal.documents.uploadEyebrow}
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-ff-text">
          {t.portal.documents.uploadTitle}
        </h2>

        <div className="mt-8 space-y-5">
          <label className="flex flex-col gap-1.5">
            <span className="block text-ff-muted text-xs font-semibold uppercase tracking-wide">
              {t.portal.documents.category}
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as DocumentCategory)}
              className="rounded-xl border border-ff-border bg-ff-bg px-4 py-3 text-sm text-ff-text"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="block text-ff-muted text-xs font-semibold uppercase tracking-wide">
              {t.portal.documents.file}
            </span>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="rounded-xl border border-ff-border bg-ff-bg px-4 py-3 text-sm text-ff-text"
            />
          </label>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

          <button
            type="button"
            onClick={uploadDocument}
            disabled={isUploading || !file}
            className="rounded-xl bg-ff-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ff-glow disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? t.portal.documents.uploading : t.portal.documents.upload}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-ff-border bg-white p-6 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
          {t.portal.documents.listEyebrow}
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-ff-text">
          {t.portal.documents.listTitle}
        </h2>

        <div className="mt-6 space-y-3">
          {documents.length ? (
            documents.map((document) => (
              <div
                key={`${document.storage_path}-${document.id}`}
                className="rounded-2xl border border-ff-border bg-ff-surface px-4 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ff-text">{document.file_name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ff-muted">
                      {document.category.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openSignedUrl(document.storage_path)}
                    className="text-sm font-semibold text-ff-accent hover:underline"
                  >
                    {t.portal.documents.view}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-ff-muted">{t.portal.documents.empty}</p>
          )}
        </div>
      </div>
    </div>
  )
}
