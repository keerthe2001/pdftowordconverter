// Module worker: runs MuPDF (and Ghostscript on demand) off the main thread.
import * as mupdf from "/vendor/mupdf/mupdf.js";
import { createCore } from "/engine/pdfcore.js";

const core = createCore(mupdf);
let gsLoader = null;

async function ghostscript(args, inputs, outName) {
  if (!gsLoader) gsLoader = (await import("/vendor/gs/gs.js")).default;
  let log = "";
  const M = await gsLoader({
    locateFile: f => "/vendor/gs/" + f,
    print: t => { log += t + "\n"; },
    printErr: t => { log += t + "\n"; },
  });
  for (const [name, bytes] of Object.entries(inputs)) M.FS.writeFile(name, bytes);
  let code;
  try { code = M.callMain(args); } catch (e) { code = e && e.status !== undefined ? e.status : -1; }
  let out = null;
  try { out = M.FS.readFile(outName); } catch {}
  if (!out || !out.length) throw Object.assign(new Error("GS_FAILED"), { detail: log.slice(-600), code });
  return out;
}

// Ghostscript presets tuned per level. All keep text as text and fonts embedded.
function gsCompressArgs(level, input, output) {
  const common = ["-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.6", "-dNOPAUSE", "-dBATCH", "-dQUIET", "-dSAFER",
    "-dDetectDuplicateImages=true", "-dCompressFonts=true", "-dSubsetFonts=true", "-dAutoRotatePages=/None"];
  const lv = {
    low: ["-dPDFSETTINGS=/printer", "-dColorImageResolution=220", "-dGrayImageResolution=220", "-dMonoImageResolution=600"],
    recommended: ["-dPDFSETTINGS=/ebook", "-dColorImageResolution=150", "-dGrayImageResolution=150", "-dMonoImageResolution=300"],
    extreme: ["-dPDFSETTINGS=/screen", "-dColorImageResolution=96", "-dGrayImageResolution=96", "-dMonoImageResolution=200"],
  }[level] || [];
  const ds = ["-dDownsampleColorImages=true", "-dDownsampleGrayImages=true", "-dDownsampleMonoImages=true",
    "-dColorImageDownsampleType=/Bicubic", "-dGrayImageDownsampleType=/Bicubic", "-dColorImageDownsampleThreshold=1.1", "-dGrayImageDownsampleThreshold=1.1"];
  return [...common, ...lv, ...ds, `-sOutputFile=${output}`, input];
}

const ops = {
  info: ({ bytes, password }) => core.info(bytes, password),
  thumbnails: ({ bytes, width, password, max }) => core.thumbnails(bytes, { width, password, max }),
  renderPage: ({ bytes, page, dpi, password }) => {
    const pix = core.render(bytes, page, dpi, password);
    const out = { png: pix.asPNG().slice(), w: pix.getWidth(), h: pix.getHeight() };
    pix.destroy?.();
    return out;
  },
  merge: ({ files }) => core.merge(files),
  extract: ({ bytes, spec, password }) => core.extract(bytes, spec, password),
  remove: ({ bytes, spec, password }) => core.remove(bytes, spec, password),
  split: ({ bytes, mode, password }) => core.split(bytes, mode, password),
  organize: ({ bytes, order, password }) => core.organize(bytes, order, password),
  rotate: ({ bytes, angle, spec, password }) => core.rotate(bytes, angle, spec, password),
  toImages: ({ bytes, opts }) => core.toImages(bytes, opts),
  pageNumbers: ({ bytes, opts, password }) => core.pageNumbers(bytes, opts, password),
  watermark: ({ bytes, opts, password }) => core.watermark(bytes, opts, password),
  stamp: ({ bytes, items, password }) => core.stamp(bytes, items, password),
  crop: ({ bytes, opts, password }) => core.crop(bytes, opts, password),
  contentMargins: ({ bytes, page, password }) => core.contentMargins(bytes, page, password),
  protect: ({ bytes, opts, password }) => core.protect(bytes, opts, password),
  unlock: ({ bytes, password }) => core.unlock(bytes, password),
  repair: async ({ bytes, password }) => {
    try { return core.repair(bytes, password); }
    catch (e) {
      if (e.code === "NEEDS_PASSWORD" || e.code === "WRONG_PASSWORD") throw e;
      // Fall back to Ghostscript re-distillation for badly broken files.
      const out = await ghostscript(["-sDEVICE=pdfwrite", "-dNOPAUSE", "-dBATCH", "-dQUIET", "-sOutputFile=out.pdf", "in.pdf"], { "in.pdf": bytes }, "out.pdf");
      return { bytes: out, pages: core.info(out).pages, repaired: true, badPages: 0, method: "ghostscript" };
    }
  },
  redact: ({ bytes, opts, password }) => core.redact(bytes, opts, password),
  text: ({ bytes, password, opts }) => core.text(bytes, password, opts),
  imagesToPdf: ({ images, opts }) => core.imagesToPdf(images, opts),
  applyOcrLayers: ({ bytes, layers, password }) => core.applyOcrLayers(bytes, layers, password),
  setMeta: ({ bytes, meta, password }) => core.setMeta(bytes, meta, password),
  compressLevel: async ({ bytes, level, password }) => {
    let src = bytes;
    if (password) src = core.unlock(bytes, password);
    let gsOut = null;
    try { gsOut = await ghostscript(gsCompressArgs(level, "in.pdf", "out.pdf"), { "in.pdf": src }, "out.pdf"); } catch {}
    const dpi = { low: 220, recommended: 150, extreme: 96 }[level] || 150;
    const q = { low: 82, recommended: 72, extreme: 55 }[level] || 72;
    const mu = core.compressImages(src, { dpi, quality: q });
    // Keep whichever is smaller; never return something larger than the original.
    let best = mu, method = "mupdf";
    if (gsOut && gsOut.length < best.length) { best = gsOut; method = "ghostscript"; }
    if (best.length >= src.length) { best = core.optimizeLossless(src); method = "lossless"; }
    if (best.length >= src.length) { best = src; method = "original"; }
    return { bytes: best, method };
  },
  compressTarget: ({ bytes, target, gray, allowGray, password }) => core.compressToTarget(bytes, target, { gray, allowGray, password }),
  pdfa: async ({ bytes, password, level = 2 }) => {
    let src = bytes;
    if (password) src = core.unlock(bytes, password);
    const out = await ghostscript([
      "-sDEVICE=pdfwrite", `-dPDFA=${level}`, "-dPDFACompatibilityPolicy=1", "-sColorConversionStrategy=RGB",
      "-dNOPAUSE", "-dBATCH", "-dQUIET", "-dNOOUTERSAVE", "-sOutputFile=out.pdf", "in.pdf",
    ], { "in.pdf": src }, "out.pdf");
    return out;
  },
};

self.onmessage = async (ev) => {
  const { id, op, args } = ev.data;
  try {
    const fn = ops[op];
    if (!fn) throw new Error("UNKNOWN_OP:" + op);
    const result = await fn(args || {});
    const transfer = [];
    const collect = (v) => {
      if (!v) return;
      if (v instanceof Uint8Array) { if (v.buffer.byteLength === v.byteLength) transfer.push(v.buffer); return; }
      if (Array.isArray(v)) v.forEach(collect);
      else if (typeof v === "object") Object.values(v).forEach(collect);
    };
    collect(result);
    self.postMessage({ id, ok: true, result }, [...new Set(transfer)]);
  } catch (e) {
    self.postMessage({ id, ok: false, error: { message: String(e && e.message || e), code: e && e.code, detail: e && e.detail } });
  }
};
self.postMessage({ ready: true });
