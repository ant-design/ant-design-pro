---
title: AvatarList
order: 1
cols: 1
---

A list of user's avatar for project or group member list frequently. If a large or small AvatarList is desired, set the `size` property to either `large` or `small` and `mini` respectively. Omit the `size` property for a AvatarList with the default size.

## API

### AvatarList

| Property | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| size | size of list | `large`、`small` 、`mini`, `default` | `default` |

### AvatarList.Item

| Property | Description | Type | Default |
|----------|------------------------------------------|-------------|-------|
| tips | title tips for avatar item | ReactNode | - |
| src | the address of the image for an image avatar | string | - |
