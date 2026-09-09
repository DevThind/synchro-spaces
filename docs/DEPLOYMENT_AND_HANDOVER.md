# Deployment and handover

## Current implementation state

- The website and Studio are branded for Synchro Spaces.
- The verified [@synchro_spaces](https://www.instagram.com/synchro_spaces/) profile is linked from the public site and included in Organization JSON-LD.
- Seventeen user-supplied images are integrated under `apps/web/public/images/synchro-spaces/`.
- The canonical public origin is `https://www.synchro-spaces.com`.
- Phone, email, address, hours, and service geography remain empty and are omitted from public and structured output.
- Image and Control4-logo publication rights, live delivery integrations, legal copy, and any dealer/partner claims are not yet approved.

## Launch gates

Do not treat implementation completion as launch approval. Before production indexing or promotion, obtain:

1. Written confirmation of publication rights for all seventeen supplied images and any required credits or third-party permissions.
2. Written approval for the supplied Control4 logo placement and required trademark treatment.
3. Phone, email, address, hours, or service-location details only if Synchro Spaces wants them published.
4. CRM/email provider selection, field mapping, credentials, sender addresses, and domain authentication if live lead delivery is required.
5. Jurisdiction-appropriate privacy, cookie, retention, terms, accessibility, and enquiry-consent review.
6. Evidence and approved wording for every Control4 dealer, technology partner, supported brand, certification, licence, award, or performance claim.

## Vercel preparation

Create the web project only after authorization. Retain the monorepo root for install, set the application root/build to `apps/web` as supported by the selected Vercel workspace configuration, use Corepack pnpm with the committed lockfile, and add environment variables separately for preview and production. Set `NEXT_PUBLIC_SITE_URL` to the approved canonical origin before the final build; localhost is only a development fallback.

## Sanity preparation

Create/confirm the production project and dataset, CORS origins, least-privilege read token, preview secret, Presentation origin, webhook secret/header, and route projection. Deploy Studio separately only after client access/roles and authentication are reviewed.

## Integration sequence

1. Confirm the remaining Synchro Spaces launch inputs and legal copy without filling optional contact/location fields by assumption.
2. Test Sanity, CRM, email, Turnstile, analytics, and monitoring in non-production accounts.
3. Verify the email domain (SPF, DKIM, DMARC) with authorized DNS changes.
4. Run `pnpm validate`, install Playwright Chromium, run `pnpm test:e2e`, and complete human responsive/accessibility review.
5. Review preview deployment with the client and obtain content/brand/legal approval.
6. Authorize production deployment and DNS separately.

Handover should include repository/admin ownership, vendor account ownership, environment inventory (never secret values), the seventeen-image and logo rights/credit record, content workflow, backup/export process, incident contacts, analytics definitions, support boundaries, approved claims evidence, and a dated maintenance plan.
