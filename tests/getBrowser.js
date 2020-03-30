/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const findChrome = require('carlo/lib/find_chrome');

const getBrowser = async () => {
  try {
    // eslint-disable-next-line import/no-unresolved
    const puppeteer = require('puppeteer-core');
    const findChromePath = await findChrome({});
    const { executablePath } = findChromePath;
    const browser = await puppeteer.launch({
      executablePath,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-first-run',
        '--no-zygote',
        '--no-sandbox',
      ],
    });
    return browser;
  } catch (error) {
    console.log('🧲 no find chrome');
  }

  // eslint-disable-next-line import/no-unresolved
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-zygote',
      '--no-sandbox',
    ],
  });
  return browser;
};

module.exports = getBrowser;
