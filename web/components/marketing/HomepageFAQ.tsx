'use client'

import FAQAccordion from '@/components/content/FAQAccordion'
import BlurFade from '@/components/motion/BlurFade'

const faqItems = [
  {
    question: 'How fast can I get funded?',
    answer: 'Most applicants receive a funding decision within 24–48 hours of submitting their application. Once approved, funds are typically deposited the same or next business day.',
  },
  {
    question: 'What credit score do I need?',
    answer: 'We work with businesses across all credit profiles — great, fair, and bad credit are all considered. We evaluate the overall health of your business, not just a number.',
  },
  {
    question: 'Do I need collateral to qualify?',
    answer: 'Most of our financing options — including MCA and Line of Credit — require no asset security. Our Mortgage Loans use home equity, which is optional depending on your funding goals.',
  },
  {
    question: 'What documents do I need to apply?',
    answer: 'Typically: government-issued ID, business registration, and your last 3 months of bank statements. You can upload everything directly in our secure application.',
  },
  {
    question: 'What is the difference between MCA and a Fixed-Term Loan?',
    answer: 'An MCA repays through a percentage of your daily card sales — so payments flex with your revenue. A Fixed-Term Loan has set monthly payments regardless of revenue, making it easier to budget.',
  },
  {
    question: 'Should I apply or book a call first?',
    answer: 'If you have your documents ready and know what you need, go ahead and apply — it takes about 60 seconds. If you have questions or want guidance on which product fits you best, book a call and we will walk you through it.',
  },
]

export default function HomepageFAQ() {
  return (
    <section className="py-20 md:py-28 bg-ff-surface">
      <div className="section-container px-4 sm:px-6">
        <BlurFade className="text-center mb-12">
          <span className="eyebrow">Common Questions</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-ff-text">
            Answers Before You Apply
          </h2>
        </BlurFade>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </section>
  )
}
