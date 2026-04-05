'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface AdminNavProps {
  email: string
}

export default function AdminNav({ email }: AdminNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const response = await fetch('/api/auth/sign-out', { method: 'POST' })
    const payload = await response.json()
    router.push(payload.redirectTo ?? '/sign-in')
    router.refresh()
  }

  const links = [
    { href: '/admin/applications', label: 'Applications' },
    { href: '/admin/clients', label: 'Clients' },
    { href: '/admin/documents', label: 'Documents' },
    { href: '/admin/notes', label: 'Notes' },
  ]

  return (
    <aside className="sticky top-0 flex min-h-screen flex-col border-r border-slate-200 bg-slate-950 px-5 py-6 text-white">
      <Link href="/admin/applications" className="font-heading text-2xl font-extrabold">
        FirstFund Admin
      </Link>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        Staff workspace
      </p>

      <nav className="mt-8 flex flex-col gap-2">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Account
        </p>
        <p className="mt-2 text-sm text-slate-200">{email}</p>
        <button
          type="button"
          onClick={signOut}
          className="mt-4 text-sm font-semibold text-blue-400 hover:underline"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
