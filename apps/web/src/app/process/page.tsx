import { ProcessJourney } from "@/components/process-journey";
import { ConsultationCta, PageHero, SectionHeading } from "@/components/ui";
import { processHero, processSteps } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Our Smart-Space Process",
  description: "Follow the Synchro Spaces approach from listening and planning through coordination, integration and handover.",
  path: "/process",
  image: processHero.src
});

const projectInputs = [
  ["Project context", "The property type, new build or renovation, approximate stage and intended timeline."],
  ["Design information", "Available plans, room priorities, ceiling details and finish intent, shared later through a suitable project channel."],
  ["Experience goals", "The moments that should feel simpler, more comfortable or easier to operate."],
  ["Practical boundaries", "The budget framework, construction milestones and responsibilities across the project team."],
  ["Existing systems", "A general description is enough for the enquiry. Detailed network or security layouts are reviewed through an appropriate channel later."],
  ["Decision team", "The people responsible for design, commercial, technical and day-to-day operating decisions."]
];

export default function ProcessPage() {
  return <>
    <PageHero eyebrow="Process" title="A clear path from brief to handover." intro="The work moves from requirements and drawings to a coordinated design, installation, testing and a practical walkthrough." backgroundImage={processHero} />
    <section className="section section--dark" aria-label="Interactive project process"><div className="container"><ProcessJourney steps={processSteps} /></div></section>
    <section className="section"><div className="container">
      <SectionHeading eyebrow="What we ask for" title="The information that makes a first meeting useful." intro="A floor plan, room priorities, project stage and budget framework help establish the right scope. Sensitive credentials do not belong in an online enquiry." />
      <div className="card-grid">{projectInputs.map(([title, text], index) => <article className="service-card" key={title}><span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="heading-md">{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <ConsultationCta />
  </>;
}
