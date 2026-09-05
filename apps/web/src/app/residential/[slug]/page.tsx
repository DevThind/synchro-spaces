import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ConsultationCta, FeatureList, PageHero, ResponsiveImage, ServiceCard } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { getService, getServices } from "@/content";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export async function generateStaticParams() { return (await getServices()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = await getService(slug); if (!service) return {};
  return createMetadata({ title: service.seoTitle, description: service.seoDescription, path: service.canonical ?? `/residential/${service.slug}`, image: service.image.src });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = await getService(slug); if (!service) notFound();
  const related = (await getServices()).filter((item) => service.relatedServiceSlugs.includes(item.slug));
  const crumbs = [{ name: "Home", path: "/" }, { name: "Residential", path: "/residential" }, { name: service.title, path: `/residential/${service.slug}` }];
  return <>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Residential", href: "/residential" }, { label: service.title }]} />
    <PageHero eyebrow={service.eyebrow} title={service.title} intro={service.summary} aside="Capabilities and compatible products are confirmed during project design." />
    <section className="section"><div className="container split split--top"><div className="split-media"><ResponsiveImage image={service.image} fill priority sizes="(max-width: 780px) 100vw, 50vw" /></div><div className="split-copy stack"><span className="eyebrow">The approach</span><h2 className="heading-lg">Designed as part of the room.</h2>{service.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<FeatureList items={service.outcomes} /></div></div></section>
    {related.length ? <section className="section section--paper"><div className="container"><h2 className="heading-lg" style={{ marginBottom: "2.5rem" }}>Related planning disciplines</h2><div className="card-grid">{related.map((item, index) => <ServiceCard key={item.id} service={item} index={index} />)}</div></div></section> : null}
    <ConsultationCta /><JsonLd value={breadcrumbJsonLd(crumbs)} /><JsonLd value={serviceJsonLd(service)} />
  </>;
}

