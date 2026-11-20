// Client for the conversion server (LibreOffice / pdf2docx / Chromium) hosted on Render.
import { h, fmtBytes, baseName, toast, sleep } from "./lib.js";

const API = (document.querySelector('meta[name="converter-api"]')?.content || "").replace(/\/$/, "");

async function wake(setBusyMsg) {
  const t0 = Date.now();
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(API + "/health", { cache: "no-store" });
      if (r.ok) return true;
    } catch {}
    const s = Math.round((Date.now() - t0) / 1000);
    setBusyMsg("Starting the converter…", `Free server waking up — usually 30–60 seconds (${s}s). Next conversions will be instant.`);
    await sleep(2500);
  }
  return false;
}

function upload(url, form, onProgress) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open("POST", url);
    x.responseType = "arraybuffer";
    x.upload.onprogress = e => e.lengthComputable && onProgress(e.loaded / e.total);
    x.onload = () => {
      if (x.status >= 200 && x.status < 300) resolve({ bytes: new Uint8Array(x.response), type: x.getResponseHeader("content-type"), name: (x.getResponseHeader("content-disposition") || "").match(/filename="?([^";]+)/)?.[1] });
      else { let msg = "CONVERT_FAILED"; try { msg = JSON.parse(new TextDecoder().decode(x.response)).detail || msg; } catch {} reject(Object.assign(new Error(msg), { code: msg, status: x.status })); }
    };
    x.onerror = () => reject(Object.assign(new Error("NETWORK"), { code: "NETWORK" }));
    x.send(form);
  });
}

export async function serverUI(cfg, files, { busy, setBusyMsg, done }) {
  const f = files[0];
  // Wake the server in the background as soon as a file is chosen.
  fetch(API + "/health", { cache: "no-store" }).catch(() => {});
  const extra = [];
  let opts = {};
  if (cfg.slug === "pdf-to-word") {
    const ocr = h("label", { class: "check" }, h("input", { type: "checkbox" }), h("span", {}, "Scanned PDF? Run OCR first (slower)"));
    extra.push(ocr); opts.ocr = () => ocr.querySelector("input").checked;
  }
  if (cfg.slug === "html-to-pdf") {
    // handled via URL field in side panel
  }
  const main = h("div", { class: "single-file" }, h("div", { class: "thumb file-ico" }, (f.name.split(".").pop() || "").toUpperCase()), h("div", {}, h("div", { class: "fc-name" }, f.name), h("div", { class: "fc-meta" }, fmtBytes(f.size))));
  return {
    main,
    side: h("div", { class: "opts" }, ...extra, h("p", { class: "muted" }, cfg.serverNote || "Converted with LibreOffice on our server. Files are deleted as soon as the conversion finishes.")),
    label: cfg.actionLabel || "Convert",
    action: async () => {
      if (!API) { toast("Converter not configured.", "error"); return; }
      busy("Connecting to converter…");
      const up = await wake(setBusyMsg);
      if (!up) { toast("The converter didn't respond. Please try again in a minute.", "error"); throw Object.assign(new Error("CANCELLED"), { code: "CANCELLED" }); }
      const form = new FormData();
      form.append("file", f.file, f.name);
      for (const [k, v] of Object.entries(opts)) form.append(k, String(v()));
      setBusyMsg("Uploading…", "");
      let r;
      try {
        r = await upload(`${API}/convert/${cfg.slug}`, form, p => setBusyMsg(p < 1 ? `Uploading… ${Math.round(p * 100)}%` : "Converting…", p < 1 ? "" : "High-fidelity conversion in progress"));
      } catch (e) {
        const msg = { NETWORK: "Network error — check your connection.", TOO_LARGE: `File too large for the free converter (max ${cfg.maxMB} MB).`, UNSUPPORTED: "This file type isn't supported for this conversion.", TIMEOUT: "The conversion took too long. Try a smaller file.", BUSY: "The converter is busy — please retry in a few seconds." }[e.code] || "Conversion failed. The file may be damaged or password-protected.";
        toast(msg, "error"); throw Object.assign(new Error("CANCELLED"), { code: "CANCELLED" });
      }
      const outName = r.name || `${baseName(f.name)}.${cfg.outExt}`;
      done([{ name: outName, bytes: r.bytes, mime: r.type || "application/octet-stream" }]);
    },
  };
}

export async function convertUrl(cfg, url, { busy, setBusyMsg, done }) {
  busy("Connecting to converter…");
  if (!(await wake(setBusyMsg))) { toast("The converter didn't respond. Please try again in a minute.", "error"); throw Object.assign(new Error("CANCELLED"), { code: "CANCELLED" }); }
  setBusyMsg("Rendering the web page…", url);
  const form = new FormData();
  form.append("url", url);
  let r;
  try { r = await upload(`${API}/convert/html-to-pdf`, form, () => {}); }
  catch (e) { toast(e.code === "BLOCKED_URL" ? "That address can't be converted." : e.code === "FETCH_FAILED" ? "We couldn't open that page. Check the address." : "Conversion failed. Please try again.", "error"); throw Object.assign(new Error("CANCELLED"), { code: "CANCELLED" }); }
  const host = new URL(url).hostname.replace(/^www\./, "");
  done([{ name: r.name || `${host}.pdf`, bytes: r.bytes, mime: "application/pdf" }]);
}
