'use client'

import { useEffect, useRef, useState } from 'react'
import { Message, useChatSession } from '@/hooks/useChatSession'

interface ChatPanelProps {
  className?: string
  botName?: string
  welcomeMessage?: string
}

function MessageRow({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isUser ? 'bg-ff-surface-alt text-ff-muted' : 'bg-ff-brand-tint text-ff-accent'
        }`}
      >
        {isUser ? 'You' : 'FF'}
      </div>
      <div
        className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
          isUser
            ? 'bg-ff-accent text-white'
            : 'border border-ff-border bg-white text-ff-text shadow-sm'
        }`}
      >
        {message.content}
        {message.escalated && (
          <div className="mt-3 rounded-md border border-ff-border-blue bg-ff-raised px-3 py-2 text-xs font-medium text-ff-accent">
            Connecting you with a funding specialist.
          </div>
        )}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ff-brand-tint text-xs font-semibold text-ff-accent">
        FF
      </div>
      <div className="rounded-lg border border-ff-border bg-white px-4 py-2.5 text-sm text-ff-muted shadow-sm">
        Typing...
      </div>
    </div>
  )
}

export function ChatPanel({
  className = '',
  botName = 'FirstFund Assistant',
  welcomeMessage = 'Hi, I can help with funding options, eligibility, documents, and next steps.',
}: ChatPanelProps) {
  const { messages, sendMessage, loading, escalated, clearSession } = useChatSession()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function updateInput(value: string) {
    setInput(value)
    if (!inputRef.current) return
    inputRef.current.style.height = 'auto'
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 112)}px`
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || loading || escalated) return
    updateInput('')
    await sendMessage(text)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <section
      className={`flex min-h-0 flex-col overflow-hidden rounded-xl border border-ff-border bg-ff-surface text-ff-text shadow-[0_24px_72px_rgba(15,23,42,0.18)] ${className}`}
      aria-label="FirstFund chat"
    >
      <header className="flex items-center gap-4 border-b border-ff-border bg-white px-5 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ff-accent text-sm font-bold text-white shadow-[0_4px_14px_rgba(30,64,175,0.25)]">
          FF
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{botName}</p>
          <p className="flex items-center gap-2 text-xs text-ff-muted">
            <span className="h-2 w-2 rounded-full bg-ff-glow" />
            {escalated ? 'Specialist handoff requested' : 'Online'}
          </p>
        </div>
        <button
          type="button"
          onClick={clearSession}
          className="rounded-md px-3 py-1.5 text-xs font-medium text-ff-muted transition-colors hover:bg-ff-surface hover:text-ff-text"
        >
          Reset
        </button>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="flex items-end gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ff-brand-tint text-xs font-semibold text-ff-accent">
              FF
            </div>
            <div className="max-w-[82%] rounded-lg border border-ff-border bg-white px-4 py-3 text-sm leading-6 text-ff-text shadow-sm">
              {welcomeMessage}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
        {loading && <TypingIndicator />}
        {escalated && (
          <div className="rounded-lg border border-ff-border-blue bg-ff-raised px-4 py-3 text-center text-sm text-ff-accent">
            A funding specialist will follow up from here.
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <footer className="border-t border-ff-border bg-white p-4">
        <div className="flex items-end gap-3">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            disabled={escalated}
            onChange={(event) => updateInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={escalated ? 'Handoff requested' : 'Ask about business funding...'}
            className="max-h-32 min-h-12 flex-1 resize-none rounded-lg border border-ff-border-strong px-4 py-3 text-sm text-ff-text outline-none transition focus:border-ff-accent focus:ring-2 focus:ring-blue-100 disabled:bg-ff-surface"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || loading || escalated}
            className="h-12 rounded-lg bg-ff-accent px-5 text-sm font-semibold text-white shadow-[0_1px_4px_rgba(30,64,175,0.24)] transition hover:bg-ff-glow disabled:cursor-not-allowed disabled:bg-ff-border-strong disabled:shadow-none"
          >
            Send
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-ff-muted">
          Press Enter to send. This assistant does not make credit decisions.
        </p>
      </footer>
    </section>
  )
}
