import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./src/schemaTypes";
import { locations } from "./src/presentation/locations";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "mockproj";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN ?? "http://localhost:3000";

export default defineConfig({
  name: "default",
  title: "Synchro Spaces Content Studio",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({ previewUrl: { origin: previewOrigin, previewMode: { enable: "/api/draft/enable" } }, resolve: { locations } }),
    visionTool()
  ],
  schema: { types: schemaTypes }
});
