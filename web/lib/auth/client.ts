'use client'

import { createBrowserClient } from '@supabase/ssr'
import { requireSupabaseEnv } from '@/lib/auth/config'

let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function createBrowserSupabaseClient() {
  if (!browserClient) {
    const env = requireSupabaseEnv()
    browserClient = createBrowserClient(env.url, env.anonKey)
  }

  return browserClient
}
