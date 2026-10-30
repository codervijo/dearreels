# Growth Log — dearreels.com

> **What this file is for:** an honest, append-only log of growth experiments
> on this site — what was tried, what was measured, what happened. The data
> source is GSC; this file narrates *why*. Future-you (or future-Claude)
> reads this when deciding what to try next, both on this site and on
> related sister sites.

## How to use this (workflow — re-read this when you forget)

**Add an entry whenever you do something growth-relevant.** That includes:
shipping new content, structural SEO changes (sitemap, schema, redirects,
internal linking), tech changes that affect crawl/indexing, marketing
pushes, backlink campaigns. *Not* every code commit — just things you'd
want to point at when GSC numbers move (or fail to).

**Each entry is a hypothesis you can be wrong about.** Commit to a
measurable KPI and an observation window before acting — otherwise "did
this work?" is just a feeling.

### Lifecycle of one entry

1. **Day of action** — append a new dated H2 with `Status: active`, the
   hypothesis, the KPI you'll watch, current baseline numbers, what you
   did, and the date to review (default: today + 28 days, matching GSC's
   reporting window).
2. **Review day** — pull current GSC numbers, compute delta vs baseline.
   Fill in **Result** and **Learning**. Set **Status** to `shipped` (worked,
   keep going), `failed` (didn't pay off, abandon), or extend the review
   another window if results are ambiguous.
3. **Never rewrite older entries.** Wrong hypotheses are the most valuable
   data — they tell you what NOT to repeat on the next site. Append, don't
   edit.

### Where to get the numbers

```bash
cd ~/work/projects/sites/portfolio && make run ARGS="gsc sync"
```

Then read the row for `dearreels.com`. Or pull from
https://search.google.com/search-console directly.

### Format

```
## YYYY-MM-DD — <one-line hypothesis or action>
- **Status:** active | testing | shipped | failed | abandoned
- **Hypothesis:** <what you're betting will work — only on initial / new-bet entries>
- **KPI:** <what GSC metric / query / page>
- **Baseline:** <numbers at start>
- **Action:** <what was done; 1-2 lines>
- **Result:** <numbers after window; "TBD — review YYYY-MM-DD" until then>
- **Learning:** <why it worked / didn't; what to try next; "TBD" until reviewed>
```

---

## 2026-06-01 — DearReels grows primarily through SEO-driven organic acquisition,…
- **Status:** active
- **Hypothesis:** DearReels grows primarily through SEO-driven organic acquisition, gift-mode purchases around culturally significant moments (Mother's Day, Father's Day, Diwali, milestone parent birthdays), and family expansion within paying households (siblings adding their own family circles at lower marginal pricing). Word-of-mouth compounds through the year-end archive reveal moment — when a finished family book arrives at a sibling gathering, the other siblings ask how to start one for their own family. The NRI diaspora is large enough (10M+ globally, concentrated in 6-8 high-income countries) that capturing a fraction of one percent represents a real business. Crucially, this is a slow-growth, high-retention category — not a viral consumer app — and the business shape rewards patience, depth of cultural fit, and refusing to dilute the connection framing in pursuit of broader audiences too early.
- **KPI:** any GSC traffic — clicks, impressions, indexed-page count
- **Baseline:** 0 clicks / 0 impressions (just deployed)
- **Action:** project scaffolded via `portfolio new bootstrap`; first deploy pending. After deploy: verify in GSC as `sc-domain:dearreels.com` and submit the sitemap.
- **Result:** Reviewed late, on 2026-10-30. GSC over 28 days: 22 impressions, 1 click, 4.5% CTR, average position 5.4. Homepage indexed. Sitemap submitted, 1 URL. Source: `portfolio project seo`.
- **Learning:** The site is indexed and gets a few impressions, but it's a single page, so there's no content surface to test the SEO thesis yet. Window extended; the test needs content pages first (see the 2026-10-30 entry).

## 2026-10-30 — Technical-SEO hygiene (soft-404s, meta tags) removes crawl noise
- **Status:** active
- **Hypothesis:** Unknown URLs returned the homepage with HTTP 200 (`single-page-application` fallback). Fixing that and the incomplete meta tags (description over 160 chars, no `meta robots`, no `og:image`, canonical ≠ JSON-LD URL) avoids soft-404 / duplicate signals and improves link previews. On a 1-page site the traffic effect is expected to be ~nil; this is hygiene, not growth.
- **KPI:** GSC Pages report shows no "Soft 404" entries; homepage still indexed; impressions not lower than baseline.
- **Baseline:** 22 impressions / 1 click / 4.5% CTR / avg position 5.4 (28 days to 2026-10-30); 1 indexed URL.
- **Action:** `v0.C`. `not_found_handling: "404-page"` plus a noindex `src/pages/404.astro`; head-tag fixes in `index.astro`; SEO regression tests. Built locally, not yet deployed.
- **Result:** TBD — review 2026-11-27 (28 days after deploy; shift if deploy lands later)
- **Learning:** TBD

## 2026-10-30 — v1.B: first content surface (8 pages) earns impressions beyond the homepage
- **Status:** active
- **Hypothesis:** Low-difficulty informational "questions to ask your mom / dad / grandparents / parents / aging parents" pages (Serpstat KD 2–21), plus a Storyworth-alternative page (KD 4, buyer intent) and a cornerstone essay, will get indexed and earn impressions within one 28-day window. That is the first real test of the SEO thesis in the 2026-06-01 entry.
- **KPI:** indexed URLs (target: all 8 new pages); GSC impressions on non-homepage URLs; queries containing "questions to ask"; any clicks to `/guides/storyworth-alternative/`.
- **Baseline:** 1 indexed URL; 22 impressions / 1 click in 28 days, all on the homepage (2026-10-30).
- **Action:** `v1.B`. Built 8 pages per `docs/seo-plan.md`, with internal links from the landing nav/footer. Not yet deployed. After deploy: submit the sitemap / ping IndexNow and request indexing of the hub in GSC.
- **Result:** TBD — review 28 days after deploy
- **Learning:** TBD
