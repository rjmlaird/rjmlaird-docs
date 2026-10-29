# Pi Field Notes

Open build logs for Raspberry Pi-based astronomy, environmental sensing, and self-hosted systems.

This repository is a static website built with [Astro](https://astro.build). It documents Raspberry Pi builds, experiments and ideas, with a focus on:

- Astronomy and all-sky imaging
- Environmental sensing and local climate data
- Self-hosted infrastructure, backups and home networking
- Earth-observation and satellite-data experiments
- Science communication and open, reproducible technical documentation

Content is Markdown in Git. There is no database and no CMS.

## Site structure

| Section | Purpose | Folder |
| --- | --- | --- |
| Projects | Complete or substantially developed builds, following a fixed template | `src/content/projects/` |
| Build logs | Short, dated updates as a project progresses | `src/content/build-logs/` |
| Ideas | Concepts and future experiments | `src/content/ideas/` |
| Essays | Longer reflective and science-communication pieces | `src/content/essays/` |
| About | Who writes this and why | `src/pages/about.astro` |

```text
/
├── src/
│   ├── content/           Markdown content, one folder per collection
│   ├── content.config.ts  Content collection schemas (front matter rules)
│   ├── assets/images/     Photographs that Astro optimises
│   ├── components/        Header, footer, SEO tags, badges and so on
│   ├── layouts/           Base page layout
│   ├── lib/               Site settings and content helpers
│   ├── pages/             Routes, RSS feed, robots.txt and the 404 page
│   └── styles/            One global stylesheet with design tokens
├── public/                Files copied as they are: favicon, diagrams, social card
├── scripts/new-project.mjs  Creates new content files from templates
├── docs/                  Authoring, deployment and writing guidance
└── .github/workflows/     GitHub Pages deployment
```

The example content (an all-sky camera plan, one build log, three ideas and one essay) is a **starting template**. It contains no results because none exist yet. Replace or delete it.

## Local development

You need Node.js 22.12 or later.

```bash
npm install
npm run dev        # http://localhost:4321, with drafts visible
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type-check Astro and content only |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run new -- "Title"` | Create a new project (see below) |

Copy `.env.example` to `.env` if you want to set `SITE_URL` or `BASE_PATH` locally.

## First steps after cloning

1. Edit `src/lib/site.ts`: site name, author, description.
2. Fill in the placeholders on `src/pages/about.astro`.
3. Replace `public/og-default.png` with your own 1200 x 630 social card.
4. Replace the name in `LICENSE`.
5. Delete or replace the example content.

## Creating a new project

```bash
npm run new -- "Raspberry Pi weather station" --status idea --tags weather,sensors
```

This creates `src/content/projects/raspberry-pi-weather-station.md` from `docs/project-template.md`, marked `draft: true`. Edit it, remove the guidance comments and set `draft: false` to publish.

The same script creates build logs, ideas and essays:

```bash
npm run new -- "Bench test" --type build-log --project all-sky-camera --stage software
npm run new -- "Soil moisture logger" --type idea
npm run new -- "A year of logging" --type essay
```

Full instructions are in [`docs/authoring.md`](docs/authoring.md).

## Images and diagrams

- **Photographs:** put them in `src/assets/images/`. Astro resizes them and serves modern formats. Resize originals to about 2400 pixels on the long edge before committing.
- **Diagrams:** draw them as SVG and save them in `public/diagrams/`. Add alt text and a text version of the flow.
- **Always** write meaningful alt text. Keep large raw files out of Git.

## Deployment

The site is static, so it works on GitHub Pages, Cloudflare Pages and Netlify. Set `SITE_URL` (and `BASE_PATH` for a GitHub project site) in the host's environment. Step-by-step guides are in [`docs/deployment.md`](docs/deployment.md).

## Features

- Astro content collections with typed front matter and build-time validation
- Dark and light themes, following the system setting, with a manual toggle and no flash on load
- Self-hosted fonts, no third-party requests and no analytics
- Sitemap, RSS feed, `robots.txt`, canonical URLs, Open Graph and Twitter card metadata
- Semantic HTML, a skip link, visible focus styles, reduced-motion support and contrast-checked colours
- Draft support: visible in development, hidden in production
- Reading time calculated automatically

## Licences

- **Code** (templates, scripts, configuration): [MIT](LICENSE). Apache-2.0 is a good alternative if you want an explicit patent grant.
- **Written content and diagrams:** [CC BY-SA 4.0](LICENSE-CONTENT.md).

Check the licence of any photograph, dataset or third-party material before you publish it, and credit it as required.

## Privacy and responsible data handling

- The site sets no cookies and runs no analytics. Its only browser storage is your light or dark theme choice.
- Fonts are served from the site itself, so visitors' browsers contact no one else.
- Do not publish passwords, tokens, API keys, internal addresses or full network layouts. Use placeholders.
- Do not publish your home address or precise coordinates. Describe the area or round the location.
- Strip location metadata (EXIF) from photographs before adding them.
- Be careful with images or recordings that capture other people, vehicles or neighbouring property.
- Check the licence and terms of any dataset you use. Some forbid redistribution.
- Prefer a VPN, tunnel or one-way upload to opening a Raspberry Pi to the internet.

More in [`docs/content-guidelines.md`](docs/content-guidelines.md).
