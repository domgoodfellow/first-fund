import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { createApplicationNote } from '@/lib/db/mutations'
import { adminNoteSchema } from '@/lib/validations/application'

export async function POST(request: Request) {
  try {
    const context = await getAuthContext()

    if (!context.user || context.profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const payload = adminNoteSchema.parse(await request.json())
    await createApplicationNote({
      applicationId: payload.applicationId,
      authorProfileId: context.user.id,
      body: payload.body,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to create note.' },
      { status: 500 },
    )
  }
}
