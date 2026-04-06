/**
 * Simple in-memory sliding-window rate limiter.
 *
 * NOTE: This is per-process. On serverless platforms each cold-start gets a
 * fresh counter. For production enforcement use @upstash/ratelimit + Vercel KV.
 */

// Map from key → array of request timestamps within the current window
const store = new Map<string, number[]>()

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfter?: number } {
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

/** Extract the best available client IP from a Next.js request. */
export function getClientIp(request: Request): string {
  const headers = request.headers
  return (
    headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  )
}
