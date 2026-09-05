import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/preview/"] }, sitemap: new URL("/sitemap.xml", siteConfig.seo.siteUrl).toString(), host: siteConfig.seo.siteUrl }; }

