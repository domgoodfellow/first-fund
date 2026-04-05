import MarketingShell from '@/components/layout/MarketingShell'
import PageHero from '@/components/layout/PageHero'
import SectionWrapper from '@/components/layout/SectionWrapper'

const SECTIONS = [
  {
    title: '1. Purpose and Acceptance',
    body: 'You agree to use our Services only for lawful purposes and in compliance with applicable laws.',
  },
  {
    title: '2. Acceptable Use',
    body: 'You agree not to: violate any applicable laws or regulations; infringe on the rights of others (including intellectual property, privacy, or reputation); distribute spam, malware, or interfere with website security; attempt to gain unauthorized access to our systems or bypass security measures.',
  },
  {
    title: '3. Eligibility',
    body: 'You must be at least 18 years old (or the age of majority in your jurisdiction) to use our Services.',
  },
  {
    title: '4. Our Services',
    body: 'FirstFund provides commercial financing services, including business loans, equipment financing, business lines of credit, merchant cash advances, alternative funding solutions, and financial analysis and advisory support. FirstFund acts as an intermediary or facilitator with third-party lenders. Final approval and funding terms remain at the sole discretion of the lending partners.',
  },
  {
    title: '5. Applications and Approvals',
    body: 'All financing applications submitted by form, email, or phone are subject to review and underwriting. Financing offers are conditional upon verification of the information provided and may be modified or withdrawn at any time. FirstFund does not guarantee approval or funding.',
  },
  {
    title: '6. Information Provided by Users',
    body: 'You represent and warrant that all information submitted is accurate, complete, and up to date. You consent to our use of such information to evaluate your eligibility, present financing options, communicate with you, and manage and follow up on your file.',
  },
  {
    title: '7. Communications (SMS & Email)',
    body: 'By submitting a form on our website, you consent to receive SMS and/or email communications related to application updates, appointment reminders, file-related notifications, and promotional offers and financing opportunities. Message frequency varies. Message & data rates may apply. Reply STOP to opt out. Reply HELP for assistance.',
  },
  {
    title: '8. Intellectual Property',
    body: 'All website content (texts, logos, images, graphics, videos, layout) is the exclusive property of FirstFund or its licensors. Unauthorized reproduction or distribution is strictly prohibited.',
  },
  {
    title: '9. No Warranties',
    body: 'The Services are provided "as is". To the fullest extent permitted by law, we disclaim all warranties, express or implied, including any warranty of merchantability, fitness for a particular purpose, or approval of financing.',
  },
  {
    title: '10. Limitation of Liability',
    body: 'To the maximum extent permitted by law, FirstFund shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the Services.',
  },
  {
    title: '11. Governing Law',
    body: 'These Terms are governed by the laws of the State of Delaware and applicable federal laws of the United States. Any disputes shall be submitted to the competent courts of the United States.',
  },
]

export default function TermsPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Terms of Service"
        subtitle="Effective Date: March 6, 2025"
        align="left"
      />
      <SectionWrapper size="md">
        <div className="prose-section">
          <div className="space-y-8 text-ff-muted leading-relaxed">
            <p className="text-base">
              Welcome to FirstFund ("FirstFund", "we", "our", "us"). These Terms govern your access to and use of our
              website and all services offered through it. By accessing our website or using our Services, you agree to
              be bound by these Terms.
            </p>

            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-heading text-ff-text text-xl font-semibold mb-3">{s.title}</h2>
                <p className="text-base">{s.body}</p>
              </div>
            ))}

            <div>
              <h2 className="font-heading text-ff-text text-xl font-semibold mb-3">12. Contact Us</h2>
              <p className="text-base">
                Website:{' '}
                <a href="https://www.firstfund.com" className="text-ff-accent hover:underline">
                  www.firstfund.com
                </a>
                <br />
                Email:{' '}
                <a href="mailto:info@firstfund.com" className="text-ff-accent hover:underline">
                  info@firstfund.com
                </a>
                <br />
                Phone: +1 (555) 000-0000
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </MarketingShell>
  )
}
