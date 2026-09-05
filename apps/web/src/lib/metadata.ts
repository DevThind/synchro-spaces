import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createMetadata({ title, description, path = "/", image }: { title: string; description: string; path?: string; image?: string }): Metadata {
  const canonical = new URL(path, siteConfig.seo.siteUrl).toString();
  const fullTitle = `${title} | ${siteConfig.companyName}`;
  const imageUrl = image ? new URL(image, siteConfig.seo.siteUrl).toString() : undefined;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title: fullTitle, description, url: canonical, siteName: siteConfig.companyName, locale: siteConfig.seo.locale, type: "website", images: imageUrl ? [{ url: imageUrl }] : undefined },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: imageUrl ? [imageUrl] : undefined }
  };
}

