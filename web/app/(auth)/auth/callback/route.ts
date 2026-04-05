import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/auth/server'
import { getPostAuthRedirect } from '@/lib/auth/guards'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next')
  const redirectTo = new URL(next || '/', request.url)

  if (code) {
    const supabase = await createServerSupabaseClient()
    await supabase.auth.exchangeCodeForSession(code)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      redirectTo.pathname = next || getPostAuthRedirect(profile?.role)
      redirectTo.search = ''
      return NextResponse.redirect(redirectTo)
    }
  }

  redirectTo.pathname = '/sign-in'
  redirectTo.searchParams.set('error', 'Unable to complete sign-in.')
  return NextResponse.redirect(redirectTo)
}
