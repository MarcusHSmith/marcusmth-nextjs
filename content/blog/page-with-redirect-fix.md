---
path: blog
date: "2024-11-17T10:39:25.326Z"
lastUpdated: "2024-11-17T10:39:25.326Z"
title: How to Fix "Page with redirect" Error in Google Search Console
description: Debug and fix redirect issues reported in Google Search Console using curl
tags:
  - seo
  - vercel
isPublished: true
featuredImage:
  src: "google-search-console-logo.png"
  alt: "Google Search Console logo"
---

# How to Fix "Page with redirect" Error in Google Search Console

## Vercel Redirects

In Project Settings > Domains ensure that the domain does not have a redirects. For my website, all sitemaps and internal links used url without www. `https://marcusmth.com` instead of `https://www.marcusmth.com`. This domain had a redirect to the www version.

Update to `no redirects` and redeploy.

![Vercel Domain Settings](/images/vercel-domains-redirects.jpg)

## Debug with curl

### Page with redirect

`curl -I https://marcusmth.com/swift-xctest-cannot-find-in-scope`

```
HTTP/2 308
cache-control: public, max-age=0, must-revalidate
content-type: text/plain
date: Sun, 17 Nov 2024 20:53:39 GMT
location: https://www.marcusmth.com/swift-xctest-cannot-find-in-scope
refresh: 0;url=https://www.marcusmth.com/swift-xctest-cannot-find-in-scope
server: Vercel
strict-transport-security: max-age=63072000
x-vercel-id: sfo1::qlmtm-1731876819237-86cecdc033f6
```

### Page without redirect

`curl -I https://marcusmth.com/how-to-film-walking-videos-for-youtube`

```
HTTP/2 200
accept-ranges: bytes
access-control-allow-origin: *
age: 8
cache-control: public, max-age=0, must-revalidate
content-disposition: inline
content-type: text/html; charset=utf-8
date: Sun, 17 Nov 2024 21:10:14 GMT
etag: "ff5c1d5b8fd6e4b0954e8a082ddc92bd"
server: Vercel
strict-transport-security: max-age=63072000
vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url
x-matched-path: /en/how-to-film-walking-videos-for-youtube
x-vercel-cache: HIT
x-vercel-id: sfo1::nf25p-1731877814577-4d3dfbb7af4c
content-length: 9361
```
