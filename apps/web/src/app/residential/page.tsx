import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConsultationCta, ResponsiveImage } from "@/components/ui";
import {
  residentialDiningRoomProject,
  residentialLivingRoomProject,
  residentialProjectTwoDining,
  residentialProjectTwoEquipmentRack,
  residentialProjectTwoExteriorNight,
  residentialProjectTwoExteriorTwilight,
  residentialProjectTwoKitchen,
  residentialProjectTwoLightingPanel,
  residentialProjectTwoSixSceneKeypad,
  residentialProjectTwoThreeSceneKeypad,
  residentialProjectTwoYaleLock
} from "@/content/fixtures";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Residential Projects",
  description: "Explore completed residential spaces where lighting, entertainment and discreet control are composed around the architecture.",
  path: "/residential",
  image: residentialLivingRoomProject.src
});

const projectPrinciples = [
  {
    number: "01",
    title: "Architecture remains the focus",
    text: "Technology is positioned, finished and controlled so the room reads as a complete interior—not a collection of devices."
  },
  {
    number: "02",
    title: "Light builds the atmosphere",
    text: "Recessed, concealed and decorative lighting work in layers, giving everyday scenes depth without visual clutter."
  },
  {
    number: "03",
    title: "Control stays close at hand",
    text: "The useful actions belong where people naturally need them, while the supporting infrastructure stays quietly out of sight."
  }
] as const;

const projectTwoDetails = [
  { image: residentialProjectTwoDining, caption: "Dining space · Warm timber, decorative pendants and integrated ceiling audio." },
  { image: residentialProjectTwoKitchen, caption: "Kitchen · Lighting and audio resolved within the architectural ceiling." },
  { image: residentialProjectTwoLightingPanel, caption: "Central lighting · The working layer behind simple room scenes." },
  { image: residentialProjectTwoSixSceneKeypad, caption: "Room control · Clearly named actions for connected spaces." },
  { image: residentialProjectTwoYaleLock, caption: "Access · A connected lock integrated at the point of entry." },
  { image: residentialProjectTwoThreeSceneKeypad, caption: "Everyday scenes · Welcome, Curtain and Away kept close at hand." },
  { image: residentialProjectTwoEquipmentRack, caption: "Infrastructure · Control, audio, networking and surveillance organised in one rack." }
] as const;

export default function ResidentialPage() {
  return <>
    <header className="portfolio-hero portfolio-hero--residential">
      <div className="container portfolio-hero__grid">
        <div className="portfolio-hero__copy stack">
          <span className="eyebrow">Residential project journal</span>
          <h1 className="display">Residential projects.</h1>
          <p className="hero-lede">Completed homes where light, sound and control are designed to belong.</p>
          <a className="text-link portfolio-hero__link" href="#residential-gallery">View the projects <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <figure className="portfolio-hero__media">
          <ResponsiveImage image={residentialLivingRoomProject} fill priority sizes="(max-width: 780px) 100vw, 56vw" />
          <figcaption>Project 01 · Private residence</figcaption>
        </figure>
      </div>
    </header>

    <section className="section section--paper portfolio-intro" aria-labelledby="residential-intro-heading">
      <div className="container portfolio-intro__grid">
        <div className="stack">
          <span className="eyebrow">Two completed residences</span>
          <h2 id="residential-intro-heading" className="heading-xl">Different homes. One considered approach.</h2>
        </div>
        <div className="portfolio-intro__copy">
          <p className="lede">These galleries document two separate residential projects, each with its own architecture, material palette and relationship to technology.</p>
          <p>Project 01 is a polished living and dining interior shaped by layered illumination. Project 02 moves from a warmly lit exterior into timber-lined rooms, scene controls and the organised infrastructure behind them.</p>
        </div>
      </div>
    </section>

    <section className="section portfolio-gallery-section" id="residential-gallery" aria-labelledby="residential-gallery-heading" data-project="01">
      <div className="container">
        <div className="portfolio-gallery__heading">
          <div className="stack">
            <span className="eyebrow">Project 01</span>
            <h2 id="residential-gallery-heading" className="heading-lg">Living, dining and the moments between.</h2>
          </div>
          <p>Client-supplied project photography</p>
        </div>
        <div className="portfolio-gallery">
          <figure className="portfolio-gallery__item portfolio-gallery__item--living">
            <div className="portfolio-gallery__media"><ResponsiveImage image={residentialLivingRoomProject} fill sizes="(max-width: 780px) 100vw, 58vw" /></div>
            <figcaption><span aria-hidden="true">01</span><span>Living room · Integrated display, ceiling audio and layered illumination.</span></figcaption>
          </figure>
          <figure className="portfolio-gallery__item portfolio-gallery__item--dining">
            <div className="portfolio-gallery__media"><ResponsiveImage image={residentialDiningRoomProject} fill priority sizes="(max-width: 780px) 100vw, 40vw" /></div>
            <figcaption><span aria-hidden="true">02</span><span>Dining room · Decorative and architectural light working as one composition.</span></figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section className="section section--paper portfolio-project-two" aria-labelledby="residential-project-two-heading" data-project="02">
      <div className="container">
        <div className="portfolio-project-two__header">
          <div className="stack">
            <span className="eyebrow">Project 02 · Separate residence</span>
            <h2 id="residential-project-two-heading" className="heading-xl">Warm light, from the façade inward.</h2>
          </div>
          <div>
            <p className="lede">A second home with a completely different character: softly illuminated architecture outside, natural timber within and a connected foundation working quietly behind the rooms.</p>
            <p>The gallery moves from the exterior expression to the controls and equipment that support daily scenes, lighting, access, audio and networking.</p>
          </div>
        </div>

        <div className="portfolio-exterior-gallery" aria-label="Project 02 exterior views">
          <figure className="portfolio-exterior-gallery__wide">
            <div className="portfolio-exterior-gallery__media"><ResponsiveImage image={residentialProjectTwoExteriorNight} fill priority sizes="(max-width: 780px) 100vw, 60vw" /></div>
            <figcaption><span aria-hidden="true">01</span><span>Rear elevation · Architectural light defining the home after dark.</span></figcaption>
          </figure>
          <figure className="portfolio-exterior-gallery__portrait">
            <div className="portfolio-exterior-gallery__media"><ResponsiveImage image={residentialProjectTwoExteriorTwilight} fill sizes="(max-width: 780px) 100vw, 38vw" /></div>
            <figcaption><span aria-hidden="true">02</span><span>Street elevation · A softer transition into evening.</span></figcaption>
          </figure>
        </div>

        <div className="portfolio-detail-gallery" aria-label="Project 02 interior and system details">
          {projectTwoDetails.map((detail, index) => <figure className={index < 2 ? "portfolio-detail-card portfolio-detail-card--space" : "portfolio-detail-card"} key={detail.image.src}>
            <div className="portfolio-detail-card__media"><ResponsiveImage image={detail.image} fill sizes={index < 2 ? "(max-width: 780px) 100vw, 50vw" : "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"} /></div>
            <figcaption><span aria-hidden="true">{String(index + 3).padStart(2, "0")}</span><span>{detail.caption}</span></figcaption>
          </figure>)}
        </div>
      </div>
    </section>

    <section className="section section--navy portfolio-principles" aria-labelledby="residential-principles-heading">
      <div className="container">
        <div className="portfolio-principles__header stack">
          <span className="eyebrow">What the photographs reveal</span>
          <h2 id="residential-principles-heading" className="heading-xl">Technology earns its place by belonging.</h2>
        </div>
        <ol className="portfolio-principles__list">
          {projectPrinciples.map((principle) => <li key={principle.number}>
            <span>{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </li>)}
        </ol>
        <Link className="text-link portfolio-principles__link" href="/contact">Discuss a residential project <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
    <ConsultationCta />
  </>;
}
