import { ArrowRight, Compass, Layers3 } from "lucide-react";
import Link from "next/link";
import {
  ConsultationCta,
  ResponsiveImage,
  SectionHeading
} from "@/components/ui";
import {
  control4KeypadWall,
  control4TouchscreenHallway,
  integrationRack,
  residenceNight,
  residenceTwilight
} from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Intelligence You Can Feel, Not See",
  description:
    "Synchro Spaces brings lighting, scenes, entertainment, integrated security and connected infrastructure into one calm smart-space experience.",
  path: "/",
  image: control4KeypadWall.src
});

const projectDestinations = [
  {
    eyebrow: "Project journal",
    title: "Selected projects",
    description:
      "Look closer at the architecture, controls and infrastructure behind a considered smart space.",
    href: "/projects",
    image: residenceNight
  },
  {
    eyebrow: "Projects · Residential",
    title: "Homes",
    description:
      "Explore whole-home control, lighting, curtains, entertainment, integrated security and infrastructure.",
    href: "/residential",
    image: residenceTwilight
  },
  {
    eyebrow: "Projects · Commercial",
    title: "Shared spaces",
    description:
      "Discover considered control for selected workplaces and guest-facing environments.",
    href: "/commercial",
    image: integrationRack
  }
] as const;

const exploreLinks = [
  { label: "Control4", href: "/control4" },
  { label: "Our process", href: "/process" },
  { label: "Our services", href: "/services" },
  { label: "Technology approach", href: "/technology-partners" },
  { label: "About us", href: "/about" },
  { label: "Planning guides", href: "/resources" }
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero hero--control4" aria-labelledby="hero-heading">
        <div className="hero-media">
          <ResponsiveImage image={control4KeypadWall} fill priority sizes="100vw" />
        </div>
        <div className="container hero-content">
          <div className="hero-copy stack">
            <span className="eyebrow">Synchro Spaces · Smart living, composed</span>
            <h1 id="hero-heading" className="display">
              Intelligence you can feel. Not see.
            </h1>
            <p className="hero-lede">
              Lighting, curtains, comfort and entertainment—brought together in
              one calm experience shaped around the way you live.
            </p>
            <div className="button-row">
              <Link
                className="button button--primary"
                href="/control4"
              >
                Explore Control4 <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                className="button button--outline"
                href="/contact"
                data-analytics-event="booking_click"
              >
                Plan a consultation
              </Link>
            </div>
            <div className="hero-note">
              <span>
                <Compass size={15} aria-hidden="true" /> Designed around daily life
              </span>
              <span>
                <Layers3 size={15} aria-hidden="true" /> New build · renovation · upgrade
              </span>
            </div>
          </div>
        </div>
        <p className="hero-caption">Scene control · Client-supplied photography</p>
      </section>

      <section className="section section--intro" aria-labelledby="intro-heading">
        <div className="container intro-grid">
          <div className="intro-grid__heading stack">
            <span className="eyebrow">The Synchro idea</span>
            <h2 id="intro-heading" className="heading-xl">
              Every room in rhythm. Every control in context.
            </h2>
          </div>
          <p className="lede">
            A smart space should not feel full of technology. It should feel
            intuitive—the right light, atmosphere and response without unnecessary
            steps. Choose a path below to explore each part in detail.
          </p>
        </div>
      </section>

      <section className="section home-control4" aria-labelledby="home-control4-heading">
        <div className="container control4-feature">
          <div className="control4-feature__media">
            <ResponsiveImage
              image={control4TouchscreenHallway}
              fill
              sizes="(max-width: 780px) 100vw, 58vw"
            />
            <span className="image-index" aria-hidden="true">01 / Control in context</span>
          </div>
          <div className="control4-feature__copy stack">
            <span className="eyebrow">Control4</span>
            <h2 id="home-control4-heading" className="heading-xl">
              One interface. Many everyday moments.
            </h2>
            <p className="lede">
              Where Control4 is selected, compatible lighting, curtains, comfort,
              music and media can respond through a consistent set of scenes and controls.
            </p>
            <div className="control4-feature__details" aria-label="Control options">
              <span>Local keypads</span>
              <span>Touchscreens</span>
              <span>Room scenes</span>
            </div>
            <Link className="text-link" href="/control4">
              Discover the Control4 approach <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="destinations-heading">
        <div className="container">
          <div id="destinations-heading">
            <SectionHeading
              eyebrow="Projects"
              title="Explore by project and place."
              intro="Begin with selected visual stories, then follow the residential or commercial path for the detail relevant to your space."
            />
          </div>
          <div className="gateway-grid">
            {projectDestinations.map((destination, index) => (
              <article className="gateway-card" key={destination.href}>
                <Link href={destination.href}>
                  <div className="gateway-card__media">
                    <ResponsiveImage
                      image={destination.image}
                      fill
                      sizes={index === projectDestinations.length - 1
                        ? "(max-width: 780px) 100vw, 33vw"
                        : "(max-width: 560px) 100vw, (max-width: 780px) 50vw, 33vw"}
                    />
                  </div>
                  <div className="gateway-card__copy">
                    <span className="eyebrow">{destination.eyebrow}</span>
                    <h3>{destination.title}</h3>
                    <p>{destination.description}</p>
                    <span className="gateway-card__action">
                      Open page <ArrowRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="explore-heading">
        <div className="container">
          <div id="explore-heading">
            <SectionHeading
              eyebrow="Explore further"
              title="The detail, on dedicated pages."
              intro="Learn how a project moves forward, how technology is approached and what to consider before design begins."
            />
          </div>
          <nav className="page-directory" aria-label="More Synchro Spaces pages">
            {exploreLinks.map((item, index) => (
              <Link href={item.href} key={item.href}>
                <span className="page-directory__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
