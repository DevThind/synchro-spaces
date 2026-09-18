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
    <PageHero eyebrow="Consultation" title="Tell us what you are planning." intro="Share the project location and stage, the rooms involved, and what you need lighting, curtains, entertainment or connected systems to do." aside="A name, preferred contact method and short brief are enough to start." />
    <section className="section"><div className="container form-layout"><div><LeadForm /></div><ContactInformation /></div></section>
  </>;
}
