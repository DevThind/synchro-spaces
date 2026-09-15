import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { hasVerifiedEmail, hasVerifiedPhone, siteConfig } from "@/config/site";

export function ContactInformation() {
  const instagram = siteConfig.socialProfiles.instagram;
  const hasAddress = Boolean(siteConfig.address.trim());
  const hasDirectContact = hasAddress || hasVerifiedPhone || hasVerifiedEmail || siteConfig.businessHours.length > 0;

  if (!hasDirectContact) return null;

  return <aside className="aside-card"><h2>Connect with {siteConfig.companyName}</h2><ul className="aside-list">
    {hasAddress ? <li><MapPin size={17} aria-hidden="true" /> <strong>Office</strong><br />{siteConfig.address}</li> : null}
    {hasVerifiedPhone ? <li><Phone size={17} aria-hidden="true" /> <strong>Phone</strong><br /><a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} data-analytics-event="phone_click">{siteConfig.phone}</a></li> : null}
    {hasVerifiedEmail ? <li><Mail size={17} aria-hidden="true" /> <strong>Email</strong><br /><a href={`mailto:${siteConfig.email}`} aria-label={`Email ${siteConfig.companyName} at ${siteConfig.email}`} data-analytics-event="email_click">Email us directly</a></li> : null}
    {siteConfig.businessHours.length ? <li><Clock3 size={17} aria-hidden="true" /> <strong>Hours</strong><br />{siteConfig.businessHours.map((line) => <span key={line}>{line}<br /></span>)}</li> : null}
    {instagram ? <li><strong>Instagram</strong><br /><a href={instagram} target="_blank" rel="noreferrer" aria-label="Synchro Spaces on Instagram (opens in a new tab)">@synchro_spaces <span aria-hidden="true">↗</span></a></li> : null}
  </ul></aside>;
}
