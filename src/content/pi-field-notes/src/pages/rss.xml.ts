import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublished } from '../lib/content';
import { SITE, url } from '../lib/site';

export async function GET(context: APIContext) {
  const [projects, logs, ideas, essays] = await Promise.all([
    getPublished('projects'),
    getPublished('build-logs'),
    getPublished('ideas'),
    getPublished('essays'),
  ]);

  const items = [
    ...projects.map((e) => ({
      title: `Project: ${e.data.title}`,
      description: e.data.description,
      pubDate: e.data.dateUpdated,
      link: url(`/projects/${e.id}/`),
      categories: e.data.tags,
    })),
    ...logs.map((e) => ({
      title: `Build log: ${e.data.title}`,
      description: e.data.description,
      pubDate: e.data.date,
      link: url(`/build-logs/${e.id}/`),
      categories: e.data.tags,
    })),
    ...ideas.map((e) => ({
      title: `Idea: ${e.data.title}`,
      description: e.data.description,
      pubDate: e.data.date,
      link: url(`/ideas/${e.id}/`),
      categories: e.data.tags,
    })),
    ...essays.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.date,
      link: url(`/essays/${e.id}/`),
      categories: e.data.tags,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items,
    customData: `<language>${SITE.language}</language>`,
  });
}
