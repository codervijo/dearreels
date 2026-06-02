# Server code dropped during the Astro port

The source (`genai/`) was a TanStack Start app with a server runtime
(SSR + Cloudflare/nitro). Astro here is configured for **static output**
(`output: 'static'`), so the framework-specific server code does NOT
translate. It was intentionally dropped. If any of this is needed later,
it must be re-implemented as Astro server endpoints / an Astro SSR
adapter, or moved to an external service.

## Dropped

- **`genai/src/server.ts`** — TanStack Start SSR entry wrapper. Caught
  catastrophic SSR responses (h3-swallowed 500s) and rendered a custom
  error page. No equivalent in a static build.
  - TODO: not needed for static output. Re-add only if Astro is switched
    to an SSR adapter.

- **`genai/src/start.ts`** / **`genai/src/router.tsx`** /
  **`genai/src/routeTree.gen.ts`** — TanStack Router/Start bootstrap.
  Replaced by Astro's file-based routing (`src/pages/`).

- **`genai/src/lib/api/example.functions.ts`** — a `createServerFn`
  example (`getGreeting`) using `@tanstack/react-start` + zod.
  - TODO: if server functions are needed, port to an Astro endpoint
    (`src/pages/api/*.ts` with an SSR adapter) or an external API.

- **`genai/src/lib/config.server.ts`** — server-only config reader used
  by the server fn above. Drop with it.

- **`genai/src/lib/error-capture.ts`**, **`error-page.ts`**,
  **`lovable-error-reporting.ts`** — SSR error-capture/reporting and the
  root error/404 boundaries from `__root.tsx`. Astro renders a static
  404 via `src/pages/404.astro` if needed; SSR error capture has no
  static equivalent.

## Lead capture (signup form)

`SignupSection` originally persisted leads to `localStorage` client-side
(no server call) — that behavior is preserved verbatim in
`src/components/SignupSection.tsx`. There was never a server endpoint for
leads, so nothing was dropped there. To actually receive leads, wire the
form `onSubmit` to a real endpoint/service.
