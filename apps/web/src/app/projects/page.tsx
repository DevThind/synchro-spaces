import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConsultationCta, PageHero, ProjectCard, ResponsiveImage, SectionHeading } from "@/components/ui";
import { getProjects } from "@/content";
import { control4TouchscreenHallway, integrationRack, residenceNight } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Smart-Space Projects",
  description: "Explore Synchro Spaces visual stories spanning architectural lighting, intuitive scene controls and connected infrastructure.",
  path: "/projects",
  image: residenceNight.src
});

export default async function ProjectsPage() {
  const projects = (await getProjects()).filter((project) => project.published);
  return <>
    <PageHero eyebrow="Project journal" title="Look closer at the connected details." intro="Explore visual stories about architectural light, everyday controls and the infrastructure that brings a smart space together." aside="The technology stays considered so the space remains the focus." />
    <section className="section section--paper" aria-labelledby="projects-by-space-heading"><div className="container">
      <div id="projects-by-space-heading"><SectionHeading eyebrow="Projects by space" title="Residential and commercial, each in context." intro="Choose the setting you are planning to explore the systems, priorities and possibilities relevant to that kind of project." /></div>
      <div className="project-path-grid">
        {[
          { title: "Residential", eyebrow: "Homes", description: "Whole-home control shaped around rooms, routines and the people who live there.", href: "/residential", image: control4TouchscreenHallway },
          { title: "Commercial", eyebrow: "Shared spaces", description: "Considered control for selected workplaces and guest-facing environments.", href: "/commercial", image: integrationRack }
        ].map((path) => <article className="gateway-card project-path-card" key={path.href}><Link href={path.href}>
          <div className="gateway-card__media"><ResponsiveImage image={path.image} fill priority sizes="(max-width: 780px) 100vw, 50vw" /></div>
          <div className="gateway-card__copy"><span className="eyebrow">{path.eyebrow}</span><h3>{path.title}</h3><p>{path.description}</p><span className="gateway-card__action">Explore {path.title.toLowerCase()} <ArrowRight size={18} aria-hidden="true" /></span></div>
        </Link></article>)}
      </div>
    </div></section>
    <section className="section"><div className="container">
      <SectionHeading eyebrow="Selected stories" title="From the exterior glow to the hidden backbone." intro="Each story focuses on the decisions that make a connected space feel coherent." />
      <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} priority={index === 0} />)}</div>
    </div></section>
    <ConsultationCta />
  </>;
}
