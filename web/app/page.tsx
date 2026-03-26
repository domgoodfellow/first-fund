import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  )
}
