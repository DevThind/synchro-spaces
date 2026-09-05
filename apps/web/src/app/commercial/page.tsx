import { CalendarClock, Gauge, Settings2, Users } from "lucide-react";
import { ConsultationCta, PageHero, ResponsiveImage, SectionHeading, ServiceCard } from "@/components/ui";
import { getServices } from "@/content";
import { integrationRack } from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Commercial Smart-Space Integration",
  description: "Explore considered lighting, scene, audio and network integration for selected workplaces and guest-facing spaces.",
  path: "/commercial",
  image: integrationRack.src
});

export default async function CommercialPage() {
  const services = (await getServices()).filter((service) => service.published && service.audience !== "residential");

  return <>
    <PageHero eyebrow="Commercial" title="Consistent atmosphere. Clear everyday control." intro="Connected lighting, scenes, audio and network infrastructure can support smoother daily operation in selected workplaces and guest-facing spaces." aside="The appropriate scope depends on the space, its users and compatible systems." />
    <section className="section section--paper"><div className="container split">
      <div className="split-media"><ResponsiveImage image={integrationRack} fill priority sizes="(max-width: 780px) 100vw, 50vw" /></div>
      <div className="stack"><span className="eyebrow">Foundation first</span><h2 className="heading-xl">Plan the infrastructure behind the experience.</h2><p className="lede">Equipment space, cabling, network coverage, power and ventilation influence how well a connected environment works.</p><p>Visible controls can then be shaped around the people who use the space, with straightforward daily actions and deliberate access to deeper settings.</p></div>
    </div></section>
    <section className="section section--navy"><div className="container">
      <SectionHeading eyebrow="Operational by design" title="Make the intended setting easier to repeat." intro="A considered control approach balances simple daily use with clear technical boundaries." />
      <div className="dark-feature-grid">{[
        { icon: Users, title: "Role-aware control", text: "Keep common actions easy to reach while making advanced settings deliberate." },
        { icon: CalendarClock, title: "Useful routines", text: "Shape opening, service, event and closing scenes around the way the space operates." },
        { icon: Gauge, title: "Relevant visibility", text: "Surface useful status from compatible systems without crowding everyday control." },
        { icon: Settings2, title: "Serviceable foundation", text: "Organised infrastructure and clear documentation make the system easier to understand." }
      ].map(({ icon: Icon, title, text }) => <article className="dark-feature" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>
    <section className="section"><div className="container">
      <SectionHeading eyebrow="Connected layers" title="Coordinate the environment as one system." intro="Technology is selected against the project goals, compatibility, infrastructure and the people responsible for daily operation." />
      <div className="card-grid">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div>
    </div></section>
    <ConsultationCta />
  </>;
}
