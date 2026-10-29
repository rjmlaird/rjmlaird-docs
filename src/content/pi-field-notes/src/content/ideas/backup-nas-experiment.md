---
title: Raspberry Pi backup and NAS experiment
slug: backup-nas-experiment
description: Testing whether a Raspberry Pi with attached storage can be a trustworthy home backup target, and where it falls short.
date: 2026-10-11
tags: [self-hosting, backups, storage, networking]
priority: high
status: researching
draft: false
---

## The idea

Use a Raspberry Pi with an external drive as a home backup target and small network file store, then test how reliable it is rather than assuming it is.

## Questions to answer

- What is the realistic throughput over the home network, and what limits it?
- Which file system and backup tool give versioned, restorable backups with the least maintenance?
- How does the system behave after an unclean power loss?
- Can I actually restore from it? A backup that has never been restored is only a hope.

## Principles

- Follow the 3-2-1 idea: more than one copy, on more than one kind of storage, with one copy off site. A Pi is at most one of those copies.
- Test restores on a schedule and write down the results.
- Keep the system off the public internet.

## First step

Choose one dataset that is safe to experiment with, then write a restore test before writing the backup job.
