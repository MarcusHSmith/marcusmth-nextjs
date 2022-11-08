---
path: blog
date: "2020-04-06T15:27:58.418Z"
lastUpdated: "2020-04-06T15:27:58.444Z"
title: Is UITableView at the top?
description: How to determine if a UITableView is at the top of its datasource
isPublished: true
tags:
  - ios
---

This week I needed to determine if a `UITableView` was at the top. There are ways of checking if it has scrolled to the top using `UIScrollViewDelegate` described [here](https://stackoverflow.com/a/15772943/2228688), but I needed to determine it from `viewDidAppear`.

The solution was to check the first visible row's `IndexPath`

```
guard let row = myTable.indexPathsForVisibleRows?.first else {
    return
}
if (row.section == 0 && row.row == 0) {
    // Top of the UITableView
}
```

_swift_
