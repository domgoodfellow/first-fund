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
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isUser ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        {isUser ? 'You' : 'FF'}
      </div>
      <div
        className={`max-w-[78%] rounded-lg px-3 py-2 text-sm leading-6 ${
          isUser
            ? 'bg-emerald-700 text-white'
            : 'border border-slate-200 bg-white text-slate-800 shadow-sm'
        }`}
      >
        {message.content}
        {message.escalated && (
          <div className="mt-2 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">
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
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
        FF
      </div>
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm">
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
      className={`flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-slate-950 shadow-2xl ${className}`}
      aria-label="FirstFund chat"
    >
      <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white">
          FF
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{botName}</p>
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {escalated ? 'Specialist handoff requested' : 'Online'}
          </p>
        </div>
        <button
          type="button"
          onClick={clearSession}
          className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          Reset
        </button>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4">
        {messages.length === 0 && (
          <div className="flex items-end gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
              FF
            </div>
            <div className="max-w-[78%] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-800 shadow-sm">
              {welcomeMessage}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
        {loading && <TypingIndicator />}
        {escalated && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">
            A funding specialist will follow up from here.
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <footer className="border-t border-slate-200 bg-white p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            disabled={escalated}
            onChange={(event) => updateInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={escalated ? 'Handoff requested' : 'Ask about business funding...'}
            className="max-h-28 min-h-10 flex-1 resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || loading || escalated}
            className="h-10 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">
          Press Enter to send. This assistant does not make credit decisions.
        </p>
      </footer>
    </section>
  )
}
