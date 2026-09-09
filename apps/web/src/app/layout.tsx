import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";
import { organizationJsonLd } from "@/lib/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: { default: siteConfig.seo.title, template: `%s | ${siteConfig.companyName}` },
  description: siteConfig.seo.description,
  applicationName: siteConfig.companyName,
  category: "technology",
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0e0e0d", colorScheme: "light dark" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const previewEnabled = process.env.NEXT_PUBLIC_CONTENT_MODE === "sanity" ? (await draftMode()).isEnabled : false;
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
        {previewEnabled ? <VisualEditing /> : null}
        <JsonLd value={organizationJsonLd()} />
      </body>
    </html>
  );
}
