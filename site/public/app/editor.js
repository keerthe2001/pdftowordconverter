// Visual page editor: Sign, Edit, Redact, Crop. Items are stored in PDF points,
// visual coordinates (origin top-left of the page as displayed), matching pdfcore.stamp/redact.
import { $, h, call, blobUrl, normaliseImage, toast } from "./lib.js";

function pageViewer(f, { onRender } = {}) {
  const st = { page: 0, scale: 1, w: 0, h: 0 };
  const img = h("img", { class: "pv-img", alt: "", draggable: "false" });
  const layer = h("div", { class: "pv-layer" });
  const stage = h("div", { class: "pv-stage" }, img, layer);
  const label = h("span", { class: "pv-label" });
  const prev = h("button", { class: "icon-btn", type: "button", "aria-label": "Previous page" }, "‹");
  const next = h("button", { class: "icon-btn", type: "button", "aria-label": "Next page" }, "›");
  const nav = h("div", { class: "pv-nav" }, prev, label, next);
  const wrap = h("div", { class: "pv" }, nav, h("div", { class: "pv-scroll" }, stage));
  const cache = new Map();
  async function show(p) {
    st.page = Math.max(0, Math.min(f.info.pages - 1, p));
    const size = f.info.sizes[st.page] || { w: 595, h: 842 };
    st.w = size.w; st.h = size.h;
    const avail = Math.min(900, (wrap.clientWidth || 800) - 8);
    st.scale = avail / st.w;
    stage.style.width = `${st.w * st.scale}px`; stage.style.height = `${st.h * st.scale}px`;
    label.textContent = `Page ${st.page + 1} / ${f.info.pages}`;
    prev.disabled = st.page === 0; next.disabled = st.page >= f.info.pages - 1;
    const dpi = Math.min(200, Math.round(72 * st.scale * (window.devicePixelRatio || 1)));
    const key = st.page + ":" + dpi;
    if (!cache.has(key)) cache.set(key, call("renderPage", { bytes: f.bytes, page: st.page, dpi, password: f.password }).then(r => blobUrl(r.png, "image/png")));
    img.src = await cache.get(key);
    onRender?.(st);
  }
  prev.onclick = () => show(st.page - 1);
  next.onclick = () => show(st.page + 1);
  window.addEventListener("resize", () => show(st.page));
  return { el: wrap, layer, stage, st, show };
}

// Movable / resizable box inside the page layer. item has x,y,w,h in points.
function makeBox(viewer, item, content, { onChange, onDelete, keepRatio = false, resizable = true } = {}) {
  const box = h("div", { class: "pv-item", tabindex: "0" }, content,
    resizable ? h("span", { class: "pv-handle", "aria-hidden": "true" }) : null,
    h("button", { class: "pv-del", type: "button", "aria-label": "Delete" }, "×"));
  const place = () => {
    const s = viewer.st.scale;
    Object.assign(box.style, { left: `${item.x * s}px`, top: `${item.y * s}px`, width: `${item.w * s}px`, height: `${item.h * s}px` });
  };
  place();
  let mode = null, sx, sy, ox, oy, ow, oh;
  box.addEventListener("pointerdown", e => {
    if (e.target.closest(".pv-del")) return;
    if (e.target.isContentEditable) return;
    mode = e.target.classList.contains("pv-handle") ? "resize" : "move";
    sx = e.clientX; sy = e.clientY; ox = item.x; oy = item.y; ow = item.w; oh = item.h;
    box.setPointerCapture(e.pointerId); e.preventDefault();
  });
  box.addEventListener("pointermove", e => {
    if (!mode) return;
    const s = viewer.st.scale, dx = (e.clientX - sx) / s, dy = (e.clientY - sy) / s;
    if (mode === "move") {
      item.x = Math.max(0, Math.min(viewer.st.w - item.w, ox + dx));
      item.y = Math.max(0, Math.min(viewer.st.h - item.h, oy + dy));
    } else {
      item.w = Math.max(10, ow + dx);
      item.h = keepRatio ? item.w * (oh / ow) : Math.max(8, oh + dy);
    }
    place(); onChange?.(item);
  });
  box.addEventListener("pointerup", () => { mode = null; });
  box.addEventListener("keydown", e => {
    const step = e.shiftKey ? 10 : 1;
    if (e.key === "Delete" || e.key === "Backspace") { if (!e.target.isContentEditable) { onDelete?.(); } return; }
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (d && !e.target.isContentEditable) { e.preventDefault(); item.x += d[0]; item.y += d[1]; place(); }
  });
  box.querySelector(".pv-del").addEventListener("click", () => onDelete?.());
  box.place = place;
  return box;
}

// ---------- Signature creator ----------
function signaturePad() {
  return new Promise(resolve => {
    const tabs = ["Draw", "Type", "Upload"];
    let tab = "Draw";
    const color = h("input", { type: "color", value: "#1a237e", class: "input input-color", "aria-label": "Ink colour" });
    // Draw
    const cv = h("canvas", { class: "sig-canvas", width: 900, height: 300 });
    const g = cv.getContext("2d");
    let drawing = false, last = null, inked = false;
    const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * (cv.width / r.width), (e.clientY - r.top) * (cv.height / r.height)]; };
    cv.addEventListener("pointerdown", e => { drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", e => {
      if (!drawing) return;
      const p = pos(e);
      g.strokeStyle = color.value; g.lineCap = "round"; g.lineJoin = "round";
      g.lineWidth = Math.max(2.5, Math.min(7, 6 * (e.pressure || 0.5) + 1.5));
      g.beginPath(); g.moveTo(...last); g.lineTo(...p); g.stroke(); last = p; inked = true;
    });
    cv.addEventListener("pointerup", () => (drawing = false));
    const clear = h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { g.clearRect(0, 0, cv.width, cv.height); inked = false; } }, "Clear");
    // Type
    const typed = h("input", { class: "input", placeholder: "Your full name", "aria-label": "Your name" });
    const fontSel = h("select", { class: "input" }, h("option", { value: "Dancing Script" }, "Script"), h("option", { value: "Great Vibes" }, "Elegant"), h("option", { value: "Inter" }, "Print"));
    const preview = h("div", { class: "sig-typed" });
    const updPrev = () => { preview.textContent = typed.value || "Your name"; preview.style.fontFamily = `'${fontSel.value}', cursive`; preview.style.color = color.value; };
    typed.oninput = fontSel.onchange = color.oninput = updPrev; updPrev();
    // Upload
    const up = h("input", { type: "file", accept: "image/*", class: "input" });
    const removeBg = h("label", { class: "check" }, h("input", { type: "checkbox", checked: true }), h("span", {}, "Remove white background"));
    const panes = { Draw: h("div", {}, cv, h("div", { class: "row" }, clear, h("span", { class: "muted" }, "Draw with mouse, finger or stylus"))), Type: h("div", {}, h("div", { class: "row" }, typed, fontSel), preview), Upload: h("div", {}, up, removeBg) };
    const body = h("div", { class: "sig-body" });
    const tabBar = h("div", { class: "seg" }, tabs.map(t => h("button", { type: "button", class: "seg-btn", onclick: () => { tab = t; $$tab(); } }, t)));
    const $$tab = () => { body.replaceChildren(panes[tab]); [...tabBar.children].forEach(b => b.classList.toggle("active", b.textContent === tab)); };
    $$tab();
    const dlg = h("dialog", { class: "dialog dialog-wide" },
      h("h3", {}, "Create your signature"), tabBar, body, h("label", { class: "lbl inline" }, "Colour ", color),
      h("div", { class: "dialog-actions" },
        h("button", { class: "btn btn-ghost", type: "button", onclick: () => { dlg.close(); } }, "Cancel"),
        h("button", { class: "btn btn-primary", type: "button", onclick: async () => {
          let out = null;
          if (tab === "Draw") { if (!inked) return toast("Draw your signature first.", "error"); out = trimCanvas(cv); }
          else if (tab === "Type") { if (!typed.value.trim()) return toast("Type your name first.", "error"); out = await typedSignature(typed.value.trim(), fontSel.value, color.value); }
          else { if (!up.files[0]) return toast("Choose an image.", "error"); out = await uploadedSignature(up.files[0], removeBg.querySelector("input").checked); }
          result = out; dlg.close();
        } }, "Use signature")));
    let result = null;
    document.body.append(dlg);
    dlg.addEventListener("close", () => { dlg.remove(); resolve(result); });
    dlg.showModal();
  });
}

function trimCanvas(cv) {
  const g = cv.getContext("2d");
  const { data, width, height } = g.getImageData(0, 0, cv.width, cv.height);
  let x0 = width, y0 = height, x1 = 0, y1 = 0;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) if (data[(y * width + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const pad = 8; x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(width, x1 + pad); y1 = Math.min(height, y1 + pad);
  const out = h("canvas", { width: x1 - x0, height: y1 - y0 });
  out.getContext("2d").drawImage(cv, x0, y0, x1 - x0, y1 - y0, 0, 0, x1 - x0, y1 - y0);
  return toPng(out);
}
async function typedSignature(text, font, color) {
  await document.fonts.load(`120px '${font}'`);
  const c = h("canvas", { width: 10, height: 10 }), g = c.getContext("2d");
  g.font = `120px '${font}'`;
  const w = Math.ceil(g.measureText(text).width) + 40;
  c.width = w; c.height = 200;
  g.font = `120px '${font}'`; g.fillStyle = color; g.textBaseline = "middle";
  g.fillText(text, 20, 100);
  return trimCanvas(c);
}
async function uploadedSignature(file, removeBg) {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const s = Math.min(1, 1200 / bmp.width);
  const c = h("canvas", { width: Math.round(bmp.width * s), height: Math.round(bmp.height * s) });
  const g = c.getContext("2d"); g.drawImage(bmp, 0, 0, c.width, c.height);
  if (removeBg) {
    const id = g.getImageData(0, 0, c.width, c.height), d = id.data;
    for (let i = 0; i < d.length; i += 4) { const y = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]; d[i + 3] = y > 215 ? 0 : y > 160 ? Math.round(255 * (215 - y) / 55) : 255; }
    g.putImageData(id, 0, 0);
  }
  return trimCanvas(c);
}
async function toPng(canvas) {
  const blob = await new Promise(r => canvas.toBlob(r, "image/png"));
  return { bytes: new Uint8Array(await blob.arrayBuffer()), url: URL.createObjectURL(blob), w: canvas.width, h: canvas.height };
}

// ---------- Main editor ----------
export async function editorUI(slug, f, name, { busy, done }) {
  const viewer = pageViewer(f, { onRender: () => drawItems() });
  const items = []; // {page, kind, x,y,w,h, ...}
  const drawItems = () => {
    viewer.layer.replaceChildren(...items.filter(it => it.page === viewer.st.page || it.allPages).map(it => {
      let content;
      if (it.kind === "image") content = h("img", { src: it.url, alt: "", draggable: "false" });
      else if (it.kind === "text") {
        content = h("div", { class: "pv-text", contenteditable: "true", spellcheck: "false", style: { fontSize: `${it.size * viewer.st.scale}px`, color: it.color, fontFamily: it.font === "times" ? "Times New Roman, serif" : it.font === "cour" ? "Courier New, monospace" : "Helvetica, Arial, sans-serif" } }, it.text);
        content.addEventListener("input", () => { it.text = content.innerText; });
      } else if (it.kind === "rect") content = h("div", { class: "pv-rect", style: { background: it.fill || "transparent", border: it.stroke ? `2px solid ${it.stroke}` : "none", opacity: it.opacity ?? 1 } });
      else if (it.kind === "redact") content = h("div", { class: "pv-redact" });
      else if (it.kind === "ink") {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", `0 0 ${it.w} ${it.h}`); svg.setAttribute("preserveAspectRatio", "none"); svg.style.width = "100%"; svg.style.height = "100%";
        for (const stroke of it.points) { const p = document.createElementNS(svg.namespaceURI, "polyline"); p.setAttribute("points", stroke.map(([x, y]) => `${x * it.w / it.ow},${y * it.h / it.oh}`).join(" ")); p.setAttribute("fill", "none"); p.setAttribute("stroke", it.color); p.setAttribute("stroke-width", it.lineWidth); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round"); p.setAttribute("vector-effect", "non-scaling-stroke"); svg.append(p); }
        content = svg;
      }
      return makeBox(viewer, it, content, { keepRatio: it.kind === "image", onDelete: () => { items.splice(items.indexOf(it), 1); drawItems(); } });
    }));
  };

  // Placement mode: click on page to drop the pending item.
  let pending = null;
  // Place new items immediately in the middle of the visible part of the page; the user then drags them.
  const setPending = (p) => {
    const r = viewer.stage.getBoundingClientRect(), s = viewer.st.scale;
    const vy0 = Math.max(r.top, 70), vy1 = Math.min(r.bottom, window.innerHeight);
    const cx = r.width / 2 / s, cy = ((vy0 + vy1) / 2 - r.top) / s;
    const x = Math.max(0, Math.min(viewer.st.w - p.w, cx - p.w / 2)), y = Math.max(0, Math.min(viewer.st.h - p.h, cy - p.h / 2));
    items.push({ ...p, page: viewer.st.page, x, y });
    drawItems();
    const el = viewer.layer.lastElementChild; el?.focus({ preventScroll: true });
    toast("Drag to position it. Use the corner handle to resize.");
  };
  // Freehand drawing & area-drag modes on the page.
  let drawMode = null; // "ink" | "redact-area" | "rect" | "whiteout"
  let cur = null;
  viewer.stage.addEventListener("pointerdown", e => {
    if (e.target.closest(".pv-item")) return;
    const r = viewer.stage.getBoundingClientRect(), s = viewer.st.scale;
    const x = (e.clientX - r.left) / s, y = (e.clientY - r.top) / s;
    if (pending) {
      const it = { ...pending, page: viewer.st.page, x: Math.max(0, x - pending.w / 2), y: Math.max(0, y - pending.h / 2) };
      items.push(it); setPending(null); drawItems(); return;
    }
    if (!drawMode) return;
    viewer.stage.setPointerCapture(e.pointerId);
    cur = { x0: x, y0: y, pts: [[x, y]] };
    const ghost = h("div", { class: "pv-ghost" + (drawMode === "ink" ? " ink" : "") });
    viewer.layer.append(ghost); cur.ghost = ghost;
    if (drawMode === "ink") { cur.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); Object.assign(cur.svg.style, { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }); cur.poly = document.createElementNS(cur.svg.namespaceURI, "polyline"); cur.poly.setAttribute("fill", "none"); cur.poly.setAttribute("stroke", inkColor.value); cur.poly.setAttribute("stroke-width", 2.5); cur.svg.append(cur.poly); viewer.layer.append(cur.svg); }
  });
  viewer.stage.addEventListener("pointermove", e => {
    if (!cur) return;
    const r = viewer.stage.getBoundingClientRect(), s = viewer.st.scale;
    const x = (e.clientX - r.left) / s, y = (e.clientY - r.top) / s;
    if (drawMode === "ink") { cur.pts.push([x, y]); cur.poly.setAttribute("points", cur.pts.map(([a, b]) => `${a * s},${b * s}`).join(" ")); return; }
    cur.x1 = x; cur.y1 = y;
    Object.assign(cur.ghost.style, { left: `${Math.min(cur.x0, x) * s}px`, top: `${Math.min(cur.y0, y) * s}px`, width: `${Math.abs(x - cur.x0) * s}px`, height: `${Math.abs(y - cur.y0) * s}px` });
  });
  viewer.stage.addEventListener("pointerup", () => {
    if (!cur) return;
    const c = cur; cur = null; c.ghost.remove(); c.svg?.remove();
    if (drawMode === "ink") {
      if (c.pts.length < 2) return;
      const xs = c.pts.map(p => p[0]), ys = c.pts.map(p => p[1]);
      const x = Math.min(...xs) - 2, y = Math.min(...ys) - 2, w = Math.max(...xs) - x + 4, hh = Math.max(...ys) - y + 4;
      items.push({ kind: "ink", page: viewer.st.page, x, y, w, h: hh, ow: w, oh: hh, points: [c.pts.map(([a, b]) => [a - x, b - y])], color: inkColor.value, lineWidth: 2.5 });
    } else {
      if (c.x1 == null) return;
      const x = Math.min(c.x0, c.x1), y = Math.min(c.y0, c.y1), w = Math.abs(c.x1 - c.x0), hh = Math.abs(c.y1 - c.y0);
      if (w < 4 || hh < 4) return;
      if (drawMode === "redact-area") items.push({ kind: "redact", page: viewer.st.page, x, y, w, h: hh });
      else if (drawMode === "whiteout") items.push({ kind: "rect", page: viewer.st.page, x, y, w, h: hh, fill: "#ffffff" });
      else if (drawMode === "highlight") items.push({ kind: "rect", page: viewer.st.page, x, y, w, h: hh, fill: "#ffeb3b", opacity: 0.4 });
      else if (drawMode === "rect") items.push({ kind: "rect", page: viewer.st.page, x, y, w, h: hh, stroke: inkColor.value });
    }
    drawItems();
  });

  const inkColor = h("input", { type: "color", value: "#1a237e", class: "input input-color", "aria-label": "Colour" });
  const toolBtn = (label, mode, hint) => {
    const b = h("button", { class: "btn btn-ghost btn-sm tool-toggle", type: "button", "aria-pressed": "false", onclick: () => {
      drawMode = drawMode === mode ? null : mode;
      document.querySelectorAll(".tool-toggle").forEach(x => x.setAttribute("aria-pressed", String(x === b && !!drawMode)));
      viewer.stage.classList.toggle("drawing", !!drawMode);
      if (drawMode && hint) toast(hint);
    } }, label);
    return b;
  };
  const addText = (text = "Text", size = 14) => setPending({ kind: "text", text, size, color: inkColor.value, font: fontSel.value, w: Math.max(60, text.length * size * 0.55), h: size * 1.5 }, "Click on the page where the text should go.");
  const fontSel = h("select", { class: "input" }, h("option", { value: "helv" }, "Helvetica"), h("option", { value: "times" }, "Times"), h("option", { value: "cour" }, "Courier"));

  let side, label, action;
  if (slug === "sign-pdf") {
    const sigs = h("div", { class: "sig-list" });
    const addSig = async () => {
      const s = await signaturePad();
      if (!s) return;
      const w = 160, hh = (s.h / s.w) * w;
      const btn = h("button", { class: "sig-thumb", type: "button", title: "Place this signature", onclick: () => setPending({ kind: "image", url: s.url, bytes: s.bytes, w, h: hh }, "Click on the page to place your signature.") }, h("img", { src: s.url, alt: "Signature" }));
      sigs.append(btn); btn.click();
    };
    side = h("div", { class: "opts" },
      h("button", { class: "btn btn-primary btn-block", type: "button", onclick: addSig }, "✍ Create signature"), sigs,
      h("div", { class: "row wrap" },
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => addText("Signed by: ", 11) }, "+ Name / text"),
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => addText(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), 11) }, "+ Date"),
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => addText("Initials", 12) }, "+ Initials")),
      h("label", { class: "lbl inline" }, "Text colour ", inkColor),
      h("p", { class: "muted" }, "Drag to move, use the corner handle to resize. This adds a visual electronic signature (like iLovePDF's free signature) — not a certificate-based digital signature."));
    label = "Sign PDF";
  } else if (slug === "edit-pdf") {
    const imgIn = h("input", { type: "file", accept: "image/*", hidden: true });
    imgIn.onchange = async () => { const file = imgIn.files[0]; if (!file) return; const n = await normaliseImage(file); const bmp = await createImageBitmap(new Blob([n.bytes], { type: n.type })); const w = 180, hh = (bmp.height / bmp.width) * w; setPending({ kind: "image", url: blobUrl(n.bytes, n.type), bytes: n.bytes, w, h: hh }, "Click on the page to place the image."); imgIn.value = ""; };
    const sizeSel = h("select", { class: "input" }, [10, 12, 14, 18, 24, 32].map(v => h("option", { value: v, selected: v === 14 ? true : null }, v + " pt")));
    side = h("div", { class: "opts" },
      h("div", { class: "tool-grid" },
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => addText("Type here", +sizeSel.value) }, "T  Add text"),
        h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => imgIn.click() }, "🖼 Add image"),
        toolBtn("✏ Draw", "ink", "Draw on the page. Click Draw again to stop."),
        toolBtn("▭ Rectangle", "rect", "Drag on the page to draw a rectangle."),
        toolBtn("🖍 Highlight", "highlight", "Drag over text to highlight it."),
        toolBtn("⬜ Whiteout", "whiteout", "Drag over content to cover it with white.")),
      imgIn, h("div", { class: "row" }, h("label", { class: "lbl" }, "Font", fontSel), h("label", { class: "lbl" }, "Size", sizeSel)),
      h("label", { class: "lbl inline" }, "Colour ", inkColor),
      h("p", { class: "muted" }, "Click text boxes to type. Whiteout only covers content visually — use Redact PDF to permanently remove sensitive text."));
    label = "Save changes";
  } else if (slug === "redact-pdf") {
    const terms = h("textarea", { class: "input", rows: 3, placeholder: "Words or numbers to remove everywhere, one per line (e.g. a phone number, Aadhaar number, name)" });
    const caseSens = h("label", { class: "check" }, h("input", { type: "checkbox" }), h("span", {}, "Match case"));
    const presets = h("div", { class: "row wrap" },
      h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => findPattern(/\b\d{4}\s?\d{4}\s?\d{4}\b/g, "Aadhaar-style numbers") }, "Find Aadhaar nos."),
      h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => findPattern(/\b[A-Z]{5}\d{4}[A-Z]\b/g, "PAN numbers") }, "Find PAN nos."),
      h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => findPattern(/(?:\+91[\s-]?)?\b[6-9]\d{9}\b/g, "mobile numbers") }, "Find mobile nos."),
      h("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => findPattern(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "email addresses") }, "Find emails"));
    async function findPattern(re, what) {
      const texts = await call("text", { bytes: f.bytes, password: f.password, opts: {} });
      const found = new Set();
      for (const t of texts) for (const m of t.matchAll(re)) found.add(m[0]);
      if (!found.size) return toast(`No ${what} found.`);
      terms.value = [...new Set([...terms.value.split("\n").filter(Boolean), ...found])].join("\n");
      toast(`Added ${found.size} ${what}.`);
    }
    side = h("div", { class: "opts" },
      h("label", { class: "lbl" }, "Search & redact", terms), caseSens, presets,
      toolBtn("▮ Draw redaction boxes", "redact-area", "Drag over any area (text, images, signatures) to mark it for redaction."),
      h("p", { class: "muted" }, "Redaction permanently deletes the text, image pixels and drawings under each box — it isn't just a black rectangle on top. Metadata is cleaned too."));
    label = "Redact PDF";
    action = async () => {
      const list = terms.value.split("\n").map(s => s.trim()).filter(Boolean);
      const areas = items.filter(i => i.kind === "redact").map(i => ({ page: i.page, x: i.x, y: i.y, w: i.w, h: i.h }));
      if (!list.length && !areas.length) { toast("Add search terms or draw boxes first.", "error"); return; }
      busy("Redacting permanently…");
      const r = await call("redact", { bytes: f.bytes, opts: { terms: list, areas, caseSensitive: caseSens.querySelector("input").checked }, password: f.password });
      done([{ name: `${name}-redacted.pdf`, bytes: r.bytes, mime: "application/pdf" }], { note: `${r.hits} area${r.hits === 1 ? "" : "s"} permanently removed.` });
    };
  }
  if (!action) action = async () => {
    const out = items.filter(i => i.kind !== "redact");
    if (!out.length) { toast(slug === "sign-pdf" ? "Place your signature on the page first." : "Add something to the page first.", "error"); return; }
    busy("Saving your PDF…");
    const payload = out.map(it => {
      if (it.kind === "image") return { page: it.page, x: it.x, y: it.y, w: it.w, h: it.h, image: { bytes: it.bytes } };
      if (it.kind === "text") return { page: it.page, x: it.x, y: it.y, text: it.text, size: it.size, color: it.color, font: it.font };
      if (it.kind === "rect") return { page: it.page, x: it.x, y: it.y, w: it.w, h: it.h, rect: true, fill: it.fill, stroke: it.stroke, opacity: it.opacity, lineWidth: 1.5 };
      if (it.kind === "ink") return { page: it.page, ink: it.points.map(s => s.map(([a, b]) => [it.x + a * it.w / it.ow, it.y + b * it.h / it.oh])), color: it.color, lineWidth: it.lineWidth };
    });
    const bytes = await call("stamp", { bytes: f.bytes, items: payload, password: f.password });
    done([{ name: `${name}-${slug === "sign-pdf" ? "signed" : "edited"}.pdf`, bytes, mime: "application/pdf" }]);
  };
  requestAnimationFrame(() => viewer.show(0));
  return { main: viewer.el, side, label, action };
}

// ---------- Crop ----------
export async function cropUI(f, name, { busy, done }) {
  const viewer = pageViewer(f, { onRender: () => place() });
  let m = { top: 0, right: 0, bottom: 0, left: 0 };
  const box = h("div", { class: "crop-box" }, ...["nw", "ne", "sw", "se"].map(c => h("span", { class: `crop-h ${c}`, "data-c": c })));
  viewer.layer.append(box);
  const place = () => {
    const s = viewer.st.scale;
    Object.assign(box.style, { left: `${m.left * s}px`, top: `${m.top * s}px`, right: `${m.right * s}px`, bottom: `${m.bottom * s}px` });
    if (!viewer.layer.contains(box)) viewer.layer.append(box);
  };
  let drag = null;
  box.addEventListener("pointerdown", e => { drag = { c: e.target.dataset.c || "move", x: e.clientX, y: e.clientY, m: { ...m } }; box.setPointerCapture(e.pointerId); e.preventDefault(); });
  box.addEventListener("pointermove", e => {
    if (!drag) return;
    const s = viewer.st.scale, dx = (e.clientX - drag.x) / s, dy = (e.clientY - drag.y) / s, o = drag.m, W = viewer.st.w, H = viewer.st.h;
    const cl = (v, max) => Math.max(0, Math.min(max, v));
    if (drag.c === "move") { const w = W - o.left - o.right, hh = H - o.top - o.bottom; m.left = cl(o.left + dx, W - w); m.right = W - w - m.left; m.top = cl(o.top + dy, H - hh); m.bottom = H - hh - m.top; }
    if (drag.c.includes("n")) m.top = cl(o.top + dy, H - o.bottom - 20);
    if (drag.c.includes("s")) m.bottom = cl(o.bottom - dy, H - o.top - 20);
    if (drag.c.includes("w")) m.left = cl(o.left + dx, W - o.right - 20);
    if (drag.c.includes("e")) m.right = cl(o.right - dx, W - o.left - 20);
    place();
  });
  box.addEventListener("pointerup", () => (drag = null));
  const scope = h("select", { class: "input" }, h("option", { value: "all" }, "All pages"), h("option", { value: "this" }, "Current page only"));
  const auto = h("button", { class: "btn btn-ghost btn-block", type: "button", onclick: async () => { m = await call("contentMargins", { bytes: f.bytes, page: viewer.st.page, password: f.password }); place(); } }, "✨ Auto-detect margins");
  requestAnimationFrame(async () => { await viewer.show(0); try { m = await call("contentMargins", { bytes: f.bytes, page: 0, password: f.password }); } catch {} place(); });
  return {
    main: viewer.el,
    side: h("div", { class: "opts" }, h("p", { class: "muted" }, "Drag the corners of the box to choose what to keep."), auto, h("label", { class: "lbl" }, "Apply to", scope)),
    label: "Crop PDF",
    action: async () => {
      busy("Cropping…");
      const out = await call("crop", { bytes: f.bytes, opts: { margins: m, pages: scope.value === "this" ? String(viewer.st.page + 1) : undefined }, password: f.password });
      done([{ name: `${name}-cropped.pdf`, bytes: out, mime: "application/pdf" }], { note: "Cropping is lossless: hidden areas are preserved in the file and can be restored by re-cropping." });
    },
  };
}
