import { createAdminSupabaseClientOrNull } from '@/lib/auth/server'

/**
 * Shared rate limiter backed by Supabase via a security-definer RPC.
 *
 * Falls back to in-memory counters when the service-role key is unavailable so
 * local development keeps working without extra setup.
 */

const store = new Map<string, number[]>()

export interface RateLimitResult {
  allowed: boolean
  retryAfter?: number
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const supabase = createAdminSupabaseClientOrNull()

  if (supabase) {
    const { data, error } = await supabase.rpc('consume_rate_limit', {
      p_key: key,
      p_limit: limit,
      p_window_seconds: Math.max(1, Math.ceil(windowMs / 1000)),
    })

    if (!error && Array.isArray(data) && data[0]) {
      return {
        allowed: Boolean(data[0].allowed),
        retryAfter:
          typeof data[0].retry_after === 'number' ? data[0].retry_after : undefined,
      }
    }

    console.error('[rate-limit] backend limiter failed, using memory fallback:', error)
  }

  return checkInMemoryRateLimit(key, limit, windowMs)
}

function checkInMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now()
  const windowStart = now - windowMs

  const timestamps = (store.get(key) ?? []).filter((t) => t > windowStart)

  if (timestamps.length >= limit) {
    const oldest = timestamps[0]
    const retryAfter = Math.ceil((oldest + windowMs - now) / 1000)
    return { allowed: false, retryAfter }
  }

  timestamps.push(now)
  store.set(key, timestamps)
  return { allowed: true }
}

export function getClientIp(request: Request): string {
  const headers = request.headers
  return (
    headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  )
}

export function buildRateLimitKey(parts: Array<string | null | undefined>) {
  return parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(':')
}
