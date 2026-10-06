"""Gera mídia derivada; usa Pillow e imageio-ffmpeg (ferramentas de preparação)."""
import argparse
import io
import json
from pathlib import Path
import subprocess
import urllib.request
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SOURCES = {
    "jbs.png": "https://www.jbs.com.br/wp-content/themes/JBS2025/assets/images/logo.png",
    "friboi.svg": "https://www.friboi.com.br/_next/static/media/assets/logo.53add00b7aab001f405fbce1a7a68626.svg",
    "frigol.png": "https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1098/2022/07/Logo_Frigol_sem_assinatura-1.png",
}

def logos():
    folder = ROOT / "assets/images/partners"
    for name, url in SOURCES.items():
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(request, timeout=45) as response:
            content = response.read()
        if name.endswith(".svg"):
            if b"<svg" not in content or b"<script" in content:
                raise ValueError("SVG inválido")
        else:
            Image.open(io.BytesIO(content)).verify()
        (folder / name).write_bytes(content)
        print(name, len(content), "bytes")

def images():
    report = []
    for source in (ROOT / "assets").rglob("*"):
        if source.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
            continue
        with Image.open(source) as raw:
            image = ImageOps.exif_transpose(raw).convert("RGBA" if "A" in raw.getbands() or "transparency" in raw.info else "RGB")
            limit = 480 if "partners" in source.parts else 1280
            image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
            target = Path(str(source) + ".webp")
            valid = False
            if target.exists():
                try:
                    with Image.open(target) as previous:
                        valid = previous.size == image.size and (image.mode != 'RGBA' or previous.mode == 'RGBA')
                        previous.verify()
                except (OSError, ValueError):
                    valid = False
            if not valid:
                image.save(target, "WEBP", quality=84, method=6)
            with Image.open(target) as checked:
                checked.verify()
            report.append({"source": source.relative_to(ROOT).as_posix(), "before": source.stat().st_size,
                           "after": target.stat().st_size, "width": image.width, "height": image.height})
    (ROOT / "DEV/TESTS/media-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print("Images:", len(report), "before:", sum(r["before"] for r in report), "after:", sum(r["after"] for r in report))

def videos():
    import imageio_ffmpeg
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    folder = ROOT / "assets/videos"
    for name, output, width, crf in [("hero-video.mp4", "hero-desktop.mp4", 1280, 28), ("9X16.mp4", "hero-mobile.mp4", 540, 29)]:
        source = folder / name
        target = folder / output
        subprocess.run([ffmpeg, "-y", "-i", str(source), "-an", "-vf", f"scale={width}:-2,fps=24",
                        "-c:v", "libx264", "-preset", "medium", "-crf", str(crf), "-pix_fmt", "yuv420p",
                        "-movflags", "+faststart", str(target)], check=True, capture_output=True)
        poster = folder / ("poster-mobile.webp" if width == 540 else "poster-desktop.webp")
        subprocess.run([ffmpeg, "-y", "-ss", "1", "-i", str(target), "-frames:v", "1", "-quality", "85", str(poster)],
                       check=True, capture_output=True)
        print(name, source.stat().st_size, "->", output, target.stat().st_size)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["logos", "images", "videos"])
    args = parser.parse_args()
    {"logos": logos, "images": images, "videos": videos}[args.mode]()
