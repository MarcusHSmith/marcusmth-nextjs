---
path: blog
date: "2026-08-02T09:00:00.000Z"
lastUpdated: "2026-08-02T09:00:00.000Z"
title: Engineering Manager vs Tech Lead at Meta
description: I've done both jobs — Engineering Manager and individual contributor Tech Lead. Same level, two very different jobs. Here are the real differences and tradeoffs between leading a team and leading from inside one.
tags: ["engineering-management", "software-engineering"]
isPublished: true
---

I've done [both jobs at Meta](/about/resume/engineering-manager). I joined in September 2025 as a Software Engineering Manager on WhatsApp, and I'm now an individual contributor tech lead on an AI team.

These are parallel tracks, not a ladder. Most companies map the first level of management to a senior individual contributor level — same scope, same pay band, different job. Almost nothing else about the two is the same.

Here are the differences and the tradeoffs.

## The Engineering Manager Day

The daytime is entirely other people. 1:1s with your reports. Syncs with other teams — the ones you depend on, the ones depending on you, and the ones who just discovered your roadmap collides with theirs. Engineers on your projects who don't report to you. Project reviews. Peer managers. Skip-levels. Cross-functional time with product and design.

The output is real but invisible. Those meetings are how a dozen people stay pointed in the same direction, and skipping them is how projects quietly rot. Still, when the calendar clears around 3:30, nothing exists that didn't exist at 9am except decisions and context sitting in your head.

## The Engineering Manager Night

So the work starts when the meetings stop, and it runs long.

You turn what you absorbed during the day into something your leadership can act on. Then the technical work you couldn't get to: the diffs you skimmed, the architecture call blocking someone, the design doc feedback you owe by morning. Then you plan tomorrow.

And then there's review season — self reviews, peer feedback, calibration with other managers, a written case for every one of your reports. However often your company runs it, when reviews are on they're a second full-time job layered on the first.

I was running about 70 hours a week. Not to be exceptional. To keep up. [Captain's Log journaling](/captains-log-journaling) was the only reason I could see where the time went, and seeing it didn't make it smaller.

## What's Great About Being an Engineering Manager

The hours are the least interesting thing about the job.

**Your ceiling is the team's output, not yours.** Whatever you could have built alone, a team of ten builds more. Once your job is raising that number, the leverage is unlike anything an individual contributor role offers.

**You change people's careers.** Someone gets promoted because you built the case over two review cycles. Someone grows into scope they didn't think they could hold because you handed it over slightly early. That's durable in a way shipping a feature isn't, and it's the part I still miss.

**You see the whole board.** You're in the rooms where roadmaps get set and headcount gets argued over. Individual contributors get the conclusions; managers get the reasoning.

**You can fix structural things.** Who's on what, what gets staffed, what noise your team never hears about. An individual contributor can route around a broken process; a manager can delete it.

## The Weight You Carry

Some days you're a therapist. People bring you the real stuff — career fear, burnout, conflict they can't work around, things outside work bleeding into it. Being the person they bring it to is a blessing, and it's earned, not assigned.

It also draws down real reserves. That's what people miss when they describe the job as "meetings." The tradeoff isn't the hours — it's that the energy deep technical work requires is the same energy you just spent being fully present for someone having a hard week. Both are worth spending it on. You can't spend it twice.

## The Engineering Manager Tradeoff: Leading From Outside the Code

The compounding one is that you can't stay in the code.

**Shared experience.** You're making calls about a codebase you last touched months ago, and you don't feel what they feel — the slow build, the test suite nobody trusts, the abstraction that fights you every time. They can tell. Not because they're judging you, but because you're missing information they have.

**Original technical ideas.** Good ones come from contact with the problem. Yours is secondhand: a standup summary, a diff skimmed at 11pm, a design doc already three rounds deep. You get very good at evaluating other people's ideas and generate fewer of your own.

You can manage around both, but you can't eliminate them. The input they need is time in the code, and that's what the calendar takes first.

## Why First-Line Management Is the Hardest Job in Software Engineering

This is my opinion, but I hold it strongly. At the first level of management you own the people _and_ you're still expected to be the technical center of gravity. Two full jobs with two different failure modes, and the day is built for neither.

The next level up is easier. Not easy, easier. Once you're managing managers, everyone reporting to you has roughly the job you just had, and the expectation that you're also the deepest technical voice quietly goes away. The pretense drops. One level down, the pretense is the job.

## The Tech Lead Day

Tech leading is difficult too, in a way I find more sustainable.

You lead from inside the team, which means you lead by example rather than by assertion — the design you wrote, the diff you shipped, the review you left. [How you review code](/how-to-code-review) becomes a primary leadership instrument rather than something you squeeze in at night.

The distinction I keep coming back to: I'm not directly responsible for the engineers, so I lead _with_ them rather than _to_ them. Nobody is performing for me. Nobody is managing up. When I say a piece of work matters, it's an argument that has to stand on its own, and the team moves because they agree — not because I'm writing their review.

The role is also more open. A manager job arrives pre-defined: you have reports, you own their performance, the scope comes with the title. A tech lead decides what the job is, week to week, and has more ways to create value — the problem nobody assigned anyone, the process nobody owns, the thing nobody asked for yet. That range is the best part of the role and the hardest, because none of it is handed to you. Wait to be told what your leadership should look like and you'll wait a long time.

The nights don't go away either. I still work at night, but I'm building, not reporting, and that's a completely different kind of tired.

It's the player-coach role. Some of the time you're coaching, some of the time you're on the field, and each makes the other better.

## What You Give Up as a Tech Lead

**You have influence, not authority.** You earn the direction every time. That's healthy right up until someone simply won't move, and then you have no lever. A manager has one.

**You start from zero with every new person.** The manager title arrives with credibility attached — new hires and partner teams assume your thoughts carry weight because of where you sit, before you've said anything. A tech lead gets none of that on day one, and re-earns it every time the room changes.

**You're not in the rooms.** Headcount, roadmap, org-level prioritization arrive as conclusions. You influence what gets built, not whether it gets funded.

**You don't grow people the same way.** You mentor, and it matters. But you're not accountable for anyone's career, and you don't get what comes back when it lands.

**The heads-down trap is real.** The failure mode is doing the work yourself because it's faster than teaching someone else. You ship a lot and lead nothing, and it can take months to notice.

**Nobody is looking out for you.** I spent enormous energy on my team's growth as a manager. As a tech lead, mine is my own to drive.

## The Comparison

|                     | Engineering Manager                    | Tech Lead                          |
| ------------------- | -------------------------------------- | ---------------------------------- |
| Where you lead from | above the team                         | inside it                          |
| Day                 | meetings                               | code + design                      |
| Night               | performance reviews, reports, planning | code, still building               |
| Hours/wk            | ~70, to keep up                        | long, but on work you chose        |
| Accountable for     | the people                             | the outcome                        |
| Authority           | comes with the title                   | re-earned with every new person    |
| Scope               | arrives with the job                   | you define it                      |
| Best part           | changing someone's career              | building the thing yourself        |
| Fails when          | you run out of energy                  | you go heads-down and stop leading |

## Both Are Leadership

Neither of these is the senior version of the other. They're two different instruments, and I've been glad to play both.

The manager job gives you the widest leverage in engineering and the chance to change how someone's career goes. It asks for your calendar and your emotional reserves. I'd take it again — and I'd protect one real block of technical time a week the way I protect a [war room](/swe-war-room) standup, because losing that is what starts the slide.

The tech lead job gives you time in the problem, the credibility that comes from shipping, and the freedom to chase what matters most each week. It asks you to lead without authority and build your own scope.

If you're deciding between them, don't ask which is more senior. Ask which set of tradeoffs fits the season you're in — and remember you can switch. That's the whole point of two tracks.

If you found this useful, you may also like [How to Prepare for Software Engineering Manager Interviews at Big Tech](/how-to-prepare-for-software-engineering-manager-interviews-at-big-tech), [How to Run a Software Engineering Project War Room](/swe-war-room), or the [engineering management books](/reading/software-engineering-management) that shaped how I think about this.
