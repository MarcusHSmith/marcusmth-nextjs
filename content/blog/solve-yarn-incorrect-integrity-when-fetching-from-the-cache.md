---
path: blog
date: "2022-09-27T13:52:26.931Z"
lastUpdated: "2022-09-27T14:08:40.709Z"
title: "Solve Yarn Incorrect integrity when fetching from the cache"
description: Fix error with Integrity
tags:
  - yarn
isPublished: true
featuredImage:
  src: "yarn-logo.png"
  alt: "Yarn logo"
---

# The Issue

`Incorrect integrity when fetching from the cache` Yarn error occurs when Integrity validation fails.

T﻿he community has a large conversation on the issue on [github](https://github.com/yarnpkg/yarn/issues/7584).

# The Solution

```
yarn cache clean
yarn install -f
```
