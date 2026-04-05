import { NextResponse } from 'next/server'
import { getAuthContext } from '@/lib/auth/guards'
import { getPortalDashboard } from '@/lib/db/queries'

export async function POST() {
  const context = await getAuthContext()

  if (!context.user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const snapshot = await getPortalDashboard(context.user.id)
  return NextResponse.json(snapshot)
}
