// OCR with Tesseract (LSTM "best" integer models), self-hosted. Produces a searchable PDF by
// overlaying Tesseract's invisible text layer onto the ORIGINAL pages (image quality untouched).
import { call } from "./lib.js";

let TesseractMod = null;
async function tesseract() {
  if (!TesseractMod) TesseractMod = (await import("/vendor/tesseract/tesseract.esm.min.js")).default;
  return TesseractMod;
}

export async function createOcrWorker(langs) {
  const T = await tesseract();
  return T.createWorker(langs, 1 /* LSTM only */, {
    workerPath: "/vendor/tesseract/worker.min.js",
    corePath: "/vendor/tesseract/core/",
    langPath: "/vendor/tessdata",
    gzip: true,
    cacheMethod: "write",
  });
}

export async function ocrPdf(f, { langs = "eng", pages, onProgress = () => {} }) {
  const n = f.info.pages;
  let idx = [...Array(n).keys()];
  if (pages) {
    const set = new Set();
    for (const part of pages.split(",")) { const m = part.trim().match(/^(\d*)\s*-\s*(\d*)$/); if (m) { for (let i = +(m[1] || 1); i <= +(m[2] || n); i++) if (i >= 1 && i <= n) set.add(i - 1); } else if (/^\d+$/.test(part.trim())) set.add(+part.trim() - 1); }
    idx = [...set].sort((a, b) => a - b);
  }
  const existing = await call("text", { bytes: f.bytes, password: f.password, opts: {} });
  const worker = await createOcrWorker(langs);
  await worker.setParameters({ tessedit_pageseg_mode: "3", preserve_interword_spaces: "1", user_defined_dpi: "300" });
  const layers = [], texts = [];
  let conf = 0, done = 0, skipped = 0;
  try {
    for (const i of idx) {
      onProgress(done + 1, idx.length, "Rendering at 300 DPI");
      if ((existing[i] || "").replace(/\s/g, "").length > 200) { skipped++; texts.push(existing[i]); done++; continue; }
      const r = await call("renderPage", { bytes: f.bytes, page: i, dpi: 300, password: f.password });
      onProgress(done + 1, idx.length, "Recognising text");
      const { data } = await worker.recognize(new Blob([r.png], { type: "image/png" }), {}, { pdf: true, text: true });
      layers.push({ page: i, pdf: new Uint8Array(data.pdf) });
      texts.push(data.text);
      conf += data.confidence; done++;
    }
  } finally { await worker.terminate(); }
  onProgress(idx.length, idx.length, "Building searchable PDF");
  const pdf = layers.length ? await call("applyOcrLayers", { bytes: f.bytes, layers, password: f.password }) : f.bytes;
  return { pdf, text: texts.join("\n\n\f"), confidence: layers.length ? conf / layers.length : 100, skipped };
}
