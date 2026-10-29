# Authoring guide

How to add and edit content. Everything lives in `src/content/` as Markdown.

## Quick reference

| I want to add... | Command | File location |
| --- | --- | --- |
| A project | `npm run new -- "Title"` | `src/content/projects/` |
| A build log | `npm run new -- "Title" --type build-log --project <project-slug>` | `src/content/build-logs/` |
| An idea | `npm run new -- "Title" --type idea` | `src/content/ideas/` |
| An essay | `npm run new -- "Title" --type essay` | `src/content/essays/` |

New files are created with `draft: true`. Drafts show in `npm run dev` and are left out of production builds. Delete the line or set `draft: false` to publish.

## Adding a project

```bash
npm run new -- "Raspberry Pi weather station" --status idea --tags weather,sensors
```

This copies `docs/project-template.md`, fills in the title, slug, status, tags and dates, and writes `src/content/projects/raspberry-pi-weather-station.md`. Open it, read the guidance comments, fill in the sections and delete the comments.

### Project front matter

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Quote it if it contains a colon |
| `slug` | Yes | Lower-case words joined by hyphens. It becomes the URL: `/projects/<slug>/` |
| `description` | Yes | Up to 200 characters; used in lists, search results and social cards |
| `status` | Yes | `idea`, `in-progress`, `operational` or `archived` |
| `tags` | No | A list, such as `[astronomy, sensors]` |
| `dateStarted`, `dateUpdated` | Yes | `YYYY-MM-DD`. Update `dateUpdated` when you make a meaningful change |
| `hardware`, `software` | No | Lists of strings, shown in the project summary |
| `githubUrl` | No | A full URL |
| `heroImage`, `heroImageAlt` | No | The alt text is required if there is an image |
| `draft` | No | Defaults to `false` |

Reading time is calculated from the text, so there is no field for it.

## Adding a build log

A build log is a short, dated update on one project.

```bash
npm run new -- "Bench test of the capture script" --type build-log --project all-sky-camera --stage software
```

`project` must match the `slug` of an existing project, otherwise the build fails with a clear error. Stages are `planning`, `hardware`, `software`, `testing`, `deployment` and `maintenance`.

Write build logs soon after the work, while you still remember what went wrong. Say what you tried, what happened and what you will do next.

## Adding an idea

```bash
npm run new -- "Soil moisture logger" --type idea
```

Ideas have a `priority` (`low`, `medium`, `high`) and a `status` (`idea`, `researching`, `planned`). When an idea becomes a project, create the project and link to it from the idea, or archive the idea by setting `draft: true`.

## Adding an essay

```bash
npm run new -- "What I learned from a year of logging" --type essay
```

Essays have only a title, description, date and tags. They are for reflection and science communication rather than instructions.

## Images

Two places, for two purposes.

**`src/assets/images/`** is for photographs and screenshots. Astro resizes them and converts them to efficient formats at build time. Use it for `heroImage`, and reference images from Markdown with a relative path:

```markdown
![A Raspberry Pi in an enclosure on a fence post.](../../assets/images/enclosure-fence.jpg)
```

**`public/images/`** and **`public/diagrams/`** are copied as they are. Use them for SVG diagrams and for files you want at a fixed address. Reference them from the site root:

```markdown
![The data flow from sensor to dashboard.](/diagrams/weather-flow.svg)
```

Guidelines:

- Always write alt text that says what the image shows or what it is for. Use `alt=""` only for purely decorative images.
- Resize originals before committing: a long edge of 2400 pixels is plenty. Do not commit full-size camera files.
- Prefer SVG for diagrams, and give the file a `<title>` and `<desc>`.
- Keep large binary files, such as raw astronomy frames, out of Git. Link to an archive or a release asset instead.
- Do not publish images with embedded location data. Strip EXIF metadata first.

## Diagrams

Draw them as SVG so they stay sharp and small. Save them in `public/diagrams/`. Next to each diagram, include a text description or a text version of the flow, for readers using screen readers.

## Code blocks

Always state the language after the opening fence so the code is highlighted:

````markdown
```bash
sudo systemctl status allsky-capture
```
````

Name the file a snippet belongs to, in a sentence above it. Do not paste real passwords, tokens or addresses into examples.

## Linking

- Link to other pages with root-relative paths, such as `/projects/all-sky-camera/`. The site adjusts these if it is served from a sub-path.
- Link to a project's build logs from the project page, and back.
- Link to sources and other people's work wherever they helped.

## MDX

Files ending in `.mdx` can use components. Use MDX only where an interactive component is genuinely useful, such as a chart. Plain Markdown is easier to maintain and move.

## Checking your work

```bash
npm run dev        # preview, with drafts
npm run build      # type-check and build; fails on invalid front matter or broken references
npm run lint       # code style
npm run format     # tidy formatting
```
