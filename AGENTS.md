# Repository guidance

## Structure

- `apps/web`: Next.js App Router marketing website, content adapter, lead pipeline, tests, and browser tests.
- `apps/studio`: Sanity Studio configuration and schemas.
- `docs`: architecture, content, operations, security, SEO, and client handover notes.
- `.github/workflows`: non-destructive validation in CI.

## Commands

Use Node.js 22 LTS and the Corepack-managed pnpm version declared in the root `package.json`.

- `pnpm install --frozen-lockfile`: deterministic install after a lockfile exists.
- `pnpm dev`: run web and Studio development servers.
- `pnpm build`: production builds.
- `pnpm lint`: ESLint validation.
- `pnpm typecheck`: strict TypeScript validation.
- `pnpm test`: Vitest unit and component tests.
- `pnpm test:e2e`: Playwright browser and axe checks.
- `pnpm validate`: lint, type-check, tests, and builds.

## Conventions

- Prefer React Server Components; add `"use client"` only for browser interaction.
- Keep company-wide values in `src/config/site.ts` and editable content in the CMS/fixture adapter.
- Use semantic HTML, typed models, safe output rendering, CSS custom-property tokens, and small composable components.
- Never assert dealer, certification, partner, award, review, or performance claims without client verification.

## Accessibility

- Target WCAG 2.2 AA with logical headings, landmarks, visible focus, keyboard operation, descriptive labels, status announcements, reduced-motion support, and meaningful image alternatives.
- New interactions require keyboard and screen-reader validation. Decorative images use empty alt text; content images require specific alt text.

## Security boundaries

- This site never connects to an installed Control4 controller and never requests or stores automation credentials, alarm codes, door codes, network secrets, or security layouts.
- Never expose tokens in client bundles or commit secrets. Log only request identifiers and sanitized operational errors—never complete lead submissions or personal data.
- Validate all external input on the server. Preserve rate limiting, payload limits, anti-bot verification, safe messages, and development no-send adapters.

## Done criteria

A change is done when affected routes work across supported viewports, lint/type-check/tests/build pass, keyboard and axe checks have no serious issues, metadata and structured data remain valid, errors are safe, documentation is updated, and no secrets or unsupported claims were introduced.

