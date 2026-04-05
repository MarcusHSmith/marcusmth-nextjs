---
title: "How to Use AI to Value Your Flight Preferences and Find the Best Flight"
description: "A practical workflow for using AI, FlightClaw, and Claude Code to turn personal flight preferences into a repeatable ranking system, with real supercommute examples from LAX, BUR, SFO, and SJC."
date: "2026-04-04T09:00:00.000Z"
lastUpdated: "2026-04-04T09:00:00.000Z"
tags: ["ai", "travel", "remote-work"]
path: blog
isPublished: true
---

# How to Use AI to Value Your Flight Preferences and Find the Best Flight

Most flight searches are still optimized for the cheapest ticket, not the best ticket for how you actually travel.

That works if all you care about is sticker price. It breaks down if you have real preferences like airline status, airport convenience, refundability, or departure times that make a trip meaningfully better or worse.

For my weekly LA to Bay Area super commute, I use [FlightClaw](https://flightclaw.com/) for search and tracking, and [Claude Code](https://www.anthropic.com/product/claude-code) to apply my preferences consistently. The useful part is not just "AI finds flights." The useful part is that AI can follow a decision framework I already know I care about.

If you want the airport-side data first, read [Optimizing the LA–SF Super Commute](/optimizing-the-la-sf-super-commute). This post is about the layer on top of that: turning travel preferences into a scoring system an AI agent can actually use.

## The Core Idea

The best flight is usually not the cheapest flight.

For my commute, I care about at least six things:

- non-stop only
- no Basic Economy
- Delta gets real credit because I am Delta Silver
- very early outbound flights are worse
- very late return flights are worse
- BUR is better than LAX for getting home

That is enough complexity that doing it by memory every week gets inconsistent.

My `supercommute` skill turns those preferences into an internal formula:

```text
effective = (sticker × delta_factor) + early_out_penalty + late_return_penalty - bur_discount
```

And the actual values are opinionated:

- Delta flights get a `0.85` factor
- departures before 7:00am get a penalty of `$25` per hour
- returns after 6:30pm get a penalty of `$30` per hour
- BUR gets a `$20` discount

That formula is not meant to be universal. It is meant to be mine.

## Why AI Helps

My weekly search pattern is not one route. It is a matrix:

- `LAX` and `BUR` on the LA side
- `SFO` and `SJC` on the Bay side
- Monday and Tuesday outbound
- Thursday and Friday return

That means four airport combinations and four day pairings before even comparing airlines and times. My skill tells the AI to search all of them, keep only non-stop options, exclude Basic Economy, and then rank the results using my scoring rules.

This is exactly the kind of task AI is good at when the rules are explicit and the output format is constrained.

## The Two Pieces of the Workflow

The first piece is `flightclaw`, which does the actual search and tracking. The skill explicitly says to always use `--exclude-basic`, which matters because I want real Main Cabin pricing, not fake-cheap Basic Economy comparisons.

The second piece is my `supercommute` skill, which defines how to search and how to rank:

- outbound: Monday or Tuesday, 6am to 9am
- return: Thursday or Friday, 6pm to 9pm
- non-stop only
- exclude Frontier and Spirit
- treat Southwest as valid because its fares are refundable
- avoid switching airlines for trivial savings

Then Claude Code reads both skills and returns a recommendation in a format I can act on quickly: recommended itinerary, cheapest itinerary if different, and all combo totals.

## Real Examples From My Supercommute

This gets more useful when the numbers are real.

In my local supercommute notes, I had these Delta roundtrip examples:

- May 26 and May 28: `$216` roundtrip
- June 1 and June 4: `$247` roundtrip in one snapshot
- June 1 and June 4: `$280` roundtrip in another snapshot

That alone is enough to show why price tracking matters. A commute pattern that was `$216` one week can be `$247` or `$280` in a later snapshot.

Now apply the preference model:

- `$216` on Delta becomes an internal effective score of `$183.60` before timing adjustments
- `$247` on Delta becomes `$209.95`
- `$280` on Delta becomes `$238.00`

That is the first big lesson: if you genuinely prefer one airline, encode that preference directly instead of pretending you do not.

The second lesson is that schedule matters too. Under my skill:

- a `6:30am` outbound adds a `$12.50` penalty
- an `8:00pm` return adds a `$45` penalty
- a BUR arrival subtracts `$20`

So a `$247` Delta itinerary is not always the same `$247` Delta itinerary. Internally:

- `$247` Delta with a 6:30am outbound scores `$222.45`
- `$247` Delta with an 8:00pm return scores `$254.95`
- `$247` Delta with a BUR arrival scores `$189.95`

That is much closer to how I actually experience the trip.

## Ground Truth Matters Too

The scoring rules are not arbitrary. They come from the commute itself.

In my supercommute timekeeping data:

- LAX outbound trips averaged about `$49.69` and `39.3` minutes car-to-gate
- BUR outbound trips averaged about `$51.36` and `34.6` minutes car-to-gate
- one BUR trip on January 26, 2026 was just `$32.75` and `31` minutes car-to-gate

And in my separate analysis in [Optimizing the LA–SF Super Commute](/optimizing-the-la-sf-super-commute), BUR also performed better for getting home on return legs. That is why my skill includes a BUR discount instead of treating all airports as interchangeable.

This is the real opportunity with AI: not replacing judgment, but codifying judgment that was earned from repeated trips.

## What FlightClaw and Claude Code Each Do

[FlightClaw](https://flightclaw.com/) is the data layer. It searches Google Flights, handles multiple airport combinations, supports date ranges, and can track routes over time instead of forcing me to start from scratch each week.

[Claude Code](https://www.anthropic.com/product/claude-code) is the decision layer. It reads my skills, applies the rules consistently, compares the combinations, and returns something closer to a recommendation than a search result.

That combination is what makes the workflow useful. A raw flight search gives me options. A structured AI workflow gives me a decision.

## What I Think Most People Should Do

You do not need my exact formula. You need your own.

If you fly often, start by writing down the things you repeatedly trade off:

- preferred airlines
- best and worst departure windows
- preferred airports
- refundability requirements
- baggage rules
- whether layovers are ever acceptable

Then assign rough dollar values to those preferences. They do not need to be perfect. They only need to be directionally honest.

Once you do that, AI becomes much more useful because it can optimize for your actual behavior instead of an abstract cheapest-price metric.

## Related Posts

If you want more context around how I think about AI workflows and this commute specifically:

- [Optimizing the LA–SF Super Commute](/optimizing-the-la-sf-super-commute)
- [Building WhoseHouseBurned.com: A Friday Night AI Agent Hackathon](/whosehouseburned-hackathon)
- [Why I created an AI blog for SEO](/beautiful-roads-ai-blog-for-seo)

## Image Placeholder

[Image placeholder: a side-by-side graphic showing sticker price vs effective price for LAX/BUR to SFO/SJC options, with Delta preference and time penalties highlighted]

## Final Thoughts

The best use of AI in travel is not asking a chatbot for a cheap flight. It is giving an AI system your real preferences, a repeatable search process, and a way to rank tradeoffs honestly.

That is what my supercommute workflow does. [FlightClaw](https://flightclaw.com/) handles the search and tracking. [Claude Code](https://www.anthropic.com/product/claude-code) handles the orchestration. My `supercommute` skill handles the judgment.

Once that structure exists, finding the best flight gets much faster.
