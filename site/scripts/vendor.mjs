// Copies engine binaries into public/vendor so they are served from our own domain (no third-party CDN).
import fs from "fs"; import path from "path";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const nm = p => path.join(root, "node_modules", p);
const dst = p => path.join(root, "public", "vendor", p);
const copy = (src, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(src, to); };
for (const f of ["mupdf.js", "mupdf-wasm.js", "mupdf-wasm.wasm"]) copy(nm("mupdf/dist/" + f), dst("mupdf/" + f));
for (const f of ["gs.js", "gs.wasm"]) copy(nm("@okathira/ghostpdl-wasm/dist/" + f), dst("gs/" + f));
copy(nm("tesseract.js/dist/tesseract.esm.min.js"), dst("tesseract/tesseract.esm.min.js"));
copy(nm("tesseract.js/dist/worker.min.js"), dst("tesseract/worker.min.js"));
for (const f of fs.readdirSync(nm("tesseract.js-core"))) if (/^tesseract-core.*\.(js|wasm)$/.test(f)) copy(nm("tesseract.js-core/" + f), dst("tesseract/core/" + f));
copy(nm("fflate/esm/browser.js"), dst("fflate/fflate.js"));
// OCR language models (integer-optimised "best" models from @tesseract.js-data).
const langs = ["eng","hin","tam","tel","kan","mal","ben","mar","guj","pan","ori","urd","fra","deu","spa","ara"];
for (const l of langs) {
  const pkg = nm(`@tesseract.js-data/${l}`);
  if (!fs.existsSync(pkg)) { console.warn("missing lang package", l); continue; }
  const dir = fs.existsSync(path.join(pkg, "4.0.0_best_int")) ? "4.0.0_best_int" : fs.readdirSync(pkg).find(d => /^4/.test(d));
  copy(path.join(pkg, dir, `${l}.traineddata.gz`), dst(`tessdata/${l}.traineddata.gz`));
}
console.log("vendor files copied");
// Self-hosted fonts (OFL): UI font + signature fonts.
for (const [pkg, file, out] of [
  ["@fontsource/inter", "inter-latin-400-normal.woff2", "inter-400.woff2"],
  ["@fontsource/inter", "inter-latin-600-normal.woff2", "inter-600.woff2"],
  ["@fontsource/inter", "inter-latin-800-normal.woff2", "inter-800.woff2"],
  ["@fontsource/dancing-script", "dancing-script-latin-700-normal.woff2", "dancing-script-700.woff2"],
  ["@fontsource/great-vibes", "great-vibes-latin-400-normal.woff2", "great-vibes-400.woff2"],
]) copy(nm(`${pkg}/files/${file}`), path.join(root, "public", "fonts", out));
console.log("fonts copied");
