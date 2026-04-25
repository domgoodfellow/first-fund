import MarketingShell from '@/components/layout/MarketingShell'
import PageHero from '@/components/layout/PageHero'
import SectionWrapper from '@/components/layout/SectionWrapper'

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: [
      'We may collect contact information, business information, ownership and representative information, financing needs, revenue details, banking information, uploaded documents, appointment preferences, chat messages, portal activity, communications, and any additional information you provide voluntarily.',
      'We may also collect technical information such as IP address, browser type, device information, pages visited, referring pages, approximate location, form metadata, security signals, and cookie or consent preferences.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'We use information to process and evaluate financing inquiries, prepare and manage application files, verify identity and business information, detect fraud or misuse, communicate with you, schedule appointments, provide customer support, send service updates, improve our website, measure performance, and comply with legal, regulatory, contractual, and security obligations.',
      'Where you have provided the appropriate consent, we may also use information to send promotional financing offers, product updates, and related marketing communications.',
    ],
  },
  {
    title: '3. AI-Assisted Processing',
    body: [
      'FirstFund may use AI-assisted tools, machine learning, automation, document parsing, transcription, summarization, classification, chat support, routing, and rules-based workflows to support intake, file review, missing-document checks, fraud prevention, customer service, analytics, and internal operations.',
      'AI-assisted tools may process information you submit through forms, uploaded documents, chat, email, phone notes, or portal activity. These tools are used to support our team and are not a guarantee of approval, funding, pricing, or eligibility.',
      'We aim to keep important financing decisions subject to human review and applicable funding partner underwriting. You may contact us if you have questions about how your information was used in connection with your inquiry or application.',
    ],
  },
  {
    title: '4. Sharing of Information',
    body: [
      'We do not sell your personal information. We may share information with financial partners and lenders to evaluate funding eligibility, service providers that support our business, identity verification and fraud-prevention vendors, communications platforms, CRM and hosting providers, analytics and advertising providers where permitted by your cookie choices, professional advisors, and government or regulatory authorities when required by law.',
      'No mobile information, including phone numbers or SMS consent data, will be sold or shared with third parties for external marketing purposes.',
    ],
  },
  {
    title: '5. Forms, Documents, and Sensitive Information',
    body: [
      'Our forms and portal may collect sensitive business, financial, and identity information. We request this information to evaluate financing options, comply with underwriting or verification requirements, and support fraud prevention and file management.',
      'Please do not submit unrelated sensitive information. If a form or document upload asks for specific information, provide only what is reasonably needed for that request.',
    ],
  },
  {
    title: '6. Data Security',
    body: [
      'We implement technical, administrative, and organizational safeguards designed to protect personal information against unauthorized access, disclosure, alteration, or destruction.',
      'No method of electronic transmission or storage is completely secure. You are responsible for keeping account credentials confidential and for using secure networks when accessing the portal or uploading documents.',
    ],
  },
  {
    title: '7. Your Privacy Rights',
    body: [
      'Subject to applicable laws, you may request access to personal information, correction of inaccurate information, withdrawal of consent where applicable, deletion of information subject to legal retention obligations, or information about certain processing activities.',
      'Requests may be submitted using the contact information below. We may need to verify your identity or authority before fulfilling a request.',
    ],
  },
  {
    title: '8. Cookies and Tracking Technologies',
    body: [
      'Our website may use necessary cookies for security, authentication, form protection, preference storage, and core site functionality. With your selection, we may also use analytics cookies to understand website traffic and marketing cookies to measure or optimize advertising campaigns.',
      'You can manage cookie preferences through the website consent tool when it appears and through your browser settings. Necessary cookies may remain active because they are required for secure operation.',
    ],
  },
  {
    title: '9. SMS, Email, Phone, and Chat Communications',
    body: [
      'By providing contact information, you consent to receive communications related to application updates, appointment reminders, account notifications, document requests, customer support, and promotional financing offers where you have consented.',
      'Message frequency varies based on your interaction. Message and data rates may apply. Reply STOP to opt out of SMS where supported, or use the unsubscribe mechanism included in eligible email communications.',
    ],
  },
  {
    title: '10. Data Retention',
    body: [
      'We retain personal information only as long as reasonably necessary to fulfill the purposes described in this Policy, support financing review, comply with legal, tax, regulatory, audit, security, and contractual requirements, resolve disputes, and enforce agreements.',
      'Retention periods may vary depending on the type of information, product, jurisdiction, funding partner requirements, and whether a file is active, declined, withdrawn, funded, or closed.',
    ],
  },
  {
    title: '11. Policy Updates',
    body: [
      'We may update this Privacy Policy from time to time, including as our AI-assisted tools, form flows, cookie options, funding partner workflows, or legal obligations change.',
      'Any significant changes will be posted with an updated effective date. Continued use of the Services after an update means the updated Policy applies.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Privacy Policy"
        subtitle="Effective Date: April 20, 2026"
        align="left"
      />
      <SectionWrapper size="md">
        <div className="prose-section">
          <div className="space-y-8 text-ff-muted leading-relaxed">
            <p className="text-base">
              At FirstFund, protecting your personal information is a priority. This Privacy Policy explains how we
              collect, use, disclose, and protect your personal information when you visit our website or use our
              commercial financing services.
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
              <h2 className="font-heading text-ff-text text-xl font-semibold mb-3">12. Contact Us</h2>
              <p className="text-base">
                FirstFund
                <br />
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
