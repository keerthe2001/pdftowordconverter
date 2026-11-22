# Daily SEO log: pdftowordconverter.in

Numbers come from Google Search Console (Web search, URL-prefix property).
The site moved from a Lovable JavaScript app to the Astro static site on 2026-11-18,
so anything dated before that describes the old site.

## 2026-11-18 (first run, same day as the move)

Search Console performance data ended 2026-11-16, so none of it reflects the new site yet.

| Period | Clicks | Impressions | CTR | Avg position |
| --- | ---: | ---: | ---: | ---: |
| Last 7 days (Nov 10-16) | 0 | 0 | 0% | n/a |
| Previous 7 days (Nov 3-9) | 0 | 3 | 0% | 1.0 |
| Last 28 days (Oct 20-Nov 16) | 0 | 6 | 0% | 1.8 |
| Baseline, 3 months | 2 | 2,440 | 0.1% | 75.2 |

Impressions by period (3-month daily data): Aug 18-31: 1,874. Sep 1-15: 342. Sep 16-30: 102.
Oct 1-15: 117. Oct 16-31: 2. Nov 1-16: 4. The drop came before the move.

Indexing (report last updated 2026-11-13): 55 indexed, 21 not indexed.
- Not found (404): 17, validation started 2026-11-18, 17 pending, 0 failed
- Crawled, currently not indexed: 2
- Page with redirect: 1
- Alternate page with proper canonical tag: 1

Sitemaps: /sitemap-index.xml Success, read 2026-11-18, 58 discovered (the build now lists 62).
/sitemap.xml Success, read 2026-11-18, 71 discovered (now redirects to /sitemap-index.xml).

Live check: all 65 URLs in the 3-month pages report and all 17 reported 404s now return 200 or
redirect to a live page. No new redirects needed.

Changed:
- /add-page-numbers: added FAQ on starting numbering at 100, for "page number 100"
  (position 8.2, 5 impressions over 3 months). Commit 4570395.

Indexing requests:
- Accepted: /add-page-numbers, /crop-pdf
- Quota exceeded on /compress-pdf, so the run stopped there

Still to request: /compress-pdf, /blog/how-to-merge-multiple-pdfs-into-one-file-free-fast,
/blog/how-to-convert-word-to-pdf-free, /exam-form-ready, /pdf-to-word,
/blog/best-page-size-and-margin-settings-for-pdf-export

## 2026-11-21 (blocked: Search Console access lost)

Search Console now says "you don't have access to this property" for https://pdftowordconverter.in/
when signed in as the owner's account. The property list shows only three other properties,
so the pdftowordconverter.in property has been removed from this account or its verification
has lapsed. No performance, indexing, sitemap or 404-validation data could be read, and no
indexing requests were sent.

The live site still serves both google-site-verification meta tags, robots.txt allows everything
and points to /sitemap-index.xml, and all 63 sitemap URLs return 200.

New blog post /blog/convert-bank-statement-pdf-to-excel: 200, title and canonical correct,
all 4 images load. Indexing request still pending.

Changed: nothing on the site (no new Search Console data to act on).

Still to request (unchanged, plus the new post): /blog/convert-bank-statement-pdf-to-excel,
/compress-pdf, /blog/how-to-merge-multiple-pdfs-into-one-file-free-fast,
/blog/how-to-convert-word-to-pdf-free, /exam-form-ready, /pdf-to-word,
/blog/best-page-size-and-margin-settings-for-pdf-export

## 2026-11-22 (blocked again: Search Console access lost)

Search Console still says "you don't have access to this property" for https://pdftowordconverter.in/
when signed in as the owner's account. The property list shows only huntexams.com,
lastbenchcoderz.blogspot.com and www.keertheology.online. No performance, indexing, sitemap or
404-validation data could be read, and no indexing requests were sent.

Live checks (from Chrome):
- Both google-site-verification meta tags are still on the home page; robots.txt allows everything
  and points to /sitemap-index.xml.
- /sitemap-index.xml lists sitemap-0.xml with 64 URLs; all 64 return 200.
- New post /blog/please-upload-a-valid-pdf-file-error: 200, title and canonical correct, in the
  sitemap, all 3 images load.
- /blog/convert-bank-statement-pdf-to-excel: still 200 with the correct title and canonical.

Changed: nothing on the site (no Search Console data to act on).

Still to request: /blog/please-upload-a-valid-pdf-file-error, /blog/convert-bank-statement-pdf-to-excel,
/compress-pdf, /blog/how-to-merge-multiple-pdfs-into-one-file-free-fast,
/blog/how-to-convert-word-to-pdf-free, /exam-form-ready, /pdf-to-word,
/blog/best-page-size-and-margin-settings-for-pdf-export
