import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ChatWidget } from '@/components/chat/ChatWidget'
import CookieConsent from '@/components/layout/CookieConsent'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'First Fund - Business Financing Options for Owners',
  description:
    'Explore business financing options with a clear intake process, practical guidance, and support in English and Spanish.',
  keywords: ['business financing', 'merchant cash advance', 'line of credit', 'business loans', 'fast funding'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <LanguageProvider>
          {children}
          <ChatWidget />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
