import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import BookingForm from '@/components/forms/BookingForm'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'

export const metadata = {
  title: 'Book a Call — First Fund',
  description: 'Not ready to apply yet? Book a free call with our team and we will walk you through your options.',
}

const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Talk to a Real Person',
    desc: 'No bots, no runaround. You will speak directly with one of our financing specialists.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Get the Right Product',
    desc: 'We will match you to the option that fits your revenue model, credit profile, and goals.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Free, No Obligation',
    desc: 'There is no cost and no commitment to book a call. Just a conversation.',
  },
]

export default function BookACallPage() {
  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge="Book a Call"
        title={`Talk to Us Before\nYou Apply`}
        subtitle="Have questions about which product fits you best? Our team will walk you through your options — no pressure, no obligation."
      />

      {/* Benefits */}
      <section className="py-14 bg-ff-surface border-y border-ff-border">
        <div className="section-container px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {benefits.map((b, i) => (
              <BlurFade key={b.title} delay={i * 0.1} className="flex flex-col items-center text-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-ff-raised border border-ff-border-blue flex items-center justify-center text-ff-accent">
                  {b.icon}
                </div>
                <h3 className="font-heading font-bold text-ff-text text-base">{b.title}</h3>
                <p className="text-ff-muted text-sm">{b.desc}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-ff-text mb-2">
              Request Your Call
            </h2>
            <p className="text-ff-muted text-sm">Fill out the form and we will confirm a time within a few hours.</p>
          </BlurFade>
          <BookingForm />
        </div>
      </section>

      <CTASection
        heading="Ready to Apply Instead?"
        subheading="Skip the call and go straight to your application — it takes about 60 seconds."
        primaryLabel="Apply Now"
        primaryHref="/apply"
        secondaryLabel="Back to Home"
        secondaryHref="/"
      />

      <Footer />
    </main>
  )
}
