import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ConsultationCta, FeatureList, PageHero, ProjectGallery, ServiceCard } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { getProject, getProjects, getServices } from "@/content";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return (await getProjects()).filter((project) => project.published).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project?.published ? createMetadata({ title: project.seoTitle, description: project.seoDescription, path: project.canonical ?? `/projects/${slug}`, image: project.image.src }) : {};
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project?.published) notFound();

  const related = (await getServices()).filter((service) => service.published && project.relatedServiceSlugs.includes(service.slug));
  const crumbs = [{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: project.title, path: `/projects/${slug}` }];

  return <>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.title }]} />
    <PageHero eyebrow={`${project.propertyType} · ${project.location}`} title={project.title} intro={project.summary} />
    <section className="section"><div className="container"><ProjectGallery images={project.gallery} /></div></section>
    <section className="section section--paper"><div className="container content-grid">
      <div className="prose"><h2>The idea</h2><p>{project.brief}</p><h2>Design approach</h2><ol>{project.approach.map((item) => <li key={item}>{item}</li>)}</ol></div>
      <aside className="aside-card"><h2>Elements in the story</h2><FeatureList items={project.systems} /></aside>
    </div></section>
    {related.length ? <section className="section"><div className="container"><h2 className="heading-lg" style={{ marginBottom: "2.5rem" }}>Explore related solutions</h2><div className="card-grid">{related.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div></div></section> : null}
    <ConsultationCta />
    <JsonLd value={breadcrumbJsonLd(crumbs)} />
  </>;
}
