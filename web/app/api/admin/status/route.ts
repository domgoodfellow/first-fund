import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { changeApplicationStatus, logActivity } from '@/lib/db/mutations'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { statusChangeSchema } from '@/lib/validations/application'

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
      buildRateLimitKey(['admin', 'status', context.user.id, ip]),
      30,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const payload = statusChangeSchema.parse(await request.json())
    await changeApplicationStatus({
      applicationId: payload.applicationId,
      changedByProfileId: context.user.id,
      status: payload.status,
      note: payload.note || null,
    })
    await logActivity({
      applicationId: payload.applicationId,
      actorId: context.user.id,
      action: 'status_changed',
      metadata: { status: payload.status, note: payload.note || null },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to change status.' },
      { status: 500 },
    )
  }
}
