import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { completeDocumentUpload, logActivity, updateDocumentScanStatus } from '@/lib/db/mutations'
import { uploadCompleteSchema } from '@/lib/validations/documents'
import { applicationBelongsToUser } from '@/lib/db/queries'
import { isAllowedOrigin } from '@/lib/security/origin'
import { checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { scanDocument } from '@/lib/security/scanner'

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const { allowed, retryAfter } = checkRateLimit(`${ip}:complete`, 20, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const context = await getAuthContext()

    if (!context.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const payload = uploadCompleteSchema.parse(await request.json())

    const isAdmin = context.profile?.role === 'admin'

    if (!isAdmin) {
      // Verify application ownership.
      const owned = await applicationBelongsToUser(payload.applicationId, context.user.id)
      if (!owned) {
        return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
      }

      // Verify the storage path was issued for this user (starts with their id).
      if (!payload.storagePath.startsWith(`${context.user.id}/`)) {
        return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
      }
    }

    await completeDocumentUpload({
      application_id: payload.applicationId,
      owner_profile_id: context.user.id,
      category: payload.category,
      file_name: payload.fileName,
      storage_path: payload.storagePath,
      mime_type: payload.mimeType,
      size_bytes: payload.sizeBytes,
    })

    // Run virus scan (no-op when VIRUSTOTAL_API_KEY is not set).
    // Fire-and-forget: we do not block the response on the result.
    scanDocument(payload.storagePath).then((scanStatus) => {
      if (scanStatus !== 'pending') {
        updateDocumentScanStatus({ storagePath: payload.storagePath, scanStatus })
      }
    }).catch((err) => {
      console.error('[upload/complete] scan error:', err)
    })

    await logActivity({
      applicationId: payload.applicationId,
      actorId: context.user.id,
      action: 'document_uploaded',
      metadata: { category: payload.category, fileName: payload.fileName },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to complete upload.' },
      { status: 500 },
    )
  }
}
