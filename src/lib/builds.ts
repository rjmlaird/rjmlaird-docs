// src/lib/builds.ts
//
// Build-time access to the builds snapshot (data/builds.json), which mirrors
// GET https://api.rjmlaird.co.uk/v1/builds. Refresh it with `pnpm sync:builds`.
import snapshotJson from "../../data/builds.json";
import type { BuildsSnapshot } from "./builds-core";

export * from "./builds-core";

export const buildsSnapshot = snapshotJson as unknown as BuildsSnapshot;

export const BUILDS_API_URL = "https://api.rjmlaird.co.uk/v1/builds";
