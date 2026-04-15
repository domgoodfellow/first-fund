import { NextResponse } from 'next/server'
import { getAuthContext } from '@/lib/auth/guards'
import { getPortalDashboard } from '@/lib/db/queries'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  const context = await getAuthContext()

  if (!context.user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const ip = getClientIp(request)
  const { allowed, retryAfter } = await checkRateLimit(
    buildRateLimitKey(['application', 'resume', context.user.id, ip]),
    30,
    60_000,
  )
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
    )
  }

  const snapshot = await getPortalDashboard(context.user.id)
  return NextResponse.json(snapshot)
}
