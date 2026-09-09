import { ArrowDown, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ConsultationCta, ResponsiveImage, SectionHeading } from "@/components/ui";
import {
  audioTouchscreen,
  cinemaRoom,
  exteriorSecurityCamera,
  handheldMediaController,
  homeTheatre,
  videoDoorStation
} from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Audio, Security & Remote Management",
  description:
    "Explore considered audio systems, integrated security and remote management for connected homes and spaces.",
  path: "/services",
  image: audioTouchscreen.src
});

const serviceLinks = [
  { number: "01", label: "Audio systems", href: "#audio-systems" },
  { number: "02", label: "Integrated security", href: "#integrated-security" },
  { number: "03", label: "Remote management", href: "#remote-management" }
] as const;

const audioFeatures = [
  "Single-room and multi-room audio planning",
  "Home cinema and display coordination",
  "Simple source, room and volume control"
] as const;

const securityFeatures = [
  "Entry and video-door coordination",
  "Compatible camera views and useful alerts",
  "Explicit boundaries for monitoring and life safety"
] as const;

const remoteFeatures = [
  "Status visibility for supported devices",
  "Service alerts and permission-based diagnostics",
  "Clear escalation when on-site support is needed"
] as const;

function ServiceFeatures({ items }: { items: readonly string[] }) {
  return (
    <ul className="services-feature-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={17} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  return (
    <>
      <header className="services-hero">
        <div className="container services-hero__grid">
          <div className="services-hero__copy stack">
            <span className="eyebrow">Our services</span>
            <h1 className="display">Technology, considered as part of the space.</h1>
            <p className="hero-lede">
              Audio systems, integrated security and remote management—planned
              around the rooms, routines and people they serve.
            </p>
            <nav className="services-index" aria-label="Jump to a service">
              {serviceLinks.map((service) => (
                <a href={service.href} key={service.href}>
                  <span className="services-index__number" aria-hidden="true">{service.number}</span>
                  <span>{service.label}</span>
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
          <figure className="services-hero__media">
            <ResponsiveImage
              image={audioTouchscreen}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <figcaption>Music and room control, close at hand.</figcaption>
          </figure>
        </div>
      </header>

      <section className="section section--intro" aria-labelledby="services-intro-heading">
        <div className="container intro-grid">
          <div className="intro-grid__heading stack">
            <span className="eyebrow">One coordinated approach</span>
            <h2 id="services-intro-heading" className="heading-xl">
              Start with the experience. Resolve the detail behind it.
            </h2>
          </div>
          <p className="lede">
            The right design brings interfaces, infrastructure and support into
            focus early. Exact features depend on compatible products, software,
            accounts, subscriptions and the agreed project scope.
          </p>
        </div>
      </section>

      <section className="section services-chapter services-chapter--audio" id="audio-systems" aria-labelledby="audio-systems-heading">
        <div className="container services-chapter__grid">
          <div className="services-chapter__copy stack">
            <span className="eyebrow">01 · Audio systems</span>
            <h2 id="audio-systems-heading" className="heading-xl">Every room sounds considered.</h2>
            <p className="lede">
              Music and entertainment can be thoughtfully distributed across one
              room or many, with simple control from the interfaces chosen for the space.
            </p>
            <p>
              We consider speakers, displays, sources, equipment locations, cable
              routes and room use together—whether the brief is relaxed everyday
              listening or a dedicated cinema.
            </p>
            <ServiceFeatures items={audioFeatures} />
          </div>
          <div className="services-gallery services-gallery--audio" aria-label="Audio system examples">
            <figure className="services-gallery__primary">
              <div className="services-gallery__image">
                <ResponsiveImage image={homeTheatre} fill sizes="(max-width: 780px) 100vw, 38vw" />
              </div>
              <figcaption><span aria-hidden="true">01A</span> A dedicated theatre shaped around clear viewing and listening.</figcaption>
            </figure>
            <figure className="services-gallery__secondary">
              <div className="services-gallery__image">
                <ResponsiveImage image={cinemaRoom} fill sizes="(max-width: 780px) 100vw, 26vw" />
              </div>
              <figcaption><span aria-hidden="true">01B</span> Displays, sound and control planned as one room experience.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section services-chapter services-chapter--dark services-chapter--security" id="integrated-security" aria-labelledby="integrated-security-heading">
        <div className="container services-chapter__grid">
          <div className="services-chapter__copy stack">
            <span className="eyebrow">02 · Integrated security</span>
            <h2 id="integrated-security-heading" className="heading-xl">Awareness, without unnecessary complexity.</h2>
            <p className="lede">
              Compatible cameras, video door stations, locks, gates, sensors and
              selected alarm controls can be brought into one considered interface.
            </p>
            <p>
              Views and notifications are configured around how the property is
              used. Integration can support visibility and convenience, but it does
              not replace a professionally designed life-safety or monitored security service.
            </p>
            <ServiceFeatures items={securityFeatures} />
          </div>
          <div className="services-gallery services-gallery--security" aria-label="Integrated security examples">
            <figure className="services-gallery__primary">
              <div className="services-gallery__image">
                <ResponsiveImage image={exteriorSecurityCamera} fill sizes="(max-width: 780px) 100vw, 38vw" />
              </div>
              <figcaption><span aria-hidden="true">02A</span> Camera placement coordinated with the building and intended view.</figcaption>
            </figure>
            <figure className="services-gallery__secondary">
              <div className="services-gallery__image">
                <ResponsiveImage image={videoDoorStation} fill sizes="(max-width: 780px) 100vw, 26vw" />
              </div>
              <figcaption><span aria-hidden="true">02B</span> A clear interaction at the point of entry.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section services-chapter services-chapter--remote" id="remote-management" aria-labelledby="remote-management-heading">
        <div className="container services-chapter__grid">
          <div className="services-chapter__copy stack">
            <span className="eyebrow">03 · Remote management</span>
            <h2 id="remote-management-heading" className="heading-xl">Support that starts with a clearer picture.</h2>
            <p className="lede">
              With compatible systems enrolled for remote support, device status
              and service alerts can help identify and resolve some issues without an on-site visit.
            </p>
            <p>
              Remote access remains permission-based and limited to the agreed
              support scope. Some issues still require an on-site visit, and this
              public website never connects to a customer system or asks for credentials.
            </p>
            <ServiceFeatures items={remoteFeatures} />
          </div>
          <figure className="services-remote-media">
            <div className="services-remote-media__image">
              <ResponsiveImage image={handheldMediaController} fill sizes="(max-width: 780px) 100vw, 48vw" />
            </div>
            <figcaption>
              Everyday control stays simple; remote support remains a separate,
              permission-based service for compatible systems.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="service-boundaries-heading">
        <div className="container">
          <SectionHeading
            eyebrow="Designed with boundaries"
            title="Capability is only useful when responsibility is clear."
            intro="Every proposal confirms what is compatible, what is included and which specialist or monitored services remain separate."
          />
          <div className="services-boundaries">
            <article>
              <span aria-hidden="true">01</span>
              <h3>Compatibility first</h3>
              <p>Products, accounts, software and subscriptions are reviewed before features are promised.</p>
            </article>
            <article>
              <span aria-hidden="true">02</span>
              <h3>Security stays bounded</h3>
              <p>Alarm response, monitoring and life-safety responsibilities remain explicit and separate.</p>
            </article>
            <article>
              <span aria-hidden="true">03</span>
              <h3>Credentials stay private</h3>
              <p>Never send passwords, door codes, alarm codes or security layouts through the enquiry form.</p>
            </article>
          </div>
          <Link className="text-link services-control4-link" href="/control4">
            See how Control4 can fit into the experience <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
