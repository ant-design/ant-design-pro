// ps https://github.com/GoogleChrome/puppeteer/issues/3120
module.exports = {
  launch: {
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--no-first-run', '--no-zygote'],
  },
  server: {
    command: 'yarn start',
    port: 8000,
    launchTimeout: 50000,
    usedPortAction: 'kill',
  },
};
