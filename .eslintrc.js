module.exports = {
  extends: ['eslint-config-umi', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'jsx-a11y/href-no-hash': [0],
  },
  settings: {
    polyfills: ['fetch', 'promises'],
  },
};
