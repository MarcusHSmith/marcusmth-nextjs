---
path: blog
date: "2020-07-27T17:22:47.299Z"
lastUpdated: "2021-04-26T16:30:44.726Z"
title: iOS Provisioning Profile Guide
description: Everything I know about setting up Certificates for XCode and iOS devices
tags:
  - ios
  - xcode
  - appStoreConnect
isPublished: true
---

The three aspects are Identifiers, Device, and then Provisioning Profile. Visit [Apple Developers](https://developer.apple.com/account/resources/certificates/list) to manage these.

In Profiles -> Edit ensure certificates and correct device are checked before saving and downloading profile.

Once downloaded, open which loads into Keychain and Xcode.

### Certificate Types

**Developer Certificate** Can the user build the app

**Distribution Certificate** Can the user build the app in a way that could be consumed by Apple

**App Store Certificate** Can the user upload the build to Apple
