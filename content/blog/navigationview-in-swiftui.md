---
path: blog
date: "2021-02-18T18:25:11.908Z"
lastUpdated: "2021-02-18T18:25:11.951Z"
title: NavigationView in SwiftUI
description: How to set navigation bar titles
tags:
  - swift
  - swiftui
isPublished: true
featuredImage:
  src: "swift-logo.svg"
  alt: "Swift logo"
---

SwiftUI makes `NavigationView`(s) much simpler. [Apple Developer Docs](https://developer.apple.com/documentation/swiftui/navigationview)

The parent view wraps its content in a `NavigationView { ...content...}`. The children's outer view set their `.navigationBarTitle("Title")`

This works for both SwiftUI `NavigationView`(s) or if the navigation view is set in `UIKit`
