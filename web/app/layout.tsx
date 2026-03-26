import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import { CountryProvider } from '@/contexts/CountryContext'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
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
    <html lang="en" className={`${playfairDisplay.variable} ${montserrat.variable}`}>
      <body>
        <CountryProvider>{children}</CountryProvider>
      </body>
    </html>
  )
}
