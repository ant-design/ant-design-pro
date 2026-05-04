const path = require('path');

// Workaround for https://github.com/ant-design/ant-design-pro/issues/11747
// On Windows, @tailwindcss/node uses enhanced-resolve with a 4-second
// CachedInputFileSystem that can cache stale negative results (e.g. when
// Windows Defender locks node_modules). This causes intermittent
// "Can't resolve 'tailwindcss'" errors. Setting __tw_resolve bypasses
// enhanced-resolve by using Node.js require.resolve, which is reliable.
if (typeof globalThis.__tw_resolve !== 'function') {
  globalThis.__tw_resolve = (specifier, fromDir) => {
    if (specifier.startsWith('.') || specifier.startsWith('/')) return;
    try {
      const pkgJsonPath = require.resolve(specifier + '/package.json', {
        paths: [fromDir],
      });
      const pkg = require(pkgJsonPath);
      const pkgDir = path.dirname(pkgJsonPath);
      if (pkg.exports?.['.']?.style) {
        return path.join(pkgDir, pkg.exports['.'].style);
      }
      if (pkg.style) {
        return path.join(pkgDir, pkg.style);
      }
      const indexPath = path.join(pkgDir, 'index.css');
      try {
        require('fs').accessSync(indexPath);
        return indexPath;
      } catch {}
    } catch {}
  };
}

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
