const path = require('path');
const fs = require('fs');

/**
 * Workaround for turbopack Windows path doubling bug.
 * On Windows, turbopack may pass a doubled relative path as the `from` option
 * to PostCSS (e.g. `./Desktop/demo/project/src/file.css` instead of `./src/file.css`),
 * causing `path.resolve(cwd, from)` to produce a non-existent doubled path.
 * This plugin detects and corrects the path before @tailwindcss/postcss reads it.
 * @see https://github.com/ant-design/ant-design-pro/issues/11747
 */
const fixWindowsPathPlugin = {
  postcssPlugin: 'fix-turbopack-windows-path',
  Once(_root, { result }) {
    const from = result.opts.from;
    if (!from || fs.existsSync(from)) return;

    const cwd = process.cwd();
    const resolved = path.resolve(from);
    const relative = path.relative(cwd, resolved);
    const parts = relative.split(path.sep);

    for (let i = 1; i < parts.length; i++) {
      const candidate = path.join(cwd, ...parts.slice(i));
      if (fs.existsSync(candidate)) {
        result.opts.from = candidate;
        return;
      }
    }
  },
};

module.exports = {
  plugins: [fixWindowsPathPlugin, require('@tailwindcss/postcss')],
};
