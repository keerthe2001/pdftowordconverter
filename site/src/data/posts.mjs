// Blog posts. Slugs preserved from URLs Google already indexed. Bodies are HTML.
const T = (slug, name) => `<div class="cta-box"><strong>Try it now:</strong> <a href="/${slug}">${name}</a> — free, no signup, and your file stays on your device.</div>`;

export const POSTS = [
  {
    slug: "how-to-merge-multiple-pdfs-into-one-file-free-fast", tool: "merge-pdf", date: "2026-11-16",
    title: "How to Merge Multiple PDFs into One File (Free & Fast)",
    description: "Combine several PDFs into one file in the right order — free, without uploading, on phone or computer. Step-by-step guide with tips for job and exam applications.",
    body: `
<p>Portals for jobs, exams, visas and loans often accept only <strong>one PDF</strong> per field. If your resume, certificates and ID proofs are separate files, you need to merge them. Here's the fastest free way, plus the mistakes that get applications rejected.</p>
<h2>Merge PDFs in 4 steps</h2>
<ol>
<li>Open <a href="/merge-pdf">Merge PDF</a> and select all your files at once (or drop them on the page).</li>
<li>Drag the file cards into the order the portal expects — usually the main document first, then supporting proofs.</li>
<li>Click <strong>Merge PDF</strong>.</li>
<li>Download <em>merged.pdf</em>. If the portal has a size limit, click <strong>Compress PDF</strong> on the result screen and enter the exact KB limit.</li>
</ol>
${T("merge-pdf", "Merge PDF")}
<h2>Why merging in the browser is better</h2>
<p>Most online mergers upload your files to a server. Our merger runs on your device using the MuPDF engine compiled to WebAssembly, so certificates and ID cards never leave your phone or laptop. It's also faster: there's no upload or download wait, and no limit on the number of files.</p>
<p>Merging is <strong>lossless</strong>: pages are copied exactly, so text stays selectable and scans keep their original sharpness.</p>
<h2>Merging tips for applications</h2>
<ul>
<li><strong>Check the order.</strong> Reviewers read top to bottom. Put the document they asked for first.</li>
<li><strong>Fix sideways pages</strong> with <a href="/rotate-pdf">Rotate PDF</a> before merging — a sideways marksheet looks careless.</li>
<li><strong>Remove blank scan pages</strong> with <a href="/remove-pages">Remove Pages</a>; they add size and nothing else.</li>
<li><strong>Mind the size limit.</strong> Many government portals cap uploads at 200 KB–2 MB. Use <a href="/compress-pdf">Compress PDF → Exact size</a>.</li>
<li><strong>Password-protected statements?</strong> You'll be asked for the password once; the merged file is saved without it.</li>
</ul>
<h2>Merging photos and PDFs together</h2>
<p>If some documents are photos (JPG), convert them first with <a href="/jpg-to-pdf">JPG to PDF</a> — or use <a href="/scan-to-pdf">Scan to PDF</a> to clean up phone photos so they look like proper scans — then merge everything.</p>
<h2>FAQ</h2>
<p><strong>Is there a file limit?</strong> No. You can merge as many PDFs as your device's memory allows — typically hundreds on a laptop.</p>
<p><strong>Will bookmarks and links survive?</strong> Links inside pages keep working. The document outline (bookmarks panel) of individual files is not combined.</p>
<p><strong>Can I merge on my phone?</strong> Yes — the tool works in Chrome and Safari on Android and iPhone.</p>`,
  },
  {
    slug: "how-to-split-a-large-pdf-into-separate-files-free-and-fast", tool: "split-pdf", date: "2026-11-16",
    title: "How to Split a Large PDF into Separate Files (Free and Fast)",
    description: "Split a big PDF into smaller files by page ranges, every N pages, or single pages — free and private. Includes tips for upload size limits.",
    body: `
<p>A 60-page scanned bundle, a textbook chapter, or a combined certificate file that a portal wants as separate uploads — splitting solves all of these. Here's how to do it in under a minute without uploading anything.</p>
<h2>Three ways to split</h2>
<ul>
<li><strong>Custom ranges</strong> — one output file per line, e.g. <code>1-3</code>, <code>4-10</code>, <code>11-</code>. Best when you know where each document starts.</li>
<li><strong>Every N pages</strong> — e.g. every 2 pages for front-and-back ID cards.</li>
<li><strong>Every page</strong> — each page becomes its own PDF.</li>
</ul>
<h2>Step by step</h2>
<ol>
<li>Open <a href="/split-pdf">Split PDF</a> and select your file. Page thumbnails appear so you can see where documents begin.</li>
<li>Choose a split mode and enter ranges if needed.</li>
<li>Click <strong>Split PDF</strong>. Several files are bundled into one ZIP download.</li>
</ol>
${T("split-pdf", "Split PDF")}
<h2>Splitting to meet a size limit</h2>
<p>If a portal limits each upload to, say, 2 MB, splitting a 10 MB file into five parts is one option — but often it's better to <a href="/compress-pdf">compress to an exact size</a> first. Scanned pages compress dramatically (often 80–90%) with no visible loss on screen.</p>
<h2>Split vs. extract — which do I need?</h2>
<p>Use <a href="/extract-pages">Extract Pages</a> when you want one new PDF made of a few chosen pages. Use Split when you want the whole document cut into several files. See our <a href="/blog/merge-vs-split-pdf-when-to-use-each">merge vs split guide</a>.</p>
<h2>Does splitting reduce quality?</h2>
<p>No. Pages are copied exactly — text, images and fonts are untouched.</p>`,
  },
  {
    slug: "how-to-convert-word-to-pdf-free", tool: "word-to-pdf", date: "2026-08-10", updated: "2026-11-16",
    title: "How to Convert Word to PDF for Free (Without Losing Formatting)",
    description: "Convert DOCX to PDF free with fonts, tables and page breaks intact. Learn the 3 settings that keep your resume or assignment looking exactly right.",
    body: `
<p>PDF is the safest way to send a document: it looks identical on every phone, laptop and printer. Here's how to convert Word to PDF for free and keep your formatting perfect.</p>
<h2>Convert in 3 steps</h2>
<ol><li>Open <a href="/word-to-pdf">Word to PDF</a> and select your .docx (or .doc, .odt, .rtf).</li><li>Click <strong>Convert to PDF</strong>. The first conversion of the day may take 30–60 seconds while our free server wakes up.</li><li>Download your PDF and check it page by page.</li></ol>
${T("word-to-pdf", "Word to PDF")}
<h2>Why formatting sometimes shifts — and how we prevent it</h2>
<p>Most layout problems come from <strong>fonts</strong>. If the converter doesn't have Calibri or Cambria, it substitutes another font with different letter widths, and lines wrap differently. Our converter runs LibreOffice with metric-compatible versions of Microsoft's core fonts (Carlito for Calibri, Caladea for Cambria, Liberation for Arial/Times), so text occupies exactly the same space.</p>
<h2>Three things to check before converting</h2>
<ul>
<li><strong>Use standard fonts.</strong> Calibri, Arial, Times New Roman and Cambria convert perfectly. Decorative downloaded fonts may be substituted.</li>
<li><strong>Use page breaks, not empty lines,</strong> to start a new page.</li>
<li><strong>Anchor images "in line with text"</strong> rather than floating, so they don't move.</li>
</ul>
<h2>Converting on a phone</h2>
<p>The converter works in mobile browsers. Choose the file from Google Drive, Files or iCloud.</p>
<h2>Is it safe?</h2>
<p>Your file is sent over HTTPS, converted in memory and deleted immediately. Nothing is stored.</p>`,
  },
  {
    slug: "convert-word-to-pdf-without-losing-formatting-fast-guide", tool: "word-to-pdf", date: "2026-11-16",
    title: "Convert Word to PDF Without Losing Formatting: Fast Guide",
    description: "Fonts changing, tables breaking, extra blank pages? Fix the common Word-to-PDF formatting problems in minutes with this checklist.",
    body: `
<p>You spent an hour aligning your document — then the PDF has shifted lines, a broken table and a blank last page. Here's how to fix each problem.</p>
<h2>Problem 1: Fonts look different</h2>
<p>The converter didn't have your font. Stick to Calibri, Arial, Times New Roman, Cambria, Georgia or Verdana. Our <a href="/word-to-pdf">Word to PDF</a> converter includes metric-compatible equivalents of these, so line breaks match Word.</p>
<h2>Problem 2: An extra blank page at the end</h2>
<p>Word keeps a final paragraph mark after a table or page break. Turn on formatting marks (¶), select the empty paragraph and set its font size to 1 pt. Or remove the blank page afterwards with <a href="/remove-pages">Remove Pages</a>.</p>
<h2>Problem 3: Tables split or overflow</h2>
<p>Set the table width to 100% of the page and enable "Repeat header row". Avoid fixed column widths wider than the page margins.</p>
<h2>Problem 4: Images move</h2>
<p>Floating images are positioned relative to paragraphs that may reflow. Right-click → Wrap Text → <em>In Line with Text</em>.</p>
<h2>Problem 5: The PDF is too big to upload</h2>
<p>Large photos in the document make large PDFs. After converting, use <a href="/compress-pdf">Compress PDF</a> with Exact size to meet the portal's limit.</p>
${T("word-to-pdf", "Word to PDF")}
<h2>Quick checklist</h2>
<ul><li>Standard fonts only</li><li>Page breaks instead of repeated Enter</li><li>Images in line with text</li><li>Tables within margins</li><li>Check the PDF page count before sending</li></ul>`,
  },
  {
    slug: "sign-a-pdf-electronically-for-free-without-leaving-your-browser", tool: "sign-pdf", date: "2026-11-16",
    title: "Sign a PDF Electronically for Free (Without Leaving Your Browser)",
    description: "Add your signature to a PDF in a minute: draw, type or upload a photo of your signature. Free and private. Plus: when an e-signature is valid in India.",
    body: `
<p>No printer, no scanner? You can sign offer letters, rental agreements and forms directly in your browser.</p>
<h2>How to sign</h2>
<ol>
<li>Open <a href="/sign-pdf">Sign PDF</a> and select your document.</li>
<li>Click <strong>Create signature</strong>. Draw with your finger or mouse, type your name in a handwriting style, or upload a photo of your signature (we remove the white background automatically).</li>
<li>Click on the page where the signature goes. Drag to move; pull the corner to resize.</li>
<li>Add the date or your name if the form needs it, then click <strong>Sign PDF</strong> and download.</li>
</ol>
${T("sign-pdf", "Sign PDF")}
<h2>Tips for a natural-looking signature</h2>
<ul><li>Sign on plain white paper with a dark pen, photograph it in daylight, and upload — it looks most authentic.</li><li>Keep the signature roughly the height of two lines of text.</li><li>Use dark blue ink colour for a "wet ink" look.</li></ul>
<h2>Is an electronic signature legally valid in India?</h2>
<p>The Information Technology Act, 2000 recognises electronic signatures, and many everyday agreements are signed this way. However, some documents need specific methods — for example Aadhaar-based eSign or a Digital Signature Certificate (DSC) for certain government filings, and some documents (like wills and property transfer deeds) are excluded from electronic execution. When in doubt, ask the other party which method they accept. This is general information, not legal advice.</p>
<h2>Privacy</h2>
<p>Your signature and document never leave your device. Close the tab and they're gone.</p>`,
  },
  {
    slug: "pdf-vs-docx-which-format-should-a-job-applicant-send", tool: "word-to-pdf", date: "2026-11-16",
    title: "PDF vs DOCX: Which Format Should a Job Applicant Send?",
    description: "Should you send your resume as PDF or Word? When each format is better, what ATS systems prefer, and how to convert in seconds.",
    body: `
<p>Short answer: <strong>send a PDF unless the employer asks for Word.</strong> Here's why, and the exceptions.</p>
<h2>Why PDF usually wins</h2>
<ul>
<li><strong>Looks the same everywhere.</strong> A DOCX can reflow on a recruiter's phone or older Word version; a PDF can't.</li>
<li><strong>Can't be accidentally edited.</strong></li>
<li><strong>Modern ATS read PDFs fine</strong> — as long as the PDF has real text (not a scanned image).</li>
</ul>
<h2>When to send DOCX</h2>
<ul><li>The job posting or recruiter explicitly asks for Word.</li><li>A recruitment agency will reformat your CV onto their template.</li><li>An older applicant-tracking portal rejects PDFs (rare now).</li></ul>
<h2>Make your PDF ATS-friendly</h2>
<ul><li>Create it from Word or Google Docs — don't scan a printout.</li><li>Use standard section headings: Experience, Education, Skills.</li><li>Avoid putting key information in images, text boxes or headers.</li><li>Test it: open the PDF and try selecting the text. If you can't, an ATS can't read it either — run <a href="/ocr-pdf">OCR PDF</a> or recreate it.</li></ul>
<h2>Convert either way</h2>
<p>Use <a href="/word-to-pdf">Word to PDF</a> to create your PDF, or <a href="/pdf-to-word">PDF to Word</a> if a recruiter wants an editable copy.</p>
${T("word-to-pdf", "Word to PDF")}`,
  },
  {
    slug: "how-to-scan-documents-to-pdf-with-a-phone-no-app-no-scan-app-fees", tool: "scan-to-pdf", date: "2026-11-16",
    title: "How to Scan Documents to PDF with a Phone (No App, No Fees)",
    description: "Turn phone photos into clean, scanner-quality PDFs without installing an app. Lighting tips, enhancement modes and how to hit upload size limits.",
    body: `
<p>You don't need a scanner or a paid scanning app. Your phone camera plus a browser is enough.</p>
<h2>Scan in 4 steps</h2>
<ol><li>Open <a href="/scan-to-pdf">Scan to PDF</a> on your phone and tap <strong>Use camera</strong>.</li><li>Photograph each page. Add more pages with "+ Add more files".</li><li>Choose <strong>Document</strong> mode (clean white paper, sharp text), Grayscale or Black &amp; white.</li><li>Tap <strong>Create PDF</strong> and download.</li></ol>
${T("scan-to-pdf", "Scan to PDF")}
<h2>Get scanner-quality photos</h2>
<ul><li><strong>Light:</strong> daylight near a window, no direct sun. Avoid the flash — it causes glare.</li><li><strong>Angle:</strong> hold the phone flat above the page, not tilted.</li><li><strong>Background:</strong> place the paper on a dark surface so the edges are clear.</li><li><strong>Shadows:</strong> our enhancement removes soft shadows, but keep your hand's shadow off the page.</li></ul>
<h2>Which mode should I choose?</h2>
<ul><li><strong>Document</strong> — keeps colour stamps, signatures and photos; whitens paper. Best all-rounder.</li><li><strong>Grayscale</strong> — smaller files, good for text documents.</li><li><strong>Black &amp; white</strong> — smallest files and highest contrast; not for photos.</li></ul>
<h2>Meeting upload limits</h2>
<p>For portals with strict KB limits, run <a href="/compress-pdf">Compress PDF → Exact size</a> afterwards. For exam photos and signatures, use <a href="/exam-form-ready">Exam Form Ready</a>.</p>`,
  },
  {
    slug: "add-page-numbers-to-a-pdf-for-free-without-leaving-your-browser", tool: "add-page-numbers", date: "2026-11-16",
    title: "Add Page Numbers to a PDF for Free (Without Leaving Your Browser)",
    description: "Number PDF pages with your choice of position, format and start number — and skip the cover page. Free and private.",
    body: `
<p>Theses, project reports and long submissions usually require page numbers. Here's how to add them to any PDF in under a minute.</p>
<h2>Steps</h2>
<ol><li>Open <a href="/add-page-numbers">Add Page Numbers</a> and select your PDF.</li><li>Choose position (e.g. bottom centre) and format: <em>1</em>, <em>Page 1</em>, or <em>Page 1 of 20</em>.</li><li>To skip a cover page, type <code>2-</code> in "Pages to number".</li><li>Click <strong>Add page numbers</strong> and download.</li></ol>
${T("add-page-numbers", "Add Page Numbers")}
<h2>Common setups</h2>
<ul><li><strong>Project report:</strong> bottom centre, "1", pages <code>2-</code>, start at 1.</li><li><strong>Legal documents:</strong> bottom right, "Page 1 of N".</li><li><strong>Merged application bundle:</strong> top right, "1 / N" so reviewers can see nothing is missing.</li></ul>
<h2>Landscape and rotated pages</h2>
<p>Numbers are positioned according to how the page is displayed, so they appear upright in the right corner even on landscape tables.</p>`,
  },
  {
    slug: "remove-a-password-from-your-own-pdf-free-private-no-sign-up", tool: "unlock-pdf", date: "2026-11-16",
    title: "Remove a Password from Your Own PDF (Free, Private, No Sign-up)",
    description: "Tired of typing the password for bank statements and e-bills? Save an unlocked copy in seconds — the password never leaves your device.",
    body: `
<p>Banks, telecom companies and insurers email password-protected PDFs. That's good for security, but annoying when you need to merge statements or upload them to a loan portal. If you know the password, you can save an unlocked copy.</p>
<h2>How to unlock</h2>
<ol><li>Open <a href="/unlock-pdf">Unlock PDF</a> and select the file.</li><li>Enter the password when asked. It's used only on your device.</li><li>Click <strong>Unlock PDF</strong> and download the copy without a password.</li></ol>
${T("unlock-pdf", "Unlock PDF")}
<h2>Common statement passwords</h2>
<p>Most Indian banks and card issuers use a combination of your name and date of birth, or customer ID — for example the first four letters of your name in capitals plus DDMM of your birth date. The exact rule is always mentioned in the email that came with the statement.</p>
<h2>What we can't do</h2>
<p>We don't crack passwords. If a PDF needs a password to open and you don't know it, ask the sender.</p>
<h2>Keep unlocked copies safe</h2>
<p>An unlocked statement contains sensitive data. Store it securely, and if you need to share it, use <a href="/redact-pdf">Redact PDF</a> to remove account numbers or <a href="/protect-pdf">Protect PDF</a> to add your own password.</p>`,
  },
  {
    slug: "why-pdf-formatting-breaksand-how-to-fix-it-for-your-resume", tool: "word-to-pdf", date: "2026-11-16",
    title: "Why PDF Formatting Breaks (and How to Fix It for Your Resume)",
    description: "Misaligned columns, wrong fonts, unreadable text for ATS — why resume PDFs break and the exact fixes that make them look right and parse correctly.",
    body: `
<p>A resume PDF can fail in two ways: it <em>looks</em> wrong to a human, or it <em>reads</em> wrong to an applicant tracking system (ATS). Here's how to fix both.</p>
<h2>Looks wrong: fonts and layout</h2>
<ul><li><strong>Font substitution</strong> — use widely available fonts (Calibri, Arial, Garamond). Our <a href="/word-to-pdf">Word to PDF</a> converter has metric-compatible Microsoft fonts so lines don't reflow.</li><li><strong>Two-column layouts built with spaces or tabs</strong> break easily. Use a proper table or columns feature.</li><li><strong>Icons from icon fonts</strong> may show as boxes. Use simple text labels.</li></ul>
<h2>Reads wrong: ATS parsing</h2>
<ul><li>Text inside images or scanned pages can't be read. Test by selecting text in the PDF.</li><li>Headers and footers are sometimes skipped — keep contact details in the main body.</li><li>Unusual headings ("My Journey") confuse parsers. Use "Experience", "Education", "Skills".</li></ul>
<h2>The 2-minute test</h2>
<ol><li>Open the PDF and press Ctrl+A to select all text, then paste it into Notepad.</li><li>If the order makes sense and nothing is missing, ATS will read it too.</li><li>If text is missing, recreate the PDF from Word rather than printing to image.</li></ol>
<p>Also see: <a href="/blog/pdf-vs-docx-which-format-should-a-job-applicant-send">PDF vs DOCX for job applications</a>.</p>
${T("word-to-pdf", "Word to PDF")}`,
  },
  {
    slug: "delete-unwanted-pages-from-a-pdf-free-online-tool-guide", tool: "remove-pages", date: "2026-11-16",
    title: "Delete Unwanted Pages from a PDF: Free Online Tool Guide",
    description: "Remove blank, duplicate or unneeded pages from a PDF in seconds — free, visual and private. Includes the odd/even trick for double-sided scans.",
    body: `
<p>Blank backs from double-sided scanning, duplicate pages, or instructions a portal doesn't need — deleting them makes your PDF cleaner and smaller.</p>
<h2>How to delete pages</h2>
<ol><li>Open the <a href="/remove-pages">PDF page remover</a> and select your file.</li><li>Click each page you want to delete — it turns red. Or type numbers like <code>2, 5-7</code>.</li><li>Click <strong>Remove pages</strong> and download.</li></ol>
${T("remove-pages", "Remove Pages")}
<h2>The double-sided scan trick</h2>
<p>If every second page is blank, click <strong>Even pages</strong> to select pages 2, 4, 6… in one go.</p>
<h2>Need the opposite?</h2>
<p>If you want to keep only a few pages, <a href="/extract-pages">Extract Pages</a> is faster. To reorder pages as well, use <a href="/organize-pdf">Organize PDF</a>.</p>
<h2>Does deleting pages shrink the file?</h2>
<p>Yes — images and fonts used only by deleted pages are removed. For a bigger reduction, follow up with <a href="/compress-pdf">Compress PDF</a>.</p>`,
  },
  {
    slug: "convert-jpg-images-into-a-single-pdf-free-fast-online", tool: "jpg-to-pdf", date: "2026-11-16",
    title: "Convert JPG Images into a Single PDF (Free, Fast, Online)",
    description: "Combine multiple photos into one PDF — reorder, rotate, choose A4 size — free with no upload. Works with JPG, PNG, WEBP and iPhone HEIC.",
    body: `
<p>Photos of certificates, receipts or handwritten notes are easier to share as one PDF. Here's how.</p>
<h2>Steps</h2>
<ol><li>Open <a href="/jpg-to-pdf">JPG to PDF</a> and select all your images.</li><li>Drag to reorder; tap ⟳ to rotate any sideways photo.</li><li>Pick A4 for printing or "Same as image" to keep the original size.</li><li>Click <strong>Convert to PDF</strong>.</li></ol>
${T("jpg-to-pdf", "JPG to PDF")}
<h2>Quality and size</h2>
<p>JPG photos are embedded exactly as they are — no re-compression — so quality is identical. Phone photos are large (3–5 MB each), so if you need a small file, compress afterwards with an exact KB target.</p>
<h2>Photos of documents?</h2>
<p>Use <a href="/scan-to-pdf">Scan to PDF</a> instead: it removes shadows and whitens the paper so photos look like real scans.</p>`,
  },
  {
    slug: "merge-vs-split-pdf-when-to-use-each", tool: "split-pdf", date: "2026-08-12", updated: "2026-11-16",
    title: "Merge or Split? Choosing the Right PDF Operation",
    description: "Merge, split, extract, remove or organize — which PDF tool do you actually need? A quick decision guide with examples.",
    body: `
<p>PDF tools overlap. Pick the right one in seconds:</p>
<ul>
<li><strong>Several files → one file:</strong> <a href="/merge-pdf">Merge PDF</a>.</li>
<li><strong>One file → several files:</strong> <a href="/split-pdf">Split PDF</a> (by ranges, every N pages or every page).</li>
<li><strong>One file → a smaller file with chosen pages:</strong> <a href="/extract-pages">Extract Pages</a>.</li>
<li><strong>Drop a few pages:</strong> <a href="/remove-pages">Remove Pages</a>.</li>
<li><strong>Reorder, rotate and delete together:</strong> <a href="/organize-pdf">Organize PDF</a>.</li>
</ul>
<h2>Examples</h2>
<ul><li><em>Exam form needs marksheet and certificate as one upload</em> → Merge.</li><li><em>Scanned bundle contains five certificates</em> → Split by ranges.</li><li><em>You only need page 3 of a 40-page report</em> → Extract.</li><li><em>Scanner added blank backs</em> → Remove (even pages).</li></ul>
<p>All of these run on your device and are lossless — no quality is lost.</p>
${T("merge-pdf", "Merge PDF")}`,
  },
  {
    slug: "compress-pdf-without-losing-quality", tool: "compress-pdf", date: "2026-08-15", updated: "2026-11-16",
    title: "How to Compress a PDF Without Wrecking the Quality",
    description: "Shrink PDFs for email and upload limits while keeping text sharp. Why scans compress most, which level to choose, and how to hit an exact KB size.",
    body: `
<p>A good compressor shrinks images, not text. Here's how to get the smallest file that still looks right.</p>
<h2>Why some PDFs are huge</h2>
<p>Almost all PDF weight is <strong>images</strong>: scanned pages, photos and screenshots. A page scanned at 600 DPI in colour can be 2–5 MB on its own. Text and vector graphics are tiny.</p>
<h2>Choose the right mode</h2>
<ul><li><strong>Recommended</strong> — images around 150 DPI. Looks the same on screen; ideal for email.</li><li><strong>Less</strong> — around 220 DPI. Good for printing.</li><li><strong>Extreme</strong> — around 96 DPI. Smallest; images look softer.</li><li><strong>Exact size</strong> — enter the limit (e.g. 200 KB). We search for the sharpest settings that fit and show the final size.</li></ul>
${T("compress-pdf", "Compress PDF")}
<h2>How exact-size compression works</h2>
<p>We measure how your images respond to different resolutions and quality levels, predict the best combination, and verify it. If switching to grayscale lets us keep a much higher resolution (sharper text in scans), we do that — unless you tick "Keep colour".</p>
<h2>When a target is impossible</h2>
<p>A 30-page colour scan won't fit in 100 KB and stay readable. We'll tell you instead of handing you a blurry file. Remove unneeded pages or split the document.</p>
<h2>Text stays text</h2>
<p>Our compressor never turns text into an image, so it stays sharp at any zoom and remains searchable and copyable.</p>`,
  },
  {
    slug: "convert-a-webpage-to-pdf-in-your-browser-no-sign-up", tool: "html-to-pdf", date: "2026-11-16",
    title: "Convert a Web Page to PDF (No Sign-up)",
    description: "Save any web page as a clean PDF: paste the URL and download. Or use your browser's built-in Print to PDF. Both methods explained.",
    body: `
<p>Saving web pages as PDF is handy for receipts, results, articles and documentation you want offline.</p>
<h2>Method 1: Paste the URL</h2>
<ol><li>Open <a href="/html-to-pdf">HTML to PDF</a>.</li><li>Paste the page address and click <strong>Convert URL</strong>.</li><li>Download the PDF. Links stay clickable.</li></ol>
${T("html-to-pdf", "HTML to PDF")}
<p>We render the page with headless Chromium — the same engine as Google Chrome — so layout and fonts match what you see.</p>
<h2>Method 2: Your browser's Print to PDF</h2>
<p>For pages behind a login (bank, exam portal, email), our converter can't see them. Instead press <strong>Ctrl+P</strong> (or Share → Print on mobile) and choose <strong>Save as PDF</strong>. Turn on "Background graphics" for colours.</p>
<h2>Tips</h2>
<ul><li>Many news sites have a "print" view that removes ads — convert that URL.</li><li>Long pages become multi-page PDFs; use <a href="/remove-pages">Remove Pages</a> to trim.</li></ul>`,
  },
  {
    slug: "how-a-legal-assistant-can-embed-fonts-correctly-when-exporting-to-pdf", tool: "pdf-to-pdfa", date: "2026-08-20", updated: "2026-11-18",
    title: "How to Embed Fonts Correctly When Exporting to PDF (Legal Documents Guide)",
    description: "Make sure every font is embedded when you export a petition, affidavit or contract to PDF — Word settings, how to check, and how to fix 'font could not be embedded' errors.",
    body: `
<p>Court e-filing portals, registries and opposing counsel all expect a PDF that looks identical on every computer. The most common reason it doesn't is a <strong>font that wasn't embedded</strong>: the reader's computer substitutes another font, and line breaks, page numbers and paragraph references shift. Here's how a legal assistant (or anyone sending formal documents) can get it right every time.</p>
<h2>What "embedding a font" means</h2>
<p>A PDF can either carry the font data inside the file (embedded) or just name the font and hope the reader has it installed. Embedded fonts guarantee the same look everywhere. Most tools embed only the characters you used (an <em>embedded subset</em>), which keeps the file small and is perfectly acceptable for filing.</p>
<h2>Exporting from Microsoft Word</h2>
<ol>
<li>Use <strong>File → Save As → PDF</strong> (or <strong>File → Export → Create PDF/XPS</strong>) rather than a third-party "print to PDF" driver.</li>
<li>Click <strong>Options</strong> and tick <strong>ISO 19005-1 compliant (PDF/A)</strong>. PDF/A requires every font to be embedded, so Word will embed them or warn you.</li>
<li>Leave <em>Optimize for</em> on <strong>Standard</strong>, not <em>Minimum size</em>.</li>
<li>If you send the .docx itself to a colleague, also enable <strong>File → Options → Save → Embed fonts in the file</strong> so they see the same fonts before exporting.</li>
</ol>
<p>No Word? Our <a href="/word-to-pdf">Word to PDF converter</a> uses LibreOffice with metric-compatible versions of Calibri, Cambria, Arial and Times New Roman and embeds all fonts automatically.</p>
<h2>How to check that fonts are embedded</h2>
<ul>
<li>In Adobe Acrobat Reader: <strong>File → Properties → Fonts</strong>. Every font should say <em>(Embedded)</em> or <em>(Embedded Subset)</em>.</li>
<li>Any font listed without that label will be substituted on other computers — fix it before filing.</li>
</ul>
<h2>"The document was saved without PDF/X compliancy because a required font could not be embedded"</h2>
<p>This warning means a font's licence forbids embedding, or the font file is missing on your machine. Fixes, in order of preference:</p>
<ol>
<li>Switch that text to a standard font that allows embedding (Times New Roman, Arial, Calibri, Garamond, Georgia).</li>
<li>Reinstall the font from its original source — partially installed fonts often cause the error.</li>
<li>As a last resort, convert the finished PDF with <a href="/pdf-to-pdfa">PDF to PDF/A</a>, which embeds every font it can find and outlines the rest so the text still looks right.</li>
</ol>
${T("pdf-to-pdfa", "PDF to PDF/A")}
<h2>Checklist before you file</h2>
<ul>
<li>All fonts show as embedded in the Fonts tab.</li>
<li>Page count and paragraph numbering match your Word file.</li>
<li>Text is selectable (not a scanned image) — if it's a scan, run <a href="/ocr-pdf">OCR PDF</a> first.</li>
<li>File size is within the portal's limit — use <a href="/compress-pdf">Compress PDF</a> with an exact KB target.</li>
<li>Confidential details are properly removed with <a href="/redact-pdf">Redact PDF</a>, not just covered with black boxes.</li>
</ul>`,
  },
  {
    slug: "best-page-size-and-margin-settings-for-pdf-export", tool: "word-to-pdf", date: "2026-08-20", updated: "2026-11-18",
    title: "Best Page Size and Margin Settings for PDF Export (A4 vs Letter)",
    description: "Which page size and margins to use when exporting resumes, assignments, legal and official documents to PDF — A4 vs Letter, safe margins, and how to fix pages that print cut off.",
    body: `
<p>A PDF that looks fine on screen can still print with cut-off edges, get rejected by a portal, or shrink to an odd size on the reader's printer. Getting page size and margins right before you export avoids all three.</p>
<h2>A4 or Letter?</h2>
<ul>
<li><strong>A4 (210 × 297 mm)</strong> — the standard in India, Europe, and most of the world. Use it for documents you submit in India.</li>
<li><strong>US Letter (8.5 × 11 in)</strong> — used in the US and Canada. Use it for applications to employers or universities there.</li>
</ul>
<p>Word sometimes defaults to Letter even on Indian computers. Check <strong>Layout → Size</strong> before you export — a Letter page printed on A4 paper gets scaled down or loses its bottom edge.</p>
<h2>Safe margins</h2>
<ul>
<li><strong>Most documents:</strong> 2.54 cm (1 inch) on all sides — Word's "Normal" setting.</li>
<li><strong>Resumes:</strong> 1.27–2 cm works if you need space, but don't go below 1.27 cm (0.5 inch); many printers can't print that close to the edge.</li>
<li><strong>Bound or filed documents:</strong> add extra space on the binding side (a left or "gutter" margin of 3–4 cm) — always follow the specific court, university or office rules when they exist.</li>
</ul>
<h2>Export settings that keep the layout</h2>
<ol>
<li>Set the page size and margins first, then check page breaks in Print Preview.</li>
<li>Export with <strong>File → Save As → PDF</strong> and keep <em>Optimize for</em> on <strong>Standard</strong>.</li>
<li>Open the PDF and confirm the page size under <strong>File → Properties</strong> in your PDF reader.</li>
</ol>
<p>Converting without Word? <a href="/word-to-pdf">Word to PDF</a> keeps the page size and margins from your document exactly.</p>
${T("word-to-pdf", "Word to PDF")}
<h2>Fixing a PDF that's already wrong</h2>
<ul>
<li><strong>Too much white border?</strong> Trim it with <a href="/crop-pdf">Crop PDF</a> (auto-detect margins).</li>
<li><strong>Pages in the wrong orientation?</strong> Use <a href="/rotate-pdf">Rotate PDF</a>.</li>
<li><strong>Page numbers missing?</strong> Add them with <a href="/add-page-numbers">Add Page Numbers</a> — keep them inside the margin so they print.</li>
<li><strong>Fonts look different?</strong> See <a href="/blog/how-a-legal-assistant-can-embed-fonts-correctly-when-exporting-to-pdf">how to embed fonts correctly</a>.</li>
</ul>`,
  },
  {
    slug: "how-to-redact-confidential-info-in-a-pdf-before-sharing", tool: "redact-pdf", date: "2026-08-20", updated: "2026-11-18",
    title: "How to Redact Confidential Info in a PDF Before Sharing (the Right Way)",
    description: "Black boxes don't hide text — anyone can copy it out. How to truly redact Aadhaar, PAN, account numbers and names from a PDF, free, without uploading it anywhere.",
    body: `
<p>Drawing a black rectangle over text in Word, a PDF editor or a screenshot tool <strong>does not remove the text</strong>. The words are still in the file underneath — anyone can select, copy or search for them. Real redaction deletes the content itself.</p>
<h2>Redact a PDF in 4 steps</h2>
<ol>
<li>Open <a href="/redact-pdf">Redact PDF</a> and select your file. It opens on your device; nothing is uploaded.</li>
<li>Type the words or numbers to remove (every occurrence is found), use the quick finders, or draw boxes over signatures, photos and addresses.</li>
<li>Click <strong>Redact PDF</strong>. The text, images and drawings under each box are permanently removed from the page.</li>
<li>Download the redacted copy and share that one. Keep the original somewhere safe.</li>
</ol>
${T("redact-pdf", "Redact PDF")}
<h2>Test it before you send it</h2>
<ul>
<li>Press <strong>Ctrl+A</strong> (select all), copy, and paste into Notepad. The redacted words must not appear.</li>
<li>Use your PDF reader's search (<strong>Ctrl+F</strong>) for a redacted number. It should find nothing.</li>
</ul>
<h2>What people commonly forget</h2>
<ul>
<li><strong>Every occurrence</strong> — an account number can appear in the header, the table and the footer. Typing it as a search term catches all of them; drawn boxes cover only what you draw.</li>
<li><strong>Scanned pages</strong> — the redaction removes image pixels under the box too, so scans are covered.</li>
<li><strong>File name and title</strong> — rename "Ramesh_Kumar_Salary_Slip.pdf" before sending.</li>
<li><strong>Password-protected files</strong> — if it's your own statement, remove the password first with <a href="/unlock-pdf">Unlock PDF</a>, then redact.</li>
</ul>
<h2>Why do it in the browser?</h2>
<p>The documents you redact are by definition sensitive. Uploading them to an online service to hide information defeats the purpose. Our redaction runs locally with the MuPDF engine, so the unredacted file never leaves your device.</p>`,
  },
  {
    slug: "how-to-fill-and-flatten-a-pdf-form-for-your-job-application", tool: "edit-pdf", date: "2026-08-20", updated: "2026-11-18",
    title: "How to Fill and Flatten a PDF Form for Your Job Application",
    description: "Fill in a PDF application form — fillable or not — and flatten it so your answers can't be changed or lost when HR opens it. Free, in your browser.",
    body: `
<p>Job and exam application forms often come as PDFs. Some have fillable boxes, many don't. Either way, HR should receive a file where your answers are <strong>flat</strong> — part of the page itself, not editable fields that can go blank in some PDF viewers or be changed after you send it.</p>
<h2>Form without fillable boxes</h2>
<ol>
<li>Open <a href="/edit-pdf">Edit PDF</a> and select the form.</li>
<li>Choose <strong>Text</strong>, click on each blank and type. Drag to line it up.</li>
<li>Add your signature with <strong>Image</strong> (a photo of your signature) or draw it with <strong>Draw</strong> — or use <a href="/sign-pdf">Sign PDF</a>.</li>
<li>Click <strong>Save changes</strong>. Everything you add is drawn into the page, so the downloaded form is already flat.</li>
</ol>
${T("edit-pdf", "Edit PDF")}
<h2>Form with fillable boxes</h2>
<ol>
<li>Fill the fields in your browser's PDF viewer (Chrome or Edge) or Acrobat Reader.</li>
<li>To flatten, open the print dialog and choose <strong>Save as PDF</strong> (or <em>Microsoft Print to PDF</em>) as the printer. The new file contains your answers as page content, not fields.</li>
<li>Open the new file and check every answer is visible and nothing is editable.</li>
</ol>
<h2>Final checks before you upload</h2>
<ul>
<li><strong>Size limit?</strong> Use <a href="/compress-pdf">Compress PDF</a> with an exact KB target, or <a href="/exam-form-ready">Exam Form Ready</a> for government exam portals.</li>
<li><strong>Need to attach certificates?</strong> Combine them into one file with <a href="/merge-pdf">Merge PDF</a>.</li>
<li><strong>Extra instruction pages?</strong> Drop them with <a href="/remove-pages">Remove Pages</a> if the employer only wants the form.</li>
</ul>`,
  },
];

// Old URLs that are permanently redirected to the best matching page.
export const REDIRECTS = {
  "/blog/convert-word-to-pdf-without-losing-formatting-in-5-minutes": "/blog/convert-word-to-pdf-without-losing-formatting-fast-guide",
  "/blog/convert-pdf-pages-to-jpg-free-online-no-sign-up-needed": "/pdf-to-jpg",
  "/blog/convert-pdf-to-editable-word-free-online-guide-for-job-seekers": "/pdf-to-word",
  "/blog/make-a-scanned-pdf-searchable-with-free-ocr-in-your-browser": "/ocr-pdf",
  "/blog/combine-invoices-into-one-monthly-pdffree-no-sign-up": "/blog/how-to-merge-multiple-pdfs-into-one-file-free-fast",
  "/blog/compress-a-pdf-for-email-limits-without-losing-quality": "/blog/compress-pdf-without-losing-quality",
  "/blog/convert-pdf-to-pdfa-for-long-term-archiving-free-private-guide": "/pdf-to-pdfa",
  "/blog/extract-exact-pages-from-a-pdf-for-free-in-a-browser": "/extract-pages",
  "/blog/how-to-repair-a-corrupted-pdf-file-for-free-browser-only": "/repair-pdf",
  "/blog/prepare-a-resume-pdf-that-passes-ats-screening-in-10-steps": "/blog/why-pdf-formatting-breaksand-how-to-fix-it-for-your-resume",
  "/blog/how-to-convert-excel-spreadsheets-to-pdf-for-free": "/excel-to-pdf",
  "/blog/how-to-reduce-pdf-size-for-a-job-application-upload": "/blog/compress-pdf-without-losing-quality",
  "/blog/compare-two-pdf-versions-and-spot-changes-in-seconds": "/compare-pdf",
  "/blog/convert-powerpoint-slides-to-pdf-free-online-no-sign-up-100-private": "/powerpoint-to-pdf",
  "/blog/add-a-watermark-to-a-pdf-without-signing-up": "/watermark-pdf",
  "/blog/share-documents-securely-without-uploading-to-the-cloud": "/protect-pdf",
  "/blog/how-to-crop-pdf-margins-like-a-pro-quick-tutorial-for-accountants": "/crop-pdf",
  "/blog/how-to-reorder-and-rotate-pdf-pages-for-a-job-application": "/organize-pdf",
  "/blog/$slug": "/blog",
};
