# pdftowordconverter.in

Free, private PDF tools. Most tools run in the browser (MuPDF, Ghostscript and Tesseract compiled to WebAssembly).
Office conversions run on a small LibreOffice server.

```
site/    Astro static site + browser engines   → Cloudflare Pages (free, unlimited bandwidth)
server/  FastAPI conversion API (Docker)        → Render free web service
```

Licence: AGPL-3.0 (required because MuPDF and Ghostscript are AGPL). Keep this repository **public**.

---

## 1. Put the code on GitHub

1. Create a **public** repository named `pdftowordconverter`.
2. Upload this folder (or `git init && git add . && git commit -m "Rebuild" && git push`).
3. The GitHub link in `site/src/data/tools.mjs` points to keerthe2001/pdftowordconverter.

## 2. Website → Cloudflare Pages

1. Create a free Cloudflare account (no card needed) → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
2. Build settings:
   - Framework preset: **Astro**
   - Root directory: `site`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
3. Deploy. Check the preview URL (`*.pages.dev`), and try Merge, Compress and OCR.

## 3. Point the domain

1. Cloudflare → **Add a domain** → `pdftowordconverter.in` (Free plan). Cloudflare shows two nameservers.
2. At your domain registrar, replace the nameservers with Cloudflare's. This takes from a few minutes to a few hours.
3. Pages project → **Custom domains** → add `pdftowordconverter.in` and `www.pdftowordconverter.in`.
4. In Lovable, disconnect the custom domain from the old project.
5. Optional: **Email Routing** (free) → forward `hello@pdftowordconverter.in` to your Gmail. This is the address on the Contact page.

## 4. Conversion server → Render

1. Render → **New → Web Service** → connect the same repo.
2. Root directory: `server` · Runtime: **Docker** · Plan: **Free** · Region: **Singapore**.
3. Environment variable `ALLOWED_ORIGINS` = `https://pdftowordconverter.in,https://www.pdftowordconverter.in`
4. Health check path: `/health`.
5. After deploy, copy the service URL. If it isn't `https://pdftowordconverter-api.onrender.com`, update `converterApi` in `site/src/data/tools.mjs` and push.
6. Test Word to PDF on the live site. The first conversion after the server has been idle takes 30–60 s while it wakes up; the site shows a "warming up" message.

## 5. Google Search Console

The two existing `google-site-verification` tags are kept, so verification survives the move.

1. **Sitemaps** → remove the old `sitemap.xml` → submit `https://pdftowordconverter.in/sitemap-index.xml`.
2. **URL inspection** → request indexing for `/`, `/compress-pdf`, `/remove-pages`, `/merge-pdf`, `/exam-form-ready` and the top guides.
3. **Pages → Not found (404)** → click **Validate fix**. Every old blog URL either exists again or 301-redirects (see `site/src/data/posts.mjs`).
4. Check again after 2–4 weeks.

## 6. AdSense

The publisher tag is in place. After AdSense approves the site, set `ADS_ENABLED = true` in `site/src/layouts/Base.astro` and push. Turn on **Auto ads** in AdSense; no manual slots are needed.

## 7. Keeping it accurate

- **Exam presets** live in `site/src/data/exams.mjs`. Update them when a new notification is published, and update `verified`.
- **iLovePDF comparison figures** are in `site/src/data/compare.mjs`. Re-check them against ilovepdf.com/pricing every few months.

## Local development

```bash
cd site && npm install && npm run dev        # http://localhost:4321
cd server && pip install -r requirements.txt && uvicorn app:app --port 8800
```

For local testing, point `converterApi` in `tools.mjs` at `http://localhost:8800`.

## Engines

| Job | Engine | Where |
|---|---|---|
| Page operations, rendering, redaction, encryption, image recompression | MuPDF.js 1.28 | Browser |
| Compression levels, PDF/A, repair fallback | Ghostscript 10.06 (WASM) | Browser |
| OCR (16 languages incl. 11 Indian) | Tesseract LSTM, best-int models | Browser |
| Word/PPT/Excel → PDF, PDF → PPTX | LibreOffice + metric-compatible MS fonts | Server |
| PDF → Word | pdf2docx (+ OCRmyPDF for scans) | Server |
| PDF → Excel | pdfplumber + openpyxl | Server |
| URL → PDF | Headless Chromium (with SSRF protection) | Server |
