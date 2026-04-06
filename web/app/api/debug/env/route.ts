import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    {
      supabaseUrlPresent: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      supabaseAnonKeyPresent: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
