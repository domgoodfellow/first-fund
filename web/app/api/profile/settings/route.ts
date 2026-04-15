import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { updateClientSettings } from '@/lib/db/mutations'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { profileSettingsSchema } from '@/lib/validations/application'

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
      buildRateLimitKey(['profile', 'settings', context.user.id, ip]),
      20,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const payload = profileSettingsSchema.parse(await request.json())
    await updateClientSettings({
      userId: context.user.id,
      language: payload.language,
      market: payload.market,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to update settings.' },
      { status: 500 },
    )
  }
}
