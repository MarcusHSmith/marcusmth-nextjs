---
path: blog
date: "2020-06-23T20:49:30.540Z"
lastUpdated: "2020-06-23T20:49:30.582Z"
title: How to remove UIGraphicsImageRenderer UIImageView border
description: "UIGraphicsImageRenderer adds a border, here is how to remove it"
isPublished: true
tags:
  - ios
---

This iOS issue sent me for a spin, hopefully you aren't facing this too.

To create a `UIImage` from a `UIView` in swift:

```
let renderer = UIGraphicsImageRenderer(size: myView.bounds.size)
let renderedImage = renderer.image { _ in
                myView.drawHierarchy(in: myView.bounds, afterScreenUpdates: true)
}
```

This will leave you with a gray thin border around your `UIImageView` with a transparent background. To solve this the `UIImageView` requires a `.background` color.
