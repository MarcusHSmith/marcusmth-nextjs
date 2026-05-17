---
path: blog
date: "2026-05-16T03:52:39.000Z"
lastUpdated: "2026-05-16T03:52:39.000Z"
title: How to Run a Software Engineering Project War Room
description: A guide to facilitating project war rooms at startups and Big Tech, keeping momentum, accountability, and decisions moving fast toward a code freeze
tags: ["software-engineering", "engineering-management"]
isPublished: true
---

A war room is what you run when a project is close to shipping but not yet on track. Not every project needs one, but when a team is committed to a tight timeline and things aren't where they need to be, a war room is the structure that puts them back on track without things falling apart quietly.

I've led war rooms at [Meta (WhatsApp)](/about/resume/engineering-manager) and [Tapestry](/about/resume/engineering-manager), and been part of them at [TryFi](/about/resume/engineering-manager), [Snap](/about/resume/engineering-manager), and [Apple](/about/resume/engineering-manager). I've learned from great ones and not-so-great ones across those sprints, and from excellent engineering management books on my [reading list](/reading). The mechanics are the same wherever you run them. The stakes just feel different.

## When to Run One

War rooms are for the final stretch: the last few weeks before a code freeze, a launch, or a hard external deadline. They're not a project management default. They're the mode you shift into when normal cadence won't get you there.

The prerequisite is commitment. If the team isn't actually bought in on the timeline, the war room creates noise without momentum. Once everyone is aligned that the deadline is real, the war room is the operational container for getting there.

## The Two-Layer Approach

A war room runs on two layers. The first is a shared Google Doc that keeps everyone oriented and momentum moving. The second is a task and dependency tracker that acts as the accountability backstop, catching everything the doc doesn't explicitly own. Together they cover the full surface area of a project sprint.

## Layer 1: The Shared Doc

The most important artifact of a war room is a shared Google Doc that the lead updates every day. The format is similar to [Captain's Log journaling](/captains-log-journaling): short, timestamped entries that make the day's decisions visible. It doesn't need to be long. It needs to cover three things:

- **What happened today:** decisions made, blockers resolved, work completed
- **What's happening tomorrow:** what each area is focused on
- **Open items:** things that need a decision or are still at risk

The reason this matters is that every person involved needs to understand the _why_ behind decisions, not just the _what_. When context lives in ephemeral communication, people make decisions in a vacuum. When it's written and shared, the team can make good calls independently without waiting for the lead to weigh in on everything.

The doc also becomes the historical record. By the time you hit code freeze, it should contain the full story of how you got there: what you cut, what you changed, what you accelerated, and why.

## Layer 2: The Task List

The shared doc keeps everyone oriented and moving. The task list is the second layer, the accountability backstop that makes sure nothing gets dropped between people.

The move is to have a dedicated person whose job during the war room is to own the task and dependency tracker in [Linear](/linear-project-organization-guide), Asana, Jira, or whatever your team uses. This isn't the lead. The lead has enough to manage. This is someone focused entirely on tracking.

The rules are simple:

- **If someone says they'll do something, create a task.**
- **Every task has an owner.**
- **If someone is blocked, create a task for the blocker and link it to the blocked task.**

Linking blocked and blocking tasks is what makes the tracker active rather than passive. When a blocking task is completed, the tracker surfaces the tasks that were waiting on it. The owner of each unblocked task gets notified and can immediately pick up their work. Nothing sits waiting in someone's head or buried in a thread.

The reason this matters: in a fast-moving war room, verbal commitments evaporate. People move on to the next problem. When someone says "I'll get that to you by Thursday" and it doesn't land in the tracker, it's already a hot potato waiting to be dropped. Ownership gaps are where timelines die.

## Burning Down to Zero

As the project approaches code freeze, the task list should shrink to zero. If you're a week out and it's still long, make explicit decisions on what's in and what's out. Anything still open at freeze needs a call: ship it, cut it, or carry it. [A rigorous code review process](/how-to-code-review) matters more in these final days, not less.

## Meeting Cadence

Daily standups are the standard. If that's too much, Monday/Wednesday/Friday works. What doesn't work is irregular meetings. The format is always the same: what's done, what's next, what's blocked. Blockers get added to the tracker in real time.

## What Good Looks Like at the End

When the war room works:

- The code freeze arrives with a task list at zero
- The Google Doc has a complete history of what happened and why
- Everyone involved knows what decisions were made and the reasoning behind them
- Nothing major slipped because it fell between responsibility gaps

The Google Doc and the task tracker are not bureaucracy. They are the two things that turn a room full of fast-moving people into a coordinated team instead of a collection of individuals working in the same direction by accident.
