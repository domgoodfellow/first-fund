import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { changeApplicationStatus } from '@/lib/db/mutations'
import { statusChangeSchema } from '@/lib/validations/application'

export async function POST(request: Request) {
  try {
    const context = await getAuthContext()

    if (!context.user || context.profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const payload = statusChangeSchema.parse(await request.json())
    await changeApplicationStatus({
      applicationId: payload.applicationId,
      changedByProfileId: context.user.id,
      status: payload.status,
      note: payload.note || null,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to change status.' },
      { status: 500 },
    )
  }
}
