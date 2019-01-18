// ps https://github.com/GoogleChrome/puppeteer/issues/3120
module.exports = {
  launch: {
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
    ],
  },
};
