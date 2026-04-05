import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { createSignedDownloadUrl } from '@/lib/storage/signed-urls'
import { signedUrlSchema } from '@/lib/validations/documents'

export async function POST(request: Request) {
  try {
    const context = await getAuthContext()

    if (!context.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const payload = signedUrlSchema.parse(await request.json())
    const url = await createSignedDownloadUrl(payload.storagePath)

    return NextResponse.json({ ok: true, url })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to create signed URL.' },
      { status: 500 },
    )
  }
}
