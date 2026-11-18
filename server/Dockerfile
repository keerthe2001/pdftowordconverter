# Conversion API for pdftowordconverter.in (Render free web service, 512 MB)
FROM python:3.12-slim-bookworm
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1 \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
      libreoffice-writer libreoffice-calc libreoffice-impress libreoffice-draw \
      fonts-crosextra-carlito fonts-crosextra-caladea fonts-liberation2 fonts-dejavu-core \
      fonts-noto-core fonts-noto-ui-core \
      ocrmypdf tesseract-ocr-eng tesseract-ocr-hin tesseract-ocr-tam \
      ca-certificates tini libatomic1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt && python -m playwright install --with-deps chromium && rm -rf /var/lib/apt/lists/*
COPY app.py .
RUN useradd -m -u 10001 app && chown -R app /app
USER app
ENV PORT=10000 MAX_MB=20 CONVERT_TIMEOUT=120 OCR_LANGS=eng+hin+tam
EXPOSE 10000
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT} --workers 1 --timeout-keep-alive 30"]
