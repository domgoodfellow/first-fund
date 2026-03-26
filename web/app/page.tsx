import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'
import ScrollDots from '@/components/ScrollDots'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <ScrollDots />
      <Hero />
      <HowItWorks />
      <Services />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  )
}
