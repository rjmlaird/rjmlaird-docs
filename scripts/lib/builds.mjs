// scripts/lib/builds.mjs
// Validation and comparison helpers for the builds API snapshot.

const TYPES = new Set(["lab", "tool", "app"]);

/** Returns a list of human-readable problems; empty means the response looks usable. */
export function validateBuilds(data) {
  const problems = [];

  if (!data || typeof data !== "object") return ["response is not a JSON object"];
  if (data.schemaVersion !== 1) problems.push(`unsupported schemaVersion ${data.schemaVersion}`);
  if (!Array.isArray(data.builds)) return [...problems, "builds is not an array"];
  if (typeof data.total === "number" && data.total !== data.builds.length) {
    problems.push(`total (${data.total}) does not match builds.length (${data.builds.length})`);
  }

  const seen = new Set();

  for (const [i, b] of data.builds.entries()) {
    const label = b?.id ?? `builds[${i}]`;
    for (const key of ["id", "sourceId", "type", "title", "status"]) {
      if (typeof b?.[key] !== "string" || !b[key]) problems.push(`${label}: missing ${key}`);
    }
    if (b?.type && !TYPES.has(b.type)) problems.push(`${label}: unknown type "${b.type}"`);
    if (b?.id && seen.has(b.id)) problems.push(`${label}: duplicate id`);
    seen.add(b?.id);
  }

  return problems;
}

/** True when two snapshots are identical apart from the syncedAt stamp. */
export function sameBuilds(a, b) {
  const strip = (s) => JSON.stringify({ ...s, syncedAt: null });
  return strip(a) === strip(b);
}
