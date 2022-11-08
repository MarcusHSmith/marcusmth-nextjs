---
path: blog
date: "2021-06-03T14:38:50.104Z"
lastUpdated: "2021-06-03T14:53:53.611Z"
title: Graphql Union Resolver
description: Simple example of a Graphql Union with a Resolver
tags:
  - graphql
  - typescript
isPublished: true
---

The Graphql documentation glosses over some basic points in teaching unions. These caused me some issues and maybe you too. It's recommended that you read the [documentation](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/) first.

In this example I have a `User` type and I want to add an `avatar` field. This can either be an `AvatarImage` or `AvatarIntials`.

## Code

### `schema.graphql`

```
type User {
  ...
  avatar = UserAvatar!
}

union UserAvatar = AvatarImage | AvatarInitials

type AvatarImage {
  image: Image!
}

type AvatarInitials {
  initials: String!
}
```

Create a file to create these classes in javascript or typescript.

### `UserAvatar.ts`

```
export abstract class UserAvatar {
    abstract get typename(): string;
  }

  export class AvatarImage extends UserAvatar {
    readonly image: ImageModel;

    constructor(image: ImageModel) {
      super();
      this.image = image;
    }

    get typename() {
      return "AvatarImage";
    }
  }

  export class AvatarInitials extends UserAvatar {
    readonly initials: String;

    constructor(initials: String) {
      super();
      this.initials = initials;
    }

    get typename() {
      return "AvatarInitials";
    }
  }
```

### `userResolver.ts`

```
export default {
  User: {
    id: ...,
    ...
  },
  UserAvatar: {
    __resolveType(obj: any) {
      if (obj instanceof UserAvatar) {
        return obj.typename;
      } else {
        throw new Error(`Invalid type provided for a UserAvatar instance`);
      }
    }
  },
```

### `User.ts`

```
export default class User {
  ...
  avatar() {
    if (true /* conditional */) {
      return new AvatarImage(image)
    } else {
      return new AvatarInitials("MS")
    }
  }
}
```

## Learnings

I missed a few things while building this. I nested `avatar` or `UserAvatar` in the `User` block. I also didn't know where to provide the value which turned out to be the `User` entity.

## Errors

This helped solve my error messages of

`"Abstract type \"UserAvatar\" must resolve to an Object type at runtime for field \"User.avatar\". Either the \"PUserAvatar\" type should provide a \"resolveType\" function or each possible type should provide an \"isTypeOf\" function."`

`"Cannot return null for non-nullable field User.avatar."`
