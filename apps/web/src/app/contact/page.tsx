import { ContactInformation } from "@/components/contact-information";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/ui";
import { sceneKeypadThree } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Plan a Consultation",
  description: "Share the initial context for your residential or commercial smart-space project with Synchro Spaces.",
  path: "/contact",
  image: sceneKeypadThree.src
});

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Consultation" title="Tell us how you want the space to feel." intro="Share the project type, stage, location and the moments you want to make simpler. A useful first enquiry does not need passwords, access codes or detailed security information." aside="The form asks only for the context needed to begin a conversation." />
    <section className="section"><div className="container form-layout"><div><LeadForm /></div><ContactInformation /></div></section>
  </>;
}
