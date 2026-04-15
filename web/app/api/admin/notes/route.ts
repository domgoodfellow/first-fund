import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { createApplicationNote, logActivity } from '@/lib/db/mutations'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { adminNoteSchema } from '@/lib/validations/application'

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const context = await getAuthContext()

    if (!context.user || context.profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const { allowed, retryAfter } = await checkRateLimit(
      buildRateLimitKey(['admin', 'note', context.user.id, ip]),
      30,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const payload = adminNoteSchema.parse(await request.json())
    await createApplicationNote({
      applicationId: payload.applicationId,
      authorProfileId: context.user.id,
      body: payload.body,
    })
    await logActivity({
      applicationId: payload.applicationId,
      actorId: context.user.id,
      action: 'admin_note_created',
      metadata: { bodyLength: payload.body.length },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to create note.' },
      { status: 500 },
    )
  }
}
