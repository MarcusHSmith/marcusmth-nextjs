---
path: blog
date: "2026-08-02T09:00:00.000Z"
lastUpdated: "2026-08-02T09:00:00.000Z"
title: Engineering Manager vs Tech Lead at Meta
description: I've done both jobs at Meta — Engineering Manager on WhatsApp, now an IC tech lead in an AI org. Same ladder, two completely different jobs. Here's what each one actually costs.
tags: ["engineering-management", "software-engineering"]
isPublished: true
---

I've done both jobs at Meta. I joined in September 2025 as a Software Engineering Manager on WhatsApp, and I'm now an individual contributor tech lead in one of Meta's AI orgs. For context on the path here, you can read my [resume](/about/resume/engineering-manager) or [how I prepared for the interviews](/how-to-prepare-for-software-engineering-manager-interviews-at-big-tech).

These are parallel tracks, not a ladder. Meta maps the front-line manager level (M1) to Staff engineer (E6), and the next manager level (M2) to Senior Staff (E7). The tracks run alongside each other. Almost nothing else about the two jobs is the same.

This is what each one actually costs.

## The EM Day

The daytime is entirely other people.

1:1s with your reports. Syncs with engineers who aren't your reports but are on your projects. Project reviews. Peer managers who need something from your team or owe something to it. Skip-levels. Cross-functional time with product and design.

None of it produces anything. That isn't a criticism — those meetings are the mechanism by which twelve people stay pointed in the same direction, and skipping them is how projects quietly rot. But at 6pm nothing exists that didn't exist at 9am except decisions and context, and most of that context is still sitting in your head.

## The EM Night

The output of the job happens after everyone else logs off.

You take everything you absorbed during the day and turn it into something your leadership can act on. Status, risk, what slipped and why. Then the technical work you couldn't get to: the diffs you skimmed, the architecture call that's blocking someone, the design doc feedback you owe by tomorrow morning. Then you plan tomorrow.

And on top of that, twice a year, is PSC. Meta runs a 360-degree performance cycle — self reviews, peer feedback requests, calibration across other managers, and a written packet for every one of your reports. When PSC is on, it is a second full-time job layered on the first one.

I was running about 70 hours a week. Not to be exceptional. To keep up.

[Captain's Log journaling](/captains-log-journaling) was the only reason I could see where the time actually went, and seeing it didn't make it smaller.

## The Weight You Carry

Some days you're a therapist.

People bring you the real stuff. Career fear. Burnout. Conflict with a teammate they can't work around. Things happening outside work that are affecting the work. Being the person they choose to bring it to is a blessing — it's the part of the job that matters most, and it's earned, not assigned.

It's also a withdrawal every single time.

You spend emotional and mental capital on your team all day, and then you're expected to have the same reserves left over for hard technical judgment on your own projects and on everyone else's. Those come from the same account. The account isn't that big.

That's the part people miss when they describe the EM job as "meetings." The problem isn't the hours. It's that the specific energy deep technical work requires is the same energy you just spent being fully present for someone having a hard week.

## Leading From Outside the Code

The compounding problem is that you can't stay in the code, and that costs you two things.

**Respect.** It's genuinely hard to lead engineers when you don't share their daily experience. You're making calls about a codebase you last touched months ago, and you don't feel the things they feel — the build that takes too long, the test suite nobody trusts, the abstraction that fights you every time. They can tell. Not because they're judging you, but because you're missing information they have.

**Original ideas.** Good technical ideas come from contact with the problem. As an EM your contact is secondhand: a summary in standup, a diff you skimmed at 11pm, a design doc that's already been through three rounds. You get very good at evaluating other people's ideas and you produce almost none of your own.

You can manage around both of these. You cannot solve them, because the input they require is time in the code and that's the one thing the job doesn't give you.

## Why M1 Is the Hardest Job in Software Engineering

This is my opinion, but I hold it strongly: the front-line engineering manager job is the hardest job in software engineering.

You own the people _and_ you're still expected to be the technical center of gravity — for the projects you lead directly and for the advice you give your team. Those are two full jobs with two different failure modes, and the day is built for neither.

M2 is easier. Not easy, easier. Once you're managing managers, the responsibility model is consistent: everyone reporting to you has roughly the job you just had, and the expectation that you're also the deepest technical voice in the room quietly goes away. The pretense drops. At M1 the pretense is the job.

## The TL Day

Tech leading is difficult too. It's difficult in a way I find much more sustainable.

You lead from inside the team. You have the time to actually invest in the work, which means you're leading by example instead of by assertion — the design you wrote, the diff you shipped, the review you left. [How you review code](/how-to-code-review) becomes one of your primary leadership instruments rather than something you fit in at night.

The distinction I keep coming back to: I'm not directly responsible for the engineers, so I'm able to lead _with_ them rather than _to_ them. That's a bigger difference than it sounds. Nobody is performing for me. Nobody is managing up. When I say a piece of work matters, it's an argument that has to stand on its merits, and if it's right the team moves because they agree, not because I'm in their review packet.

I'm also agile about what matters. Week to week I can decide the most important thing to work on and go do it, and I can make connections and fixes across teams and processes as I see them. As an EM, my week was largely determined by the calendar before it started.

It's the player-coach role. Some of the time you're coaching. Some of the time you're on the field. Both make the other one better.

## Why the TL Seat Has Leverage Right Now

There's a structural argument here that has nothing to do with my preferences.

Meta's newer AI organizations were reported to be built with spans as wide as [50 engineers per manager](https://fortune.com/2026/03/14/metas-ai-team-50-flat-management-structure/) — roughly double what org-design people consider a ceiling. In an org that flat, the manager physically cannot be the technical center of gravity. Somebody has to be, and it's the tech lead.

The other half is tooling. Meta's CTO has said that [engineers who master AI tools "command a premium"](https://www.aol.com/news/meta-cto-gives-short-term-163102547.html) while those who don't end up working below the tool layer. I think that's right, and it means hands-on time is worth more today than it was five years ago, not less. The seat with time in the code is the seat with leverage. My own [AI workflows](/ai-weekly-supercommute-claude-code) have made that obvious to me outside of work, too.

## The Comparison

|                     | EM (M1)                | IC TL                              |
| ------------------- | ---------------------- | ---------------------------------- |
| Where you lead from | above the team         | inside it                          |
| Day                 | meetings               | code + design                      |
| Night               | PSC, reports, planning | —                                  |
| Hours/wk            | ~70                    | ~normal                            |
| Accountable for     | the people             | the outcome                        |
| Respect earned by   | judgment               | shipping                           |
| Fails when          | you run out of energy  | you go heads-down and stop leading |

## Both Are Leadership

I don't think one of these is the senior version of the other. They're two different instruments.

The EM job is the one where you're responsible for humans, and that responsibility is a privilege that costs more than anyone tells you before you take it. I'd take it again. I'd also plan for it differently — I'd protect one real block of technical time a week the way I protect a [war room](/swe-war-room) standup, because losing that is what starts the slide.

The TL job is the one where you're responsible for the outcome and you lead by being in it. It suits where I am right now and where the work is going.

If you're deciding between them, don't ask which one is more senior. Ask which cost you'd rather pay.

If you found this useful, you may also like [How to Run a Software Engineering Project War Room](/swe-war-room), [How to Code Review](/how-to-code-review), or the [engineering management books](/reading/software-engineering-management) that shaped how I think about this.
