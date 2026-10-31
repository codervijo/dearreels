# AI Agent Context — dearreels.com

## Summary

*one paragraph: what this site is, what it does*

DearReels helps adult children stay genuinely close to aging parents across distance. Each week, the service sends one warm, considered prompt to the parent or grandparent on WhatsApp — the only app they already use comfortably. The elder replies with a voice note, video, or photo, in their own language, in their own time. At the end of each year, the family receives a beautifully compiled private archive of those replies: voices, faces, stories, and small moments from a whole year. The product is not about preserving stories before they're lost. It's about staying close, week by week, to people who live too far away. Connection, not preservation.

## Audience

*one sentence: who this is for (broad demographic)*

Adult children aged 30-55 living in the US, UK, Canada, Gulf, Australia, or Singapore, whose parents or grandparents live in another country and who feel the distance widening as their parents age.

## ICP

*the specific ideal customer — demographics, pain points, what they use today. More detail than Audience: Audience is the broad demo ("homeowners with EV chargers"), ICP is the specific targetable subset ("Tesla owners in CA who installed in last 90d, paid $2k+")*

The primary buyer is the eldest adult daughter in an NRI (non-resident Indian) family, aged 32-48, with stable household income above $80K (or local equivalent), one or two young children of her own, and parents aged 65+ still living in India. She speaks to her mother weekly but the calls have flattened into logistics — health updates, weather, what was cooked. She wants something deeper but doesn't know how to engineer it without it feeling forced. She has 2-3 siblings scattered across countries. She is the one who organizes family things, sends the birthday flowers, manages the WhatsApp group, and carries the quiet guilt of being far away. She does not search for "memoir services" — she searches for "questions to ask my mother," "how to feel closer to parents far away," and "Mother's Day gifts that mean something." She buys for her mother but the product secretly serves her too.

## Goals

*1-2 sentences: primary business / product goal*

Acquire 50 paying families in year one through SEO and NRI community channels, validating product-market fit at a $149 annual price point. Reach 300 paying families by end of year two with a >60% renewal rate, proving the connection framing sustains LTV beyond a single archive cycle.

## Tech stack

Astro project under the sites/* workspace. Build path goes
through the parent `sites/Makefile` (Docker-orchestrated) which delegates
per-stack work to the central builder at `~/work/projects/builder/`.

## Project structure

- `src/` — application source
- `src/pages/` — `index.astro` (the landing page, owns its own SEO head), `404.astro` (noindex, served with HTTP 404), `questions/index.astro` (hub), `[hub]/[slug].astro` (renders every content entry), `privacy.astro` (`[VERIFY]`-gated, noindex until cleared)
- `src/content/{questions,guides,essays}/` — v1 SEO content as markdown; schema in `src/content.config.ts`; plan in `docs/seo-plan.md`
- `src/layouts/Layout.astro` — shared `<html>` shell with a `head` slot; `ContentLayout.astro` — chrome for content pages
- `src/components/SeoHead.astro` — shared title/meta/canonical/OG/JSON-LD block
- `src/components/` — React islands (`FAQ`, `SignupSection`, shadcn `ui/`)
- `src/__tests__/` — vitest: smoke, `seo.test.js` (landing-page source + no-soft-404 config), `site.test.js` (built `dist/` SEO checks for every page)
- `public/` — static assets copied to `dist/` at build (favicon, `hero-parent.jpg` = OG image, IndexNow key file, `_headers`, `robots.txt`)
- `genai/` — original tanstack-start export, input to the `v15.M` lamill translate step (kept for reference)
- `lamill.toml` — per-site config for lamill/rankmill: deploy platform, IndexNow, `[content]` identity, `[[todo]]`s
- `docs/` — PRD, Prompts log
- `Makefile` — thin forwarder to `../Makefile`
- `wrangler.jsonc` — Cloudflare deploy config
- `scripts/` *(if present)* — ingester or build-time helpers

## Building info

All dev work runs inside the parent `sites1` docker container. The host doesn't
need Node/pnpm installed; the container does. The parent `Makefile`
(`../Makefile` from this dir) is the canonical entry point.

### Why docker

- Pinned Node + pnpm versions match Cloudflare's build env.
- Avoids polluting the host with per-project node_modules.
- Same image serves every sibling project under sites/.

### Common Makefile targets

This project's local `Makefile` forwards every target to `../Makefile` with
`proj=dearreels.com`, so these all work either from this dir or from `sites/`:

| Command | What it does |
|---|---|
| `make buildsh` *(from `sites/`)* | Drop into a bash shell inside the docker container at `/usr/src/app` (= `sites/` mounted in). |
| `make run` *(from here)* / `make run proj=dearreels.com` *(from `sites/`)* | `pnpm install` then start dev server (auto-detected). |
| `make check-vite proj=dearreels.com` | Start the dev server, skipping install. |
| `make test proj=dearreels.com` | `pnpm install` + `pnpm build` + `pnpm test`. **Hard-fails outside docker** — `make buildsh` first, or `docker exec`. |
| `make deps` | Install pnpm globally (image bootstrap). |
| `make clean` *(from `sites/`)* | Remove root `package.json`, lockfile, node_modules. Don't run inside a project dir. |

### Running Make targets from a Claude Code session

The Bash tool runs on the host as `vijo`, not inside docker. The host's Node
is too old (v12) for Astro, so never build on the host. If a `sites1`
container is running, `docker exec` into it:

```bash
docker ps                                               # find the sites1 container name
docker exec -w /usr/src/app <name> make test proj=dearreels.com
```

If none is running, use a throwaway container from the `sites1` image
(use `bash -c`, not `bash -lc` — a login shell drops volta's `PATH`):

```bash
cd ~/work/projects/sites
docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app/dearreels.com sites1 \
  bash -c 'pnpm build && pnpm test'
```

## Deployment info

- **Platform:** Cloudflare Pages (`lamill.toml` `[deploy].platform = "cf-pages"`, production branch `main`) — *not* Vercel. `portfolio project check` can't confirm Pages vs Workers from live signals (CHECK_143 "deploy-drift: actual unknown").
- **Config:** `wrangler.jsonc` at the repo root points `assets.directory` at `./dist` and sets `not_found_handling: "404-page"`. This is a static multi-page Astro site, **not an SPA**. Never set `"single-page-application"`: it serves the homepage with HTTP 200 for every unknown URL (soft-404s, plus a bogus `/sitemap.xml`). Both Pages and Workers serve `dist/404.html` with a real 404 status, so `src/pages/404.astro` is the fix on either platform.
- **Headers:** `public/_headers` — cache (`/assets/*` immutable, HTML no-cache) + security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`). Vite copies `public/` into `dist/` at build, so the file ships with the assets.
- **Build:** `pnpm build` → `dist/`. Wrangler picks up `dist/` via `wrangler.jsonc`.
- **Deploy:** `wrangler deploy` (locally) or via Cloudflare's Git integration on push.
  Initial GitHub repo + CF Pages project setup is automated by the portfolio CLI:
  `cd ../portfolio && make run ARGS="deploy dearreels.com"` runs `gh repo create` and
  POSTs to the CF Pages API with `build_command="pnpm run build"` set explicitly
  (avoids the bun-detection trap kwizicle.com hit). Idempotent; safe to re-run.
- **Vite version:** must be ≥ 6.0.0 — Wrangler's Vite integration rejects Vite 5.
- **Env vars:** Astro inlines `PUBLIC_*` vars at build time; set them in the Cloudflare project's environment-variable settings. No analytics are wired in yet: CHECK_080 fails, and the GA4 `[[todo]]` in `lamill.toml` is still open.
- **Live URL:** https://dearreels.com/ (live, HTTP 200)
- **Sitemap:** `@astrojs/sitemap` → `/sitemap-index.xml` → `/sitemap-0.xml`; `robots.txt` points at the index. `404.astro` is auto-excluded.
- **IndexNow:** key file `public/ed7cb98a8ba79c6d774af281fa477193.txt`, enabled in `lamill.toml [index]`.
- **Legacy:** if a `vercel.json` or `.vercelignore` is present from a Lovable export, it's inert on Cloudflare and safe to delete.

## Content strategy

*what content this site needs — page types, initial topics, format mix (long-form vs reference vs tool)*

Three concentric content layers. The outermost layer is programmatic SEO targeting emotional and practical search intent: "questions to ask my mother," "ways to stay close to parents far away," "milestone birthday gifts for Indian father turning 70," "long distance grandparenting," with hundreds of pages built from structured templates across relationship × theme × language × cultural community. The middle layer is hand-written cornerstone content on family connection, distance, and the small rituals that hold families together — essays, not listicles, in a restrained literary voice. The innermost layer is product pages: how it works, sample prompts, sample archive, gifting flow, FAQ. All three layers feed each other: pSEO captures search intent, cornerstone content builds topical authority and trust, and product pages convert. NRI-specific content forms the wedge but the underlying themes are universal enough that non-NRI families find the product organically.

### Post-deploy checklist (do these once after the first successful deploy)

- [x] Verify in **Google Search Console** at https://search.google.com/search-console — add as `sc-domain:dearreels.com` property; verify via DNS TXT record. Until this is done, no SEO traffic data is observable for this site (and the workspace-wide `30 commercial sites with traffic` goal can't credit it).
- [x] Submit the sitemap inside GSC (`portfolio project seo` reports it submitted and reachable; the live sitemap is `https://dearreels.com/sitemap-index.xml`).
- [x] Update the **Live URL** above with the actual deploy URL.
- [x] `data/portfolio.json` knows the project (`uv run portfolio project check dearreels.com` resolves). `cleanup` has been replaced by `portfolio fleet sync`.

## How to run

```bash
# from this dir, after `make buildsh` from sites/:
make deps      # → pnpm install via the central builder
make run       # → dev server
make build     # → dist/
make test      # → pnpm install + build + test (must be inside container)
```

## How this project is checked

This project is enforced against shared sites/* conventions by
`portfolio project check dearreels.com` (run from `sites/portfolio/`).
Conformance is driven by the universal check catalog (CHECK_*) —
e.g. CHECK_020 (own-git-repo), CHECK_002 (has-ai-agents-md),
CHECK_007 (has-docs-prompts), CHECK_008 (has-docs-growth — `docs/growth.md`
exists — the per-project growth-experiment log; see Growth log section
below), CHECK_001 (has-readme), CHECK_009 (has-gitignore), CHECK_035
(vite-version-ok), CHECK_003 / CHECK_004 (AI_AGENTS.md `## Building info` +
`## Deployment info` headings). See the full catalog with
`portfolio check catalog`. Run it as `cd ../portfolio && uv run portfolio project check dearreels.com`;
`uv run portfolio project seo dearreels.com` gives the GSC/indexing view.

If `project check` flags a regression, fix it, either by hand or with
`uv run portfolio project fix dearreels.com`.

## Growth log — per-project experiment tracker

`docs/growth.md` is this project's append-only log of growth experiments
(content, SEO, marketing, structural changes). Each entry is a dated H2
with a measurable hypothesis + KPI + observation window (default 28d).
Read **the full workflow inside `docs/growth.md`** — it's self-sustaining
so you don't have to remember the lifecycle from outside the file.

Update it whenever you do something growth-relevant on this site. The
data source is GSC (`portfolio gsc sync` from the portfolio dir); this
file narrates *why*.

## Strategy reminder — ship fast, let the market decide

This sites/* workspace is shipping commercial sites toward a
**30-site SEO-traffic goal**. The convention is **build & ship fast,
then let GSC data drive what to invest more in.** Don't over-polish
before launch. Get a minimum-viable version live, indexed, then
iterate on whichever sites actually attract traffic.

Translation for this project: prefer shipping over perfection. The
SEO baseline (`public/robots.txt`, `@astrojs/sitemap`, head tags guarded
by `src/__tests__/seo.test.js`), deploy config, and dev tooling (`vitest`)
are in place.

## Versioning

This project follows the sites/* **canonical versioning convention** (defined
in `sites/portfolio/AI_AGENTS.md`):

- **`vN`** — major capability tier. Each is a coherent shipped capability and
  may break compat with the previous tier. SemVer-MAJOR semantics.
- **`vN.X`** — phase letter within a tier (A / B / C / …). Internal slicing of
  build work; signals "order/scope can shift." Each phase still ships
  independently.
- **Two levels only — never `vN.X.Y`.** Follow-up work inside a tier takes the
  next phase letter; renumber the table if a slot is needed mid-tier.
- **`vN.A` is the planning / decisions-lock phase** of each tier; build work
  starts at `vN.B`.

Two-layer notation separates **external version** (what consumers see) from
**internal phasing** (how the team slices work). Letters signal *un-promised* —
nobody mistakes `v1.B` for a SemVer minor release.

**Always use this numbering when planning or shipping work on this project.**
Specifically:

- Every entry in `docs/prd.md`'s phases table uses `vN.X`.
- Every commit message that ships a phase mentions its version (e.g.
  `v1.B — auth flow`).
- Every entry in `docs/Prompts.md` references the version of the work it
  describes when relevant.

Don't introduce a parallel scheme (no `0.1.0` / `Sprint 3` / etc.). When in
doubt, the canonical statement is `sites/portfolio/AI_AGENTS.md`.

Track this project's progress in `docs/prd.md` against this taxonomy. v0.A is
the bootstrap (this scaffold); v1.A is the first real shipped capability.

## Conventions

- Stack: astro
- **Package manager: pnpm only.** No `bun.lockb`, no `package-lock.json`, no `yarn.lock` — they cause CF Pages to pick the wrong manager and break the build. The `pnpm-lock.yaml` is the only lockfile that should ever be committed.
- Build path: this project's `Makefile` → `../Makefile` → `~/work/projects/builder/`
- Cloudflare deploy constraints: Vite ≥ 6, frozen-lockfile install, no `_redirects` SPA fallback (handled by `wrangler.jsonc`'s `not_found_handling` instead).
- **Versioning**: two-level `vN` / `vN.X` — see Versioning section above and `sites/portfolio/AI_AGENTS.md` for the canonical statement.

## Out of scope / don't touch

- *(leave blank — fill in when something is)*
