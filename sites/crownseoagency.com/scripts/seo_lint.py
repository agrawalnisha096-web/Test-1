#!/usr/bin/env python3
"""
SEO + brand consistency gate for everything under content/.

Runs on every pull request (.github/workflows/seo-check.yml) and before every
publish. Rules come from site.yml and docs/SEO-STANDARDS.md, so whichever AI or
human writes the content, the same standards are enforced mechanically.

  ERROR   -> blocks the PR / publish
  WARN    -> shown in the PR, does not block (use --strict to block)

USAGE
  python scripts/seo_lint.py                 # lint all content
  python scripts/seo_lint.py --strict        # warnings also fail
  python scripts/seo_lint.py content/posts/x.md
"""

from __future__ import annotations

import argparse
import re
import sys
import os
from collections import defaultdict
from urllib.parse import urlparse

from content_lib import REPO_ROOT, gather, load_keyword_map, load_page, load_post, load_site

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
MD_HEADING_RE = re.compile(r"^(#{1,6})\s+\S", re.M)
HTML_HEADING_RE = re.compile(r"<h([1-6])[\s>]", re.I)
MD_LINK_RE = re.compile(r"(?<!!)\[[^\]]*\]\(([^)\s]+)")
HTML_LINK_RE = re.compile(r"<a\s[^>]*href=[\"']([^\"']+)", re.I)
MD_IMG_RE = re.compile(r"!\[([^\]]*)\]\(")
HTML_IMG_RE = re.compile(r"<img\b[^>]*>", re.I)
TAG_RE = re.compile(r"<[^>]+>")


class Report:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, where: str, msg: str) -> None:
        self.errors.append(f"ERROR  {where}: {msg}")

    def warn(self, where: str, msg: str) -> None:
        self.warnings.append(f"WARN   {where}: {msg}")


def plain_text(source: str) -> str:
    text = TAG_RE.sub(" ", source)
    text = re.sub(r"[#>*_`\[\]()!]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def headings(source: str) -> list[int]:
    found = [(m.start(), len(m.group(1))) for m in MD_HEADING_RE.finditer(source)]
    found += [(m.start(), int(m.group(1))) for m in HTML_HEADING_RE.finditer(source)]
    return [lvl for _, lvl in sorted(found)]


def links(source: str) -> list[str]:
    return MD_LINK_RE.findall(source) + HTML_LINK_RE.findall(source)


def check_length(r: Report, where: str, label: str, value: str, lim: dict) -> None:
    n = len(value)
    if n < lim["min"] or n > lim["max"]:
        r.error(where, f"{label} is {n} chars (allowed {lim['min']}-{lim['max']}): {value!r}")


def lint_item(item: dict, where: str, site: dict, kwmap: dict, r: Report) -> None:
    lim = site["limits"]
    kind = item["_kind"]
    slug = str(item["slug"])
    source = item.get("_source") or ""
    seo = item.get("seo") or {}
    pk = (item.get("primary_keyword") or "").strip().lower()
    base = urlparse(site["site"]["url"]).netloc.lower().removeprefix("www.")

    # --- Slug ---
    if not SLUG_RE.match(slug):
        r.error(where, f"slug {slug!r} must be lowercase words joined by single hyphens")
    if len(slug) > lim["slug_max"]:
        r.error(where, f"slug is {len(slug)} chars (max {lim['slug_max']})")

    # --- Title / description ---
    if not seo.get("title"):
        r.error(where, "missing seo.title")
    else:
        check_length(r, where, "seo.title", seo["title"], lim["seo_title"])
        suffix = site.get("title_suffix", "")
        if suffix and not seo["title"].endswith(suffix) and slug not in ("home", "front-page"):
            r.warn(where, f"seo.title should end with {suffix.strip()!r} for consistency")
    if not seo.get("description"):
        r.error(where, "missing seo.description")
    else:
        check_length(r, where, "seo.description", seo["description"], lim["seo_description"])

    # --- Primary keyword + keyword map (one keyword per URL) ---
    if not pk:
        r.error(where, "missing primary_keyword")
    else:
        mapped = kwmap.get(slug)
        if mapped is None:
            r.error(where, f"slug {slug!r} is not in content/keyword-map.csv — add a row first")
        elif mapped["primary_keyword"].strip().lower() != pk:
            r.error(where, f"primary_keyword {pk!r} != keyword map {mapped['primary_keyword']!r}")
        if seo.get("title") and pk not in seo["title"].lower():
            r.warn(where, f"primary keyword {pk!r} not in seo.title")
        if seo.get("description") and pk not in seo["description"].lower():
            r.warn(where, f"primary keyword {pk!r} not in seo.description")
        intro = " ".join(plain_text(source).lower().split()[:100])
        if source and pk not in intro:
            r.warn(where, f"primary keyword {pk!r} not in the first 100 words")

    # --- Body structure ---
    levels = headings(source)
    if 1 in levels:
        r.error(where, "body contains an H1 — the theme renders the title as the only H1; start at H2")
    prev = 1
    for lvl in levels:
        if lvl > prev + 1:
            r.error(where, f"heading level jumps from H{prev} to H{lvl}")
        prev = lvl

    words = len(plain_text(source).split())
    min_words = lim["post_min_words"] if kind == "post" else lim["page_min_words"]
    if source and words < min_words:
        r.warn(where, f"{words} words (target ≥ {min_words} for a {kind})")

    # --- Images ---
    for alt in MD_IMG_RE.findall(source):
        if not alt.strip():
            r.error(where, "markdown image with empty alt text")
    for tag in HTML_IMG_RE.findall(source):
        m = re.search(r"\balt=[\"']([^\"']*)", tag, re.I)
        if not m or not m.group(1).strip():
            r.error(where, f"<img> without alt text: {tag[:80]}")

    # --- Links ---
    internal = 0
    for href in links(source):
        u = urlparse(href)
        host = u.netloc.lower().removeprefix("www.")
        if href.startswith("/") or host == base:
            internal += 1
            if u.scheme == "http":
                r.error(where, f"internal link uses http: {href}")
            if host and u.netloc.lower().startswith("www.") != site["site"]["url"].startswith("https://www."):
                r.error(where, f"internal link host differs from canonical {site['site']['url']}: {href}")
            path = u.path or "/"
            if site["site"].get("trailing_slash") and not path.endswith("/") and "." not in path.rsplit("/", 1)[-1]:
                r.error(where, f"internal link missing trailing slash: {href}")
        elif re.search(r"(staging|localhost|\.local|hostingersite\.com)", host):
            r.error(where, f"link to a non-production host: {href}")
    min_links = lim["post_min_internal_links"] if kind == "post" else lim["page_min_internal_links"]
    if source and internal < min_links:
        r.warn(where, f"{internal} internal links (target ≥ {min_links})")

    # --- Brand voice ---
    haystack = " ".join(
        str(x) for x in (item.get("title"), seo.get("title"), seo.get("description"), source) if x
    )
    for variant in site.get("brand_variants_to_avoid", []):
        if re.search(rf"(?<!\w){re.escape(variant)}(?!\w)", haystack):
            r.error(where, f"brand written as {variant!r} — use {site['site']['name']!r}")
    for phrase in site.get("banned_phrases", []):
        if phrase.lower() in haystack.lower():
            r.error(where, f"banned phrase {phrase!r} (see site.yml)")

    # --- Placeholders must never go live ---
    if item.get("status", "draft") in ("publish", "future") and re.search(r"\bTODO\b|lorem ipsum", haystack, re.I):
        r.error(where, "contains TODO/placeholder text but status is publish/future")

    # --- FAQ (rendered as FAQ schema by most SEO plugins) ---
    for i, faq in enumerate((item.get("acf") or {}).get("faq_list") or [], 1):
        if not (faq.get("question") or "").strip() or not (faq.get("answer") or "").strip():
            r.error(where, f"faq_list item {i} has an empty question or answer")


def main() -> int:
    ap = argparse.ArgumentParser(description="SEO + brand lint for content/.")
    ap.add_argument("paths", nargs="*")
    ap.add_argument("--strict", action="store_true", help="Treat warnings as errors.")
    args = ap.parse_args()

    site = load_site()
    kwmap = load_keyword_map()
    r = Report()

    # Always load the FULL set for uniqueness checks, even if linting a subset.
    all_pages, all_posts = gather()
    targets = {os.path.abspath(p) for p in sum(gather(args.paths), [])} if args.paths else None

    items: list[tuple[str, dict]] = []
    for path in all_pages + all_posts:
        try:
            items.append((path, load_page(path) if path.endswith((".yml", ".yaml")) else load_post(path)))
        except Exception as e:  # noqa: BLE001
            r.error(os.path.relpath(path, REPO_ROOT), str(e))

    for path, item in items:
        if targets is None or os.path.abspath(path) in targets:
            lint_item(item, os.path.relpath(path, REPO_ROOT), site, kwmap, r)

    # --- Cross-file uniqueness: duplicates cause cannibalization / duplicate titles ---
    for field, getter in (
        ("slug", lambda i: i.get("slug")),
        ("seo.title", lambda i: (i.get("seo") or {}).get("title")),
        ("seo.description", lambda i: (i.get("seo") or {}).get("description")),
        ("primary_keyword", lambda i: (i.get("primary_keyword") or "").strip().lower()),
    ):
        seen: dict[str, list[str]] = defaultdict(list)
        for path, item in items:
            v = getter(item)
            if v:
                seen[str(v).lower()].append(path)
        for v, paths in seen.items():
            if len(paths) > 1:
                r.error(", ".join(os.path.relpath(p, REPO_ROOT) for p in paths), f"duplicate {field} {v!r}")

    for line in r.errors + r.warnings:
        print(line)
    print(f"\n{len(items)} file(s) checked: {len(r.errors)} error(s), {len(r.warnings)} warning(s).")
    if r.errors or (args.strict and r.warnings):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
