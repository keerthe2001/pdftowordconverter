// Blog posts. Slugs preserved from URLs Google already indexed. Bodies are HTML.
const SERVER_TOOLS = ["word-to-pdf", "powerpoint-to-pdf", "excel-to-pdf", "html-to-pdf", "pdf-to-word", "pdf-to-powerpoint", "pdf-to-excel"];
const T = (slug, name) => `<div class="cta-box"><strong>Try it now:</strong> <a href="/${slug}">${name}</a> — free, no signup, ${SERVER_TOOLS.includes(slug) ? "and your file is deleted from our server right after conversion" : "and your file stays on your device"}.</div>`;

export const POSTS = [
  {
    slug: "self-attest-documents-online", tool: "sign-pdf", date: "2026-11-28",
    title: "How to Self-Attest Documents Online for Form Uploads",
    description: "Self-attest documents online for a job or admission portal: add \"Self-attested\", your signature and the date to a scan, then fit the KB limit. Free.",
    image: { src: "/images/blog/self-attest-documents-online/self-attested-copy-signature-date-example.webp", alt: "A sample marksheet from a fictional board with the words Self-attested, a signature and the date 28 Nov 2026 added below the marks table, shown with a zoomed-in view of that corner", width: 1200, height: 630 },
    body: `
<p>A recruitment or admission form asks you to upload "self-attested scanned copies" of your certificates, and you have no printer at home. You don't need one. You can self-attest documents online by adding the words "Self-attested", your own signature and the date to the scanned copy, then bringing the file to the size the portal allows.</p>
<p>This guide covers what self-attestation means, what two 2026 notifications ask for, the exact steps in our free tools, and the results of a test run on a made-up marksheet. Everything below happens in your browser, so your certificates are not uploaded to us.</p>

<h2>What a self-attested copy is</h2>
<p>Attesting a copy means signing it to confirm it is a true copy of the original. For years that signature had to come from a gazetted officer or notary. Self-attestation lets you sign your own copies instead, and the original is checked later if you are selected.</p>
<p>Government bodies have moved to this system in writing. The Ministry of External Affairs told passport offices in 2014 that applicants <a href="https://www.passportindia.gov.in/AppOnlineProject/pdf/Self_attestation_of_docs.pdf" rel="noopener">may submit self-attested copies</a> and produce originals at verification. Puducherry's <a href="https://www.py.gov.in/sites/default/files/arw24032015.pdf" rel="noopener">2015 government order</a> tells its departments to accept self-attestation in place of attestation by gazetted officers, and to ask for originals only from candidates who are finally selected.</p>
<p>Two things it is not:</p>
<ul>
<li><strong>Not a digital signature certificate (DSC) or Aadhaar eSign.</strong> Those are cryptographic. A self-attested copy is simply a copy with your visible signature on it.</li>
<li><strong>Not a replacement for the original.</strong> Keep the original certificate ready for document verification.</li>
</ul>

<h2>What portals actually ask for</h2>
<p>Rules differ by notification, so read yours first. Two 2026 examples show the details that trip people up:</p>
<ul>
<li>The <a href="https://recruitment.nic.in/DetailedSciB.pdf" rel="noopener">NIC Scientist-B advertisement (2026)</a> asks for "separate self-attested scanned copies" of documents such as the graduation certificate and GATE score card, in PDF format, between 10 KB and 500 KB each.</li>
<li>The Tamil Nadu Dr. M.G.R. Medical University's <a href="https://www.tnmgrmu.ac.in/wp-content/uploads/2026/02/EC-Instruction-UG.pdf" rel="noopener">online eligibility certificate instructions</a> ask for self-attested scanned copies at 70 KB to 150 KB per document.</li>
</ul>
<p>Notice three things. Each document is a separate file. There is a minimum size as well as a maximum, so squeezing a file too hard can get it rejected. And neither notice says how to sign, so a clean, legible signature on the scan is what matters. If your notification does give a format, such as "sign in ink and then scan", follow that instead of this guide.</p>

<h2>How to self-attest documents online, step by step</h2>
<ol>
<li><strong>Scan the original.</strong> Open <a href="/scan-to-pdf">Scan to PDF</a> on your phone, take a photo of the certificate (or choose one you already took) and keep <em>Scan enhancement</em> on <em>Document (clean &amp; sharp)</em>. For a two-sided document, add both photos so you get one PDF with two pages. Click <em>Create PDF</em> and download it.</li>
<li><strong>Get your signature ready.</strong> Sign on plain white paper with a dark pen and photograph it in good light. This keeps the signature on your copies the same as the one on your application.</li>
<li><strong>Open the scan in Sign PDF.</strong> Go to <a href="/sign-pdf">Sign PDF</a>, select the PDF, click <em>Create signature</em>, choose the <em>Upload</em> tab and pick the signature photo. Leave <em>Remove white background</em> ticked and click <em>Use signature</em>.</li>
<li><strong>Add the words and the date.</strong> Click <em>+ Name / text</em>. A box saying "Signed by:" appears; click into it and replace the text with <code>Self-attested</code>. Then click <em>+ Date</em>, which adds today's date in a form like "28 Nov 2026".</li>
<li><strong>Arrange the three items.</strong> Put them in a blank area, usually near the bottom: "Self-attested" on top, the signature below it and the date under that. Keep them off the printed text, photos and official seals. To move a text box, drag it by its dotted border, not by the letters (see the mistakes section).</li>
<li><strong>Repeat on every page.</strong> Use the › button above the preview to go to the next page. Click your signature thumbnail in the side panel to place it again, and add the text and date the same way.</li>
<li><strong>Save.</strong> Click <em>Sign PDF</em> and download the file.</li>
<li><strong>Fit the size limit.</strong> Open <a href="/exam-form-ready">Exam Form Ready</a>, choose <em>Custom size</em>, set <em>Type</em> to <em>PDF document</em> and enter the portal's minimum and maximum KB. Choose your signed PDF. It is compressed to fit the maximum if needed, and a list of ticks or crosses tells you whether it meets the range. <a href="/compress-pdf">Compress PDF</a> with <em>Exact size</em> also works when there is only a maximum.</li>
<li><strong>Check and rename.</strong> Open the final file, zoom in and read it as the reviewer would. Name it after the document (for example <code>class10-marksheet.pdf</code>) so you upload the right file into the right slot.</li>
</ol>
<figure><img src="/images/blog/self-attest-documents-online/sign-pdf-self-attested-text-signature-date.webp" alt="Sign PDF editor showing a fictional marksheet with three items placed below the marks table: the text Self-attested, an uploaded signature and the date 28 Nov 2026, with the Create signature, Name / text and Date buttons in the side panel" width="1200" height="936" loading="lazy" decoding="async"><figcaption>Steps 4 and 5: "Self-attested", the signature and the date placed in empty space below the marks table.</figcaption></figure>
${T("sign-pdf", "Sign PDF")}

<h2>Our test: a made-up marksheet from phone photo to upload</h2>
<p>We made a Class X marksheet for a fictional board and student, saved it as a 2480 × 3508 pixel JPG of about 390 KB to stand in for a phone photo, and ran it through the steps above. These are the file sizes we got:</p>
<ul>
<li><strong>Scan to PDF</strong> (A4, Document mode): 314 KB, one page.</li>
<li><strong>After Sign PDF</strong> with "Self-attested", the signature and the date: 342 KB.</li>
<li><strong>Exam Form Ready, Custom size, PDF 70–150 KB:</strong> 135.9 KB, with ticks for size, PDF format and file name.</li>
<li><strong>Compress PDF, Recommended:</strong> 122 KB.</li>
<li><strong>Compress PDF, Exact size 140 KB:</strong> 132 KB, with the scan turned grey. With <em>Keep colour</em> ticked it came to 136 KB in colour.</li>
<li><strong>Compress PDF, Exact size 60 KB:</strong> 60 KB and still readable when zoomed in.</li>
</ul>
<p>Two details from this test are worth knowing. The "Self-attested" text and the date are stored as real text, not as part of the photo, so they stayed blue and sharp even when the scan was compressed hard and turned grey. And the 60 KB file looked fine, but it would fail a 70–150 KB rule like the one above. Smaller is not always better.</p>
<figure><img src="/images/blog/self-attest-documents-online/exam-form-ready-custom-pdf-70-150-kb-check.webp" alt="Exam Form Ready custom size panel with Type set to PDF document, minimum 70 KB and maximum 150 KB, showing a result of 135.9 KB with green ticks for size, PDF format and file name" width="1200" height="560" loading="lazy" decoding="async"><figcaption>The signed test file checked against a 70–150 KB range in Exam Form Ready.</figcaption></figure>

<h2>When the portal wants JPG instead of PDF</h2>
<p>Some forms take only images. Do the signing in PDF as above, then open <a href="/pdf-to-jpg">PDF to JPG</a> and convert the signed file. At the default <em>Normal (150 DPI)</em> setting our test page came out as a 1241 × 1754 pixel JPG of 179 KB. If that is over the limit, try <em>Screen (96 DPI)</em>, which makes a smaller image, and check that the marks or grades are still readable. A multi-page document gives one JPG per page in a ZIP file.</p>

<h2>Common mistakes and how to fix them</h2>
<ul>
<li><strong>The text box will not move.</strong> Clicking on the letters puts you in typing mode. Drag the box by its dotted outline or the empty strip just below the words. You can also select the box and use the arrow keys.</li>
<li><strong>Everything lands on top of each other.</strong> New items appear in the middle of the part of the page you are looking at. Move each one into place before you add the next.</li>
<li><strong>Words in Hindi or another Indian script come out wrong.</strong> The text and date boxes use standard Latin fonts, which have no Devanagari, Tamil or other Indian letters. Type "Self-attested" in English. Your signature is an image, so it can be in any script.</li>
<li><strong>The file is now below the minimum.</strong> Compress less, or use Exam Form Ready, which only compresses as far as the maximum you enter. If even the uncompressed scan is under the minimum, scan again at better quality instead of padding a tiny file.</li>
<li><strong>The portal wanted separate files, but you have one PDF.</strong> If you scanned several certificates into one file, use <a href="/split-pdf">Split PDF</a> or <a href="/extract-pages">Extract Pages</a> to make one file per document, then check each against the size range.</li>
<li><strong>The upload still fails with a "valid PDF" error.</strong> Our guide to the <a href="/blog/please-upload-a-valid-pdf-file-error">"Please upload a valid PDF file" error</a> goes through the usual causes, including password-protected files.</li>
<li><strong>The certificate came with its own digital signature.</strong> Some certificates downloaded from official websites are digitally signed by the issuer. Changing the file can make PDF readers show that signature as no longer valid. Check whether your portal wants such certificates as they are, without your marks.</li>
</ul>

<h2>Frequently asked questions</h2>
<h3>Is a signature added on screen accepted as self-attestation?</h3>
<p>The notifications we checked ask for self-attested scanned copies but do not say how the signature must be put on. A scan carrying your signature, the words "Self-attested" and the date looks the same to a reviewer either way. If your notification asks for an ink signature on a printed copy, do that and scan it.</p>
<h3>Do I have to sign every page?</h3>
<p>Most instructions talk about documents, not pages. Signing each page is the safer choice, because it shows you vouch for the whole copy and not just its first page. It takes a minute in Sign PDF.</p>
<h3>Does self-attestation mean I never show the original?</h3>
<p>No. The passport circular and the Puducherry order linked above both say originals are checked later, at verification or after selection. Keep them ready.</p>
<h3>Is this the same as signing my application form?</h3>
<p>No. The signature image you upload with the form usually has its own pixel and KB rules. For those, use the exam presets or Custom size in Exam Form Ready. For signing other PDFs, such as offer letters, see our guide to <a href="/blog/sign-a-pdf-electronically-for-free-without-leaving-your-browser">signing a PDF in your browser</a>.</p>
`,
  },
  {
    slug: "copy-hindi-text-from-pdf", tool: "ocr-pdf", date: "2026-11-25",
    title: "Copy Hindi Text from PDF Without Garbled Letters",
    description: "Hindi text from a PDF pastes as gibberish? See why it happens and how to copy Hindi text from PDF files as clean Unicode with free in-browser OCR.",
    image: { src: "/images/blog/copy-hindi-text-from-pdf/copy-hindi-text-from-pdf-garbled-vs-fixed.webp", alt: "Side-by-side comparison: Hindi text copied straight from a test PDF comes out as a jumble of Devanagari, Latin letters and symbols, while the same lines after PDF to JPG, JPG to PDF and Hindi OCR read correctly", width: 1200, height: 630 },
    body: `
<p>You open a Hindi notice, circular or question paper, select a paragraph and paste it into Word or WhatsApp. What comes out is a mess: English letters mixed into the words, matras in the wrong place, odd symbols, or a string of Latin characters that looks nothing like Hindi. If you need to copy Hindi text from PDF files for a form, an assignment or a translation, retyping is not your only option.</p>
<p>This guide explains why the text breaks, how to tell which kind of problem your file has, and a free three-step route that gives you clean Unicode Hindi you can paste anywhere. We tested it on a made-up Hindi notice and the results are below.</p>
<h2>Why Hindi text breaks when you copy it</h2>
<p>A PDF does not store words the way a Word file does. It stores the shapes to draw on the page, plus, if the program that made it bothered, a map that says which letters those shapes stand for. Copying relies entirely on that map.</p>
<p>English survives this well because each letter is usually one shape. Devanagari is harder. One visible shape can stand for several letters (क्ष, त्र, श्र), and the ि matra is drawn before the consonant even though it is typed after it. When the map is missing or incomplete, your viewer guesses, and the guess is what you see in the pasted text.</p>
<p>There are three common situations:</p>
<ul>
<li><strong>A scanned page.</strong> The PDF is just a picture. You cannot select any text at all.</li>
<li><strong>A legacy font such as Kruti Dev.</strong> Many older Hindi documents were typed in fonts that, as <a href="https://en.wikipedia.org/wiki/Kruti_Dev" rel="noopener">Wikipedia's Kruti Dev article</a> puts it, map Devanagari glyphs onto ASCII character positions. The page looks like Hindi, but the stored characters are English keyboard codes, so pasting gives you mostly English letters and punctuation.</li>
<li><strong>A Unicode font with a broken map.</strong> The text pastes as Devanagari, but with missing or misplaced matras and stray Latin letters or symbols mixed in.</li>
</ul>
<h2>Our test: what happened to a made-up notice</h2>
<p>We wrote a short sample notice in Hindi (a heading and three short paragraphs, 72 words, for a fictional institute), made a PDF of it with a Unicode Devanagari font, and then removed the font's text map. That imitates the third situation above. On screen the page looked perfect. Copied out, the first line read <em>Kमूनासू=ना काüLनि8संdथाK</em> instead of <em>नमूना सूचना (काल्पनिक संस्थान)</em>.</p>
<p>Our first try was to run the file straight through <a href="/ocr-pdf">OCR PDF</a> with Hindi selected. That did not help, and the reason matters for anyone with the same problem. OCR PDF skips any page that already has a good amount of text in it, so it does not waste time on pages that are already searchable. A page with a broken text layer still counts as "has text", so the tool kept it as it was.</p>
<figure><img src="/images/blog/copy-hindi-text-from-pdf/ocr-pdf-page-already-had-text-kept-as-is.webp" alt="OCR PDF result screen reading Average recognition confidence 100%, 1 page(s) already had text and were kept as-is, with a ZIP of a PDF and a text file" width="1200" height="597" loading="lazy" decoding="async"><figcaption>Running OCR directly on the broken PDF: the page was skipped, so the text file still held the garbled text.</figcaption></figure>
<p>Note the "confidence 100%". That number covers only pages that were actually recognised. Here none were, so it tells you nothing. The line to look for is "already had text and were kept as-is".</p>
<p>The fix is to remove the bad text layer first by turning each page into a picture, then run OCR on the picture. Using the steps below, the text file we got back matched the original notice word for word: 72 of 72 words, including the conjuncts and matras. OCR PDF reported an average confidence of 94%.</p>
<h2>How to copy Hindi text from a PDF: step by step</h2>
<p>All three tools run in your browser, so the document is not uploaded to a server. That matters for anything with your name or roll number on it.</p>
<ol>
<li><strong>Turn the pages into images.</strong> Open <a href="/pdf-to-jpg">PDF to JPG</a>, select your PDF and set <em>Quality</em> to <em>Print (300 DPI)</em>. If you only need some pages, type them in the <em>Pages</em> box (for example <code>2-3</code>). Click <em>Convert to images</em> and download. One page gives a JPG; several pages give a ZIP, which you need to extract first.</li>
<li><strong>Put the images back into a PDF.</strong> Open <a href="/jpg-to-pdf">JPG to PDF</a>, select all the page images and check the thumbnails are in page order. Some file pickers can list <em>page-10</em> before <em>page-2</em>, so drag them or use the arrow buttons if needed. Click <em>Convert to PDF</em> and download. This new PDF has no text layer at all, only pictures of the pages.</li>
<li><strong>Run OCR in Hindi.</strong> Open <a href="/ocr-pdf">OCR PDF</a> and select the new PDF. Set <em>Document language</em> to <em>Hindi</em>. If the page mixes Hindi and English, choose <em>English</em> as the second language. Under <em>Output</em>, pick <em>Text file (.txt)</em> or <em>Both</em>, then click <em>Run OCR</em>. The first run downloads the Hindi language model; after that it is cached.</li>
<li><strong>Open the .txt file and copy.</strong> The text is standard Unicode Hindi, so it pastes correctly into Word, Google Docs, email or a web form. If you chose <em>Both</em>, you also get a searchable PDF. When we pulled the text out of that PDF, it matched as well.</li>
</ol>
<figure><img src="/images/blog/copy-hindi-text-from-pdf/pdf-to-jpg-print-300-dpi-setting.webp" alt="PDF to JPG tool with a Hindi notice PDF loaded, image format set to JPG and quality set to Print (300 DPI)" width="1200" height="478" loading="lazy" decoding="async"><figcaption>Step 1: choose Print (300 DPI) so the OCR gets sharp letters to read.</figcaption></figure>
<figure><img src="/images/blog/copy-hindi-text-from-pdf/ocr-pdf-hindi-language-settings.webp" alt="OCR PDF settings panel with Document language set to Hindi, second language None, output Both, and the Run OCR button" width="1200" height="691" loading="lazy" decoding="async"><figcaption>Step 3: the rebuilt PDF loaded in OCR PDF with Hindi chosen as the document language.</figcaption></figure>
${T("ocr-pdf", "OCR PDF")}
<h2>Which route fits your file?</h2>
<p>Select a line in the PDF, paste it into Notepad or a blank note, and look at what you get:</p>
<ul>
<li><strong>Nothing selects.</strong> It is a scan. Skip steps 1 and 2 and go straight to OCR PDF with Hindi selected. If the scan is crooked or dark, rescan it first; our guide to <a href="/blog/how-to-scan-documents-to-pdf-with-a-phone-no-app-no-scan-app-fees">scanning documents with a phone</a> shows how to get a clean page.</li>
<li><strong>Mostly English letters and punctuation.</strong> It is almost certainly a legacy font. A Kruti Dev to Unicode converter can turn the pasted text straight into Hindi, which is quick for a paragraph or two. The image-and-OCR route above works on these files too, because OCR reads what the page looks like, not the hidden codes.</li>
<li><strong>Hindi, but with broken matras and stray symbols.</strong> The text map is faulty. Use the three-step route.</li>
<li><strong>Clean Hindi.</strong> Nothing to fix. Copy away.</li>
</ul>
<h2>Common mistakes and how to fix them</h2>
<ul>
<li><strong>"Already had text and were kept as-is".</strong> You ran OCR on the original PDF. Do steps 1 and 2 first so there is no old text layer for the tool to keep.</li>
<li><strong>Hindi comes out as English nonsense.</strong> The document language was left on English, the default. Change it to Hindi and run it again.</li>
<li><strong>English words inside Hindi lines are wrong.</strong> Add English as the second language. For a page in Marathi, choose Marathi instead of Hindi; it uses the same script but its own language model.</li>
<li><strong>Blurry or wrong letters.</strong> Check that step 1 used 300 DPI. On our clean test page even 150 DPI gave the same result, but small print, stamps and photocopies need the extra sharpness. OCR PDF itself reads every page at 300 DPI, so a lower-resolution image only gives it less detail to work with.</li>
<li><strong>Pasted text shows empty boxes.</strong> The text is fine; the app you pasted into is using a font without Devanagari. Switch it to one that has it, such as Noto Sans Devanagari, or Nirmala UI or Mangal on Windows.</li>
<li><strong>Tables or columns come out as one long run of text.</strong> The text file keeps the words, not the layout. Copy one column or section at a time, or use the searchable PDF to find the part you need.</li>
<li><strong>The PDF asks for a password.</strong> The tools ask for it when you open the file. If you would rather remove it once, see our guide to <a href="/blog/remove-a-password-from-your-own-pdf-free-private-no-sign-up">removing a password from your own PDF</a>.</li>
</ul>
<h2>A checklist after you copy Hindi text from PDF files</h2>
<ol>
<li>Compare a few lines of the output with the PDF on screen, especially names, numbers and dates.</li>
<li>Watch for look-alike letters such as ब/व and the half letters in conjuncts. OCR can confuse them on poor scans.</li>
<li>For a long document, work in batches. Use <a href="/extract-pages">Extract Pages</a> or the <em>Pages</em> box so each run stays quick.</li>
<li>Keep the original PDF. The image-based copy is larger and is only a working file.</li>
</ol>
<h2>FAQ</h2>
<p><strong>Can I get the Hindi text into Word?</strong> Yes. Follow the steps, open the .txt file and paste it into Word. You will lose the original layout, but the text is real Unicode Hindi you can edit, search and spell-check. If the text in your PDF already copies cleanly, <a href="/pdf-to-word">PDF to Word</a> gives you an editable .docx directly. That converter runs on our server, and the file is deleted right after conversion.</p>
<p><strong>Does this work for Tamil, Telugu, Bengali or other Indian languages?</strong> The same problem happens in other scripts, and the same route works. OCR PDF supports Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia and Urdu as well as Hindi. Pick the matching language in step 3.</p>
<p><strong>Can it read handwritten Hindi?</strong> No. It is built for printed text.</p>
<p><strong>Is my document uploaded anywhere?</strong> No. PDF to JPG, JPG to PDF and OCR PDF all run on your device. Only the OCR language model is downloaded to your browser, once.</p>
<p><strong>Why not just tick the OCR option in PDF to Word?</strong> Both our OCR PDF tool and the OCR option in our PDF to Word converter skip pages that already have text, and other OCR tools may do the same. A PDF with a broken text layer gets passed through unchanged. Turning the pages into images first is what makes the OCR actually run.</p>
`,
  },
  {
    slug: "please-upload-a-valid-pdf-file-error", tool: "repair-pdf", date: "2026-11-22",
    title: "\"Please Upload a Valid PDF File\": Causes and Fixes",
    description: "Seeing \"Please upload a valid PDF file\" on an exam or job form? Work through five checks and fix each cause for free in your browser.",
    image: { src: "/images/blog/please-upload-a-valid-pdf-file-error/please-upload-a-valid-pdf-file-error-five-checks.webp", alt: "An example upload field showing the error Please upload a valid PDF file, next to a list of five checks for finding the cause", width: 1200, height: 630 },
    body: `
<p>You pick your certificate, the form thinks for a second, and then a red line appears: <strong>"Please upload a valid PDF file"</strong>. The file opens fine on your phone, it ends in .pdf, and the size looks right. So what is the portal complaining about?</p>
<p>The message is generic. Students have reported it on NTA forms such as JEE Main and NEET, and other online forms use similar wording. It can stand for several different problems, and the form rarely tells you which rule your file broke. This guide walks through the five causes worth checking, in the order that finds the problem fastest, with a free fix for each. We tested every fix on made-up sample files using the same code our tools run in your browser, and the results are below.</p>
<h2>What the portal is actually checking</h2>
<p>Upload checkers usually test a few things before they accept a document: the file type, the file size, and whether the file can be opened and read. Some also look at the file name. When any of these fails, many forms show the same "Please upload a valid PDF file" message. That is why the fix that worked for a friend may do nothing for you: your file may be failing a different check.</p>
<p>Before you start, open the form's instructions and write down three things for that upload field: the file type it wants (PDF or JPG), the minimum size and the maximum size. For NTA exams, these are in the information bulletin on the official site, such as <a href="https://jeemain.nta.nic.in/" rel="noopener">jeemain.nta.nic.in</a> for JEE Main. Our <a href="/exam-form-ready/neet">NEET page</a> lists the current NEET limits with their source.</p>
<h2>Check 1: Is it really a PDF?</h2>
<p>Renaming <em>photo.jpg</em> to <em>photo.pdf</em> changes the name, not the contents. Your phone may still open it, because the gallery or viewer looks inside the file and sees a picture. The portal looks inside too, finds no PDF and rejects it.</p>
<p>Two quick ways to tell:</p>
<ul>
<li><strong>On a computer:</strong> drag the file into a Chrome or Edge window. A real PDF opens in the PDF viewer with page controls. If you get an error instead, the file is not a working PDF.</li>
<li><strong>The first five characters:</strong> open the file in Notepad. A real PDF always starts with <code>%PDF-</code>. A JPG starts with a few odd symbols followed by <code>JFIF</code> or <code>Exif</code> instead.</li>
</ul>
<p>We tried this with a JPG image of a sample certificate renamed to .pdf. Our own tools refused it as well, with "This PDF appears damaged". Repair PDF cannot help here, because there is no PDF inside to repair.</p>
<p><strong>Fix:</strong> rename the file back to .jpg, then turn it into a real PDF with <a href="/jpg-to-pdf">JPG to PDF</a>. If the form has a size range, do it in <a href="/exam-form-ready">Exam Form Ready</a> instead (choose <em>Custom size</em>, then <em>PDF document</em>), because it also fits the result into your limits.</p>
<h2>Check 2: Is the size inside the range, at both ends?</h2>
<p>Most people check only the maximum. Many forms also set a minimum, such as 50 KB, and a file below it fails just like a file above the maximum. A certificate downloaded from a government website is often a small text PDF. Our sample certificate made that way was only 2.0 KB, far below a 50 KB minimum.</p>
<p>The other trap is what "KB" means. Windows File Explorer counts 1 KB as 1,024 bytes. Android phones (since Android 8) and Macs count 1 kB as 1,000 bytes, as the <a href="https://developer.android.com/reference/android/text/format/Formatter" rel="noopener">Android developer documentation</a> describes. A file of 300,500 bytes is about 293 KB on a Windows laptop and about 300 kB on an Android phone. If the portal counts in thousands, that file is over a 300 KB limit, even though your laptop says it fits. Stay a few KB inside both limits and you avoid the problem.</p>
<p><strong>Fix for a file that is too big:</strong> use <a href="/compress-pdf">Compress PDF</a> with <em>Exact size</em> and type the maximum. Our guide to <a href="/blog/compress-pdf-without-losing-quality">compressing without wrecking the quality</a> explains what it changes.</p>
<p><strong>Fix for a file that is too small:</strong> make the PDF from a clear photo or scan of the document instead. In our test, the 2.0 KB text certificate failed Exam Form Ready's size check. A 2000-pixel-wide image of the same certificate, standing in for a phone photo and loaded into the same custom PDF card with a 50–300 KB range, came out at 179.7 KB and passed. Exam Form Ready aims for a size that is acceptable whether the portal counts 1,000 or 1,024 bytes per KB. If the photo would come out above the maximum, it compresses the PDF to fit.</p>
<figure><img src="/images/blog/please-upload-a-valid-pdf-file-error/exam-form-ready-pdf-below-minimum-before-after.webp" alt="Exam Form Ready custom PDF check: a 2.0 KB file fails the 50 to 300 KB range, while the same certificate made from an image of the page passes at 179.7 KB" width="1200" height="630" loading="lazy" decoding="async"><figcaption>Our test with a made-up certificate: the text-only PDF is too small; the version made from an image of the page fits the 50–300 KB range.</figcaption></figure>
<p>There is a trade-off. A PDF made from a photo is a picture of the page, so its text can no longer be selected, and any digital signature in the original is gone (more on that below). For an upload that asks for a scanned copy, that is normally what the portal expects anyway. For a photo that is easy to read, follow our tips on <a href="/blog/how-to-scan-documents-to-pdf-with-a-phone-no-app-no-scan-app-fees">scanning documents with a phone</a>.</p>
${T("exam-form-ready", "Exam Form Ready")}
<h2>Check 3: Does it have a password or restrictions?</h2>
<p>Some documents are locked when you download them. The e-Aadhaar PDF from <a href="https://uidai.gov.in" rel="noopener">UIDAI</a> asks for a password, for example, and bank statements usually do too. Upload checkers generally cannot open a file that needs a password.</p>
<p>A quieter version of this problem is a PDF with <em>restrictions</em>. It opens without a password, but printing or copying is blocked, and the file is still encrypted inside. We made a sample like this: it opened normally in a viewer, yet a PDF library reported it as encrypted. A portal may treat such a file as unreadable without saying why. To spot one, open the file in a PDF viewer's document properties and look for a security or restrictions section.</p>
<p><strong>Fix:</strong> open <a href="/unlock-pdf">Unlock PDF</a>. For a restricted file, no password is needed. For a password-protected file, type the password you already have. In our test, the unlocked copies of both samples were no longer encrypted. If you are unsure of the password rule, our guide to <a href="/blog/remove-a-password-from-your-own-pdf-free-private-no-sign-up">removing a password from your own PDF</a> covers the usual mistakes.</p>
<h2>Check 4: Is the file damaged or half-downloaded?</h2>
<p>A download that stopped early, a file passed through several apps, or a program that saved it badly can all leave a PDF that phone viewers still open but strict checkers reject.</p>
<p>We damaged copies of a one-page scanned sample in three ways and ran each through <a href="/repair-pdf">Repair PDF</a>:</p>
<ol>
<li><strong>Last 40 bytes cut off</strong> (the end-of-file markers were missing): repaired, and the page was recovered.</li>
<li><strong>Extra text added before the PDF data</strong> (so the file no longer started with <code>%PDF-</code>): repaired, and the new file started with <code>%PDF-</code> again.</li>
<li><strong>The last 20% of the file missing:</strong> nothing to recover, because the page itself had been cut. The only fix was the original file.</li>
</ol>
<figure><img src="/images/blog/please-upload-a-valid-pdf-file-error/repair-pdf-damaged-certificate-recovered.webp" alt="Repair PDF result screen showing a damaged sample certificate repaired, with 1 page recovered and a Download PDF button" width="1200" height="530" loading="lazy" decoding="async"><figcaption>Repair PDF on our sample with its ending cut off: the page was recovered.</figcaption></figure>
<p><strong>Fix:</strong> download the document again from its original source first, ideally on the same device you will upload from. If it still fails, run it through Repair PDF and upload the repaired copy.</p>
${T("repair-pdf", "Repair PDF")}
<h2>Check 5: The file name and how you pick the file</h2>
<p>Names like <em>certificate.pdf.pdf</em> (which can happen when an app adds the extension a second time), names with symbols such as # % &amp; or emoji, and very long names can trip up some forms. Rename the file to something short and plain, such as <em>category_certificate.pdf</em>, using only letters, numbers and underscores. If the bulletin gives a required file name, use exactly that.</p>
<p>On a phone, choose the file from the Downloads or Files folder rather than from inside a chat or cloud app. If you have only ever opened it from a chat, save it to the phone first.</p>
<h2>A note on digitally signed certificates</h2>
<p>Many certificates issued online carry a digital signature, which a viewer shows as a signature panel or a green tick. That signature protects the exact bytes of the file. Any tool that rewrites the file, whether to compress, unlock or repair it, breaks the signature check.</p>
<p>We tested this. We signed a sample PDF with a test certificate and checked it with pyHanko, an open-source signature checker: the signature was intact. After running copies through our compress, repair and lossless-optimise code, every copy failed the same check. The page was still there; only the proof that the file is unchanged since signing was lost.</p>
<p>So if a portal accepts your signed certificate as it is, upload the original. If you have to change it to meet a size or format rule, upload the changed copy as the form asks, and keep the untouched original safe. Bring a printout or the original file for document verification.</p>
<h2>Work through it in this order</h2>
<ol>
<li>Note the field's file type and size range from the instructions.</li>
<li>Confirm the file is a real PDF. If it is a renamed photo, convert it properly.</li>
<li>Check the size against both limits, leaving a few KB of margin.</li>
<li>Remove any password or restrictions with Unlock PDF.</li>
<li>Re-download it, or run Repair PDF if it still fails.</li>
<li>Rename it to a short, plain name and pick it from your Downloads folder.</li>
</ol>
<h2>If it still won't upload</h2>
<ul>
<li><strong>Try another browser or a computer.</strong> If you are on a phone, a laptop with Chrome or Edge rules out problems with the phone's file picker.</li>
<li><strong>Check you are in the right field.</strong> A form may want a JPG in one box and a PDF in the next. A correct PDF in a JPG-only box fails too.</li>
<li><strong>Check page rules.</strong> If the instructions ask for one page or a specific document, upload only that. <a href="/extract-pages">Extract Pages</a> can pull a single page out of a longer file.</li>
<li><strong>Contact the helpdesk early.</strong> If nothing works, email or call the helpline listed in the bulletin, with a screenshot of the error. Do this days before the deadline, not hours.</li>
</ul>
<h2>FAQ</h2>
<p><strong>Why does the file open on my phone but fail on the form?</strong> Phone viewers are forgiving: they can open a picture with a .pdf name and skip over small errors in the file. Upload checkers are strict. Run through the five checks above.</p>
<p><strong>How do I make a PDF bigger than the minimum size?</strong> Make it from a clear photo or scan of the document in Exam Form Ready with your size range entered. A picture-based PDF is naturally larger than a text-only one.</p>
<p><strong>Does compressing remove the digital signature?</strong> It breaks it. The text and layout stay, but the signature check fails afterwards, as our test showed. Keep the original.</p>
<p><strong>Are my documents uploaded to your server?</strong> No. Exam Form Ready, Repair PDF, Unlock PDF, Compress PDF and JPG to PDF all run in your browser, so the file stays on your device.</p>
<p><strong>Will these fixes work for every portal?</strong> They cover the common causes, but each portal sets its own rules and none of them publishes its checking code. Always follow the instructions for your form first.</p>
`,
  },
  {
    slug: "convert-bank-statement-pdf-to-excel", tool: "pdf-to-excel", date: "2026-11-19",
    title: "Bank Statement PDF to Excel: Convert, Clean Up and Check",
    description: "Turn a bank statement PDF into an Excel sheet for free: unlock it, convert it, join the page sheets and check that the closing balance still adds up.",
    image: { src: "/images/blog/convert-bank-statement-pdf-to-excel/bank-statement-pdf-to-excel-hero.webp", alt: "A sample bank statement PDF with four transactions next to the same rows in an Excel sheet", width: 1200, height: 630 },
    body: `
<p>Copying transactions out of a statement by hand is slow and easy to get wrong. Converting the <strong>bank statement PDF to Excel</strong> gives you rows you can sort, filter and total, whether you are tracking expenses, preparing figures for your tax return or sending a loan agent a summary. The conversion itself takes a minute. What needs more care comes after: joining the pages, fixing the columns that come out as text, and proving that no transaction went missing.</p>
<p>This guide uses our free <a href="/pdf-to-excel">PDF to Excel</a> converter. We tested it on a made-up four-page statement with 60 transactions, and the results below come from that test.</p>
<h2>Before you start: three quick checks</h2>
<ul>
<li><strong>Is it password-protected?</strong> Statements sent by email often are. The converter cannot open a locked file, so you will see "Conversion failed. The file may be damaged or password-protected." Remove the password first (step 1 below). You need to know the password; nothing can skip that.</li>
<li><strong>Can you select the text?</strong> Open the PDF and try to highlight a narration with your mouse. If you can, it is a text PDF and converts well. If the whole page highlights like a picture, it is a scan. Run <a href="/ocr-pdf">OCR PDF</a> on it first, and expect more cleanup afterwards.</li>
<li><strong>Does the table have grid lines?</strong> Look for lines between the rows and columns. This one detail decides how clean your Excel file will be, as the test further down shows.</li>
</ul>
<h2>Convert a bank statement PDF to Excel in 4 steps</h2>
<ol>
<li><strong>Unlock the statement.</strong> Open <a href="/unlock-pdf">Unlock PDF</a>, select the file, type the password and download the unlocked copy. This step runs in your browser, so the password is not sent anywhere. Our guide to <a href="/blog/remove-a-password-from-your-own-pdf-free-private-no-sign-up">removing a password from your own PDF</a> has more detail.</li>
<li><strong>Optional: put several months together.</strong> If you need a full year, combine the unlocked monthly files with <a href="/merge-pdf">Merge PDF</a> so you convert once instead of twelve times. Keep the result under 20 MB, which is the converter's upload limit.</li>
<li><strong>Convert.</strong> Open <a href="/pdf-to-excel">PDF to Excel</a>, select the unlocked file and click <strong>Convert to Excel</strong>. The converter runs on a free server that sleeps when idle, so the first conversion can take 30 to 60 seconds while it wakes up.</li>
<li><strong>Download the .xlsx file</strong> and open it in Excel, Google Sheets or LibreOffice Calc.</li>
</ol>
<figure><img src="/images/blog/convert-bank-statement-pdf-to-excel/pdf-to-excel-tool-with-sample-statement.webp" alt="The PDF to Excel tool with a sample bank statement selected and the Convert to Excel button" width="1200" height="630" loading="lazy" decoding="async"><figcaption>The PDF to Excel tool with our made-up sample statement loaded.</figcaption></figure>
<div class="cta-box"><strong>Try it now:</strong> <a href="/pdf-to-excel">PDF to Excel</a> — free, no signup. The file is converted on our server and deleted right after.</div>
<h2>What you get: one sheet per page</h2>
<p>The converter looks for tables on every page. It tries ruled tables (ones drawn with lines) first and falls back to text alignment when it finds none. Each table it finds becomes its own sheet, named like <em>Page 1 Table 1</em>, with the first row in bold.</p>
<p>A few details matter for statements:</p>
<ul>
<li>Amounts such as <code>1,25,000.00</code> are stored as real numbers. Commas, the ₹ sign and "Rs." are removed first, so Indian digit grouping is not a problem.</li>
<li>Anything with letters attached stays as text. A balance written as <code>47,470.75 Cr</code> will not add up until you fix it (see the cleanup section).</li>
<li>Whole numbers that start with 0, like some account or cheque numbers, are kept as text so the leading zero is not lost.</li>
<li>Long narrations that wrap onto two or three lines inside one table cell stay in one Excel cell, with line breaks.</li>
<li>If no table is found anywhere, you get a single sheet called <em>Text</em> listing every line of the PDF with its page number. That usually means the PDF is a scan, or it has no table structure the converter can read.</li>
</ul>
<h2>Our test: grid lines make the difference</h2>
<p>We created a fictional statement for "Example Bank" with 60 UPI, NEFT and ATM entries over four pages, then made two versions: one with grid lines around every cell and one without any lines. Both went through the same conversion code the site uses.</p>
<ul>
<li><strong>With grid lines:</strong> 4 sheets and 64 rows, which is exactly 60 transactions plus the repeated header on each page. Every withdrawal and deposit came out as a number, and the account details printed above the table were not mixed in.</li>
<li><strong>Without grid lines:</strong> 194 rows for the same 60 transactions. Each wrapped narration spilled into one or two extra rows, the column headings were split across three rows, and the account details at the top of page 1 ended up inside the first sheet.</li>
</ul>
<figure><img src="/images/blog/convert-bank-statement-pdf-to-excel/ruled-vs-unruled-statement-excel-output.webp" alt="Excel output from the same sample statement with grid lines and without grid lines, showing split rows in the second version" width="1200" height="722" loading="lazy" decoding="async"><figcaption>Same data, different layout: the statement with grid lines gives one row per transaction.</figcaption></figure>
<p>If your statement has no grid lines, check whether your net banking offers the statement as an Excel or CSV download. When that option exists it is cleaner than converting any PDF. If it does not, convert anyway and expect to join the split narration rows by hand, or test a single page first with <a href="/extract-pages">Extract Pages</a> to see what you are dealing with.</p>
<h2>Clean up the sheet in Excel</h2>
<p>These steps assume the layout from our test: Date in column A, Narration in B, reference number in C, withdrawals in D, deposits in E and balance in F. Adjust the letters to match your file.</p>
<ol>
<li><strong>Put all pages on one sheet.</strong> Add a new sheet and paste the rows from each page sheet below one another. Then filter column A, tick only "Date" (the repeated heading), delete those rows and clear the filter. Put one heading row back at the top.</li>
<li><strong>Turn the balance into a number.</strong> In G2, enter <code style="overflow-wrap:anywhere">=IF(RIGHT(F2,2)="Dr",-1,1)*VALUE(TRIM(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(F2,"Cr",""),"Dr",""),",","")))</code> and fill it down. Credit balances become positive and debit balances negative.</li>
<li><strong>Fix text dates.</strong> If the dates sit on the left of the cell, Excel is treating them as text. For a DD-MM-YYYY date, <code style="overflow-wrap:anywhere">=DATE(RIGHT(A2,4),MID(A2,4,2),LEFT(A2,2))</code> gives a real date you can sort by month.</li>
<li><strong>Flatten the narration.</strong> <code style="overflow-wrap:anywhere">=SUBSTITUTE(B2,CHAR(10)," ")</code> replaces the line breaks with spaces. Where the bank's PDF broke a word in the middle, you will see a stray space, such as "Paym ent", but names and UPI IDs stay searchable.</li>
<li><strong>Show reference numbers in full.</strong> UPI references are 12 digits, and Excel's General format switches to exponential notation (like 4.87595E+11) for numbers with 12 or more digits, according to <a href="https://support.microsoft.com/en-us/Excel/display-numbers-in-scientific-exponential-notation" rel="noopener">Microsoft's guide</a>. Select the column, open Format Cells, choose Number and set 0 decimal places. The digits are not lost, since Excel keeps up to 15.</li>
</ol>
<figure><img src="/images/blog/convert-bank-statement-pdf-to-excel/statement-cleanup-formulas-balance-check.webp" alt="Combined statement sheet with formula columns for balance and date, plus a balance check showing TRUE" width="1200" height="441" loading="lazy" decoding="async"><figcaption>The cleaned sample sheet. The balance check confirms all 60 rows are present.</figcaption></figure>
<h2>Check that nothing went missing</h2>
<p>A converted statement looks complete even when a row has dropped out, so do this check every time. It takes two minutes:</p>
<ol>
<li>Type the opening balance from the PDF into a spare cell.</li>
<li>Add the total deposits and subtract the total withdrawals: <code style="overflow-wrap:anywhere">=opening+SUM(E2:E61)-SUM(D2:D61)</code>, using your own last row.</li>
<li>Compare the result with the closing balance printed on the statement, or with the last value in your balance column.</li>
<li>Run <code style="overflow-wrap:anywhere">=COUNT(D2:D61)+COUNT(E2:E61)</code>. On a statement where each row is either a withdrawal or a deposit, this should equal the number of transactions.</li>
</ol>
<p>In our test, opening balance ₹48,250.75 plus ₹91,298.00 in deposits minus ₹37,991.00 in withdrawals gave ₹1,01,557.75, which matched the closing balance, and the count came to 60. If your numbers do not match, the usual cause is an amount stored as text, because SUM skips text cells. Look for cells that sit on the left, or that carry a "Dr", "Cr" or bracket.</p>
<h2>Common problems and fixes</h2>
<ul>
<li><strong>"Conversion failed" straight away:</strong> the file is almost always still password-protected. Unlock it first and convert the unlocked copy.</li>
<li><strong>"File too large":</strong> the limit is 20 MB. Convert fewer months at a time, or split the file with <a href="/split-pdf">Split PDF</a>.</li>
<li><strong>Only a "Text" sheet:</strong> no table was detected. If the statement is a scan, run OCR PDF first.</li>
<li><strong>Narrations spread over several rows:</strong> the statement has no grid lines. Join the pieces by hand, or look for an Excel or CSV download from your bank.</li>
<li><strong>Totals look too small:</strong> some amounts are text. Find them with the COUNT check above.</li>
</ul>
<h2>Privacy: what happens to your statement</h2>
<p>Unlock PDF, Merge PDF, Extract Pages and OCR PDF all run in your browser. PDF to Excel is different: the file is uploaded to our conversion server, processed in a temporary folder and deleted as soon as the Excel file is sent back. If you would rather not upload your account number at all, remove the account details at the top of the first page with <a href="/redact-pdf">Redact PDF</a> before converting. In our test, the version with grid lines left the account details out of the Excel file anyway, but the version without grid lines included them.</p>
${T("unlock-pdf", "Unlock PDF")}
<h2>FAQ</h2>
<p><strong>Is it free?</strong> Yes. There is no signup and no watermark on the Excel file.</p>
<p><strong>Will it work with my bank?</strong> The converter does not use bank-specific templates. It reads the table layout, so what matters is whether the statement is a text PDF and whether it has grid lines. Try one page first if you are unsure.</p>
<p><strong>Can I convert a credit card statement the same way?</strong> Usually, yes. The same steps work for any statement laid out as a table, as long as it is a text PDF rather than a scan.</p>
<p><strong>Why are there several sheets?</strong> Each table on each page becomes its own sheet. Combine them as shown in the cleanup section.</p>`,
  },
  {
    slug: "how-to-merge-multiple-pdfs-into-one-file-free-fast", tool: "merge-pdf", date: "2026-11-16", updated: "2026-11-20",
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
<h2>Before you merge: a two-minute check</h2>
<p>Merging copies pages exactly, which is good for quality but also means every flaw in the source files ends up in the final PDF. Fix these first, while the documents are still separate and easy to handle:</p>
<ul>
<li><strong>Open each file once.</strong> If one won't open on your own device, it won't merge cleanly either. A file that shows a "damaged" error can usually be fixed with <a href="/repair-pdf">Repair PDF</a>.</li>
<li><strong>Know your passwords.</strong> Bank statements, salary slips and e-Aadhaar downloads are often locked. Keep the password handy before you start.</li>
<li><strong>Finish any fillable forms.</strong> If one of the files is a form you still have to fill, complete it and flatten it first. Our guide to <a href="/blog/how-to-fill-and-flatten-a-pdf-form-for-your-job-application">filling and flattening a PDF form</a> walks through it.</li>
<li><strong>Read the portal's instructions for that field.</strong> Note the order it lists, the maximum size, and whether it wants one PDF for everything or one PDF per document type. If it is the second case, you may not need to merge at all.</li>
</ul>
<h2>A worked example: one PDF for a job application</h2>
<p>Say a recruitment portal has a single "Supporting documents" field and asks for, in this order: resume, degree certificate, experience letter and ID proof. You have four files on your laptop with messy names like <em>Resume_final_v3.pdf</em>, <em>scan0012.pdf</em>, <em>letter.pdf</em> and <em>aadhaar.pdf</em>.</p>
<ol>
<li>Rename them with a number at the front: <em>1 resume.pdf</em>, <em>2 degree.pdf</em>, <em>3 experience.pdf</em>, <em>4 id.pdf</em>.</li>
<li>Select all four in Merge PDF. Each card shows a preview of the first page, the page count and the file size, so you can spot the wrong file before it goes in.</li>
<li>Click <strong>Sort A→Z</strong>. The sort reads numbers the way people do, so <em>2 degree</em> comes before <em>10 annexure</em> if you ever have that many files.</li>
<li>Click <strong>Merge PDF</strong>. The result screen reports how many pages were combined from how many files, and the total size of the originals. If your files add up to five pages, that line should say five.</li>
<li>Tap <strong>Open preview</strong> and scroll through once. This is the moment to catch a sideways page or a missing certificate, not after you've submitted.</li>
</ol>
<p>Numbering the files takes a minute and saves you from dragging cards around, especially when you redo the bundle later for another application.</p>
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
<h2>After the merge: what to do next</h2>
<p>The result screen has a "Continue with this file" row, so you don't need to download and re-select the merged PDF to keep working on it. The options there are:</p>
<ul>
<li><strong>Compress PDF</strong> — for portal size limits. Expect the merged file to be roughly the combined size of your originals, so four 400 KB scans will not come out as 200 KB without compression.</li>
<li><strong>Add Page Numbers</strong> — useful for long bundles such as tender documents or a case file, where someone may refer to "page 14".</li>
<li><strong>Organize PDF</strong> — if the preview shows one page in the wrong spot, drag it into place here rather than merging again.</li>
<li><strong>Protect PDF</strong> — if you're emailing the bundle and want it to need a password to open.</li>
</ul>
<h2>When the merge doesn't go as planned</h2>
<ul>
<li><strong>"Add at least two PDF files to merge."</strong> Merge needs a minimum of two files. If you have only one PDF and some photos, convert the photos to PDF first.</li>
<li><strong>You forgot a file.</strong> Use the <strong>+ Add more files</strong> button. Dropping new files onto the workspace starts a fresh list instead of adding to the current one.</li>
<li><strong>A wrong file got in.</strong> Click the ✕ on its card to take it out. Nothing is lost; your original files are never changed.</li>
<li><strong>Dragging doesn't work on your phone.</strong> Use the ← and → arrows under each card to move a file one place left or right. They do the same job and are easier to hit with a thumb.</li>
<li><strong>"This PDF appears damaged."</strong> Run that one file through <a href="/repair-pdf">Repair PDF</a>, then merge again with the repaired copy.</li>
<li><strong>"Too large for your device's memory."</strong> This can happen on older phones with big scanned files. Compress the largest files first, or do the merge on a computer.</li>
<li><strong>You only need some pages from one file.</strong> Merge the whole files, then delete the extra pages with <a href="/remove-pages">Remove Pages</a>, or pull the pages you want out beforehand with <a href="/extract-pages">Extract Pages</a>.</li>
</ul>
<h2>FAQ</h2>
<p><strong>Is there a file limit?</strong> No. You can merge as many PDFs as your device's memory allows — typically hundreds on a laptop.</p>
<p><strong>Will bookmarks and links survive?</strong> Links inside pages keep working. The document outline (bookmarks panel) of individual files is not combined.</p>
<p><strong>Can I merge on my phone?</strong> Yes — the tool works in Chrome and Safari on Android and iPhone.</p>
<p><strong>Does merging change my original files?</strong> No. You download a new file called <em>merged.pdf</em>; the files you selected stay exactly as they were. Rename the download to something the reviewer will understand, such as your name and the application type.</p>
<p><strong>Can I mix A4 pages with smaller pages, like an ID card scan?</strong> Yes. Each page keeps its own size, so a small ID card page stays small inside the merged file. If a portal or printer needs every page to be A4, convert photo-based documents with <a href="/jpg-to-pdf">JPG to PDF</a> on the A4 setting before merging.</p>
<p><strong>Should I merge or upload separately when a portal allows both?</strong> If the portal has a separate field for each document, use them. Reviewers find a named field faster than page 6 of a bundle. If you're unsure which tool fits your situation, read <a href="/blog/merge-vs-split-pdf-when-to-use-each">how to choose between merging and splitting</a>.</p>
`,
  },
  {
    slug: "how-to-split-a-large-pdf-into-separate-files-free-and-fast", tool: "split-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "How to Split a Large PDF into Separate Files (Free and Fast)",
    description: "Split a big PDF into smaller files by page ranges, every N pages, or single pages — free and private. Includes tips for upload size limits.",
    body: `
<p>A 60-page scanned bundle, a textbook chapter, or a combined certificate file that a portal wants as separate uploads — splitting solves all of these. Here's how to do it in under a minute without uploading anything.</p>
<h2>Four ways to split</h2>
<ul>
<li><strong>Custom ranges</strong> — one output file per line, e.g. <code>1-3</code>, <code>4-10</code>, <code>11-</code>. Best when you know where each document starts.</li>
<li><strong>Every N pages</strong> — e.g. every 2 pages for front-and-back ID cards.</li>
<li><strong>Every page</strong> — each page becomes its own PDF.</li>
<li><strong>Selected pages</strong> — click thumbnails (or type numbers) and get one PDF made of just those pages. It does the same job as Extract Pages, without switching tools.</li>
</ul>
<h2>Step by step</h2>
<ol>
<li>Open <a href="/split-pdf">Split PDF</a> and select your file. Page thumbnails appear so you can see where documents begin.</li>
<li>Choose a split mode and enter ranges if needed.</li>
<li>Click <strong>Split PDF</strong>. Several files are bundled into one ZIP download.</li>
</ol>
${T("split-pdf", "Split PDF")}
<h2>Worked example: a 9-page certificate bundle</h2>
<p>Suppose you scanned all your documents in one go at a cyber café and got a single file, <em>documents.pdf</em>. An admission portal wants each one uploaded in its own field. Scrolling through the thumbnails, you find:</p>
<ul>
<li>Pages 1–2: Class 10 marksheet (front and back)</li>
<li>Pages 3–4: Class 12 marksheet (front and back)</li>
<li>Page 5: income certificate</li>
<li>Pages 6–8: degree certificate and transcripts</li>
<li>Page 9: ID proof</li>
</ul>
<p>Pick <strong>Custom ranges</strong> and type one range per line:</p>
<p><code>1-2</code><br><code>3-4</code><br><code>5</code><br><code>6-8</code><br><code>9-</code></p>
<p>Click <strong>Split PDF</strong> and you get <em>documents-split-pdf.zip</em> containing five files: <em>documents-pages-1-2.pdf</em>, <em>documents-pages-3-4.pdf</em>, <em>documents-page-5.pdf</em>, <em>documents-pages-6-8.pdf</em> and <em>documents-page-9.pdf</em>. The names tell you which pages went where, so matching them to portal fields is easy. Renaming them to something like <em>class10-marksheet.pdf</em> before uploading makes it even harder to mix them up.</p>
<p>The last line, <code>9-</code>, means "page 9 to the end". If you later add pages to the bundle and split it again, that line still catches everything after page 8.</p>
<h2>How to write ranges that work</h2>
<ul>
<li><strong>One line = one output file.</strong> You can also separate files with a semicolon, so <code>1-2; 3-4; 5</code> gives the same three files as typing them on three lines.</li>
<li><strong>Commas join pages into the same file.</strong> A line reading <code>1-3, 7</code> makes a single PDF with pages 1, 2, 3 and 7.</li>
<li><strong>Pages always come out in their original order.</strong> <code>7, 1-3</code> still produces pages 1, 2, 3, 7. To change the order, split first and then use <a href="/organize-pdf">Organize PDF</a>, which lets you drag pages around.</li>
<li><strong>A page can go into more than one file.</strong> If two documents need the same cover page, list it in both lines.</li>
<li><strong>Write the smaller number first.</strong> <code>8-5</code> matches nothing, and that line is skipped.</li>
<li><strong>Use a plain hyphen and digits.</strong> Anything else, such as letters or "pg", shows an error saying the range isn't valid.</li>
</ul>
<h2>Using "Every N pages" well</h2>
<p>This mode suits files where every document is the same length. A scan of ten ID cards, front and back, is 20 pages; every 2 pages gives you ten 2-page PDFs, one per card. A set of monthly salary slips with one page each works with every 1 page, which is the same as the <strong>Every page</strong> option.</p>
<p>If the page count doesn't divide evenly, the last file simply holds whatever is left. Twenty-five pages split every 10 gives files with pages 1–10, 11–20 and 21–25. Check the last file if a portal expects a fixed number of pages per upload.</p>
<h2>Getting the files out on a phone</h2>
<p>When a split makes several files, the result screen offers one ZIP and also lists the files by name with their sizes (the first 50, if there are more). On a phone you can skip the ZIP and tap a single file name to download just that part, which is handy when you need only one piece right now. If you do download the ZIP, the Files app on iPhone opens it when you tap it, and Files by Google on Android can extract it. On Windows, right-click the ZIP and choose Extract All.</p>
<p>When a split produces only one file, for example in Selected pages mode, you get a plain PDF instead of a ZIP.</p>
<h2>Splitting to meet a size limit</h2>
<p>If a portal limits each upload to, say, 2 MB, splitting a 10 MB file into five parts is one option — but often it's better to <a href="/compress-pdf">compress to an exact size</a> first. Scanned pages compress dramatically (often 80–90%) with no visible loss on screen.</p>
<p>When you do split for size, look at the sizes shown next to each file on the result screen. Scanned pages are rarely equal: a page with a colour photo or stamp can weigh several times more than a plain text page, so five equal page ranges won't give five equal file sizes. Also expect the parts to add up to a little more than the original, because fonts and other shared resources are copied into every part that uses them.</p>
<h2>Split vs. extract — which do I need?</h2>
<p>Use <a href="/extract-pages">Extract Pages</a> when you want one new PDF made of a few chosen pages. Use Split when you want the whole document cut into several files. See our <a href="/blog/merge-vs-split-pdf-when-to-use-each">merge vs split guide</a>.</p>
<h2>Does splitting reduce quality?</h2>
<p>No. Pages are copied exactly — text, images and fonts are untouched.</p>
<h2>FAQ</h2>
<h3>Why did I get the message "No pages matched those ranges"?</h3>
<p>Every line you typed pointed at pages the file doesn't have, for example <code>12-15</code> in a 10-page PDF. Check the page count shown with the thumbnails and try again.</p>
<h3>The default ranges already filled in. What are they?</h3>
<p>Custom ranges starts with the document cut into two halves, so a 10-page file shows <code>1-5</code> and <code>6-10</code>. Replace those lines with your own.</p>
<h3>Can I split a password-protected PDF?</h3>
<p>Yes, as long as you have the password. You type it once on your device, and the split files are saved without a password.</p>
<h3>Is my original file changed?</h3>
<p>No. Split creates new files and leaves the original as it was, so you can split the same bundle again with different ranges if you need to.</p>
<h3>I split too far. How do I put parts back together?</h3>
<p>Select the parts in <a href="/merge-pdf">Merge PDF</a>, put them in order and merge. Because both steps copy pages without re-compressing, you lose nothing by going back and forth.</p>
`,
  },
  {
    slug: "how-to-convert-word-to-pdf-free", tool: "word-to-pdf", date: "2026-08-10", updated: "2026-11-20",
    title: "How to Convert Word to PDF for Free (Without Losing Formatting)",
    description: "Convert DOCX to PDF free with fonts, tables and page breaks intact. Learn the 3 settings that keep your resume or assignment looking exactly right.",
    body: `
<p>PDF is the safest way to send a document: it looks identical on every phone, laptop and printer. Here's how to convert Word to PDF for free and keep your formatting perfect, what the error messages mean if something goes wrong, and which other free methods are worth knowing.</p>
<h2>Convert in 3 steps</h2>
<ol><li>Open <a href="/word-to-pdf">Word to PDF</a> and select your .docx (or .doc, .odt, .rtf).</li><li>Click <strong>Convert to PDF</strong>. The first conversion of the day may take 30–60 seconds while our free server wakes up.</li><li>Download your PDF and check it page by page.</li></ol>
<p>When the conversion finishes you see two buttons: <strong>Download</strong> and <strong>Open preview</strong>. Use the preview first, so you catch a problem before the file is sitting in your Downloads folder. Under the buttons, "Continue with this file" sends the new PDF straight to <a href="/compress-pdf">Compress PDF</a>, <a href="/merge-pdf">Merge PDF</a> or <a href="/protect-pdf">Protect PDF</a>, so you don't have to pick the file again.</p>
${T("word-to-pdf", "Word to PDF")}
<h2>Why formatting sometimes shifts — and how we prevent it</h2>
<p>Most layout problems come from <strong>fonts</strong>. If the converter doesn't have Calibri or Cambria, it substitutes another font with different letter widths, and lines wrap differently. Our converter runs LibreOffice with metric-compatible versions of Microsoft's core fonts (Carlito for Calibri, Caladea for Cambria, Liberation for Arial/Times), so text occupies exactly the same space.</p>
<p>A font outside that group is replaced with the closest one available. The text is still all there, but a line can end one word earlier, and over a long document that can push a heading onto the next page. That is why the first check below matters most.</p>
<h2>Three things to check before converting</h2>
<ul>
<li><strong>Use standard fonts.</strong> Calibri, Arial, Times New Roman and Cambria convert perfectly. Decorative downloaded fonts may be substituted.</li>
<li><strong>Use page breaks, not empty lines,</strong> to start a new page.</li>
<li><strong>Anchor images "in line with text"</strong> rather than floating, so they don't move.</li>
</ul>
<p>One more habit saves a lot of confusion: <strong>save the document in Word before you upload it</strong>. The converter only sees the saved file, so any edits you made after the last save will be missing from the PDF.</p>
<p>For the less common problems, like a blank last page, a table running off the edge or the wrong font in one heading, see our <a href="/blog/convert-word-to-pdf-without-losing-formatting-fast-guide">Word to PDF formatting checklist</a>.</p>
<h2>Other free ways to convert</h2>
<p>An online converter is not the only option. Depending on what you have installed, one of these may suit you better:</p>
<ul>
<li><strong>Microsoft Word on a computer:</strong> go to <strong>File → Save As</strong>, pick a folder, and change the <em>Save as type</em> list to PDF. Because Word uses the fonts installed on your own computer, this is the most faithful copy of what you see on screen.</li>
<li><strong>Google Docs:</strong> upload the .docx to Google Drive, open it with Google Docs, then choose <strong>File → Download → PDF Document (.pdf)</strong>. Google Docs converts the Word file into its own format first, so look over columns, text boxes and fonts in the downloaded PDF.</li>
<li><strong>LibreOffice Writer:</strong> free to install on Windows, Mac and Linux. Open the file and use <strong>File → Export as PDF</strong>. Our converter uses the same engine, so the result is similar.</li>
</ul>
<p>So which should you use? If Word is on your computer, its own export is hard to beat. The online converter is the easier choice on a phone, on a borrowed laptop, or on a cyber café computer where Word isn't installed or isn't activated.</p>
<h2>Converting on a phone</h2>
<p>The converter works in mobile browsers. Choose the file from Google Drive, Files or iCloud. If someone sent you the document on WhatsApp or by email, download it to your phone first so it shows up in the file chooser. Phone screens are small, so after converting, tap <strong>Open preview</strong> and zoom in on the edges of a page or two before you send the PDF anywhere.</p>
<h2>If the conversion fails</h2>
<p>The converter tells you what went wrong. Here is what each message means and what to do:</p>
<ul>
<li><strong>"File too large for the free converter (max 20 MB)."</strong> Large photos are almost always the cause. In Word, select a picture, choose <strong>Picture Format → Compress Pictures</strong> and untick <em>Apply only to this picture</em> so every image is reduced. Save, and try again.</li>
<li><strong>"Conversion failed. The file may be damaged or password-protected."</strong> If you set a password to open the document, remove it in Word (<strong>File → Info → Protect Document → Encrypt with Password</strong>, clear the box, save). If there is no password, open the file in Word, save a fresh copy with <strong>Save As</strong>, and upload that copy.</li>
<li><strong>"This file type isn't supported for this conversion."</strong> The file isn't a Word-type document. An Apple Pages file, for example, needs to be exported to Word first (in Pages: <strong>File → Export To → Word</strong>).</li>
<li><strong>"The converter is busy — please retry in a few seconds."</strong> The free server handles one conversion at a time. Wait a moment and click again.</li>
<li><strong>"The conversion took too long. Try a smaller file."</strong> Very long documents with many images can hit the time limit. Split the document into two Word files, convert each, and join them with <a href="/merge-pdf">Merge PDF</a>.</li>
<li><strong>"The converter didn't respond. Please try again in a minute."</strong> The server didn't wake up in time. Check your connection and try once more.</li>
</ul>
<h2>Is it safe?</h2>
<p>Your file is sent over HTTPS, converted in a temporary folder on our server, and that folder is wiped the moment your PDF comes back. Nothing is stored.</p>
<h2>FAQ</h2>
<h3>Will the PDF have a watermark?</h3>
<p>No. You get the PDF exactly as the converter produces it, with no logo or stamp added, and you don't need an account.</p>
<h3>Can I turn several Word files into one PDF?</h3>
<p>The converter takes one document at a time. Convert each file, then combine the PDFs in the order you want with <a href="/merge-pdf">Merge PDF</a>, which runs in your browser.</p>
<h3>Will the links in my document still work?</h3>
<p>Yes. Hyperlinks stay clickable in the PDF, so an email address or portfolio link on your resume still opens when someone taps it.</p>
<h3>Can I edit the PDF later?</h3>
<p>Keep your Word file. Making changes there and converting again gives a cleaner result than editing the PDF. If you don't have the original, <a href="/edit-pdf">Edit PDF</a> can add text or white out a small mistake, or you can turn it back into a document with <a href="/pdf-to-word">PDF to Word</a>.</p>
`,
  },
  {
    slug: "convert-word-to-pdf-without-losing-formatting-fast-guide", tool: "word-to-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "Convert Word to PDF Without Losing Formatting: Fast Guide",
    description: "Fonts changing, tables breaking, extra blank pages? Fix the common Word-to-PDF formatting problems in minutes with this checklist.",
    body: `
<p>You spent an hour aligning your document — then the PDF has shifted lines, a broken table and a blank last page. Here's how to find exactly what changed and fix each problem, usually in a couple of minutes.</p>
<h2>First, spot what changed</h2>
<p>Open the Word file and the PDF side by side and compare three things: the <strong>total page count</strong>, the <strong>last line on each page</strong>, and anything that sits in a box (tables, photos, text boxes). If the page count matches and every page ends on the same line, the conversion is fine. If page 2 ends one line early in the PDF, that is a font problem. If the count is one higher and the extra page is empty, it's the blank-page problem. Jump to the matching fix below.</p>
<h2>Problem 1: Fonts look different</h2>
<p>The converter didn't have your font. Stick to Calibri, Arial, Times New Roman, Cambria or Courier New. Our <a href="/word-to-pdf">Word to PDF</a> converter includes metric-compatible equivalents of these, so line breaks match Word. Other fonts, including Georgia and Verdana, are swapped for a similar font, so lines can wrap a little differently.</p>
<p><strong>Watch out for Aptos.</strong> Newer versions of Microsoft 365 use Aptos as the default font instead of Calibri. If you started a fresh document recently, it is probably in Aptos, and our converter has no metric-compatible copy of it. Switch the text to Calibri before uploading, or export from Word itself (File → Save As → PDF), which uses the fonts on your own computer.</p>
<p>Not sure which fonts are in the document? Press <strong>Ctrl+A</strong> in Word and look at the font box on the Home tab. If it is blank, the document mixes more than one font. With everything still selected, pick one font from the list to make the whole document consistent (this also changes headings, so recheck them).</p>
<h2>Problem 2: An extra blank page at the end</h2>
<p>Word keeps a final paragraph mark after a table or page break. Turn on formatting marks (¶), select the empty paragraph and set its font size to 1 pt. Or remove the blank page afterwards with <a href="/remove-pages">Remove Pages</a>.</p>
<p>A blank page in the <em>middle</em> of the PDF has a different cause. With formatting marks on, look for a manual page break directly before a section break, or a section break marked "Odd Page", which forces the next section onto an odd-numbered page and leaves an empty page when needed. Change it to a "Next Page" break.</p>
<h2>Problem 3: Tables split or overflow</h2>
<p>Set the table width to 100% of the page and enable "Repeat header row". Avoid fixed column widths wider than the page margins.</p>
<p>Both settings live in <strong>Table Properties</strong> (right-click the table). On the <em>Row</em> tab you will also find "Allow row to break across pages". Untick it if one long row is being cut in half, with its top on one page and its bottom on the next. Tables pasted from Excel are the usual culprits for overflowing, because they arrive with fixed widths; click inside the table, open the table's <strong>Layout</strong> tab and choose <strong>AutoFit → AutoFit Window</strong> to pull them back inside the margins.</p>
<h2>Problem 4: Images move</h2>
<p>Floating images are positioned relative to paragraphs that may reflow. Right-click → Wrap Text → <em>In Line with Text</em>.</p>
<p>Text boxes and shapes behave the same way. If a signature image or a logo in the corner keeps drifting, put it in a table cell or in the header instead of leaving it floating on the page.</p>
<h2>Problem 5: The PDF is too big to upload</h2>
<p>Large photos in the document make large PDFs. After converting, use <a href="/compress-pdf">Compress PDF</a> with Exact size to meet the portal's limit.</p>
<h2>Problem 6: Page numbers or the table of contents are wrong</h2>
<p>Page numbers in a table of contents, "see page 4" cross-references and dates inserted as fields are stored with the value they had the last time Word updated them. If you edited the document afterwards, the PDF can show old numbers. In Word, press <strong>Ctrl+A</strong>, then <strong>F9</strong> to update all fields (choose "Update entire table" if asked), save, and convert again.</p>
<h2>Problem 7: Comments or tracked changes appear in the PDF</h2>
<p>If the document still has tracked changes, the PDF may show the markup, or a version you didn't expect. Finish the document first: on the Review tab, use <strong>Accept → Accept All Changes</strong>, then <strong>Delete → Delete All Comments in Document</strong>. Save, then convert.</p>
<h2>Problem 8: Hindi or regional-language text turns into gibberish</h2>
<p>This happens with legacy typing fonts such as Kruti Dev. They are not Unicode: each Hindi letter is stored as an ordinary English character and only looks like Hindi when that exact font is installed. Our converter doesn't have Kruti Dev, and neither will most of the people you send the file to. Retype or convert the text to Unicode Hindi (for example in Mangal or Nirmala UI) before converting. Unicode text keeps the correct letters even when a substitute font has to be used, although the shapes may look slightly different.</p>
${T("word-to-pdf", "Word to PDF")}
<h2>Fix it in Word, or fix the PDF?</h2>
<p>Some problems can be repaired in the finished PDF. Others come from the document itself, so the only real fix is to go back to Word and convert again.</p>
<table>
<tr><th>Problem</th><th>Where to fix it</th></tr>
<tr><td>Extra blank page</td><td>Either: delete it in Word, or use <a href="/remove-pages">Remove Pages</a> on the PDF</td></tr>
<tr><td>File too big</td><td>PDF: <a href="/compress-pdf">Compress PDF</a></td></tr>
<tr><td>A page is sideways</td><td>PDF: <a href="/rotate-pdf">Rotate PDF</a></td></tr>
<tr><td>Pages in the wrong order</td><td>PDF: <a href="/organize-pdf">Organize PDF</a></td></tr>
<tr><td>Wrong font or shifted lines</td><td>Word: change the font, convert again</td></tr>
<tr><td>Table cut off or split badly</td><td>Word: fix table properties, convert again</td></tr>
<tr><td>Images or text boxes moved</td><td>Word: set them in line with text, convert again</td></tr>
<tr><td>Old page numbers in the contents</td><td>Word: update fields, convert again</td></tr>
</table>
<h2>Quick checklist</h2>
<ul><li>Standard fonts only (and no Aptos)</li><li>Page breaks instead of repeated Enter</li><li>Images in line with text</li><li>Tables within margins</li><li>Fields updated, tracked changes accepted, comments deleted</li><li>Hindi text in Unicode, not Kruti Dev</li><li>Check the PDF page count before sending</li></ul>
<h2>FAQ</h2>
<h3>Would Word's own Save as PDF avoid all of this?</h3>
<p>It avoids the font problems, since Word has every font you used right there on your PC. The blank pages, overflowing tables, floating images and outdated fields come from the document itself, so they show up whichever converter you use. Fix those in the document either way.</p>
<h3>The PDF looks right on my laptop but wrong on my phone. Why?</h3>
<p>A real PDF should look the same everywhere. If it doesn't, check that you actually sent the PDF and not the .docx: phones often open Word files in a viewer that lays them out differently.</p>
`,
  },
  {
    slug: "sign-a-pdf-electronically-for-free-without-leaving-your-browser", tool: "sign-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "Sign a PDF Electronically for Free (Without Leaving Your Browser)",
    description: "Add your signature to a PDF in a minute: draw, type or upload a photo of your signature. Free and private. Plus: when an e-signature is valid in India.",
    body: `
<p>No printer, no scanner? You can sign offer letters, rental agreements and forms directly in your browser. The whole job takes about a minute, and nothing you sign is uploaded anywhere.</p>
<h2>How to sign</h2>
<ol>
<li>Open <a href="/sign-pdf">Sign PDF</a> and select your document. If it is locked with a password, type that in first.</li>
<li>Click <strong>Create signature</strong>. Draw with your finger or mouse, type your name in a handwriting style, or upload a photo of your signature (we remove the white background automatically).</li>
<li>Click on the page where the signature goes. Drag to move; pull the corner to resize.</li>
<li>Add the date or your name if the form needs it, then click <strong>Sign PDF</strong> and download.</li>
</ol>
${T("sign-pdf", "Sign PDF")}
<h2>Draw, type or upload: which should you pick?</h2>
<p>The signature window has three tabs, and each suits a different situation.</p>
<ul>
<li><strong>Draw</strong> works best on a phone or tablet, where you can sign with a finger or stylus. On a laptop, a mouse signature often looks shaky; a touchpad is worse. If your first attempt looks wrong, press <strong>Clear</strong> and try again. Nobody sees the failed versions.</li>
<li><strong>Type</strong> turns your name into a signature in one of three styles: Script, Elegant or Print. It is the neatest option, but it does not look like your real signature, so use it where a recipient only needs your confirmation, not a match with the signature on your ID.</li>
<li><strong>Upload</strong> is the one to use when the signature should match the one on your PAN card, bank records or earlier paperwork. The <em>Remove white background</em> box is ticked by default. It works by making light pixels transparent, so a photo taken in dim light, where the paper looks grey, can leave a grey patch around the ink.</li>
</ul>
<p>There is also a colour picker in the same window. It starts on a dark blue, which reads as pen ink when printed.</p>
<h2>Tips for a natural-looking signature</h2>
<ul><li>Sign on plain white paper with a dark pen, photograph it in daylight, and upload — it looks most authentic.</li><li>Keep the signature roughly the height of two lines of text.</li><li>Use dark blue ink colour for a "wet ink" look.</li><li>Crop the photo close to the signature before uploading if your phone caught the edge of a table or your thumb.</li></ul>
<h2>Worked example: initials on every page of a rental agreement</h2>
<p>Say your landlord sends a six-page leave and licence agreement. The usual request is initials at the foot of pages 1 to 5 and a full signature, the date and your name on page 6. Here is how to do that in one sitting:</p>
<ol>
<li>Click <strong>Create signature</strong> and make your full signature. It appears as a small thumbnail in the side panel.</li>
<li>Click <strong>Create signature</strong> again and draw only your initials. Now you have two thumbnails to reuse.</li>
<li>On page 1, click the initials thumbnail, drag it to the bottom corner and size it. Move to page 2 with the › button above the preview and repeat. Each click on a thumbnail places a fresh copy.</li>
<li>On page 6, place the full signature. Then use <strong>+ Date</strong>, which adds today's date in a format like 20 Nov 2026, and <strong>+ Name / text</strong>, which adds a "Signed by:" line you can click into and complete.</li>
<li>Before clicking <strong>Sign PDF</strong>, flip through every page once more. Anything misplaced can be removed with its small × button.</li>
</ol>
<p>For fine positioning, select an item and press the arrow keys to nudge it one point at a time, or hold Shift to move it ten points. That is handy for lining a signature up exactly on a printed line.</p>
<h2>When something looks wrong</h2>
<ul>
<li><strong>A box around the uploaded signature.</strong> The background was not light enough to be removed. Retake the photo near a window, or switch to the Draw tab.</li>
<li><strong>Date or name shows a "?" character.</strong> The date, name and initials boxes use standard Latin fonts, so the Hindi or other Indian scripts, the ₹ sign and curly quotes come out as "?". Type these fields in English with plain characters. Your signature itself is an image, so it can be in any script.</li>
<li><strong>"Place your signature on the page first."</strong> You created a signature but did not put it on a page. Click its thumbnail, then position it.</li>
<li><strong>The signature looks soft or blurry.</strong> It has been stretched well beyond its natural size. Keep it about as big as a pen signature would be on paper.</li>
<li><strong>The document already carries a digital signature.</strong> Some offer letters and certificates are digitally signed by the issuer. Adding anything with an editing tool rewrites the file, and the reader may then show that earlier signature as invalid. Ask the sender how they want you to sign before changing such a file.</li>
</ul>
<h2>Is an electronic signature legally valid in India?</h2>
<p>The Information Technology Act, 2000 recognises electronic signatures, and many everyday agreements are signed this way. However, some documents need specific methods — for example Aadhaar-based eSign or a Digital Signature Certificate (DSC) for certain government filings, and some documents (like wills and property transfer deeds) are excluded from electronic execution. When in doubt, ask the other party which method they accept. This is general information, not legal advice.</p>
<p>It also helps to know what this tool does and does not create. It places a <em>visual</em> signature, an image of your signature, on the page. That is not the same as a certificate-based digital signature, which uses a DSC issued by a licensed Certifying Authority and can be checked cryptographically. A visual signature is widely used for offer letter acceptances, internal forms and similar paperwork, but whether it is enough is the receiving organisation's call. For income tax, company or other official filings that ask for a DSC or eSign, use the method the portal names. The <a href="https://cca.gov.in">Controller of Certifying Authorities</a> lists the licensed DSC providers.</p>
<h2>Before you send the signed file</h2>
<ul>
<li>Use <strong>Open preview</strong> on the download screen and check every page, not just the one you signed.</li>
<li>Rename the file so the recipient knows it is the signed copy, for example by adding "signed" and the date.</li>
<li>Emailing it? Add a password with <a href="/protect-pdf">Protect PDF</a> and share the password by a different route, such as a phone call.</li>
<li>Uploading it to a portal with a size limit? Make it smaller with <a href="/compress-pdf">Compress PDF</a>. Both tools appear under <em>Continue with this file</em> after signing, so you do not need to select the file again.</li>
</ul>
<h2>Privacy</h2>
<p>Your signature and document never leave your device. Close the tab and they're gone. That also means your signature is not saved for next time, so you will create it again on your next visit.</p>
<p>One thing worth remembering: once you send a signed PDF, the recipient has a copy of your signature image, exactly as they would with a scanned paper page. Send signed documents only to the people who need them.</p>
<h2>FAQ</h2>
<h3>Will this work on a mobile?</h3>
<p>It does. Open Sign PDF in Chrome or Safari on your phone; the Draw tab accepts finger and stylus input. Turning the phone sideways gives you a wider area to sign in.</p>
<h3>Can two people sign the same PDF?</h3>
<p>Yes. The first person signs and sends the downloaded file; the second opens that file in Sign PDF and adds their own signature.</p>
<h3>Can I edit the signature after downloading?</h3>
<p>No. The signature becomes part of the page content when you save. If you made a mistake, start again from your original unsigned file.</p>
`,
  },
  {
    slug: "pdf-vs-docx-which-format-should-a-job-applicant-send", tool: "word-to-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "PDF vs DOCX: Which Format Should a Job Applicant Send?",
    description: "Should you send your resume as PDF or Word? When each format is better, what ATS systems prefer, and how to convert in seconds.",
    body: `
<p>Short answer: <strong>send a PDF unless the employer asks for Word.</strong> Here's why, the exceptions, and how to handle the in-between cases, like a portal that accepts both or a recruiter who wants "your CV" without saying which kind.</p>
<h2>Why PDF usually wins</h2>
<ul>
<li><strong>Looks the same everywhere.</strong> A DOCX can reflow on a recruiter's phone or older Word version; a PDF can't.</li>
<li><strong>Can't be accidentally edited.</strong></li>
<li><strong>Modern ATS read PDFs fine</strong> — as long as the PDF has real text (not a scanned image).</li>
</ul>
<p>There is also a privacy reason people forget. A Word file can carry things you never meant to send: tracked changes showing your earlier wording, comments a friend left while reviewing it, and an author name in the file properties that may belong to whoever made the template. A PDF made from that file shows only the finished page.</p>
<h2>When to send DOCX</h2>
<ul><li>The job posting or recruiter explicitly asks for Word.</li><li>A recruitment agency will reformat your CV onto their template.</li><li>An older applicant-tracking portal rejects PDFs (rare now).</li></ul>
<p>Before you send a Word file, clean it. In Word, go to <strong>File → Info → Check for Issues → Inspect Document</strong>. It lists comments, revisions and personal information stored in the file, and lets you remove each one. Then open the document once more and read it from top to bottom, because the person receiving it will see it in their own Word version, with their own fonts.</p>
<h2>Which format for which situation</h2>
<table>
<tr><th>Situation</th><th>Send</th></tr>
<tr><td>Emailing HR or a hiring manager directly</td><td>PDF</td></tr>
<tr><td>Uploading to a job portal that accepts both</td><td>PDF, after the text-selection test below</td></tr>
<tr><td>The posting says ".doc or .docx only"</td><td>DOCX</td></tr>
<tr><td>A placement consultant or agency asks for your CV</td><td>DOCX, unless they say otherwise, since they may move it onto their own template</td></tr>
<tr><td>Government job or exam application</td><td>Exactly the format and size the notification states</td></tr>
<tr><td>Nobody said anything</td><td>PDF, with a line saying you can share a Word copy on request</td></tr>
</table>
<p>For government and exam portals, the upload box usually lists the allowed file type and a maximum size in KB. Follow it to the letter, since a file that is 5 KB over the limit is rejected just like a wrong format. <a href="/exam-form-ready">Exam Form Ready</a> handles the photo, signature and document size rules these forms use.</p>
<h2>Make your PDF ATS-friendly</h2>
<ul><li>Create it from Word or Google Docs — don't scan a printout.</li><li>Use standard section headings: Experience, Education, Skills.</li><li>Avoid putting key information in images, text boxes or headers.</li><li>Test it: open the PDF and try selecting the text. If you can't, an ATS can't read it either — run <a href="/ocr-pdf">OCR PDF</a> or recreate it.</li></ul>
<p>Notice that none of these points is really about PDF versus DOCX. An ATS pulls the text out of your file and sorts it into fields like name, phone number and job titles. A Word file with your phone number inside a text box causes the same trouble as a PDF made from it. The format matters far less than how the resume inside it is built. For the layout side of this, see <a href="/blog/why-pdf-formatting-breaksand-how-to-fix-it-for-your-resume">why resume PDFs break and how to fix them</a>.</p>
<h2>Name the file properly</h2>
<p>Recruiters download dozens of files called "Resume.pdf" or "CV final (2).docx". Use your name and the document type, for example <strong>Anjali-Verma-Resume.pdf</strong>. Leave out version numbers and words like "final" or "new". If the employer asks for a specific naming pattern, use theirs.</p>
<h2>Convert either way</h2>
<p>Use <a href="/word-to-pdf">Word to PDF</a> to create your PDF, or <a href="/pdf-to-word">PDF to Word</a> if a recruiter wants an editable copy.</p>
<p>Going from PDF to Word, the converter rebuilds your resume as editable paragraphs and real Word tables rather than fixed text boxes, so the agency can work with it. Spacing in a complex layout may need a few small adjustments, so open the .docx and read it through once before it goes out. If your only copy of the resume is a scan or a photo, tick <strong>"Scanned PDF? Run OCR first"</strong> so the text is recognised before conversion. Recognition is only as good as the scan, so check names, numbers and email addresses carefully.</p>
${T("word-to-pdf", "Word to PDF")}
<h2>FAQ</h2>
<h3>Should I attach both a PDF and a DOCX?</h3>
<p>Usually not. Two attachments make the recruiter choose, and the Word copy may open with a different layout. Send the PDF and offer the Word file if they need it. Send both only when the employer asks for both.</p>
<h3>The portal only accepts .doc or .docx, and I only have a PDF. What now?</h3>
<p>Convert it with <a href="/pdf-to-word">PDF to Word</a>, open the result, fix any spacing, and save it as .docx. Check that your name, phone number and email came through exactly, since those are the fields that matter most.</p>
<h3>Is a resume made on my phone acceptable as a PDF?</h3>
<p>Yes, if it was made in a document app such as Word or Google Docs and the text can be selected in the PDF. A photo of a printed resume saved as PDF is not the same thing: it is a picture, and an ATS sees almost nothing in it.</p>
<h3>Does a PDF resume have to be one page?</h3>
<p>The format doesn't decide that. Length depends on your experience and the employer's instructions. What PDF does guarantee is that a one-page resume stays one page when the recruiter opens it.</p>
`,
  },
  {
    slug: "how-to-scan-documents-to-pdf-with-a-phone-no-app-no-scan-app-fees", tool: "scan-to-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "How to Scan Documents to PDF with a Phone (No App, No Fees)",
    description: "Turn phone photos into clean, scanner-quality PDFs without installing an app. Lighting tips, enhancement modes and how to hit upload size limits.",
    body: `
<p>You don't need a scanner or a paid scanning app. Your phone camera plus a browser is enough. This guide covers the four-step scan, how to take photos that clean up well, what each enhancement mode really does to your page, and how to fix the usual problems before you submit the PDF anywhere.</p>
<h2>Scan in 4 steps</h2>
<ol><li>Open <a href="/scan-to-pdf">Scan to PDF</a> on your phone and tap <strong>Use camera</strong>.</li><li>Photograph each page. Add more pages with "+ Add more files".</li><li>Choose <strong>Document</strong> mode (clean white paper, sharp text), Grayscale or Black &amp; white.</li><li>Tap <strong>Create PDF</strong> and download.</li></ol>
${T("scan-to-pdf", "Scan to PDF")}
<p>Use camera opens your phone's rear camera. Each photo becomes one page, in the order shown on screen, and the arrow buttons under each thumbnail move a page earlier or later. The ✕ button drops a bad shot so you can retake it. Already have photos of the pages in your gallery? Tap Select images instead and pick them all at once.</p>
<h2>Get scanner-quality photos</h2>
<ul><li><strong>Light:</strong> daylight near a window, no direct sun. Avoid the flash — it causes glare.</li><li><strong>Angle:</strong> hold the phone flat above the page, not tilted.</li><li><strong>Background:</strong> place the paper on a dark surface so the edges are clear.</li><li><strong>Shadows:</strong> our enhancement removes soft shadows, but keep your hand's shadow off the page.</li></ul>
<p>Two more habits make a big difference. First, fill the frame: move close enough that the page takes up almost the whole photo. The tool does not detect page edges or straighten a tilted shot, so whatever is in the photo ends up on the PDF page, fitted to the page size without stretching. Second, tap the screen on the text to focus and hold still for a moment after the shutter sound. Most "blurry scan" complaints come from a photo taken while the hand was still moving, especially indoors in the evening, when the camera picks a slower shutter.</p>
<p>For laminated cards and glossy paper, the window light can bounce straight back into the lens. If you see a bright patch on the screen, shift the card a little until it disappears, then shoot.</p>
<h2>Which mode should I choose?</h2>
<ul><li><strong>Document</strong> — keeps colour stamps, signatures and photos; whitens paper. Best all-rounder.</li><li><strong>Grayscale</strong> — smaller files, good for text documents.</li><li><strong>Black &amp; white</strong> — smallest files and highest contrast; not for photos.</li></ul>
<p>There's a fourth option, <strong>Original colour</strong>, which skips enhancement completely and places your photos as they are.</p>
<h2>What the enhancement does to your page</h2>
<p>Knowing this helps you pick a mode when the first result looks off. In every mode except Original colour, the tool works out how bright the paper is in each part of the photo, using a heavily blurred copy of the picture as a guide, and evens it out. That is what lifts the soft shadow from one side of the page or the darker corner farther from the window. It then raises the contrast so the ink stands out.</p>
<p>After that, the modes differ:</p>
<ul><li><strong>Document</strong> turns any area that is already close to white into pure white, and leaves everything else, including colours, alone.</li><li><strong>Grayscale</strong> removes colour but keeps all the shades in between.</li><li><strong>Black &amp; white</strong> makes every dot either black or white, with nothing in between.</li></ul>
<p>Photos are also scaled down to at most 3,000 pixels on the long side. On an A4 page that still works out to roughly 250 dots per inch, which is plenty for reading on screen and for printing.</p>
<p>All of this runs on the phone itself, inside the browser tab. The photos and the finished PDF are not uploaded anywhere.</p>
<h2>Worked example: three mark sheets for a college application</h2>
<p>Say an admission form wants your Class 10 and Class 12 mark sheets and a transfer certificate as one PDF.</p>
<ol><li>Lay the first sheet on a dark table near a window, hold the phone in portrait directly above it, and tap Use camera.</li><li>Repeat for the other two documents. Check the order on screen matches what the form asks for.</li><li>Leave the enhancement on Document so the board's coloured seal and the principal's signature keep their colour.</li><li>Keep Page size on A4 and Margin on No margin (the default for scans), then tap Create PDF.</li><li>When the PDF is ready, tap <strong>Open preview</strong> and check your roll number and the marks table at full size before downloading.</li></ol>
<p>Mark sheets often have a pale printed pattern or tint behind the text. Document mode will usually whiten most of it, which makes the text easier to read. If you want the copy to show that background, choose Original colour instead.</p>
<h2>Fixing common problems</h2>
<ul><li><strong>Faint words disappeared in Black &amp; white:</strong> light pencil, pale blue ink and faded stamps can fall on the white side of the cut-off. Switch to Grayscale or Document.</li><li><strong>A page is sideways in the finished PDF:</strong> turn it with <a href="/rotate-pdf">Rotate PDF</a>. To avoid it next time, hold the phone the same way the page is printed.</li><li><strong>Table edge or fingers visible around the page:</strong> retake the photo closer, or trim the border with <a href="/crop-pdf">Crop PDF</a>.</li><li><strong>One page is blurred:</strong> remove it with ✕ before you create the PDF and take it again. If you've already made the PDF, delete that page with <a href="/remove-pages">Remove Pages</a> and add the retake with <a href="/merge-pdf">Merge PDF</a>.</li><li><strong>Colours look washed out:</strong> very pale colours can be pushed to white by Document mode. Try Original colour for that document.</li></ul>
<h2>After the scan</h2>
<p>The result screen offers to continue with the same file in other tools, which saves downloading it and picking it again. Two are worth knowing about. <a href="/ocr-pdf">OCR PDF</a> adds a hidden text layer, so you can search the scan and copy text out of it, including Hindi, Tamil and several other Indian languages. Merge PDF joins this scan with other PDFs, such as a typed form you filled on your computer.</p>
<h2>Meeting upload limits</h2>
<p>For portals with strict KB limits, run <a href="/compress-pdf">Compress PDF → Exact size</a> afterwards. For exam photos and signatures, use <a href="/exam-form-ready">Exam Form Ready</a>.</p>
<h2>Before you submit</h2>
<ul><li>Count the pages in the PDF and compare with the documents on your table.</li><li>Check that all four corners of every page are visible, with no words cut off at the edges.</li><li>Zoom in on numbers that must be exact: roll numbers, dates of birth, certificate numbers.</li><li>Make sure signatures and stamps are clearly visible, not faded to grey.</li><li>Give the file a clear name, like <em>marksheets-class10-12.pdf</em>, rather than the default name the download gets.</li></ul>
`,
  },
  {
    slug: "add-page-numbers-to-a-pdf-for-free-without-leaving-your-browser", tool: "add-page-numbers", date: "2026-11-16", updated: "2026-11-20",
    title: "Add Page Numbers to a PDF for Free (Without Leaving Your Browser)",
    description: "Number PDF pages with your choice of position, format and start number — and skip the cover page. Free and private.",
    body: `
<p>Theses, project reports and long submissions usually require page numbers. Here's how to add them to any PDF in under a minute, plus the settings that trip people up: skipping front pages, getting the "of N" total right, and numbering a main document and its annexures separately.</p>
<h2>Steps</h2>
<ol><li>Open <a href="/add-page-numbers">Add Page Numbers</a> and select your PDF.</li><li>Choose position (e.g. bottom centre) and format: <em>1</em>, <em>Page 1</em>, <em>Page 1 of 20</em>, <em>1 / 20</em> or <em>- 1 -</em>.</li><li>To skip a cover page, type <code>2-</code> in "Pages to number".</li><li>Click <strong>Add page numbers</strong> and download.</li></ol>
${T("add-page-numbers", "Add Page Numbers")}
<p>You get a fresh copy named <em>yourfile-numbered.pdf</em>. Your original is not changed, which matters later if you need to redo anything.</p>
<h2>Every setting, briefly</h2>
<ul><li><strong>Position:</strong> top or bottom, each with left, centre or right. Numbers sit about 1 cm in from the edge of the page.</li><li><strong>Format:</strong> the five styles above. "Page 1 of 20" and "1 / 20" fill in the total for you.</li><li><strong>Start numbering at:</strong> the figure that appears on the first numbered page. It can be any whole number from 1 up.</li><li><strong>Pages to number:</strong> blank means every page. Otherwise use page ranges like <code>2-</code> (page 2 to the end), <code>3-18</code>, or <code>1-4, 7</code>. These are the PDF's actual page positions, as your PDF viewer counts them.</li><li><strong>Font size:</strong> Small, Normal or Large. Normal suits most A4 documents.</li><li><strong>Font:</strong> Helvetica, Times or Courier. Pick Times if the body of your report is in a serif font like Times New Roman, so the numbers don't look out of place.</li><li><strong>Colour:</strong> black by default. A dark grey is less distracting on a design-heavy document.</li></ul>
<h2>Common setups</h2>
<ul><li><strong>Project report:</strong> bottom centre, "1", pages <code>2-</code>, start at 1.</li><li><strong>Legal documents:</strong> bottom right, "Page 1 of N".</li><li><strong>Merged application bundle:</strong> top right, "1 / N" so reviewers can see nothing is missing.</li></ul>
<h2>Worked example: a 24-page project report</h2>
<p>Say your report has a cover page, then a certificate, a declaration and an acknowledgement, and the main chapters start on PDF page 5. Your department wants chapter one to begin at page 1. Set Pages to number to <code>5-</code> and Start numbering at to <strong>1</strong>. Pages 5 to 24 get the numbers 1 to 20, and the four front pages stay clean.</p>
<p>If instead the rule is that every page counts but the cover shows no number, use <code>2-</code> and start at <strong>2</strong>. The second page then reads 2 and the last reads 24, exactly matching the PDF viewer's count.</p>
<h2>Getting "of N" right</h2>
<p>In both "of N" styles, the total is worked out from the pages you chose to number and your start number, not from the whole file. In the first setup above, the last page reads "Page 20 of 20", because 20 pages were numbered starting from 1. In the second, it reads "Page 24 of 24".</p>
<p>That is usually what you want. Where it surprises people is skipping the cover but still starting at 1: on a 24-page file with <code>2-</code> and a start of 1, the last page says "Page 23 of 23". That's correct for the numbered part, but if a reviewer compares it with the 24 pages their viewer shows, they may wonder if something is missing. When the totals must match the file, start at 2 as in the second setup.</p>
<h2>Main document and annexures numbered separately</h2>
<p>Some submissions want the main document numbered 1 to 12 and the annexures to start again at 1. Run the tool twice:</p>
<ol><li>First pass: Pages to number <code>1-12</code>, start at 1. Download the file.</li><li>Second pass: open the downloaded file in the tool, set Pages to number to <code>13-</code>, start at 1, and if you like, use a different position so the annexure numbers are easy to tell apart.</li></ol>
<p>With "of N" formats, each pass counts only its own pages, so an eight-page annexure section reads "Page 1 of 8" to "Page 8 of 8".</p>
<p>The formats use ordinary digits only. If your university asks for Roman numerals (i, ii, iii) on the front pages, set those up in Word with a section break before you export, and use this tool for PDFs you can't edit at the source.</p>
<h2>Landscape and rotated pages</h2>
<p>Numbers are positioned according to how the page is displayed, so they appear upright in the right corner even on landscape tables.</p>
<h2>Do the page work before you number</h2>
<p>Page numbers are written onto each page, so they travel with the page. If you reorder pages afterwards, the numbers go out of sequence; if you delete a page, there's a gap. Settle the page order first:</p>
<ul><li>Join chapters or documents with <a href="/merge-pdf">Merge PDF</a>.</li><li>Drop blank or duplicate pages with <a href="/remove-pages">Remove Pages</a>.</li><li>Rearrange or turn pages with <a href="/organize-pdf">Organize PDF</a>.</li><li>Then add page numbers as the last editing step, and compress after that if the file must meet a size limit.</li></ul>
<h2>Troubleshooting</h2>
<ul><li><strong>The number overlaps an existing footer:</strong> the number is placed on top of whatever is already at that spot. Pick a different position, such as top right. If the PDF already has old numbers you want to replace, cover them with the whiteout tool in <a href="/edit-pdf">Edit PDF</a> first.</li><li><strong>Numbers appear twice:</strong> the tool was run on a file that was already numbered. Start again from the un-numbered original and run the tool once.</li><li><strong>Nothing changed on some pages:</strong> check the range. Pages outside it are skipped, and a range beyond the last page, like <code>30-</code> on a 24-page file, numbers nothing.</li><li><strong>"isn't a valid page range" error:</strong> use only digits, hyphens and commas, such as <code>1-3, 5, 8-</code>. Words like "all" or "to" won't work.</li><li><strong>Locked file:</strong> the tool pops up a password box. Without the correct password, it can't open the pages to number them.</li></ul>
<h2>FAQ</h2>
<h3>Is my document uploaded?</h3>
<p>No. The numbering happens inside your browser and nothing is sent to a server, so it's fine for confidential reports and personal documents.</p>
<h3>Will the numbers be sharp when printed?</h3>
<p>Yes. They are added as real text in a standard font, not as an image, so they print cleanly and add very little to the file size.</p>
<h3>Can I number a scanned PDF?</h3>
<p>Yes. The number is placed over the scanned image. If the scan has a dark strip along the bottom edge, choose a top position or a colour that stands out against it.</p>
`,
  },
  {
    slug: "remove-a-password-from-your-own-pdf-free-private-no-sign-up", tool: "unlock-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "Remove a Password from Your Own PDF (Free, Private, No Sign-up)",
    description: "Tired of typing the password for bank statements and e-bills? Save an unlocked copy in seconds — the password never leaves your device.",
    body: `
<p>Banks, telecom companies and insurers email password-protected PDFs. That's good for security, but annoying when you need to merge statements or upload them to a loan portal. If you know the password, you can save an unlocked copy.</p>
<p>This guide is for your own documents: your statements, your bills, your policy papers. The tool needs the correct password to open a locked file. It does not guess, crack or recover passwords.</p>
<h2>Two kinds of PDF lock</h2>
<p>It helps to know which kind of protection your file has, because they behave differently:</p>
<ul>
<li><strong>Open password.</strong> The PDF will not show anything until you type the password. Bank and card statements almost always use this. To remove it, you must know the password.</li>
<li><strong>Restrictions only.</strong> The PDF opens normally, but printing, copying text or editing is blocked, and those options appear greyed out in your reader. Some forms and e-receipts are set up this way.</li>
</ul>
<p>Unlock PDF handles both. If the file has an open password, it asks for it. If the file opens without one, the tool tells you so and saves a copy with the printing, copying and editing restrictions removed.</p>
<h2>How to unlock</h2>
<ol><li>Open <a href="/unlock-pdf">Unlock PDF</a> and select the file.</li><li>Enter the password when asked. It's used only on your device.</li><li>Click <strong>Unlock PDF</strong> and download the copy without a password.</li></ol>
<p>The pages, text and layout stay as they were. Only the protection is removed, and the new file is saved with "-unlocked" added to its name so you can tell the two copies apart.</p>
${T("unlock-pdf", "Unlock PDF")}
<h2>Common statement passwords</h2>
<p>Most Indian banks and card issuers use a combination of your name and date of birth, or customer ID — for example the first four letters of your name in capitals plus DDMM of your birth date. The exact rule is always mentioned in the email that came with the statement.</p>
<p>Read that line slowly. The details people most often get wrong are:</p>
<ul>
<li><strong>Capital letters.</strong> PDF passwords are case-sensitive. "RAHU" and "rahu" are different passwords.</li>
<li><strong>Which name.</strong> The rule usually means your name as the bank has it on record, which may include an initial or a different spelling from the one you use day to day.</li>
<li><strong>Date format.</strong> DDMM, DDMMYYYY and DDMMYY all appear in different emails. A birthday on 5 March is "0503" in DDMM, with the leading zero.</li>
<li><strong>Which statement.</strong> A savings account and a credit card from the same bank can use different rules, and a rule can change over the years. Check the email that came with that particular file.</li>
</ul>
<h2>"That password didn't work"</h2>
<p>That message means the password you entered is not the one the file was locked with. Before you try again:</p>
<ol>
<li>Check Caps Lock, and whether your phone keyboard capitalised the first letter on its own.</li>
<li>If you copied the password from an email or a note, type it by hand instead. Copying often picks up an extra space at the end.</li>
<li>Try the other date formats from the list above, one at a time.</li>
<li>Still stuck? Download a fresh copy of the statement from your net banking, or ask the bank or company that sent it what the password rule is.</li>
</ol>
<p>If none of that works, the tool will not get past it, and nor should it. That is how the protection is meant to work.</p>
<h2>Worked example: six statements for a loan application</h2>
<p>A lender asks for your last six months of bank statements as one PDF, under 2 MB. You have six locked files from the bank, all with the same password. There are two ways to get there.</p>
<p><strong>The short route:</strong> add all six files to <a href="/merge-pdf">Merge PDF</a>. It asks for each file's password as it reads them, and the combined file it saves has no password. Drag the files into month order (or use <strong>Sort A→Z</strong> if the file names already sort in date order), merge, check that the page count on the result screen matches the six statements added together, and if the result is too large, bring it under 2 MB with the <em>Exact size</em> option in <a href="/compress-pdf">Compress PDF</a>.</p>
<p><strong>The step-by-step route:</strong> unlock each statement here first, check each one opens without a prompt, then merge and compress. This takes longer but leaves you with unlocked single-month copies too, which is useful if a different lender later asks for only three months.</p>
<p>Either way, open the final file and scroll through it before you upload. Make sure all six months are there, in order, and that nothing has been cut off.</p>
<h2>What we can't do</h2>
<p>We don't crack passwords. If a PDF needs a password to open and you don't know it, ask the sender.</p>
<p>The same applies to a password you set yourself with <a href="/protect-pdf">Protect PDF</a> and later forgot. Strong encryption has no back door, so keep an unprotected copy of anything important somewhere safe. And please use Unlock PDF only on documents you are entitled to open, not on files someone else has locked to keep you out.</p>
<h2>Keep unlocked copies safe</h2>
<p>An unlocked statement contains sensitive data. Store it securely, and if you need to share it, use <a href="/redact-pdf">Redact PDF</a> to remove account numbers or <a href="/protect-pdf">Protect PDF</a> to add your own password.</p>
<p>A few habits help:</p>
<ul>
<li>After uploading to a portal, delete the unlocked copy from your Downloads folder if you no longer need it. Downloads folders are where old statements tend to pile up.</li>
<li>Avoid forwarding unlocked statements over chat apps, where they are saved in the media folders of everyone in the conversation.</li>
<li>If you add your own password with Protect PDF, it needs at least 4 characters and cannot contain commas (,) or equals signs (=). Send the password separately from the file, by phone or a different app.</li>
</ul>
<h2>FAQ</h2>
<h3>Do I need to unlock a statement before merging or compressing it?</h3>
<p>Not always. Tools on this site such as Merge PDF and Compress PDF ask for the password when you select a locked file and work on it directly. Unlocking first is still handy when you will use the same file several times, or with another program that cannot open locked PDFs.</p>
<h3>Is my password sent anywhere?</h3>
<p>No. The file is opened and unlocked in your browser, so neither the document nor the password reaches a server.</p>
<h3>Why does a portal reject my statement?</h3>
<p>A password is one common reason a portal shows an error or a blank preview, so try the unlocked copy. If it is still rejected, check the portal's size limit and the file type it accepts.</p>
<h3>Can I lock the file again later?</h3>
<p>Yes. <a href="/protect-pdf">Protect PDF</a> adds an AES-256 password, and you can optionally block printing, copying or editing at the same time.</p>
`,
  },
  {
    slug: "why-pdf-formatting-breaksand-how-to-fix-it-for-your-resume", tool: "word-to-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "Why PDF Formatting Breaks (and How to Fix It for Your Resume)",
    description: "Misaligned columns, wrong fonts, unreadable text for ATS — why resume PDFs break and the exact fixes that make them look right and parse correctly.",
    body: `
<p>A resume PDF can fail in two ways: it <em>looks</em> wrong to a human, or it <em>reads</em> wrong to an applicant tracking system (ATS). Here's why each one happens and how to fix both.</p>
<h2>Why a PDF breaks in the first place</h2>
<p>A Word file doesn't store where each line ends. It stores your text, the font and the page settings, and the program opening it works out the line breaks on the spot. A PDF does the opposite: it records the exact position of every word on the page. The moment of conversion is when Word's flowing text gets frozen into fixed positions, so if anything is different at that moment (a missing font, a floating object, a layout faked with spaces), the frozen version comes out different too.</p>
<p>An ATS works in the other direction. It tries to pull plain text back out of those fixed positions and guess which words belong together. Anything that makes your page look clever, such as columns, icons or text in boxes, makes that guess harder.</p>
<h2>Looks wrong: fonts and layout</h2>
<ul><li><strong>Font substitution</strong> — use widely available fonts (Calibri, Arial, Times New Roman). Our <a href="/word-to-pdf">Word to PDF</a> converter has metric-compatible Microsoft fonts so lines don't reflow.</li><li><strong>Two-column layouts built with spaces or tabs</strong> break easily. Use a proper table or columns feature.</li><li><strong>Icons from icon fonts</strong> may show as boxes. Use simple text labels.</li></ul>
<p>Three more causes are common on resumes in particular:</p>
<ul>
<li><strong>Skill bars and star ratings.</strong> A row of five dots or a half-filled bar is a drawing, not text. It may survive conversion visually, but it tells an ATS nothing. Write the level in words instead, such as "Excel (advanced)".</li>
<li><strong>Everything squeezed onto one page.</strong> When a resume is filled to the very last line in Word, any tiny change in line breaks pushes two or three lines onto a nearly empty second page. Leave a little space at the bottom, or adjust margins as explained in our guide to <a href="/blog/best-page-size-and-margin-settings-for-pdf-export">page size and margin settings</a>.</li>
<li><strong>Template text boxes.</strong> Many downloaded resume templates place the name, contact block and sidebar in separate text boxes. These can move during conversion and are often read out of order. If your template uses them, move that text into ordinary paragraphs or a table.</li>
</ul>
<h2>Reads wrong: ATS parsing</h2>
<ul><li>Text inside images or scanned pages can't be read. Test by selecting text in the PDF.</li><li>Headers and footers are sometimes skipped — keep contact details in the main body.</li><li>Unusual headings ("My Journey") confuse parsers. Use "Experience", "Education", "Skills".</li></ul>
<p>Links need care too. Our converter keeps hyperlinks clickable, but a parser reads the text you see on the page, not the address hidden behind it. A word like "Portfolio" with a link attached gives the ATS nothing it can use. Write the address itself, for example linkedin.com/in/your-name, so it survives whether the reader is a person or a program.</p>
<h2>The 2-minute test</h2>
<ol><li>Open the PDF and press Ctrl+A to select all text, then paste it into Notepad.</li><li>If the order makes sense and nothing is missing, ATS will read it too.</li><li>If text is missing, recreate the PDF from Word rather than printing to image.</li></ol>
<h2>What the pasted text tells you</h2>
<p>The Notepad test is more useful once you know how to read the result. Here is what the common failures look like:</p>
<ul>
<li><strong>Lines from two columns are mixed together.</strong> For example, "Sales Executive, 2022–2024 Skills: Tally, MS Excel" on one line, when the job title was in the left column and the skills in the right. The parser is reading straight across the page. Switch to a single-column layout, or at least keep each section in one column.</li>
<li><strong>Your name, phone or email is missing.</strong> They were in the header, a text box or a picture. Move them into the first lines of the main body.</li>
<li><strong>Nothing pastes at all.</strong> The PDF is an image, from a scan, a photo or a "print to image" export. Create it again from the document.</li>
<li><strong>Odd symbols or empty squares appear.</strong> These are icons or decorative bullets drawn with a symbol font. Replace them with plain text and standard bullets.</li></ul>
<p>Also see: <a href="/blog/pdf-vs-docx-which-format-should-a-job-applicant-send">PDF vs DOCX for job applications</a>.</p>
${T("word-to-pdf", "Word to PDF")}
<h2>If you only have the PDF</h2>
<p>Lost the Word file, or got your resume made by someone else as a PDF? You can still fix it:</p>
<ol>
<li>Convert it to an editable .docx using <a href="/pdf-to-word">PDF to Word</a>. If the text can't be selected, tick the OCR option so the words are recognised first.</li>
<li>Open the .docx and fix the problems found by the Notepad test: move contact details into the body, replace icons with words, and straighten out the columns.</li>
<li>Convert it back with <a href="/word-to-pdf">Word to PDF</a> and run the Notepad test once more.</li>
</ol>
<p>Check every phone number, date and email address after an OCR conversion. A single wrong digit in your phone number costs more than any layout problem.</p>
<h2>Before you hit Submit</h2>
<ul>
<li>The pasted text is in a sensible order, top to bottom.</li>
<li>Name, phone and email appear in the first few lines of that text.</li>
<li>Headings are plain words a parser expects.</li>
<li>No skill bars, star ratings or icons carry information on their own.</li>
<li>Links are written out as visible addresses.</li>
<li>The page count is what you intended, with no stray second page.</li>
</ul>
`,
  },
  {
    slug: "delete-unwanted-pages-from-a-pdf-free-online-tool-guide", tool: "remove-pages", date: "2026-11-16", updated: "2026-11-20",
    title: "Delete Unwanted Pages from a PDF: Free Online Tool Guide",
    description: "Remove blank, duplicate or unneeded pages from a PDF in seconds — free, visual and private. Includes the odd/even trick for double-sided scans.",
    body: `
<p>Blank backs from double-sided scanning, duplicate pages, or instructions a portal doesn't need — deleting them makes your PDF cleaner and smaller.</p>
<h2>How to delete pages</h2>
<ol><li>Open the <a href="/remove-pages">PDF page remover</a> and select your file.</li><li>Click each page you want to delete — it turns red. Or type numbers like <code>2, 5-7</code>.</li><li>Click <strong>Remove pages</strong> and download.</li></ol>
${T("remove-pages", "Remove Pages")}
<h2>Clicking vs typing: use both</h2>
<p>The thumbnails and the "Pages to remove" box stay in step with each other. Click a thumbnail and its number appears in the box; type in the box and the matching thumbnails turn red. That means you can type a rough range quickly and then fix it by clicking, or click a few pages and read the box to double-check what you picked. A counter under the box shows how many pages are selected out of the total.</p>
<p>A few typing shortcuts help with long files:</p>
<ul>
<li><code>15-</code> selects page 15 through to the last page, which saves you checking the exact page count.</li>
<li><code>1, 3, 9-12</code> mixes single pages and ranges in one go.</li>
<li>Typing replaces the current selection, so finish your list before you start clicking extra pages.</li>
</ul>
<p>On a phone, tap the thumbnails instead of typing; they are easier to hit than the small box. On a computer you can also move through the pages with the Tab key and press Space or Enter to select one.</p>
<h2>The page number is the position, not the printed number</h2>
<p>The number under each thumbnail is the page's position in the file: first page is 1, second is 2, and so on. It may not match the number printed on the paper. A report with a cover and a contents page might print "1" on its third page. A scanned book often has no printed numbers at all. When you type ranges, always go by the thumbnail numbers, not by what the document says at the bottom of each page.</p>
<h2>The double-sided scan trick</h2>
<p>If every second page is blank, click <strong>Even pages</strong> to select pages 2, 4, 6… in one go.</p>
<p>Before you click Remove, scroll through the selection once. The trick assumes every sheet had nothing on the back, and real bundles rarely behave that well. A marksheet with grading notes on the reverse, or a certificate stamped on the back, will be selected along with the blank pages. Click any page that has content to deselect it. If the blank backs fall on odd pages instead, because the first page of the bundle was itself a blank back, use <strong>Odd pages</strong>. The Odd and Even buttons add to whatever is already selected, and <strong>Clear</strong> empties the selection if you want to start over.</p>
<h2>Which pages are worth removing?</h2>
<p>When you're preparing a file for an application or an office, these are the usual suspects:</p>
<ul>
<li><strong>Scanner leftovers:</strong> blank backs, a page scanned twice, a page caught at an angle that you then rescanned properly.</li>
<li><strong>Instructions and terms:</strong> the "how to fill this form" page from a downloaded form, or general terms pages a reviewer doesn't need.</li>
<li><strong>Slides you didn't present:</strong> in a PDF made from a presentation, each slide is a page, so backup or hidden slides can go.</li>
<li><strong>Old versions:</strong> an unsigned page left in a file next to the signed one.</li>
</ul>
<p>Be careful with official documents. If a portal or office wants a document "complete" or "all pages", send all pages, including ones that look empty. Removing a page from a bank statement or agreement can make it look edited. Trim your own scans and bundles, not documents someone else issued as a set.</p>
<h2>Check the result before you upload</h2>
<p>After you click Remove pages, the result screen says how many pages were removed and how many remain. Compare that with what you expected. If you meant to drop 4 pages from 20 and it says 15 remain, something extra was selected. Tap <strong>Open preview</strong> to scroll through the new file. The download is a new file ending in <em>-edited.pdf</em>; your original stays untouched, so you can always go back and try again.</p>
<h2>When something goes wrong</h2>
<ul>
<li><strong>"You can't remove every page — keep at least one."</strong> Your selection covers the whole document, often because you clicked both Odd pages and Even pages. Click Clear and select again.</li>
<li><strong>"Select at least one page."</strong> Nothing was selected. Click a thumbnail or type a page number first.</li>
<li><strong>The file asks for a password.</strong> Type it in. It stays on your device and is only needed to open the file. If you've forgotten it, no tool can safely skip it, so ask whoever sent the file.</li>
<li><strong>The page numbers printed on the paper now have gaps.</strong> That's expected: printed numbers belong to the page image or text itself, so they don't update. If the document never had numbers and you'd like some, add them afterwards with <a href="/add-page-numbers">Add Page Numbers</a>.</li>
</ul>
<h2>Need the opposite?</h2>
<p>If you want to keep only a few pages, <a href="/extract-pages">Extract Pages</a> is faster. To reorder pages as well, use <a href="/organize-pdf">Organize PDF</a>.</p>
<h2>Does deleting pages shrink the file?</h2>
<p>Yes — images and fonts used only by deleted pages are removed. For a bigger reduction, follow up with <a href="/compress-pdf">Compress PDF</a>.</p>
<p>How much it shrinks depends on what you removed. A blank scanned page is usually lighter than one covered in text, stamps or photos, so dropping ten blank backs may save less than you hoped. Removing pages with photos, colour stamps or full-colour scans saves much more. If you still need to hit a KB limit, the result screen links straight to Compress PDF with your edited file already loaded.</p>
<h2>FAQ</h2>
<h3>Can I delete pages from several PDFs at once?</h3>
<p>Remove Pages works on one file at a time. If the files belong together anyway, <a href="/merge-pdf">merge them</a> first and then remove the unwanted pages from the combined file in one pass.</p>
<h3>Can I undo a removal?</h3>
<p>Not inside the new file, but you don't need to: your original PDF is never changed. Open it again and make a different selection.</p>
<h3>Does it work on long documents?</h3>
<p>Yes. Everything runs on your device, so a long file doesn't have to upload first. Page previews are drawn for the first 500 pages; for anything beyond that, type the page numbers in the box. Very large scanned files can be slow on older phones, and a laptop handles them more comfortably.</p>
`,
  },
  {
    slug: "convert-jpg-images-into-a-single-pdf-free-fast-online", tool: "jpg-to-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "Convert JPG Images into a Single PDF (Free, Fast, Online)",
    description: "Combine multiple photos into one PDF — reorder, rotate, choose A4 size — free with no upload. Works with JPG, PNG, WEBP and iPhone HEIC.",
    body: `
<p>Photos of certificates, receipts or handwritten notes are easier to share as one PDF. Here's how, along with the settings that matter and fixes for the problems people usually hit.</p>
<h2>Steps</h2>
<ol><li>Open <a href="/jpg-to-pdf">JPG to PDF</a> and select all your images.</li><li>Drag to reorder; tap ⟳ to rotate any sideways photo.</li><li>Pick A4 for printing or "Same as image" to keep the original size.</li><li>Click <strong>Convert to PDF</strong>.</li></ol>
${T("jpg-to-pdf", "JPG to PDF")}
<h2>Which image types work?</h2>
<p>JPG and PNG go straight in. WEBP, GIF and BMP are also accepted; your browser opens them and the tool turns each into a high-quality JPG before placing it in the PDF. iPhone HEIC photos work in browsers that can open HEIC, such as Safari. If a HEIC photo won't load on a Windows or Android browser, the simplest fix is on the iPhone itself: go to <strong>Settings → Camera → Formats</strong> and choose <strong>Most Compatible</strong>, and new photos will be saved as JPG from then on.</p>
<p>If you pick a PDF or another non-image file by mistake, the tool asks you to choose image files instead. To combine photos with documents that are already PDFs, convert the photos here first and then use <a href="/merge-pdf">Merge PDF</a>.</p>
<h2>The settings, explained</h2>
<p>The side panel has three choices. The defaults (A4, Automatic, Small margin) suit most document photos, but here is what each one does.</p>
<table>
<tr><th>Setting</th><th>Options</th><th>When to change it</th></tr>
<tr><td>Page size</td><td>A4, US Letter, Legal, Same as image</td><td>A4 is the standard paper size in India, so keep it for anything that may be printed. Use US Letter for documents going to the US. "Same as image" sizes each page to its photo, which is fine for viewing on screen but can give very large pages from phone photos.</td></tr>
<tr><td>Orientation</td><td>Automatic, Portrait, Landscape</td><td>Automatic gives wide photos a landscape page and tall photos a portrait page. Choose Portrait if you want every page upright for printing; wide photos are then shrunk to fit the page width.</td></tr>
<tr><td>Margin</td><td>No margin, Small, Large</td><td>Small leaves about a quarter inch of white space. Choose Large (about half an inch) if the printout will be stapled or punched, or No margin to let a photo use the full page.</td></tr>
</table>
<p>Whatever you choose, each photo is scaled to fit inside the page and centred. Nothing is cropped or stretched, so a long receipt on an A4 page simply gets white space at the sides.</p>
<h2>Worked example: twelve rent receipts for an HRA claim</h2>
<p>Many employers ask for rent receipts as proof when you claim HRA. Say you have photographed twelve monthly receipts and want to send one file to HR.</p>
<ol>
<li>Select all twelve photos in JPG to PDF. Look at the order of the cards: the order your phone hands them over may not be the month order you want.</li>
<li>Move April to the front and March to the end with the arrow buttons beneath each card. If you're on a laptop, dragging the cards works too.</li>
<li>One receipt was photographed sideways. Tap ⟳ on its card until it's upright. Each tap turns it a quarter-turn clockwise.</li>
<li>Leave the page size on A4, orientation on Automatic and margin on Small, then press <strong>Convert to PDF</strong>.</li>
<li>The result screen confirms 12 images became a 12-page PDF, named <em>images.pdf</em>. Rename it to something HR will recognise, like your name plus "rent receipts".</li>
<li>Twelve phone photos can easily make a PDF of 30 MB or more. If the HR portal or email has a size cap, choose <strong>Compress PDF</strong> from the links below the download button and type in the limit.</li>
</ol>
<h2>Quality and size</h2>
<p>JPG photos are embedded exactly as they are — no re-compression — so quality is identical. The one exception is a photo you rotate with ⟳: the rotated copy is saved again at high quality, which is not noticeable in practice. Phone photos are large (3–5 MB each), so if you need a small file, compress afterwards with an exact KB target.</p>
<p>You can also make the file smaller before converting. Crop each photo in your phone's gallery editor so only the document is left; fewer pixels means a lighter PDF. And where you have a choice, use the original photo from your camera rather than a copy someone forwarded on WhatsApp, which usually compresses photos sent the normal way and leaves fine print looking soft.</p>
<h2>Before you click Convert</h2>
<ul>
<li>Is every photo sharp enough to read the smallest text, such as a roll number or a date?</li>
<li>Is the whole document in each photo, with no corner cut off?</li>
<li>Are the cards in the order the reader expects?</li>
<li>Is anything sideways or upside down in the previews?</li>
<li>Did you leave out duplicates and failed shots? Use the ✕ on a card to drop it.</li>
</ul>
<h2>Fixing common problems</h2>
<ul>
<li><strong>You forgot a photo.</strong> Tap <strong>+ Add more files</strong> to add it to the end of the list, then move it into place. Dropping new images onto the workspace starts over with only those images.</li>
<li><strong>A page came out sideways in the PDF.</strong> Open the result with <strong>Open preview</strong> to check. If a page needs turning, run the PDF through <a href="/rotate-pdf">Rotate PDF</a>, which turns pages without re-saving the images.</li>
<li><strong>You need the front and back of a card on one page.</strong> This tool always puts one image on each page. Join the two photos into one image first, or keep them as two pages if the portal accepts that.</li>
<li><strong>The PDF won't fit a strict KB limit.</strong> If even compression can't reach it, try fewer pages or tighter crops, and in Compress PDF leave "Keep colour" unticked so it is free to switch to grayscale. If the portal also wants your photo and signature resized to exact pixel and KB rules, <a href="/exam-form-ready">Exam Form Ready</a> is built for that job.</li>
</ul>
<h2>Photos of documents?</h2>
<p>Use <a href="/scan-to-pdf">Scan to PDF</a> instead: it removes shadows and whitens the paper so photos look like real scans.</p>
<p>A simple way to decide: JPG to PDF keeps your images exactly as they are, which is right for photos, artwork, screenshots and documents that were already photographed well. Scan to PDF changes the image to make paper look like paper, which is right for pages shot on a desk under room lighting.</p>
`,
  },
  {
    slug: "merge-vs-split-pdf-when-to-use-each", tool: "split-pdf", date: "2026-08-12", updated: "2026-11-20",
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
${T("merge-pdf", "Merge PDF")}
<h2>Three questions that decide it</h2>
<p>If the list above didn't settle it, ask yourself these in order.</p>
<ol>
<li><strong>How many files do you start with?</strong> Two or more means Merge is involved somewhere. Merge is the only one of these tools that accepts more than one PDF at a time; Split, Extract, Remove and Organize each work on a single file.</li>
<li><strong>How many files do you need at the end?</strong> Several means Split (or Extract with its "save each selected page as a separate PDF" box ticked). One means Extract, Remove or Organize.</li>
<li><strong>Does anything need to move or turn?</strong> If pages are in the wrong order or lying sideways, go straight to Organize. Extract, Remove and Split all keep pages in their original order and orientation.</li>
</ol>
<h2>What each tool gives you back</h2>
<p>Knowing what you'll download helps you pick, and it also tells you where to find the result afterwards.</p>
<table>
<tr><th>Tool</th><th>You give it</th><th>You download</th></tr>
<tr><td>Merge PDF</td><td>Two or more PDFs</td><td>One file, <em>merged.pdf</em></td></tr>
<tr><td>Split PDF</td><td>One PDF plus ranges or a page count</td><td>A ZIP of parts, or a single PDF if only one part results</td></tr>
<tr><td>Extract Pages</td><td>One PDF plus the pages to keep</td><td>One PDF of those pages, or a ZIP of single pages if you tick the box</td></tr>
<tr><td>Remove Pages</td><td>One PDF plus the pages to drop</td><td>One PDF ending in <em>-edited.pdf</em></td></tr>
<tr><td>Organize PDF</td><td>One PDF</td><td>One PDF ending in <em>-organized.pdf</em>, reordered, rotated and trimmed</td></tr>
</table>
<p>None of them change the file you started with. You always get a new download, so you can try again with different choices if the first result isn't right.</p>
<h2>Pairs that people mix up</h2>
<h3>Extract or Remove?</h3>
<p>They are two sides of the same job. Pick whichever means less clicking. Keeping 3 pages out of 40? Extract and select the 3. Dropping 3 pages out of 40? Remove and select the 3. The result is the same PDF either way.</p>
<h3>Split or Extract?</h3>
<p>Split thinks about the whole document: every page ends up in some output file. Extract only cares about the pages you pick and ignores the rest. If you want one chapter from a textbook, extract it. If you want every chapter as its own file, split by ranges.</p>
<h3>Remove or Organize?</h3>
<p>Remove is quicker when deleting is the only fix, and it has buttons that select all odd or all even pages at once. Organize is better when you also need to drag pages into a new order, turn a landscape table the right way up or insert a blank page. In Organize, deleted pages stay greyed out until you save, so a wrong click is easy to undo.</p>
<h3>Merge or JPG to PDF?</h3>
<p>Merge only accepts PDFs. If your documents are photos, <a href="/jpg-to-pdf">JPG to PDF</a> combines the images into one PDF in a single step. If you have a mix of photos and PDFs, convert the photos first, then merge everything.</p>
<h2>Jobs that need two tools</h2>
<p>Some common tasks don't fit one tool. These combinations handle them, and since every step copies pages without re-compressing them, chaining tools costs you nothing in quality.</p>
<ul>
<li><strong>Swap in a signed page.</strong> You printed page 4 of a 6-page agreement, signed it and scanned it. Merge the original agreement with the scanned page, then open the result in Organize, drag the signed page into position 4 and delete the old unsigned page 4.</li>
<li><strong>Take a few pages from each of several files.</strong> Merge cannot pick pages from inside each file. Merge everything first, then use Remove Pages to drop what you don't need. Or extract the pages you want from each file first and merge those smaller pieces.</li>
<li><strong>Rebuild a jumbled scan bundle.</strong> Two family members' certificates got scanned into one file in random order. Split by ranges so each person's pages are separate, then merge each person's set in the right order, or fix each set in Organize.</li>
<li><strong>Bundle and number.</strong> For a long submission where reviewers will refer to page numbers, merge the documents and then continue to <a href="/add-page-numbers">Add Page Numbers</a> from the result screen.</li>
</ul>
<h2>What none of these tools do</h2>
<p>Merge, Split, Extract, Remove and Organize move whole pages around. They don't touch what's printed on a page. To change text, add a date or fill in a blank, use <a href="/edit-pdf">Edit PDF</a>. To cut away a scanner's black border or extra white space, use <a href="/crop-pdf">Crop PDF</a>. And because these tools keep every page exactly as it was, they won't make a heavy scan light. If the file is too big for an upload, shrink it with <a href="/compress-pdf">Compress PDF</a> afterwards.</p>
<h2>FAQ</h2>
<h3>Can I merge and reorder pages in one step?</h3>
<p>Merge orders whole files, not individual pages. If a single page from the second file needs to sit between pages of the first, merge first and then move that page in Organize.</p>
<h3>Which tool fits ID cards scanned on both sides?</h3>
<p>If one file holds several cards, two pages each, split it with "Every N pages" set to 2. If you have the front and back as two separate PDFs, merge them.</p>
<h3>Where can I read more about each tool?</h3>
<p>The step-by-step guides cover each tool in detail: <a href="/blog/how-to-merge-multiple-pdfs-into-one-file-free-fast">merging PDFs</a>, <a href="/blog/how-to-split-a-large-pdf-into-separate-files-free-and-fast">splitting a large PDF</a> and <a href="/blog/delete-unwanted-pages-from-a-pdf-free-online-tool-guide">deleting unwanted pages</a>.</p>
`,
  },
  {
    slug: "compress-pdf-without-losing-quality", tool: "compress-pdf", date: "2026-08-15", updated: "2026-11-20",
    title: "How to Compress a PDF Without Wrecking the Quality",
    description: "Shrink PDFs for email and upload limits while keeping text sharp. Why scans compress most, which level to choose, and how to hit an exact KB size.",
    body: `
<p>A good compressor shrinks images, not text. Here's how to get the smallest file that still looks right, why some files barely shrink, and what to check before you send it off.</p>
<h2>Why some PDFs are huge</h2>
<p>Almost all PDF weight is <strong>images</strong>: scanned pages, photos and screenshots. A page scanned at 600 DPI in colour can be 2–5 MB on its own. Text and vector graphics are tiny.</p>
<p>That gives you a quick way to predict the result before you start. A 4 MB PDF made by scanning certificates will shrink a lot, because nearly all of it is picture data. A 4 MB report exported from Word with no photos is a different case: there is very little to resize, so the savings come only from tidying the file's internal structure and fonts, and they are usually modest.</p>
<h2>Choose the right mode</h2>
<ul><li><strong>Recommended</strong> — images around 150 DPI. Looks the same on screen; ideal for email.</li><li><strong>Less</strong> — around 220 DPI. Good for printing.</li><li><strong>Extreme</strong> — around 96 DPI. Smallest; images look softer.</li><li><strong>Exact size</strong> — enter the limit (e.g. 200 KB). We search for the sharpest settings that fit and show the final size.</li></ul>
${T("compress-pdf", "Compress PDF")}
<h2>What the three levels actually change</h2>
<p>The DPI figure is a ceiling, measured against the page size. An image that already has fewer pixels than that ceiling is not enlarged, and an image larger than it is scaled down. Each level also sets a JPEG quality: higher for Less, lower for Extreme. So Extreme saves space twice over, with fewer pixels and stronger JPEG compression, which is why photos and scanned handwriting look softer at that setting.</p>
<p>Behind the scenes, each level runs two separate PDF engines, Ghostscript and MuPDF, and keeps whichever output is smaller. Both trim embedded fonts down to the characters your document uses and store identical images only once, so a letterhead logo repeated on every page doesn't count twenty times.</p>
<p>The result is never bigger than what you started with. If neither engine produces a smaller file, the tool tries a lossless clean-up. If even that doesn't help, you get your original back with the message "Already optimised", rather than a file that is the same size but worse.</p>
<h2>How exact-size compression works</h2>
<p>We measure how your images respond to different resolutions and quality levels, predict the best combination, and verify it. If switching to grayscale lets us keep a much higher resolution (sharper text in scans), we do that — unless you tick "Keep colour".</p>
<p>In practice, it first checks whether the file already fits at a generous 300 DPI. If it does, you get that version and nothing is squeezed harder than necessary. If not, it works out how much of your limit the non-image parts (text, fonts, page structure) take up, then compares a few colour and grayscale combinations to see which leaves the images sharpest. The final file aims to land just under your limit. The note under the result shows the image resolution it settled on and whether it switched to grayscale, and the file name includes the final size in KB.</p>
<p>Tick <strong>Keep colour</strong> when colour carries meaning: a blue-ink signature that must look like an original, a coloured seal on a caste or income certificate, or a photo on an ID card. Leave it unticked for typed letters and printed forms, where grayscale often buys you noticeably sharper text within the same limit.</p>
<h2>A worked example: a certificate with a 300 KB limit</h2>
<p>The NEET UG application, for example, asks for category and other certificates as a PDF between 50 KB and 300 KB (as listed in NTA's 2026 information bulletin; always check the current notice for your exam). Say your scanned certificate is 3.8 MB.</p>
<ol><li>Open Compress PDF and add the scanned certificate.</li><li>Choose <strong>Exact size</strong>, type <strong>290</strong> and pick KB.</li><li>Leave Keep colour unticked unless the seal or signature must stay in colour.</li><li>Click Compress PDF, then use <strong>Open preview</strong> to inspect the smallest printed line up close.</li></ol>
<p>Why 290 and not 300? Our tool counts 1 KB as 1,024 bytes. Some portals count 1 KB as 1,000 bytes, so a file that is exactly "300 KB" by one count can be slightly over by the other. A few KB of headroom removes that risk. The same reasoning applies to the minimum: a portal that also sets a lower limit, like 50 KB here, will reject a file that is too small, so don't aim far below the maximum just because you can.</p>
<h2>When a target is impossible</h2>
<p>A 30-page colour scan won't fit in 100 KB and stay readable. We'll tell you instead of handing you a blurry file. Remove unneeded pages or split the document.</p>
<p>Before you give up on the limit, look at what's in the file. Blank backs of pages, an instruction sheet the portal doesn't need, or a second copy of the same certificate all cost space. Delete them with <a href="/remove-pages">Remove Pages</a>, or if the portal lets you upload several files, divide the document with <a href="/split-pdf">Split PDF</a> and compress each part to the limit. Cropping won't help here: <a href="/crop-pdf">Crop PDF</a> only hides the area outside the crop box, so the file stays the same size.</p>
<h2>Text stays text</h2>
<p>Our compressor never turns text into an image, so it stays sharp at any zoom and remains searchable and copyable.</p>
<p>One caveat: in a scanned PDF there is no real text, only a picture of it. Compression treats every scanned page as an image, so a very small limit will soften the letters. If you need the scan to be searchable afterwards, run <a href="/ocr-pdf">OCR PDF</a> on the compressed file.</p>
<h2>If the result isn't what you expected</h2>
<ul><li><strong>"Already optimised" on Recommended:</strong> the images are already at or below 150 DPI and well compressed, or there are hardly any images. Try Extreme or Exact size; if the file is mostly text, removing pages is the only real saving.</li><li><strong>Only a few percent smaller:</strong> same cause. The before and after sizes are shown on the result screen, so you can see this straight away and decide whether it's worth using.</li><li><strong>Small print looks fuzzy:</strong> raise the limit, switch from Extreme to Recommended, or untick Keep colour so grayscale can spend the space on resolution instead.</li><li><strong>A password box pops up:</strong> the PDF is protected. Type its password to continue; compression can't read the pages without it.</li></ul>
<h2>Merge first, compress last</h2>
<p>If a portal wants several documents as one upload, combine them before you compress. <a href="/merge-pdf">Merge PDF</a> doesn't re-compress anything, so merging three compressed files gives you roughly their combined size, which may now be over the limit. Do the page work first (remove, rotate, merge), then run Exact size once on the finished file.</p>
<p>Also compress from the original whenever you can. Each pass re-encodes the images as JPEG, so compressing an already compressed copy loses a little more detail each time. Keep the full-size file safe and make a fresh small copy for each portal.</p>
<h2>FAQ</h2>
<h3>Does the file get uploaded anywhere?</h3>
<p>No. All the compression work happens inside your browser tab, and the PDF stays on your device. Very large files, in the hundreds of MB, are easier to handle on a computer than a phone.</p>
<h3>Which mode should I use for an email attachment?</h3>
<p>Recommended. It keeps the document looking the same on screen while cutting most of the size. Use Exact size when someone has given you a specific number.</p>
<h3>Can I print the compressed file?</h3>
<p>Text prints cleanly at any level because it isn't converted to images. For scans and photos that will be printed, Less keeps more detail.</p>
`,
  },
  {
    slug: "convert-a-webpage-to-pdf-in-your-browser-no-sign-up", tool: "html-to-pdf", date: "2026-11-16", updated: "2026-11-20",
    title: "Convert a Web Page to PDF (No Sign-up)",
    description: "Save any web page as a clean PDF: paste the URL and download. Or use your browser's built-in Print to PDF. Both methods explained.",
    body: `
<p>Saving web pages as PDF is handy for receipts, results, articles and documentation you want offline. There are two good ways to do it, and the right one depends mostly on one question: can anyone open this page, or only you after logging in?</p>
<h2>Which method should you use?</h2>
<table>
<thead><tr><th>The page is…</th><th>Use</th></tr></thead>
<tbody>
<tr><td>Public: a news article, a government notice, a help page, a blog post</td><td>Method 1, paste the URL</td></tr>
<tr><td>Behind a login: a bank statement page, an exam portal, your email</td><td>Method 2, Print to PDF</td></tr>
<tr><td>Something you can only reach once, like a payment confirmation</td><td>Method 2, before you close the tab</td></tr>
<tr><td>An .html file saved on your computer</td><td>Method 1, using Select HTML file</td></tr>
</tbody>
</table>
<h2>Method 1: Paste the URL</h2>
<ol><li>Open <a href="/html-to-pdf">HTML to PDF</a>.</li><li>Paste the page address and click <strong>Convert URL</strong>.</li><li>Download the PDF. Links stay clickable.</li></ol>
${T("html-to-pdf", "HTML to PDF")}
<p>We render the page with headless Chromium — the same engine as Google Chrome — so layout and fonts match what you see.</p>
<h2>What happens when you click Convert URL</h2>
<p>Unlike most tools on this site, this one needs our server, because a web page has to be fetched from the internet and laid out by a real browser. Here is what that means for you:</p>
<ul><li><strong>The address goes to our converter, not the page itself.</strong> Our server opens the URL in its own browser, prints it to PDF and sends the file back. Its temporary copy is wiped as soon as your PDF has been sent.</li><li><strong>The first conversion can be slow.</strong> Our converter is hosted on a free plan and goes to sleep after a quiet spell. If it's dozing, you'll see "Starting the converter…" for about 30 to 60 seconds. Conversions after that start straight away.</li><li><strong>It waits for the page to load.</strong> The converter waits until the page stops downloading new content, so most images and fonts are in place before it prints.</li><li><strong>It uses the on-screen design.</strong> The page is captured with its normal screen design and background colours, on A4 pages with narrow margins, rather than with any special print layout the site may have.</li><li><strong>You don't need to type https.</strong> If you paste an address without it, it's added for you. The PDF is named after the website, such as <em>example.com.pdf</em>.</li></ul>
<p>Because our server's browser has never visited the site before, it sees what any first-time visitor sees. Cookie notices or "sign up for updates" pop-ups that appear on your first visit may appear in the PDF too.</p>
<h2>Method 2: Your browser's Print to PDF</h2>
<p>For pages behind a login (bank, exam portal, email), our converter can't see them. Instead press <strong>Ctrl+P</strong> (or Share → Print on mobile) and choose <strong>Save as PDF</strong>. Turn on "Background graphics" for colours.</p>
<p>A few details make this method work better:</p>
<ul><li><strong>On a computer:</strong> in Chrome and Edge, Ctrl+P opens the print preview (Cmd+P on a Mac). Set Destination to Save as PDF. Under More settings you'll find Background graphics, plus a Headers and footers option that adds the date, page title, web address and page numbers. Leave it on if you want a record of where and when you saved the page; turn it off for a cleaner copy.</li><li><strong>Only some pages:</strong> the print preview shows the page count. Choose Custom under Pages and type a range to skip the comment section or footer you don't need.</li><li><strong>On Android:</strong> in Chrome, open the ⋮ menu, tap Share, then Print, and pick Save as PDF as the printer.</li><li><strong>Long pages:</strong> scroll to the bottom first. Some sites only load images as you scroll, and anything that hasn't loaded yet may print as an empty box.</li></ul>
<p>If a portal offers its own Download or Print button for an admit card, a receipt or a result, use that first. It gives you the document the portal intends you to keep, and it often has a cleaner layout than a printout of the whole page.</p>
<h2>Uploading a saved HTML file</h2>
<p>The <strong>Select HTML file</strong> button takes an .html or .htm file up to 10 MB. It is also converted on our server. Keep in mind that when a browser saves a page as "Webpage, complete", the images go into a separate folder next to the .html file. Only the .html file is sent for conversion, so pictures stored in that folder may not appear. For a public page, pasting the URL usually gives a more faithful result.</p>
<h2>When the PDF doesn't look right</h2>
<ul><li><strong>"That address can't be converted":</strong> either the website name doesn't exist (check the spelling), or the address points to a private or local network, such as a router settings page or an office intranet. Our server can't reach those. Use Print to PDF from a computer on that network.</li><li><strong>"We couldn't open that page":</strong> the site didn't load in time or refused the visit. Open the address in your own browser to confirm it works, then try again.</li><li><strong>The PDF shows a sign-in page or an "access denied" message:</strong> the content needs a login, or the site blocks automated browsers. Use Method 2.</li><li><strong>Parts are missing:</strong> anything you normally reveal by clicking, like tabs, "read more" buttons or collapsed answers, stays closed, because the converter doesn't click anything. Open those sections in your own browser and use Print to PDF.</li><li><strong>"Conversion failed. Please try again":</strong> the converter handles one job at a time and limits how many conversions one connection can run per hour. Wait a little and retry.</li></ul>
<h2>Tips</h2>
<ul><li>Many news sites have a "print" view that removes ads — convert that URL.</li><li>Long pages become multi-page PDFs; use <a href="/remove-pages">Remove Pages</a> to trim.</li><li>Saving several related pages, such as all the parts of a long tutorial? Convert each URL, then combine the files in reading order with <a href="/merge-pdf">Merge PDF</a>.</li><li>Pages full of photos can make a large PDF. Run it through <a href="/compress-pdf">Compress PDF</a> before emailing or uploading it.</li><li>Want to find a phrase in the saved page later? Text from Method 1 stays as real text, so your PDF reader's search will find it.</li></ul>
`,
  },
  {
    slug: "how-a-legal-assistant-can-embed-fonts-correctly-when-exporting-to-pdf", tool: "pdf-to-pdfa", date: "2026-08-20", updated: "2026-11-20",
    title: "How to Embed Fonts Correctly When Exporting to PDF (Legal Documents Guide)",
    description: "Make sure every font is embedded when you export a petition, affidavit or contract to PDF — Word settings, how to check, and how to fix 'font could not be embedded' errors.",
    body: `
<p>Court e-filing portals, registries and opposing counsel all expect a PDF that looks identical on every computer. The most common reason it doesn't is a <strong>font that wasn't embedded</strong>: the reader's computer substitutes another font, and line breaks, page numbers and paragraph references shift. Here's how a legal assistant (or anyone sending formal documents) can get it right every time.</p>
<h2>What "embedding a font" means</h2>
<p>A PDF can either carry the font data inside the file (embedded) or just name the font and hope the reader has it installed. Embedded fonts guarantee the same look everywhere. Most tools embed only the characters you used (an <em>embedded subset</em>), which keeps the file small and is perfectly acceptable for filing.</p>
<p>In legal work the cost of a missing font is higher than usual. If a substituted font is wider, a paragraph that ended on page 12 in your draft now runs to page 13, and every "see para 14 at page 12" in the index and the written submissions points to the wrong place.</p>
<h2>Exporting from Microsoft Word</h2>
<ol>
<li>Use <strong>File → Save As → PDF</strong> (or <strong>File → Export → Create PDF/XPS</strong>) rather than a third-party "print to PDF" driver.</li>
<li>Click <strong>Options</strong> and tick <strong>ISO 19005-1 compliant (PDF/A)</strong>. PDF/A requires every font to be embedded, so Word will embed them or warn you.</li>
<li>Leave <em>Optimize for</em> on <strong>Standard</strong>, not <em>Minimum size</em>.</li>
<li>If you send the .docx itself to a colleague, also enable <strong>File → Options → Save → Embed fonts in the file</strong> so they see the same fonts before exporting.</li>
</ol>
<p>Working in LibreOffice Writer instead? Choose <strong>File → Export as PDF</strong> and tick the PDF/A (archive) option on the General tab; it has the same effect of forcing fonts to be embedded.</p>
<p>No Word? Our <a href="/word-to-pdf">Word to PDF converter</a> uses LibreOffice with metric-compatible versions of Calibri, Cambria, Arial and Times New Roman and embeds all fonts automatically.</p>
<p>One point for confidential matters: Word to PDF sends your file over HTTPS to our converter, where it is converted in a temporary folder that is deleted as soon as the PDF is returned. Files can be up to 20 MB. The PDF to PDF/A tool works differently and runs entirely in your browser. If your firm's policy does not allow client documents to be sent to any outside service, export from Word on your own machine and use PDF to PDF/A for the final step.</p>
<h2>How to check that fonts are embedded</h2>
<ul>
<li>In Adobe Acrobat Reader: <strong>File → Properties → Fonts</strong>. Every font should say <em>(Embedded)</em> or <em>(Embedded Subset)</em>.</li>
<li>Any font listed without that label will be substituted on other computers — fix it before filing.</li>
<li>A non-embedded font often shows an <em>Actual Font</em> line underneath it. That is the font your own computer substituted, and it tells you the reader at the other end may see something different again.</li>
</ul>
<p>Check the finished file. Headers, footers, footnotes and text boxes can each use a different font from the body, so a document typed entirely in Times New Roman can still list three or four fonts in this tab.</p>
<h2>Vernacular text and legacy fonts</h2>
<p>Many affidavits, vakalatnamas and verifications include a portion in Hindi or another Indian language. If that portion was typed in an older non-Unicode font, such as the Kruti Dev family that many typists still use, the font is doing more than styling the text: the file stores ordinary Latin characters, and only that exact font makes them look like Devanagari. If it is not embedded, the reader sees a jumble of English letters and symbols instead of the verification.</p>
<p>Two fixes, in order of preference:</p>
<ul>
<li>Retype or convert that portion into a Unicode font that ships with Windows, such as Nirmala UI or Mangal. Unicode text stays readable and searchable even if a different Devanagari font is used to display it.</li>
<li>If you must keep the legacy font, export with the PDF/A option ticked and confirm in the Fonts tab that it shows as embedded. If Word warns that it could not embed it, see the next section.</li>
</ul>
<h2>"The document was saved without PDF/X compliancy because a required font could not be embedded"</h2>
<p>This warning means a font's licence forbids embedding, or the font file is missing on your machine. Fixes, in order of preference:</p>
<ol>
<li>Switch that text to a standard font that allows embedding (Times New Roman, Arial, Calibri, Garamond, Georgia).</li>
<li>Reinstall the font from its original source — partially installed fonts often cause the error.</li>
<li>As a last resort, convert the finished PDF with <a href="/pdf-to-pdfa">PDF to PDF/A</a>, which embeds every font it can find and outlines the rest so the text still looks right.</li>
</ol>
<p>A converter can only work with what is already in the PDF. If a font was never included in the file, no later tool can recover its exact shapes, so fixing the source document is always the more reliable route.</p>
${T("pdf-to-pdfa", "PDF to PDF/A")}
<h2>Worked example: preparing a petition with annexures</h2>
<p>Suppose you are filing a writ petition with a synopsis, the petition itself, an affidavit with a Hindi verification, and six annexures, some of them scanned. A sensible order of work:</p>
<ol>
<li><strong>Export each typed part from Word</strong> with the PDF/A option ticked, and check the Fonts tab of each one.</li>
<li><strong>Make scanned annexures searchable</strong> with <a href="/ocr-pdf">OCR PDF</a>, which supports English and Hindi among other languages and can read two languages in one pass.</li>
<li><strong>Combine everything in filing order</strong> with <a href="/merge-pdf">Merge PDF</a>.</li>
<li><strong>Number the pages</strong> with <a href="/add-page-numbers">Add Page Numbers</a>, using the page range option if the index pages should not be numbered.</li>
<li><strong>Convert the combined file</strong> with PDF to PDF/A as the last step that changes content, so the text added by the earlier tools is covered too. Pick the conformance level the portal names, or PDF/A-2b if it names none.</li>
<li><strong>Check the size and the fonts once more</strong> in the final file before uploading.</li>
</ol>
<p>Do not add a password to a file that must stay PDF/A: the standard does not allow encryption. If your source PDF is password-protected, the converter asks for the password and saves the PDF/A copy without one.</p>
<h2>Checklist before you file</h2>
<ul>
<li>All fonts show as embedded in the Fonts tab.</li>
<li>Page count and paragraph numbering match your Word file.</li>
<li>Text is selectable (not a scanned image) — if it's a scan, run <a href="/ocr-pdf">OCR PDF</a> first.</li>
<li>File size is within the portal's limit — use <a href="/compress-pdf">Compress PDF</a> with an exact KB target.</li>
<li>Confidential details are properly removed with <a href="/redact-pdf">Redact PDF</a>, not just covered with black boxes.</li>
<li>Any Hindi or regional-language portion reads correctly when the file is opened on a different computer.</li>
</ul>
<p>If you compress after converting to PDF/A, open the compressed file and confirm the portal still accepts it, since a later tool may not keep the PDF/A marking. It is usually simpler to compress the combined file first, convert it to PDF/A last, and then check the size one final time.</p>
<h2>FAQ</h2>
<h3>Is "Microsoft Print to PDF" good enough?</h3>
<p>It is better avoided for filings. Word's built-in Save As PDF gives you the PDF/A option and warns you about fonts it cannot embed, which a printer driver does not.</p>
<h3>Does PDF/A make the file larger?</h3>
<p>It can, because fonts and colour information that were missing are now inside the file. Fonts are usually embedded as subsets, so the increase is often small, but check the final size against the portal's limit.</p>
<h3>Which fonts are safest for court documents?</h3>
<p>Whatever the court's rules or practice directions specify comes first. Beyond that, the standard fonts listed above embed without trouble and are what most registries are used to seeing.</p>
`,
  },
  {
    slug: "best-page-size-and-margin-settings-for-pdf-export", tool: "word-to-pdf", date: "2026-08-20", updated: "2026-11-20",
    title: "Best Page Size and Margin Settings for PDF Export (A4 vs Letter)",
    description: "Which page size and margins to use when exporting resumes, assignments, legal and official documents to PDF — A4 vs Letter, safe margins, and how to fix pages that print cut off.",
    body: `
<p>A PDF that looks fine on screen can still print with cut-off edges, get rejected by a portal, or shrink to an odd size on the reader's printer. Getting page size and margins right before you export avoids all three.</p>
<h2>A4 or Letter?</h2>
<ul>
<li><strong>A4 (210 × 297 mm)</strong> — the standard in India, Europe, and most of the world. Use it for documents you submit in India.</li>
<li><strong>US Letter (8.5 × 11 in)</strong> — used in the US and Canada. Use it for applications to employers or universities there.</li>
</ul>
<p>Word sometimes defaults to Letter even on Indian computers. Check <strong>Layout → Size</strong> before you export. The two sizes look almost the same on screen, but they don't match on paper. A Letter page is about 216 × 279 mm: roughly 6 mm wider and 18 mm shorter than A4. Printed on A4 paper, a Letter page either gets scaled down or loses a thin strip at the side, and leaves an empty band at the bottom. The other way round, an A4 page printed on Letter paper loses its bottom edge, which is exactly where page numbers and signatures sit.</p>
<h2>Safe margins</h2>
<ul>
<li><strong>Most documents:</strong> 2.54 cm (1 inch) on all sides — Word's "Normal" setting.</li>
<li><strong>Resumes:</strong> 1.27–2 cm works if you need space, but don't go below 1.27 cm (0.5 inch); many printers can't print that close to the edge.</li>
<li><strong>Bound or filed documents:</strong> add extra space on the binding side (a left or "gutter" margin of 3–4 cm) — always follow the specific court, university or office rules when they exist.</li>
</ul>
<p>Word's "Narrow" preset is exactly 1.27 cm on every side, so for a resume that needs the room it is the lowest setting worth choosing. Anything you set in <strong>Custom Margins</strong> below that is a gamble on the reader's printer.</p>
<h2>Settings by document type</h2>
<table>
<tr><th>Document</th><th>Page size</th><th>Margins</th></tr>
<tr><td>Resume for an Indian employer</td><td>A4</td><td>1.27–2 cm</td></tr>
<tr><td>Resume for a US or Canadian employer</td><td>US Letter</td><td>1.27–2.54 cm (0.5–1 inch)</td></tr>
<tr><td>Cover letter or formal application</td><td>Same size as your resume</td><td>2.54 cm (Normal)</td></tr>
<tr><td>College assignment or project report</td><td>A4, unless told otherwise</td><td>Your department's format; Normal if none is given</td></tr>
<tr><td>Anything to be bound or filed</td><td>As specified</td><td>Extra space on the binding side, as specified</td></tr>
</table>
<p>When an institution publishes its own format, that wins over any table, including this one.</p>
<h2>Where to change page size and margins</h2>
<ul>
<li><strong>Microsoft Word:</strong> <strong>Layout → Size</strong> for the paper, <strong>Layout → Margins</strong> for the margins. For full control, open <strong>Layout → Margins → Custom Margins</strong>; the Paper tab of the same box sets the size. Make sure <em>Apply to</em> says <strong>Whole document</strong>. To stop new documents starting in Letter, click <strong>Set As Default</strong> in that box while A4 is selected.</li>
<li><strong>Google Docs:</strong> <strong>File → Page setup</strong> holds the paper size and all four margins, and also has a <strong>Set as default</strong> button.</li>
<li><strong>LibreOffice Writer:</strong> <strong>Format → Page Style</strong>, then the <em>Page</em> tab, which has both the paper format and the margins.</li>
</ul>
<h2>When one page comes out a different size</h2>
<p>A Word document can be split into sections, and each section keeps its own page size and margins. If you pasted in pages from another file, one section may still be in Letter while the rest is A4, and the PDF will have one page that doesn't match. Fix it by selecting the whole document (Ctrl+A) before opening Custom Margins, then setting the size with <em>Apply to: Whole document</em>.</p>
<p>Sometimes you want one page to be different, for example a wide table on a landscape page inside a portrait report. Put a section break (<strong>Layout → Breaks → Next Page</strong>) before and after the table, click inside that section and set <strong>Orientation</strong> to Landscape. Only that section turns, and the PDF keeps it that way.</p>
<h2>Export settings that keep the layout</h2>
<ol>
<li>Set the page size and margins first, then check page breaks in Print Preview.</li>
<li>Export with <strong>File → Save As → PDF</strong> and keep <em>Optimize for</em> on <strong>Standard</strong>.</li>
<li>Open the PDF and confirm the page size under <strong>File → Properties</strong> in your PDF reader. In Adobe Acrobat Reader, it is listed as <em>Page Size</em> on the Description tab.</li>
</ol>
<p>Converting without Word? <a href="/word-to-pdf">Word to PDF</a> keeps the page size and margins from your document exactly. That also means it won't fix them for you: if the document is set to Letter, the PDF will be Letter too, so check the settings before you upload.</p>
${T("word-to-pdf", "Word to PDF")}
<h2>Printing the PDF at the right size</h2>
<p>Even a correct PDF can come out wrong if the print dialog rescales it. In Adobe Acrobat Reader's print box, look at <em>Page Sizing &amp; Handling</em>. Choose <strong>Actual size</strong> when the PDF and the paper are the same size, so margins print exactly as you set them. Choose <strong>Fit</strong> or <strong>Shrink oversized pages</strong> only when they differ, for example a Letter PDF on A4 paper, and accept that everything will be printed slightly smaller.</p>
<h2>Making a PDF from photos or scans</h2>
<p>A page photographed on your phone has no page size of its own. When you turn photos into a PDF using <a href="/jpg-to-pdf">JPG to PDF</a> or <a href="/scan-to-pdf">Scan to PDF</a>, pick the page size yourself: A4, US Letter, Legal, or "Same as image". Choose A4 for anything going to an Indian office or portal, and use the Small or Large margin option if the document will be printed, so the edges of the photo don't touch the edge of the paper.</p>
<h2>Fixing a PDF that's already wrong</h2>
<ul>
<li><strong>Too much white border?</strong> Trim it with <a href="/crop-pdf">Crop PDF</a> (auto-detect margins).</li>
<li><strong>Pages in the wrong orientation?</strong> Use <a href="/rotate-pdf">Rotate PDF</a>.</li>
<li><strong>Page numbers missing?</strong> Add them with <a href="/add-page-numbers">Add Page Numbers</a> — keep them inside the margin so they print.</li>
<li><strong>Fonts look different?</strong> See <a href="/blog/how-a-legal-assistant-can-embed-fonts-correctly-when-exporting-to-pdf">how to embed fonts correctly</a>.</li>
</ul>
<p>Add Page Numbers lets you choose the position, a format such as "Page 1 of N", and which pages to number. Enter <strong>2-</strong> as the page range and the cover page stays unnumbered. If the whole PDF is in the wrong paper size, no PDF tool fixes that as cleanly as the source file does: change the size in the document, recheck the page breaks and export again.</p>
<h2>FAQ</h2>
<h3>Can I use the same file for India and the US?</h3>
<p>You can, and most people never notice. If you know where it will be printed, though, save a copy in that country's size. It takes a minute and removes the scaling problem entirely.</p>
<h3>My resume is one page in Word but two in the PDF. Is it the margins?</h3>
<p>Usually not. Word's own export and our converter both keep the margins you set. A resume that spills onto a second page is more often caused by a font being swapped, which changes where lines end, and our guide to <a href="/blog/why-pdf-formatting-breaksand-how-to-fix-it-for-your-resume">resume PDF formatting problems</a> covers that. The exception is when you changed the page size yourself: going from A4 to Letter takes away about 18 mm of height, which can be enough to push the last few lines over.</p>
`,
  },
  {
    slug: "how-to-redact-confidential-info-in-a-pdf-before-sharing", tool: "redact-pdf", date: "2026-08-20", updated: "2026-11-20",
    title: "How to Redact Confidential Info in a PDF Before Sharing (the Right Way)",
    description: "Black boxes don't hide text — anyone can copy it out. How to truly redact Aadhaar, PAN, account numbers and names from a PDF, free, without uploading it anywhere.",
    body: `
<p>Drawing a black rectangle over text in Word, a PDF editor or a screenshot tool <strong>does not remove the text</strong>. The words are still in the file underneath — anyone can select, copy or search for them. Real redaction deletes the content itself.</p>
<p>This matters every time you send a salary slip to a landlord, a bank statement to a visa agent or an ID copy to a new employer. Those documents carry more than the recipient needs, and a sloppy black box hides nothing from anyone who knows to press Ctrl+A.</p>
<h2>Redact a PDF in 4 steps</h2>
<ol>
<li>Open <a href="/redact-pdf">Redact PDF</a> and select your file. It opens on your device; nothing is uploaded.</li>
<li>Type the words or numbers to remove (every occurrence is found), use the quick finders, or draw boxes over signatures, photos and addresses.</li>
<li>Click <strong>Redact PDF</strong>. The text, images and drawings under each box are permanently removed from the page.</li>
<li>Download the redacted copy and share that one. Keep the original somewhere safe.</li>
</ol>
${T("redact-pdf", "Redact PDF")}
<h2>Decide what to remove first</h2>
<p>Redaction works best when you know, before you start, what the other person actually needs. Ask them if you are not sure. Removing too little leaks data; removing too much can get your document rejected. A rough guide:</p>
<table class="compare-table">
<thead><tr><th>Document</th><th>Often safe to remove</th><th>Usually needed by the recipient</th></tr></thead>
<tbody>
<tr><td>Salary slip (for a rental or visa file)</td><td>PAN, bank account number, UAN, employee ID</td><td>Your name, employer, month, net pay</td></tr>
<tr><td>Bank statement (for proof of funds)</td><td>Most of the account number, other people's names in transactions</td><td>Your name, bank name, period, balances</td></tr>
<tr><td>Aadhaar copy (for KYC that accepts masked copies)</td><td>First 8 digits of the number, the QR code</td><td>Name, photo, last 4 digits</td></tr>
<tr><td>Offer letter or appraisal letter</td><td>Salary figures, manager's phone number</td><td>Your name, role, joining date</td></tr>
</tbody>
</table>
<p>If a bank, employer or government office asks for the full document for verification, give them what they ask for. Redaction is for sharing beyond that.</p>
<h2>Using the quick finders</h2>
<p>Next to the search box are four buttons: <strong>Find Aadhaar nos.</strong>, <strong>Find PAN nos.</strong>, <strong>Find mobile nos.</strong> and <strong>Find emails</strong>. Each one reads the text of the whole document and adds every match to your list of terms. Nothing is removed until you click Redact PDF, so read the list first.</p>
<ul>
<li>The Aadhaar finder picks up any 12-digit number written in three groups of four or as one run of digits. A 12-digit reference or account number will be caught too. Delete that line from the list if the number should stay.</li>
<li>The mobile finder looks for 10-digit Indian mobile numbers, with or without +91 in front. A number printed with a space or hyphen in the middle, like 98765 43210, will not be matched. Type it into the box exactly as it appears on the page.</li>
<li>The same goes for an Aadhaar number written with hyphens. When in doubt, type the number yourself, copying the spacing you see.</li>
<li><em>Match case</em> is off by default, so a name you type is found whether it is printed in capitals or not. Leave it off unless the word also appears in a form you want to keep.</li>
</ul>
<h2>Worked example: a masked Aadhaar copy</h2>
<p>You need to give a housing society a copy of your e-Aadhaar, and they accept a masked one. The idea is to hide the first eight digits and keep the last four.</p>
<ol>
<li>If the PDF is password-protected, enter its password when prompted.</li>
<li>In the search box, type only the first eight digits with the same spacing as the card, for example <em>1234 5678</em>. Every place the number is printed gets the first eight digits removed, while the last four stay readable.</li>
<li>Click <strong>Draw redaction boxes</strong> and drag a box over the QR code. The QR code holds your details too, so it should go.</li>
<li>If a VID or your date of birth is printed and the society does not need it, add that as well.</li>
<li>Click <strong>Redact PDF</strong>. A note on the download screen reports how many areas were removed. If you expected the number in three places and it says 1, look again before you share.</li>
</ol>
<p>If you are starting from scratch, UIDAI also lets you download a masked Aadhaar directly from <a href="https://uidai.gov.in">its official website</a>, which saves this step.</p>
<h2>Test it before you send it</h2>
<ul>
<li>Press <strong>Ctrl+A</strong> (select all), copy, and paste into Notepad. The redacted words must not appear.</li>
<li>Use your PDF reader's search (<strong>Ctrl+F</strong>) for a redacted number. It should find nothing.</li>
<li>Zoom in to around 200% on each box. Make sure no edge of a letter or digit peeks out above or below it.</li>
</ul>
<h2>What people commonly forget</h2>
<ul>
<li><strong>Every occurrence</strong> — an account number can appear in the header, the table and the footer. Typing it as a search term catches all of them; drawn boxes cover only what you draw.</li>
<li><strong>Scanned pages</strong> — the redaction removes image pixels under the box too, so scans are covered. But a scan is a picture, so typed search terms and the finders cannot see the words in it. Either draw boxes, or run <a href="/ocr-pdf">OCR PDF</a> first so the text becomes searchable. OCR can misread a digit, so check the result by eye.</li>
<li><strong>File name and title</strong> — rename "Ramesh_Kumar_Salary_Slip.pdf" before sending. The tool clears the document's title, subject and keywords fields, but it is worth checking the Author field in your PDF reader's document properties.</li>
<li><strong>Password-protected files</strong> — if it's your own statement, remove the password first with <a href="/unlock-pdf">Unlock PDF</a>, then redact.</li>
<li><strong>Whiteout is not redaction</strong> — the Whiteout option in <a href="/edit-pdf">Edit PDF</a> only paints white over content. The text is still underneath.</li>
</ul>
<h2>If something goes wrong</h2>
<ul>
<li><strong>"No PAN numbers found"</strong> (or similar) on a document you can see them in: the page is probably an image. Draw boxes, or OCR the file first.</li>
<li><strong>A drawn box is in the wrong spot.</strong> Click it and remove it with the × button, then drag a new one. Boxes can be fixed freely until you click Redact PDF.</li>
<li><strong>You removed too much.</strong> Redaction cannot be undone in the downloaded file, which is the whole point. Go back to your original and start again. This is why you keep the original.</li>
</ul>
<h2>Why do it in the browser?</h2>
<p>The documents you redact are by definition sensitive. Uploading them to an online service to hide information defeats the purpose. Our redaction runs locally with the MuPDF engine, so the unredacted file never leaves your device.</p>
<p>Once you have the redacted copy, you can still add a layer of protection before emailing it: <a href="/protect-pdf">Protect PDF</a> adds a password, and a <a href="/watermark-pdf">watermark</a> such as "Copy for rental agreement only" makes it clear what the copy was meant for.</p>
`,
  },
  {
    slug: "how-to-fill-and-flatten-a-pdf-form-for-your-job-application", tool: "edit-pdf", date: "2026-08-20", updated: "2026-11-20",
    title: "How to Fill and Flatten a PDF Form for Your Job Application",
    description: "Fill in a PDF application form — fillable or not — and flatten it so your answers can't be changed or lost when HR opens it. Free, in your browser.",
    body: `
<p>Job and exam application forms often come as PDFs. Some have fillable boxes, many don't. Either way, HR should receive a file where your answers are <strong>flat</strong> — part of the page itself, not editable fields that can go blank in some PDF viewers or be changed after you send it.</p>
<h2>First, find out which kind of form you have</h2>
<p>Open the form in Chrome, Edge or Acrobat Reader and click on one of the blanks, such as the Name line. If a text cursor appears inside a box and you can type straight away, the form is fillable. If nothing happens, or clicking just selects the printed text, it is a plain page with lines drawn on it. The two need different methods, below.</p>
<h2>Form without fillable boxes</h2>
<ol>
<li>Open <a href="/edit-pdf">Edit PDF</a> and select the form.</li>
<li>Choose <strong>Text</strong>, click on each blank and type. Drag to line it up.</li>
<li>Add your signature with <strong>Image</strong> (a photo of your signature) or draw it with <strong>Draw</strong> — or use <a href="/sign-pdf">Sign PDF</a>.</li>
<li>Click <strong>Save changes</strong>. Everything you add is drawn into the page, so the downloaded form is already flat.</li>
</ol>
${T("edit-pdf", "Edit PDF")}
<h2>Worked example: a three-page application form</h2>
<p>Take a typical form from a private company or a state cooperative bank: page 1 asks for personal details and has a box for a passport photo, page 2 has education and experience tables, and page 3 has a declaration with place, date and signature.</p>
<ol>
<li><strong>Set your text style once.</strong> Before adding anything, pick the font and size in the side panel. Helvetica at 10 or 12 pt suits most forms. If the form gives one small box per letter, as many government-style forms do, choose <strong>Courier</strong>: every letter in Courier is the same width, so your name lines up with the boxes far better.</li>
<li><strong>Fill page 1.</strong> Click <strong>Add text</strong>, type your name in the box that appears, then drag it onto the line. Repeat for date of birth, father's or mother's name and so on. For a multi-line address, press Enter inside the text box to start a new line instead of making three separate boxes.</li>
<li><strong>Add the photo.</strong> Click <strong>Add image</strong>, choose your passport photo and drag the corner handle until it fits the printed box. The photo keeps its proportions as you resize, so it will not get squashed.</li>
<li><strong>Tick the boxes.</strong> For Yes/No or category boxes, add a text item with a capital X and place it in the right box. A tick mark (✓) will not print correctly; see the troubleshooting list below.</li>
<li><strong>Fill the tables on page 2.</strong> Use the arrows above the page to move between pages. The smallest size, 10 pt, usually fits table cells. If a value is still too long, abbreviate it (for example "B.Com." or the board's short name) rather than letting text spill over the cell border.</li>
<li><strong>Sign page 3.</strong> Add the place and date as text, then place your signature with <strong>Add image</strong> or <strong>Draw</strong>. If your photographed signature shows a white or grey box behind it, sign in <a href="/sign-pdf">Sign PDF</a> instead, after saving here; it removes the white background.</li>
<li><strong>Save and check.</strong> Click <strong>Save changes</strong>, open the preview, and read every field once.</li>
</ol>
<p>To line things up precisely, click a text box or image and use the arrow keys: each press moves it by one point, or ten with Shift held down.</p>
<h2>Form with fillable boxes</h2>
<ol>
<li>Fill the fields in your browser's PDF viewer (Chrome or Edge) or Acrobat Reader.</li>
<li>To flatten, open the print dialog and choose <strong>Save as PDF</strong> (or <em>Microsoft Print to PDF</em>) as the printer. The new file contains your answers as page content, not fields.</li>
<li>Open the new file and check every answer is visible and nothing is editable.</li>
</ol>
<p>Fill the fields themselves rather than typing over them in Edit PDF. Edit PDF adds new content to the page but leaves the form's own fields as they are, so on a fillable form the empty fields would still be there and could clash with your typed text in some viewers. If a fillable form also needs a signature or photo, flatten it first using the steps above, then add those with Edit PDF or Sign PDF.</p>
<h2>Troubleshooting</h2>
<ul>
<li><strong>A "?" appears in place of some characters.</strong> The text tool uses three standard Latin fonts (Helvetica, Times and Courier), which cover English letters, digits and common punctuation. The ₹ sign, tick marks, curly quotes pasted from Word, long dashes and Indian scripts such as Hindi come out as "?". Write "Rs." instead of ₹, use X for ticks, and type quotes and dashes by hand. If the form must be filled in Hindi or a regional language, print it, fill it by hand and make a clean PDF with <a href="/scan-to-pdf">Scan to PDF</a>.</li>
<li><strong>Your text sits slightly above or below the line.</strong> Nudge it with the arrow keys, or drop the font size by one step so it fits between the printed lines.</li>
<li><strong>You typed something wrong after saving.</strong> Saved text is fixed into the page, so you cannot click it and retype. Open the saved file in Edit PDF, cover the mistake with <strong>Whiteout</strong> and type the correction on top, or start again from the blank form. Whiteout hides content visually only, which is fine for your own typo but not for hiding sensitive data; for that, use <a href="/redact-pdf">Redact PDF</a>.</li>
<li><strong>A field is blank when you reopen a fillable form.</strong> The viewer you used may not have saved the field values. Fill the form again in Chrome, Edge or Acrobat Reader and flatten it with Save as PDF before closing.</li>
<li><strong>"Add something to the page first."</strong> You clicked Save changes before adding any text or image.</li>
</ul>
<h2>Final checks before you upload</h2>
<ul>
<li><strong>Size limit?</strong> Use <a href="/compress-pdf">Compress PDF</a> with an exact KB target, or <a href="/exam-form-ready">Exam Form Ready</a> for government exam portals.</li>
<li><strong>Need to attach certificates?</strong> Combine them into one file with <a href="/merge-pdf">Merge PDF</a>.</li>
<li><strong>Extra instruction pages?</strong> Drop them with <a href="/remove-pages">Remove Pages</a> if the employer only wants the form.</li>
<li><strong>Open it somewhere else.</strong> Look at the final file on your phone as well as your laptop. If every answer shows up on both, it will show up for HR.</li>
<li><strong>Name it sensibly.</strong> Something like "Application_Form_Priya_Nair_Accounts_Assistant.pdf" is easier for a recruiter to find than "form-edited.pdf".</li>
<li><strong>Keep a copy.</strong> Save the filled form with your other application papers. You may be asked about your answers at interview, and some employers ask you to bring a printout.</li>
</ul>
<h2>FAQ</h2>
<h3>Is a flattened form the same as a scanned one?</h3>
<p>No, and it is better. A flattened form keeps your typed answers as sharp, selectable text, and the file stays small. A scanned form is a photo of paper, which is larger and sometimes hard to read.</p>
<h3>Can HR still change my answers?</h3>
<p>Not by clicking into a field, because there are no fields left. Anyone with an editing tool can add things to any PDF, but your answers can no longer be accidentally cleared or overtyped.</p>
<h3>Does this work on a phone?</h3>
<p>Edit PDF runs in a mobile browser, but placing a dozen small text boxes accurately is much easier on a laptop with a mouse. If you only have a phone, zoom in and use the corner handle carefully, and check the result before uploading.</p>
`,
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
