import type { Metadata } from 'next'
import MarketingShell from '@/components/layout/MarketingShell'
import Hero from '@/components/marketing/Hero'
import PainPoints from '@/components/marketing/PainPoints'
import HomepageProducts from '@/components/marketing/HomepageProducts'
import HowItWorks from '@/components/marketing/HowItWorks'
import BankComparison from '@/components/marketing/BankComparison'
import ProofPlaceholder from '@/components/marketing/ProofPlaceholder'
import HomepageFAQ from '@/components/marketing/HomepageFAQ'
import CTASection from '@/components/marketing/CTASection'
import MobileStickyCTA from '@/components/marketing/MobileStickyCTA'
import {
  getHomeFunnelContent,
  parseHeroMessageVariant,
  parseHeroVisualVariant,
} from '@/lib/home-funnel'

export const metadata: Metadata = {
  title: 'First Fund | Fast Business Funding Funnel',
  description:
    'Business funding options for owners exploring merchant cash advance, line of credit, and expansion funding paths with a faster, clearer process.',
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ hero?: string; visual?: string }>
}) {
  const params = await searchParams
  const heroVariant = parseHeroMessageVariant(params.hero)
  const visualVariant = parseHeroVisualVariant(params.visual)
  const showPreviewLabel = Boolean(params.hero || params.visual)
  const englishFaq = getHomeFunnelContent('en').faq.items
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: englishFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <MarketingShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero
        messageVariant={heroVariant}
        visualVariant={visualVariant}
        showPreviewLabel={showPreviewLabel}
      />
      <PainPoints />
      <HomepageProducts />
      <HowItWorks />
      <BankComparison />
      <ProofPlaceholder />
      <HomepageFAQ />
      <CTASection contentKey="homeFunnel" />
      <div className="h-24 md:hidden" aria-hidden="true" />
      <MobileStickyCTA />
    </MarketingShell>
  )
}
