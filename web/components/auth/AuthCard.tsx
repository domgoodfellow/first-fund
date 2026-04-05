import type { ReactNode } from 'react'
import Link from 'next/link'

interface AuthCardProps {
  eyebrow: string
  title: string
  description: string
  footerLabel: string
  footerHref: string
  footerCta: string
  children: ReactNode
}

export default function AuthCard({
  eyebrow,
  title,
  description,
  footerLabel,
  footerHref,
  footerCta,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-xl rounded-[2rem] border border-ff-border bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-ff-text">
        {title}
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ff-muted">
        {description}
      </p>

      <div className="mt-8">{children}</div>

      <p className="mt-6 text-sm text-ff-muted">
        {footerLabel}{' '}
        <Link href={footerHref} className="font-semibold text-ff-accent hover:underline">
          {footerCta}
        </Link>
      </p>
    </div>
  )
}
