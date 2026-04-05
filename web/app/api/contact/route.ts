import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { createContactInquiry } from '@/lib/db/mutations'
import { contactInquirySchema } from '@/lib/validations/contact'
import { verifyTurnstileToken } from '@/lib/turnstile'

export async function POST(request: Request) {
  try {
    const payload = contactInquirySchema.parse(await request.json())
    const isHuman = await verifyTurnstileToken(payload.turnstileToken)

    if (!isHuman) {
      return NextResponse.json(
        { error: 'Turnstile verification failed.' },
        { status: 400 },
      )
    }

    await createContactInquiry({
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone || null,
      subject: payload.subject,
      message: payload.message,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to submit inquiry.' },
      { status: 500 },
    )
  }
}
