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
          <h1 className="display">One place to control the systems you use every day.</h1>
          <p className="hero-lede">Where Control4 is selected, compatible lighting, curtains, comfort, music, television and entry devices can share keypads, touchscreens and an app.</p>
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
      <div className="split-copy stack"><span className="eyebrow">Plan the actions first</span><h2 className="heading-xl">A keypad should say what happens, not how it is wired.</h2><p className="lede">Labels such as Welcome, Curtain and Away are easier to use than circuit numbers or technical device names.</p><p>The design identifies what belongs on a wall keypad, what needs a touchscreen or app, and which manual controls must remain available. Cable routes, network coverage, equipment locations and product compatibility are then checked against that plan.</p><p className="control4-compatibility-note"><strong>Compatibility is model-specific.</strong> Products, software versions, accounts and any subscriptions are reviewed before a feature is included in the project scope.</p><p>Control4 is a third-party trademark. Its inclusion does not state a manufacturer partnership or dealer status.</p></div>
      <div className="split-media control4-media--portrait"><ResponsiveImage image={control4TouchscreenEvening} fill sizes="(max-width: 780px) 100vw, 42vw" /></div>
    </div></section>
    <section className="section section--navy"><div className="container">
      <SectionHeading eyebrow="How it is used" title="Immediate in the room. Broader control when needed." />
      <div className="dark-feature-grid">{[
        { icon: AppWindow, title: "Room keypads", text: "Frequently used lights, curtains and scenes stay available without reaching for a phone." },
        { icon: Layers3, title: "Touchscreens & apps", text: "See and control more rooms or compatible systems from a wider interface." },
        { icon: CircleCheck, title: "Scenes & schedules", text: "Combine agreed actions for arrival, entertaining, bedtime or leaving." },
        { icon: ShieldCheck, title: "Clear boundaries", text: "Monitoring, life-safety, privacy and credential responsibilities remain explicit." }
      ].map(({ icon: Icon, title, text }) => <article className="dark-feature" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className="section"><div className="container content-grid">
      <div className="stack"><span className="eyebrow">Important boundary</span><h2 className="heading-lg">This website never connects to your system.</h2><p className="lede">Never enter Control4 usernames, passwords, alarm codes, door codes, network credentials or detailed security layouts into the enquiry form.</p></div>
      {faqs.length ? <FaqAccordion items={faqs} /> : null}
    </div></section>
    <ConsultationCta />
  </>;
}
