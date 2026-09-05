import { describe, expect, it } from "vitest";
import { articles, faqs, services } from "@/content/fixtures";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, organizationJsonLd, serializeJsonLd, serviceJsonLd } from "./json-ld";

describe("JSON-LD generators", () => {
  it("builds an ordered breadcrumb list with absolute URLs", () => {
    const value = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]);
    expect(value["@type"]).toBe("BreadcrumbList");
    expect(value.itemListElement).toHaveLength(2);
    expect(JSON.stringify(value)).toContain("http://localhost:3000/projects");
  });

  it("maps organization, service, article and eligible FAQ data", () => {
    const organization = organizationJsonLd();
    expect(organization["@type"]).toBe("Organization");
    expect(organization.name).toBe("Synchro Spaces");
    expect(organization.sameAs).toEqual(["https://www.instagram.com/synchro_spaces/"]);
    expect(organization).not.toHaveProperty("telephone");
    expect(organization).not.toHaveProperty("email");
    expect(organization).not.toHaveProperty("address");
    expect(organization).not.toHaveProperty("areaServed");
    expect(serviceJsonLd(services[0]!)["@type"]).toBe("Service");
    expect(articleJsonLd(articles[0]!)["@type"]).toBe("Article");
    expect(faqJsonLd(faqs).mainEntity).toHaveLength(faqs.length);
  });

  it("escapes markup-significant characters before script injection", () => {
    expect(serializeJsonLd({ value: "</script>" })).not.toContain("</script>");
  });
});
