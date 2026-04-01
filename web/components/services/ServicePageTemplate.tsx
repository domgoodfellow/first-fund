import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import TrustBar from '@/components/marketing/TrustBar'
import CTASection from '@/components/marketing/CTASection'
import FAQAccordion from '@/components/content/FAQAccordion'
import BlurFade from '@/components/motion/BlurFade'
import type { FAQItem } from '@/components/content/FAQAccordion'

interface Benefit {
  icon: ReactNode
  label: string
  desc: string
}

export interface ServicePageData {
  badge: string
  title: string
  subtitle: string
  overview: string
  bestFor: string[]
  benefits: Benefit[]
  useCases: string[]
  faqItems: FAQItem[]
  repaymentNote?: string
  accessNote?: string
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge={data.badge}
        title={data.title}
        subtitle={data.subtitle}
        ctas={[
          { label: 'Apply Now', href: '/apply' },
          { label: 'Book a Call', href: '/book-a-call', variant: 'secondary' },
        ]}
      />

      <TrustBar />

      {/* Overview */}
      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <BlurFade>
              <span className="eyebrow">What It Is</span>
              <h2 className="font-heading text-3xl font-bold text-ff-text mb-5">Overview</h2>
              <p className="text-ff-muted text-base leading-relaxed">{data.overview}</p>
            </BlurFade>

            {data.repaymentNote && (
              <BlurFade delay={0.1} className="mt-8 bg-ff-raised border border-ff-border-blue rounded-xl p-5">
                <p className="text-ff-muted text-sm leading-relaxed">
                  <span className="text-ff-accent font-semibold">How repayment works: </span>
                  {data.repaymentNote}
                </p>
              </BlurFade>
            )}

            {data.accessNote && (
              <BlurFade delay={0.1} className="mt-8 bg-ff-raised border border-ff-border-blue rounded-xl p-5">
                <p className="text-ff-muted text-sm leading-relaxed">
                  <span className="text-ff-accent font-semibold">How access works: </span>
                  {data.accessNote}
                </p>
              </BlurFade>
            )}
          </div>
        </div>
      </section>

      {/* Best for */}
      <section className="py-16 bg-ff-surface">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="text-center mb-10">
            <span className="eyebrow">Best For</span>
            <h2 className="font-heading text-3xl font-bold text-ff-text">
              Is This Right for You?
            </h2>
          </BlurFade>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.bestFor.map((item, i) => (
              <BlurFade key={i} delay={i * 0.07}>
                <div className="flex items-start gap-3 bg-ff-bg border border-ff-border rounded-xl p-4 hover:border-ff-border-blue transition-colors">
                  <svg className="w-5 h-5 text-ff-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-ff-muted text-sm">{item}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="text-center mb-12">
            <span className="eyebrow">Benefits</span>
            <h2 className="font-heading text-3xl font-bold text-ff-text">What You Get</h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.benefits.map((benefit, i) => (
              <BlurFade key={i} delay={i * 0.08}>
                <div className="bg-ff-bg border border-ff-border rounded-2xl p-6 h-full hover:border-ff-border-blue hover:shadow-[0_4px_16px_rgba(30,64,175,0.08)] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-ff-raised border border-ff-border-blue flex items-center justify-center text-ff-accent mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-heading font-bold text-ff-text text-base mb-2">{benefit.label}</h3>
                  <p className="text-ff-muted text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 bg-ff-surface">
        <div className="section-container px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <BlurFade>
              <span className="eyebrow">Typical Use Cases</span>
              <h2 className="font-heading text-3xl font-bold text-ff-text mb-8">
                How Businesses Use This
              </h2>
            </BlurFade>
            <div className="space-y-3">
              {data.useCases.map((useCase, i) => (
                <BlurFade key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-3 bg-ff-bg border border-ff-border rounded-xl p-4 hover:border-ff-border-blue transition-colors">
                    <span className="font-heading text-ff-accent font-bold text-sm shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-ff-muted text-sm">{useCase}</span>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="text-center mb-10">
            <span className="eyebrow">FAQ</span>
            <h2 className="font-heading text-3xl font-bold text-ff-text">Common Questions</h2>
          </BlurFade>
          <div className="max-w-2xl mx-auto">
            <FAQAccordion items={data.faqItems} />
          </div>
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
