---
path: blog
date: "2020-06-08T21:28:19.632Z"
lastUpdated: "2020-06-08T21:28:19.679Z"
title: App Store Connect build versions
description: "iOS Testflight version difference between major, minor, patch, and build"
isPublished: true
tags:
  - ios
  - appStore
---

There is some confusion around when to create a new app build version.

In App Store Connect, once an app build has been sent for review no changes can be made to that build number. A minor build `3.2.1` vs `3.2.2` must be set for the next build created whether this is a TestFlight or release build. A way around this is to reject the current build, then it is possible to push another build to `3.2.1(1)`

This caused me some headache before I understood it.
