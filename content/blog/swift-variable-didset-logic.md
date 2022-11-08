---
path: blog
date: "2020-07-27T17:22:47.299Z"
lastUpdated: "2020-07-27T17:22:47.341Z"
title: Swift Variable DidSet Logic
description: When does Swift call `didSet()` on variables
isPublished: true
tags:
  - swift
---

There are a few gotchas in Swift's variable didSet logic. At a high level the `didSet()` function is called whenever a variable value is set.

```
private var colorPreference: UIColor = UIColor.red {
  didSet() {
    // logic
  }
}
```

The main catch is that this does not apply to initializing values. The first case is when the variable is initialized with a value.

`private var colorPreference: UIColor = UIColor.red`

The second is when the variable is set in the initialized func.

```
init() {
  colorPreference = UIColor.purple
}
```

This caught be up a few too many times so I needed to write it out
