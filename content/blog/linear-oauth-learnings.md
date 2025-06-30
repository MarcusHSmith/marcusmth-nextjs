---
title: "How Linear Can Build a Safer OAuth App Ecosystem (Lessons from Launching Linear Top Issue)"
description: "Launching a Linear OAuth app revealed a trust gap—here's what the data shows, and how Linear can solve it with a safer, more extensible app ecosystem."
date: "2025-06-30T00:00:00.000Z"
lastUpdated: "2025-06-30T00:00:00.000Z"
tags: ["linear", "nextjs"]
path: "linear-oauth-learnings"
isPublished: true
featuredImage:
  src: "linear/wordmark-dark.png"
  alt: "Linear logo"
---

What would it take for users to trust OAuth apps with their Linear workspace? After launching [Linear Top Issue](https://www.linear-top-issue.app), I learned the hard way and here's how Linear can solve it.

## Background: Launching Linear Top Issue

Earlier this month, I launched [Linear Top Issue](https://www.linear-top-issue.app), a web app that helps teams find their most important Linear issue. (You can read about the technical build in my previous post: [Building Linear Top Issue utilizing the Linear API](/linear-top-issue-app/).)

The app uses Linear's OAuth 2.0 flow to connect to a user's workspace and intelligently surfaces the top issue to work on. I was excited to see how the community would respond.

## Launch Metrics: The Trust Gap in Numbers

Here's what happened in the first two weeks:

**147 unique visitors**
**252 page views**
**80% bounce rate**
**3 workspaces authenticated with OAuth**

![Web Analytics Overview](/images/linear-top-issue-metrics-1.jpg)
_Web analytics for the first two weeks: 147 visitors, 252 page views, 80% bounce rate._

### Where did visitors come from?

Top referrers: Twitter, Reddit, Slack, my personal site
Most visitors landed on the homepage, with a handful checking out the about page. Some came from direct links with online friends

But here's the key stat: **only 3 workspaces authenticated with OAuth**. That's a conversion rate of just over 2% from visitor to OAuth user.

## User Trust & OAuth Friction

Despite clear explanations, almost no one was willing to connect their Linear workspace. The reluctance was palpable:

When I first launched, the app requested "Read and write" permissions from users. After seeing the hesitation, I quickly switched to requesting only "read" access, hoping this would lower the barrier. Surprisingly, this change made little to no difference in user response—people remained just as cautious about authenticating.

Users are (rightfully) protective of their workspace data. Even with read-only permissions, the risk feels high. With read access, developers can see everything in initiatives, projects, and issues—essentially the entire structure and content of a workspace. There's a general fear of data loss, leaks, or accidental exposure.

This isn't unique to my app. Any new OAuth app faces a steep trust barrier, especially when dealing with sensitive project management data.

## The Linear Ecosystem Challenge

Linear is a powerful platform ([learn more on their website](https://www.linear.app)), but it currently lacks a safe, limited extension ecosystem. Unlike Slack, Notion, or GitHub, there's no official app store or extension library with granular permission controls.

This means:
Every OAuth app is an all-or-nothing trust decision
Users have little visibility or control over what data is accessed or exported
There's no sandboxing or review process for third-party integrations

## How Linear Can Solve It: A Safer Extension Model

Here's how Linear could build a more trusted, extensible ecosystem:

1. **Granular Permissions**: Let users approve access to specific teams, projects, or data types, not just the whole workspace.
2. **Extension Library/App Store**: Curate and review third-party apps, giving users confidence in what they install.
3. **Sandboxing & Export Controls**: Limit what apps can read/export, and make it transparent to users.
4. **Clear Audit Trails**: Show users exactly what data was accessed and when, for every connected app.

This would empower developers to build powerful tools while giving users the confidence that their data is safe.

## Conclusion

Launching Linear Top Issue was a lesson in the importance of user trust. The interest was there, but the trust gap was too wide for most to cross.

If Linear wants to unlock a thriving ecosystem of extensions and integrations, it needs to make trust and safety a first-class feature. The solution is clear: granular permissions, a curated app store, and transparent controls.

If you're curious, you can try [Linear Top Issue](https://www.linear-top-issue.app) yourself or check out the [about page](https://www.linear-top-issue.app/about) for more details. And if you have thoughts on how SaaS platforms can balance extensibility and trust, I'd love to hear from you.
