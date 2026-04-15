import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { createContactInquiry } from '@/lib/db/mutations'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { contactInquirySchema } from '@/lib/validations/contact'
import { verifyTurnstileToken } from '@/lib/turnstile'

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const { allowed, retryAfter } = await checkRateLimit(
      buildRateLimitKey(['public', 'contact', ip]),
      5,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    const payload = contactInquirySchema.parse(await request.json())
    const turnstile = await verifyTurnstileToken(payload.turnstileToken, {
      expectedAction: 'contact',
      remoteIp: ip,
    })

    if (!turnstile.success) {
      console.warn('[contact] Turnstile failed:', turnstile.error)
      return NextResponse.json(
        { error: 'Turnstile verification failed.' },
        { status: 400 },
      )
    }

    await createContactInquiry({
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone || null,
      subject: payload.subject,
      message: payload.message,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to submit inquiry.' },
      { status: 500 },
    )
  }
}
