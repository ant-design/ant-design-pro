const eslintConfig = require('umi-lint/config/.eslintrc.js');
module.exports = {
  ...eslintConfig,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
