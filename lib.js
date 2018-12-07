/*
 * Library holds our utility methods
 */

module.exports = (() => {
  var self = this;

  /*
   * Sample method for testing that simply returns a number
   */
  self.getANumber = () => {
    return 1;
  };

  /* 
   * Sample method that takes in an array and simply returns the first index
   */
  self.first = (array) => {
    return Array.isArray(array) ? array[0] : undefined;
  }

  
  /* 
   * Sample method that takes in an array and simply returns the first index
   */
  self.last = (array) => {
    return Array.isArray(array) ? array[array.length - 1] : undefined;
  }

  /* 
   * Sample method that takes in an array and simply returns the first index
   */
  self.square = (num) => {
    return Math.pow(num, 2);
  }

  return self;
})()