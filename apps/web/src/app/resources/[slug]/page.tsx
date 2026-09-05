import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ConsultationCta, PageHero, ResourceCard, RichTextRenderer } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { getArticle, getArticles } from "@/content";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export async function generateStaticParams() { return (await getArticles()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = await getArticle(slug); return article ? createMetadata({ title: article.seoTitle, description: article.seoDescription, path: article.canonical ?? `/resources/${slug}`, image: article.image.src }) : {}; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = await getArticle(slug); if (!article) notFound();
  const related = (await getArticles()).filter((item) => item.slug !== slug).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: article.title, path: `/resources/${slug}` }];
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: article.title }]} /><PageHero eyebrow={article.category} title={article.title} intro={article.summary} aside={`Published ${article.publishedAt} · Updated ${article.updatedAt} · Reviewed ${article.reviewedAt}`} />
    <article className="section"><div className="container content-grid"><RichTextRenderer sections={article.body} portableText={article.portableText} /><aside className="aside-card"><h2>Article details</h2><ul className="aside-list"><li><strong>Published</strong><br />{article.publishedAt}</li><li><strong>Updated</strong><br />{article.updatedAt}</li><li><strong>Content review</strong><br />{article.reviewedAt}</li></ul><p><small>General planning information only. Confirm compatibility, code, and project-specific requirements with qualified professionals.</small></p></aside></div></article>
    <section className="section section--paper"><div className="container"><h2 className="heading-lg" style={{ marginBottom: "2.5rem" }}>Continue planning</h2><div className="resource-grid">{related.map((item) => <ResourceCard key={item.id} article={item} />)}</div></div></section><ConsultationCta /><JsonLd value={articleJsonLd(article)} /><JsonLd value={breadcrumbJsonLd(crumbs)} /></>;
}
