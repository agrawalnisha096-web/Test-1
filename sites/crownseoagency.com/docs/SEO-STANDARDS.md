# SEO & content standards — crownseoagency.com

The single rulebook for anyone (human or AI) creating or editing content here.
Rules marked **[enforced]** are checked automatically by `scripts/seo_lint.py`
on every PR; the rest are reviewed by a human in the PR.

## 1. Keyword ownership (prevents cannibalization)
- **[enforced]** Every page/post has exactly one `primary_keyword`, recorded in
  `content/keyword-map.csv` *before* the content is written.
- **[enforced]** No two URLs share a primary keyword, slug, SEO title or meta description.
- Before creating a new page, check the map: if an existing URL already targets
  the intent, **improve that page** instead of creating a competitor.
- Match search intent: `commercial` → service page with pricing/CTA;
  `informational` → blog post that answers the question in the first paragraph.

## 2. URLs
- **[enforced]** Slugs: lowercase, hyphen-separated, ≤ 60 chars, no dates or stop-word padding.
- **Never change a live slug.** If you must, list the 301 redirect in the PR.
- **[enforced]** Internal links: `https://crownseoagency.com/...` (or root-relative `/...`),
  always with a trailing slash; never staging/`hostingersite.com`/`http://` links.

## 3. Titles & descriptions
- **[enforced]** SEO title 30–60 characters, ending in `| Crown SEO Agency`.
- **[enforced]** Meta description 120–158 characters.
- Primary keyword near the start of the title and naturally in the description *(lint warns)*.
- Description = benefit + specific detail + call to action. No keyword stuffing.

## 4. On-page structure
- **[enforced]** The theme renders the title as the only H1 — body starts at H2.
- **[enforced]** No skipped heading levels (H2 → H4).
- Answer the main question in the first 1–2 sentences (helps featured snippets
  and AI overviews), with the primary keyword in the first 100 words *(lint warns)*.
- Short paragraphs, descriptive H2s that could stand alone as questions/answers.
- Length targets: posts ≥ 800 words, pages ≥ 300 *(lint warns)*. Depth over padding.

## 5. Links
- Posts: ≥ 3 internal links; pages: ≥ 2 *(lint warns)*. Link from new posts to
  the relevant service page, and add a link *to* the new post from an existing related page.
- Descriptive anchor text ("local SEO audit"), never "click here".
- External links only to authoritative sources (Google Search Central, studies); cite stats.

## 6. Images
- **[enforced]** Every image has meaningful alt text describing the image.
- Upload WebP/compressed images, descriptive filenames (`local-seo-map-pack.webp`).

## 7. E-E-A-T & trust (an SEO agency is judged by its own site)
- **[enforced]** No ranking guarantees or hype phrases (list in `site.yml`) —
  Google's own guidance warns against SEOs that guarantee rankings.
- Use real, verifiable examples, numbers and case studies. **Never invent**
  clients, testimonials, results, statistics or credentials.
- Posts show an author with relevant experience (set in WordPress).
- Update `date`/content when facts change; don't silently republish stale advice.

## 8. Brand & voice
- **[enforced]** Brand is written exactly `Crown SEO Agency`.
- Tone: expert, plain-English, confident but honest. Second person ("you").
  Spelling locale per `site.yml` → `locale`.
- **[enforced]** Avoid AI-cliché phrasing (list in `site.yml`).
- Every page ends with one clear next step (audit, contact, related service).

## 9. Structured data
- Handled by the SEO plugin (Organization, Article, Breadcrumb). FAQ blocks go
  in `acf.faq_list` (or the plugin's FAQ block) — never hand-written JSON-LD in the body.

## 10. Publishing safety
- New content starts as `status: draft`; flip to `publish` in a separate,
  reviewed change, or schedule with `status: future` + `date`.
- One topic per PR; the PR template checklist must be completed.
