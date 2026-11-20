"""Conversion API for pdftowordconverter.in — LibreOffice, pdf2docx, pdfplumber, Chromium.
Designed for a 512 MB free instance: one conversion at a time, strict size/time limits,
files kept only in a per-request temp dir that is always deleted."""
import asyncio, ipaddress, os, re, shutil, socket, subprocess, tempfile, time, uuid
from contextlib import asynccontextmanager
from urllib.parse import urlparse
from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from starlette.background import BackgroundTask

MAX_MB = int(os.getenv("MAX_MB", "20"))
TIMEOUT = int(os.getenv("CONVERT_TIMEOUT", "120"))
ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "https://pdftowordconverter.in,https://www.pdftowordconverter.in,http://localhost:4321,http://localhost:8788").split(",")]

STARTED = time.time()
# Keep-awake: Render's free plan sleeps after 15 minutes without inbound traffic, and waking takes
# about a minute. The service pings its own public address every KEEP_AWAKE_MINUTES so it stays up.
# Render sets RENDER_EXTERNAL_URL automatically. Set KEEP_AWAKE_MINUTES=0 to turn this off.
# Note: staying awake all month uses roughly 720-744 of the workspace's 750 free instance hours.
_ext = os.getenv("RENDER_EXTERNAL_URL", "").rstrip("/")
KEEP_AWAKE_URL = os.getenv("KEEP_AWAKE_URL") or (_ext + "/health" if _ext else "")
KEEP_AWAKE_MINUTES = float(os.getenv("KEEP_AWAKE_MINUTES", "10"))


def _ping(url):
    import urllib.request
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "keep-awake"}), timeout=30) as r:
        r.read()


async def keep_awake():
    while True:
        await asyncio.sleep(KEEP_AWAKE_MINUTES * 60)
        try:
            await asyncio.get_running_loop().run_in_executor(None, _ping, KEEP_AWAKE_URL)
        except Exception as e:
            print("keep-awake ping failed", repr(e)[:200], flush=True)


@asynccontextmanager
async def lifespan(_app):
    task = asyncio.create_task(keep_awake()) if KEEP_AWAKE_URL and KEEP_AWAKE_MINUTES > 0 else None
    yield
    if task:
        task.cancel()


app = FastAPI(title="pdftowordconverter-api", docs_url=None, redoc_url=None, lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=ORIGINS, allow_origin_regex=r"https://[a-z0-9-]+\.pdftowordconverter\.pages\.dev", allow_methods=["GET", "POST"], allow_headers=["*"], expose_headers=["Content-Disposition"], max_age=86400)
LOCK = asyncio.Semaphore(1)
RATE = {}  # ip -> [timestamps]

OFFICE_IN = {
    "word-to-pdf": {".doc", ".docx", ".odt", ".rtf", ".txt", ".docm", ".dot", ".dotx"},
    "powerpoint-to-pdf": {".ppt", ".pptx", ".odp", ".pps", ".ppsx", ".pptm"},
    "excel-to-pdf": {".xls", ".xlsx", ".ods", ".csv", ".xlsm"},
    "html-to-pdf": {".html", ".htm"},
}
PDF_OUT = {"pdf-to-word", "pdf-to-powerpoint", "pdf-to-excel"}
MIME = {"pdf": "application/pdf", "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation", "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}


def err(code, status=400):
    raise HTTPException(status_code=status, detail=code)


def rate_limit(ip):
    now = time.time()
    q = [t for t in RATE.get(ip, []) if now - t < 3600]
    if len(q) >= int(os.getenv("RATE_PER_HOUR", "60")):
        err("RATE_LIMITED", 429)
    q.append(now); RATE[ip] = q
    if len(RATE) > 5000:
        RATE.clear()


def safe_stem(name):
    stem = os.path.splitext(os.path.basename(name or "document"))[0]
    stem = re.sub(r"[^\w\- .()]+", "_", stem).strip(" ._") or "document"
    return stem[:80]


def run(cmd, cwd, timeout=TIMEOUT):
    env = dict(os.environ, HOME=cwd)  # isolated LibreOffice profile per job
    try:
        p = subprocess.run(cmd, cwd=cwd, env=env, capture_output=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        err("TIMEOUT", 504)
    return p


def soffice(src, outdir, fmt, infilter=None):
    cmd = ["soffice", "--headless", "--norestore", "--nolockcheck", "--nodefault", "--nofirststartwizard",
           f"-env:UserInstallation=file://{outdir}/lo-profile"]
    if infilter:
        cmd.append(f"--infilter={infilter}")
    cmd += ["--convert-to", fmt, "--outdir", outdir, src]
    p = run(cmd, outdir)
    out = os.path.join(outdir, os.path.splitext(os.path.basename(src))[0] + "." + fmt.split(":")[0])
    if not os.path.exists(out):
        err("CONVERT_FAILED", 422)
    return out


def pdf_is_encrypted(path):
    import fitz
    with fitz.open(path) as d:
        return d.needs_pass


def pdf_has_text(path, pages=3):
    import fitz
    with fitz.open(path) as d:
        return sum(len(d[i].get_text().strip()) for i in range(min(pages, len(d)))) > 50


def ocr_pdf(src, out, langs="eng"):
    p = run(["ocrmypdf", "--skip-text", "-j", "1", "--output-type", "pdf", "--optimize", "0", "-l", langs, src, out], os.path.dirname(src), timeout=TIMEOUT * 2)
    if p.returncode not in (0, 6) or not os.path.exists(out):
        return src
    return out


def pdf_to_docx(src, out):
    from pdf2docx import Converter
    cv = Converter(src)
    try:
        cv.convert(out, multi_processing=False)
    finally:
        cv.close()


def pdf_to_xlsx(src, out):
    import pdfplumber
    from openpyxl import Workbook
    from openpyxl.styles import Font
    num = re.compile(r"^-?[\d,]*\.?\d+%?$")
    def cell(v):
        if v is None:
            return None
        v = str(v).strip()
        t = v.replace(",", "").replace("₹", "").replace("Rs.", "").strip()
        if num.match(t) and not (len(t) > 1 and t.startswith("0") and "." not in t):
            try:
                return float(t[:-1]) / 100 if t.endswith("%") else (int(t) if re.fullmatch(r"-?\d+", t) else float(t))
            except ValueError:
                return v
        return v
    wb = Workbook(); wb.remove(wb.active)
    n = 0
    with pdfplumber.open(src) as pdf:
        text_rows = []
        for pi, page in enumerate(pdf.pages, 1):
            tables = page.extract_tables({"vertical_strategy": "lines", "horizontal_strategy": "lines"}) or \
                     page.extract_tables({"vertical_strategy": "text", "horizontal_strategy": "text"})
            for ti, tb in enumerate(tables, 1):
                rows = [r for r in tb if r and any(c not in (None, "") for c in r)]
                if len(rows) < 2:
                    continue
                n += 1
                ws = wb.create_sheet(f"Page {pi} Table {ti}"[:31])
                for r in rows:
                    ws.append([cell(c) for c in r])
                for c in ws[1]:
                    c.font = Font(bold=True)
                for col in ws.columns:
                    w = max((len(str(c.value)) for c in col if c.value is not None), default=8)
                    ws.column_dimensions[col[0].column_letter].width = min(60, max(8, w + 2))
            for line in (page.extract_text() or "").splitlines():
                text_rows.append([pi, line])
        if n == 0:
            ws = wb.create_sheet("Text")
            ws.append(["Page", "Text"])
            for r in text_rows:
                ws.append(r)
    wb.save(out)
    return n


def pdf_to_pptx(src, outdir):
    return soffice(src, outdir, "pptx", infilter="impress_pdf_import")


def blocked_host(host):
    try:
        infos = socket.getaddrinfo(host, None)
    except socket.gaierror:
        return True
    for info in infos:
        ip = ipaddress.ip_address(info[4][0])
        if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved or ip.is_multicast or ip.is_unspecified:
            return True
    return False


async def url_to_pdf(url, out):
    u = urlparse(url)
    if u.scheme not in ("http", "https") or not u.hostname or blocked_host(u.hostname):
        err("BLOCKED_URL")
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--single-process", "--no-zygote"])
        try:
            ctx = await b.new_context(viewport={"width": 1280, "height": 900}, accept_downloads=False, java_script_enabled=True,
                                      user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36 pdftowordconverter")
            async def guard(route):
                h = urlparse(route.request.url).hostname
                if h and blocked_host(h):
                    return await route.abort()
                await route.continue_()
            await ctx.route("**/*", guard)
            page = await ctx.new_page()
            try:
                await page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception:
                try:
                    await page.goto(url, wait_until="load", timeout=30000)
                except Exception:
                    err("FETCH_FAILED", 422)
            await page.emulate_media(media="screen")
            await page.pdf(path=out, format="A4", print_background=True, margin={"top": "12mm", "bottom": "12mm", "left": "10mm", "right": "10mm"})
        finally:
            await b.close()


@app.get("/health")
async def health():
    return {"ok": True, "uptime_s": int(time.time() - STARTED)}


@app.post("/convert/{tool}")
async def convert(tool: str, request: Request, file: UploadFile | None = File(None), url: str | None = Form(None), ocr: str | None = Form(None)):
    if tool not in OFFICE_IN and tool not in PDF_OUT:
        err("UNKNOWN_TOOL", 404)
    rate_limit(request.headers.get("cf-connecting-ip") or request.headers.get("x-forwarded-for", "").split(",")[0] or request.client.host)
    work = tempfile.mkdtemp(prefix="cv-")
    cleanup = BackgroundTask(shutil.rmtree, work, ignore_errors=True)
    try:
        if LOCK.locked() and len(getattr(LOCK, "_waiters", None) or []) >= 4:
            err("BUSY", 503)
        async with LOCK:
            if tool == "html-to-pdf" and url and not file:
                out = os.path.join(work, "page.pdf")
                await url_to_pdf(url.strip(), out)
                host = (urlparse(url).hostname or "page").replace("www.", "")
                return FileResponse(out, media_type=MIME["pdf"], filename=f"{safe_stem(host)}.pdf", background=cleanup)
            if not file:
                err("NO_FILE")
            ext = os.path.splitext(file.filename or "")[1].lower()
            allowed = OFFICE_IN.get(tool, {".pdf"})
            if ext not in allowed:
                err("UNSUPPORTED", 415)
            src = os.path.join(work, "in" + ext)
            size = 0
            with open(src, "wb") as f:
                while chunk := await file.read(1 << 20):
                    size += len(chunk)
                    if size > MAX_MB * 1024 * 1024:
                        err("TOO_LARGE", 413)
                    f.write(chunk)
            stem = safe_stem(file.filename)
            loop = asyncio.get_running_loop()
            if tool in OFFICE_IN:
                out = await loop.run_in_executor(None, soffice, src, work, "pdf:writer_pdf_Export" if tool == "word-to-pdf" else "pdf")
                return FileResponse(out, media_type=MIME["pdf"], filename=f"{stem}.pdf", background=cleanup)
            if pdf_is_encrypted(src):
                err("ENCRYPTED", 422)
            if tool == "pdf-to-word":
                if ocr == "true" or not pdf_has_text(src):
                    src = await loop.run_in_executor(None, ocr_pdf, src, os.path.join(work, "ocr.pdf"), os.getenv("OCR_LANGS", "eng+hin+tam"))
                out = os.path.join(work, "out.docx")
                await loop.run_in_executor(None, pdf_to_docx, src, out)
                return FileResponse(out, media_type=MIME["docx"], filename=f"{stem}.docx", background=cleanup)
            if tool == "pdf-to-excel":
                out = os.path.join(work, "out.xlsx")
                await loop.run_in_executor(None, pdf_to_xlsx, src, out)
                return FileResponse(out, media_type=MIME["xlsx"], filename=f"{stem}.xlsx", background=cleanup)
            if tool == "pdf-to-powerpoint":
                out = await loop.run_in_executor(None, pdf_to_pptx, src, work)
                return FileResponse(out, media_type=MIME["pptx"], filename=f"{stem}.pptx", background=cleanup)
    except HTTPException:
        shutil.rmtree(work, ignore_errors=True)
        raise
    except Exception as e:
        shutil.rmtree(work, ignore_errors=True)
        print("convert error", tool, repr(e)[:300], flush=True)
        raise HTTPException(status_code=500, detail="CONVERT_FAILED")
