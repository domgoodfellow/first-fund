import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getPostAuthRedirect } from '@/lib/auth/guards'
import { getSupabaseEnv } from '@/lib/auth/config'

function isAuthRoute(pathname: string) {
  return pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/forgot-password'
}

function isProtectedRoute(pathname: string) {
  return pathname.startsWith('/portal') || pathname.startsWith('/admin') || pathname === '/apply'
}

export async function proxy(request: NextRequest) {
  const env = getSupabaseEnv()

  if (!env || !isProtectedRoute(request.nextUrl.pathname) && !isAuthRoute(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value)
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  if (!user) {
    if (pathname.startsWith('/portal') || pathname.startsWith('/admin')) {
      const signInUrl = request.nextUrl.clone()
      signInUrl.pathname = '/sign-in'
      signInUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(signInUrl)
    }

    return response
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  const role = profile?.role ?? 'client'

  if (pathname === '/apply' || isAuthRoute(pathname)) {
    const applyRedirect = request.nextUrl.clone()
    applyRedirect.pathname = getPostAuthRedirect(role)
    applyRedirect.search = ''
    return NextResponse.redirect(applyRedirect)
  }

  if (pathname.startsWith('/admin') && role !== 'admin') {
    const portalRedirect = request.nextUrl.clone()
    portalRedirect.pathname = '/portal/dashboard'
    portalRedirect.search = ''
    return NextResponse.redirect(portalRedirect)
  }

  return response
}

export const config = {
  matcher: ['/apply', '/sign-in', '/sign-up', '/forgot-password', '/portal/:path*', '/admin/:path*'],
}
