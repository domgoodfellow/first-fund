import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import WhyChooseUs from '@/components/marketing/WhyChooseUs'
import TeamSection from '@/components/content/TeamSection'
import CTASection from '@/components/marketing/CTASection'
import AnimatedStat from '@/components/motion/AnimatedStat'
import BlurFade from '@/components/motion/BlurFade'

export const metadata = {
  title: 'About — First Fund',
  description: 'First Fund helps small businesses access fast, flexible financing without the barriers of traditional banking.',
}

const stats = [
  { value: '$250M+', label: 'Funded to Small Businesses' },
  { value: '2,400+', label: 'Businesses Funded' },
  { value: '10+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction Rate' },
]

export default function AboutPage() {
  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge="About First Fund"
        title={`We Back Bold\nBusinesses`}
        subtitle="First Fund was built for business owners who move fast, think big, and need capital that keeps up — without the red tape of traditional lending."
        ctas={[
          { label: 'Apply Now', href: '/apply' },
          { label: 'Book a Call', href: '/book-a-call', variant: 'secondary' },
        ]}
      />

      {/* Stats */}
      <section className="py-14 bg-ff-surface border-y border-ff-border">
        <div className="section-container px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.08}>
                <AnimatedStat value={stat.value} label={stat.label} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <BlurFade>
              <span className="eyebrow">Our Story</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text mb-6">
                Built by People Who Understand Business
              </h2>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="text-ff-muted text-base leading-relaxed mb-5">
                First Fund was founded with one belief: small businesses deserve faster, fairer access to capital. Too many owners were being turned down by banks that focused on paperwork instead of potential — or forced to wait weeks for decisions when opportunities couldn't wait.
              </p>
            </BlurFade>
            <BlurFade delay={0.15}>
              <p className="text-ff-muted text-base leading-relaxed mb-5">
                We built a different model. One that evaluates your business holistically — cash flow, growth trajectory, and real potential — not just a credit score or how long you have been in business. We move at the speed your business demands: 24–48 hour decisions, same-day funding, and a team that actually picks up the phone.
              </p>
            </BlurFade>
            <BlurFade delay={0.2}>
              <p className="text-ff-muted text-base leading-relaxed">
                Today, First Fund has helped thousands of businesses across North America access the capital they need to grow, hire, expand, and thrive.
              </p>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-ff-surface">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Our Mission</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text mb-6">
              Capital Without Barriers
            </h2>
            <p className="text-ff-muted text-lg leading-relaxed">
              We exist to make business financing fast, fair, and accessible — regardless of credit history, business size, or industry. Every business owner deserves a shot at growth. We are here to give it to them.
            </p>
          </BlurFade>
        </div>
      </section>

      <WhyChooseUs />

      <TeamSection />

      <CTASection
        heading="Ready to Work With Us?"
        subheading="Apply in 60 seconds or book a call to learn which product fits your business best."
      />

      <Footer />
    </main>
  )
}
