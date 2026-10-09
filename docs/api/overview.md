---
id: overview
title: API overview
sidebar_position: 1
---

Document the public interface here. For each endpoint or function, list the purpose, parameters, response and errors.

## Base URL

```text
https://api.example.com/v1
```

## Authentication

```bash
curl -H "Authorization: Bearer $TOKEN" https://api.example.com/v1/status
```

## Example endpoint: `GET /status`

| Field | Type | Description |
| --- | --- | --- |
| `ok` | boolean | `true` when the service is healthy |
| `version` | string | Running version |

```json title="Response"
{ "ok": true, "version": "1.0.0" }
```

## Errors

| Code | Meaning |
| --- | --- |
| 401 | Missing or invalid token |
| 429 | Rate limit exceeded |

:::tip
For larger APIs, generate this section from an OpenAPI file with the `docusaurus-plugin-openapi-docs` plugin instead of writing it by hand.
:::
