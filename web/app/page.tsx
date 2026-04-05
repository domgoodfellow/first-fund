import MarketingShell from '@/components/layout/MarketingShell'
import Hero from '@/components/marketing/Hero'
import TrustBar from '@/components/marketing/TrustBar'
import HowItWorks from '@/components/marketing/HowItWorks'
import HomepageServices from '@/components/marketing/HomepageServices'
import WhyChooseUs from '@/components/marketing/WhyChooseUs'
import Testimonials from '@/components/marketing/Testimonials'
import CTABanner from '@/components/marketing/CTABanner'
import HomepageFAQ from '@/components/marketing/HomepageFAQ'
import CTASection from '@/components/marketing/CTASection'

export default function HomePage() {
  return (
    <MarketingShell>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <HomepageServices />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <HomepageFAQ />
      <CTASection />
    </MarketingShell>
  )
}
