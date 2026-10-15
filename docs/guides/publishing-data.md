---
title: Publishing data
description: The review workflow for publishing a dataset through the public reference-data service, including licence, attribution and withdrawal.
sidebar_position: 4
---

This is the proposed workflow for the [data](../services/platform/data.md) service. Publishing is a deliberate, reviewed act: nothing reaches the public service automatically.

:::info[Status: Proposed]
No dataset has been published through this workflow yet. Adjust it once the service is deployed.
:::

## Before you start

A dataset is eligible only if all of these hold:

- It is public, or you have the right to publish it
- Its licence permits redistribution, and you can state the licence and the attribution it requires
- It contains no personal, customer or private data
- You can name the source and the date it was retrieved

## Workflow

1. **Record the source.** Note where the data came from, its licence, the required attribution and the retrieval date.
2. **Prepare the data.** Clean it reproducibly, with the steps kept in the repository, and define its schema.
3. **Validate.** Check the data against the schema. Reject unexpected fields and missing required values.
4. **Describe it.** Write the metadata: title, description, source, licence, attribution, coverage, update frequency and version.
5. **Review.** A second look at licence, attribution and personal data before anything is merged.
6. **Publish a version.** Release it as a new, immutable version. Never overwrite a published version in place.
7. **Verify.** Fetch the published response and compare it with the source.
8. **Announce.** Update the dataset catalogue and any affected documentation.

## Changing and withdrawing

- A correction is a new version. Keep the previous one available unless it is wrong in a harmful way.
- A breaking schema change is a new major version; see [APIs and integrations](../architecture/apis-integrations.md#contract-and-versioning-rules).
- If a dataset must be withdrawn, for example because of a licence or privacy problem, remove it promptly, record why and tell known consumers.

## Never publish

Personal data, customer records, credentials, anything under a licence that forbids redistribution, or data you cannot attribute. See [Security, privacy and access](../architecture/security-privacy-access.md#privacy).
