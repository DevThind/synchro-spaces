"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(JSON.stringify({ scope: "route_render", digest: error.digest ?? "unavailable" })); }, [error]);
  return <section className="section"><div className="container"><ErrorState title="This page could not be prepared." message="No personal information has been exposed. Try again, or return later if the problem continues." /><p><button className="button button--dark" type="button" onClick={reset}>Try again</button></p></div></section>;
}

