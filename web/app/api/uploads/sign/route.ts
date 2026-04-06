import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { createSignedUpload } from '@/lib/storage/signed-urls'
import { assertUploadConstraints, buildStoragePath } from '@/lib/storage/upload'
import { uploadSignSchema } from '@/lib/validations/documents'
import { applicationBelongsToUser } from '@/lib/db/queries'
import { isAllowedOrigin } from '@/lib/security/origin'
import { checkRateLimit, getClientIp } from '@/lib/security/ratelimit'

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const { allowed, retryAfter } = checkRateLimit(`${ip}:sign`, 10, 60_000)
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

    const payload = uploadSignSchema.parse(await request.json())
    assertUploadConstraints(payload.mimeType, payload.sizeBytes)

    // Verify the application belongs to the requesting user (admins are exempt).
    const isAdmin = context.profile?.role === 'admin'
    if (!isAdmin) {
      const owned = await applicationBelongsToUser(payload.applicationId, context.user.id)
      if (!owned) {
        return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
      }
    }

    const storagePath = buildStoragePath({
      ownerId: context.user.id,
      applicationId: payload.applicationId,
      category: payload.category,
      fileName: payload.fileName,
    })

    const signedUpload = await createSignedUpload(storagePath)

    return NextResponse.json({
      ok: true,
      storagePath,
      ...signedUpload,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to sign upload.' },
      { status: 500 },
    )
  }
}
