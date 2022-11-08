---
path: blog
date: "2020-09-07T21:28:19.632Z"
lastUpdated: "2020-09-09T21:28:19.632Z"
title: Improve iOS Build Times
description: How our iOS incremental build times were decreased
isPublished: true
tags:
  - ios
  - appStore
---

As is true with all engineering, everything is an abstraction of some other work. In this case [Michael Eisel](https://github.com/michaeleisel) walked me through how to improve our iOS build times. By applying the concepts and understanding them (this blog post) these concepts also become mine.

## Notes about iOS builds

Times are measured in `0.1` second increments. Anything shorter is simplified to `0.1`.

XCode and iOS attempt to minimize repeat work for each build. They include these cached steps in the build script, so it's important to watch the build progress to understand what tasks are slowing the build down verse utilizing cached results.

## Steps

### Hashing Files

Files are hashed and then checked at runtime to ensure they haven't changed. This is a security check which is necessary in production, but not utilized in development. Still all files are hashed with SHA 256, which is more secure but slower than SHA 1. Change code signing to SHA 1 for faster code signing.

### Resource Rules

Incremental builds only check that the code is signed, not what it is signed with. This can be turned off during development builds.

### Linker

Swift compiles files to `.o` files which the Linker then assembles into binary. This process can be improved with [/zld](https://github.com/michaeleisel/zld) which Michael Eisel wrote. This library is used by many large companies and has gained traction.

### Legacy Build System

At some point iOS switched to a new build system but it's unclear if it is truly faster. For quicker incremental builds use the Legacy Build System. Be sure to clear Derived Date `~/Library/Developer/Xcode/DerivedDate` then `$ pod install`.

## Results

Results are difficult to measure because there are so many variables. Is the cache hot, what file was changed, etc. However we saw consistent improvement from 11.4 seconds to 6.9 seconds for our incremental build which represents a `39%` improvement.
