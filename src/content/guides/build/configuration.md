---
id: configuration
title: Configuration
sidebar_position: 1
description: "| Key | Type | Default | Description |"
status: "active"
reviewStatus: "needs-review"
owner: "Ryan Laird"
---

## Config file

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | string | none | Name of this instance |
| `log_level` | string | `info` | One of `debug`, `info`, `warn`, `error` |

## Environment variables

| Variable | Description |
| --- | --- |
| `APP_CONFIG` | Path to the config file |
| `APP_TOKEN` | API token (never commit this) |

Environment variables override values in the config file.
