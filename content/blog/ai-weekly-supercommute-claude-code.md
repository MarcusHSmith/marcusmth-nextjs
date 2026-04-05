---
title: "Using Claude Code to Book My Weekly Supercommute"
description: "How I use Claude Code and FlightClaw to search LAX, BUR, SFO, and SJC, apply my personal scoring model, and book the right flight in under a minute — with real examples."
date: "2026-04-05T09:00:00.000Z"
lastUpdated: "2026-04-05T09:00:00.000Z"
tags: ["ai", "travel", "remote-work"]
path: blog
isPublished: true
---

I supercommute between LA and the Bay Area every week. Four airport combinations. Two outbound days. Two return days. Multiply that by however many weeks out I'm looking, and the combinatorics get tedious fast.

I used to do this manually. Now I type one line into Claude Code.

## The Setup

Two skills do the work:

[FlightClaw](https://flightclaw.com/) handles the search. It queries Google Flights across multiple airports and date ranges, filters by stops and fare class, and returns structured results. The key flag is `--exclude-basic`, which strips out Basic Economy so I'm comparing real fares.

My `supercommute` skill handles the interpretation. It tells Claude Code exactly what to search (LAX + BUR × SFO + SJC, 6–9am outbound, 6–9pm return) and how to score the results using my preferences.

That scoring model does real work:

- Delta flights get a 15% effective discount because I'm Delta Silver
- Departures before 7am carry a time penalty — $25/hr
- Returns after 6:30pm carry a time penalty — $30/hr  
- BUR arrivals get a $20 discount because getting home from BUR is faster and easier

The result is an "effective cost" that reflects how I actually experience the trip. A cheap 6am flight and a reasonably priced 7am flight are not the same thing.

## What a Session Looks Like

I type `/supercommute` into Claude Code with the week I need. Claude searches all the relevant routes and comes back with results. Here's a representative session:

```
> /supercommute week of April 14
```

Claude runs the searches:

```bash
python skills/flightclaw/scripts/search-flights.py LAX,BUR SFO,SJC 2026-04-14 \
  --stops NON_STOP --exclude-basic --depart-after 06:00 --depart-before 09:00

python skills/flightclaw/scripts/search-flights.py SFO,SJC LAX,BUR 2026-04-16 \
  --stops NON_STOP --exclude-basic --depart-after 18:00 --depart-before 21:00

python skills/flightclaw/scripts/search-flights.py LAX,BUR SFO,SJC 2026-04-15 \
  --stops NON_STOP --exclude-basic --depart-after 06:00 --depart-before 09:00

python skills/flightclaw/scripts/search-flights.py SFO,SJC LAX,BUR 2026-04-17 \
  --stops NON_STOP --exclude-basic --depart-after 18:00 --depart-before 21:00
```

Then it applies scoring and returns this:

```
SUPERCOMMUTE — Week of April 14, 2026
──────────────────────────────────────

✦ RECOMMENDED: Mon–Thu
  Out  Mon Apr 14  DL 1234  LAX→SFO  7:00am–8:22am  $149
  Ret  Thu Apr 17  DL 5678  SFO→BUR  7:15pm–8:38pm  $139
  Total: $288

  Cheapest: Tue–Thu
  Out  Tue Apr 15  WN 412   BUR→SFO  6:30am–7:55am  $109
  Ret  Thu Apr 17  DL 5678  SFO→BUR  7:15pm–8:38pm  $139
  Total: $248

──────────────────────────────────────
All combos:
  Mon–Thu  $288  (Delta both legs)
  Mon–Fri  $312
  Tue–Thu  $248  (Southwest out, Delta back)
  Tue–Fri  $272
```

That's all I need. I can book in 30 seconds.

## Where the Tradeoffs Get Interesting

The scoring surfaces tradeoffs that sticker price hides.

The Tue–Thu combo is $40 cheaper — $248 vs $288. But the Southwest 6:30am outbound from BUR has a $12.50 early-departure penalty, and Southwest fares are fully refundable which is a wash since I only book refundable anyway. The effective cost gap narrows to about $25 after the early departure penalty and the Delta preference adjustment. 

Some weeks that gap is worth it. Some weeks it isn't. But at least I'm comparing them honestly instead of just grabbing the low sticker price.

Another tradeoff the model catches: a 6am outbound might be $30 cheaper but adds a $25 penalty. At $5 in real terms, the cheaper flight is usually not worth the early alarm. The model surfaces that automatically.

Return timing is where the penalty really adds up. An 8:30pm return scores $60 worse than a 6:45pm return even if the sticker prices are similar. I learned early in this commute that late returns on Thursdays are draining in a way that's hard to quantify at booking time, so the $30/hr penalty is intentionally aggressive.

## What I Don't Do Anymore

I don't open Google Flights tabs for each airport combination. I don't manually remember that BUR is worth a small premium on returns. I don't eyeball whether a 6:15am departure is "worth it" based on vibes.

All of that is encoded. The weekly workflow is one prompt.

That's the actual value of AI here — not that it's smarter than me about flights, but that it applies my own judgment consistently. I built the rules once. Now they run every week.

## Related

- [Optimizing the LA–SF Super Commute](/optimizing-the-la-sf-super-commute) — the airport timing and cost data behind the scoring model
- [Building WhoseHouseBurned.com: A Friday Night AI Agent Hackathon](/whosehouseburned-hackathon) — another narrow AI workflow, same pattern
