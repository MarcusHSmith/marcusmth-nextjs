---
path: blog
date: "2020-12-04T23:16:02.806Z"
lastUpdated: "2020-12-10T23:16:02.848Z"
title: Dotted Line UIView in Swift
description: Create a horizontal dotted or dashed line in Swift with UIView and CALayer
tags:
  - swift
isPublished: true
featuredImage:
  src: "swift-logo.svg"
  alt: "Swift logo"
---

Creating a dashed or dotted line in Swift requires a `CAShapeLayer`. Here is an overview on `CALayer` from [RayWenderlich](https://www.raywenderlich.com/10317653-calayer-tutorial-for-ios-getting-started).

This [StackOverflow Question](https://stackoverflow.com/q/58992662/2228688) shows how to create a dotted line in a layer.

Put these together into a `UIView` and this class can be dropped around the project.

```
import UIKit

class DashedLineHorizonatalView: UIView {
    init() {
        super.init(frame: .zero)
        setup()
    }

    required init?(coder _: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setup() {
        height(3)
        let shapeLayer = CAShapeLayer()
        shapeLayer.strokeColor = UIColor.gray.cgColor
        shapeLayer.lineWidth = 1
        // passing an array with the values [2,3] sets a dash pattern that alternates between a 2-user-space-unit-long painted segment and a 3-user-space-unit-long unpainted segment
        shapeLayer.lineDashPattern = [2, 4]
        let path = CGMutablePath()
        path.addLines(between: [CGPoint(x: 0, y: 0), CGPoint(x: UIScreen.main.bounds.width, y: 0)])
        shapeLayer.path = path
        layer.addSublayer(shapeLayer)
    }
}

```
