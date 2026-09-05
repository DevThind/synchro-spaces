import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <section className="page-hero"><div className="container stack"><span className="eyebrow">404 · Not found</span><h1 className="heading-xl">That room is not on the plan.</h1><p className="lede">The page may have moved, or the address may be incorrect.</p><p><Link className="button button--primary" href="/"><ArrowLeft size={16} aria-hidden="true" /> Return home</Link></p></div></section>;
}
