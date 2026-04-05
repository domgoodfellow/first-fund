import { APPLICATION_DOCUMENT_BUCKET } from '@/lib/auth/config'
import type { DocumentCategory } from '@/lib/types'

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
])

export function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, '-')
    .replace(/-+/g, '-')
}

export function assertUploadConstraints(mimeType: string, sizeBytes: number) {
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error('Unsupported file type.')
  }

  if (sizeBytes > 20 * 1024 * 1024) {
    throw new Error('File exceeds the 20MB upload limit.')
  }
}

export function buildStoragePath(params: {
  ownerId: string
  applicationId: string
  category: DocumentCategory
  fileName: string
}) {
  const safeName = sanitizeFileName(params.fileName)
  return `${params.ownerId}/${params.applicationId}/${params.category}/${Date.now()}-${safeName}`
}

export function getDocumentBucketName() {
  return APPLICATION_DOCUMENT_BUCKET
}
