export type SiteConfig = {
  companyName: string;
  shortDescription: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string[];
  serviceAreas: string[];
  province: string;
  socialProfiles: Partial<Record<"instagram" | "linkedin" | "facebook", string>>;
  consultationCta: { label: string; href: string };
  dealerStatusWording: string;
  seo: { title: string; description: string; siteUrl: string; locale: string };
  retentionNotice: string;
};

export const siteConfig: SiteConfig = {
  companyName: "Synchro Spaces",
  shortDescription:
    "Thoughtful smart-home integration for lighting, scenes, entertainment, access and connected infrastructure.",
  phone: "",
  email: "",
  address: "",
  businessHours: [],
  serviceAreas: [],
  province: "",
  socialProfiles: {
    instagram: "https://www.instagram.com/synchro_spaces/"
  },
  consultationCta: { label: "Plan a consultation", href: "/contact" },
  dealerStatusWording: "",
  seo: {
    title: "Thoughtful Smart-Home Integration",
    description:
      "Synchro Spaces brings lighting, scenes, entertainment, access and connected infrastructure into one calm smart-space experience.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    locale: "en_IN"
  },
  retentionNotice:
    "Enquiry retention depends on the services enabled and applicable operational or legal needs."
};

export const hasVerifiedPhone = Boolean(siteConfig.phone.trim()) && !siteConfig.phone.startsWith("[");
export const hasVerifiedEmail = Boolean(siteConfig.email.trim()) && !siteConfig.email.startsWith("[");
