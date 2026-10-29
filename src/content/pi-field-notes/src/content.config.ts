import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tags = z.array(z.string()).default([]);

// Content lives in src/content/<collection>/. The `slug` field becomes the entry id and the URL.
const loader = (collection: string) =>
  glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${collection}` });

const projects = defineCollection({
  loader: loader('projects'),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        slug: z
          .string()
          .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lower-case words joined by hyphens'),
        description: z.string().max(200),
        status: z.enum(['idea', 'in-progress', 'operational', 'archived']),
        tags,
        dateStarted: z.coerce.date(),
        dateUpdated: z.coerce.date(),
        hardware: z.array(z.string()).default([]),
        software: z.array(z.string()).default([]),
        githubUrl: z.url().optional(),
        heroImage: image().optional(),
        heroImageAlt: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((d) => !d.heroImage || d.heroImageAlt, {
        message: 'heroImageAlt is required when heroImage is set',
        path: ['heroImageAlt'],
      }),
});

const buildLogs = defineCollection({
  loader: loader('build-logs'),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    description: z.string().max(200),
    project: reference('projects'),
    date: z.coerce.date(),
    tags,
    stage: z.enum(['planning', 'hardware', 'software', 'testing', 'deployment', 'maintenance']),
    draft: z.boolean().default(false),
  }),
});

const ideas = defineCollection({
  loader: loader('ideas'),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    description: z.string().max(200),
    date: z.coerce.date(),
    tags,
    priority: z.enum(['low', 'medium', 'high']),
    status: z.enum(['idea', 'researching', 'planned']),
    draft: z.boolean().default(false),
  }),
});

const essays = defineCollection({
  loader: loader('essays'),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    description: z.string().max(200),
    date: z.coerce.date(),
    tags,
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, 'build-logs': buildLogs, ideas, essays };
