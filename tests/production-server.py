"""Local test server for the artifact, clean-URL redirects, CSP and 404 behavior.

This models the documented Pages behavior; it is not a Cloudflare emulator.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parent.parent / "dist"
HEADERS = dict(line.strip().split(": ", 1) for line in (ROOT / "_headers").read_text().splitlines() if line.startswith("  "))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        for key, value in HEADERS.items():
            self.send_header(key, value)
        super().end_headers()

    def do_GET(self):
        url = urlsplit(self.path)
        if url.path in ("/index.html", "/acoustics.html", "/energy.html", "/vision.html"):
            target = "/" if url.path == "/index.html" else url.path[:-5]
            self.send_response(301)
            self.send_header("Location", urlunsplit(("", "", target, url.query, "")))
            self.end_headers()
            return
        if url.path in ("/acoustics", "/energy", "/vision"):
            self.path = url.path + ".html"
        super().do_GET()

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            body = (ROOT / "404.html").read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().send_error(code, message, explain)

ThreadingHTTPServer(("127.0.0.1", 4174), Handler).serve_forever()
