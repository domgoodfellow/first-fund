/**
 * CSRF / origin check for mutating API routes.
 *
 * Verifies that the request Origin (or Referer) matches the configured site
 * URL, blocking cross-site requests that carry the user's cookies.
 *
 * Set NEXT_PUBLIC_SITE_URL in your environment (e.g. https://app.example.com).
 * In development (NODE_ENV !== 'production') the check is skipped so that
 * tools like curl and local test scripts keep working.
 */
export function isAllowedOrigin(request: Request): boolean {
  if (process.env.NODE_ENV !== 'production') return true

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) return true // not configured — skip rather than block everything

  let expectedHost: string
  try {
    expectedHost = new URL(siteUrl).host
  } catch {
    return true // misconfigured — fail open with a warning
  }

  // Prefer Origin; fall back to Referer (which includes the path).
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      return new URL(origin).host === expectedHost
    } catch {
      return false
    }
  }

  const referer = request.headers.get('referer')
  if (referer) {
    try {
      return new URL(referer).host === expectedHost
    } catch {
      return false
    }
  }

  // No Origin or Referer — block to be safe.
  return false
}
