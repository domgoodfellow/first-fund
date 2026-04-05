import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import { completeDocumentUpload } from '@/lib/db/mutations'
import { uploadCompleteSchema } from '@/lib/validations/documents'

export async function POST(request: Request) {
  try {
    const context = await getAuthContext()

    if (!context.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const payload = uploadCompleteSchema.parse(await request.json())

    await completeDocumentUpload({
      application_id: payload.applicationId,
      owner_profile_id: context.user.id,
      category: payload.category,
      file_name: payload.fileName,
      storage_path: payload.storagePath,
      mime_type: payload.mimeType,
      size_bytes: payload.sizeBytes,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to complete upload.' },
      { status: 500 },
    )
  }
}
