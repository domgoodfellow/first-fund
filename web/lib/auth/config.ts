import type { Language } from '@/lib/i18n'

export const APPLICATION_DOCUMENT_BUCKET = 'application-documents'

export interface SupabaseEnv {
  url: string
  anonKey: string
}

export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return null
  }

  return { url, anonKey }
}

export function requireSupabaseEnv(): SupabaseEnv {
  const env = getSupabaseEnv()

  if (!env) {
    throw new Error('Missing Supabase environment variables.')
  }

  return env
}

export function isSupabaseConfigured() {
  return getSupabaseEnv() !== null
}

export function isTurnstileConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
      process.env.TURNSTILE_SECRET_KEY,
  )
}

export function getTurnstileSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
}

export function getDefaultClientLanguage(value?: string | null): Language {
  return value === 'es' ? 'es' : 'en'
}
