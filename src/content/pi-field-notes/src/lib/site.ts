// Edit this file to rename the site or change its metadata.
export const SITE = {
  name: 'Pi Field Notes',
  tagline:
    'Open build logs for Raspberry Pi-based astronomy, environmental sensing, and self-hosted systems.',
  description:
    'Build logs, guides and ideas for Raspberry Pi projects: all-sky imaging, environmental sensing, self-hosted infrastructure and Earth-observation experiments.',
  author: 'Your Name',
  language: 'en-GB',
  // A 1200x630 PNG in public/ used when a page has no image of its own.
  defaultOgImage: '/og-default.png',
  // Optional: set to your handle (for example "@name") to add twitter:site.
  twitterHandle: '',
};

export const NAV = [
  { href: '/projects/', label: 'Projects' },
  { href: '/build-logs/', label: 'Build logs' },
  { href: '/ideas/', label: 'Ideas' },
  { href: '/essays/', label: 'Essays' },
  { href: '/about/', label: 'About' },
];

/** Prefix a site path with the configured base, so links work on project sites. */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
