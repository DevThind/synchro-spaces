import Link from "next/link";
import { PageHero } from "@/components/ui";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Accessibility",
  description: "The accessibility approach for the Synchro Spaces website and how to report a barrier.",
  path: "/accessibility"
});

export default function AccessibilityPage() {
  return <>
    <PageHero eyebrow="Accessibility" title="A thoughtful experience should work for more people." intro="Synchro Spaces aims to provide a clear, usable website aligned with WCAG 2.2 Level AA principles." aside="Last updated 5 September 2026." />
    <section className="section"><div className="container prose">
      <h2>Accessibility features</h2>
      <p>The site includes a skip link, semantic landmarks, logical headings, keyboard-operable navigation and accordions, visible focus styles, labelled form fields, descriptive errors, screen-reader status messages, responsive layouts and reduced-motion support.</p>
      <h2>Content and compatibility</h2>
      <p>Images that communicate content include text alternatives. Decorative imagery can be ignored by assistive technology. Results may vary across browsers, devices and assistive technologies, and third-party websites linked from this site follow their own accessibility practices.</p>
      <h2>Report a barrier</h2>
      <p>If something prevents you from using the site, please use the <Link href="/contact">contact form</Link>. Include the page address, what happened, your browser or assistive technology when useful, and a preferred way to respond. Do not include passwords, access codes or sensitive security information.</p>
      <h2>Review approach</h2>
      <p>Accessibility review combines automated checks with keyboard, zoom, contrast, responsive-layout and assistive-technology checks. Feedback helps identify issues that automated tools cannot find.</p>
    </div></section>
  </>;
}
