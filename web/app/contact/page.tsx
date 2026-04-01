import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import ContactForm from '@/components/forms/ContactForm'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'

export const metadata = {
  title: 'Contact — First Fund',
  description: 'Get in touch with First Fund. We are here to answer your questions and help you find the right financing solution.',
}

const methods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email Us',
    value: 'info@firsfund.com',
    href: 'mailto:info@firsfund.com',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Call Us',
    value: '+1 (555) 000-0000',
    href: 'tel:+15550000000',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Business Hours',
    value: 'Mon – Fri, 9am – 6pm EST',
    href: null,
  },
]

export default function ContactPage() {
  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge="Get in Touch"
        title={`We Are Here\nto Help`}
        subtitle="Questions about your application, our products, or anything else — our team is ready to talk."
      />

      {/* Contact methods */}
      <section className="py-12 bg-ff-surface border-y border-ff-border">
        <div className="section-container px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {methods.map((m, i) => (
              <BlurFade key={m.label} delay={i * 0.1} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-ff-raised border border-ff-border-blue flex items-center justify-center text-ff-accent">
                  {m.icon}
                </div>
                <div>
                  <p className="text-ff-muted text-xs font-semibold uppercase tracking-wide mb-1">{m.label}</p>
                  {m.href ? (
                    <a href={m.href} className="text-ff-text text-sm font-medium hover:text-ff-accent transition-colors">{m.value}</a>
                  ) : (
                    <p className="text-ff-text text-sm font-medium">{m.value}</p>
                  )}
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <BlurFade className="mb-10">
              <h2 className="font-heading text-3xl font-bold text-ff-text mb-2">Send a Message</h2>
              <p className="text-ff-muted text-sm">We respond to all messages within one business day.</p>
            </BlurFade>
            <ContactForm />
          </div>
        </div>
      </section>

      <CTASection
        heading="Prefer to Apply Directly?"
        subheading="Our 60-second application gets you a funding decision in 24–48 hours."
        primaryLabel="Apply Now"
        primaryHref="/apply"
        secondaryLabel="Book a Call"
        secondaryHref="/book-a-call"
      />

      <Footer />
    </main>
  )
}
