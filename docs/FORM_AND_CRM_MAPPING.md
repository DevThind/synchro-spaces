# Form and CRM mapping

## Canonical lead fields

| Website field | CRM intent |
| --- | --- |
| name, email, phone | Contact identity and reply details |
| audience | Residential/commercial routing |
| projectType, buildType, stage | Project qualification context |
| location | General project city/region only |
| servicesOfInterest | Interest tags or multi-select field |
| preferredContactMethod, preferredTiming | Follow-up preference |
| message | General project overview |
| requestId | Idempotency/support reference |

The form deliberately excludes budget, passwords, controller credentials, alarm/door codes, network credentials, detailed security layouts, and payment data.

## Provider setup

Set `CRM_PROVIDER` to `hubspot` or `gohighlevel` and provide the matching credentials. Confirm custom property identifiers against the client portal before production; the adapter fields are a safe implementation starting point, not permission to mutate a live CRM without review. Set `EMAIL_PROVIDER` to `postmark` or `resend`, then configure a verified sender and team recipient. With absent or incomplete values, development adapters perform no external write.

Test mapping in a sandbox account, verify deduplication/consent rules, confirm ownership/routing, and record the retention/deletion workflow before launch.

