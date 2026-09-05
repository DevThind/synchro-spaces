import type { MetadataRoute } from "next";
import { getArticles, getProjects, getServiceAreas, getServices } from "@/content";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, areas, articles] = await Promise.all([getServices(), getProjects(), getServiceAreas(), getArticles()]);
  const publishedAreas = areas.filter((area) => area.published && !area.title.includes("["));
  const staticPaths = ["/", "/residential", "/commercial", "/projects", "/control4", "/technology-partners", "/process", "/about", "/resources", "/contact", "/privacy", "/terms", "/accessibility"];
  const paths = [
    ...staticPaths,
    ...(publishedAreas.length ? ["/service-areas"] : []),
    ...services.filter((item) => item.published).map((item) => `/residential/${item.slug}`),
    ...projects.filter((item) => item.published).map((item) => `/projects/${item.slug}`),
    ...publishedAreas.map((item) => `/service-areas/${item.slug}`),
    ...articles.filter((item) => item.published).map((item) => `/resources/${item.slug}`)
  ];

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteConfig.seo.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: path.startsWith("/resources/") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : 0.7
  }));
}
