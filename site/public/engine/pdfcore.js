// Core PDF operations built on MuPDF (AGPL-3.0). Pure functions: bytes in, bytes out.
// Works in a Web Worker (browser) and in Node (tests). `mupdf` is injected.

export function createCore(mupdf) {
  const SAVE_OPTS = "garbage=compact,compress,compress-fonts,objstms";

  function open(bytes, password) {
    const doc = mupdf.Document.openDocument(bytes, "application/pdf");
    if (doc.needsPassword()) {
      if (!password || !doc.authenticatePassword(password)) {
        const e = new Error(password ? "WRONG_PASSWORD" : "NEEDS_PASSWORD");
        e.code = password ? "WRONG_PASSWORD" : "NEEDS_PASSWORD";
        throw e;
      }
    }
    const pdf = doc.asPDF();
    if (!pdf) throw new Error("NOT_A_PDF");
    return pdf;
  }

  function save(doc, extra = "") {
    const opts = extra ? `${SAVE_OPTS},${extra}` : SAVE_OPTS;
    return doc.saveToBuffer(opts).asUint8Array().slice();
  }

  function info(bytes, password) {
    const raw = mupdf.Document.openDocument(bytes, "application/pdf");
    const needsPassword = raw.needsPassword();
    if (needsPassword && !(password && raw.authenticatePassword(password))) {
      return { needsPassword: true, pages: 0 };
    }
    const doc = raw.asPDF();
    const n = doc.countPages();
    const sizes = [];
    for (let i = 0; i < Math.min(n, 2000); i++) {
      const p = doc.loadPage(i);
      const b = p.getBounds();
      const rot = p.getObject().getInheritable("Rotate");
      sizes.push({ w: b[2] - b[0], h: b[3] - b[1], rotate: rot.isNull() ? 0 : rot.asNumber() });
    }
    return {
      needsPassword: false,
      encrypted: needsPassword,
      pages: n,
      sizes,
      title: doc.getMetaData("info:Title") || "",
      repaired: doc.wasRepaired(),
    };
  }

  // Parse "1-3, 5, 8-" into zero-based sorted unique indexes.
  function parseRanges(spec, count) {
    const out = new Set();
    for (const part of String(spec).split(",").map(s => s.trim()).filter(Boolean)) {
      const m = part.match(/^(\d*)\s*-\s*(\d*)$/);
      if (m) {
        const a = m[1] ? parseInt(m[1], 10) : 1;
        const b = m[2] ? parseInt(m[2], 10) : count;
        for (let i = Math.max(1, a); i <= Math.min(count, b); i++) out.add(i - 1);
      } else if (/^\d+$/.test(part)) {
        const v = parseInt(part, 10);
        if (v >= 1 && v <= count) out.add(v - 1);
      } else {
        throw new Error(`BAD_RANGE:${part}`);
      }
    }
    return [...out].sort((a, b) => a - b);
  }

  function copyPages(src, indexes, dst = new mupdf.PDFDocument()) {
    const map = dst.newGraftMap();
    for (const i of indexes) map.graftPage(-1, src, i);
    return dst;
  }

  function merge(files) {
    const dst = new mupdf.PDFDocument();
    for (const f of files) {
      const src = open(f.bytes, f.password);
      const n = src.countPages();
      const idx = f.pages ? parseRanges(f.pages, n) : [...Array(n).keys()];
      copyPages(src, idx, dst);
    }
    return save(dst);
  }

  function extract(bytes, spec, password) {
    const src = open(bytes, password);
    const idx = parseRanges(spec, src.countPages());
    if (!idx.length) throw new Error("NO_PAGES_SELECTED");
    return save(copyPages(src, idx));
  }

  function remove(bytes, spec, password) {
    const src = open(bytes, password);
    const n = src.countPages();
    const del = new Set(parseRanges(spec, n));
    if (del.size >= n) throw new Error("CANNOT_REMOVE_ALL");
    const keep = [...Array(n).keys()].filter(i => !del.has(i));
    src.rearrangePages(keep);
    return save(src);
  }

  // mode: {type:"ranges", ranges:["1-3","4-6"]} | {type:"every", n:2} | {type:"each"}
  function split(bytes, mode, password) {
    const src = open(bytes, password);
    const n = src.countPages();
    let groups = [];
    if (mode.type === "ranges") groups = mode.ranges.map(r => parseRanges(r, n)).filter(g => g.length);
    else if (mode.type === "every") for (let i = 0; i < n; i += mode.n) groups.push([...Array(Math.min(mode.n, n - i)).keys()].map(k => k + i));
    else for (let i = 0; i < n; i++) groups.push([i]);
    return groups.map(g => ({
      name: g.length === 1 ? `page-${g[0] + 1}.pdf` : `pages-${g[0] + 1}-${g[g.length - 1] + 1}.pdf`,
      bytes: save(copyPages(src, g)),
    }));
  }

  // order: array of {src: pageIndex, rotate: 0|90|180|270} or null entries (blank page)
  function organize(bytes, order, password) {
    const src = open(bytes, password);
    const dst = new mupdf.PDFDocument();
    const map = dst.newGraftMap();
    for (const item of order) {
      if (item.blank) {
        const [w, h] = item.size || [595, 842];
        dst.insertPage(-1, dst.addPage([0, 0, w, h], 0, {}, ""));
      } else {
        map.graftPage(-1, src, item.src);
      }
      if (item.rotate) {
        const p = dst.loadPage(dst.countPages() - 1).getObject();
        const cur = p.getInheritable("Rotate");
        p.put("Rotate", (((cur.isNull() ? 0 : cur.asNumber()) + item.rotate) % 360 + 360) % 360);
      }
    }
    return save(dst);
  }

  function rotate(bytes, angle, spec, password) {
    const doc = open(bytes, password);
    const n = doc.countPages();
    const idx = spec ? parseRanges(spec, n) : [...Array(n).keys()];
    for (const i of idx) {
      const p = doc.loadPage(i).getObject();
      const cur = p.getInheritable("Rotate");
      p.put("Rotate", (((cur.isNull() ? 0 : cur.asNumber()) + angle) % 360 + 360) % 360);
    }
    return save(doc);
  }

  function render(bytes, pageIndex, dpi = 96, password, { alpha = false, gray = false } = {}) {
    const doc = open(bytes, password);
    const page = doc.loadPage(pageIndex);
    const s = dpi / 72;
    const pix = page.toPixmap([s, 0, 0, s, 0, 0], gray ? mupdf.ColorSpace.DeviceGray : mupdf.ColorSpace.DeviceRGB, alpha, true);
    return pix;
  }

  function toImages(bytes, { dpi = 150, format = "jpg", quality = 92, pages, password } = {}) {
    const doc = open(bytes, password);
    const n = doc.countPages();
    const idx = pages ? parseRanges(pages, n) : [...Array(n).keys()];
    const out = [];
    for (const i of idx) {
      const page = doc.loadPage(i);
      const s = dpi / 72;
      const pix = page.toPixmap([s, 0, 0, s, 0, 0], mupdf.ColorSpace.DeviceRGB, format === "png", true);
      const data = (format === "png" ? pix.asPNG() : pix.asJPEG(quality)).slice();
      out.push({ name: `page-${i + 1}.${format}`, bytes: data });
      pix.destroy?.(); page.destroy?.();
    }
    return out;
  }

  function thumbnails(bytes, { width = 160, password, max = 500 } = {}) {
    const doc = open(bytes, password);
    const n = Math.min(doc.countPages(), max);
    const out = [];
    for (let i = 0; i < n; i++) {
      const page = doc.loadPage(i);
      const b = page.getBounds();
      const s = width / Math.max(1, b[2] - b[0]);
      const pix = page.toPixmap([s, 0, 0, s, 0, 0], mupdf.ColorSpace.DeviceRGB, false, true);
      out.push(pix.asJPEG(75).slice());
      pix.destroy?.(); page.destroy?.();
    }
    return out;
  }

  // ---- page content stamping (text/image overlays) ----
  function pdfStr(s) {
    return "(" + String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)") + ")";
  }

  function addContent(doc, pageObj, content, resources) {
    // Wrap existing content in q/Q so our overlay isn't affected by leftover CTM changes.
    const res = pageObj.getInheritable("Resources");
    let resDict;
    if (res.isNull()) { resDict = doc.newDictionary(); pageObj.put("Resources", resDict); }
    else if (!pageObj.get("Resources").isNull()) resDict = pageObj.get("Resources");
    else { resDict = doc.newDictionary(); res.forEach((v, k) => resDict.put(k, v)); pageObj.put("Resources", resDict); }
    for (const [cat, entries] of Object.entries(resources)) {
      let d = resDict.get(cat);
      if (d.isNull()) { d = doc.newDictionary(); resDict.put(cat, d); }
      for (const [name, obj] of Object.entries(entries)) d.put(name, obj);
    }
    const before = doc.addStream("q\n", {});
    const after = doc.addStream("\nQ\n" + content, {});
    const contents = pageObj.get("Contents");
    const arr = doc.newArray();
    arr.push(before);
    if (contents.isArray()) contents.forEach(v => arr.push(v));
    else if (!contents.isNull()) arr.push(contents);
    arr.push(after);
    pageObj.put("Contents", arr);
  }

  // Page geometry helper: visible box in default user space, accounting for /Rotate.
  function pageGeom(pageObj) {
    const box = pageObj.getInheritable("CropBox").isNull() ? pageObj.getInheritable("MediaBox") : pageObj.getInheritable("CropBox");
    const r = [0, 1, 2, 3].map(i => box.get(i).asNumber());
    const x0 = Math.min(r[0], r[2]), y0 = Math.min(r[1], r[3]), x1 = Math.max(r[0], r[2]), y1 = Math.max(r[1], r[3]);
    const rotObj = pageObj.getInheritable("Rotate");
    const rot = ((rotObj.isNull() ? 0 : rotObj.asNumber()) % 360 + 360) % 360;
    return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0, rot };
  }

  // Matrix that maps "visual" coords (origin bottom-left of the page as the user sees it) to user space.
  function visualMatrix(g) {
    switch (g.rot) {
      case 90: return [0, 1, -1, 0, g.x1, g.y0];
      case 180: return [-1, 0, 0, -1, g.x1, g.y1];
      case 270: return [0, -1, 1, 0, g.x0, g.y1];
      default: return [1, 0, 0, 1, g.x0, g.y0];
    }
  }
  const visualSize = g => (g.rot === 90 || g.rot === 270 ? { W: g.h, H: g.w } : { W: g.w, H: g.h });

  const STD_FONTS = { helv: "Helvetica", helvb: "Helvetica-Bold", times: "Times-Roman", timesb: "Times-Bold", cour: "Courier" };
  const fontCache = new WeakMap();
  function stdFont(doc, key) {
    let m = fontCache.get(doc);
    if (!m) { m = {}; fontCache.set(doc, m); }
    if (!m[key]) m[key] = { obj: doc.addSimpleFont(new mupdf.Font(STD_FONTS[key]), "Latin"), font: new mupdf.Font(STD_FONTS[key]) };
    return m[key];
  }
  function textWidth(font, text, size) {
    let w = 0;
    for (const ch of text) {
      const gid = font.encodeCharacter(ch.codePointAt(0));
      w += font.advanceGlyph(gid, 0);
    }
    return w * size;
  }
  function hexColor(c) {
    const h = String(c || "#000000").replace("#", "");
    return [0, 2, 4].map(i => (parseInt(h.substr(i, 2), 16) / 255).toFixed(3)).join(" ");
  }
  function winAnsi(s) {
    // Keep to Latin-1 for standard fonts; replace unsupported chars.
    return [...String(s)].map(c => (c.codePointAt(0) < 256 ? c : "?")).join("");
  }

  // opts: {position:"bottom-center"|..., format:"{n}"|"Page {n} of {total}", start:1, size:11, color, margin:28, pages:"1-", font:"helv", skipFirst:false}
  function pageNumbers(bytes, opts = {}, password) {
    const doc = open(bytes, password);
    const n = doc.countPages();
    const idx = opts.pages ? parseRanges(opts.pages, n) : [...Array(n).keys()];
    const size = opts.size || 11, margin = opts.margin ?? 28, start = opts.start ?? 1;
    const fmt = opts.format || "{n}";
    const f = stdFont(doc, opts.font || "helv");
    let k = 0;
    for (const i of idx) {
      const label = winAnsi(fmt.replace("{n}", String(start + k)).replace("{total}", String(idx.length + start - 1)));
      k++;
      const pobj = doc.loadPage(i).getObject();
      const g = pageGeom(pobj);
      const { W, H } = visualSize(g);
      const tw = textWidth(f.font, label, size);
      const [v, hz] = (opts.position || "bottom-center").split("-");
      const x = hz === "left" ? margin : hz === "right" ? W - margin - tw : (W - tw) / 2;
      const y = v === "top" ? H - margin - size : margin;
      const m = visualMatrix(g);
      const content = `q ${m.join(" ")} cm BT /PNFont ${size} Tf ${hexColor(opts.color)} rg ${x.toFixed(2)} ${y.toFixed(2)} Td ${pdfStr(label)} Tj ET Q\n`;
      addContent(doc, pobj, content, { Font: { PNFont: f.obj } });
    }
    return save(doc);
  }

  // opts: {text, size:48, color:"#cc0000", opacity:0.25, angle:45, position:"center"|"mosaic", font:"helvb", pages, image:{bytes}, imageScale:0.5, layer:"over"|"under"}
  function watermark(bytes, opts = {}, password) {
    const doc = open(bytes, password);
    const n = doc.countPages();
    const idx = opts.pages ? parseRanges(opts.pages, n) : [...Array(n).keys()];
    const gs = doc.addObject({ Type: "ExtGState", ca: opts.opacity ?? 0.3, CA: opts.opacity ?? 0.3 });
    let img = null, imgW = 0, imgH = 0;
    if (opts.image) {
      const im = new mupdf.Image(opts.image.bytes);
      img = doc.addImage(im); imgW = im.getWidth(); imgH = im.getHeight();
    }
    const f = opts.text ? stdFont(doc, opts.font || "helvb") : null;
    const text = opts.text ? winAnsi(opts.text) : "";
    const size = opts.size || 48;
    const a = ((opts.angle ?? 45) * Math.PI) / 180;
    const cos = Math.cos(a).toFixed(5), sin = Math.sin(a).toFixed(5);
    for (const i of idx) {
      const pobj = doc.loadPage(i).getObject();
      const g = pageGeom(pobj);
      const { W, H } = visualSize(g);
      const m = visualMatrix(g);
      let draw = "";
      const centers = [];
      if (opts.position === "mosaic") {
        const step = Math.max(W, H) / 3;
        for (let y = step / 2; y < H; y += step) for (let x = step / 2; x < W; x += step) centers.push([x, y]);
      } else {
        const pos = opts.position || "center";
        const map = { "top-left": [0.2, 0.85], "top-center": [0.5, 0.85], "top-right": [0.8, 0.85], "center-left": [0.2, 0.5], center: [0.5, 0.5], "center-right": [0.8, 0.5], "bottom-left": [0.2, 0.15], "bottom-center": [0.5, 0.15], "bottom-right": [0.8, 0.15] };
        const [fx, fy] = map[pos] || map.center;
        centers.push([W * fx, H * fy]);
      }
      for (const [cx, cy] of centers) {
        if (img) {
          const sc = (opts.imageScale || 0.4) * Math.min(W / imgW, H / imgH);
          const w = imgW * sc, h = imgH * sc;
          draw += `q 1 0 0 1 ${cx.toFixed(2)} ${cy.toFixed(2)} cm ${cos} ${sin} ${-sin} ${cos} 0 0 cm ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${(-w / 2).toFixed(2)} ${(-h / 2).toFixed(2)} cm /WMImg Do Q\n`;
        } else {
          const tw = textWidth(f.font, text, size);
          draw += `q 1 0 0 1 ${cx.toFixed(2)} ${cy.toFixed(2)} cm ${cos} ${sin} ${-sin} ${cos} 0 0 cm BT /WMFont ${size} Tf ${hexColor(opts.color || "#cc0000")} rg ${(-tw / 2).toFixed(2)} ${(-size / 3).toFixed(2)} Td ${pdfStr(text)} Tj ET Q\n`;
        }
      }
      const content = `q /WMGS gs ${m.join(" ")} cm\n${draw}Q\n`;
      const res = { ExtGState: { WMGS: gs } };
      if (img) res.XObject = { WMImg: img }; else res.Font = { WMFont: f.obj };
      if (opts.layer === "under") prependContent(doc, pobj, content, res);
      else addContent(doc, pobj, content, res);
    }
    return save(doc);
  }

  function prependContent(doc, pageObj, content, resources) {
    addContent(doc, pageObj, "", resources);
    const arr = pageObj.get("Contents");
    const first = doc.addStream(content, {});
    const nu = doc.newArray();
    nu.push(first);
    arr.forEach(v => nu.push(v));
    pageObj.put("Contents", nu);
  }

  // Place images (signatures, stamps) at visual coordinates (points, origin top-left as seen on screen).
  // items: [{page, x, y, w, h, image:{bytes}} | {page, x, y, size, text, color, font}]
  function stamp(bytes, items, password) {
    const doc = open(bytes, password);
    const imgCache = new Map();
    let k = 0;
    const byPage = new Map();
    for (const it of items) { if (!byPage.has(it.page)) byPage.set(it.page, []); byPage.get(it.page).push(it); }
    for (const [pi, list] of byPage) {
      const pobj = doc.loadPage(pi).getObject();
      const g = pageGeom(pobj);
      const { H } = visualSize(g);
      const m = visualMatrix(g);
      let draw = `q ${m.join(" ")} cm\n`;
      const res = { XObject: {}, Font: {}, ExtGState: {} };
      for (const it of list) {
        const name = `St${k++}`;
        if (it.image) {
          let obj = imgCache.get(it.image.bytes);
          if (!obj) { obj = doc.addImage(new mupdf.Image(it.image.bytes)); imgCache.set(it.image.bytes, obj); }
          res.XObject[name] = obj;
          const yb = H - it.y - it.h;
          draw += `q ${it.w.toFixed(2)} 0 0 ${it.h.toFixed(2)} ${it.x.toFixed(2)} ${yb.toFixed(2)} cm /${name} Do Q\n`;
        } else if (it.rect) {
          const yb = H - it.y - it.h;
          const gsn = `G${name}`;
          res.ExtGState[gsn] = doc.addObject({ Type: "ExtGState", ca: it.opacity ?? 1, CA: it.opacity ?? 1 });
          const fill = it.fill ? `${hexColor(it.fill)} rg` : "";
          const stroke = it.stroke ? `${hexColor(it.stroke)} RG ${it.lineWidth || 1} w` : "";
          const op = it.fill && it.stroke ? "B" : it.fill ? "f" : "S";
          draw += `q /${gsn} gs ${fill} ${stroke} ${it.x.toFixed(2)} ${yb.toFixed(2)} ${it.w.toFixed(2)} ${it.h.toFixed(2)} re ${op} Q\n`;
        } else if (it.ink) {
          const gsn = `G${name}`;
          res.ExtGState[gsn] = doc.addObject({ Type: "ExtGState", ca: it.opacity ?? 1, CA: it.opacity ?? 1 });
          let path = "";
          for (const stroke of it.ink) {
            stroke.forEach(([x, y], j) => { path += `${x.toFixed(2)} ${(H - y).toFixed(2)} ${j ? "l" : "m"} `; });
          }
          draw += `q /${gsn} gs ${hexColor(it.color)} RG ${it.lineWidth || 2} w 1 J 1 j ${path} S Q\n`;
        } else if (it.text != null) {
          const f = stdFont(doc, it.font || "helv");
          res.Font[name] = f.obj;
          const size = it.size || 14;
          const lines = String(it.text).split("\n");
          lines.forEach((line, li) => {
            const yb = H - it.y - size * (li + 1) * 1.2 + size * 0.2;
            draw += `BT /${name} ${size} Tf ${hexColor(it.color)} rg ${it.x.toFixed(2)} ${yb.toFixed(2)} Td ${pdfStr(winAnsi(line))} Tj ET\n`;
          });
        }
      }
      draw += "Q\n";
      for (const kk of Object.keys(res)) if (!Object.keys(res[kk]).length) delete res[kk];
      addContent(doc, pobj, draw, res);
    }
    return save(doc);
  }

  // crop: margins in points relative to visual page {top,right,bottom,left}, or absolute visual rect
  function crop(bytes, { margins, pages }, password) {
    const doc = open(bytes, password);
    const n = doc.countPages();
    const idx = pages ? parseRanges(pages, n) : [...Array(n).keys()];
    for (const i of idx) {
      const page = doc.loadPage(i);
      const pobj = page.getObject();
      const g = pageGeom(pobj);
      // Convert visual margins to user-space margins according to rotation.
      let { top: t, right: r, bottom: b, left: l } = margins;
      let ux0 = l, uy0 = b, ux1 = r, uy1 = t;
      if (g.rot === 90) { ux0 = b; ux1 = t; uy0 = r; uy1 = l; }
      if (g.rot === 180) { ux0 = r; ux1 = l; uy0 = t; uy1 = b; }
      if (g.rot === 270) { ux0 = t; ux1 = b; uy0 = l; uy1 = r; }
      const rect = [g.x0 + ux0, g.y0 + uy0, g.x1 - ux1, g.y1 - uy1];
      if (rect[2] - rect[0] < 10 || rect[3] - rect[1] < 10) throw new Error("CROP_TOO_LARGE");
      const arr = doc.newArray(); rect.forEach(v => arr.push(v));
      pobj.put("CropBox", arr);
      pobj.put("TrimBox", arr);
    }
    return save(doc);
  }

  // Auto-detect content bounds (visual margins) on first page(s) for "auto crop" suggestion.
  function contentMargins(bytes, pageIndex = 0, password) {
    const doc = open(bytes, password);
    const page = doc.loadPage(pageIndex);
    const pix = page.toPixmap([0.5, 0, 0, 0.5, 0, 0], mupdf.ColorSpace.DeviceGray, false, true);
    const w = pix.getWidth(), h = pix.getHeight(), px = pix.getPixels(), stride = pix.getStride();
    let minX = w, minY = h, maxX = -1, maxY = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (px[y * stride + x] < 245) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    if (maxX < 0) return { top: 0, right: 0, bottom: 0, left: 0 };
    const pad = 6;
    return { left: Math.max(0, minX * 2 - pad), top: Math.max(0, minY * 2 - pad), right: Math.max(0, (w - maxX) * 2 - pad), bottom: Math.max(0, (h - maxY) * 2 - pad) };
  }

  // perms: {print, modify, copy, annotate, forms, assemble}
  function protect(bytes, { userPassword, ownerPassword, perms = {} }, password) {
    const doc = open(bytes, password);
    // PDF permission bits (ISO 32000 Table 22).
    const bits = { print: 4, modify: 8, copy: 16, annotate: 32, forms: 256, accessibility: 512, assemble: 1024, printHigh: 2048 };
    const all = { print: true, modify: true, copy: true, annotate: true, forms: true, accessibility: true, assemble: true, printHigh: true, ...perms };
    let P = 0xfffff0c0;
    for (const [k, b] of Object.entries(bits)) if (all[k]) P |= b;
    P = P | 0;
    if (/[,=]/.test(userPassword || "") || /[,=]/.test(ownerPassword || "")) {
      const e = new Error("PASSWORD_CHARS"); e.code = "PASSWORD_CHARS"; throw e;
    }
    const opts = `encrypt=aes-256,user-password=${userPassword || ""},owner-password=${ownerPassword || userPassword || ""},permissions=${P}`;
    return doc.saveToBuffer(`garbage=compact,compress,${opts}`).asUint8Array().slice();
  }

  function unlock(bytes, password) {
    const doc = open(bytes, password);
    return save(doc, "encrypt=none");
  }

  function repair(bytes, password) {
    const doc = open(bytes, password);
    const repaired = doc.wasRepaired();
    // Touch every page so broken page trees/contents are rebuilt.
    const n = doc.countPages();
    let bad = 0;
    for (let i = 0; i < n; i++) { try { doc.loadPage(i).toStructuredText("preserve-whitespace"); } catch { bad++; } }
    return { bytes: save(doc, "clean"), pages: n, repaired, badPages: bad };
  }

  // Lossless optimisation (structure, streams, unused objects, font subsetting).
  function optimizeLossless(bytes, password) {
    const doc = open(bytes, password);
    try { doc.subsetFonts(); } catch {}
    return doc.saveToBuffer("garbage=deduplicate,compress,compress-fonts,compress-images,clean,sanitize,objstms").asUint8Array().slice();
  }

  // terms: array of strings; areas: [{page, x, y, w, h}] visual coords
  function redact(bytes, { terms = [], areas = [], caseSensitive = false, color = "#000000" }, password) {
    const doc = open(bytes, password);
    const n = doc.countPages();
    let hits = 0;
    for (let i = 0; i < n; i++) {
      const page = doc.loadPage(i);
      let any = false;
      for (const t of terms.filter(Boolean)) {
        const quads = page.search(t, caseSensitive ? 0 : undefined) || [];
        for (const hit of quads) {
          for (const q of hit) {
            const xs = [q[0], q[2], q[4], q[6]], ys = [q[1], q[3], q[5], q[7]];
            const a = page.createAnnotation("Redact");
            a.setRect([Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]);
            a.update();
            hits++; any = true;
          }
        }
      }
      for (const ar of areas.filter(a => a.page === i)) {
        const a = page.createAnnotation("Redact");
        a.setRect([ar.x, ar.y, ar.x + ar.w, ar.y + ar.h]);
        a.update();
        hits++; any = true;
      }
      if (any) page.applyRedactions(true, mupdf.PDFPage.REDACT_IMAGE_PIXELS, mupdf.PDFPage.REDACT_LINE_ART_REMOVE_IF_COVERED, mupdf.PDFPage.REDACT_TEXT_REMOVE);
    }
    // Remove metadata that might leak redacted info.
    try { doc.setMetaData("info:Title", ""); doc.setMetaData("info:Subject", ""); doc.setMetaData("info:Keywords", ""); } catch {}
    return { bytes: save(doc), hits };
  }

  function text(bytes, password, { pages } = {}) {
    const doc = open(bytes, password);
    const n = doc.countPages();
    const idx = pages ? parseRanges(pages, n) : [...Array(n).keys()];
    return idx.map(i => doc.loadPage(i).toStructuredText("preserve-whitespace").asText());
  }

  // Images (jpg/png/webp-decoded-to-png) into a PDF. opts: {pageSize:"fit"|"a4"|"letter", orientation:"auto"|"portrait"|"landscape", margin:0..}
  function imagesToPdf(images, opts = {}) {
    const doc = new mupdf.PDFDocument();
    const sizes = { a4: [595.28, 841.89], letter: [612, 792], legal: [612, 1008] };
    const margin = opts.margin || 0;
    for (const im of images) {
      const image = new mupdf.Image(im.bytes);
      const iw = image.getWidth(), ih = image.getHeight();
      const xres = image.getXResolution() || 96, yres = image.getYResolution() || 96;
      let pw, ph;
      if (!opts.pageSize || opts.pageSize === "fit") {
        // Natural size at image DPI (clamped to sensible 72-600 dpi range).
        const dx = Math.min(600, Math.max(72, xres)), dy = Math.min(600, Math.max(72, yres));
        pw = (iw * 72) / dx + margin * 2; ph = (ih * 72) / dy + margin * 2;
      } else {
        [pw, ph] = sizes[opts.pageSize] || sizes.a4;
        const landscape = opts.orientation === "landscape" || (opts.orientation !== "portrait" && iw > ih);
        if (landscape) [pw, ph] = [ph, pw];
      }
      const aw = pw - margin * 2, ah = ph - margin * 2;
      const s = Math.min(aw / iw, ah / ih);
      const w = iw * s, h = ih * s;
      const x = (pw - w) / 2, y = (ph - h) / 2;
      const ref = doc.addImage(image);
      const res = doc.newDictionary(); const xo = doc.newDictionary(); xo.put("I0", ref); res.put("XObject", xo);
      const page = doc.addPage([0, 0, pw, ph], 0, res, `q ${w.toFixed(3)} 0 0 ${h.toFixed(3)} ${x.toFixed(3)} ${y.toFixed(3)} cm /I0 Do Q`);
      doc.insertPage(-1, page);
    }
    return save(doc);
  }

  // Overlay an OCR text layer produced by Tesseract's PDF renderer (one single-page PDF per source page)
  // onto the original page as an invisible-text Form XObject (sandwich, like OCRmyPDF).
  function applyOcrLayers(bytes, layers, password) {
    const doc = open(bytes, password);
    for (const { page: pi, pdf } of layers) {
      const tdoc = new mupdf.PDFDocument(pdf);
      const tpage = tdoc.loadPage(0).getObject();
      const tbox = tpage.getInheritable("MediaBox");
      const tw = tbox.get(2).asNumber() - tbox.get(0).asNumber();
      const th = tbox.get(3).asNumber() - tbox.get(1).asNumber();
      // Collect content and strip image painting operators so only the invisible text remains.
      const contents = tpage.get("Contents");
      let src = "";
      const read = o => { src += new TextDecoder("latin1").decode(o.readStream().asUint8Array()) + "\n"; };
      if (contents.isArray()) contents.forEach(read); else read(contents);
      src = src.replace(/\/Im\w*\s+Do/g, "");
      const tres = tdoc.loadPage(0).getObject().getInheritable("Resources");
      const fonts = tres.get("Font");
      const formRes = doc.newDictionary();
      if (!fonts.isNull()) formRes.put("Font", doc.graftObject(fonts));
      const form = doc.addStream(src, { Type: "XObject", Subtype: "Form", BBox: [0, 0, tw, th], Resources: formRes });
      const pobj = doc.loadPage(pi).getObject();
      const g = pageGeom(pobj);
      const { W, H } = visualSize(g);
      const m = visualMatrix(g);
      const sx = W / tw, sy = H / th;
      addContent(doc, pobj, `q ${m.join(" ")} cm ${sx.toFixed(6)} 0 0 ${sy.toFixed(6)} 0 0 cm /OCRLayer Do Q\n`, { XObject: { OCRLayer: form } });
    }
    return save(doc);
  }

  // ---- Image recompression (keeps text & vector content untouched) ----
  // opts: {dpi: effective max dpi assuming an image spans at most a full page, quality: 1-100, gray: bool}
  function rewriteImages(doc, { dpi = 150, quality = 75, gray = false } = {}) {
    const n = doc.countObjects();
    const smasks = new Set();
    const imgs = [];
    for (let i = 1; i < n; i++) {
      let o;
      try { o = doc.newIndirect(i); if (!o.isStream()) continue; } catch { continue; }
      const st = o.get("Subtype");
      if (st.isNull() || st.asName() !== "Image") continue;
      const sm = o.get("SMask");
      if (sm.isIndirect()) smasks.add(sm.asIndirect());
      imgs.push(i);
    }
    // Longest page side in inches (cap images relative to that).
    let maxIn = 11.7;
    try {
      const b = doc.loadPage(0).getBounds();
      maxIn = Math.max(b[2] - b[0], b[3] - b[1]) / 72;
    } catch {}
    const maxPx = Math.max(64, Math.round(maxIn * dpi));
    let saved = 0, changed = 0;
    for (const i of imgs) {
      if (smasks.has(i)) continue;
      const ref = doc.newIndirect(i);
      const o = ref;
      const bpc = o.get("BitsPerComponent");
      if (!o.get("ImageMask").isNull() && o.get("ImageMask").asBoolean()) continue;
      if (!bpc.isNull() && bpc.asNumber() === 1) continue;
      const filt = o.get("Filter");
      const fname = filt.isArray() ? (filt.length ? filt.get(0).asName() : "") : filt.isNull() ? "" : filt.asName();
      if (fname === "JBIG2Decode" || fname === "CCITTFaxDecode") continue;
      let image;
      try { image = doc.loadImage(ref); } catch { continue; }
      const w = image.getWidth(), h = image.getHeight();
      if (w * h < 64 * 64) continue;
      const oldLen = o.readRawStream().asUint8Array().length;
      let pix, tmp;
      try { pix = image.toPixmap(); } catch { image.destroy?.(); continue; }
      const cs = pix.getColorSpace();
      const isGray = gray || (cs && cs.isGray && cs.isGray());
      const target = isGray ? mupdf.ColorSpace.DeviceGray : mupdf.ColorSpace.DeviceRGB;
      if (pix.getAlpha() || !cs || cs.getName() !== target.getName()) {
        try { tmp = pix.convertToColorSpace(target, false); pix.destroy?.(); pix = tmp; } catch { pix.destroy?.(); image.destroy?.(); continue; }
      }
      const s = Math.min(1, maxPx / Math.max(w, h));
      const nw = Math.max(1, Math.round(w * s)), nh = Math.max(1, Math.round(h * s));
      if (s < 1) { tmp = pix.warp([[0, 0], [w, 0], [w, h], [0, h]], nw, nh); pix.destroy?.(); pix = tmp; }
      const jpg = pix.asJPEG(quality).slice();
      pix.destroy?.(); image.destroy?.();
      if (jpg.length >= oldLen * 0.95 && s >= 1 && !gray) continue;
      o.writeRawStream(jpg);
      o.put("Filter", doc.newName("DCTDecode"));
      o.put("Width", nw); o.put("Height", nh);
      o.put("BitsPerComponent", 8);
      o.put("ColorSpace", doc.newName(isGray ? "DeviceGray" : "DeviceRGB"));
      o.delete("DecodeParms"); o.delete("Decode");
      saved += oldLen - jpg.length; changed++;
    }
    return { changed, saved };
  }

  function compressImages(bytes, opts, password) {
    const doc = open(bytes, password);
    try {
      rewriteImages(doc, opts);
      try { doc.subsetFonts(); } catch {}
      return doc.saveToBuffer("garbage=deduplicate,compress,compress-fonts,objstms").asUint8Array().slice();
    } finally { doc.destroy?.(); }
  }

  // Fit a PDF under targetBytes while keeping it as readable as possible.
  // Image bytes scale roughly with dpi^2, so we measure a few colour/quality configurations at a
  // reference dpi, predict the highest dpi each can afford, pick the most readable, then verify.
  function compressToTarget(bytes, targetBytes, { gray = false, password, maxDpi = 300, allowGray = true } = {}) {
    const attempts = [];
    const run = (dpi, quality, g) => {
      const out = compressImages(bytes, { dpi: Math.round(dpi), quality, gray: g }, password);
      attempts.push({ dpi: Math.round(dpi), quality, gray: g, size: out.length });
      return out;
    };
    // 1) Best case: high quality already fits.
    let out = run(maxDpi, 85, gray);
    if (out.length <= targetBytes) return { bytes: out, met: true, dpi: maxDpi, quality: 85, gray, attempts };
    // 2) Non-image overhead (fonts, vectors, structure).
    const overhead = run(8, 30, true).length;
    if (overhead > targetBytes) {
      return { bytes: run(8, 30, true), met: false, dpi: 8, quality: 30, gray: true, attempts, reason: "NON_IMAGE_CONTENT_TOO_LARGE" };
    }
    const configs = [
      { g: false, q: 80, w: 1.0 }, { g: false, q: 60, w: 0.93 },
      { g: true, q: 75, w: 0.96 }, { g: true, q: 52, w: 0.88 }, { g: true, q: 34, w: 0.76 },
    ].filter(c => (gray ? c.g : allowGray || !c.g));
    const REF = 100;
    let pick = null;
    for (const c of configs) {
      const sz = run(REF, c.q, c.g).length;
      const imgBytes = Math.max(1, sz - overhead);
      const budget = (targetBytes - overhead) * 0.97;
      const dpi = Math.min(maxDpi, REF * Math.sqrt(budget / imgBytes));
      const score = Math.min(dpi, 150) * c.w; // beyond ~150dpi extra resolution adds little for screen/print reading
      if (!pick || score > pick.score) pick = { ...c, dpi, score };
    }
    // 3) Verify and correct.
    let dpi = Math.max(20, pick.dpi);
    let best = null;
    for (let k = 0; k < 6; k++) {
      out = run(dpi, pick.q, pick.g);
      if (out.length <= targetBytes) {
        best = { bytes: out, dpi: Math.round(dpi), quality: pick.q, gray: pick.g };
        if (out.length > targetBytes * 0.9 || dpi >= maxDpi) break;
        dpi = Math.min(maxDpi, dpi * Math.sqrt((targetBytes - overhead) * 0.97 / Math.max(1, out.length - overhead)));
      } else {
        if (best) break;
        dpi = dpi * Math.sqrt((targetBytes - overhead) * 0.95 / Math.max(1, out.length - overhead));
        if (dpi < 12) break;
      }
    }
    if (!best) return { bytes: out, met: false, dpi: Math.round(dpi), quality: pick.q, gray: pick.g, attempts };
    return { ...best, met: true, attempts };
  }

  function setMeta(bytes, meta, password) {
    const doc = open(bytes, password);
    for (const [k, v] of Object.entries(meta)) doc.setMetaData(`info:${k}`, v);
    return save(doc);
  }

  return {
    info, parseRanges, merge, extract, remove, split, organize, rotate, render, toImages, thumbnails,
    pageNumbers, watermark, stamp, crop, contentMargins, protect, unlock, repair, optimizeLossless,
    redact, text, imagesToPdf, applyOcrLayers, setMeta, compressImages, compressToTarget,
  };
}
