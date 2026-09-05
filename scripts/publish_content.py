#!/usr/bin/env python3
"""
Publish WordPress Pages and Posts from content files in this repo.

WHY THIS EXISTS
---------------
On jsonformatterpro.com the tool *templates* are PHP files in the theme (deployed
by the Git/rsync pipeline), but the *content* shown on each page — the ACF
`description`, the `faq_list` FAQ, and all blog posts — lives in the WordPress
MySQL database. Deploying files does not touch the database. This script closes
that gap: it reads content files and pushes them into WordPress over the REST
API, so content is version-controlled and published on merge like everything else.

CONTENT FILES
-------------
  content/pages/*.yml   -> WordPress Pages   (see content/pages/graphql-formatter.yml)
  content/posts/*.md    -> WordPress Posts    (Markdown body + YAML front matter)

Matching is by slug: an existing page/post with the same slug is UPDATED,
otherwise a new one is CREATED. Running twice with no changes is a no-op.

AUTH
----
Set these environment variables (as GitHub Actions secrets in CI):
  WP_URL           e.g. https://jsonformatterpro.com
  WP_USER          a WordPress username with editor/admin rights
  WP_APP_PASSWORD  an Application Password (wp-admin -> Users -> Profile ->
                   Application Passwords). NOT the normal login password.

REQUIREMENTS
------------
  - ACF fields must have "Show in REST API" enabled (ACF 6+) so `acf` writes work.
  - The theme template referenced by a page (e.g. graphqlformatter.php) must
    already be deployed, or WordPress will reject the `template` value.

USAGE
-----
  python scripts/publish_content.py --check           # verify URL + auth only
  python scripts/publish_content.py --dry-run          # show what would change
  python scripts/publish_content.py                    # publish everything
  python scripts/publish_content.py content/pages/x.yml  # publish specific files
"""

from __future__ import annotations

import argparse
import glob
import os
import sys
from typing import Any

import frontmatter
import markdown as md
import requests
import yaml

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_DIR = os.path.join(REPO_ROOT, "content", "pages")
POSTS_DIR = os.path.join(REPO_ROOT, "content", "posts")

# Statuses we consider when looking up an existing item (needs auth to see drafts).
LOOKUP_STATUSES = "publish,future,draft,pending,private"


class WP:
    """Thin WordPress REST API client."""

    def __init__(self, base_url: str, user: str, app_password: str):
        self.base = base_url.rstrip("/") + "/wp-json/wp/v2"
        self.session = requests.Session()
        # Application Passwords may be shown with spaces; the API accepts them removed.
        self.session.auth = (user, app_password.replace(" ", ""))
        self.session.headers.update({"Accept": "application/json"})

    def _req(self, method: str, path: str, **kw) -> requests.Response:
        r = self.session.request(method, f"{self.base}{path}", timeout=30, **kw)
        if not r.ok:
            raise RuntimeError(
                f"{method} {path} -> {r.status_code}: {r.text[:500]}"
            )
        return r

    def whoami(self) -> dict:
        return self._req("GET", "/users/me").json()

    def find_by_slug(self, post_type: str, slug: str) -> dict | None:
        r = self._req(
            "GET",
            f"/{post_type}",
            params={"slug": slug, "status": LOOKUP_STATUSES, "per_page": 1},
        )
        items = r.json()
        return items[0] if items else None

    def create(self, post_type: str, payload: dict) -> dict:
        return self._req("POST", f"/{post_type}", json=payload).json()

    def update(self, post_type: str, item_id: int, payload: dict) -> dict:
        return self._req("POST", f"/{post_type}/{item_id}", json=payload).json()

    def resolve_terms(self, taxonomy: str, names: list[str]) -> list[int]:
        """Return term IDs for names, creating any that don't exist."""
        ids: list[int] = []
        for name in names:
            r = self._req("GET", f"/{taxonomy}", params={"search": name, "per_page": 100})
            match = next((t for t in r.json() if t["name"].lower() == name.lower()), None)
            if match:
                ids.append(match["id"])
            else:
                created = self._req("POST", f"/{taxonomy}", json={"name": name}).json()
                ids.append(created["id"])
        return ids


def load_page(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as fh:
        data = yaml.safe_load(fh) or {}
    if not data.get("slug"):
        raise ValueError(f"{path}: missing required 'slug'")
    if not data.get("title"):
        raise ValueError(f"{path}: missing required 'title'")
    return data


def load_post(path: str) -> dict:
    post = frontmatter.load(path)
    meta = dict(post.metadata)
    if not meta.get("slug"):
        raise ValueError(f"{path}: missing required 'slug' in front matter")
    if not meta.get("title"):
        raise ValueError(f"{path}: missing required 'title' in front matter")
    meta["_html"] = md.markdown(post.content, extensions=["extra", "sane_lists"])
    return meta


def build_page_payload(data: dict) -> dict:
    payload: dict[str, Any] = {
        "title": data["title"],
        "slug": data["slug"],
        "status": data.get("status", "draft"),
    }
    if data.get("template"):
        payload["template"] = data["template"]
    if data.get("content"):
        payload["content"] = data["content"]
    if data.get("parent_slug"):
        payload["_parent_slug"] = data["parent_slug"]  # resolved later
    if isinstance(data.get("acf"), dict):
        payload["acf"] = data["acf"]
    if isinstance(data.get("meta"), dict):
        payload["meta"] = data["meta"]
    return payload


def build_post_payload(wp: WP, meta: dict, dry_run: bool) -> dict:
    payload: dict[str, Any] = {
        "title": meta["title"],
        "slug": meta["slug"],
        "status": meta.get("status", "draft"),
        "content": meta["_html"],
    }
    if meta.get("excerpt"):
        payload["excerpt"] = meta["excerpt"]
    if meta.get("date"):
        payload["date"] = meta["date"]
    if isinstance(meta.get("acf"), dict):
        payload["acf"] = meta["acf"]
    if isinstance(meta.get("meta"), dict):
        payload["meta"] = meta["meta"]
    if not dry_run:
        if meta.get("categories"):
            payload["categories"] = wp.resolve_terms("categories", meta["categories"])
        if meta.get("tags"):
            payload["tags"] = wp.resolve_terms("tags", meta["tags"])
    return payload


def upsert(wp: WP, post_type: str, slug: str, payload: dict, dry_run: bool) -> str:
    existing = wp.find_by_slug(post_type, slug)
    if dry_run:
        return f"WOULD {'UPDATE' if existing else 'CREATE'} {post_type[:-1]} '{slug}'"
    if existing:
        result = wp.update(post_type, existing["id"], payload)
        return f"UPDATED {post_type[:-1]} '{slug}' (id {result['id']}) -> {result.get('link','')}"
    result = wp.create(post_type, payload)
    return f"CREATED {post_type[:-1]} '{slug}' (id {result['id']}) -> {result.get('link','')}"


def gather(paths: list[str]) -> tuple[list[str], list[str]]:
    """Split explicit paths (or a full scan) into page files and post files."""
    if paths:
        pages = [p for p in paths if p.endswith((".yml", ".yaml"))]
        posts = [p for p in paths if p.endswith(".md")]
    else:
        pages = sorted(glob.glob(os.path.join(PAGES_DIR, "*.y*ml")))
        posts = sorted(glob.glob(os.path.join(POSTS_DIR, "*.md")))
    return pages, posts


def main() -> int:
    ap = argparse.ArgumentParser(description="Publish content to WordPress.")
    ap.add_argument("paths", nargs="*", help="Specific content files (default: all).")
    ap.add_argument("--dry-run", action="store_true", help="Show changes, publish nothing.")
    ap.add_argument("--check", action="store_true", help="Verify URL + auth, then exit.")
    args = ap.parse_args()

    url = os.environ.get("WP_URL", "").strip()
    user = os.environ.get("WP_USER", "").strip()
    app_pw = os.environ.get("WP_APP_PASSWORD", "").strip()
    if not (url and user and app_pw):
        print("ERROR: set WP_URL, WP_USER and WP_APP_PASSWORD.", file=sys.stderr)
        return 2

    wp = WP(url, user, app_pw)

    try:
        me = wp.whoami()
        print(f"Authenticated to {url} as '{me.get('name')}' (id {me.get('id')}).")
    except Exception as e:  # noqa: BLE001
        print(f"ERROR: could not authenticate to WordPress REST API: {e}", file=sys.stderr)
        return 2
    if args.check:
        return 0

    pages, posts = gather(args.paths)
    failures = 0

    for path in pages:
        try:
            data = load_page(path)
            payload = build_page_payload(data)
            payload.pop("_parent_slug", None)  # parent resolution is a TODO; ignore for now
            print(upsert(wp, "pages", data["slug"], payload, args.dry_run))
        except Exception as e:  # noqa: BLE001
            failures += 1
            print(f"FAILED {path}: {e}", file=sys.stderr)

    for path in posts:
        try:
            meta = load_post(path)
            payload = build_post_payload(wp, meta, args.dry_run)
            print(upsert(wp, "posts", meta["slug"], payload, args.dry_run))
        except Exception as e:  # noqa: BLE001
            failures += 1
            print(f"FAILED {path}: {e}", file=sys.stderr)

    if failures:
        print(f"\n{failures} item(s) failed.", file=sys.stderr)
        return 1
    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
