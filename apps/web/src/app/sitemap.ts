import type { MetadataRoute } from "next";
import { getProjects, getServices } from "@/content";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([getServices(), getProjects()]);
  const staticPaths = ["/", "/residential", "/commercial", "/projects", "/control4", "/process", "/services", "/contact", "/privacy", "/terms", "/accessibility"];
  const paths = [
    ...staticPaths,
    ...services.filter((item) => item.published).map((item) => `/residential/${item.slug}`),
    ...projects.filter((item) => item.published).map((item) => `/projects/${item.slug}`)
  ];

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteConfig.seo.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7
  }));
}
