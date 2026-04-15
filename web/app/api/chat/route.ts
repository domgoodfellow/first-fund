import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getAuthContext } from '@/lib/auth/guards'
import {
  CHAT_SYSTEM_PROMPT,
  ChatMessage,
  getChatMode,
  getChatProvider,
  MAX_CHAT_RESPONSE_CHARS,
} from '@/lib/chat/config'
import {
  loadChatHistory,
  persistChatEscalation,
  persistChatMessage,
  persistChatSession,
} from '@/lib/chat/persistence'
import { isAllowedOrigin } from '@/lib/security/origin'
import { buildRateLimitKey, checkRateLimit, getClientIp } from '@/lib/security/ratelimit'
import { chatRequestSchema } from '@/lib/validations/chat'

export const runtime = 'nodejs'

function parseEscalation(text: string): { reason: string } | null {
  const match = text.match(/\{"action"\s*:\s*"escalate".*?\}/)
  if (!match) return null

  try {
    const parsed = JSON.parse(match[0])
    if (parsed.action === 'escalate') {
      return { reason: parsed.reason ?? 'User requested a human specialist.' }
    }
  } catch {
    return null
  }

  return null
}

function mockReply(message: string) {
  const lower = message.toLowerCase()

  if (lower.includes('human') || lower.includes('agent') || lower.includes('person')) {
    return "I'll connect you with a funding specialist. Please hold on a moment.\n__ESCALATED__"
  }

  if (lower.includes('document') || lower.includes('need')) {
    return 'Most applications require core business details, recent bank statements, ownership details, and revenue context. Exact requirements depend on the product.'
  }

  if (lower.includes('eligible') || lower.includes('qualify')) {
    return 'Eligibility usually depends on time in business, monthly revenue, industry, and current cash flow. The fastest next step is to apply or book a call for a specific review.'
  }

  return 'First Fund can help compare options like merchant cash advances, term loans, lines of credit, invoice factoring, equipment financing, and mortgage loans. Tell me what you need funding for and how quickly you need it.'
}

function createTextStream(text: string) {
  const encoder = new TextEncoder()

  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(text))
        controller.close()
      },
    }),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  )
}

async function fetchOllamaReply(messages: ChatMessage[]) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20_000)

  try {
    const response = await fetch(
      `${process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434'}/api/chat`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL ?? 'gemma3:1b',
          stream: false,
          messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...messages],
          options: { temperature: 0.4, num_predict: 700 },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Ollama request failed with status ${response.status}`)
    }

    const payload = (await response.json()) as { message?: { content?: string } }
    return payload.message?.content?.trim() ?? ''
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchAnthropicReply(messages: ChatMessage[]) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return mockReply(messages[messages.length - 1]?.content ?? '')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20_000)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-5-20250929',
        max_tokens: 700,
        system: CHAT_SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic request failed with status ${response.status}`)
    }

    const payload = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>
    }

    return (payload.content ?? [])
      .filter((item) => item.type === 'text' && typeof item.text === 'string')
      .map((item) => item.text)
      .join('')
      .trim()
  } finally {
    clearTimeout(timeout)
  }
}

async function generateReply(messages: ChatMessage[]) {
  switch (getChatProvider()) {
    case 'ollama':
      return fetchOllamaReply(messages)
    case 'anthropic':
      return fetchAnthropicReply(messages)
    default:
      return mockReply(messages[messages.length - 1]?.content ?? '')
  }
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const auth = await getAuthContext()
    const mode = getChatMode()

    if (mode === 'authenticated' && !auth.user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    if (mode === 'admin' && (!auth.user || auth.profile?.role !== 'admin')) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const payload = chatRequestSchema.parse(await request.json())

    const { allowed, retryAfter } = await checkRateLimit(
      buildRateLimitKey(['chat', mode, ip, payload.sessionId]),
      20,
      60_000,
    )
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
      )
    }

    await persistChatSession({
      sessionId: payload.sessionId,
      pageUrl: payload.pageUrl,
      userId: auth.user?.id ?? null,
      mode,
    })

    const history = await loadChatHistory(payload.sessionId)
    await persistChatMessage(payload.sessionId, 'user', payload.message)

    const rawReply = await generateReply([...history, { role: 'user', content: payload.message }])
    const reply = rawReply.slice(0, MAX_CHAT_RESPONSE_CHARS)
    const escalation = parseEscalation(reply)

    if (escalation) {
      const friendlyMessage = "I'll connect you with a funding specialist. Please hold on a moment."
      await persistChatMessage(payload.sessionId, 'assistant', friendlyMessage)
      await persistChatEscalation(payload.sessionId, escalation.reason)
      return createTextStream(`${friendlyMessage}\n__ESCALATED__`)
    }

    await persistChatMessage(payload.sessionId, 'assistant', reply)
    return createTextStream(reply)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to process chat.' },
      { status: 500 },
    )
  }
}
