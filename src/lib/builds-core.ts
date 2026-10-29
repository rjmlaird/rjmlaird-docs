// src/lib/builds-core.ts
//
// Pure helpers for the "builds" model: labs, tools and apps published by the
// RJM Laird ecosystem. Source of truth: GET https://api.rjmlaird.co.uk/v1/builds
// (snapshotted into data/builds.json by `pnpm sync:builds`).
//
// Keep this file free of runtime imports so it can be unit-tested directly.

export type BuildKind = "labs" | "tools" | "apps";
export type BuildType = "lab" | "tool" | "app";

export interface BuildGroup {
  id: string;
  name: string;
  blurb?: string;
}

export interface BuildStatusMeta {
  label: string;
  order: number;
}

export interface BuildCatalogue {
  schemaVersion: number;
  origin: string;
  repository: string;
  sourceRef: string;
  groups: BuildGroup[];
  statuses: Record<string, BuildStatusMeta>;
}

export interface Build {
  id: string;
  sourceId: string;
  type: BuildType;
  title: string;
  description: string;
  group: string;
  tech: string[];
  status: string;
  updated: string;
  repository: string;
  // Absent for planned builds that have no live surface or source yet.
  path?: string;
  url?: string;
  sourcePath?: string;
  source?: string;
}

export interface BuildsSnapshot {
  schemaVersion: number;
  syncedAt?: string;
  source?: string;
  total: number;
  catalogues: Partial<Record<BuildKind, BuildCatalogue>>;
  builds: Build[];
}

export interface KindMeta {
  kind: BuildKind;
  type: BuildType;
  label: string;
  singular: string;
  blurb: string;
}

export const KINDS: KindMeta[] = [
  {
    kind: "labs",
    type: "lab",
    label: "Labs",
    singular: "Lab",
    blurb: "Interactive science and engineering demonstrations for exploring ideas.",
  },
  {
    kind: "tools",
    type: "tool",
    label: "Tools",
    singular: "Tool",
    blurb: "Stable, bookmarkable calculators, converters and focused utilities.",
  },
  {
    kind: "apps",
    type: "app",
    label: "Apps",
    singular: "App",
    blurb: "Larger dashboards, planners and personal apps.",
  },
];

const TYPE_TO_KIND: Record<BuildType, BuildKind> = {
  lab: "labs",
  tool: "tools",
  app: "apps",
};

export function kindMeta(kind: string): KindMeta | undefined {
  return KINDS.find((k) => k.kind === kind);
}

/** The route segment for a build, e.g. "apps" for id "apps/astrodash". */
export function kindOf(build: Pick<Build, "id" | "type">): BuildKind {
  const fromId = build.id.split("/")[0];
  return kindMeta(fromId) ? (fromId as BuildKind) : TYPE_TO_KIND[build.type];
}

/** The slug within its kind, e.g. "astrodash". */
export function slugOf(build: Pick<Build, "id" | "sourceId">): string {
  return build.sourceId || build.id.split("/").slice(1).join("/");
}

export function buildHref(build: Pick<Build, "id" | "type" | "sourceId">): string {
  return `/builds/${kindOf(build)}/${slugOf(build)}/`;
}

const FALLBACK_STATUS_ORDER: Record<string, number> = {
  active: 1,
  "in-progress": 2,
  planned: 3,
  archived: 4,
};

function titleCase(value: string): string {
  const spaced = value.replace(/[-_]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function statusMeta(
  snapshot: BuildsSnapshot,
  kind: BuildKind,
  status: string,
): BuildStatusMeta {
  const fromCatalogue = snapshot.catalogues[kind]?.statuses[status];
  if (fromCatalogue) return fromCatalogue;

  // Labs have no catalogue yet, so borrow the shared status vocabulary.
  for (const catalogue of Object.values(snapshot.catalogues)) {
    const shared = catalogue?.statuses[status];
    if (shared) return shared;
  }

  return { label: titleCase(status), order: FALLBACK_STATUS_ORDER[status] ?? 99 };
}

export function compareBuilds(snapshot: BuildsSnapshot) {
  return (a: Build, b: Build): number => {
    const byStatus =
      statusMeta(snapshot, kindOf(a), a.status).order -
      statusMeta(snapshot, kindOf(b), b.status).order;

    return byStatus || a.title.localeCompare(b.title, "en-GB");
  };
}

export function sortedBuilds(snapshot: BuildsSnapshot): Build[] {
  return [...snapshot.builds].sort(compareBuilds(snapshot));
}

export function buildsOfKind(snapshot: BuildsSnapshot, kind: BuildKind): Build[] {
  return sortedBuilds(snapshot).filter((b) => kindOf(b) === kind);
}

export function findBuild(
  snapshot: BuildsSnapshot,
  kind: string,
  slug: string,
): Build | undefined {
  return snapshot.builds.find((b) => kindOf(b) === kind && slugOf(b) === slug);
}

export function groupName(snapshot: BuildsSnapshot, build: Build): string {
  const group = snapshot.catalogues[kindOf(build)]?.groups.find((g) => g.id === build.group);
  return group?.name ?? titleCase(build.group);
}

export interface BuildSection {
  id: string;
  title: string;
  blurb?: string;
  href?: string;
  builds: Build[];
}

/** Sections for a single kind, one per catalogue group (catalogue order). */
export function sectionsByGroup(snapshot: BuildsSnapshot, kind: BuildKind): BuildSection[] {
  const builds = buildsOfKind(snapshot, kind);
  const groups = snapshot.catalogues[kind]?.groups ?? [];
  const known = new Set(groups.map((g) => g.id));

  const sections: BuildSection[] = groups.map((g) => ({
    id: g.id,
    title: g.name,
    blurb: g.blurb,
    builds: builds.filter((b) => b.group === g.id),
  }));

  const other = builds.filter((b) => !known.has(b.group));
  if (other.length > 0) sections.push({ id: "other", title: "Other", builds: other });

  return sections.filter((s) => s.builds.length > 0);
}

/** One section per kind (labs, tools, apps) for the main builds index. */
export function sectionsByKind(snapshot: BuildsSnapshot): BuildSection[] {
  return KINDS.map((k) => ({
    id: k.kind,
    title: k.label,
    blurb: k.blurb,
    href: `/builds/${k.kind}/`,
    builds: buildsOfKind(snapshot, k.kind),
  }));
}

function normaliseRepoUrl(url: string | undefined): string {
  return (url ?? "").trim().toLowerCase().replace(/\.git$/, "").replace(/\/+$/, "");
}

/** Builds whose source repository matches a repo record's repository URL. */
export function buildsForRepository(snapshot: BuildsSnapshot, repositoryUrl?: string): Build[] {
  const wanted = normaliseRepoUrl(repositoryUrl);
  if (!wanted) return [];
  return sortedBuilds(snapshot).filter((b) => normaliseRepoUrl(b.repository) === wanted);
}

export function countByStatus(builds: Build[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const b of builds) counts[b.status] = (counts[b.status] ?? 0) + 1;
  return counts;
}

export function formatDay(iso: string | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
