# Deployment guide

The site builds to plain static files in `dist/`. Any static host will serve it. This guide covers GitHub Pages and Cloudflare Pages, with a note on Netlify.

## Settings that matter

Two environment variables control how absolute URLs are built. Both are optional locally.

| Variable | Purpose | Example |
| --- | --- | --- |
| `SITE_URL` | The public address, with no trailing slash. Used for canonical links, the sitemap, the RSS feed and social cards. | `https://notes.example.org` |
| `BASE_PATH` | The path the site is served from. Use `/` for a custom domain or a root deployment. | `/` or `/pi-field-notes/` |

If you forget `SITE_URL`, the build still works, but canonical URLs and the sitemap point to `https://example.com`.

Before the first deploy, also:

1. Set `SITE.author` and `SITE.name` in `src/lib/site.ts`.
2. Replace `public/og-default.png` (1200 x 630) with your own social card if you want one.
3. Fill in the placeholders on the About page.

Requirements: Node.js 22.12 or later and npm.

## GitHub Pages

The repository includes `.github/workflows/deploy.yml`, which builds the site and publishes it on each push to `main`.

1. Push the repository to GitHub.
2. Go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Go to **Settings > Secrets and variables > Actions > Variables** and add:
   - `SITE_URL`
   - `BASE_PATH`
4. Push to `main`, or run the workflow manually from the **Actions** tab.

Choose the values for your case:

| Case | `SITE_URL` | `BASE_PATH` |
| --- | --- | --- |
| Project site at `https://name.github.io/repo/` | `https://name.github.io` | `/repo/` |
| User or organisation site at `https://name.github.io/` | `https://name.github.io` | `/` |
| Custom domain | `https://notes.example.org` | `/` |

For a custom domain, add the domain under **Settings > Pages**, and create a DNS record as GitHub instructs. Enable **Enforce HTTPS**. To keep the domain setting across deploys, add a file named `CNAME` containing the domain to `public/`.

## Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages** and create a **Pages** project connected to your Git repository.
2. Use these build settings:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

3. Under **Settings > Variables and Secrets**, add `NODE_VERSION` set to `22`, and `SITE_URL` set to your public address. Leave `BASE_PATH` unset.
4. Deploy. Pull requests get preview URLs automatically. These previews will show canonical links to `SITE_URL`, which is expected.
5. Add a custom domain under **Custom domains** if you want one.

## Netlify

`netlify.toml` is included. Connect the repository in Netlify, add `SITE_URL` under **Site configuration > Environment variables**, and deploy. The build command and publish directory are already set.

## Checking a deployment

- Open `/rss.xml`, `/sitemap-index.xml` and `/robots.txt` and check that the URLs use your real address.
- View the source of a page and look for the `canonical` and `og:image` tags.
- Visit a made-up address to confirm the 404 page appears.
- Share a page link in a chat app to see the social card.
- Run a Lighthouse audit in your browser for performance and accessibility.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Pages load without styles | `BASE_PATH` does not match where the site is served |
| Links to `/projects/` return 404 on a project site | `BASE_PATH` is `/` but the site is under `/repo/` |
| Sitemap lists `example.com` | `SITE_URL` is not set in the build environment |
| Build fails on content | Read the message; it names the file and field. Common causes are an invalid `status` or a build log whose `project` does not exist |
| The social card does not update | Platforms cache cards. Use their debugger to refresh |
