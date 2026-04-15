import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { createSignedDownloadUrl } from '@/lib/storage/signed-urls'
import { signedUrlSchema } from '@/lib/validations/documents'
import { getDocumentByStoragePath } from '@/lib/db/queries'
import { logActivity } from '@/lib/db/mutations'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const context = await getAuthContext()

    if (!context.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const { allowed, retryAfter } = await checkRateLimit(
      buildRateLimitKey(['document', 'signed-url', context.user.id, ip]),
      30,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const payload = signedUrlSchema.parse(await request.json())

    // Look up the document to verify ownership and scan status.
    const doc = await getDocumentByStoragePath(payload.storagePath)

    if (!doc) {
      return NextResponse.json({ error: 'Document not found.' }, { status: 404 })
    }

    const isAdmin = context.profile?.role === 'admin'

    if (!isAdmin && doc.owner_profile_id !== context.user.id) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    if (doc.scan_status === 'quarantined') {
      return NextResponse.json(
        { error: 'File quarantined.' },
        { status: 403 },
      )
    }

    const url = await createSignedDownloadUrl(payload.storagePath)

    await logActivity({
      applicationId: doc.application_id,
      actorId: context.user.id,
      action: 'document_accessed',
      metadata: { storagePath: payload.storagePath },
    })

    return NextResponse.json({ ok: true, url })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to create signed URL.' },
      { status: 500 },
    )
  }
}
