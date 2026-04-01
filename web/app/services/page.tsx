import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import ServiceCardGrid from '@/components/services/ServiceCardGrid'
import ServiceComparisonTable from '@/components/services/ServiceComparisonTable'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'
import { SERVICES } from '@/lib/services-data'

export const metadata = {
  title: 'Our Services — First Fund',
  description: 'Explore all six First Fund financing products: Invoice Factoring, Fixed-Term Loans, Line of Credit, Mortgage Loans, Merchant Cash Advance, and Equipment Financing.',
}

export default function ServicesPage() {
  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge="Our Products"
        title={`Financing Built Around\nYour Business`}
        subtitle="One application, six powerful options — pick the structure that fits your cash flow and growth goals."
        ctas={[
          { label: 'Apply Now', href: '/apply' },
          { label: 'Book a Call', href: '/book-a-call', variant: 'secondary' },
        ]}
      />

      {/* Services grid */}
      <section className="py-16 md:py-20 bg-ff-surface">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="text-center mb-12">
            <span className="eyebrow">Our Products</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text">
              Choose the Right Structure
            </h2>
          </BlurFade>
          <ServiceCardGrid services={SERVICES} />
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="text-center mb-10">
            <span className="eyebrow">Side by Side</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text mb-3">
              Compare All Six Products
            </h2>
            <p className="text-ff-muted max-w-xl mx-auto">
              Not sure which option fits best? Here is how each product stacks up across the things that matter most.
            </p>
          </BlurFade>
          <ServiceComparisonTable />
        </div>
      </section>

      {/* Not sure block */}
      <section className="py-14 bg-ff-surface border-y border-ff-border">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-ff-text mb-3">
              Not Sure What Fits?
            </h3>
            <p className="text-ff-muted mb-6">
              Our team helps match you to the right product based on your revenue, credit profile, and growth goals. It takes less than 10 minutes.
            </p>
            <a
              href="/book-a-call"
              className="inline-flex items-center gap-2 bg-ff-accent text-white font-bold text-base px-8 py-3 rounded-full hover:bg-ff-glow transition-all shadow-[0_1px_3px_rgba(30,64,175,0.3)]"
            >
              Talk to a Specialist
            </a>
          </BlurFade>
        </div>
      </section>

      <CTASection
        heading="Ready to Apply?"
        subheading="Start your application in 60 seconds. No collateral, no lengthy paperwork."
      />

      <Footer />
    </main>
  )
}
