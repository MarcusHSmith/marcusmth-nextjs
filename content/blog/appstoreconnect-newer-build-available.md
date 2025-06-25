---
path: blog
date: "2020-12-18T19:31:46.051Z"
lastUpdated: "2020-12-18T19:31:47.161Z"
title: AppStoreConnect - Newer Build Available
description: Solve rejecting a build and upgrading the version
tags:
  - ios
isPublished: true
---

![AppStoreConnect Error Newer Build Available](https://www.marcusmth.com/assets/newer_build_available.png)

This error occurs when an AppStoreConnect build is submitted for review but later rejected. Then the developer submits a newer build.

1.0.0(0) was submitted, 1.0.0(0) was rejected, 1.0.0(1) was submitted.

The answer can be found hidden in a post [here by joelnewcomer](https://developer.apple.com/forums/thread/26985?answerId=160458022#160458022)

### Steps

1. In the left column, click the current build ("Developer Rejected")
2. In the "Build" section, hover over the build and a red dot will appear on far right. Click it and delete the build.
3. Select the correct build and resubmit at top of page.

### Error

Newer Build Available

Are you sure you want to submit this build for review? A newer build of your app is available. To submit the newer build, delete this earlier build and resubmit.
