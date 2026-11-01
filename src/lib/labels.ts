const SPECIAL: Record<string, string> = {
  'in-development': 'In development',
  'in-progress': 'In progress',
  'partly-verified': 'Partly verified',
  'needs-review': 'Needs review',
};
/** `in-development` -> `In development`. */
export function statusLabel(value: string): string {
  if (SPECIAL[value]) return SPECIAL[value];
  const spaced = value.replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Lower-case, hyphenated slug used for repo and build pages. */
export function slugify(text: string): string {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g, '');
}
