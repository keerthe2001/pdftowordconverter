// iLovePDF free-plan limits per tool, from https://www.ilovepdf.com/pricing (checked Nov 2026).
// Our browser tools are limited only by device memory; server tools are capped at maxMB.
export const ILOVE_CHECKED = "November 2026";
export const ILOVE = {
  "merge-pdf": "25 files, 100 MB", "split-pdf": "1 file, 100 MB", "compress-pdf": "2 files, 200 MB", "word-to-pdf": "1 file, 15 MB",
  "powerpoint-to-pdf": "1 file, 15 MB", "excel-to-pdf": "1 file, 15 MB", "pdf-to-word": "1 file, 15 MB (OCR: Premium only)",
  "pdf-to-powerpoint": "1 file, 15 MB (OCR: Premium only)", "pdf-to-excel": "1 file, 15 MB (OCR: Premium only)", "ocr-pdf": "1 file, 15 MB",
  "pdf-to-jpg": "2 files, 25 MB", "jpg-to-pdf": "20 images, 40 MB", "add-page-numbers": "2 files, 100 MB", "watermark-pdf": "2 files, 100 MB",
  "rotate-pdf": "20 files, 100 MB", "unlock-pdf": "2 files, 100 MB", "protect-pdf": "2 files, 100 MB", "organize-pdf": "5 files, 100 MB",
  "pdf-to-pdfa": "Premium only", "repair-pdf": "1 file, 100 MB", "edit-pdf": "1 file, 100 MB", "sign-pdf": "3 files, 50 MB",
  "redact-pdf": "1 file, 400 MB", "compare-pdf": "2 files, 400 MB", "crop-pdf": "1 file, 100 MB",
};
