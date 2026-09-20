# Trillet — SEO + GEO Strategy (DataForSEO audit findings)

*Voice-AI keyword clusters, priority order: white-label → enterprise → AI answering/receptionist.*
Data: DataForSEO SERP + Labs + LLM (ChatGPT, Perplexity, Gemini, Claude) + Backlinks. All source CSVs in `trillet_dfs_out/`.

---

## The one-sentence takeaway

**Trillet is winning the LLM-answer game and losing the Google-organic game — so lead with GEO (getting cited in AI answers), and treat the parasite/organic problem as a separate, secondary track.**

---

## 1. The core split: organic vs. AI answers

| Signal | Trillet's position |
|---|---|
| **Google organic (top-20)** | Weak. 7 listings across 20 keywords; parasites (Reddit/YouTube) own 26/11/27 listings per cluster. |
| **LLM citations (256 total)** | Trillet's own domain is the **#1 cited source** in white-label; but 83% of citations go to **third-party sites**, not any vendor homepage. |
| **Where the two agree** | Citations and rankings are both won on *third-party pages* (listicles, directories, PR) — not on trillet.ai. |

**Implication:** you don't win by optimizing trillet.ai. You win by getting Trillet *onto the third-party pages that LLMs and Google already trust.* That's the whole strategy.

---

## 2. Per-cluster picture (LLM "names Trillet" rate)

| Cluster | LLM names Trillet | Organic strength | AI Overview fires? | Verdict |
|---|---|---|---|---|
| **White-label / agency** | **9/16 ✅** | Moderate (5 listings) | Rarely | **Defend & extend** — your strong suit |
| **Enterprise** | **0/6 ❌** | Zero listings | No | **Whitespace** — win via capability sub-angles |
| **Receptionist** | **0/6 ❌** | Zero listings | **Yes, heavily** | **Whitespace** — GEO-critical, most winnable |

---

## 3. Where to get placed (per cluster)

### White-label — AI-tool directory saturation (proven, cheap, DIY)
Reverse-engineered from `autocalls.ai` (cited as often as Retell in LLMs): its footprint is **130+ AI-tool directory listings**, the kind you submit yourself for free.
- **Do this first:** submit Trillet to `theresanaiforthat`, `futurepedia`, `toolify.ai`, `topai.tools`, `best-ai-tools.org`, `producthunt`, `alternativeto.net`, `saashub`, + the long tail in `competitor_backlinks_autocalls*.csv`.
- **White-label listicles:** `botpenguin`, `convocore.ai`, `dvaarik.com` "best white-label AI voice platform" posts.

### Enterprise — win the capability sub-angles, not "best platform"
Direct competition is brutal (Salesforce, Genesys, NICE, Aircall). Don't fight there. The citations cluster around two winnable lanes:
- **HIPAA / healthcare (wide open):** `getprosper.ai`, `usehello.ai`, `coval.ai`, `celloip.com`, `murf.ai`, `parloa.com`, `voiceai.guide/hipaa`, `aiagentstore.ai`. Requires a HIPAA/BAA story.
- **CRM integration:** `monday.com`, `justcall.io`, `twig.so`, `respond.io`, `twixor.ai`.
- **Enterprise best-of listicles:** `deepgram.com`, `assemblyai.com`, `inworld.ai`, `harmony.ai`, `rasa.com`, `11x.ai`, `unframe.ai`.
- Full list: `enterprise_placement_targets.csv` (97 rows).

### Receptionist — GEO-critical, and NOT owned by the voice-AI competitors
This is the only cluster where **Google AI Overview fires strongly** (cites `getaira.io`, `smith.ai`, `ringcentral`, `goodcall`, `heyrosie`) — so AI-Overview optimization matters most here. Competitors barely rank; the field is **receptionist specialists + parasites**.
- **Beatable listicle targets:** `smith.ai`, `getnextphone.com`, `withallo.com`, `dapta.ai`, `vellum.ai`, `cloudtalk.io`, `voksha.com`, `marblism.com`, `getvoip.com`, `upfirst.ai`, `technologyadvice.com`.
- **Vertical niche lane:** dental/HVAC — `oralhealthgroup.com`, `dentalintel.com`, `dentistryiq.com` cite receptionist tools; the keyword set (`ai receptionist for dental office`, `for hvac`) is low-competition vertical entry.
- Full list: `receptionist_placement_targets.csv` (96 rows).

---

## 4. The parasite problem (separate, secondary track)

- **YouTube (39 listings, 13 kw)** and **Reddit (23 listings, 17 in top-10)** dominate Google organic — Reddit is the higher-impact target (ranks where buyers click).
- **But parasites barely exist in LLM citations** (2 of 256). So this is a *Google-organic* problem only.
- Worst in the **receptionist** cluster (YouTube 20, Reddit 7). If you fight parasites, fight there, with targeted Reddit threads + YouTube content.

---

## 5. Reproducible citation mechanics (how competitors do it)

1. **AI-tool directory submission** — highest volume, free, DIY. LLMs ingest these heavily. (autocalls' whole playbook.)
2. **Newswire PR** — LLMs cite syndicated press releases (`usatoday.com/press-release`, `digitaljournal.com/pr`, `einpresswire`, `businesswire`, Cision). A modest PR cadence directly feeds citations.
3. **"Best-of" editorial listicles** — outreach to get Trillet added (`rasa.com`, `chatbase.co`, `deepgram`, `assemblyai`, etc.). Higher effort, higher authority.

*Note: most competitor backlinks are nofollow — fine for LLM citations (models read the page regardless), weaker for Google ranking.*

---

## 6. Prioritized action plan

| # | Action | Effort | Cost | Impact |
|---|---|---|---|---|
| 1 | Submit Trillet to all AI-tool directories (`competitor_backlinks_autocalls*.csv`) | Low | Free | Broad LLM-citation lift |
| 2 | Outreach to get added to per-cluster "best-of" listicles (CSVs) | Med | Free–low | Targeted citations + organic |
| 3 | Launch newswire PR cadence (HIPAA + white-label angles) | Med | $ | Feeds LLM citations directly |
| 4 | Build HIPAA + CRM capability pages (enterprise whitespace) | Med | — | Enters an uncontested lane |
| 5 | Receptionist: optimize for AI Overview + vertical (dental/HVAC) listicles | Med | Free–low | Most winnable whitespace |
| 6 | Parasite track (optional): targeted Reddit/YouTube for receptionist kw | Med | — | Google-organic only |

**Sequencing:** #1 this week (free, fast) → #2 + #5 (whitespace) → #3 + #4 (compounding).

---

## 7. Data assets & methodology

**CSVs in `trillet_dfs_out/`:** `serp_rankings`, `ai_overview`, `labs_keywords`, `llm_answers`, `llm_answers_gemini_claude`, `share_of_voice`, `competitor_backlinks_autocalls(_dofollow)`, `enterprise_placement_targets`, `receptionist_placement_targets`, `cost_log`.

**Coverage & caveats:**
- LLM citation sample is ~28 answers across 14 buyer prompts — directionally reliable, but individual domain counts are small.
- ChatGPT returned almost no citations (1/10); usable LLM-citation signal is mostly **Perplexity + Gemini + Claude**.
- Gemini/Claude ran on the **white-label cluster only**; enterprise/receptionist LLM data is ChatGPT+Perplexity.
- `vertexaisearch.cloud.google.com` in citations is a Gemini grounding redirect — ignore it.
- Total audit spend: **~$0.76** of the $1.00 DataForSEO credit.
