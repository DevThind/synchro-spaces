import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ConsultationCta, PageHero, SectionHeading } from "@/components/ui";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Commercial Automation Planning",
  description: "Discuss coordinated lighting, audio, video, networks, access interfaces and simple day-to-day control for commercial environments.",
  path: "/commercial"
});

const capabilities = [
  ["Lighting & scenes", "Create clear settings for opening, trading, presentations, events or closing, while keeping local overrides available."],
  ["Audio & displays", "Coordinate background music, meeting-room sources, displays and the controls used by staff."],
  ["Networks & equipment", "Plan structured cabling, wireless coverage, rack space, ventilation and service access with the wider project team."],
  ["Entry & camera interfaces", "Bring supported door stations, cameras and selected access functions into approved interfaces, with monitoring and life-safety responsibilities kept separate."],
  ["Remote support readiness", "Where compatible systems and an agreed support service allow it, status information can help diagnose some faults before an on-site visit."]
] as const;

export default function CommercialPage() {
  return <>
    <PageHero eyebrow="Commercial" title="Clear controls for shared and staff-operated environments." intro="Synchro Spaces can plan connected lighting, audio, video, networks and selected security interfaces around the people who operate the property each day." aside="Commercial project photography is not published until client permission and project facts are approved." />

    <section className="section section--paper commercial-capabilities" aria-labelledby="commercial-capabilities-heading"><div className="container">
      <div id="commercial-capabilities-heading"><SectionHeading eyebrow="Capabilities" title="Start with the operating brief." intro="The useful questions are practical: who controls each area, what should happen at opening and closing, which systems are shared, and who supports them." /></div>
      <ul className="commercial-capability-list">
        {capabilities.map(([title, text]) => <li key={title}><Check size={18} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></li>)}
      </ul>
    </div></section>

    <section className="section commercial-brief" aria-labelledby="commercial-brief-heading"><div className="container content-grid">
      <div className="stack"><span className="eyebrow">For the first conversation</span><h2 id="commercial-brief-heading" className="heading-lg">Bring the plan, programme and operating priorities.</h2><p className="lede">A floor plan, project stage, room list and the actions staff repeat each day are enough to begin. Product compatibility, specialist responsibilities and support scope are confirmed during design.</p></div>
      <aside className="aside-card"><h3>Useful starting points</h3><ul className="feature-list"><li><Check size={17} aria-hidden="true" /> Property type and project stage</li><li><Check size={17} aria-hidden="true" /> Areas and operating hours</li><li><Check size={17} aria-hidden="true" /> Audio, display and lighting priorities</li><li><Check size={17} aria-hidden="true" /> Project team and construction milestones</li></ul></aside>
    </div></section>

    <section className="section section--navy commercial-evidence" aria-labelledby="commercial-evidence-heading"><div className="container commercial-evidence__inner">
      <div className="stack"><span className="eyebrow">Portfolio note</span><h2 id="commercial-evidence-heading" className="heading-lg">No unapproved case studies.</h2><p>The site does not imply a commercial portfolio while approved photography and project facts are unavailable. Relevant work can be discussed privately where permissions allow.</p></div>
      <Link className="button button--outline" href="/contact">Discuss a commercial project <ArrowRight size={16} aria-hidden="true" /></Link>
    </div></section>
    <ConsultationCta />
  </>;
}
