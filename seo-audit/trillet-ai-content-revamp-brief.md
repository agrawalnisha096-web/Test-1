# Trillet.ai — Content Revamp Brief

**Purpose:** define exactly what to fix, on which pieces, and why — from a content and keyword-targeting point of view, not a technical-SEO one (that's covered in the other two reports in this series).
**Method:** direct crawling of trillet.ai is still blocked from this session (re-tested — same result as before), so "reading the content" here means two real, verifiable sources instead of one guess: (1) Google's indexed understanding of each page, retrieved per-URL, which reflects actual title tags, actual headings, and actual body content Google has crawled; (2) Trillet's own 12-month Search Console query data — the literal words real searchers typed. Every claim below is anchored to one or both. Nothing is invented.

**One correction to the earlier audit:** Trillet does have a Trustpilot listing — **4.6/5 from 20 reviews** — found this pass. The earlier "no review-platform presence" finding was wrong for Trustpilot specifically (G2/Capterra/Product Hunt still show nothing). Real, if thin, social proof exists and isn't being used anywhere in the content reviewed below.

---

## The pattern, stated once

Every cluster below shows the same shape: **decent-to-good rankings, real search demand, near-zero clicks.** That's not 305 separate content problems. It's one problem — title/snippet framing that doesn't match what the searcher typed — showing up 305 times. The revamp is mostly a rewrite exercise, not a rewrite-and-reresearch exercise. The keyword research is largely already done; it's sitting in the Queries.csv export.

---

## 1. The revamp checklist — apply this to every piece

This is the repeatable playbook. Everything in §2–4 is a specific application of it.

1. **Open with the answer, not the pitch.** The first sentence under the H1 should directly satisfy the query, in the searcher's own words. A page titled around "Smith.ai pricing" needs to state Smith.ai's actual pricing in sentence one — the Trillet pitch comes after, not instead of.
2. **Title = searcher's phrase, not brand voice.** Compare `cheap answering service` (5,176 impressions, rank 5.8, 1 click) against the page likely serving it — if the title reads like marketing copy rather than the plain phrase a cost-conscious owner typed, that's the fix, not the content underneath it.
3. **One piece of content per search intent.** Where two posts already cover the same competitor (found twice this pass — see §3), merge them. Two thinner pages splitting one ranking almost never beats one authoritative page.
4. **Match specificity to competitiveness.** Short generic head terms (`ai answering service`, `ai phone answering service`) are ranking on page 3–5 against much larger incumbents. Long-tail, specific phrasing is where Trillet already wins (position 5–10). Don't keep pouring effort into head terms that aren't winnable yet — go deeper on the long tail that's already working.
5. **Every pricing/compliance page needs the number in the first screen.** Not "contact us for pricing," not "compliance-first" as a slogan — the actual $/month, the actual certifications, stated plainly, because that's literally what the query is.
6. **Add FAQPage schema wherever the content already answers a question** (pricing, compliance, comparison pages) — ties directly to the AEO recommendation in the first audit, and this pass shows exactly which pages qualify.
7. **Link cost/compliance/comparison content to `/pricing` and to whichever compliance page is canonical** — right now these read as isolated posts, not a funnel.
8. **Consolidate before expanding.** Don't add a 32nd industry page or an 8th competitor comparison until the underperforming pages in this brief are fixed. More thin pages compounds the problem this brief exists to fix.

---

## 2. Where the real demand is, and how badly it's being served

Non-brand queries only, clustered by theme (from `Queries.csv`, capped at GSC's top-1,000-row export — real volume is higher):

| Cluster | Queries | Impressions | Clicks | CTR |
|---|---:|---:|---:|---:|
| Cost / cheap / pricing | 195 | 49,503 | 43 | **0.09%** |
| Generic answering/receptionist (broad) | 432 | 127,442 | 283 | 0.22% |
| Industry-specific (plumber, HVAC, roofing, etc.) | 129 | 34,712 | 23 | 0.07% |
| Competitor names / pricing | 116 | 19,851 | 32 | 0.16% |
| White-label / agency | 82 | 16,019 | 62 | **0.39%** (best of the set) |
| Call forwarding / carrier-specific | 48 | 9,334 | 25 | 0.27% |
| Compliance / data / security | 28 | 5,885 | **0** | **0.00%** |

### 2.1 Cost/pricing — the single biggest gap

195 distinct real queries, 49,503 impressions, 43 clicks. These are bottom-funnel, near-decision-stage searches, and they're almost entirely unconverted:

- `cheap answering service` — 5,176 impr., position 5.8, **1 click**
- `cheap phone answering service` — 3,290 impr., position 7.5, **0 clicks**
- `telephone answering service cheap` — 2,020 impr., position 6.0, **0 clicks**
- `low cost answering service` — 1,558 impr., position 6.4, **0 clicks**
- `ai receptionist pricing` — 1,107 impr., position **22.7** (page 3, despite Trillet having an actual `/pricing` page)
- `answering service cost` — 828 impr., position **45.0** (page 5 — essentially absent)

Trillet's actual pricing ($49/mo Basic, $99 Studio, $299 Agency, per earlier research) is genuinely competitive against Smith.ai ($95–292.50/mo) and most of the field. That's a real advantage that isn't showing up in the SERP for the exact phrases cost-conscious buyers use. **This is the highest-ROI content fix in the brief** — the content and the advantage already exist; the framing doesn't reach the query.

### 2.2 Compliance — real strength, zero conversion

28 queries, 5,885 impressions, **literally zero clicks across all of them.** This is the starkest number in the whole dataset. And it's not a content-quality problem — the `voice-ai-data-residency-requirements-by-region` post (confirmed via search) covers real, specific regulatory detail: Schrems II, APRA CPS 234, GDPR transfer rules, PIPEDA, and states plainly that Trillet is "the only voice AI application layer supporting on-premise deployment via Docker" with configurable regional residency. That's a genuine, defensible differentiator, written up competently.

- `vapi vs retell ai hipaa compliance and soc2 details 2026` — 1,392 impr., position 10.1, 0 clicks — Trillet is surfacing for a query about *two competitors'* compliance posture, not capturing it for itself.
- `hipaa compliant ai platform cost factors 2026` — 417 impr., position 14.4, 0 clicks
- `hipaa compliant ai assistant` — 274 impr., position 22.8, 0 clicks
- `hipaa ai assistant` — 225 impr., position 33.4, 0 clicks

Trillet includes HIPAA/TCPA/ACMA/GDPR on every plan at no extra cost — most competitors charge extra or don't offer it. That fact needs to be the literal first sentence and the literal title of a page targeting each of these phrases, not buried inside a longer regional-compliance explainer.

### 2.3 Industry-specific — confirms the earlier ranking-reality finding, with the exact missing terms

129 queries, 34,712 impressions, 23 clicks. This is the query-level view of what the previous report showed at the page level (`/industries/plumbers` stuck on page 3).

- `roofing answering service` — 5,723 impr., position 10.2, 1 click
- `plumbing answering service` — 2,919 impr., position 13.1, 0 clicks
- `answering service for plumbers` — 1,437 impr., position 23.5, 0 clicks
- `answering service for plumbing companies` — 818 impr., position **40.8**
- `plumbers using ai phone calling 2026` — 837 impr., position 5.3, 0 clicks
- `voicify dental ai receptionist competitors` — 778 impr., position 13.4, 0 clicks

That last one is a genuine content gap: real search volume exists for a **Voicify** comparison (a dental-specific AI receptionist competitor), and there's no evidence Trillet has a dedicated `voicify-alternative` or `trillet-vs-voicify` post the way it does for Smith.ai, Vapi, Retell, Bland, Synthflow, Dialzara, AIRA, and Hey Rosie. Worth adding — it's a competitor Trillet apparently already ranks adjacent to.

### 2.4 White-label/agency — proof the fix works

82 queries, 16,019 impressions, 62 clicks — **0.39% CTR, the best of any cluster.** This is the control group: `white label ai receptionist` (726 impr., position 14.7) still converts at 2.75% CTR — well above every other cluster in this brief — despite sitting on page 2. Compare that to the near-identical `white label chatbot` / `chatbot white label` / `whitelabel chatbot` variants, all hovering position 16–20 with near-zero CTR. The difference is almost certainly framing: "AI receptionist" matches what Trillet actually is (voice-first); "chatbot" doesn't, and searchers using chatbot language may be looking for something Trillet isn't. **Don't chase the chatbot phrasing — double down on the receptionist/voice framing that's already converting**, and get `white label ai receptionist` off page 2 (likely a §3-technical / internal-linking fix, not a content rewrite).

### 2.5 Competitor pricing — answer their question before making your pitch

- `smith.ai pricing 2026` — 693 impr., position 7.5, 0 clicks
- `vapi ai pricing 2026` — 509 impr., position 9.7, 0 clicks
- `synthflow ai pricing 2026` — 486 impr., position 6.0, 0 clicks

All three rank on page 1. All three convert at zero. Someone searching "smith.ai pricing 2026" wants Smith.ai's actual number first — if the post opens with the Trillet pitch instead of stating the competitor's real pricing plainly in the first screen, it fails the query even while ranking for it. This is checklist item #1 (§1) applied directly.

### 2.6 Generic head terms — not winnable yet, stop over-investing here

- `ai answering service` — 5,555 impr., position **30.4**
- `ai phone answering service` — 2,628 impr., position **39.8**
- `ai call answering service` — 2,075 impr., position **43.6**
- `answering service cost` — 828 impr., position **45.0**

These are the shortest, most generic, most competitive terms in the whole dataset, and Trillet isn't seriously in contention for any of them (page 3–5). The dedicated page for the closest of these — `ai-answering-service-guide` — sits at position 30.7 itself, confirming the same gap at the page level. This is a highly competitive head-term category dominated by established, larger incumbents. Recommendation: **don't chase these with more content volume right now** — the long-tail terms in §2.1–2.5 are already ranking on page 1 and just need better framing, which is a far cheaper fix than trying to out-rank incumbents on generic terms.

---

## 3. Confirmed keyword cannibalization in the comparison cluster

The comparison/alternative content (27 posts across `X-vs-trillet-comparison`, `trillet-vs-X-comparison`, and `X-alternative-2026` patterns) has at least two confirmed cases of the same competitor covered by multiple, separately-ranking posts:

| Competitor | Posts found | Overlap risk |
|---|---|---|
| **Smith.ai** | `smith-ai-alternative-2026` *and* `trillet-vs-smith-ai-comparison-2026` | Both target "smith.ai alternative"/"trillet vs smith.ai" intent — splitting rather than consolidating authority |
| **Vapi** | `vapi-alternative-for-agencies`, `trillet-vs-retell-vs-vapi-comparison`, and `voice-ai-bots-for-outbound-calls-in-2025-the-real-showdown` (also covers Vapi) | Three posts touching the same competitor from different angles |

**Recommendation:** audit all 27 comparison/alternative posts for competitor overlap (a simple pass: list every competitor name mentioned in every post title, group by competitor, flag any competitor with 2+ posts). Where overlap is confirmed, merge into one comprehensive page per competitor and 301 the loser — this is the same signal-splitting problem as the apex/www issue in the other two reports, just at the content-strategy level instead of the hosting level.

---

## 4. Piece-by-piece revamp directives (highest-priority pages)

| Page | What's actually there | The fix |
|---|---|---|
| `comparing-no-code-phone-agents-for-outbound-calling-in-2026` | Genuinely strong, specific content — real latency benchmarks (Trillet <2000ms vs. Bland/Vapi ~2500ms), concurrent-call counts, compliance coverage table. 8,819 impressions, **1 click**. | Content is not the problem — the title is generic and the meta likely doesn't signal the specific benchmarked data inside. Rewrite title to foreground the actual comparative numbers (e.g. lead with the benchmark claim, not the category name). This is the clearest "good content, bad packaging" case in the whole set. |
| `smith-ai-alternative-2026` + `trillet-vs-smith-ai-comparison-2026` | Real, specific pricing breakdown (Smith.ai $95–292.50/mo vs. Trillet $49/mo), multi-channel differentiator. Confirmed duplicate coverage (§3). | Merge into one page. Lead with Smith.ai's actual current pricing before pivoting. Target `smith.ai pricing 2026` (693 impr., 0 clicks) directly. |
| `voice-ai-data-residency-requirements-by-region` | Specific, credible regulatory content (Schrems II, APRA CPS 234, GDPR, PIPEDA) and a real differentiator (only platform with on-premise Docker + configurable regional residency). 34,864 impr., 0.04% CTR. | Title/meta need the differentiator claim up front, not buried in a regional-law explainer. Split or cross-link into a dedicated HIPAA-specific page targeting the zero-click HIPAA query cluster in §2.2 directly. |
| `how-to-set-up-call-forwarding-in-australia` | Genuinely detailed, carrier-specific instructions (Telstra/Optus/Vodafone codes, ring-delay settings, which prepaid plans don't support forwarding). 73,697 combined impr. — the 2nd-highest-traffic page on the site. | Good content, disconnected framing — someone searching Telstra call-forwarding codes is one step from needing exactly what Trillet sells (AI answers when forwarding kicks in) but the title doesn't make that connection. Add a clear "this is how you'd connect an AI receptionist" bridge and a strong mid-content CTA — don't just leave it as generic carrier documentation. |
| `best-ai-receptionist-for-small-business-2026` | Real differentiators stated clearly (compliance included, auto-callback, 5-minute setup, multi-channel). Highest-impression page on the site (117,316 combined), 0.23% CTR. | This is a self-published "we're the best" post competing in a SERP full of *other companies'* neutral-sounding "best AI receptionist" roundups (NextPhone, AIRA, Marblism, AnsweringAgent, Feather, Upfirst all have their own). Self-published superlative claims read as biased next to those. Either reframe as an honest, named comparison (which openly places competitors, building the credibility a "best of" needs) or invest in getting an actual third-party roundup to rank Trillet — the Trustpilot 4.6/5 (see correction above) is real proof worth surfacing directly in this post. |
| `ai-answering-service-guide` | Reasonable definitional content — but competing for one of the most generic, most contested terms in the space (see §2.6). Position 30.7. | De-prioritize as a ranking target for now; this term is dominated by larger incumbents. Repurpose the content as internal-linking glue (link *into* it from the higher-converting long-tail pages) rather than a standalone ranking play. |
| `/industries/plumbers` | Highest-demand industry page (9,095 impr.) but stuck on page 3 (position 22.3), split 19.8/27.9 across hosts. | Primarily a §3-technical fix (host consolidation, covered in the other reports) — but once merged, cross-check the content against the real query language in §2.3 (`plumbing answering service`, `answering service for plumbers`) to make sure the page actually uses those exact phrases, not just "AI answering service for plumbers." |
| — (gap, no existing page) | No dedicated Voicify comparison found despite real demand (`voicify dental ai receptionist competitors`, 778 impr., position 13.4). | New page: `trillet-vs-voicify-comparison` or fold into a dental-vertical page, following the same template as the Smith.ai/Vapi posts once those are fixed. |

---

## 5. What would sharpen this further

This pass used Google's indexed understanding of each page plus your own query data — real, but still one step removed from the literal page source. Two things would make the next pass sharper:

1. **A combined Page + Query GSC export** (in GSC's UI, select both dimensions before exporting) — the current export has Pages and Queries as separate reports with no join key, so every query-to-page mapping in this brief is topical/thematic inference, not a hard link. A combined export would let this be precise instead of inferred.
2. **Raw page source or a copy-paste of body copy** for the priority pages in §4, if you want literal line-edit rewrites of titles, meta descriptions, and opening paragraphs rather than directional guidance.
