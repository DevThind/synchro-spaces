import { draftMode } from "next/headers";
import { articles, faqs, partners, projects, serviceAreas, services, teamMembers, testimonials } from "./fixtures";
import { sanityClient, sanityEnabled } from "./client";
import type { Article, Faq, Partner, Project, Service, ServiceArea, TeamMember, Testimonial } from "./types";

const bySlug = <T extends { slug: string }>(items: T[], slug: string) => items.find((item) => item.slug === slug);
const imageProjection = `{"src":image.asset.asset->url,"alt":image.alt,"width":image.asset.asset->metadata.dimensions.width,"height":image.asset.asset->metadata.dimensions.height}`;
const seoProjection = `"seoTitle":seo.title,"seoDescription":seo.description,"canonical":seo.canonical`;
const serviceProjection = `{"id":_id,title,"slug":slug.current,"eyebrow":"Integrated solution",summary,audience,"body":[pt::text(mainContent)],outcomes,"image":${imageProjection},"relatedServiceSlugs":relatedServices[]->slug.current,${seoProjection},"published":true}`;
const projectProjection = `{"id":_id,title,"slug":slug.current,location,propertyType,summary,"brief":pt::text(mainContent),"approach":[pt::text(mainContent)],systems,"image":${imageProjection},"gallery":gallery[]{"src":asset.asset->url,"alt":alt,"width":asset.asset->metadata.dimensions.width,"height":asset.asset->metadata.dimensions.height},"relatedServiceSlugs":relatedServices[]->slug.current,${seoProjection},"published":true}`;
const articleProjection = `{"id":_id,title,"slug":slug.current,summary,category,"body":[{"heading":"Guide","paragraphs":[pt::text(mainContent)]}],"portableText":mainContent,"image":${imageProjection},publishedAt,"updatedAt":coalesce(updatedAt,publishedAt),"reviewedAt":coalesce(reviewAt,publishedAt),${seoProjection},"published":true}`;
const areaProjection = `{"id":_id,title,"slug":slug.current,summary,"localContext":[pt::text(mainContent)],"projectConsiderations":localInsights,"relatedServiceSlugs":relatedServices[]->slug.current,${seoProjection},"published":true}`;

async function sanityFetch<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!sanityEnabled || !sanityClient) return null;
  try {
    const preview = (await draftMode()).isEnabled;
    const client = preview ? sanityClient.withConfig({ useCdn: false, perspective: "previewDrafts", token: process.env.SANITY_API_READ_TOKEN }) : sanityClient;
    return await client.fetch<T>(query, params, preview ? { cache: "no-store" } : { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> { return (await sanityFetch<Service[]>(`*[_type == "service" && status == "published"] | order(title asc)${serviceProjection}`)) ?? services; }
export async function getService(slug: string): Promise<Service | undefined> { return (await sanityFetch<Service>(`*[_type == "service" && slug.current == $slug && status == "published"][0]${serviceProjection}`, { slug })) ?? bySlug(services, slug); }
export async function getProjects(): Promise<Project[]> { return (await sanityFetch<Project[]>(`*[_type == "project" && status == "published"] | order(title asc)${projectProjection}`)) ?? projects; }
export async function getProject(slug: string): Promise<Project | undefined> { return (await sanityFetch<Project>(`*[_type == "project" && slug.current == $slug && status == "published"][0]${projectProjection}`, { slug })) ?? bySlug(projects, slug); }
export async function getArticles(): Promise<Article[]> { return (await sanityFetch<Article[]>(`*[_type == "article" && status == "published"] | order(publishedAt desc)${articleProjection}`)) ?? articles; }
export async function getArticle(slug: string): Promise<Article | undefined> { return (await sanityFetch<Article>(`*[_type == "article" && slug.current == $slug && status == "published"][0]${articleProjection}`, { slug })) ?? bySlug(articles, slug); }
export async function getServiceAreas(): Promise<ServiceArea[]> { return (await sanityFetch<ServiceArea[]>(`*[_type == "serviceArea" && status == "published"] | order(title asc)${areaProjection}`)) ?? serviceAreas; }
export async function getServiceArea(slug: string): Promise<ServiceArea | undefined> { return (await sanityFetch<ServiceArea>(`*[_type == "serviceArea" && slug.current == $slug && status == "published"][0]${areaProjection}`, { slug })) ?? bySlug(serviceAreas, slug); }
export async function getPartners(): Promise<Partner[]> { return (await sanityFetch<Partner[]>(`*[_type == "technologyPartner" && status == "published"] | order(name asc){"id":_id,name,category,summary,"verificationRequired":!relationshipVerified}`)) ?? partners; }
export async function getFaqs(): Promise<Faq[]> { return (await sanityFetch<Faq[]>(`*[_type == "faq" && status == "published"] | order(question asc){"id":_id,question,answer,category}`)) ?? faqs; }
export async function getTestimonials(): Promise<Testimonial[]> { return (await sanityFetch<Testimonial[]>(`*[_type == "testimonial" && status == "published" && verified == true]{"id":_id,quote,attribution,verified}`)) ?? testimonials; }
export async function getTeamMembers(): Promise<TeamMember[]> { return (await sanityFetch<TeamMember[]>(`*[_type == "teamMember" && status == "published"] | order(name asc){"id":_id,name,role,bio}`)) ?? teamMembers; }

export * from "./types";
