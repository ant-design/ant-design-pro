const { strictEslint } = require('@umijs/fabric');

module.exports = Object.assign({}, strictEslint, {
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
});
