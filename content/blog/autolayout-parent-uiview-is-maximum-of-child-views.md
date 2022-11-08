---
path: blog
date: "2020-03-04T17:47:45.334Z"
lastUpdated: "2020-03-04T17:47:45.372Z"
title: Autolayout Parent UIView is Maximum of Child Views
description: When the parent needs to be at least as large as the children, how
  do you setup the views
tags:
  - ios
isPublished: false
---

I've hit this challenge way too many times and now that I know the solution I don't ever want to be stumped by it again.

A parent UIView() has multiple subviews. We'll call the parent `p` and the children `a` and `b`. The example uses [Stevia](https://github.com/freshOS/Stevia).

```
p.sv(a, b)
a.centerVertically()
b.centerVertically()
p.Height >= a.Height
p.Height >= b.Height
```

This example also works horizontally, but you can figure out how to use `Width` instead of `Height`.
