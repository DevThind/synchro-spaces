import Link from "next/link";
import { PageHero } from "@/components/ui";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Notice",
  description: "How the Synchro Spaces website handles consultation details, privacy choices and security-sensitive information.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return <>
    <PageHero eyebrow="Privacy" title="Collect less. Explain it clearly." intro="This notice describes how information is handled when you use this website or send a consultation request." aside="Last updated 5 September 2026." />
    <section className="section"><div className="container prose">
      <h2>Information you choose to provide</h2>
      <p>The consultation form collects your name, email address, phone number, project location and the project details you enter, including type, stage, services of interest, preferred contact method and message.</p>
      <p>Do not submit automation credentials, alarm codes, door codes, network passwords, payment information or sensitive security layouts through this website.</p>
      <h2>How a request is handled</h2>
      <p>The information is used to validate, protect and respond to your enquiry. Depending on the website configuration, a valid request may be sent to an enabled customer-relationship service and email provider so the enquiry can be routed and acknowledged.</p>
      <p>The server assigns a request identifier and uses an internet address temporarily for rate limiting and, when enabled, bot verification. Operational error logging is limited to the request identifier and a sanitised error description rather than the form contents.</p>
      <h2>Privacy choices and analytics</h2>
      <p>Local browser storage remembers your privacy preference. Optional analytics remain off unless you allow them. If analytics are enabled, the website records limited page and interaction events; consultation form contents are not included in those events. You can change this choice using the <strong>Privacy choices</strong> control on the site.</p>
      <h2>Retention and service providers</h2>
      <p>The website does not set a single retention period for records held by an enabled CRM or email service. Retention and deletion depend on the services active when a request is submitted and the operational or legal needs connected with that request.</p>
      <h2>Questions about your information</h2>
      <p>Use the <Link href="/contact">contact form</Link> to ask a privacy question or make a request about information you submitted. Include enough context to identify the request, but do not send credentials or sensitive security details.</p>
    </div></section>
  </>;
}
