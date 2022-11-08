---
path: blog
date: "2021-04-05T18:32:02.382Z"
lastUpdated: "2021-04-05T18:32:02.425Z"
title: Swift XCTest Cannot Find in Scope
description: Solve XCTest Cannot find in scope
tags:
  - swift
isPublished: true
---

When creating Swift tests in `XCTest`, the files being tested need to have `Target Membership` in the test target. If the test file throw an error `Cannot find _ in scope`, the solution is to add the file you intend to test to the test target.

1. Open the file you intend to test.
2. On the Right Panel click the paper page
3. In `Target Membership` select your test target
4. Product > Clean
5. Build

For a guide on how to set up testing on a swift project read [iOS Unit Testing and UI Testing Tutorial](https://www.raywenderlich.com/960290-ios-unit-testing-and-ui-testing-tutorial).
