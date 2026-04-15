import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { submitApplication, logActivity } from '@/lib/db/mutations'
import { applicationBelongsToUser } from '@/lib/db/queries'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { submitApplicationSchema } from '@/lib/validations/application'

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const context = await getAuthContext()

    if (!context.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const ip = getClientIp(request)
    const { allowed, retryAfter } = await checkRateLimit(
      buildRateLimitKey(['application', 'submit', context.user.id, ip]),
      10,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const payload = submitApplicationSchema.parse(await request.json())
    const owned = await applicationBelongsToUser(payload.applicationId, context.user.id)
    if (!owned) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    await submitApplication({
      applicationId: payload.applicationId,
      submittedByProfileId: context.user.id,
    })
    await logActivity({
      applicationId: payload.applicationId,
      actorId: context.user.id,
      action: 'application_submitted',
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to submit application.' },
      { status: 500 },
    )
  }
}
