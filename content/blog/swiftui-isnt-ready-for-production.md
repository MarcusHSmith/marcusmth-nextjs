---
path: blog
date: "2021-05-27T16:06:23.755Z"
lastUpdated: "2021-06-04T16:25:45.872Z"
title: SwiftUI isn't ready for production
description: Why we didn't and you shouldn't switch to SwiftUI yet
tags:
  - swift
  - ios
  - swiftui
isPublished: true
---

SwiftUI is the new thing and as an iOS developer I'm excited about it. It promises to make mobile UI code reactive and simpler. This allows for less code and encourages us to lean into the native SDK to handle design decisions.

### Device Compatibility

Originally announced with iOS 13, it can be used on iOS devices running iOS 13 or newer. The more recently released device that doesn't make the cut is the iPhone 6. A complete list of devices and their compatibility can be found [here](https://everyi.com/by-capability/maximum-supported-ios-version-for-ipod-iphone-ipad.html). Any phone iPhone 6 and older cannot run SwiftUI code.

### SwiftUI Features

Swift and Apple made the decision to slowly replace the UIKit SDK with SwiftUI rather than mirroring it in the initial release. This means that iOS 13 had a basic feature set which grew in iOS 14 and will likely continue in iOS 15. Some key features from `UICollectionView` are still missing in iOS 14 including pull to refresh. Some `AttributedText` API were included in iOS 14, but not enough to replicate UIKit.

This means that in order to replace a current UIKit application, at least iOS 15 would be necessary without some reasonable workarounds.

### Should I use SwiftUI for a new project?

Designing and developing SwiftUI apps now go hand in hand. SwiftUI relies on many iOS SDK fundamentals and abstracts these away from the developer. This will lead to better longevity of the app only if everything isn't super customized. If an app is planning to use SwiftUI it's important that the designers on the project are aware of this and only use features that are already in the SwiftUI SDK.

### Should I convert my product to SwiftUI

For us, we had less than 0.5% of users on devices that would never be able to use iOS 13. We were willing to leave them behind on the current build. However the feature limitations of iOS 13 and iOS 14 meant that we would need to target iOS 14 or maybe even iOS 15 to build a complete app.

It didn't make sense for us to cut off that many users from new feature development. Ideally we would leave less than 1% of users behind. Unfortunately all of this is to say, I doubt we will have these numbers in the next 2 years. I'll keep an eye open for things to change, but currently we're continuing with UIKit. We will likely revisit in 2023.
