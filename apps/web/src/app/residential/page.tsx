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
  title: "Residential Project Galleries",
  description: "Explore two residential galleries showing visible lighting, entertainment, room controls, access and connected infrastructure.",
  path: "/residential",
  image: residentialLivingRoomProject.src
});

const projectPrinciples = [
  {
    number: "01",
    title: "Architecture remains the focus",
    text: "Displays, speakers, keypads and lighting details are shown in relation to the interior rather than as isolated products."
  },
  {
    number: "02",
    title: "Light builds the atmosphere",
    text: "The photographs show recessed, concealed and decorative lighting used together in the finished rooms."
  },
  {
    number: "03",
    title: "Control stays close at hand",
    text: "Clearly labelled wall keypads provide local actions while central equipment is kept in a dedicated rack."
  }
] as const;

const projectTwoDetails = [
  { image: residentialProjectTwoDining, caption: "Dining room · Timber finishes, pendant lights, recessed lights and ceiling speakers." },
  { image: residentialProjectTwoKitchen, caption: "Kitchen · Recessed lighting and ceiling speakers above the island and worktops." },
  { image: residentialProjectTwoLightingPanel, caption: "Lighting panel · Control4 modules installed inside a recessed enclosure." },
  { image: residentialProjectTwoSixSceneKeypad, caption: "Six-button keypad · Labels include Steps, Kitchen, Picture, Curtain, Dining and Living." },
  { image: residentialProjectTwoYaleLock, caption: "Entrance door · Yale touchscreen lock fitted to the timber door." },
  { image: residentialProjectTwoThreeSceneKeypad, caption: "Three-button keypad · Welcome, Curtain and Away are available at the wall." },
  { image: residentialProjectTwoEquipmentRack, caption: "Central rack · Control, audio, network and camera equipment grouped in one location." }
] as const;

export default function ResidentialPage() {
  return <>
    <header className="portfolio-hero portfolio-hero--residential">
      <div className="container portfolio-hero__grid">
        <div className="portfolio-hero__copy stack">
          <span className="eyebrow">Residential project journal</span>
          <h1 className="display">Residential projects.</h1>
          <p className="hero-lede">Two supplied photo sets showing lighting, entertainment, controls and the equipment behind them.</p>
          <a className="text-link portfolio-hero__link" href="#project-01">View the projects <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <figure className="portfolio-hero__media">
          <ResponsiveImage image={residentialLivingRoomProject} fill priority sizes="(max-width: 780px) 100vw, 56vw" />
          <figcaption>Project 01 · Residential interior</figcaption>
        </figure>
      </div>
    </header>

    <section className="section section--paper portfolio-intro" aria-labelledby="residential-intro-heading">
      <div className="container portfolio-intro__grid">
        <div className="stack">
          <span className="eyebrow">Two separate residences</span>
          <h2 id="residential-intro-heading" className="heading-xl">Each home has its own story.</h2>
        </div>
        <div className="portfolio-intro__copy">
          <p className="lede">The photographs are grouped by property so details from one home are never presented as part of another.</p>
          <p>Project 01 contains two interior views. Project 02 moves from the exterior into the kitchen and dining room, then documents lighting hardware, keypads, a lock and the central rack. Locations, dates and Synchro Spaces’ exact scope await client approval.</p>
        </div>
      </div>
    </section>

    <section className="section portfolio-gallery-section" id="project-01" aria-labelledby="residential-gallery-heading" data-project="01">
      <div className="container">
        <div className="portfolio-gallery__heading">
          <div className="stack">
            <span className="eyebrow">Project 01</span>
            <h2 id="residential-gallery-heading" className="heading-lg">Living and dining.</h2>
          </div>
          <p>Client-supplied project photography</p>
        </div>
        <div className="portfolio-gallery">
          <figure className="portfolio-gallery__item portfolio-gallery__item--living">
            <div className="portfolio-gallery__media"><ResponsiveImage image={residentialLivingRoomProject} fill sizes="(max-width: 780px) 100vw, 58vw" /></div>
            <figcaption><span aria-hidden="true">01</span><span>Living room · Wall-mounted display, ceiling speakers, recessed lights and concealed perimeter lighting.</span></figcaption>
          </figure>
          <figure className="portfolio-gallery__item portfolio-gallery__item--dining">
            <div className="portfolio-gallery__media"><ResponsiveImage image={residentialDiningRoomProject} fill priority sizes="(max-width: 780px) 100vw, 40vw" /></div>
            <figcaption><span aria-hidden="true">02</span><span>Dining room · Sculptural pendant, recessed downlights, perimeter lighting and ceiling speakers.</span></figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section className="section section--paper portfolio-project-two" id="project-02" aria-labelledby="residential-project-two-heading" data-project="02">
      <div className="container">
        <div className="portfolio-project-two__header">
          <div className="stack">
            <span className="eyebrow">Project 02 · Separate residence</span>
            <h2 id="residential-project-two-heading" className="heading-xl">From the exterior to the equipment room.</h2>
          </div>
          <div>
            <p className="lede">This second photo set records a different home: exterior lighting, timber-lined rooms, wall controls, a connected lock and the central equipment rack.</p>
            <p>The sequence moves from wide architectural views to close details so the relationship between the rooms and their controls is easy to follow.</p>
          </div>
        </div>

        <div className="portfolio-exterior-gallery" aria-label="Project 02 exterior views">
          <figure className="portfolio-exterior-gallery__wide">
            <div className="portfolio-exterior-gallery__media"><ResponsiveImage image={residentialProjectTwoExteriorNight} fill priority sizes="(max-width: 780px) 100vw, 60vw" /></div>
            <figcaption><span aria-hidden="true">01</span><span>Rear elevation · Warm exterior and landscape lighting after dark.</span></figcaption>
          </figure>
          <figure className="portfolio-exterior-gallery__portrait">
            <div className="portfolio-exterior-gallery__media"><ResponsiveImage image={residentialProjectTwoExteriorTwilight} fill sizes="(max-width: 780px) 100vw, 38vw" /></div>
            <figcaption><span aria-hidden="true">02</span><span>Street elevation · Balcony, soffit and landscape lighting at twilight.</span></figcaption>
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
          <span className="eyebrow">Visible project details</span>
          <h2 id="residential-principles-heading" className="heading-xl">Rooms first. Controls close at hand.</h2>
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
