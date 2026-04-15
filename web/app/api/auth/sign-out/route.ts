import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/auth/server'
import { isAllowedOrigin } from '@/lib/security/origin'

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()

  const url = new URL('/sign-in', request.url)
  return NextResponse.json({ ok: true, redirectTo: url.toString() })
}
