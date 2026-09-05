import { icons } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const BookIcon = icons.book;
const CaseIcon = icons.case;
const CogIcon = icons.cog;
const DocumentIcon = icons.document;
const EarthGlobeIcon = icons["earth-globe"];
const HelpCircleIcon = icons["help-circle"];
const HomeIcon = icons.home;
const MasterDetailIcon = icons["master-detail"];
const StarIcon = icons.star;
const UserIcon = icons.user;

const slugField = defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() });
const summaryField = defineField({ name: "summary", title: "Summary", type: "text", rows: 3, validation: (rule) => rule.required().min(40).max(260) });
const statusField = defineField({ name: "status", title: "Editorial status", type: "string", initialValue: "draft", options: { layout: "radio", list: [{ title: "Draft", value: "draft" }, { title: "Published", value: "published" }] }, validation: (rule) => rule.required() });
const audienceField = defineField({ name: "audience", title: "Audience", type: "string", options: { list: [{ title: "Residential", value: "residential" }, { title: "Commercial", value: "commercial" }, { title: "Both", value: "both" }] }, validation: (rule) => rule.required() });
const mainContentField = defineField({ name: "mainContent", title: "Main content", type: "portableText", validation: (rule) => rule.required() });
const primaryImageField = defineField({ name: "image", title: "Primary image", type: "accessibleImage", validation: (rule) => rule.required() });
const ctaField = defineField({ name: "cta", title: "Call to action", type: "linkCta" });
const seoField = defineField({ name: "seo", title: "Search and sharing", type: "seo", validation: (rule) => rule.required() });

const accessibleImage = defineType({ name: "accessibleImage", title: "Accessible image", type: "object", fields: [
  defineField({ name: "asset", title: "Image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
  defineField({ name: "alt", title: "Alternative text", description: "Describe the image’s purpose. Do not repeat nearby copy.", type: "string", validation: (rule) => rule.required().min(8).max(180) }),
  defineField({ name: "caption", title: "Caption", type: "string", validation: (rule) => rule.max(240) })
], preview: { select: { title: "alt", media: "asset" } } });

const linkCta = defineType({ name: "linkCta", title: "Call to action", type: "object", fields: [
  defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required().max(45) }),
  defineField({ name: "href", title: "URL or path", type: "string", validation: (rule) => rule.required().custom((value) => !value || value.startsWith("/") || /^https:\/\//.test(value) ? true : "Use an internal path or HTTPS URL.") })
] });

const videoInfo = defineType({ name: "videoInfo", title: "Video", type: "object", fields: [
  defineField({ name: "provider", title: "Provider", type: "string", options: { list: ["Vimeo", "YouTube", "Self-hosted"] } }),
  defineField({ name: "url", title: "Video URL", type: "url" }),
  defineField({ name: "title", title: "Accessible title", type: "string" }),
  defineField({ name: "transcript", title: "Transcript", type: "text" }),
  defineField({ name: "poster", title: "Poster image", type: "accessibleImage" })
] });

const seo = defineType({ name: "seo", title: "Search and sharing", type: "object", fields: [
  defineField({ name: "title", title: "SEO title", type: "string", validation: (rule) => rule.required().min(20).max(65) }),
  defineField({ name: "description", title: "SEO description", type: "text", rows: 3, validation: (rule) => rule.required().min(70).max(165) }),
  defineField({ name: "canonical", title: "Canonical override", description: "Leave blank to use the document route.", type: "url" }),
  defineField({ name: "socialImage", title: "Social-sharing image", type: "accessibleImage" }),
  defineField({ name: "noIndex", title: "Exclude from indexing", type: "boolean", initialValue: false })
] });

const portableText = defineType({ name: "portableText", title: "Rich text", type: "array", of: [
  defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading 2", value: "h2" }, { title: "Heading 3", value: "h3" }, { title: "Quote", value: "blockquote" }], marks: { annotations: [defineArrayMember({ name: "link", type: "object", title: "Link", fields: [defineField({ name: "href", type: "url", title: "URL", validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto", "tel"] }) })] })] } }),
  defineArrayMember({ type: "accessibleImage" })
] });

const siteSettings = defineType({ name: "siteSettings", title: "Site settings", type: "document", icon: CogIcon, fields: [
  defineField({ name: "companyName", title: "Company name", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "shortDescription", title: "Short description", type: "text", validation: (rule) => rule.required().max(240) }),
  defineField({ name: "phone", title: "Phone", type: "string" }), defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email() }),
  defineField({ name: "address", title: "Address", type: "text" }), defineField({ name: "businessHours", title: "Business hours", type: "array", of: [defineArrayMember({ type: "string" })] }),
  defineField({ name: "serviceAreas", title: "Main service areas", type: "array", of: [defineArrayMember({ type: "string" })] }), defineField({ name: "province", title: "Province", type: "string" }),
  defineField({ name: "socialProfiles", title: "Social profiles", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "network", type: "string" }), defineField({ name: "url", type: "url" })] })] }),
  ctaField, defineField({ name: "dealerStatusWording", title: "Approved dealer-status wording", type: "text", validation: (rule) => rule.required() }), seoField
], preview: { prepare: () => ({ title: "Site settings" }) } });

const service = defineType({ name: "service", title: "Service", type: "document", icon: HomeIcon, fields: [
  defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(90) }), slugField, summaryField, audienceField, mainContentField,
  defineField({ name: "outcomes", title: "Outcomes", type: "array", of: [defineArrayMember({ type: "string" })], validation: (rule) => rule.required().min(3) }),
  defineField({ name: "relatedServices", title: "Related services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })] }),
  defineField({ name: "relatedProjects", title: "Related projects", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })] }),
  defineField({ name: "relatedLocations", title: "Related locations", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "serviceArea" }] })] }),
  primaryImageField, defineField({ name: "video", title: "Video", type: "videoInfo" }), ctaField, seoField, statusField,
  defineField({ name: "updatedAt", title: "Updated date", type: "datetime" }), defineField({ name: "reviewAt", title: "Next review date", type: "date" })
], preview: { select: { title: "title", subtitle: "audience", media: "image.asset" } } });

const project = defineType({ name: "project", title: "Project / case study", type: "document", icon: CaseIcon, fields: [
  defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }), slugField, summaryField, audienceField,
  defineField({ name: "location", title: "Location", type: "string", validation: (rule) => rule.required() }), defineField({ name: "propertyType", title: "Property type", type: "string", validation: (rule) => rule.required() }),
  mainContentField, defineField({ name: "systems", title: "Systems", type: "array", of: [defineArrayMember({ type: "string" })] }),
  defineField({ name: "relatedServices", title: "Related services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })] }),
  defineField({ name: "relatedProjects", title: "Related projects", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })] }),
  defineField({ name: "relatedLocations", title: "Related locations", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "serviceArea" }] })] }),
  primaryImageField, defineField({ name: "gallery", title: "Gallery", type: "array", of: [defineArrayMember({ type: "accessibleImage" })], validation: (rule) => rule.required().min(1) }),
  defineField({ name: "video", title: "Video", type: "videoInfo" }), ctaField, seoField, statusField,
  defineField({ name: "publishedAt", title: "Publish date", type: "datetime" }), defineField({ name: "updatedAt", title: "Updated date", type: "datetime" }), defineField({ name: "reviewAt", title: "Next review date", type: "date" })
], preview: { select: { title: "title", subtitle: "location", media: "image.asset" } } });

const technologyPartner = defineType({ name: "technologyPartner", title: "Technology partner", type: "document", icon: MasterDetailIcon, fields: [
  defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }), defineField({ name: "category", title: "Category", type: "string", validation: (rule) => rule.required() }), summaryField,
  defineField({ name: "logo", title: "Logo", type: "accessibleImage" }), defineField({ name: "website", title: "Website", type: "url" }),
  defineField({ name: "relationshipVerified", title: "Relationship and wording verified", description: "Keep false until the client confirms the public claim.", type: "boolean", initialValue: false, validation: (rule) => rule.required() }), statusField
], preview: { select: { title: "name", subtitle: "category", media: "logo.asset" } } });

const article = defineType({ name: "article", title: "Article / resource", type: "document", icon: BookIcon, fields: [
  defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }), slugField, summaryField, defineField({ name: "category", title: "Category", type: "string", validation: (rule) => rule.required() }), audienceField, mainContentField, primaryImageField,
  defineField({ name: "relatedServices", title: "Related services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })] }), defineField({ name: "relatedProjects", title: "Related projects", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })] }), defineField({ name: "relatedLocations", title: "Related locations", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "serviceArea" }] })] }),
  ctaField, seoField, statusField, defineField({ name: "publishedAt", title: "Publish date", type: "datetime", validation: (rule) => rule.required() }), defineField({ name: "updatedAt", title: "Updated date", type: "datetime", validation: (rule) => rule.required() }), defineField({ name: "reviewAt", title: "Review date", type: "date", validation: (rule) => rule.required() })
], preview: { select: { title: "title", subtitle: "category", media: "image.asset" } } });

const faq = defineType({ name: "faq", title: "FAQ", type: "document", icon: HelpCircleIcon, fields: [
  defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required().min(10).max(160) }), defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (rule) => rule.required().min(30).max(1000) }), defineField({ name: "category", title: "Category", type: "string", validation: (rule) => rule.required() }), audienceField,
  defineField({ name: "relatedServices", title: "Related services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })] }), statusField
], preview: { select: { title: "question", subtitle: "category" } } });

const serviceArea = defineType({ name: "serviceArea", title: "Service area", type: "document", icon: EarthGlobeIcon, fields: [
  defineField({ name: "title", title: "Location name", type: "string", validation: (rule) => rule.required() }), slugField, summaryField, mainContentField,
  defineField({ name: "localInsights", title: "Verified local insights", description: "Required to prevent thin doorway pages.", type: "array", of: [defineArrayMember({ type: "string" })], validation: (rule) => rule.required().min(2) }),
  defineField({ name: "relatedServices", title: "Related services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], validation: (rule) => rule.required().min(1) }), defineField({ name: "relatedProjects", title: "Related projects", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })] }),
  primaryImageField, ctaField, seoField, statusField, defineField({ name: "updatedAt", title: "Updated date", type: "datetime" }), defineField({ name: "reviewAt", title: "Review date", type: "date" })
], preview: { select: { title: "title", subtitle: "summary", media: "image.asset" } } });

const teamMember = defineType({ name: "teamMember", title: "Team member", type: "document", icon: UserIcon, fields: [
  defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }), defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.required() }), defineField({ name: "bio", title: "Biography", type: "text", validation: (rule) => rule.required().min(80).max(1200) }), primaryImageField,
  defineField({ name: "credentialsVerified", title: "Credentials verified", type: "boolean", initialValue: false, validation: (rule) => rule.required() }), statusField
], preview: { select: { title: "name", subtitle: "role", media: "image.asset" } } });

const testimonial = defineType({ name: "testimonial", title: "Testimonial", type: "document", icon: StarIcon, fields: [
  defineField({ name: "quote", title: "Approved quote", type: "text", rows: 5, validation: (rule) => rule.required().min(20).max(700) }), defineField({ name: "attribution", title: "Approved attribution", type: "string", validation: (rule) => rule.required() }), audienceField,
  defineField({ name: "verified", title: "Written publication approval on file", type: "boolean", initialValue: false, validation: (rule) => rule.custom((value) => value === true ? true : "Testimonials cannot be published without written approval.") }),
  defineField({ name: "relatedProject", title: "Related project", type: "reference", to: [{ type: "project" }] }), statusField
], preview: { select: { title: "attribution", subtitle: "quote" } } });

const campaignPage = defineType({ name: "campaignPage", title: "Campaign page", type: "document", icon: DocumentIcon, fields: [
  defineField({ name: "title", title: "Internal title", type: "string", validation: (rule) => rule.required() }), slugField, summaryField, audienceField,
  defineField({ name: "headline", title: "Campaign headline", type: "string", validation: (rule) => rule.required().max(100) }), mainContentField, primaryImageField,
  defineField({ name: "relatedServices", title: "Related services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })] }), defineField({ name: "relatedProjects", title: "Related projects", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })] }), defineField({ name: "relatedLocations", title: "Related locations", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "serviceArea" }] })] }),
  ctaField, seoField, statusField, defineField({ name: "publishAt", title: "Publish date", type: "datetime" }), defineField({ name: "updateAt", title: "Update date", type: "datetime" }), defineField({ name: "reviewAt", title: "Review date", type: "date" })
], preview: { select: { title: "title", subtitle: "status", media: "image.asset" } } });

export const schemaTypes = [accessibleImage, linkCta, videoInfo, seo, portableText, siteSettings, service, project, technologyPartner, article, faq, serviceArea, teamMember, testimonial, campaignPage];
