import { $, $$, h, call, readBytes, isPdf, isImage, baseName, fmtBytes, normaliseImage, downloadBytes, zip, friendly, withPassword, toast, blobUrl } from "./lib.js";
import { handoffTake, handoffPut } from "./handoff.js";

const cfg = JSON.parse(document.getElementById("tool-config").textContent);
const root = document.getElementById("tool-app");
const S = { files: [], password: null, result: null };

// ---------- Stage rendering ----------
function setStage(node) { root.replaceChildren(node); root.scrollIntoView({ block: "nearest" }); }

function dropzone() {
  const input = h("input", { type: "file", accept: cfg.accept, multiple: cfg.multiple ? true : null, hidden: true });
  input.addEventListener("change", () => input.files.length && addFiles([...input.files]));
  const cam = cfg.camera ? h("input", { type: "file", accept: "image/*", capture: "environment", hidden: true }) : null;
  cam?.addEventListener("change", () => cam.files.length && addFiles([...cam.files]));
  const zone = h("div", { class: "dropzone", tabindex: "0", role: "button", "aria-label": cfg.selectLabel },
    h("div", { class: "dz-icon", "aria-hidden": "true", html: ICON_UPLOAD }),
    h("button", { class: "btn btn-primary btn-xl", type: "button", onclick: e => { e.stopPropagation(); input.click(); } }, cfg.selectLabel),
    cam && h("button", { class: "btn btn-ghost", type: "button", onclick: e => { e.stopPropagation(); cam.click(); } }, "📷 Use camera"),
    h("p", { class: "dz-hint" }, cfg.dropHint || "or drop files here"),
    cfg.urlInput ? urlBox() : null,
    h("p", { class: "dz-private" }, cfg.server ? "🔒 Sent over HTTPS to our converter, processed in memory and deleted immediately." : "🔒 Processed on your device. Your files are never uploaded."),
    input, cam);
  zone.addEventListener("click", () => input.click());
  zone.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } });
  bindDrop(zone);
  return zone;
}

function urlBox() {
  const inp = h("input", { class: "input", type: "url", placeholder: "https://example.com/page", "aria-label": "Web page address", onclick: e => e.stopPropagation(), onkeydown: e => { e.stopPropagation(); if (e.key === "Enter") go(); } });
  const go = async () => {
    let u = inp.value.trim();
    if (!u) return toast("Enter a web address.", "error");
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    try { new URL(u); } catch { return toast("That doesn't look like a valid web address.", "error"); }
    const { convertUrl } = await import("./server.js");
    try { await convertUrl(cfg, u, { busy, setBusyMsg, done }); } catch (e) { if (e.code !== "CANCELLED") toast(friendly(e), "error"); setStage(dropzone()); }
  };
  return h("div", { class: "url-box", onclick: e => e.stopPropagation() }, h("p", { class: "dz-hint" }, "or convert a web page:"), h("div", { class: "row" }, inp, h("button", { class: "btn btn-primary", type: "button", onclick: e => { e.stopPropagation(); go(); } }, "Convert URL")));
}

function bindDrop(el) {
  el.addEventListener("dragover", e => { e.preventDefault(); el.classList.add("over"); });
  el.addEventListener("dragleave", () => el.classList.remove("over"));
  el.addEventListener("drop", e => { e.preventDefault(); el.classList.remove("over"); const fs = [...(e.dataTransfer?.files || [])]; if (fs.length) addFiles(fs); });
}
document.addEventListener("paste", e => {
  const fs = [...(e.clipboardData?.files || [])];
  if (fs.length && root.isConnected) addFiles(fs);
});

function busy(msg, sub = "") {
  setStage(h("div", { class: "busy" }, h("div", { class: "spinner", "aria-hidden": "true" }), h("p", { class: "busy-msg" }, msg), h("p", { class: "busy-sub" }, sub)));
}
function setBusyMsg(msg, sub) { const m = $(".busy-msg", root), s = $(".busy-sub", root); if (m) m.textContent = msg; if (s && sub != null) s.textContent = sub; }

function workspace(main, side, actionLabel, action, extraTop) {
  const btn = h("button", { class: "btn btn-primary btn-xl btn-block", type: "button" }, actionLabel);
  btn.addEventListener("click", async () => {
    try { await action(); }
    catch (e) { if (e.code !== "CANCELLED") { console.error(e); toast(friendly(e), "error"); render(); } }
  });
  const addMore = cfg.multiple ? h("button", { class: "btn btn-ghost btn-block", type: "button", onclick: () => pick(true) }, "+ Add more files") : null;
  const ws = h("div", { class: "workspace" },
    h("div", { class: "ws-main" }, extraTop, main),
    h("aside", { class: "ws-side" }, h("h2", { class: "side-title" }, cfg.name), side, addMore, btn,
      h("button", { class: "btn btn-link", type: "button", onclick: reset }, "Start over")));
  bindDrop(ws);
  setStage(ws);
}

function pick(more) {
  const input = h("input", { type: "file", accept: cfg.accept, multiple: cfg.multiple ? true : null });
  input.addEventListener("change", () => input.files.length && addFiles([...input.files], more));
  input.click();
}

function reset() { S.files = []; S.password = null; S.result = null; history.replaceState(null, "", location.pathname); setStage(dropzone()); }

// Result screen. outputs: [{name, bytes, mime}]
async function done(outputs, { title = "Your file is ready", note = "", original } = {}) {
  let single = outputs.length === 1 ? outputs[0] : null;
  let zipped = null;
  if (!single) { zipped = { name: `${baseName(S.files[0]?.name || cfg.slug)}-${cfg.slug}.zip`, bytes: await zip(outputs), mime: "application/zip" }; }
  const file = single || zipped;
  S.result = file;
  const sizeLine = original && single ? `${fmtBytes(original)} → ${fmtBytes(single.bytes.length)}` + (single.bytes.length < original ? ` (${Math.round((1 - single.bytes.length / original) * 100)}% smaller)` : "") : fmtBytes(file.bytes.length);
  const dl = h("button", { class: "btn btn-primary btn-xl", type: "button", onclick: () => downloadBytes(file.name, file.bytes, file.mime) }, `⬇ Download ${outputs.length > 1 ? `ZIP (${outputs.length} files)` : file.name.split(".").pop().toUpperCase()}`);
  const preview = single && /pdf$/.test(single.mime) ? h("a", { class: "btn btn-ghost", href: blobUrl(single.bytes), target: "_blank", rel: "noopener" }, "Open preview") : null;
  const list = outputs.length > 1 ? h("ul", { class: "out-list" }, outputs.slice(0, 50).map(o => h("li", {}, h("button", { class: "linklike", type: "button", onclick: () => downloadBytes(o.name, o.bytes, o.mime) }, o.name), h("span", { class: "muted" }, " " + fmtBytes(o.bytes.length))))) : null;
  const next = single && /pdf$/.test(single.mime) ? h("div", { class: "next-tools" }, h("p", {}, "Continue with this file:"),
    h("div", { class: "chips" }, (cfg.next || []).map(t => h("a", { class: "chip", href: `/${t.slug}/?continue=1`, onclick: async e => { e.preventDefault(); await handoffPut({ name: single.name, bytes: single.bytes }); location.href = `/${t.slug}/?continue=1`; } }, t.name)))) : null;
  setStage(h("div", { class: "done" },
    h("div", { class: "done-icon", "aria-hidden": "true" }, "✓"),
    h("h2", {}, title),
    h("p", { class: "done-size" }, file.name, " · ", sizeLine),
    note ? h("p", { class: "done-note" }, note) : null,
    h("div", { class: "done-actions" }, dl, preview),
    list, next,
    h("button", { class: "btn btn-link", type: "button", onclick: reset }, `↺ ${cfg.name} another file`)));
  dl.focus();
}

// ---------- Loading files ----------
async function addFiles(list, append = false) {
  const accepted = list.filter(f => (cfg.kind === "images" ? isImage(f) : cfg.server ? true : isPdf(f)));
  if (!accepted.length) { toast(`Please choose ${cfg.acceptLabel || "a PDF file"}.`, "error"); return; }
  const limit = cfg.maxMB ? cfg.maxMB * 1024 * 1024 : 0;
  if (limit) { const big = accepted.find(f => f.size > limit); if (big) { toast(`${big.name} is larger than ${cfg.maxMB} MB, the limit for this converter.`, "error"); return; } }
  const files = cfg.multiple ? accepted : accepted.slice(0, cfg.kind === "compare" ? 2 : 1);
  if (!append && !(cfg.kind === "compare" && S.files.length === 1)) S.files = [];
  busy("Reading your file" + (files.length > 1 ? "s" : "") + "…", "Large files can take a few seconds.");
  try {
    for (const f of files) {
      const entry = { id: crypto.randomUUID(), name: f.name, size: f.size, file: f, bytes: null, info: null, thumbs: null, password: null };
      if (cfg.kind === "images") {
        entry.img = await normaliseImage(f);
        entry.url = blobUrl(entry.img.bytes, entry.img.type);
      } else if (!cfg.server || isPdf(f)) {
        entry.bytes = await readBytes(f);
        if (isPdf(f)) {
          const { result, password } = await withPassword(f.name, pw => call("info", { bytes: entry.bytes, password: pw }).then(r => { if (r.needsPassword) { const e = new Error(pw ? "WRONG_PASSWORD" : "NEEDS_PASSWORD"); e.code = e.message; throw e; } return r; }), null);
          entry.info = result; entry.password = password;
        }
      } else {
        entry.bytes = await readBytes(f);
      }
      S.files.push(entry);
      if (cfg.kind === "compare" && S.files.length > 2) S.files.shift();
    }
  } catch (e) {
    if (e.code !== "CANCELLED") toast(friendly(e), "error");
    if (!S.files.length) return setStage(dropzone());
  }
  render();
}

// ---------- Kinds ----------
function render() {
  if (!S.files.length) return setStage(dropzone());
  const k = KINDS[cfg.kind];
  if (!k) return setStage(h("p", {}, "Unknown tool"));
  k();
}

const KINDS = {
  merge: renderMerge,
  images: renderImages,
  pages: renderPages,
  single: renderSingle,
  editor: renderEditor,
  compare: renderCompare,
  server: renderServer,
};

// ----- Merge -----
async function fileThumb(entry) {
  if (entry.thumb) return entry.thumb;
  try {
    const [t] = await call("thumbnails", { bytes: entry.bytes, width: 180, password: entry.password, max: 1 });
    entry.thumb = blobUrl(t, "image/jpeg");
  } catch { entry.thumb = ""; }
  return entry.thumb;
}

function sortableList(container, items, onReorder) {
  let dragId = null;
  container.addEventListener("dragstart", e => { const c = e.target.closest("[data-id]"); if (!c) return; dragId = c.dataset.id; c.classList.add("dragging"); e.dataTransfer.effectAllowed = "move"; });
  container.addEventListener("dragend", e => { e.target.closest("[data-id]")?.classList.remove("dragging"); dragId = null; });
  container.addEventListener("dragover", e => {
    if (!dragId) return;
    e.preventDefault();
    const over = e.target.closest("[data-id]");
    if (!over || over.dataset.id === dragId) return;
    const dragged = container.querySelector(`[data-id="${dragId}"]`);
    const r = over.getBoundingClientRect();
    const after = (e.clientX - r.left) / r.width > 0.5;
    over.parentNode.insertBefore(dragged, after ? over.nextSibling : over);
  });
  container.addEventListener("drop", e => {
    if (!dragId) return;
    e.preventDefault(); e.stopPropagation();
    onReorder([...container.querySelectorAll("[data-id]")].map(n => n.dataset.id));
  });
}

function renderMerge() {
  const grid = h("div", { class: "card-grid" });
  const draw = () => {
    grid.replaceChildren(...S.files.map((f, i) => {
      const img = h("img", { alt: "", loading: "lazy" });
      fileThumb(f).then(u => { if (u) img.src = u; });
      return h("div", { class: "file-card", draggable: "true", "data-id": f.id },
        h("div", { class: "thumb" }, img),
        h("div", { class: "fc-name", title: f.name }, f.name),
        h("div", { class: "fc-meta" }, `${f.info?.pages || "?"} pages · ${fmtBytes(f.size)}`),
        h("div", { class: "fc-actions" },
          h("button", { class: "icon-btn", title: "Move left", "aria-label": "Move left", disabled: i === 0, onclick: () => { [S.files[i - 1], S.files[i]] = [S.files[i], S.files[i - 1]]; draw(); } }, "←"),
          h("button", { class: "icon-btn", title: "Remove", "aria-label": "Remove file", onclick: () => { S.files.splice(i, 1); S.files.length ? draw() : reset(); } }, "✕"),
          h("button", { class: "icon-btn", title: "Move right", "aria-label": "Move right", disabled: i === S.files.length - 1, onclick: () => { [S.files[i + 1], S.files[i]] = [S.files[i], S.files[i + 1]]; draw(); } }, "→")));
    }));
  };
  sortableList(grid, S.files, ids => { S.files.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)); draw(); });
  draw();
  const sortBtn = h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { S.files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })); draw(); } }, "Sort A→Z");
  workspace(grid, h("div", {}, h("p", { class: "muted" }, "Drag files to set the order. Pages keep their original quality — nothing is re-compressed."), sortBtn),
    "Merge PDF", async () => {
      if (S.files.length < 2) { toast("Add at least two PDF files to merge.", "error"); return; }
      busy("Merging " + S.files.length + " files…");
      const out = await call("merge", { files: S.files.map(f => ({ bytes: f.bytes, password: f.password })) });
      const total = S.files.reduce((a, f) => a + f.size, 0);
      done([{ name: "merged.pdf", bytes: out, mime: "application/pdf" }], { note: `${S.files.reduce((a, f) => a + (f.info?.pages || 0), 0)} pages combined from ${S.files.length} files. Original total ${fmtBytes(total)}.` });
    });
}

// ----- Images to PDF / Scan -----
function renderImages() {
  const grid = h("div", { class: "card-grid" });
  const draw = () => grid.replaceChildren(...S.files.map((f, i) => h("div", { class: "file-card", draggable: "true", "data-id": f.id },
    h("div", { class: "thumb" }, h("img", { src: f.url, alt: "", style: f.filter ? { filter: f.filter } : null })),
    h("div", { class: "fc-name", title: f.name }, f.name),
    h("div", { class: "fc-actions" },
      h("button", { class: "icon-btn", "aria-label": "Move left", disabled: i === 0, onclick: () => { [S.files[i - 1], S.files[i]] = [S.files[i], S.files[i - 1]]; draw(); } }, "←"),
      h("button", { class: "icon-btn", "aria-label": "Rotate", title: "Rotate", onclick: async () => { f.img = await rotateImage(f.img, 90); f.url = blobUrl(f.img.bytes, f.img.type); draw(); } }, "⟳"),
      h("button", { class: "icon-btn", "aria-label": "Remove", onclick: () => { S.files.splice(i, 1); S.files.length ? draw() : reset(); } }, "✕"),
      h("button", { class: "icon-btn", "aria-label": "Move right", disabled: i === S.files.length - 1, onclick: () => { [S.files[i + 1], S.files[i]] = [S.files[i], S.files[i + 1]]; draw(); } }, "→")))));
  sortableList(grid, S.files, ids => { S.files.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)); draw(); });
  draw();
  const size = select("Page size", "pageSize", [["a4", "A4"], ["letter", "US Letter"], ["legal", "Legal"], ["fit", "Same as image"]], "a4");
  const orient = select("Orientation", "orientation", [["auto", "Automatic"], ["portrait", "Portrait"], ["landscape", "Landscape"]], "auto");
  const margin = select("Margin", "margin", [["0", "No margin"], ["18", "Small"], ["36", "Large"]], cfg.camera ? "0" : "18");
  const enhance = cfg.camera ? select("Scan enhancement", "enhance", [["none", "Original colour"], ["doc", "Document (clean & sharp)"], ["gray", "Grayscale"], ["bw", "Black & white"]], "doc") : null;
  workspace(grid, h("div", { class: "opts" }, size.el, orient.el, margin.el, enhance?.el),
    cfg.slug === "scan-to-pdf" ? "Create PDF" : "Convert to PDF", async () => {
      busy("Building your PDF…");
      const images = [];
      for (const f of S.files) images.push({ bytes: enhance && enhance.value() !== "none" ? (await enhanceScan(f.file, enhance.value())).bytes : f.img.bytes });
      const out = await call("imagesToPdf", { images, opts: { pageSize: size.value(), orientation: orient.value(), margin: +margin.value() } });
      done([{ name: (S.files.length === 1 ? baseName(S.files[0].name) : "images") + ".pdf", bytes: out, mime: "application/pdf" }], { note: `${S.files.length} image${S.files.length > 1 ? "s" : ""} → ${S.files.length} page PDF.` });
    });
}

async function rotateImage(img, deg) {
  const bmp = await createImageBitmap(new Blob([img.bytes], { type: img.type }));
  const c = new OffscreenCanvas(bmp.height, bmp.width);
  const g = c.getContext("2d");
  g.translate(c.width / 2, c.height / 2); g.rotate((deg * Math.PI) / 180); g.drawImage(bmp, -bmp.width / 2, -bmp.height / 2);
  const blob = await c.convertToBlob({ type: img.type === "image/png" ? "image/png" : "image/jpeg", quality: 0.95 });
  return { bytes: new Uint8Array(await blob.arrayBuffer()), type: blob.type };
}

// Document-scan enhancement: normalise illumination, boost contrast, optional gray / threshold.
async function enhanceScan(file, mode) {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const maxSide = 3000, s = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * s), hh = Math.round(bmp.height * s);
  const c = new OffscreenCanvas(w, hh), g = c.getContext("2d", { willReadFrequently: true });
  g.drawImage(bmp, 0, 0, w, hh);
  const id = g.getImageData(0, 0, w, hh), d = id.data;
  // Background estimate from a heavily blurred copy (removes shadows / uneven light).
  const small = new OffscreenCanvas(Math.max(1, w >> 4), Math.max(1, hh >> 4)), sg = small.getContext("2d", { willReadFrequently: true });
  sg.filter = "blur(4px)"; sg.drawImage(c, 0, 0, small.width, small.height);
  const bg = new OffscreenCanvas(w, hh), bgg = bg.getContext("2d", { willReadFrequently: true });
  bgg.imageSmoothingQuality = "high"; bgg.drawImage(small, 0, 0, w, hh);
  const b = bgg.getImageData(0, 0, w, hh).data;
  for (let i = 0; i < d.length; i += 4) {
    for (let k = 0; k < 3; k++) {
      let v = (d[i + k] / Math.max(40, b[i + k])) * 255; // divide by background
      if (mode !== "none") v = Math.min(255, Math.max(0, (v - 40) * 1.25));
      d[i + k] = v;
    }
    if (mode === "gray" || mode === "bw" || mode === "doc") {
      const y = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      if (mode === "bw") { const t = y > 170 ? 255 : 0; d[i] = d[i + 1] = d[i + 2] = t; }
      else if (mode === "gray") { d[i] = d[i + 1] = d[i + 2] = y; }
      else { // doc: keep colour but whiten paper
        if (y > 200) { d[i] = d[i + 1] = d[i + 2] = 255; }
      }
    }
  }
  g.putImageData(id, 0, 0);
  const blob = await c.convertToBlob({ type: "image/jpeg", quality: mode === "bw" ? 0.85 : 0.9 });
  return { bytes: new Uint8Array(await blob.arrayBuffer()) };
}

// ----- Page grid tools -----
async function loadThumbs(entry, width = 150) {
  if (entry.thumbs) return entry.thumbs;
  const t = await call("thumbnails", { bytes: entry.bytes, width, password: entry.password, max: 500 });
  entry.thumbs = t.map(b => blobUrl(b, "image/jpeg"));
  return entry.thumbs;
}

function rangesFromSet(set) {
  const a = [...set].sort((x, y) => x - y), out = [];
  for (let i = 0; i < a.length; i++) { let j = i; while (j + 1 < a.length && a[j + 1] === a[j] + 1) j++; out.push(i === j ? `${a[i] + 1}` : `${a[i] + 1}-${a[j] + 1}`); i = j; }
  return out.join(", ");
}

async function renderPages() {
  const f = S.files[0];
  busy("Preparing page previews…", `${f.info.pages} pages`);
  const thumbs = await loadThumbs(f);
  const n = f.info.pages;
  const slug = cfg.slug;
  const selected = new Set();
  let order = [...Array(n).keys()].map(i => ({ id: "p" + i, src: i, rotate: 0, deleted: false }));
  const grid = h("div", { class: "page-grid" + (slug === "organize-pdf" ? " sortable" : "") });
  const rangeInput = h("input", { class: "input", type: "text", placeholder: "e.g. 1-3, 5, 8-" });
  const counter = h("p", { class: "muted" });
  const selectable = ["remove-pages", "extract-pages", "split-pdf"].includes(slug);
  let action_sep = null;

  const draw = () => {
    grid.replaceChildren(...order.map((p, vi) => {
      const sel = selected.has(p.src);
      const card = h("div", { class: "page-card" + (sel ? " selected" : "") + (p.deleted ? " deleted" : ""), "data-id": p.id, draggable: slug === "organize-pdf" ? "true" : null, tabindex: selectable ? "0" : null, role: selectable ? "checkbox" : null, "aria-checked": selectable ? String(sel) : null },
        h("div", { class: "thumb" }, p.blank ? h("div", { class: "blank-page" }, "Blank") : h("img", { src: thumbs[p.src], alt: `Page ${p.src + 1}`, loading: "lazy", style: { transform: `rotate(${p.rotate}deg)` } })),
        h("div", { class: "pc-num" }, p.blank ? "+" : String(p.src + 1)),
        (slug === "organize-pdf" || slug === "rotate-pdf") ? h("div", { class: "pc-actions" },
          h("button", { class: "icon-btn", title: "Rotate left", "aria-label": "Rotate left", onclick: e => { e.stopPropagation(); p.rotate = (p.rotate + 270) % 360; draw(); } }, "↺"),
          h("button", { class: "icon-btn", title: "Rotate right", "aria-label": "Rotate right", onclick: e => { e.stopPropagation(); p.rotate = (p.rotate + 90) % 360; draw(); } }, "↻"),
          slug === "organize-pdf" ? h("button", { class: "icon-btn", title: p.deleted ? "Restore" : "Delete", "aria-label": "Delete page", onclick: e => { e.stopPropagation(); p.deleted = !p.deleted; draw(); } }, p.deleted ? "↩" : "🗑") : null) : null);
      if (selectable) {
        const toggle = () => { sel ? selected.delete(p.src) : selected.add(p.src); rangeInput.value = rangesFromSet(selected); draw(); };
        card.addEventListener("click", toggle);
        card.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } });
      }
      return card;
    }));
    if (selectable) counter.textContent = selected.size ? `${selected.size} of ${n} pages selected` : `Click pages to select them (${n} pages)`;
    if (slug === "organize-pdf") counter.textContent = `${order.filter(p => !p.deleted).length} pages in new document`;
  };
  rangeInput.addEventListener("input", () => {
    selected.clear();
    try { for (const part of rangeInput.value.split(",")) { const m = part.trim().match(/^(\d*)\s*-\s*(\d*)$/); if (m) { for (let i = +(m[1] || 1); i <= +(m[2] || n); i++) if (i >= 1 && i <= n) selected.add(i - 1); } else if (/^\d+$/.test(part.trim())) { const v = +part.trim(); if (v >= 1 && v <= n) selected.add(v - 1); } } } catch {}
    draw();
  });
  if (slug === "organize-pdf") sortableList(grid, order, ids => { order.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)); draw(); });
  draw();

  let side, label, action;
  const name = baseName(f.name);
  if (slug === "remove-pages" || slug === "extract-pages") {
    const remove = slug === "remove-pages";
    side = h("div", { class: "opts" }, h("label", { class: "lbl" }, remove ? "Pages to remove" : "Pages to extract", rangeInput), counter,
      remove ? null : (() => { const c = checkbox("Save each selected page as a separate PDF", "sep"); action_sep = c; return c.el; })(),
      h("div", { class: "row" }, h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { for (let i = 0; i < n; i += 2) selected.add(i); rangeInput.value = rangesFromSet(selected); draw(); } }, "Odd pages"),
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { for (let i = 1; i < n; i += 2) selected.add(i); rangeInput.value = rangesFromSet(selected); draw(); } }, "Even pages"),
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { selected.clear(); rangeInput.value = ""; draw(); } }, "Clear")));
    label = remove ? "Remove pages" : "Extract pages";
    action = async () => {
      if (!selected.size) { toast("Select at least one page.", "error"); return; }
      busy(remove ? "Removing pages…" : "Extracting pages…");
      const spec = rangesFromSet(selected);
      if (remove) {
        const out = await call("remove", { bytes: f.bytes, spec, password: f.password });
        done([{ name: `${name}-edited.pdf`, bytes: out, mime: "application/pdf" }], { note: `Removed ${selected.size} page${selected.size > 1 ? "s" : ""}. ${n - selected.size} pages remain.` });
      } else if (action_sep?.value()) {
        const outs = await call("split", { bytes: f.bytes, mode: { type: "ranges", ranges: [...selected].sort((a, b) => a - b).map(i => String(i + 1)) }, password: f.password });
        done(outs.map(o => ({ ...o, name: `${name}-${o.name}`, mime: "application/pdf" })));
      } else {
        const out = await call("extract", { bytes: f.bytes, spec, password: f.password });
        done([{ name: `${name}-pages-${spec.replace(/\s/g, "")}.pdf`, bytes: out, mime: "application/pdf" }]);
      }
    };
  } else if (slug === "split-pdf") {
    const mode = radio("Split mode", "mode", [["ranges", "Custom ranges"], ["every", "Every N pages"], ["each", "Every page"], ["selected", "Selected pages"]], "ranges");
    const ranges = h("textarea", { class: "input", rows: 3, placeholder: "One range per file, e.g.\n1-3\n4-10\n11-" });
    ranges.value = n > 1 ? `1-${Math.ceil(n / 2)}\n${Math.ceil(n / 2) + 1}-${n}` : "1";
    const every = h("input", { class: "input", type: "number", min: 1, max: n, value: Math.min(2, n) });
    const sub = h("div");
    const upd = () => sub.replaceChildren(mode.value() === "ranges" ? h("label", { class: "lbl" }, "Ranges (one per output file)", ranges) : mode.value() === "every" ? h("label", { class: "lbl" }, "Pages per file", every) : mode.value() === "selected" ? h("div", {}, h("label", { class: "lbl" }, "Pages", rangeInput), counter) : h("p", { class: "muted" }, `Creates ${n} single-page PDFs.`));
    mode.onChange(upd); upd();
    side = h("div", { class: "opts" }, mode.el, sub);
    label = "Split PDF";
    action = async () => {
      busy("Splitting…");
      let m;
      if (mode.value() === "ranges") m = { type: "ranges", ranges: ranges.value.split(/\n|;/).map(s => s.trim()).filter(Boolean) };
      else if (mode.value() === "every") m = { type: "every", n: Math.max(1, +every.value || 1) };
      else if (mode.value() === "selected") { if (!selected.size) { toast("Select pages first.", "error"); return render(); } m = { type: "ranges", ranges: [rangesFromSet(selected)] }; }
      else m = { type: "each" };
      const outs = await call("split", { bytes: f.bytes, mode: m, password: f.password });
      if (!outs.length) { toast("No pages matched those ranges.", "error"); return render(); }
      done(outs.map(o => ({ ...o, name: `${name}-${o.name}`, mime: "application/pdf" })));
    };
  } else if (slug === "organize-pdf") {
    side = h("div", { class: "opts" }, h("p", { class: "muted" }, "Drag pages to reorder. Use the buttons on each page to rotate or delete."), counter,
      h("div", { class: "row wrap" },
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { order.push({ id: "b" + Date.now(), blank: true, rotate: 0 }); draw(); } }, "+ Blank page"),
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { order.reverse(); draw(); } }, "Reverse order"),
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { order = [...Array(n).keys()].map(i => ({ id: "p" + i, src: i, rotate: 0, deleted: false })); draw(); } }, "Reset")));
    label = "Save new order";
    action = async () => {
      const keep = order.filter(p => !p.deleted);
      if (!keep.length) { toast("Keep at least one page.", "error"); return; }
      busy("Organizing pages…");
      const out = await call("organize", { bytes: f.bytes, order: keep.map(p => (p.blank ? { blank: true, size: [f.info.sizes[0]?.w || 595, f.info.sizes[0]?.h || 842] } : { src: p.src, rotate: p.rotate })), password: f.password });
      done([{ name: `${name}-organized.pdf`, bytes: out, mime: "application/pdf" }]);
    };
  } else if (slug === "rotate-pdf") {
    side = h("div", { class: "opts" }, h("p", { class: "muted" }, "Rotate individual pages with the buttons on each page, or rotate them all:"),
      h("div", { class: "row" }, h("button", { class: "btn btn-ghost", type: "button", onclick: () => { order.forEach(p => (p.rotate = (p.rotate + 270) % 360)); draw(); } }, "↺ All left"),
        h("button", { class: "btn btn-ghost", type: "button", onclick: () => { order.forEach(p => (p.rotate = (p.rotate + 90) % 360)); draw(); } }, "↻ All right")));
    label = "Rotate PDF";
    action = async () => {
      if (!order.some(p => p.rotate)) { toast("Rotate at least one page first.", "error"); return; }
      busy("Rotating…");
      const out = await call("organize", { bytes: f.bytes, order: order.map(p => ({ src: p.src, rotate: p.rotate })), password: f.password });
      done([{ name: `${name}-rotated.pdf`, bytes: out, mime: "application/pdf" }], { note: "Rotation is lossless — page content is not re-rendered." });
    };
  }
  workspace(grid, side, label, action);
}

// ----- Single-file option tools -----
function select(label, name, options, value) {
  const s = h("select", { class: "input", name }, options.map(([v, t]) => h("option", { value: v, selected: v === value ? true : null }, t)));
  return { el: h("label", { class: "lbl" }, label, s), value: () => s.value, input: s, onChange: fn => s.addEventListener("change", fn) };
}
function radio(label, name, options, value) {
  const id = name + Math.random().toString(36).slice(2, 6);
  const wrap = h("div", { class: "seg", role: "radiogroup", "aria-label": label }, options.map(([v, t]) => h("label", { class: "seg-opt" }, h("input", { type: "radio", name: id, value: v, checked: v === value ? true : null }), h("span", {}, t))));
  return { el: h("div", { class: "lbl" }, h("span", {}, label), wrap), value: () => $(`input[name="${id}"]:checked`, wrap)?.value, onChange: fn => wrap.addEventListener("change", fn) };
}
function checkbox(label, name, checked = false) {
  const c = h("input", { type: "checkbox", name, checked: checked ? true : null });
  return { el: h("label", { class: "check" }, c, h("span", {}, label)), value: () => c.checked, input: c };
}
function textInput(label, name, value = "", attrs = {}) {
  const i = h("input", { class: "input", name, value, ...attrs });
  return { el: h("label", { class: "lbl" }, label, i), value: () => i.value, input: i };
}

async function previewImg(f, page = 0, dpi = 60) {
  const r = await call("renderPage", { bytes: f.bytes, page, dpi, password: f.password });
  return blobUrl(r.png, "image/png");
}

async function renderSingle() {
  const f = S.files[0];
  const slug = cfg.slug, name = baseName(f.name);
  const thumbImg = h("img", { alt: "First page preview" });
  fileThumb(f).then(u => u && (thumbImg.src = u));
  const fileBox = h("div", { class: "single-file" }, h("div", { class: "thumb" }, thumbImg), h("div", {}, h("div", { class: "fc-name" }, f.name), h("div", { class: "fc-meta" }, `${f.info?.pages ?? "?"} pages · ${fmtBytes(f.size)}`)));
  const H = SINGLE[slug];
  const { side, label, action, main } = await H(f, name);
  workspace(main ? h("div", {}, fileBox, main) : fileBox, side, label, action);
}

const PDF = "application/pdf";
const SINGLE = {
  "compress-pdf": async (f, name) => {
    const mode = radio("Compression", "mode", [["recommended", "Recommended"], ["extreme", "Extreme"], ["low", "Less (best quality)"], ["target", "Exact size"]], "recommended");
    const target = h("input", { class: "input", type: "number", min: 10, step: 10, value: Math.max(50, Math.round(f.size / 1024 / 3 / 10) * 10) });
    const unit = h("select", { class: "input" }, h("option", { value: "KB" }, "KB"), h("option", { value: "MB" }, "MB"));
    const keepColour = checkbox("Keep colour (don't switch to grayscale)", "colour", false);
    const sub = h("div");
    const upd = () => sub.replaceChildren(...(mode.value() === "target" ? [h("label", { class: "lbl" }, "Maximum file size", h("div", { class: "row" }, target, unit)), keepColour.el, h("p", { class: "muted" }, "We search for the sharpest result that fits under your limit — and show the exact size before you download.")] :
      [h("p", { class: "muted" }, { recommended: "Good quality, much smaller. Ideal for email and uploads.", extreme: "Smallest file, lower image quality.", low: "Light compression, near-original quality." }[mode.value()])]));
    mode.onChange(upd); upd();
    return {
      side: h("div", { class: "opts" }, mode.el, sub), label: "Compress PDF",
      action: async () => {
        if (mode.value() === "target") {
          const bytesLimit = Math.round(+target.value * (unit.value === "MB" ? 1024 * 1024 : 1024));
          if (!(bytesLimit > 1000)) { toast("Enter a valid size.", "error"); return; }
          busy(`Fitting under ${target.value} ${unit.value}…`, "Trying several quality settings to keep it as sharp as possible.");
          const r = await call("compressTarget", { bytes: f.bytes, target: bytesLimit, allowGray: !keepColour.value(), password: f.password });
          const note = r.met ? `Fits your ${target.value} ${unit.value} limit. Images at ~${r.dpi} DPI${r.gray ? ", grayscale" : ""}. Text stays sharp and selectable.` : `Couldn't get under ${target.value} ${unit.value} without making it unreadable — this is the smallest readable version. Try removing pages or splitting the file.`;
          done([{ name: `${name}-${Math.round(r.bytes.length / 1024)}kb.pdf`, bytes: r.bytes, mime: PDF }], { title: r.met ? "Compressed to your size" : "Smallest possible version", note, original: f.size });
        } else {
          busy("Compressing…", "Optimising images, fonts and structure.");
          const r = await call("compressLevel", { bytes: f.bytes, level: mode.value(), password: f.password });
          done([{ name: `${name}-compressed.pdf`, bytes: r.bytes, mime: PDF }], { title: r.method === "original" ? "Already optimised" : "PDF compressed", note: r.method === "original" ? "This PDF is already as small as it can be at this quality level." : "", original: f.size });
        }
      },
    };
  },
  "add-page-numbers": async (f, name) => {
    const pos = select("Position", "pos", [["bottom-center", "Bottom centre"], ["bottom-right", "Bottom right"], ["bottom-left", "Bottom left"], ["top-center", "Top centre"], ["top-right", "Top right"], ["top-left", "Top left"]], "bottom-center");
    const fmt = select("Format", "fmt", [["{n}", "1"], ["Page {n}", "Page 1"], ["Page {n} of {total}", "Page 1 of N"], ["{n} / {total}", "1 / N"], ["- {n} -", "- 1 -"]], "{n}");
    const start = textInput("Start numbering at", "start", "1", { type: "number", min: 0 });
    const pages = textInput("Pages to number", "pages", "", { placeholder: "All pages (or e.g. 2-)" });
    const size = select("Font size", "size", [["9", "Small"], ["11", "Normal"], ["14", "Large"]], "11");
    const font = select("Font", "font", [["helv", "Helvetica"], ["times", "Times"], ["cour", "Courier"]], "helv");
    const color = textInput("Colour", "color", "#000000", { type: "color" });
    return {
      side: h("div", { class: "opts" }, pos.el, fmt.el, h("div", { class: "row" }, start.el, size.el), pages.el, h("div", { class: "row" }, font.el, color.el)), label: "Add page numbers",
      action: async () => {
        busy("Adding page numbers…");
        const out = await call("pageNumbers", { bytes: f.bytes, opts: { position: pos.value(), format: fmt.value(), start: +start.value() || 1, pages: pages.value().trim() || undefined, size: +size.value(), font: font.value(), color: color.value() }, password: f.password });
        done([{ name: `${name}-numbered.pdf`, bytes: out, mime: PDF }]);
      },
    };
  },
  "watermark-pdf": async (f, name) => {
    const type = radio("Watermark type", "type", [["text", "Text"], ["image", "Image"]], "text");
    const text = textInput("Text", "text", "CONFIDENTIAL");
    const imgIn = h("input", { type: "file", accept: "image/*", class: "input" });
    const pos = select("Position", "pos", [["center", "Centre"], ["mosaic", "Tiled (mosaic)"], ["top-center", "Top"], ["bottom-center", "Bottom"], ["top-left", "Top left"], ["top-right", "Top right"], ["bottom-left", "Bottom left"], ["bottom-right", "Bottom right"]], "center");
    const angle = select("Rotation", "angle", [["45", "45°"], ["0", "0°"], ["-45", "-45°"], ["90", "90°"]], "45");
    const opacity = select("Transparency", "op", [["0.15", "Light"], ["0.3", "Medium"], ["0.5", "Strong"], ["1", "Opaque"]], "0.3");
    const size = select("Text size", "size", [["32", "Small"], ["54", "Medium"], ["80", "Large"]], "54");
    const color = textInput("Colour", "color", "#d32f2f", { type: "color" });
    const layer = select("Layer", "layer", [["over", "Over content"], ["under", "Behind content"]], "over");
    const pages = textInput("Pages", "pages", "", { placeholder: "All pages (or e.g. 1-3)" });
    const sub = h("div");
    const upd = () => sub.replaceChildren(...(type.value() === "text" ? [text.el, h("div", { class: "row" }, size.el, color.el)] : [h("label", { class: "lbl" }, "Image (PNG with transparency works best)", imgIn)]));
    type.onChange(upd); upd();
    return {
      side: h("div", { class: "opts" }, type.el, sub, pos.el, h("div", { class: "row" }, angle.el, opacity.el), layer.el, pages.el), label: "Add watermark",
      action: async () => {
        const opts = { position: pos.value(), angle: +angle.value(), opacity: +opacity.value(), layer: layer.value(), pages: pages.value().trim() || undefined };
        if (type.value() === "text") { if (!text.value().trim()) { toast("Enter watermark text.", "error"); return; } Object.assign(opts, { text: text.value(), size: +size.value(), color: color.value() }); }
        else { if (!imgIn.files[0]) { toast("Choose an image.", "error"); return; } opts.image = { bytes: (await normaliseImage(imgIn.files[0])).bytes }; }
        busy("Adding watermark…");
        const out = await call("watermark", { bytes: f.bytes, opts, password: f.password });
        done([{ name: `${name}-watermarked.pdf`, bytes: out, mime: PDF }]);
      },
    };
  },
  "protect-pdf": async (f, name) => {
    const pw = textInput("Password", "pw", "", { type: "password", autocomplete: "new-password" });
    const pw2 = textInput("Repeat password", "pw2", "", { type: "password", autocomplete: "new-password" });
    const noPrint = checkbox("Prevent printing", "np"), noCopy = checkbox("Prevent copying text", "nc"), noEdit = checkbox("Prevent editing", "ne");
    return {
      side: h("div", { class: "opts" }, pw.el, pw2.el, h("details", { class: "adv" }, h("summary", {}, "Permissions"), noPrint.el, noCopy.el, noEdit.el), h("p", { class: "muted" }, "Uses AES-256 encryption — the strongest PDF standard.")), label: "Protect PDF",
      action: async () => {
        if (pw.value().length < 4) { toast("Use a password of at least 4 characters.", "error"); return; }
        if (pw.value() !== pw2.value()) { toast("Passwords don't match.", "error"); return; }
        busy("Encrypting…");
        const out = await call("protect", { bytes: f.bytes, opts: { userPassword: pw.value(), ownerPassword: pw.value() + "\u0001owner", perms: { print: !noPrint.value(), printHigh: !noPrint.value(), copy: !noCopy.value(), modify: !noEdit.value(), annotate: !noEdit.value(), assemble: !noEdit.value() } }, password: f.password });
        done([{ name: `${name}-protected.pdf`, bytes: out, mime: PDF }], { note: "Keep your password safe — it can't be recovered." });
      },
    };
  },
  "unlock-pdf": async (f, name) => ({
    side: h("div", { class: "opts" }, h("p", { class: "muted" }, f.info?.encrypted ? "Password accepted. We'll save a copy with no password or restrictions." : "This PDF has no open password. We'll remove any printing, copying or editing restrictions.")), label: "Unlock PDF",
    action: async () => {
      busy("Removing protection…");
      const out = await call("unlock", { bytes: f.bytes, password: f.password });
      done([{ name: `${name}-unlocked.pdf`, bytes: out, mime: PDF }]);
    },
  }),
  "repair-pdf": async (f, name) => ({
    side: h("div", { class: "opts" }, h("p", { class: "muted" }, f.info?.repaired ? "⚠ Damage detected in this file's structure. Repair will rebuild it." : "We'll rebuild the file structure, fix broken cross-references and recover every readable page.")), label: "Repair PDF",
    action: async () => {
      busy("Repairing…");
      const r = await call("repair", { bytes: f.bytes, password: f.password });
      done([{ name: `${name}-repaired.pdf`, bytes: r.bytes, mime: PDF }], { note: `${r.pages} pages recovered${r.badPages ? `, ${r.badPages} page(s) had unreadable content` : ""}.` });
    },
  }),
  "pdf-to-pdfa": async (f, name) => {
    const lvl = select("Conformance", "lvl", [["2", "PDF/A-2b (recommended)"], ["1", "PDF/A-1b (older systems)"], ["3", "PDF/A-3b"]], "2");
    return {
      side: h("div", { class: "opts" }, lvl.el, h("p", { class: "muted" }, "PDF/A is the ISO standard for long-term archiving, often required by courts, government portals and universities. Fonts are embedded and colours are standardised.")), label: "Convert to PDF/A",
      action: async () => {
        busy("Converting to PDF/A…", "Embedding fonts and colour profiles. This can take a minute for large files.");
        const out = await call("pdfa", { bytes: f.bytes, password: f.password, level: +lvl.value() });
        done([{ name: `${name}-pdfa.pdf`, bytes: out, mime: PDF }]);
      },
    };
  },
  "pdf-to-jpg": async (f, name) => {
    const fmt = select("Image format", "fmt", [["jpg", "JPG"], ["png", "PNG (lossless)"]], "jpg");
    const dpi = select("Quality", "dpi", [["96", "Screen (96 DPI)"], ["150", "Normal (150 DPI)"], ["220", "High (220 DPI)"], ["300", "Print (300 DPI)"]], "150");
    const pages = textInput("Pages", "pages", "", { placeholder: `All ${f.info.pages} pages (or e.g. 1-3)` });
    return {
      side: h("div", { class: "opts" }, fmt.el, dpi.el, pages.el), label: "Convert to images",
      action: async () => {
        busy("Rendering pages…");
        const outs = await call("toImages", { bytes: f.bytes, opts: { dpi: +dpi.value(), format: fmt.value(), quality: 92, pages: pages.value().trim() || undefined, password: f.password } });
        done(outs.map(o => ({ ...o, name: `${name}-${o.name}`, mime: fmt.value() === "png" ? "image/png" : "image/jpeg" })));
      },
    };
  },
  "ocr-pdf": async (f, name) => {
    const LANGS = [["eng", "English"], ["hin", "Hindi"], ["tam", "Tamil"], ["tel", "Telugu"], ["kan", "Kannada"], ["mal", "Malayalam"], ["ben", "Bengali"], ["mar", "Marathi"], ["guj", "Gujarati"], ["pan", "Punjabi"], ["ori", "Odia"], ["urd", "Urdu"], ["fra", "French"], ["deu", "German"], ["spa", "Spanish"], ["ara", "Arabic"]];
    const l1 = select("Document language", "l1", LANGS, "eng");
    const l2 = select("Second language (optional)", "l2", [["", "None"], ...LANGS], "");
    const out = select("Output", "out", [["pdf", "Searchable PDF"], ["txt", "Text file (.txt)"], ["both", "Both"]], "pdf");
    const pages = textInput("Pages", "pages", "", { placeholder: `All ${f.info.pages} pages` });
    return {
      side: h("div", { class: "opts" }, l1.el, l2.el, out.el, pages.el, h("p", { class: "muted" }, "Runs Tesseract's best LSTM models on your device. The first run downloads the language model (1–3 MB), then it's cached.")), label: "Run OCR",
      action: async () => {
        const { ocrPdf } = await import("./ocr.js");
        busy("Loading OCR engine…", "First time only: downloading the language model.");
        const langs = [l1.value(), l2.value()].filter(Boolean).join("+");
        const r = await ocrPdf(f, { langs, pages: pages.value().trim() || undefined, onProgress: (i, n, phase) => setBusyMsg(`Recognising page ${i} of ${n}…`, phase) });
        const outputs = [];
        if (out.value() !== "txt") outputs.push({ name: `${name}-ocr.pdf`, bytes: r.pdf, mime: PDF });
        if (out.value() !== "pdf") outputs.push({ name: `${name}-ocr.txt`, bytes: new TextEncoder().encode(r.text), mime: "text/plain" });
        done(outputs, { note: `Average recognition confidence ${Math.round(r.confidence)}%.` + (r.skipped ? ` ${r.skipped} page(s) already had text and were kept as-is.` : "") });
      },
    };
  },
  "crop-pdf": async (f, name) => {
    const { cropUI } = await import("./editor.js");
    return cropUI(f, name, { busy, done, call, toast });
  },
};

// ----- Visual editor tools (sign / edit / redact) -----
async function renderEditor() {
  const f = S.files[0];
  const { editorUI } = await import("./editor.js");
  const { main, side, label, action } = await editorUI(cfg.slug, f, baseName(f.name), { busy, done, call, toast, render });
  workspace(main, side, label, action);
}

// ----- Compare -----
async function renderCompare() {
  if (S.files.length < 2) {
    const z = dropzone();
    setStage(h("div", { class: "compare-wait" }, h("p", { class: "muted" }, `First file: `, h("strong", {}, S.files[0].name), ". Now add the second PDF to compare."), z));
    return;
  }
  const { compareUI } = await import("./compare.js");
  const { main, side, label, action } = await compareUI(S.files, { busy, call, toast, render, done });
  workspace(main, side, label, action);
}

// ----- Server conversions -----
async function renderServer() {
  const { serverUI } = await import("./server.js");
  const { main, side, label, action } = await serverUI(cfg, S.files, { busy, setBusyMsg, done, toast });
  workspace(main, side, label, action);
}

// ---------- Boot ----------
const ICON_UPLOAD = '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>';

(async () => {
  setStage(dropzone());
  if (new URLSearchParams(location.search).has("continue")) {
    const item = await handoffTake();
    if (item) addFiles([new File([item.bytes], item.name, { type: "application/pdf" })]);
  }
})();
