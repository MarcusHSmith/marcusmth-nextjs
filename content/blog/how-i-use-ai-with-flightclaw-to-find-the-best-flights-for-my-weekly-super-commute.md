---
title: "How I Use AI with FlightClaw to Find the Best Flights for My Weekly Super Commute"
description: "My workflow for using AI, FlightClaw, and Claude Code to search LAX, BUR, SFO, and SJC, compare real super commute options, and choose the flights that best fit my weekly commute to Menlo Park."
date: "2026-04-04T09:00:00.000Z"
lastUpdated: "2026-04-04T09:00:00.000Z"
tags: ["ai", "travel", "remote-work"]
path: blog
isPublished: true
---

My weekly super commute between Los Angeles and the Bay Area is repetitive enough to optimize, but variable enough that I don't want to do it by hand every week. There are too many combinations to check casually: LAX or BUR on the LA side, SFO or SJC on the Bay side, Monday or Tuesday outbound, Thursday or Friday return, and then all the timing tradeoffs inside each of those.

That is where AI has become genuinely useful for me.

I use [FlightClaw](https://flightclaw.com/) to do the flight searching and price tracking, and I use [Claude Code](https://www.anthropic.com/claude-code/) to apply my preferences consistently. The result is not just "find the cheapest fare." It is a system that searches the right routes, ignores the wrong fares, ranks flights the way I actually travel, and gives me a recommendation I can book quickly.

If you want the airport-side commute analysis first, I already wrote that up in [Optimizing the LA–SF Super Commute](/optimizing-the-la-sf-super-commute). This post is the AI layer I now use on top of that.

## Why AI Helps Here

The raw problem is simple: find a flight from LA to the Bay Area and back.

The real problem is messier:

- I want non-stop flights only.
- I want to exclude Basic Economy.
- I want to search **LAX + BUR × SFO + SJC**.
- I want Monday and Tuesday morning outbound options.
- I want Thursday and Friday evening return options.
- I care about price, but I also care about airline, arrival airport, and whether a flight is annoyingly early or annoyingly late.

That is exactly the sort of task AI is good at when it has a clear set of rules.

## The Two Skills I Use

The first skill is `flightclaw`, which handles the search mechanics. In my local skill, the rule is explicit: always pass `--exclude-basic` so I get true Main Cabin pricing rather than accidentally comparing against Basic Economy.

The second skill is my private `supercommute` skill, which defines how I want the search results interpreted.

That skill encodes a few real preferences:

- Search all 4 airport combinations.
- Use non-stop flights only.
- Search outbound flights in the **6am to 9am** window on Monday and Tuesday.
- Search return flights in the **6pm to 9pm** window on Thursday and Friday.

## What the Search Actually Looks Like

FlightClaw is flexible enough to search multiple airports and date ranges in one pass. The examples in the skill are for routes like `LHR` to `JFK`, but the same structure is what I use for my own commute.

A representative search looks like this:

```bash
python skills/flightclaw/scripts/search-flights.py LAX,BUR SFO,SJC 2025-07-01 --date-to 2025-07-03 --stops NON_STOP --exclude-basic --depart-after 06:00 --depart-before 09:00
```

That expands into multiple route and date combinations automatically. For my weekly pattern, the `supercommute` skill tells the AI to do that for both directions:

- Outbound: Monday and Tuesday mornings
- Return: Thursday and Friday evenings

That gives me four pairing sets to compare:

- Mon-Thu
- Mon-Fri
- Tue-Thu
- Tue-Fri

Without AI, I would still be able to do this. I just would not do it consistently.

## Where Claude Code Fits In

[Claude Code](https://www.anthropic.com/claude-code/) is the orchestration layer for me.

Instead of manually remembering all of these rules each week, I can point Claude Code at my skills and tell it to run the workflow. It reads the instructions in `flightclaw` and `supercommute`, applies the search windows, compares the pairings, and formats the recommendation in a way that is ready to act on.

That part matters. I don't want a wall of flights. I want:

- the recommended itinerary
- the cheapest itinerary if it is different
- the pairing totals
- the exact dates and day of week

One small detail I like in the FlightClaw skill is that it explicitly says to always show the **full date plus day of week** and to verify the day of week before presenting results. That sounds minor, but it is exactly the kind of mistake that causes booking errors on repetitive travel.

## Tracking Prices Instead of Re-Searching From Scratch

I also like that FlightClaw is not only a search tool. It can track routes over time.

The examples in the skill include commands like:

```bash
python skills/flightclaw/scripts/track-flight.py LHR JFK 2025-07-01 --target-price 400
python skills/flightclaw/scripts/check-prices.py --threshold 5
```

For my use case, that means I can track a commute pattern, set a target price, and have the system check whether it has moved enough to matter. That is a much better fit for recurring travel than treating every week as a brand new search.

## Why This Workflow Works for Me

The bigger pattern here is the same one behind some of my other AI projects: AI is best when it is attached to a narrow problem, a real workflow, and explicit constraints. I wrote about that idea in [Building WhoseHouseBurned.com: A Friday Night AI Agent Hackathon](/blog-whosehouseburned/). The value is not "AI magic." The value is encoding a workflow I already care about and letting the tool run it reliably.

For my commute, that means AI is not replacing judgment. It is applying my judgment consistently.

That has made the weekly search process faster and better:

- I check more combinations.
- I forget fewer constraints.
- I compare flights more consistently.
- I spend less time deciding.

And because the preferences live in skills, the workflow keeps getting better as I refine it.

## Image Placeholder

[Image placeholder: screenshot of a FlightClaw-powered super commute summary showing LAX/BUR to SFO/SJC options, Delta preference scoring, and recommended Mon-Thu vs Tue-Fri pairings]

## Final Thoughts

The main lesson for me is that AI gets a lot more useful when it has structure. [FlightClaw](https://flightclaw.com/) gives me the flight data and tracking. [Claude Code](https://www.anthropic.com/claude-code/) gives me the agent layer that can read my skills and execute the workflow. My `supercommute` skill gives it the actual decision logic.

That combination is what turns "find me a flight" into "find me the best flight for how I really travel."
