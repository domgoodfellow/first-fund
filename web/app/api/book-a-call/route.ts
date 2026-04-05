import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { createLeadRequest } from '@/lib/db/mutations'
import { leadRequestSchema } from '@/lib/validations/contact'
import { verifyTurnstileToken } from '@/lib/turnstile'

export async function POST(request: Request) {
  try {
    const payload = leadRequestSchema.parse(await request.json())
    const isHuman = await verifyTurnstileToken(payload.turnstileToken)

    if (!isHuman) {
      return NextResponse.json(
        { error: 'Turnstile verification failed.' },
        { status: 400 },
      )
    }

    await createLeadRequest({
      full_name: payload.fullName,
      business_name: payload.businessName || null,
      email: payload.email,
      phone: payload.phone,
      funding_goal: payload.fundingGoal,
      call_time: payload.callTime,
      notes: payload.notes || null,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to submit booking request.' },
      { status: 500 },
    )
  }
}
