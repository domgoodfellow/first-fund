import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import FAQAccordion from '@/components/content/FAQAccordion'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'

export const metadata = {
  title: 'FAQ — First Fund',
  description: 'Answers to common questions about First Fund financing products, approval process, documents, and more.',
}

const categories = [
  {
    heading: 'Approval & Speed',
    items: [
      { question: 'How fast can I get funded?', answer: 'Most applicants receive a decision within 24–48 hours. Once approved and you accept your offer, funds are typically deposited the same or next business day.' },
      { question: 'What happens after I submit my application?', answer: 'Our underwriting team reviews your file and reaches out within 24–48 hours with a decision. If approved, you will receive a clear funding offer with terms.' },
      { question: 'Can I get funded on the same day?', answer: 'Same-day funding is possible for applications submitted early in the business day and that pass underwriting quickly. This is not guaranteed but does happen regularly.' },
    ],
  },
  {
    heading: 'Documents & Requirements',
    items: [
      { question: 'What documents do I need to apply?', answer: 'Typically: a government-issued photo ID, business registration or articles of incorporation, and your last 3 months of bank statements. You can upload everything securely in our application.' },
      { question: 'Do I need to provide financial statements?', answer: 'For most products, bank statements are sufficient. For larger amounts or Mortgage Loans, additional financial documentation may be requested.' },
      { question: 'Does it matter how long my business has been operating?', answer: 'We work with businesses at various stages. Newer businesses may have lower advance limits, but we do not automatically disqualify based on time in operation.' },
    ],
  },
  {
    heading: 'Collateral & Credit',
    items: [
      { question: 'Do I need collateral to qualify?', answer: 'MCA, Line of Credit, Invoice Factoring, and Fixed-Term Loans are typically unsecured. Equipment Financing uses the equipment as collateral. Mortgage Loans use home equity.' },
      { question: 'What credit score do I need?', answer: 'We work with all credit profiles — great, fair, and bad credit are all considered. We evaluate your business cash flow and overall health, not just a score.' },
      { question: 'Will applying affect my credit score?', answer: 'Our initial review is a soft inquiry that does not impact your credit score. A hard inquiry may occur during final underwriting, which your advisor will notify you about.' },
    ],
  },
  {
    heading: 'Our 6 Products',
    items: [
      { question: 'What is the difference between MCA and a Fixed-Term Loan?', answer: 'An MCA repays through a percentage of daily card sales — payments flex with revenue. A Fixed-Term Loan has set monthly payments and a defined end date, making it easier to budget.' },
      { question: 'When should I choose a Line of Credit over a lump-sum loan?', answer: 'A Line of Credit works best if your capital needs are ongoing or unpredictable — you draw what you need and repay, then draw again. If you need one specific amount for a specific purpose, a loan is simpler.' },
      { question: 'Who is Invoice Factoring best for?', answer: 'Businesses that issue invoices to other businesses (B2B) with Net 30/60/90 payment terms. Instead of waiting, you get up to 90% of the invoice value immediately.' },
      { question: 'Who is Equipment Financing best for?', answer: 'Any business that needs to purchase equipment — from restaurant appliances to construction machinery — without paying the full cost upfront. The equipment serves as collateral.' },
      { question: 'Can I apply for more than one product at once?', answer: 'We generally recommend starting with one product. Our team will help you identify the best fit during your application or call.' },
    ],
  },
  {
    heading: 'Apply vs. Book a Call',
    items: [
      { question: 'Should I apply or book a call first?', answer: 'If you have your documents ready and know what you need — apply, it takes 60 seconds. If you have questions or want guidance on which product fits your business, book a call first.' },
      { question: 'Is booking a call free?', answer: 'Yes. There is no cost and no obligation. It is simply a conversation with one of our advisors.' },
      { question: 'Can I apply after booking a call?', answer: 'Absolutely. Many clients book a call first to understand their options, then apply once they feel confident. Our advisor can even help you start the application during the call.' },
    ],
  },
]

export default function FAQPage() {
  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge="FAQ"
        title={`Questions Answered\nBefore You Apply`}
        subtitle="Everything you need to know about our financing products, process, and what to expect."
      />

      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6 max-w-3xl mx-auto space-y-14">
          {categories.map((cat, i) => (
            <BlurFade key={cat.heading} delay={i * 0.05}>
              <div>
                <h2 className="font-heading text-xl font-bold text-ff-text mb-5 pb-3 border-b border-ff-border">
                  {cat.heading}
                </h2>
                <FAQAccordion items={cat.items} />
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      <CTASection
        heading="Still Have Questions?"
        subheading="Book a call with our team — we will walk you through everything in under 10 minutes."
        primaryLabel="Book a Call"
        primaryHref="/book-a-call"
        secondaryLabel="Apply Now"
        secondaryHref="/apply"
      />

      <Footer />
    </main>
  )
}
