import { AppWindow, CircleCheck, Layers3, ShieldCheck } from "lucide-react";
import { ConsultationCta, FaqAccordion, PageHero, ResponsiveImage, SectionHeading } from "@/components/ui";
import { getFaqs } from "@/content";
import { integrationRack } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Control4 in an Integrated Smart Space",
  description: "Learn how a Control4-based layer can coordinate compatible lighting, curtains, comfort, entertainment and access devices.",
  path: "/control4",
  image: integrationRack.src
});

export default async function Control4Page() {
  const faqs = (await getFaqs()).filter((faq) => ["platform", "privacy"].includes(faq.category));

  return <>
    <PageHero eyebrow="Control4" title="One control layer, shaped around the space." intro="Where Control4 is selected, it can bring compatible systems into a consistent interface for everyday scenes, rooms and routines." aside="Products, features and compatibility are assessed for each project." />
    <section className="section"><div className="container split">
      <div className="split-copy stack"><span className="eyebrow">Platform-aware planning</span><h2 className="heading-xl">Design the interaction, then resolve the integration.</h2><p className="lede">Lighting, curtains, comfort, music, media and selected access devices can each play a role in the same experience.</p><p>The project still needs considered infrastructure, clear interfaces, useful manual control and defined boundaries around privacy, security and specialist systems.</p><p>Control4 is a third-party trademark. Its inclusion does not state a manufacturer partnership or dealer status.</p></div>
      <div className="split-media"><ResponsiveImage image={integrationRack} fill priority sizes="(max-width: 780px) 100vw, 50vw" /></div>
    </div></section>
    <section className="section section--navy"><div className="container">
      <SectionHeading eyebrow="A considered control experience" title="Simple in use. Rigorous underneath." />
      <div className="dark-feature-grid">{[
        { icon: AppWindow, title: "Consistent", text: "Room interfaces use a shared, understandable vocabulary." },
        { icon: Layers3, title: "Layered", text: "Local controls, touchscreens and apps each serve the right moment." },
        { icon: CircleCheck, title: "Purposeful", text: "Scenes and schedules are defined around real routines, with manual control close at hand." },
        { icon: ShieldCheck, title: "Bounded", text: "Security, life-safety, privacy and credential responsibilities remain explicit." }
      ].map(({ icon: Icon, title, text }) => <article className="dark-feature" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className="section"><div className="container content-grid">
      <div className="stack"><span className="eyebrow">Important boundary</span><h2 className="heading-lg">This website never connects to your system.</h2><p className="lede">Never enter Control4 usernames, passwords, alarm codes, door codes, network credentials or detailed security layouts into the enquiry form.</p></div>
      {faqs.length ? <FaqAccordion items={faqs} /> : null}
    </div></section>
    <ConsultationCta />
  </>;
}
