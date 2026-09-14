import { AppWindow, ArrowRight, CircleCheck, Layers3, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ConsultationCta, FaqAccordion, ResponsiveImage, SectionHeading } from "@/components/ui";
import { getFaqs } from "@/content";
import {
  control4KeypadCollection,
  control4TouchscreenEvening
} from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Control4 in an Integrated Smart Space",
  description: "Learn how a Control4-based layer can coordinate compatible lighting, curtains, comfort, entertainment and access devices.",
  path: "/control4",
  image: control4KeypadCollection.src
});

export default async function Control4Page() {
  const faqs = (await getFaqs()).filter((faq) => ["platform", "privacy"].includes(faq.category));

  return <>
    <header className="control4-hero">
      <div className="container control4-hero__grid">
        <div className="control4-hero__copy stack">
          <span className="eyebrow">Control4</span>
          <h1 className="display">One control layer, shaped around the space.</h1>
          <p className="hero-lede">Where Control4 is selected, compatible systems can come together through a consistent interface for everyday scenes, rooms and routines.</p>
          <div className="button-row">
            <Link className="button button--primary" href="#control4-planning">See the approach <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link className="button button--outline" href="/contact" data-analytics-event="booking_click">Plan a consultation</Link>
          </div>
          <p className="control4-hero__note">Products, features and compatibility are assessed for each project.</p>
        </div>
        <div className="control4-hero__media">
          <ResponsiveImage image={control4KeypadCollection} fill priority sizes="(max-width: 780px) 100vw, 58vw" />
        </div>
      </div>
    </header>
    <section className="section" id="control4-planning"><div className="container split control4-intro">
      <div className="split-copy stack"><span className="eyebrow">Platform-aware planning</span><h2 className="heading-xl">Design the interaction, then resolve the integration.</h2><p className="lede">Lighting, curtains, comfort, music, media and selected access devices can each play a role in the same experience.</p><p>The project still needs considered infrastructure, clear interfaces, useful manual control and defined boundaries around privacy, security and specialist systems.</p><p className="control4-compatibility-note"><strong>Made to work with familiar brands.</strong> Compatible products from LG, Sony, Samsung, Sonos and many more can be brought into one simple experience, with exact model support confirmed for every project.</p><p>Control4 is a third-party trademark. Its inclusion does not state a manufacturer partnership or dealer status.</p></div>
      <div className="split-media control4-media--portrait"><ResponsiveImage image={control4TouchscreenEvening} fill sizes="(max-width: 780px) 100vw, 42vw" /></div>
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
