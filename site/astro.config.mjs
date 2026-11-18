import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://pdftowordconverter.in",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "always" },
  compressHTML: true,
  integrations: [sitemap({ filter: p => !/\/404$/.test(p), changefreq: "weekly" })],
});
