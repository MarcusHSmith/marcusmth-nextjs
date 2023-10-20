---
path: blog
date: "2023-10-19T13:52:26.931Z"
lastUpdated: "2023-10-20T10:52:26.931Z"
title: "How to add web push notifications"
description: Service Workers and setup
tags:
  - nextjs
  - react
isPublished: true
---

# Resources

To debug service workers in Chrome, go to [chrome://inspect/#service-workers](chrome://inspect/#service-workers) and click `inspect` on the service worker you want to debug.

This is the MDN documentation for showNotification [https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)

# service-worker.js

```
const activatePushEvent = () => {
  self.addEventListener('push', (event) => {
    const data = event.data.json()
    const body = data.body
    const icon = data.icon
    const url = data.data.url

    event.waitUntil(
      self.registration.pushManager
        .permissionState({ userVisibleOnly: true })
        .then((permissionState) => {
          if (permissionState === 'granted') {

            return self.registration.showNotification(body, {
              icon: icon,
              data: {
                url: url
              }
            })
          } else if (permissionState === 'prompt') {
            self.registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: yourApplicationServerKey,
            })
          }
        }),
    )
  })

  self.addEventListener('notificationclick', (event) => {
    const url = event.notification.data.url
    event.waitUntil(clients.openWindow(url));
  })
}

activatePushEvent()

```
