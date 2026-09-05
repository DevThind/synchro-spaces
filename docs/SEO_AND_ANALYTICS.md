# SEO and analytics

The Synchro Spaces site uses the Next.js metadata API for unique titles, descriptions, canonicals, Open Graph, and X cards. Dynamic templates derive metadata from typed content, including the integrated user-supplied project imagery. `sitemap.ts` excludes bracketed placeholder service-area pages, and `robots.ts` blocks API/preview paths. Reusable JSON-LD generators cover Organization, BreadcrumbList, Service, Article, and eligible FAQ content.

Only render FAQ structured data when the questions and full answers are visible on the same page and comply with current search-engine eligibility rules. Optional organization contact and location properties must remain absent unless verified values are supplied and approved for publication.

The Organization entity currently publishes only the verified Synchro Spaces identity, site URL, description, and Instagram profile. Phone, email, postal address, and area served are omitted because they have not been supplied. Service structured data also omits a geographic service area while that information remains unknown. Do not add a city, country, local-business subtype, contact detail, dealer status, or partner claim solely for richer search results.

`NEXT_PUBLIC_SITE_URL` defaults to localhost for development. The final canonical domain must be supplied in the production environment before indexing, sitemap submission, social-share validation, or structured-data approval.

Analytics events are `consultation_form_start`, `consultation_form_submit`, `phone_click`, `email_click`, `booking_click`, `project_view`, and `service_cta_click`. Optional analytics scripts load only after consent. `consultation_form_submit` fires only after the route handler confirms CRM/email delivery. Never put form values, email, phone, free text, or security information in events.

After launch approval, verify the selected webmaster/search-console account, sitemap retrieval, canonical host, social preview images, Organization structured data, consent behaviour, GA4/GTM debug mode, and event naming in the production property. Confirm image publication rights before search engines or social crawlers are allowed to index the six user-supplied files.
