import { ArrowDown, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ConsultationCta, ResponsiveImage, SectionHeading } from "@/components/ui";
import {
  audioTouchscreen,
  cinemaRoom,
  control4KeypadWall,
  control4TouchscreenEvening,
  control4TouchscreenHallway,
  exteriorSecurityCamera,
  handheldMediaController,
  homeTheatre,
  integrationRack,
  sceneKeypadSix,
  videoDoorStation
} from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Integrated Smart-Space Services",
  description:
    "Explore six connected-space services spanning whole-home control, lighting, audio, networking, integrated security and remote management.",
  path: "/services",
  image: audioTouchscreen.src
});

const serviceLinks = [
  { number: "01", label: "Audio systems", href: "#audio-systems" },
  { number: "02", label: "Integrated security", href: "#integrated-security" },
  { number: "03", label: "Remote management", href: "#remote-management" },
  { number: "04", label: "Whole-home control", href: "#whole-home-control" },
  { number: "05", label: "Lighting & shading", href: "#lighting-and-shading" },
  { number: "06", label: "Networks & infrastructure", href: "#networks-and-infrastructure" }
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

const wholeHomeFeatures = [
  "Room and whole-property scenes",
  "Keypad, touchscreen and app coordination",
  "Clear local control and manual fallbacks"
] as const;

const lightingFeatures = [
  "Scene-led lighting design",
  "Compatible curtain and blind control",
  "Controls coordinated with the interior"
] as const;

const networkFeatures = [
  "Wired and wireless coverage planning",
  "Structured cabling and equipment locations",
  "Labelling, ventilation and service access"
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

      <section className="section services-chapter services-chapter--whole-home" id="whole-home-control" aria-labelledby="whole-home-control-heading">
        <div className="container services-chapter__grid">
          <div className="services-chapter__copy stack">
            <span className="eyebrow">04 · Whole-home control</span>
            <h2 id="whole-home-control-heading" className="heading-xl">One language for the whole space.</h2>
            <p className="lede">Compatible lighting, curtains, comfort and entertainment can come together through scenes and interfaces that feel consistent from room to room.</p>
            <p>The system is shaped around everyday actions rather than equipment lists, with useful local control always kept close at hand.</p>
            <ServiceFeatures items={wholeHomeFeatures} />
          </div>
          <div className="services-gallery services-gallery--whole-home" aria-label="Whole-home control examples">
            <figure className="services-gallery__primary">
              <div className="services-gallery__image"><ResponsiveImage image={control4TouchscreenHallway} fill sizes="(max-width: 780px) 100vw, 38vw" /></div>
              <figcaption><span aria-hidden="true">04A</span> A shared control language for lighting, comfort and room scenes.</figcaption>
            </figure>
            <figure className="services-gallery__secondary">
              <div className="services-gallery__image"><ResponsiveImage image={control4TouchscreenEvening} fill sizes="(max-width: 780px) 100vw, 26vw" /></div>
              <figcaption><span aria-hidden="true">04B</span> Familiar actions remain available directly in the room.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section services-chapter services-chapter--dark services-chapter--lighting" id="lighting-and-shading" aria-labelledby="lighting-and-shading-heading">
        <div className="container services-chapter__grid">
          <div className="services-chapter__copy stack">
            <span className="eyebrow">05 · Lighting & shading</span>
            <h2 id="lighting-and-shading-heading" className="heading-xl">Atmosphere, recalled simply.</h2>
            <p className="lede">Architectural lighting and compatible window treatments can be coordinated around how a room looks, feels and changes through the day.</p>
            <p>Scenes make layered settings easy to recall, while keypads are planned with the interior so the technology feels intentional rather than added later.</p>
            <ServiceFeatures items={lightingFeatures} />
          </div>
          <div className="services-gallery services-gallery--lighting" aria-label="Lighting and shading examples">
            <figure className="services-gallery__primary">
              <div className="services-gallery__image"><ResponsiveImage image={sceneKeypadSix} fill sizes="(max-width: 780px) 100vw, 38vw" /></div>
              <figcaption><span aria-hidden="true">05A</span> Clearly named scenes turn layered lighting into one simple action.</figcaption>
            </figure>
            <figure className="services-gallery__secondary">
              <div className="services-gallery__image"><ResponsiveImage image={control4KeypadWall} fill sizes="(max-width: 780px) 100vw, 26vw" /></div>
              <figcaption><span aria-hidden="true">05B</span> Controls selected to sit calmly alongside the room finishes.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section services-chapter services-chapter--network" id="networks-and-infrastructure" aria-labelledby="networks-and-infrastructure-heading">
        <div className="container services-chapter__grid">
          <div className="services-chapter__copy stack">
            <span className="eyebrow">06 · Networks & infrastructure</span>
            <h2 id="networks-and-infrastructure-heading" className="heading-xl">A stronger foundation behind the finish.</h2>
            <p className="lede">Coverage, cabling and equipment space are planned early so connected systems have an organised and supportable foundation.</p>
            <p>A considered backbone protects the finished experience from avoidable clutter and leaves practical room for commissioning, maintenance and future change.</p>
            <ServiceFeatures items={networkFeatures} />
          </div>
          <figure className="services-remote-media services-network-media">
            <div className="services-remote-media__image"><ResponsiveImage image={integrationRack} fill sizes="(max-width: 780px) 100vw, 48vw" /></div>
            <figcaption>Control, audio and network equipment organised in one clearly serviceable location.</figcaption>
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
