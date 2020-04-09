// eslint-disable-next-line
const NodeEnvironment = require('jest-environment-node');
const getBrowser = require('./getBrowser');

class PuppeteerEnvironment extends NodeEnvironment {
  // Jest is not available here, so we have to reverse engineer
  // the setTimeout function, see https://github.com/facebook/jest/blob/v23.1.0/packages/jest-runtime/src/index.js#L823
  setTimeout(timeout) {
    if (this.global.jasmine) {
      // eslint-disable-next-line no-underscore-dangle
      this.global.jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    } else {
      this.global[Symbol.for('TEST_TIMEOUT_SYMBOL')] = timeout;
    }
  }

  async setup() {
    const browser = await getBrowser();
    const page = await browser.newPage();
    this.global.browser = browser;
    this.global.page = page;
  }

  async teardown() {
    const { page, browser } = this.global;

    if (page) {
      await page.close();
    }

    if (browser) {
      await browser.disconnect();
    }

    if (browser) {
      await browser.close();
    }
  }
}

module.exports = PuppeteerEnvironment;
