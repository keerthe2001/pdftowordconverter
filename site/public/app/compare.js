// Compare two PDFs: page-by-page visual overlay diff + word-level text diff.
import { h, call, blobUrl } from "./lib.js";

function words(t) { return t.split(/\s+/).filter(Boolean); }
// Myers-lite LCS diff on words (bounded for very long pages).
function diffWords(a, b) {
  const A = words(a), B = words(b);
  if (A.length * B.length > 4e6) return [{ t: "chg", a: A.join(" "), b: B.join(" ") }];
  const n = A.length, m = B.length, dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = []; let i = 0, j = 0;
  const push = (t, w) => { const l = out[out.length - 1]; if (l && l.t === t) l.w.push(w); else out.push({ t, w: [w] }); };
  while (i < n && j < m) { if (A[i] === B[j]) { push("eq", A[i]); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) push("del", A[i++]); else push("ins", B[j++]); }
  while (i < n) push("del", A[i++]); while (j < m) push("ins", B[j++]);
  return out;
}

async function pixels(png) {
  const bmp = await createImageBitmap(new Blob([png], { type: "image/png" }));
  const c = new OffscreenCanvas(bmp.width, bmp.height), g = c.getContext("2d", { willReadFrequently: true });
  g.drawImage(bmp, 0, 0);
  return { data: g.getImageData(0, 0, c.width, c.height), w: c.width, h: c.height };
}

async function visualDiff(fa, fb, page, dpi = 90) {
  const [ra, rb] = await Promise.all([
    page < fa.info.pages ? call("renderPage", { bytes: fa.bytes, page, dpi, password: fa.password }) : null,
    page < fb.info.pages ? call("renderPage", { bytes: fb.bytes, page, dpi, password: fb.password }) : null,
  ]);
  if (!ra || !rb) return { a: ra && blobUrl(ra.png, "image/png"), b: rb && blobUrl(rb.png, "image/png"), diff: null, changed: 1 };
  const [pa, pb] = await Promise.all([pixels(ra.png), pixels(rb.png)]);
  const w = Math.max(pa.w, pb.w), hh = Math.max(pa.h, pb.h);
  const c = new OffscreenCanvas(w, hh), g = c.getContext("2d");
  const out = g.createImageData(w, hh), o = out.data;
  let changed = 0;
  for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) {
    const k = (y * w + x) * 4;
    const ia = x < pa.w && y < pa.h ? (y * pa.w + x) * 4 : -1, ib = x < pb.w && y < pb.h ? (y * pb.w + x) * 4 : -1;
    const la = ia < 0 ? 255 : (pa.data.data[ia] + pa.data.data[ia + 1] + pa.data.data[ia + 2]) / 3;
    const lb = ib < 0 ? 255 : (pb.data.data[ib] + pb.data.data[ib + 1] + pb.data.data[ib + 2]) / 3;
    const base = 255 - (255 - Math.min(la, lb)) * 0.35; // faint ghost of content
    if (Math.abs(la - lb) > 40) {
      changed++;
      if (la < lb) { o[k] = 220; o[k + 1] = 40; o[k + 2] = 40; } // only in A (removed) → red
      else { o[k] = 30; o[k + 1] = 140; o[k + 2] = 60; } // only in B (added) → green
    } else { o[k] = o[k + 1] = o[k + 2] = base; }
    o[k + 3] = 255;
  }
  g.putImageData(out, 0, 0);
  const blob = await c.convertToBlob({ type: "image/png" });
  return { a: blobUrl(ra.png, "image/png"), b: blobUrl(rb.png, "image/png"), diff: URL.createObjectURL(blob), diffBlob: blob, changed: changed / (w * hh) };
}

export async function compareUI(files, { busy, call: _c, done }) {
  const [fa, fb] = files;
  busy("Comparing documents…");
  const [ta, tb] = await Promise.all([call("text", { bytes: fa.bytes, password: fa.password, opts: {} }), call("text", { bytes: fb.bytes, password: fb.password, opts: {} })]);
  const pages = Math.max(fa.info.pages, fb.info.pages);
  const summary = [];
  for (let p = 0; p < pages; p++) {
    const d = diffWords(ta[p] || "", tb[p] || "");
    const ins = d.filter(x => x.t === "ins").reduce((s, x) => s + x.w.length, 0), del = d.filter(x => x.t === "del").reduce((s, x) => s + x.w.length, 0);
    summary.push({ p, d, ins, del });
  }
  const changedPages = summary.filter(s => s.ins || s.del).length;
  let view = "side";
  let cur = summary.find(s => s.ins || s.del)?.p ?? 0;
  const pageSel = h("select", { class: "input" }, summary.map(s => h("option", { value: s.p }, `Page ${s.p + 1}${s.ins || s.del ? `  (+${s.ins} / −${s.del} words)` : ""}`)));
  pageSel.value = cur;
  const viewSel = h("div", { class: "seg" }, ["side", "overlay", "text"].map(v => h("button", { type: "button", class: "seg-btn" + (v === view ? " active" : ""), onclick: e => { view = v; [...e.target.parentNode.children].forEach(b => b.classList.toggle("active", b === e.target)); draw(); } }, { side: "Side by side", overlay: "Overlay", text: "Text changes" }[v])));
  const body = h("div", { class: "cmp-body" });
  const draw = async () => {
    cur = +pageSel.value;
    body.replaceChildren(h("p", { class: "muted" }, "Loading page…"));
    if (view === "text") {
      const s = summary[cur];
      body.replaceChildren(h("div", { class: "cmp-text" }, s.d.length ? s.d.map(x => h(x.t === "eq" ? "span" : x.t === "ins" ? "ins" : "del", {}, x.w.join(" ") + " ")) : h("p", { class: "muted" }, "No text on this page.")));
      return;
    }
    const v = await visualDiff(fa, fb, cur);
    if (view === "side") body.replaceChildren(h("div", { class: "cmp-side" }, h("figure", {}, h("figcaption", {}, fa.name), v.a ? h("img", { src: v.a, alt: "" }) : h("p", {}, "No page")), h("figure", {}, h("figcaption", {}, fb.name), v.b ? h("img", { src: v.b, alt: "" }) : h("p", {}, "No page"))));
    else body.replaceChildren(h("figure", { class: "cmp-overlay" }, h("figcaption", {}, h("span", { class: "del" }, "Red = only in first"), " · ", h("span", { class: "ins" }, "Green = only in second")), v.diff ? h("img", { src: v.diff, alt: "Differences" }) : h("p", {}, "This page exists in only one document.")));
  };
  pageSel.onchange = draw;
  requestAnimationFrame(draw);
  const main = h("div", { class: "cmp" }, h("div", { class: "row wrap" }, pageSel, viewSel), body);
  const side = h("div", { class: "opts" },
    h("p", {}, h("strong", {}, changedPages ? `${changedPages} of ${pages} pages have text changes.` : "No text differences found.")),
    fa.info.pages !== fb.info.pages ? h("p", { class: "muted" }, `Page count differs: ${fa.info.pages} vs ${fb.info.pages}.`) : null,
    h("p", { class: "muted" }, "Overlay view also catches changes in images, signatures, stamps and layout."));
  return {
    main, side, label: "Download comparison report",
    action: async () => {
      busy("Building report…");
      const imgs = [];
      for (const s of summary) { const v = await visualDiff(fa, fb, s.p, 110); if (v.diffBlob) imgs.push({ bytes: new Uint8Array(await v.diffBlob.arrayBuffer()) }); }
      const out = await call("imagesToPdf", { images: imgs, opts: { pageSize: "fit" } });
      done([{ name: "comparison-report.pdf", bytes: out, mime: "application/pdf" }], { note: "Red marks content only in the first file; green marks content only in the second." });
    },
  };
}
