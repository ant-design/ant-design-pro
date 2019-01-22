// ps https://github.com/GoogleChrome/puppeteer/issues/3120
module.exports = {
  launch: {
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
    ],
  },
  server: {
    command: `npm start`,
    port: 8000,
    launchTimeout: 10000,
    debug: true,
  },
};
