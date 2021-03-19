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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
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

var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
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

    const isError = () => {
      return `
          
            <style>
                body {
                    height: 100vh;
                    background:#c7e2f1;
                }
            </style>
            <div style="height: 100vh; background:#c7e2f1; padding: 20px;">
            <h3 style="color: red;">TypeError: ${this.message}</h3>
            <p></p>
            <div class="error-con" style="background-color: #c7e2f1; border: 2px solid #38b6ff; padding: 8px 12px;">
                <div>${this.stack}</div>
            </div>
            </div>
           `;
    };

    document.getElementById("app").remove();
    document.getElementById("error").innerHTML = isError();
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

const snabbdom = __webpack_require__(/*! snabbdom */ "./node_modules/snabbdom/es/snabbdom.js");

const props_1 = __webpack_require__(/*! snabbdom/modules/props */ "./node_modules/snabbdom/modules/props.js");

const reconcile = snabbdom.init([props_1.default]);
const root = document.getElementById('app');

const snabbdom_1 = __webpack_require__(/*! snabbdom */ "./node_modules/snabbdom/es/snabbdom.js");

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

const render = (component, root) => {
  if (!component) {
    new quick_error_1.default('Cannot render without component');
  }

  if (!root) {
    new quick_error_1.default('Cannot render without DOM element');
  }

  if (!component && !root) {
    new quick_error_1.default('Cannot render without Component and DOM element');
  }

  reconcile(root, component);
};

const _init = () => {
  const fav = document.createElement('link');
  fav.href = '/favicon.ico';
  fav.rel = 'icon';
  const h = document.getElementsByTagName('head');
};

const $ = function (selector) {
  return document.querySelector(selector);
};

const componentLoaded = callback => {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      callback();
    }, 100);
  });
};

const listener = (target, type, fn, prevent) => {
  document.addEventListener(type, e => {
    if (e.target.id === target) {
      fn();
    }

    if (e.target.className === target) {
      fn();
    }
  });
};

const runBeforeDomLoaded = func => {
  document.addEventListener('DOMContentLoaded', () => {
    func;
  });
};

const view = view => {
  const renderViewtoHTML = toHTML(view);
  document.querySelector('#app').innerHTML = renderViewtoHTML;
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

const config = env => {
  if (env === 'production') {}

  if (env === 'development') {}

  if (!env || env === '') {}
};

const Quick = {
  Component,
  runBeforeDomLoaded,
  view,
  createElement,
  __updater,
  config,
  render,
  _init,
  listener,
  $,
  componentLoaded
};
Quick.runBeforeDomLoaded(Quick._init);
Quick.runBeforeDomLoaded(Quick.listener);
exports.default = Quick;

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

const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = match => {
  if (match.result === undefined) {
    new quick_error_1.default('missing required params');
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
      new quick_error_1.default('routes cannot be empty');
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
        route: routes.find(route => route.path === '/error'),
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
    window.addEventListener('click', e => {
      e.preventDefault();

      if (e.target.localName === 'a') {
        if (e.target.dataset.external) {
          location.href = e.target.href;
        } else {
          history.pushState(null, null, e.target.href);
        }

        QuickRouter.prototype.useRoute(routes);
      }
    });
  }

  setTitle(title) {
    if (title === undefined) {
      document.title = 'Quick App';
    } else {
      document.title = title;
    }
  }

}

exports.QuickRouter = QuickRouter;

function createPopState(routes) {
  window.addEventListener('popstate', () => {
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

    if (this.getAttribute('ref')) {
      customTag.id = this.getAttribute('ref');
    }

    if (this.getAttribute('id')) {
      customTag.id = this.getAttribute('id');
    }

    this.parentNode?.insertBefore(customTag, this);
    const children = Array.prototype.slice.call(this.children);

    if (this.innerHTML === '') {
      customTag.innerText = this.getAttribute('name');
    }

    for (let i = 0; i < this.attributes.length; i++) {
      const attribI = this.attributes[i];

      for (let a = 0; a < this.attributes.length; a++) {
        const attribA = this.attributes[i];

        if (attribI.name === 'to') {
          const href = 'href';
          attribI.name === href;
        } else {
          customTag.setAttribute(`${attribI.name}`, `${attribI.value}`);
        }
      }
    }

    this.remove();
  }

}

exports.QuickRouterLink = QuickRouterLink;
window.customElements.define('quick-router-link', QuickRouterLink);
quickjs_component_1.default.runBeforeDomLoaded(QuickRouterLink);

class useRef {
  constructor() {
    const app = document.getElementById('app');
    const children = Array.prototype.slice.call(app?.children);
    children.forEach(child => {
      if (child.getAttribute('id')) {
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

/***/ "./node_modules/snabbdom/es/h.js":
/*!***************************************!*\
  !*** ./node_modules/snabbdom/es/h.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ h),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./node_modules/snabbdom/es/vnode.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./node_modules/snabbdom/es/is.js");



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

/***/ "./node_modules/snabbdom/es/htmldomapi.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/es/htmldomapi.js ***!
  \************************************************/
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

/***/ "./node_modules/snabbdom/es/is.js":
/*!****************************************!*\
  !*** ./node_modules/snabbdom/es/is.js ***!
  \****************************************/
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

/***/ "./node_modules/snabbdom/es/snabbdom.js":
/*!**********************************************!*\
  !*** ./node_modules/snabbdom/es/snabbdom.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* reexport safe */ _h__WEBPACK_IMPORTED_MODULE_3__.h),
/* harmony export */   "thunk": () => (/* reexport safe */ _thunk__WEBPACK_IMPORTED_MODULE_4__.thunk),
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./node_modules/snabbdom/es/vnode.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./node_modules/snabbdom/es/is.js");
/* harmony import */ var _htmldomapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmldomapi */ "./node_modules/snabbdom/es/htmldomapi.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h */ "./node_modules/snabbdom/es/h.js");
/* harmony import */ var _thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thunk */ "./node_modules/snabbdom/es/thunk.js");




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

/***/ "./node_modules/snabbdom/es/thunk.js":
/*!*******************************************!*\
  !*** ./node_modules/snabbdom/es/thunk.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "thunk": () => (/* binding */ thunk),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h */ "./node_modules/snabbdom/es/h.js");


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

/***/ "./node_modules/snabbdom/es/vnode.js":
/*!*******************************************!*\
  !*** ./node_modules/snabbdom/es/vnode.js ***!
  \*******************************************/
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

/***/ "./node_modules/snabbdom/modules/props.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/props.js ***!
  \************************************************/
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
/* harmony import */ var _views_Todos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/Todos */ "./src/views/Todos.js");
/* harmony import */ var _views_Notfound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/Notfound */ "./src/views/Notfound.js");


const router = new quickjs_router__WEBPACK_IMPORTED_MODULE_1__.QuickRouter();


const routes = [{
  path: '/',
  view: _views_Todos__WEBPACK_IMPORTED_MODULE_2__.default,
  title: "Home"
}, {
  path: '/error',
  view: _views_Notfound__WEBPACK_IMPORTED_MODULE_3__.default,
  title: "Page Not Found"
}];
quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.runBeforeDomLoaded(router.useRoute(routes));
router.createNavigation(routes);
(0,quickjs_router__WEBPACK_IMPORTED_MODULE_1__.createPopState)(routes);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);

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
    return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "text-center mt-60"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
      className: "text-3xl font-bold"
    }, "Not Found")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: ""
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      className: "mr-3 underline"
    }, "Home")));
  }

}

/***/ }),

/***/ "./src/views/Todos.js":
/*!****************************!*\
  !*** ./src/views/Todos.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");
/* harmony import */ var _TodosList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodosList */ "./src/views/TodosList.js");


class Todo extends quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.Component {
  constructor(params) {
    super(params);
  }

  render() {
    return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "con mb-14"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
      className: "text-3xl text-center text-yellow-600 mt-20 font-bold"
    }, "Todos"), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_TodosList__WEBPACK_IMPORTED_MODULE_1__.default, null));
  }

}

/***/ }),

/***/ "./src/views/TodosList.js":
/*!********************************!*\
  !*** ./src/views/TodosList.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoList)
/* harmony export */ });
/* harmony import */ var quickjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quickjs-component */ "./node_modules/quickjs-component/lib/quick.js");

function TodoList(todo) {
  return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
    className: "todos-con w-11/12 block ml-auto mr-auto"
  }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
    className: "mt-20 todos-main flex items-center justify-center"
  }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("input", {
    id: "todoInput",
    type: "text",
    placeholder: "New Todo",
    className: "bg-gray-200 w-full p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-600"
  }), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("button", {
    id: "addTodoBtn",
    className: "bg-yellow-600 text-white rounded-sm w-40 ml-5 p-2 focus:outline-none"
  }, "Add Todo")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
    className: "todos-list"
  }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("ul", {
    id: "todos-list-con"
  })));
}

function setTodo() {
  const todoInput = document.getElementById("todoInput");
  todoInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
      if (todoInput.value !== "") {
        addTodo(todoInput.value);
      }

      todoInput.value = "";
    }
  });
  const addTodoBtn = document.getElementById("addTodoBtn");
  addTodoBtn.addEventListener("click", e => {
    if (todoInput.value !== "") {
      addTodo(todoInput.value);
    }

    todoInput.value = "";
  });
}

function addTodo(todo) {
  const todosContainer = document.getElementById("todos-list-con");
  todosContainer.addEventListener("click", completeOrDeleteTodo);
  const todoElement = document.createElement("li");
  todoElement.innerHTML = `
        <span>${todo}</span>
        <div class="flex">
        <button name="completeTodo" class="outline-none focus:outline-none">
            <svg name="completeTodo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" name="completeTodo"/>
        </svg>
        </button>

        <button name="deleteTodo" class="w-8 ml-6 outline-none focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 cursor-pointer" name="deleteTodo">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
        </button>
    </div>
        `;
  todoElement.classList.add("flex", "justify-between", "bg-gray-100", "mt-5", "p-2", "border-b", "border-yellow-600", "w-full");
  todosContainer.appendChild(todoElement);
}

function completeOrDeleteTodo(e) {
  if (e.target.tagName === "svg") {
    if (e.target.parentElement.name === "completeTodo") {
      let todo = e.target.parentElement.parentElement.parentElement.children[0];

      if (todo.style.textDecoration === "line-through") {
        todo.style.textDecoration = "none";
      } else {
        todo.style.textDecoration = "line-through";
      }
    }

    if (e.target.parentElement.name === "deleteTodo") {
      let todo = e.target.parentElement.parentElement.parentElement;
      todo.remove();
    }
  }

  if (e.target.tagName === "path") {
    if (e.target.parentElement.parentElement.name === "completeTodo") {
      let todo = e.target.parentElement.parentElement.parentElement.parentElement.children[0];

      if (todo.style.textDecoration === "line-through") {
        todo.style.textDecoration = "none";
      } else {
        todo.style.textDecoration = "line-through";
      }
    }

    if (e.target.parentElement.parentElement.name === "deleteTodo") {
      let todo = e.target.parentElement.parentElement.parentElement.parentElement;
      todo.remove();
    }
  }
}

quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.componentLoaded(setTodo);

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItc3BsaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmZvcm93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZWJhYmNhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVtb3ZlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcGFyc2Utc2VsL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcXVpY2stZXJyb3IvcXVpY2stZXJyb3IuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLWNvbXBvbmVudC9saWIvcXVpY2suanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLXJvdXRlci9saWIvcXVpY2stcm91dGVyLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvaW5pdC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uLi9zcmMvaC50cyIsIndlYnBhY2s6Ly9xdWlja2pzLy4uL3NyYy9odG1sZG9tYXBpLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL2lzLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3NuYWJiZG9tLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3RodW5rLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3Zub2RlLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL21vZHVsZXMvcHJvcHMudHMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy9yb3V0ZXIvcm91dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvTm90Zm91bmQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9Ub2Rvcy5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vc3JjL3ZpZXdzL1RvZG9zTGlzdC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9xdWlja2pzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9xdWlja2pzLy4vcHVibGljL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzcGxpdCIsInVuZGVmIiwibmF0aXZlU3BsaXQiLCJTdHJpbmciLCJwcm90b3R5cGUiLCJjb21wbGlhbnRFeGVjTnBjZyIsImV4ZWMiLCJzZWxmIiwic3RyIiwic2VwYXJhdG9yIiwibGltaXQiLCJPYmplY3QiLCJ0b1N0cmluZyIsImNhbGwiLCJvdXRwdXQiLCJmbGFncyIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJleHRlbmRlZCIsInN0aWNreSIsImxhc3RMYXN0SW5kZXgiLCJSZWdFeHAiLCJzb3VyY2UiLCJzZXBhcmF0b3IyIiwibWF0Y2giLCJsYXN0SW5kZXgiLCJsYXN0TGVuZ3RoIiwiaW5kZXgiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJyZXBsYWNlIiwiaSIsImFyZ3VtZW50cyIsIkFycmF5IiwiYXBwbHkiLCJ0ZXN0IiwiSU5GSU5JVFkiLCJzeW1ib2xUYWciLCJyZVVuZXNjYXBlZEh0bWwiLCJyZUhhc1VuZXNjYXBlZEh0bWwiLCJodG1sRXNjYXBlcyIsImZyZWVHbG9iYWwiLCJnbG9iYWwiLCJmcmVlU2VsZiIsInJvb3QiLCJGdW5jdGlvbiIsImJhc2VQcm9wZXJ0eU9mIiwib2JqZWN0Iiwia2V5IiwidW5kZWZpbmVkIiwiZXNjYXBlSHRtbENoYXIiLCJvYmplY3RQcm90byIsIm9iamVjdFRvU3RyaW5nIiwiU3ltYm9sIiwic3ltYm9sUHJvdG8iLCJzeW1ib2xUb1N0cmluZyIsImJhc2VUb1N0cmluZyIsInZhbHVlIiwiaXNTeW1ib2wiLCJyZXN1bHQiLCJpc09iamVjdExpa2UiLCJlc2NhcGUiLCJzdHJpbmciLCJNQVhfU0FGRV9JTlRFR0VSIiwiYXJnc1RhZyIsImZ1bmNUYWciLCJnZW5UYWciLCJyZUlzVWludCIsImJhc2VUaW1lcyIsIm4iLCJpdGVyYXRlZSIsIm92ZXJBcmciLCJmdW5jIiwidHJhbnNmb3JtIiwiYXJnIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIm5hdGl2ZUtleXMiLCJrZXlzIiwiYXJyYXlMaWtlS2V5cyIsImluaGVyaXRlZCIsImlzQXJyYXkiLCJpc0FyZ3VtZW50cyIsInNraXBJbmRleGVzIiwiaXNJbmRleCIsImJhc2VGb3IiLCJjcmVhdGVCYXNlRm9yIiwiYmFzZUZvck93biIsImJhc2VLZXlzIiwiaXNQcm90b3R5cGUiLCJmcm9tUmlnaHQiLCJrZXlzRnVuYyIsIml0ZXJhYmxlIiwicHJvcHMiLCJDdG9yIiwiY29uc3RydWN0b3IiLCJwcm90byIsImlzQXJyYXlMaWtlT2JqZWN0IiwiaXNBcnJheUxpa2UiLCJpc0xlbmd0aCIsImlzRnVuY3Rpb24iLCJ0YWciLCJpc09iamVjdCIsInR5cGUiLCJmb3JPd24iLCJpZGVudGl0eSIsInJlQXNjaWlXb3JkIiwicmVMYXRpbiIsInJzQXN0cmFsUmFuZ2UiLCJyc0NvbWJvTWFya3NSYW5nZSIsInJzQ29tYm9TeW1ib2xzUmFuZ2UiLCJyc0RpbmdiYXRSYW5nZSIsInJzTG93ZXJSYW5nZSIsInJzTWF0aE9wUmFuZ2UiLCJyc05vbkNoYXJSYW5nZSIsInJzUHVuY3R1YXRpb25SYW5nZSIsInJzU3BhY2VSYW5nZSIsInJzVXBwZXJSYW5nZSIsInJzVmFyUmFuZ2UiLCJyc0JyZWFrUmFuZ2UiLCJyc0Fwb3MiLCJyc0JyZWFrIiwicnNDb21ibyIsInJzRGlnaXRzIiwicnNEaW5nYmF0IiwicnNMb3dlciIsInJzTWlzYyIsInJzRml0eiIsInJzTW9kaWZpZXIiLCJyc05vbkFzdHJhbCIsInJzUmVnaW9uYWwiLCJyc1N1cnJQYWlyIiwicnNVcHBlciIsInJzWldKIiwicnNMb3dlck1pc2MiLCJyc1VwcGVyTWlzYyIsInJzT3B0TG93ZXJDb250ciIsInJzT3B0VXBwZXJDb250ciIsInJlT3B0TW9kIiwicnNPcHRWYXIiLCJyc09wdEpvaW4iLCJqb2luIiwicnNTZXEiLCJyc0Vtb2ppIiwicmVBcG9zIiwicmVDb21ib01hcmsiLCJyZVVuaWNvZGVXb3JkIiwicmVIYXNVbmljb2RlV29yZCIsImRlYnVycmVkTGV0dGVycyIsImFycmF5UmVkdWNlIiwiYXJyYXkiLCJhY2N1bXVsYXRvciIsImluaXRBY2N1bSIsImFzY2lpV29yZHMiLCJkZWJ1cnJMZXR0ZXIiLCJoYXNVbmljb2RlV29yZCIsInVuaWNvZGVXb3JkcyIsImNyZWF0ZUNvbXBvdW5kZXIiLCJjYWxsYmFjayIsIndvcmRzIiwiZGVidXJyIiwia2ViYWJDYXNlIiwid29yZCIsInRvTG93ZXJDYXNlIiwicGF0dGVybiIsImd1YXJkIiwiTEFSR0VfQVJSQVlfU0laRSIsIkZVTkNfRVJST1JfVEVYVCIsIkhBU0hfVU5ERUZJTkVEIiwiVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyIsIlBBUlRJQUxfQ09NUEFSRV9GTEFHIiwiYXJyYXlUYWciLCJib29sVGFnIiwiZGF0ZVRhZyIsImVycm9yVGFnIiwibWFwVGFnIiwibnVtYmVyVGFnIiwib2JqZWN0VGFnIiwicHJvbWlzZVRhZyIsInJlZ2V4cFRhZyIsInNldFRhZyIsInN0cmluZ1RhZyIsIndlYWtNYXBUYWciLCJhcnJheUJ1ZmZlclRhZyIsImRhdGFWaWV3VGFnIiwiZmxvYXQzMlRhZyIsImZsb2F0NjRUYWciLCJpbnQ4VGFnIiwiaW50MTZUYWciLCJpbnQzMlRhZyIsInVpbnQ4VGFnIiwidWludDhDbGFtcGVkVGFnIiwidWludDE2VGFnIiwidWludDMyVGFnIiwicmVJc0RlZXBQcm9wIiwicmVJc1BsYWluUHJvcCIsInJlTGVhZGluZ0RvdCIsInJlUHJvcE5hbWUiLCJyZVJlZ0V4cENoYXIiLCJyZUVzY2FwZUNoYXIiLCJyZUlzSG9zdEN0b3IiLCJ0eXBlZEFycmF5VGFncyIsImZyZWVFeHBvcnRzIiwibm9kZVR5cGUiLCJmcmVlTW9kdWxlIiwibW9kdWxlRXhwb3J0cyIsImZyZWVQcm9jZXNzIiwicHJvY2VzcyIsIm5vZGVVdGlsIiwiYmluZGluZyIsImUiLCJub2RlSXNUeXBlZEFycmF5IiwiaXNUeXBlZEFycmF5IiwiYXJyYXlTb21lIiwicHJlZGljYXRlIiwiYmFzZVByb3BlcnR5IiwiYmFzZVVuYXJ5IiwiZ2V0VmFsdWUiLCJpc0hvc3RPYmplY3QiLCJtYXBUb0FycmF5IiwibWFwIiwic2l6ZSIsImZvckVhY2giLCJzZXRUb0FycmF5Iiwic2V0IiwiYXJyYXlQcm90byIsImZ1bmNQcm90byIsImNvcmVKc0RhdGEiLCJtYXNrU3JjS2V5IiwidWlkIiwiSUVfUFJPVE8iLCJmdW5jVG9TdHJpbmciLCJyZUlzTmF0aXZlIiwiVWludDhBcnJheSIsInNwbGljZSIsIkRhdGFWaWV3IiwiZ2V0TmF0aXZlIiwiTWFwIiwiUHJvbWlzZSIsIlNldCIsIldlYWtNYXAiLCJuYXRpdmVDcmVhdGUiLCJkYXRhVmlld0N0b3JTdHJpbmciLCJ0b1NvdXJjZSIsIm1hcEN0b3JTdHJpbmciLCJwcm9taXNlQ3RvclN0cmluZyIsInNldEN0b3JTdHJpbmciLCJ3ZWFrTWFwQ3RvclN0cmluZyIsInN5bWJvbFZhbHVlT2YiLCJ2YWx1ZU9mIiwiSGFzaCIsImVudHJpZXMiLCJjbGVhciIsImVudHJ5IiwiaGFzaENsZWFyIiwiX19kYXRhX18iLCJoYXNoRGVsZXRlIiwiaGFzIiwiaGFzaEdldCIsImRhdGEiLCJoYXNoSGFzIiwiaGFzaFNldCIsImdldCIsIkxpc3RDYWNoZSIsImxpc3RDYWNoZUNsZWFyIiwibGlzdENhY2hlRGVsZXRlIiwiYXNzb2NJbmRleE9mIiwicG9wIiwibGlzdENhY2hlR2V0IiwibGlzdENhY2hlSGFzIiwibGlzdENhY2hlU2V0IiwiTWFwQ2FjaGUiLCJtYXBDYWNoZUNsZWFyIiwibWFwQ2FjaGVEZWxldGUiLCJnZXRNYXBEYXRhIiwibWFwQ2FjaGVHZXQiLCJtYXBDYWNoZUhhcyIsIm1hcENhY2hlU2V0IiwiU2V0Q2FjaGUiLCJ2YWx1ZXMiLCJhZGQiLCJzZXRDYWNoZUFkZCIsInNldENhY2hlSGFzIiwiU3RhY2siLCJzdGFja0NsZWFyIiwic3RhY2tEZWxldGUiLCJzdGFja0dldCIsInN0YWNrSGFzIiwic3RhY2tTZXQiLCJjYWNoZSIsInBhaXJzIiwiZXEiLCJiYXNlR2V0IiwicGF0aCIsImlzS2V5IiwiY2FzdFBhdGgiLCJ0b0tleSIsImJhc2VHZXRUYWciLCJiYXNlSGFzSW4iLCJiYXNlSXNFcXVhbCIsIm90aGVyIiwiY3VzdG9taXplciIsImJpdG1hc2siLCJzdGFjayIsImJhc2VJc0VxdWFsRGVlcCIsImVxdWFsRnVuYyIsIm9iaklzQXJyIiwib3RoSXNBcnIiLCJvYmpUYWciLCJvdGhUYWciLCJnZXRUYWciLCJvYmpJc09iaiIsIm90aElzT2JqIiwiaXNTYW1lVGFnIiwiZXF1YWxBcnJheXMiLCJlcXVhbEJ5VGFnIiwib2JqSXNXcmFwcGVkIiwib3RoSXNXcmFwcGVkIiwib2JqVW53cmFwcGVkIiwib3RoVW53cmFwcGVkIiwiZXF1YWxPYmplY3RzIiwiYmFzZUlzTWF0Y2giLCJtYXRjaERhdGEiLCJub0N1c3RvbWl6ZXIiLCJvYmpWYWx1ZSIsInNyY1ZhbHVlIiwiYmFzZUlzTmF0aXZlIiwiaXNNYXNrZWQiLCJiYXNlSXNUeXBlZEFycmF5IiwiYmFzZUl0ZXJhdGVlIiwiYmFzZU1hdGNoZXNQcm9wZXJ0eSIsImJhc2VNYXRjaGVzIiwicHJvcGVydHkiLCJnZXRNYXRjaERhdGEiLCJtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSIsImlzU3RyaWN0Q29tcGFyYWJsZSIsImhhc0luIiwiYmFzZVByb3BlcnR5RGVlcCIsImJhc2VQdWxsQXQiLCJpbmRleGVzIiwicHJldmlvdXMiLCJwYXJlbnQiLCJsYXN0IiwiYmFzZVNsaWNlIiwic3RhcnQiLCJlbmQiLCJzdHJpbmdUb1BhdGgiLCJpc1BhcnRpYWwiLCJhcnJMZW5ndGgiLCJvdGhMZW5ndGgiLCJzdGFja2VkIiwic2VlbiIsImFyclZhbHVlIiwib3RoVmFsdWUiLCJjb21wYXJlZCIsIm90aEluZGV4IiwiYnl0ZUxlbmd0aCIsImJ5dGVPZmZzZXQiLCJidWZmZXIiLCJuYW1lIiwibWVzc2FnZSIsImNvbnZlcnQiLCJvYmpQcm9wcyIsIm9iakxlbmd0aCIsIm90aFByb3BzIiwic2tpcEN0b3IiLCJvYmpDdG9yIiwib3RoQ3RvciIsImlzS2V5YWJsZSIsIkFycmF5QnVmZmVyIiwicmVzb2x2ZSIsImN0b3JTdHJpbmciLCJoYXNQYXRoIiwiaGFzRnVuYyIsIm1lbW9pemUiLCJudW1iZXIiLCJxdW90ZSIsInJlbW92ZSIsInJlc29sdmVyIiwiVHlwZUVycm9yIiwibWVtb2l6ZWQiLCJhcmdzIiwiQ2FjaGUiLCJkZWZhdWx0VmFsdWUiLCJhcnJheUluY2x1ZGVzIiwiYmFzZUluZGV4T2YiLCJhcnJheUluY2x1ZGVzV2l0aCIsImNvbXBhcmF0b3IiLCJiYXNlRmluZEluZGV4IiwiZnJvbUluZGV4IiwiYmFzZUlzTmFOIiwiY2FjaGVIYXMiLCJiYXNlVW5pcSIsImluY2x1ZGVzIiwiaXNDb21tb24iLCJjcmVhdGVTZXQiLCJvdXRlciIsImNvbXB1dGVkIiwic2VlbkluZGV4Iiwibm9vcCIsInVuaXEiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJwcm9wSXNFbnVtZXJhYmxlIiwidG9PYmplY3QiLCJ2YWwiLCJzaG91bGRVc2VOYXRpdmUiLCJhc3NpZ24iLCJ0ZXN0MSIsImdldE93blByb3BlcnR5TmFtZXMiLCJ0ZXN0MiIsImZyb21DaGFyQ29kZSIsIm9yZGVyMiIsInRlc3QzIiwibGV0dGVyIiwiZXJyIiwidGFyZ2V0IiwiZnJvbSIsInRvIiwic3ltYm9scyIsInMiLCJyZXF1aXJlIiwiY2xhc3NJZFNwbGl0Iiwibm90Q2xhc3NJZCIsInBhcnNlU2VsZWN0b3IiLCJzZWxlY3RvciIsInVwcGVyIiwidGFnTmFtZSIsImlkIiwiY2xhc3NlcyIsInRhZ1BhcnRzIiwicGFydCIsImNoYXJBdCIsInN1YnN0cmluZyIsInRvVXBwZXJDYXNlIiwiY2xhc3NOYW1lIiwiY2hlY2tGb3JFcnJvciIsIkVycm9yIiwiZXJyb3IiLCJpc0Vycm9yIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsInF1aWNrX2Vycm9yXzEiLCJzbmFiYmRvbSIsInByb3BzXzEiLCJyZWNvbmNpbGUiLCJpbml0IiwiZGVmYXVsdCIsInNuYWJiZG9tXzEiLCJtb2R1bGVzIiwidG9IVE1MIiwiY2xhc3MiLCJhdHRyaWJ1dGVzIiwic3R5bGUiLCJEZXAiLCJzdWJzY3JpYmVycyIsImRlcGVuZCIsImFjdGl2ZUVmZmVjdCIsIm5vdGlmeSIsInN1YiIsIkNvbXBvbmVudCIsInBhcmFtcyIsInQiLCJjb21wb25lbnREaWRNb3VudCIsInNldFN0YXRlIiwicGFydGlhbFN0YXRlIiwiX3RoaXMiLCJzdGF0ZSIsIlF1aWNrIiwiX191cGRhdGVyIiwicmVuZGVyIiwiZWwiLCJyIiwiX3B0IiwiaXNRdWlja0NsYXNzQ29tcG9uZW50IiwiY29tcG9uZW50IiwiX2luaXQiLCJmYXYiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsInJlbCIsImgiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIiQiLCJxdWVyeVNlbGVjdG9yIiwiY29tcG9uZW50TG9hZGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJsaXN0ZW5lciIsImZuIiwicHJldmVudCIsInJ1bkJlZm9yZURvbUxvYWRlZCIsInZpZXciLCJyZW5kZXJWaWV3dG9IVE1MIiwiY2hpbGRyZW4iLCJmbGF0IiwiaXNRbmRSZWFjdENsYXNzQ29tcG9uZW50IiwiY29tcG9uZW50SW5zdGFuY2UiLCJkYXRhUHJvcHMiLCJldmVudFByb3BzIiwicHJvcEtleSIsInN0YXJ0c1dpdGgiLCJldmVudCIsImluc3RhbmNlIiwiY29uZmlnIiwiZW52IiwicXVpY2tqc19jb21wb25lbnRfMSIsInBhdGhUb1JlZ2V4IiwiZ2V0UGFyYW1zIiwicm91dGUiLCJtYXRjaEFsbCIsIlF1aWNrUm91dGVyIiwidXNlUm91dGUiLCJyb3V0ZXMiLCJ1cmwiLCJtYXRjaGVzIiwibG9jYXRpb24iLCJwYXRobmFtZSIsImZpbmRNYXRjaCIsImZpbmQiLCJzZXRUaXRsZSIsInRpdGxlIiwiZ2V0Um91dGUiLCJyZWZlcnJlciIsIm5leHQiLCJmdWxsUGF0aCIsImNyZWF0ZU5hdmlnYXRpb24iLCJ3aW5kb3ciLCJwcmV2ZW50RGVmYXVsdCIsImxvY2FsTmFtZSIsImRhdGFzZXQiLCJleHRlcm5hbCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJjcmVhdGVQb3BTdGF0ZSIsIlF1aWNrUm91dGVyTGluayIsIkhUTUxFbGVtZW50IiwibGlua1RvIiwiZ2V0QXR0cmlidXRlIiwiY3VzdG9tVGFnIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImlubmVyVGV4dCIsImF0dHJpYkkiLCJhIiwiYXR0cmliQSIsInNldEF0dHJpYnV0ZSIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwidXNlUmVmIiwiYXBwIiwiY2hpbGQiLCJhcmVhIiwiYmFzZSIsImJyIiwiY29sIiwiZW1iZWQiLCJociIsImltZyIsImlucHV0Iiwia2V5Z2VuIiwibGluayIsIm1ldGEiLCJwYXJhbSIsInRyYWNrIiwid2JyIiwiVk9JRF9FTEVNRU5UUyIsIkNPTlRBSU5FUl9FTEVNRU5UUyIsInBhcnNlIiwidm5vZGUiLCJub2RlIiwicmVuZGVyVG9TdHJpbmciLCJzZWwiLCJ0ZXh0IiwiaG9vayIsInN2ZyIsIm5zIiwiYXR0cnNNb2R1bGUiLCJhdHRycyIsImNsYXNzTW9kdWxlIiwiX2FkZCIsIl9yZW1vdmUiLCJleGlzdGluZyIsImNvbmNhdCIsImluZGV4T2YiLCJkYXRhc2V0TW9kdWxlIiwib21pdCIsImJvb2xlYW5BdHRyaWJ1dGVzIiwicHJvcHNNb2R1bGUiLCJsa2V5Iiwic3R5bGVNb2R1bGUiLCJkZWxheWVkIiwia2ViYWJLZXkiLCJyb3V0ZXIiLCJUb2RvcyIsIk5vdEZvdW5kIiwiVG9kbyIsIlRvZG9MaXN0IiwidG9kbyIsInNldFRvZG8iLCJ0b2RvSW5wdXQiLCJhZGRUb2RvIiwiYWRkVG9kb0J0biIsInRvZG9zQ29udGFpbmVyIiwiY29tcGxldGVPckRlbGV0ZVRvZG8iLCJ0b2RvRWxlbWVudCIsImNsYXNzTGlzdCIsImFwcGVuZENoaWxkIiwicGFyZW50RWxlbWVudCIsInRleHREZWNvcmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFrQixTQUFTQyxLQUFULENBQWVDLEtBQWYsRUFBc0I7QUFFdEMsTUFBSUMsV0FBVyxHQUFHQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJKLEtBQW5DO0FBQUEsTUFDRUssaUJBQWlCLEdBQUcsT0FBT0MsSUFBUCxDQUFZLEVBQVosRUFBZ0IsQ0FBaEIsTUFBdUJMLEtBRDdDO0FBQUEsTUFFRTtBQUNBTSxNQUhGOztBQUtBQSxNQUFJLEdBQUcsVUFBU0MsR0FBVCxFQUFjQyxTQUFkLEVBQXlCQyxLQUF6QixFQUFnQztBQUNyQztBQUNBLFFBQUlDLE1BQU0sQ0FBQ1AsU0FBUCxDQUFpQlEsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCSixTQUEvQixNQUE4QyxpQkFBbEQsRUFBcUU7QUFDbkUsYUFBT1AsV0FBVyxDQUFDVyxJQUFaLENBQWlCTCxHQUFqQixFQUFzQkMsU0FBdEIsRUFBaUNDLEtBQWpDLENBQVA7QUFDRDs7QUFDRCxRQUFJSSxNQUFNLEdBQUcsRUFBYjtBQUFBLFFBQ0VDLEtBQUssR0FBRyxDQUFDTixTQUFTLENBQUNPLFVBQVYsR0FBdUIsR0FBdkIsR0FBNkIsRUFBOUIsS0FBcUNQLFNBQVMsQ0FBQ1EsU0FBVixHQUFzQixHQUF0QixHQUE0QixFQUFqRSxLQUF3RVIs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QUNIO0FBQ0o7QUFDSjs7QUFHRDJGLHNFQUFBLENBQXNCbUksT0FBdEIsRTs7Ozs7O1VDbEdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7Ozs7Ozs7Ozs7OztBQ0pBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQ3Jvc3MtQnJvd3NlciBTcGxpdCAxLjEuMVxuICogQ29weXJpZ2h0IDIwMDctMjAxMiBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT5cbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqIEVDTUFTY3JpcHQgY29tcGxpYW50LCB1bmlmb3JtIGNyb3NzLWJyb3dzZXIgc3BsaXQgbWV0aG9kXG4gKi9cblxuLyoqXG4gKiBTcGxpdHMgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzIHVzaW5nIGEgcmVnZXggb3Igc3RyaW5nIHNlcGFyYXRvci4gTWF0Y2hlcyBvZiB0aGVcbiAqIHNlcGFyYXRvciBhcmUgbm90IGluY2x1ZGVkIGluIHRoZSByZXN1bHQgYXJyYXkuIEhvd2V2ZXIsIGlmIGBzZXBhcmF0b3JgIGlzIGEgcmVnZXggdGhhdCBjb250YWluc1xuICogY2FwdHVyaW5nIGdyb3VwcywgYmFja3JlZmVyZW5jZXMgYXJlIHNwbGljZWQgaW50byB0aGUgcmVzdWx0IGVhY2ggdGltZSBgc2VwYXJhdG9yYCBpcyBtYXRjaGVkLlxuICogRml4ZXMgYnJvd3NlciBidWdzIGNvbXBhcmVkIHRvIHRoZSBuYXRpdmUgYFN0cmluZy5wcm90b3R5cGUuc3BsaXRgIGFuZCBjYW4gYmUgdXNlZCByZWxpYWJseVxuICogY3Jvc3MtYnJvd3Nlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIHNwbGl0LlxuICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBzZXBhcmF0b3IgUmVnZXggb3Igc3RyaW5nIHRvIHVzZSBmb3Igc2VwYXJhdGluZyB0aGUgc3RyaW5nLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdF0gTWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdG8gaW5jbHVkZSBpbiB0aGUgcmVzdWx0IGFycmF5LlxuICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiBzdWJzdHJpbmdzLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBCYXNpYyB1c2VcbiAqIHNwbGl0KCdhIGIgYyBkJywgJyAnKTtcbiAqIC8vIC0+IFsnYScsICdiJywgJ2MnLCAnZCddXG4gKlxuICogLy8gV2l0aCBsaW1pdFxuICogc3BsaXQoJ2EgYiBjIGQnLCAnICcsIDIpO1xuICogLy8gLT4gWydhJywgJ2InXVxuICpcbiAqIC8vIEJhY2tyZWZlcmVuY2VzIGluIHJlc3VsdCBhcnJheVxuICogc3BsaXQoJy4ud29yZDEgd29yZDIuLicsIC8oW2Etel0rKShcXGQrKS9pKTtcbiAqIC8vIC0+IFsnLi4nLCAnd29yZCcsICcxJywgJyAnLCAnd29yZCcsICcyJywgJy4uJ11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gc3BsaXQodW5kZWYpIHtcblxuICB2YXIgbmF0aXZlU3BsaXQgPSBTdHJpbmcucHJvdG90eXBlLnNwbGl0LFxuICAgIGNvbXBsaWFudEV4ZWNOcGNnID0gLygpPz8vLmV4ZWMoXCJcIilbMV0gPT09IHVuZGVmLFxuICAgIC8vIE5QQ0c6IG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwXG4gICAgc2VsZjtcblxuICBzZWxmID0gZnVuY3Rpb24oc3RyLCBzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgLy8gSWYgYHNlcGFyYXRvcmAgaXMgbm90IGEgcmVnZXgsIHVzZSBgbmF0aXZlU3BsaXRgXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzZXBhcmF0b3IpICE9PSBcIltvYmplY3QgUmVnRXhwXVwiKSB7XG4gICAgICByZXR1cm4gbmF0aXZlU3BsaXQuY2FsbChzdHIsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH1cbiAgICB2YXIgb3V0cHV0ID0gW10sXG4gICAgICBmbGFncyA9IChzZXBhcmF0b3IuaWdub3JlQ2FzZSA/IFwiaVwiIDogXCJcIikgKyAoc2VwYXJhdG9yLm11bHRpbGluZSA/IFwibVwiIDogXCJcIikgKyAoc2VwYXJhdG9yLmV4dGVuZGVkID8gXCJ4XCIgOiBcIlwiKSArIC8vIFByb3Bvc2VkIGZvciBFUzZcbiAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gXCJ5XCIgOiBcIlwiKSxcbiAgICAgIC8vIEZpcmVmb3ggMytcbiAgICAgIGxhc3RMYXN0SW5kZXggPSAwLFxuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHNlcGFyYXRvciA9IG5ldyBSZWdFeHAoc2VwYXJhdG9yLnNvdXJjZSwgZmxhZ3MgKyBcImdcIiksXG4gICAgICBzZXBhcmF0b3IyLCBtYXRjaCwgbGFzdEluZGV4LCBsYXN0TGVuZ3RoO1xuICAgIHN0ciArPSBcIlwiOyAvLyBUeXBlLWNvbnZlcnRcbiAgICBpZiAoIWNvbXBsaWFudEV4ZWNOcGNnKSB7XG4gICAgICAvLyBEb2Vzbid0IG5lZWQgZmxhZ3MgZ3ksIGJ1dCB0aGV5IGRvbid0IGh1cnRcbiAgICAgIHNlcGFyYXRvcjIgPSBuZXcgUmVnRXhwKFwiXlwiICsgc2VwYXJhdG9yLnNvdXJjZSArIFwiJCg/IVxcXFxzKVwiLCBmbGFncyk7XG4gICAgfVxuICAgIC8qIFZhbHVlcyBmb3IgYGxpbWl0YCwgcGVyIHRoZSBzcGVjOlxuICAgICAqIElmIHVuZGVmaW5lZDogNDI5NDk2NzI5NSAvLyBNYXRoLnBvdygyLCAzMikgLSAxXG4gICAgICogSWYgMCwgSW5maW5pdHksIG9yIE5hTjogMFxuICAgICAqIElmIHBvc2l0aXZlIG51bWJlcjogbGltaXQgPSBNYXRoLmZsb29yKGxpbWl0KTsgaWYgKGxpbWl0ID4gNDI5NDk2NzI5NSkgbGltaXQgLT0gNDI5NDk2NzI5NjtcbiAgICAgKiBJZiBuZWdhdGl2ZSBudW1iZXI6IDQyOTQ5NjcyOTYgLSBNYXRoLmZsb29yKE1hdGguYWJzKGxpbWl0KSlcbiAgICAgKiBJZiBvdGhlcjogVHlwZS1jb252ZXJ0LCB0aGVuIHVzZSB0aGUgYWJvdmUgcnVsZXNcbiAgICAgKi9cbiAgICBsaW1pdCA9IGxpbWl0ID09PSB1bmRlZiA/IC0xID4+PiAwIDogLy8gTWF0aC5wb3coMiwgMzIpIC0gMVxuICAgIGxpbWl0ID4+PiAwOyAvLyBUb1VpbnQzMihsaW1pdClcbiAgICB3aGlsZSAobWF0Y2ggPSBzZXBhcmF0b3IuZXhlYyhzdHIpKSB7XG4gICAgICAvLyBgc2VwYXJhdG9yLmxhc3RJbmRleGAgaXMgbm90IHJlbGlhYmxlIGNyb3NzLWJyb3dzZXJcbiAgICAgIGxhc3RJbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgaWYgKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goc3RyLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgIGZvclxuICAgICAgICAvLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cHNcbiAgICAgICAgaWYgKCFjb21wbGlhbnRFeGVjTnBjZyAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgbWF0Y2hbMF0ucmVwbGFjZShzZXBhcmF0b3IyLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldID09PSB1bmRlZikge1xuICAgICAgICAgICAgICAgIG1hdGNoW2ldID0gdW5kZWY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICBsYXN0TGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VwYXJhdG9yLmxhc3RJbmRleCA9PT0gbWF0Y2guaW5kZXgpIHtcbiAgICAgICAgc2VwYXJhdG9yLmxhc3RJbmRleCsrOyAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHIubGVuZ3RoKSB7XG4gICAgICBpZiAobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yLnRlc3QoXCJcIikpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKHN0ci5zbGljZShsYXN0TGFzdEluZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltaXQgPyBvdXRwdXQuc2xpY2UoMCwgbGltaXQpIDogb3V0cHV0O1xuICB9O1xuXG4gIHJldHVybiBzZWxmO1xufSkoKTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgYW5kIEhUTUwgY2hhcmFjdGVycy4gKi9cbnZhciByZVVuZXNjYXBlZEh0bWwgPSAvWyY8PlwiJ2BdL2csXG4gICAgcmVIYXNVbmVzY2FwZWRIdG1sID0gUmVnRXhwKHJlVW5lc2NhcGVkSHRtbC5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBtYXAgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLiAqL1xudmFyIGh0bWxFc2NhcGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiMzOTsnLFxuICAnYCc6ICcmIzk2Oydcbn07XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFVzZWQgYnkgYF8uZXNjYXBlYCB0byBjb252ZXJ0IGNoYXJhY3RlcnMgdG8gSFRNTCBlbnRpdGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGNociBUaGUgbWF0Y2hlZCBjaGFyYWN0ZXIgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gKi9cbnZhciBlc2NhcGVIdG1sQ2hhciA9IGJhc2VQcm9wZXJ0eU9mKGh0bWxFc2NhcGVzKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBjaGFyYWN0ZXJzIFwiJlwiLCBcIjxcIiwgXCI+XCIsICdcIicsIFwiJ1wiLCBhbmQgXCJcXGBcIiBpbiBgc3RyaW5nYCB0b1xuICogdGhlaXIgY29ycmVzcG9uZGluZyBIVE1MIGVudGl0aWVzLlxuICpcbiAqICoqTm90ZToqKiBObyBvdGhlciBjaGFyYWN0ZXJzIGFyZSBlc2NhcGVkLiBUbyBlc2NhcGUgYWRkaXRpb25hbFxuICogY2hhcmFjdGVycyB1c2UgYSB0aGlyZC1wYXJ0eSBsaWJyYXJ5IGxpa2UgW19oZV9dKGh0dHBzOi8vbXRocy5iZS9oZSkuXG4gKlxuICogVGhvdWdoIHRoZSBcIj5cIiBjaGFyYWN0ZXIgaXMgZXNjYXBlZCBmb3Igc3ltbWV0cnksIGNoYXJhY3RlcnMgbGlrZVxuICogXCI+XCIgYW5kIFwiL1wiIGRvbid0IG5lZWQgZXNjYXBpbmcgaW4gSFRNTCBhbmQgaGF2ZSBubyBzcGVjaWFsIG1lYW5pbmdcbiAqIHVubGVzcyB0aGV5J3JlIHBhcnQgb2YgYSB0YWcgb3IgdW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlLiBTZWVcbiAqIFtNYXRoaWFzIEJ5bmVucydzIGFydGljbGVdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9hbWJpZ3VvdXMtYW1wZXJzYW5kcylcbiAqICh1bmRlciBcInNlbWktcmVsYXRlZCBmdW4gZmFjdFwiKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEJhY2t0aWNrcyBhcmUgZXNjYXBlZCBiZWNhdXNlIGluIElFIDwgOSwgdGhleSBjYW4gYnJlYWsgb3V0IG9mXG4gKiBhdHRyaWJ1dGUgdmFsdWVzIG9yIEhUTUwgY29tbWVudHMuIFNlZSBbIzU5XShodHRwczovL2h0bWw1c2VjLm9yZy8jNTkpLFxuICogWyMxMDJdKGh0dHBzOi8vaHRtbDVzZWMub3JnLyMxMDIpLCBbIzEwOF0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEwOCksIGFuZFxuICogWyMxMzNdKGh0dHBzOi8vaHRtbDVzZWMub3JnLyMxMzMpIG9mIHRoZVxuICogW0hUTUw1IFNlY3VyaXR5IENoZWF0c2hlZXRdKGh0dHBzOi8vaHRtbDVzZWMub3JnLykgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBXaGVuIHdvcmtpbmcgd2l0aCBIVE1MIHlvdSBzaG91bGQgYWx3YXlzXG4gKiBbcXVvdGUgYXR0cmlidXRlIHZhbHVlc10oaHR0cDovL3dvbmtvLmNvbS9wb3N0L2h0bWwtZXNjYXBpbmcpIHRvIHJlZHVjZVxuICogWFNTIHZlY3RvcnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gJ2ZyZWQsIGJhcm5leSwgJmFtcDsgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1VuZXNjYXBlZEh0bWwudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVVbmVzY2FwZWRIdG1sLCBlc2NhcGVIdG1sQ2hhcilcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlc2NhcGU7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIG1ldGhvZHMgbGlrZSBgXy5mb3JJbmAgYW5kIGBfLmZvck93bmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYW5kXG4gKiBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWVcbiAqIGFyZ3VtZW50czogKHZhbHVlLCBrZXksIG9iamVjdCkuIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb25cbiAqIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjMuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBzZWUgXy5mb3JPd25SaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmZvck93bihuZXcgRm9vLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgJ2EnIHRoZW4gJ2InIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpLlxuICovXG5mdW5jdGlvbiBmb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3JPd24ob2JqZWN0LCB0eXBlb2YgaXRlcmF0ZWUgPT0gJ2Z1bmN0aW9uJyA/IGl0ZXJhdGVlIDogaWRlbnRpdHkpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JPd247XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCB3b3JkcyBjb21wb3NlZCBvZiBhbHBoYW51bWVyaWMgY2hhcmFjdGVycy4gKi9cbnZhciByZUFzY2lpV29yZCA9IC9bXlxceDAwLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceDdmXSsvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggTGF0aW4gVW5pY29kZSBsZXR0ZXJzIChleGNsdWRpbmcgbWF0aGVtYXRpY2FsIG9wZXJhdG9ycykuICovXG52YXIgcmVMYXRpbiA9IC9bXFx4YzAtXFx4ZDZcXHhkOC1cXHhmNlxceGY4LVxceGZmXFx1MDEwMC1cXHUwMTdmXS9nO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyMycsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGYwJyxcbiAgICByc0RpbmdiYXRSYW5nZSA9ICdcXFxcdTI3MDAtXFxcXHUyN2JmJyxcbiAgICByc0xvd2VyUmFuZ2UgPSAnYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmJyxcbiAgICByc01hdGhPcFJhbmdlID0gJ1xcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjcnLFxuICAgIHJzTm9uQ2hhclJhbmdlID0gJ1xcXFx4MDAtXFxcXHgyZlxcXFx4M2EtXFxcXHg0MFxcXFx4NWItXFxcXHg2MFxcXFx4N2ItXFxcXHhiZicsXG4gICAgcnNQdW5jdHVhdGlvblJhbmdlID0gJ1xcXFx1MjAwMC1cXFxcdTIwNmYnLFxuICAgIHJzU3BhY2VSYW5nZSA9ICcgXFxcXHRcXFxceDBiXFxcXGZcXFxceGEwXFxcXHVmZWZmXFxcXG5cXFxcclxcXFx1MjAyOFxcXFx1MjAyOVxcXFx1MTY4MFxcXFx1MTgwZVxcXFx1MjAwMFxcXFx1MjAwMVxcXFx1MjAwMlxcXFx1MjAwM1xcXFx1MjAwNFxcXFx1MjAwNVxcXFx1MjAwNlxcXFx1MjAwN1xcXFx1MjAwOFxcXFx1MjAwOVxcXFx1MjAwYVxcXFx1MjAyZlxcXFx1MjA1ZlxcXFx1MzAwMCcsXG4gICAgcnNVcHBlclJhbmdlID0gJ0EtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZScsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnLFxuICAgIHJzQnJlYWtSYW5nZSA9IHJzTWF0aE9wUmFuZ2UgKyByc05vbkNoYXJSYW5nZSArIHJzUHVuY3R1YXRpb25SYW5nZSArIHJzU3BhY2VSYW5nZTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXBvcyA9IFwiWydcXHUyMDE5XVwiLFxuICAgIHJzQnJlYWsgPSAnWycgKyByc0JyZWFrUmFuZ2UgKyAnXScsXG4gICAgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9NYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSArICddJyxcbiAgICByc0RpZ2l0cyA9ICdcXFxcZCsnLFxuICAgIHJzRGluZ2JhdCA9ICdbJyArIHJzRGluZ2JhdFJhbmdlICsgJ10nLFxuICAgIHJzTG93ZXIgPSAnWycgKyByc0xvd2VyUmFuZ2UgKyAnXScsXG4gICAgcnNNaXNjID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyByc0JyZWFrUmFuZ2UgKyByc0RpZ2l0cyArIHJzRGluZ2JhdFJhbmdlICsgcnNMb3dlclJhbmdlICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1VwcGVyID0gJ1snICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJzTG93ZXJNaXNjID0gJyg/OicgKyByc0xvd2VyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzVXBwZXJNaXNjID0gJyg/OicgKyByc1VwcGVyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzT3B0TG93ZXJDb250ciA9ICcoPzonICsgcnNBcG9zICsgJyg/OmR8bGx8bXxyZXxzfHR8dmUpKT8nLFxuICAgIHJzT3B0VXBwZXJDb250ciA9ICcoPzonICsgcnNBcG9zICsgJyg/OkR8TEx8TXxSRXxTfFR8VkUpKT8nLFxuICAgIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzRW1vamkgPSAnKD86JyArIFtyc0RpbmdiYXQsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzU2VxO1xuXG4vKiogVXNlZCB0byBtYXRjaCBhcG9zdHJvcGhlcy4gKi9cbnZhciByZUFwb3MgPSBSZWdFeHAocnNBcG9zLCAnZycpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzKSBhbmRcbiAqIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3MgZm9yIHN5bWJvbHNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrc19mb3JfU3ltYm9scykuXG4gKi9cbnZhciByZUNvbWJvTWFyayA9IFJlZ0V4cChyc0NvbWJvLCAnZycpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBjb21wbGV4IG9yIGNvbXBvdW5kIHdvcmRzLiAqL1xudmFyIHJlVW5pY29kZVdvcmQgPSBSZWdFeHAoW1xuICByc1VwcGVyICsgJz8nICsgcnNMb3dlciArICcrJyArIHJzT3B0TG93ZXJDb250ciArICcoPz0nICsgW3JzQnJlYWssIHJzVXBwZXIsICckJ10uam9pbignfCcpICsgJyknLFxuICByc1VwcGVyTWlzYyArICcrJyArIHJzT3B0VXBwZXJDb250ciArICcoPz0nICsgW3JzQnJlYWssIHJzVXBwZXIgKyByc0xvd2VyTWlzYywgJyQnXS5qb2luKCd8JykgKyAnKScsXG4gIHJzVXBwZXIgKyAnPycgKyByc0xvd2VyTWlzYyArICcrJyArIHJzT3B0TG93ZXJDb250cixcbiAgcnNVcHBlciArICcrJyArIHJzT3B0VXBwZXJDb250cixcbiAgcnNEaWdpdHMsXG4gIHJzRW1vamlcbl0uam9pbignfCcpLCAnZycpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB0aGF0IG5lZWQgYSBtb3JlIHJvYnVzdCByZWdleHAgdG8gbWF0Y2ggd29yZHMuICovXG52YXIgcmVIYXNVbmljb2RlV29yZCA9IC9bYS16XVtBLVpdfFtBLVpdezIsfVthLXpdfFswLTldW2EtekEtWl18W2EtekEtWl1bMC05XXxbXmEtekEtWjAtOSBdLztcblxuLyoqIFVzZWQgdG8gbWFwIExhdGluIFVuaWNvZGUgbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzLiAqL1xudmFyIGRlYnVycmVkTGV0dGVycyA9IHtcbiAgLy8gTGF0aW4tMSBTdXBwbGVtZW50IGJsb2NrLlxuICAnXFx4YzAnOiAnQScsICAnXFx4YzEnOiAnQScsICdcXHhjMic6ICdBJywgJ1xceGMzJzogJ0EnLCAnXFx4YzQnOiAnQScsICdcXHhjNSc6ICdBJyxcbiAgJ1xceGUwJzogJ2EnLCAgJ1xceGUxJzogJ2EnLCAnXFx4ZTInOiAnYScsICdcXHhlMyc6ICdhJywgJ1xceGU0JzogJ2EnLCAnXFx4ZTUnOiAnYScsXG4gICdcXHhjNyc6ICdDJywgICdcXHhlNyc6ICdjJyxcbiAgJ1xceGQwJzogJ0QnLCAgJ1xceGYwJzogJ2QnLFxuICAnXFx4YzgnOiAnRScsICAnXFx4YzknOiAnRScsICdcXHhjYSc6ICdFJywgJ1xceGNiJzogJ0UnLFxuICAnXFx4ZTgnOiAnZScsICAnXFx4ZTknOiAnZScsICdcXHhlYSc6ICdlJywgJ1xceGViJzogJ2UnLFxuICAnXFx4Y2MnOiAnSScsICAnXFx4Y2QnOiAnSScsICdcXHhjZSc6ICdJJywgJ1xceGNmJzogJ0knLFxuICAnXFx4ZWMnOiAnaScsICAnXFx4ZWQnOiAnaScsICdcXHhlZSc6ICdpJywgJ1xceGVmJzogJ2knLFxuICAnXFx4ZDEnOiAnTicsICAnXFx4ZjEnOiAnbicsXG4gICdcXHhkMic6ICdPJywgICdcXHhkMyc6ICdPJywgJ1xceGQ0JzogJ08nLCAnXFx4ZDUnOiAnTycsICdcXHhkNic6ICdPJywgJ1xceGQ4JzogJ08nLFxuICAnXFx4ZjInOiAnbycsICAnXFx4ZjMnOiAnbycsICdcXHhmNCc6ICdvJywgJ1xceGY1JzogJ28nLCAnXFx4ZjYnOiAnbycsICdcXHhmOCc6ICdvJyxcbiAgJ1xceGQ5JzogJ1UnLCAgJ1xceGRhJzogJ1UnLCAnXFx4ZGInOiAnVScsICdcXHhkYyc6ICdVJyxcbiAgJ1xceGY5JzogJ3UnLCAgJ1xceGZhJzogJ3UnLCAnXFx4ZmInOiAndScsICdcXHhmYyc6ICd1JyxcbiAgJ1xceGRkJzogJ1knLCAgJ1xceGZkJzogJ3knLCAnXFx4ZmYnOiAneScsXG4gICdcXHhjNic6ICdBZScsICdcXHhlNic6ICdhZScsXG4gICdcXHhkZSc6ICdUaCcsICdcXHhmZSc6ICd0aCcsXG4gICdcXHhkZic6ICdzcycsXG4gIC8vIExhdGluIEV4dGVuZGVkLUEgYmxvY2suXG4gICdcXHUwMTAwJzogJ0EnLCAgJ1xcdTAxMDInOiAnQScsICdcXHUwMTA0JzogJ0EnLFxuICAnXFx1MDEwMSc6ICdhJywgICdcXHUwMTAzJzogJ2EnLCAnXFx1MDEwNSc6ICdhJyxcbiAgJ1xcdTAxMDYnOiAnQycsICAnXFx1MDEwOCc6ICdDJywgJ1xcdTAxMGEnOiAnQycsICdcXHUwMTBjJzogJ0MnLFxuICAnXFx1MDEwNyc6ICdjJywgICdcXHUwMTA5JzogJ2MnLCAnXFx1MDEwYic6ICdjJywgJ1xcdTAxMGQnOiAnYycsXG4gICdcXHUwMTBlJzogJ0QnLCAgJ1xcdTAxMTAnOiAnRCcsICdcXHUwMTBmJzogJ2QnLCAnXFx1MDExMSc6ICdkJyxcbiAgJ1xcdTAxMTInOiAnRScsICAnXFx1MDExNCc6ICdFJywgJ1xcdTAxMTYnOiAnRScsICdcXHUwMTE4JzogJ0UnLCAnXFx1MDExYSc6ICdFJyxcbiAgJ1xcdTAxMTMnOiAnZScsICAnXFx1MDExNSc6ICdlJywgJ1xcdTAxMTcnOiAnZScsICdcXHUwMTE5JzogJ2UnLCAnXFx1MDExYic6ICdlJyxcbiAgJ1xcdTAxMWMnOiAnRycsICAnXFx1MDExZSc6ICdHJywgJ1xcdTAxMjAnOiAnRycsICdcXHUwMTIyJzogJ0cnLFxuICAnXFx1MDExZCc6ICdnJywgICdcXHUwMTFmJzogJ2cnLCAnXFx1MDEyMSc6ICdnJywgJ1xcdTAxMjMnOiAnZycsXG4gICdcXHUwMTI0JzogJ0gnLCAgJ1xcdTAxMjYnOiAnSCcsICdcXHUwMTI1JzogJ2gnLCAnXFx1MDEyNyc6ICdoJyxcbiAgJ1xcdTAxMjgnOiAnSScsICAnXFx1MDEyYSc6ICdJJywgJ1xcdTAxMmMnOiAnSScsICdcXHUwMTJlJzogJ0knLCAnXFx1MDEzMCc6ICdJJyxcbiAgJ1xcdTAxMjknOiAnaScsICAnXFx1MDEyYic6ICdpJywgJ1xcdTAxMmQnOiAnaScsICdcXHUwMTJmJzogJ2knLCAnXFx1MDEzMSc6ICdpJyxcbiAgJ1xcdTAxMzQnOiAnSicsICAnXFx1MDEzNSc6ICdqJyxcbiAgJ1xcdTAxMzYnOiAnSycsICAnXFx1MDEzNyc6ICdrJywgJ1xcdTAxMzgnOiAnaycsXG4gICdcXHUwMTM5JzogJ0wnLCAgJ1xcdTAxM2InOiAnTCcsICdcXHUwMTNkJzogJ0wnLCAnXFx1MDEzZic6ICdMJywgJ1xcdTAxNDEnOiAnTCcsXG4gICdcXHUwMTNhJzogJ2wnLCAgJ1xcdTAxM2MnOiAnbCcsICdcXHUwMTNlJzogJ2wnLCAnXFx1MDE0MCc6ICdsJywgJ1xcdTAxNDInOiAnbCcsXG4gICdcXHUwMTQzJzogJ04nLCAgJ1xcdTAxNDUnOiAnTicsICdcXHUwMTQ3JzogJ04nLCAnXFx1MDE0YSc6ICdOJyxcbiAgJ1xcdTAxNDQnOiAnbicsICAnXFx1MDE0Nic6ICduJywgJ1xcdTAxNDgnOiAnbicsICdcXHUwMTRiJzogJ24nLFxuICAnXFx1MDE0Yyc6ICdPJywgICdcXHUwMTRlJzogJ08nLCAnXFx1MDE1MCc6ICdPJyxcbiAgJ1xcdTAxNGQnOiAnbycsICAnXFx1MDE0Zic6ICdvJywgJ1xcdTAxNTEnOiAnbycsXG4gICdcXHUwMTU0JzogJ1InLCAgJ1xcdTAxNTYnOiAnUicsICdcXHUwMTU4JzogJ1InLFxuICAnXFx1MDE1NSc6ICdyJywgICdcXHUwMTU3JzogJ3InLCAnXFx1MDE1OSc6ICdyJyxcbiAgJ1xcdTAxNWEnOiAnUycsICAnXFx1MDE1Yyc6ICdTJywgJ1xcdTAxNWUnOiAnUycsICdcXHUwMTYwJzogJ1MnLFxuICAnXFx1MDE1Yic6ICdzJywgICdcXHUwMTVkJzogJ3MnLCAnXFx1MDE1Zic6ICdzJywgJ1xcdTAxNjEnOiAncycsXG4gICdcXHUwMTYyJzogJ1QnLCAgJ1xcdTAxNjQnOiAnVCcsICdcXHUwMTY2JzogJ1QnLFxuICAnXFx1MDE2Myc6ICd0JywgICdcXHUwMTY1JzogJ3QnLCAnXFx1MDE2Nyc6ICd0JyxcbiAgJ1xcdTAxNjgnOiAnVScsICAnXFx1MDE2YSc6ICdVJywgJ1xcdTAxNmMnOiAnVScsICdcXHUwMTZlJzogJ1UnLCAnXFx1MDE3MCc6ICdVJywgJ1xcdTAxNzInOiAnVScsXG4gICdcXHUwMTY5JzogJ3UnLCAgJ1xcdTAxNmInOiAndScsICdcXHUwMTZkJzogJ3UnLCAnXFx1MDE2Zic6ICd1JywgJ1xcdTAxNzEnOiAndScsICdcXHUwMTczJzogJ3UnLFxuICAnXFx1MDE3NCc6ICdXJywgICdcXHUwMTc1JzogJ3cnLFxuICAnXFx1MDE3Nic6ICdZJywgICdcXHUwMTc3JzogJ3knLCAnXFx1MDE3OCc6ICdZJyxcbiAgJ1xcdTAxNzknOiAnWicsICAnXFx1MDE3Yic6ICdaJywgJ1xcdTAxN2QnOiAnWicsXG4gICdcXHUwMTdhJzogJ3onLCAgJ1xcdTAxN2MnOiAneicsICdcXHUwMTdlJzogJ3onLFxuICAnXFx1MDEzMic6ICdJSicsICdcXHUwMTMzJzogJ2lqJyxcbiAgJ1xcdTAxNTInOiAnT2UnLCAnXFx1MDE1Myc6ICdvZScsXG4gICdcXHUwMTQ5JzogXCInblwiLCAnXFx1MDE3Zic6ICdzcydcbn07XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucmVkdWNlYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbml0QWNjdW1dIFNwZWNpZnkgdXNpbmcgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGFycmF5YCBhc1xuICogIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhcnJheVJlZHVjZShhcnJheSwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yLCBpbml0QWNjdW0pIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgaWYgKGluaXRBY2N1bSAmJiBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGFycmF5WysraW5kZXhdO1xuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBpdGVyYXRlZShhY2N1bXVsYXRvciwgYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuLyoqXG4gKiBTcGxpdHMgYW4gQVNDSUkgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICovXG5mdW5jdGlvbiBhc2NpaVdvcmRzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlQXNjaWlXb3JkKSB8fCBbXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFVzZWQgYnkgYF8uZGVidXJyYCB0byBjb252ZXJ0IExhdGluLTEgU3VwcGxlbWVudCBhbmQgTGF0aW4gRXh0ZW5kZWQtQVxuICogbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVyIFRoZSBtYXRjaGVkIGxldHRlciB0byBkZWJ1cnIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBkZWJ1cnJlZCBsZXR0ZXIuXG4gKi9cbnZhciBkZWJ1cnJMZXR0ZXIgPSBiYXNlUHJvcGVydHlPZihkZWJ1cnJlZExldHRlcnMpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBhIHdvcmQgY29tcG9zZWQgb2YgVW5pY29kZSBzeW1ib2xzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhIHdvcmQgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pY29kZVdvcmQoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGVXb3JkLnRlc3Qoc3RyaW5nKTtcbn1cblxuLyoqXG4gKiBTcGxpdHMgYSBVbmljb2RlIGBzdHJpbmdgIGludG8gYW4gYXJyYXkgb2YgaXRzIHdvcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVdvcmRzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlVW5pY29kZVdvcmQpIHx8IFtdO1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmNhbWVsQ2FzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBjb21iaW5lIGVhY2ggd29yZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbXBvdW5kZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvdW5kZXIoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHJldHVybiBhcnJheVJlZHVjZSh3b3JkcyhkZWJ1cnIoc3RyaW5nKS5yZXBsYWNlKHJlQXBvcywgJycpKSwgY2FsbGJhY2ssICcnKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIERlYnVycnMgYHN0cmluZ2AgYnkgY29udmVydGluZ1xuICogW0xhdGluLTEgU3VwcGxlbWVudF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGF0aW4tMV9TdXBwbGVtZW50XyhVbmljb2RlX2Jsb2NrKSNDaGFyYWN0ZXJfdGFibGUpXG4gKiBhbmQgW0xhdGluIEV4dGVuZGVkLUFdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhdGluX0V4dGVuZGVkLUEpXG4gKiBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMgYW5kIHJlbW92aW5nXG4gKiBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3MpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGRlYnVyci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGRlYnVycmVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWJ1cnIoJ2TDqWrDoCB2dScpO1xuICogLy8gPT4gJ2RlamEgdnUnXG4gKi9cbmZ1bmN0aW9uIGRlYnVycihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIHN0cmluZyAmJiBzdHJpbmcucmVwbGFjZShyZUxhdGluLCBkZWJ1cnJMZXR0ZXIpLnJlcGxhY2UocmVDb21ib01hcmssICcnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0b1xuICogW2tlYmFiIGNhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI1NwZWNpYWxfY2FzZV9zdHlsZXMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBrZWJhYiBjYXNlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ua2ViYWJDYXNlKCdGb28gQmFyJyk7XG4gKiAvLyA9PiAnZm9vLWJhcidcbiAqXG4gKiBfLmtlYmFiQ2FzZSgnZm9vQmFyJyk7XG4gKiAvLyA9PiAnZm9vLWJhcidcbiAqXG4gKiBfLmtlYmFiQ2FzZSgnX19GT09fQkFSX18nKTtcbiAqIC8vID0+ICdmb28tYmFyJ1xuICovXG52YXIga2ViYWJDYXNlID0gY3JlYXRlQ29tcG91bmRlcihmdW5jdGlvbihyZXN1bHQsIHdvcmQsIGluZGV4KSB7XG4gIHJldHVybiByZXN1bHQgKyAoaW5kZXggPyAnLScgOiAnJykgKyB3b3JkLnRvTG93ZXJDYXNlKCk7XG59KTtcblxuLyoqXG4gKiBTcGxpdHMgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7UmVnRXhwfHN0cmluZ30gW3BhdHRlcm5dIFRoZSBwYXR0ZXJuIHRvIG1hdGNoIHdvcmRzLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ud29yZHMoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJyk7XG4gKiAvLyA9PiBbJ2ZyZWQnLCAnYmFybmV5JywgJ3BlYmJsZXMnXVxuICpcbiAqIF8ud29yZHMoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJywgL1teLCBdKy9nKTtcbiAqIC8vID0+IFsnZnJlZCcsICdiYXJuZXknLCAnJicsICdwZWJibGVzJ11cbiAqL1xuZnVuY3Rpb24gd29yZHMoc3RyaW5nLCBwYXR0ZXJuLCBndWFyZCkge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICBwYXR0ZXJuID0gZ3VhcmQgPyB1bmRlZmluZWQgOiBwYXR0ZXJuO1xuXG4gIGlmIChwYXR0ZXJuID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gaGFzVW5pY29kZVdvcmQoc3RyaW5nKSA/IHVuaWNvZGVXb3JkcyhzdHJpbmcpIDogYXNjaWlXb3JkcyhzdHJpbmcpO1xuICB9XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocGF0dGVybikgfHwgW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2ViYWJDYXNlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xudmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgPSAxLFxuICAgIFBBUlRJQUxfQ09NUEFSRV9GTEFHID0gMjtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLyxcbiAgICByZUxlYWRpbmdEb3QgPSAvXlxcLi8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKSxcbiAgICBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgY2FjaGUgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBjYWNoZS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBjYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc0luYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSGFzSW4ob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGtleSBpbiBPYmplY3Qob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gKiBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy5cbiAqICBUaGUgYml0bWFzayBtYXkgYmUgY29tcG9zZWQgb2YgdGhlIGZvbGxvd2luZyBmbGFnczpcbiAqICAgICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAqICAgICAyIC0gUGFydGlhbCBjb21wYXJpc29uXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdCh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gZ2V0VGFnKG9iamVjdCk7XG4gICAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IGdldFRhZyhvdGhlcik7XG4gICAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG9iamVjdCksXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcgJiYgIWlzSG9zdE9iamVjdChvdGhlciksXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICByZXR1cm4gKG9iaklzQXJyIHx8IGlzVHlwZWRBcnJheShvYmplY3QpKVxuICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgOiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gIH1cbiAgaWYgKCEoYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHKSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHZhciBvYmpVbndyYXBwZWQgPSBvYmpJc1dyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCxcbiAgICAgICAgICBvdGhVbndyYXBwZWQgPSBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXI7XG5cbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9ialVud3JhcHBlZCwgb3RoVW53cmFwcGVkLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHJldHVybiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIGN1c3RvbWl6ZXIsIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgfCBQQVJUSUFMX0NPTVBBUkVfRkxBRywgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pdGVyYXRlZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW3ZhbHVlPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGFuIGl0ZXJhdGVlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBpdGVyYXRlZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUl0ZXJhdGVlKHZhbHVlKSB7XG4gIC8vIERvbid0IHN0b3JlIHRoZSBgdHlwZW9mYCByZXN1bHQgaW4gYSB2YXJpYWJsZSB0byBhdm9pZCBhIEpJVCBidWcgaW4gU2FmYXJpIDkuXG4gIC8vIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU2MDM0IGZvciBtb3JlIGRldGFpbHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpXG4gICAgICA/IGJhc2VNYXRjaGVzUHJvcGVydHkodmFsdWVbMF0sIHZhbHVlWzFdKVxuICAgICAgOiBiYXNlTWF0Y2hlcyh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHByb3BlcnR5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIG1hdGNoRGF0YSA9IGdldE1hdGNoRGF0YShzb3VyY2UpO1xuICBpZiAobWF0Y2hEYXRhLmxlbmd0aCA9PSAxICYmIG1hdGNoRGF0YVswXVsyXSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShtYXRjaERhdGFbMF1bMF0sIG1hdGNoRGF0YVswXVsxXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT09IHNvdXJjZSB8fCBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNyY1ZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICBpZiAoaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHNyY1ZhbHVlKSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSh0b0tleShwYXRoKSwgc3JjVmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgb2JqVmFsdWUgPSBnZXQob2JqZWN0LCBwYXRoKTtcbiAgICByZXR1cm4gKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgb2JqVmFsdWUgPT09IHNyY1ZhbHVlKVxuICAgICAgPyBoYXNJbihvYmplY3QsIHBhdGgpXG4gICAgICA6IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgdW5kZWZpbmVkLCBVTk9SREVSRURfQ09NUEFSRV9GTEFHIHwgUEFSVElBTF9DT01QQVJFX0ZMQUcpO1xuICB9O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVByb3BlcnR5YCB3aGljaCBzdXBwb3J0cyBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eURlZXAocGF0aCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wdWxsQXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaW5kaXZpZHVhbFxuICogaW5kZXhlcyBvciBjYXB0dXJpbmcgdGhlIHJlbW92ZWQgZWxlbWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge251bWJlcltdfSBpbmRleGVzIFRoZSBpbmRleGVzIG9mIGVsZW1lbnRzIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlUHVsbEF0KGFycmF5LCBpbmRleGVzKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGluZGV4ZXMubGVuZ3RoIDogMCxcbiAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDE7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhlc1tsZW5ndGhdO1xuICAgIGlmIChsZW5ndGggPT0gbGFzdEluZGV4IHx8IGluZGV4ICE9PSBwcmV2aW91cykge1xuICAgICAgdmFyIHByZXZpb3VzID0gaW5kZXg7XG4gICAgICBpZiAoaXNJbmRleChpbmRleCkpIHtcbiAgICAgICAgc3BsaWNlLmNhbGwoYXJyYXksIGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc0tleShpbmRleCwgYXJyYXkpKSB7XG4gICAgICAgIHZhciBwYXRoID0gY2FzdFBhdGgoaW5kZXgpLFxuICAgICAgICAgICAgb2JqZWN0ID0gcGFyZW50KGFycmF5LCBwYXRoKTtcblxuICAgICAgICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICAgICAgICBkZWxldGUgb2JqZWN0W3RvS2V5KGxhc3QocGF0aCkpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBhcnJheVt0b0tleShpbmRleCldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc2xpY2VgIHdpdGhvdXQgYW4gaXRlcmF0ZWUgY2FsbCBndWFyZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNsaWNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHNsaWNlIG9mIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAtc3RhcnQgPiBsZW5ndGggPyAwIDogKGxlbmd0aCArIHN0YXJ0KTtcbiAgfVxuICBlbmQgPSBlbmQgPiBsZW5ndGggPyBsZW5ndGggOiBlbmQ7XG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlbmd0aDtcbiAgfVxuICBsZW5ndGggPSBzdGFydCA+IGVuZCA/IDAgOiAoKGVuZCAtIHN0YXJ0KSA+Pj4gMCk7XG4gIHN0YXJ0ID4+Pj0gMDtcblxuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gYXJyYXlbaW5kZXggKyBzdGFydF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogc3RyaW5nVG9QYXRoKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgc2VlbiA9IChiaXRtYXNrICYgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRykgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgc3RhY2suc2V0KGFycmF5LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgYXJyYXkpO1xuXG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleCwgb3RoZXIsIGFycmF5LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgsIGFycmF5LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICBpZiAoY29tcGFyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoc2Vlbikge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlLCBvdGhJbmRleCkge1xuICAgICAgICAgICAgaWYgKCFzZWVuLmhhcyhvdGhJbmRleCkgJiZcbiAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlZW4uYWRkKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gVU5PUkRFUkVEX0NPTVBBUkVfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcsXG4gICAgICBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzUGFydGlhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICBpZiAoIShpc1BhcnRpYWwgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIG9iamVjdCk7XG5cbiAgdmFyIHNraXBDdG9yID0gaXNQYXJ0aWFsO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXksIG90aGVyLCBvYmplY3QsIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKCEoY29tcGFyZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gKG9ialZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykpXG4gICAgICAgICAgOiBjb21wYXJlZFxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKHJlc3VsdCAmJiAhc2tpcEN0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG1hdGNoIGRhdGEgb2YgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoRGF0YShvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGtleSA9IHJlc3VsdFtsZW5ndGhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgcmVzdWx0W2xlbmd0aF0gPSBba2V5LCB2YWx1ZSwgaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExLFxuLy8gZm9yIGRhdGEgdmlld3MgaW4gRWRnZSA8IDE0LCBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcy5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciByZXN1bHQsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pO1xuICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICB9XG4gIGlmIChyZXN1bHQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QgPyBvYmplY3QubGVuZ3RoIDogMDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgIWlzT2JqZWN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYG1hdGNoZXNQcm9wZXJ0eWAgZm9yIHNvdXJjZSB2YWx1ZXMgc3VpdGFibGVcbiAqIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShrZXksIHNyY1ZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdFtrZXldID09PSBzcmNWYWx1ZSAmJlxuICAgICAgKHNyY1ZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiBPYmplY3Qob2JqZWN0KSkpO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHBhcmVudCB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gZ2V0IHRoZSBwYXJlbnQgdmFsdWUgb2YuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcGFyZW50IHZhbHVlLlxuICovXG5mdW5jdGlvbiBwYXJlbnQob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBwYXRoLmxlbmd0aCA9PSAxID8gb2JqZWN0IDogYmFzZUdldChvYmplY3QsIGJhc2VTbGljZShwYXRoLCAwLCAtMSkpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplKGZ1bmN0aW9uKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHJlTGVhZGluZ0RvdC50ZXN0KHN0cmluZykpIHtcbiAgICByZXN1bHQucHVzaCgnJyk7XG4gIH1cbiAgc3RyaW5nLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5sYXN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuIGxlbmd0aCA/IGFycmF5W2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGVsZW1lbnRzIGZyb20gYGFycmF5YCB0aGF0IGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvclxuICogYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHJlbW92ZWQgZWxlbWVudHMuIFRoZSBwcmVkaWNhdGUgaXMgaW52b2tlZFxuICogd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIGBfLmZpbHRlcmAsIHRoaXMgbWV0aG9kIG11dGF0ZXMgYGFycmF5YC4gVXNlIGBfLnB1bGxgXG4gKiB0byBwdWxsIGVsZW1lbnRzIGZyb20gYW4gYXJyYXkgYnkgdmFsdWUuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XVxuICogIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiByZW1vdmVkIGVsZW1lbnRzLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXkgPSBbMSwgMiwgMywgNF07XG4gKiB2YXIgZXZlbnMgPSBfLnJlbW92ZShhcnJheSwgZnVuY3Rpb24obikge1xuICogICByZXR1cm4gbiAlIDIgPT0gMDtcbiAqIH0pO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5KTtcbiAqIC8vID0+IFsxLCAzXVxuICpcbiAqIGNvbnNvbGUubG9nKGV2ZW5zKTtcbiAqIC8vID0+IFsyLCA0XVxuICovXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmICghKGFycmF5ICYmIGFycmF5Lmxlbmd0aCkpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5kZXhlcyA9IFtdLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHByZWRpY2F0ZSA9IGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH1cbiAgfVxuICBiYXNlUHVsbEF0KGFycmF5LCBpbmRleGVzKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBBc3NpZ24gY2FjaGUgdG8gYF8ubWVtb2l6ZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBpcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsIFsnYScsICdiJ10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYicpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaGFzSW4ob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGEgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW1xuICogICB7ICdhJzogeyAnYic6IDIgfSB9LFxuICogICB7ICdhJzogeyAnYic6IDEgfSB9XG4gKiBdO1xuICpcbiAqIF8ubWFwKG9iamVjdHMsIF8ucHJvcGVydHkoJ2EuYicpKTtcbiAqIC8vID0+IFsyLCAxXVxuICpcbiAqIF8ubWFwKF8uc29ydEJ5KG9iamVjdHMsIF8ucHJvcGVydHkoWydhJywgJ2InXSkpLCAnYS5iJyk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqL1xuZnVuY3Rpb24gcHJvcGVydHkocGF0aCkge1xuICByZXR1cm4gaXNLZXkocGF0aCkgPyBiYXNlUHJvcGVydHkodG9LZXkocGF0aCkpIDogYmFzZVByb3BlcnR5RGVlcChwYXRoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW1vdmU7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIDApID4gLTE7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhcnJheUluY2x1ZGVzYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGEgY29tcGFyYXRvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXNXaXRoKGFycmF5LCB2YWx1ZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChjb21wYXJhdG9yKHZhbHVlLCBhcnJheVtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgaWYgKHZhbHVlICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBiYXNlRmluZEluZGV4KGFycmF5LCBiYXNlSXNOYU4sIGZyb21JbmRleCk7XG4gIH1cbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hTmAgd2l0aG91dCBzdXBwb3J0IGZvciBudW1iZXIgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSGFzKGNhY2hlLCBrZXkpIHtcbiAgcmV0dXJuIGNhY2hlLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgfVxuICBlbHNlIGlmIChsZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIHZhciBzZXQgPSBpdGVyYXRlZSA/IG51bGwgOiBjcmVhdGVTZXQoYXJyYXkpO1xuICAgIGlmIChzZXQpIHtcbiAgICAgIHJldHVybiBzZXRUb0FycmF5KHNldCk7XG4gICAgfVxuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBzZWVuID0gbmV3IFNldENhY2hlO1xuICB9XG4gIGVsc2Uge1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXMoc2VlbiwgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICBpZiAoc2VlbiAhPT0gcmVzdWx0KSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNldCBvYmplY3Qgb2YgYHZhbHVlc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFkZCB0byB0aGUgc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IHNldC5cbiAqL1xudmFyIGNyZWF0ZVNldCA9ICEoU2V0ICYmICgxIC8gc2V0VG9BcnJheShuZXcgU2V0KFssLTBdKSlbMV0pID09IElORklOSVRZKSA/IG5vb3AgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXQodmFsdWVzKTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBkdXBsaWNhdGUtZnJlZSB2ZXJzaW9uIG9mIGFuIGFycmF5LCB1c2luZ1xuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucywgaW4gd2hpY2ggb25seSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBlYWNoXG4gKiBlbGVtZW50IGlzIGtlcHQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXEoWzIsIDEsIDJdKTtcbiAqIC8vID0+IFsyLCAxXVxuICovXG5mdW5jdGlvbiB1bmlxKGFycmF5KSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgID8gYmFzZVVuaXEoYXJyYXkpXG4gICAgOiBbXTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8ubm9vcCk7XG4gKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pcTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NYXR0LUVzY2gvdmlydHVhbC1kb20vYmxvYi9tYXN0ZXIvdmlydHVhbC1oeXBlcnNjcmlwdC9wYXJzZS10YWcuanNcblxudmFyIHNwbGl0ID0gcmVxdWlyZSgnYnJvd3Nlci1zcGxpdCcpXG5cbnZhciBjbGFzc0lkU3BsaXQgPSAvKFtcXC4jXT9bYS16QS1aMC05XFx1MDA3Ri1cXHVGRkZGXzotXSspL1xudmFyIG5vdENsYXNzSWQgPSAvXlxcLnwjL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlU2VsZWN0b3IgKHNlbGVjdG9yLCB1cHBlcikge1xuICBzZWxlY3RvciA9IHNlbGVjdG9yIHx8ICcnXG4gIHZhciB0YWdOYW1lXG4gIHZhciBpZCA9ICcnXG4gIHZhciBjbGFzc2VzID0gW11cblxuICB2YXIgdGFnUGFydHMgPSBzcGxpdChzZWxlY3RvciwgY2xhc3NJZFNwbGl0KVxuXG4gIGlmIChub3RDbGFzc0lkLnRlc3QodGFnUGFydHNbMV0pIHx8IHNlbGVjdG9yID09PSAnJykge1xuICAgIHRhZ05hbWUgPSAnZGl2J1xuICB9XG5cbiAgdmFyIHBhcnQsIHR5cGUsIGlcblxuICBmb3IgKGkgPSAwOyBpIDwgdGFnUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBwYXJ0ID0gdGFnUGFydHNbaV1cblxuICAgIGlmICghcGFydCkge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICB0eXBlID0gcGFydC5jaGFyQXQoMClcblxuICAgIGlmICghdGFnTmFtZSkge1xuICAgICAgdGFnTmFtZSA9IHBhcnRcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICcuJykge1xuICAgICAgY2xhc3Nlcy5wdXNoKHBhcnQuc3Vic3RyaW5nKDEsIHBhcnQubGVuZ3RoKSlcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICcjJykge1xuICAgICAgaWQgPSBwYXJ0LnN1YnN0cmluZygxLCBwYXJ0Lmxlbmd0aClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRhZ05hbWU6IHVwcGVyID09PSB0cnVlID8gdGFnTmFtZS50b1VwcGVyQ2FzZSgpIDogdGFnTmFtZSxcbiAgICBpZDogaWQsXG4gICAgY2xhc3NOYW1lOiBjbGFzc2VzLmpvaW4oJyAnKVxuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jbGFzcyBjaGVja0ZvckVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3IpIHtcclxuICAgICAgICBzdXBlcihlcnJvcik7XHJcbiAgICAgICAgY29uc3QgaXNFcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICA8c3R5bGU+XHJcbiAgICAgICAgICAgICAgICBib2R5IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMHZoO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6I2M3ZTJmMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImhlaWdodDogMTAwdmg7IGJhY2tncm91bmQ6I2M3ZTJmMTsgcGFkZGluZzogMjBweDtcIj5cclxuICAgICAgICAgICAgPGgzIHN0eWxlPVwiY29sb3I6IHJlZDtcIj5UeXBlRXJyb3I6ICR7dGhpcy5tZXNzYWdlfTwvaDM+XHJcbiAgICAgICAgICAgIDxwPjwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLWNvblwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2M3ZTJmMTsgYm9yZGVyOiAycHggc29saWQgIzM4YjZmZjsgcGFkZGluZzogOHB4IDEycHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PiR7dGhpcy5zdGFja308L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIGA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yXCIpLmlubmVySFRNTCA9IGlzRXJyb3IoKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGNoZWNrRm9yRXJyb3I7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHF1aWNrX2Vycm9yXzEgPSByZXF1aXJlKFwicXVpY2stZXJyb3JcIik7XHJcbmNvbnN0IHNuYWJiZG9tID0gcmVxdWlyZShcInNuYWJiZG9tXCIpO1xyXG5jb25zdCBwcm9wc18xID0gcmVxdWlyZShcInNuYWJiZG9tL21vZHVsZXMvcHJvcHNcIik7XHJcbmNvbnN0IHJlY29uY2lsZSA9IHNuYWJiZG9tLmluaXQoW3Byb3BzXzEuZGVmYXVsdF0pO1xyXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xyXG5jb25zdCBzbmFiYmRvbV8xID0gcmVxdWlyZShcInNuYWJiZG9tXCIpO1xyXG5jb25zdCBpbml0ID0gcmVxdWlyZSgnc25hYmJkb20tdG8taHRtbC9pbml0Jyk7XHJcbmNvbnN0IG1vZHVsZXMgPSByZXF1aXJlKCdzbmFiYmRvbS10by1odG1sL21vZHVsZXMnKTtcclxuY29uc3QgdG9IVE1MID0gaW5pdChbbW9kdWxlcy5jbGFzcywgbW9kdWxlcy5wcm9wcywgbW9kdWxlcy5hdHRyaWJ1dGVzLCBtb2R1bGVzLnN0eWxlXSk7XHJcbi8vIGludGVyZmFjZSBJUXVpY2sge1xyXG4vLyAgICAgcmVhZG9ubHkgJGVsOiBFbGVtZW50LFxyXG4vLyB9XHJcbi8vIGZ1bmN0aW9uIHdhdGNoRWZmZWN0KGZuOlAgYW55KSB7XHJcbi8vICAgICB0aGlzLmFjdGl2ZUVmZmVjdCA9IGZuXHJcbi8vICAgICBmbigpXHJcbi8vICAgICB0aGlzLmFjdGl2ZUVmZmVjdCA9IG51bGxcclxuLy8gfVxyXG5jbGFzcyBEZXAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycyA9IG5ldyBTZXQoKTtcclxuICAgIH1cclxuICAgIGRlcGVuZChhY3RpdmVFZmZlY3QpIHtcclxuICAgICAgICBpZiAoYWN0aXZlRWZmZWN0KVxyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmFkZChhY3RpdmVFZmZlY3QpO1xyXG4gICAgfVxyXG4gICAgbm90aWZ5KCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgoc3ViKSA9PiB7XHJcbiAgICAgICAgICAgIHN1YigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgdC5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHsgfVxyXG4gICAgc2V0U3RhdGUocGFydGlhbFN0YXRlKSB7XHJcbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAuLi5fdGhpcy5zdGF0ZSxcclxuICAgICAgICAgICAgLi4ucGFydGlhbFN0YXRlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgUXVpY2suX191cGRhdGVyKF90aGlzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcihlbCwgcikge1xyXG4gICAgICAgIHJlY29uY2lsZShyb290LCBlbCk7XHJcbiAgICB9XHJcbn1cclxuY29uc3QgX3B0ID0gQ29tcG9uZW50LnByb3RvdHlwZTtcclxuX3B0LmlzUXVpY2tDbGFzc0NvbXBvbmVudCA9IHRydWU7XHJcbmNvbnN0IHJlbmRlciA9IChjb21wb25lbnQsIHJvb3QpID0+IHtcclxuICAgIGlmICghY29tcG9uZW50KSB7XHJcbiAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdCgnQ2Fubm90IHJlbmRlciB3aXRob3V0IGNvbXBvbmVudCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFyb290KSB7XHJcbiAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdCgnQ2Fubm90IHJlbmRlciB3aXRob3V0IERPTSBlbGVtZW50Jyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWNvbXBvbmVudCAmJiAhcm9vdCkge1xyXG4gICAgICAgIG5ldyBxdWlja19lcnJvcl8xLmRlZmF1bHQoJ0Nhbm5vdCByZW5kZXIgd2l0aG91dCBDb21wb25lbnQgYW5kIERPTSBlbGVtZW50Jyk7XHJcbiAgICB9XHJcbiAgICByZWNvbmNpbGUocm9vdCwgY29tcG9uZW50KTtcclxufTtcclxuY29uc3QgX2luaXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcbiAgICBmYXYuaHJlZiA9ICcvZmF2aWNvbi5pY28nO1xyXG4gICAgZmF2LnJlbCA9ICdpY29uJztcclxuICAgIGNvbnN0IGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpO1xyXG59O1xyXG5jb25zdCAkID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbn07XHJcbmNvbnN0IGNvbXBvbmVudExvYWRlZCA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfSk7XHJcbn07XHJcbmNvbnN0IGxpc3RlbmVyID0gKHRhcmdldCwgdHlwZSwgZm4sIHByZXZlbnQpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgcnVuQmVmb3JlRG9tTG9hZGVkID0gKGZ1bmMpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgZnVuYztcclxuICAgIH0pO1xyXG59O1xyXG5jb25zdCB2aWV3ID0gKHZpZXcpID0+IHtcclxuICAgIGNvbnN0IHJlbmRlclZpZXd0b0hUTUwgPSB0b0hUTUwodmlldyk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykuaW5uZXJIVE1MID0gcmVuZGVyVmlld3RvSFRNTDtcclxufTtcclxuY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCBwcm9wcyA9IHt9LCAuLi5jaGlsZHJlbikgPT4ge1xyXG4gICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5mbGF0KCk7XHJcbiAgICBpZiAodHlwZS5wcm90b3R5cGUgJiYgdHlwZS5wcm90b3R5cGUuaXNRbmRSZWFjdENsYXNzQ29tcG9uZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBuZXcgdHlwZShwcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEluc3RhbmNlLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0eXBlID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdHlwZShwcm9wcyk7XHJcbiAgICB9XHJcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gICAgbGV0IGRhdGFQcm9wcyA9IHt9O1xyXG4gICAgbGV0IGV2ZW50UHJvcHMgPSB7fTtcclxuICAgIGZvciAobGV0IHByb3BLZXkgaW4gcHJvcHMpIHtcclxuICAgICAgICAvLyBldmVudCBwcm9wcyBhbHdheXMgc3RhcnR3aXRoIG9uIGVnLiBvbkNsaWNrLCBvbkNoYW5nZSBldGMuXHJcbiAgICAgICAgaWYgKHByb3BLZXkuc3RhcnRzV2l0aCgnb24nKSkge1xyXG4gICAgICAgICAgICAvLyBvbkNsaWNrIC0+IGNsaWNrXHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gcHJvcEtleS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgZXZlbnRQcm9wc1tldmVudF0gPSBwcm9wc1twcm9wS2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGFQcm9wc1twcm9wS2V5XSA9IHByb3BzW3Byb3BLZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzbmFiYmRvbV8xLmgodHlwZSwgeyBwcm9wcyB9LCBjaGlsZHJlbik7XHJcbn07XHJcbmNvbnN0IF9fdXBkYXRlciA9IChpbnN0YW5jZSkgPT4ge1xyXG4gICAgcmV0dXJuIGluc3RhbmNlO1xyXG59O1xyXG5jb25zdCBjb25maWcgPSAoZW52KSA9PiB7XHJcbiAgICBpZiAoZW52ID09PSAncHJvZHVjdGlvbicpIHtcclxuICAgIH1cclxuICAgIGlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIH1cclxuICAgIGlmICghZW52IHx8IGVudiA9PT0gJycpIHtcclxuICAgIH1cclxufTtcclxuY29uc3QgUXVpY2sgPSB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBydW5CZWZvcmVEb21Mb2FkZWQsXHJcbiAgICB2aWV3LFxyXG4gICAgY3JlYXRlRWxlbWVudCxcclxuICAgIF9fdXBkYXRlcixcclxuICAgIGNvbmZpZyxcclxuICAgIHJlbmRlcixcclxuICAgIF9pbml0LFxyXG4gICAgbGlzdGVuZXIsXHJcbiAgICAkLFxyXG4gICAgY29tcG9uZW50TG9hZGVkLFxyXG59O1xyXG5RdWljay5ydW5CZWZvcmVEb21Mb2FkZWQoUXVpY2suX2luaXQpO1xyXG5RdWljay5ydW5CZWZvcmVEb21Mb2FkZWQoUXVpY2subGlzdGVuZXIpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBRdWljaztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy51c2VSZWYgPSBleHBvcnRzLlF1aWNrUm91dGVyTGluayA9IGV4cG9ydHMuY3JlYXRlUG9wU3RhdGUgPSBleHBvcnRzLlF1aWNrUm91dGVyID0gdm9pZCAwO1xyXG5jb25zdCBxdWlja2pzX2NvbXBvbmVudF8xID0gcmVxdWlyZShcInF1aWNranMtY29tcG9uZW50XCIpO1xyXG5jb25zdCBxdWlja19lcnJvcl8xID0gcmVxdWlyZShcInF1aWNrLWVycm9yXCIpO1xyXG5jb25zdCBwYXRoVG9SZWdleCA9IChwYXRoKSA9PiBuZXcgUmVnRXhwKCdeJyArIHBhdGgucmVwbGFjZSgvXFwvL2csICdcXFxcLycpLnJlcGxhY2UoLzpcXHcrL2csICcoLispJykgKyAnJCcpO1xyXG5jb25zdCBnZXRQYXJhbXMgPSAobWF0Y2gpID0+IHtcclxuICAgIGlmIChtYXRjaC5yZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ldyBxdWlja19lcnJvcl8xLmRlZmF1bHQoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1zJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBtYXRjaC5yZXN1bHQuc2xpY2UoMSk7XHJcbiAgICBjb25zdCBrZXlzID0gQXJyYXkuZnJvbShtYXRjaC5yb3V0ZS5wYXRoLm1hdGNoQWxsKC86KFxcdyspL2cpKS5tYXAoKHJlc3VsdCkgPT4gcmVzdWx0WzFdKTtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhrZXlzLm1hcCgoa2V5LCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlc1tpXV07XHJcbiAgICB9KSk7XHJcbn07XHJcbmNsYXNzIFF1aWNrUm91dGVyIHtcclxuICAgIGFzeW5jIHVzZVJvdXRlKHJvdXRlcywgdXJsKSB7XHJcbiAgICAgICAgaWYgKHJvdXRlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdCgncm91dGVzIGNhbm5vdCBiZSBlbXB0eScpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENoZWNrIGlmIHJvdXRlIG1hdGNoZXMgVVJMXHJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHJvdXRlcy5tYXAoKHJvdXRlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogcm91dGUsXHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKHBhdGhUb1JlZ2V4KHJvdXRlLnBhdGgpKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZmluZE1hdGNoID0gbWF0Y2hlcy5maW5kKChtYXRjaCkgPT4gbWF0Y2gucmVzdWx0ICE9PSBudWxsKTtcclxuICAgICAgICBpZiAoIWZpbmRNYXRjaCkge1xyXG4gICAgICAgICAgICBmaW5kTWF0Y2ggPSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogcm91dGVzLmZpbmQoKHJvdXRlKSA9PiByb3V0ZS5wYXRoID09PSAnL2Vycm9yJyksXHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtsb2NhdGlvbi5wYXRobmFtZV0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgZmluZE1hdGNoLnJvdXRlLnZpZXcoZ2V0UGFyYW1zKGZpbmRNYXRjaCkpO1xyXG4gICAgICAgICAgICBxdWlja2pzX2NvbXBvbmVudF8xLmRlZmF1bHQudmlldyhhd2FpdCB2aWV3LnJlbmRlcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBmaW5kTWF0Y2gucm91dGUudmlldyhnZXRQYXJhbXMoZmluZE1hdGNoKSk7XHJcbiAgICAgICAgcXVpY2tqc19jb21wb25lbnRfMS5kZWZhdWx0LnZpZXcoYXdhaXQgdmlldy5yZW5kZXIoKSk7XHJcbiAgICAgICAgdGhpcy5zZXRUaXRsZShmaW5kTWF0Y2gucm91dGUudGl0bGUpO1xyXG4gICAgICAgIHJldHVybiByb3V0ZXM7XHJcbiAgICB9XHJcbiAgICBnZXRSb3V0ZShjYWxsYmFjaykge1xyXG4gICAgICAgIGNvbnN0IGZyb20gPSBkb2N1bWVudC5yZWZlcnJlcjtcclxuICAgICAgICBjb25zdCB0byA9IGxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IEZ1bmN0aW9uO1xyXG4gICAgICAgIGNvbnN0IHJvdXRlID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmdWxsUGF0aDogbG9jYXRpb24uaHJlZixcclxuICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBsb2NhdGlvbi5wYXRobmFtZSxcclxuICAgICAgICAgICAgICAgIHBhcmFtczogbG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGNhbGxiYWNrKHJvdXRlKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0byxcclxuICAgICAgICAgICAgZnJvbSxcclxuICAgICAgICAgICAgcm91dGUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNyZWF0ZU5hdmlnYXRpb24ocm91dGVzKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQubG9jYWxOYW1lID09PSAnYScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmV4dGVybmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGUudGFyZ2V0LmhyZWY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBlLnRhcmdldC5ocmVmKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFF1aWNrUm91dGVyLnByb3RvdHlwZS51c2VSb3V0ZShyb3V0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaXRsZSh0aXRsZSkge1xyXG4gICAgICAgIGlmICh0aXRsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ1F1aWNrIEFwcCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlF1aWNrUm91dGVyID0gUXVpY2tSb3V0ZXI7XHJcbmZ1bmN0aW9uIGNyZWF0ZVBvcFN0YXRlKHJvdXRlcykge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKCkgPT4ge1xyXG4gICAgICAgIFF1aWNrUm91dGVyLnByb3RvdHlwZS51c2VSb3V0ZShyb3V0ZXMpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5jcmVhdGVQb3BTdGF0ZSA9IGNyZWF0ZVBvcFN0YXRlO1xyXG5jbGFzcyBRdWlja1JvdXRlckxpbmsgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGNvbnN0IHQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGxpbmtUbyA9IHRoaXMuZ2V0QXR0cmlidXRlKCd0bycpO1xyXG4gICAgICAgIGlmICghbGlua1RvKSB7XHJcbiAgICAgICAgICAgIG5ldyBxdWlja19lcnJvcl8xLmRlZmF1bHQoYHRvIGF0dHJpYnV0ZSBtdXN0IGJlIHNwZWNpZmllZCB0byByb3V0ZSwgcXVpY2stbGluayByZXR1cm5lZCAke2xpbmtUb31gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY3VzdG9tVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIGN1c3RvbVRhZy5ocmVmID0gbGlua1RvO1xyXG4gICAgICAgIGN1c3RvbVRhZy5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcclxuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ3JlZicpKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVRhZy5pZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdyZWYnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVRhZy5pZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZShjdXN0b21UYWcsIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5jaGlsZHJlbik7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJIVE1MID09PSAnJykge1xyXG4gICAgICAgICAgICBjdXN0b21UYWcuaW5uZXJUZXh0ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYXR0cmliSSA9IHRoaXMuYXR0cmlidXRlc1tpXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYkEgPSB0aGlzLmF0dHJpYnV0ZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmliSS5uYW1lID09PSAndG8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaHJlZiA9ICdocmVmJztcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJJLm5hbWUgPT09IGhyZWY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21UYWcuc2V0QXR0cmlidXRlKGAke2F0dHJpYkkubmFtZX1gLCBgJHthdHRyaWJJLnZhbHVlfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5RdWlja1JvdXRlckxpbmsgPSBRdWlja1JvdXRlckxpbms7XHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3F1aWNrLXJvdXRlci1saW5rJywgUXVpY2tSb3V0ZXJMaW5rKTtcclxucXVpY2tqc19jb21wb25lbnRfMS5kZWZhdWx0LnJ1bkJlZm9yZURvbUxvYWRlZChRdWlja1JvdXRlckxpbmspO1xyXG5jbGFzcyB1c2VSZWYge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgYXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXBwPy5jaGlsZHJlbik7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZSgnaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy51c2VSZWYgPSB1c2VSZWY7XHJcbiIsIlxuLy8gQWxsIFNWRyBjaGlsZHJlbiBlbGVtZW50cywgbm90IGluIHRoaXMgbGlzdCwgc2hvdWxkIHNlbGYtY2xvc2VcblxuZXhwb3J0cy5DT05UQUlORVIgPSB7XG4gIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1NWRy9pbnRyby5odG1sI1Rlcm1Db250YWluZXJFbGVtZW50XG4gICdhJzogdHJ1ZSxcbiAgJ2RlZnMnOiB0cnVlLFxuICAnZ2x5cGgnOiB0cnVlLFxuICAnZyc6IHRydWUsXG4gICdtYXJrZXInOiB0cnVlLFxuICAnbWFzayc6IHRydWUsXG4gICdtaXNzaW5nLWdseXBoJzogdHJ1ZSxcbiAgJ3BhdHRlcm4nOiB0cnVlLFxuICAnc3ZnJzogdHJ1ZSxcbiAgJ3N3aXRjaCc6IHRydWUsXG4gICdzeW1ib2wnOiB0cnVlLFxuICAndGV4dCc6IHRydWUsXG5cbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHL2ludHJvLmh0bWwjVGVybURlc2NyaXB0aXZlRWxlbWVudFxuICAnZGVzYyc6IHRydWUsXG4gICdtZXRhZGF0YSc6IHRydWUsXG4gICd0aXRsZSc6IHRydWVcbn1cblxuLy8gaHR0cDovL3d3dy53My5vcmcvaHRtbC93Zy9kcmFmdHMvaHRtbC9tYXN0ZXIvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xuXG5leHBvcnRzLlZPSUQgPSB7XG4gIGFyZWE6IHRydWUsXG4gIGJhc2U6IHRydWUsXG4gIGJyOiB0cnVlLFxuICBjb2w6IHRydWUsXG4gIGVtYmVkOiB0cnVlLFxuICBocjogdHJ1ZSxcbiAgaW1nOiB0cnVlLFxuICBpbnB1dDogdHJ1ZSxcbiAga2V5Z2VuOiB0cnVlLFxuICBsaW5rOiB0cnVlLFxuICBtZXRhOiB0cnVlLFxuICBwYXJhbTogdHJ1ZSxcbiAgc291cmNlOiB0cnVlLFxuICB0cmFjazogdHJ1ZSxcbiAgd2JyOiB0cnVlXG59XG4iLCJcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcbnZhciBwYXJzZVNlbGVjdG9yID0gcmVxdWlyZSgncGFyc2Utc2VsJylcbnZhciBWT0lEX0VMRU1FTlRTID0gcmVxdWlyZSgnLi9lbGVtZW50cycpLlZPSURcbnZhciBDT05UQUlORVJfRUxFTUVOVFMgPSByZXF1aXJlKCcuL2VsZW1lbnRzJykuQ09OVEFJTkVSXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5pdCAobW9kdWxlcykge1xuICBmdW5jdGlvbiBwYXJzZSAodm5vZGUsIG5vZGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICB2YXIgYXR0cmlidXRlcyA9IG5ldyBNYXAoW1xuICAgICAgLy8gVGhlc2UgY2FuIGJlIG92ZXJ3cml0dGVuIGJlY2F1c2UgdGhhdOKAmXMgd2hhdCBoYXBwZW5zIGluIHNuYWJiZG9tXG4gICAgICBbJ2lkJywgbm9kZS5pZF0sXG4gICAgICBbJ2NsYXNzJywgbm9kZS5jbGFzc05hbWVdXG4gICAgXSlcblxuICAgIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZm4sIGluZGV4KSB7XG4gICAgICBmbih2bm9kZSwgYXR0cmlidXRlcylcbiAgICB9KVxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgICByZXN1bHQucHVzaChrZXkgKyAnPVwiJyArIHZhbHVlICsgJ1wiJylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJylcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJUb1N0cmluZyAodm5vZGUpIHtcbiAgICBpZiAodHlwZW9mIHZub2RlID09PSAndW5kZWZpbmVkJyB8fCB2bm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgaWYgKCF2bm9kZS5zZWwgJiYgdHlwZW9mIHZub2RlLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZXNjYXBlKHZub2RlLnRleHQpXG4gICAgfVxuXG4gICAgdm5vZGUuZGF0YSA9IHZub2RlLmRhdGEgfHwge31cblxuICAgIC8vIFN1cHBvcnQgdGh1bmtzXG4gICAgaWYgKHZub2RlLmRhdGEuaG9vayAmJlxuICAgICAgdHlwZW9mIHZub2RlLmRhdGEuaG9vay5pbml0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2Ygdm5vZGUuZGF0YS5mbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdm5vZGUuZGF0YS5ob29rLmluaXQodm5vZGUpXG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSBwYXJzZVNlbGVjdG9yKHZub2RlLnNlbClcbiAgICB2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZVxuICAgIHZhciBhdHRyaWJ1dGVzID0gcGFyc2Uodm5vZGUsIG5vZGUpXG4gICAgdmFyIHN2ZyA9IHZub2RlLmRhdGEubnMgPT09ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbiAgICB2YXIgdGFnID0gW11cblxuICAgIGlmICh0YWdOYW1lID09PSAnIScpIHtcbiAgICAgIHJldHVybiAnPCEtLScgKyB2bm9kZS50ZXh0ICsgJy0tPidcbiAgICB9XG5cbiAgICAvLyBPcGVuIHRhZ1xuICAgIHRhZy5wdXNoKCc8JyArIHRhZ05hbWUpXG4gICAgaWYgKGF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICB0YWcucHVzaCgnICcgKyBhdHRyaWJ1dGVzKVxuICAgIH1cbiAgICBpZiAoc3ZnICYmIENPTlRBSU5FUl9FTEVNRU5UU1t0YWdOYW1lXSAhPT0gdHJ1ZSkge1xuICAgICAgdGFnLnB1c2goJyAvJylcbiAgICB9XG4gICAgdGFnLnB1c2goJz4nKVxuXG4gICAgLy8gQ2xvc2UgdGFnLCBpZiBuZWVkZWRcbiAgICBpZiAoKFZPSURfRUxFTUVOVFNbdGFnTmFtZV0gIT09IHRydWUgJiYgIXN2ZykgfHxcbiAgICAgICAgKHN2ZyAmJiBDT05UQUlORVJfRUxFTUVOVFNbdGFnTmFtZV0gPT09IHRydWUpKSB7XG4gICAgICBpZiAodm5vZGUuZGF0YS5wcm9wcyAmJiB2bm9kZS5kYXRhLnByb3BzLmlubmVySFRNTCkge1xuICAgICAgICB0YWcucHVzaCh2bm9kZS5kYXRhLnByb3BzLmlubmVySFRNTClcbiAgICAgIH0gZWxzZSBpZiAodm5vZGUudGV4dCkge1xuICAgICAgICB0YWcucHVzaChlc2NhcGUodm5vZGUudGV4dCkpXG4gICAgICB9IGVsc2UgaWYgKHZub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgdGFnLnB1c2gocmVuZGVyVG9TdHJpbmcoY2hpbGQpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGFnLnB1c2goJzwvJyArIHRhZ05hbWUgKyAnPicpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRhZy5qb2luKCcnKVxuICB9XG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gZGF0YS5hdHRyc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF0dHJzTW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzIHx8IHt9XG5cbiAgZm9yT3duKGF0dHJzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KGtleSwgZXNjYXBlKHZhbHVlKSlcbiAgfSlcbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIHJlbW92ZSA9IHJlcXVpcmUoJ2xvZGFzaC5yZW1vdmUnKVxudmFyIHVuaXEgPSByZXF1aXJlKCdsb2Rhc2gudW5pcScpXG5cbi8vIGRhdGEuY2xhc3NcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGFzc01vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHZhbHVlc1xuICB2YXIgX2FkZCA9IFtdXG4gIHZhciBfcmVtb3ZlID0gW11cbiAgdmFyIGNsYXNzZXMgPSB2bm9kZS5kYXRhLmNsYXNzIHx8IHt9XG4gIHZhciBleGlzdGluZyA9IGF0dHJpYnV0ZXMuZ2V0KCdjbGFzcycpXG4gIGV4aXN0aW5nID0gZXhpc3RpbmcubGVuZ3RoID4gMCA/IGV4aXN0aW5nLnNwbGl0KCcgJykgOiBbXVxuXG4gIGZvck93bihjbGFzc2VzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgX2FkZC5wdXNoKGtleSlcbiAgICB9IGVsc2Uge1xuICAgICAgX3JlbW92ZS5wdXNoKGtleSlcbiAgICB9XG4gIH0pXG5cbiAgdmFsdWVzID0gcmVtb3ZlKHVuaXEoZXhpc3RpbmcuY29uY2F0KF9hZGQpKSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIF9yZW1vdmUuaW5kZXhPZih2YWx1ZSkgPCAwXG4gIH0pXG5cbiAgaWYgKHZhbHVlcy5sZW5ndGgpIHtcbiAgICBhdHRyaWJ1dGVzLnNldCgnY2xhc3MnLCB2YWx1ZXMuam9pbignICcpKVxuICB9XG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gZGF0YS5kYXRhc2V0XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGF0YXNldE1vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIGRhdGFzZXQgPSB2bm9kZS5kYXRhLmRhdGFzZXQgfHwge31cblxuICBmb3JPd24oZGF0YXNldCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBhdHRyaWJ1dGVzLnNldChgZGF0YS0ke2tleX1gLCBlc2NhcGUodmFsdWUpKVxuICB9KVxufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2xhc3M6IHJlcXVpcmUoJy4vY2xhc3MnKSxcbiAgcHJvcHM6IHJlcXVpcmUoJy4vcHJvcHMnKSxcbiAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gIGRhdGFzZXQ6IHJlcXVpcmUoJy4vZGF0YXNldCcpXG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL2VsZW1lbnRcbnZhciBvbWl0ID0gW1xuICAnYXR0cmlidXRlcycsXG4gICdjaGlsZEVsZW1lbnRDb3VudCcsXG4gICdjaGlsZHJlbicsXG4gICdjbGFzc0xpc3QnLFxuICAnY2xpZW50SGVpZ2h0JyxcbiAgJ2NsaWVudExlZnQnLFxuICAnY2xpZW50VG9wJyxcbiAgJ2NsaWVudFdpZHRoJyxcbiAgJ2N1cnJlbnRTdHlsZScsXG4gICdmaXJzdEVsZW1lbnRDaGlsZCcsXG4gICdpbm5lckhUTUwnLFxuICAnbGFzdEVsZW1lbnRDaGlsZCcsXG4gICduZXh0RWxlbWVudFNpYmxpbmcnLFxuICAnb25nb3Rwb2ludGVyY2FwdHVyZScsXG4gICdvbmxvc3Rwb2ludGVyY2FwdHVyZScsXG4gICdvbndoZWVsJyxcbiAgJ291dGVySFRNTCcsXG4gICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJyxcbiAgJ3J1bnRpbWVTdHlsZScsXG4gICdzY3JvbGxIZWlnaHQnLFxuICAnc2Nyb2xsTGVmdCcsXG4gICdzY3JvbGxMZWZ0TWF4JyxcbiAgJ3Njcm9sbFRvcCcsXG4gICdzY3JvbGxUb3BNYXgnLFxuICAnc2Nyb2xsV2lkdGgnLFxuICAndGFiU3RvcCcsXG4gICd0YWdOYW1lJ1xuXVxuXG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI2Jvb2xlYW4tYXR0cmlidXRlc1xudmFyIGJvb2xlYW5BdHRyaWJ1dGVzID0gW1xuICAnZGlzYWJsZWQnLFxuICAndmlzaWJsZScsXG4gICdjaGVja2VkJyxcbiAgJ3JlYWRvbmx5JyxcbiAgJ3JlcXVpcmVkJyxcbiAgJ2FsbG93ZnVsbHNjcmVlbicsXG4gICdhdXRvZm9jdXMnLFxuICAnYXV0b3BsYXknLFxuICAnY29tcGFjdCcsXG4gICdjb250cm9scycsXG4gICdkZWZhdWx0JyxcbiAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgJ2hpZGRlbicsXG4gICdpc21hcCcsXG4gICdpdGVtc2NvcGUnLFxuICAnbG9vcCcsXG4gICdtdWx0aXBsZScsXG4gICdtdXRlZCcsXG4gICdub3Jlc2l6ZScsXG4gICdub3NoYWRlJyxcbiAgJ25vdmFsaWRhdGUnLFxuICAnbm93cmFwJyxcbiAgJ29wZW4nLFxuICAncmV2ZXJzZWQnLFxuICAnc2VhbWxlc3MnLFxuICAnc2VsZWN0ZWQnLFxuICAnc29ydGFibGUnLFxuICAndHJ1ZXNwZWVkJyxcbiAgJ3R5cGVtdXN0bWF0Y2gnXG5dXG5cbi8vIGRhdGEucHJvcHNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcm9wc01vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcyB8fCB7fVxuXG4gIGZvck93bihwcm9wcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBpZiAob21pdC5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChrZXkgPT09ICdodG1sRm9yJykge1xuICAgICAga2V5ID0gJ2ZvcidcbiAgICB9XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzTmFtZScpIHtcbiAgICAgIGtleSA9ICdjbGFzcydcbiAgICB9XG5cbiAgICB2YXIgbGtleSA9IGtleS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKH5ib29sZWFuQXR0cmlidXRlcy5pbmRleE9mKGxrZXkpKSB7XG4gICAgICBpZiAodmFsdWUpIHsgLy8gc2V0IGF0dHIgb25seSB3aGVuIHRydXRoeVxuICAgICAgICBhdHRyaWJ1dGVzLnNldChsa2V5LCBsa2V5KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJ1dGVzLnNldChsa2V5LCBlc2NhcGUodmFsdWUpKVxuICAgIH1cbiAgfSlcbn1cbiIsIlxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKVxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxudmFyIGtlYmFiQ2FzZSA9IHJlcXVpcmUoJ2xvZGFzaC5rZWJhYmNhc2UnKVxuXG4vLyBkYXRhLnN0eWxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGVNb2R1bGUgKHZub2RlLCBhdHRyaWJ1dGVzKSB7XG4gIHZhciB2YWx1ZXMgPSBbXVxuICB2YXIgc3R5bGUgPSB2bm9kZS5kYXRhLnN0eWxlIHx8IHt9XG5cbiAgLy8gbWVyZ2UgaW4gYGRlbGF5ZWRgIHByb3BlcnRpZXNcbiAgaWYgKHN0eWxlLmRlbGF5ZWQpIHtcbiAgICBhc3NpZ24oc3R5bGUsIHN0eWxlLmRlbGF5ZWQpXG4gIH1cblxuICBmb3JPd24oc3R5bGUsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgLy8gb21pdCBob29rIG9iamVjdHNcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB2YXIga2ViYWJLZXkgPSBrZWJhYkNhc2Uoa2V5KVxuICAgICAgdmFsdWVzLnB1c2goKGtleS5tYXRjaCgvXi0tLiovKSA/ICctLScgKyBrZWJhYktleSA6IGtlYmFiS2V5KSArICc6ICcgKyBlc2NhcGUodmFsdWUpKVxuICAgIH1cbiAgfSlcblxuICBpZiAodmFsdWVzLmxlbmd0aCkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KCdzdHlsZScsIHZhbHVlcy5qb2luKCc7ICcpKVxuICB9XG59XG4iLCJpbXBvcnQgeyB2bm9kZSB9IGZyb20gJy4vdm5vZGUnO1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnLi9pcyc7XG5mdW5jdGlvbiBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKSB7XG4gICAgZGF0YS5ucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgaWYgKHNlbCAhPT0gJ2ZvcmVpZ25PYmplY3QnICYmIGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkRGF0YSA9IGNoaWxkcmVuW2ldLmRhdGE7XG4gICAgICAgICAgICBpZiAoY2hpbGREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhZGROUyhjaGlsZERhdGEsIGNoaWxkcmVuW2ldLmNoaWxkcmVuLCBjaGlsZHJlbltpXS5zZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGlzLnByaW1pdGl2ZShjaGlsZHJlbltpXSkpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSB2bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgdW5kZWZpbmVkKTtcbn1cbjtcbmV4cG9ydCBkZWZhdWx0IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG59XG5mdW5jdGlvbiByZW1vdmVDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG59XG5mdW5jdGlvbiBuZXh0U2libGluZyhub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG59XG5mdW5jdGlvbiB0YWdOYW1lKGVsbSkge1xuICAgIHJldHVybiBlbG0udGFnTmFtZTtcbn1cbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KG5vZGUsIHRleHQpIHtcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cbmZ1bmN0aW9uIGdldFRleHRDb250ZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudDtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XG59XG5mdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xufVxuZnVuY3Rpb24gaXNDb21tZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gODtcbn1cbmV4cG9ydCB2YXIgaHRtbERvbUFwaSA9IHtcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnROUzogY3JlYXRlRWxlbWVudE5TLFxuICAgIGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcbiAgICBjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuICAgIGluc2VydEJlZm9yZTogaW5zZXJ0QmVmb3JlLFxuICAgIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gICAgcGFyZW50Tm9kZTogcGFyZW50Tm9kZSxcbiAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBzZXRUZXh0Q29udGVudDogc2V0VGV4dENvbnRlbnQsXG4gICAgZ2V0VGV4dENvbnRlbnQ6IGdldFRleHRDb250ZW50LFxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgIGlzVGV4dDogaXNUZXh0LFxuICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxufTtcbmV4cG9ydCBkZWZhdWx0IGh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcCIsImV4cG9ydCB2YXIgYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZXhwb3J0IGZ1bmN0aW9uIHByaW1pdGl2ZShzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcyA9PT0gJ251bWJlcic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy5qcy5tYXAiLCJpbXBvcnQgdm5vZGUgZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBodG1sRG9tQXBpIGZyb20gJy4vaHRtbGRvbWFwaSc7XG5mdW5jdGlvbiBpc1VuZGVmKHMpIHsgcmV0dXJuIHMgPT09IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gaXNEZWYocykgeyByZXR1cm4gcyAhPT0gdW5kZWZpbmVkOyB9XG52YXIgZW1wdHlOb2RlID0gdm5vZGUoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuZnVuY3Rpb24gc2FtZVZub2RlKHZub2RlMSwgdm5vZGUyKSB7XG4gICAgcmV0dXJuIHZub2RlMS5rZXkgPT09IHZub2RlMi5rZXkgJiYgdm5vZGUxLnNlbCA9PT0gdm5vZGUyLnNlbDtcbn1cbmZ1bmN0aW9uIGlzVm5vZGUodm5vZGUpIHtcbiAgICByZXR1cm4gdm5vZGUuc2VsICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeChjaGlsZHJlbiwgYmVnaW5JZHgsIGVuZElkeCkge1xuICAgIHZhciBpLCBtYXAgPSB7fSwga2V5LCBjaDtcbiAgICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgICAgICBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAga2V5ID0gY2gua2V5O1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG1hcFtrZXldID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufVxudmFyIGhvb2tzID0gWydjcmVhdGUnLCAndXBkYXRlJywgJ3JlbW92ZScsICdkZXN0cm95JywgJ3ByZScsICdwb3N0J107XG5leHBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmV4cG9ydCB7IHRodW5rIH0gZnJvbSAnLi90aHVuayc7XG5leHBvcnQgZnVuY3Rpb24gaW5pdChtb2R1bGVzLCBkb21BcGkpIHtcbiAgICB2YXIgaSwgaiwgY2JzID0ge307XG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbERvbUFwaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGhvb2sgPSBtb2R1bGVzW2pdW2hvb2tzW2ldXTtcbiAgICAgICAgICAgIGlmIChob29rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjYnNbaG9va3NbaV1dLnB1c2goaG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlOb2RlQXQoZWxtKSB7XG4gICAgICAgIHZhciBpZCA9IGVsbS5pZCA/ICcjJyArIGVsbS5pZCA6ICcnO1xuICAgICAgICB2YXIgYyA9IGVsbS5jbGFzc05hbWUgPyAnLicgKyBlbG0uY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHJldHVybiB2bm9kZShhcGkudGFnTmFtZShlbG0pLnRvTG93ZXJDYXNlKCkgKyBpZCArIGMsIHt9LCBbXSwgdW5kZWZpbmVkLCBlbG0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVSbUNiKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJtQ2IoKSB7XG4gICAgICAgICAgICBpZiAoLS1saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBhcGkucGFyZW50Tm9kZShjaGlsZEVsbSk7XG4gICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudF8xLCBjaGlsZEVsbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmluaXQpKSB7XG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW4sIHNlbCA9IHZub2RlLnNlbDtcbiAgICAgICAgaWYgKHNlbCA9PT0gJyEnKSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIHZub2RlLnRleHQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVDb21tZW50KHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBQYXJzZSBzZWxlY3RvclxuICAgICAgICAgICAgdmFyIGhhc2hJZHggPSBzZWwuaW5kZXhPZignIycpO1xuICAgICAgICAgICAgdmFyIGRvdElkeCA9IHNlbC5pbmRleE9mKCcuJywgaGFzaElkeCk7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IGhhc2hJZHggPiAwID8gaGFzaElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgZG90ID0gZG90SWR4ID4gMCA/IGRvdElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdGFnID0gaGFzaElkeCAhPT0gLTEgfHwgZG90SWR4ICE9PSAtMSA/IHNlbC5zbGljZSgwLCBNYXRoLm1pbihoYXNoLCBkb3QpKSA6IHNlbDtcbiAgICAgICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBpc0RlZihkYXRhKSAmJiBpc0RlZihpID0gZGF0YS5ucykgPyBhcGkuY3JlYXRlRWxlbWVudE5TKGksIHRhZylcbiAgICAgICAgICAgICAgICA6IGFwaS5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgICAgICBpZiAoaGFzaCA8IGRvdClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdpZCcsIHNlbC5zbGljZShoYXNoICsgMSwgZG90KSk7XG4gICAgICAgICAgICBpZiAoZG90SWR4ID4gMClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdjbGFzcycsIHNlbC5zbGljZShkb3QgKyAxKS5yZXBsYWNlKC9cXC4vZywgJyAnKSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmNyZWF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuY3JlYXRlW2ldKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgICAgICAgICAgIGlmIChpLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkuaW5zZXJ0KVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlLmVsbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpLCBiZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludm9rZURlc3Ryb3lIb29rKHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBqLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5kZXN0cm95W2ldKHZub2RlKTtcbiAgICAgICAgICAgIGlmICh2bm9kZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB2bm9kZS5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gbnVsbCAmJiB0eXBlb2YgaSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBpXzEgPSB2b2lkIDAsIGxpc3RlbmVycyA9IHZvaWQgMCwgcm0gPSB2b2lkIDAsIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKGNoLnNlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBjYnMucmVtb3ZlLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJtID0gY3JlYXRlUm1DYihjaC5lbG0sIGxpc3RlbmVycyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaV8xID0gMDsgaV8xIDwgY2JzLnJlbW92ZS5sZW5ndGg7ICsraV8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2JzLnJlbW92ZVtpXzFdKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZihpXzEgPSBjaC5kYXRhKSAmJiBpc0RlZihpXzEgPSBpXzEuaG9vaykgJiYgaXNEZWYoaV8xID0gaV8xLnJlbW92ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfMShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHsgLy8gVGV4dCBub2RlXG4gICAgICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRFbG0sIGNoLmVsbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKHBhcmVudEVsbSwgb2xkQ2gsIG5ld0NoLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIG9sZFN0YXJ0SWR4ID0gMCwgbmV3U3RhcnRJZHggPSAwO1xuICAgICAgICB2YXIgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFswXTtcbiAgICAgICAgdmFyIG9sZEVuZFZub2RlID0gb2xkQ2hbb2xkRW5kSWR4XTtcbiAgICAgICAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBuZXdTdGFydFZub2RlID0gbmV3Q2hbMF07XG4gICAgICAgIHZhciBuZXdFbmRWbm9kZSA9IG5ld0NoW25ld0VuZElkeF07XG4gICAgICAgIHZhciBvbGRLZXlUb0lkeDtcbiAgICAgICAgdmFyIGlkeEluT2xkO1xuICAgICAgICB2YXIgZWxtVG9Nb3ZlO1xuICAgICAgICB2YXIgYmVmb3JlO1xuICAgICAgICB3aGlsZSAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4ICYmIG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgbWlnaHQgaGF2ZSBiZWVuIG1vdmVkIGxlZnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZEVuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld1N0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld0VuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgcmlnaHRcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBvbGRTdGFydFZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgbGVmdFxuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGRLZXlUb0lkeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHhJbk9sZCA9IG9sZEtleVRvSWR4W25ld1N0YXJ0Vm5vZGUua2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZihpZHhJbk9sZCkpIHsgLy8gTmV3IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbVRvTW92ZS5zZWwgIT09IG5ld1N0YXJ0Vm5vZGUuc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUoZWxtVG9Nb3ZlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGVsbVRvTW92ZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggfHwgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRJZHggPiBvbGRFbmRJZHgpIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXdDaFtuZXdFbmRJZHggKyAxXSA9PSBudWxsID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGhvb2s7XG4gICAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YSkgJiYgaXNEZWYoaG9vayA9IGkuaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucHJlcGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHZhciBjaCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAob2xkVm5vZGUgPT09IHZub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodm5vZGUuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rO1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkpICYmIGlzRGVmKGkgPSBpLnVwZGF0ZSkpXG4gICAgICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpICYmIGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRDaCAhPT0gY2gpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkcmVuKGVsbSwgb2xkQ2gsIGNoLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKVxuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmKGhvb2spICYmIGlzRGVmKGkgPSBob29rLnBvc3RwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGF0Y2gob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBlbG0sIHBhcmVudDtcbiAgICAgICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnByZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wcmVbaV0oKTtcbiAgICAgICAgaWYgKCFpc1Zub2RlKG9sZFZub2RlKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgICAgIHBhcmVudCA9IGFwaS5wYXJlbnROb2RlKGVsbSk7XG4gICAgICAgICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnQsIHZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKGVsbSkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnQsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRlZFZub2RlUXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KGluc2VydGVkVm5vZGVRdWV1ZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wb3N0Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnBvc3RbaV0oKTtcbiAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zbmFiYmRvbS5qcy5tYXAiLCJpbXBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmZ1bmN0aW9uIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuaykge1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbiAgICB2bm9kZS5kYXRhLmZuID0gdGh1bmsuZGF0YS5mbjtcbiAgICB2bm9kZS5kYXRhLmFyZ3MgPSB0aHVuay5kYXRhLmFyZ3M7XG4gICAgdGh1bmsuZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdGh1bmsuY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICB0aHVuay50ZXh0ID0gdm5vZGUudGV4dDtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG59XG5mdW5jdGlvbiBpbml0KHRodW5rKSB7XG4gICAgdmFyIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIHZub2RlID0gY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgY3VyLmFyZ3MpO1xuICAgIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuayk7XG59XG5mdW5jdGlvbiBwcmVwYXRjaChvbGRWbm9kZSwgdGh1bmspIHtcbiAgICB2YXIgaSwgb2xkID0gb2xkVm5vZGUuZGF0YSwgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgb2xkQXJncyA9IG9sZC5hcmdzLCBhcmdzID0gY3VyLmFyZ3M7XG4gICAgaWYgKG9sZC5mbiAhPT0gY3VyLmZuIHx8IG9sZEFyZ3MubGVuZ3RoICE9PSBhcmdzLmxlbmd0aCkge1xuICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvbGRBcmdzW2ldICE9PSBhcmdzW2ldKSB7XG4gICAgICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvcHlUb1RodW5rKG9sZFZub2RlLCB0aHVuayk7XG59XG5leHBvcnQgdmFyIHRodW5rID0gZnVuY3Rpb24gdGh1bmsoc2VsLCBrZXksIGZuLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcmdzID0gZm47XG4gICAgICAgIGZuID0ga2V5O1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBoKHNlbCwge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgaG9vazogeyBpbml0OiBpbml0LCBwcmVwYXRjaDogcHJlcGF0Y2ggfSxcbiAgICAgICAgZm46IGZuLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgdGh1bms7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHVuay5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0IGRlZmF1bHQgdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZVByb3BzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBrZXksIGN1ciwgb2xkLCBlbG0gPSB2bm9kZS5lbG0sIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5wcm9wcywgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzO1xuICAgIGlmICghb2xkUHJvcHMgJiYgIXByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZFByb3BzID09PSBwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZFByb3BzID0gb2xkUHJvcHMgfHwge307XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgICAgICBpZiAoIXByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbG1ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICBjdXIgPSBwcm9wc1trZXldO1xuICAgICAgICBvbGQgPSBvbGRQcm9wc1trZXldO1xuICAgICAgICBpZiAob2xkICE9PSBjdXIgJiYgKGtleSAhPT0gJ3ZhbHVlJyB8fCBlbG1ba2V5XSAhPT0gY3VyKSkge1xuICAgICAgICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnByb3BzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZVByb3BzLCB1cGRhdGU6IHVwZGF0ZVByb3BzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnByb3BzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcHMuanMubWFwIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiXHJcbmltcG9ydCB7IFF1aWNrUm91dGVyLCBjcmVhdGVQb3BTdGF0ZSB9IGZyb20gXCJxdWlja2pzLXJvdXRlclwiO1xyXG5jb25zdCByb3V0ZXIgPSBuZXcgUXVpY2tSb3V0ZXI7XHJcbmltcG9ydCBUb2RvcyBmcm9tIFwiLi4vdmlld3MvVG9kb3NcIjtcclxuaW1wb3J0IE5vdEZvdW5kIGZyb20gXCIuLi92aWV3cy9Ob3Rmb3VuZFwiXHJcbmNvbnN0ICByb3V0ZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJy8nLFxyXG4gICAgICAgIHZpZXc6IFRvZG9zLFxyXG4gICAgICAgIHRpdGxlOiBcIkhvbWVcIixcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJy9lcnJvcicsXHJcbiAgICAgICAgdmlldzogTm90Rm91bmQsXHJcbiAgICAgICAgdGl0bGU6IFwiUGFnZSBOb3QgRm91bmRcIixcclxuICAgIH0sXHJcbl07XHJcblxyXG5RdWljay5ydW5CZWZvcmVEb21Mb2FkZWQocm91dGVyLnVzZVJvdXRlKHJvdXRlcykpO1xyXG5yb3V0ZXIuY3JlYXRlTmF2aWdhdGlvbihyb3V0ZXMpXHJcbmNyZWF0ZVBvcFN0YXRlKHJvdXRlcylcclxuZXhwb3J0IGRlZmF1bHQgcm91dGVzIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBRdWljay5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbXQtNjBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZFwiPk5vdCBGb3VuZDwvaDE+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+SG9tZTwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCI7XHJcbmltcG9ydCBUb2Rvc0xpc3QgZnJvbSBcIi4vVG9kb3NMaXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyBleHRlbmRzIFF1aWNrLkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICBzdXBlcihwYXJhbXMpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb24gbWItMTRcIj5cclxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTN4bCB0ZXh0LWNlbnRlciB0ZXh0LXllbGxvdy02MDAgbXQtMjAgZm9udC1ib2xkXCI+VG9kb3M8L2gxPlxyXG4gICAgICAgICAgICAgICAgPFRvZG9zTGlzdCAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9kb0xpc3QodG9kbykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvZG9zLWNvbiB3LTExLzEyIGJsb2NrIG1sLWF1dG8gbXItYXV0b1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIwIHRvZG9zLW1haW4gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInRvZG9JbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJOZXcgVG9kb1wiIGNsYXNzTmFtZT1cImJnLWdyYXktMjAwIHctZnVsbCBwLTIgcm91bmRlZC1zbSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0xIGZvY3VzOnJpbmcteWVsbG93LTYwMFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiYWRkVG9kb0J0blwiIGNsYXNzTmFtZT1cImJnLXllbGxvdy02MDAgdGV4dC13aGl0ZSByb3VuZGVkLXNtIHctNDAgbWwtNSBwLTIgZm9jdXM6b3V0bGluZS1ub25lXCI+QWRkIFRvZG88L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvZG9zLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgIDx1bCBpZD1cInRvZG9zLWxpc3QtY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNldFRvZG8oKSB7XHJcbiAgICBjb25zdCB0b2RvSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9JbnB1dFwiKTtcclxuICAgIHRvZG9JbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcclxuICAgICAgICBpZihlLmtleSA9PT0gXCJFbnRlclwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0b2RvSW5wdXQudmFsdWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGFkZFRvZG8odG9kb0lucHV0LnZhbHVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvZG9JbnB1dC52YWx1ZSA9IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkVG9kb0J0blwiKTtcclxuICAgIGFkZFRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKHRvZG9JbnB1dC52YWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBhZGRUb2RvKHRvZG9JbnB1dC52YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9kb0lucHV0LnZhbHVlID0gXCJcIlxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUb2RvKHRvZG8pIHtcclxuICAgIGNvbnN0IHRvZG9zQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2Rvcy1saXN0LWNvblwiKTtcclxuICAgIHRvZG9zQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb21wbGV0ZU9yRGVsZXRlVG9kbylcclxuICAgIGNvbnN0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgdG9kb0VsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxzcGFuPiR7dG9kb308L3NwYW4+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXhcIj5cclxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJjb21wbGV0ZVRvZG9cIiBjbGFzcz1cIm91dGxpbmUtbm9uZSBmb2N1czpvdXRsaW5lLW5vbmVcIj5cclxuICAgICAgICAgICAgPHN2ZyBuYW1lPVwiY29tcGxldGVUb2RvXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwidy02IGN1cnNvci1wb2ludGVyXCI+XHJcbiAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTUgMTNsNCA0TDE5IDdcIiBuYW1lPVwiY29tcGxldGVUb2RvXCIvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJkZWxldGVUb2RvXCIgY2xhc3M9XCJ3LTggbWwtNiBvdXRsaW5lLW5vbmUgZm9jdXM6b3V0bGluZS1ub25lXCI+XHJcbiAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBjbGFzcz1cInctNiBjdXJzb3ItcG9pbnRlclwiIG5hbWU9XCJkZWxldGVUb2RvXCI+XHJcbiAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNOSAyYTEgMSAwIDAwLS44OTQuNTUzTDcuMzgyIDRINGExIDEgMCAwMDAgMnYxMGEyIDIgMCAwMDIgMmg4YTIgMiAwIDAwMi0yVjZhMSAxIDAgMTAwLTJoLTMuMzgybC0uNzI0LTEuNDQ3QTEgMSAwIDAwMTEgMkg5ek03IDhhMSAxIDAgMDEyIDB2NmExIDEgMCAxMS0yIDBWOHptNS0xYTEgMSAwIDAwLTEgMXY2YTEgMSAwIDEwMiAwVjhhMSAxIDAgMDAtMS0xelwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB0b2RvRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmxleFwiLCBcImp1c3RpZnktYmV0d2VlblwiLCBcImJnLWdyYXktMTAwXCIsIFwibXQtNVwiLCBcInAtMlwiLCBcImJvcmRlci1iXCIsIFwiYm9yZGVyLXllbGxvdy02MDBcIiwgXCJ3LWZ1bGxcIik7XHJcbiAgICB0b2Rvc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvRWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBsZXRlT3JEZWxldGVUb2RvKGUpIHtcclxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSBcInN2Z1wiKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQubmFtZSA9PT0gXCJjb21wbGV0ZVRvZG9cIikge1xyXG4gICAgICAgICAgICBsZXQgdG9kbyA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICBpZiAodG9kby5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9PT0gXCJsaW5lLXRocm91Z2hcIikge1xyXG4gICAgICAgICAgICAgICAgdG9kby5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b2RvLnN0eWxlLnRleHREZWNvcmF0aW9uID0gXCJsaW5lLXRocm91Z2hcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnRhcmdldC5wYXJlbnRFbGVtZW50Lm5hbWUgPT09IFwiZGVsZXRlVG9kb1wiKSB7XHJcbiAgICAgICAgICAgIGxldCB0b2RvID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRvZG8ucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09IFwicGF0aFwiKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5uYW1lID09PSBcImNvbXBsZXRlVG9kb1wiKSB7XHJcbiAgICAgICAgICAgIGxldCB0b2RvID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgaWYgKHRvZG8uc3R5bGUudGV4dERlY29yYXRpb24gPT09IFwibGluZS10aHJvdWdoXCIpIHtcclxuICAgICAgICAgICAgICAgIHRvZG8uc3R5bGUudGV4dERlY29yYXRpb24gPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9kby5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9IFwibGluZS10aHJvdWdoXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lm5hbWUgPT09IFwiZGVsZXRlVG9kb1wiKSB7XHJcbiAgICAgICAgICAgIGxldCB0b2RvID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgdG9kby5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5RdWljay5jb21wb25lbnRMb2FkZWQoc2V0VG9kbyk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIjtcclxuaW1wb3J0IHJvdXRlcyBmcm9tIFwiLi4vc3JjL3JvdXRlci9yb3V0ZXNcIjsiXSwic291cmNlUm9vdCI6IiJ9