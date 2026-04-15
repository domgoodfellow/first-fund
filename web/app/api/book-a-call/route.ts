import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { createLeadRequest } from '@/lib/db/mutations'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { leadRequestSchema } from '@/lib/validations/contact'
import { verifyTurnstileToken } from '@/lib/turnstile'

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const { allowed, retryAfter } = await checkRateLimit(
      buildRateLimitKey(['public', 'book-a-call', ip]),
      5,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const payload = leadRequestSchema.parse(await request.json())
    const turnstile = await verifyTurnstileToken(payload.turnstileToken, {
      expectedAction: 'book-a-call',
      remoteIp: ip,
    })

    if (!turnstile.success) {
      console.warn('[book-a-call] Turnstile failed:', turnstile.error)
      return NextResponse.json(
        { error: 'Turnstile verification failed.' },
        { status: 400 },
      )
    }

    await createLeadRequest({
      full_name: payload.fullName,
      business_name: payload.businessName || null,
      email: payload.email,
      phone: payload.phone,
      funding_goal: payload.fundingGoal,
      call_time: payload.callTime,
      notes: [
        `Time in business: ${payload.timeInBusiness}`,
        `Monthly revenue: ${payload.monthlyRevenue}`,
        payload.notes?.trim() ? `Notes: ${payload.notes.trim()}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to submit booking request.' },
      { status: 500 },
    )
  }
}
