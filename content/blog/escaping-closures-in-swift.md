---
path: blog
date: "2020-11-13T23:43:45.078Z"
lastUpdated: "2020-11-16T19:43:00.000Z"
title: "@Escaping Closures in Swift"
description: Success and Failure Closures in Swift
tags:
  - swift
isPublished: true
featuredImage:
  src: "swift-logo.svg"
  alt: "Swift logo"
---

Success and Failure blocks are all over Swift code bases. They are a useful tool to do asynchronous tasks and wait for network requests. A standard signature is:

```
func foo(success: @escaping () -> Void, failure: @escaping () -> Void) {...}
```

### Network Requests

```
func foo(success: @escaping () -> Void, failure: @escaping () -> Void) {
  networkRequest.response({
    success()
  }).error({
    failure()
  })
}
```

In this case the function waits for the network response and then calls the `success` or `failure` closure. This occurs asynchronously.

### Mixed Requests

```
func foo(success: @escaping () -> Void, failure: @escaping () -> Void) {
  if (...) {
    networkRequest.response({
      success()
    }).error({
      failure()
    })
    }
  } else {
    DispatchQueue.main.async {
      success()
    }
  }
}
```

The network request closure work the same, but the closure outside the network request needs to be handled differently. That closure is wrapped in a `DispatchQueue.main.async` which calls it asynchronously on the main thread. Without this, some closures would be called asynchronously while others were called synchronously.

The `@escaping` keyword in the function parameter specifies this and signifies that the closures are called asynchronously.

The Swift documentation describes [escaping closures](https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID546) as "the closure is passed as an argument to the function, but is called after the function returns"
