'use client'

import { useEffect, useState } from 'react'
import { ChatPanel } from './ChatPanel'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(false)

  useEffect(() => {
    if (open) {
      setUnread(false)
      return
    }

    const timer = window.setTimeout(() => setUnread(true), 30000)
    return () => window.clearTimeout(timer)
  }, [open])

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <ChatPanel
          className="h-[min(560px,calc(100vh-104px))] w-[min(390px,calc(100vw-40px))]"
          botName="FirstFund Assistant"
        />
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value)
          setUnread(false)
        }}
        className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-xl transition hover:bg-emerald-800"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-5 4v-5.5A2.5 2.5 0 0 1 5 11V6.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {unread && !open && (
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-amber-400" />
        )}
      </button>
    </div>
  )
}
