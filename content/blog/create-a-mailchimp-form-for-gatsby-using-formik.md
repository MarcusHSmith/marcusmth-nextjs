---
path: blog
date: "2020-03-15T20:01:27.109Z"
lastUpdated: "2020-03-15T20:01:27.136Z"
title: Create a MailChimp form for Gatsby using Formik
description: >-
  How to build a MailChimp submission form for a Gatsby site using Formik in
  React
isPublished: true
tags:
  - react
---

This site needed an email submission form to maintain viewers' email for future newsletters. [Formik](https://jaredpalmer.com/formik) is my standard for creating react forms. This quick tutorial will show you how to set up a Formik form on a [Gatsby](https://www.gatsbyjs.org/) site.

Gatsby has outdated [instructions](https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/) on how to add MailChimp to a website. These are still helpful. The [MailChimp Endpoint](https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/#mailchimp-endpoint) is now found at `Create > Signup Form` then `Embedded form > Begin`. In the `Copy/paste onto your site` section (which isn't easily copy and paste-able, the list url is included. For me this is: [https://marcusmth.us19.list-manage.com/subscribe/post?u=ad029d5ad74ac2e045f7d5d6b&amp;id=603f11dd41](https://marcusmth.us19.list-manage.com/subscribe/post?u=ad029d5ad74ac2e045f7d5d6b&id=603f11dd41).

This tutorial varies at [Gatsby Import Plugin Instructions](https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/#gatsby-import-plugin-instructions). Hopefully you already have Formik included in your project (`$ yarn add Formik`).

MailChimp requires specific names for fields, so `firstName` must be renamed to `FNAME`.

- `FNAME` - firstName
- `LNAME` - lastName
- `EMAIL` - email
- `ADDRESS` - address
- `PHONE` - phone
- `BIRTHDAY` - birthday

```
import React from "react"

import addToMailchimp from "gatsby-plugin-mailchimp"
import { useFormik } from "formik"

const MailChimpForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
    },
    onSubmit: values => {
      addToMailchimp(values.email, {FNAME: values.firstName})
      .then(data => {
        if (data.result === "error") {
            alert("error: likely a duplicate email");
        } else {
            alert("success");
      })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        id="firstName"
        name="firstName"
        type="text"
        placeholder="name"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default MailChimpForm
```

Finally drop this component anywhere in your site and collect emails for MailChimp.

`<MailChimpForm/>`
