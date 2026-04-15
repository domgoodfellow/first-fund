interface TurnstileVerifyOptions {
  /** If provided, the token's `action` field must match. */
  expectedAction?: string
  /**
   * If provided, the token's `hostname` field must match.
   * Defaults to the host portion of NEXT_PUBLIC_SITE_URL when set.
   */
  expectedHostname?: string
  /** Optional visitor IP forwarded to Cloudflare siteverify. */
  remoteIp?: string
}

interface TurnstileResult {
  success: boolean
  /** Present on failure — use for server-side logging only, not user display. */
  error?: string
}

export async function verifyTurnstileToken(
  token: string,
  options: TurnstileVerifyOptions = {},
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    return { success: false, error: 'Turnstile secret key is not configured.' }
  }

  const formData = new FormData()
  formData.set('secret', secret)
  formData.set('response', token)
  if (options.remoteIp) {
    formData.set('remoteip', options.remoteIp)
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body: formData },
  )

  if (!response.ok) {
    return { success: false, error: `Turnstile HTTP error: ${response.status}` }
  }

  const payload = (await response.json()) as {
    success?: boolean
    action?: string
    hostname?: string
    'error-codes'?: string[]
  }

  if (!payload.success) {
    const codes = payload['error-codes']?.join(', ') ?? 'unknown'
    return { success: false, error: `Turnstile rejected: ${codes}` }
  }

  // Validate action when the caller specifies one.
  if (options.expectedAction && payload.action !== options.expectedAction) {
    return {
      success: false,
      error: `Turnstile action mismatch: expected "${options.expectedAction}", got "${payload.action}"`,
    }
  }

  // Validate hostname — derive from NEXT_PUBLIC_SITE_URL if not explicitly passed.
  const expectedHostname =
    options.expectedHostname ??
    (process.env.NEXT_PUBLIC_SITE_URL
      ? (() => {
          try {
            return new URL(process.env.NEXT_PUBLIC_SITE_URL!).hostname
          } catch {
            return undefined
          }
        })()
      : undefined)

  if (expectedHostname && payload.hostname !== expectedHostname) {
    return {
      success: false,
      error: `Turnstile hostname mismatch: expected "${expectedHostname}", got "${payload.hostname}"`,
    }
  }

  return { success: true }
}
