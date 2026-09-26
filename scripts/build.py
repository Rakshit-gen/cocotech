"""Create an allowlisted static-site artifact without installing any packages."""
from pathlib import Path
import shutil
import zipfile

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "dist"
FILES = [
    "index.html", "acoustics.html", "energy.html", "vision.html", "404.html",
    "styles.css", "app.js", "materials.js", "specimen-player.js",
    "interactions.js", "product-pages.js", "research.js", "vision.js",
    "process-motion.js", "magnifier.js",
    "_headers", "_redirects", "robots.txt",
    "assets/favicon.svg", "assets/manrope.ttf", "assets/manrope-bold.ttf",
    "assets/plex-mono.ttf", "assets/manrope-LICENSE.txt", "assets/plex-mono-LICENSE.txt",
]
# Refuse unknown files rather than silently publishing them or deleting user files.
if OUTPUT.exists():
    unknown = {str(p.relative_to(OUTPUT)) for p in OUTPUT.rglob("*") if p.is_file()} - set(FILES)
    if unknown:
        raise SystemExit(f"Unexpected files in dist: {sorted(unknown)}. Review them before building.")
for relative in FILES:
    source, target = ROOT / relative, OUTPUT / relative
    if not source.is_file():
        raise SystemExit(f"Missing required asset: {relative}")
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)
archive = ROOT / "cocotech-deploy.zip"
with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as bundle:
    for relative in FILES:
        bundle.write(OUTPUT / relative, relative)
print(f"Built {len(FILES)} files in {OUTPUT}")
print(f"Upload bundle: {archive} ({archive.stat().st_size:,} bytes)")
