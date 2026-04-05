import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/auth/server'

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()

  const url = new URL('/sign-in', request.url)
  return NextResponse.json({ ok: true, redirectTo: url.toString() })
}
