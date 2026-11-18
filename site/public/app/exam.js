// Exam Form Ready: produce photo / signature / document files that pass exam portal rules
// (exact pixels + KB range + JPG), with a pass/fail check before download. 100% on-device.
import { h, call, readBytes, isPdf, fmtBytes, downloadBytes, zip, toast, friendly, withPassword } from "./lib.js";

const DATA = JSON.parse(document.getElementById("exam-data").textContent);
const root = document.getElementById("exam-app");
const results = new Map(); // itemId -> {name, bytes}

// Safe byte window: satisfies the portal whether it counts 1 KB as 1000 or 1024 bytes.
const lo = kb => Math.ceil(kb * 1024) + 256;
const hi = kb => Math.floor(kb * 1000) - 256;

// ---------- JPEG encoding to a KB window ----------
async function encodeJpeg(canvas, q) {
  const blob = await new Promise(r => canvas.toBlob(r, "image/jpeg", q));
  return new Uint8Array(await blob.arrayBuffer());
}
// Insert JPEG COM (comment) segments right after SOI to reach a minimum size. The image is
// unchanged and remains a valid JPEG; this is how portals' minimum-size rules are usually met
// for small, clean images like signatures.
function padJpeg(bytes, target) {
  const need = target - bytes.length;
  if (need <= 0) return bytes;
  const segs = [];
  let left = need;
  while (left > 0) {
    const payload = Math.min(65533, Math.max(1, left - 4));
    const seg = new Uint8Array(payload + 4);
    seg[0] = 0xff; seg[1] = 0xfe; seg[2] = ((payload + 2) >> 8) & 0xff; seg[3] = (payload + 2) & 0xff;
    const msg = new TextEncoder().encode("pdftowordconverter.in exam-ready ");
    for (let i = 0; i < payload; i++) seg[4 + i] = msg[i % msg.length];
    segs.push(seg); left -= seg.length;
  }
  const total = bytes.length + segs.reduce((a, s) => a + s.length, 0);
  const out = new Uint8Array(total);
  out.set(bytes.subarray(0, 2), 0);
  let o = 2;
  for (const s of segs) { out.set(s, o); o += s.length; }
  out.set(bytes.subarray(2), o);
  return out;
}
async function fitKB(canvas, minKB, maxKB) {
  const L = lo(minKB), H = hi(maxKB);
  let best = null, a = 0.3, b = 0.98;
  let top = await encodeJpeg(canvas, b);
  if (top.length <= H) {
    const out = top.length >= L ? top : padJpeg(top, L + 64);
    return { bytes: out, quality: b, padded: top.length < L };
  }
  for (let i = 0; i < 9; i++) {
    const m = (a + b) / 2;
    const out = await encodeJpeg(canvas, m);
    if (out.length <= H) { best = { bytes: out, quality: m }; a = m; } else b = m;
  }
  if (!best) { const out = await encodeJpeg(canvas, 0.3); if (out.length <= H) best = { bytes: out, quality: 0.3 }; }
  if (!best) return null;
  if (best.bytes.length < L) return { bytes: padJpeg(best.bytes, L + 64), quality: best.quality, padded: true };
  return best;
}

// ---------- image helpers ----------
async function loadBitmap(file) { return createImageBitmap(file, { imageOrientation: "from-image" }); }
function canvasOf(w, hh) { const c = h("canvas", { width: w, height: hh }); return c; }
function drawHQ(src, sx, sy, sw, sh, w, hh) {
  // Step-down resampling for sharp, alias-free downscales.
  let cur = src, cw = sw, ch = sh, cx = sx, cy = sy;
  while (cw / 2 > w && ch / 2 > hh) {
    const t = canvasOf(Math.round(cw / 2), Math.round(ch / 2)), g = t.getContext("2d");
    g.imageSmoothingQuality = "high"; g.drawImage(cur, cx, cy, cw, ch, 0, 0, t.width, t.height);
    cur = t; cx = 0; cy = 0; cw = t.width; ch = t.height;
  }
  const out = canvasOf(w, hh), g = out.getContext("2d");
  g.fillStyle = "#fff"; g.fillRect(0, 0, w, hh);
  g.imageSmoothingQuality = "high"; g.drawImage(cur, cx, cy, cw, ch, 0, 0, w, hh);
  return out;
}
// Clean a scanned/photographed signature, thumb or handwritten page: flatten lighting, whiten paper, darken ink.
function cleanInk(bmp) {
  const maxSide = 2000, s = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * s), hh = Math.round(bmp.height * s);
  const c = canvasOf(w, hh), g = c.getContext("2d", { willReadFrequently: true });
  g.drawImage(bmp, 0, 0, w, hh);
  const small = canvasOf(Math.max(1, w >> 4), Math.max(1, hh >> 4)), sg = small.getContext("2d", { willReadFrequently: true });
  sg.filter = "blur(3px)"; sg.drawImage(c, 0, 0, small.width, small.height);
  const bgc = canvasOf(w, hh), bg = bgc.getContext("2d", { willReadFrequently: true });
  bg.drawImage(small, 0, 0, w, hh);
  const d = g.getImageData(0, 0, w, hh), p = d.data, b = bg.getImageData(0, 0, w, hh).data;
  for (let i = 0; i < p.length; i += 4) {
    for (let k = 0; k < 3; k++) {
      let v = (p[i + k] / Math.max(60, b[i + k])) * 255;
      v = v > 210 ? 255 : Math.max(0, (v - 30) * 1.2);
      p[i + k] = v;
    }
  }
  g.putImageData(d, 0, 0);
  return c;
}
function inkBox(c) {
  const g = c.getContext("2d", { willReadFrequently: true }), { data, width: w, height: hh } = g.getImageData(0, 0, c.width, c.height);
  let x0 = w, y0 = hh, x1 = -1, y1 = -1;
  for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; if (data[i] + data[i + 1] + data[i + 2] < 600) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
  if (x1 < 0) return { x: 0, y: 0, w, h: hh };
  const pad = Math.round(Math.max(x1 - x0, y1 - y0) * 0.06) + 4;
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(hh - 1, y1 + pad);
  return { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
function contain(src, box, w, hh) {
  const s = Math.min(w / box.w, hh / box.h);
  const dw = Math.round(box.w * s), dh = Math.round(box.h * s);
  const scaled = drawHQ(src, box.x, box.y, box.w, box.h, dw, dh);
  const out = canvasOf(w, hh), g = out.getContext("2d");
  g.fillStyle = "#fff"; g.fillRect(0, 0, w, hh);
  g.drawImage(scaled, Math.round((w - dw) / 2), Math.round((hh - dh) / 2));
  return out;
}
function addNameDate(canvas, name, date) {
  const w = canvas.width, hh = canvas.height, strip = Math.round(hh * 0.16);
  const out = canvasOf(w, hh), g = out.getContext("2d");
  g.drawImage(canvas, 0, 0, w, hh - strip, 0, 0, w, hh - strip);
  g.fillStyle = "#fff"; g.fillRect(0, hh - strip, w, strip);
  g.fillStyle = "#000"; g.textAlign = "center"; g.textBaseline = "middle";
  const fs = Math.max(9, Math.round(strip * 0.36));
  g.font = `600 ${fs}px Inter, Arial, sans-serif`;
  g.fillText(name.toUpperCase().slice(0, 28), w / 2, hh - strip * 0.68, w - 6);
  g.font = `${Math.max(8, fs - 1)}px Inter, Arial, sans-serif`;
  g.fillText(date, w / 2, hh - strip * 0.27, w - 6);
  return out;
}

// ---------- crop UI for photos ----------
function cropper(bmp, aspect) {
  const view = 300, s = view / Math.max(bmp.width, bmp.height);
  const vw = Math.round(bmp.width * s), vh = Math.round(bmp.height * s);
  const c = canvasOf(vw, vh); c.getContext("2d").drawImage(bmp, 0, 0, vw, vh);
  const st = { zoom: 1, cx: bmp.width / 2, cy: bmp.height * 0.45 };
  const base = () => { let w = bmp.width, hh = w / aspect; if (hh > bmp.height) { hh = bmp.height; w = hh * aspect; } return { w: w / st.zoom, h: hh / st.zoom }; };
  const rect = () => { const b = base(); let x = st.cx - b.w / 2, y = st.cy - b.h / 2; x = Math.max(0, Math.min(bmp.width - b.w, x)); y = Math.max(0, Math.min(bmp.height - b.h, y)); return { x, y, w: b.w, h: b.h }; };
  const box = h("div", { class: "ex-crop-box" });
  const wrap = h("div", { class: "ex-crop", style: { width: vw + "px", height: vh + "px" } }, c, box);
  const place = () => { const r = rect(); Object.assign(box.style, { left: r.x * s + "px", top: r.y * s + "px", width: r.w * s + "px", height: r.h * s + "px" }); };
  let drag = null;
  wrap.addEventListener("pointerdown", e => { drag = { x: e.clientX, y: e.clientY, cx: st.cx, cy: st.cy }; wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener("pointermove", e => { if (!drag) return; st.cx = drag.cx + (e.clientX - drag.x) / s; st.cy = drag.cy + (e.clientY - drag.y) / s; const r = rect(); st.cx = r.x + r.w / 2; st.cy = r.y + r.h / 2; place(); onchange?.(); });
  wrap.addEventListener("pointerup", () => { drag = null; });
  const zoom = h("input", { type: "range", min: 1, max: 4, step: 0.05, value: 1, "aria-label": "Zoom" });
  zoom.oninput = () => { st.zoom = +zoom.value; place(); onchange?.(); };
  let onchange = null;
  place();
  return { el: h("div", { class: "ex-crop-wrap" }, wrap, h("label", { class: "lbl inline" }, "Zoom ", zoom), h("p", { class: "muted small" }, "Drag the box to position your face.")), rect, set onChange(f) { onchange = f; } };
}

// ---------- one item card ----------
function itemCard(item, exam) {
  const specs = item.kind === "pdf" ? [`PDF`, `${item.minKB}–${item.maxKB} KB`] : [`${item.w} × ${item.h} px`, `${item.minKB}–${item.maxKB} KB`, "JPG"];
  const out = h("div", { class: "ex-out" });
  const work = h("div", { class: "ex-work" });
  const input = h("input", { type: "file", accept: item.kind === "pdf" ? "application/pdf,.pdf,image/*" : "image/*", multiple: item.kind === "pdf" ? true : null, hidden: true });
  const pickBtn = h("button", { class: "btn btn-primary", type: "button", onclick: () => input.click() }, item.kind === "pdf" ? "Choose PDF or images" : "Choose image");
  const card = h("section", { class: "ex-card", id: `item-${item.id}` },
    h("header", {}, h("h3", {}, item.label), h("div", { class: "chips" }, specs.map(s => h("span", { class: "chip static" }, s)))),
    item.rules?.length ? h("ul", { class: "ex-rules" }, item.rules.map(r => h("li", {}, r))) : null,
    h("div", { class: "row" }, pickBtn, input), work, out);
  input.onchange = async () => {
    const files = [...input.files]; if (!files.length) return;
    try { item.kind === "pdf" ? await doPdf(item, files, out) : await doImage(item, exam, files[0], work, out); }
    catch (e) { console.error(e); if (e.code !== "CANCELLED") toast(friendly(e), "error"); }
    input.value = "";
  };
  return card;
}

async function doImage(item, exam, file, work, out) {
  const bmp = await loadBitmap(file);
  let crop = null, nameIn = null, dateIn = null, cleanChk = null;
  const controls = [];
  if (item.fit === "crop") { crop = cropper(bmp, item.w / item.h); controls.push(crop.el); }
  else { cleanChk = h("input", { type: "checkbox", checked: true }); controls.push(h("label", { class: "check" }, cleanChk, h("span", {}, "Clean background & auto-trim (recommended)"))); }
  if (item.nameDate || item.kind === "photo") {
    const nd = h("input", { type: "checkbox", checked: item.nameDate ? true : null });
    nameIn = h("input", { class: "input", placeholder: "Your name" });
    const today = new Date(); dateIn = h("input", { class: "input", value: `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`, placeholder: "DD.MM.YYYY" });
    const fields = h("div", { class: "row", style: { display: item.nameDate ? "" : "none" } }, nameIn, dateIn);
    nd.onchange = () => { fields.style.display = nd.checked ? "" : "none"; run(); };
    nameIn.oninput = dateIn.oninput = debounce(run, 400);
    controls.push(h("label", { class: "check" }, nd, h("span", {}, "Add name & date of photo at the bottom")), fields);
    nameIn._enabled = () => nd.checked;
  }
  work.replaceChildren(h("div", { class: "ex-controls" }, ...controls));
  if (crop) crop.onChange = debounce(run, 250);
  if (cleanChk) cleanChk.onchange = run;
  async function run() {
    let canvas;
    if (crop) {
      const r = crop.rect();
      canvas = drawHQ(bmp, r.x, r.y, r.w, r.h, item.w, item.h);
    } else {
      const src = cleanChk.checked ? cleanInk(bmp) : (() => { const c = canvasOf(bmp.width, bmp.height); c.getContext("2d").drawImage(bmp, 0, 0); return c; })();
      const box = cleanChk.checked ? inkBox(src) : { x: 0, y: 0, w: src.width, h: src.height };
      canvas = contain(src, box, item.w, item.h);
    }
    if (nameIn && nameIn._enabled()) {
      if (!nameIn.value.trim()) { out.replaceChildren(h("p", { class: "muted" }, "Enter your name to add it to the photo.")); return; }
      canvas = addNameDate(canvas, nameIn.value.trim(), dateIn.value.trim());
    }
    const r = await fitKB(canvas, item.minKB, item.maxKB);
    if (!r) { out.replaceChildren(h("p", { class: "err" }, "Couldn't fit this image in the allowed size. Try a simpler image.")); return; }
    showResult(item, r.bytes, out, { padded: r.padded, w: item.w, h: item.h });
  }
  await run();
}

async function doPdf(item, files, out) {
  out.replaceChildren(h("p", { class: "muted" }, "Preparing PDF…"));
  let bytes;
  if (files.length === 1 && isPdf(files[0])) {
    bytes = await readBytes(files[0]);
    const info = await withPassword(files[0].name, pw => call("info", { bytes, password: pw }).then(r => { if (r.needsPassword) { const e = new Error(pw ? "WRONG_PASSWORD" : "NEEDS_PASSWORD"); e.code = e.message; throw e; } return r; }));
    if (info.password) bytes = await call("unlock", { bytes, password: info.password });
  } else {
    const imgs = [];
    for (const f of files) { const b = await loadBitmap(f); const c = drawHQ(b, 0, 0, b.width, b.height, Math.min(b.width, 2000), Math.round(Math.min(b.width, 2000) * b.height / b.width)); imgs.push({ bytes: new Uint8Array(await (await new Promise(r => c.toBlob(r, "image/jpeg", 0.9))).arrayBuffer()) }); }
    bytes = await call("imagesToPdf", { images: imgs, opts: { pageSize: "a4", margin: 12 } });
  }
  let res = bytes;
  if (bytes.length > hi(item.maxKB)) {
    const r = await call("compressTarget", { bytes, target: hi(item.maxKB), allowGray: true });
    if (!r.met) { out.replaceChildren(h("p", { class: "err" }, `This document can't be made smaller than ${fmtBytes(r.bytes.length)} while staying readable. Remove extra pages and try again.`)); return; }
    res = r.bytes;
  }
  showResult(item, res, out, { pdf: true, under: bytes.length < lo(item.minKB) });
}

function showResult(item, bytes, out, { padded, pdf, w, h: hh, under }) {
  const kb = bytes.length / 1024;
  const okSize = bytes.length >= lo(item.minKB) - 300 && bytes.length <= hi(item.maxKB) + 300;
  const checks = [
    [okSize || (pdf && !under && bytes.length <= hi(item.maxKB)), `${kb.toFixed(1)} KB (allowed ${item.minKB}–${item.maxKB} KB)`],
    pdf ? [true, "PDF format"] : [true, `${w} × ${hh} pixels`],
    pdf ? null : [true, "JPG format"],
    [true, `File name: ${item.file}`],
  ].filter(Boolean);
  if (pdf && under) checks.push([false, `Below ${item.minKB} KB minimum — the portal may reject very small files. Scan at higher quality.`]);
  results.set(item.id, { name: item.file, bytes });
  const url = URL.createObjectURL(new Blob([bytes], { type: pdf ? "application/pdf" : "image/jpeg" }));
  out.replaceChildren(h("div", { class: "ex-result" },
    pdf ? h("div", { class: "file-ico" }, "PDF") : h("img", { src: url, alt: `${item.label} preview`, width: Math.min(w, 260), style: { aspectRatio: `${w}/${hh}` } }),
    h("div", {},
      h("ul", { class: "checks" }, checks.map(([ok, t]) => h("li", { class: ok ? "ok" : "bad" }, ok ? "✓ " : "✗ ", t))),
      padded ? h("p", { class: "muted small" }, "This image is naturally smaller than the minimum, so we added invisible padding to the file to reach it. The picture itself is unchanged.") : null,
      h("button", { class: "btn btn-primary", type: "button", onclick: () => downloadBytes(item.file, bytes, pdf ? "application/pdf" : "image/jpeg") }, `⬇ Download ${item.file}`))));
  updateAll();
}

function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

// ---------- custom mode ----------
function customCard() {
  const wIn = h("input", { class: "input", type: "number", value: 200, min: 20, max: 4000 });
  const hIn = h("input", { class: "input", type: "number", value: 230, min: 20, max: 4000 });
  const minIn = h("input", { class: "input", type: "number", value: 20, min: 1 });
  const maxIn = h("input", { class: "input", type: "number", value: 50, min: 2 });
  const kind = h("select", { class: "input" }, h("option", { value: "photo" }, "Photo (crop to size)"), h("option", { value: "signature" }, "Signature / thumb / document image (fit & clean)"), h("option", { value: "pdf" }, "PDF document"));
  const holder = h("div");
  const build = () => {
    const isPdfKind = kind.value === "pdf";
    [wIn, hIn].forEach(i => (i.closest("label").style.display = isPdfKind ? "none" : ""));
    const item = { id: "custom", label: "Your file", kind: kind.value === "photo" ? "photo" : isPdfKind ? "pdf" : "signature", w: +wIn.value, h: +hIn.value, minKB: +minIn.value, maxKB: +maxIn.value, fit: kind.value === "photo" ? "crop" : "contain", file: isPdfKind ? "document.pdf" : "image.jpg" };
    if (!(item.maxKB > item.minKB)) { holder.replaceChildren(h("p", { class: "err" }, "Maximum KB must be larger than minimum KB.")); return; }
    holder.replaceChildren(itemCard(item, { id: "custom" }));
  };
  [wIn, hIn, minIn, maxIn, kind].forEach(i => i.addEventListener("change", build));
  const panel = h("section", { class: "ex-card" }, h("h3", {}, "Enter your portal's requirements"),
    h("div", { class: "grid-2" }, h("label", { class: "lbl" }, "Type", kind), h("span"), h("label", { class: "lbl" }, "Width (px)", wIn), h("label", { class: "lbl" }, "Height (px)", hIn), h("label", { class: "lbl" }, "Minimum KB", minIn), h("label", { class: "lbl" }, "Maximum KB", maxIn)), holder);
  setTimeout(build);
  return panel;
}

// ---------- page ----------
const allBtn = h("button", { class: "btn btn-ghost", type: "button", disabled: true, onclick: async () => { const z = await zip([...results.values()]); downloadBytes(`${current?.id || "exam"}-documents.zip`, z, "application/zip"); } }, "⬇ Download all as ZIP");
function updateAll() { allBtn.disabled = results.size < 2; allBtn.textContent = `⬇ Download all as ZIP (${results.size})`; }
let current = null;
function showExam(id) {
  results.clear(); updateAll();
  const exam = DATA.exams.find(e => e.id === id);
  current = exam;
  document.querySelectorAll(".ex-tabs .chip").forEach(c => c.classList.toggle("active", c.dataset.id === id));
  if (!exam) { body.replaceChildren(customCard()); history.replaceState(null, "", "#custom"); return; }
  history.replaceState(null, "", "#" + id);
  body.replaceChildren(
    h("div", { class: "ex-head" + (exam.caution ? " caution" : "") }, h("p", {}, h("strong", {}, exam.name), " — ", exam.note),
      h("p", { class: "muted small" }, `Source: ${exam.source}. Last verified ${exam.verified}. Always cross-check the notification for your exam.`)),
    ...exam.items.map(it => itemCard(it, exam)),
    h("div", { class: "row" }, allBtn));
}
const tabs = h("div", { class: "ex-tabs chips", role: "tablist" },
  [...DATA.exams, { id: "custom", short: "Custom size" }].map(e => h("button", { class: "chip", type: "button", "data-id": e.id, role: "tab", onclick: () => showExam(e.id) }, e.short)));
const body = h("div", { class: "ex-body" });
root.replaceChildren(h("p", { class: "dz-private" }, "🔒 Everything happens on your device — your photos and documents are never uploaded."), tabs, body);
showExam((location.hash || "").slice(1) || DATA.initial || DATA.exams[0].id);
