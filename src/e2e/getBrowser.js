/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { execSync } = require('child_process');
const { join } = require('path');
const findChrome = require('carlo/lib/find_chrome');
const detectInstaller = require('detect-installer');

const installPuppeteer = () => {
  const packages = detectInstaller(join(__dirname, '../../'));
  const package = packages.find(detectInstaller.hasPackageCommand);
  console.log(`🤖 will use ${package} install puppeteer`);
  const command = `${package} ${package.includes('yarn') ? 'add' : 'i'} puppeteer`;
  execSync(command, {
    stdio: 'inherit',
  });
};
installPuppeteer();
const getBrowser = async () => {
  try {
    // eslint-disable-next-line import/no-unresolved
    const puppeteer = require('puppeteer-core');
    const findChromePath = await findChrome({});
    const { executablePath } = findChromePath;
    console.log(`🧲 find you browser in ${executablePath}`);
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
    // await installPuppeteer();
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
