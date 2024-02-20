---
path: blog
date: "2020-11-17T23:43:45.078Z"
lastUpdated: "2020-11-17T23:43:45.119Z"
title: Solved - Extension Must Not Contain Stored Properties
description: How to fix Swift error - Extension Must Not Contain Stored Properties
tags:
  - swift
isPublished: true
---

The error `Extension Must Not Contain Stored Properties` is common in Swift. This occurs when a variable is instantiated inside a class extension.

```
class MyClass: AnyObject {
}
extension MyClass: AnotherClass {
  private var foo: string = "foo"
}
```

Variables in Swift can only be declared within the class. To fix

```
class MyClass: AnyObject {
  private var foo: string = "foo"
}
extension MyClass: AnotherClass {}
```

For more information, check out this [post](https://medium.com/@valv0/computed-properties-and-extensions-a-pure-swift-approach-64733768112c) by [@valv0](https://twitter.com/valv0?s=20)
