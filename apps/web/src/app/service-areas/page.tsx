import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConsultationCta, EmptyState, PageHero, SectionHeading } from "@/components/ui";
import { getServiceAreas } from "@/content";
import { createMetadata } from "@/lib/metadata";

const isPublishableArea = (area: { published: boolean; title: string }) => area.published && !area.title.includes("[");

export async function generateMetadata(): Promise<Metadata> {
  const hasPublishedAreas = (await getServiceAreas()).some(isPublishableArea);
  return {
    ...createMetadata({
      title: "Project Locations",
      description: "Share your project location with Synchro Spaces so travel, site access, coordination and support needs can be considered from the start.",
      path: "/service-areas"
    }),
    robots: { index: hasPublishedAreas, follow: true }
  };
}

export default async function ServiceAreasPage() {
  const areas = (await getServiceAreas()).filter(isPublishableArea);

  return <>
    <PageHero eyebrow="Project locations" title="Local context belongs in the plan." intro="Travel, site access, construction conditions and long-term support all influence an appropriate smart-space scope." aside="Share the location with the initial project context." />
    <section className="section"><div className="container">
      {areas.length ? <>
        <SectionHeading eyebrow="Locations" title="Explore local planning considerations." intro="Each location page focuses on practical context for planning and coordination." />
        <div className="card-grid">{areas.map((area, index) => <article className="service-card" key={area.id}><span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h2 className="heading-md">{area.title}</h2><p>{area.summary}</p><Link className="text-link" href={`/service-areas/${area.slug}`}>View planning notes <ArrowRight size={16} aria-hidden="true" /></Link></article>)}</div>
      </> : <EmptyState title="Tell us where you are planning."><p>Service locations are considered with the project scope. Share the city or area in your enquiry so access, coordination and support requirements can be discussed.</p><p><Link className="text-link" href="/contact">Discuss your project location <ArrowRight size={16} aria-hidden="true" /></Link></p></EmptyState>}
    </div></section>
    <ConsultationCta />
  </>;
}
