---
path: blog
date: "2020-11-09T23:43:45.078Z"
lastUpdated: "2020-11-09T23:43:45.119Z"
title: Concluding iOS Coordinators
description: "Stop, Pop, and Dismiss Coordinators and their ViewControllers"
tags:
  - swift
isPublished: true
---

Instantiating coordinators is one thing, but dismissing and handling the conclusion is another. For more information on the coordinator pattern read [this](https://www.hackingwithswift.com/articles/71/how-to-use-the-coordinator-pattern-in-ios-apps) by [@twostraws](https://twitter.com/twostraws?s=20).

## Nav Stacked Coordinators

Some coordinators and their view controllers are added to the stack. Imagine Instagram, every-time a user clicks a profile, then using the follower list to click another profile, the view is added to the stack. To dismiss the top view controller and coordinator the user can click the back button (usually top left) or they can click a reseting button like the profile tab button.

Clicking the back button causes the navigation controller to dismiss the view controller and the coordinator. The back button triggers a coordinator `stop()` and the parent pops the view controller.

Clicking a reset button triggers a `stop()` and the parent coordinator calls `popToRootViewController` or similarly `popToViewController`.

## Single Coordinator

Other coordinators are shown one at a time like a popup window on a screen. When the coordinator is complete it calls its own `self.stop()` and in the parent coordinator's `coordinatorDidComplete` the navigation controller calls some variation of `popViewController`.
