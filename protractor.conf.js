exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub', // This is the default address of the Selenium server
    specs: ['e2e/*.spec.js'], // Specifies where the test files are located
    onPrepare: function () {
      browser.manage().window().maximize(); // Maximizes the browser window before running tests
      require('ts-node').register({
        project: require('path').join(__dirname, './tsconfig.json') // Allows on-the-fly compilation of TypeScript
      });
    },
    useAllAngular2AppRoots: true
  };
  