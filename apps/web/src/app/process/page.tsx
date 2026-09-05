import { ConsultationCta, PageHero, ProcessSteps, SectionHeading } from "@/components/ui";
import { integrationRack, processSteps } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Our Smart-Space Process",
  description: "Follow the Synchro Spaces approach from listening and planning through coordination, integration and handover.",
  path: "/process",
  image: integrationRack.src
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
    <PageHero eyebrow="Process" title="A clear path from first conversation to handover." intro="Listen, plan, coordinate, integrate and hand over: each stage keeps the rooms, routines and project constraints in view." aside="Good integration starts before equipment is selected." />
    <section className="section section--dark"><div className="container"><ProcessSteps steps={processSteps} /></div></section>
    <section className="section"><div className="container">
      <SectionHeading eyebrow="What we ask for" title="Enough context to make the first conversation useful." intro="Plans and project context help. Credentials and sensitive security information do not belong in an online enquiry." />
      <div className="card-grid">{projectInputs.map(([title, text], index) => <article className="service-card" key={title}><span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="heading-md">{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <ConsultationCta />
  </>;
}
