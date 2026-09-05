# Implementation plan

The workspace starts empty. The supplied project brief is the authoritative specification; the optional implementation document was not available.

## Milestone 1 — Foundation

- Establish the pnpm workspace, strict TypeScript settings, environment contract, shared scripts, and repository guidance.
- Validate configuration and preserve an explicit mock-content path so local development never depends on credentials.

## Milestone 2 — Experience system

- Build the design tokens, global layout, responsive header/navigation, footer, reusable section components, and accessible interaction patterns.
- Validate keyboard behaviour, responsive layout, motion preferences, and semantic structure.

## Milestone 3 — Content platform

- Create typed domain models, meaningful local fixtures, a Sanity-backed adapter boundary, and Studio schemas for all required document types.
- Add preview, draft-mode, route mapping, image, Portable Text, and revalidation foundations.

## Milestone 4 — Pages

- Implement every requested route with reusable service, project, location, and article templates.
- Add custom not-found, error, loading, empty, media, gallery, FAQ, breadcrumb, partner, process, testimonial, and CTA patterns.

## Milestone 5 — Lead pipeline

- Build an accessible consultation form and a validated route handler with payload limits, rate limiting, optional Turnstile verification, CRM adapters, and email adapters.
- Use a local no-send adapter whenever credentials are absent and emit conversion analytics only after server-confirmed success.

## Milestone 6 — Discovery, trust, and operations

- Implement metadata, canonicals, sitemap, robots, JSON-LD, consent-aware analytics, secure headers/CSP, privacy foundations, monitoring hooks, tests, CI, and handover documentation.

## Milestone 7 — Verification

- Install from the lockfile and run lint, type-check, unit/component tests, production build, Playwright navigation/form/consent tests, axe scans, and responsive visual checks at 390, 768, 1024, and 1440 pixels.
- Fix failures and review the final diff for secrets, thin content, accessibility gaps, unsafe form behaviour, copied material, and leftover implementation placeholders.

