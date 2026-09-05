# Security and privacy

## Controls implemented

- Strict server-side schema with length bounds and unknown-field rejection
- JSON body-size limit, honeypot, rate-limiter abstraction, and optional Turnstile server verification
- Server-only CRM/email secrets and no-send development fallbacks
- Sanitized operational monitoring that records scope/request ID/error code—not lead bodies or personal data
- Restrictive security headers, frame denial, referrer policy, permissions policy, and a service-aware CSP
- Consent-gated optional analytics and minimal local preference storage
- Protected preview and secret-controlled cache revalidation

The in-memory limiter is a local/server-instance baseline. For production scale, replace it behind the existing interface with an approved distributed store and document its privacy/retention behaviour.

## Policy and operational work

Legal counsel should review the final policy for PIPEDA, applicable provincial law, CASL, contractual terms, breach handling, cross-border processors, retention, access/correction, and complaint procedures. Complete vendor DPAs and access controls. Document lead deletion and least-privilege CRM roles.

## Email-domain preparation

Verify the sending domain with the chosen provider, publish the exact SPF include it supplies, add DKIM selector records, and establish DMARC gradually (`p=none` during monitored rollout, then a reviewed enforcement policy). Keep one consolidated SPF record, review alignment, enable TLS reporting where appropriate, and monitor bounces/complaints. DNS changes require explicit client authorization.

