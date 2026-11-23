# DevZero & Nautili plan site

Static site (3 pages + 2 roadmap workbooks) built into `../../seo-plan-site/`.

## Rebuild

```
cd devzero/site-build
python3 build.py
```

- `colleague/` – the colleague's published pages split into sections. The Google Ads tabs,
  competitor ads, Cast AI / ScaleOps teardowns and scoreboard are copied unchanged.
- `seed/` – the colleague's two roadmap workbooks and `seed.json` (their tasks, content plans and keywords).
- `merges.py` – everything our research adds or changes: new tasks, task edits, new content pieces,
  the keyword intent check, extra Search Console findings. Edit this file, then rebuild.
- `build.py` – applies the merges, recomputes every count, rebuilds the SEO tabs and writes the workbooks
  (Overview formulas are re-ranged to the new rows).

## Deploy on Vercel

Either:

1. Vercel dashboard → Add New → Project → import this GitHub repo → **Root Directory: `seo-plan-site`**,
   Framework Preset: Other, no build command, no output directory → Deploy. Set the production branch to `devzero`
   (or merge to main first).
2. Or from a machine with the Vercel CLI: `cd seo-plan-site && npx vercel --prod`.

`vercel.json` turns on clean URLs (`/plan`, `/competitors`) and sends `X-Robots-Tag: noindex`; `robots.txt`
blocks crawlers. The page is still public to anyone with the link: turn on Vercel Deployment Protection
(Settings → Deployment Protection) if it must be private.
