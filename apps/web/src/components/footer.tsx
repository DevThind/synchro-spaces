import Link from "next/link";
import { hasVerifiedEmail, hasVerifiedPhone, siteConfig } from "@/config/site";
import { BrandMark } from "./header";

const serviceLinks = [
  ["Whole-home automation", "/residential/whole-home-automation"],
  ["Lighting & curtain control", "/residential/architectural-lighting"],
  ["Audio, video & entertainment", "/residential/audio-video"],
  ["Networking & infrastructure", "/residential/residential-networking"]
] as const;

export function Footer() {
  const instagram = siteConfig.socialProfiles.instagram;
  const hasAddress = Boolean(siteConfig.address.trim());

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand stack">
          <Link className="brand" href="/" aria-label={`${siteConfig.companyName} home`}><BrandMark /><span>{siteConfig.companyName}</span></Link>
          <p>{siteConfig.shortDescription}</p>
          {hasAddress || hasVerifiedPhone || hasVerifiedEmail ? <p>
            {hasAddress ? <>{siteConfig.address}<br /></> : null}
            {hasVerifiedPhone ? <><a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}>{siteConfig.phone}</a><br /></> : null}
            {hasVerifiedEmail ? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> : null}
          </p> : null}
          {instagram ? <p><a className="text-link" href={instagram} target="_blank" rel="noreferrer" aria-label="Follow Synchro Spaces on Instagram (opens in a new tab)">Instagram <span aria-hidden="true">↗</span></a></p> : null}
        </div>
        <div>
          <h2 className="footer-title">Solutions</h2>
          <nav className="footer-links" aria-label="Solution links">
            {serviceLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/commercial">Commercial automation</Link>
          </nav>
        </div>
        <div>
          <h2 className="footer-title">Company</h2>
          <nav className="footer-links" aria-label="Company links">
            <Link href="/about">About</Link><Link href="/process">Process</Link><Link href="/projects">Projects</Link>
            <Link href="/technology-partners">Technology approach</Link><Link href="/service-areas">Project locations</Link><Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div>
          <h2 className="footer-title">Information</h2>
          <nav className="footer-links" aria-label="Policy links">
            <Link href="/resources">Resources</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link>
          </nav>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.companyName}.</span>
        <span>This public website does not control or connect to customer automation systems.</span>
      </div>
    </footer>
  );
}
