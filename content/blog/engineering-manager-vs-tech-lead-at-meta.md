---
path: blog
date: "2026-08-02T09:00:00.000Z"
lastUpdated: "2026-08-02T09:00:00.000Z"
title: Engineering Manager vs Tech Lead at Meta
description: I've done both jobs at Meta — Engineering Manager on WhatsApp, now an individual contributor tech lead in an AI org. Same ladder, two very different jobs. Here are the real differences and tradeoffs between them.
tags: ["engineering-management", "software-engineering"]
isPublished: true
---

I've done [both jobs at Meta](/about/resume/engineering-manager). I joined in September 2025 as a Software Engineering Manager on WhatsApp, and I'm now an individual contributor tech lead in one of Meta's AI orgs.

These are parallel tracks, not a ladder — Meta maps the front-line manager level (M1) to Staff engineer (E6). Almost nothing else about the two jobs is the same.

Here are the differences and the tradeoffs.

## The Engineering Manager Day

The daytime is entirely other people.

1:1s with your reports. Syncs with engineers who aren't your reports but are on your projects. Project reviews. Peer managers who need something from your team or owe something to it. Skip-levels. Cross-functional time with product and design.

The output of all of that is real, but it's invisible. Those meetings are the mechanism by which a dozen people stay pointed in the same direction, and skipping them is how projects quietly rot. Still, at 6pm nothing exists that didn't exist at 9am except decisions and context, and most of that context is sitting in your head rather than anywhere someone else can use it.

## The Engineering Manager Night

So the writing happens after everyone else logs off.

You take what you absorbed during the day and turn it into something your leadership can act on. Status, risk, what slipped and why. Then the technical work you couldn't get to: the diffs you skimmed, the architecture call that's blocking someone, the design doc feedback you owe by tomorrow morning. Then you plan tomorrow.

And twice a year, PSC lands on top of it. Meta runs a 360-degree performance cycle — self reviews, peer feedback requests, calibration across other managers, and a written packet for every one of your reports. When PSC is on, it is a second full-time job layered on the first one.

I was running about 70 hours a week. Not to be exceptional. To keep up.

[Captain's Log journaling](/captains-log-journaling) was the only reason I could see where the time actually went, and seeing it didn't make it smaller.

## What's Great About Being an Engineering Manager

Now the other side, because the hours are the least interesting thing about the job.

**Your ceiling is the team's output, not yours.** Whatever you could have built yourself in a half, a team of ten builds more. Once you accept that your job is to raise that number, the leverage is enormous and it is nothing like what any individual contributor role offers.

**You change people's careers.** Someone gets promoted because you built the case over two halves. Someone grows into scope they didn't think they could hold because you handed it to them slightly before they were ready. Someone gets out of a bad situation because you moved them. That's durable in a way shipping a feature isn't, and it's the part of the job I still miss.

**You see the whole board.** You're in the rooms where roadmaps get set, headcount gets argued over, and other teams explain what they're actually doing. Individual contributors get the conclusions. Managers get the reasoning, which is far more useful and changes how you read every decision after that.

**You can fix structural things.** Who's on what. What gets staffed and what gets killed. What noise your team never has to hear about. An individual contributor can route around a broken process; a manager can delete it.

## The Weight You Carry

Some days you're a therapist.

People bring you the real stuff. Career fear. Burnout. Conflict with a teammate they can't work around. Things happening outside work that are affecting the work. Being the person they choose to bring it to is a blessing — it's the part of the job that matters most, and it's earned, not assigned.

It also draws down real reserves. You spend emotional and mental capital on your team all day, and then you're expected to have the same reserves left for hard technical judgment on your own projects and on everyone else's. Those come from the same account.

That's the part people miss when they describe the engineering manager job as "meetings." The tradeoff isn't the hours. It's that the specific energy deep technical work requires is the same energy you just spent being fully present for someone having a hard week. Both are worth spending it on. You just can't spend it twice.

## The Engineering Manager Tradeoff: Leading From Outside the Code

The compounding one is that you can't stay in the code, and that trades away two things.

**Shared experience.** It's harder to lead engineers when you don't live their day. You're making calls about a codebase you last touched months ago, and you don't feel what they feel — the build that takes too long, the test suite nobody trusts, the abstraction that fights you every time. They can tell. Not because they're judging you, but because you're missing information they have.

**Original technical ideas.** Good ones come from contact with the problem. As an engineering manager your contact is secondhand: a summary in standup, a diff you skimmed at 11pm, a design doc that's already been through three rounds. You get very good at evaluating other people's ideas and you generate fewer of your own.

You can manage around both. You can't eliminate them, because the input they need is time in the code, and time in the code is the thing the calendar takes first.

## Why M1 Is the Hardest Job in Software Engineering

This is my opinion, but I hold it strongly.

At M1 you own the people _and_ you're still expected to be the technical center of gravity — for the projects you lead directly and for the advice you give your team. Those are two full jobs with two different failure modes, and the day is built for neither.

M2 is easier. Not easy, easier. Once you're managing managers, the responsibility model is consistent: everyone reporting to you has roughly the job you just had, and the expectation that you're also the deepest technical voice in the room quietly goes away. The pretense drops. At M1 the pretense is the job.

## The Tech Lead Day

Tech leading is difficult too, in a way I find more sustainable.

You lead from inside the team. You have time to actually invest in the work, which means you lead by example rather than by assertion — the design you wrote, the diff you shipped, the review you left. [How you review code](/how-to-code-review) becomes a primary leadership instrument rather than something you squeeze in at night.

The distinction I keep coming back to: I'm not directly responsible for the engineers, so I lead _with_ them rather than _to_ them. That's a bigger difference than it sounds. Nobody is performing for me. Nobody is managing up. When I say a piece of work matters, it's an argument that has to stand on its own, and if it's right the team moves because they agree, not because I'm writing their review.

I'm also agile about what matters. Week to week I can decide the most important thing to work on and go do it, and I can make connections and fixes across teams and processes as I see them. As an engineering manager, my week was largely determined by the calendar before it started.

It's the player-coach role. Some of the time you're coaching. Some of the time you're on the field. Each one makes the other better.

## What You Give Up as a Tech Lead

It has its own tradeoffs, and they're not small.

**You have influence, not authority.** Every time you want the team to go a direction, you have to earn it. That's healthy right up until someone simply won't move, and then you have no lever at all. A manager has one. You have persuasion and a track record, and some days that isn't enough.

**You're not in the rooms.** Headcount, roadmap, org-level prioritization — those arrive as conclusions. You can influence what gets built; you have much less say in whether it gets funded.

**You don't grow people the same way.** You mentor, and it matters. But you're not accountable for anyone's career, you're not building the promotion case, and you don't get the thing that comes back when it lands.

**The heads-down trap is real.** The failure mode of this job is doing the work yourself because it's faster than teaching someone else to. You ship a lot and lead nothing, and it can take a whole half to notice.

**Nobody is looking out for you the way you looked out for your reports.** As an engineering manager I spent enormous energy on my team's growth. As a tech lead, that's mine to drive.

## The Comparison

|                     | Engineering Manager (M1)  | Tech Lead (IC)                     |
| ------------------- | ------------------------- | ---------------------------------- |
| Where you lead from | above the team            | inside it                          |
| Day                 | meetings                  | code + design                      |
| Night               | PSC, reports, planning    | —                                  |
| Hours/wk            | ~70                       | ~normal                            |
| Accountable for     | the people                | the outcome                        |
| Authority           | formal                    | earned, every time                 |
| Respect earned by   | judgment                  | shipping                           |
| Best part           | changing someone's career | building the thing yourself        |
| Fails when          | you run out of energy     | you go heads-down and stop leading |

## Both Are Leadership

I don't think one of these is the senior version of the other. They're two different instruments, and I've been glad to play both.

The engineering manager job gives you the widest leverage available in engineering and the chance to change how someone's career goes. It asks for your calendar and your emotional reserves in exchange. I'd take it again — and I'd plan differently, protecting one real block of technical time a week the way I protect a [war room](/swe-war-room) standup, because losing that is what starts the slide.

The tech lead job gives you time in the problem, the credibility that comes from shipping, and the freedom to chase the most important thing each week. It asks you to lead without authority and to stay out of rooms you used to sit in.

If you're deciding between them, don't ask which is more senior. Ask which set of tradeoffs fits the season you're in — and remember you can switch. That's the whole point of two tracks.

If you found this useful, you may also like [How to Prepare for Software Engineering Manager Interviews at Big Tech](/how-to-prepare-for-software-engineering-manager-interviews-at-big-tech), [How to Run a Software Engineering Project War Room](/swe-war-room), or the [engineering management books](/reading/software-engineering-management) that shaped how I think about this.
