import { BrandGrid, ConsultationCta, PageHero, SectionHeading } from "@/components/ui";
import { getPartners } from "@/content";
import { integrationRack } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Technology Approach",
  description: "See how control, lighting, networking, audio and access technologies are considered as connected layers of one project.",
  path: "/technology-partners",
  image: integrationRack.src
});

export default async function TechnologyPartnersPage() {
  const layers = (await getPartners()).filter((partner) => !partner.verificationRequired);

  return <>
    <PageHero eyebrow="Technology approach" title="Select the system around the space." intro="Experience goals, compatibility, infrastructure, serviceability and clear responsibilities all shape an appropriate technology plan." aside="Products are assessed in the context of the project rather than as isolated specifications." />
    <section className="section"><div className="container">
      <SectionHeading eyebrow="Connected layers" title="A coherent system has more than one part." intro="Control, atmosphere, entertainment, infrastructure and entry each need to work within the same plan." />
      <BrandGrid partners={layers} />
    </div></section>
    <section className="section section--paper"><div className="container">
      <SectionHeading eyebrow="Evaluation principles" title="Compatibility is only one part of fit." />
      <div className="card-grid">{[
        ["Experience", "Does the control model make sense for the people who use the space?"],
        ["Architecture", "Can devices, fixtures, curtains, cabling and equipment be integrated cleanly?"],
        ["Foundation", "Are network, power, heat and practical service access accounted for?"],
        ["Lifecycle", "Can the system be documented, maintained and changed responsibly?"],
        ["Privacy", "Are credentials, cloud services, data paths and permissions understood?"],
        ["Responsibility", "Are life-safety, electrical, mechanical, security and monitoring boundaries clear?"]
      ].map(([title, text], index) => <article className="service-card" key={title}><span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="heading-md">{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <ConsultationCta />
  </>;
}
