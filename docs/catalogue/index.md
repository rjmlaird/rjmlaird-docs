---
title: Service catalogue
description: Canonical documentation entry points for first-party services and external integrations.
---

# Service catalogue

This catalogue describes the platform estate without treating every planned hostname as deployed. Use the linked service records for scope, URLs, ownership, lifecycle, interfaces, dependencies and operational considerations.

## First-party services

Browse [first-party service records](./first-party/index.md), including websites, documentation, APIs, developer tools, data services and operational capabilities.

The [generated public service catalogue](./generated/subdomain-catalogue.md) is derived from `data/subdomains.json`. Edit the registry and run the generator; do not edit generated output by hand.

## External integrations

External providers are documented separately because their credentials, data flows, failure modes and exit options differ from first-party service ownership.

- [Cal.com](./external-integrations/calcom.md)
- [HubSpot](./external-integrations/hubspot.md)
- [Stripe](./external-integrations/stripe.md)

## Templates and standards

Use the [service template](./service-template.md) when creating a new service record. For how to add or change a service, follow [Adding a service](../build/adding-a-service.md).
