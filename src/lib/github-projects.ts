// src/lib/github-projects.ts
//
// Build-time access to GitHub Projects (v2) boards. The Astro build never calls
// GitHub: boards come from data/github-projects.json, written by
// `pnpm sync:boards` (scripts/sync-github-projects.mjs) and committed.
import snapshotJson from "../../data/github-projects.json";
import {
  buildBoards,
  type Board,
  type GithubProjectsSnapshot,
} from "./github-projects-core";

export {
  formatDate,
  monthTicks,
  percentAlong,
  type Board,
  type BoardItem,
} from "./github-projects-core";

export const boardsSnapshot = snapshotJson as unknown as GithubProjectsSnapshot;

/** Every board in the snapshot, most recently updated first. */
export async function getBoards(): Promise<Board[]> {
  return buildBoards(boardsSnapshot);
}
