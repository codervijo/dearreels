# SEO content plan — dearreels.com (v1.A)

Decisions-lock artifact for `v1` "SEO content surface" (see `docs/prd.md` § 5).

## Locked decisions (2026-10-30, operator)

- **Authoring:** Claude drafts pages in-repo; operator reviews the diff before merge.
- **URL structure:** topic hubs: `/questions/…`, `/guides/…`, `/essays/…`, each hub with an index page.
- **Keyword selection:** from real search data (below), not the `lamill.toml` list as-is.

## Keyword data (pulled 2026-10-30, US Google)

**Source caveats.** All figures are provider estimates, not GSC data. Ahrefs
API units were exhausted, so the data came via treg from two providers:

- **Serpstat** (`getKeywords` phrase match; "vol" = `region_queries_count`)
- **SE Ranking** (`/v1/keywords/export`)

They **disagree sharply** on several head terms. "questions to ask your mom"
is 1,300 (Serpstat) vs 50 (SE Ranking); "questions to ask your grandparents"
is 880 vs 10. SE Ranking also showed implausible one-month jumps (dad/father:
10 → 590 in Oct 2026). The two sources agree on "questions to ask your parents
before they die" (320) and "questions to ask your father" (590). Treat volumes
as relative ranking, not absolutes; GSC impressions after v1.B are the real
test. KD = provider difficulty score (0–100).

| Cluster (one page each) | Head term | Vol (Serpstat / SE Ranking) | KD | Notable variants folded in |
|---|---|---|---|---|
| Questions — mom | questions to ask your mom | 1,300 / 50 | 6–21 | ask mother 320 · ask mom 320 · ask my mom 140 · ask your mother 90/90 · about her life 90 · deep questions 90 |
| Questions — grandparents | questions to ask your grandparents | 880 / 10 | 2–23 | grandma 880 · grandpa 880 · ask grandparents 480 · about their life –/50 |
| Questions — dad | questions to ask your dad | 720 / 590 | 6–8 | father 590/590 · 100 questions 170 · ask dad 140 · my dad 70 |
| Questions — parents | questions to ask your parents | 720 / 50 | 11–16 | about their childhood 210 · 100 questions 140 · good questions 50 |
| Questions — aging parents / before they die | questions to ask your parents before they die | 320 / 320 | 3–12 | father before he dies 210 · mom before she dies 210 · 35 questions aging parents 90 · ask aging/elderly parents 70 |
| Questions — family history | family history questions | – / 140 | 8–21 | questions to ask for family history 70 · genealogy questions 70 |
| Guide — gifts for aging parents | gifts for aging parents | 2,400 / – | 31–42 | best gifts 720 · gift ideas 590 · christmas gifts 720 |
| Guide — 70th birthday for dad | 70th birthday gift ideas for dad | – / 480 | 17 | — |
| Guide — Storyworth alternative | storyworth alternative | – / 140 | 4 | brand "storyworth" 18,100 (KD 92: not targetable) |
| Guide — long-distance grandparents | long distance grandparenting | – / 90 | 11–20 | long distance grandparents 90 |

**No measurable volume** (both providers): "ways to stay close to parents far
away", "how to feel closer to parents far away", "living far from aging
parents", "questions to ask my mother", "mother's day gifts that mean
something". These match the ICP's emotional framing but aren't search demand.
They're cornerstone-essay territory (voice, trust), not traffic pages.

**Excluded, wrong intent:** "questions to ask parents at parent teacher
conference" (590), nanny/babysitting/family-lawyer variants, "fun/funny
questions to ask family" (party-game intent), aging-parent *care* terms
("caring for aging parents" 1,600, CPC up to $131: home-care/elder-care
commercial intent, not ours).

## Proposed v1.B page set (pending operator sign-off)

| # | URL | Target cluster | Why |
|---|---|---|---|
| 1 | `/questions/` | hub | index for the question pages |
| 2 | `/questions/to-ask-your-mom` | mom | highest-volume on-ICP cluster, low KD; matches `lamill.toml` primary keyword intent |
| 3 | `/questions/to-ask-your-dad` | dad | both providers agree ~590–720, KD < 10 |
| 4 | `/questions/to-ask-your-grandparents` | grandparents | high Serpstat volume, KD low |
| 5 | `/questions/to-ask-your-parents` | parents | umbrella page; links to 2–4 |
| 6 | `/questions/to-ask-aging-parents` | aging parents / before they die | both providers agree on 320; framing decision below |
| 7 | `/guides/storyworth-alternative` | Storyworth alternative | KD 4, CPC $2.38 = buyer intent; direct conversion page |
| 8 | `/essays/staying-close-to-parents-far-away` | cornerstone | no search volume; sets the voice and is the internal-link anchor |

Deferred to v1.D or later: gifts for aging parents (KD 31–42, harder; revisit
once the domain has some authority), 70th-birthday-for-dad, long-distance
grandparents, family history.

Each question page should include: the questions themselves, grouped by theme
(the useful part), a short intro in the restrained literary voice, a
"one question a week" product tie-in (not a hard sell), FAQPage schema only
where genuine Q&A exists, and BreadcrumbList schema. Pages cross-link within
the hub; every page links to the cornerstone essay and the landing page.

## v1.A resolutions (2026-10-30, operator)

- **Page set:** all 8 pages above approved for v1.B.
- **"Before they die" framing:** the URL and H1 are about aging parents;
  "before they die" is a secondary term (title tag, body), never the H1.
- **Landing page:** fix the "Dearreals" wordmark typo only. The hero copy
  ("captures your parents' stories") stays for the operator to rewrite.
