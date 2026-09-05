import { PageHero, ResourceCard, SectionHeading } from "@/components/ui";
import { getArticles } from "@/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Automation Resources", description: "Practical planning guidance for smart-home and commercial automation projects, from infrastructure timing to intuitive control design.", path: "/resources", image: "/images/private-cinema.png" });
export default async function ResourcesPage() { const articles = await getArticles(); return <><PageHero eyebrow="Resources" title="Make better decisions before the walls close." intro="Concise, practical guidance for owners, architects, interior designers, builders, and commercial operators." aside="Every article includes publish, update, and review dates in the content model." /><section className="section"><div className="container"><SectionHeading eyebrow="Planning library" title="Designed to be useful—not prolific." /><div className="resource-grid">{articles.map((article) => <ResourceCard key={article.id} article={article} />)}</div></div></section></>; }

