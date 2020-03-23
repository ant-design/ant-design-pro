import puppeteer from 'puppeteer';

const getBrowser = async () => {
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
