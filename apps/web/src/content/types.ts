export type Audience = "residential" | "commercial" | "both";

export type ContentImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SeoFields = {
  seoTitle: string;
  seoDescription: string;
  canonical?: string;
  socialImage?: ContentImage;
};

export type Service = SeoFields & {
  id: string;
  title: string;
  slug: string;
  eyebrow: string;
  summary: string;
  audience: Audience;
  body: string[];
  outcomes: string[];
  image: ContentImage;
  relatedServiceSlugs: string[];
  published: boolean;
};

export type Project = SeoFields & {
  id: string;
  title: string;
  slug: string;
  location: string;
  propertyType: string;
  summary: string;
  brief: string;
  approach: string[];
  systems: string[];
  image: ContentImage;
  gallery: ContentImage[];
  relatedServiceSlugs: string[];
  published: boolean;
};

export type Article = SeoFields & {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  body: { heading: string; paragraphs: string[] }[];
  portableText?: unknown[];
  image: ContentImage;
  publishedAt: string;
  updatedAt: string;
  reviewedAt: string;
  published: boolean;
};

export type ServiceArea = SeoFields & {
  id: string;
  title: string;
  slug: string;
  summary: string;
  localContext: string[];
  projectConsiderations: string[];
  relatedServiceSlugs: string[];
  published: boolean;
};

export type Partner = {
  id: string;
  name: string;
  category: string;
  summary: string;
  verificationRequired: boolean;
};

export type Faq = { id: string; question: string; answer: string; category: string };
export type Testimonial = { id: string; quote: string; attribution: string; verified: boolean };
export type TeamMember = { id: string; name: string; role: string; bio: string; image?: ContentImage };
