module.exports = {
  testURL: 'http://localhost:8000',
  preset: 'jest-puppeteer',
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false, // pro only do not use in your production ; pro 专用环境变量，请不要在你的项目中使用它。
  },
};
