---
path: blog
date: "2021-08-21T18:59:48.876Z"
lastUpdated: "2021-08-21T18:59:48.918Z"
title: 99 Bottles of Beer in Swift
description: Recursive Swift without using variables
tags:
  - swift
isPublished: true
---

In [The Passionate Programmer](https://www.amazon.com/Passionate-Programmer-Remarkable-Development-Pragmatic/dp/1934356344/ref=asc_df_1934356344/?tag=hyprod-20&linkCode=df0&hvadid=312025907421&hvpos=&hvnetw=g&hvrand=2619027834083661622&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9061089&hvtargid=pla-331493525691&psc=1) by [@chadfowler](https://twitter.com/chadfowler?s=20), Chad recommends solving a challenge in your language. His favorite is creating "99 Bottles of Beer on the Wall" lyrics without using variables. Here's my solution in Swift:

```
func getRecursiveLyrics(numberOfBottles: Int, originalNumberOfBottles: Int) -> String {
    if numberOfBottles == 0 {
        return "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, \(getBottleNumber(number: originalNumberOfBottles)) bottles of beer on the wall."
    }
    return "\(getBottleNumber(number: numberOfBottles)) bottles of beer on the wall, \(getBottleNumber(number: numberOfBottles)) bottles of beer.\nTake one down and pass it around, \(getBottleNumber(number: numberOfBottles - 1)) bottles of beer on the wall.\n\n" + getRecursiveLyrics(numberOfBottles: numberOfBottles - 1, originalNumberOfBottles: originalNumberOfBottles)
}

func getBottleNumber(number: Int) -> String {
    return number == 0 ? "No more" : "\(number)"
}

func getLyrics(numberOfBottles: Int) -> String? {
    guard numberOfBottles >= 0 else {
        return nil
    }
    return getRecursiveLyrics(numberOfBottles: numberOfBottles, originalNumberOfBottles: numberOfBottles)
}

if let unwrappedLyrics = getLyrics(numberOfBottles: 99) {
    print(unwrappedLyrics)
}

```

[Lyrics](http://www.99-bottles-of-beer.net/lyrics.html)
