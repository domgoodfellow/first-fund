'use client'

import Link from 'next/link'
import { useLanguage, brandName } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const cols = [
    {
      heading: t.footer.cols.company,
      links: t.footer.companyLinks,
    },
    {
      heading: t.footer.cols.services,
      links: t.footer.serviceLinks,
    },
    {
      heading: t.footer.cols.legal,
      links: [
        { label: t.footer.nav.terms,   href: '/terms' },
        { label: t.footer.nav.privacy, href: '/privacy' },
      ],
    },
  ]

  return (
    <footer style={{ backgroundColor: '#0F1C2E' }}>
      <div className="section-container px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <span className="font-heading text-2xl font-extrabold text-white block mb-3">
              <span style={{ color: '#60A5FA' }}>First</span> Fund
            </span>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">{t.footer.tagline}</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href={`mailto:${t.footer.nav.email}`}
                className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t.footer.nav.email}
              </a>
              <a
                href={`tel:${t.footer.nav.phone}`}
                className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t.footer.nav.phone}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="font-heading font-semibold text-white text-sm mb-4">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-slate-500 text-xs leading-relaxed mb-4">{t.footer.disclaimer}</p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>© {year} {brandName} · {t.footer.rights}</span>
            <div className="flex items-center gap-4">
              <Link href="/terms"   className="hover:text-blue-400 transition-colors">{t.footer.nav.terms}</Link>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">{t.footer.nav.privacy}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
