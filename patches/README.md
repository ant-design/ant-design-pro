# Patches

This directory contains patches applied to node_modules using `patch-package`.

## @ant-design/pro-components@3.1.12-0

### Issue
The "拷贝设置" (Copy Settings) button in the `SettingDrawer` component was not working properly. When the modern `navigator.clipboard.writeText()` API failed (due to lack of secure context, browser compatibility, or permissions), the error was silently caught without any feedback to the user, making it appear as if the button was broken.

### Fix
Added a fallback mechanism that:
1. First tries to use the modern `navigator.clipboard.writeText()` API
2. If that fails, falls back to the older `document.execCommand('copy')` method
3. Shows an error message to the user if both methods fail

This ensures the copy functionality works in more environments and provides proper user feedback when it doesn't work.

### Files Modified
- `es/layout/components/SettingDrawer/index.js`
- `lib/layout/components/SettingDrawer/index.js`

### How to Apply
The patches are automatically applied during `npm install` via the `postinstall` script in `package.json`.

To manually apply patches:
```bash
npx patch-package
```

To regenerate patches after making changes to node_modules:
```bash
npx patch-package @ant-design/pro-components
```
