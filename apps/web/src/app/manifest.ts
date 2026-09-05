import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return { name: siteConfig.companyName, short_name: siteConfig.companyName, description: siteConfig.shortDescription, lang: "en-IN", start_url: "/", display: "standalone", background_color: "#0e0e0d", theme_color: "#0e0e0d", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
