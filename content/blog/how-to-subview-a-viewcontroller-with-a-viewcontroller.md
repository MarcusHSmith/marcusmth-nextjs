---
path: blog
date: "2020-04-09T16:41:20.278Z"
lastUpdated: "2020-04-09T16:41:20.305Z"
title: How to subview a ViewController with a ViewController
description: Adding a ViewController to another ViewController shouldn't be difficult
isPublished: true
tags:
  - ios
---

To add a ViewController

```
addChild(childVC)
parentVC.subview(childVC.view)
childVC.didMove(toParent: self)
```

To remove a ViewController

```
childVC.willMove(toParent: nil)
childVC.view.removeFromSuperview()
childVC.removeFromParent()
```
