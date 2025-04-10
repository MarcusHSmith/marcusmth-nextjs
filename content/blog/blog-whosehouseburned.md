---
title: "Building WhoseHouseBurned.com: A Friday Night AI Agent Hackathon"
tags: ["nextjs", "cursor", "ai", "vercel"]
description: "The story of building a celebrity home tracker during the 2025 LA fires - from concept to deployment in a single night using Next.js, AI agents, and automated data collection"
date: "2025-02-19T18:25:11.908Z"
lastUpdated: "2025-02-19T18:25:11.951Z"
path: "whosehouseburned-hackathon"
isPublished: true
---

# Building WhoseHouseBurned.com: A Friday Night Hackathon During LA Fires

When the Palisades and Altadena fires shut down Los Angeles, I was stuck inside and inspired to build. With the help of Cursor's AI agents, I built [WhoseHouseBurned.com](https://www.whosehouseburned.com) - a tracker of celebrity homes affected by the January 2025 fires.

## The Build Process

Armed with [Cursor's AI agents](https://www.cursor.com) and a product spec, I set out to build each feature one by one. Creating a branch and Pull Request for each feature allowed me to isolate features and continue to build while [Vercel](https://vercel.com) was deploying the previous changes.

One challenge with Cursor Agents is that you're limited to a single agent at a time. While having multiple agents would be great, the bottleneck is around ideas. While the agent is working, I'm unable to provide additional context on this task or other tasks. [Devin.ai](https://devin.ai/) solves this but is lacking in other areas.

## The Vercel Deploy Limits

The flow of Cursor Agent to Vercel preview is OP, but can be intoxicating. About 2 hours into development, I hit Vercel's free deployment limits. I was able to work around this by using Cursor's AI agents to deploy to a local server, but the speed slowed for 24 hours.

## Keeping It Current

The site maintains its relevance through a multi-pronged data collection approach:

1. Manual updates from Instagram and Twitter monitoring
2. Automated daily ChatGPT queries that:
   - Check existing site data
   - Scan for new information across the internet
   - Identify any differences

## Technical Stack

- Next.js for the frontend
- Vercel for hosting
- ChatGPT for automated data verification
- Cursor AI agents for development assistance
