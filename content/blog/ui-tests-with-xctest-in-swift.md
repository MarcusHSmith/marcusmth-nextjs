---
path: blog
date: "2021-07-20T21:24:28.676Z"
lastUpdated: "2021-07-20T21:24:28.718Z"
title: UI Tests with XCTest in Swift
description: Everything you need to know to write UITests
tags:
  - swift
  - xctest
  - xcuitest
isPublished: true
---

## Overview

Writing UI tests in Swift has never been easier. Tests use the [XCTest](https://developer.apple.com/documentation/xctest) library. Currently they are run locally with soon with [XCode Cloud](https://developer.apple.com/xcode-cloud/) Apple will host and run them on our behalf.

## Resources

There are not many resources online to get started. Two posts that helped were [Xcode UI Testing Cheat Sheet](https://www.hackingwithswift.com/articles/148/xcode-ui-testing-cheat-sheet) by [Paul Hudson](https://twitter.com/twostraws?s=20) and [Getting started with Xcode UI testing in Swift](https://www.swiftbysundell.com/articles/getting-started-with-xcode-ui-testing-in-swift/) by [John Sundell](https://twitter.com/swiftbysundell?s=20).

## Debugging

While writing tests, breakpoints are your best friend. Once the code is halted. `$ po app` will print the view hierarchy. To simulate an action `$ e app.….tap()` executes a command. This will effect the simulator.

`⌘ + 9` in XCode goes to tests that have run. From there you can see the lines that have executed and screenshots of the app at the failure.

## Network Requests

Requests are slow and the simulator needs to wait for them. To solve this create a loop of sleeps until the task is complete.

```
class UITests: XCTestCase {
    var app: XCUIApplication!
    var sleepCounter = 0

    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        sleepCounter = 0
    }

    func myTest() {
        app.launch()

        sleepCounter = 0
        // myChecker - any XCTAssert
        while ![myChecker] && sleepCounter < 40 {
            sleepCounter += 1
            sleep(1)
        }
        XCTAssertTrue([myChecker])
}

```

It is important to call the assertion after the loop so if the case hasn't hit yet it will show a failure. Additionally enter the max amount of time to wait before a response. In our test case it is `40`.
