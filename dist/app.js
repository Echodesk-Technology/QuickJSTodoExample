/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/browser-split/index.js":
/*!*********************************************!*\
  !*** ./node_modules/browser-split/index.js ***!
  \*********************************************/
/***/ ((module) => {

/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = function split(undef) {
  var nativeSplit = String.prototype.split,
      compliantExecNpcg = /()??/.exec("")[1] === undef,
      // NPCG: nonparticipating capturing group
  self;

  self = function (str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }

    var output = [],
        flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + ( // Proposed for ES6
    separator.sticky ? "y" : ""),
        // Firefox 3+
    lastLastIndex = 0,
        // Make `global` and avoid `lastIndex` issues by working with a copy
    separator = new RegExp(separator.source, flags + "g"),
        separator2,
        match,
        lastIndex,
        lastLength;
    str += ""; // Type-convert

    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */


    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)

    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;

      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index)); // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups

        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function () {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }

        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }

        lastLength = match[0].length;
        lastLastIndex = lastIndex;

        if (output.length >= limit) {
          break;
        }
      }

      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }

    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }

    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
}();

/***/ }),

/***/ "./node_modules/lodash.escape/index.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash.escape/index.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;
/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/** Used to match HTML entities and HTML characters. */

var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
/** Used to map characters to HTML entities. */

var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}
/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */


var escapeHtmlChar = basePropertyOf(htmlEscapes);
/** Used for built-in method references. */

var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Built-in value references. */

var Symbol = root.Symbol;
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}
/**
 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in IE < 9, they can break out of
 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
 * [#133](https://html5sec.org/#133) of the
 * [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */


function escape(string) {
  string = toString(string);
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
}

module.exports = escape;

/***/ }),

/***/ "./node_modules/lodash.forown/index.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash.forown/index.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */


function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeKeys = overArg(Object.keys, Object);
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */


var baseFor = createBaseFor();
/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */

function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */


function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */


function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */


function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */


function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */


function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */


var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */


function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */


function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */


function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */


function forOwn(object, iteratee) {
  return object && baseForOwn(object, typeof iteratee == 'function' ? iteratee : identity);
}
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */


function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */


function identity(value) {
  return value;
}

module.exports = forOwn;

/***/ }),

/***/ "./node_modules/lodash.kebabcase/index.js":
/*!************************************************!*\
  !*** ./node_modules/lodash.kebabcase/index.js ***!
  \************************************************/
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;
/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/** Used to match words composed of alphanumeric characters. */

var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
/** Used to match Latin Unicode letters (excluding mathematical operators). */

var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
/** Used to compose unicode character classes. */

var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
/** Used to compose unicode capture groups. */

var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';
/** Used to compose unicode regexes. */

var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
/** Used to match apostrophes. */

var reApos = RegExp(rsApos, 'g');
/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */

var reComboMark = RegExp(rsCombo, 'g');
/** Used to match complex or compound words. */

var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')', rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr, rsUpper + '+' + rsOptUpperContr, rsDigits, rsEmoji].join('|'), 'g');
/** Used to detect strings that need a more robust regexp to match words. */

var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/** Used to map Latin Unicode letters to basic Latin letters. */

var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',
  '\xc1': 'A',
  '\xc2': 'A',
  '\xc3': 'A',
  '\xc4': 'A',
  '\xc5': 'A',
  '\xe0': 'a',
  '\xe1': 'a',
  '\xe2': 'a',
  '\xe3': 'a',
  '\xe4': 'a',
  '\xe5': 'a',
  '\xc7': 'C',
  '\xe7': 'c',
  '\xd0': 'D',
  '\xf0': 'd',
  '\xc8': 'E',
  '\xc9': 'E',
  '\xca': 'E',
  '\xcb': 'E',
  '\xe8': 'e',
  '\xe9': 'e',
  '\xea': 'e',
  '\xeb': 'e',
  '\xcc': 'I',
  '\xcd': 'I',
  '\xce': 'I',
  '\xcf': 'I',
  '\xec': 'i',
  '\xed': 'i',
  '\xee': 'i',
  '\xef': 'i',
  '\xd1': 'N',
  '\xf1': 'n',
  '\xd2': 'O',
  '\xd3': 'O',
  '\xd4': 'O',
  '\xd5': 'O',
  '\xd6': 'O',
  '\xd8': 'O',
  '\xf2': 'o',
  '\xf3': 'o',
  '\xf4': 'o',
  '\xf5': 'o',
  '\xf6': 'o',
  '\xf8': 'o',
  '\xd9': 'U',
  '\xda': 'U',
  '\xdb': 'U',
  '\xdc': 'U',
  '\xf9': 'u',
  '\xfa': 'u',
  '\xfb': 'u',
  '\xfc': 'u',
  '\xdd': 'Y',
  '\xfd': 'y',
  '\xff': 'y',
  '\xc6': 'Ae',
  '\xe6': 'ae',
  '\xde': 'Th',
  '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',
  '\u0102': 'A',
  '\u0104': 'A',
  '\u0101': 'a',
  '\u0103': 'a',
  '\u0105': 'a',
  '\u0106': 'C',
  '\u0108': 'C',
  '\u010a': 'C',
  '\u010c': 'C',
  '\u0107': 'c',
  '\u0109': 'c',
  '\u010b': 'c',
  '\u010d': 'c',
  '\u010e': 'D',
  '\u0110': 'D',
  '\u010f': 'd',
  '\u0111': 'd',
  '\u0112': 'E',
  '\u0114': 'E',
  '\u0116': 'E',
  '\u0118': 'E',
  '\u011a': 'E',
  '\u0113': 'e',
  '\u0115': 'e',
  '\u0117': 'e',
  '\u0119': 'e',
  '\u011b': 'e',
  '\u011c': 'G',
  '\u011e': 'G',
  '\u0120': 'G',
  '\u0122': 'G',
  '\u011d': 'g',
  '\u011f': 'g',
  '\u0121': 'g',
  '\u0123': 'g',
  '\u0124': 'H',
  '\u0126': 'H',
  '\u0125': 'h',
  '\u0127': 'h',
  '\u0128': 'I',
  '\u012a': 'I',
  '\u012c': 'I',
  '\u012e': 'I',
  '\u0130': 'I',
  '\u0129': 'i',
  '\u012b': 'i',
  '\u012d': 'i',
  '\u012f': 'i',
  '\u0131': 'i',
  '\u0134': 'J',
  '\u0135': 'j',
  '\u0136': 'K',
  '\u0137': 'k',
  '\u0138': 'k',
  '\u0139': 'L',
  '\u013b': 'L',
  '\u013d': 'L',
  '\u013f': 'L',
  '\u0141': 'L',
  '\u013a': 'l',
  '\u013c': 'l',
  '\u013e': 'l',
  '\u0140': 'l',
  '\u0142': 'l',
  '\u0143': 'N',
  '\u0145': 'N',
  '\u0147': 'N',
  '\u014a': 'N',
  '\u0144': 'n',
  '\u0146': 'n',
  '\u0148': 'n',
  '\u014b': 'n',
  '\u014c': 'O',
  '\u014e': 'O',
  '\u0150': 'O',
  '\u014d': 'o',
  '\u014f': 'o',
  '\u0151': 'o',
  '\u0154': 'R',
  '\u0156': 'R',
  '\u0158': 'R',
  '\u0155': 'r',
  '\u0157': 'r',
  '\u0159': 'r',
  '\u015a': 'S',
  '\u015c': 'S',
  '\u015e': 'S',
  '\u0160': 'S',
  '\u015b': 's',
  '\u015d': 's',
  '\u015f': 's',
  '\u0161': 's',
  '\u0162': 'T',
  '\u0164': 'T',
  '\u0166': 'T',
  '\u0163': 't',
  '\u0165': 't',
  '\u0167': 't',
  '\u0168': 'U',
  '\u016a': 'U',
  '\u016c': 'U',
  '\u016e': 'U',
  '\u0170': 'U',
  '\u0172': 'U',
  '\u0169': 'u',
  '\u016b': 'u',
  '\u016d': 'u',
  '\u016f': 'u',
  '\u0171': 'u',
  '\u0173': 'u',
  '\u0174': 'W',
  '\u0175': 'w',
  '\u0176': 'Y',
  '\u0177': 'y',
  '\u0178': 'Y',
  '\u0179': 'Z',
  '\u017b': 'Z',
  '\u017d': 'Z',
  '\u017a': 'z',
  '\u017c': 'z',
  '\u017e': 'z',
  '\u0132': 'IJ',
  '\u0133': 'ij',
  '\u0152': 'Oe',
  '\u0153': 'oe',
  '\u0149': "'n",
  '\u017f': 'ss'
};
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */

function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }

  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }

  return accumulator;
}
/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */


function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */


function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}
/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */


var deburrLetter = basePropertyOf(deburredLetters);
/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */

function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}
/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */


function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}
/** Used for built-in method references. */


var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Built-in value references. */

var Symbol = root.Symbol;
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */


function createCompounder(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}
/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */


function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}
/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */


var kebabCase = createCompounder(function (result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});
/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */

function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }

  return string.match(pattern) || [];
}

module.exports = kebabCase;

/***/ }),

/***/ "./node_modules/lodash.remove/index.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash.remove/index.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/** Used as the `TypeError` message for "Functions" methods. */

var FUNC_ERROR_TEXT = 'Expected a function';
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used to compose bitmasks for comparison styles. */

var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;
/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to match property names within property paths. */

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Detect free variable `exports`. */

var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}();
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */

function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */


function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */


function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */


function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */


function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */


function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */


function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */


function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}
/** Used for built-in method references. */


var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */


var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeKeys = overArg(Object.keys, Object);
/* Built-in method references that are verified to be native. */

var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */


function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */


function listCacheClear() {
  this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */

function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;
  this.__data__ = new MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
}
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */


function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);

  return this;
}
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */


function setCacheHas(value) {
  return this.__data__.has(value);
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Stack(entries) {
  this.__data__ = new ListCache(entries);
}
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function stackDelete(key) {
  return this.__data__['delete'](key);
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function stackGet(key) {
  return this.__data__.get(key);
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function stackHas(key) {
  return this.__data__.has(key);
}
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */


function stackSet(key, value) {
  var cache = this.__data__;

  if (cache instanceof ListCache) {
    var pairs = cache.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      return this;
    }

    cache = this.__data__ = new MapCache(pairs);
  }

  cache.set(key, value);
  return this;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */


function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}
/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */


function baseGetTag(value) {
  return objectToString.call(value);
}
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */


function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */


function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }

  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */


function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }

  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }

  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }

  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new Stack());
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */


function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (index--) {
    var data = matchData[index];

    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }

  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();

      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }

      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */


function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}
/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */


function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }

  if (value == null) {
    return identity;
  }

  if (typeof value == 'object') {
    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }

  return property(value);
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */


function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}
/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */


function baseMatches(source) {
  var matchData = getMatchData(source);

  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }

  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */


function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }

  return function (object) {
    var objValue = get(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}
/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */


function basePropertyDeep(path) {
  return function (object) {
    return baseGet(object, path);
  };
}
/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */


function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];

    if (length == lastIndex || index !== previous) {
      var previous = index;

      if (isIndex(index)) {
        splice.call(array, index, 1);
      } else if (!isKey(index, array)) {
        var path = castPath(index),
            object = parent(array, path);

        if (object != null) {
          delete object[toKey(last(path))];
        }
      } else {
        delete array[toKey(index)];
      }
    }
  }

  return array;
}
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */


function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;

  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */


function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */


function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */


function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Assume cyclic values are equal.


  var stacked = stack.get(array);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var index = -1,
      result = true,
      seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
          return seen.add(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */


function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= UNORDERED_COMPARE_FLAG; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */


function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  } // Assume cyclic values are equal.


  var stacked = stack.get(object);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */


function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, isStrictComparable(value)];
  }

  return result;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */


var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.

if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function (value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}
/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */


function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);
  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result) {
    return result;
  }

  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */


function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */


function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }

  var type = typeof value;

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */


function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */


function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}
/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */


function isStrictComparable(value) {
  return value === value && !isObject(value);
}
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */


function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }

    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}
/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */


function parent(object, path) {
  return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
}
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */


var stringToPath = memoize(function (string) {
  string = toString(string);
  var result = [];

  if (reLeadingDot.test(string)) {
    result.push('');
  }

  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */


function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */


function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}
/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
 * to pull elements from an array by value.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [1, 2, 3, 4];
 * var evens = _.remove(array, function(n) {
 *   return n % 2 == 0;
 * });
 *
 * console.log(array);
 * // => [1, 3]
 *
 * console.log(evens);
 * // => [2, 4]
 */


function remove(array, predicate) {
  var result = [];

  if (!(array && array.length)) {
    return result;
  }

  var index = -1,
      indexes = [],
      length = array.length;
  predicate = baseIteratee(predicate, 3);

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result.push(value);
      indexes.push(index);
    }
  }

  basePullAt(array, indexes);
  return result;
}
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */


function memoize(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function () {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };

  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
} // Assign cache to `_.memoize`.


memoize.Cache = MapCache;
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */


function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */


var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */


function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */


function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */


function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */


var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */

function toString(value) {
  return value == null ? '' : baseToString(value);
}
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */


function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */


function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */


function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */


function identity(value) {
  return value;
}
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */


function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = remove;

/***/ }),

/***/ "./node_modules/lodash.uniq/index.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash.uniq/index.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0;
/** `Object#toString` result references. */

var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */

function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */


function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }

  return false;
}
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }

  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */


function baseIsNaN(value) {
  return value !== value;
}
/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function cacheHas(cache, key) {
  return cache.has(key);
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */


function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */


function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}
/** Used for built-in method references. */


var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */


var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var splice = arrayProto.splice;
/* Built-in method references that are verified to be native. */

var Map = getNative(root, 'Map'),
    Set = getNative(root, 'Set'),
    nativeCreate = getNative(Object, 'create');
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */


function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */


function listCacheClear() {
  this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */

function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;
  this.__data__ = new MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
}
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */


function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);

  return this;
}
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */


function setCacheHas(value) {
  return this.__data__.has(value);
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */


function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);

    if (set) {
      return setToArray(set);
    }

    isCommon = false;
    includes = cacheHas;
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }

  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;
    value = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      var seenIndex = seen.length;

      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }

      if (iteratee) {
        seen.push(computed);
      }

      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }

      result.push(value);
    }
  }

  return result;
}
/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */


var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function (values) {
  return new Set(values);
};
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */

function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */


function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */


function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each
 * element is kept.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */


function uniq(array) {
  return array && array.length ? baseUniq(array) : [];
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */


function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */


function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */


function noop() {// No operation performed.
}

module.exports = uniq;

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ "./node_modules/parse-sel/index.js":
/*!*****************************************!*\
  !*** ./node_modules/parse-sel/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/parse-tag.js
var split = __webpack_require__(/*! browser-split */ "./node_modules/browser-split/index.js");

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = function parseSelector(selector, upper) {
  selector = selector || '';
  var tagName;
  var id = '';
  var classes = [];
  var tagParts = split(selector, classIdSplit);

  if (notClassId.test(tagParts[1]) || selector === '') {
    tagName = 'div';
  }

  var part, type, i;

  for (i = 0; i < tagParts.length; i++) {
    part = tagParts[i];

    if (!part) {
      continue;
    }

    type = part.charAt(0);

    if (!tagName) {
      tagName = part;
    } else if (type === '.') {
      classes.push(part.substring(1, part.length));
    } else if (type === '#') {
      id = part.substring(1, part.length);
    }
  }

  return {
    tagName: upper === true ? tagName.toUpperCase() : tagName,
    id: id,
    className: classes.join(' ')
  };
};

/***/ }),

/***/ "./node_modules/quick-error/quick-error.js":
/*!*************************************************!*\
  !*** ./node_modules/quick-error/quick-error.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

class checkForError extends Error {
  constructor(error) {
    super(error);
    const isError = `
        <h3 style="color: red;">TypeError: ${this.message}</h3>
        <p></p>
        <div class="error-con" style="background-color: #c7e2f1; border: 2px solid #38b6ff; padding: 8px 12px;">
                <div>${this.stack}</div>
        </div>`;
    document.getElementById("app").remove();
    document.getElementById("error").innerHTML = isError;
    throw new Error(error);
  }

}

exports.default = checkForError;

/***/ }),

/***/ "./node_modules/quickjs-component/lib/quick.js":
/*!*****************************************************!*\
  !*** ./node_modules/quickjs-component/lib/quick.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const quick_error_1 = __webpack_require__(/*! quick-error */ "./node_modules/quick-error/quick-error.js");

const snabbdom = __webpack_require__(/*! snabbdom */ "./node_modules/quickjs-component/node_modules/snabbdom/es/snabbdom.js");

const props_1 = __webpack_require__(/*! snabbdom/modules/props */ "./node_modules/quickjs-component/node_modules/snabbdom/modules/props.js");

const reconcile = snabbdom.init([props_1.default]);
const root = document.getElementById('app');

const snabbdom_1 = __webpack_require__(/*! snabbdom */ "./node_modules/quickjs-component/node_modules/snabbdom/es/snabbdom.js");

const init = __webpack_require__(/*! snabbdom-to-html/init */ "./node_modules/snabbdom-to-html/init.js");

const modules = __webpack_require__(/*! snabbdom-to-html/modules */ "./node_modules/snabbdom-to-html/modules/index.js");

const toHTML = init([modules.class, modules.props, modules.attributes, modules.style]); // interface IQuick {
//     readonly $el: Element,
// }
// function watchEffect(fn:P any) {
//     this.activeEffect = fn
//     fn()
//     this.activeEffect = null
// }

class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend(activeEffect) {
    if (activeEffect) this.subscribers.add(activeEffect);
  }

  notify() {
    this.subscribers.forEach(sub => {
      sub();
    });
  }

}

class Component {
  constructor(params) {
    let t = this;
    t.params = params;
  }

  componentDidMount() {}

  setState(partialState) {
    const _this = this;

    _this.state = { ..._this.state,
      ...partialState
    };

    Quick.__updater(_this);
  }

  render(el, r) {
    reconcile(root, el);
  }

}

const _pt = Component.prototype;
_pt.isQuickClassComponent = true;

const render = async (el, r) => {
  reconcile(root, el);
};

const $init = () => {
  const fav = document.createElement("link");
  fav.href = "/favicon.ico";
  fav.rel = "icon";
  const h = document.getElementsByTagName("head");
  console.log(h);
};

const $listener = (target, type, fn, prevent) => {
  document.addEventListener(type, e => {
    if (e.target.id === target) {
      fn();
    }

    if (e.target.className === target) {
      fn();
    } else {
      return false;
    }
  });

  if (prevent) {
    document.addEventListener(type, e => {
      e.preventDefault();

      if (target === "" || !target) {
        new quick_error_1.default(`target not passed to listener`);
      }

      if (e.target.id === target) {
        e.preventDefault();
        fn();
      }

      if (e.target.className === target) {
        e.preventDefault();
        fn();
      } else {
        return false;
      }
    });
  }
};

const use = func => {
  document.addEventListener("DOMContentLoaded", () => {
    func;
  });
};

const view = view => {
  const renderViewtoHTML = toHTML(view);
  document.querySelector("#app").innerHTML = renderViewtoHTML;
};

const createElement = (type, props = {}, ...children) => {
  children = children.flat();

  if (type.prototype && type.prototype.isQndReactClassComponent) {
    const componentInstance = new type(props);
    return componentInstance.render();
  }

  if (typeof type == 'function') {
    return type(props);
  }

  props = props || {};
  let dataProps = {};
  let eventProps = {};

  for (let propKey in props) {
    // event props always startwith on eg. onClick, onChange etc.
    if (propKey.startsWith('on')) {
      // onClick -> click
      const event = propKey.substring(2).toLowerCase();
      eventProps[event] = props[propKey];
    } else {
      dataProps[propKey] = props[propKey];
    }
  }

  return snabbdom_1.h(type, {
    props
  }, children);
};

const __updater = instance => {
  return instance;
};

const $config = env => {
  if (env === "production") {}

  if (env === "development") {}

  if (!env || env === "") {}
};

const Quick = {
  Component,
  use,
  view,
  createElement,
  __updater,
  $config,
  render,
  $init,
  $listener
};
Quick.use(Quick.$init);
Quick.use(Quick.$listener);
exports.default = Quick;

/***/ }),

/***/ "./node_modules/quickjs-component/node_modules/snabbdom/es/h.js":
/*!**********************************************************************!*\
  !*** ./node_modules/quickjs-component/node_modules/snabbdom/es/h.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ h),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./node_modules/quickjs-component/node_modules/snabbdom/es/vnode.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./node_modules/quickjs-component/node_modules/snabbdom/es/is.js");



function addNS(data, children, sel) {
  data.ns = 'http://www.w3.org/2000/svg';

  if (sel !== 'foreignObject' && children !== undefined) {
    for (var i = 0; i < children.length; ++i) {
      var childData = children[i].data;

      if (childData !== undefined) {
        addNS(childData, children[i].children, children[i].sel);
      }
    }
  }
}

function h(sel, b, c) {
  var data = {},
      children,
      text,
      i;

  if (c !== undefined) {
    data = b;

    if (_is__WEBPACK_IMPORTED_MODULE_1__.array(c)) {
      children = c;
    } else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(c)) {
      text = c;
    } else if (c && c.sel) {
      children = [c];
    }
  } else if (b !== undefined) {
    if (_is__WEBPACK_IMPORTED_MODULE_1__.array(b)) {
      children = b;
    } else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(b)) {
      text = b;
    } else if (b && b.sel) {
      children = [b];
    } else {
      data = b;
    }
  }

  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(children[i])) children[i] = (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.vnode)(undefined, undefined, undefined, children[i], undefined);
    }
  }

  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' && (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
    addNS(data, children, sel);
  }

  return (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.vnode)(sel, data, children, text, undefined);
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (h);

/***/ }),

/***/ "./node_modules/quickjs-component/node_modules/snabbdom/es/htmldomapi.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/quickjs-component/node_modules/snabbdom/es/htmldomapi.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlDomApi": () => (/* binding */ htmlDomApi),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createElement(tagName) {
  return document.createElement(tagName);
}

function createElementNS(namespaceURI, qualifiedName) {
  return document.createElementNS(namespaceURI, qualifiedName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(elm) {
  return elm.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function getTextContent(node) {
  return node.textContent;
}

function isElement(node) {
  return node.nodeType === 1;
}

function isText(node) {
  return node.nodeType === 3;
}

function isComment(node) {
  return node.nodeType === 8;
}

var htmlDomApi = {
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  getTextContent: getTextContent,
  isElement: isElement,
  isText: isText,
  isComment: isComment
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (htmlDomApi);

/***/ }),

/***/ "./node_modules/quickjs-component/node_modules/snabbdom/es/is.js":
/*!***********************************************************************!*\
  !*** ./node_modules/quickjs-component/node_modules/snabbdom/es/is.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "array": () => (/* binding */ array),
/* harmony export */   "primitive": () => (/* binding */ primitive)
/* harmony export */ });
var array = Array.isArray;
function primitive(s) {
  return typeof s === 'string' || typeof s === 'number';
}

/***/ }),

/***/ "./node_modules/quickjs-component/node_modules/snabbdom/es/snabbdom.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/quickjs-component/node_modules/snabbdom/es/snabbdom.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* reexport safe */ _h__WEBPACK_IMPORTED_MODULE_3__.h),
/* harmony export */   "thunk": () => (/* reexport safe */ _thunk__WEBPACK_IMPORTED_MODULE_4__.thunk),
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./node_modules/quickjs-component/node_modules/snabbdom/es/vnode.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./node_modules/quickjs-component/node_modules/snabbdom/es/is.js");
/* harmony import */ var _htmldomapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmldomapi */ "./node_modules/quickjs-component/node_modules/snabbdom/es/htmldomapi.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h */ "./node_modules/quickjs-component/node_modules/snabbdom/es/h.js");
/* harmony import */ var _thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thunk */ "./node_modules/quickjs-component/node_modules/snabbdom/es/thunk.js");




function isUndef(s) {
  return s === undefined;
}

function isDef(s) {
  return s !== undefined;
}

var emptyNode = (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.default)('', {}, [], undefined, undefined);

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function isVnode(vnode) {
  return vnode.sel !== undefined;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i,
      map = {},
      key,
      ch;

  for (i = beginIdx; i <= endIdx; ++i) {
    ch = children[i];

    if (ch != null) {
      key = ch.key;
      if (key !== undefined) map[key] = i;
    }
  }

  return map;
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];


function init(modules, domApi) {
  var i,
      j,
      cbs = {};
  var api = domApi !== undefined ? domApi : _htmldomapi__WEBPACK_IMPORTED_MODULE_2__.default;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      var hook = modules[j][hooks[i]];

      if (hook !== undefined) {
        cbs[hooks[i]].push(hook);
      }
    }
  }

  function emptyNodeAt(elm) {
    var id = elm.id ? '#' + elm.id : '';
    var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
    return (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.default)(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    return function rmCb() {
      if (--listeners === 0) {
        var parent_1 = api.parentNode(childElm);
        api.removeChild(parent_1, childElm);
      }
    };
  }

  function createElm(vnode, insertedVnodeQueue) {
    var i,
        data = vnode.data;

    if (data !== undefined) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode);
        data = vnode.data;
      }
    }

    var children = vnode.children,
        sel = vnode.sel;

    if (sel === '!') {
      if (isUndef(vnode.text)) {
        vnode.text = '';
      }

      vnode.elm = api.createComment(vnode.text);
    } else if (sel !== undefined) {
      // Parse selector
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
      if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot));
      if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));

      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);

      if (_is__WEBPACK_IMPORTED_MODULE_1__.array(children)) {
        for (i = 0; i < children.length; ++i) {
          var ch = children[i];

          if (ch != null) {
            api.appendChild(elm, createElm(ch, insertedVnodeQueue));
          }
        }
      } else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text));
      }

      i = vnode.data.hook; // Reuse variable

      if (isDef(i)) {
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      vnode.elm = api.createTextNode(vnode.text);
    }

    return vnode.elm;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
      }
    }
  }

  function invokeDestroyHook(vnode) {
    var i,
        j,
        data = vnode.data;

    if (data !== undefined) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);

      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);

      if (vnode.children !== undefined) {
        for (j = 0; j < vnode.children.length; ++j) {
          i = vnode.children[j];

          if (i != null && typeof i !== "string") {
            invokeDestroyHook(i);
          }
        }
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i_1 = void 0,
          listeners = void 0,
          rm = void 0,
          ch = vnodes[startIdx];

      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners);

          for (i_1 = 0; i_1 < cbs.remove.length; ++i_1) cbs.remove[i_1](ch, rm);

          if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
            i_1(ch, rm);
          } else {
            rm();
          }
        } else {
          // Text node
          api.removeChild(parentElm, ch.elm);
        }
      }
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0,
        newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx;
    var idxInOld;
    var elmToMove;
    var before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = oldKeyToIdx[newStartVnode.key];

        if (isUndef(idxInOld)) {
          // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];

          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          }

          newStartVnode = newCh[++newStartIdx];
        }
      }
    }

    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    var i, hook;

    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }

    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (oldVnode === vnode) return;

    if (vnode.data !== undefined) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);

      i = vnode.data.hook;
      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }

      api.setTextContent(elm, vnode.text);
    }

    if (isDef(hook) && isDef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
  }

  return function patch(oldVnode, vnode) {
    var i, elm, parent;
    var insertedVnodeQueue = [];

    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    }

    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm;
      parent = api.parentNode(elm);
      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }

    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();

    return vnode;
  };
}

/***/ }),

/***/ "./node_modules/quickjs-component/node_modules/snabbdom/es/thunk.js":
/*!**************************************************************************!*\
  !*** ./node_modules/quickjs-component/node_modules/snabbdom/es/thunk.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "thunk": () => (/* binding */ thunk),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h */ "./node_modules/quickjs-component/node_modules/snabbdom/es/h.js");


function copyToThunk(vnode, thunk) {
  thunk.elm = vnode.elm;
  vnode.data.fn = thunk.data.fn;
  vnode.data.args = thunk.data.args;
  thunk.data = vnode.data;
  thunk.children = vnode.children;
  thunk.text = vnode.text;
  thunk.elm = vnode.elm;
}

function init(thunk) {
  var cur = thunk.data;
  var vnode = cur.fn.apply(undefined, cur.args);
  copyToThunk(vnode, thunk);
}

function prepatch(oldVnode, thunk) {
  var i,
      old = oldVnode.data,
      cur = thunk.data;
  var oldArgs = old.args,
      args = cur.args;

  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
    copyToThunk(cur.fn.apply(undefined, args), thunk);
    return;
  }

  for (i = 0; i < args.length; ++i) {
    if (oldArgs[i] !== args[i]) {
      copyToThunk(cur.fn.apply(undefined, args), thunk);
      return;
    }
  }

  copyToThunk(oldVnode, thunk);
}

var thunk = function thunk(sel, key, fn, args) {
  if (args === undefined) {
    args = fn;
    fn = key;
    key = undefined;
  }

  return (0,_h__WEBPACK_IMPORTED_MODULE_0__.h)(sel, {
    key: key,
    hook: {
      init: init,
      prepatch: prepatch
    },
    fn: fn,
    args: args
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thunk);

/***/ }),

/***/ "./node_modules/quickjs-component/node_modules/snabbdom/es/vnode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/quickjs-component/node_modules/snabbdom/es/vnode.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vnode": () => (/* binding */ vnode),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function vnode(sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return {
    sel: sel,
    data: data,
    children: children,
    text: text,
    elm: elm,
    key: key
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (vnode);

/***/ }),

/***/ "./node_modules/quickjs-component/node_modules/snabbdom/modules/props.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/quickjs-component/node_modules/snabbdom/modules/props.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function updateProps(oldVnode, vnode) {
  var key,
      cur,
      old,
      elm = vnode.elm,
      oldProps = oldVnode.data.props,
      props = vnode.data.props;
  if (!oldProps && !props) return;
  if (oldProps === props) return;
  oldProps = oldProps || {};
  props = props || {};

  for (key in oldProps) {
    if (!props[key]) {
      delete elm[key];
    }
  }

  for (key in props) {
    cur = props[key];
    old = oldProps[key];

    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
      elm[key] = cur;
    }
  }
}

exports.propsModule = {
  create: updateProps,
  update: updateProps
};
exports.default = exports.propsModule;

/***/ }),

/***/ "./node_modules/quickjs-router/lib/quick-router.js":
/*!*********************************************************!*\
  !*** ./node_modules/quickjs-router/lib/quick-router.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useRef = exports.QuickRouterLink = exports.createPopState = exports.QuickRouter = void 0;

const quickjs_component_1 = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");

const quick_error_1 = __webpack_require__(/*! quick-error */ "./node_modules/quick-error/quick-error.js");

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
  if (match.result === undefined) {
    new quick_error_1.default("missing required params");
  }

  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
  return Object.entries(keys.map((key, i) => {
    return [key, values[i]];
  }));
};

class QuickRouter {
  async useRoute(routes, url) {
    if (routes.length === 0) {
      new quick_error_1.default("routes cannot be empty");
      return false;
    } // Check if route matches URL


    const matches = routes.map(route => {
      return {
        route: route,
        result: location.pathname.match(pathToRegex(route.path))
      };
    });
    let findMatch = matches.find(match => match.result !== null);

    if (!findMatch) {
      findMatch = {
        route: routes.find(route => route.path === "/error"),
        result: [location.pathname]
      };
      const view = new findMatch.route.view(getParams(findMatch));
      quickjs_component_1.default.view(await view.render());
    }

    const view = new findMatch.route.view(getParams(findMatch));
    quickjs_component_1.default.view(await view.render());
    this.setTitle(findMatch.route.title);
    return routes;
  }

  getRoute(callback) {
    const from = document.referrer;
    const to = location.href;
    const next = Function;
    const route = [{
      fullPath: location.href,
      pathname: location.pathname,
      params: location.pathname.split('/')
    }];
    callback(route);
    return {
      to,
      from,
      route
    };
  }

  createNavigation(routes) {
    window.addEventListener("click", e => {
      e.preventDefault();

      if (e.target.localName === "a") {
        history.pushState(null, null, e.target.href);
        QuickRouter.prototype.useRoute(routes);
      }
    });
  }

  setTitle(title) {
    if (title === undefined) {
      document.title = "Quick App";
    } else {
      document.title = title;
    }
  }

}

exports.QuickRouter = QuickRouter;
;

function createPopState(routes) {
  window.addEventListener("popstate", () => {
    QuickRouter.prototype.useRoute(routes);
  });
}

exports.createPopState = createPopState;

class QuickRouterLink extends HTMLElement {
  constructor() {
    super();
    const t = this;
    const linkTo = this.getAttribute('to');

    if (!linkTo) {
      new quick_error_1.default(`to attribute must be specified to route, quick-link returned ${linkTo}`);
    }

    const customTag = document.createElement('a');
    customTag.href = linkTo;
    customTag.innerHTML = this.innerHTML;

    if (this.getAttribute("ref")) {
      customTag.id = this.getAttribute("ref");
    }

    if (this.getAttribute("id")) {
      customTag.id = this.getAttribute("id");
    }

    this.parentNode?.insertBefore(customTag, this);
    const children = Array.prototype.slice.call(this.children);

    if (this.innerHTML === "") {
      customTag.innerText = this.getAttribute("name");
    }

    for (var i = 0; i < this.attributes.length; i++) {
      const attribI = this.attributes[i];

      for (var a = 0; a < this.attributes.length; a++) {
        const attribA = this.attributes[i];

        if (attribI.name === "to") {} else {
          customTag.setAttribute(`${attribI.name}`, `${attribI.value}`);
        }
      }
    }

    this.remove();
  }

}

exports.QuickRouterLink = QuickRouterLink;
window.customElements.define('quick-router-link', QuickRouterLink);
quickjs_component_1.default.use(QuickRouterLink);

class useRef {
  constructor() {
    const app = document.getElementById("app");
    const children = Array.prototype.slice.call(app?.children);
    children.forEach(child => {
      if (child.getAttribute("id")) {
        return child;
      }
    });
  }

}

exports.useRef = useRef;

/***/ }),

/***/ "./node_modules/snabbdom-to-html/elements.js":
/*!***************************************************!*\
  !*** ./node_modules/snabbdom-to-html/elements.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

// All SVG children elements, not in this list, should self-close
exports.CONTAINER = {
  // http://www.w3.org/TR/SVG/intro.html#TermContainerElement
  'a': true,
  'defs': true,
  'glyph': true,
  'g': true,
  'marker': true,
  'mask': true,
  'missing-glyph': true,
  'pattern': true,
  'svg': true,
  'switch': true,
  'symbol': true,
  'text': true,
  // http://www.w3.org/TR/SVG/intro.html#TermDescriptiveElement
  'desc': true,
  'metadata': true,
  'title': true
}; // http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements

exports.VOID = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

/***/ }),

/***/ "./node_modules/snabbdom-to-html/init.js":
/*!***********************************************!*\
  !*** ./node_modules/snabbdom-to-html/init.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var escape = __webpack_require__(/*! lodash.escape */ "./node_modules/lodash.escape/index.js");

var parseSelector = __webpack_require__(/*! parse-sel */ "./node_modules/parse-sel/index.js");

var VOID_ELEMENTS = __webpack_require__(/*! ./elements */ "./node_modules/snabbdom-to-html/elements.js").VOID;

var CONTAINER_ELEMENTS = __webpack_require__(/*! ./elements */ "./node_modules/snabbdom-to-html/elements.js").CONTAINER;

module.exports = function init(modules) {
  function parse(vnode, node) {
    var result = [];
    var attributes = new Map([// These can be overwritten because that’s what happens in snabbdom
    ['id', node.id], ['class', node.className]]);
    modules.forEach(function (fn, index) {
      fn(vnode, attributes);
    });
    attributes.forEach(function (value, key) {
      if (value && value !== '') {
        result.push(key + '="' + value + '"');
      }
    });
    return result.join(' ');
  }

  return function renderToString(vnode) {
    if (typeof vnode === 'undefined' || vnode === null) {
      return '';
    }

    if (!vnode.sel && typeof vnode.text === 'string') {
      return escape(vnode.text);
    }

    vnode.data = vnode.data || {}; // Support thunks

    if (vnode.data.hook && typeof vnode.data.hook.init === 'function' && typeof vnode.data.fn === 'function') {
      vnode.data.hook.init(vnode);
    }

    var node = parseSelector(vnode.sel);
    var tagName = node.tagName;
    var attributes = parse(vnode, node);
    var svg = vnode.data.ns === 'http://www.w3.org/2000/svg';
    var tag = [];

    if (tagName === '!') {
      return '<!--' + vnode.text + '-->';
    } // Open tag


    tag.push('<' + tagName);

    if (attributes.length) {
      tag.push(' ' + attributes);
    }

    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
      tag.push(' /');
    }

    tag.push('>'); // Close tag, if needed

    if (VOID_ELEMENTS[tagName] !== true && !svg || svg && CONTAINER_ELEMENTS[tagName] === true) {
      if (vnode.data.props && vnode.data.props.innerHTML) {
        tag.push(vnode.data.props.innerHTML);
      } else if (vnode.text) {
        tag.push(escape(vnode.text));
      } else if (vnode.children) {
        vnode.children.forEach(function (child) {
          tag.push(renderToString(child));
        });
      }

      tag.push('</' + tagName + '>');
    }

    return tag.join('');
  };
};

/***/ }),

/***/ "./node_modules/snabbdom-to-html/modules/attributes.js":
/*!*************************************************************!*\
  !*** ./node_modules/snabbdom-to-html/modules/attributes.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var forOwn = __webpack_require__(/*! lodash.forown */ "./node_modules/lodash.forown/index.js");

var escape = __webpack_require__(/*! lodash.escape */ "./node_modules/lodash.escape/index.js"); // data.attrs


module.exports = function attrsModule(vnode, attributes) {
  var attrs = vnode.data.attrs || {};
  forOwn(attrs, function (value, key) {
    attributes.set(key, escape(value));
  });
};

/***/ }),

/***/ "./node_modules/snabbdom-to-html/modules/class.js":
/*!********************************************************!*\
  !*** ./node_modules/snabbdom-to-html/modules/class.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var forOwn = __webpack_require__(/*! lodash.forown */ "./node_modules/lodash.forown/index.js");

var remove = __webpack_require__(/*! lodash.remove */ "./node_modules/lodash.remove/index.js");

var uniq = __webpack_require__(/*! lodash.uniq */ "./node_modules/lodash.uniq/index.js"); // data.class


module.exports = function classModule(vnode, attributes) {
  var values;
  var _add = [];
  var _remove = [];
  var classes = vnode.data.class || {};
  var existing = attributes.get('class');
  existing = existing.length > 0 ? existing.split(' ') : [];
  forOwn(classes, function (value, key) {
    if (value === true) {
      _add.push(key);
    } else {
      _remove.push(key);
    }
  });
  values = remove(uniq(existing.concat(_add)), function (value) {
    return _remove.indexOf(value) < 0;
  });

  if (values.length) {
    attributes.set('class', values.join(' '));
  }
};

/***/ }),

/***/ "./node_modules/snabbdom-to-html/modules/dataset.js":
/*!**********************************************************!*\
  !*** ./node_modules/snabbdom-to-html/modules/dataset.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var forOwn = __webpack_require__(/*! lodash.forown */ "./node_modules/lodash.forown/index.js");

var escape = __webpack_require__(/*! lodash.escape */ "./node_modules/lodash.escape/index.js"); // data.dataset


module.exports = function datasetModule(vnode, attributes) {
  var dataset = vnode.data.dataset || {};
  forOwn(dataset, function (value, key) {
    attributes.set(`data-${key}`, escape(value));
  });
};

/***/ }),

/***/ "./node_modules/snabbdom-to-html/modules/index.js":
/*!********************************************************!*\
  !*** ./node_modules/snabbdom-to-html/modules/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  class: __webpack_require__(/*! ./class */ "./node_modules/snabbdom-to-html/modules/class.js"),
  props: __webpack_require__(/*! ./props */ "./node_modules/snabbdom-to-html/modules/props.js"),
  attributes: __webpack_require__(/*! ./attributes */ "./node_modules/snabbdom-to-html/modules/attributes.js"),
  style: __webpack_require__(/*! ./style */ "./node_modules/snabbdom-to-html/modules/style.js"),
  dataset: __webpack_require__(/*! ./dataset */ "./node_modules/snabbdom-to-html/modules/dataset.js")
};

/***/ }),

/***/ "./node_modules/snabbdom-to-html/modules/props.js":
/*!********************************************************!*\
  !*** ./node_modules/snabbdom-to-html/modules/props.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var forOwn = __webpack_require__(/*! lodash.forown */ "./node_modules/lodash.forown/index.js");

var escape = __webpack_require__(/*! lodash.escape */ "./node_modules/lodash.escape/index.js"); // https://developer.mozilla.org/en-US/docs/Web/API/element


var omit = ['attributes', 'childElementCount', 'children', 'classList', 'clientHeight', 'clientLeft', 'clientTop', 'clientWidth', 'currentStyle', 'firstElementChild', 'innerHTML', 'lastElementChild', 'nextElementSibling', 'ongotpointercapture', 'onlostpointercapture', 'onwheel', 'outerHTML', 'previousElementSibling', 'runtimeStyle', 'scrollHeight', 'scrollLeft', 'scrollLeftMax', 'scrollTop', 'scrollTopMax', 'scrollWidth', 'tabStop', 'tagName']; // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes

var booleanAttributes = ['disabled', 'visible', 'checked', 'readonly', 'required', 'allowfullscreen', 'autofocus', 'autoplay', 'compact', 'controls', 'default', 'formnovalidate', 'hidden', 'ismap', 'itemscope', 'loop', 'multiple', 'muted', 'noresize', 'noshade', 'novalidate', 'nowrap', 'open', 'reversed', 'seamless', 'selected', 'sortable', 'truespeed', 'typemustmatch']; // data.props

module.exports = function propsModule(vnode, attributes) {
  var props = vnode.data.props || {};
  forOwn(props, function (value, key) {
    if (omit.indexOf(key) > -1) {
      return;
    }

    if (key === 'htmlFor') {
      key = 'for';
    }

    if (key === 'className') {
      key = 'class';
    }

    var lkey = key.toLowerCase();

    if (~booleanAttributes.indexOf(lkey)) {
      if (value) {
        // set attr only when truthy
        attributes.set(lkey, lkey);
      }
    } else {
      attributes.set(lkey, escape(value));
    }
  });
};

/***/ }),

/***/ "./node_modules/snabbdom-to-html/modules/style.js":
/*!********************************************************!*\
  !*** ./node_modules/snabbdom-to-html/modules/style.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var forOwn = __webpack_require__(/*! lodash.forown */ "./node_modules/lodash.forown/index.js");

var escape = __webpack_require__(/*! lodash.escape */ "./node_modules/lodash.escape/index.js");

var kebabCase = __webpack_require__(/*! lodash.kebabcase */ "./node_modules/lodash.kebabcase/index.js"); // data.style


module.exports = function styleModule(vnode, attributes) {
  var values = [];
  var style = vnode.data.style || {}; // merge in `delayed` properties

  if (style.delayed) {
    assign(style, style.delayed);
  }

  forOwn(style, function (value, key) {
    // omit hook objects
    if (typeof value === 'string' || typeof value === 'number') {
      var kebabKey = kebabCase(key);
      values.push((key.match(/^--.*/) ? '--' + kebabKey : kebabKey) + ': ' + escape(value));
    }
  });

  if (values.length) {
    attributes.set('style', values.join('; '));
  }
};

/***/ }),

/***/ "./src/router/routes.js":
/*!******************************!*\
  !*** ./src/router/routes.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");
/* harmony import */ var quickjs_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quickjs-router */ "./node_modules/quickjs-router/lib/quick-router.js");
/* harmony import */ var _src_views_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/views/App */ "./src/views/App.js");
/* harmony import */ var _src_views_About__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/views/About */ "./src/views/About.js");
/* harmony import */ var _src_views_Notfound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/views/Notfound */ "./src/views/Notfound.js");


const router = new quickjs_router__WEBPACK_IMPORTED_MODULE_1__.QuickRouter();



const routes = [{
  path: '/',
  view: _src_views_App__WEBPACK_IMPORTED_MODULE_2__.default,
  title: "Home"
}, {
  path: '/about',
  title: "About",
  view: _src_views_About__WEBPACK_IMPORTED_MODULE_3__.default
}, {
  path: '/error',
  view: _src_views_Notfound__WEBPACK_IMPORTED_MODULE_4__.default,
  title: "Page Not Found"
}];
quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.use(router.useRoute(routes));
router.createNavigation(routes);
(0,quickjs_router__WEBPACK_IMPORTED_MODULE_1__.createPopState)(routes);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);

/***/ }),

/***/ "./src/views/About.js":
/*!****************************!*\
  !*** ./src/views/About.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ About)
/* harmony export */ });
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");

const AboutDetail = "Quick.js is a configured server side  single page application that lets you create your own sever side application in no time.";
class About extends quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      class: "con about-con text-center"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "mt-10 text-center"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      className: "mr-3 underline"
    }, "Home"), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      className: "text-primary-normal underline active",
      to: "/about"
    }, "About")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "logo mt-10 w-10 p-1 max-w-md block ml-auto mr-auto animate-bounce"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", {
      className: "quick-logo w-8",
      src: "https://res.cloudinary.com/serveryguken/image/upload/v1615188992/QuickJS/logo/quickjs-logo_wjx3dw.svg"
    })), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      class: "about-page text-center mt-5 text-3xl text-black font-bold"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
      className: "text-5xl p-1 wc-txt"
    }, "About ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
      className: "text-primary-normal"
    }, "Quick.js"), " ")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "detail p-6"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h3", {
      className: "mt-6"
    }, AboutDetail), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h3", {
      className: "mt-6 font-bold"
    }, "Ecosystem | External links"), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("ul", {
      className: "mt-4"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      external: true,
      className: "mr-3 underline"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, "Quickjs-component")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      external: true,
      className: "mr-3 underline"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, "Quickjs-router")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      external: true,
      className: "mr-3 underline"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, "Quickjs-dom")))));
  }

}

/***/ }),

/***/ "./src/views/App.js":
/*!**************************!*\
  !*** ./src/views/App.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");
/* harmony import */ var _Welcome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Welcome */ "./src/views/Welcome.js");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./List */ "./src/views/List.js");



class App extends quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "con"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "mt-10 text-center"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      className: "mr-3 text-primary-normal underline active"
    }, "Home"), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/about",
      className: "underline"
    }, "About")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "logo mt-10 w-10 p-1 max-w-md block ml-auto mr-auto animate-bounce"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", {
      className: "quick-logo w-8",
      src: "https://res.cloudinary.com/serveryguken/image/upload/v1615188992/QuickJS/logo/quickjs-logo_wjx3dw.svg"
    })), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      class: "welcome text-center mt-5 text-3xl text-black font-bold"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Welcome__WEBPACK_IMPORTED_MODULE_1__.default, {
      name: "Quick.js"
    })), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "sec mt-6 text-center"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h4", null, "Get started by editing ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
      className: "bg-snow text-sm font-medium p-2"
    }, "src/views/App.js"))), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "app-list"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_List__WEBPACK_IMPORTED_MODULE_2__.default, null)));
  }

}

/***/ }),

/***/ "./src/views/List.js":
/*!***************************!*\
  !*** ./src/views/List.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");


const List = () => quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "list-main"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "list-con mt-10"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "list-1 flex justify-around"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "list rounded shadow-sm p-2 w-5/12 cursor-pointer max-w-md  border   border-gray-200 mt-4"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("di", {
  className: "title"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
  className: "text-xl font-bold text-black flex items-center mt-2"
}, "Documentation ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
  className: "ml-2"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg", {
  className: "text-black w-6 -mb-1",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M14 5l7 7m0 0l-7 7m7-7H3"
}))))), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "tag"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", {
  className: "text-black font-medium mt-2 mb-3"
}, "Check out documentation on how to get started and setup your project with Quick.js."))), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "list rounded shadow-sm p-2 w-5/12 cursor-pointer max-w-md border  border-gray-200 mt-4"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("di", {
  className: "title"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
  className: "text-xl font-bold text-black flex items-center mt-2"
}, "Learn ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
  className: "ml-2"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg", {
  className: "text-black w-6 -mb-1",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M14 5l7 7m0 0l-7 7m7-7H3"
}))))), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "tag"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", {
  className: "text-black font-medium mt-2 mb-3"
}, "Learn about Quick.js and it's ecosystem.")))), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "list-2 flex justify-around"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "list rounded shadow-sm p-2 w-5/12 cursor-pointer max-w-md border border-gray-200  mt-4"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("di", {
  className: "title"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
  className: "text-xl font-bold text-black flex items-center mt-2"
}, "Examples ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
  className: "ml-2"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg", {
  className: "text-black w-6 -mb-1",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M14 5l7 7m0 0l-7 7m7-7H3"
}))))), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "tag"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", {
  className: "text-black font-medium mt-2 mb-3"
}, "Check out on projects created with Quick.js"))), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "list rounded shadow-sm p-2 w-5/12 max-w-md border cursor-pointer  border-gray-200  mt-4"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("di", {
  className: "title"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
  className: "text-xl font-bold text-black flex items-center mt-2"
}, "Deploy ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
  className: "ml-2"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("svg", {
  className: "text-black w-6 -mb-1",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M14 5l7 7m0 0l-7 7m7-7H3"
}))))), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
  className: "tag"
}, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", {
  className: "text-black font-medium mt-2 mb-3"
}, "We'll show you how to deploy your Quick.js application to production."))))));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ }),

/***/ "./src/views/Notfound.js":
/*!*******************************!*\
  !*** ./src/views/Notfound.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NotFound)
/* harmony export */ });
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");

class NotFound extends quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.Component {
  constructor() {
    super();
  }

  render() {
    return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      class: "about-page text-center mt-10 text-3xl text-black font-bold"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
      className: "text-5xl p-1 wc-txt"
    }, "404 ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
      className: "text-primary-normal"
    }, "NOT FOUND"), " ")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "mt-10 text-center"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      className: "mr-3 underline"
    }, "Home"), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      className: "text-primary-normal underline active",
      to: "/about"
    }, "About")));
  }

}

/***/ }),

/***/ "./src/views/Welcome.js":
/*!******************************!*\
  !*** ./src/views/Welcome.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");
// Quick needs to be initailized to use jsx


const Welcome = ({
  name
}) => quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
  className: "text-5xl p-1 wc-txt"
}, "Welcome to ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
  className: "text-primary-normal"
}, name, "!"), " ");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Welcome);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./public/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/router/routes */ "./src/router/routes.js");


quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.$config("development");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItc3BsaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmZvcm93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZWJhYmNhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVtb3ZlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcGFyc2Utc2VsL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcXVpY2stZXJyb3IvcXVpY2stZXJyb3IuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLWNvbXBvbmVudC9saWIvcXVpY2suanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uLi9zcmMvaC50cyIsIndlYnBhY2s6Ly9xdWlja2pzLy4uL3NyYy9odG1sZG9tYXBpLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL2lzLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3NuYWJiZG9tLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3RodW5rLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3Zub2RlLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL21vZHVsZXMvcHJvcHMudHMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLXJvdXRlci9saWIvcXVpY2stcm91dGVyLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvaW5pdC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy9yb3V0ZXIvcm91dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvQWJvdXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9BcHAuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9MaXN0LmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvTm90Zm91bmQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9XZWxjb21lLmpzIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9xdWlja2pzL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3B1YmxpYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3BsaXQiLCJ1bmRlZiIsIm5hdGl2ZVNwbGl0IiwiU3RyaW5nIiwicHJvdG90eXBlIiwiY29tcGxpYW50RXhlY05wY2ciLCJleGVjIiwic2VsZiIsInN0ciIsInNlcGFyYXRvciIsImxpbWl0IiwiT2JqZWN0IiwidG9TdHJpbmciLCJjYWxsIiwib3V0cHV0IiwiZmxhZ3MiLCJpZ25vcmVDYXNlIiwibXVsdGlsaW5lIiwiZXh0ZW5kZWQiLCJzdGlja3kiLCJsYXN0TGFzdEluZGV4IiwiUmVnRXhwIiwic291cmNlIiwic2VwYXJhdG9yMiIsIm1hdGNoIiwibGFzdEluZGV4IiwibGFzdExlbmd0aCIsImluZGV4IiwibGVuZ3RoIiwicHVzaCIsInNsaWNlIiwicmVwbGFjZSIsImkiLCJhcmd1bWVudHMiLCJBcnJheSIsImFwcGx5IiwidGVzdCIsIklORklOSVRZIiwic3ltYm9sVGFnIiwicmVVbmVzY2FwZWRIdG1sIiwicmVIYXNVbmVzY2FwZWRIdG1sIiwiaHRtbEVzY2FwZXMiLCJmcmVlR2xvYmFsIiwiZ2xvYmFsIiwiZnJlZVNlbGYiLCJyb290IiwiRnVuY3Rpb24iLCJiYXNlUHJvcGVydHlPZiIsIm9iamVjdCIsImtleSIsInVuZGVmaW5lZCIsImVzY2FwZUh0bWxDaGFyIiwib2JqZWN0UHJvdG8iLCJvYmplY3RUb1N0cmluZyIsIlN5bWJvbCIsInN5bWJvbFByb3RvIiwic3ltYm9sVG9TdHJpbmciLCJiYXNlVG9TdHJpbmciLCJ2YWx1ZSIsImlzU3ltYm9sIiwicmVzdWx0IiwiaXNPYmplY3RMaWtlIiwiZXNjYXBlIiwic3RyaW5nIiwiTUFYX1NBRkVfSU5URUdFUiIsImFyZ3NUYWciLCJmdW5jVGFnIiwiZ2VuVGFnIiwicmVJc1VpbnQiLCJiYXNlVGltZXMiLCJuIiwiaXRlcmF0ZWUiLCJvdmVyQXJnIiwiZnVuYyIsInRyYW5zZm9ybSIsImFyZyIsImhhc093blByb3BlcnR5IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJuYXRpdmVLZXlzIiwia2V5cyIsImFycmF5TGlrZUtleXMiLCJpbmhlcml0ZWQiLCJpc0FycmF5IiwiaXNBcmd1bWVudHMiLCJza2lwSW5kZXhlcyIsImlzSW5kZXgiLCJiYXNlRm9yIiwiY3JlYXRlQmFzZUZvciIsImJhc2VGb3JPd24iLCJiYXNlS2V5cyIsImlzUHJvdG90eXBlIiwiZnJvbVJpZ2h0Iiwia2V5c0Z1bmMiLCJpdGVyYWJsZSIsInByb3BzIiwiQ3RvciIsImNvbnN0cnVjdG9yIiwicHJvdG8iLCJpc0FycmF5TGlrZU9iamVjdCIsImlzQXJyYXlMaWtlIiwiaXNMZW5ndGgiLCJpc0Z1bmN0aW9uIiwidGFnIiwiaXNPYmplY3QiLCJ0eXBlIiwiZm9yT3duIiwiaWRlbnRpdHkiLCJyZUFzY2lpV29yZCIsInJlTGF0aW4iLCJyc0FzdHJhbFJhbmdlIiwicnNDb21ib01hcmtzUmFuZ2UiLCJyc0NvbWJvU3ltYm9sc1JhbmdlIiwicnNEaW5nYmF0UmFuZ2UiLCJyc0xvd2VyUmFuZ2UiLCJyc01hdGhPcFJhbmdlIiwicnNOb25DaGFyUmFuZ2UiLCJyc1B1bmN0dWF0aW9uUmFuZ2UiLCJyc1NwYWNlUmFuZ2UiLCJyc1VwcGVyUmFuZ2UiLCJyc1ZhclJhbmdlIiwicnNCcmVha1JhbmdlIiwicnNBcG9zIiwicnNCcmVhayIsInJzQ29tYm8iLCJyc0RpZ2l0cyIsInJzRGluZ2JhdCIsInJzTG93ZXIiLCJyc01pc2MiLCJyc0ZpdHoiLCJyc01vZGlmaWVyIiwicnNOb25Bc3RyYWwiLCJyc1JlZ2lvbmFsIiwicnNTdXJyUGFpciIsInJzVXBwZXIiLCJyc1pXSiIsInJzTG93ZXJNaXNjIiwicnNVcHBlck1pc2MiLCJyc09wdExvd2VyQ29udHIiLCJyc09wdFVwcGVyQ29udHIiLCJyZU9wdE1vZCIsInJzT3B0VmFyIiwicnNPcHRKb2luIiwiam9pbiIsInJzU2VxIiwicnNFbW9qaSIsInJlQXBvcyIsInJlQ29tYm9NYXJrIiwicmVVbmljb2RlV29yZCIsInJlSGFzVW5pY29kZVdvcmQiLCJkZWJ1cnJlZExldHRlcnMiLCJhcnJheVJlZHVjZSIsImFycmF5IiwiYWNjdW11bGF0b3IiLCJpbml0QWNjdW0iLCJhc2NpaVdvcmRzIiwiZGVidXJyTGV0dGVyIiwiaGFzVW5pY29kZVdvcmQiLCJ1bmljb2RlV29yZHMiLCJjcmVhdGVDb21wb3VuZGVyIiwiY2FsbGJhY2siLCJ3b3JkcyIsImRlYnVyciIsImtlYmFiQ2FzZSIsIndvcmQiLCJ0b0xvd2VyQ2FzZSIsInBhdHRlcm4iLCJndWFyZCIsIkxBUkdFX0FSUkFZX1NJWkUiLCJGVU5DX0VSUk9SX1RFWFQiLCJIQVNIX1VOREVGSU5FRCIsIlVOT1JERVJFRF9DT01QQVJFX0ZMQUciLCJQQVJUSUFMX0NPTVBBUkVfRkxBRyIsImFycmF5VGFnIiwiYm9vbFRhZyIsImRhdGVUYWciLCJlcnJvclRhZyIsIm1hcFRhZyIsIm51bWJlclRhZyIsIm9iamVjdFRhZyIsInByb21pc2VUYWciLCJyZWdleHBUYWciLCJzZXRUYWciLCJzdHJpbmdUYWciLCJ3ZWFrTWFwVGFnIiwiYXJyYXlCdWZmZXJUYWciLCJkYXRhVmlld1RhZyIsImZsb2F0MzJUYWciLCJmbG9hdDY0VGFnIiwiaW50OFRhZyIsImludDE2VGFnIiwiaW50MzJUYWciLCJ1aW50OFRhZyIsInVpbnQ4Q2xhbXBlZFRhZyIsInVpbnQxNlRhZyIsInVpbnQzMlRhZyIsInJlSXNEZWVwUHJvcCIsInJlSXNQbGFpblByb3AiLCJyZUxlYWRpbmdEb3QiLCJyZVByb3BOYW1lIiwicmVSZWdFeHBDaGFyIiwicmVFc2NhcGVDaGFyIiwicmVJc0hvc3RDdG9yIiwidHlwZWRBcnJheVRhZ3MiLCJmcmVlRXhwb3J0cyIsIm5vZGVUeXBlIiwiZnJlZU1vZHVsZSIsIm1vZHVsZUV4cG9ydHMiLCJmcmVlUHJvY2VzcyIsInByb2Nlc3MiLCJub2RlVXRpbCIsImJpbmRpbmciLCJlIiwibm9kZUlzVHlwZWRBcnJheSIsImlzVHlwZWRBcnJheSIsImFycmF5U29tZSIsInByZWRpY2F0ZSIsImJhc2VQcm9wZXJ0eSIsImJhc2VVbmFyeSIsImdldFZhbHVlIiwiaXNIb3N0T2JqZWN0IiwibWFwVG9BcnJheSIsIm1hcCIsInNpemUiLCJmb3JFYWNoIiwic2V0VG9BcnJheSIsInNldCIsImFycmF5UHJvdG8iLCJmdW5jUHJvdG8iLCJjb3JlSnNEYXRhIiwibWFza1NyY0tleSIsInVpZCIsIklFX1BST1RPIiwiZnVuY1RvU3RyaW5nIiwicmVJc05hdGl2ZSIsIlVpbnQ4QXJyYXkiLCJzcGxpY2UiLCJEYXRhVmlldyIsImdldE5hdGl2ZSIsIk1hcCIsIlByb21pc2UiLCJTZXQiLCJXZWFrTWFwIiwibmF0aXZlQ3JlYXRlIiwiZGF0YVZpZXdDdG9yU3RyaW5nIiwidG9Tb3VyY2UiLCJtYXBDdG9yU3RyaW5nIiwicHJvbWlzZUN0b3JTdHJpbmciLCJzZXRDdG9yU3RyaW5nIiwid2Vha01hcEN0b3JTdHJpbmciLCJzeW1ib2xWYWx1ZU9mIiwidmFsdWVPZiIsIkhhc2giLCJlbnRyaWVzIiwiY2xlYXIiLCJlbnRyeSIsImhhc2hDbGVhciIsIl9fZGF0YV9fIiwiaGFzaERlbGV0ZSIsImhhcyIsImhhc2hHZXQiLCJkYXRhIiwiaGFzaEhhcyIsImhhc2hTZXQiLCJnZXQiLCJMaXN0Q2FjaGUiLCJsaXN0Q2FjaGVDbGVhciIsImxpc3RDYWNoZURlbGV0ZSIsImFzc29jSW5kZXhPZiIsInBvcCIsImxpc3RDYWNoZUdldCIsImxpc3RDYWNoZUhhcyIsImxpc3RDYWNoZVNldCIsIk1hcENhY2hlIiwibWFwQ2FjaGVDbGVhciIsIm1hcENhY2hlRGVsZXRlIiwiZ2V0TWFwRGF0YSIsIm1hcENhY2hlR2V0IiwibWFwQ2FjaGVIYXMiLCJtYXBDYWNoZVNldCIsIlNldENhY2hlIiwidmFsdWVzIiwiYWRkIiwic2V0Q2FjaGVBZGQiLCJzZXRDYWNoZUhhcyIsIlN0YWNrIiwic3RhY2tDbGVhciIsInN0YWNrRGVsZXRlIiwic3RhY2tHZXQiLCJzdGFja0hhcyIsInN0YWNrU2V0IiwiY2FjaGUiLCJwYWlycyIsImVxIiwiYmFzZUdldCIsInBhdGgiLCJpc0tleSIsImNhc3RQYXRoIiwidG9LZXkiLCJiYXNlR2V0VGFnIiwiYmFzZUhhc0luIiwiYmFzZUlzRXF1YWwiLCJvdGhlciIsImN1c3RvbWl6ZXIiLCJiaXRtYXNrIiwic3RhY2siLCJiYXNlSXNFcXVhbERlZXAiLCJlcXVhbEZ1bmMiLCJvYmpJc0FyciIsIm90aElzQXJyIiwib2JqVGFnIiwib3RoVGFnIiwiZ2V0VGFnIiwib2JqSXNPYmoiLCJvdGhJc09iaiIsImlzU2FtZVRhZyIsImVxdWFsQXJyYXlzIiwiZXF1YWxCeVRhZyIsIm9iaklzV3JhcHBlZCIsIm90aElzV3JhcHBlZCIsIm9ialVud3JhcHBlZCIsIm90aFVud3JhcHBlZCIsImVxdWFsT2JqZWN0cyIsImJhc2VJc01hdGNoIiwibWF0Y2hEYXRhIiwibm9DdXN0b21pemVyIiwib2JqVmFsdWUiLCJzcmNWYWx1ZSIsImJhc2VJc05hdGl2ZSIsImlzTWFza2VkIiwiYmFzZUlzVHlwZWRBcnJheSIsImJhc2VJdGVyYXRlZSIsImJhc2VNYXRjaGVzUHJvcGVydHkiLCJiYXNlTWF0Y2hlcyIsInByb3BlcnR5IiwiZ2V0TWF0Y2hEYXRhIiwibWF0Y2hlc1N0cmljdENvbXBhcmFibGUiLCJpc1N0cmljdENvbXBhcmFibGUiLCJoYXNJbiIsImJhc2VQcm9wZXJ0eURlZXAiLCJiYXNlUHVsbEF0IiwiaW5kZXhlcyIsInByZXZpb3VzIiwicGFyZW50IiwibGFzdCIsImJhc2VTbGljZSIsInN0YXJ0IiwiZW5kIiwic3RyaW5nVG9QYXRoIiwiaXNQYXJ0aWFsIiwiYXJyTGVuZ3RoIiwib3RoTGVuZ3RoIiwic3RhY2tlZCIsInNlZW4iLCJhcnJWYWx1ZSIsIm90aFZhbHVlIiwiY29tcGFyZWQiLCJvdGhJbmRleCIsImJ5dGVMZW5ndGgiLCJieXRlT2Zmc2V0IiwiYnVmZmVyIiwibmFtZSIsIm1lc3NhZ2UiLCJjb252ZXJ0Iiwib2JqUHJvcHMiLCJvYmpMZW5ndGgiLCJvdGhQcm9wcyIsInNraXBDdG9yIiwib2JqQ3RvciIsIm90aEN0b3IiLCJpc0tleWFibGUiLCJBcnJheUJ1ZmZlciIsInJlc29sdmUiLCJjdG9yU3RyaW5nIiwiaGFzUGF0aCIsImhhc0Z1bmMiLCJtZW1vaXplIiwibnVtYmVyIiwicXVvdGUiLCJyZW1vdmUiLCJyZXNvbHZlciIsIlR5cGVFcnJvciIsIm1lbW9pemVkIiwiYXJncyIsIkNhY2hlIiwiZGVmYXVsdFZhbHVlIiwiYXJyYXlJbmNsdWRlcyIsImJhc2VJbmRleE9mIiwiYXJyYXlJbmNsdWRlc1dpdGgiLCJjb21wYXJhdG9yIiwiYmFzZUZpbmRJbmRleCIsImZyb21JbmRleCIsImJhc2VJc05hTiIsImNhY2hlSGFzIiwiYmFzZVVuaXEiLCJpbmNsdWRlcyIsImlzQ29tbW9uIiwiY3JlYXRlU2V0Iiwib3V0ZXIiLCJjb21wdXRlZCIsInNlZW5JbmRleCIsIm5vb3AiLCJ1bmlxIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwicHJvcElzRW51bWVyYWJsZSIsInRvT2JqZWN0IiwidmFsIiwic2hvdWxkVXNlTmF0aXZlIiwiYXNzaWduIiwidGVzdDEiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwidGVzdDIiLCJmcm9tQ2hhckNvZGUiLCJvcmRlcjIiLCJ0ZXN0MyIsImxldHRlciIsImVyciIsInRhcmdldCIsImZyb20iLCJ0byIsInN5bWJvbHMiLCJzIiwicmVxdWlyZSIsImNsYXNzSWRTcGxpdCIsIm5vdENsYXNzSWQiLCJwYXJzZVNlbGVjdG9yIiwic2VsZWN0b3IiLCJ1cHBlciIsInRhZ05hbWUiLCJpZCIsImNsYXNzZXMiLCJ0YWdQYXJ0cyIsInBhcnQiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJ0b1VwcGVyQ2FzZSIsImNsYXNzTmFtZSIsImNoZWNrRm9yRXJyb3IiLCJFcnJvciIsImVycm9yIiwiaXNFcnJvciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJxdWlja19lcnJvcl8xIiwic25hYmJkb20iLCJwcm9wc18xIiwicmVjb25jaWxlIiwiaW5pdCIsImRlZmF1bHQiLCJzbmFiYmRvbV8xIiwibW9kdWxlcyIsInRvSFRNTCIsImNsYXNzIiwiYXR0cmlidXRlcyIsInN0eWxlIiwiRGVwIiwic3Vic2NyaWJlcnMiLCJkZXBlbmQiLCJhY3RpdmVFZmZlY3QiLCJub3RpZnkiLCJzdWIiLCJDb21wb25lbnQiLCJwYXJhbXMiLCJ0IiwiY29tcG9uZW50RGlkTW91bnQiLCJzZXRTdGF0ZSIsInBhcnRpYWxTdGF0ZSIsIl90aGlzIiwic3RhdGUiLCJRdWljayIsIl9fdXBkYXRlciIsInJlbmRlciIsImVsIiwiciIsIl9wdCIsImlzUXVpY2tDbGFzc0NvbXBvbmVudCIsIiRpbml0IiwiZmF2IiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJyZWwiLCJoIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjb25zb2xlIiwibG9nIiwiJGxpc3RlbmVyIiwiZm4iLCJwcmV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZlbnREZWZhdWx0IiwidXNlIiwidmlldyIsInJlbmRlclZpZXd0b0hUTUwiLCJxdWVyeVNlbGVjdG9yIiwiY2hpbGRyZW4iLCJmbGF0IiwiaXNRbmRSZWFjdENsYXNzQ29tcG9uZW50IiwiY29tcG9uZW50SW5zdGFuY2UiLCJkYXRhUHJvcHMiLCJldmVudFByb3BzIiwicHJvcEtleSIsInN0YXJ0c1dpdGgiLCJldmVudCIsImluc3RhbmNlIiwiJGNvbmZpZyIsImVudiIsInF1aWNranNfY29tcG9uZW50XzEiLCJwYXRoVG9SZWdleCIsImdldFBhcmFtcyIsInJvdXRlIiwibWF0Y2hBbGwiLCJRdWlja1JvdXRlciIsInVzZVJvdXRlIiwicm91dGVzIiwidXJsIiwibWF0Y2hlcyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJmaW5kTWF0Y2giLCJmaW5kIiwic2V0VGl0bGUiLCJ0aXRsZSIsImdldFJvdXRlIiwicmVmZXJyZXIiLCJuZXh0IiwiZnVsbFBhdGgiLCJjcmVhdGVOYXZpZ2F0aW9uIiwid2luZG93IiwibG9jYWxOYW1lIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImNyZWF0ZVBvcFN0YXRlIiwiUXVpY2tSb3V0ZXJMaW5rIiwiSFRNTEVsZW1lbnQiLCJsaW5rVG8iLCJnZXRBdHRyaWJ1dGUiLCJjdXN0b21UYWciLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiaW5uZXJUZXh0IiwiYXR0cmliSSIsImEiLCJhdHRyaWJBIiwic2V0QXR0cmlidXRlIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJ1c2VSZWYiLCJhcHAiLCJjaGlsZCIsImFyZWEiLCJiYXNlIiwiYnIiLCJjb2wiLCJlbWJlZCIsImhyIiwiaW1nIiwiaW5wdXQiLCJrZXlnZW4iLCJsaW5rIiwibWV0YSIsInBhcmFtIiwidHJhY2siLCJ3YnIiLCJWT0lEX0VMRU1FTlRTIiwiQ09OVEFJTkVSX0VMRU1FTlRTIiwicGFyc2UiLCJ2bm9kZSIsIm5vZGUiLCJyZW5kZXJUb1N0cmluZyIsInNlbCIsInRleHQiLCJob29rIiwic3ZnIiwibnMiLCJhdHRyc01vZHVsZSIsImF0dHJzIiwiY2xhc3NNb2R1bGUiLCJfYWRkIiwiX3JlbW92ZSIsImV4aXN0aW5nIiwiY29uY2F0IiwiaW5kZXhPZiIsImRhdGFzZXRNb2R1bGUiLCJkYXRhc2V0Iiwib21pdCIsImJvb2xlYW5BdHRyaWJ1dGVzIiwicHJvcHNNb2R1bGUiLCJsa2V5Iiwic3R5bGVNb2R1bGUiLCJkZWxheWVkIiwia2ViYWJLZXkiLCJyb3V0ZXIiLCJBcHAiLCJBYm91dCIsIk5vdEZvdW5kIiwiQWJvdXREZXRhaWwiLCJMaXN0IiwiV2VsY29tZSJdLCJtYXBwaW5ncyI6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Q0E7O0FBR0EsTUFBTThILE9BQU8sR0FBRyxDQUFDO0FBQUM3TztBQUFELENBQUQsS0FDWjtBQUFJLFdBQVMsRUFBQztBQUFkLGtCQUErQztBQUFNLFdBQVMsRUFBQztBQUFoQixHQUF1Q0EsSUFBdkMsTUFBL0MsTUFESjs7QUFJQSxpRUFBZTZPLE9BQWYsRTs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N4QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0FoSSw4REFBQSxDQUFjLGFBQWQsRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIENyb3NzLUJyb3dzZXIgU3BsaXQgMS4xLjFcbiAqIENvcHlyaWdodCAyMDA3LTIwMTIgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+XG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKiBFQ01BU2NyaXB0IGNvbXBsaWFudCwgdW5pZm9ybSBjcm9zcy1icm93c2VyIHNwbGl0IG1ldGhvZFxuICovXG5cbi8qKlxuICogU3BsaXRzIGEgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5ncyB1c2luZyBhIHJlZ2V4IG9yIHN0cmluZyBzZXBhcmF0b3IuIE1hdGNoZXMgb2YgdGhlXG4gKiBzZXBhcmF0b3IgYXJlIG5vdCBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0IGFycmF5LiBIb3dldmVyLCBpZiBgc2VwYXJhdG9yYCBpcyBhIHJlZ2V4IHRoYXQgY29udGFpbnNcbiAqIGNhcHR1cmluZyBncm91cHMsIGJhY2tyZWZlcmVuY2VzIGFyZSBzcGxpY2VkIGludG8gdGhlIHJlc3VsdCBlYWNoIHRpbWUgYHNlcGFyYXRvcmAgaXMgbWF0Y2hlZC5cbiAqIEZpeGVzIGJyb3dzZXIgYnVncyBjb21wYXJlZCB0byB0aGUgbmF0aXZlIGBTdHJpbmcucHJvdG90eXBlLnNwbGl0YCBhbmQgY2FuIGJlIHVzZWQgcmVsaWFibHlcbiAqIGNyb3NzLWJyb3dzZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFN0cmluZyB0byBzcGxpdC5cbiAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gc2VwYXJhdG9yIFJlZ2V4IG9yIHN0cmluZyB0byB1c2UgZm9yIHNlcGFyYXRpbmcgdGhlIHN0cmluZy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbGltaXRdIE1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRvIGluY2x1ZGUgaW4gdGhlIHJlc3VsdCBhcnJheS5cbiAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2Ygc3Vic3RyaW5ncy5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQmFzaWMgdXNlXG4gKiBzcGxpdCgnYSBiIGMgZCcsICcgJyk7XG4gKiAvLyAtPiBbJ2EnLCAnYicsICdjJywgJ2QnXVxuICpcbiAqIC8vIFdpdGggbGltaXRcbiAqIHNwbGl0KCdhIGIgYyBkJywgJyAnLCAyKTtcbiAqIC8vIC0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBCYWNrcmVmZXJlbmNlcyBpbiByZXN1bHQgYXJyYXlcbiAqIHNwbGl0KCcuLndvcmQxIHdvcmQyLi4nLCAvKFthLXpdKykoXFxkKykvaSk7XG4gKiAvLyAtPiBbJy4uJywgJ3dvcmQnLCAnMScsICcgJywgJ3dvcmQnLCAnMicsICcuLiddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uIHNwbGl0KHVuZGVmKSB7XG5cbiAgdmFyIG5hdGl2ZVNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdCxcbiAgICBjb21wbGlhbnRFeGVjTnBjZyA9IC8oKT8/Ly5leGVjKFwiXCIpWzFdID09PSB1bmRlZixcbiAgICAvLyBOUENHOiBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cFxuICAgIHNlbGY7XG5cbiAgc2VsZiA9IGZ1bmN0aW9uKHN0ciwgc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgYG5hdGl2ZVNwbGl0YFxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc2VwYXJhdG9yKSAhPT0gXCJbb2JqZWN0IFJlZ0V4cF1cIikge1xuICAgICAgcmV0dXJuIG5hdGl2ZVNwbGl0LmNhbGwoc3RyLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9XG4gICAgdmFyIG91dHB1dCA9IFtdLFxuICAgICAgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyBcImlcIiA6IFwiXCIpICsgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyBcIm1cIiA6IFwiXCIpICsgKHNlcGFyYXRvci5leHRlbmRlZCA/IFwieFwiIDogXCJcIikgKyAvLyBQcm9wb3NlZCBmb3IgRVM2XG4gICAgICAoc2VwYXJhdG9yLnN0aWNreSA/IFwieVwiIDogXCJcIiksXG4gICAgICAvLyBGaXJlZm94IDMrXG4gICAgICBsYXN0TGFzdEluZGV4ID0gMCxcbiAgICAgIC8vIE1ha2UgYGdsb2JhbGAgYW5kIGF2b2lkIGBsYXN0SW5kZXhgIGlzc3VlcyBieSB3b3JraW5nIHdpdGggYSBjb3B5XG4gICAgICBzZXBhcmF0b3IgPSBuZXcgUmVnRXhwKHNlcGFyYXRvci5zb3VyY2UsIGZsYWdzICsgXCJnXCIpLFxuICAgICAgc2VwYXJhdG9yMiwgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICBzdHIgKz0gXCJcIjsgLy8gVHlwZS1jb252ZXJ0XG4gICAgaWYgKCFjb21wbGlhbnRFeGVjTnBjZykge1xuICAgICAgLy8gRG9lc24ndCBuZWVkIGZsYWdzIGd5LCBidXQgdGhleSBkb24ndCBodXJ0XG4gICAgICBzZXBhcmF0b3IyID0gbmV3IFJlZ0V4cChcIl5cIiArIHNlcGFyYXRvci5zb3VyY2UgKyBcIiQoPyFcXFxccylcIiwgZmxhZ3MpO1xuICAgIH1cbiAgICAvKiBWYWx1ZXMgZm9yIGBsaW1pdGAsIHBlciB0aGUgc3BlYzpcbiAgICAgKiBJZiB1bmRlZmluZWQ6IDQyOTQ5NjcyOTUgLy8gTWF0aC5wb3coMiwgMzIpIC0gMVxuICAgICAqIElmIDAsIEluZmluaXR5LCBvciBOYU46IDBcbiAgICAgKiBJZiBwb3NpdGl2ZSBudW1iZXI6IGxpbWl0ID0gTWF0aC5mbG9vcihsaW1pdCk7IGlmIChsaW1pdCA+IDQyOTQ5NjcyOTUpIGxpbWl0IC09IDQyOTQ5NjcyOTY7XG4gICAgICogSWYgbmVnYXRpdmUgbnVtYmVyOiA0Mjk0OTY3Mjk2IC0gTWF0aC5mbG9vcihNYXRoLmFicyhsaW1pdCkpXG4gICAgICogSWYgb3RoZXI6IFR5cGUtY29udmVydCwgdGhlbiB1c2UgdGhlIGFib3ZlIHJ1bGVzXG4gICAgICovXG4gICAgbGltaXQgPSBsaW1pdCA9PT0gdW5kZWYgPyAtMSA+Pj4gMCA6IC8vIE1hdGgucG93KDIsIDMyKSAtIDFcbiAgICBsaW1pdCA+Pj4gMDsgLy8gVG9VaW50MzIobGltaXQpXG4gICAgd2hpbGUgKG1hdGNoID0gc2VwYXJhdG9yLmV4ZWMoc3RyKSkge1xuICAgICAgLy8gYHNlcGFyYXRvci5sYXN0SW5kZXhgIGlzIG5vdCByZWxpYWJsZSBjcm9zcy1icm93c2VyXG4gICAgICBsYXN0SW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIGlmIChsYXN0SW5kZXggPiBsYXN0TGFzdEluZGV4KSB7XG4gICAgICAgIG91dHB1dC5wdXNoKHN0ci5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYCBmb3JcbiAgICAgICAgLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBzXG4gICAgICAgIGlmICghY29tcGxpYW50RXhlY05wY2cgJiYgbWF0Y2gubGVuZ3RoID4gMSkge1xuICAgICAgICAgIG1hdGNoWzBdLnJlcGxhY2Uoc2VwYXJhdG9yMiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWYpIHtcbiAgICAgICAgICAgICAgICBtYXRjaFtpXSA9IHVuZGVmO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDEgJiYgbWF0Y2guaW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkob3V0cHV0LCBtYXRjaC5zbGljZSgxKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdExlbmd0aCA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgaWYgKG91dHB1dC5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlcGFyYXRvci5sYXN0SW5kZXggPT09IG1hdGNoLmluZGV4KSB7XG4gICAgICAgIHNlcGFyYXRvci5sYXN0SW5kZXgrKzsgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobGFzdExhc3RJbmRleCA9PT0gc3RyLmxlbmd0aCkge1xuICAgICAgaWYgKGxhc3RMZW5ndGggfHwgIXNlcGFyYXRvci50ZXN0KFwiXCIpKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaChzdHIuc2xpY2UobGFzdExhc3RJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0Lmxlbmd0aCA+IGxpbWl0ID8gb3V0cHV0LnNsaWNlKDAsIGxpbWl0KSA6IG91dHB1dDtcbiAgfTtcblxuICByZXR1cm4gc2VsZjtcbn0pKCk7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBIVE1MIGVudGl0aWVzIGFuZCBIVE1MIGNoYXJhY3RlcnMuICovXG52YXIgcmVVbmVzY2FwZWRIdG1sID0gL1smPD5cIidgXS9nLFxuICAgIHJlSGFzVW5lc2NhcGVkSHRtbCA9IFJlZ0V4cChyZVVuZXNjYXBlZEh0bWwuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gbWFwIGNoYXJhY3RlcnMgdG8gSFRNTCBlbnRpdGllcy4gKi9cbnZhciBodG1sRXNjYXBlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjMzk7JyxcbiAgJ2AnOiAnJiM5NjsnXG59O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5T2Yob2JqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmVzY2FwZWAgdG8gY29udmVydCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaHIgVGhlIG1hdGNoZWQgY2hhcmFjdGVyIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICovXG52YXIgZXNjYXBlSHRtbENoYXIgPSBiYXNlUHJvcGVydHlPZihodG1sRXNjYXBlcyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgY2hhcmFjdGVycyBcIiZcIiwgXCI8XCIsIFwiPlwiLCAnXCInLCBcIidcIiwgYW5kIFwiXFxgXCIgaW4gYHN0cmluZ2AgdG9cbiAqIHRoZWlyIGNvcnJlc3BvbmRpbmcgSFRNTCBlbnRpdGllcy5cbiAqXG4gKiAqKk5vdGU6KiogTm8gb3RoZXIgY2hhcmFjdGVycyBhcmUgZXNjYXBlZC4gVG8gZXNjYXBlIGFkZGl0aW9uYWxcbiAqIGNoYXJhY3RlcnMgdXNlIGEgdGhpcmQtcGFydHkgbGlicmFyeSBsaWtlIFtfaGVfXShodHRwczovL210aHMuYmUvaGUpLlxuICpcbiAqIFRob3VnaCB0aGUgXCI+XCIgY2hhcmFjdGVyIGlzIGVzY2FwZWQgZm9yIHN5bW1ldHJ5LCBjaGFyYWN0ZXJzIGxpa2VcbiAqIFwiPlwiIGFuZCBcIi9cIiBkb24ndCBuZWVkIGVzY2FwaW5nIGluIEhUTUwgYW5kIGhhdmUgbm8gc3BlY2lhbCBtZWFuaW5nXG4gKiB1bmxlc3MgdGhleSdyZSBwYXJ0IG9mIGEgdGFnIG9yIHVucXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZS4gU2VlXG4gKiBbTWF0aGlhcyBCeW5lbnMncyBhcnRpY2xlXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvYW1iaWd1b3VzLWFtcGVyc2FuZHMpXG4gKiAodW5kZXIgXCJzZW1pLXJlbGF0ZWQgZnVuIGZhY3RcIikgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBCYWNrdGlja3MgYXJlIGVzY2FwZWQgYmVjYXVzZSBpbiBJRSA8IDksIHRoZXkgY2FuIGJyZWFrIG91dCBvZlxuICogYXR0cmlidXRlIHZhbHVlcyBvciBIVE1MIGNvbW1lbnRzLiBTZWUgWyM1OV0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzU5KSxcbiAqIFsjMTAyXShodHRwczovL2h0bWw1c2VjLm9yZy8jMTAyKSwgWyMxMDhdKGh0dHBzOi8vaHRtbDVzZWMub3JnLyMxMDgpLCBhbmRcbiAqIFsjMTMzXShodHRwczovL2h0bWw1c2VjLm9yZy8jMTMzKSBvZiB0aGVcbiAqIFtIVE1MNSBTZWN1cml0eSBDaGVhdHNoZWV0XShodHRwczovL2h0bWw1c2VjLm9yZy8pIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogV2hlbiB3b3JraW5nIHdpdGggSFRNTCB5b3Ugc2hvdWxkIGFsd2F5c1xuICogW3F1b3RlIGF0dHJpYnV0ZSB2YWx1ZXNdKGh0dHA6Ly93b25rby5jb20vcG9zdC9odG1sLWVzY2FwaW5nKSB0byByZWR1Y2VcbiAqIFhTUyB2ZWN0b3JzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZSgnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+ICdmcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZShzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNVbmVzY2FwZWRIdG1sLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlVW5lc2NhcGVkSHRtbCwgZXNjYXBlSHRtbENoYXIpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXNjYXBlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlcyBvdmVyIGBvYmplY3RgXG4gKiBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IGFuZFxuICogaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwga2V5LCBvYmplY3QpLiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uXG4gKiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4zLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uZm9yT3duUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5mb3JPd24obmV3IEZvbywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yT3duKG9iamVjdCwgdHlwZW9mIGl0ZXJhdGVlID09ICdmdW5jdGlvbicgPyBpdGVyYXRlZSA6IGlkZW50aXR5KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yT3duO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggd29yZHMgY29tcG9zZWQgb2YgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMuICovXG52YXIgcmVBc2NpaVdvcmQgPSAvW15cXHgwMC1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHg3Zl0rL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIExhdGluIFVuaWNvZGUgbGV0dGVycyAoZXhjbHVkaW5nIG1hdGhlbWF0aWNhbCBvcGVyYXRvcnMpLiAqL1xudmFyIHJlTGF0aW4gPSAvW1xceGMwLVxceGQ2XFx4ZDgtXFx4ZjZcXHhmOC1cXHhmZlxcdTAxMDAtXFx1MDE3Zl0vZztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZlxcXFx1ZmUyMC1cXFxcdWZlMjMnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmMCcsXG4gICAgcnNEaW5nYmF0UmFuZ2UgPSAnXFxcXHUyNzAwLVxcXFx1MjdiZicsXG4gICAgcnNMb3dlclJhbmdlID0gJ2EtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZicsXG4gICAgcnNNYXRoT3BSYW5nZSA9ICdcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3JyxcbiAgICByc05vbkNoYXJSYW5nZSA9ICdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmYnLFxuICAgIHJzUHVuY3R1YXRpb25SYW5nZSA9ICdcXFxcdTIwMDAtXFxcXHUyMDZmJyxcbiAgICByc1NwYWNlUmFuZ2UgPSAnIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDAnLFxuICAgIHJzVXBwZXJSYW5nZSA9ICdBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGUnLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJyxcbiAgICByc0JyZWFrUmFuZ2UgPSByc01hdGhPcFJhbmdlICsgcnNOb25DaGFyUmFuZ2UgKyByc1B1bmN0dWF0aW9uUmFuZ2UgKyByc1NwYWNlUmFuZ2U7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc0Fwb3MgPSBcIlsnXFx1MjAxOV1cIixcbiAgICByc0JyZWFrID0gJ1snICsgcnNCcmVha1JhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UgKyAnXScsXG4gICAgcnNEaWdpdHMgPSAnXFxcXGQrJyxcbiAgICByc0RpbmdiYXQgPSAnWycgKyByc0RpbmdiYXRSYW5nZSArICddJyxcbiAgICByc0xvd2VyID0gJ1snICsgcnNMb3dlclJhbmdlICsgJ10nLFxuICAgIHJzTWlzYyA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgcnNCcmVha1JhbmdlICsgcnNEaWdpdHMgKyByc0RpbmdiYXRSYW5nZSArIHJzTG93ZXJSYW5nZSArIHJzVXBwZXJSYW5nZSArICddJyxcbiAgICByc0ZpdHogPSAnXFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdJyxcbiAgICByc01vZGlmaWVyID0gJyg/OicgKyByc0NvbWJvICsgJ3wnICsgcnNGaXR6ICsgJyknLFxuICAgIHJzTm9uQXN0cmFsID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNSZWdpb25hbCA9ICcoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9JyxcbiAgICByc1N1cnJQYWlyID0gJ1tcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXScsXG4gICAgcnNVcHBlciA9ICdbJyArIHJzVXBwZXJSYW5nZSArICddJyxcbiAgICByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgcmVnZXhlcy4gKi9cbnZhciByc0xvd2VyTWlzYyA9ICcoPzonICsgcnNMb3dlciArICd8JyArIHJzTWlzYyArICcpJyxcbiAgICByc1VwcGVyTWlzYyA9ICcoPzonICsgcnNVcHBlciArICd8JyArIHJzTWlzYyArICcpJyxcbiAgICByc09wdExvd2VyQ29udHIgPSAnKD86JyArIHJzQXBvcyArICcoPzpkfGxsfG18cmV8c3x0fHZlKSk/JyxcbiAgICByc09wdFVwcGVyQ29udHIgPSAnKD86JyArIHJzQXBvcyArICcoPzpEfExMfE18UkV8U3xUfFZFKSk/JyxcbiAgICByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPycsXG4gICAgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JyxcbiAgICByc09wdEpvaW4gPSAnKD86JyArIHJzWldKICsgJyg/OicgKyBbcnNOb25Bc3RyYWwsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzT3B0VmFyICsgcmVPcHRNb2QgKyAnKSonLFxuICAgIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbixcbiAgICByc0Vtb2ppID0gJyg/OicgKyBbcnNEaW5nYmF0LCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc1NlcTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYXBvc3Ryb3BoZXMuICovXG52YXIgcmVBcG9zID0gUmVnRXhwKHJzQXBvcywgJ2cnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3NdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrcykgYW5kXG4gKiBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzIGZvciBzeW1ib2xzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3NfZm9yX1N5bWJvbHMpLlxuICovXG52YXIgcmVDb21ib01hcmsgPSBSZWdFeHAocnNDb21ibywgJ2cnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggY29tcGxleCBvciBjb21wb3VuZCB3b3Jkcy4gKi9cbnZhciByZVVuaWNvZGVXb3JkID0gUmVnRXhwKFtcbiAgcnNVcHBlciArICc/JyArIHJzTG93ZXIgKyAnKycgKyByc09wdExvd2VyQ29udHIgKyAnKD89JyArIFtyc0JyZWFrLCByc1VwcGVyLCAnJCddLmpvaW4oJ3wnKSArICcpJyxcbiAgcnNVcHBlck1pc2MgKyAnKycgKyByc09wdFVwcGVyQ29udHIgKyAnKD89JyArIFtyc0JyZWFrLCByc1VwcGVyICsgcnNMb3dlck1pc2MsICckJ10uam9pbignfCcpICsgJyknLFxuICByc1VwcGVyICsgJz8nICsgcnNMb3dlck1pc2MgKyAnKycgKyByc09wdExvd2VyQ29udHIsXG4gIHJzVXBwZXIgKyAnKycgKyByc09wdFVwcGVyQ29udHIsXG4gIHJzRGlnaXRzLFxuICByc0Vtb2ppXG5dLmpvaW4oJ3wnKSwgJ2cnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHN0cmluZ3MgdGhhdCBuZWVkIGEgbW9yZSByb2J1c3QgcmVnZXhwIHRvIG1hdGNoIHdvcmRzLiAqL1xudmFyIHJlSGFzVW5pY29kZVdvcmQgPSAvW2Etel1bQS1aXXxbQS1aXXsyLH1bYS16XXxbMC05XVthLXpBLVpdfFthLXpBLVpdWzAtOV18W15hLXpBLVowLTkgXS87XG5cbi8qKiBVc2VkIHRvIG1hcCBMYXRpbiBVbmljb2RlIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycy4gKi9cbnZhciBkZWJ1cnJlZExldHRlcnMgPSB7XG4gIC8vIExhdGluLTEgU3VwcGxlbWVudCBibG9jay5cbiAgJ1xceGMwJzogJ0EnLCAgJ1xceGMxJzogJ0EnLCAnXFx4YzInOiAnQScsICdcXHhjMyc6ICdBJywgJ1xceGM0JzogJ0EnLCAnXFx4YzUnOiAnQScsXG4gICdcXHhlMCc6ICdhJywgICdcXHhlMSc6ICdhJywgJ1xceGUyJzogJ2EnLCAnXFx4ZTMnOiAnYScsICdcXHhlNCc6ICdhJywgJ1xceGU1JzogJ2EnLFxuICAnXFx4YzcnOiAnQycsICAnXFx4ZTcnOiAnYycsXG4gICdcXHhkMCc6ICdEJywgICdcXHhmMCc6ICdkJyxcbiAgJ1xceGM4JzogJ0UnLCAgJ1xceGM5JzogJ0UnLCAnXFx4Y2EnOiAnRScsICdcXHhjYic6ICdFJyxcbiAgJ1xceGU4JzogJ2UnLCAgJ1xceGU5JzogJ2UnLCAnXFx4ZWEnOiAnZScsICdcXHhlYic6ICdlJyxcbiAgJ1xceGNjJzogJ0knLCAgJ1xceGNkJzogJ0knLCAnXFx4Y2UnOiAnSScsICdcXHhjZic6ICdJJyxcbiAgJ1xceGVjJzogJ2knLCAgJ1xceGVkJzogJ2knLCAnXFx4ZWUnOiAnaScsICdcXHhlZic6ICdpJyxcbiAgJ1xceGQxJzogJ04nLCAgJ1xceGYxJzogJ24nLFxuICAnXFx4ZDInOiAnTycsICAnXFx4ZDMnOiAnTycsICdcXHhkNCc6ICdPJywgJ1xceGQ1JzogJ08nLCAnXFx4ZDYnOiAnTycsICdcXHhkOCc6ICdPJyxcbiAgJ1xceGYyJzogJ28nLCAgJ1xceGYzJzogJ28nLCAnXFx4ZjQnOiAnbycsICdcXHhmNSc6ICdvJywgJ1xceGY2JzogJ28nLCAnXFx4ZjgnOiAnbycsXG4gICdcXHhkOSc6ICdVJywgICdcXHhkYSc6ICdVJywgJ1xceGRiJzogJ1UnLCAnXFx4ZGMnOiAnVScsXG4gICdcXHhmOSc6ICd1JywgICdcXHhmYSc6ICd1JywgJ1xceGZiJzogJ3UnLCAnXFx4ZmMnOiAndScsXG4gICdcXHhkZCc6ICdZJywgICdcXHhmZCc6ICd5JywgJ1xceGZmJzogJ3knLFxuICAnXFx4YzYnOiAnQWUnLCAnXFx4ZTYnOiAnYWUnLFxuICAnXFx4ZGUnOiAnVGgnLCAnXFx4ZmUnOiAndGgnLFxuICAnXFx4ZGYnOiAnc3MnLFxuICAvLyBMYXRpbiBFeHRlbmRlZC1BIGJsb2NrLlxuICAnXFx1MDEwMCc6ICdBJywgICdcXHUwMTAyJzogJ0EnLCAnXFx1MDEwNCc6ICdBJyxcbiAgJ1xcdTAxMDEnOiAnYScsICAnXFx1MDEwMyc6ICdhJywgJ1xcdTAxMDUnOiAnYScsXG4gICdcXHUwMTA2JzogJ0MnLCAgJ1xcdTAxMDgnOiAnQycsICdcXHUwMTBhJzogJ0MnLCAnXFx1MDEwYyc6ICdDJyxcbiAgJ1xcdTAxMDcnOiAnYycsICAnXFx1MDEwOSc6ICdjJywgJ1xcdTAxMGInOiAnYycsICdcXHUwMTBkJzogJ2MnLFxuICAnXFx1MDEwZSc6ICdEJywgICdcXHUwMTEwJzogJ0QnLCAnXFx1MDEwZic6ICdkJywgJ1xcdTAxMTEnOiAnZCcsXG4gICdcXHUwMTEyJzogJ0UnLCAgJ1xcdTAxMTQnOiAnRScsICdcXHUwMTE2JzogJ0UnLCAnXFx1MDExOCc6ICdFJywgJ1xcdTAxMWEnOiAnRScsXG4gICdcXHUwMTEzJzogJ2UnLCAgJ1xcdTAxMTUnOiAnZScsICdcXHUwMTE3JzogJ2UnLCAnXFx1MDExOSc6ICdlJywgJ1xcdTAxMWInOiAnZScsXG4gICdcXHUwMTFjJzogJ0cnLCAgJ1xcdTAxMWUnOiAnRycsICdcXHUwMTIwJzogJ0cnLCAnXFx1MDEyMic6ICdHJyxcbiAgJ1xcdTAxMWQnOiAnZycsICAnXFx1MDExZic6ICdnJywgJ1xcdTAxMjEnOiAnZycsICdcXHUwMTIzJzogJ2cnLFxuICAnXFx1MDEyNCc6ICdIJywgICdcXHUwMTI2JzogJ0gnLCAnXFx1MDEyNSc6ICdoJywgJ1xcdTAxMjcnOiAnaCcsXG4gICdcXHUwMTI4JzogJ0knLCAgJ1xcdTAxMmEnOiAnSScsICdcXHUwMTJjJzogJ0knLCAnXFx1MDEyZSc6ICdJJywgJ1xcdTAxMzAnOiAnSScsXG4gICdcXHUwMTI5JzogJ2knLCAgJ1xcdTAxMmInOiAnaScsICdcXHUwMTJkJzogJ2knLCAnXFx1MDEyZic6ICdpJywgJ1xcdTAxMzEnOiAnaScsXG4gICdcXHUwMTM0JzogJ0onLCAgJ1xcdTAxMzUnOiAnaicsXG4gICdcXHUwMTM2JzogJ0snLCAgJ1xcdTAxMzcnOiAnaycsICdcXHUwMTM4JzogJ2snLFxuICAnXFx1MDEzOSc6ICdMJywgICdcXHUwMTNiJzogJ0wnLCAnXFx1MDEzZCc6ICdMJywgJ1xcdTAxM2YnOiAnTCcsICdcXHUwMTQxJzogJ0wnLFxuICAnXFx1MDEzYSc6ICdsJywgICdcXHUwMTNjJzogJ2wnLCAnXFx1MDEzZSc6ICdsJywgJ1xcdTAxNDAnOiAnbCcsICdcXHUwMTQyJzogJ2wnLFxuICAnXFx1MDE0Myc6ICdOJywgICdcXHUwMTQ1JzogJ04nLCAnXFx1MDE0Nyc6ICdOJywgJ1xcdTAxNGEnOiAnTicsXG4gICdcXHUwMTQ0JzogJ24nLCAgJ1xcdTAxNDYnOiAnbicsICdcXHUwMTQ4JzogJ24nLCAnXFx1MDE0Yic6ICduJyxcbiAgJ1xcdTAxNGMnOiAnTycsICAnXFx1MDE0ZSc6ICdPJywgJ1xcdTAxNTAnOiAnTycsXG4gICdcXHUwMTRkJzogJ28nLCAgJ1xcdTAxNGYnOiAnbycsICdcXHUwMTUxJzogJ28nLFxuICAnXFx1MDE1NCc6ICdSJywgICdcXHUwMTU2JzogJ1InLCAnXFx1MDE1OCc6ICdSJyxcbiAgJ1xcdTAxNTUnOiAncicsICAnXFx1MDE1Nyc6ICdyJywgJ1xcdTAxNTknOiAncicsXG4gICdcXHUwMTVhJzogJ1MnLCAgJ1xcdTAxNWMnOiAnUycsICdcXHUwMTVlJzogJ1MnLCAnXFx1MDE2MCc6ICdTJyxcbiAgJ1xcdTAxNWInOiAncycsICAnXFx1MDE1ZCc6ICdzJywgJ1xcdTAxNWYnOiAncycsICdcXHUwMTYxJzogJ3MnLFxuICAnXFx1MDE2Mic6ICdUJywgICdcXHUwMTY0JzogJ1QnLCAnXFx1MDE2Nic6ICdUJyxcbiAgJ1xcdTAxNjMnOiAndCcsICAnXFx1MDE2NSc6ICd0JywgJ1xcdTAxNjcnOiAndCcsXG4gICdcXHUwMTY4JzogJ1UnLCAgJ1xcdTAxNmEnOiAnVScsICdcXHUwMTZjJzogJ1UnLCAnXFx1MDE2ZSc6ICdVJywgJ1xcdTAxNzAnOiAnVScsICdcXHUwMTcyJzogJ1UnLFxuICAnXFx1MDE2OSc6ICd1JywgICdcXHUwMTZiJzogJ3UnLCAnXFx1MDE2ZCc6ICd1JywgJ1xcdTAxNmYnOiAndScsICdcXHUwMTcxJzogJ3UnLCAnXFx1MDE3Myc6ICd1JyxcbiAgJ1xcdTAxNzQnOiAnVycsICAnXFx1MDE3NSc6ICd3JyxcbiAgJ1xcdTAxNzYnOiAnWScsICAnXFx1MDE3Nyc6ICd5JywgJ1xcdTAxNzgnOiAnWScsXG4gICdcXHUwMTc5JzogJ1onLCAgJ1xcdTAxN2InOiAnWicsICdcXHUwMTdkJzogJ1onLFxuICAnXFx1MDE3YSc6ICd6JywgICdcXHUwMTdjJzogJ3onLCAnXFx1MDE3ZSc6ICd6JyxcbiAgJ1xcdTAxMzInOiAnSUonLCAnXFx1MDEzMyc6ICdpaicsXG4gICdcXHUwMTUyJzogJ09lJywgJ1xcdTAxNTMnOiAnb2UnLFxuICAnXFx1MDE0OSc6IFwiJ25cIiwgJ1xcdTAxN2YnOiAnc3MnXG59O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnJlZHVjZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAgYXNcbiAqICB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZWR1Y2UoYXJyYXksIGl0ZXJhdGVlLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbi8qKlxuICogU3BsaXRzIGFuIEFTQ0lJIGBzdHJpbmdgIGludG8gYW4gYXJyYXkgb2YgaXRzIHdvcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqL1xuZnVuY3Rpb24gYXNjaWlXb3JkcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZUFzY2lpV29yZCkgfHwgW107XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5T2Yob2JqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmRlYnVycmAgdG8gY29udmVydCBMYXRpbi0xIFN1cHBsZW1lbnQgYW5kIExhdGluIEV4dGVuZGVkLUFcbiAqIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGxldHRlciBUaGUgbWF0Y2hlZCBsZXR0ZXIgdG8gZGVidXJyLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZGVidXJyZWQgbGV0dGVyLlxuICovXG52YXIgZGVidXJyTGV0dGVyID0gYmFzZVByb3BlcnR5T2YoZGVidXJyZWRMZXR0ZXJzKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHN0cmluZ2AgY29udGFpbnMgYSB3b3JkIGNvbXBvc2VkIG9mIFVuaWNvZGUgc3ltYm9scy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYSB3b3JkIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGVXb3JkKHN0cmluZykge1xuICByZXR1cm4gcmVIYXNVbmljb2RlV29yZC50ZXN0KHN0cmluZyk7XG59XG5cbi8qKlxuICogU3BsaXRzIGEgVW5pY29kZSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVXb3JkcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZVVuaWNvZGVXb3JkKSB8fCBbXTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5jYW1lbENhc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY29tYmluZSBlYWNoIHdvcmQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb21wb3VuZGVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVDb21wb3VuZGVyKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gYXJyYXlSZWR1Y2Uod29yZHMoZGVidXJyKHN0cmluZykucmVwbGFjZShyZUFwb3MsICcnKSksIGNhbGxiYWNrLCAnJyk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWJ1cnJzIGBzdHJpbmdgIGJ5IGNvbnZlcnRpbmdcbiAqIFtMYXRpbi0xIFN1cHBsZW1lbnRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhdGluLTFfU3VwcGxlbWVudF8oVW5pY29kZV9ibG9jaykjQ2hhcmFjdGVyX3RhYmxlKVxuICogYW5kIFtMYXRpbiBFeHRlbmRlZC1BXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MYXRpbl9FeHRlbmRlZC1BKVxuICogbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzIGFuZCByZW1vdmluZ1xuICogW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBkZWJ1cnIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBkZWJ1cnJlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVidXJyKCdkw6lqw6AgdnUnKTtcbiAqIC8vID0+ICdkZWphIHZ1J1xuICovXG5mdW5jdGlvbiBkZWJ1cnIoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiBzdHJpbmcgJiYgc3RyaW5nLnJlcGxhY2UocmVMYXRpbiwgZGVidXJyTGV0dGVyKS5yZXBsYWNlKHJlQ29tYm9NYXJrLCAnJyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG9cbiAqIFtrZWJhYiBjYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNTcGVjaWFsX2Nhc2Vfc3R5bGVzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUga2ViYWIgY2FzZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmtlYmFiQ2FzZSgnRm9vIEJhcicpO1xuICogLy8gPT4gJ2Zvby1iYXInXG4gKlxuICogXy5rZWJhYkNhc2UoJ2Zvb0JhcicpO1xuICogLy8gPT4gJ2Zvby1iYXInXG4gKlxuICogXy5rZWJhYkNhc2UoJ19fRk9PX0JBUl9fJyk7XG4gKiAvLyA9PiAnZm9vLWJhcidcbiAqL1xudmFyIGtlYmFiQ2FzZSA9IGNyZWF0ZUNvbXBvdW5kZXIoZnVuY3Rpb24ocmVzdWx0LCB3b3JkLCBpbmRleCkge1xuICByZXR1cm4gcmVzdWx0ICsgKGluZGV4ID8gJy0nIDogJycpICsgd29yZC50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbi8qKlxuICogU3BsaXRzIGBzdHJpbmdgIGludG8gYW4gYXJyYXkgb2YgaXRzIHdvcmRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge1JlZ0V4cHxzdHJpbmd9IFtwYXR0ZXJuXSBUaGUgcGF0dGVybiB0byBtYXRjaCB3b3Jkcy5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLm1hcGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLndvcmRzKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gWydmcmVkJywgJ2Jhcm5leScsICdwZWJibGVzJ11cbiAqXG4gKiBfLndvcmRzKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycsIC9bXiwgXSsvZyk7XG4gKiAvLyA9PiBbJ2ZyZWQnLCAnYmFybmV5JywgJyYnLCAncGViYmxlcyddXG4gKi9cbmZ1bmN0aW9uIHdvcmRzKHN0cmluZywgcGF0dGVybiwgZ3VhcmQpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcGF0dGVybiA9IGd1YXJkID8gdW5kZWZpbmVkIDogcGF0dGVybjtcblxuICBpZiAocGF0dGVybiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGhhc1VuaWNvZGVXb3JkKHN0cmluZykgPyB1bmljb2RlV29yZHMoc3RyaW5nKSA6IGFzY2lpV29yZHMoc3RyaW5nKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nLm1hdGNoKHBhdHRlcm4pIHx8IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtlYmFiQ2FzZTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBVTk9SREVSRURfQ09NUEFSRV9GTEFHID0gMSxcbiAgICBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC8sXG4gICAgcmVMZWFkaW5nRG90ID0gL15cXC4vLFxuICAgIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXksXG4gICAgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgICBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3JyksXG4gICAgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyksXG4gICAgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKSxcbiAgICBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGNhY2hlIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gY2FjaGUuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhY2hlID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBrZXkgaW4gT2JqZWN0KG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuXG4gKiAgVGhlIGJpdG1hc2sgbWF5IGJlIGNvbXBvc2VkIG9mIHRoZSBmb2xsb3dpbmcgZmxhZ3M6XG4gKiAgICAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgICAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3QodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgaWYgKCFvYmpJc0Fycikge1xuICAgIG9ialRhZyA9IGdldFRhZyhvYmplY3QpO1xuICAgIG9ialRhZyA9IG9ialRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb2JqVGFnO1xuICB9XG4gIGlmICghb3RoSXNBcnIpIHtcbiAgICBvdGhUYWcgPSBnZXRUYWcob3RoZXIpO1xuICAgIG90aFRhZyA9IG90aFRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb3RoVGFnO1xuICB9XG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcgJiYgIWlzSG9zdE9iamVjdChvYmplY3QpLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnICYmICFpc0hvc3RPYmplY3Qob3RoZXIpLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtBcnJheX0gbWF0Y2hEYXRhIFRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSwgY3VzdG9taXplcikge1xuICB2YXIgaW5kZXggPSBtYXRjaERhdGEubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gaW5kZXgsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gIWxlbmd0aDtcbiAgfVxuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIgZGF0YSA9IG1hdGNoRGF0YVtpbmRleF07XG4gICAgaWYgKChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSlcbiAgICAgICAgICA/IGRhdGFbMV0gIT09IG9iamVjdFtkYXRhWzBdXVxuICAgICAgICAgIDogIShkYXRhWzBdIGluIG9iamVjdClcbiAgICAgICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgZGF0YSA9IG1hdGNoRGF0YVtpbmRleF07XG4gICAgdmFyIGtleSA9IGRhdGFbMF0sXG4gICAgICAgIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHNyY1ZhbHVlID0gZGF0YVsxXTtcblxuICAgIGlmIChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSkge1xuICAgICAgaWYgKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdGFjayA9IG5ldyBTdGFjaztcbiAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSwgc3RhY2spO1xuICAgICAgfVxuICAgICAgaWYgKCEocmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBjdXN0b21pemVyLCBVTk9SREVSRURfQ09NUEFSRV9GTEFHIHwgUEFSVElBTF9DT01QQVJFX0ZMQUcsIHN0YWNrKVxuICAgICAgICAgICAgOiByZXN1bHRcbiAgICAgICAgICApKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXRlcmF0ZWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IFt2YWx1ZT1fLmlkZW50aXR5XSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhbiBpdGVyYXRlZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgaXRlcmF0ZWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJdGVyYXRlZSh2YWx1ZSkge1xuICAvLyBEb24ndCBzdG9yZSB0aGUgYHR5cGVvZmAgcmVzdWx0IGluIGEgdmFyaWFibGUgdG8gYXZvaWQgYSBKSVQgYnVnIGluIFNhZmFyaSA5LlxuICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjAzNCBmb3IgbW9yZSBkZXRhaWxzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgPyBiYXNlTWF0Y2hlc1Byb3BlcnR5KHZhbHVlWzBdLCB2YWx1ZVsxXSlcbiAgICAgIDogYmFzZU1hdGNoZXModmFsdWUpO1xuICB9XG4gIHJldHVybiBwcm9wZXJ0eSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBtYXRjaERhdGEgPSBnZXRNYXRjaERhdGEoc291cmNlKTtcbiAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc1Byb3BlcnR5YCB3aGljaCBkb2Vzbid0IGNsb25lIGBzcmNWYWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSB2YWx1ZSB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkocGF0aCwgc3JjVmFsdWUpIHtcbiAgaWYgKGlzS2V5KHBhdGgpICYmIGlzU3RyaWN0Q29tcGFyYWJsZShzcmNWYWx1ZSkpIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUodG9LZXkocGF0aCksIHNyY1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIG9ialZhbHVlID0gZ2V0KG9iamVjdCwgcGF0aCk7XG4gICAgcmV0dXJuIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIG9ialZhbHVlID09PSBzcmNWYWx1ZSlcbiAgICAgID8gaGFzSW4ob2JqZWN0LCBwYXRoKVxuICAgICAgOiBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIHVuZGVmaW5lZCwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHVsbEF0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGluZGl2aWR1YWxcbiAqIGluZGV4ZXMgb3IgY2FwdHVyaW5nIHRoZSByZW1vdmVkIGVsZW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtudW1iZXJbXX0gaW5kZXhlcyBUaGUgaW5kZXhlcyBvZiBlbGVtZW50cyB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVB1bGxBdChhcnJheSwgaW5kZXhlcykge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBpbmRleGVzLmxlbmd0aCA6IDAsXG4gICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBpbmRleCA9IGluZGV4ZXNbbGVuZ3RoXTtcbiAgICBpZiAobGVuZ3RoID09IGxhc3RJbmRleCB8fCBpbmRleCAhPT0gcHJldmlvdXMpIHtcbiAgICAgIHZhciBwcmV2aW91cyA9IGluZGV4O1xuICAgICAgaWYgKGlzSW5kZXgoaW5kZXgpKSB7XG4gICAgICAgIHNwbGljZS5jYWxsKGFycmF5LCBpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNLZXkoaW5kZXgsIGFycmF5KSkge1xuICAgICAgICB2YXIgcGF0aCA9IGNhc3RQYXRoKGluZGV4KSxcbiAgICAgICAgICAgIG9iamVjdCA9IHBhcmVudChhcnJheSwgcGF0aCk7XG5cbiAgICAgICAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgICAgICAgZGVsZXRlIG9iamVjdFt0b0tleShsYXN0KHBhdGgpKV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZWxldGUgYXJyYXlbdG9LZXkoaW5kZXgpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNsaWNlYCB3aXRob3V0IGFuIGl0ZXJhdGVlIGNhbGwgZ3VhcmQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9MF0gVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlU2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gLXN0YXJ0ID4gbGVuZ3RoID8gMCA6IChsZW5ndGggKyBzdGFydCk7XG4gIH1cbiAgZW5kID0gZW5kID4gbGVuZ3RoID8gbGVuZ3RoIDogZW5kO1xuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5ndGg7XG4gIH1cbiAgbGVuZ3RoID0gc3RhcnQgPiBlbmQgPyAwIDogKChlbmQgLSBzdGFydCkgPj4+IDApO1xuICBzdGFydCA+Pj49IDA7XG5cbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGFycmF5W2luZGV4ICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IHN0cmluZ1RvUGF0aCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghc2Vlbi5oYXMob3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLmFkZChvdGhJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShcbiAgICAgICAgICBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHxcbiAgICAgICAgICAgIGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10oYXJyYXkpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgb3RoZXIgPSBvdGhlci5idWZmZXI7XG5cbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBDb2VyY2UgYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCBhbmQgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzLlxuICAgICAgLy8gSW52YWxpZCBkYXRlcyBhcmUgY29lcmNlZCB0byBgTmFOYC5cbiAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRztcbiAgICAgIGNvbnZlcnQgfHwgKGNvbnZlcnQgPSBzZXRUb0FycmF5KTtcblxuICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICBiaXRtYXNrIHw9IFVOT1JERVJFRF9DT01QQVJFX0ZMQUc7XG5cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgICAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICBpZiAoc3ltYm9sVmFsdWVPZikge1xuICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHRydWU7XG4gIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBvYmplY3QpO1xuXG4gIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5LCBvdGhlciwgb2JqZWN0LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKVxuICAgICAgICAgIDogY29tcGFyZWRcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBtYXRjaCBkYXRhIG9mIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaERhdGEob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBrZXlzKG9iamVjdCksXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBrZXkgPSByZXN1bHRbbGVuZ3RoXSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgIHJlc3VsdFtsZW5ndGhdID0gW2tleSwgdmFsdWUsIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSldO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSxcbi8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UgPCAxNCwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGV4aXN0cyBvbiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYXNGdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjayBwcm9wZXJ0aWVzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzUGF0aChvYmplY3QsIHBhdGgsIGhhc0Z1bmMpIHtcbiAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aF0gOiBjYXN0UGF0aChwYXRoKTtcblxuICB2YXIgcmVzdWx0LFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKTtcbiAgICBpZiAoIShyZXN1bHQgPSBvYmplY3QgIT0gbnVsbCAmJiBoYXNGdW5jKG9iamVjdCwga2V5KSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBvYmplY3QgPSBvYmplY3Rba2V5XTtcbiAgfVxuICBpZiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0ID8gb2JqZWN0Lmxlbmd0aCA6IDA7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICFpc09iamVjdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gKiBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUoa2V5LCBzcmNWYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gc3JjVmFsdWUgJiZcbiAgICAgIChzcmNWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gT2JqZWN0KG9iamVjdCkpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBwYXJlbnQgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIFRoZSBwYXRoIHRvIGdldCB0aGUgcGFyZW50IHZhbHVlIG9mLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHBhcmVudCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gcGFyZW50KG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gcGF0aC5sZW5ndGggPT0gMSA/IG9iamVjdCA6IGJhc2VHZXQob2JqZWN0LCBiYXNlU2xpY2UocGF0aCwgMCwgLTEpKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZShmdW5jdGlvbihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChyZUxlYWRpbmdEb3QudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubGFzdChbMSwgMiwgM10pO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiBsYXN0KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIHJldHVybiBsZW5ndGggPyBhcnJheVtsZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBlbGVtZW50cyBmcm9tIGBhcnJheWAgdGhhdCBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3JcbiAqIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHRoZSByZW1vdmVkIGVsZW1lbnRzLiBUaGUgcHJlZGljYXRlIGlzIGludm9rZWRcbiAqIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gKlxuICogKipOb3RlOioqIFVubGlrZSBgXy5maWx0ZXJgLCB0aGlzIG1ldGhvZCBtdXRhdGVzIGBhcnJheWAuIFVzZSBgXy5wdWxsYFxuICogdG8gcHVsbCBlbGVtZW50cyBmcm9tIGFuIGFycmF5IGJ5IHZhbHVlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV1cbiAqICBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgcmVtb3ZlZCBlbGVtZW50cy5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5ID0gWzEsIDIsIDMsIDRdO1xuICogdmFyIGV2ZW5zID0gXy5yZW1vdmUoYXJyYXksIGZ1bmN0aW9uKG4pIHtcbiAqICAgcmV0dXJuIG4gJSAyID09IDA7XG4gKiB9KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheSk7XG4gKiAvLyA9PiBbMSwgM11cbiAqXG4gKiBjb25zb2xlLmxvZyhldmVucyk7XG4gKiAvLyA9PiBbMiwgNF1cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAoIShhcnJheSAmJiBhcnJheS5sZW5ndGgpKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluZGV4ZXMgPSBbXSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgPSBiYXNlSXRlcmF0ZWUocHJlZGljYXRlLCAzKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgaW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9XG4gIH1cbiAgYmFzZVB1bGxBdChhcnJheSwgaW5kZXhlcyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gQXNzaWduIGNhY2hlIHRvIGBfLm1lbW9pemVgLlxubWVtb2l6ZS5DYWNoZSA9IE1hcENhY2hlO1xuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IF8uY3JlYXRlKHsgJ2EnOiBfLmNyZWF0ZSh7ICdiJzogMiB9KSB9KTtcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EuYicpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2InKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGhhc0luKG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgaGFzUGF0aChvYmplY3QsIHBhdGgsIGJhc2VIYXNJbik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBhIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFtcbiAqICAgeyAnYSc6IHsgJ2InOiAyIH0gfSxcbiAqICAgeyAnYSc6IHsgJ2InOiAxIH0gfVxuICogXTtcbiAqXG4gKiBfLm1hcChvYmplY3RzLCBfLnByb3BlcnR5KCdhLmInKSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqXG4gKiBfLm1hcChfLnNvcnRCeShvYmplY3RzLCBfLnByb3BlcnR5KFsnYScsICdiJ10pKSwgJ2EuYicpO1xuICogLy8gPT4gWzEsIDJdXG4gKi9cbmZ1bmN0aW9uIHByb3BlcnR5KHBhdGgpIHtcbiAgcmV0dXJuIGlzS2V5KHBhdGgpID8gYmFzZVByb3BlcnR5KHRvS2V5KHBhdGgpKSA6IGJhc2VQcm9wZXJ0eURlZXAocGF0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluY2x1ZGVzYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIHNwZWNpZnlpbmcgYW4gaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gISFsZW5ndGggJiYgYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCAwKSA+IC0xO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoY29tcGFyYXRvcih2YWx1ZSwgYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUlzTmFOLCBmcm9tSW5kZXgpO1xuICB9XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYU5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbnVtYmVyIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYE5hTmAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHNlZW4gPSByZXN1bHQ7XG5cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4gIH1cbiAgZWxzZSBpZiAobGVuZ3RoID49IExBUkdFX0FSUkFZX1NJWkUpIHtcbiAgICB2YXIgc2V0ID0gaXRlcmF0ZWUgPyBudWxsIDogY3JlYXRlU2V0KGFycmF5KTtcbiAgICBpZiAoc2V0KSB7XG4gICAgICByZXR1cm4gc2V0VG9BcnJheShzZXQpO1xuICAgIH1cbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gY2FjaGVIYXM7XG4gICAgc2VlbiA9IG5ldyBTZXRDYWNoZTtcbiAgfVxuICBlbHNlIHtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIHZhbHVlID0gKGNvbXBhcmF0b3IgfHwgdmFsdWUgIT09IDApID8gdmFsdWUgOiAwO1xuICAgIGlmIChpc0NvbW1vbiAmJiBjb21wdXRlZCA9PT0gY29tcHV0ZWQpIHtcbiAgICAgIHZhciBzZWVuSW5kZXggPSBzZWVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChzZWVuSW5kZXgtLSkge1xuICAgICAgICBpZiAoc2VlbltzZWVuSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWluY2x1ZGVzKHNlZW4sIGNvbXB1dGVkLCBjb21wYXJhdG9yKSkge1xuICAgICAgaWYgKHNlZW4gIT09IHJlc3VsdCkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzZXQgb2JqZWN0IG9mIGB2YWx1ZXNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhZGQgdG8gdGhlIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBzZXQuXG4gKi9cbnZhciBjcmVhdGVTZXQgPSAhKFNldCAmJiAoMSAvIHNldFRvQXJyYXkobmV3IFNldChbLC0wXSkpWzFdKSA9PSBJTkZJTklUWSkgPyBub29wIDogZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiBuZXcgU2V0KHZhbHVlcyk7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiBhbiBhcnJheSwgdXNpbmdcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGluIHdoaWNoIG9ubHkgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZWFjaFxuICogZWxlbWVudCBpcyBrZXB0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUgZnJlZSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy51bmlxKFsyLCAxLCAyXSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqL1xuZnVuY3Rpb24gdW5pcShhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VVbmlxKGFycmF5KVxuICAgIDogW107XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYHVuZGVmaW5lZGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLm5vb3ApO1xuICogLy8gPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICovXG5mdW5jdGlvbiBub29wKCkge1xuICAvLyBObyBvcGVyYXRpb24gcGVyZm9ybWVkLlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXE7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiXG4vLyBodHRwczovL2dpdGh1Yi5jb20vTWF0dC1Fc2NoL3ZpcnR1YWwtZG9tL2Jsb2IvbWFzdGVyL3ZpcnR1YWwtaHlwZXJzY3JpcHQvcGFyc2UtdGFnLmpzXG5cbnZhciBzcGxpdCA9IHJlcXVpcmUoJ2Jyb3dzZXItc3BsaXQnKVxuXG52YXIgY2xhc3NJZFNwbGl0ID0gLyhbXFwuI10/W2EtekEtWjAtOVxcdTAwN0YtXFx1RkZGRl86LV0rKS9cbnZhciBub3RDbGFzc0lkID0gL15cXC58Iy9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZVNlbGVjdG9yIChzZWxlY3RvciwgdXBwZXIpIHtcbiAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnJ1xuICB2YXIgdGFnTmFtZVxuICB2YXIgaWQgPSAnJ1xuICB2YXIgY2xhc3NlcyA9IFtdXG5cbiAgdmFyIHRhZ1BhcnRzID0gc3BsaXQoc2VsZWN0b3IsIGNsYXNzSWRTcGxpdClcblxuICBpZiAobm90Q2xhc3NJZC50ZXN0KHRhZ1BhcnRzWzFdKSB8fCBzZWxlY3RvciA9PT0gJycpIHtcbiAgICB0YWdOYW1lID0gJ2RpdidcbiAgfVxuXG4gIHZhciBwYXJ0LCB0eXBlLCBpXG5cbiAgZm9yIChpID0gMDsgaSA8IHRhZ1BhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgcGFydCA9IHRhZ1BhcnRzW2ldXG5cbiAgICBpZiAoIXBhcnQpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdHlwZSA9IHBhcnQuY2hhckF0KDApXG5cbiAgICBpZiAoIXRhZ05hbWUpIHtcbiAgICAgIHRhZ05hbWUgPSBwYXJ0XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnLicpIHtcbiAgICAgIGNsYXNzZXMucHVzaChwYXJ0LnN1YnN0cmluZygxLCBwYXJ0Lmxlbmd0aCkpXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnIycpIHtcbiAgICAgIGlkID0gcGFydC5zdWJzdHJpbmcoMSwgcGFydC5sZW5ndGgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0YWdOYW1lOiB1cHBlciA9PT0gdHJ1ZSA/IHRhZ05hbWUudG9VcHBlckNhc2UoKSA6IHRhZ05hbWUsXG4gICAgaWQ6IGlkLFxuICAgIGNsYXNzTmFtZTogY2xhc3Nlcy5qb2luKCcgJylcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgY2hlY2tGb3JFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XHJcbiAgICAgICAgc3VwZXIoZXJyb3IpO1xyXG4gICAgICAgIGNvbnN0IGlzRXJyb3IgPSBgXHJcbiAgICAgICAgPGgzIHN0eWxlPVwiY29sb3I6IHJlZDtcIj5UeXBlRXJyb3I6ICR7dGhpcy5tZXNzYWdlfTwvaDM+XHJcbiAgICAgICAgPHA+PC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1jb25cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNjN2UyZjE7IGJvcmRlcjogMnB4IHNvbGlkICMzOGI2ZmY7IHBhZGRpbmc6IDhweCAxMnB4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdj4ke3RoaXMuc3RhY2t9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yXCIpLmlubmVySFRNTCA9IGlzRXJyb3I7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBjaGVja0ZvckVycm9yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBxdWlja19lcnJvcl8xID0gcmVxdWlyZShcInF1aWNrLWVycm9yXCIpO1xyXG5jb25zdCBzbmFiYmRvbSA9IHJlcXVpcmUoXCJzbmFiYmRvbVwiKTtcclxuY29uc3QgcHJvcHNfMSA9IHJlcXVpcmUoXCJzbmFiYmRvbS9tb2R1bGVzL3Byb3BzXCIpO1xyXG5jb25zdCByZWNvbmNpbGUgPSBzbmFiYmRvbS5pbml0KFtwcm9wc18xLmRlZmF1bHRdKTtcclxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcclxuY29uc3Qgc25hYmJkb21fMSA9IHJlcXVpcmUoXCJzbmFiYmRvbVwiKTtcclxuY29uc3QgaW5pdCA9IHJlcXVpcmUoJ3NuYWJiZG9tLXRvLWh0bWwvaW5pdCcpO1xyXG5jb25zdCBtb2R1bGVzID0gcmVxdWlyZSgnc25hYmJkb20tdG8taHRtbC9tb2R1bGVzJyk7XHJcbmNvbnN0IHRvSFRNTCA9IGluaXQoW1xyXG4gICAgbW9kdWxlcy5jbGFzcyxcclxuICAgIG1vZHVsZXMucHJvcHMsXHJcbiAgICBtb2R1bGVzLmF0dHJpYnV0ZXMsXHJcbiAgICBtb2R1bGVzLnN0eWxlXHJcbl0pO1xyXG4vLyBpbnRlcmZhY2UgSVF1aWNrIHtcclxuLy8gICAgIHJlYWRvbmx5ICRlbDogRWxlbWVudCxcclxuLy8gfVxyXG4vLyBmdW5jdGlvbiB3YXRjaEVmZmVjdChmbjpQIGFueSkge1xyXG4vLyAgICAgdGhpcy5hY3RpdmVFZmZlY3QgPSBmblxyXG4vLyAgICAgZm4oKVxyXG4vLyAgICAgdGhpcy5hY3RpdmVFZmZlY3QgPSBudWxsXHJcbi8vIH1cclxuY2xhc3MgRGVwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBuZXcgU2V0KCk7XHJcbiAgICB9XHJcbiAgICBkZXBlbmQoYWN0aXZlRWZmZWN0KSB7XHJcbiAgICAgICAgaWYgKGFjdGl2ZUVmZmVjdClcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5hZGQoYWN0aXZlRWZmZWN0KTtcclxuICAgIH1cclxuICAgIG5vdGlmeSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKHN1YikgPT4ge1xyXG4gICAgICAgICAgICBzdWIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgIHQucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7IH1cclxuICAgIHNldFN0YXRlKHBhcnRpYWxTdGF0ZSkge1xyXG4gICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgLi4uX3RoaXMuc3RhdGUsXHJcbiAgICAgICAgICAgIC4uLnBhcnRpYWxTdGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgUXVpY2suX191cGRhdGVyKF90aGlzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcihlbCwgcikge1xyXG4gICAgICAgIHJlY29uY2lsZShyb290LCBlbCk7XHJcbiAgICB9XHJcbn1cclxuY29uc3QgX3B0ID0gQ29tcG9uZW50LnByb3RvdHlwZTtcclxuX3B0LmlzUXVpY2tDbGFzc0NvbXBvbmVudCA9IHRydWU7XHJcbmNvbnN0IHJlbmRlciA9IGFzeW5jIChlbCwgcikgPT4ge1xyXG4gICAgcmVjb25jaWxlKHJvb3QsIGVsKTtcclxufTtcclxuY29uc3QgJGluaXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuICAgIGZhdi5ocmVmID0gXCIvZmF2aWNvbi5pY29cIjtcclxuICAgIGZhdi5yZWwgPSBcImljb25cIjtcclxuICAgIGNvbnN0IGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIik7XHJcbiAgICBjb25zb2xlLmxvZyhoKTtcclxufTtcclxuY29uc3QgJGxpc3RlbmVyID0gKHRhcmdldCwgdHlwZSwgZm4sIHByZXZlbnQpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChwcmV2ZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IFwiXCIgfHwgIXRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdChgdGFyZ2V0IG5vdCBwYXNzZWQgdG8gbGlzdGVuZXJgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuY29uc3QgdXNlID0gKGZ1bmMpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgICAgICBmdW5jO1xyXG4gICAgfSk7XHJcbn07XHJcbmNvbnN0IHZpZXcgPSAodmlldykgPT4ge1xyXG4gICAgY29uc3QgcmVuZGVyVmlld3RvSFRNTCA9IHRvSFRNTCh2aWV3KTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpLmlubmVySFRNTCA9IHJlbmRlclZpZXd0b0hUTUw7XHJcbn07XHJcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgcHJvcHMgPSB7fSwgLi4uY2hpbGRyZW4pID0+IHtcclxuICAgIGNoaWxkcmVuID0gY2hpbGRyZW4uZmxhdCgpO1xyXG4gICAgaWYgKHR5cGUucHJvdG90eXBlICYmIHR5cGUucHJvdG90eXBlLmlzUW5kUmVhY3RDbGFzc0NvbXBvbmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlID0gbmV3IHR5cGUocHJvcHMpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJbnN0YW5jZS5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgKHR5cGUpID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdHlwZShwcm9wcyk7XHJcbiAgICB9XHJcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gICAgbGV0IGRhdGFQcm9wcyA9IHt9O1xyXG4gICAgbGV0IGV2ZW50UHJvcHMgPSB7fTtcclxuICAgIGZvciAobGV0IHByb3BLZXkgaW4gcHJvcHMpIHtcclxuICAgICAgICAvLyBldmVudCBwcm9wcyBhbHdheXMgc3RhcnR3aXRoIG9uIGVnLiBvbkNsaWNrLCBvbkNoYW5nZSBldGMuXHJcbiAgICAgICAgaWYgKHByb3BLZXkuc3RhcnRzV2l0aCgnb24nKSkge1xyXG4gICAgICAgICAgICAvLyBvbkNsaWNrIC0+IGNsaWNrXHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gcHJvcEtleS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgZXZlbnRQcm9wc1tldmVudF0gPSBwcm9wc1twcm9wS2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGFQcm9wc1twcm9wS2V5XSA9IHByb3BzW3Byb3BLZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzbmFiYmRvbV8xLmgodHlwZSwgeyBwcm9wcyB9LCBjaGlsZHJlbik7XHJcbn07XHJcbmNvbnN0IF9fdXBkYXRlciA9IChpbnN0YW5jZSkgPT4geyByZXR1cm4gaW5zdGFuY2U7IH07XHJcbmNvbnN0ICRjb25maWcgPSAoZW52KSA9PiB7XHJcbiAgICBpZiAoZW52ID09PSBcInByb2R1Y3Rpb25cIikge1xyXG4gICAgfVxyXG4gICAgaWYgKGVudiA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVudiB8fCBlbnYgPT09IFwiXCIpIHtcclxuICAgIH1cclxufTtcclxuY29uc3QgUXVpY2sgPSB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICB1c2UsXHJcbiAgICB2aWV3LFxyXG4gICAgY3JlYXRlRWxlbWVudCxcclxuICAgIF9fdXBkYXRlcixcclxuICAgICRjb25maWcsXHJcbiAgICByZW5kZXIsXHJcbiAgICAkaW5pdCxcclxuICAgICRsaXN0ZW5lclxyXG59O1xyXG5RdWljay51c2UoUXVpY2suJGluaXQpO1xyXG5RdWljay51c2UoUXVpY2suJGxpc3RlbmVyKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gUXVpY2s7XHJcbiIsImltcG9ydCB7IHZub2RlIH0gZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaChzZWwsIGIsIGMpIHtcbiAgICB2YXIgZGF0YSA9IHt9LCBjaGlsZHJlbiwgdGV4dCwgaTtcbiAgICBpZiAoYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRhdGEgPSBiO1xuICAgICAgICBpZiAoaXMuYXJyYXkoYykpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYykpIHtcbiAgICAgICAgICAgIHRleHQgPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgJiYgYy5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2NdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXMuYXJyYXkoYikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYikpIHtcbiAgICAgICAgICAgIHRleHQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIgJiYgYi5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2JdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaXMucHJpbWl0aXZlKGNoaWxkcmVuW2ldKSlcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXSA9IHZub2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkcmVuW2ldLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxbMF0gPT09ICdzJyAmJiBzZWxbMV0gPT09ICd2JyAmJiBzZWxbMl0gPT09ICdnJyAmJlxuICAgICAgICAoc2VsLmxlbmd0aCA9PT0gMyB8fCBzZWxbM10gPT09ICcuJyB8fCBzZWxbM10gPT09ICcjJykpIHtcbiAgICAgICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCk7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuO1xuZXhwb3J0IGRlZmF1bHQgaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWguanMubWFwIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0IHZhciBodG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0IGRlZmF1bHQgaHRtbERvbUFwaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxkb21hcGkuanMubWFwIiwiZXhwb3J0IHZhciBhcnJheSA9IEFycmF5LmlzQXJyYXk7XG5leHBvcnQgZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzLmpzLm1hcCIsImltcG9ydCB2bm9kZSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCAqIGFzIGlzIGZyb20gJy4vaXMnO1xuaW1wb3J0IGh0bWxEb21BcGkgZnJvbSAnLi9odG1sZG9tYXBpJztcbmZ1bmN0aW9uIGlzVW5kZWYocykgeyByZXR1cm4gcyA9PT0gdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc0RlZihzKSB7IHJldHVybiBzICE9PSB1bmRlZmluZWQ7IH1cbnZhciBlbXB0eU5vZGUgPSB2bm9kZSgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5mdW5jdGlvbiBzYW1lVm5vZGUodm5vZGUxLCB2bm9kZTIpIHtcbiAgICByZXR1cm4gdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJiB2bm9kZTEuc2VsID09PSB2bm9kZTIuc2VsO1xufVxuZnVuY3Rpb24gaXNWbm9kZSh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5zZWwgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gICAgdmFyIGksIG1hcCA9IHt9LCBrZXksIGNoO1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICAgIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICBrZXkgPSBjaC5rZXk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbWFwW2tleV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59XG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knLCAncHJlJywgJ3Bvc3QnXTtcbmV4cG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZXhwb3J0IHsgdGh1bmsgfSBmcm9tICcuL3RodW5rJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KG1vZHVsZXMsIGRvbUFwaSkge1xuICAgIHZhciBpLCBqLCBjYnMgPSB7fTtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sRG9tQXBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaG9vayA9IG1vZHVsZXNbal1baG9va3NbaV1dO1xuICAgICAgICAgICAgaWYgKGhvb2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNic1tob29rc1tpXV0ucHVzaChob29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbXB0eU5vZGVBdChlbG0pIHtcbiAgICAgICAgdmFyIGlkID0gZWxtLmlkID8gJyMnICsgZWxtLmlkIDogJyc7XG4gICAgICAgIHZhciBjID0gZWxtLmNsYXNzTmFtZSA/ICcuJyArIGVsbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcbiAgICAgICAgcmV0dXJuIHZub2RlKGFwaS50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSArIGlkICsgYywge30sIFtdLCB1bmRlZmluZWQsIGVsbSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IoY2hpbGRFbG0sIGxpc3RlbmVycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcm1DYigpIHtcbiAgICAgICAgICAgIGlmICgtLWxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IGFwaS5wYXJlbnROb2RlKGNoaWxkRWxtKTtcbiAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50XzEsIGNoaWxkRWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbiwgc2VsID0gdm5vZGUuc2VsO1xuICAgICAgICBpZiAoc2VsID09PSAnIScpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgdm5vZGUudGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFBhcnNlIHNlbGVjdG9yXG4gICAgICAgICAgICB2YXIgaGFzaElkeCA9IHNlbC5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICB2YXIgZG90SWR4ID0gc2VsLmluZGV4T2YoJy4nLCBoYXNoSWR4KTtcbiAgICAgICAgICAgIHZhciBoYXNoID0gaGFzaElkeCA+IDAgPyBoYXNoSWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkb3QgPSBkb3RJZHggPiAwID8gZG90SWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0YWcgPSBoYXNoSWR4ICE9PSAtMSB8fCBkb3RJZHggIT09IC0xID8gc2VsLnNsaWNlKDAsIE1hdGgubWluKGhhc2gsIGRvdCkpIDogc2VsO1xuICAgICAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IGlzRGVmKGRhdGEpICYmIGlzRGVmKGkgPSBkYXRhLm5zKSA/IGFwaS5jcmVhdGVFbGVtZW50TlMoaSwgdGFnKVxuICAgICAgICAgICAgICAgIDogYXBpLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgICAgIGlmIChoYXNoIDwgZG90KVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2VsLnNsaWNlKGhhc2ggKyAxLCBkb3QpKTtcbiAgICAgICAgICAgIGlmIChkb3RJZHggPiAwKVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgc2VsLnNsaWNlKGRvdCArIDEpLnJlcGxhY2UoL1xcLi9nLCAnICcpKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaS5pbnNlcnQpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGUuZWxtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGosIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpXG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0odm5vZGUpO1xuICAgICAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHZub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBudWxsICYmIHR5cGVvZiBpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGlfMSA9IHZvaWQgMCwgbGlzdGVuZXJzID0gdm9pZCAwLCBybSA9IHZvaWQgMCwgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYoY2guc2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKGNoLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpXzEgPSAwOyBpXzEgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYnMucmVtb3ZlW2lfMV0oY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmKGlfMSA9IGNoLmRhdGEpICYmIGlzRGVmKGlfMSA9IGlfMS5ob29rKSAmJiBpc0RlZihpXzEgPSBpXzEucmVtb3ZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaV8xKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyAvLyBUZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudEVsbSwgY2guZWxtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ocGFyZW50RWxtLCBvbGRDaCwgbmV3Q2gsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgb2xkU3RhcnRJZHggPSAwLCBuZXdTdGFydElkeCA9IDA7XG4gICAgICAgIHZhciBvbGRFbmRJZHggPSBvbGRDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgICAgICB2YXIgb2xkRW5kVm5vZGUgPSBvbGRDaFtvbGRFbmRJZHhdO1xuICAgICAgICB2YXIgbmV3RW5kSWR4ID0gbmV3Q2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICAgICAgdmFyIG5ld0VuZFZub2RlID0gbmV3Q2hbbmV3RW5kSWR4XTtcbiAgICAgICAgdmFyIG9sZEtleVRvSWR4O1xuICAgICAgICB2YXIgaWR4SW5PbGQ7XG4gICAgICAgIHZhciBlbG1Ub01vdmU7XG4gICAgICAgIHZhciBiZWZvcmU7XG4gICAgICAgIHdoaWxlIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggJiYgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdOyAvLyBWbm9kZSBtaWdodCBoYXZlIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2xkRW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3U3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3RW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlKSkgeyAvLyBWbm9kZSBtb3ZlZCByaWdodFxuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcob2xkRW5kVm5vZGUuZWxtKSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlKSkgeyAvLyBWbm9kZSBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleVRvSWR4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeEluT2xkID0gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkgeyAvLyBOZXcgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtVG9Nb3ZlLnNlbCAhPT0gbmV3U3RhcnRWbm9kZS5zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgZWxtVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCB8fCBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ld0NoW25ld0VuZElkeCArIDFdID09IG51bGwgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4ICsgMV0uZWxtO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgaG9vaztcbiAgICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5kYXRhKSAmJiBpc0RlZihob29rID0gaS5ob29rKSAmJiBpc0RlZihpID0gaG9vay5wcmVwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2bm9kZS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy51cGRhdGVbaV0ob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSlcbiAgICAgICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZENoICE9PSBjaClcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMoZWxtLCBudWxsLCBjaCwgMCwgY2gubGVuZ3RoIC0gMSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9sZFZub2RlLnRleHQgIT09IHZub2RlLnRleHQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCB2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEZWYoaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucG9zdHBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwYXRjaChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGVsbSwgcGFyZW50O1xuICAgICAgICB2YXIgaW5zZXJ0ZWRWbm9kZVF1ZXVlID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucHJlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnByZVtpXSgpO1xuICAgICAgICBpZiAoIWlzVm5vZGUob2xkVm5vZGUpKSB7XG4gICAgICAgICAgICBvbGRWbm9kZSA9IGVtcHR5Tm9kZUF0KG9sZFZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2FtZVZub2RlKG9sZFZub2RlLCB2bm9kZSkpIHtcbiAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICAgICAgcGFyZW50ID0gYXBpLnBhcmVudE5vZGUoZWxtKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudCwgdm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcoZWxtKSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudCwgW29sZFZub2RlXSwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGluc2VydGVkVm5vZGVRdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldLmRhdGEuaG9vay5pbnNlcnQoaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnBvc3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucG9zdFtpXSgpO1xuICAgICAgICByZXR1cm4gdm5vZGU7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNuYWJiZG9tLmpzLm1hcCIsImltcG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZnVuY3Rpb24gY29weVRvVGh1bmsodm5vZGUsIHRodW5rKSB7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xuICAgIHZub2RlLmRhdGEuZm4gPSB0aHVuay5kYXRhLmZuO1xuICAgIHZub2RlLmRhdGEuYXJncyA9IHRodW5rLmRhdGEuYXJncztcbiAgICB0aHVuay5kYXRhID0gdm5vZGUuZGF0YTtcbiAgICB0aHVuay5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHRodW5rLnRleHQgPSB2bm9kZS50ZXh0O1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbn1cbmZ1bmN0aW9uIGluaXQodGh1bmspIHtcbiAgICB2YXIgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgdm5vZGUgPSBjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBjdXIuYXJncyk7XG4gICAgY29weVRvVGh1bmsodm5vZGUsIHRodW5rKTtcbn1cbmZ1bmN0aW9uIHByZXBhdGNoKG9sZFZub2RlLCB0aHVuaykge1xuICAgIHZhciBpLCBvbGQgPSBvbGRWbm9kZS5kYXRhLCBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciBvbGRBcmdzID0gb2xkLmFyZ3MsIGFyZ3MgPSBjdXIuYXJncztcbiAgICBpZiAob2xkLmZuICE9PSBjdXIuZm4gfHwgb2xkQXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG9sZEFyZ3NbaV0gIT09IGFyZ3NbaV0pIHtcbiAgICAgICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weVRvVGh1bmsob2xkVm5vZGUsIHRodW5rKTtcbn1cbmV4cG9ydCB2YXIgdGh1bmsgPSBmdW5jdGlvbiB0aHVuayhzZWwsIGtleSwgZm4sIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3MgPSBmbjtcbiAgICAgICAgZm4gPSBrZXk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGgoc2VsLCB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBob29rOiB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCB9LFxuICAgICAgICBmbjogZm4sXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCB0aHVuaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRodW5rLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnQgZGVmYXVsdCB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdXBkYXRlUHJvcHMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgY3VyLCBvbGQsIGVsbSA9IHZub2RlLmVsbSwgb2xkUHJvcHMgPSBvbGRWbm9kZS5kYXRhLnByb3BzLCBwcm9wcyA9IHZub2RlLmRhdGEucHJvcHM7XG4gICAgaWYgKCFvbGRQcm9wcyAmJiAhcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkUHJvcHMgPT09IHByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkUHJvcHMgPSBvbGRQcm9wcyB8fCB7fTtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIGZvciAoa2V5IGluIG9sZFByb3BzKSB7XG4gICAgICAgIGlmICghcHJvcHNba2V5XSkge1xuICAgICAgICAgICAgZGVsZXRlIGVsbVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgICAgIG9sZCA9IG9sZFByb3BzW2tleV07XG4gICAgICAgIGlmIChvbGQgIT09IGN1ciAmJiAoa2V5ICE9PSAndmFsdWUnIHx8IGVsbVtrZXldICE9PSBjdXIpKSB7XG4gICAgICAgICAgICBlbG1ba2V5XSA9IGN1cjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMucHJvcHNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlUHJvcHMsIHVwZGF0ZTogdXBkYXRlUHJvcHMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMucHJvcHNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnVzZVJlZiA9IGV4cG9ydHMuUXVpY2tSb3V0ZXJMaW5rID0gZXhwb3J0cy5jcmVhdGVQb3BTdGF0ZSA9IGV4cG9ydHMuUXVpY2tSb3V0ZXIgPSB2b2lkIDA7XHJcbmNvbnN0IHF1aWNranNfY29tcG9uZW50XzEgPSByZXF1aXJlKFwicXVpY2tqcy1jb21wb25lbnRcIik7XHJcbmNvbnN0IHF1aWNrX2Vycm9yXzEgPSByZXF1aXJlKFwicXVpY2stZXJyb3JcIik7XHJcbmNvbnN0IHBhdGhUb1JlZ2V4ID0gKHBhdGgpID0+IG5ldyBSZWdFeHAoXCJeXCIgKyBwYXRoLnJlcGxhY2UoL1xcLy9nLCBcIlxcXFwvXCIpLnJlcGxhY2UoLzpcXHcrL2csIFwiKC4rKVwiKSArIFwiJFwiKTtcclxuY29uc3QgZ2V0UGFyYW1zID0gKG1hdGNoKSA9PiB7XHJcbiAgICBpZiAobWF0Y2gucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KFwibWlzc2luZyByZXF1aXJlZCBwYXJhbXNcIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBtYXRjaC5yZXN1bHQuc2xpY2UoMSk7XHJcbiAgICBjb25zdCBrZXlzID0gQXJyYXkuZnJvbShtYXRjaC5yb3V0ZS5wYXRoLm1hdGNoQWxsKC86KFxcdyspL2cpKS5tYXAoKHJlc3VsdCkgPT4gcmVzdWx0WzFdKTtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhrZXlzLm1hcCgoa2V5LCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlc1tpXV07XHJcbiAgICB9KSk7XHJcbn07XHJcbmNsYXNzIFF1aWNrUm91dGVyIHtcclxuICAgIGFzeW5jIHVzZVJvdXRlKHJvdXRlcywgdXJsKSB7XHJcbiAgICAgICAgaWYgKHJvdXRlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdChcInJvdXRlcyBjYW5ub3QgYmUgZW1wdHlcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcm91dGUgbWF0Y2hlcyBVUkxcclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcm91dGVzLm1hcCgocm91dGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiByb3V0ZSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogbG9jYXRpb24ucGF0aG5hbWUubWF0Y2gocGF0aFRvUmVnZXgocm91dGUucGF0aCkpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGZpbmRNYXRjaCA9IG1hdGNoZXMuZmluZCgobWF0Y2gpID0+IG1hdGNoLnJlc3VsdCAhPT0gbnVsbCk7XHJcbiAgICAgICAgaWYgKCFmaW5kTWF0Y2gpIHtcclxuICAgICAgICAgICAgZmluZE1hdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IHJvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGUucGF0aCA9PT0gXCIvZXJyb3JcIiksXHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtsb2NhdGlvbi5wYXRobmFtZV1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBmaW5kTWF0Y2gucm91dGUudmlldyhnZXRQYXJhbXMoZmluZE1hdGNoKSk7XHJcbiAgICAgICAgICAgIHF1aWNranNfY29tcG9uZW50XzEuZGVmYXVsdC52aWV3KGF3YWl0IHZpZXcucmVuZGVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IGZpbmRNYXRjaC5yb3V0ZS52aWV3KGdldFBhcmFtcyhmaW5kTWF0Y2gpKTtcclxuICAgICAgICBxdWlja2pzX2NvbXBvbmVudF8xLmRlZmF1bHQudmlldyhhd2FpdCB2aWV3LnJlbmRlcigpKTtcclxuICAgICAgICB0aGlzLnNldFRpdGxlKGZpbmRNYXRjaC5yb3V0ZS50aXRsZSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcztcclxuICAgIH1cclxuICAgIDtcclxuICAgIGdldFJvdXRlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uc3QgZnJvbSA9IGRvY3VtZW50LnJlZmVycmVyO1xyXG4gICAgICAgIGNvbnN0IHRvID0gbG9jYXRpb24uaHJlZjtcclxuICAgICAgICBjb25zdCBuZXh0ID0gRnVuY3Rpb247XHJcbiAgICAgICAgY29uc3Qgcm91dGUgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZ1bGxQYXRoOiBsb2NhdGlvbi5ocmVmLFxyXG4gICAgICAgICAgICAgICAgcGF0aG5hbWU6IGxvY2F0aW9uLnBhdGhuYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGNhbGxiYWNrKHJvdXRlKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0byxcclxuICAgICAgICAgICAgZnJvbSwgcm91dGVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgY3JlYXRlTmF2aWdhdGlvbihyb3V0ZXMpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmxvY2FsTmFtZSA9PT0gXCJhXCIpIHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIGUudGFyZ2V0LmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgUXVpY2tSb3V0ZXIucHJvdG90eXBlLnVzZVJvdXRlKHJvdXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgaWYgKHRpdGxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIlF1aWNrIEFwcFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5RdWlja1JvdXRlciA9IFF1aWNrUm91dGVyO1xyXG47XHJcbmZ1bmN0aW9uIGNyZWF0ZVBvcFN0YXRlKHJvdXRlcykge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgUXVpY2tSb3V0ZXIucHJvdG90eXBlLnVzZVJvdXRlKHJvdXRlcyk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVBvcFN0YXRlID0gY3JlYXRlUG9wU3RhdGU7XHJcbmNsYXNzIFF1aWNrUm91dGVyTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgY29uc3QgdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbGlua1RvID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RvJyk7XHJcbiAgICAgICAgaWYgKCFsaW5rVG8pIHtcclxuICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdChgdG8gYXR0cmlidXRlIG11c3QgYmUgc3BlY2lmaWVkIHRvIHJvdXRlLCBxdWljay1saW5rIHJldHVybmVkICR7bGlua1RvfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjdXN0b21UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgY3VzdG9tVGFnLmhyZWYgPSBsaW5rVG87XHJcbiAgICAgICAgY3VzdG9tVGFnLmlubmVySFRNTCA9IHRoaXMuaW5uZXJIVE1MO1xyXG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZShcInJlZlwiKSkge1xyXG4gICAgICAgICAgICBjdXN0b21UYWcuaWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcInJlZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIikpIHtcclxuICAgICAgICAgICAgY3VzdG9tVGFnLmlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUoY3VzdG9tVGFnLCB0aGlzKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgICAgIGlmICh0aGlzLmlubmVySFRNTCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBjdXN0b21UYWcuaW5uZXJUZXh0ID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJJID0gdGhpcy5hdHRyaWJ1dGVzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmliQSA9IHRoaXMuYXR0cmlidXRlc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJJLm5hbWUgPT09IFwidG9cIikge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tVGFnLnNldEF0dHJpYnV0ZShgJHthdHRyaWJJLm5hbWV9YCwgYCR7YXR0cmliSS52YWx1ZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUXVpY2tSb3V0ZXJMaW5rID0gUXVpY2tSb3V0ZXJMaW5rO1xyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdxdWljay1yb3V0ZXItbGluaycsIFF1aWNrUm91dGVyTGluayk7XHJcbnF1aWNranNfY29tcG9uZW50XzEuZGVmYXVsdC51c2UoUXVpY2tSb3V0ZXJMaW5rKTtcclxuY2xhc3MgdXNlUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXBwPy5jaGlsZHJlbik7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy51c2VSZWYgPSB1c2VSZWY7XHJcbiIsIlxuLy8gQWxsIFNWRyBjaGlsZHJlbiBlbGVtZW50cywgbm90IGluIHRoaXMgbGlzdCwgc2hvdWxkIHNlbGYtY2xvc2VcblxuZXhwb3J0cy5DT05UQUlORVIgPSB7XG4gIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1NWRy9pbnRyby5odG1sI1Rlcm1Db250YWluZXJFbGVtZW50XG4gICdhJzogdHJ1ZSxcbiAgJ2RlZnMnOiB0cnVlLFxuICAnZ2x5cGgnOiB0cnVlLFxuICAnZyc6IHRydWUsXG4gICdtYXJrZXInOiB0cnVlLFxuICAnbWFzayc6IHRydWUsXG4gICdtaXNzaW5nLWdseXBoJzogdHJ1ZSxcbiAgJ3BhdHRlcm4nOiB0cnVlLFxuICAnc3ZnJzogdHJ1ZSxcbiAgJ3N3aXRjaCc6IHRydWUsXG4gICdzeW1ib2wnOiB0cnVlLFxuICAndGV4dCc6IHRydWUsXG5cbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHL2ludHJvLmh0bWwjVGVybURlc2NyaXB0aXZlRWxlbWVudFxuICAnZGVzYyc6IHRydWUsXG4gICdtZXRhZGF0YSc6IHRydWUsXG4gICd0aXRsZSc6IHRydWVcbn1cblxuLy8gaHR0cDovL3d3dy53My5vcmcvaHRtbC93Zy9kcmFmdHMvaHRtbC9tYXN0ZXIvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xuXG5leHBvcnRzLlZPSUQgPSB7XG4gIGFyZWE6IHRydWUsXG4gIGJhc2U6IHRydWUsXG4gIGJyOiB0cnVlLFxuICBjb2w6IHRydWUsXG4gIGVtYmVkOiB0cnVlLFxuICBocjogdHJ1ZSxcbiAgaW1nOiB0cnVlLFxuICBpbnB1dDogdHJ1ZSxcbiAga2V5Z2VuOiB0cnVlLFxuICBsaW5rOiB0cnVlLFxuICBtZXRhOiB0cnVlLFxuICBwYXJhbTogdHJ1ZSxcbiAgc291cmNlOiB0cnVlLFxuICB0cmFjazogdHJ1ZSxcbiAgd2JyOiB0cnVlXG59XG4iLCJcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcbnZhciBwYXJzZVNlbGVjdG9yID0gcmVxdWlyZSgncGFyc2Utc2VsJylcbnZhciBWT0lEX0VMRU1FTlRTID0gcmVxdWlyZSgnLi9lbGVtZW50cycpLlZPSURcbnZhciBDT05UQUlORVJfRUxFTUVOVFMgPSByZXF1aXJlKCcuL2VsZW1lbnRzJykuQ09OVEFJTkVSXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5pdCAobW9kdWxlcykge1xuICBmdW5jdGlvbiBwYXJzZSAodm5vZGUsIG5vZGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICB2YXIgYXR0cmlidXRlcyA9IG5ldyBNYXAoW1xuICAgICAgLy8gVGhlc2UgY2FuIGJlIG92ZXJ3cml0dGVuIGJlY2F1c2UgdGhhdOKAmXMgd2hhdCBoYXBwZW5zIGluIHNuYWJiZG9tXG4gICAgICBbJ2lkJywgbm9kZS5pZF0sXG4gICAgICBbJ2NsYXNzJywgbm9kZS5jbGFzc05hbWVdXG4gICAgXSlcblxuICAgIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZm4sIGluZGV4KSB7XG4gICAgICBmbih2bm9kZSwgYXR0cmlidXRlcylcbiAgICB9KVxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgICByZXN1bHQucHVzaChrZXkgKyAnPVwiJyArIHZhbHVlICsgJ1wiJylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJylcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJUb1N0cmluZyAodm5vZGUpIHtcbiAgICBpZiAodHlwZW9mIHZub2RlID09PSAndW5kZWZpbmVkJyB8fCB2bm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgaWYgKCF2bm9kZS5zZWwgJiYgdHlwZW9mIHZub2RlLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZXNjYXBlKHZub2RlLnRleHQpXG4gICAgfVxuXG4gICAgdm5vZGUuZGF0YSA9IHZub2RlLmRhdGEgfHwge31cblxuICAgIC8vIFN1cHBvcnQgdGh1bmtzXG4gICAgaWYgKHZub2RlLmRhdGEuaG9vayAmJlxuICAgICAgdHlwZW9mIHZub2RlLmRhdGEuaG9vay5pbml0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2Ygdm5vZGUuZGF0YS5mbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdm5vZGUuZGF0YS5ob29rLmluaXQodm5vZGUpXG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSBwYXJzZVNlbGVjdG9yKHZub2RlLnNlbClcbiAgICB2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZVxuICAgIHZhciBhdHRyaWJ1dGVzID0gcGFyc2Uodm5vZGUsIG5vZGUpXG4gICAgdmFyIHN2ZyA9IHZub2RlLmRhdGEubnMgPT09ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbiAgICB2YXIgdGFnID0gW11cblxuICAgIGlmICh0YWdOYW1lID09PSAnIScpIHtcbiAgICAgIHJldHVybiAnPCEtLScgKyB2bm9kZS50ZXh0ICsgJy0tPidcbiAgICB9XG5cbiAgICAvLyBPcGVuIHRhZ1xuICAgIHRhZy5wdXNoKCc8JyArIHRhZ05hbWUpXG4gICAgaWYgKGF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICB0YWcucHVzaCgnICcgKyBhdHRyaWJ1dGVzKVxuICAgIH1cbiAgICBpZiAoc3ZnICYmIENPTlRBSU5FUl9FTEVNRU5UU1t0YWdOYW1lXSAhPT0gdHJ1ZSkge1xuICAgICAgdGFnLnB1c2goJyAvJylcbiAgICB9XG4gICAgdGFnLnB1c2goJz4nKVxuXG4gICAgLy8gQ2xvc2UgdGFnLCBpZiBuZWVkZWRcbiAgICBpZiAoKFZPSURfRUxFTUVOVFNbdGFnTmFtZV0gIT09IHRydWUgJiYgIXN2ZykgfHxcbiAgICAgICAgKHN2ZyAmJiBDT05UQUlORVJfRUxFTUVOVFNbdGFnTmFtZV0gPT09IHRydWUpKSB7XG4gICAgICBpZiAodm5vZGUuZGF0YS5wcm9wcyAmJiB2bm9kZS5kYXRhLnByb3BzLmlubmVySFRNTCkge1xuICAgICAgICB0YWcucHVzaCh2bm9kZS5kYXRhLnByb3BzLmlubmVySFRNTClcbiAgICAgIH0gZWxzZSBpZiAodm5vZGUudGV4dCkge1xuICAgICAgICB0YWcucHVzaChlc2NhcGUodm5vZGUudGV4dCkpXG4gICAgICB9IGVsc2UgaWYgKHZub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgdGFnLnB1c2gocmVuZGVyVG9TdHJpbmcoY2hpbGQpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGFnLnB1c2goJzwvJyArIHRhZ05hbWUgKyAnPicpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRhZy5qb2luKCcnKVxuICB9XG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gZGF0YS5hdHRyc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF0dHJzTW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzIHx8IHt9XG5cbiAgZm9yT3duKGF0dHJzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KGtleSwgZXNjYXBlKHZhbHVlKSlcbiAgfSlcbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIHJlbW92ZSA9IHJlcXVpcmUoJ2xvZGFzaC5yZW1vdmUnKVxudmFyIHVuaXEgPSByZXF1aXJlKCdsb2Rhc2gudW5pcScpXG5cbi8vIGRhdGEuY2xhc3NcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGFzc01vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHZhbHVlc1xuICB2YXIgX2FkZCA9IFtdXG4gIHZhciBfcmVtb3ZlID0gW11cbiAgdmFyIGNsYXNzZXMgPSB2bm9kZS5kYXRhLmNsYXNzIHx8IHt9XG4gIHZhciBleGlzdGluZyA9IGF0dHJpYnV0ZXMuZ2V0KCdjbGFzcycpXG4gIGV4aXN0aW5nID0gZXhpc3RpbmcubGVuZ3RoID4gMCA/IGV4aXN0aW5nLnNwbGl0KCcgJykgOiBbXVxuXG4gIGZvck93bihjbGFzc2VzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgX2FkZC5wdXNoKGtleSlcbiAgICB9IGVsc2Uge1xuICAgICAgX3JlbW92ZS5wdXNoKGtleSlcbiAgICB9XG4gIH0pXG5cbiAgdmFsdWVzID0gcmVtb3ZlKHVuaXEoZXhpc3RpbmcuY29uY2F0KF9hZGQpKSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIF9yZW1vdmUuaW5kZXhPZih2YWx1ZSkgPCAwXG4gIH0pXG5cbiAgaWYgKHZhbHVlcy5sZW5ndGgpIHtcbiAgICBhdHRyaWJ1dGVzLnNldCgnY2xhc3MnLCB2YWx1ZXMuam9pbignICcpKVxuICB9XG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gZGF0YS5kYXRhc2V0XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGF0YXNldE1vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIGRhdGFzZXQgPSB2bm9kZS5kYXRhLmRhdGFzZXQgfHwge31cblxuICBmb3JPd24oZGF0YXNldCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBhdHRyaWJ1dGVzLnNldChgZGF0YS0ke2tleX1gLCBlc2NhcGUodmFsdWUpKVxuICB9KVxufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2xhc3M6IHJlcXVpcmUoJy4vY2xhc3MnKSxcbiAgcHJvcHM6IHJlcXVpcmUoJy4vcHJvcHMnKSxcbiAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gIGRhdGFzZXQ6IHJlcXVpcmUoJy4vZGF0YXNldCcpXG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL2VsZW1lbnRcbnZhciBvbWl0ID0gW1xuICAnYXR0cmlidXRlcycsXG4gICdjaGlsZEVsZW1lbnRDb3VudCcsXG4gICdjaGlsZHJlbicsXG4gICdjbGFzc0xpc3QnLFxuICAnY2xpZW50SGVpZ2h0JyxcbiAgJ2NsaWVudExlZnQnLFxuICAnY2xpZW50VG9wJyxcbiAgJ2NsaWVudFdpZHRoJyxcbiAgJ2N1cnJlbnRTdHlsZScsXG4gICdmaXJzdEVsZW1lbnRDaGlsZCcsXG4gICdpbm5lckhUTUwnLFxuICAnbGFzdEVsZW1lbnRDaGlsZCcsXG4gICduZXh0RWxlbWVudFNpYmxpbmcnLFxuICAnb25nb3Rwb2ludGVyY2FwdHVyZScsXG4gICdvbmxvc3Rwb2ludGVyY2FwdHVyZScsXG4gICdvbndoZWVsJyxcbiAgJ291dGVySFRNTCcsXG4gICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJyxcbiAgJ3J1bnRpbWVTdHlsZScsXG4gICdzY3JvbGxIZWlnaHQnLFxuICAnc2Nyb2xsTGVmdCcsXG4gICdzY3JvbGxMZWZ0TWF4JyxcbiAgJ3Njcm9sbFRvcCcsXG4gICdzY3JvbGxUb3BNYXgnLFxuICAnc2Nyb2xsV2lkdGgnLFxuICAndGFiU3RvcCcsXG4gICd0YWdOYW1lJ1xuXVxuXG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI2Jvb2xlYW4tYXR0cmlidXRlc1xudmFyIGJvb2xlYW5BdHRyaWJ1dGVzID0gW1xuICAnZGlzYWJsZWQnLFxuICAndmlzaWJsZScsXG4gICdjaGVja2VkJyxcbiAgJ3JlYWRvbmx5JyxcbiAgJ3JlcXVpcmVkJyxcbiAgJ2FsbG93ZnVsbHNjcmVlbicsXG4gICdhdXRvZm9jdXMnLFxuICAnYXV0b3BsYXknLFxuICAnY29tcGFjdCcsXG4gICdjb250cm9scycsXG4gICdkZWZhdWx0JyxcbiAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgJ2hpZGRlbicsXG4gICdpc21hcCcsXG4gICdpdGVtc2NvcGUnLFxuICAnbG9vcCcsXG4gICdtdWx0aXBsZScsXG4gICdtdXRlZCcsXG4gICdub3Jlc2l6ZScsXG4gICdub3NoYWRlJyxcbiAgJ25vdmFsaWRhdGUnLFxuICAnbm93cmFwJyxcbiAgJ29wZW4nLFxuICAncmV2ZXJzZWQnLFxuICAnc2VhbWxlc3MnLFxuICAnc2VsZWN0ZWQnLFxuICAnc29ydGFibGUnLFxuICAndHJ1ZXNwZWVkJyxcbiAgJ3R5cGVtdXN0bWF0Y2gnXG5dXG5cbi8vIGRhdGEucHJvcHNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcm9wc01vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcyB8fCB7fVxuXG4gIGZvck93bihwcm9wcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBpZiAob21pdC5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChrZXkgPT09ICdodG1sRm9yJykge1xuICAgICAga2V5ID0gJ2ZvcidcbiAgICB9XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzTmFtZScpIHtcbiAgICAgIGtleSA9ICdjbGFzcydcbiAgICB9XG5cbiAgICB2YXIgbGtleSA9IGtleS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKH5ib29sZWFuQXR0cmlidXRlcy5pbmRleE9mKGxrZXkpKSB7XG4gICAgICBpZiAodmFsdWUpIHsgLy8gc2V0IGF0dHIgb25seSB3aGVuIHRydXRoeVxuICAgICAgICBhdHRyaWJ1dGVzLnNldChsa2V5LCBsa2V5KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJ1dGVzLnNldChsa2V5LCBlc2NhcGUodmFsdWUpKVxuICAgIH1cbiAgfSlcbn1cbiIsIlxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKVxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxudmFyIGtlYmFiQ2FzZSA9IHJlcXVpcmUoJ2xvZGFzaC5rZWJhYmNhc2UnKVxuXG4vLyBkYXRhLnN0eWxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGVNb2R1bGUgKHZub2RlLCBhdHRyaWJ1dGVzKSB7XG4gIHZhciB2YWx1ZXMgPSBbXVxuICB2YXIgc3R5bGUgPSB2bm9kZS5kYXRhLnN0eWxlIHx8IHt9XG5cbiAgLy8gbWVyZ2UgaW4gYGRlbGF5ZWRgIHByb3BlcnRpZXNcbiAgaWYgKHN0eWxlLmRlbGF5ZWQpIHtcbiAgICBhc3NpZ24oc3R5bGUsIHN0eWxlLmRlbGF5ZWQpXG4gIH1cblxuICBmb3JPd24oc3R5bGUsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgLy8gb21pdCBob29rIG9iamVjdHNcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB2YXIga2ViYWJLZXkgPSBrZWJhYkNhc2Uoa2V5KVxuICAgICAgdmFsdWVzLnB1c2goKGtleS5tYXRjaCgvXi0tLiovKSA/ICctLScgKyBrZWJhYktleSA6IGtlYmFiS2V5KSArICc6ICcgKyBlc2NhcGUodmFsdWUpKVxuICAgIH1cbiAgfSlcblxuICBpZiAodmFsdWVzLmxlbmd0aCkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KCdzdHlsZScsIHZhbHVlcy5qb2luKCc7ICcpKVxuICB9XG59XG4iLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCJcclxuaW1wb3J0IHsgUXVpY2tSb3V0ZXIsIGNyZWF0ZVBvcFN0YXRlIH0gZnJvbSBcInF1aWNranMtcm91dGVyXCI7XHJcbmNvbnN0IHJvdXRlciA9IG5ldyBRdWlja1JvdXRlcjtcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi4vLi4vc3JjL3ZpZXdzL0FwcFwiXHJcbmltcG9ydCBBYm91dCBmcm9tIFwiLi4vLi4vc3JjL3ZpZXdzL0Fib3V0XCJcclxuaW1wb3J0IE5vdEZvdW5kIGZyb20gXCIuLi8uLi9zcmMvdmlld3MvTm90Zm91bmRcIlxyXG5jb25zdCAgcm91dGVzID0gW1xyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICcvJyxcclxuICAgICAgICB2aWV3OiBBcHAsXHJcbiAgICAgICAgdGl0bGU6IFwiSG9tZVwiLFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnL2Fib3V0JyxcclxuICAgICAgICB0aXRsZTogXCJBYm91dFwiLFxyXG4gICAgICAgIHZpZXc6IEFib3V0XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICcvZXJyb3InLFxyXG4gICAgICAgIHZpZXc6IE5vdEZvdW5kLFxyXG4gICAgICAgIHRpdGxlOiBcIlBhZ2UgTm90IEZvdW5kXCIsXHJcbiAgICB9LFxyXG5dO1xyXG5cclxuUXVpY2sudXNlKHJvdXRlci51c2VSb3V0ZShyb3V0ZXMpKTtcclxucm91dGVyLmNyZWF0ZU5hdmlnYXRpb24ocm91dGVzKVxyXG5jcmVhdGVQb3BTdGF0ZShyb3V0ZXMpXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcyIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIlxyXG5cclxuXHJcbmNvbnN0IEFib3V0RGV0YWlsID0gXCJRdWljay5qcyBpcyBhIGNvbmZpZ3VyZWQgc2VydmVyIHNpZGUgIHNpbmdsZSBwYWdlIGFwcGxpY2F0aW9uIHRoYXQgbGV0cyB5b3UgY3JlYXRlIHlvdXIgb3duIHNldmVyIHNpZGUgYXBwbGljYXRpb24gaW4gbm8gdGltZS5cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJvdXQgZXh0ZW5kcyBRdWljay5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgc3VwZXIocGFyYW1zKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb24gYWJvdXQtY29uIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEwIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+SG9tZTwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeS1ub3JtYWwgdW5kZXJsaW5lIGFjdGl2ZVwiIHRvPVwiL2Fib3V0XCI+QWJvdXQ8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ28gbXQtMTAgdy0xMCBwLTEgbWF4LXctbWQgYmxvY2sgbWwtYXV0byBtci1hdXRvIGFuaW1hdGUtYm91bmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxdWljay1sb2dvIHctOFwiIHNyYz1cImh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL3NlcnZlcnlndWtlbi9pbWFnZS91cGxvYWQvdjE2MTUxODg5OTIvUXVpY2tKUy9sb2dvL3F1aWNranMtbG9nb193angzZHcuc3ZnXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFib3V0LXBhZ2UgdGV4dC1jZW50ZXIgbXQtNSB0ZXh0LTN4bCB0ZXh0LWJsYWNrIGZvbnQtYm9sZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBwLTEgd2MtdHh0XCI+QWJvdXQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5LW5vcm1hbFwiPlF1aWNrLmpzPC9zcGFuPiA8L2gxPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbCBwLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibXQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7QWJvdXREZXRhaWx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibXQtNiBmb250LWJvbGRcIj5FY29zeXN0ZW0gfCBFeHRlcm5hbCBsaW5rczwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGV4dGVybmFsIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+PGxpPlF1aWNranMtY29tcG9uZW50PC9saT48L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgdG89XCIvXCIgZXh0ZXJuYWwgY2xhc3NOYW1lPVwibXItMyB1bmRlcmxpbmVcIj48bGk+UXVpY2tqcy1yb3V0ZXI8L2xpPjwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBleHRlcm5hbCBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPjxsaT5RdWlja2pzLWRvbTwvbGk+PC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIlxyXG5pbXBvcnQgV2VsY29tZSBmcm9tIFwiLi9XZWxjb21lXCI7XHJcbmltcG9ydCBMaXN0IGZyb20gXCIuL0xpc3RcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBRdWljay5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgc3VwZXIocGFyYW1zKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEwIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cIm1yLTMgdGV4dC1wcmltYXJ5LW5vcm1hbCB1bmRlcmxpbmUgYWN0aXZlXCI+SG9tZTwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL2Fib3V0XCIgY2xhc3NOYW1lPVwidW5kZXJsaW5lXCI+QWJvdXQ8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ28gbXQtMTAgdy0xMCBwLTEgbWF4LXctbWQgYmxvY2sgbWwtYXV0byBtci1hdXRvIGFuaW1hdGUtYm91bmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxdWljay1sb2dvIHctOFwiIHNyYz1cImh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL3NlcnZlcnlndWtlbi9pbWFnZS91cGxvYWQvdjE2MTUxODg5OTIvUXVpY2tKUy9sb2dvL3F1aWNranMtbG9nb193angzZHcuc3ZnXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlbGNvbWUgdGV4dC1jZW50ZXIgbXQtNSB0ZXh0LTN4bCB0ZXh0LWJsYWNrIGZvbnQtYm9sZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxXZWxjb21lIG5hbWU9e1wiUXVpY2suanNcIn0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWMgbXQtNiB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoND5HZXQgc3RhcnRlZCBieSBlZGl0aW5nIDxzcGFuIGNsYXNzTmFtZT1cImJnLXNub3cgdGV4dC1zbSBmb250LW1lZGl1bSBwLTJcIj5zcmMvdmlld3MvQXBwLmpzPC9zcGFuPjwvaDQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdCAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIjtcclxuXHJcblxyXG5cclxuY29uc3QgTGlzdCA9ICgpID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1tYWluXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LWNvbiBtdC0xMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtMSBmbGV4IGp1c3RpZnktYXJvdW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Qgcm91bmRlZCBzaGFkb3ctc20gcC0yIHctNS8xMiBjdXJzb3ItcG9pbnRlciBtYXgtdy1tZCAgYm9yZGVyICAgYm9yZGVyLWdyYXktMjAwIG10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGkgY2xhc3NOYW1lPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtYmxhY2sgZmxleCBpdGVtcy1jZW50ZXIgbXQtMlwiPkRvY3VtZW50YXRpb24gPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5DaGVjayBvdXQgZG9jdW1lbnRhdGlvbiBvbiBob3cgdG8gZ2V0IHN0YXJ0ZWQgYW5kIHNldHVwIHlvdXIgcHJvamVjdCB3aXRoIFF1aWNrLmpzLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0IHJvdW5kZWQgc2hhZG93LXNtIHAtMiB3LTUvMTIgY3Vyc29yLXBvaW50ZXIgbWF4LXctbWQgYm9yZGVyICBib3JkZXItZ3JheS0yMDAgbXQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ibGFjayBmbGV4IGl0ZW1zLWNlbnRlciBtdC0yXCI+TGVhcm4gPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5MZWFybiBhYm91dCBRdWljay5qcyBhbmQgaXQncyBlY29zeXN0ZW0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtMiBmbGV4IGp1c3RpZnktYXJvdW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Qgcm91bmRlZCBzaGFkb3ctc20gcC0yIHctNS8xMiBjdXJzb3ItcG9pbnRlciBtYXgtdy1tZCBib3JkZXIgYm9yZGVyLWdyYXktMjAwICBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIG10LTJcIj5FeGFtcGxlcyA8c3BhbiBjbGFzc05hbWU9XCJtbC0yXCI+PHN2ZyBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIHctNiAtbWItMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTE0IDVsNyA3bTAgMGwtNyA3bTctN0gzXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+PC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIGZvbnQtbWVkaXVtIG10LTIgbWItM1wiPkNoZWNrIG91dCBvbiBwcm9qZWN0cyBjcmVhdGVkIHdpdGggUXVpY2suanM8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdCByb3VuZGVkIHNoYWRvdy1zbSBwLTIgdy01LzEyIG1heC13LW1kIGJvcmRlciBjdXJzb3ItcG9pbnRlciAgYm9yZGVyLWdyYXktMjAwICBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIG10LTJcIj5EZXBsb3kgPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5XZSdsbCBzaG93IHlvdSBob3cgdG8gZGVwbG95IHlvdXIgUXVpY2suanMgYXBwbGljYXRpb24gdG8gcHJvZHVjdGlvbi48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuKVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RcclxuXHJcbiIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgUXVpY2suQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAgKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYm91dC1wYWdlIHRleHQtY2VudGVyIG10LTEwIHRleHQtM3hsIHRleHQtYmxhY2sgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNXhsIHAtMSB3Yy10eHRcIj40MDQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5LW5vcm1hbFwiPk5PVCBGT1VORDwvc3Bhbj4gPC9oMT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPkhvbWU8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnktbm9ybWFsIHVuZGVybGluZSBhY3RpdmVcIiB0bz1cIi9hYm91dFwiPkFib3V0PC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59XHJcbiIsIi8vIFF1aWNrIG5lZWRzIHRvIGJlIGluaXRhaWxpemVkIHRvIHVzZSBqc3hcclxuaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiO1xyXG5cclxuXHJcbmNvbnN0IFdlbGNvbWUgPSAoe25hbWV9KSA9PiAoXHJcbiAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgcC0xIHdjLXR4dFwiPldlbGNvbWUgdG8gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5LW5vcm1hbFwiPntuYW1lfSE8L3NwYW4+IDwvaDE+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlbGNvbWUiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCJcclxuaW1wb3J0IHJvdXRlcyBmcm9tIFwiLi4vc3JjL3JvdXRlci9yb3V0ZXNcIjtcclxuUXVpY2suJGNvbmZpZyhcImRldmVsb3BtZW50XCIpXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=