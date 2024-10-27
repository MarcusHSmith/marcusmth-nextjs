---
path: blog
date: "2024-10-25T22:08:05.284Z"
lastUpdated: "2024-10-25T10:00:00.000Z"
title: How to correct iPhone footage in DaVinci Resolve
description: Learn how to properly color correct iPhone footage in DaVinci Resolve using color space transform nodes
featuredImage:
  src: "davinci-resolve-logo.png"
  alt: "DaVinci Resolve logo"
tags:
  - youtube
  - davinciResolve
isPublished: true
---

# How to correct iPhone footage for DaVinci Resolve

When importing iPhone footage into DaVinci Resolve often the footage has the wrong color. Here is the guide how to fix the color to a natural look.

## In Mac Photos

1. Import footage into Mac Photos application
2. Export the footage as Unmodified Original
3. Import the footage into DaVinci Resolve

## In DaVinci Resolve

1. Navigate to Color page
2. Add a Node
3. Select "Effects" (top right corner), drag "Color Space Transform" node into the node graph
4. Connect the footage to the Color Space Transform node
5. Set **Input Color Space** to "Rec.2020"
6. Set **Input Gamma** to "Rec.2100 HLG"
7. Set **Gamut Mapping Method** to "Saturation Compression"
8. Congratulations, your footage should now have a more natural look
