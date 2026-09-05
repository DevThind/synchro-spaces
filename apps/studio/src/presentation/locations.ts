import { defineLocations } from "sanity/presentation";

const prefixes: Record<string, string> = { service: "/residential", project: "/projects", article: "/resources", serviceArea: "/service-areas", campaignPage: "/campaigns" };

export const locations = {
  siteSettings: defineLocations({ select: { title: "companyName" }, resolve: () => ({ locations: [{ title: "Home", href: "/" }] }) }),
  service: defineLocations({ select: { title: "title", slug: "slug.current" }, resolve: (doc) => ({ locations: doc?.slug ? [{ title: doc.title ?? "Service", href: `${prefixes.service}/${doc.slug}` }, { title: "Residential", href: "/residential" }] : [] }) }),
  project: defineLocations({ select: { title: "title", slug: "slug.current" }, resolve: (doc) => ({ locations: doc?.slug ? [{ title: doc.title ?? "Project", href: `${prefixes.project}/${doc.slug}` }, { title: "Projects", href: "/projects" }] : [] }) }),
  article: defineLocations({ select: { title: "title", slug: "slug.current" }, resolve: (doc) => ({ locations: doc?.slug ? [{ title: doc.title ?? "Article", href: `${prefixes.article}/${doc.slug}` }, { title: "Resources", href: "/resources" }] : [] }) }),
  serviceArea: defineLocations({ select: { title: "title", slug: "slug.current" }, resolve: (doc) => ({ locations: doc?.slug ? [{ title: doc.title ?? "Service area", href: `${prefixes.serviceArea}/${doc.slug}` }, { title: "Service areas", href: "/service-areas" }] : [] }) }),
  campaignPage: defineLocations({ select: { title: "title", slug: "slug.current" }, resolve: (doc) => ({ locations: doc?.slug ? [{ title: doc.title ?? "Campaign", href: `${prefixes.campaignPage}/${doc.slug}` }] : [] }) })
};

