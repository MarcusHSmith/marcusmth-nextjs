---
path: blog
date: "2020-01-07T22:28:05.284Z"
lastUpdated: "2020-01-07T22:28:05.284Z"
title: Formik with Semantic-UI Components
description: How to use Formik with Semantic-UI-React components
isPublished: true
tags:
  - formik
  - semantic
  - ui
  - javascript
  - typescript
  - react
---

How to use [Formik](https://jaredpalmer.com/formik/docs/overview) with [Semantic-UI-React](https://react.semantic-ui.com/) components

Initially I tried adding the `name` prop to the `Select` component.

```
import {  Select } from 'semantic-ui-react';
...
<Formik>
    {({ values, handleChange,}) => (
    <Form>
        <Form.Field>
            <Select
            name="mySelector"
            onChange={handleChange}
            value={values.mySelector}
            options={mySelectorOptions}/>
        </Form.Field>
    </Form>
    )}
</Formik>
```

This code threw the following error because Semantic-UI-React does not pass overloaded props when handling events.

```
Warning: Formik called `handleChange`, but you forgot to pass an `id` or `name` attribute to your input:
...
Formik cannot determine which value to update.
```

The solution is to use Formik hooks. `useField` allows access to the helper object which contains a method for setting the value in the callback. The hook constructor has a paramter for the field name. Using this hook allows any react component to be used in Formik forms. [Formik Hooks](https://jaredpalmer.com/formik/docs/api/useField)

```
...
<SelectFormikSemantic name="mySelector" options={mySelectorOptions} />
...

function SelectFormikSemantic(props: { name: string; options: SelectOptions[] }) {
    const [field, , helpers] = useField(props.name);
    return (
        <Select
        options={props.options}
        onChange={(e, v) => helpers.setValue(v.value)}
        value={field.value.value} />
    );
}
```

Additionally another object included in the 3-tuple is `field` which has data on the field including its current value.
