import type { Metadata } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { CountryProvider } from '@/contexts/CountryContext'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FirsFund — Business Financing Made Easy',
  description:
    'Fast, flexible business funding with 24–48 hr approvals and no collateral required. Up to $800K+ for US and Canadian businesses.',
  keywords: ['business financing', 'merchant cash advance', 'line of credit', 'business loans', 'fast funding'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${inter.variable}`}>
      <body>
        <CountryProvider>{children}</CountryProvider>
      </body>
    </html>
  )
}
