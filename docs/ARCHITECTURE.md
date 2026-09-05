# Architecture

## Workspace

`apps/web` is a Next.js App Router application using strict TypeScript, server components by default, Tailwind CSS plus tokenized global CSS, Zod, React Hook Form, next-sanity, and provider adapters. `apps/studio` owns the Sanity configuration and ten editorial document schemas. Root scripts orchestrate both.

## Request and content flow

Public routes call the typed content facade in `apps/web/src/content/index.ts`. Mock mode returns stable fixtures and needs no credentials. Sanity mode runs explicit GROQ projections into the same domain models. Published reads use controlled revalidation; protected preview reads use Draft Mode and the preview-drafts perspective. A secret webhook maps documents back to routes for revalidation.

Pages share listing and detail templates for services, projects, locations, and resources. Company-wide identity and contact settings are isolated in `src/config/site.ts`. Interactive islands are limited to mobile navigation, privacy preferences, analytics loading, Turnstile, the consultation form, and error recovery.

## Lead flow

The browser provides form assistance, then posts JSON to `/api/leads`. The route enforces a 16 KiB body limit, basic rate policy, strict Zod parsing, a honeypot, optional Turnstile verification, one selected CRM adapter, and one selected email adapter. Missing credentials always select no-send development adapters. Conversion tracking fires only after a successful server response.

## Deployment boundaries

The public website and Studio are separate deployable applications. Production secrets are server-only. No code connects to a Control4 controller or collects automation credentials, codes, network passwords, or security layouts.
