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


function List() {
  return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
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
}

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
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItc3BsaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmZvcm93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZWJhYmNhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVtb3ZlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcGFyc2Utc2VsL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcXVpY2stZXJyb3IvcXVpY2stZXJyb3IuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLWNvbXBvbmVudC9saWIvcXVpY2suanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uLi9zcmMvaC50cyIsIndlYnBhY2s6Ly9xdWlja2pzLy4uL3NyYy9odG1sZG9tYXBpLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL2lzLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3NuYWJiZG9tLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3RodW5rLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3Zub2RlLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL21vZHVsZXMvcHJvcHMudHMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLXJvdXRlci9saWIvcXVpY2stcm91dGVyLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvaW5pdC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy9yb3V0ZXIvcm91dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvQWJvdXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9BcHAuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9MaXN0LmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvTm90Zm91bmQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9XZWxjb21lLmpzIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9xdWlja2pzL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3B1YmxpYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3BsaXQiLCJ1bmRlZiIsIm5hdGl2ZVNwbGl0IiwiU3RyaW5nIiwicHJvdG90eXBlIiwiY29tcGxpYW50RXhlY05wY2ciLCJleGVjIiwic2VsZiIsInN0ciIsInNlcGFyYXRvciIsImxpbWl0IiwiT2JqZWN0IiwidG9TdHJpbmciLCJjYWxsIiwib3V0cHV0IiwiZmxhZ3MiLCJpZ25vcmVDYXNlIiwibXVsdGlsaW5lIiwiZXh0ZW5kZWQiLCJzdGlja3kiLCJsYXN0TGFzdEluZGV4IiwiUmVnRXhwIiwic291cmNlIiwic2VwYXJhdG9yMiIsIm1hdGNoIiwibGFzdEluZGV4IiwibGFzdExlbmd0aCIsImluZGV4IiwibGVuZ3RoIiwicHVzaCIsInNsaWNlIiwicmVwbGFjZSIsImkiLCJhcmd1bWVudHMiLCJBcnJheSIsImFwcGx5IiwidGVzdCIsIklORklOSVRZIiwic3ltYm9sVGFnIiwicmVVbmVzY2FwZWRIdG1sIiwicmVIYXNVbmVzY2FwZWRIdG1sIiwiaHRtbEVzY2FwZXMiLCJmcmVlR2xvYmFsIiwiZ2xvYmFsIiwiZnJlZVNlbGYiLCJyb290IiwiRnVuY3Rpb24iLCJiYXNlUHJvcGVydHlPZiIsIm9iamVjdCIsImtleSIsInVuZGVmaW5lZCIsImVzY2FwZUh0bWxDaGFyIiwib2JqZWN0UHJvdG8iLCJvYmplY3RUb1N0cmluZyIsIlN5bWJvbCIsInN5bWJvbFByb3RvIiwic3ltYm9sVG9TdHJpbmciLCJiYXNlVG9TdHJpbmciLCJ2YWx1ZSIsImlzU3ltYm9sIiwicmVzdWx0IiwiaXNPYmplY3RMaWtlIiwiZXNjYXBlIiwic3RyaW5nIiwiTUFYX1NBRkVfSU5URUdFUiIsImFyZ3NUYWciLCJmdW5jVGFnIiwiZ2VuVGFnIiwicmVJc1VpbnQiLCJiYXNlVGltZXMiLCJuIiwiaXRlcmF0ZWUiLCJvdmVyQXJnIiwiZnVuYyIsInRyYW5zZm9ybSIsImFyZyIsImhhc093blByb3BlcnR5IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJuYXRpdmVLZXlzIiwia2V5cyIsImFycmF5TGlrZUtleXMiLCJpbmhlcml0ZWQiLCJpc0FycmF5IiwiaXNBcmd1bWVudHMiLCJza2lwSW5kZXhlcyIsImlzSW5kZXgiLCJiYXNlRm9yIiwiY3JlYXRlQmFzZUZvciIsImJhc2VGb3JPd24iLCJiYXNlS2V5cyIsImlzUHJvdG90eXBlIiwiZnJvbVJpZ2h0Iiwia2V5c0Z1bmMiLCJpdGVyYWJsZSIsInByb3BzIiwiQ3RvciIsImNvbnN0cnVjdG9yIiwicHJvdG8iLCJpc0FycmF5TGlrZU9iamVjdCIsImlzQXJyYXlMaWtlIiwiaXNMZW5ndGgiLCJpc0Z1bmN0aW9uIiwidGFnIiwiaXNPYmplY3QiLCJ0eXBlIiwiZm9yT3duIiwiaWRlbnRpdHkiLCJyZUFzY2lpV29yZCIsInJlTGF0aW4iLCJyc0FzdHJhbFJhbmdlIiwicnNDb21ib01hcmtzUmFuZ2UiLCJyc0NvbWJvU3ltYm9sc1JhbmdlIiwicnNEaW5nYmF0UmFuZ2UiLCJyc0xvd2VyUmFuZ2UiLCJyc01hdGhPcFJhbmdlIiwicnNOb25DaGFyUmFuZ2UiLCJyc1B1bmN0dWF0aW9uUmFuZ2UiLCJyc1NwYWNlUmFuZ2UiLCJyc1VwcGVyUmFuZ2UiLCJyc1ZhclJhbmdlIiwicnNCcmVha1JhbmdlIiwicnNBcG9zIiwicnNCcmVhayIsInJzQ29tYm8iLCJyc0RpZ2l0cyIsInJzRGluZ2JhdCIsInJzTG93ZXIiLCJyc01pc2MiLCJyc0ZpdHoiLCJyc01vZGlmaWVyIiwicnNOb25Bc3RyYWwiLCJyc1JlZ2lvbmFsIiwicnNTdXJyUGFpciIsInJzVXBwZXIiLCJyc1pXSiIsInJzTG93ZXJNaXNjIiwicnNVcHBlck1pc2MiLCJyc09wdExvd2VyQ29udHIiLCJyc09wdFVwcGVyQ29udHIiLCJyZU9wdE1vZCIsInJzT3B0VmFyIiwicnNPcHRKb2luIiwiam9pbiIsInJzU2VxIiwicnNFbW9qaSIsInJlQXBvcyIsInJlQ29tYm9NYXJrIiwicmVVbmljb2RlV29yZCIsInJlSGFzVW5pY29kZVdvcmQiLCJkZWJ1cnJlZExldHRlcnMiLCJhcnJheVJlZHVjZSIsImFycmF5IiwiYWNjdW11bGF0b3IiLCJpbml0QWNjdW0iLCJhc2NpaVdvcmRzIiwiZGVidXJyTGV0dGVyIiwiaGFzVW5pY29kZVdvcmQiLCJ1bmljb2RlV29yZHMiLCJjcmVhdGVDb21wb3VuZGVyIiwiY2FsbGJhY2siLCJ3b3JkcyIsImRlYnVyciIsImtlYmFiQ2FzZSIsIndvcmQiLCJ0b0xvd2VyQ2FzZSIsInBhdHRlcm4iLCJndWFyZCIsIkxBUkdFX0FSUkFZX1NJWkUiLCJGVU5DX0VSUk9SX1RFWFQiLCJIQVNIX1VOREVGSU5FRCIsIlVOT1JERVJFRF9DT01QQVJFX0ZMQUciLCJQQVJUSUFMX0NPTVBBUkVfRkxBRyIsImFycmF5VGFnIiwiYm9vbFRhZyIsImRhdGVUYWciLCJlcnJvclRhZyIsIm1hcFRhZyIsIm51bWJlclRhZyIsIm9iamVjdFRhZyIsInByb21pc2VUYWciLCJyZWdleHBUYWciLCJzZXRUYWciLCJzdHJpbmdUYWciLCJ3ZWFrTWFwVGFnIiwiYXJyYXlCdWZmZXJUYWciLCJkYXRhVmlld1RhZyIsImZsb2F0MzJUYWciLCJmbG9hdDY0VGFnIiwiaW50OFRhZyIsImludDE2VGFnIiwiaW50MzJUYWciLCJ1aW50OFRhZyIsInVpbnQ4Q2xhbXBlZFRhZyIsInVpbnQxNlRhZyIsInVpbnQzMlRhZyIsInJlSXNEZWVwUHJvcCIsInJlSXNQbGFpblByb3AiLCJyZUxlYWRpbmdEb3QiLCJyZVByb3BOYW1lIiwicmVSZWdFeHBDaGFyIiwicmVFc2NhcGVDaGFyIiwicmVJc0hvc3RDdG9yIiwidHlwZWRBcnJheVRhZ3MiLCJmcmVlRXhwb3J0cyIsIm5vZGVUeXBlIiwiZnJlZU1vZHVsZSIsIm1vZHVsZUV4cG9ydHMiLCJmcmVlUHJvY2VzcyIsInByb2Nlc3MiLCJub2RlVXRpbCIsImJpbmRpbmciLCJlIiwibm9kZUlzVHlwZWRBcnJheSIsImlzVHlwZWRBcnJheSIsImFycmF5U29tZSIsInByZWRpY2F0ZSIsImJhc2VQcm9wZXJ0eSIsImJhc2VVbmFyeSIsImdldFZhbHVlIiwiaXNIb3N0T2JqZWN0IiwibWFwVG9BcnJheSIsIm1hcCIsInNpemUiLCJmb3JFYWNoIiwic2V0VG9BcnJheSIsInNldCIsImFycmF5UHJvdG8iLCJmdW5jUHJvdG8iLCJjb3JlSnNEYXRhIiwibWFza1NyY0tleSIsInVpZCIsIklFX1BST1RPIiwiZnVuY1RvU3RyaW5nIiwicmVJc05hdGl2ZSIsIlVpbnQ4QXJyYXkiLCJzcGxpY2UiLCJEYXRhVmlldyIsImdldE5hdGl2ZSIsIk1hcCIsIlByb21pc2UiLCJTZXQiLCJXZWFrTWFwIiwibmF0aXZlQ3JlYXRlIiwiZGF0YVZpZXdDdG9yU3RyaW5nIiwidG9Tb3VyY2UiLCJtYXBDdG9yU3RyaW5nIiwicHJvbWlzZUN0b3JTdHJpbmciLCJzZXRDdG9yU3RyaW5nIiwid2Vha01hcEN0b3JTdHJpbmciLCJzeW1ib2xWYWx1ZU9mIiwidmFsdWVPZiIsIkhhc2giLCJlbnRyaWVzIiwiY2xlYXIiLCJlbnRyeSIsImhhc2hDbGVhciIsIl9fZGF0YV9fIiwiaGFzaERlbGV0ZSIsImhhcyIsImhhc2hHZXQiLCJkYXRhIiwiaGFzaEhhcyIsImhhc2hTZXQiLCJnZXQiLCJMaXN0Q2FjaGUiLCJsaXN0Q2FjaGVDbGVhciIsImxpc3RDYWNoZURlbGV0ZSIsImFzc29jSW5kZXhPZiIsInBvcCIsImxpc3RDYWNoZUdldCIsImxpc3RDYWNoZUhhcyIsImxpc3RDYWNoZVNldCIsIk1hcENhY2hlIiwibWFwQ2FjaGVDbGVhciIsIm1hcENhY2hlRGVsZXRlIiwiZ2V0TWFwRGF0YSIsIm1hcENhY2hlR2V0IiwibWFwQ2FjaGVIYXMiLCJtYXBDYWNoZVNldCIsIlNldENhY2hlIiwidmFsdWVzIiwiYWRkIiwic2V0Q2FjaGVBZGQiLCJzZXRDYWNoZUhhcyIsIlN0YWNrIiwic3RhY2tDbGVhciIsInN0YWNrRGVsZXRlIiwic3RhY2tHZXQiLCJzdGFja0hhcyIsInN0YWNrU2V0IiwiY2FjaGUiLCJwYWlycyIsImVxIiwiYmFzZUdldCIsInBhdGgiLCJpc0tleSIsImNhc3RQYXRoIiwidG9LZXkiLCJiYXNlR2V0VGFnIiwiYmFzZUhhc0luIiwiYmFzZUlzRXF1YWwiLCJvdGhlciIsImN1c3RvbWl6ZXIiLCJiaXRtYXNrIiwic3RhY2siLCJiYXNlSXNFcXVhbERlZXAiLCJlcXVhbEZ1bmMiLCJvYmpJc0FyciIsIm90aElzQXJyIiwib2JqVGFnIiwib3RoVGFnIiwiZ2V0VGFnIiwib2JqSXNPYmoiLCJvdGhJc09iaiIsImlzU2FtZVRhZyIsImVxdWFsQXJyYXlzIiwiZXF1YWxCeVRhZyIsIm9iaklzV3JhcHBlZCIsIm90aElzV3JhcHBlZCIsIm9ialVud3JhcHBlZCIsIm90aFVud3JhcHBlZCIsImVxdWFsT2JqZWN0cyIsImJhc2VJc01hdGNoIiwibWF0Y2hEYXRhIiwibm9DdXN0b21pemVyIiwib2JqVmFsdWUiLCJzcmNWYWx1ZSIsImJhc2VJc05hdGl2ZSIsImlzTWFza2VkIiwiYmFzZUlzVHlwZWRBcnJheSIsImJhc2VJdGVyYXRlZSIsImJhc2VNYXRjaGVzUHJvcGVydHkiLCJiYXNlTWF0Y2hlcyIsInByb3BlcnR5IiwiZ2V0TWF0Y2hEYXRhIiwibWF0Y2hlc1N0cmljdENvbXBhcmFibGUiLCJpc1N0cmljdENvbXBhcmFibGUiLCJoYXNJbiIsImJhc2VQcm9wZXJ0eURlZXAiLCJiYXNlUHVsbEF0IiwiaW5kZXhlcyIsInByZXZpb3VzIiwicGFyZW50IiwibGFzdCIsImJhc2VTbGljZSIsInN0YXJ0IiwiZW5kIiwic3RyaW5nVG9QYXRoIiwiaXNQYXJ0aWFsIiwiYXJyTGVuZ3RoIiwib3RoTGVuZ3RoIiwic3RhY2tlZCIsInNlZW4iLCJhcnJWYWx1ZSIsIm90aFZhbHVlIiwiY29tcGFyZWQiLCJvdGhJbmRleCIsImJ5dGVMZW5ndGgiLCJieXRlT2Zmc2V0IiwiYnVmZmVyIiwibmFtZSIsIm1lc3NhZ2UiLCJjb252ZXJ0Iiwib2JqUHJvcHMiLCJvYmpMZW5ndGgiLCJvdGhQcm9wcyIsInNraXBDdG9yIiwib2JqQ3RvciIsIm90aEN0b3IiLCJpc0tleWFibGUiLCJBcnJheUJ1ZmZlciIsInJlc29sdmUiLCJjdG9yU3RyaW5nIiwiaGFzUGF0aCIsImhhc0Z1bmMiLCJtZW1vaXplIiwibnVtYmVyIiwicXVvdGUiLCJyZW1vdmUiLCJyZXNvbHZlciIsIlR5cGVFcnJvciIsIm1lbW9pemVkIiwiYXJncyIsIkNhY2hlIiwiZGVmYXVsdFZhbHVlIiwiYXJyYXlJbmNsdWRlcyIsImJhc2VJbmRleE9mIiwiYXJyYXlJbmNsdWRlc1dpdGgiLCJjb21wYXJhdG9yIiwiYmFzZUZpbmRJbmRleCIsImZyb21JbmRleCIsImJhc2VJc05hTiIsImNhY2hlSGFzIiwiYmFzZVVuaXEiLCJpbmNsdWRlcyIsImlzQ29tbW9uIiwiY3JlYXRlU2V0Iiwib3V0ZXIiLCJjb21wdXRlZCIsInNlZW5JbmRleCIsIm5vb3AiLCJ1bmlxIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwicHJvcElzRW51bWVyYWJsZSIsInRvT2JqZWN0IiwidmFsIiwic2hvdWxkVXNlTmF0aXZlIiwiYXNzaWduIiwidGVzdDEiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwidGVzdDIiLCJmcm9tQ2hhckNvZGUiLCJvcmRlcjIiLCJ0ZXN0MyIsImxldHRlciIsImVyciIsInRhcmdldCIsImZyb20iLCJ0byIsInN5bWJvbHMiLCJzIiwicmVxdWlyZSIsImNsYXNzSWRTcGxpdCIsIm5vdENsYXNzSWQiLCJwYXJzZVNlbGVjdG9yIiwic2VsZWN0b3IiLCJ1cHBlciIsInRhZ05hbWUiLCJpZCIsImNsYXNzZXMiLCJ0YWdQYXJ0cyIsInBhcnQiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJ0b1VwcGVyQ2FzZSIsImNsYXNzTmFtZSIsImNoZWNrRm9yRXJyb3IiLCJFcnJvciIsImVycm9yIiwiaXNFcnJvciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJxdWlja19lcnJvcl8xIiwic25hYmJkb20iLCJwcm9wc18xIiwicmVjb25jaWxlIiwiaW5pdCIsImRlZmF1bHQiLCJzbmFiYmRvbV8xIiwibW9kdWxlcyIsInRvSFRNTCIsImNsYXNzIiwiYXR0cmlidXRlcyIsInN0eWxlIiwiRGVwIiwic3Vic2NyaWJlcnMiLCJkZXBlbmQiLCJhY3RpdmVFZmZlY3QiLCJub3RpZnkiLCJzdWIiLCJDb21wb25lbnQiLCJwYXJhbXMiLCJ0IiwiY29tcG9uZW50RGlkTW91bnQiLCJzZXRTdGF0ZSIsInBhcnRpYWxTdGF0ZSIsIl90aGlzIiwic3RhdGUiLCJRdWljayIsIl9fdXBkYXRlciIsInJlbmRlciIsImVsIiwiciIsIl9wdCIsImlzUXVpY2tDbGFzc0NvbXBvbmVudCIsIiRpbml0IiwiZmF2IiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJyZWwiLCJoIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjb25zb2xlIiwibG9nIiwiJGxpc3RlbmVyIiwiZm4iLCJwcmV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZlbnREZWZhdWx0IiwidXNlIiwidmlldyIsInJlbmRlclZpZXd0b0hUTUwiLCJxdWVyeVNlbGVjdG9yIiwiY2hpbGRyZW4iLCJmbGF0IiwiaXNRbmRSZWFjdENsYXNzQ29tcG9uZW50IiwiY29tcG9uZW50SW5zdGFuY2UiLCJkYXRhUHJvcHMiLCJldmVudFByb3BzIiwicHJvcEtleSIsInN0YXJ0c1dpdGgiLCJldmVudCIsImluc3RhbmNlIiwiJGNvbmZpZyIsImVudiIsInF1aWNranNfY29tcG9uZW50XzEiLCJwYXRoVG9SZWdleCIsImdldFBhcmFtcyIsInJvdXRlIiwibWF0Y2hBbGwiLCJRdWlja1JvdXRlciIsInVzZVJvdXRlIiwicm91dGVzIiwidXJsIiwibWF0Y2hlcyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJmaW5kTWF0Y2giLCJmaW5kIiwic2V0VGl0bGUiLCJ0aXRsZSIsImdldFJvdXRlIiwicmVmZXJyZXIiLCJuZXh0IiwiZnVsbFBhdGgiLCJjcmVhdGVOYXZpZ2F0aW9uIiwid2luZG93IiwibG9jYWxOYW1lIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImNyZWF0ZVBvcFN0YXRlIiwiUXVpY2tSb3V0ZXJMaW5rIiwiSFRNTEVsZW1lbnQiLCJsaW5rVG8iLCJnZXRBdHRyaWJ1dGUiLCJjdXN0b21UYWciLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiaW5uZXJUZXh0IiwiYXR0cmliSSIsImEiLCJhdHRyaWJBIiwic2V0QXR0cmlidXRlIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJ1c2VSZWYiLCJhcHAiLCJjaGlsZCIsImFyZWEiLCJiYXNlIiwiYnIiLCJjb2wiLCJlbWJlZCIsImhyIiwiaW1nIiwiaW5wdXQiLCJrZXlnZW4iLCJsaW5rIiwibWV0YSIsInBhcmFtIiwidHJhY2siLCJ3YnIiLCJWT0lEX0VMRU1FTlRTIiwiQ09OVEFJTkVSX0VMRU1FTlRTIiwicGFyc2UiLCJ2bm9kZSIsIm5vZGUiLCJyZW5kZXJUb1N0cmluZyIsInNlbCIsInRleHQiLCJob29rIiwic3ZnIiwibnMiLCJhdHRyc01vZHVsZSIsImF0dHJzIiwiY2xhc3NNb2R1bGUiLCJfYWRkIiwiX3JlbW92ZSIsImV4aXN0aW5nIiwiY29uY2F0IiwiaW5kZXhPZiIsImRhdGFzZXRNb2R1bGUiLCJkYXRhc2V0Iiwib21pdCIsImJvb2xlYW5BdHRyaWJ1dGVzIiwicHJvcHNNb2R1bGUiLCJsa2V5Iiwic3R5bGVNb2R1bGUiLCJkZWxheWVkIiwia2ViYWJLZXkiLCJyb3V0ZXIiLCJBcHAiLCJBYm91dCIsIk5vdEZvdW5kIiwiQWJvdXREZXRhaWwiLCJMaXN0IiwiV2VsY29tZSJdLCJtYXBwaW5ncyI6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Ozs7O0FDRnJEO0FBQ0E7O0FBR0EsTUFBTThILE9BQU8sR0FBRyxDQUFDO0FBQUM3TztBQUFELENBQUQsS0FDWjtBQUFJLFdBQVMsRUFBQztBQUFkLGtCQUErQztBQUFNLFdBQVMsRUFBQztBQUFoQixHQUF1Q0EsSUFBdkMsTUFBL0MsTUFESjs7QUFJQSxpRUFBZTZPLE9BQWYsRTs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7Ozs7Ozs7Ozs7OztBQ0pBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQ3Jvc3MtQnJvd3NlciBTcGxpdCAxLjEuMVxuICogQ29weXJpZ2h0IDIwMDctMjAxMiBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT5cbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqIEVDTUFTY3JpcHQgY29tcGxpYW50LCB1bmlmb3JtIGNyb3NzLWJyb3dzZXIgc3BsaXQgbWV0aG9kXG4gKi9cblxuLyoqXG4gKiBTcGxpdHMgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzIHVzaW5nIGEgcmVnZXggb3Igc3RyaW5nIHNlcGFyYXRvci4gTWF0Y2hlcyBvZiB0aGVcbiAqIHNlcGFyYXRvciBhcmUgbm90IGluY2x1ZGVkIGluIHRoZSByZXN1bHQgYXJyYXkuIEhvd2V2ZXIsIGlmIGBzZXBhcmF0b3JgIGlzIGEgcmVnZXggdGhhdCBjb250YWluc1xuICogY2FwdHVyaW5nIGdyb3VwcywgYmFja3JlZmVyZW5jZXMgYXJlIHNwbGljZWQgaW50byB0aGUgcmVzdWx0IGVhY2ggdGltZSBgc2VwYXJhdG9yYCBpcyBtYXRjaGVkLlxuICogRml4ZXMgYnJvd3NlciBidWdzIGNvbXBhcmVkIHRvIHRoZSBuYXRpdmUgYFN0cmluZy5wcm90b3R5cGUuc3BsaXRgIGFuZCBjYW4gYmUgdXNlZCByZWxpYWJseVxuICogY3Jvc3MtYnJvd3Nlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIHNwbGl0LlxuICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBzZXBhcmF0b3IgUmVnZXggb3Igc3RyaW5nIHRvIHVzZSBmb3Igc2VwYXJhdGluZyB0aGUgc3RyaW5nLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdF0gTWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdG8gaW5jbHVkZSBpbiB0aGUgcmVzdWx0IGFycmF5LlxuICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiBzdWJzdHJpbmdzLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBCYXNpYyB1c2VcbiAqIHNwbGl0KCdhIGIgYyBkJywgJyAnKTtcbiAqIC8vIC0+IFsnYScsICdiJywgJ2MnLCAnZCddXG4gKlxuICogLy8gV2l0aCBsaW1pdFxuICogc3BsaXQoJ2EgYiBjIGQnLCAnICcsIDIpO1xuICogLy8gLT4gWydhJywgJ2InXVxuICpcbiAqIC8vIEJhY2tyZWZlcmVuY2VzIGluIHJlc3VsdCBhcnJheVxuICogc3BsaXQoJy4ud29yZDEgd29yZDIuLicsIC8oW2Etel0rKShcXGQrKS9pKTtcbiAqIC8vIC0+IFsnLi4nLCAnd29yZCcsICcxJywgJyAnLCAnd29yZCcsICcyJywgJy4uJ11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gc3BsaXQodW5kZWYpIHtcblxuICB2YXIgbmF0aXZlU3BsaXQgPSBTdHJpbmcucHJvdG90eXBlLnNwbGl0LFxuICAgIGNvbXBsaWFudEV4ZWNOcGNnID0gLygpPz8vLmV4ZWMoXCJcIilbMV0gPT09IHVuZGVmLFxuICAgIC8vIE5QQ0c6IG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwXG4gICAgc2VsZjtcblxuICBzZWxmID0gZnVuY3Rpb24oc3RyLCBzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgLy8gSWYgYHNlcGFyYXRvcmAgaXMgbm90IGEgcmVnZXgsIHVzZSBgbmF0aXZlU3BsaXRgXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzZXBhcmF0b3IpICE9PSBcIltvYmplY3QgUmVnRXhwXVwiKSB7XG4gICAgICByZXR1cm4gbmF0aXZlU3BsaXQuY2FsbChzdHIsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH1cbiAgICB2YXIgb3V0cHV0ID0gW10sXG4gICAgICBmbGFncyA9IChzZXBhcmF0b3IuaWdub3JlQ2FzZSA/IFwiaVwiIDogXCJcIikgKyAoc2VwYXJhdG9yLm11bHRpbGluZSA/IFwibVwiIDogXCJcIikgKyAoc2VwYXJhdG9yLmV4dGVuZGVkID8gXCJ4XCIgOiBcIlwiKSArIC8vIFByb3Bvc2VkIGZvciBFUzZcbiAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gXCJ5XCIgOiBcIlwiKSxcbiAgICAgIC8vIEZpcmVmb3ggMytcbiAgICAgIGxhc3RMYXN0SW5kZXggPSAwLFxuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHNlcGFyYXRvciA9IG5ldyBSZWdFeHAoc2VwYXJhdG9yLnNvdXJjZSwgZmxhZ3MgKyBcImdcIiksXG4gICAgICBzZXBhcmF0b3IyLCBtYXRjaCwgbGFzdEluZGV4LCBsYXN0TGVuZ3RoO1xuICAgIHN0ciArPSBcIlwiOyAvLyBUeXBlLWNvbnZlcnRcbiAgICBpZiAoIWNvbXBsaWFudEV4ZWNOcGNnKSB7XG4gICAgICAvLyBEb2Vzbid0IG5lZWQgZmxhZ3MgZ3ksIGJ1dCB0aGV5IGRvbid0IGh1cnRcbiAgICAgIHNlcGFyYXRvcjIgPSBuZXcgUmVnRXhwKFwiXlwiICsgc2VwYXJhdG9yLnNvdXJjZSArIFwiJCg/IVxcXFxzKVwiLCBmbGFncyk7XG4gICAgfVxuICAgIC8qIFZhbHVlcyBmb3IgYGxpbWl0YCwgcGVyIHRoZSBzcGVjOlxuICAgICAqIElmIHVuZGVmaW5lZDogNDI5NDk2NzI5NSAvLyBNYXRoLnBvdygyLCAzMikgLSAxXG4gICAgICogSWYgMCwgSW5maW5pdHksIG9yIE5hTjogMFxuICAgICAqIElmIHBvc2l0aXZlIG51bWJlcjogbGltaXQgPSBNYXRoLmZsb29yKGxpbWl0KTsgaWYgKGxpbWl0ID4gNDI5NDk2NzI5NSkgbGltaXQgLT0gNDI5NDk2NzI5NjtcbiAgICAgKiBJZiBuZWdhdGl2ZSBudW1iZXI6IDQyOTQ5NjcyOTYgLSBNYXRoLmZsb29yKE1hdGguYWJzKGxpbWl0KSlcbiAgICAgKiBJZiBvdGhlcjogVHlwZS1jb252ZXJ0LCB0aGVuIHVzZSB0aGUgYWJvdmUgcnVsZXNcbiAgICAgKi9cbiAgICBsaW1pdCA9IGxpbWl0ID09PSB1bmRlZiA/IC0xID4+PiAwIDogLy8gTWF0aC5wb3coMiwgMzIpIC0gMVxuICAgIGxpbWl0ID4+PiAwOyAvLyBUb1VpbnQzMihsaW1pdClcbiAgICB3aGlsZSAobWF0Y2ggPSBzZXBhcmF0b3IuZXhlYyhzdHIpKSB7XG4gICAgICAvLyBgc2VwYXJhdG9yLmxhc3RJbmRleGAgaXMgbm90IHJlbGlhYmxlIGNyb3NzLWJyb3dzZXJcbiAgICAgIGxhc3RJbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgaWYgKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goc3RyLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgIGZvclxuICAgICAgICAvLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cHNcbiAgICAgICAgaWYgKCFjb21wbGlhbnRFeGVjTnBjZyAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgbWF0Y2hbMF0ucmVwbGFjZShzZXBhcmF0b3IyLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldID09PSB1bmRlZikge1xuICAgICAgICAgICAgICAgIG1hdGNoW2ldID0gdW5kZWY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICBsYXN0TGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VwYXJhdG9yLmxhc3RJbmRleCA9PT0gbWF0Y2guaW5kZXgpIHtcbiAgICAgICAgc2VwYXJhdG9yLmxhc3RJbmRleCsrOyAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHIubGVuZ3RoKSB7XG4gICAgICBpZiAobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yLnRlc3QoXCJcIikpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKHN0ci5zbGljZShsYXN0TGFzdEluZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltaXQgPyBvdXRwdXQuc2xpY2UoMCwgbGltaXQpIDogb3V0cHV0O1xuICB9O1xuXG4gIHJldHVybiBzZWxmO1xufSkoKTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgYW5kIEhUTUwgY2hhcmFjdGVycy4gKi9cbnZhciByZVVuZXNjYXBlZEh0bWwgPSAvWyY8PlwiJ2BdL2csXG4gICAgcmVIYXNVbmVzY2FwZWRIdG1sID0gUmVnRXhwKHJlVW5lc2NhcGVkSHRtbC5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBtYXAgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLiAqL1xudmFyIGh0bWxFc2NhcGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiMzOTsnLFxuICAnYCc6ICcmIzk2Oydcbn07XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFVzZWQgYnkgYF8uZXNjYXBlYCB0byBjb252ZXJ0IGNoYXJhY3RlcnMgdG8gSFRNTCBlbnRpdGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGNociBUaGUgbWF0Y2hlZCBjaGFyYWN0ZXIgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gKi9cbnZhciBlc2NhcGVIdG1sQ2hhciA9IGJhc2VQcm9wZXJ0eU9mKGh0bWxFc2NhcGVzKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBjaGFyYWN0ZXJzIFwiJlwiLCBcIjxcIiwgXCI+XCIsICdcIicsIFwiJ1wiLCBhbmQgXCJcXGBcIiBpbiBgc3RyaW5nYCB0b1xuICogdGhlaXIgY29ycmVzcG9uZGluZyBIVE1MIGVudGl0aWVzLlxuICpcbiAqICoqTm90ZToqKiBObyBvdGhlciBjaGFyYWN0ZXJzIGFyZSBlc2NhcGVkLiBUbyBlc2NhcGUgYWRkaXRpb25hbFxuICogY2hhcmFjdGVycyB1c2UgYSB0aGlyZC1wYXJ0eSBsaWJyYXJ5IGxpa2UgW19oZV9dKGh0dHBzOi8vbXRocy5iZS9oZSkuXG4gKlxuICogVGhvdWdoIHRoZSBcIj5cIiBjaGFyYWN0ZXIgaXMgZXNjYXBlZCBmb3Igc3ltbWV0cnksIGNoYXJhY3RlcnMgbGlrZVxuICogXCI+XCIgYW5kIFwiL1wiIGRvbid0IG5lZWQgZXNjYXBpbmcgaW4gSFRNTCBhbmQgaGF2ZSBubyBzcGVjaWFsIG1lYW5pbmdcbiAqIHVubGVzcyB0aGV5J3JlIHBhcnQgb2YgYSB0YWcgb3IgdW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlLiBTZWVcbiAqIFtNYXRoaWFzIEJ5bmVucydzIGFydGljbGVdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9hbWJpZ3VvdXMtYW1wZXJzYW5kcylcbiAqICh1bmRlciBcInNlbWktcmVsYXRlZCBmdW4gZmFjdFwiKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEJhY2t0aWNrcyBhcmUgZXNjYXBlZCBiZWNhdXNlIGluIElFIDwgOSwgdGhleSBjYW4gYnJlYWsgb3V0IG9mXG4gKiBhdHRyaWJ1dGUgdmFsdWVzIG9yIEhUTUwgY29tbWVudHMuIFNlZSBbIzU5XShodHRwczovL2h0bWw1c2VjLm9yZy8jNTkpLFxuICogWyMxMDJdKGh0dHBzOi8vaHRtbDVzZWMub3JnLyMxMDIpLCBbIzEwOF0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEwOCksIGFuZFxuICogWyMxMzNdKGh0dHBzOi8vaHRtbDVzZWMub3JnLyMxMzMpIG9mIHRoZVxuICogW0hUTUw1IFNlY3VyaXR5IENoZWF0c2hlZXRdKGh0dHBzOi8vaHRtbDVzZWMub3JnLykgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBXaGVuIHdvcmtpbmcgd2l0aCBIVE1MIHlvdSBzaG91bGQgYWx3YXlzXG4gKiBbcXVvdGUgYXR0cmlidXRlIHZhbHVlc10oaHR0cDovL3dvbmtvLmNvbS9wb3N0L2h0bWwtZXNjYXBpbmcpIHRvIHJlZHVjZVxuICogWFNTIHZlY3RvcnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gJ2ZyZWQsIGJhcm5leSwgJmFtcDsgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1VuZXNjYXBlZEh0bWwudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVVbmVzY2FwZWRIdG1sLCBlc2NhcGVIdG1sQ2hhcilcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlc2NhcGU7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIG1ldGhvZHMgbGlrZSBgXy5mb3JJbmAgYW5kIGBfLmZvck93bmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYW5kXG4gKiBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWVcbiAqIGFyZ3VtZW50czogKHZhbHVlLCBrZXksIG9iamVjdCkuIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb25cbiAqIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjMuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBzZWUgXy5mb3JPd25SaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmZvck93bihuZXcgRm9vLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgJ2EnIHRoZW4gJ2InIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpLlxuICovXG5mdW5jdGlvbiBmb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3JPd24ob2JqZWN0LCB0eXBlb2YgaXRlcmF0ZWUgPT0gJ2Z1bmN0aW9uJyA/IGl0ZXJhdGVlIDogaWRlbnRpdHkpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JPd247XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCB3b3JkcyBjb21wb3NlZCBvZiBhbHBoYW51bWVyaWMgY2hhcmFjdGVycy4gKi9cbnZhciByZUFzY2lpV29yZCA9IC9bXlxceDAwLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceDdmXSsvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggTGF0aW4gVW5pY29kZSBsZXR0ZXJzIChleGNsdWRpbmcgbWF0aGVtYXRpY2FsIG9wZXJhdG9ycykuICovXG52YXIgcmVMYXRpbiA9IC9bXFx4YzAtXFx4ZDZcXHhkOC1cXHhmNlxceGY4LVxceGZmXFx1MDEwMC1cXHUwMTdmXS9nO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyMycsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGYwJyxcbiAgICByc0RpbmdiYXRSYW5nZSA9ICdcXFxcdTI3MDAtXFxcXHUyN2JmJyxcbiAgICByc0xvd2VyUmFuZ2UgPSAnYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmJyxcbiAgICByc01hdGhPcFJhbmdlID0gJ1xcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjcnLFxuICAgIHJzTm9uQ2hhclJhbmdlID0gJ1xcXFx4MDAtXFxcXHgyZlxcXFx4M2EtXFxcXHg0MFxcXFx4NWItXFxcXHg2MFxcXFx4N2ItXFxcXHhiZicsXG4gICAgcnNQdW5jdHVhdGlvblJhbmdlID0gJ1xcXFx1MjAwMC1cXFxcdTIwNmYnLFxuICAgIHJzU3BhY2VSYW5nZSA9ICcgXFxcXHRcXFxceDBiXFxcXGZcXFxceGEwXFxcXHVmZWZmXFxcXG5cXFxcclxcXFx1MjAyOFxcXFx1MjAyOVxcXFx1MTY4MFxcXFx1MTgwZVxcXFx1MjAwMFxcXFx1MjAwMVxcXFx1MjAwMlxcXFx1MjAwM1xcXFx1MjAwNFxcXFx1MjAwNVxcXFx1MjAwNlxcXFx1MjAwN1xcXFx1MjAwOFxcXFx1MjAwOVxcXFx1MjAwYVxcXFx1MjAyZlxcXFx1MjA1ZlxcXFx1MzAwMCcsXG4gICAgcnNVcHBlclJhbmdlID0gJ0EtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZScsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnLFxuICAgIHJzQnJlYWtSYW5nZSA9IHJzTWF0aE9wUmFuZ2UgKyByc05vbkNoYXJSYW5nZSArIHJzUHVuY3R1YXRpb25SYW5nZSArIHJzU3BhY2VSYW5nZTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXBvcyA9IFwiWydcXHUyMDE5XVwiLFxuICAgIHJzQnJlYWsgPSAnWycgKyByc0JyZWFrUmFuZ2UgKyAnXScsXG4gICAgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9NYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSArICddJyxcbiAgICByc0RpZ2l0cyA9ICdcXFxcZCsnLFxuICAgIHJzRGluZ2JhdCA9ICdbJyArIHJzRGluZ2JhdFJhbmdlICsgJ10nLFxuICAgIHJzTG93ZXIgPSAnWycgKyByc0xvd2VyUmFuZ2UgKyAnXScsXG4gICAgcnNNaXNjID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyByc0JyZWFrUmFuZ2UgKyByc0RpZ2l0cyArIHJzRGluZ2JhdFJhbmdlICsgcnNMb3dlclJhbmdlICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1VwcGVyID0gJ1snICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJzTG93ZXJNaXNjID0gJyg/OicgKyByc0xvd2VyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzVXBwZXJNaXNjID0gJyg/OicgKyByc1VwcGVyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzT3B0TG93ZXJDb250ciA9ICcoPzonICsgcnNBcG9zICsgJyg/OmR8bGx8bXxyZXxzfHR8dmUpKT8nLFxuICAgIHJzT3B0VXBwZXJDb250ciA9ICcoPzonICsgcnNBcG9zICsgJyg/OkR8TEx8TXxSRXxTfFR8VkUpKT8nLFxuICAgIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzRW1vamkgPSAnKD86JyArIFtyc0RpbmdiYXQsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzU2VxO1xuXG4vKiogVXNlZCB0byBtYXRjaCBhcG9zdHJvcGhlcy4gKi9cbnZhciByZUFwb3MgPSBSZWdFeHAocnNBcG9zLCAnZycpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzKSBhbmRcbiAqIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3MgZm9yIHN5bWJvbHNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrc19mb3JfU3ltYm9scykuXG4gKi9cbnZhciByZUNvbWJvTWFyayA9IFJlZ0V4cChyc0NvbWJvLCAnZycpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBjb21wbGV4IG9yIGNvbXBvdW5kIHdvcmRzLiAqL1xudmFyIHJlVW5pY29kZVdvcmQgPSBSZWdFeHAoW1xuICByc1VwcGVyICsgJz8nICsgcnNMb3dlciArICcrJyArIHJzT3B0TG93ZXJDb250ciArICcoPz0nICsgW3JzQnJlYWssIHJzVXBwZXIsICckJ10uam9pbignfCcpICsgJyknLFxuICByc1VwcGVyTWlzYyArICcrJyArIHJzT3B0VXBwZXJDb250ciArICcoPz0nICsgW3JzQnJlYWssIHJzVXBwZXIgKyByc0xvd2VyTWlzYywgJyQnXS5qb2luKCd8JykgKyAnKScsXG4gIHJzVXBwZXIgKyAnPycgKyByc0xvd2VyTWlzYyArICcrJyArIHJzT3B0TG93ZXJDb250cixcbiAgcnNVcHBlciArICcrJyArIHJzT3B0VXBwZXJDb250cixcbiAgcnNEaWdpdHMsXG4gIHJzRW1vamlcbl0uam9pbignfCcpLCAnZycpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB0aGF0IG5lZWQgYSBtb3JlIHJvYnVzdCByZWdleHAgdG8gbWF0Y2ggd29yZHMuICovXG52YXIgcmVIYXNVbmljb2RlV29yZCA9IC9bYS16XVtBLVpdfFtBLVpdezIsfVthLXpdfFswLTldW2EtekEtWl18W2EtekEtWl1bMC05XXxbXmEtekEtWjAtOSBdLztcblxuLyoqIFVzZWQgdG8gbWFwIExhdGluIFVuaWNvZGUgbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzLiAqL1xudmFyIGRlYnVycmVkTGV0dGVycyA9IHtcbiAgLy8gTGF0aW4tMSBTdXBwbGVtZW50IGJsb2NrLlxuICAnXFx4YzAnOiAnQScsICAnXFx4YzEnOiAnQScsICdcXHhjMic6ICdBJywgJ1xceGMzJzogJ0EnLCAnXFx4YzQnOiAnQScsICdcXHhjNSc6ICdBJyxcbiAgJ1xceGUwJzogJ2EnLCAgJ1xceGUxJzogJ2EnLCAnXFx4ZTInOiAnYScsICdcXHhlMyc6ICdhJywgJ1xceGU0JzogJ2EnLCAnXFx4ZTUnOiAnYScsXG4gICdcXHhjNyc6ICdDJywgICdcXHhlNyc6ICdjJyxcbiAgJ1xceGQwJzogJ0QnLCAgJ1xceGYwJzogJ2QnLFxuICAnXFx4YzgnOiAnRScsICAnXFx4YzknOiAnRScsICdcXHhjYSc6ICdFJywgJ1xceGNiJzogJ0UnLFxuICAnXFx4ZTgnOiAnZScsICAnXFx4ZTknOiAnZScsICdcXHhlYSc6ICdlJywgJ1xceGViJzogJ2UnLFxuICAnXFx4Y2MnOiAnSScsICAnXFx4Y2QnOiAnSScsICdcXHhjZSc6ICdJJywgJ1xceGNmJzogJ0knLFxuICAnXFx4ZWMnOiAnaScsICAnXFx4ZWQnOiAnaScsICdcXHhlZSc6ICdpJywgJ1xceGVmJzogJ2knLFxuICAnXFx4ZDEnOiAnTicsICAnXFx4ZjEnOiAnbicsXG4gICdcXHhkMic6ICdPJywgICdcXHhkMyc6ICdPJywgJ1xceGQ0JzogJ08nLCAnXFx4ZDUnOiAnTycsICdcXHhkNic6ICdPJywgJ1xceGQ4JzogJ08nLFxuICAnXFx4ZjInOiAnbycsICAnXFx4ZjMnOiAnbycsICdcXHhmNCc6ICdvJywgJ1xceGY1JzogJ28nLCAnXFx4ZjYnOiAnbycsICdcXHhmOCc6ICdvJyxcbiAgJ1xceGQ5JzogJ1UnLCAgJ1xceGRhJzogJ1UnLCAnXFx4ZGInOiAnVScsICdcXHhkYyc6ICdVJyxcbiAgJ1xceGY5JzogJ3UnLCAgJ1xceGZhJzogJ3UnLCAnXFx4ZmInOiAndScsICdcXHhmYyc6ICd1JyxcbiAgJ1xceGRkJzogJ1knLCAgJ1xceGZkJzogJ3knLCAnXFx4ZmYnOiAneScsXG4gICdcXHhjNic6ICdBZScsICdcXHhlNic6ICdhZScsXG4gICdcXHhkZSc6ICdUaCcsICdcXHhmZSc6ICd0aCcsXG4gICdcXHhkZic6ICdzcycsXG4gIC8vIExhdGluIEV4dGVuZGVkLUEgYmxvY2suXG4gICdcXHUwMTAwJzogJ0EnLCAgJ1xcdTAxMDInOiAnQScsICdcXHUwMTA0JzogJ0EnLFxuICAnXFx1MDEwMSc6ICdhJywgICdcXHUwMTAzJzogJ2EnLCAnXFx1MDEwNSc6ICdhJyxcbiAgJ1xcdTAxMDYnOiAnQycsICAnXFx1MDEwOCc6ICdDJywgJ1xcdTAxMGEnOiAnQycsICdcXHUwMTBjJzogJ0MnLFxuICAnXFx1MDEwNyc6ICdjJywgICdcXHUwMTA5JzogJ2MnLCAnXFx1MDEwYic6ICdjJywgJ1xcdTAxMGQnOiAnYycsXG4gICdcXHUwMTBlJzogJ0QnLCAgJ1xcdTAxMTAnOiAnRCcsICdcXHUwMTBmJzogJ2QnLCAnXFx1MDExMSc6ICdkJyxcbiAgJ1xcdTAxMTInOiAnRScsICAnXFx1MDExNCc6ICdFJywgJ1xcdTAxMTYnOiAnRScsICdcXHUwMTE4JzogJ0UnLCAnXFx1MDExYSc6ICdFJyxcbiAgJ1xcdTAxMTMnOiAnZScsICAnXFx1MDExNSc6ICdlJywgJ1xcdTAxMTcnOiAnZScsICdcXHUwMTE5JzogJ2UnLCAnXFx1MDExYic6ICdlJyxcbiAgJ1xcdTAxMWMnOiAnRycsICAnXFx1MDExZSc6ICdHJywgJ1xcdTAxMjAnOiAnRycsICdcXHUwMTIyJzogJ0cnLFxuICAnXFx1MDExZCc6ICdnJywgICdcXHUwMTFmJzogJ2cnLCAnXFx1MDEyMSc6ICdnJywgJ1xcdTAxMjMnOiAnZycsXG4gICdcXHUwMTI0JzogJ0gnLCAgJ1xcdTAxMjYnOiAnSCcsICdcXHUwMTI1JzogJ2gnLCAnXFx1MDEyNyc6ICdoJyxcbiAgJ1xcdTAxMjgnOiAnSScsICAnXFx1MDEyYSc6ICdJJywgJ1xcdTAxMmMnOiAnSScsICdcXHUwMTJlJzogJ0knLCAnXFx1MDEzMCc6ICdJJyxcbiAgJ1xcdTAxMjknOiAnaScsICAnXFx1MDEyYic6ICdpJywgJ1xcdTAxMmQnOiAnaScsICdcXHUwMTJmJzogJ2knLCAnXFx1MDEzMSc6ICdpJyxcbiAgJ1xcdTAxMzQnOiAnSicsICAnXFx1MDEzNSc6ICdqJyxcbiAgJ1xcdTAxMzYnOiAnSycsICAnXFx1MDEzNyc6ICdrJywgJ1xcdTAxMzgnOiAnaycsXG4gICdcXHUwMTM5JzogJ0wnLCAgJ1xcdTAxM2InOiAnTCcsICdcXHUwMTNkJzogJ0wnLCAnXFx1MDEzZic6ICdMJywgJ1xcdTAxNDEnOiAnTCcsXG4gICdcXHUwMTNhJzogJ2wnLCAgJ1xcdTAxM2MnOiAnbCcsICdcXHUwMTNlJzogJ2wnLCAnXFx1MDE0MCc6ICdsJywgJ1xcdTAxNDInOiAnbCcsXG4gICdcXHUwMTQzJzogJ04nLCAgJ1xcdTAxNDUnOiAnTicsICdcXHUwMTQ3JzogJ04nLCAnXFx1MDE0YSc6ICdOJyxcbiAgJ1xcdTAxNDQnOiAnbicsICAnXFx1MDE0Nic6ICduJywgJ1xcdTAxNDgnOiAnbicsICdcXHUwMTRiJzogJ24nLFxuICAnXFx1MDE0Yyc6ICdPJywgICdcXHUwMTRlJzogJ08nLCAnXFx1MDE1MCc6ICdPJyxcbiAgJ1xcdTAxNGQnOiAnbycsICAnXFx1MDE0Zic6ICdvJywgJ1xcdTAxNTEnOiAnbycsXG4gICdcXHUwMTU0JzogJ1InLCAgJ1xcdTAxNTYnOiAnUicsICdcXHUwMTU4JzogJ1InLFxuICAnXFx1MDE1NSc6ICdyJywgICdcXHUwMTU3JzogJ3InLCAnXFx1MDE1OSc6ICdyJyxcbiAgJ1xcdTAxNWEnOiAnUycsICAnXFx1MDE1Yyc6ICdTJywgJ1xcdTAxNWUnOiAnUycsICdcXHUwMTYwJzogJ1MnLFxuICAnXFx1MDE1Yic6ICdzJywgICdcXHUwMTVkJzogJ3MnLCAnXFx1MDE1Zic6ICdzJywgJ1xcdTAxNjEnOiAncycsXG4gICdcXHUwMTYyJzogJ1QnLCAgJ1xcdTAxNjQnOiAnVCcsICdcXHUwMTY2JzogJ1QnLFxuICAnXFx1MDE2Myc6ICd0JywgICdcXHUwMTY1JzogJ3QnLCAnXFx1MDE2Nyc6ICd0JyxcbiAgJ1xcdTAxNjgnOiAnVScsICAnXFx1MDE2YSc6ICdVJywgJ1xcdTAxNmMnOiAnVScsICdcXHUwMTZlJzogJ1UnLCAnXFx1MDE3MCc6ICdVJywgJ1xcdTAxNzInOiAnVScsXG4gICdcXHUwMTY5JzogJ3UnLCAgJ1xcdTAxNmInOiAndScsICdcXHUwMTZkJzogJ3UnLCAnXFx1MDE2Zic6ICd1JywgJ1xcdTAxNzEnOiAndScsICdcXHUwMTczJzogJ3UnLFxuICAnXFx1MDE3NCc6ICdXJywgICdcXHUwMTc1JzogJ3cnLFxuICAnXFx1MDE3Nic6ICdZJywgICdcXHUwMTc3JzogJ3knLCAnXFx1MDE3OCc6ICdZJyxcbiAgJ1xcdTAxNzknOiAnWicsICAnXFx1MDE3Yic6ICdaJywgJ1xcdTAxN2QnOiAnWicsXG4gICdcXHUwMTdhJzogJ3onLCAgJ1xcdTAxN2MnOiAneicsICdcXHUwMTdlJzogJ3onLFxuICAnXFx1MDEzMic6ICdJSicsICdcXHUwMTMzJzogJ2lqJyxcbiAgJ1xcdTAxNTInOiAnT2UnLCAnXFx1MDE1Myc6ICdvZScsXG4gICdcXHUwMTQ5JzogXCInblwiLCAnXFx1MDE3Zic6ICdzcydcbn07XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucmVkdWNlYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbml0QWNjdW1dIFNwZWNpZnkgdXNpbmcgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGFycmF5YCBhc1xuICogIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhcnJheVJlZHVjZShhcnJheSwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yLCBpbml0QWNjdW0pIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgaWYgKGluaXRBY2N1bSAmJiBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGFycmF5WysraW5kZXhdO1xuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBpdGVyYXRlZShhY2N1bXVsYXRvciwgYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuLyoqXG4gKiBTcGxpdHMgYW4gQVNDSUkgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICovXG5mdW5jdGlvbiBhc2NpaVdvcmRzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlQXNjaWlXb3JkKSB8fCBbXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFVzZWQgYnkgYF8uZGVidXJyYCB0byBjb252ZXJ0IExhdGluLTEgU3VwcGxlbWVudCBhbmQgTGF0aW4gRXh0ZW5kZWQtQVxuICogbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVyIFRoZSBtYXRjaGVkIGxldHRlciB0byBkZWJ1cnIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBkZWJ1cnJlZCBsZXR0ZXIuXG4gKi9cbnZhciBkZWJ1cnJMZXR0ZXIgPSBiYXNlUHJvcGVydHlPZihkZWJ1cnJlZExldHRlcnMpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBhIHdvcmQgY29tcG9zZWQgb2YgVW5pY29kZSBzeW1ib2xzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhIHdvcmQgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pY29kZVdvcmQoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGVXb3JkLnRlc3Qoc3RyaW5nKTtcbn1cblxuLyoqXG4gKiBTcGxpdHMgYSBVbmljb2RlIGBzdHJpbmdgIGludG8gYW4gYXJyYXkgb2YgaXRzIHdvcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVdvcmRzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlVW5pY29kZVdvcmQpIHx8IFtdO1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmNhbWVsQ2FzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBjb21iaW5lIGVhY2ggd29yZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbXBvdW5kZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvdW5kZXIoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHJldHVybiBhcnJheVJlZHVjZSh3b3JkcyhkZWJ1cnIoc3RyaW5nKS5yZXBsYWNlKHJlQXBvcywgJycpKSwgY2FsbGJhY2ssICcnKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIERlYnVycnMgYHN0cmluZ2AgYnkgY29udmVydGluZ1xuICogW0xhdGluLTEgU3VwcGxlbWVudF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGF0aW4tMV9TdXBwbGVtZW50XyhVbmljb2RlX2Jsb2NrKSNDaGFyYWN0ZXJfdGFibGUpXG4gKiBhbmQgW0xhdGluIEV4dGVuZGVkLUFdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhdGluX0V4dGVuZGVkLUEpXG4gKiBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMgYW5kIHJlbW92aW5nXG4gKiBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3MpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGRlYnVyci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGRlYnVycmVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWJ1cnIoJ2TDqWrDoCB2dScpO1xuICogLy8gPT4gJ2RlamEgdnUnXG4gKi9cbmZ1bmN0aW9uIGRlYnVycihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIHN0cmluZyAmJiBzdHJpbmcucmVwbGFjZShyZUxhdGluLCBkZWJ1cnJMZXR0ZXIpLnJlcGxhY2UocmVDb21ib01hcmssICcnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0b1xuICogW2tlYmFiIGNhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI1NwZWNpYWxfY2FzZV9zdHlsZXMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBrZWJhYiBjYXNlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ua2ViYWJDYXNlKCdGb28gQmFyJyk7XG4gKiAvLyA9PiAnZm9vLWJhcidcbiAqXG4gKiBfLmtlYmFiQ2FzZSgnZm9vQmFyJyk7XG4gKiAvLyA9PiAnZm9vLWJhcidcbiAqXG4gKiBfLmtlYmFiQ2FzZSgnX19GT09fQkFSX18nKTtcbiAqIC8vID0+ICdmb28tYmFyJ1xuICovXG52YXIga2ViYWJDYXNlID0gY3JlYXRlQ29tcG91bmRlcihmdW5jdGlvbihyZXN1bHQsIHdvcmQsIGluZGV4KSB7XG4gIHJldHVybiByZXN1bHQgKyAoaW5kZXggPyAnLScgOiAnJykgKyB3b3JkLnRvTG93ZXJDYXNlKCk7XG59KTtcblxuLyoqXG4gKiBTcGxpdHMgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7UmVnRXhwfHN0cmluZ30gW3BhdHRlcm5dIFRoZSBwYXR0ZXJuIHRvIG1hdGNoIHdvcmRzLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ud29yZHMoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJyk7XG4gKiAvLyA9PiBbJ2ZyZWQnLCAnYmFybmV5JywgJ3BlYmJsZXMnXVxuICpcbiAqIF8ud29yZHMoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJywgL1teLCBdKy9nKTtcbiAqIC8vID0+IFsnZnJlZCcsICdiYXJuZXknLCAnJicsICdwZWJibGVzJ11cbiAqL1xuZnVuY3Rpb24gd29yZHMoc3RyaW5nLCBwYXR0ZXJuLCBndWFyZCkge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICBwYXR0ZXJuID0gZ3VhcmQgPyB1bmRlZmluZWQgOiBwYXR0ZXJuO1xuXG4gIGlmIChwYXR0ZXJuID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gaGFzVW5pY29kZVdvcmQoc3RyaW5nKSA/IHVuaWNvZGVXb3JkcyhzdHJpbmcpIDogYXNjaWlXb3JkcyhzdHJpbmcpO1xuICB9XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocGF0dGVybikgfHwgW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2ViYWJDYXNlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xudmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgPSAxLFxuICAgIFBBUlRJQUxfQ09NUEFSRV9GTEFHID0gMjtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLyxcbiAgICByZUxlYWRpbmdEb3QgPSAvXlxcLi8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKSxcbiAgICBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgY2FjaGUgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBjYWNoZS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBjYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc0luYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSGFzSW4ob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGtleSBpbiBPYmplY3Qob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gKiBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy5cbiAqICBUaGUgYml0bWFzayBtYXkgYmUgY29tcG9zZWQgb2YgdGhlIGZvbGxvd2luZyBmbGFnczpcbiAqICAgICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAqICAgICAyIC0gUGFydGlhbCBjb21wYXJpc29uXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdCh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gZ2V0VGFnKG9iamVjdCk7XG4gICAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IGdldFRhZyhvdGhlcik7XG4gICAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG9iamVjdCksXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcgJiYgIWlzSG9zdE9iamVjdChvdGhlciksXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICByZXR1cm4gKG9iaklzQXJyIHx8IGlzVHlwZWRBcnJheShvYmplY3QpKVxuICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgOiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gIH1cbiAgaWYgKCEoYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHKSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHZhciBvYmpVbndyYXBwZWQgPSBvYmpJc1dyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCxcbiAgICAgICAgICBvdGhVbndyYXBwZWQgPSBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXI7XG5cbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9ialVud3JhcHBlZCwgb3RoVW53cmFwcGVkLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHJldHVybiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIGN1c3RvbWl6ZXIsIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgfCBQQVJUSUFMX0NPTVBBUkVfRkxBRywgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pdGVyYXRlZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW3ZhbHVlPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGFuIGl0ZXJhdGVlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBpdGVyYXRlZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUl0ZXJhdGVlKHZhbHVlKSB7XG4gIC8vIERvbid0IHN0b3JlIHRoZSBgdHlwZW9mYCByZXN1bHQgaW4gYSB2YXJpYWJsZSB0byBhdm9pZCBhIEpJVCBidWcgaW4gU2FmYXJpIDkuXG4gIC8vIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU2MDM0IGZvciBtb3JlIGRldGFpbHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpXG4gICAgICA/IGJhc2VNYXRjaGVzUHJvcGVydHkodmFsdWVbMF0sIHZhbHVlWzFdKVxuICAgICAgOiBiYXNlTWF0Y2hlcyh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHByb3BlcnR5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIG1hdGNoRGF0YSA9IGdldE1hdGNoRGF0YShzb3VyY2UpO1xuICBpZiAobWF0Y2hEYXRhLmxlbmd0aCA9PSAxICYmIG1hdGNoRGF0YVswXVsyXSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShtYXRjaERhdGFbMF1bMF0sIG1hdGNoRGF0YVswXVsxXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT09IHNvdXJjZSB8fCBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNyY1ZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICBpZiAoaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHNyY1ZhbHVlKSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSh0b0tleShwYXRoKSwgc3JjVmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgb2JqVmFsdWUgPSBnZXQob2JqZWN0LCBwYXRoKTtcbiAgICByZXR1cm4gKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgb2JqVmFsdWUgPT09IHNyY1ZhbHVlKVxuICAgICAgPyBoYXNJbihvYmplY3QsIHBhdGgpXG4gICAgICA6IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgdW5kZWZpbmVkLCBVTk9SREVSRURfQ09NUEFSRV9GTEFHIHwgUEFSVElBTF9DT01QQVJFX0ZMQUcpO1xuICB9O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVByb3BlcnR5YCB3aGljaCBzdXBwb3J0cyBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eURlZXAocGF0aCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wdWxsQXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaW5kaXZpZHVhbFxuICogaW5kZXhlcyBvciBjYXB0dXJpbmcgdGhlIHJlbW92ZWQgZWxlbWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge251bWJlcltdfSBpbmRleGVzIFRoZSBpbmRleGVzIG9mIGVsZW1lbnRzIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlUHVsbEF0KGFycmF5LCBpbmRleGVzKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGluZGV4ZXMubGVuZ3RoIDogMCxcbiAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDE7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhlc1tsZW5ndGhdO1xuICAgIGlmIChsZW5ndGggPT0gbGFzdEluZGV4IHx8IGluZGV4ICE9PSBwcmV2aW91cykge1xuICAgICAgdmFyIHByZXZpb3VzID0gaW5kZXg7XG4gICAgICBpZiAoaXNJbmRleChpbmRleCkpIHtcbiAgICAgICAgc3BsaWNlLmNhbGwoYXJyYXksIGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc0tleShpbmRleCwgYXJyYXkpKSB7XG4gICAgICAgIHZhciBwYXRoID0gY2FzdFBhdGgoaW5kZXgpLFxuICAgICAgICAgICAgb2JqZWN0ID0gcGFyZW50KGFycmF5LCBwYXRoKTtcblxuICAgICAgICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICAgICAgICBkZWxldGUgb2JqZWN0W3RvS2V5KGxhc3QocGF0aCkpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBhcnJheVt0b0tleShpbmRleCldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc2xpY2VgIHdpdGhvdXQgYW4gaXRlcmF0ZWUgY2FsbCBndWFyZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNsaWNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHNsaWNlIG9mIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAtc3RhcnQgPiBsZW5ndGggPyAwIDogKGxlbmd0aCArIHN0YXJ0KTtcbiAgfVxuICBlbmQgPSBlbmQgPiBsZW5ndGggPyBsZW5ndGggOiBlbmQ7XG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlbmd0aDtcbiAgfVxuICBsZW5ndGggPSBzdGFydCA+IGVuZCA/IDAgOiAoKGVuZCAtIHN0YXJ0KSA+Pj4gMCk7XG4gIHN0YXJ0ID4+Pj0gMDtcblxuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gYXJyYXlbaW5kZXggKyBzdGFydF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogc3RyaW5nVG9QYXRoKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgc2VlbiA9IChiaXRtYXNrICYgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRykgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgc3RhY2suc2V0KGFycmF5LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgYXJyYXkpO1xuXG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleCwgb3RoZXIsIGFycmF5LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgsIGFycmF5LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICBpZiAoY29tcGFyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoc2Vlbikge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlLCBvdGhJbmRleCkge1xuICAgICAgICAgICAgaWYgKCFzZWVuLmhhcyhvdGhJbmRleCkgJiZcbiAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlZW4uYWRkKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gVU5PUkRFUkVEX0NPTVBBUkVfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcsXG4gICAgICBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzUGFydGlhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICBpZiAoIShpc1BhcnRpYWwgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIG9iamVjdCk7XG5cbiAgdmFyIHNraXBDdG9yID0gaXNQYXJ0aWFsO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXksIG90aGVyLCBvYmplY3QsIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKCEoY29tcGFyZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gKG9ialZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykpXG4gICAgICAgICAgOiBjb21wYXJlZFxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKHJlc3VsdCAmJiAhc2tpcEN0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG1hdGNoIGRhdGEgb2YgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoRGF0YShvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGtleSA9IHJlc3VsdFtsZW5ndGhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgcmVzdWx0W2xlbmd0aF0gPSBba2V5LCB2YWx1ZSwgaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExLFxuLy8gZm9yIGRhdGEgdmlld3MgaW4gRWRnZSA8IDE0LCBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcy5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciByZXN1bHQsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pO1xuICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICB9XG4gIGlmIChyZXN1bHQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QgPyBvYmplY3QubGVuZ3RoIDogMDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgIWlzT2JqZWN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYG1hdGNoZXNQcm9wZXJ0eWAgZm9yIHNvdXJjZSB2YWx1ZXMgc3VpdGFibGVcbiAqIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShrZXksIHNyY1ZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdFtrZXldID09PSBzcmNWYWx1ZSAmJlxuICAgICAgKHNyY1ZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiBPYmplY3Qob2JqZWN0KSkpO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHBhcmVudCB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gZ2V0IHRoZSBwYXJlbnQgdmFsdWUgb2YuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcGFyZW50IHZhbHVlLlxuICovXG5mdW5jdGlvbiBwYXJlbnQob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBwYXRoLmxlbmd0aCA9PSAxID8gb2JqZWN0IDogYmFzZUdldChvYmplY3QsIGJhc2VTbGljZShwYXRoLCAwLCAtMSkpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplKGZ1bmN0aW9uKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHJlTGVhZGluZ0RvdC50ZXN0KHN0cmluZykpIHtcbiAgICByZXN1bHQucHVzaCgnJyk7XG4gIH1cbiAgc3RyaW5nLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5sYXN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuIGxlbmd0aCA/IGFycmF5W2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGVsZW1lbnRzIGZyb20gYGFycmF5YCB0aGF0IGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvclxuICogYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHJlbW92ZWQgZWxlbWVudHMuIFRoZSBwcmVkaWNhdGUgaXMgaW52b2tlZFxuICogd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIGBfLmZpbHRlcmAsIHRoaXMgbWV0aG9kIG11dGF0ZXMgYGFycmF5YC4gVXNlIGBfLnB1bGxgXG4gKiB0byBwdWxsIGVsZW1lbnRzIGZyb20gYW4gYXJyYXkgYnkgdmFsdWUuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XVxuICogIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiByZW1vdmVkIGVsZW1lbnRzLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXkgPSBbMSwgMiwgMywgNF07XG4gKiB2YXIgZXZlbnMgPSBfLnJlbW92ZShhcnJheSwgZnVuY3Rpb24obikge1xuICogICByZXR1cm4gbiAlIDIgPT0gMDtcbiAqIH0pO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5KTtcbiAqIC8vID0+IFsxLCAzXVxuICpcbiAqIGNvbnNvbGUubG9nKGV2ZW5zKTtcbiAqIC8vID0+IFsyLCA0XVxuICovXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmICghKGFycmF5ICYmIGFycmF5Lmxlbmd0aCkpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5kZXhlcyA9IFtdLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHByZWRpY2F0ZSA9IGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH1cbiAgfVxuICBiYXNlUHVsbEF0KGFycmF5LCBpbmRleGVzKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBBc3NpZ24gY2FjaGUgdG8gYF8ubWVtb2l6ZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBpcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsIFsnYScsICdiJ10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYicpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaGFzSW4ob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGEgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW1xuICogICB7ICdhJzogeyAnYic6IDIgfSB9LFxuICogICB7ICdhJzogeyAnYic6IDEgfSB9XG4gKiBdO1xuICpcbiAqIF8ubWFwKG9iamVjdHMsIF8ucHJvcGVydHkoJ2EuYicpKTtcbiAqIC8vID0+IFsyLCAxXVxuICpcbiAqIF8ubWFwKF8uc29ydEJ5KG9iamVjdHMsIF8ucHJvcGVydHkoWydhJywgJ2InXSkpLCAnYS5iJyk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqL1xuZnVuY3Rpb24gcHJvcGVydHkocGF0aCkge1xuICByZXR1cm4gaXNLZXkocGF0aCkgPyBiYXNlUHJvcGVydHkodG9LZXkocGF0aCkpIDogYmFzZVByb3BlcnR5RGVlcChwYXRoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW1vdmU7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIDApID4gLTE7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhcnJheUluY2x1ZGVzYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGEgY29tcGFyYXRvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXNXaXRoKGFycmF5LCB2YWx1ZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChjb21wYXJhdG9yKHZhbHVlLCBhcnJheVtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgaWYgKHZhbHVlICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBiYXNlRmluZEluZGV4KGFycmF5LCBiYXNlSXNOYU4sIGZyb21JbmRleCk7XG4gIH1cbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hTmAgd2l0aG91dCBzdXBwb3J0IGZvciBudW1iZXIgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSGFzKGNhY2hlLCBrZXkpIHtcbiAgcmV0dXJuIGNhY2hlLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgfVxuICBlbHNlIGlmIChsZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIHZhciBzZXQgPSBpdGVyYXRlZSA/IG51bGwgOiBjcmVhdGVTZXQoYXJyYXkpO1xuICAgIGlmIChzZXQpIHtcbiAgICAgIHJldHVybiBzZXRUb0FycmF5KHNldCk7XG4gICAgfVxuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBzZWVuID0gbmV3IFNldENhY2hlO1xuICB9XG4gIGVsc2Uge1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXMoc2VlbiwgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICBpZiAoc2VlbiAhPT0gcmVzdWx0KSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNldCBvYmplY3Qgb2YgYHZhbHVlc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFkZCB0byB0aGUgc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IHNldC5cbiAqL1xudmFyIGNyZWF0ZVNldCA9ICEoU2V0ICYmICgxIC8gc2V0VG9BcnJheShuZXcgU2V0KFssLTBdKSlbMV0pID09IElORklOSVRZKSA/IG5vb3AgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXQodmFsdWVzKTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBkdXBsaWNhdGUtZnJlZSB2ZXJzaW9uIG9mIGFuIGFycmF5LCB1c2luZ1xuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucywgaW4gd2hpY2ggb25seSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBlYWNoXG4gKiBlbGVtZW50IGlzIGtlcHQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXEoWzIsIDEsIDJdKTtcbiAqIC8vID0+IFsyLCAxXVxuICovXG5mdW5jdGlvbiB1bmlxKGFycmF5KSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgID8gYmFzZVVuaXEoYXJyYXkpXG4gICAgOiBbXTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8ubm9vcCk7XG4gKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pcTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NYXR0LUVzY2gvdmlydHVhbC1kb20vYmxvYi9tYXN0ZXIvdmlydHVhbC1oeXBlcnNjcmlwdC9wYXJzZS10YWcuanNcblxudmFyIHNwbGl0ID0gcmVxdWlyZSgnYnJvd3Nlci1zcGxpdCcpXG5cbnZhciBjbGFzc0lkU3BsaXQgPSAvKFtcXC4jXT9bYS16QS1aMC05XFx1MDA3Ri1cXHVGRkZGXzotXSspL1xudmFyIG5vdENsYXNzSWQgPSAvXlxcLnwjL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlU2VsZWN0b3IgKHNlbGVjdG9yLCB1cHBlcikge1xuICBzZWxlY3RvciA9IHNlbGVjdG9yIHx8ICcnXG4gIHZhciB0YWdOYW1lXG4gIHZhciBpZCA9ICcnXG4gIHZhciBjbGFzc2VzID0gW11cblxuICB2YXIgdGFnUGFydHMgPSBzcGxpdChzZWxlY3RvciwgY2xhc3NJZFNwbGl0KVxuXG4gIGlmIChub3RDbGFzc0lkLnRlc3QodGFnUGFydHNbMV0pIHx8IHNlbGVjdG9yID09PSAnJykge1xuICAgIHRhZ05hbWUgPSAnZGl2J1xuICB9XG5cbiAgdmFyIHBhcnQsIHR5cGUsIGlcblxuICBmb3IgKGkgPSAwOyBpIDwgdGFnUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBwYXJ0ID0gdGFnUGFydHNbaV1cblxuICAgIGlmICghcGFydCkge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICB0eXBlID0gcGFydC5jaGFyQXQoMClcblxuICAgIGlmICghdGFnTmFtZSkge1xuICAgICAgdGFnTmFtZSA9IHBhcnRcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICcuJykge1xuICAgICAgY2xhc3Nlcy5wdXNoKHBhcnQuc3Vic3RyaW5nKDEsIHBhcnQubGVuZ3RoKSlcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICcjJykge1xuICAgICAgaWQgPSBwYXJ0LnN1YnN0cmluZygxLCBwYXJ0Lmxlbmd0aClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRhZ05hbWU6IHVwcGVyID09PSB0cnVlID8gdGFnTmFtZS50b1VwcGVyQ2FzZSgpIDogdGFnTmFtZSxcbiAgICBpZDogaWQsXG4gICAgY2xhc3NOYW1lOiBjbGFzc2VzLmpvaW4oJyAnKVxuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jbGFzcyBjaGVja0ZvckVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3IpIHtcclxuICAgICAgICBzdXBlcihlcnJvcik7XHJcbiAgICAgICAgY29uc3QgaXNFcnJvciA9IGBcclxuICAgICAgICA8aDMgc3R5bGU9XCJjb2xvcjogcmVkO1wiPlR5cGVFcnJvcjogJHt0aGlzLm1lc3NhZ2V9PC9oMz5cclxuICAgICAgICA8cD48L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLWNvblwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2M3ZTJmMTsgYm9yZGVyOiAycHggc29saWQgIzM4YjZmZjsgcGFkZGluZzogOHB4IDEycHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PiR7dGhpcy5zdGFja308L2Rpdj5cclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JcIikuaW5uZXJIVE1MID0gaXNFcnJvcjtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGNoZWNrRm9yRXJyb3I7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHF1aWNrX2Vycm9yXzEgPSByZXF1aXJlKFwicXVpY2stZXJyb3JcIik7XHJcbmNvbnN0IHNuYWJiZG9tID0gcmVxdWlyZShcInNuYWJiZG9tXCIpO1xyXG5jb25zdCBwcm9wc18xID0gcmVxdWlyZShcInNuYWJiZG9tL21vZHVsZXMvcHJvcHNcIik7XHJcbmNvbnN0IHJlY29uY2lsZSA9IHNuYWJiZG9tLmluaXQoW3Byb3BzXzEuZGVmYXVsdF0pO1xyXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xyXG5jb25zdCBzbmFiYmRvbV8xID0gcmVxdWlyZShcInNuYWJiZG9tXCIpO1xyXG5jb25zdCBpbml0ID0gcmVxdWlyZSgnc25hYmJkb20tdG8taHRtbC9pbml0Jyk7XHJcbmNvbnN0IG1vZHVsZXMgPSByZXF1aXJlKCdzbmFiYmRvbS10by1odG1sL21vZHVsZXMnKTtcclxuY29uc3QgdG9IVE1MID0gaW5pdChbXHJcbiAgICBtb2R1bGVzLmNsYXNzLFxyXG4gICAgbW9kdWxlcy5wcm9wcyxcclxuICAgIG1vZHVsZXMuYXR0cmlidXRlcyxcclxuICAgIG1vZHVsZXMuc3R5bGVcclxuXSk7XHJcbi8vIGludGVyZmFjZSBJUXVpY2sge1xyXG4vLyAgICAgcmVhZG9ubHkgJGVsOiBFbGVtZW50LFxyXG4vLyB9XHJcbi8vIGZ1bmN0aW9uIHdhdGNoRWZmZWN0KGZuOlAgYW55KSB7XHJcbi8vICAgICB0aGlzLmFjdGl2ZUVmZmVjdCA9IGZuXHJcbi8vICAgICBmbigpXHJcbi8vICAgICB0aGlzLmFjdGl2ZUVmZmVjdCA9IG51bGxcclxuLy8gfVxyXG5jbGFzcyBEZXAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycyA9IG5ldyBTZXQoKTtcclxuICAgIH1cclxuICAgIGRlcGVuZChhY3RpdmVFZmZlY3QpIHtcclxuICAgICAgICBpZiAoYWN0aXZlRWZmZWN0KVxyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmFkZChhY3RpdmVFZmZlY3QpO1xyXG4gICAgfVxyXG4gICAgbm90aWZ5KCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgoc3ViKSA9PiB7XHJcbiAgICAgICAgICAgIHN1YigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgdC5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHsgfVxyXG4gICAgc2V0U3RhdGUocGFydGlhbFN0YXRlKSB7XHJcbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAuLi5fdGhpcy5zdGF0ZSxcclxuICAgICAgICAgICAgLi4ucGFydGlhbFN0YXRlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBRdWljay5fX3VwZGF0ZXIoX3RoaXMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKGVsLCByKSB7XHJcbiAgICAgICAgcmVjb25jaWxlKHJvb3QsIGVsKTtcclxuICAgIH1cclxufVxyXG5jb25zdCBfcHQgPSBDb21wb25lbnQucHJvdG90eXBlO1xyXG5fcHQuaXNRdWlja0NsYXNzQ29tcG9uZW50ID0gdHJ1ZTtcclxuY29uc3QgcmVuZGVyID0gYXN5bmMgKGVsLCByKSA9PiB7XHJcbiAgICByZWNvbmNpbGUocm9vdCwgZWwpO1xyXG59O1xyXG5jb25zdCAkaW5pdCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGZhdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG4gICAgZmF2LmhyZWYgPSBcIi9mYXZpY29uLmljb1wiO1xyXG4gICAgZmF2LnJlbCA9IFwiaWNvblwiO1xyXG4gICAgY29uc3QgaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKTtcclxuICAgIGNvbnNvbGUubG9nKGgpO1xyXG59O1xyXG5jb25zdCAkbGlzdGVuZXIgPSAodGFyZ2V0LCB0eXBlLCBmbiwgcHJldmVudCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHByZXZlbnQpIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gXCJcIiB8fCAhdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KGB0YXJnZXQgbm90IHBhc3NlZCB0byBsaXN0ZW5lcmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBmbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCB1c2UgPSAoZnVuYykgPT4ge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmM7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgdmlldyA9ICh2aWV3KSA9PiB7XHJcbiAgICBjb25zdCByZW5kZXJWaWV3dG9IVE1MID0gdG9IVE1MKHZpZXcpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHBcIikuaW5uZXJIVE1MID0gcmVuZGVyVmlld3RvSFRNTDtcclxufTtcclxuY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCBwcm9wcyA9IHt9LCAuLi5jaGlsZHJlbikgPT4ge1xyXG4gICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5mbGF0KCk7XHJcbiAgICBpZiAodHlwZS5wcm90b3R5cGUgJiYgdHlwZS5wcm90b3R5cGUuaXNRbmRSZWFjdENsYXNzQ29tcG9uZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBuZXcgdHlwZShwcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEluc3RhbmNlLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiAodHlwZSkgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiB0eXBlKHByb3BzKTtcclxuICAgIH1cclxuICAgIHByb3BzID0gcHJvcHMgfHwge307XHJcbiAgICBsZXQgZGF0YVByb3BzID0ge307XHJcbiAgICBsZXQgZXZlbnRQcm9wcyA9IHt9O1xyXG4gICAgZm9yIChsZXQgcHJvcEtleSBpbiBwcm9wcykge1xyXG4gICAgICAgIC8vIGV2ZW50IHByb3BzIGFsd2F5cyBzdGFydHdpdGggb24gZWcuIG9uQ2xpY2ssIG9uQ2hhbmdlIGV0Yy5cclxuICAgICAgICBpZiAocHJvcEtleS5zdGFydHNXaXRoKCdvbicpKSB7XHJcbiAgICAgICAgICAgIC8vIG9uQ2xpY2sgLT4gY2xpY2tcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBwcm9wS2V5LnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBldmVudFByb3BzW2V2ZW50XSA9IHByb3BzW3Byb3BLZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGF0YVByb3BzW3Byb3BLZXldID0gcHJvcHNbcHJvcEtleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNuYWJiZG9tXzEuaCh0eXBlLCB7IHByb3BzIH0sIGNoaWxkcmVuKTtcclxufTtcclxuY29uc3QgX191cGRhdGVyID0gKGluc3RhbmNlKSA9PiB7IHJldHVybiBpbnN0YW5jZTsgfTtcclxuY29uc3QgJGNvbmZpZyA9IChlbnYpID0+IHtcclxuICAgIGlmIChlbnYgPT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgICB9XHJcbiAgICBpZiAoZW52ID09PSBcImRldmVsb3BtZW50XCIpIHtcclxuICAgIH1cclxuICAgIGlmICghZW52IHx8IGVudiA9PT0gXCJcIikge1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBRdWljayA9IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIHVzZSxcclxuICAgIHZpZXcsXHJcbiAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgX191cGRhdGVyLFxyXG4gICAgJGNvbmZpZyxcclxuICAgIHJlbmRlcixcclxuICAgICRpbml0LFxyXG4gICAgJGxpc3RlbmVyXHJcbn07XHJcblF1aWNrLnVzZShRdWljay4kaW5pdCk7XHJcblF1aWNrLnVzZShRdWljay4kbGlzdGVuZXIpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBRdWljaztcclxuIiwiaW1wb3J0IHsgdm5vZGUgfSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCAqIGFzIGlzIGZyb20gJy4vaXMnO1xuZnVuY3Rpb24gYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCkge1xuICAgIGRhdGEubnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGlmIChzZWwgIT09ICdmb3JlaWduT2JqZWN0JyAmJiBjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZERhdGEgPSBjaGlsZHJlbltpXS5kYXRhO1xuICAgICAgICAgICAgaWYgKGNoaWxkRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWRkTlMoY2hpbGREYXRhLCBjaGlsZHJlbltpXS5jaGlsZHJlbiwgY2hpbGRyZW5baV0uc2VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBoKHNlbCwgYiwgYykge1xuICAgIHZhciBkYXRhID0ge30sIGNoaWxkcmVuLCB0ZXh0LCBpO1xuICAgIGlmIChjICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIGlmIChpcy5hcnJheShjKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShjKSkge1xuICAgICAgICAgICAgdGV4dCA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyAmJiBjLnNlbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbY107XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpcy5hcnJheShiKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShiKSkge1xuICAgICAgICAgICAgdGV4dCA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYiAmJiBiLnNlbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbYl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChpcy5wcmltaXRpdmUoY2hpbGRyZW5baV0pKVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldID0gdm5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGRyZW5baV0sIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbFswXSA9PT0gJ3MnICYmIHNlbFsxXSA9PT0gJ3YnICYmIHNlbFsyXSA9PT0gJ2cnICYmXG4gICAgICAgIChzZWwubGVuZ3RoID09PSAzIHx8IHNlbFszXSA9PT0gJy4nIHx8IHNlbFszXSA9PT0gJyMnKSkge1xuICAgICAgICBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIHVuZGVmaW5lZCk7XG59XG47XG5leHBvcnQgZGVmYXVsdCBoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aC5qcy5tYXAiLCJmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudCh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dCk7XG59XG5mdW5jdGlvbiBpbnNlcnRCZWZvcmUocGFyZW50Tm9kZSwgbmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpO1xufVxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZENoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBwYXJlbnROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xufVxuZnVuY3Rpb24gbmV4dFNpYmxpbmcobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xufVxuZnVuY3Rpb24gdGFnTmFtZShlbG0pIHtcbiAgICByZXR1cm4gZWxtLnRhZ05hbWU7XG59XG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChub2RlLCB0ZXh0KSB7XG4gICAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG59XG5mdW5jdGlvbiBnZXRUZXh0Q29udGVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUudGV4dENvbnRlbnQ7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxO1xufVxuZnVuY3Rpb24gaXNUZXh0KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMztcbn1cbmZ1bmN0aW9uIGlzQ29tbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDg7XG59XG5leHBvcnQgdmFyIGh0bWxEb21BcGkgPSB7XG4gICAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgICBjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcbiAgICBjcmVhdGVUZXh0Tm9kZTogY3JlYXRlVGV4dE5vZGUsXG4gICAgY3JlYXRlQ29tbWVudDogY3JlYXRlQ29tbWVudCxcbiAgICBpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcbiAgICByZW1vdmVDaGlsZDogcmVtb3ZlQ2hpbGQsXG4gICAgYXBwZW5kQ2hpbGQ6IGFwcGVuZENoaWxkLFxuICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgbmV4dFNpYmxpbmc6IG5leHRTaWJsaW5nLFxuICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuICAgIGdldFRleHRDb250ZW50OiBnZXRUZXh0Q29udGVudCxcbiAgICBpc0VsZW1lbnQ6IGlzRWxlbWVudCxcbiAgICBpc1RleHQ6IGlzVGV4dCxcbiAgICBpc0NvbW1lbnQ6IGlzQ29tbWVudCxcbn07XG5leHBvcnQgZGVmYXVsdCBodG1sRG9tQXBpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHRtbGRvbWFwaS5qcy5tYXAiLCJleHBvcnQgdmFyIGFycmF5ID0gQXJyYXkuaXNBcnJheTtcbmV4cG9ydCBmdW5jdGlvbiBwcmltaXRpdmUocykge1xuICAgIHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHMgPT09ICdudW1iZXInO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMuanMubWFwIiwiaW1wb3J0IHZub2RlIGZyb20gJy4vdm5vZGUnO1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgaHRtbERvbUFwaSBmcm9tICcuL2h0bWxkb21hcGknO1xuZnVuY3Rpb24gaXNVbmRlZihzKSB7IHJldHVybiBzID09PSB1bmRlZmluZWQ7IH1cbmZ1bmN0aW9uIGlzRGVmKHMpIHsgcmV0dXJuIHMgIT09IHVuZGVmaW5lZDsgfVxudmFyIGVtcHR5Tm9kZSA9IHZub2RlKCcnLCB7fSwgW10sIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbmZ1bmN0aW9uIHNhbWVWbm9kZSh2bm9kZTEsIHZub2RlMikge1xuICAgIHJldHVybiB2bm9kZTEua2V5ID09PSB2bm9kZTIua2V5ICYmIHZub2RlMS5zZWwgPT09IHZub2RlMi5zZWw7XG59XG5mdW5jdGlvbiBpc1Zub2RlKHZub2RlKSB7XG4gICAgcmV0dXJuIHZub2RlLnNlbCAhPT0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gY3JlYXRlS2V5VG9PbGRJZHgoY2hpbGRyZW4sIGJlZ2luSWR4LCBlbmRJZHgpIHtcbiAgICB2YXIgaSwgbWFwID0ge30sIGtleSwgY2g7XG4gICAgZm9yIChpID0gYmVnaW5JZHg7IGkgPD0gZW5kSWR4OyArK2kpIHtcbiAgICAgICAgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGtleSA9IGNoLmtleTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBtYXBba2V5XSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbn1cbnZhciBob29rcyA9IFsnY3JlYXRlJywgJ3VwZGF0ZScsICdyZW1vdmUnLCAnZGVzdHJveScsICdwcmUnLCAncG9zdCddO1xuZXhwb3J0IHsgaCB9IGZyb20gJy4vaCc7XG5leHBvcnQgeyB0aHVuayB9IGZyb20gJy4vdGh1bmsnO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQobW9kdWxlcywgZG9tQXBpKSB7XG4gICAgdmFyIGksIGosIGNicyA9IHt9O1xuICAgIHZhciBhcGkgPSBkb21BcGkgIT09IHVuZGVmaW5lZCA/IGRvbUFwaSA6IGh0bWxEb21BcGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNic1tob29rc1tpXV0gPSBbXTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG1vZHVsZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBob29rID0gbW9kdWxlc1tqXVtob29rc1tpXV07XG4gICAgICAgICAgICBpZiAoaG9vayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2JzW2hvb2tzW2ldXS5wdXNoKGhvb2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVtcHR5Tm9kZUF0KGVsbSkge1xuICAgICAgICB2YXIgaWQgPSBlbG0uaWQgPyAnIycgKyBlbG0uaWQgOiAnJztcbiAgICAgICAgdmFyIGMgPSBlbG0uY2xhc3NOYW1lID8gJy4nICsgZWxtLmNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJy4nKSA6ICcnO1xuICAgICAgICByZXR1cm4gdm5vZGUoYXBpLnRhZ05hbWUoZWxtKS50b0xvd2VyQ2FzZSgpICsgaWQgKyBjLCB7fSwgW10sIHVuZGVmaW5lZCwgZWxtKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlUm1DYihjaGlsZEVsbSwgbGlzdGVuZXJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBybUNiKCkge1xuICAgICAgICAgICAgaWYgKC0tbGlzdGVuZXJzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gYXBpLnBhcmVudE5vZGUoY2hpbGRFbG0pO1xuICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRfMSwgY2hpbGRFbG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5pbml0KSkge1xuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuLCBzZWwgPSB2bm9kZS5zZWw7XG4gICAgICAgIGlmIChzZWwgPT09ICchJykge1xuICAgICAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICB2bm9kZS50ZXh0ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlQ29tbWVudCh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gUGFyc2Ugc2VsZWN0b3JcbiAgICAgICAgICAgIHZhciBoYXNoSWR4ID0gc2VsLmluZGV4T2YoJyMnKTtcbiAgICAgICAgICAgIHZhciBkb3RJZHggPSBzZWwuaW5kZXhPZignLicsIGhhc2hJZHgpO1xuICAgICAgICAgICAgdmFyIGhhc2ggPSBoYXNoSWR4ID4gMCA/IGhhc2hJZHggOiBzZWwubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGRvdCA9IGRvdElkeCA+IDAgPyBkb3RJZHggOiBzZWwubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHRhZyA9IGhhc2hJZHggIT09IC0xIHx8IGRvdElkeCAhPT0gLTEgPyBzZWwuc2xpY2UoMCwgTWF0aC5taW4oaGFzaCwgZG90KSkgOiBzZWw7XG4gICAgICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gaXNEZWYoZGF0YSkgJiYgaXNEZWYoaSA9IGRhdGEubnMpID8gYXBpLmNyZWF0ZUVsZW1lbnROUyhpLCB0YWcpXG4gICAgICAgICAgICAgICAgOiBhcGkuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICAgICAgaWYgKGhhc2ggPCBkb3QpXG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnaWQnLCBzZWwuc2xpY2UoaGFzaCArIDEsIGRvdCkpO1xuICAgICAgICAgICAgaWYgKGRvdElkeCA+IDApXG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBzZWwuc2xpY2UoZG90ICsgMSkucmVwbGFjZSgvXFwuL2csICcgJykpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmNyZWF0ZVtpXShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGlmIChpcy5hcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgYXBpLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7IC8vIFJldXNlIHZhcmlhYmxlXG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaS5jcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIGkuY3JlYXRlKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChpLmluc2VydClcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2godm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bm9kZS5lbG07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgYmVmb3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpbnZva2VEZXN0cm95SG9vayh2bm9kZSkge1xuICAgICAgICB2YXIgaSwgaiwgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5kZXN0cm95KSlcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuZGVzdHJveS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuZGVzdHJveVtpXSh2bm9kZSk7XG4gICAgICAgICAgICBpZiAodm5vZGUuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBpID0gdm5vZGUuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9IG51bGwgJiYgdHlwZW9mIGkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZURlc3Ryb3lIb29rKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgaV8xID0gdm9pZCAwLCBsaXN0ZW5lcnMgPSB2b2lkIDAsIHJtID0gdm9pZCAwLCBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RlZihjaC5zZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGludm9rZURlc3Ryb3lIb29rKGNoKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gY2JzLnJlbW92ZS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgICAgICBybSA9IGNyZWF0ZVJtQ2IoY2guZWxtLCBsaXN0ZW5lcnMpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGlfMSA9IDA7IGlfMSA8IGNicy5yZW1vdmUubGVuZ3RoOyArK2lfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNicy5yZW1vdmVbaV8xXShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWYoaV8xID0gY2guZGF0YSkgJiYgaXNEZWYoaV8xID0gaV8xLmhvb2spICYmIGlzRGVmKGlfMSA9IGlfMS5yZW1vdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpXzEoY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IC8vIFRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50RWxtLCBjaC5lbG0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBvbGRTdGFydElkeCA9IDAsIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICAgICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRTdGFydFZub2RlID0gb2xkQ2hbMF07XG4gICAgICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWzBdO1xuICAgICAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgICAgICB2YXIgb2xkS2V5VG9JZHg7XG4gICAgICAgIHZhciBpZHhJbk9sZDtcbiAgICAgICAgdmFyIGVsbVRvTW92ZTtcbiAgICAgICAgdmFyIGJlZm9yZTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07IC8vIFZub2RlIG1pZ2h0IGhhdmUgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvbGRFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7IC8vIFZub2RlIG1vdmVkIHJpZ2h0XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhvbGRFbmRWbm9kZS5lbG0pKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7IC8vIFZub2RlIG1vdmVkIGxlZnRcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBvbGRFbmRWbm9kZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkS2V5VG9JZHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRLZXlUb0lkeCA9IGNyZWF0ZUtleVRvT2xkSWR4KG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4SW5PbGQgPSBvbGRLZXlUb0lkeFtuZXdTdGFydFZub2RlLmtleV07XG4gICAgICAgICAgICAgICAgaWYgKGlzVW5kZWYoaWR4SW5PbGQpKSB7IC8vIE5ldyBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbG1Ub01vdmUgPSBvbGRDaFtpZHhJbk9sZF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG1Ub01vdmUuc2VsICE9PSBuZXdTdGFydFZub2RlLnNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRjaFZub2RlKGVsbVRvTW92ZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZENoW2lkeEluT2xkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBlbG1Ub01vdmUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4IHx8IG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlID0gbmV3Q2hbbmV3RW5kSWR4ICsgMV0gPT0gbnVsbCA/IG51bGwgOiBuZXdDaFtuZXdFbmRJZHggKyAxXS5lbG07XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCBuZXdDaCwgbmV3U3RhcnRJZHgsIG5ld0VuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBob29rO1xuICAgICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmRhdGEpICYmIGlzRGVmKGhvb2sgPSBpLmhvb2spICYmIGlzRGVmKGkgPSBob29rLnByZXBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgIHZhciBvbGRDaCA9IG9sZFZub2RlLmNoaWxkcmVuO1xuICAgICAgICB2YXIgY2ggPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKG9sZFZub2RlID09PSB2bm9kZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHZub2RlLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy51cGRhdGUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLnVwZGF0ZVtpXShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vaztcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSAmJiBpc0RlZihpID0gaS51cGRhdGUpKVxuICAgICAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKG9sZENoKSAmJiBpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkQ2ggIT09IGNoKVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDaGlsZHJlbihlbG0sIG9sZENoLCBjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSlcbiAgICAgICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhlbG0sIG51bGwsIGNoLCAwLCBjaC5sZW5ndGggLSAxLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2xkVm5vZGUudGV4dCAhPT0gdm5vZGUudGV4dCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sIHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0RlZihob29rKSAmJiBpc0RlZihpID0gaG9vay5wb3N0cGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBhdGNoKG9sZFZub2RlLCB2bm9kZSkge1xuICAgICAgICB2YXIgaSwgZWxtLCBwYXJlbnQ7XG4gICAgICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wcmUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucHJlW2ldKCk7XG4gICAgICAgIGlmICghaXNWbm9kZShvbGRWbm9kZSkpIHtcbiAgICAgICAgICAgIG9sZFZub2RlID0gZW1wdHlOb2RlQXQob2xkVm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYW1lVm5vZGUob2xkVm5vZGUsIHZub2RlKSkge1xuICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgICAgICBwYXJlbnQgPSBhcGkucGFyZW50Tm9kZShlbG0pO1xuICAgICAgICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50LCB2bm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhlbG0pKTtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50LCBbb2xkVm5vZGVdLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWVbaV0uZGF0YS5ob29rLmluc2VydChpbnNlcnRlZFZub2RlUXVldWVbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucG9zdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wb3N0W2ldKCk7XG4gICAgICAgIHJldHVybiB2bm9kZTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c25hYmJkb20uanMubWFwIiwiaW1wb3J0IHsgaCB9IGZyb20gJy4vaCc7XG5mdW5jdGlvbiBjb3B5VG9UaHVuayh2bm9kZSwgdGh1bmspIHtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG4gICAgdm5vZGUuZGF0YS5mbiA9IHRodW5rLmRhdGEuZm47XG4gICAgdm5vZGUuZGF0YS5hcmdzID0gdGh1bmsuZGF0YS5hcmdzO1xuICAgIHRodW5rLmRhdGEgPSB2bm9kZS5kYXRhO1xuICAgIHRodW5rLmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgdGh1bmsudGV4dCA9IHZub2RlLnRleHQ7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xufVxuZnVuY3Rpb24gaW5pdCh0aHVuaykge1xuICAgIHZhciBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciB2bm9kZSA9IGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGN1ci5hcmdzKTtcbiAgICBjb3B5VG9UaHVuayh2bm9kZSwgdGh1bmspO1xufVxuZnVuY3Rpb24gcHJlcGF0Y2gob2xkVm5vZGUsIHRodW5rKSB7XG4gICAgdmFyIGksIG9sZCA9IG9sZFZub2RlLmRhdGEsIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIG9sZEFyZ3MgPSBvbGQuYXJncywgYXJncyA9IGN1ci5hcmdzO1xuICAgIGlmIChvbGQuZm4gIT09IGN1ci5mbiB8fCBvbGRBcmdzLmxlbmd0aCAhPT0gYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY29weVRvVGh1bmsoY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyksIHRodW5rKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAob2xkQXJnc1tpXSAhPT0gYXJnc1tpXSkge1xuICAgICAgICAgICAgY29weVRvVGh1bmsoY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyksIHRodW5rKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb3B5VG9UaHVuayhvbGRWbm9kZSwgdGh1bmspO1xufVxuZXhwb3J0IHZhciB0aHVuayA9IGZ1bmN0aW9uIHRodW5rKHNlbCwga2V5LCBmbiwgYXJncykge1xuICAgIGlmIChhcmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXJncyA9IGZuO1xuICAgICAgICBmbiA9IGtleTtcbiAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gaChzZWwsIHtcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIGhvb2s6IHsgaW5pdDogaW5pdCwgcHJlcGF0Y2g6IHByZXBhdGNoIH0sXG4gICAgICAgIGZuOiBmbixcbiAgICAgICAgYXJnczogYXJnc1xuICAgIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IHRodW5rO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGh1bmsuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIHZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIGVsbSkge1xuICAgIHZhciBrZXkgPSBkYXRhID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBkYXRhLmtleTtcbiAgICByZXR1cm4geyBzZWw6IHNlbCwgZGF0YTogZGF0YSwgY2hpbGRyZW46IGNoaWxkcmVuLCB0ZXh0OiB0ZXh0LCBlbG06IGVsbSwga2V5OiBrZXkgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IHZub2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dm5vZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVQcm9wcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBjdXIsIG9sZCwgZWxtID0gdm5vZGUuZWxtLCBvbGRQcm9wcyA9IG9sZFZub2RlLmRhdGEucHJvcHMsIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcztcbiAgICBpZiAoIW9sZFByb3BzICYmICFwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRQcm9wcyA9PT0gcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRQcm9wcyA9IG9sZFByb3BzIHx8IHt9O1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgZm9yIChrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgaWYgKCFwcm9wc1trZXldKSB7XG4gICAgICAgICAgICBkZWxldGUgZWxtW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgY3VyID0gcHJvcHNba2V5XTtcbiAgICAgICAgb2xkID0gb2xkUHJvcHNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyICYmIChrZXkgIT09ICd2YWx1ZScgfHwgZWxtW2tleV0gIT09IGN1cikpIHtcbiAgICAgICAgICAgIGVsbVtrZXldID0gY3VyO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5wcm9wc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVQcm9wcywgdXBkYXRlOiB1cGRhdGVQcm9wcyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5wcm9wc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMudXNlUmVmID0gZXhwb3J0cy5RdWlja1JvdXRlckxpbmsgPSBleHBvcnRzLmNyZWF0ZVBvcFN0YXRlID0gZXhwb3J0cy5RdWlja1JvdXRlciA9IHZvaWQgMDtcclxuY29uc3QgcXVpY2tqc19jb21wb25lbnRfMSA9IHJlcXVpcmUoXCJxdWlja2pzLWNvbXBvbmVudFwiKTtcclxuY29uc3QgcXVpY2tfZXJyb3JfMSA9IHJlcXVpcmUoXCJxdWljay1lcnJvclwiKTtcclxuY29uc3QgcGF0aFRvUmVnZXggPSAocGF0aCkgPT4gbmV3IFJlZ0V4cChcIl5cIiArIHBhdGgucmVwbGFjZSgvXFwvL2csIFwiXFxcXC9cIikucmVwbGFjZSgvOlxcdysvZywgXCIoLispXCIpICsgXCIkXCIpO1xyXG5jb25zdCBnZXRQYXJhbXMgPSAobWF0Y2gpID0+IHtcclxuICAgIGlmIChtYXRjaC5yZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ldyBxdWlja19lcnJvcl8xLmRlZmF1bHQoXCJtaXNzaW5nIHJlcXVpcmVkIHBhcmFtc1wiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbHVlcyA9IG1hdGNoLnJlc3VsdC5zbGljZSgxKTtcclxuICAgIGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKG1hdGNoLnJvdXRlLnBhdGgubWF0Y2hBbGwoLzooXFx3KykvZykpLm1hcCgocmVzdWx0KSA9PiByZXN1bHRbMV0pO1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGtleXMubWFwKChrZXksIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVzW2ldXTtcclxuICAgIH0pKTtcclxufTtcclxuY2xhc3MgUXVpY2tSb3V0ZXIge1xyXG4gICAgYXN5bmMgdXNlUm91dGUocm91dGVzLCB1cmwpIHtcclxuICAgICAgICBpZiAocm91dGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KFwicm91dGVzIGNhbm5vdCBiZSBlbXB0eVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDaGVjayBpZiByb3V0ZSBtYXRjaGVzIFVSTFxyXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSByb3V0ZXMubWFwKChyb3V0ZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IHJvdXRlLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaChwYXRoVG9SZWdleChyb3V0ZS5wYXRoKSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZmluZE1hdGNoID0gbWF0Y2hlcy5maW5kKChtYXRjaCkgPT4gbWF0Y2gucmVzdWx0ICE9PSBudWxsKTtcclxuICAgICAgICBpZiAoIWZpbmRNYXRjaCkge1xyXG4gICAgICAgICAgICBmaW5kTWF0Y2ggPSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogcm91dGVzLmZpbmQoKHJvdXRlKSA9PiByb3V0ZS5wYXRoID09PSBcIi9lcnJvclwiKSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogW2xvY2F0aW9uLnBhdGhuYW1lXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IGZpbmRNYXRjaC5yb3V0ZS52aWV3KGdldFBhcmFtcyhmaW5kTWF0Y2gpKTtcclxuICAgICAgICAgICAgcXVpY2tqc19jb21wb25lbnRfMS5kZWZhdWx0LnZpZXcoYXdhaXQgdmlldy5yZW5kZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgZmluZE1hdGNoLnJvdXRlLnZpZXcoZ2V0UGFyYW1zKGZpbmRNYXRjaCkpO1xyXG4gICAgICAgIHF1aWNranNfY29tcG9uZW50XzEuZGVmYXVsdC52aWV3KGF3YWl0IHZpZXcucmVuZGVyKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0VGl0bGUoZmluZE1hdGNoLnJvdXRlLnRpdGxlKTtcclxuICAgICAgICByZXR1cm4gcm91dGVzO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgZ2V0Um91dGUoY2FsbGJhY2spIHtcclxuICAgICAgICBjb25zdCBmcm9tID0gZG9jdW1lbnQucmVmZXJyZXI7XHJcbiAgICAgICAgY29uc3QgdG8gPSBsb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBGdW5jdGlvbjtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZnVsbFBhdGg6IGxvY2F0aW9uLmhyZWYsXHJcbiAgICAgICAgICAgICAgICBwYXRobmFtZTogbG9jYXRpb24ucGF0aG5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgY2FsbGJhY2socm91dGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvLFxyXG4gICAgICAgICAgICBmcm9tLCByb3V0ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBjcmVhdGVOYXZpZ2F0aW9uKHJvdXRlcykge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQubG9jYWxOYW1lID09PSBcImFcIikge1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgZS50YXJnZXQuaHJlZik7XHJcbiAgICAgICAgICAgICAgICBRdWlja1JvdXRlci5wcm90b3R5cGUudXNlUm91dGUocm91dGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0VGl0bGUodGl0bGUpIHtcclxuICAgICAgICBpZiAodGl0bGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiUXVpY2sgQXBwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlF1aWNrUm91dGVyID0gUXVpY2tSb3V0ZXI7XHJcbjtcclxuZnVuY3Rpb24gY3JlYXRlUG9wU3RhdGUocm91dGVzKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsICgpID0+IHtcclxuICAgICAgICBRdWlja1JvdXRlci5wcm90b3R5cGUudXNlUm91dGUocm91dGVzKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlUG9wU3RhdGUgPSBjcmVhdGVQb3BTdGF0ZTtcclxuY2xhc3MgUXVpY2tSb3V0ZXJMaW5rIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBjb25zdCB0ID0gdGhpcztcclxuICAgICAgICBjb25zdCBsaW5rVG8gPSB0aGlzLmdldEF0dHJpYnV0ZSgndG8nKTtcclxuICAgICAgICBpZiAoIWxpbmtUbykge1xyXG4gICAgICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KGB0byBhdHRyaWJ1dGUgbXVzdCBiZSBzcGVjaWZpZWQgdG8gcm91dGUsIHF1aWNrLWxpbmsgcmV0dXJuZWQgJHtsaW5rVG99YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGN1c3RvbVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBjdXN0b21UYWcuaHJlZiA9IGxpbmtUbztcclxuICAgICAgICBjdXN0b21UYWcuaW5uZXJIVE1MID0gdGhpcy5pbm5lckhUTUw7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKFwicmVmXCIpKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVRhZy5pZCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwicmVmXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKSkge1xyXG4gICAgICAgICAgICBjdXN0b21UYWcuaWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcImlkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZShjdXN0b21UYWcsIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5jaGlsZHJlbik7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJIVE1MID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVRhZy5pbm5lclRleHQgPSB0aGlzLmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYkkgPSB0aGlzLmF0dHJpYnV0ZXNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgdGhpcy5hdHRyaWJ1dGVzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJBID0gdGhpcy5hdHRyaWJ1dGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYkkubmFtZSA9PT0gXCJ0b1wiKSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21UYWcuc2V0QXR0cmlidXRlKGAke2F0dHJpYkkubmFtZX1gLCBgJHthdHRyaWJJLnZhbHVlfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5RdWlja1JvdXRlckxpbmsgPSBRdWlja1JvdXRlckxpbms7XHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3F1aWNrLXJvdXRlci1saW5rJywgUXVpY2tSb3V0ZXJMaW5rKTtcclxucXVpY2tqc19jb21wb25lbnRfMS5kZWZhdWx0LnVzZShRdWlja1JvdXRlckxpbmspO1xyXG5jbGFzcyB1c2VSZWYge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgYXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcHA/LmNoaWxkcmVuKTtcclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZShcImlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnVzZVJlZiA9IHVzZVJlZjtcclxuIiwiXG4vLyBBbGwgU1ZHIGNoaWxkcmVuIGVsZW1lbnRzLCBub3QgaW4gdGhpcyBsaXN0LCBzaG91bGQgc2VsZi1jbG9zZVxuXG5leHBvcnRzLkNPTlRBSU5FUiA9IHtcbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHL2ludHJvLmh0bWwjVGVybUNvbnRhaW5lckVsZW1lbnRcbiAgJ2EnOiB0cnVlLFxuICAnZGVmcyc6IHRydWUsXG4gICdnbHlwaCc6IHRydWUsXG4gICdnJzogdHJ1ZSxcbiAgJ21hcmtlcic6IHRydWUsXG4gICdtYXNrJzogdHJ1ZSxcbiAgJ21pc3NpbmctZ2x5cGgnOiB0cnVlLFxuICAncGF0dGVybic6IHRydWUsXG4gICdzdmcnOiB0cnVlLFxuICAnc3dpdGNoJzogdHJ1ZSxcbiAgJ3N5bWJvbCc6IHRydWUsXG4gICd0ZXh0JzogdHJ1ZSxcblxuICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcvaW50cm8uaHRtbCNUZXJtRGVzY3JpcHRpdmVFbGVtZW50XG4gICdkZXNjJzogdHJ1ZSxcbiAgJ21ldGFkYXRhJzogdHJ1ZSxcbiAgJ3RpdGxlJzogdHJ1ZVxufVxuXG4vLyBodHRwOi8vd3d3LnczLm9yZy9odG1sL3dnL2RyYWZ0cy9odG1sL21hc3Rlci9zeW50YXguaHRtbCN2b2lkLWVsZW1lbnRzXG5cbmV4cG9ydHMuVk9JRCA9IHtcbiAgYXJlYTogdHJ1ZSxcbiAgYmFzZTogdHJ1ZSxcbiAgYnI6IHRydWUsXG4gIGNvbDogdHJ1ZSxcbiAgZW1iZWQ6IHRydWUsXG4gIGhyOiB0cnVlLFxuICBpbWc6IHRydWUsXG4gIGlucHV0OiB0cnVlLFxuICBrZXlnZW46IHRydWUsXG4gIGxpbms6IHRydWUsXG4gIG1ldGE6IHRydWUsXG4gIHBhcmFtOiB0cnVlLFxuICBzb3VyY2U6IHRydWUsXG4gIHRyYWNrOiB0cnVlLFxuICB3YnI6IHRydWVcbn1cbiIsIlxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxudmFyIHBhcnNlU2VsZWN0b3IgPSByZXF1aXJlKCdwYXJzZS1zZWwnKVxudmFyIFZPSURfRUxFTUVOVFMgPSByZXF1aXJlKCcuL2VsZW1lbnRzJykuVk9JRFxudmFyIENPTlRBSU5FUl9FTEVNRU5UUyA9IHJlcXVpcmUoJy4vZWxlbWVudHMnKS5DT05UQUlORVJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbml0IChtb2R1bGVzKSB7XG4gIGZ1bmN0aW9uIHBhcnNlICh2bm9kZSwgbm9kZSkge1xuICAgIHZhciByZXN1bHQgPSBbXVxuICAgIHZhciBhdHRyaWJ1dGVzID0gbmV3IE1hcChbXG4gICAgICAvLyBUaGVzZSBjYW4gYmUgb3ZlcndyaXR0ZW4gYmVjYXVzZSB0aGF04oCZcyB3aGF0IGhhcHBlbnMgaW4gc25hYmJkb21cbiAgICAgIFsnaWQnLCBub2RlLmlkXSxcbiAgICAgIFsnY2xhc3MnLCBub2RlLmNsYXNzTmFtZV1cbiAgICBdKVxuXG4gICAgbW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChmbiwgaW5kZXgpIHtcbiAgICAgIGZuKHZub2RlLCBhdHRyaWJ1dGVzKVxuICAgIH0pXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGtleSArICc9XCInICsgdmFsdWUgKyAnXCInKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbmRlclRvU3RyaW5nICh2bm9kZSkge1xuICAgIGlmICh0eXBlb2Ygdm5vZGUgPT09ICd1bmRlZmluZWQnIHx8IHZub2RlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICBpZiAoIXZub2RlLnNlbCAmJiB0eXBlb2Ygdm5vZGUudGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlc2NhcGUodm5vZGUudGV4dClcbiAgICB9XG5cbiAgICB2bm9kZS5kYXRhID0gdm5vZGUuZGF0YSB8fCB7fVxuXG4gICAgLy8gU3VwcG9ydCB0aHVua3NcbiAgICBpZiAodm5vZGUuZGF0YS5ob29rICYmXG4gICAgICB0eXBlb2Ygdm5vZGUuZGF0YS5ob29rLmluaXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiB2bm9kZS5kYXRhLmZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2bm9kZS5kYXRhLmhvb2suaW5pdCh2bm9kZSlcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IHBhcnNlU2VsZWN0b3Iodm5vZGUuc2VsKVxuICAgIHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lXG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBwYXJzZSh2bm9kZSwgbm9kZSlcbiAgICB2YXIgc3ZnID0gdm5vZGUuZGF0YS5ucyA9PT0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ1xuICAgIHZhciB0YWcgPSBbXVxuXG4gICAgaWYgKHRhZ05hbWUgPT09ICchJykge1xuICAgICAgcmV0dXJuICc8IS0tJyArIHZub2RlLnRleHQgKyAnLS0+J1xuICAgIH1cblxuICAgIC8vIE9wZW4gdGFnXG4gICAgdGFnLnB1c2goJzwnICsgdGFnTmFtZSlcbiAgICBpZiAoYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgIHRhZy5wdXNoKCcgJyArIGF0dHJpYnV0ZXMpXG4gICAgfVxuICAgIGlmIChzdmcgJiYgQ09OVEFJTkVSX0VMRU1FTlRTW3RhZ05hbWVdICE9PSB0cnVlKSB7XG4gICAgICB0YWcucHVzaCgnIC8nKVxuICAgIH1cbiAgICB0YWcucHVzaCgnPicpXG5cbiAgICAvLyBDbG9zZSB0YWcsIGlmIG5lZWRlZFxuICAgIGlmICgoVk9JRF9FTEVNRU5UU1t0YWdOYW1lXSAhPT0gdHJ1ZSAmJiAhc3ZnKSB8fFxuICAgICAgICAoc3ZnICYmIENPTlRBSU5FUl9FTEVNRU5UU1t0YWdOYW1lXSA9PT0gdHJ1ZSkpIHtcbiAgICAgIGlmICh2bm9kZS5kYXRhLnByb3BzICYmIHZub2RlLmRhdGEucHJvcHMuaW5uZXJIVE1MKSB7XG4gICAgICAgIHRhZy5wdXNoKHZub2RlLmRhdGEucHJvcHMuaW5uZXJIVE1MKVxuICAgICAgfSBlbHNlIGlmICh2bm9kZS50ZXh0KSB7XG4gICAgICAgIHRhZy5wdXNoKGVzY2FwZSh2bm9kZS50ZXh0KSlcbiAgICAgIH0gZWxzZSBpZiAodm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgdm5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICB0YWcucHVzaChyZW5kZXJUb1N0cmluZyhjaGlsZCkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICB0YWcucHVzaCgnPC8nICsgdGFnTmFtZSArICc+JylcbiAgICB9XG5cbiAgICByZXR1cm4gdGFnLmpvaW4oJycpXG4gIH1cbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxuXG4vLyBkYXRhLmF0dHJzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXR0cnNNb2R1bGUgKHZub2RlLCBhdHRyaWJ1dGVzKSB7XG4gIHZhciBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnMgfHwge31cblxuICBmb3JPd24oYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgYXR0cmlidXRlcy5zZXQoa2V5LCBlc2NhcGUodmFsdWUpKVxuICB9KVxufVxuIiwiXG52YXIgZm9yT3duID0gcmVxdWlyZSgnbG9kYXNoLmZvcm93bicpXG52YXIgcmVtb3ZlID0gcmVxdWlyZSgnbG9kYXNoLnJlbW92ZScpXG52YXIgdW5pcSA9IHJlcXVpcmUoJ2xvZGFzaC51bmlxJylcblxuLy8gZGF0YS5jbGFzc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsYXNzTW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgdmFsdWVzXG4gIHZhciBfYWRkID0gW11cbiAgdmFyIF9yZW1vdmUgPSBbXVxuICB2YXIgY2xhc3NlcyA9IHZub2RlLmRhdGEuY2xhc3MgfHwge31cbiAgdmFyIGV4aXN0aW5nID0gYXR0cmlidXRlcy5nZXQoJ2NsYXNzJylcbiAgZXhpc3RpbmcgPSBleGlzdGluZy5sZW5ndGggPiAwID8gZXhpc3Rpbmcuc3BsaXQoJyAnKSA6IFtdXG5cbiAgZm9yT3duKGNsYXNzZXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICBfYWRkLnB1c2goa2V5KVxuICAgIH0gZWxzZSB7XG4gICAgICBfcmVtb3ZlLnB1c2goa2V5KVxuICAgIH1cbiAgfSlcblxuICB2YWx1ZXMgPSByZW1vdmUodW5pcShleGlzdGluZy5jb25jYXQoX2FkZCkpLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gX3JlbW92ZS5pbmRleE9mKHZhbHVlKSA8IDBcbiAgfSlcblxuICBpZiAodmFsdWVzLmxlbmd0aCkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KCdjbGFzcycsIHZhbHVlcy5qb2luKCcgJykpXG4gIH1cbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxuXG4vLyBkYXRhLmRhdGFzZXRcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXRhc2V0TW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgZGF0YXNldCA9IHZub2RlLmRhdGEuZGF0YXNldCB8fCB7fVxuXG4gIGZvck93bihkYXRhc2V0LCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KGBkYXRhLSR7a2V5fWAsIGVzY2FwZSh2YWx1ZSkpXG4gIH0pXG59XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjbGFzczogcmVxdWlyZSgnLi9jbGFzcycpLFxuICBwcm9wczogcmVxdWlyZSgnLi9wcm9wcycpLFxuICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKSxcbiAgZGF0YXNldDogcmVxdWlyZSgnLi9kYXRhc2V0Jylcbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvZWxlbWVudFxudmFyIG9taXQgPSBbXG4gICdhdHRyaWJ1dGVzJyxcbiAgJ2NoaWxkRWxlbWVudENvdW50JyxcbiAgJ2NoaWxkcmVuJyxcbiAgJ2NsYXNzTGlzdCcsXG4gICdjbGllbnRIZWlnaHQnLFxuICAnY2xpZW50TGVmdCcsXG4gICdjbGllbnRUb3AnLFxuICAnY2xpZW50V2lkdGgnLFxuICAnY3VycmVudFN0eWxlJyxcbiAgJ2ZpcnN0RWxlbWVudENoaWxkJyxcbiAgJ2lubmVySFRNTCcsXG4gICdsYXN0RWxlbWVudENoaWxkJyxcbiAgJ25leHRFbGVtZW50U2libGluZycsXG4gICdvbmdvdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ29ubG9zdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ29ud2hlZWwnLFxuICAnb3V0ZXJIVE1MJyxcbiAgJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnLFxuICAncnVudGltZVN0eWxlJyxcbiAgJ3Njcm9sbEhlaWdodCcsXG4gICdzY3JvbGxMZWZ0JyxcbiAgJ3Njcm9sbExlZnRNYXgnLFxuICAnc2Nyb2xsVG9wJyxcbiAgJ3Njcm9sbFRvcE1heCcsXG4gICdzY3JvbGxXaWR0aCcsXG4gICd0YWJTdG9wJyxcbiAgJ3RhZ05hbWUnXG5dXG5cbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjYm9vbGVhbi1hdHRyaWJ1dGVzXG52YXIgYm9vbGVhbkF0dHJpYnV0ZXMgPSBbXG4gICdkaXNhYmxlZCcsXG4gICd2aXNpYmxlJyxcbiAgJ2NoZWNrZWQnLFxuICAncmVhZG9ubHknLFxuICAncmVxdWlyZWQnLFxuICAnYWxsb3dmdWxsc2NyZWVuJyxcbiAgJ2F1dG9mb2N1cycsXG4gICdhdXRvcGxheScsXG4gICdjb21wYWN0JyxcbiAgJ2NvbnRyb2xzJyxcbiAgJ2RlZmF1bHQnLFxuICAnZm9ybW5vdmFsaWRhdGUnLFxuICAnaGlkZGVuJyxcbiAgJ2lzbWFwJyxcbiAgJ2l0ZW1zY29wZScsXG4gICdsb29wJyxcbiAgJ211bHRpcGxlJyxcbiAgJ211dGVkJyxcbiAgJ25vcmVzaXplJyxcbiAgJ25vc2hhZGUnLFxuICAnbm92YWxpZGF0ZScsXG4gICdub3dyYXAnLFxuICAnb3BlbicsXG4gICdyZXZlcnNlZCcsXG4gICdzZWFtbGVzcycsXG4gICdzZWxlY3RlZCcsXG4gICdzb3J0YWJsZScsXG4gICd0cnVlc3BlZWQnLFxuICAndHlwZW11c3RtYXRjaCdcbl1cblxuLy8gZGF0YS5wcm9wc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHByb3BzTW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzIHx8IHt9XG5cbiAgZm9yT3duKHByb3BzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGlmIChvbWl0LmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGtleSA9PT0gJ2h0bWxGb3InKSB7XG4gICAgICBrZXkgPSAnZm9yJ1xuICAgIH1cbiAgICBpZiAoa2V5ID09PSAnY2xhc3NOYW1lJykge1xuICAgICAga2V5ID0gJ2NsYXNzJ1xuICAgIH1cblxuICAgIHZhciBsa2V5ID0ga2V5LnRvTG93ZXJDYXNlKClcbiAgICBpZiAofmJvb2xlYW5BdHRyaWJ1dGVzLmluZGV4T2YobGtleSkpIHtcbiAgICAgIGlmICh2YWx1ZSkgeyAvLyBzZXQgYXR0ciBvbmx5IHdoZW4gdHJ1dGh5XG4gICAgICAgIGF0dHJpYnV0ZXMuc2V0KGxrZXksIGxrZXkpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGF0dHJpYnV0ZXMuc2V0KGxrZXksIGVzY2FwZSh2YWx1ZSkpXG4gICAgfVxuICB9KVxufVxuIiwiXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXG52YXIgZm9yT3duID0gcmVxdWlyZSgnbG9kYXNoLmZvcm93bicpXG52YXIgZXNjYXBlID0gcmVxdWlyZSgnbG9kYXNoLmVzY2FwZScpXG52YXIga2ViYWJDYXNlID0gcmVxdWlyZSgnbG9kYXNoLmtlYmFiY2FzZScpXG5cbi8vIGRhdGEuc3R5bGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHlsZU1vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHZhbHVlcyA9IFtdXG4gIHZhciBzdHlsZSA9IHZub2RlLmRhdGEuc3R5bGUgfHwge31cblxuICAvLyBtZXJnZSBpbiBgZGVsYXllZGAgcHJvcGVydGllc1xuICBpZiAoc3R5bGUuZGVsYXllZCkge1xuICAgIGFzc2lnbihzdHlsZSwgc3R5bGUuZGVsYXllZClcbiAgfVxuXG4gIGZvck93bihzdHlsZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAvLyBvbWl0IGhvb2sgb2JqZWN0c1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHZhciBrZWJhYktleSA9IGtlYmFiQ2FzZShrZXkpXG4gICAgICB2YWx1ZXMucHVzaCgoa2V5Lm1hdGNoKC9eLS0uKi8pID8gJy0tJyArIGtlYmFiS2V5IDoga2ViYWJLZXkpICsgJzogJyArIGVzY2FwZSh2YWx1ZSkpXG4gICAgfVxuICB9KVxuXG4gIGlmICh2YWx1ZXMubGVuZ3RoKSB7XG4gICAgYXR0cmlidXRlcy5zZXQoJ3N0eWxlJywgdmFsdWVzLmpvaW4oJzsgJykpXG4gIH1cbn1cbiIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIlxyXG5pbXBvcnQgeyBRdWlja1JvdXRlciwgY3JlYXRlUG9wU3RhdGUgfSBmcm9tIFwicXVpY2tqcy1yb3V0ZXJcIjtcclxuY29uc3Qgcm91dGVyID0gbmV3IFF1aWNrUm91dGVyO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuLi8uLi9zcmMvdmlld3MvQXBwXCJcclxuaW1wb3J0IEFib3V0IGZyb20gXCIuLi8uLi9zcmMvdmlld3MvQWJvdXRcIlxyXG5pbXBvcnQgTm90Rm91bmQgZnJvbSBcIi4uLy4uL3NyYy92aWV3cy9Ob3Rmb3VuZFwiXHJcbmNvbnN0ICByb3V0ZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJy8nLFxyXG4gICAgICAgIHZpZXc6IEFwcCxcclxuICAgICAgICB0aXRsZTogXCJIb21lXCIsXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICcvYWJvdXQnLFxyXG4gICAgICAgIHRpdGxlOiBcIkFib3V0XCIsXHJcbiAgICAgICAgdmlldzogQWJvdXRcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJy9lcnJvcicsXHJcbiAgICAgICAgdmlldzogTm90Rm91bmQsXHJcbiAgICAgICAgdGl0bGU6IFwiUGFnZSBOb3QgRm91bmRcIixcclxuICAgIH0sXHJcbl07XHJcblxyXG5RdWljay51c2Uocm91dGVyLnVzZVJvdXRlKHJvdXRlcykpO1xyXG5yb3V0ZXIuY3JlYXRlTmF2aWdhdGlvbihyb3V0ZXMpXHJcbmNyZWF0ZVBvcFN0YXRlKHJvdXRlcylcclxuZXhwb3J0IGRlZmF1bHQgcm91dGVzIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiXHJcblxyXG5cclxuY29uc3QgQWJvdXREZXRhaWwgPSBcIlF1aWNrLmpzIGlzIGEgY29uZmlndXJlZCBzZXJ2ZXIgc2lkZSAgc2luZ2xlIHBhZ2UgYXBwbGljYXRpb24gdGhhdCBsZXRzIHlvdSBjcmVhdGUgeW91ciBvd24gc2V2ZXIgc2lkZSBhcHBsaWNhdGlvbiBpbiBubyB0aW1lLlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYm91dCBleHRlbmRzIFF1aWNrLkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICBzdXBlcihwYXJhbXMpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbiBhYm91dC1jb24gdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTAgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgdG89XCIvXCIgY2xhc3NOYW1lPVwibXItMyB1bmRlcmxpbmVcIj5Ib21lPC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5LW5vcm1hbCB1bmRlcmxpbmUgYWN0aXZlXCIgdG89XCIvYWJvdXRcIj5BYm91dDwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nbyBtdC0xMCB3LTEwIHAtMSBtYXgtdy1tZCBibG9jayBtbC1hdXRvIG1yLWF1dG8gYW5pbWF0ZS1ib3VuY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInF1aWNrLWxvZ28gdy04XCIgc3JjPVwiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vc2VydmVyeWd1a2VuL2ltYWdlL3VwbG9hZC92MTYxNTE4ODk5Mi9RdWlja0pTL2xvZ28vcXVpY2tqcy1sb2dvX3dqeDNkdy5zdmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJvdXQtcGFnZSB0ZXh0LWNlbnRlciBtdC01IHRleHQtM3hsIHRleHQtYmxhY2sgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNXhsIHAtMSB3Yy10eHRcIj5BYm91dCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnktbm9ybWFsXCI+UXVpY2suanM8L3NwYW4+IDwvaDE+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsIHAtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJtdC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtBYm91dERldGFpbH1cclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJtdC02IGZvbnQtYm9sZFwiPkVjb3N5c3RlbSB8IEV4dGVybmFsIGxpbmtzPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibXQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgdG89XCIvXCIgZXh0ZXJuYWwgY2xhc3NOYW1lPVwibXItMyB1bmRlcmxpbmVcIj48bGk+UXVpY2tqcy1jb21wb25lbnQ8L2xpPjwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBleHRlcm5hbCBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPjxsaT5RdWlja2pzLXJvdXRlcjwvbGk+PC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGV4dGVybmFsIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+PGxpPlF1aWNranMtZG9tPC9saT48L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiXHJcbmltcG9ydCBXZWxjb21lIGZyb20gXCIuL1dlbGNvbWVcIjtcclxuaW1wb3J0IExpc3QgZnJvbSBcIi4vTGlzdFwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIFF1aWNrLkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICBzdXBlcihwYXJhbXMpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTAgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgdG89XCIvXCIgY2xhc3NOYW1lPVwibXItMyB0ZXh0LXByaW1hcnktbm9ybWFsIHVuZGVybGluZSBhY3RpdmVcIj5Ib21lPC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgdG89XCIvYWJvdXRcIiBjbGFzc05hbWU9XCJ1bmRlcmxpbmVcIj5BYm91dDwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nbyBtdC0xMCB3LTEwIHAtMSBtYXgtdy1tZCBibG9jayBtbC1hdXRvIG1yLWF1dG8gYW5pbWF0ZS1ib3VuY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInF1aWNrLWxvZ28gdy04XCIgc3JjPVwiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vc2VydmVyeWd1a2VuL2ltYWdlL3VwbG9hZC92MTYxNTE4ODk5Mi9RdWlja0pTL2xvZ28vcXVpY2tqcy1sb2dvX3dqeDNkdy5zdmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VsY29tZSB0ZXh0LWNlbnRlciBtdC01IHRleHQtM3hsIHRleHQtYmxhY2sgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFdlbGNvbWUgbmFtZT17XCJRdWljay5qc1wifSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYyBtdC02IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGg0PkdldCBzdGFydGVkIGJ5IGVkaXRpbmcgPHNwYW4gY2xhc3NOYW1lPVwiYmctc25vdyB0ZXh0LXNtIGZvbnQtbWVkaXVtIHAtMlwiPnNyYy92aWV3cy9BcHAuanM8L3NwYW4+PC9oND5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHAtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBMaXN0KCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtbWFpblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1jb24gbXQtMTBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LTEgZmxleCBqdXN0aWZ5LWFyb3VuZFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0IHJvdW5kZWQgc2hhZG93LXNtIHAtMiB3LTUvMTIgY3Vyc29yLXBvaW50ZXIgbWF4LXctbWQgIGJvcmRlciAgIGJvcmRlci1ncmF5LTIwMCBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIG10LTJcIj5Eb2N1bWVudGF0aW9uIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTJcIj48c3ZnIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdy02IC1tYi0xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIGQ9XCJNMTQgNWw3IDdtMCAwbC03IDdtNy03SDNcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz48L3NwYW4+PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8L2RpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgZm9udC1tZWRpdW0gbXQtMiBtYi0zXCI+Q2hlY2sgb3V0IGRvY3VtZW50YXRpb24gb24gaG93IHRvIGdldCBzdGFydGVkIGFuZCBzZXR1cCB5b3VyIHByb2plY3Qgd2l0aCBRdWljay5qcy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdCByb3VuZGVkIHNoYWRvdy1zbSBwLTIgdy01LzEyIGN1cnNvci1wb2ludGVyIG1heC13LW1kIGJvcmRlciAgYm9yZGVyLWdyYXktMjAwIG10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGkgY2xhc3NOYW1lPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtYmxhY2sgZmxleCBpdGVtcy1jZW50ZXIgbXQtMlwiPkxlYXJuIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTJcIj48c3ZnIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdy02IC1tYi0xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIGQ9XCJNMTQgNWw3IDdtMCAwbC03IDdtNy03SDNcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz48L3NwYW4+PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8L2RpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgZm9udC1tZWRpdW0gbXQtMiBtYi0zXCI+TGVhcm4gYWJvdXQgUXVpY2suanMgYW5kIGl0J3MgZWNvc3lzdGVtLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LTIgZmxleCBqdXN0aWZ5LWFyb3VuZFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0IHJvdW5kZWQgc2hhZG93LXNtIHAtMiB3LTUvMTIgY3Vyc29yLXBvaW50ZXIgbWF4LXctbWQgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCAgbXQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ibGFjayBmbGV4IGl0ZW1zLWNlbnRlciBtdC0yXCI+RXhhbXBsZXMgPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5DaGVjayBvdXQgb24gcHJvamVjdHMgY3JlYXRlZCB3aXRoIFF1aWNrLmpzPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Qgcm91bmRlZCBzaGFkb3ctc20gcC0yIHctNS8xMiBtYXgtdy1tZCBib3JkZXIgY3Vyc29yLXBvaW50ZXIgIGJvcmRlci1ncmF5LTIwMCAgbXQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ibGFjayBmbGV4IGl0ZW1zLWNlbnRlciBtdC0yXCI+RGVwbG95IDxzcGFuIGNsYXNzTmFtZT1cIm1sLTJcIj48c3ZnIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdy02IC1tYi0xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIGQ9XCJNMTQgNWw3IDdtMCAwbC03IDdtNy03SDNcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz48L3NwYW4+PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8L2RpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgZm9udC1tZWRpdW0gbXQtMiBtYi0zXCI+V2UnbGwgc2hvdyB5b3UgaG93IHRvIGRlcGxveSB5b3VyIFF1aWNrLmpzIGFwcGxpY2F0aW9uIHRvIHByb2R1Y3Rpb24uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RcclxuXHJcbiIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgUXVpY2suQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAgKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYm91dC1wYWdlIHRleHQtY2VudGVyIG10LTEwIHRleHQtM3hsIHRleHQtYmxhY2sgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNXhsIHAtMSB3Yy10eHRcIj40MDQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5LW5vcm1hbFwiPk5PVCBGT1VORDwvc3Bhbj4gPC9oMT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPkhvbWU8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnktbm9ybWFsIHVuZGVybGluZSBhY3RpdmVcIiB0bz1cIi9hYm91dFwiPkFib3V0PC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59XHJcbiIsIi8vIFF1aWNrIG5lZWRzIHRvIGJlIGluaXRhaWxpemVkIHRvIHVzZSBqc3hcclxuaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiO1xyXG5cclxuXHJcbmNvbnN0IFdlbGNvbWUgPSAoe25hbWV9KSA9PiAoXHJcbiAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgcC0xIHdjLXR4dFwiPldlbGNvbWUgdG8gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5LW5vcm1hbFwiPntuYW1lfSE8L3NwYW4+IDwvaDE+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlbGNvbWUiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIlxyXG5pbXBvcnQgcm91dGVzIGZyb20gXCIuLi9zcmMvcm91dGVyL3JvdXRlc1wiO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9