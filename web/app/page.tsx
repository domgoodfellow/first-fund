import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/marketing/Hero'
import TrustBar from '@/components/marketing/TrustBar'
import HowItWorks from '@/components/marketing/HowItWorks'
import HomepageServices from '@/components/marketing/HomepageServices'
import WhyChooseUs from '@/components/marketing/WhyChooseUs'
import Testimonials from '@/components/marketing/Testimonials'
import CTABanner from '@/components/marketing/CTABanner'
import HomepageFAQ from '@/components/marketing/HomepageFAQ'
import CTASection from '@/components/marketing/CTASection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <HomepageServices />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <HomepageFAQ />
      <CTASection />
      <Footer />
    </main>
  )
}
