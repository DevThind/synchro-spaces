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
    <PageHero eyebrow="Consultation" title="Let’s begin with your space." intro="Tell us where the project is and what you would like lighting, curtains, entertainment or connected systems to do more simply." aside="A name, preferred contact method and short brief are enough to start." />
    <section className="section"><div className="container form-layout"><div><LeadForm /></div><ContactInformation /></div></section>
  </>;
}
