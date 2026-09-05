import { siteConfig } from "@/config/site";
import type { Article, Faq, Service } from "@/content";

type JsonLd = Record<string, unknown>;
const absolute = (path: string) => new URL(path, siteConfig.seo.siteUrl).toString();

export function organizationJsonLd(): JsonLd {
  const address = siteConfig.address.trim();
  const province = siteConfig.province.trim();
  const serviceAreas = siteConfig.serviceAreas.filter((name) => name.trim());
  const socialProfiles = Object.values(siteConfig.socialProfiles).filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absolute("/")}#organization`,
    name: siteConfig.companyName,
    description: siteConfig.shortDescription,
    url: absolute("/"),
    ...(siteConfig.phone.trim() ? { telephone: siteConfig.phone } : {}),
    ...(siteConfig.email.trim() ? { email: siteConfig.email } : {}),
    ...(address || province ? {
      address: {
        "@type": "PostalAddress",
        ...(address ? { streetAddress: address } : {}),
        ...(province ? { addressRegion: province } : {})
      }
    } : {}),
    ...(serviceAreas.length ? { areaServed: serviceAreas.map((name) => ({ "@type": "Place", name })) } : {}),
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {})
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absolute(item.path) })) };
}

export function serviceJsonLd(service: Service): JsonLd {
  const province = siteConfig.province.trim();
  return { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.summary, url: absolute(`/residential/${service.slug}`), provider: { "@id": `${absolute("/")}#organization` }, ...(province ? { areaServed: { "@type": "AdministrativeArea", name: province } } : {}), audience: { "@type": "Audience", audienceType: service.audience } };
}

export function articleJsonLd(article: Article): JsonLd {
  return { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.summary, datePublished: article.publishedAt, dateModified: article.updatedAt, mainEntityOfPage: absolute(`/resources/${article.slug}`), image: absolute(article.image.src), author: { "@id": `${absolute("/")}#organization` }, publisher: { "@id": `${absolute("/")}#organization` } };
}

export function faqJsonLd(items: Faq[]): JsonLd {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
}

export function serializeJsonLd(value: JsonLd): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
