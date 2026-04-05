import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { createSignedUpload } from '@/lib/storage/signed-urls'
import { assertUploadConstraints, buildStoragePath } from '@/lib/storage/upload'
import { uploadSignSchema } from '@/lib/validations/documents'

export async function POST(request: Request) {
  try {
    const context = await getAuthContext()

    if (!context.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const payload = uploadSignSchema.parse(await request.json())
    assertUploadConstraints(payload.mimeType, payload.sizeBytes)

    const storagePath = buildStoragePath({
      ownerId: context.user.id,
      applicationId: payload.applicationId,
      category: payload.category,
      fileName: payload.fileName,
    })

    const signedUpload = await createSignedUpload(storagePath)

    return NextResponse.json({
      ok: true,
      storagePath,
      ...signedUpload,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to sign upload.' },
      { status: 500 },
    )
  }
}
