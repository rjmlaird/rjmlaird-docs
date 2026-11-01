import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * Front matter beyond Starlight's own fields. Keep these in step with
 * docs: /contribute/authoring/ and scripts/validate-content.mjs.
 */
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** Lifecycle of the thing the page describes (or of the decision, for ADRs). */
        status: z
          .enum(['active', 'live', 'in-development', 'planned', 'proposed', 'accepted', 'superseded', 'draft', 'deprecated', 'retired'])
          .optional(),
        /** How well the page's claims are evidenced. */
        confidence: z.enum(['verified', 'partly-verified', 'unverified']).optional(),
        /** Service visibility, where the page describes a service. */
        visibility: z.enum(['public', 'restricted', 'internal']).optional(),
        lifecycle: z.enum(['active', 'planned', 'reserved', 'retired']).optional(),
        /** Defaults to needs-review: set to `reviewed` only after a maintainer has checked the page. */
        reviewStatus: z.enum(['reviewed', 'needs-review']).default('needs-review'),
        owner: z.string().optional(),
        reviewCycle: z.string().optional(),
        /** Only set when a review has actually happened. Not the same as Starlight's git-derived lastUpdated. */
        lastReviewed: z.coerce.date().optional(),
        audience: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        /** Diátaxis-style page type, used for filtering and the style guide. */
        kind: z.enum(['guide', 'tutorial', 'reference', 'explanation', 'runbook', 'decision', 'catalogue']).optional(),
      }),
    }),
  }),
};
