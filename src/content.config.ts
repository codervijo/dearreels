// src/content.config.ts
// v1.B content surface. One collection per URL hub (/questions/, /guides/,
// /essays/) — the collection name IS the hub path segment, so
// src/pages/[hub]/[slug].astro can render all three. See docs/seo-plan.md.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const page = z.object({
  // <title> tag (the "| Dearreels" suffix is added by SeoHead)
  title: z.string().max(60),
  description: z.string().max(160),
  h1: z.string(),
  eyebrow: z.string(),
  // one-line teaser for hub/related cards
  summary: z.string(),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  // ordering on hub pages / related lists
  order: z.number().default(100),
});

const collection = (hub: string) =>
  defineCollection({
    loader: glob({ pattern: "*.md", base: `./src/content/${hub}` }),
    schema: page,
  });

export const collections = {
  questions: collection("questions"),
  guides: collection("guides"),
  essays: collection("essays"),
};
