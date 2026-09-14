import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConsultationCta } from "@/components/ui";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Commercial Projects",
  description: "A selective journal of connected commercial environments, published as approved project photography becomes available.",
  path: "/commercial"
});

export default function CommercialPage() {
  return <>
    <header className="portfolio-hero portfolio-hero--commercial">
      <div className="container portfolio-hero__grid">
        <div className="portfolio-hero__copy stack">
          <span className="eyebrow">Commercial project journal</span>
          <h1 className="display">Spaces that work beautifully.</h1>
          <p className="hero-lede">A growing record of workplaces and guest-facing environments where atmosphere, everyday control and operational clarity are considered together.</p>
        </div>
        <div className="portfolio-hero__marker" aria-hidden="true"><span>Journal</span><strong>C / —</strong></div>
      </div>
    </header>

    <section className="section section--paper commercial-journal" aria-labelledby="commercial-journal-heading">
      <div className="container commercial-journal__grid">
        <div className="commercial-journal__number" aria-hidden="true">01</div>
        <div className="commercial-journal__copy stack">
          <span className="eyebrow">A selective portfolio</span>
          <h2 id="commercial-journal-heading" className="heading-xl">Only real work, shown with permission.</h2>
          <p className="lede">Commercial project photography is published only when the space and the client are ready to be shared. New stories will be added here as approved imagery becomes available.</p>
          <p>Each feature will look beyond a finished room to the thinking behind it: how people move through the space, which actions need to remain effortless and how the supporting systems are kept organised and serviceable.</p>
          <Link className="text-link" href="/contact">Discuss a commercial space <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <aside className="commercial-journal__note">
          <span>In every future story</span>
          <p>Real project photography</p>
          <p>Clear context, without inflated claims</p>
          <p>Technology described through its role in the space</p>
        </aside>
      </div>
    </section>
    <ConsultationCta />
  </>;
}
