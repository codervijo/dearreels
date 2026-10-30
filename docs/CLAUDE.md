# CLAUDE.md — dearreels.com

Per-project orientation for Claude. Read this first when picking up
work on this site. Index of conventions, deferred decisions, and
non-features that aren't obvious from the code or git history.

## Project

DearReels sends aging parents one warm WhatsApp prompt a week; they
reply in voice/video/photo, and the family gets a private year-end
archive. Buyer: NRI adult children (see `AI_AGENTS.md` § ICP). Stack:
static Astro (+ React islands, Tailwind v4) + pnpm, deployed to
Cloudflare Pages; Makefile forwards to the central builder. Today the
site is a single landing page (`src/pages/index.astro`) plus a 404 page.

## Commands

```bash
# All of these run inside the sites1 docker container (host Node is too old)
make deps           # install deps via the central builder
make run            # local dev server
make build          # production build → dist/
make test           # pnpm install + build + vitest (smoke + SEO regression)

# One-shot from the host, no running container needed:
cd ~/work/projects/sites && docker run --rm -v "$PWD":/usr/src/app \
  -w /usr/src/app/dearreels.com sites1 bash -c 'pnpm build && pnpm test'

# Status / SEO (from sites/portfolio/)
uv run portfolio project check dearreels.com
uv run portfolio project seo dearreels.com

# Deploy: Cloudflare Pages auto-builds on push to main (operator's call)
```

## Conventions

  - Build path: this project's `Makefile` → `../Makefile` (parent
    workspace) → `~/work/projects/builder/` (central builder).
  - Stack: pnpm-only. No `package-lock.json` / `bun.lockb` / `yarn.lock`.
  - Deploy: Cloudflare Pages. No `_redirects` SPA fallback. `wrangler.jsonc`
    uses `not_found_handling: "404-page"`, and `src/pages/404.astro` (noindex)
    makes unknown URLs return a real 404. Never switch back to
    `"single-page-application"`: this is a static MPA, and the SPA setting
    causes soft-404s.
  - SEO head tags: `index.astro` keeps its tags inline in its
    `<Fragment slot="head">` because `seo.test.js` greps that source file.
    Every other page uses `src/components/SeoHead.astro`, either directly
    or through `src/layouts/ContentLayout.astro`.
  - Content (v1): markdown in `src/content/{questions,guides,essays}/`,
    with schemas in `src/content.config.ts` (`title` ≤60, `description` ≤160).
    The collection name is the URL hub, and all three render through
    `src/pages/[hub]/[slug].astro`. Only `/questions/` has a hub index page.
    To add a page, drop in a `.md` file. Keyword and page plan:
    `docs/seo-plan.md`.
  - Internal URLs and canonicals always end in `/`, matching the sitemap.
  - `src/__tests__/site.test.js` checks **built** output (`dist/`) for every
    page: title/description length, canonical = path, indexable + in
    sitemap, og:image, one `<h1>`, valid JSON-LD, and no broken internal
    links. Build before running it.
  - Content honesty: never state facts about Dearreels beyond what the
    landing page/FAQ already claims, and never state competitor facts
    without a dated source (see the Storyworth guide's footnote).
  - Landing canonical is `https://dearreels.com/` (trailing slash), so it
    matches the JSON-LD `url` and the sitemap `<loc>`. Meta descriptions
    must be ≤160 chars (both test files enforce it).
  - vitest runs in the `node` environment. jsdom isn't installed, and no
    test needs a DOM.

## Heading hygiene

**Before adding any section, subsection, or heading to a Markdown
file, output the file's current heading outline first:**

```bash
grep -nE '^#+ ' path/to/file.md
```

Then confirm — in the chat — that the planned new heading's:

1. **Depth** (`#`, `##`, `###`, …) is the intended depth, not
   accidentally one level too shallow.
2. **Label** doesn't collide with existing headings — no duplicate
   `## 1. <title>`, no `### N.X` subsection labels that look like
   `vN.X` phase identifiers.

Only after that confirmation, write.

Applies especially to long-lived docs: `docs/prd.md`, `AI_AGENTS.md`,
`docs/architecture.md`, `docs/CLAUDE.md`.

**Why:** structural drift is invisible in any single editing session
— it only becomes obvious in the aggregate, by which time the doc is
hard to fix. The pre-edit outline ritual catches collisions and depth
mistakes at the point of writing, not at quarterly cleanup time.

## Deferred decisions

Things deliberately *not* shipped. Append entries with rationale so
future Claude sessions don't re-propose them.

- **Analytics (GA4)** — not wired in yet (CHECK_080). It needs an
  operator-provided measurement ID; see the open `[[todo]]` in `lamill.toml`.
- **Landing hero copy** ("captures your parents' stories", the
  preservation framing) — left for the operator to rewrite (v1.A decision,
  2026-10-30). The wordmark typo was fixed in v1.B.
- **Hub index pages for `/guides/` and `/essays/`** — not built while each
  holds one page, to avoid thin pages. Add one when a hub reaches ~3 entries,
  and update the breadcrumbs in `[hub]/[slug].astro`.
- **FAQPage schema** — not used. The question lists aren't Q&A pairs, and
  marking them up as FAQs would misrepresent them.
