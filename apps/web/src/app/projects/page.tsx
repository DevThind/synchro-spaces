import { ConsultationCta, PageHero, ProjectCard, SectionHeading } from "@/components/ui";
import { getProjects } from "@/content";
import { residenceNight } from "@/content/fixtures";
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
    <section className="section"><div className="container">
      <SectionHeading eyebrow="Selected stories" title="From the exterior glow to the hidden backbone." intro="Each story focuses on the decisions that make a connected space feel coherent." />
      <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} priority={index === 0} />)}</div>
    </div></section>
    <ConsultationCta />
  </>;
}
