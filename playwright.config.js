// @ts-check
const { devices} = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  testMatch: '**/*.spec.js',
  /* Maximum time one test can run for. */
  timeout: 300 * 1000,
  //retries: 1,
  workers : 1,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    // browserName:'chromium',
    // viewport:{width:1366,height:625},
    // headless:false,
    // screenshot:'on',
    // trace:'on',
    // video: 'off',
  },
  /* Configure projects for major browsers */
    projects: [
      {
        name: process.env.BrowserAndVersion+':'+process.env.OS+'@'+process.env.Server,
        use: {
          screenshot:'only-on-failure',
          // headless:false,
        }
      },
   ],

  // /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  // /* Run your local dev server before starting the tests */
  // // webServer: {
  // //   command: 'npm run start',
  // //   port: 3000,
  // // },

  /* globalSetup for providing support for execute multiple environments */

  globalSetup: "src/utils/globalSetup.js"
};

module.exports = config;

