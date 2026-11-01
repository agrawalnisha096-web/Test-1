# Agentic Private Markets: Website and SEO Specialist (Claude Code)

Draft replies to the five screening questions. First person.
Items in **[brackets]** need a fact from me before sending.

---

## 1. Last change to a live site with Claude Code. What Claude got wrong, and how I fixed it

On 29 October I shipped a font fix to badassbacklinks.com, a WordPress site I run from a Git repo with Claude Code. Design changes go through GitHub Actions, which push the site's CSS through the WordPress REST API.

**What went wrong:** the brand body font, Cabinet Grotesk, wasn't loading anywhere on the site, so visitors saw their system font. Claude Code had written one Fontshare request for both brand fonts. Fontshare only returns the first font in that kind of request and quietly substitutes another one (Switzer) for the second. Nothing errored, the headings looked right, and the CSS deployed cleanly, so it went unnoticed.

**How I found and fixed it:** I checked the live CSS on the `/price/` page and saw there was no Cabinet Grotesk font rule. Then I had Claude:
- request each font separately;
- add a guard that stops the deploy if any brand font comes back without its font file, so this can't fail silently again;
- add two tests (36 passing);
- make the deploy also run when the font code changes, not only when the CSS changes.

Claude Code's safety check blocked the push to production until I approved it explicitly, which is the behaviour I want. After the deploy, I confirmed with curl that the live CSS had the font rules and that the font file downloaded.

**The lesson I took from it:** Claude is good at writing code that runs, but "it deployed" isn't "it works". I always check the live output myself.

---

## 2. Making a change on Next.js and WordPress without breaking the live site, and undoing it

The same rule applies on both: nothing goes to production that I haven't seen working somewhere else first, and every change is a Git commit I can reverse.

**Next.js** (I've worked on perimattic.com, a static Next.js export served from S3 and CloudFront):
1. Make the change on a branch with Claude Code, and keep the request small: one change per branch.
2. Run `next build`, lint and type checks locally. The build catches broken imports, type errors and missing pages before anyone sees them.
3. Check a preview of the build: a Vercel preview URL, or a staging bucket for an S3 site. I look at desktop and mobile, the title and meta tags, canonicals, internal links, and that every URL still returns 200.
4. Merge through a PR, deploy, then check the same things on the live URL.

**Undo:** on Vercel, Instant Rollback to the previous deployment takes seconds. On S3 and CloudFront, redeploy the previous build (or restore it with S3 versioning) and invalidate the CloudFront cache. Either way, `git revert` afterwards so the code matches what's live.

**WordPress** (I run badassbacklinks.com and jsonformatterpro.com this way):
1. Theme and code changes live in Git and deploy through GitHub Actions. Pages and posts publish through the WordPress REST API, matched by slug, so re-running a publish doesn't create duplicates.
2. Take a database backup or host snapshot before anything structural. Test plugin and theme updates on a staging copy first.
3. Deploys are scoped. For example, my CSS deploy only replaces a marked section of the site's custom CSS, so anything someone added in the Site Editor stays untouched. The manual run defaults to a dry run that reports what would change.
4. After publishing, check the live page: HTTP 200, indexable, no broken links, schema valid. On jsonformatterpro.com, a tool page only counts as done once those checks and its tests pass.

**Undo:** `git revert` and redeploy for code, WordPress page revisions for content, and the backup for anything bigger.

---

## 3. From a Figma design to the page going live

I've worked with Figma designers a lot, both in-house and contractors.

1. **Review before building.** I check the file for missing states (hover, empty, error, form success), mobile and tablet layouts, and real copy instead of placeholder text. I send the designer one list of questions instead of guessing.
2. **Match the existing system.** I take spacing, colours and fonts from Figma Dev Mode or Claude Code's Figma connection. I map them to the site's existing components and design tokens instead of adding one-off styles. New components get built once so they can be reused.
3. **Build on a branch with Claude Code,** section by section, checking each one against the Figma frame at desktop and mobile widths.
4. **Add the SEO and conversion layer** the design doesn't show: one H1, title and meta, schema, internal links in and out, image alt text and sizes, Core Web Vitals, and form tracking events in GA4.
5. **Designer review on a preview link.** The designer compares the preview with Figma side by side, and I fix what they flag before anyone else sees it.
6. **Ship and check:** merge, deploy, check the live page, request indexing in Search Console, and confirm the form events fire.

---

## 4. A page that brought in enquiries from organic search

At Algoscale (data and AI consulting, competing with Accenture, TCS and Deloitte), I built SEO from zero with no paid search.

**The page:** **[service page name / URL]**, one of the service pages I rebuilt around a buyer query: a specific service offer, proof from case studies, and a clear enquiry path.

**Result, from Search Console:**
- In about 10 weeks (late August to end of October 2025) it went from almost no traffic to about 200 clicks a day.
- Totals: 9.67K clicks and 810K impressions, at an average position of 6.9.

**Business result:**
- Organic and PR together produced $1M+ in pipeline within 6 months, and $450K of it was realised as revenue.
- US and Western leads grew 25% month on month.
- More than 10% of monthly pipeline came from AI-assistant referrals.

**How I measured it:** **[how enquiries were tied to this page: e.g. GA4 form-submit events by landing page, CRM first-touch source, "how did you hear about us" field]**. Search Console gave the clicks and positions for the page, and **[CRM / GA4]** connected the enquiries to organic.

---

## 5. Screen recording

**[Link to recording]**: a single change on **[site]** with Claude Code, from the prompt to the change showing in a preview.

---

## Open items before sending

- [ ] Q2: Perimattic: confirm my role on the site and how it deploys (CI pipeline? staging bucket?), so the S3/CloudFront steps match what actually happened.
- [ ] Q4: name the service page and how its enquiries were tracked.
- [ ] Q5: choose the site, record, add the link.
