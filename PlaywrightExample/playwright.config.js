// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    timeout: 25000,
    use: {
      headless: true,
      ignoreHTTPSErrors: true,
      launchOptions: {
        args: [
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
        ],
      },
    },
};
  
module.exports = config;