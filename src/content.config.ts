// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * SHARED DOCUMENT METADATA
 */

const base = z.object({
  title: z.string(),

  description: z.string().default(""),
  status: z.string().default("active"),

  reviewStatus: z
    .enum(["reviewed", "needs-review"])
    .default("needs-review"),

  owner: z.string().default("Ryan Laird"),
  lastReviewed: z.coerce.date().optional(),

  tags: z.array(z.string()).default([]),
});

/**
 * GUIDES
 *
 * Source: src/content/guides/
 */

const guides = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/guides",
  }),

  schema: base.extend({
    audience: z.array(z.string()).default([]),
  }),
});

/**
 * REFERENCE
 *
 * Source: src/content/reference/
 */

const reference = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/reference",
  }),

  schema: base,
});

/**
 * OPERATIONS
 *
 * Source: src/content/operations/
 */

const operations = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/operations",
  }),

  schema: base,
});

/**
 * ARCHIVE
 *
 * Source: archive/ at the repository root.
 *
 * README files describe the archive itself rather than serving as
 * documentation entries, so they are excluded.
 */

const archive = defineCollection({
  loader: glob({
    pattern: [
      "**/*.{md,mdx}",
      "!**/README.md",
      "!**/README.mdx",
      "!**/readme.md",
      "!**/readme.mdx",
    ],
    base: "./archive",
  }),

  schema: base,
});

/**
 * COLLECTION REGISTRATION
 *
 * Repositories are not a content collection. They are built directly
 * from data/github-repos.json (see src/pages/repos/).
 */

export const collections = {
  guides,
  reference,
  operations,
  archive,
};