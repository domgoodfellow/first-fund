import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-12 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-ff-text mb-2">Privacy Policy</h1>
          <p className="text-ff-muted text-sm mb-10">Effective Date: March 6, 2025</p>

          <div className="prose prose-invert prose-sm max-w-none text-ff-muted leading-relaxed space-y-6">
            <p>
              At FirsFund, protecting your personal information is a priority. This Privacy Policy explains how we
              collect, use, disclose, and protect your personal information when you visit our website or use our
              commercial financing services.
            </p>

            {[
              {
                title: '1. Information We Collect',
                body: 'We may collect: contact information (full name, phone, email, business name, address); business & financial information (revenue details, banking information, supporting documents); technical information (IP address, browser type, device information, pages visited); and any additional information you provide voluntarily.',
              },
              {
                title: '2. How We Use Your Information',
                body: 'We use your information to process and evaluate financing applications, communicate regarding your application or account, schedule appointments or consultations, provide customer support, send service updates and reminders, send promotional offers (with consent), improve our website and services, and comply with legal and regulatory obligations.',
              },
              {
                title: '3. Sharing of Information',
                body: 'We do not sell your personal information. We may share your information with financial partners and lenders to evaluate funding eligibility, service providers (CRM systems, hosting providers, marketing platforms), professional advisors, and government or regulatory authorities when required by law. No mobile information (including phone numbers or SMS consent data) will be sold or shared with third parties for external marketing purposes.',
              },
              {
                title: '4. Data Security',
                body: 'We implement appropriate technical, administrative, and organizational safeguards to protect your personal information against unauthorized access, disclosure, alteration, or destruction. While we strive to protect your data, no method of electronic transmission or storage is completely secure.',
              },
              {
                title: '5. Your Privacy Rights',
                body: 'Subject to applicable laws, you may request: access to your personal information; correction of inaccurate information; withdrawal of consent (where applicable); deletion of your information, subject to legal retention obligations. Requests may be submitted using the contact information below.',
              },
              {
                title: '6. Cookies & Tracking Technologies',
                body: 'Our website may use cookies and similar technologies to improve user experience, analyze website traffic, and optimize advertising campaigns. You may manage cookie preferences through your browser settings.',
              },
              {
                title: '7. SMS Communications & Consent',
                body: 'By providing your phone number on our website, you consent to receive SMS messages regarding application updates, appointment reminders, account notifications, and promotional financing offers (if consented). Message Frequency: Varies based on interaction. Message & Data Rates: May apply. Opt-Out: Reply STOP at any time.',
              },
              {
                title: '8. Data Retention',
                body: 'We retain personal information only as long as necessary to fulfill the purposes outlined in this Policy, comply with legal, tax, and regulatory requirements, and resolve disputes and enforce agreements.',
              },
              {
                title: '9. Policy Updates',
                body: 'We may update this Privacy Policy from time to time. Any significant changes will be posted with an updated effective date.',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-heading text-ff-text text-lg font-semibold mb-2">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}

            <div>
              <h2 className="font-heading text-ff-text text-lg font-semibold mb-2">10. Contact Us</h2>
              <p>
                FirsFund
                <br />
                Website: <span className="text-ff-accent">www.firsfund.com</span>
                <br />
                Email: <span className="text-ff-accent">info@firsfund.com</span>
                <br />
                Phone: +1 (555) 000-0000
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
