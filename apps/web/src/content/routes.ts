const routePrefixes: Record<string, string> = { service: "/residential", project: "/projects", campaignPage: "/campaigns" };
export function routeForDocument(type: string, slug?: string): string | null { if (type === "siteSettings") return "/"; const prefix = routePrefixes[type]; return prefix && slug ? `${prefix}/${slug}` : null; }
