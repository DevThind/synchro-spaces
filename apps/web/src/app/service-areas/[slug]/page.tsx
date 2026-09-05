import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ConsultationCta, FeatureList, PageHero, ServiceCard } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { getServiceArea, getServiceAreas, getServices } from "@/content";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const isPublishableArea = (area: { published: boolean; title: string }) => area.published && !area.title.includes("[");

export async function generateStaticParams() {
  return (await getServiceAreas()).filter(isPublishableArea).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = await getServiceArea(slug);
  if (!area || !isPublishableArea(area)) return { robots: { index: false, follow: false } };
  return {
    ...createMetadata({ title: area.seoTitle, description: area.seoDescription, path: area.canonical ?? `/service-areas/${slug}` }),
    robots: { index: true, follow: true }
  };
}

export default async function ServiceAreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = await getServiceArea(slug);
  if (!area || !isPublishableArea(area)) notFound();

  const related = (await getServices()).filter((service) => service.published && area.relatedServiceSlugs.includes(service.slug));
  const crumbs = [{ name: "Home", path: "/" }, { name: "Project locations", path: "/service-areas" }, { name: area.title, path: `/service-areas/${slug}` }];

  return <>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Project locations", href: "/service-areas" }, { label: area.title }]} />
    <PageHero eyebrow="Local planning" title={area.title} intro={area.summary} aside="The project scope considers access, coordination, infrastructure and ongoing support." />
    <section className="section"><div className="container content-grid">
      <div className="prose"><h2>Project context</h2>{area.localContext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <aside className="aside-card"><h2>Planning considerations</h2><FeatureList items={area.projectConsiderations} /></aside>
    </div></section>
    {related.length ? <section className="section section--paper"><div className="container"><h2 className="heading-lg" style={{ marginBottom: "2.5rem" }}>Relevant solutions</h2><div className="card-grid">{related.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div></div></section> : null}
    <ConsultationCta />
    <JsonLd value={breadcrumbJsonLd(crumbs)} />
  </>;
}
