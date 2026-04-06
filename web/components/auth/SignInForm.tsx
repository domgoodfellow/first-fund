'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/auth/client'
import { isSupabaseConfigured } from '@/lib/auth/config'
import { Field, SubmitButton } from '@/components/forms/FormPrimitives'
import { useLanguage } from '@/contexts/LanguageContext'
import type { AppRole } from '@/lib/types'

interface SignInFormProps {
  nextPath: string
  initialError?: string | null
}

function getPostAuthRedirect(role: AppRole | null | undefined) {
  return role === 'admin' ? '/admin/applications' : '/portal/dashboard'
}

export default function SignInForm({
  nextPath,
  initialError = null,
}: SignInFormProps) {
  const { t } = useLanguage()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(initialError)

  async function handlePasswordSignIn(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase auth is not configured.')
      }

      const supabase = createBrowserSupabaseClient()
      const {
        data: { user },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw signInError
      }

      let redirectPath = nextPath

      if (user && nextPath === '/portal/dashboard') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle()

        redirectPath = getPostAuthRedirect(profile?.role)
      }

      router.push(redirectPath)
      router.refresh()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.auth.errors.generic)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleMagicLink() {
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase auth is not configured.')
      }

      const supabase = createBrowserSupabaseClient()
      const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: callbackUrl,
        },
      })

      if (otpError) {
        throw otpError
      }

      setMessage(t.auth.signIn.magicLinkSent)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.auth.errors.generic)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handlePasswordSignIn} className="space-y-5">
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
        placeholder="••••••••"
        required
      />

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

      <div className="space-y-3">
        <SubmitButton
          label={isSubmitting ? t.auth.signIn.submitting : t.auth.signIn.submit}
          disabled={isSubmitting || !email || !password}
        />
        <button
          type="button"
          onClick={handleMagicLink}
          disabled={isSubmitting || !email}
          className="w-full rounded-xl border border-ff-border px-4 py-3 text-sm font-semibold text-ff-text transition-colors hover:border-ff-accent hover:text-ff-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t.auth.signIn.magicLink}
        </button>
      </div>
    </form>
  )
}
