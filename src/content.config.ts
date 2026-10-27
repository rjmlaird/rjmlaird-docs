// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * SHARED HELPERS
 *
 * Allow omitted, null or empty optional URL fields.
 */

const optionalUrl = z.preprocess(
  (value) => {
    if (value == null) return undefined;

    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    }

    return value;
  },
  z.string().url().optional(),
);

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
 * PROJECTS
 *
 * Source: src/content/projects/
 *
 * Use entry.id for routing and lookups.
 * Do not require a separate slug field in the validated data.
 */

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),

  schema: base.extend({
    visibility: z
      .enum(["public", "internal", "private"])
      .default("public"),

    audience: z.array(z.string()).default(["developer"]),

    repository: optionalUrl,
    liveUrl: optionalUrl,
    docsUrl: z.string().optional(),
    stagingUrl: optionalUrl,

    version: z.string().optional(),
    docVersion: z.string().optional(),

    stack: z.array(z.string()).default([]),

    relatedProjects: z.array(z.string()).default([]),
    relatedPages: z.array(z.string()).default([]),
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
 * Exclude README files because they describe the archive rather
 * than serving as documentation entries.
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
 */

export const collections = {
  guides,
  projects,
  reference,
  operations,
  archive,
};
