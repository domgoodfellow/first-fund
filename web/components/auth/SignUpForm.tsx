'use client'

import { useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/auth/client'
import { isSupabaseConfigured } from '@/lib/auth/config'
import { Field, SubmitButton } from '@/components/forms/FormPrimitives'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SignUpForm() {
  const { t, language } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase auth is not configured.')
      }

      const supabase = createBrowserSupabaseClient()
      const redirectTo = `${window.location.origin}/auth/callback`
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            language,
            market: 'us',
          },
        },
      })

      if (signUpError) {
        throw signUpError
      }

      setMessage(t.auth.signUp.success)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.auth.errors.generic)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field
        label={t.auth.fields.email}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="jane@business.com"
        required
      />
      <Field
        label={t.auth.fields.password}
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Choose a secure password"
        required
      />

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

      <SubmitButton
        label={isSubmitting ? t.auth.signUp.submitting : t.auth.signUp.submit}
        disabled={isSubmitting || !email || !password}
      />
    </form>
  )
}
