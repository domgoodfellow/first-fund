import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FirsFund — Business Financing Made Easy',
  description:
    'Fast, flexible business funding with 24–48 hr approvals and no collateral required. Up to $800K+ for US businesses.',
  keywords: ['business financing', 'merchant cash advance', 'line of credit', 'business loans', 'fast funding'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}