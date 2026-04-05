import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { requireSupabaseEnv } from '@/lib/auth/config'

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
