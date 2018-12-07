# PirpleTest
This is a built in Test Suite for the application


- As the application currently stands, it holds some simple methods, (`last`, `first`, `getANumber`) that could
proof that our test runner package works as intended

The approach taken for this test is simple and straightforward. The basically mimics Mocha in running their tests.

### Setup

To start setting up your tests. In the `tests` directory, add a new JS file.

You can simply get started with this as an example

```js
var assert = require('assert')
describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function (done) {
        assert.equal("Hello".length, 5);
        done()
    });
 it('should return first charachter of the string', function (done) {
        assert.equal("Hello".charAt(0), 'H');
        done();
    });
});
```
**NOTE: If you don't execute the `done` callback, your test won't be executed and included in the result**

#### Result:

<img width="539" alt="screen shot 2018-12-07 at 12 02 28 pm" src="https://user-images.githubusercontent.com/18662248/49641250-43e46200-fa18-11e8-9572-7875b9164d9a.png">
