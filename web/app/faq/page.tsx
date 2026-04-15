import type { Metadata } from 'next'
import FAQPageClient from '@/components/content/FAQPageClient'
import { getHomeFunnelContent } from '@/lib/home-funnel'

export const metadata: Metadata = {
  title: 'First Fund FAQ | Business Funding Questions',
  description:
    'Questions about merchant cash advance, line of credit, and expansion funding paths at First Fund.',
}

export default function FAQPage() {
  const englishContent = getHomeFunnelContent('en')
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: englishContent.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPageClient />
    </>
  )
}
