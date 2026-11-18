// Exam upload presets. Each item: kind photo|signature|thumb|declaration|doc-image|pdf
// w,h = output pixels; minKB/maxKB = accepted range; fit: "crop" (photos) or "contain" (signatures, docs).
// Keep `source` and `verified` accurate. When a notification changes, update here — the page shows them.

export const EXAMS = [
  {
    id: "ibps", name: "IBPS PO / Clerk / SO / RRB", short: "IBPS",
    keywords: ["IBPS PO photo size", "IBPS Clerk signature size", "IBPS thumb impression size", "IBPS handwritten declaration size"],
    source: "IBPS Detailed Notification CRP PO/MT-XVI (30 June 2026), Annexure III", verified: "2026-11",
    note: "IBPS also captures a live photograph during registration — that is taken on the IBPS site itself.",
    items: [
      { id: "photo", label: "Photograph", kind: "photo", w: 200, h: 230, minKB: 20, maxKB: 50, fit: "crop", file: "photo.jpg", rules: ["Recent colour passport photo, light background", "Face should fill about 50% of the photo", "No caps or dark glasses"] },
      { id: "signature", label: "Signature", kind: "signature", w: 140, h: 60, minKB: 10, maxKB: 20, fit: "contain", file: "signature.jpg", rules: ["Black ink on white paper", "Running handwriting — not in CAPITAL letters"] },
      { id: "thumb", label: "Left thumb impression", kind: "thumb", w: 240, h: 240, minKB: 20, maxKB: 50, fit: "contain", file: "thumb.jpg", rules: ["Black or blue ink on white paper"] },
      { id: "declaration", label: "Handwritten declaration", kind: "declaration", w: 800, h: 400, minKB: 50, maxKB: 100, fit: "contain", file: "declaration.jpg", rules: ["In English, in your own handwriting, black ink", "Not in CAPITAL letters"] },
    ],
  },
  {
    id: "ssc", name: "SSC CGL / CHSL / MTS / GD / CPO", short: "SSC",
    keywords: ["SSC CGL signature size", "SSC CHSL signature size 10-20 KB", "SSC MTS signature size"],
    source: "SSC Notice of Combined Graduate Level Examination 2026 (21 May 2026) and CHSL 2026 notice", verified: "2026-11",
    note: "SSC captures your photograph live through its application module, so only the signature is uploaded.",
    items: [
      { id: "signature", label: "Signature", kind: "signature", w: 360, h: 120, minKB: 10, maxKB: 20, fit: "contain", file: "signature.jpg", rules: ["About 6.0 cm × 2.0 cm", "Black ink on white paper", "Blurred, tiny or illegible signatures are rejected"] },
    ],
  },
  {
    id: "upsc", name: "UPSC Civil Services / CAPF / other UPSC exams", short: "UPSC",
    keywords: ["UPSC photo size", "UPSC signature size three signatures", "UPSC photo id size"],
    source: "UPSC Examination Notice No. 05/2026-CSE and upsconline 'Instructions for Uploading Photo and Signature'", verified: "2026-11",
    note: "UPSC also takes a live photograph during the application. Files must be named photo.jpg and signature.jpg.",
    items: [
      { id: "photo", label: "Photograph", kind: "photo", w: 400, h: 500, minKB: 20, maxKB: 200, fit: "crop", file: "photo.jpg", rules: ["Recent colour photo, face covering about 3/4 of the photo", "Plain light background"] },
      { id: "signature", label: "Signature (sign 3 times, one below the other)", kind: "signature", w: 400, h: 500, minKB: 20, maxKB: 100, fit: "contain", file: "signature.jpg", rules: ["Sign three times, one below the other, on one white sheet", "Black ink"] },
      { id: "photoid", label: "Photo ID card", kind: "doc-image", w: 1000, h: 630, minKB: 20, maxKB: 200, fit: "contain", file: "photo_id.jpg", rules: ["Aadhaar, PAN, passport, voter ID or driving licence"] },
    ],
  },
  {
    id: "rrb", name: "RRB NTPC / ALP / Technician / Group D", short: "RRB",
    keywords: ["RRB NTPC signature size 30-49 KB", "RRB ALP signature size", "railway signature size"],
    source: "RRB CEN 06/2026 & CEN 07/2026 (NTPC) — signature specifications", verified: "2026-11",
    note: "Railway recruitment now captures the photograph live. The signature must be 30–49 KB — much larger than other exams.",
    items: [
      { id: "signature", label: "Signature", kind: "signature", w: 420, h: 180, minKB: 30, maxKB: 49, fit: "contain", file: "signature.jpg", rules: ["Minimum 140 × 60 pixels", "Black ink, running handwriting"] },
    ],
  },
  {
    id: "neet", name: "NEET UG (NTA)", short: "NEET",
    keywords: ["NEET photo size", "NEET postcard size photo", "NEET signature size 4-30 KB", "NEET thumb impression size"],
    source: "NTA NEET (UG) 2026 Information Bulletin — image specifications", verified: "2026-11",
    note: "NTA asks for a photo taken on or after 1 January of the exam year, with 80% face coverage and ears visible.",
    items: [
      { id: "photo", label: "Passport-size photograph", kind: "photo", w: 413, h: 531, minKB: 10, maxKB: 200, fit: "crop", file: "passport_photo.jpg", rules: ["White background, face 80% of photo, ears visible", "Name and date of photo recommended"] },
      { id: "postcard", label: "Postcard-size photograph (4\"×6\")", kind: "photo", w: 800, h: 1200, minKB: 10, maxKB: 200, fit: "crop", file: "postcard_photo.jpg", rules: ["Same photo as passport size", "4 × 6 inches"] },
      { id: "signature", label: "Signature", kind: "signature", w: 300, h: 120, minKB: 4, maxKB: 30, fit: "contain", file: "signature.jpg", rules: ["Black ink on white paper", "Running handwriting, not capitals"] },
      { id: "thumb", label: "Thumb / finger impressions", kind: "thumb", w: 600, h: 600, minKB: 10, maxKB: 200, fit: "contain", file: "thumb_impressions.jpg", rules: ["Blue ink on white paper, ridges clearly visible"] },
      { id: "certificate", label: "Certificate (PDF)", kind: "pdf", minKB: 50, maxKB: 300, file: "certificate.pdf", rules: ["Category / PwBD / Class 10 certificate as applicable"] },
    ],
  },
  {
    id: "tnpsc", name: "TNPSC Group 1 / 2 / 4 (One Time Registration)", short: "TNPSC",
    keywords: ["TNPSC photo size", "TNPSC signature size", "TNPSC photo with name and date"],
    source: "TNPSC Group I Notification No. 05/2026 (KB limits). Pixel sizes differ between TNPSC notices — check yours.", verified: "2026-11", caution: true,
    note: "TNPSC requires your name and the date of photography printed at the bottom of the photo — tick 'Add name & date' below.",
    items: [
      { id: "photo", label: "Photograph (with name & date)", kind: "photo", w: 276, h: 354, minKB: 20, maxKB: 50, fit: "crop", file: "Photo.jpg", nameDate: true, rules: ["3.5 cm × 4.5 cm passport photo, white background", "Name and date of photography at the bottom"] },
      { id: "signature", label: "Signature", kind: "signature", w: 230, h: 75, minKB: 10, maxKB: 20, fit: "contain", file: "Signature.jpg", rules: ["Black or blue ink on white paper", "About 6.0 cm × 2.0 cm"] },
    ],
  },
];

export const CUSTOM = { id: "custom", name: "Custom size", short: "Custom" };
