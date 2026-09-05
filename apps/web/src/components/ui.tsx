import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import type { Article, ContentImage, Faq, Partner, Project, Service, Testimonial } from "@/content";

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="section-heading">
      <div className="section-heading-copy stack"><span className="eyebrow">{eyebrow}</span><h2 className="heading-xl">{title}</h2></div>
      {intro ? <p className="lede">{intro}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, aside }: { eyebrow: string; title: string; intro: string; aside?: string }) {
  return (
    <header className="page-hero">
      <div className="container page-hero-grid">
        <div className="stack" style={{ "--stack-space": "1.35rem" } as React.CSSProperties}>
          <span className="eyebrow">{eyebrow}</span><h1 className="heading-xl">{title}</h1><p className="lede">{intro}</p>
        </div>
        {aside ? <p className="page-kicker">{aside}</p> : null}
      </div>
    </header>
  );
}

export type Crumb = { label: string; href?: string };
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb"><div className="container"><ol>
      {items.map((item, index) => <li key={`${item.label}-${index}`}>{index > 0 ? <span aria-hidden="true">/ </span> : null}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}
    </ol></div></nav>
  );
}

export function ResponsiveImage({ image, fill = false, priority = false, sizes = "(max-width: 768px) 100vw, 50vw", className }: { image: ContentImage; fill?: boolean; priority?: boolean; sizes?: string; className?: string }) {
  return <Image src={image.src} alt={image.alt} width={fill ? undefined : image.width} height={fill ? undefined : image.height} fill={fill || undefined} priority={priority} loading={priority ? "eager" : undefined} sizes={sizes} className={className} />;
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className="service-card"><span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="heading-md">{service.title}</h3><p>{service.summary}</p>
      <Link className="text-link" href={`/residential/${service.slug}`} data-analytics-event="service_cta_click" data-analytics-label={service.slug}>Explore solution <ArrowRight size={16} aria-hidden="true" /></Link>
    </article>
  );
}

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`} data-analytics-event="project_view" data-analytics-label={project.slug}>
        <div className="project-image"><ResponsiveImage image={project.image} fill priority={priority} sizes="(max-width: 780px) 100vw, 50vw" /></div>
        <div className="project-card-copy"><div><p className="project-meta">{project.propertyType} · {project.location}</p><h3>{project.title}</h3></div><ArrowRight aria-hidden="true" /></div>
      </Link>
    </article>
  );
}

export function ResourceCard({ article }: { article: Article }) {
  return (
    <article className="resource-card"><div className="resource-image"><ResponsiveImage image={article.image} fill sizes="(max-width: 560px) 100vw, 33vw" /></div>
      <div className="resource-card-copy"><span className="eyebrow">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p>
        <Link className="text-link" href={`/resources/${article.slug}`}>Read guide <ArrowRight size={16} aria-hidden="true" /></Link></div>
    </article>
  );
}

export function BrandGrid({ partners }: { partners: Partner[] }) {
  return <><div className="brand-grid">{partners.map((partner) => <div className="brand-item" key={partner.id}><span className="brand-symbol" aria-hidden="true">{partner.name.charAt(0)}</span><strong>{partner.name}</strong><span>{partner.category}</span></div>)}</div><p className="verification-note">The exact products, compatibility and scope are confirmed for each project. This list describes system layers, not brand partnerships.</p></>;
}

export function ProcessSteps({ steps }: { steps: { number: string; title: string; text: string }[] }) {
  return <ol className="process-list">{steps.map((step) => <li className="process-step" key={step.number}><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>;
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return <figure className="testimonial" data-verified={testimonial.verified}><blockquote>“{testimonial.quote}”</blockquote><figcaption>{testimonial.attribution}</figcaption></figure>;
}

export function FaqAccordion({ items }: { items: Faq[] }) {
  return <div className="faq-list">{items.map((item) => <details className="faq-item" key={item.id}><summary>{item.question}</summary><div className="faq-answer">{item.answer}</div></details>)}</div>;
}

export function ConsultationCta() {
  return <section className="cta" aria-labelledby="consultation-cta"><div className="container cta-inner"><div className="stack"><span className="eyebrow">Start in the right place</span><h2 id="consultation-cta" className="heading-xl">Tell us how you want the space to feel.</h2><p>Share the project stage, the rooms involved and the moments you want to make simpler. Please never include passwords, access codes or sensitive security details.</p></div><Link className="button button--dark" href="/contact" data-analytics-event="booking_click">Start a conversation <ArrowRight size={16} aria-hidden="true" /></Link></div></section>;
}

export function FeatureList({ items }: { items: string[] }) {
  return <ul className="feature-list">{items.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>;
}

export function ProjectGallery({ images }: { images: ContentImage[] }) {
  return <div className="gallery" aria-label="Project gallery">{images.map((image, index) => <figure key={`${image.src}-${index}`}><ResponsiveImage image={image} fill sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} /></figure>)}</div>;
}

export function RichTextRenderer({ sections, portableText }: { sections: { heading: string; paragraphs: string[] }[]; portableText?: unknown[] }) {
  if (portableText?.length) return <div className="prose"><PortableText value={portableText as PortableTextBlock[]} /></div>;
  return <div className="prose">{sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>;
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return <div className="empty-state"><h2 className="heading-md">{title}</h2><div>{children}</div></div>;
}
export function LoadingState() { return <div className="loading-state" role="status"><p>Loading content…</p><div className="loading-bar" aria-hidden="true" /></div>; }
export function ErrorState({ title, message }: { title: string; message: string }) { return <div className="error-state" role="alert"><h2 className="heading-md">{title}</h2><p>{message}</p></div>; }
