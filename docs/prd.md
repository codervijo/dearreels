---
project: dearreels.com
prd_version: 1
project_version: v1.B
status: live
owner: Vijo
last_updated: 2026-10-30
---

# dearreels.com — PRD

## 1. Problem

Adult children living abroad feel the distance from aging parents
widening; weekly calls flatten into logistics. They want a deeper,
regular connection that doesn't feel forced, but have no lightweight way
to create it. (Source: `AI_AGENTS.md` § Summary / ICP.)

## 2. Users

- **Buyer:** adult children aged 30-55 in the US, UK, Canada, the Gulf,
  Australia or Singapore whose parents live in another country. The wedge
  is the eldest NRI daughter (32-48) with parents aged 65+ in India.
- **Participant:** the parent/grandparent, who only uses WhatsApp.
- Audience size: TBD (operator to source). The growth.md hypothesis
  cites an NRI diaspora of 10M+ but doesn't name a source.

## 3. Goals & non-goals

**Goals:** (from `AI_AGENTS.md` § Goals)
- 50 paying families in year one via SEO + NRI community channels, at
  $149/year.
- 300 paying families by end of year two with >60% renewal.

**Non-goals:**
- Positioning as a memoir/"preserve stories before they're lost" service:
  the framing is connection, not preservation.
- *(more — operator to fill)*

## 4. Versions

Two-level versioning convention (canonical: `sites/portfolio/AI_AGENTS.md`):

- `vN` = major capability tier; SemVer-MAJOR semantics.
- `vN.X` = phase letter within a tier; internal slicing.

| Version | Theme | Acceptance |
|---|---|---|
| v0 | scaffold → live landing page | site builds and deploys to Cloudflare, landing page indexed in GSC, technical-SEO baseline clean |
| v1 | SEO content surface | searchers for "questions to ask my mother"-style queries land on genuinely useful pages that lead to the product; sitemap grows past 1 URL; GSC impressions spread across many pages |

## 5. Phases

| Phase | Theme | Features | Status |
|---|---|---|---|
| **v0.A** | scaffolded | `portfolio new bootstrap` ran; standard files written; git initialized | ✅ |
| **v0.B** | Astro landing page live | tanstack-start export ported to Astro (lamill `v15.M` translate); single landing page deployed; sitemap/robots via `@astrojs/sitemap`; IndexNow key tracked; GSC verified + indexed | ✅ |
| **v0.C** | technical-SEO fixes | no soft-404s (`404-page` handling + noindex `404.astro`); meta description ≤160; `meta robots`; `og:image`/`twitter:image`; canonical ↔ JSON-LD URL match; vitest on `node` env + SEO regression tests | ✅ deployed 2026-10-30 |
| **v1.A** | SEO content plan — decisions lock (`docs/seo-plan.md`) | page types + URL structure; first keyword set (from `lamill.toml` `[content]`); page count for v1.B; authoring path (hand-written vs rankmill drafts + operator edit); internal-linking + schema conventions; shared head/SEO component so tests cover every page | ✅ |
| **v1.B** | first content pages | `/questions/` hub + 5 question pages (mom, dad, grandparents, parents, aging parents), `/guides/storyworth-alternative/`, `/essays/staying-close-to-parents-far-away/`; content collections + `[hub]/[slug]` route; shared `SeoHead` + `ContentLayout` (breadcrumbs, Article/BreadcrumbList JSON-LD, CTA, footer link spine); landing nav/footer links + wordmark typo fix; `site.test.js` checks every built page | ✅ deployed 2026-10-30 |
| **v1.C** | templated pages at scale | content-collection template for the relationship × theme (× language/community) matrix chosen in v1.A; batch generation + review flow | planned |

## 6. Open questions

- *(append-only log; mark answered with date but never delete)*
- 2026-10-30 — Where does SEO-surface expansion go? **Answered 2026-10-30:** v1, as "SEO content surface" (v1.A plan → v1.B first pages → v1.C templated scale).
- 2026-10-30 — v1.A decisions to lock: (a) URL structure (`/questions/…`, `/guides/…`, flat?); (b) which keywords seed v1.B; (c) v1.B page count; (d) authoring path — hand-written vs rankmill drafts + operator edit; (e) does the landing-page copy shift from "captures stories" to the connection framing first?
  - **Partly answered 2026-10-30** (details: `docs/seo-plan.md`): (a) topic hubs `/questions/`, `/guides/`, `/essays/`; (b) chosen from real search data (Serpstat + SE Ranking via treg); (d) Claude drafts in-repo, operator reviews the diff. **Fully answered 2026-10-30:** (c) 8 pages approved; "before they die" is a secondary term under an aging-parents H1; (e) typo fix only, the hero rewrite is the operator's.
