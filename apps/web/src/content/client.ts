import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityEnabled =
  process.env.NEXT_PUBLIC_CONTENT_MODE === "sanity" && Boolean(projectId && dataset);

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-02-19",
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
      token: process.env.SANITY_API_READ_TOKEN
    })
  : null;

