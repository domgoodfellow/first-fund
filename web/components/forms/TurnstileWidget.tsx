'use client'

import { useEffect, useId, useRef } from 'react'
import Script from 'next/script'
import { getTurnstileSiteKey } from '@/lib/auth/config'

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string | HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback'?: () => void
        },
      ) => string
      remove: (id?: string) => void
    }
  }
}

interface TurnstileWidgetProps {
  onTokenChange: (token: string) => void
}

export default function TurnstileWidget({
  onTokenChange,
}: TurnstileWidgetProps) {
  const siteKey = getTurnstileSiteKey()
  const containerId = useId().replace(/:/g, '')
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    if (!siteKey || !window.turnstile || widgetId.current) {
      return
    }

    widgetId.current = window.turnstile.render(`#${containerId}`, {
      sitekey: siteKey,
      callback: (token) => onTokenChange(token),
      'expired-callback': () => onTokenChange(''),
    })

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [containerId, onTokenChange, siteKey])

  if (!siteKey) {
    return (
      <p className="text-xs text-amber-700">
        Turnstile is not configured. Public form submission is disabled until a
        site key is provided.
      </p>
    )
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div id={containerId} />
    </>
  )
}
