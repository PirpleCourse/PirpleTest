/*
 * This file is to test the methods in the lib directory
 */

var assert = require('assert');
var lib = require('./../lib');

describe('Test getANumber', () => {
  it('Should return a number', (done) => {
    var val = lib.getANumber();
    assert.equal(typeof(val), 'number');
    done();
  });

  it('Should return 1', (done) => {
    var val = lib.getANumber();
    assert.equal(val, 1);
    done();
  });

  it('Should return 2', (done) => {
    var val = lib.getANumber();
    assert.equal(val, 2);
    done();
  });
});

describe('Test lib.first method', () => {
  it('Should return the first element in an array', (done) => {
    var val = lib.first([1,2,4]);
    assert.equal(val, 1);
    done();
  });

  it('If element is falsy, then return the first truthy value', (done) => {
    var val = lib.first([undefined, 2, 3]);
    assert.equal(val, 2);
    done();
  })
});


describe('Test lib.last', () => {
  it('Should return the last element in an array', (done) => {
    var val = lib.last([1,2,4]);
    assert.equal(val, 4);
    done();
  });

  it('If element is falsy, then return the truthy value from the last', (done) => {
    var val = lib.last([1, 2, undefined]);
    assert.equal(val, 2);
    done();
  })  
});

describe('Test Square power root', () => {
  it('Should return the square power of every given number', (done) => {
    var val = lib.square(2);
    assert.equal(val, 4);
    done();  	
  })
})