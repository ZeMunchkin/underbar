(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };


  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    }
    if (n > array.length) {
      return array;
    }
    return array.slice((array.length - n), (array.length));
  };


  _.each = function(collection, iterator) {
    if (!Array.isArray(collection)) {
      var objKeys = Object.keys(collection);
      for (var i = 0; i < objKeys.length; i++) {
        iterator(collection[objKeys[i]], objKeys[i], collection);
      }
    } else {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
  };


  _.indexOf = function(array, target){
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };


  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if (test(item)) {
        result.push(item);
      }
    });
    return result;
  };


  _.reject = function(collection, test) {
    var results = [];
    _.each(collection, function (item) {
      if (!test(item)) {
        results.push(item);
      }
    })
    return results;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var results = [];
    if (arguments.length <= 2) {
      _.each(array, function (item) {
        if (_.indexOf(results, item) === -1) {
          results.push(item);
        }
      });
    }

    if (arguments.length === 3) {
      var iteratedResults = [];
      _.each(array, function (item) {
        if (_.indexOf(iteratedResults, iterator(item)) === -1) {
          results.push(item);
          iteratedResults.push(iterator(item));
        }
      });
    }
    return results;
  };


  _.map = function(collection, iterator) {
    var results = [];
    _.each(collection, function (item) {
      results.push(iterator(item));
    });
    return results;
  };


  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if (arguments[2] === undefined && Array.isArray(collection)) {
      var shiftedCollection = collection.slice(1);
      accumulator = collection[0];
      _.each(shiftedCollection, function (item) {
        accumulator = iterator(accumulator, item);
      });
      return accumulator;
    }

    if (arguments[2] === undefined && !Array.isArray(collection)) {
      var keys = Object.keys(collection);
      accumulator = collection[keys[0]];
      var shiftedKeys = keys.slice(1);
      _.each(shiftedKeys, function (key) {
        accumulator = iterator(accumulator, collection[key]);
      });
      return accumulator;
    }

    _.each(collection, function (item) {
      accumulator = iterator(accumulator, item);
    });
    return accumulator;
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  _.every = function(collection, iterator) {
    if (!iterator) {
      iterator = function (item) {
        return !!item;
      }
    }

    return _.reduce(collection, function (acc, item) {
      if (acc === false) {
        return acc;
      }
      acc = !!iterator(item);
      return acc;
    }, true);
  };


  _.some = function(collection, iterator) {
    if (!iterator) {
      iterator = function (item) {
        return !!item;
      }
    }

    return _.reduce(collection, function (acc, item) {
      if (acc === true) {
        return acc;
      }
      acc = !!iterator(item);
      return acc;
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  _.extend = function(obj) {
    var argumentsArray = [];
    for (var i = 1; i < arguments.length; i++) {
      argumentsArray.push(arguments[i]);
    }
    _.each(argumentsArray, function(arguObj) {
      for (var key in arguObj) {
        obj[key] = arguObj[key];
      }
    });
    return obj;
  };

  _.defaults = function(obj) {
    var argumentsArray = [];
    for (var i = 1; i < arguments.length; i++) {
      argumentsArray.push(arguments[i]);
    }
    _.each(argumentsArray, function (arguObj) {
      for (var key in arguObj) {
        if (obj[key] === undefined) {
          obj[key] = arguObj[key];
        }
      }
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var storage = {};

    return function () {
      var args = JSON.stringify(arguments);
      if (storage[args]) {
        return storage[args];
      }
      var results = func.apply(this, arguments);
      storage[args] = results;
      return results;
    };
  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [].slice.call(arguments);
    args = args.slice(2);

    setTimeout(function () {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var randomizedArray = [];
    var workingArray = array.slice();

    while (workingArray.length > 0) {
      var currentLength = workingArray.length;
      var randomIndex = Math.floor(Math.random() * currentLength);
      console.log(randomIndex);
      randomizedArray.push(workingArray[randomIndex]);
      workingArray.splice(randomIndex, 1);
    }

    return randomizedArray;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
