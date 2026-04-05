'use client'

import type { DocumentRecord } from '@/lib/types'

interface DocumentReviewListProps {
  documents: DocumentRecord[]
}

export default function DocumentReviewList({
  documents,
}: DocumentReviewListProps) {
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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
        Documents
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900">
        Uploaded files
      </h2>

      <div className="mt-6 space-y-3">
        {documents.length ? (
          documents.map((document) => (
            <div
              key={`${document.id}-${document.storage_path}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{document.file_name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                    {document.category.replace(/_/g, ' ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openSignedUrl(document.storage_path)}
                  className="text-sm font-semibold text-blue-700 hover:underline"
                >
                  Open
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-600">No documents uploaded yet.</p>
        )}
      </div>
    </div>
  )
}
