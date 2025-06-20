---
title: "Building Linear Top Issue utilizing the Linear API"
description: "Learnings while building an app on top of Linear's OAuth 2.0 and GraphQL api"
date: "2025-06-20T18:25:11.908Z"
lastUpdated: "2025-06-20T18:25:11.908Z"
tags: ["linear", "nextjs", "vercel"]
path: "linear-top-issue-app"
isPublished: true
featuredImage:
  src: "linear_top_issue_og_image.jpg"
  alt: "Linear Top Issue"
---

I recently built [Linear Top Issue](https://linear-top-issue.app) - a web app that helps teams find their most important Linear issue. The project was completed in just 3 days using Next.js and deployed on Vercel. Here's what I learned while building it.

## What is Linear Top Issue?

Linear Top Issue is a simple web application that connects to your Linear workspace via OAuth 2.0 and intelligently identifies the most important issue your team should be working on. The app follows a three-step algorithm:

1. **Find the highest priority in-progress initiatives** in your Linear workspace
2. **Identify the highest priority projects** from those initiatives (or from the workspace if no initiatives exist)
3. **Determine the most important planned issues** within those projects based on priority and other factors

The goal is to answer the question: "What should I work on next?" by surfacing the most impactful issue from your team's backlog.

## The Inspiration

The app was inspired by a quote from [Jeff Weinstein](https://x.com/jeff_weinstein) that appears on the homepage:

> "How do we find problems that are big enough where you would cancel the rest of your day to solve? And if you can find one of those, which is hard to find then it's worth devoting huge amounts of energy to solving that problem."

This perfectly captures the essence of what Linear Top Issue aims to solve - finding those high-impact problems that deserve your full attention.

## Technical Implementation

### Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Deployment**: Vercel
- **Authentication**: Linear OAuth 2.0
- **API**: Linear GraphQL API
- **Styling**: Tailwind CSS

### Key Features

#### OAuth 2.0 Integration

The app uses Linear's OAuth 2.0 flow to securely access workspace data. Users simply click "Connect Linear" and are redirected to Linear's authorization page. Once authorized, the app can access their workspace data through Linear's GraphQL API.

#### Intelligent Issue Ranking

The core algorithm prioritizes issues based on:

- Initiative priority (if the issue belongs to an initiative)
- Project priority
- Issue priority
- Issue status (planned vs in progress)
- Other contextual factors

#### Clean, Minimal UI

The interface is intentionally simple and focused. The homepage features:

- A prominent "Connect Linear" button
- An embedded YouTube video explaining the concept
- Jeff Weinstein's inspiring quote
- A link to the about page for more details

## Lessons Learned

### OAuth Implementation

Linear's OAuth 2.0 implementation is straightforward and well-documented. The key was properly handling the authorization code flow and securely storing access tokens.

### GraphQL Queries

Linear's GraphQL API is powerful but requires careful query design. The data structure is quite heavy, including teams, team members, initiatives, projects, and issues all interconnected. I learned to structure queries to fetch only the necessary data and handle nested relationships efficiently.

The main challenge was dealing with the comprehensive data structure that Linear provides. A single workspace query can return:

- **Teams** with their members and settings
- **Initiatives** with their priorities and associated projects
- **Projects** with their priorities and issue counts
- **Issues** with full details including assignees, labels, and comments

To optimize performance and reduce payload size, I had to:

- Use specific field selection instead of fetching entire objects
- Implement pagination for large datasets
- Cache frequently accessed data like team structures
- Structure queries to minimize the number of API calls needed

The key insight was that Linear's API is designed to give you everything you might need, but you need to be selective about what you actually request. This meant carefully crafting GraphQL queries that only fetch the fields necessary for the ranking algorithm.

### User Experience

The app's success depends on its simplicity. Users should be able to understand what it does and get value from it immediately. The single-purpose design helps achieve this.

## Try It Out

You can try Linear Top Issue at [linear-top-issue.app](https://linear-top-issue.app). The app is completely free and only requires access to your Linear workspace.

Visit the [about page](https://linear-top-issue.app/about) to learn more about how the algorithm works and who built it.

## Conclusion

Building Linear Top Issue was a great exercise in rapid prototyping and API integration. The project demonstrates how powerful modern web technologies can be when combined with well-designed APIs like Linear's.

The app serves as a reminder that sometimes the most valuable tools are the simplest ones - those that solve a specific problem really well rather than trying to do everything.

If you're interested in building similar integrations, I'd recommend starting with Linear's [API documentation](https://developers.linear.app) and their excellent GraphQL playground for testing queries.
