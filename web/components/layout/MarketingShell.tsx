import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function MarketingShell({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}
