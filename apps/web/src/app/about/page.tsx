import { ConsultationCta, PageHero, ResponsiveImage, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { residenceTwilight } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Synchro Spaces",
  description: "Meet Synchro Spaces and the design principles behind its thoughtful approach to connected homes and spaces.",
  path: "/about",
  image: residenceTwilight.src
});

const principles = [
  ["Start with the space", "Understand the rooms, routines and design intent before defining the technology."],
  ["Make control clear", "Use familiar language, purposeful scenes and local controls that are easy to find."],
  ["Plan the foundation", "Coordinate pathways, power, coverage and equipment space before they become constraints."],
  ["Keep complexity quiet", "Let the infrastructure do its work without dominating the architecture."],
  ["Respect boundaries", "Treat privacy, credentials, life-safety systems and specialist responsibilities with care."],
  ["Leave a clear path", "Document the agreed system and make future service and change easier to understand."]
];

export default function AboutPage() {
  return <>
    <PageHero
      eyebrow="About"
      title="Technology in service of better spaces."
      intro={`${siteConfig.companyName} brings lighting, scenes, entertainment, access and connected infrastructure into one considered experience.`}
      aside="Clear to use. Calm to live with. Planned around the architecture."
    />
    <section className="section"><div className="container split">
      <div className="split-media"><ResponsiveImage image={residenceTwilight} fill priority sizes="(max-width: 780px) 100vw, 50vw" /></div>
      <div className="stack"><span className="eyebrow">Our point of view</span><h2 className="heading-xl">A smart space should still feel like your space.</h2><p className="lede">The strongest systems begin with how people move, relax, host, work and arrive home.</p><p>Synchro Spaces plans the visible controls and the infrastructure behind them as parts of the same design. Product choices follow the experience, compatibility and practical needs of the project.</p></div>
    </div></section>
    <section className="section section--paper"><div className="container">
      <SectionHeading eyebrow="Principles" title="How we approach the work." intro="A composed result comes from thoughtful decisions at every layer." />
      <div className="card-grid">{principles.map(([title, text], index) => <article className="service-card" key={title}><span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="heading-md">{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <ConsultationCta />
  </>;
}
