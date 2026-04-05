import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { updateClientSettings } from '@/lib/db/mutations'
import { profileSettingsSchema } from '@/lib/validations/application'

export async function POST(request: Request) {
  try {
    const context = await getAuthContext()

    if (!context.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const payload = profileSettingsSchema.parse(await request.json())
    await updateClientSettings({
      userId: context.user.id,
      language: payload.language,
      market: payload.market,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to update settings.' },
      { status: 500 },
    )
  }
}
