---
path: blog
date: "2021-03-17T14:57:33.331Z"
lastUpdated: "2021-04-16T17:30:15.089Z"
title: Right to Left UICollectionView
description: Setup a UICollectionView where the zero index is on the right
tags:
  - swift
isPublished: true
featuredImage:
  src: "swift-logo.svg"
  alt: "Swift logo"
---

Recently I needed to build a chart where the right most index was the most recent data. As the user scrolled left, older data would be requested and shown.

My initial approach was to reverse the index, where the zero'th index was the oldest data. This approach had pitfalls mainly because the item indexes changed every time the data was updated. This made maintaining positions difficult.

## The Solution

### View

```
setup() {
    let chart = UICollectionView()
    chart.collectionViewLayout = ChartViewFlowLayout()
    chart.transform = CGAffineTransform(scaleX: -1.0, y: 1.0)
}
```

### Cell [UPDATED 4/16/2021]

The subviews of this cell must have a frame of `.zero`. This is documented in another post [After UIView transform frame is not used](https://www.marcusmth.com/after-uiview-transform-frame-is-not-used/).

```
class MyCollectionViewCell: UICollectionViewCell {
    static var identifier: String = "MyCollectionViewCell"

    override init(frame: CGRect) {
        super.init(frame: frame)
        ...
        contentView.transform = CGAffineTransform(scaleX: -1.0, y: 1.0)
    }
}
```

### FlowLayout

```
class ChartViewFlowLayout: UICollectionViewFlowLayout {
    override init() {
        super.init()
        scrollDirection = .horizontal
    }

    required init?(coder _: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    open override var flipsHorizontallyInOppositeLayoutDirection: Bool {
        return true
    }
}
```

Now the zero'th index will be the most recent and the furthest right. Scroll positions will be maintained on chart reloads.
