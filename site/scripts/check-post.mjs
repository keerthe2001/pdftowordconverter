// Quality gate for a blog post. Run after `npm run build`:
//   node scripts/check-post.mjs <slug> "<primary keyword>"
// Exits 1 if anything fails. Checks structure, SEO basics, images, links and
// overlap with the other posts on this site. It cannot detect copying from other websites.
import fs from "fs"; import path from "path"; import { execFileSync } from "child_process";
import { POSTS, REDIRECTS } from "../src/data/posts.mjs";
import { TOOLS } from "../src/data/tools.mjs";

const [slug, keyword = ""] = process.argv.slice(2);
if (!slug) { console.error('Usage: node scripts/check-post.mjs <slug> "<primary keyword>"'); process.exit(2); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dist = path.join(root, "dist");
const errors = [], info = [];
const fail = m => errors.push(m);
const text = h => h.replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
const words = s => s.toLowerCase().match(/[a-z0-9][a-z0-9'/-]*/g) || [];
const shingles = (w, n = 5) => new Set(w.slice(0, Math.max(0, w.length - n + 1)).map((_, i) => w.slice(i, i + n).join(" ")));
const STOP = new Set("a an and at for from how in into of on or the to with your you without free online".split(" "));
const titleSet = t => new Set(words(t).filter(x => !STOP.has(x)));
const jaccard = (a, b) => { const i = [...a].filter(x => b.has(x)).length; return i / (a.size + b.size - i || 1); };

const matches = POSTS.filter(p => p.slug === slug);
if (matches.length !== 1) { console.error(`FAIL: expected exactly one post with slug ${slug}, found ${matches.length}`); process.exit(1); }
const p = matches[0];
const others = POSTS.filter(x => x !== p);

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail("slug must be lowercase words joined by hyphens");
if (REDIRECTS[`/blog/${slug}`]) fail("slug is already used by a redirect");
if (!TOOLS.some(t => t.slug === p.tool)) fail(`unknown tool: ${p.tool}`);
if (p.title.length > 60) fail(`title is ${p.title.length} characters (max 60)`);
if (p.description.length < 120 || p.description.length > 160) fail(`description is ${p.description.length} characters (want 120-160)`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) fail("date must be YYYY-MM-DD");

const bodyWords = words(text(p.body));
info.push(`words: ${bodyWords.length}`);
if (bodyWords.length < 600) fail("body is under 600 words, which is too thin for a guide");
if (/<h1[\s>]/i.test(p.body)) fail("body must not contain an h1");
const h2s = [...p.body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => text(m[1]).trim());
if (h2s.length < 3) fail("needs at least 3 h2 sections");

const FILLER = ["delve", "in today's digital", "in today's fast-paced", "it's important to note", "it is important to note", "game-changer", "game changer", "unlock the power", "seamlessly", "look no further", "in conclusion", "navigating the", "ever-evolving", "whether you're a"];
const lower = text(p.body).toLowerCase().replace(/\s+/g, " ");
for (const f of FILLER) if (lower.includes(f)) fail(`filler phrase: "${f}"`);

if (keyword) {
  const k = keyword.toLowerCase().trim(), kw = words(k), joined = ` ${bodyWords.join(" ")} `, needle = ` ${kw.join(" ")} `;
  const count = joined.split(needle).length - 1, density = count * kw.length / (bodyWords.length || 1) * 100;
  info.push(`keyword "${k}": ${count} uses, ${density.toFixed(2)}%`);
  const inTitle = kw.every(w => words(p.title).includes(w));
  if (!inTitle) fail("title should contain every word of the primary keyword");
  if (!` ${bodyWords.slice(0, 120).join(" ")} `.includes(needle)) fail("primary keyword should appear in the first 120 words");
  if (count < 2) fail("primary keyword is used fewer than 2 times");
  if (density > 2.5) fail(`keyword density ${density.toFixed(2)}% looks stuffed (max 2.5%)`);
} else fail("primary keyword argument is required");

const mine = shingles(bodyWords); let worst = { v: 0, s: "" };
for (const o of others) {
  const theirs = shingles(words(text(o.body))), v = [...mine].filter(x => theirs.has(x)).length / (mine.size || 1);
  if (v > worst.v) worst = { v, s: o.slug };
  const t = jaccard(titleSet(p.title), titleSet(o.title));
  if (t >= 0.7) fail(`title is too close to /blog/${o.slug}`);
}
info.push(`highest overlap with another post: ${(worst.v * 100).toFixed(1)}% (${worst.s})`);
if (worst.v > 0.08) fail(`more than 8% of 5-word phrases repeat /blog/${worst.s}`);

const imgs = [...p.body.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
const attr = (t, a) => (t.match(new RegExp(`\\s${a}="([^"]*)"`, "i")) || [])[1];
const list = imgs.map(t => ({ src: attr(t, "src"), alt: attr(t, "alt"), width: +attr(t, "width"), height: +attr(t, "height") }));
if (!p.image) fail("post needs an image: { src, alt, width, height }"); else list.unshift(p.image);
if (list.length < 2) fail("needs a hero image and at least 1 image in the body");
const prefix = `/images/blog/${slug}/`, seen = new Set();
for (const im of list) {
  if (!im.src?.startsWith(prefix)) { fail(`image must live under ${prefix}: ${im.src}`); continue; }
  if (seen.has(im.src)) fail(`image used twice: ${im.src}`); seen.add(im.src);
  if (!im.alt || im.alt.trim().length < 15) fail(`image needs descriptive alt text: ${im.src}`);
  const f = path.join(dist, im.src);
  if (!fs.existsSync(f)) { fail(`image missing from build: ${im.src}`); continue; }
  const kb = fs.statSync(f).size / 1024;
  if (kb > 300) fail(`image is ${kb.toFixed(0)} KB (max 300): ${im.src}`);
  try {
    const [w, h] = execFileSync("python3", ["-c", "import sys;from PIL import Image;i=Image.open(sys.argv[1]);i.load();print(i.width,i.height)", f]).toString().trim().split(" ").map(Number);
    if (w !== im.width || h !== im.height) fail(`image is ${w}x${h} but the page says ${im.width}x${im.height}: ${im.src}`);
  } catch { fail(`image could not be decoded: ${im.src}`); }
}
info.push(`images: ${list.length}`);

const hrefs = [...p.body.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map(m => m[1]);
const internal = [...new Set(hrefs.filter(h => h.startsWith("/")))];
if (internal.length < 3) fail("needs at least 3 different internal links");
if (!internal.includes(`/${p.tool}`)) fail(`must link to its tool: /${p.tool}`);
for (const h of internal) { const c = h.split(/[#?]/)[0]; if (!fs.existsSync(path.join(dist, c === "/" ? "index.html" : `${c}.html`))) fail(`broken internal link: ${h}`); }
for (const h of hrefs) if (!h.startsWith("/") && !h.startsWith("https://") && !h.startsWith("#")) fail(`bad link: ${h}`);

const pageFile = path.join(dist, "blog", `${slug}.html`);
if (!fs.existsSync(pageFile)) fail("built page is missing");
else {
  const html = fs.readFileSync(pageFile, "utf8"), url = `https://pdftowordconverter.in/blog/${slug}`;
  if (!html.includes(`href="${url}"`)) fail("canonical URL is missing");
  if (p.image && !html.includes(`https://pdftowordconverter.in${p.image.src}`)) fail("share image is missing from the page");
  if (/name="?robots"?[^>]*noindex/i.test(html)) fail("page is set to noindex");
  if (!fs.readFileSync(path.join(dist, "sitemap-0.xml"), "utf8").includes(`<loc>${url}</loc>`)) fail("page is missing from the sitemap");
}

info.forEach(m => console.log(m));
if (errors.length) { errors.forEach(m => console.error("FAIL: " + m)); process.exit(1); }
console.log("PASS");
