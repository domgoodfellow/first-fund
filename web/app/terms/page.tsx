import MarketingShell from '@/components/layout/MarketingShell'
import PageHero from '@/components/layout/PageHero'
import SectionWrapper from '@/components/layout/SectionWrapper'

const SECTIONS = [
  {
    title: '1. Purpose and Acceptance',
    body: [
      'These Terms govern your access to and use of the FirstFund website, public forms, client portal, document upload tools, chat tools, appointment scheduling, and related commercial financing support services.',
      'By accessing the website, submitting a form, creating a portal account, uploading documents, using chat support, or otherwise using our Services, you agree to these Terms and to our Privacy Policy.',
    ],
  },
  {
    title: '2. Acceptable Use',
    body: [
      'You agree to use the Services only for lawful business purposes and in compliance with applicable laws, regulations, and third-party rights.',
      'You may not misuse the Services, submit false or misleading information, upload malicious files, attempt unauthorized access, interfere with website security, scrape or harvest data, impersonate another person or business, or use the Services to transmit spam, malware, or unlawful content.',
    ],
  },
  {
    title: '3. Eligibility',
    body: [
      'You must be at least 18 years old, or the age of majority in your jurisdiction, and have authority to act on behalf of the business for which you submit information.',
      'If you submit information about a business, owner, guarantor, employee, or third party, you represent that you have the right and authority to provide that information to FirstFund for financing review and related communications.',
    ],
  },
  {
    title: '4. Our Services',
    body: [
      'FirstFund provides commercial financing intake, advisory, matching, application support, and related communication services for products that may include business loans, lines of credit, merchant cash advances, equipment financing, invoice factoring, mortgage-backed financing, and other business funding structures.',
      'FirstFund may act as an intermediary, facilitator, broker, referral partner, or support provider with third-party lenders, funders, processors, technology providers, and service providers. Final approval, pricing, terms, documentation requirements, and funding availability remain subject to underwriting and the discretion of the applicable funding partner.',
    ],
  },
  {
    title: '5. Applications and Approvals',
    body: [
      'All financing inquiries, applications, appointment requests, uploaded documents, chat messages, phone discussions, and email submissions are subject to review, verification, underwriting, compliance checks, and funding partner requirements.',
      'Any indication of eligibility, estimated timing, product fit, range, or likely next step is informational only unless and until a written offer or agreement is issued by the applicable funding partner. FirstFund does not guarantee approval, funding, rates, repayment terms, or timing.',
    ],
  },
  {
    title: '6. Information Provided by Users',
    body: [
      'You represent and warrant that all information you submit is accurate, complete, current, and not misleading. This includes information submitted through website forms, the client portal, document uploads, chat, email, SMS, phone, or any future intake channel.',
      'You authorize FirstFund to use submitted information to evaluate financing eligibility, prepare your file, verify identity and business information, detect fraud or misuse, communicate with you, match you with potential funding options, support customer service, improve our Services, and comply with legal or contractual obligations.',
    ],
  },
  {
    title: '7. Forms, Documents, and Portal Submissions',
    body: [
      'Public forms and portal forms are intended to collect business financing information, contact details, scheduling preferences, and supporting documents. Do not submit information you are not authorized to share.',
      'Uploaded documents may include sensitive business, financial, identity, and ownership information. You are responsible for reviewing files before upload and removing unrelated information when appropriate. We may reject, quarantine, delete, or request replacement files that appear incomplete, unsafe, corrupted, or unrelated to the requested review.',
    ],
  },
  {
    title: '8. AI-Assisted Tools and Automated Processing',
    body: [
      'FirstFund may use artificial intelligence, machine learning, automation, rules-based workflows, document parsing, transcription, summarization, fraud-screening, routing, and similar technologies to support intake, customer service, file organization, product matching, risk review, quality control, and operational efficiency.',
      'AI-assisted tools may help summarize information, identify missing documents, classify inquiries, draft internal notes, support chat interactions, or flag potential next steps. These tools are support tools only. They do not guarantee approval, replace professional judgment, or create a binding funding decision.',
      'Important financing decisions should involve human review and applicable funding partner underwriting. You should not rely on website chat, automated messages, estimated ranges, or AI-generated responses as financial, legal, tax, accounting, or credit advice.',
    ],
  },
  {
    title: '9. Third-Party Providers and Funding Partners',
    body: [
      'We may work with third-party lenders, funders, brokers, CRM providers, hosting providers, analytics providers, communications platforms, identity verification vendors, fraud-prevention tools, AI or automation providers, and other service providers to operate the Services and process financing inquiries.',
      'Third-party funding partners may have their own applications, disclosures, underwriting requirements, privacy terms, rates, repayment terms, and agreements. You should review all final funding documents carefully before accepting any offer.',
    ],
  },
  {
    title: '10. Cookies, Tracking, and Preferences',
    body: [
      'The website may use necessary cookies to operate core functionality, remember preferences, protect forms, support authentication, and maintain security. With your selection, we may also use analytics or marketing cookies to understand website usage, improve campaigns, and measure performance.',
      'You can manage cookie preferences through the website consent tool when presented and through your browser settings. Necessary cookies may still be used because they are required for the Services to function securely.',
    ],
  },
  {
    title: '11. Communications (SMS, Email, Phone, and Chat)',
    body: [
      'By submitting a form, booking a call, creating a portal account, or otherwise providing contact information, you consent to receive communications related to your inquiry, application, account, appointment reminders, document requests, file updates, and customer support.',
      'If you separately consent to promotional communications, FirstFund may contact you about financing opportunities, product updates, and related offers. Message frequency varies. Message and data rates may apply. Reply STOP to opt out of SMS where supported, or use the unsubscribe mechanism included in eligible email communications.',
    ],
  },
  {
    title: '12. Intellectual Property',
    body: [
      'All website content, text, logos, images, graphics, videos, layouts, software, interfaces, and related materials are owned by FirstFund or its licensors unless otherwise stated.',
      'You may not copy, modify, distribute, reverse engineer, scrape, commercially exploit, or create derivative works from the Services without our prior written permission.',
    ],
  },
  {
    title: '13. No Professional Advice',
    body: [
      'Information provided through the Services is for general commercial financing discussion and intake support only. It is not legal, tax, accounting, investment, credit repair, or financial planning advice.',
      'You should consult qualified advisors before making financing, tax, legal, accounting, or business decisions.',
    ],
  },
  {
    title: '14. No Warranties',
    body: [
      'The Services are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, FirstFund disclaims all warranties, express or implied, including warranties of accuracy, availability, merchantability, fitness for a particular purpose, non-infringement, funding approval, or uninterrupted operation.',
      'We do not warrant that AI-assisted outputs, automated summaries, form routing, chat responses, or website content will be complete, error-free, or suitable for your specific circumstances.',
    ],
  },
  {
    title: '15. Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, FirstFund shall not be liable for indirect, incidental, special, consequential, punitive, or exemplary damages arising from or related to the Services, including lost profits, lost business opportunities, data loss, funding delays, declined applications, third-party decisions, or reliance on automated outputs.',
      'Nothing in these Terms limits liability that cannot be limited under applicable law.',
    ],
  },
  {
    title: '16. Changes to the Services or Terms',
    body: [
      'We may update the Services, forms, consent flows, AI-assisted tools, cookie options, funding partner workflows, and these Terms from time to time.',
      'Material updates will be reflected by a revised effective date or other notice where appropriate. Continued use of the Services after updates means you accept the updated Terms.',
    ],
  },
  {
    title: '17. Governing Law',
    body: [
      'These Terms are governed by the laws of the State of Delaware and applicable federal laws of the United States, without regard to conflict-of-law principles.',
      'Any disputes shall be submitted to the competent courts of the United States unless a separate written agreement states otherwise.',
    ],
  },
]

export default function TermsPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Terms of Service"
        subtitle="Effective Date: April 20, 2026"
        align="left"
      />
      <SectionWrapper size="md">
        <div className="prose-section">
          <div className="space-y-8 text-ff-muted leading-relaxed">
            <p className="text-base">
              Welcome to FirstFund (&quot;FirstFund&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). These
              Terms govern your access to and use of our website and all services offered through it. By accessing our
              website or using our Services, you agree to be bound by these Terms.
            </p>

            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-heading text-ff-text text-xl font-semibold mb-3">{section.title}</h2>
                <div className="space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h2 className="font-heading text-ff-text text-xl font-semibold mb-3">18. Contact Us</h2>
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
