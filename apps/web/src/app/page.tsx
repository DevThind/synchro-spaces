import { ArrowRight, Compass, Layers3 } from "lucide-react";
import Link from "next/link";
import {
  ConsultationCta,
  ResponsiveImage,
  SectionHeading
} from "@/components/ui";
import {
  integrationRack,
  residenceNight,
  residenceTwilight,
  sceneKeypadSix
} from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Thoughtful Smart-Home Integration",
  description:
    "Synchro Spaces brings lighting, scenes, entertainment, access and connected infrastructure into one calm smart-space experience.",
  path: "/",
  image: residenceNight.src
});

const destinations = [
  {
    eyebrow: "For the home",
    title: "Residential",
    description:
      "Explore whole-home control, lighting, curtains, entertainment, access and infrastructure.",
    href: "/residential",
    image: residenceTwilight
  },
  {
    eyebrow: "For shared spaces",
    title: "Commercial",
    description:
      "Discover considered control for selected workplaces and guest-facing environments.",
    href: "/commercial",
    image: integrationRack
  },
  {
    eyebrow: "Visual stories",
    title: "Projects",
    description:
      "See architecture, everyday controls and the hidden backbone through the project journal.",
    href: "/projects",
    image: sceneKeypadSix
  }
] as const;

const exploreLinks = [
  { label: "Our process", href: "/process" },
  { label: "Technology approach", href: "/technology-partners" },
  { label: "Control4", href: "/control4" },
  { label: "About us", href: "/about" },
  { label: "Planning guides", href: "/resources" }
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-media">
          <ResponsiveImage image={residenceNight} fill priority sizes="100vw" />
        </div>
        <div className="container hero-content">
          <div className="hero-copy stack">
            <span className="eyebrow">Synchro Spaces · Smart living, composed</span>
            <h1 id="hero-heading" className="display">
              Technology that belongs in the space.
            </h1>
            <p className="hero-lede">
              Lighting, curtains, entertainment, access and infrastructure—brought
              together around the way you want to live.
            </p>
            <div className="button-row">
              <Link
                className="button button--primary"
                href="/contact"
                data-analytics-event="booking_click"
              >
                Start a conversation <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="button button--outline" href="/projects">
                Explore projects
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
        <p className="hero-caption">Private residence · Client-supplied photography</p>
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

      <section className="section section--paper" aria-labelledby="destinations-heading">
        <div className="container">
          <div id="destinations-heading">
            <SectionHeading
              eyebrow="Explore Synchro Spaces"
              title="Start with the kind of space you are creating."
              intro="Each area has its own page, with the detail kept where it belongs."
            />
          </div>
          <div className="gateway-grid">
            {destinations.map((destination) => (
              <article className="gateway-card" key={destination.href}>
                <Link href={destination.href}>
                  <div className="gateway-card__media">
                    <ResponsiveImage
                      image={destination.image}
                      fill
                      sizes="(max-width: 780px) 100vw, 33vw"
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
