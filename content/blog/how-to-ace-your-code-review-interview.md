---
path: blog
date: "2020-06-09T15:19:31.314Z"
lastUpdated: "2020-06-09T15:19:31.341Z"
title: How to Ace your Code Review Interview
description: >-
  Code review job interviews can present a challenge, this will help you pass
  their questions
isPublished: true
tags:
  - software engineer
---

Last week a friend asked for advice on an upcoming Code Review interview. I wrote up this document for him and thought it could be valuable to other engineers who are new to the process. Here are my thoughts now and this will continue to update as my perspective changes. I'm happy to hear your feedback.

<br />

**My opinions:**

There are two layers to code review. First syntax, is the code using the right naming, simplest loops, correct patterns. Second is is the high level, is the code extensible, how does this interact with other modules and classes. The first is what 90% of reviews are and senior engineers do the second. You can say, that you are confident in the first and want to strive for the second

**Terminology:**

`PR` - Pull Request - Github terminology for a branch to be reviewed then merged

`PTAL` - Please Take a Look - when I write a PR I send it to my teammates with PTAL

`LGTM` - Looks Good to Meet - what the reviewer says when it’s ready to merge

`nit` - This is like a nice to have or a small thing that is a minor moment. “You could name this x instead of y”

`WOMM` - Works on My Machine - test the feature locally on client to ensure it works as expected

**How to Review:**

When reviewing code you look over it in Github and comment on lines. If you’re not familiar with that I can show you before your interview.

Talk through your process of code reviewing.

1. Understand the task assigned to the engineer. What is trying to be accomplished
2. At a high level should the code accomplish this
3. Is the pattern and architecture correct to solve this problem
4. Then look over the code for syntax

**Some things that will make you sound smart:**

“I used to do syntax reviews first and then when the larger design needed to change I had to do syntax again. Now I start with high level and only at the end worry about syntax”

“My goal is no avoid writing the same comment multiple times with an engineer, so when there’s room for improvement I comment on the issue, the solution, and why so they learn for the next time around”
