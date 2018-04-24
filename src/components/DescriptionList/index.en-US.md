---
title: DescriptionList
cols: 1
order: 4
---

Groups display multiple read-only fields, which are common to informational displays on detail pages.

## API

### DescriptionList

| Property      | Description                         | Type        | Default |
|----------|------------------------------------------|-------------|---------|
| layout    | type of layout                          | Enum{'horizontal', 'vertical'}  | 'horizontal' |
| col       | specify the maximum number of columns to display, the final columns number is determined by col setting combined with [Responsive Rules](/components/DescriptionList#Responsive-Rules)             | number(0 < col <= 4)  | 3 |
| title     | title                                 | ReactNode  | - |
| gutter    | specify the distance between two items, unit is `px`  | number  | 32 |
| size     | size of list       | Enum{'large', 'small'}  | - |

#### Responsive Rules

| Window Width        | Columns Number                             | 
|---------------------|---------------------------------------------|
| `≥768px`           |  `col`                                       |
| `≥576px`           |  `col < 2 ? col : 2`                         |
| `<576px`           |  `1`                                         |

### DescriptionList.Description

| Property | Description                                      | Type         | Default |
|----------|------------------------------------------|-------------|-------|
| term     | item title                                 | ReactNode  | - |
