---
title: Exception
cols: 1
order: 5
---

Exceptions page is used to provide feedback on specific abnormal state. Usually, it contains an explanation of the error status, and provides users with suggestions or operations, to prevent users from feeling lost and confused.

## API

Property | Description | Type | Default
---------|-------------|------|--------
| backText | default return button text | ReactNode | back to home |
type | type of exception, the corresponding default `title`, `desc`, `img` will be given if set, which can be overridden by explicit setting of `title`, `desc`, `img` | Enum {'403', '404', '500'} | -
title | title | ReactNode | -
desc | supplementary description | ReactNode | -
img | the url of background image | string | -
actions | suggested operations, a default 'Home' link will show if not set | ReactNode | -
linkElement | to specify the element of link | string\|ReactElement | 'a'
redirect | redirect path | string | '/'