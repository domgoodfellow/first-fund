export async function verifyTurnstileToken(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    throw new Error('Turnstile secret key is not configured.')
  }

  const formData = new FormData()
  formData.set('secret', secret)
  formData.set('response', token)

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: formData,
    },
  )

  const payload = (await response.json()) as { success?: boolean }

  return payload.success === true
}
