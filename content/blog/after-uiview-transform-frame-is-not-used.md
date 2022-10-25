---
path: blog
date: "2021-04-16T17:16:33.357Z"
lastUpdated: "2021-04-16T17:16:33.398Z"
title: After UIView transform frame is not used
description: The story of chasing a UICollectionView issue caused by a transform
tags:
  - Swift
  - UIKit
isPublished: true
---

### The Backstory

This story starts with an `UICollectionView` that goes from Right to Left. I wrote another post about how to make that happen called [Right to Left UICollectionView](https://marcusmth.com/right-to-left-uicollectionview/). When new cells were added to the chart, they grew into size. I was able to determine this by recording the screen and looking frame by frame at the UI.

### The Cause

The views grew into size because the default `UIView` frame was `.zero`. This means that the view has a x,y of (0,0) and a 0 width and height. They then expands to fit the cell.

On the [Apple Frame Docs](https://developer.apple.com/documentation/uikit/uiview/1622621-frame) I found that "If the transform property is not the identity transform, the value of this property is undefined and therefore should be ignored." Since our transform was a non-identity transform the frame was undetermined and thus used the `.zero` starting frame.

### The Solution

To solve the problem, each of the cells' subviews were initialized with a frame of `.null`. This way it calculated the UIView's intended position before placing it in the view.
