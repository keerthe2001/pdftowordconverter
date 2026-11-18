// Generates robots.txt, _redirects and _headers for Cloudflare Pages.
import fs from "fs"; import path from "path";
import { REDIRECTS } from "../src/data/posts.mjs";
const pub = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../public");
fs.writeFileSync(path.join(pub, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: https://pdftowordconverter.in/sitemap-index.xml\n`);
const lines = [
  "# Old URLs → best matching page (301 keeps search ranking signals)",
  ...Object.entries(REDIRECTS).map(([from, to]) => `${from} ${to} 301`),
  "/sitemap.xml /sitemap-index.xml 301",
  "/index / 301",
  "/tools / 301",
  "/all-tools / 301",
];
fs.writeFileSync(path.join(pub, "_redirects"), lines.join("\n") + "\n");
fs.writeFileSync(path.join(pub, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(self), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN

/vendor/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/app/*
  Cache-Control: public, max-age=3600, must-revalidate

/engine/*
  Cache-Control: public, max-age=3600, must-revalidate

/*.wasm
  Content-Type: application/wasm
`);
console.log("static files written");
