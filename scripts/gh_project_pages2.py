#!/usr/bin/env python3
"""
gh_project_pages.py - MVP: generate Astro-ready project pages from GitHub repos.

Evidence comes from the GitHub API. An optional .project/project.yml
(or docs/project.yml, .github/project.yml) supplies author-only facts.

Usage:
  export GITHUB_TOKEN=ghp_...        # optional for public repos, needed for private
  python gh_project_pages.py owner/repo [owner/repo2 ...] -o src/content/projects
  python gh_project_pages.py --repos-file projects.txt --ext mdx

Design notes:
  - Output is committed, reviewed content; the Astro build never calls GitHub.
  - Responses are cached with ETags (conditional requests; 304s do not count
    against the primary rate limit). Cache lives in .cache/github/.
  - Pages with `reviewed: true` in their front matter are never overwritten;
    a fresh draft is written to <out>/.drafts/ so you can diff and merge.
  - One failing repo never stops the run; exit code is 1 if any failed.

Requires: Python 3.9+. Optional: pip install pyyaml (needed to read the YAML file).
"""
import argparse, hashlib, json, os, re, sys, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None

API = "https://api.github.com"
YAML_PATHS = [".project/project.yml", "docs/project.yml", ".github/project.yml"]
NA = "Not documented in the repository."


CACHE = Path(".cache/github")
USE_CACHE = True


class RateLimited(Exception):
    pass


def gh(path, raw=False):
    key = CACHE / (hashlib.sha1(f"{path}|{raw}".encode()).hexdigest() + ".json")
    cached = json.loads(key.read_text()) if USE_CACHE and key.exists() else None
    req = urllib.request.Request(API + path)
    req.add_header("Accept", "application/vnd.github.raw+json" if raw else "application/vnd.github+json")
    req.add_header("User-Agent", "gh-project-pages")
    tok = os.environ.get("GITHUB_TOKEN")
    if tok:
        req.add_header("Authorization", f"Bearer {tok}")
    if cached and cached.get("etag"):
        req.add_header("If-None-Match", cached["etag"])
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode("utf-8", "replace")
            if USE_CACHE and r.headers.get("ETag"):
                CACHE.mkdir(parents=True, exist_ok=True)
                key.write_text(json.dumps({"etag": r.headers["ETag"], "body": body}))
            if r.headers.get("X-RateLimit-Remaining") == "0":
                print("  ! rate limit exhausted after this call", file=sys.stderr)
    except urllib.error.HTTPError as e:
        if e.code == 304 and cached:
            body = cached["body"]
        elif e.code in (403, 429) and e.headers.get("X-RateLimit-Remaining") == "0":
            raise RateLimited(f"GitHub rate limit hit; resets at epoch {e.headers.get('X-RateLimit-Reset')}. Set GITHUB_TOKEN.")
        elif e.code in (404, 409):
            return None
        else:
            raise
    return body if raw else json.loads(body)


def q(s):  # safe YAML scalar
    return json.dumps(s if s is not None else "", ensure_ascii=False)


def day(iso):
    return iso[:10] if iso else ""


def gather(full):
    repo = gh(f"/repos/{full}")
    if not repo:
        sys.exit(f"Cannot access {full}")
    branch = repo["default_branch"]
    tree = gh(f"/repos/{full}/git/trees/{branch}?recursive=1") or {"tree": []}
    paths = [t["path"] for t in tree["tree"] if t["type"] == "blob"]
    meta, meta_path = {}, None
    for p in YAML_PATHS:
        if p in paths:
            txt = gh(f"/repos/{full}/contents/{p}", raw=True)
            if txt and yaml:
                meta, meta_path = yaml.safe_load(txt) or {}, p
            elif txt:
                print(f"  ! {p} found but pyyaml missing; ignoring", file=sys.stderr)
            break
    readme = gh(f"/repos/{full}/readme", raw=True) or ""
    issues = [i for i in (gh(f"/repos/{full}/issues?state=open&per_page=30") or []) if "pull_request" not in i]
    prs = gh(f"/repos/{full}/pulls?state=open&per_page=30") or []
    evidence = ["GitHub repository metadata", "file tree", "commits", "open issues and PRs", "releases"]
    if readme:
        evidence.append("README")
    evidence += [p for p in paths if re.match(r"^(package\.json|pyproject\.toml|requirements\.txt|Cargo\.toml|go\.mod)$", p)]
    if meta_path:
        evidence.append(meta_path)
    return dict(
        evidence=evidence,
        repo=repo, paths=paths, meta=meta, meta_path=meta_path, readme=readme,
        langs=gh(f"/repos/{full}/languages") or {},
        commits=gh(f"/repos/{full}/commits?per_page=10") or [],
        releases=gh(f"/repos/{full}/releases?per_page=5") or [],
        issues=issues, prs=prs,
        pkg=json.loads(gh(f"/repos/{full}/contents/package.json", raw=True) or "{}") if "package.json" in paths else {},
        reqs=(gh(f"/repos/{full}/contents/requirements.txt", raw=True) or "") if "requirements.txt" in paths else "",
    )


def first_paragraph(md):
    for block in re.split(r"\n\s*\n", md):
        b = block.strip()
        if b and not b.startswith(("#", "![", "[![", "<", "```", "|", "-", "*")):
            return re.sub(r"\s+", " ", b)
    return ""


def has(paths, *pats):
    return [p for p in paths if any(re.search(x, p, re.I) for x in pats)]


def infer_status(repo, meta):
    if meta.get("status"):
        return meta["status"]
    if repo.get("archived"):
        return "archived"
    age = (datetime.now(timezone.utc) - datetime.fromisoformat(repo["pushed_at"].replace("Z", "+00:00"))).days
    return "in-progress" if age < 90 else "maintained"


def build(full, d):
    r, m, paths = d["repo"], d["meta"], d["paths"]
    url = r["html_url"]
    title = m.get("title") or r["name"].replace("-", " ").replace("_", " ").title()
    para = first_paragraph(d["readme"])
    summary = m.get("summary") or r.get("description") or para[:200] or NA
    status = infer_status(r, m)
    tags = m.get("tags") or r.get("topics") or []
    links = [("Repository", url)]
    if r.get("homepage"):
        links.append(("Homepage", r["homepage"]))
    links += [(l["label"], l["url"]) for l in m.get("links", [])]

    fm = ["---", f"title: {q(title)}", f'slug: {q(r["name"])}', f"summary: {q(summary)}",
          f"status: {q(status)}", f'started: {day(m.get("started") or r["created_at"])}',
          f'updated: {day(m.get("updated") or r["pushed_at"])}', "tags:"]
    fm += [f"  - {q(t)}" for t in tags] or ["  []"]
    fm += ["disciplines:"] + ([f"  - {q(t)}" for t in m.get("disciplines", [])] or ["  []"])
    fm += ["github:", f"  url: {q(url)}", f'  owner: {q(r["owner"]["login"])}', f'  repo: {q(r["name"])}',
           "links:"] + [f"  - label: {q(a)}\n    url: {q(b)}" for a, b in links]
    fm += ["reviewed: false", "source:", f'  generated_at: {datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")}',
           f'  default_branch: {q(r["default_branch"])}',
           f'  metadata_file: {q(d["meta_path"] or "")}', "  evidence:"]
    fm += [f"    - {q(e)}" for e in d["evidence"]] + ["---", ""]

    out = ["\n".join(fm)]

    # Overview
    tot = sum(d["langs"].values()) or 1
    langs = ", ".join(f"{k} ({v * 100 // tot}%)" for k, v in sorted(d["langs"].items(), key=lambda x: -x[1])[:5])
    out += ["## Overview", "", summary, "",
            f"Primary languages: {langs or 'unknown'}. Licence: {(r.get('license') or {}).get('spdx_id') or 'none declared'}.",
            f"Audience: {m['audience']} *(author-supplied)*" if m.get("audience") else "", ""]

    # Problem
    out += ["## Problem and motivation", "",
            para if para else NA, "",
            "*Source: README opening paragraph.*" if para else "", ""]
    if m.get("notes"):
        out += [m["notes"].strip(), "", "*Author-supplied.*", ""]

    # Objectives
    out += ["## Objectives", ""]
    out += [f"- {o}" for o in m["objectives"]] + ["", "*Author-supplied.*"] if m.get("objectives") else [NA]
    out += [""]

    # Technical implementation
    deps = list((d["pkg"].get("dependencies") or {}).keys())[:12]
    dev = list((d["pkg"].get("devDependencies") or {}).keys())[:8]
    rq = [re.split(r"[=<>~\[ ]", l.strip())[0] for l in d["reqs"].splitlines() if l.strip() and not l.startswith("#")][:12]
    manifests = has(paths, r"^(package\.json|pyproject\.toml|requirements\.txt|Cargo\.toml|go\.mod)$")
    ci = has(paths, r"^\.github/workflows/")
    docker = has(paths, r"(^|/)Dockerfile$", r"docker-compose", r"wrangler\.(toml|json)", r"vercel\.json", r"netlify\.toml")
    top = sorted({p.split("/")[0] for p in paths})[:20]
    rows = [("Languages", langs or "unknown", "GitHub language stats"),
            ("Manifests", ", ".join(f"`{x}`" for x in manifests) or "none found", "file tree"),
            ("Runtime deps", ", ".join(deps + rq) or "none detected", "package.json / requirements.txt"),
            ("Dev deps", ", ".join(dev) or "none detected", "package.json"),
            ("CI", ", ".join(f"`{x}`" for x in ci) or "none found", ".github/workflows"),
            ("Deployment config", ", ".join(f"`{x}`" for x in docker) or "none found", "file tree"),
            ("Top-level layout", ", ".join(f"`{x}`" for x in top), "file tree")]
    out += ["## Technical implementation", "", "| Area | Implementation | Evidence |", "|---|---|---|"]
    out += [f"| {a} | {b} | {c} |" for a, b, c in rows]
    out += ["", f"Scripts: {', '.join(f'`{k}`' for k in d['pkg'].get('scripts', {}))}" if d["pkg"].get("scripts") else "", ""]

    # Status
    last = d["commits"][0]["commit"] if d["commits"] else None
    out += ["## Current status", "", f"- Status: **{status}**" + (" *(author-supplied)*" if m.get("status") else " *(inferred from activity)*"),
            f"- Last push: {day(r['pushed_at'])}",
            f"- Latest commit: {last['message'].splitlines()[0]} ({day(last['author']['date'])})" if last else "- No commits visible",
            f"- Open issues: {len(d['issues'])}; open pull requests: {len(d['prs'])}",
            f"- Latest release: {d['releases'][0]['tag_name']} ({day(d['releases'][0]['published_at'])})" if d["releases"] else "- Releases: none published",
            "", "Recent commits:", ""]
    out += [f"- {c['commit']['message'].splitlines()[0]} ({day(c['commit']['author']['date'])})" for c in d["commits"][:5]] + [""]

    # Roadmap
    out += ["## Roadmap", ""]
    if m.get("roadmap"):
        out += ["| Phase | Status | Items | Evidence |", "|---|---|---|---|"]
        out += [f"| {p['phase']} | {p.get('status', '')} | {'; '.join(p.get('items', []))} | Author-supplied |" for p in m["roadmap"]]
    elif d["issues"]:
        out += ["| Issue | Labels |", "|---|---|"]
        out += [f"| [#{i['number']}]({i['html_url']}) {i['title']} | {', '.join(l['name'] for l in i['labels'])} |" for i in d["issues"][:10]]
    else:
        out += ["No public roadmap is currently documented in the repository."]
    out += [""]

    # Documentation quality (heuristic)
    rl = len(d["readme"])
    setup = bool(re.search(r"install|getting started|usage|quick ?start|setup", d["readme"], re.I))
    arch = has(paths, r"architecture", r"^docs/")
    contrib = has(paths, r"contributing")
    tests = has(paths, r"(^|/)(tests?|__tests__)/", r"\.(test|spec)\.")
    lvl = lambda ok, strong=False: "Strong" if strong else ("Adequate" if ok else "Absent")
    out += ["## Documentation quality", "", "| Area | Assessment | Notes |", "|---|---|---|",
            f"| README | {'Strong' if rl > 2500 else 'Adequate' if rl > 600 else 'Limited' if rl else 'Absent'} | {rl} characters |",
            f"| Setup instructions | {lvl(setup)} | Keyword check on README |",
            f"| Architecture documentation | {lvl(bool(arch))} | {arch[0] if arch else 'No docs/ or architecture file'} |",
            f"| Contribution guidance | {lvl(bool(contrib))} | {contrib[0] if contrib else 'No CONTRIBUTING file'} |",
            f"| Testing documentation | {lvl(bool(tests))} | {f'{len(tests)} test files found' if tests else 'No test files found'} |",
            "", "*Heuristic assessment; review before publishing.*", ""]

    # Links
    out += ["## Repository links", "", f"- Repository: {url}", f"- Issues: {url}/issues", f"- Pull requests: {url}/pulls"]
    if d["releases"]:
        out.append(f"- Releases: {url}/releases")
    out.append("")

    # Evidence log
    out += ["<!--", "Evidence log",
            f"Metadata file: {d['meta_path'] or 'none'}",
            f"Files inspected: GitHub metadata, README, file tree, {', '.join(manifests) or 'no manifests'}, commits, issues, PRs, releases",
            "Inferred: status (if not in YAML), documentation ratings, problem statement (README opener)",
            "-->", ""]
    return "\n".join(x for x in out if x is not None)


def is_reviewed(path):
    if not path.exists():
        return False
    head = path.read_text(encoding="utf-8").split("---")[1:2]
    return bool(head and re.search(r"^reviewed:\s*true\s*$", head[0], re.M))


def main():
    global USE_CACHE
    ap = argparse.ArgumentParser()
    ap.add_argument("repos", nargs="*", help="owner/repo")
    ap.add_argument("--repos-file", help="text file, one owner/repo per line (# comments allowed)")
    ap.add_argument("-o", "--out", default="src/content/projects")
    ap.add_argument("--ext", choices=["md", "mdx"], default="md")
    ap.add_argument("--no-cache", action="store_true")
    ap.add_argument("--force", action="store_true", help="overwrite pages marked reviewed: true")
    a = ap.parse_args()
    USE_CACHE = not a.no_cache
    repos = list(a.repos)
    if a.repos_file:
        repos += [l.split("#")[0].strip() for l in Path(a.repos_file).read_text().splitlines() if l.split("#")[0].strip()]
    if not repos:
        sys.exit("No repositories given.")
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    failed = []
    for full in repos:
        print(f"-> {full}")
        try:
            d = gather(full)
            dest = out / f"{d['repo']['name']}.{a.ext}"
            page = build(full, d)
            if is_reviewed(dest) and not a.force:
                dest = out / ".drafts" / dest.name
                dest.parent.mkdir(exist_ok=True)
                print("   existing page is reviewed; writing draft instead")
            dest.write_text(page, encoding="utf-8")
            print(f"   wrote {dest}")
        except RateLimited as e:
            print(f"   ! {e}", file=sys.stderr)
            failed.append(full)
            break
        except Exception as e:
            print(f"   ! failed: {e}", file=sys.stderr)
            failed.append(full)
    if failed:
        print(f"Failed: {', '.join(failed)}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
