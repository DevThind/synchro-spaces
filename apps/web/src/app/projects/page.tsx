import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConsultationCta, PageHero, ResponsiveImage, SectionHeading } from "@/components/ui";
import { residentialDiningRoomProject, residentialProjectTwoExteriorNight } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Residential Project Galleries",
  description: "Explore two distinct residential galleries showing lighting, entertainment, room controls, access and connected infrastructure.",
  path: "/projects",
  image: residentialDiningRoomProject.src
});

const projects = [
  {
    number: "01",
    title: "Living and dining",
    description: "Two interior views showing layered illumination, ceiling speakers and a display integrated with the room finishes.",
    image: residentialDiningRoomProject,
    href: "/residential#project-01"
  },
  {
    number: "02",
    title: "From façade to controls",
    description: "Exterior and interior views followed by lighting hardware, scene keypads, connected access and central equipment.",
    image: residentialProjectTwoExteriorNight,
    href: "/residential#project-02"
  }
] as const;

export default function ProjectsPage() {
  return <>
    <PageHero eyebrow="Project galleries" title="Real homes, organised property by property." intro="The current approved visual set covers two private residences. Each gallery keeps its photographs together and uses captions limited to visible details." aside="Locations, dates, project scope and outcomes will be added only after client approval." />
    <section className="section section--paper" aria-labelledby="project-selection-heading"><div className="container">
      <div id="project-selection-heading"><SectionHeading eyebrow="Residential work" title="Choose a project." intro="Both galleries use supplied photography. No commercial portfolio is implied while approved commercial project material is unavailable." /></div>
      <div className="project-path-grid">
        {projects.map((project) => <article className="gateway-card project-path-card" key={project.number}><Link href={project.href}>
          <div className="gateway-card__media"><ResponsiveImage image={project.image} fill priority={project.number === "01"} sizes="(max-width: 780px) 100vw, 50vw" /></div>
          <div className="gateway-card__copy"><span className="eyebrow">Project {project.number}</span><h3>{project.title}</h3><p>{project.description}</p><span className="gateway-card__action">View the project gallery <ArrowRight size={18} aria-hidden="true" /></span></div>
        </Link></article>)}
      </div>
    </div></section>
    <section className="section projects-commercial" aria-labelledby="commercial-path-heading"><div className="container content-grid">
      <div className="stack"><span className="eyebrow">Commercial planning</span><h2 id="commercial-path-heading" className="heading-lg">Planning a workplace or guest-facing property?</h2><p className="lede">The commercial page sets out the capabilities Synchro Spaces can discuss without presenting unapproved work as a portfolio.</p></div>
      <div className="projects-commercial__action"><Link className="button button--dark" href="/commercial">Explore commercial capabilities <ArrowRight size={16} aria-hidden="true" /></Link></div>
    </div></section>
    <ConsultationCta />
  </>;
}
