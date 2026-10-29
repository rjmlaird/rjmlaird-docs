#!/usr/bin/env node
// scripts/sync-github-repos.mjs
//
// Sync a GitHub user's repositories — details, topics, languages, license,
// stars, and timestamps — into data/github-repos.json.
//
// Usage:
//   export GITHUB_TOKEN=ghp_...   # classic PAT with repo scope
//   pnpm sync:repos
//   node scripts/sync-github-repos.mjs --user rjmlaird --dry-run
//   node scripts/sync-github-repos.mjs --fixture tests/fixtures/github-repos.sample.json --out /tmp/repos.json
//
// Options:
//   --user <login>       GitHub user (default: rjmlaird)
//   --out <file>         Output file (default: data/github-repos.json)
//   --include-private    Also include private repositories (default: public only)
//   --include-forks      Also include forked repositories (default: non-forks only)
//   --dry-run            Report what would change without writing
//   --fixture <file>     Read raw array JSON instead of calling GitHub

import fs from "node:fs";
import path from "node:path";

// Load .env if present
try {
  const dotenv = await import("dotenv");
  dotenv.config();
} catch {
  // dotenv not installed or optional; relies on process.env
}

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const login = option("user", "rjmlaird");
const outFile = option("out", "data/github-repos.json");
const fixture = option("fixture");
const includePrivate = flag("include-private");
const includeForks = flag("include-forks");
const dryRun = flag("dry-run");

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "User-Agent": "rjmlaird-docs-sync",
});

async function fetchRepos(token) {
  const repos = [];
  let page = 1;
  const perPage = 100;

  // Use 'owner' type to fetch both personal and organizational repos if needed, 
  // or endpoint `/users/${login}/repos` for standard user repos.
  while (true) {
    const url = `https://api.github.com/users/${login}/repos?per_page=${perPage}&page=${page}&sort=updated`;
    const res = await fetch(url, { headers: headers(token) });

    if (!res.ok) {
      throw new Error(`GitHub API error ${res.status}: ${(await res.text()).slice(0, 300)}`);
    }

    const batch = await res.json();
    if (!batch.length) break;

    repos.push(...batch);
    if (batch.length < perPage) break;
    page++;
  }

  return repos;
}

function normaliseRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    homepage: repo.homepage,
    isPrivate: repo.private,
    isFork: repo.fork,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    openIssues: repo.open_issues_count,
    defaultBranch: repo.default_branch,
    language: repo.language,
    topics: repo.topics ?? [],
    license: repo.license ? repo.license.spdx_id || repo.license.name : null,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
  };
}

function sameSnapshot(existing, next) {
  // Compare ignoring dynamic sync timestamp
  const { syncedAt: _, ...restExisting } = existing;
  const { syncedAt: __, ...restNext } = next;
  return JSON.stringify(restExisting) === JSON.stringify(restNext);
}

async function main() {
  let rawRepos;

  if (fixture) {
    rawRepos = JSON.parse(fs.readFileSync(fixture, "utf8"));
  } else {
    const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

    if (!token) {
      console.error(
        "Set GITHUB_TOKEN (classic PAT with repo scope to read repositories).",
      );
      process.exit(1);
    }

    console.log(`Fetching GitHub repositories for ${login}…`);
    rawRepos = await fetchRepos(token);
  }

  // Filter out private repos unless --include-private is set
  // Filter out forks unless --include-forks is set
  const wanted = rawRepos.filter((r) => {
    if (!includePrivate && r.private) return false;
    if (!includeForks && r.fork) return false;
    return true;
  });

  const repos = wanted.map(normaliseRepo).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const next = {
    schemaVersion: 1,
    owner: login,
    syncedAt: new Date().toISOString(),
    total: repos.length,
    repositories: repos,
  };

  const existing = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, "utf8")) : null;
  const unchanged = existing && sameSnapshot(existing, next);

  if (!dryRun && !unchanged) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, `${JSON.stringify(next, null, 2)}\n`);
  }

  console.log(
    `\n${dryRun ? "[dry run] " : ""}${repos.length} repository(ies): ` +
      `${unchanged ? "no changes" : dryRun ? "would write" : "wrote"} ${outFile}`,
  );

  const skippedPrivate = rawRepos.filter((r) => r.private && (includePrivate || !includePrivate)).length - (includePrivate ? 0 : rawRepos.filter((r) => r.private).length);
  const skippedForks = rawRepos.filter((r) => r.fork && !includeForks).length;
  
  if (skippedForks > 0) {
    console.log(`${skippedForks} forked repository(ies) skipped (use --include-forks).`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});