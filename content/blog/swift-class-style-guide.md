---
path: blog
title: Swift Class Style Guide
date: "2020-02-26T11:20:05.284Z"
lastUpdated: "2020-02-28T13:43:05.284Z"
description: "How to organize your class files in a predictable way"
isPublished: true
tags:
  - ios
---

Writing and reading a file should be predictable. This is how I organize my Swift files.

```
Protocol

Class
  weak var delegate

  public static let
  private static let

  public let/var
  private let/var

  override let/var

  override func (init, deinit, viewDidLoad, etc.)

  @objc func

  public func

  private func

extension class
```
