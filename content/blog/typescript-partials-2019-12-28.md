---
path: blog
date: "2019-12-28T22:13:05.284Z"
lastUpdated: "2019-12-28T22:13:05.284Z"
title: Creating and retrieving using Typescript Partials
description: How to use Tyescript Partials which is useful in React projects
isPublished: true
tags:
  - react
---

Last week I had an interesting problem in typescript. A database column needed to store json blobs that fit multiple interfaces. These interfaces were often overlapping.

To simplify this discussion, the column was intended to store animals, let's call the column `Zoo`. Each species has its own set of required parameters.

Initially I tried

```
interface Zoo = Mammal | Fish | Bird

interface Mammal {
  hairLength: number;
}
...
```

However typescript doesn't allow OR checks on interfaces. The best solution ended up using `Partial` interface combinations to allow `Zoo` to accept all these animal types.

On the retrieval side, it needed to determine what interface to `Zoo` json conforms to. One solution was to check every field against what was provided but that would be expensive and not scalable. The solution was to have a key for each interface and check if is in the interface.

Each Animal type is given a field to reference its interface. Sharks are given `typeIsShark` while Eagle are given `TypeIsEagle`. On retrieval at runtime the interface can be checked with `"TypeIsEagle" in arg` and then displayed accordingly.

```
import React from "react"

type iAnimal = Animal & Partial<Eagle> & Partial<Shark>

interface Animal {
  name: string
}
interface Eagle {
  typeIsEagle?: boolean
  talonSize: number
}
interface Shark {
  typeIsShark?: boolean
  teethLength: number
}
type InputShark = Shark & Animal
type InputEagle = Eagle & Animal
function createShark(data: InputShark): iAnimal {
  return { ...data, typeIsShark: true }
}

function createEagle(data: InputEagle): iAnimal {
  return { ...data, typeIsEagle: true }
}

function isEagle(arg: iAnimal): boolean {
  return "typeIsEagle" in arg
}

function isShark(arg: iAnimal): boolean {
  return "typeIsShark" in arg
}

const Zoo = () => {
  const greatWhiteShark: iAnimal = createShark({
    name: "Great White Shark",
    teethLength: 10,
  })

  const BaldEagle: iAnimal = createEagle({
    name: "Bald Eagle",
    talonSize: 3,
  })

  return (
    <>
      <DisplayAnimal animal={greatWhiteShark} />
      <DisplayAnimal animal={BaldEagle} />
    </>
  )
}

const DisplayAnimal = (props: { animal: iAnimal }) => (
  <>
    <h1>Name: {props.animal.name}</h1>
    {isEagle(props.animal) && <p>TalonSize: {props.animal.talonSize}</p>}
    {isShark(props.animal) && <p>TeethLength: {props.animal.teethLength}</p>}
  </>
)

export default Zoo
```

This should help illustrate how you can nest interfaces and decern them on retrieval.
