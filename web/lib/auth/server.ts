import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { getSupabaseEnv, getSupabaseServiceRoleKey, requireSupabaseEnv } from '@/lib/auth/config'

export async function createServerSupabaseClient() {
  const env = requireSupabaseEnv()
  const cookieStore = await cookies()

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Components can read cookies but may not be able to mutate them.
        }
      },
    },
  })
}

export function createAdminSupabaseClient() {
  const env = getSupabaseEnv()
  const serviceRoleKey = getSupabaseServiceRoleKey()

  if (!env || !serviceRoleKey) {
    throw new Error('Missing Supabase service-role configuration.')
  }

  return createClient(env.url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function createAdminSupabaseClientOrNull() {
  const env = getSupabaseEnv()
  const serviceRoleKey = getSupabaseServiceRoleKey()

  if (!env || !serviceRoleKey) {
    return null
  }

  return createClient(env.url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
