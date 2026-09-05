# Synchro Spaces website

A marketing, portfolio, and lead-generation workspace for Synchro Spaces. The site presents its smart-space work through a polished Next.js website and an optional Sanity editing workflow. It does **not** control installed systems or collect automation/security credentials.

## Current identity and media

- The public identity is **Synchro Spaces**.
- The verified social profile is [@synchro_spaces](https://www.instagram.com/synchro_spaces/); it is linked from the site and included in Organization structured data.
- Six user-supplied images are integrated from `apps/web/public/images/synchro-spaces/`: two residence exteriors, two scene keypads, one smart lock, and one integration rack.
- Phone, email, address, business hours, and service location have not been supplied. These values remain empty and are omitted from the interface and structured data.
- Publication rights for the six supplied images still require explicit confirmation before production launch.

## Requirements

- Node.js 22 LTS (the project currently validates against Node 22.22.2)
- Corepack enabled
- pnpm 11.24.0, pinned by the root `packageManager` field

```powershell
corepack enable
corepack pnpm install --frozen-lockfile
```

## Local development

Copy `.env.example` to `.env.local` and leave `NEXT_PUBLIC_CONTENT_MODE=mock` for a credential-free start.

```powershell
corepack pnpm dev:web
corepack pnpm dev:studio
```

The website runs at `http://localhost:3000`; Studio runs at `http://localhost:3333`. `pnpm dev` runs both. Mock mode uses the typed fixtures in `apps/web/src/content/fixtures.ts`. Form submissions are validated and acknowledged but are not sent externally while both adapters are set to `development`.

## Environment variables

`.env.example` documents every supported variable without values or secrets. The main groups are:

- Site origin: `NEXT_PUBLIC_SITE_URL`
- Sanity content, preview, and webhook revalidation
- Cloudflare Turnstile anti-bot verification
- CRM selection and HubSpot/GoHighLevel credentials
- Email selection and Postmark/Resend credentials
- Consent-gated GA4/GTM and optional Sentry hook values

Never prefix secrets with `NEXT_PUBLIC_`. Use separate development, preview, and production values.

## Sanity mode

Create a Sanity project/dataset, configure CORS for the website and Studio origins, then set both web and Studio project variables. Change `NEXT_PUBLIC_CONTENT_MODE` to `sanity`. The adapter uses CDN-backed published queries with five-minute revalidation; protected Draft Mode uses the read token and uncached `previewDrafts` perspective.

Configure Studio Presentation preview with the website origin and a preview secret. Configure a Sanity webhook to `POST /api/revalidate` with the `x-revalidate-secret` header and a projection containing `_type` and `slug`.

## Validation

```powershell
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm --filter @client/web exec playwright install chromium
corepack pnpm test:e2e
corepack pnpm validate
```

The end-to-end suite covers core navigation, the mobile menu, form delivery in development mode, consent persistence, responsive overflow, and axe smoke tests.

## Production preparation

The web app is designed for Vercel with `apps/web` as the application and the repository root retained for workspace installs. Use the root install command and `pnpm --filter @client/web build`. Studio can be hosted separately using Sanity hosting or another approved static host. Do not deploy, change DNS, or create external accounts without client authorization.

Before launch, complete [the client input checklist](docs/CLIENT_INPUT_CHECKLIST.md), set the canonical production domain, confirm image publication rights, configure any approved CRM/email services, verify domain email authentication, run the full validation suite, and complete human accessibility, legal, and content review.

## Client data and claims

Global business details live in `apps/web/src/config/site.ts`. Unknown contact and location fields must stay empty unless Synchro Spaces chooses to publish verified values. Editable editorial content belongs in Sanity or the fixture adapter. Search for unresolved bracketed scaffold values with:

```powershell
rg "\[[A-Za-z].*\]" apps/web/src docs
```

Do not infer a city, service boundary, phone number, email address, dealer status, partner relationship, certification, project outcome, or image right. Do not replace the explicit security-boundary wording or development-adapter notices with marketing claims.
