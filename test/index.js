/*
 * Mini package testing suite. Trying to do similar as mocha/chai basic spec testing steps
 */

// Override the NODE_ENV variable
process.env.NODE_ENV = 'testing';

// Dependencies
const fs = require('fs');

((runTests) => {

  var self = this;
  self.tests = {};
  self.results = {
    'errors':[],
    'successes': [],
    'counter': 0
  };
  // self.numberOfTests = 0;

  self.run = run;
  self.pack = pack;
  self.execute = execute;
  self.runTest = runTest;
  self.printReport = printReport;

  /**************DEFINE GLOBALS**************/

  global.it = (testName, done) => {
    // This is a hacky unstable way to find the descriptor.
    // But for a small scale it does the job
    let keys = Object.keys(arguments[0].tests);
    let suiteName = keys[keys.length - 1];
    Array.isArray(self.tests[suiteName]) && self.tests[suiteName].push({testName, done})
  }

  global.describe = (suiteName, callback) => {
    if (suiteName && !self.tests[suiteName]) {
      self.tests[suiteName] = [];
      try {
        callback();
      } catch(e) {
        console.log('Something happened when running suite: ' + suiteName + '. Shutting off')
        process.exit(0)
      }
    }
  }

  /******************************************/

  /*
   * This is the packager method
   * that packs all tests in a file. It simply reads
   * lists the files in the test directory and requires it.
   * NOTE: It doesn't handle subdirectories at the moment
   */
  function pack () {
    // List the files in the test dir
    fs.readdirSync(__dirname).forEach((file) => {
      if (file !== 'index.js') {
        // Require will execute all describes in a file.
        require(`./${file}`);
      }
    });
  }

  /*
   * This function executes the tests. Mainly
   * loops over all test suits that have been packed
   * and executes them
   */
  function execute() {
    for(var suiteName in self.tests){
       if(self.tests.hasOwnProperty(suiteName)) {
         var subTests = self.tests[suiteName];
         console.log('\x1b[36m%s\x1b[0m', '\n- ' + `SUITE: ${suiteName}`);
         subTests.forEach((subTest) => {
           if(subTest.hasOwnProperty('testName')) {
             self.runTest(subTest, suiteName)
            }
         })
       }
    }
  }

  /*
   * The method here runs a test
   * On a high level. The result is being added to a global
   * object holding the failures/passes of the execution happened here.
   */
  function runTest({testName, done}, suiteName) {
    // Call the test
    try {
      done(function(){
        self.results.successes.push({
          'name': testName,
          'suiteName': suiteName
        })
        console.log('\x1b[32m%s\x1b[0m', `\u2713 ${testName}`);
      });
    } catch(e){
      self.results.errors.push({
        'name' : testName,
        'error' : e,
        'suiteName': suiteName
      });
      console.log('\x1b[31m%s\x1b[0m', `\u2718 ${testName}`);
    }

    self.results.counter++;
  }

  /*
   * This is the last method used when testing a suite
   * It prints the results of `self.results` object.
   * In a human readable way to the terminal.
   */
  function printReport() {
    let { errors, successes, counter } = self.results;
    var totalOfResults = errors.length + successes.length;
    console.log("");
    console.log("--------BEGIN TEST REPORT--------");
    console.log("");
    console.log("Total Tests: ", counter);
    console.log("Pass: ", successes.length);
    console.log("Fail: ", errors.length);

    if (totalOfResults !== counter) {
      console.log('\x1b[31m%s\x1b[0m', "NOTE: It looks like not all tests have been executed. Make sure to execute the callback `done()` in your test")
    }

    // If there are errors, print them in detail
    if(errors.length > 0){
      console.log("--------BEGIN ERROR DETAILS--------");
      console.log("");
      errors.forEach(function(testError){
        console.log('\x1b[31m%s\x1b[0m',testError.name);
        console.log(testError.error);
        console.log("");
      });
      console.log("");
      console.log("--------END ERROR DETAILS--------");
    }
    console.log("");
    console.log("--------END TEST REPORT--------");
    process.exit(0);
  }

  /*
   * This method is the initiator for the test suite runner.
   * When called, it runs all defined tests.
   */
  function run() {
    self.pack();
    self.execute();
    self.printReport();
  }

  run && self.run();

})(true)