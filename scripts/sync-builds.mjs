#!/usr/bin/env node
// scripts/sync-builds.mjs
//
// Snapshot the builds API (labs, tools and apps) into data/builds.json.
//
//   curl -X GET 'https://api.rjmlaird.co.uk/v1/builds' -H 'accept: application/json'
//
// The Astro build reads the committed snapshot and never calls the API.
//
// Usage:
//   pnpm sync:builds
//   node scripts/sync-builds.mjs --dry-run
//   node scripts/sync-builds.mjs --fixture path/to/response.json --out /tmp/builds.json
//
// Options:
//   --url <url>       API endpoint (default: https://api.rjmlaird.co.uk/v1/builds)
//   --out <file>      Output file (default: data/builds.json)
//   --dry-run         Report what would change without writing
//   --fixture <file>  Read a saved API response instead of calling the API

import fs from "node:fs";
import path from "node:path";
import { sameBuilds, validateBuilds } from "./lib/builds.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const url = option("url", "https://api.rjmlaird.co.uk/v1/builds");
const outFile = option("out", "data/builds.json");
const fixture = option("fixture");
const dryRun = flag("dry-run");

async function main() {
  let data;

  if (fixture) {
    data = JSON.parse(fs.readFileSync(fixture, "utf8"));
  } else {
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}`);
    data = await res.json();
  }

  const problems = validateBuilds(data);
  if (problems.length > 0) {
    throw new Error(`Unexpected builds response:\n- ${problems.join("\n- ")}`);
  }

  const next = { syncedAt: new Date().toISOString(), source: url, ...data };
  const existing = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, "utf8")) : null;
  const unchanged = existing && sameBuilds(existing, next);

  if (!dryRun && !unchanged) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, `${JSON.stringify(next, null, 2)}\n`);
  }

  const counts = {};
  for (const b of data.builds) counts[b.type] = (counts[b.type] ?? 0) + 1;

  console.log(
    `${dryRun ? "[dry run] " : ""}${data.builds.length} builds (${Object.entries(counts)
      .map(([type, n]) => `${n} ${type}`)
      .join(", ")}): ${unchanged ? "no changes" : dryRun ? "would write" : "wrote"} ${outFile}`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
