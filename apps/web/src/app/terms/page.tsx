import Link from "next/link";
import { PageHero } from "@/components/ui";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms governing use of the Synchro Spaces website and its consultation form.",
  path: "/terms"
});

export default function TermsPage() {
  return <>
    <PageHero eyebrow="Terms" title="Website terms of use." intro="This website provides general information and a way to begin a project conversation. A project proceeds only under a separate written agreement." aside="Last updated 5 September 2026." />
    <section className="section"><div className="container prose">
      <h2>Information, not a project agreement</h2>
      <p>Website content does not create a design, installation, monitoring, service or support agreement. Project scope, compatibility, pricing, schedule, responsibilities and outcomes are defined separately in writing.</p>
      <h2>No system access</h2>
      <p>This website does not control, monitor, connect to or diagnose a customer automation or security system. Never provide passwords, alarm codes, door codes, network credentials or sensitive security layouts through the enquiry form.</p>
      <h2>Products and third-party names</h2>
      <p>References to products and compatible technologies describe possible project components. They do not promise availability or suitability for every space and do not, by themselves, state a certification, dealership or partnership. Third-party names and trademarks belong to their respective owners.</p>
      <h2>Acceptable use</h2>
      <p>Do not disrupt the website, evade form protections, submit unlawful or misleading material, impersonate another person, probe for vulnerabilities or use the form to transmit confidential credentials.</p>
      <h2>External services</h2>
      <p>Links to third-party websites and social profiles lead to services with their own terms and privacy practices. Synchro Spaces is not responsible for the content or availability of those external services.</p>
      <h2>Questions</h2>
      <p>Use the <Link href="/contact">contact page</Link> for questions about this website or to begin a project enquiry.</p>
    </div></section>
  </>;
}
