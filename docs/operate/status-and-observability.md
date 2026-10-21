---
id: observability-status
title: Observability, status and incident response
description: How the health of the ecosystem is monitored, how status is communicated and what to do when something breaks. Mostly proposed; little is confirmed.
sidebar_position: 10
status: Proposed
confidence: Unverified
last_reviewed: 2026-10-11
---

Good observability for a small ecosystem means knowing quickly that something is broken, finding out why, and telling the right people. Almost none of that is documented as in place, so this page is mainly a proposal and a list of questions.

:::info[Status: Proposed]
No monitoring, error-tracking, analytics or status tooling is confirmed. Candidate tools below are options to evaluate, not decisions.
:::

## What exists today

| Capability | Status |
| --- | --- |
| Build failure notification for the docs | GitHub Actions run status only |
| Worker logs and metrics | Cloudflare provides these for Workers. The services Workers emit structured JSON logs with request, correlation and event identifiers and redact emails and tokens; where the logs are read is to confirm |
| Uptime monitoring | To confirm |
| Error tracking | To confirm |
| Public status page | Proposed (`status`); no confirmed implementation |
| Analytics | To confirm |

## Proposed approach

### Health checks

Each service should offer one cheap endpoint that returns whether it is healthy. The API template in these docs already sketches `GET /status` returning `ok` and `version`; adopt a consistent form such as `GET /v1/status` across every Worker.

Each catalogue entry says whether a service is public. Only public services may publish a health URL, and restricted services' checks stay private. Never list internal health or monitoring URLs in public documentation.

### Logging

- Log events, not secrets or personal data.
- Include a request or event identifier so a failed webhook can be traced from provider to consumer.
- Keep retention short unless a legal or business reason says otherwise.

### Status communication

Host any public status page **outside** the infrastructure it reports on. A status page that goes down with the thing it monitors tells nobody anything. The page is curated: it reports a service state, drawn from the catalogue's public services, not raw metrics or logs. See [status](../catalogue/first-party/status.md).

### Alerting

Alert on a small number of things you would act on at once: webhook failures, a failed scheduled sync, and the public sites being unreachable. Too many alerts will be ignored.

## Incident response

The full guide is [Incident response](incident-response.md). A pragmatic process for a single maintainer:

1. **Detect.** An alert, a failed workflow run or a report.
2. **Assess.** What is affected, and is any personal data involved?
3. **Contain.** Roll back, disable a route or rotate a secret.
4. **Communicate.** Update the status page if public services are affected. If personal data may have been exposed, consider legal reporting duties promptly.
5. **Fix and verify.**
6. **Review.** Write a short note. If the cause was an architectural weakness, record an [ADR](../platform/decisions/index.md).

## To confirm

1. Is any uptime monitoring running?
2. Are Cloudflare Worker logs enabled, and where are they read?
3. Who is notified when a scheduled job fails?
4. Is there any analytics on the public sites, and if so which?

## Related pages

- [Environments and deployment model](../platform/governance/environments.md)
- [Automation and workflows](../platform/architecture/automation-workflows.md)
- [Incident response](incident-response.md)
- [Webhook failures runbook](runbooks/webhook-failures.md)
- [Security, privacy and access control](../platform/governance/security-and-privacy.md)
