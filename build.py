#!/usr/bin/env python3
"""
Build the Arstech static site.

Reads every page in src/pages/, wraps it in src/layout.html with the shared
header and footer partials, and writes plain HTML to the repository root.
It also regenerates sitemap.xml from the pages it built.

Run from the project root:

    python3 build.py

The output is ordinary static HTML with no runtime dependency, so the
Dockerfile stays a plain COPY. Commit the generated files along with the
source: the deploy copies the built HTML, it does not build it.
"""

import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
PAGES = SRC / "pages"
SITE = "https://arstech.my.id"
WORDS_PER_MINUTE = 200
DEFAULT_OG_ALT = (
    "Arstech: we build digital systems that move businesses forward. "
    "A diagram of connected systems around the Arstech core."
)

TODAY = date.today().isoformat()


def parse_page(text, path):
    """Split a page into front matter and body."""
    if not text.startswith("---\n"):
        sys.exit(f"{path}: missing front matter block")
    try:
        end = text.index("\n---\n", 4)
    except ValueError:
        sys.exit(f"{path}: front matter is not closed with ---")

    meta, key = {}, None
    for line in text[4:end].split("\n"):
        # continuation of a block scalar, indented by two spaces
        if key is not None and line.startswith("  "):
            meta[key].append(line[2:])
            continue
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        k, v = k.strip(), v.strip()
        if v in ("|", ">"):
            meta[k] = []
            key = k
        else:
            meta[k] = v
            key = None

    for k, v in list(meta.items()):
        if isinstance(v, list):
            meta[k] = "\n".join(v).strip()

    for required in ("title", "description", "canonical", "jsonld"):
        if not meta.get(required):
            sys.exit(f"{path}: front matter is missing '{required}'")

    return meta, text[end + 5:].lstrip("\n")


def substitute(template, ctx):
    out = template
    for k, v in ctx.items():
        out = out.replace("{{" + k + "}}", v)
    leftovers = set(re.findall(r"\{\{(\w+)\}\}", out))
    if leftovers:
        sys.exit(f"unfilled placeholders: {sorted(leftovers)}")
    return out


def word_count(html):
    text = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    return len([w for w in re.split(r"\s+", text) if w.strip()])


def main():
    check = "--check" in sys.argv
    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    header = (SRC / "partials" / "header.html").read_text(encoding="utf-8")
    footer = (SRC / "partials" / "footer.html").read_text(encoding="utf-8")

    page_files = sorted(PAGES.rglob("*.html"))
    if not page_files:
        sys.exit("no pages found in src/pages")

    # Snapshot the committed output before touching it, so --check can report
    # whether the repository was in sync with src/.
    out_paths = [ROOT / f.relative_to(PAGES) for f in page_files] + [ROOT / "sitemap.xml"]
    before = {}
    if check:
        for p in out_paths:
            before[p] = p.read_text(encoding="utf-8") if p.exists() else None

    sitemap = []
    written = []

    for page_file in page_files:
        meta, body = parse_page(page_file.read_text(encoding="utf-8"), page_file)

        # A page with no body is always a mistake, never intentional. Without
        # this check an extraction bug ships a blank page that still builds
        # and still looks fine in the file listing.
        if len(body.strip()) < 50:
            sys.exit(
                f"{page_file}: body is empty or nearly empty "
                f"({len(body.strip())} chars after the front matter).\n"
                f"  The page source probably lost its content."
            )

        rel = page_file.relative_to(PAGES)
        depth = len(rel.parts) - 1
        base = "../" * depth

        # Fill in the reading time from the real word count, so it can never
        # be a guess that drifts from the text.
        if "{{reading_time}}" in body:
            minutes = max(1, round(word_count(body) / WORDS_PER_MINUTE))
            body = body.replace("{{reading_time}}", str(minutes))

        ctx = {
            "base": base,
            "lang": meta.get("lang", "en"),
            "title": meta["title"],
            "description": meta["description"],
            "canonical": meta["canonical"],
            "robots": meta.get("robots", "index, follow, max-image-preview:large"),
            "og_type": meta.get("og_type", "website"),
            "og_locale": meta.get("og_locale", "en_US"),
            "og_title": meta.get("og_title", meta["title"]),
            "og_description": meta.get("og_description", meta["description"]),
            # One shared card by default. A page can point at its own with an
            # og_image front-matter field once it has one.
            "og_image": meta.get("og_image", f"{SITE}/assets/og-card.png"),
            "og_image_alt": meta.get("og_image_alt", DEFAULT_OG_ALT),
            "jsonld": meta.get("jsonld", ""),
            "content": body,
            "header": substitute(header, {"base": base}),
            "footer": substitute(footer, {
                "base": base,
                "footer_href": meta.get("footer_href", base + "index.html"),
                "footer_label": meta.get("footer_label", "Home"),
            }),
        }

        html = substitute(layout, ctx)

        # One h1 per page, always. The spec requires it and a page without one
        # has no primary heading for a crawler to anchor on.
        h1s = len(re.findall(r"<h1[\s>]", html))
        if h1s != 1:
            sys.exit(f"{page_file}: built page has {h1s} <h1> elements, expected exactly 1")

        # Mark the current section in the nav, then drop the helper attributes
        # so the output stays clean.
        section = meta.get("section")
        if section:
            html, n = re.subn(
                r'<a class="nav-link"([^>]*\sdata-nav="' + re.escape(section) + r'")',
                r'<a class="nav-link is-active"\1 aria-current="page"',
                html,
            )
            if not n:
                sys.exit(f"{page_file}: section '{section}' matches no nav item")
        html = re.sub(r'\s+data-nav="[^"]*"', "", html)

        out_path = ROOT / rel
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(html, encoding="utf-8")
        written.append(rel.as_posix())

        if meta.get("sitemap", "true").lower() != "false":
            sitemap.append({
                "loc": meta["canonical"],
                "lastmod": meta.get("lastmod", TODAY),
                "changefreq": meta.get("changefreq", "monthly"),
                "priority": meta.get("priority", "0.5"),
            })

    sitemap.sort(key=lambda e: e["loc"])
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        "<!--",
        "  Generated by build.py. Do not edit by hand: edit src/pages/ and rebuild.",
        "  Only pages that exist are listed. A sitemap full of 404s trains crawlers",
        "  to distrust the file.",
        "-->",
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for e in sitemap:
        lines += [
            "  <url>",
            f"    <loc>{e['loc']}</loc>",
            f"    <lastmod>{e['lastmod']}</lastmod>",
            f"    <changefreq>{e['changefreq']}</changefreq>",
            f"    <priority>{e['priority']}</priority>",
            "  </url>",
        ]
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"built {len(written)} page(s):")
    for w in written:
        print(f"  {w}")
    print(f"sitemap.xml: {len(sitemap)} url(s)")

    if check:
        drifted = []
        for p in out_paths:
            now = p.read_text(encoding="utf-8") if p.exists() else None
            if before.get(p) != now:
                drifted.append(p.relative_to(ROOT).as_posix())
        if drifted:
            print("\ncommitted output was out of date with src/:")
            for d in drifted:
                print(f"  {d}")
            print("It has been regenerated. Commit the result.")
            sys.exit(1)
        print("check ok: committed output matches src/")


if __name__ == "__main__":
    main()
