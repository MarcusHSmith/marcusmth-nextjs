---
path: cheatsheet
date: 2021-02-03T21:35:45.553Z
lastUpdated: 2022-01-03T15:23:00.213Z
title: TypeORM Cheatsheet
description: Tools and Links to help with TypeORM
tags:
  - typeORM
  - nodejs
  - postgresql
isPublished: true
---

### [TypeORM](https://typeorm.io/#/)

## Relationships

When querying for entities you can request associated entities that the parent entity has a relationship with.\
\`await UserEntity.find({relations: \["homes"]});\`

If \`homes\` also has a relationship that should be returned\
\`await UserEntity.find({relations: \["home", "home.address"]});\`

## Tips

How to use joins with `.find(...)` [link](https://github.com/typeorm/typeorm/issues/5215#issuecomment-566253819)

To add a limit to a `find(` request, add the keyword `take:`)

When creating a nullable entity, the variable needs to be nullable too

```
  @Column({ type: String, nullable: true })
  token: string | null;
```
