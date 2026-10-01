#!/usr/bin/env python3
"""
Publish WordPress Pages and Posts for crownseoagency.com from files in content/.

Same model as the jsonformatterpro.com pipeline, plus:
  - SEO title / description / focus keyword are written to the SEO plugin
    (Rank Math or Yoast, chosen in site.yml) from each file's `seo:` block.
  - `parent_slug` on pages is resolved to a real parent page.
  - The SEO lint (scripts/seo_lint.py) must pass before anything is published.

  content/pages/*.yml   -> WordPress Pages
  content/posts/*.md    -> WordPress Posts (Markdown body + YAML front matter)
  Files starting with `_` are templates and are skipped.

Matching is by slug: existing items are UPDATED, otherwise CREATED.

AUTH (GitHub Actions secrets in CI):
  WP_URL, WP_USER, WP_APP_PASSWORD (an Application Password, not the login password)

USAGE
  python scripts/publish_content.py --check
  python scripts/publish_content.py --dry-run
  python scripts/publish_content.py
  python scripts/publish_content.py content/posts/x.md
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from typing import Any

import requests

from content_lib import REPO_ROOT, gather, load_page, load_post, load_site, seo_meta

LOOKUP_STATUSES = "publish,future,draft,pending,private"


class WP:
    """Thin WordPress REST API client."""

    def __init__(self, base_url: str, user: str, app_password: str):
        self.base = base_url.rstrip("/") + "/wp-json/wp/v2"
        self.session = requests.Session()
        self.session.auth = (user, app_password.replace(" ", ""))
        self.session.headers.update({"Accept": "application/json"})

    def _req(self, method: str, path: str, **kw) -> requests.Response:
        r = self.session.request(method, f"{self.base}{path}", timeout=30, **kw)
        if not r.ok:
            raise RuntimeError(f"{method} {path} -> {r.status_code}: {r.text[:500]}")
        return r

    def whoami(self) -> dict:
        return self._req("GET", "/users/me").json()

    def find_by_slug(self, post_type: str, slug: str) -> dict | None:
        r = self._req(
            "GET", f"/{post_type}",
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
                ids.append(self._req("POST", f"/{taxonomy}", json={"name": name}).json()["id"])
        return ids


def common_payload(item: dict, plugin: str) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "title": item["title"],
        "slug": item["slug"],
        "status": item.get("status", "draft"),
    }
    if isinstance(item.get("acf"), dict):
        payload["acf"] = item["acf"]
    meta = dict(item.get("meta") or {})
    meta.update(seo_meta(item, plugin))
    if meta:
        payload["meta"] = meta
    return payload


def build_page_payload(wp: WP, data: dict, plugin: str, dry_run: bool) -> dict:
    payload = common_payload(data, plugin)
    if data.get("template"):
        payload["template"] = data["template"]
    if data.get("content"):
        payload["content"] = data["content"]
    if data.get("parent_slug") and not dry_run:
        parent = wp.find_by_slug("pages", data["parent_slug"])
        if not parent:
            raise ValueError(f"parent page '{data['parent_slug']}' not found — publish it first")
        payload["parent"] = parent["id"]
    return payload


def build_post_payload(wp: WP, meta: dict, plugin: str, dry_run: bool) -> dict:
    payload = common_payload(meta, plugin)
    payload["content"] = meta["_html"]
    if meta.get("excerpt"):
        payload["excerpt"] = meta["excerpt"]
    if meta.get("date"):
        payload["date"] = str(meta["date"])
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
        return f"UPDATED {post_type[:-1]} '{slug}' (id {result['id']}) -> {result.get('link', '')}"
    result = wp.create(post_type, payload)
    return f"CREATED {post_type[:-1]} '{slug}' (id {result['id']}) -> {result.get('link', '')}"


def main() -> int:
    ap = argparse.ArgumentParser(description="Publish content to WordPress.")
    ap.add_argument("paths", nargs="*", help="Specific content files (default: all).")
    ap.add_argument("--dry-run", action="store_true", help="Show changes, publish nothing.")
    ap.add_argument("--check", action="store_true", help="Verify URL + auth, then exit.")
    ap.add_argument("--skip-lint", action="store_true", help="Emergency only: bypass the SEO gate.")
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

    if not args.skip_lint:
        lint = subprocess.run(
            [sys.executable, os.path.join(REPO_ROOT, "scripts", "seo_lint.py"), *args.paths]
        )
        if lint.returncode != 0:
            print("SEO lint failed — nothing published.", file=sys.stderr)
            return 1

    plugin = load_site().get("seo_plugin", "none")
    pages, posts = gather(args.paths)
    # Publish parents before children so parent_slug resolves.
    page_data = []
    for path in pages:
        try:
            page_data.append((path, load_page(path)))
        except Exception as e:  # noqa: BLE001
            page_data.append((path, e))
    page_data.sort(key=lambda pd: 1 if isinstance(pd[1], dict) and pd[1].get("parent_slug") else 0)

    failures = 0
    for path, data in page_data:
        try:
            if isinstance(data, Exception):
                raise data
            payload = build_page_payload(wp, data, plugin, args.dry_run)
            print(upsert(wp, "pages", data["slug"], payload, args.dry_run))
        except Exception as e:  # noqa: BLE001
            failures += 1
            print(f"FAILED {path}: {e}", file=sys.stderr)

    for path in posts:
        try:
            meta = load_post(path)
            payload = build_post_payload(wp, meta, plugin, args.dry_run)
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
