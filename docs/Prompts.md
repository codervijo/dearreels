# Prompt History — dearreels.com

<!-- Append new prompts at the bottom, newest last. Format:

## YYYY-MM-DD [optional title]
> <prompt text or short summary>

The dated H2 (`## YYYY-MM-DD`) is what `portfolio project check` parses
to surface "last AI prompt" per project. Keep entries append-only.
-->

## 2026-06-01 — scaffolded via portfolio new bootstrap

> Created project skeleton. Stack chosen, scaffolding written, git initialized.

## 2026-10-30 — v0.C status check + technical-SEO fixes
> Checked project and live-site/GSC status; fixed soft-404s (SPA fallback → `404-page` + `404.astro`) and meta issues (description length, meta robots, og:image, canonical/JSON-LD match); switched vitest env jsdom → node (jsdom wasn't installed, suite was erroring); added SEO regression tests; refreshed AI_AGENTS.md, docs/CLAUDE.md, prd.md, growth.md. Asked to expand SEO surface — pending PRD placement.

## 2026-10-30 — v1 SEO content surface placed in PRD; v1.A locked; v1.B built
> Operator chose PRD option 1 (v1 = SEO content surface). v1.A: Claude drafts in-repo; topic-hub URLs; keywords from real data (Ahrefs units exhausted, so Serpstat + SE Ranking via treg, ~$0.12) → `docs/seo-plan.md`. Operator approved the 8-page set, the aging-parents H1 with "before they die" as a secondary term, and a typo-only landing fix. v1.B: content collections, SeoHead/ContentLayout, 8 pages, built-output SEO tests (79 passing).

## 2026-10-30 — v1.C legal pages (privacy + terms)
> Added /privacy/ and /terms/ following mspproof.com's convention: facts derived from the code, operator commitments wrapped in `<Verify>`, noindex + sitemap filter while any remain, gate enforced in site.test.js (93 passing). Inserted as v1.C; templated pages renumbered to v1.D. Found the signup form only writes to the visitor's localStorage, so no leads have ever reached the operator; logged in the PRD open questions.

## 2026-10-30 — v1.C signup form → Web3Forms
> Rewired SignupSection.tsx to post to Web3Forms (mspproof.com pattern): key from PUBLIC_WEB3FORMS_KEY, honeypot, success only on `data.success`, visible error if the key is unset. Removed the localStorage stash. Privacy page now names Web3Forms (one [VERIFY] cleared; 9 remain). 98 tests passing.

## 2026-10-30 — v1.C [VERIFY] pass on privacy/terms
> Operator: reuse mspproof's Web3Forms key; clarify [VERIFY] without making anything up. Found the key in mspproof.com's public JS bundle. Setting it on the dearreels CF Pages project was blocked by the session's permission classifier, so the operator sets it. Searched sites/, portfolio/ and dearreels genai/: no legal entity, governing law, service back end, consent, renewal or retention policy is recorded. Rewrote both pages so every unmarked line is sourced (code, landing/FAQ, operator); moved Claude-drafted commitments, including a 12-month liability cap that had been stated as fact, into [VERIFY] as proposed wording. Now 13 markers (privacy 6, terms 7). 98 tests passing.

## 2026-10-30 — v1.C privacy rescoped to mspproof's pattern, terms dropped
> Operator: the 13 markers asked for things no sibling site has (legal entity, governing law); follow the other sites, not calcengine (weak in Google). Rewrote /privacy/ to mspproof.com's website-only pattern (sign-up + request forms, Cloudflare, Web3Forms, Google Fonts, no trackers; service stated as pre-launch) with mspproof's request form and its 2 markers (use/no-sale; retention/deletion). Dropped /terms/ (operator decision; mspproof and drdebug have none) and its footer links. 13 → 2 markers.

## 2026-10-30 — v1.C privacy markers cleared
> Operator accepted the use/no-sale wording. On retention: "we are not storing anything as of now". Corrected the wording to match what happens: there's no database, but Web3Forms emails each submission to hello@lamill.io; the operator accepted that. verifyPending false, /privacy/ indexable and back in the sitemap.

## 2026-10-30 — v1.C deployed + IndexNow ping
> Pushed `3ff0599`. Verified live: /terms/ 404, /privacy/ has the new wording, index/follow, in the sitemap. Pinged IndexNow for /privacy/ (the only new sitemap URL; accepted; ledger updated). Live form has an empty data-key: PUBLIC_WEB3FORMS_KEY still isn't set in Cloudflare Pages, so the sign-up and privacy forms error instead of submitting.
