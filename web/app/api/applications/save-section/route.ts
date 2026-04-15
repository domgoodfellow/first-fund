import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { getOrCreateApplicationForClient } from '@/lib/db/queries'
import { saveApplicationSection } from '@/lib/db/mutations'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { saveApplicationSectionSchema } from '@/lib/validations/application'

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
      buildRateLimitKey(['application', 'save-section', context.user.id, ip]),
      60,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const payload = saveApplicationSectionSchema.parse(await request.json())
    const application = await getOrCreateApplicationForClient(context.user.id)

    if (!application) {
      return NextResponse.json(
        { error: 'Unable to create or load the application.' },
        { status: 500 },
      )
    }

    await saveApplicationSection({
      applicationId: application.id,
      sectionKey: payload.sectionKey,
      data: payload.data,
    })

    return NextResponse.json({ ok: true, applicationId: application.id })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to save section.' },
      { status: 500 },
    )
  }
}
