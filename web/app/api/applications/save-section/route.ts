import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { getOrCreateApplicationForClient } from '@/lib/db/queries'
import { saveApplicationSection } from '@/lib/db/mutations'
import { saveApplicationSectionSchema } from '@/lib/validations/application'

export async function POST(request: Request) {
  try {
    const context = await getAuthContext()

    if (!context.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const payload = saveApplicationSectionSchema.parse(await request.json())
    const application = await getOrCreateApplicationForClient(context.user.id)

    if (!application) {
      return NextResponse.json(
        { error: 'Unable to create or load the application.' },
        { status: 500 },
      )
    }

    await saveApplicationSection({
      applicationId: application.id,
      sectionKey: payload.sectionKey,
      data: payload.data,
    })

    return NextResponse.json({ ok: true, applicationId: application.id })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to save section.' },
      { status: 500 },
    )
  }
}
