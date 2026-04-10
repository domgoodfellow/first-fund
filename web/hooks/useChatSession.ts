'use client'

import { useCallback, useRef, useState } from 'react'

export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  escalated?: boolean
}

interface UseChatSessionReturn {
  messages: Message[]
  sendMessage: (text: string) => Promise<void>
  loading: boolean
  escalated: boolean
  sessionId: string | null
  clearSession: () => void
}

function uid() {
  return Math.random().toString(36).slice(2)
}

function getSessionId() {
  const existing = window.localStorage.getItem('firstfund_chat_session_id')
  if (existing) return existing

  const next =
    typeof window.crypto?.randomUUID === 'function' ? window.crypto.randomUUID() : uid()
  window.localStorage.setItem('firstfund_chat_session_id', next)
  return next
}

export function useChatSession(): UseChatSessionReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [escalated, setEscalated] = useState(false)
  const sessionRef = useRef<string | null>(null)

  const ensureSession = useCallback(() => {
    const id = sessionRef.current ?? getSessionId()
    sessionRef.current = id
    setSessionId(id)
    return id
  }, [])

  const clearSession = useCallback(() => {
    window.localStorage.removeItem('firstfund_chat_session_id')
    sessionRef.current = null
    setSessionId(null)
    setMessages([])
    setEscalated(false)
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      if (loading || escalated) return

      const sid = ensureSession()
      const assistantMsgId = uid()

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'user', content: text },
        { id: assistantMsgId, role: 'assistant', content: '' },
      ])
      setLoading(true)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            sessionId: sid,
            pageUrl: window.location.href,
          }),
        })

        if (!res.ok) {
          const payload = await res.json().catch(() => null)
          throw new Error(payload?.error ?? `Chat API error: ${res.status}`)
        }

        const reader = res.body?.getReader()
        if (!reader) throw new Error('Chat response did not include a stream.')

        const decoder = new TextDecoder()
        let reply = ''
        let didEscalate = false

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          if (chunk.includes('__ESCALATED__')) {
            didEscalate = true
            reply = "I'll connect you with a funding specialist. Please hold on a moment."
          } else {
            reply += chunk
          }

          const displayReply = reply.replace(/\{"action"\s*:\s*"escalate".*?\}\n?/g, '').trim()

          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMsgId
                ? { ...message, content: displayReply, escalated: didEscalate }
                : message
            )
          )
        }

        if (didEscalate) setEscalated(true)
      } catch (error) {
        console.error('Chat error:', error)
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMsgId
              ? {
                  ...message,
                  content:
                    'I could not reach chat support right now. Please try again or use the contact form.',
                }
              : message
          )
        )
      } finally {
        setLoading(false)
      }
    },
    [ensureSession, escalated, loading]
  )

  return { messages, sendMessage, loading, escalated, sessionId, clearSession }
}
