"""Shared loaders for content files, used by publish_content.py and seo_lint.py."""

from __future__ import annotations

import csv
import glob
import os

import frontmatter
import markdown as md
import yaml

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_DIR = os.path.join(REPO_ROOT, "content", "pages")
POSTS_DIR = os.path.join(REPO_ROOT, "content", "posts")
KEYWORD_MAP = os.path.join(REPO_ROOT, "content", "keyword-map.csv")
SITE_CONFIG = os.path.join(REPO_ROOT, "site.yml")


def load_site() -> dict:
    with open(SITE_CONFIG, "r", encoding="utf-8") as fh:
        return yaml.safe_load(fh) or {}


def is_template(path: str) -> bool:
    """Files starting with `_` are templates/drafts-of-drafts and never published."""
    return os.path.basename(path).startswith("_")


def gather(paths: list[str] | None = None) -> tuple[list[str], list[str]]:
    """Split explicit paths (or a full scan) into page files and post files."""
    if paths:
        pages = [p for p in paths if p.endswith((".yml", ".yaml"))]
        posts = [p for p in paths if p.endswith(".md")]
    else:
        pages = sorted(glob.glob(os.path.join(PAGES_DIR, "*.y*ml")))
        posts = sorted(glob.glob(os.path.join(POSTS_DIR, "*.md")))
    return [p for p in pages if not is_template(p)], [p for p in posts if not is_template(p)]


def load_page(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as fh:
        data = yaml.safe_load(fh) or {}
    for key in ("slug", "title"):
        if not data.get(key):
            raise ValueError(f"{path}: missing required '{key}'")
    # Pages may carry body content as HTML (`content`) or Markdown (`body_md`).
    if data.get("body_md"):
        data["content"] = md.markdown(data["body_md"], extensions=["extra", "sane_lists"])
    data["_source"] = data.get("body_md") or data.get("content") or ""
    data["_kind"] = "page"
    return data


def load_post(path: str) -> dict:
    post = frontmatter.load(path)
    meta = dict(post.metadata)
    for key in ("slug", "title"):
        if not meta.get(key):
            raise ValueError(f"{path}: missing required '{key}' in front matter")
    meta["_source"] = post.content
    meta["_html"] = md.markdown(post.content, extensions=["extra", "sane_lists"])
    meta["_kind"] = "post"
    return meta


def load_keyword_map() -> dict[str, dict]:
    if not os.path.exists(KEYWORD_MAP):
        return {}
    with open(KEYWORD_MAP, newline="", encoding="utf-8") as fh:
        return {row["slug"].strip(): row for row in csv.DictReader(fh) if row.get("slug")}


# SEO plugin -> post-meta keys. These keys must be REST-writable; the mu-plugin
# wp-content/mu-plugins/crown-seo-rest-meta.php registers them.
SEO_META_KEYS = {
    "rank_math": {
        "title": "rank_math_title",
        "description": "rank_math_description",
        "focus_keyword": "rank_math_focus_keyword",
        "canonical": "rank_math_canonical_url",
    },
    "yoast": {
        "title": "_yoast_wpseo_title",
        "description": "_yoast_wpseo_metadesc",
        "focus_keyword": "_yoast_wpseo_focuskw",
        "canonical": "_yoast_wpseo_canonical",
    },
}


def seo_meta(item: dict, plugin: str) -> dict:
    """Translate an item's `seo:` block + `primary_keyword` into plugin meta keys."""
    keys = SEO_META_KEYS.get(plugin)
    seo = item.get("seo") or {}
    if not keys:
        return {}
    out = {}
    if seo.get("title"):
        out[keys["title"]] = seo["title"]
    if seo.get("description"):
        out[keys["description"]] = seo["description"]
    if item.get("primary_keyword"):
        out[keys["focus_keyword"]] = item["primary_keyword"]
    if seo.get("canonical"):
        out[keys["canonical"]] = seo["canonical"]
    return out
