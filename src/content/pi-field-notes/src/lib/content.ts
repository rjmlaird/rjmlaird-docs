import { getCollection, type CollectionEntry } from 'astro:content';

type Name = 'projects' | 'build-logs' | 'ideas' | 'essays';

/** Drafts are visible in `npm run dev` and hidden in production builds. */
export async function getPublished<T extends Name>(name: T): Promise<CollectionEntry<T>[]> {
  return getCollection(name, (entry) => (import.meta.env.PROD ? !entry.data.draft : true));
}

/** Estimated reading time in minutes, ignoring fenced code blocks. */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);

export const isoDate = (date: Date): string => date.toISOString().slice(0, 10);

export const byDateDesc = <T extends { data: { date: Date } }>(a: T, b: T): number =>
  b.data.date.getTime() - a.data.date.getTime();

export const STATUS_LABELS: Record<string, string> = {
  idea: 'Idea',
  researching: 'Researching',
  planned: 'Planned',
  'in-progress': 'In progress',
  operational: 'Operational',
  archived: 'Archived',
};

export const STAGE_LABELS: Record<string, string> = {
  planning: 'Planning',
  hardware: 'Hardware',
  software: 'Software',
  testing: 'Testing',
  deployment: 'Deployment',
  maintenance: 'Maintenance',
};
