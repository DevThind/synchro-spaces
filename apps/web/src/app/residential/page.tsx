import { ConsultationCta, FaqAccordion, PageHero, ProjectCard, SectionHeading, ServiceCard } from "@/components/ui";
import { getFaqs, getProjects, getServices } from "@/content";
import { residenceNight } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Residential Smart-Home Integration",
  description: "Plan whole-home automation, lighting, curtains, entertainment, access and connected infrastructure around your rooms and routines.",
  path: "/residential",
  image: residenceNight.src
});

export default async function ResidentialPage() {
  const [allServices, allProjects, faqs] = await Promise.all([getServices(), getProjects(), getFaqs()]);
  const services = allServices.filter((service) => service.published && service.audience !== "commercial");
  const projects = allProjects.filter((project) => project.published && !project.propertyType.toLowerCase().includes("commercial"));

  return <>
    <PageHero eyebrow="Residential" title="A home that responds without demanding attention." intro="Bring lighting, curtains, comfort, entertainment, access and networking into one composed experience built around the way each room is used." aside="For new homes, renovations and thoughtfully scoped upgrades." />
    <section className="section"><div className="container">
      <SectionHeading eyebrow="Residential solutions" title="Built around rooms and routines." intro="Begin with what should happen, then shape the controls and infrastructure that make it simple." />
      <div className="card-grid">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div>
    </div></section>
    <section className="section section--paper"><div className="container">
      <SectionHeading eyebrow="Visual stories" title="Architecture first. Technology considered." intro="See how light, controls, access and organised infrastructure contribute to a connected home." />
      <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} priority={index === 0} />)}</div>
    </div></section>
    {faqs.length ? <section className="section" aria-labelledby="planning-questions-heading"><div className="container content-grid faq-layout"><div className="stack faq-layout__intro"><span className="eyebrow">Planning questions</span><h2 id="planning-questions-heading" className="heading-lg">Useful answers before design begins.</h2></div><FaqAccordion items={faqs} /></div></section> : null}
    <ConsultationCta />
  </>;
}
