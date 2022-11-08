---
path: blog
date: "2020-10-01T22:43:45.078Z"
lastUpdated: "2020-10-01T22:43:45.119Z"
title: Rx Observable Types
description: Difference between Observable Single Maybe in Rx and RxSwift
tags:
  - swift
isPublished: true
---

## Types

`Observable` - Returns multiple responses. It uses `onNext()` and `onError()`

`Single` - Only ever returns one response. This can either be an `onSuccess()` or `onError()`. Either way a response is only called once where in the subscription is disposed.

`Maybe` - Either returns one response or no responses. It behaves the same as a `Single` except it could never return.

### Docs

I've been using this in the context of [RxSwift](https://github.com/ReactiveX/RxSwift/blob/main/Documentation/GettingStarted.md#observables-aka-sequences), but it holds true across Rx implementations.
