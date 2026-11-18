// Shared browser helpers: engine RPC, file IO, downloads, formatting, dialogs.
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "html") el.innerHTML = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c)));
  return el;
}

// ---- Engine worker (MuPDF + Ghostscript) ----
let worker = null, seq = 0;
const pending = new Map();
let readyPromise = null;
export function engine() {
  if (!worker) {
    worker = new Worker("/engine/worker.js", { type: "module" });
    readyPromise = new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error("ENGINE_TIMEOUT")), 60000);
      worker.addEventListener("message", function once(ev) {
        if (ev.data && ev.data.ready) { clearTimeout(t); worker.removeEventListener("message", once); resolve(); }
      });
      worker.addEventListener("error", e => { clearTimeout(t); reject(new Error("ENGINE_LOAD_FAILED")); });
    });
    worker.addEventListener("message", ev => {
      const { id, ok, result, error } = ev.data || {};
      if (!id || !pending.has(id)) return;
      const p = pending.get(id); pending.delete(id);
      if (ok) p.resolve(result);
      else { const e = new Error(error.message); e.code = error.code || error.message; e.detail = error.detail; p.reject(e); }
    });
  }
  return {
    async call(op, args) {
      await readyPromise;
      const id = ++seq;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        worker.postMessage({ id, op, args });
      });
    },
  };
}
export const call = (op, args) => engine().call(op, args);

// ---- Files ----
export const readBytes = file => file.arrayBuffer().then(b => new Uint8Array(b));
export const isPdf = f => f.type === "application/pdf" || /\.pdf$/i.test(f.name);
export const isImage = f => /^image\//.test(f.type) || /\.(jpe?g|png|webp|gif|bmp|tiff?|heic|avif)$/i.test(f.name);
export const baseName = name => String(name || "document").replace(/\.[^.]+$/, "");

export function fmtBytes(n) {
  if (n == null) return "";
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(n < 10240 ? 1 : 0) + " KB";
  return (n / 1024 / 1024).toFixed(n < 10 * 1024 * 1024 ? 2 : 1) + " MB";
}

// Normalise any browser-decodable image to JPEG/PNG bytes MuPDF understands, honouring EXIF orientation.
export async function normaliseImage(file, { maxSide = 0, forceJpeg = false, quality = 0.92 } = {}) {
  const t = (file.type || "").toLowerCase();
  if (!maxSide && !forceJpeg && (t === "image/jpeg" || t === "image/png")) return { bytes: await readBytes(file), type: t };
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  let { width: w, height: hgt } = bmp;
  if (maxSide && Math.max(w, hgt) > maxSide) { const s = maxSide / Math.max(w, hgt); w = Math.round(w * s); hgt = Math.round(hgt * s); }
  const c = new OffscreenCanvas(w, hgt);
  const g = c.getContext("2d");
  g.imageSmoothingQuality = "high";
  g.fillStyle = "#fff"; g.fillRect(0, 0, w, hgt);
  g.drawImage(bmp, 0, 0, w, hgt);
  bmp.close?.();
  const png = t === "image/png" && !forceJpeg;
  const blob = await c.convertToBlob({ type: png ? "image/png" : "image/jpeg", quality });
  return { bytes: new Uint8Array(await blob.arrayBuffer()), type: blob.type };
}

export function blobUrl(bytes, mime = "application/pdf") {
  return URL.createObjectURL(new Blob([bytes], { type: mime }));
}

export function downloadBytes(name, bytes, mime = "application/pdf") {
  const url = blobUrl(bytes, mime);
  const a = h("a", { href: url, download: name });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

let fflate = null;
export async function zip(files) {
  if (!fflate) fflate = await import("/vendor/fflate/fflate.js");
  const obj = {};
  const used = new Set();
  for (const f of files) {
    let n = f.name, k = 1;
    while (used.has(n)) n = f.name.replace(/(\.[^.]+)?$/, m => `-${k++}${m}`);
    used.add(n);
    obj[n] = [f.bytes, { level: /\.(jpe?g|png|pdf|gz)$/i.test(n) ? 0 : 6 }];
  }
  return new Promise((res, rej) => fflate.zip(obj, (err, data) => (err ? rej(err) : res(data))));
}

// ---- Friendly errors ----
const MESSAGES = {
  NEEDS_PASSWORD: "This PDF is password-protected. Enter the password to continue.",
  WRONG_PASSWORD: "That password didn't work. Please try again.",
  NOT_A_PDF: "This doesn't look like a valid PDF file.",
  NO_PAGES_SELECTED: "Select at least one page first.",
  CANNOT_REMOVE_ALL: "You can't remove every page — keep at least one.",
  CROP_TOO_LARGE: "The crop area is too small. Reduce the margins.",
  PASSWORD_CHARS: "Passwords can't contain commas (,) or equals signs (=).",
  GS_FAILED: "The compression engine couldn't process this file. Try another level, or use Repair PDF first.",
  ENGINE_LOAD_FAILED: "The PDF engine failed to load. Please refresh the page (it needs a modern browser).",
  ENGINE_TIMEOUT: "The PDF engine is taking too long to load. Check your connection and refresh.",
};
export function friendly(e) {
  const code = (e && (e.code || e.message)) || "";
  if (MESSAGES[code]) return MESSAGES[code];
  if (/^BAD_RANGE:/.test(code)) return `"${code.slice(10)}" isn't a valid page range. Use formats like 1-3, 5, 8-.`;
  if (/memory|alloc/i.test(code)) return "This file is too large for your device's memory. Try a smaller file or use a computer.";
  if (/cannot|format|syntax|xref|trailer/i.test(code)) return "This PDF appears damaged. Try Repair PDF first.";
  return "Something went wrong: " + code;
}

// ---- Dialogs ----
export function askPassword(fileName, wrong = false) {
  return new Promise(resolve => {
    const input = h("input", { type: "password", class: "input", autocomplete: "off", placeholder: "PDF password" });
    const dlg = h("dialog", { class: "dialog" },
      h("form", { method: "dialog" },
        h("h3", {}, "Password required"),
        h("p", {}, wrong ? "Wrong password. " : "", h("strong", {}, fileName), " is protected. Your password is used only on this device."),
        input,
        h("div", { class: "dialog-actions" },
          h("button", { value: "cancel", class: "btn btn-ghost" }, "Cancel"),
          h("button", { value: "ok", class: "btn btn-primary" }, "Unlock"))));
    document.body.append(dlg);
    dlg.addEventListener("close", () => { const v = dlg.returnValue === "ok" ? input.value : null; dlg.remove(); resolve(v); });
    dlg.showModal(); input.focus();
  });
}

export function toast(msg, kind = "info") {
  let host = $(".toasts");
  if (!host) { host = h("div", { class: "toasts", role: "status", "aria-live": "polite" }); document.body.append(host); }
  const t = h("div", { class: `toast toast-${kind}` }, msg);
  host.append(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, kind === "error" ? 7000 : 3500);
}

// Run an engine op that needs a password, prompting as needed. fn(password) => Promise
export async function withPassword(fileName, fn, initial) {
  let pw = initial, wrong = false;
  for (;;) {
    try { return { result: await fn(pw), password: pw }; }
    catch (e) {
      if (e.code === "NEEDS_PASSWORD" || e.code === "WRONG_PASSWORD") {
        wrong = e.code === "WRONG_PASSWORD";
        pw = await askPassword(fileName, wrong);
        if (pw == null) { const c = new Error("CANCELLED"); c.code = "CANCELLED"; throw c; }
        continue;
      }
      throw e;
    }
  }
}

export const sleep = ms => new Promise(r => setTimeout(r, ms));
