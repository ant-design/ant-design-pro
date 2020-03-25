/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { spawn } = require('child_process');
const findChrome = require('carlo/lib/find_chrome');

const installPuppeteer = () => {
  return new Promise((resolve) => {
    const testCmd = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['i', 'puppeteer'], {
      stdio: 'inherit',
    });
    testCmd.on('exit', (code) => {
      resolve(code);
    });
  });
};

const getBrowser = async () => {
  try {
    // eslint-disable-next-line import/no-unresolved
    const puppeteer = require('puppeteer-core');
    const findChromePath = await findChrome({});
    const { executablePath } = findChromePath;
    console.log(`你的浏览器安装在：${executablePath}`);
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
    await installPuppeteer();
  }
  await installPuppeteer();
  // eslint-disable-next-line import/no-unresolved
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
    headless: false,
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
