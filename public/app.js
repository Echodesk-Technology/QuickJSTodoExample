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
      className: "detail p-10 ml-4 mr-4"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h3", {
      className: "mt-6"
    }, "QuickJS is a JavaScript library for building single page server-rendered web applications."), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h3", {
      className: "mt-6"
    }, "QuickJS comes with a custom pre-configured development environment. We save you time building your applications. We take away the hard parts, so you can focus on building applications rather setting up servers and configurations."), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h3", {
      className: "mt-6 font-bold"
    }, "Ecosystem | External links"), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("ul", {
      className: "mt-4"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "https://quickjs.org",
      "data-external": true,
      className: "mr-3 underline"
    }, "Quickjs-component")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "https://quickjs.org",
      "data-external": true,
      className: "mr-3 underline"
    }, "Quickjs-router")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "https://quickjs.org",
      "data-external": true,
      className: "mr-3 underline"
    }, "Quickjs-dom")))));
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
      className: "con mb-14"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "mt-8 text-center"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      className: "mr-3 text-primary-normal underline active"
    }, "Home"), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/about",
      className: "underline"
    }, "About")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      className: "logo mt-5 w-10 p-1 max-w-md block ml-auto mr-auto animate-bounce"
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("img", {
      className: "quick-logo w-8",
      src: "https://res.cloudinary.com/serveryguken/image/upload/v1615188992/QuickJS/logo/quickjs-logo_wjx3dw.svg"
    })), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", {
      class: "welcome text-center mt-2 text-3xl text-black font-bold"
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
    className: "list rounded p-3 w-5/12 cursor-pointer max-w-md  border border-gray-200 mt-4"
  }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("di", {
    className: "title"
  }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
    className: "text-xl font-bold text-black flex items-center mt-2"
  }, "Documentat ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
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
    className: "list rounded shadow-sm p-3 w-5/12 cursor-pointer max-w-md border  border-gray-200 mt-4"
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
    className: "list rounded shadow-sm p-3 w-5/12 cursor-pointer max-w-md border border-gray-200  mt-4"
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
    className: "list rounded shadow-sm p-3 w-5/12 max-w-md border cursor-pointer  border-gray-200  mt-4"
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
// Quick needs to be imported to use jsx


const Welcome = ({
  name
}) => {
  return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
    className: "text-5xl p-1 wc-txt"
  }, "Welcome to ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
    className: "text-primary-normal"
  }, " ", name, "! "));
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItc3BsaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmZvcm93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZWJhYmNhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVtb3ZlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcGFyc2Utc2VsL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcXVpY2stZXJyb3IvcXVpY2stZXJyb3IuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLWNvbXBvbmVudC9saWIvcXVpY2suanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLXJvdXRlci9saWIvcXVpY2stcm91dGVyLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvaW5pdC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uLi9zcmMvaC50cyIsIndlYnBhY2s6Ly9xdWlja2pzLy4uL3NyYy9odG1sZG9tYXBpLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL2lzLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3NuYWJiZG9tLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3RodW5rLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3Zub2RlLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL21vZHVsZXMvcHJvcHMudHMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy9yb3V0ZXIvcm91dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvQWJvdXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9BcHAuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9MaXN0LmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvTm90Zm91bmQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9XZWxjb21lLmpzIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9xdWlja2pzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL3F1aWNranMvLi9wdWJsaWMvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInNwbGl0IiwidW5kZWYiLCJuYXRpdmVTcGxpdCIsIlN0cmluZyIsInByb3RvdHlwZSIsImNvbXBsaWFudEV4ZWNOcGNnIiwiZXhlYyIsInNlbGYiLCJzdHIiLCJzZXBhcmF0b3IiLCJsaW1pdCIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsIm91dHB1dCIsImZsYWdzIiwiaWdub3JlQ2FzZSIsIm11bHRpbGluZSIsImV4dGVuZGVkIiwic3RpY2t5IiwibGFzdExhc3RJbmRleCIsIlJlZ0V4cCIsInNvdXJjZSIsInNlcGFyYXRvcjIiLCJtYXRjaCIsImxhc3RJbmRleCIsImxhc3RMZW5ndGgiLCJpbmRleCIsImxlbmd0aCIsInB1c2giLCJzbGljZSIsInJlcGxhY2UiLCJpIiwiYXJndW1lbnRzIiwiQXJyYXkiLCJhcHBseSIsInRlc3QiLCJJTkZJTklUWSIsInN5bWJvbFRhZyIsInJlVW5lc2NhcGVkSHRtbCIsInJlSGFzVW5lc2NhcGVkSHRtbCIsImh0bWxFc2NhcGVzIiwiZnJlZUdsb2JhbCIsImdsb2JhbCIsImZyZWVTZWxmIiwicm9vdCIsIkZ1bmN0aW9uIiwiYmFzZVByb3BlcnR5T2YiLCJvYmplY3QiLCJrZXkiLCJ1bmRlZmluZWQiLCJlc2NhcGVIdG1sQ2hhciIsIm9iamVjdFByb3RvIiwib2JqZWN0VG9TdHJpbmciLCJTeW1ib2wiLCJzeW1ib2xQcm90byIsInN5bWJvbFRvU3RyaW5nIiwiYmFzZVRvU3RyaW5nIiwidmFsdWUiLCJpc1N5bWJvbCIsInJlc3VsdCIsImlzT2JqZWN0TGlrZSIsImVzY2FwZSIsInN0cmluZyIsIk1BWF9TQUZFX0lOVEVHRVIiLCJhcmdzVGFnIiwiZnVuY1RhZyIsImdlblRhZyIsInJlSXNVaW50IiwiYmFzZVRpbWVzIiwibiIsIml0ZXJhdGVlIiwib3ZlckFyZyIsImZ1bmMiLCJ0cmFuc2Zvcm0iLCJhcmciLCJoYXNPd25Qcm9wZXJ0eSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwibmF0aXZlS2V5cyIsImtleXMiLCJhcnJheUxpa2VLZXlzIiwiaW5oZXJpdGVkIiwiaXNBcnJheSIsImlzQXJndW1lbnRzIiwic2tpcEluZGV4ZXMiLCJpc0luZGV4IiwiYmFzZUZvciIsImNyZWF0ZUJhc2VGb3IiLCJiYXNlRm9yT3duIiwiYmFzZUtleXMiLCJpc1Byb3RvdHlwZSIsImZyb21SaWdodCIsImtleXNGdW5jIiwiaXRlcmFibGUiLCJwcm9wcyIsIkN0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvIiwiaXNBcnJheUxpa2VPYmplY3QiLCJpc0FycmF5TGlrZSIsImlzTGVuZ3RoIiwiaXNGdW5jdGlvbiIsInRhZyIsImlzT2JqZWN0IiwidHlwZSIsImZvck93biIsImlkZW50aXR5IiwicmVBc2NpaVdvcmQiLCJyZUxhdGluIiwicnNBc3RyYWxSYW5nZSIsInJzQ29tYm9NYXJrc1JhbmdlIiwicnNDb21ib1N5bWJvbHNSYW5nZSIsInJzRGluZ2JhdFJhbmdlIiwicnNMb3dlclJhbmdlIiwicnNNYXRoT3BSYW5nZSIsInJzTm9uQ2hhclJhbmdlIiwicnNQdW5jdHVhdGlvblJhbmdlIiwicnNTcGFjZVJhbmdlIiwicnNVcHBlclJhbmdlIiwicnNWYXJSYW5nZSIsInJzQnJlYWtSYW5nZSIsInJzQXBvcyIsInJzQnJlYWsiLCJyc0NvbWJvIiwicnNEaWdpdHMiLCJyc0RpbmdiYXQiLCJyc0xvd2VyIiwicnNNaXNjIiwicnNGaXR6IiwicnNNb2RpZmllciIsInJzTm9uQXN0cmFsIiwicnNSZWdpb25hbCIsInJzU3VyclBhaXIiLCJyc1VwcGVyIiwicnNaV0oiLCJyc0xvd2VyTWlzYyIsInJzVXBwZXJNaXNjIiwicnNPcHRMb3dlckNvbnRyIiwicnNPcHRVcHBlckNvbnRyIiwicmVPcHRNb2QiLCJyc09wdFZhciIsInJzT3B0Sm9pbiIsImpvaW4iLCJyc1NlcSIsInJzRW1vamkiLCJyZUFwb3MiLCJyZUNvbWJvTWFyayIsInJlVW5pY29kZVdvcmQiLCJyZUhhc1VuaWNvZGVXb3JkIiwiZGVidXJyZWRMZXR0ZXJzIiwiYXJyYXlSZWR1Y2UiLCJhcnJheSIsImFjY3VtdWxhdG9yIiwiaW5pdEFjY3VtIiwiYXNjaWlXb3JkcyIsImRlYnVyckxldHRlciIsImhhc1VuaWNvZGVXb3JkIiwidW5pY29kZVdvcmRzIiwiY3JlYXRlQ29tcG91bmRlciIsImNhbGxiYWNrIiwid29yZHMiLCJkZWJ1cnIiLCJrZWJhYkNhc2UiLCJ3b3JkIiwidG9Mb3dlckNhc2UiLCJwYXR0ZXJuIiwiZ3VhcmQiLCJMQVJHRV9BUlJBWV9TSVpFIiwiRlVOQ19FUlJPUl9URVhUIiwiSEFTSF9VTkRFRklORUQiLCJVTk9SREVSRURfQ09NUEFSRV9GTEFHIiwiUEFSVElBTF9DT01QQVJFX0ZMQUciLCJhcnJheVRhZyIsImJvb2xUYWciLCJkYXRlVGFnIiwiZXJyb3JUYWciLCJtYXBUYWciLCJudW1iZXJUYWciLCJvYmplY3RUYWciLCJwcm9taXNlVGFnIiwicmVnZXhwVGFnIiwic2V0VGFnIiwic3RyaW5nVGFnIiwid2Vha01hcFRhZyIsImFycmF5QnVmZmVyVGFnIiwiZGF0YVZpZXdUYWciLCJmbG9hdDMyVGFnIiwiZmxvYXQ2NFRhZyIsImludDhUYWciLCJpbnQxNlRhZyIsImludDMyVGFnIiwidWludDhUYWciLCJ1aW50OENsYW1wZWRUYWciLCJ1aW50MTZUYWciLCJ1aW50MzJUYWciLCJyZUlzRGVlcFByb3AiLCJyZUlzUGxhaW5Qcm9wIiwicmVMZWFkaW5nRG90IiwicmVQcm9wTmFtZSIsInJlUmVnRXhwQ2hhciIsInJlRXNjYXBlQ2hhciIsInJlSXNIb3N0Q3RvciIsInR5cGVkQXJyYXlUYWdzIiwiZnJlZUV4cG9ydHMiLCJub2RlVHlwZSIsImZyZWVNb2R1bGUiLCJtb2R1bGVFeHBvcnRzIiwiZnJlZVByb2Nlc3MiLCJwcm9jZXNzIiwibm9kZVV0aWwiLCJiaW5kaW5nIiwiZSIsIm5vZGVJc1R5cGVkQXJyYXkiLCJpc1R5cGVkQXJyYXkiLCJhcnJheVNvbWUiLCJwcmVkaWNhdGUiLCJiYXNlUHJvcGVydHkiLCJiYXNlVW5hcnkiLCJnZXRWYWx1ZSIsImlzSG9zdE9iamVjdCIsIm1hcFRvQXJyYXkiLCJtYXAiLCJzaXplIiwiZm9yRWFjaCIsInNldFRvQXJyYXkiLCJzZXQiLCJhcnJheVByb3RvIiwiZnVuY1Byb3RvIiwiY29yZUpzRGF0YSIsIm1hc2tTcmNLZXkiLCJ1aWQiLCJJRV9QUk9UTyIsImZ1bmNUb1N0cmluZyIsInJlSXNOYXRpdmUiLCJVaW50OEFycmF5Iiwic3BsaWNlIiwiRGF0YVZpZXciLCJnZXROYXRpdmUiLCJNYXAiLCJQcm9taXNlIiwiU2V0IiwiV2Vha01hcCIsIm5hdGl2ZUNyZWF0ZSIsImRhdGFWaWV3Q3RvclN0cmluZyIsInRvU291cmNlIiwibWFwQ3RvclN0cmluZyIsInByb21pc2VDdG9yU3RyaW5nIiwic2V0Q3RvclN0cmluZyIsIndlYWtNYXBDdG9yU3RyaW5nIiwic3ltYm9sVmFsdWVPZiIsInZhbHVlT2YiLCJIYXNoIiwiZW50cmllcyIsImNsZWFyIiwiZW50cnkiLCJoYXNoQ2xlYXIiLCJfX2RhdGFfXyIsImhhc2hEZWxldGUiLCJoYXMiLCJoYXNoR2V0IiwiZGF0YSIsImhhc2hIYXMiLCJoYXNoU2V0IiwiZ2V0IiwiTGlzdENhY2hlIiwibGlzdENhY2hlQ2xlYXIiLCJsaXN0Q2FjaGVEZWxldGUiLCJhc3NvY0luZGV4T2YiLCJwb3AiLCJsaXN0Q2FjaGVHZXQiLCJsaXN0Q2FjaGVIYXMiLCJsaXN0Q2FjaGVTZXQiLCJNYXBDYWNoZSIsIm1hcENhY2hlQ2xlYXIiLCJtYXBDYWNoZURlbGV0ZSIsImdldE1hcERhdGEiLCJtYXBDYWNoZUdldCIsIm1hcENhY2hlSGFzIiwibWFwQ2FjaGVTZXQiLCJTZXRDYWNoZSIsInZhbHVlcyIsImFkZCIsInNldENhY2hlQWRkIiwic2V0Q2FjaGVIYXMiLCJTdGFjayIsInN0YWNrQ2xlYXIiLCJzdGFja0RlbGV0ZSIsInN0YWNrR2V0Iiwic3RhY2tIYXMiLCJzdGFja1NldCIsImNhY2hlIiwicGFpcnMiLCJlcSIsImJhc2VHZXQiLCJwYXRoIiwiaXNLZXkiLCJjYXN0UGF0aCIsInRvS2V5IiwiYmFzZUdldFRhZyIsImJhc2VIYXNJbiIsImJhc2VJc0VxdWFsIiwib3RoZXIiLCJjdXN0b21pemVyIiwiYml0bWFzayIsInN0YWNrIiwiYmFzZUlzRXF1YWxEZWVwIiwiZXF1YWxGdW5jIiwib2JqSXNBcnIiLCJvdGhJc0FyciIsIm9ialRhZyIsIm90aFRhZyIsImdldFRhZyIsIm9iaklzT2JqIiwib3RoSXNPYmoiLCJpc1NhbWVUYWciLCJlcXVhbEFycmF5cyIsImVxdWFsQnlUYWciLCJvYmpJc1dyYXBwZWQiLCJvdGhJc1dyYXBwZWQiLCJvYmpVbndyYXBwZWQiLCJvdGhVbndyYXBwZWQiLCJlcXVhbE9iamVjdHMiLCJiYXNlSXNNYXRjaCIsIm1hdGNoRGF0YSIsIm5vQ3VzdG9taXplciIsIm9ialZhbHVlIiwic3JjVmFsdWUiLCJiYXNlSXNOYXRpdmUiLCJpc01hc2tlZCIsImJhc2VJc1R5cGVkQXJyYXkiLCJiYXNlSXRlcmF0ZWUiLCJiYXNlTWF0Y2hlc1Byb3BlcnR5IiwiYmFzZU1hdGNoZXMiLCJwcm9wZXJ0eSIsImdldE1hdGNoRGF0YSIsIm1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIiwiaXNTdHJpY3RDb21wYXJhYmxlIiwiaGFzSW4iLCJiYXNlUHJvcGVydHlEZWVwIiwiYmFzZVB1bGxBdCIsImluZGV4ZXMiLCJwcmV2aW91cyIsInBhcmVudCIsImxhc3QiLCJiYXNlU2xpY2UiLCJzdGFydCIsImVuZCIsInN0cmluZ1RvUGF0aCIsImlzUGFydGlhbCIsImFyckxlbmd0aCIsIm90aExlbmd0aCIsInN0YWNrZWQiLCJzZWVuIiwiYXJyVmFsdWUiLCJvdGhWYWx1ZSIsImNvbXBhcmVkIiwib3RoSW5kZXgiLCJieXRlTGVuZ3RoIiwiYnl0ZU9mZnNldCIsImJ1ZmZlciIsIm5hbWUiLCJtZXNzYWdlIiwiY29udmVydCIsIm9ialByb3BzIiwib2JqTGVuZ3RoIiwib3RoUHJvcHMiLCJza2lwQ3RvciIsIm9iakN0b3IiLCJvdGhDdG9yIiwiaXNLZXlhYmxlIiwiQXJyYXlCdWZmZXIiLCJyZXNvbHZlIiwiY3RvclN0cmluZyIsImhhc1BhdGgiLCJoYXNGdW5jIiwibWVtb2l6ZSIsIm51bWJlciIsInF1b3RlIiwicmVtb3ZlIiwicmVzb2x2ZXIiLCJUeXBlRXJyb3IiLCJtZW1vaXplZCIsImFyZ3MiLCJDYWNoZSIsImRlZmF1bHRWYWx1ZSIsImFycmF5SW5jbHVkZXMiLCJiYXNlSW5kZXhPZiIsImFycmF5SW5jbHVkZXNXaXRoIiwiY29tcGFyYXRvciIsImJhc2VGaW5kSW5kZXgiLCJmcm9tSW5kZXgiLCJiYXNlSXNOYU4iLCJjYWNoZUhhcyIsImJhc2VVbmlxIiwiaW5jbHVkZXMiLCJpc0NvbW1vbiIsImNyZWF0ZVNldCIsIm91dGVyIiwiY29tcHV0ZWQiLCJzZWVuSW5kZXgiLCJub29wIiwidW5pcSIsImdldE93blByb3BlcnR5U3ltYm9scyIsInByb3BJc0VudW1lcmFibGUiLCJ0b09iamVjdCIsInZhbCIsInNob3VsZFVzZU5hdGl2ZSIsImFzc2lnbiIsInRlc3QxIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInRlc3QyIiwiZnJvbUNoYXJDb2RlIiwib3JkZXIyIiwidGVzdDMiLCJsZXR0ZXIiLCJlcnIiLCJ0YXJnZXQiLCJmcm9tIiwidG8iLCJzeW1ib2xzIiwicyIsInJlcXVpcmUiLCJjbGFzc0lkU3BsaXQiLCJub3RDbGFzc0lkIiwicGFyc2VTZWxlY3RvciIsInNlbGVjdG9yIiwidXBwZXIiLCJ0YWdOYW1lIiwiaWQiLCJjbGFzc2VzIiwidGFnUGFydHMiLCJwYXJ0IiwiY2hhckF0Iiwic3Vic3RyaW5nIiwidG9VcHBlckNhc2UiLCJjbGFzc05hbWUiLCJjaGVja0ZvckVycm9yIiwiRXJyb3IiLCJlcnJvciIsImlzRXJyb3IiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwicXVpY2tfZXJyb3JfMSIsInNuYWJiZG9tIiwicHJvcHNfMSIsInJlY29uY2lsZSIsImluaXQiLCJkZWZhdWx0Iiwic25hYmJkb21fMSIsIm1vZHVsZXMiLCJ0b0hUTUwiLCJjbGFzcyIsImF0dHJpYnV0ZXMiLCJzdHlsZSIsIkRlcCIsInN1YnNjcmliZXJzIiwiZGVwZW5kIiwiYWN0aXZlRWZmZWN0Iiwibm90aWZ5Iiwic3ViIiwiQ29tcG9uZW50IiwicGFyYW1zIiwidCIsImNvbXBvbmVudERpZE1vdW50Iiwic2V0U3RhdGUiLCJwYXJ0aWFsU3RhdGUiLCJfdGhpcyIsInN0YXRlIiwiUXVpY2siLCJfX3VwZGF0ZXIiLCJyZW5kZXIiLCJlbCIsInIiLCJfcHQiLCJpc1F1aWNrQ2xhc3NDb21wb25lbnQiLCIkaW5pdCIsImZhdiIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwicmVsIiwiaCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY29uc29sZSIsImxvZyIsIiRsaXN0ZW5lciIsImZuIiwicHJldmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50RGVmYXVsdCIsInVzZSIsInZpZXciLCJyZW5kZXJWaWV3dG9IVE1MIiwicXVlcnlTZWxlY3RvciIsImNoaWxkcmVuIiwiZmxhdCIsImlzUW5kUmVhY3RDbGFzc0NvbXBvbmVudCIsImNvbXBvbmVudEluc3RhbmNlIiwiZGF0YVByb3BzIiwiZXZlbnRQcm9wcyIsInByb3BLZXkiLCJzdGFydHNXaXRoIiwiZXZlbnQiLCJpbnN0YW5jZSIsIiRjb25maWciLCJlbnYiLCJxdWlja2pzX2NvbXBvbmVudF8xIiwicGF0aFRvUmVnZXgiLCJnZXRQYXJhbXMiLCJyb3V0ZSIsIm1hdGNoQWxsIiwiUXVpY2tSb3V0ZXIiLCJ1c2VSb3V0ZSIsInJvdXRlcyIsInVybCIsIm1hdGNoZXMiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiZmluZE1hdGNoIiwiZmluZCIsInNldFRpdGxlIiwidGl0bGUiLCJnZXRSb3V0ZSIsInJlZmVycmVyIiwibmV4dCIsImZ1bGxQYXRoIiwiY3JlYXRlTmF2aWdhdGlvbiIsIndpbmRvdyIsImxvY2FsTmFtZSIsImRhdGFzZXQiLCJleHRlcm5hbCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJjcmVhdGVQb3BTdGF0ZSIsIlF1aWNrUm91dGVyTGluayIsIkhUTUxFbGVtZW50IiwibGlua1RvIiwiZ2V0QXR0cmlidXRlIiwiY3VzdG9tVGFnIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImlubmVyVGV4dCIsImF0dHJpYkkiLCJhIiwiYXR0cmliQSIsInNldEF0dHJpYnV0ZSIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwidXNlUmVmIiwiYXBwIiwiY2hpbGQiLCJhcmVhIiwiYmFzZSIsImJyIiwiY29sIiwiZW1iZWQiLCJociIsImltZyIsImlucHV0Iiwia2V5Z2VuIiwibGluayIsIm1ldGEiLCJwYXJhbSIsInRyYWNrIiwid2JyIiwiVk9JRF9FTEVNRU5UUyIsIkNPTlRBSU5FUl9FTEVNRU5UUyIsInBhcnNlIiwidm5vZGUiLCJub2RlIiwicmVuZGVyVG9TdHJpbmciLCJzZWwiLCJ0ZXh0IiwiaG9vayIsInN2ZyIsIm5zIiwiYXR0cnNNb2R1bGUiLCJhdHRycyIsImNsYXNzTW9kdWxlIiwiX2FkZCIsIl9yZW1vdmUiLCJleGlzdGluZyIsImNvbmNhdCIsImluZGV4T2YiLCJkYXRhc2V0TW9kdWxlIiwib21pdCIsImJvb2xlYW5BdHRyaWJ1dGVzIiwicHJvcHNNb2R1bGUiLCJsa2V5Iiwic3R5bGVNb2R1bGUiLCJkZWxheWVkIiwia2ViYWJLZXkiLCJyb3V0ZXIiLCJBcHAiLCJBYm91dCIs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QyxNQURILENBREwsRUFJSTtBQUFLLGVBQVMsRUFBQztBQUFmLE9BQ0k7QUFBbUIsUUFBRSxFQUFDLEdBQXRCO0FBQTBCLGVBQVMsRUFBQztBQUFwQyxjQURKLEVBRUk7QUFBbUIsZUFBUyxFQUFDLHNDQUE3QjtBQUFvRSxRQUFFLEVBQUM7QUFBdkUsZUFGSixDQUpKLENBREo7QUFZSDs7QUFqQmdELEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGckQ7QUFDQTs7QUFHQSxNQUFNOEgsT0FBTyxHQUFHLENBQUM7QUFBRTdPO0FBQUYsQ0FBRCxLQUFjO0FBQzFCLFNBQ0k7QUFBSSxhQUFTLEVBQUU7QUFBZixvQkFBaUQ7QUFBTyxhQUFTLEVBQUc7QUFBbkIsVUFBNkNBLElBQTdDLE9BQWpELENBREo7QUFHSCxDQUpEOztBQU1BLGlFQUFlNk8sT0FBZixFOzs7Ozs7VUNWQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0EsQ0FBQyxJOzs7OztXQ1BELHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7QUNKQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIENyb3NzLUJyb3dzZXIgU3BsaXQgMS4xLjFcbiAqIENvcHlyaWdodCAyMDA3LTIwMTIgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+XG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKiBFQ01BU2NyaXB0IGNvbXBsaWFudCwgdW5pZm9ybSBjcm9zcy1icm93c2VyIHNwbGl0IG1ldGhvZFxuICovXG5cbi8qKlxuICogU3BsaXRzIGEgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5ncyB1c2luZyBhIHJlZ2V4IG9yIHN0cmluZyBzZXBhcmF0b3IuIE1hdGNoZXMgb2YgdGhlXG4gKiBzZXBhcmF0b3IgYXJlIG5vdCBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0IGFycmF5LiBIb3dldmVyLCBpZiBgc2VwYXJhdG9yYCBpcyBhIHJlZ2V4IHRoYXQgY29udGFpbnNcbiAqIGNhcHR1cmluZyBncm91cHMsIGJhY2tyZWZlcmVuY2VzIGFyZSBzcGxpY2VkIGludG8gdGhlIHJlc3VsdCBlYWNoIHRpbWUgYHNlcGFyYXRvcmAgaXMgbWF0Y2hlZC5cbiAqIEZpeGVzIGJyb3dzZXIgYnVncyBjb21wYXJlZCB0byB0aGUgbmF0aXZlIGBTdHJpbmcucHJvdG90eXBlLnNwbGl0YCBhbmQgY2FuIGJlIHVzZWQgcmVsaWFibHlcbiAqIGNyb3NzLWJyb3dzZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFN0cmluZyB0byBzcGxpdC5cbiAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gc2VwYXJhdG9yIFJlZ2V4IG9yIHN0cmluZyB0byB1c2UgZm9yIHNlcGFyYXRpbmcgdGhlIHN0cmluZy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbGltaXRdIE1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRvIGluY2x1ZGUgaW4gdGhlIHJlc3VsdCBhcnJheS5cbiAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2Ygc3Vic3RyaW5ncy5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQmFzaWMgdXNlXG4gKiBzcGxpdCgnYSBiIGMgZCcsICcgJyk7XG4gKiAvLyAtPiBbJ2EnLCAnYicsICdjJywgJ2QnXVxuICpcbiAqIC8vIFdpdGggbGltaXRcbiAqIHNwbGl0KCdhIGIgYyBkJywgJyAnLCAyKTtcbiAqIC8vIC0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBCYWNrcmVmZXJlbmNlcyBpbiByZXN1bHQgYXJyYXlcbiAqIHNwbGl0KCcuLndvcmQxIHdvcmQyLi4nLCAvKFthLXpdKykoXFxkKykvaSk7XG4gKiAvLyAtPiBbJy4uJywgJ3dvcmQnLCAnMScsICcgJywgJ3dvcmQnLCAnMicsICcuLiddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uIHNwbGl0KHVuZGVmKSB7XG5cbiAgdmFyIG5hdGl2ZVNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdCxcbiAgICBjb21wbGlhbnRFeGVjTnBjZyA9IC8oKT8/Ly5leGVjKFwiXCIpWzFdID09PSB1bmRlZixcbiAgICAvLyBOUENHOiBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cFxuICAgIHNlbGY7XG5cbiAgc2VsZiA9IGZ1bmN0aW9uKHN0ciwgc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgYG5hdGl2ZVNwbGl0YFxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc2VwYXJhdG9yKSAhPT0gXCJbb2JqZWN0IFJlZ0V4cF1cIikge1xuICAgICAgcmV0dXJuIG5hdGl2ZVNwbGl0LmNhbGwoc3RyLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9XG4gICAgdmFyIG91dHB1dCA9IFtdLFxuICAgICAgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyBcImlcIiA6IFwiXCIpICsgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyBcIm1cIiA6IFwiXCIpICsgKHNlcGFyYXRvci5leHRlbmRlZCA/IFwieFwiIDogXCJcIikgKyAvLyBQcm9wb3NlZCBmb3IgRVM2XG4gICAgICAoc2VwYXJhdG9yLnN0aWNreSA/IFwieVwiIDogXCJcIiksXG4gICAgICAvLyBGaXJlZm94IDMrXG4gICAgICBsYXN0TGFzdEluZGV4ID0gMCxcbiAgICAgIC8vIE1ha2UgYGdsb2JhbGAgYW5kIGF2b2lkIGBsYXN0SW5kZXhgIGlzc3VlcyBieSB3b3JraW5nIHdpdGggYSBjb3B5XG4gICAgICBzZXBhcmF0b3IgPSBuZXcgUmVnRXhwKHNlcGFyYXRvci5zb3VyY2UsIGZsYWdzICsgXCJnXCIpLFxuICAgICAgc2VwYXJhdG9yMiwgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICBzdHIgKz0gXCJcIjsgLy8gVHlwZS1jb252ZXJ0XG4gICAgaWYgKCFjb21wbGlhbnRFeGVjTnBjZykge1xuICAgICAgLy8gRG9lc24ndCBuZWVkIGZsYWdzIGd5LCBidXQgdGhleSBkb24ndCBodXJ0XG4gICAgICBzZXBhcmF0b3IyID0gbmV3IFJlZ0V4cChcIl5cIiArIHNlcGFyYXRvci5zb3VyY2UgKyBcIiQoPyFcXFxccylcIiwgZmxhZ3MpO1xuICAgIH1cbiAgICAvKiBWYWx1ZXMgZm9yIGBsaW1pdGAsIHBlciB0aGUgc3BlYzpcbiAgICAgKiBJZiB1bmRlZmluZWQ6IDQyOTQ5NjcyOTUgLy8gTWF0aC5wb3coMiwgMzIpIC0gMVxuICAgICAqIElmIDAsIEluZmluaXR5LCBvciBOYU46IDBcbiAgICAgKiBJZiBwb3NpdGl2ZSBudW1iZXI6IGxpbWl0ID0gTWF0aC5mbG9vcihsaW1pdCk7IGlmIChsaW1pdCA+IDQyOTQ5NjcyOTUpIGxpbWl0IC09IDQyOTQ5NjcyOTY7XG4gICAgICogSWYgbmVnYXRpdmUgbnVtYmVyOiA0Mjk0OTY3Mjk2IC0gTWF0aC5mbG9vcihNYXRoLmFicyhsaW1pdCkpXG4gICAgICogSWYgb3RoZXI6IFR5cGUtY29udmVydCwgdGhlbiB1c2UgdGhlIGFib3ZlIHJ1bGVzXG4gICAgICovXG4gICAgbGltaXQgPSBsaW1pdCA9PT0gdW5kZWYgPyAtMSA+Pj4gMCA6IC8vIE1hdGgucG93KDIsIDMyKSAtIDFcbiAgICBsaW1pdCA+Pj4gMDsgLy8gVG9VaW50MzIobGltaXQpXG4gICAgd2hpbGUgKG1hdGNoID0gc2VwYXJhdG9yLmV4ZWMoc3RyKSkge1xuICAgICAgLy8gYHNlcGFyYXRvci5sYXN0SW5kZXhgIGlzIG5vdCByZWxpYWJsZSBjcm9zcy1icm93c2VyXG4gICAgICBsYXN0SW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIGlmIChsYXN0SW5kZXggPiBsYXN0TGFzdEluZGV4KSB7XG4gICAgICAgIG91dHB1dC5wdXNoKHN0ci5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYCBmb3JcbiAgICAgICAgLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBzXG4gICAgICAgIGlmICghY29tcGxpYW50RXhlY05wY2cgJiYgbWF0Y2gubGVuZ3RoID4gMSkge1xuICAgICAgICAgIG1hdGNoWzBdLnJlcGxhY2Uoc2VwYXJhdG9yMiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWYpIHtcbiAgICAgICAgICAgICAgICBtYXRjaFtpXSA9IHVuZGVmO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDEgJiYgbWF0Y2guaW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkob3V0cHV0LCBtYXRjaC5zbGljZSgxKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdExlbmd0aCA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgaWYgKG91dHB1dC5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlcGFyYXRvci5sYXN0SW5kZXggPT09IG1hdGNoLmluZGV4KSB7XG4gICAgICAgIHNlcGFyYXRvci5sYXN0SW5kZXgrKzsgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobGFzdExhc3RJbmRleCA9PT0gc3RyLmxlbmd0aCkge1xuICAgICAgaWYgKGxhc3RMZW5ndGggfHwgIXNlcGFyYXRvci50ZXN0KFwiXCIpKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaChzdHIuc2xpY2UobGFzdExhc3RJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0Lmxlbmd0aCA+IGxpbWl0ID8gb3V0cHV0LnNsaWNlKDAsIGxpbWl0KSA6IG91dHB1dDtcbiAgfTtcblxuICByZXR1cm4gc2VsZjtcbn0pKCk7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBIVE1MIGVudGl0aWVzIGFuZCBIVE1MIGNoYXJhY3RlcnMuICovXG52YXIgcmVVbmVzY2FwZWRIdG1sID0gL1smPD5cIidgXS9nLFxuICAgIHJlSGFzVW5lc2NhcGVkSHRtbCA9IFJlZ0V4cChyZVVuZXNjYXBlZEh0bWwuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gbWFwIGNoYXJhY3RlcnMgdG8gSFRNTCBlbnRpdGllcy4gKi9cbnZhciBodG1sRXNjYXBlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjMzk7JyxcbiAgJ2AnOiAnJiM5NjsnXG59O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5T2Yob2JqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmVzY2FwZWAgdG8gY29udmVydCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaHIgVGhlIG1hdGNoZWQgY2hhcmFjdGVyIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICovXG52YXIgZXNjYXBlSHRtbENoYXIgPSBiYXNlUHJvcGVydHlPZihodG1sRXNjYXBlcyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgY2hhcmFjdGVycyBcIiZcIiwgXCI8XCIsIFwiPlwiLCAnXCInLCBcIidcIiwgYW5kIFwiXFxgXCIgaW4gYHN0cmluZ2AgdG9cbiAqIHRoZWlyIGNvcnJlc3BvbmRpbmcgSFRNTCBlbnRpdGllcy5cbiAqXG4gKiAqKk5vdGU6KiogTm8gb3RoZXIgY2hhcmFjdGVycyBhcmUgZXNjYXBlZC4gVG8gZXNjYXBlIGFkZGl0aW9uYWxcbiAqIGNoYXJhY3RlcnMgdXNlIGEgdGhpcmQtcGFydHkgbGlicmFyeSBsaWtlIFtfaGVfXShodHRwczovL210aHMuYmUvaGUpLlxuICpcbiAqIFRob3VnaCB0aGUgXCI+XCIgY2hhcmFjdGVyIGlzIGVzY2FwZWQgZm9yIHN5bW1ldHJ5LCBjaGFyYWN0ZXJzIGxpa2VcbiAqIFwiPlwiIGFuZCBcIi9cIiBkb24ndCBuZWVkIGVzY2FwaW5nIGluIEhUTUwgYW5kIGhhdmUgbm8gc3BlY2lhbCBtZWFuaW5nXG4gKiB1bmxlc3MgdGhleSdyZSBwYXJ0IG9mIGEgdGFnIG9yIHVucXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZS4gU2VlXG4gKiBbTWF0aGlhcyBCeW5lbnMncyBhcnRpY2xlXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvYW1iaWd1b3VzLWFtcGVyc2FuZHMpXG4gKiAodW5kZXIgXCJzZW1pLXJlbGF0ZWQgZnVuIGZhY3RcIikgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBCYWNrdGlja3MgYXJlIGVzY2FwZWQgYmVjYXVzZSBpbiBJRSA8IDksIHRoZXkgY2FuIGJyZWFrIG91dCBvZlxuICogYXR0cmlidXRlIHZhbHVlcyBvciBIVE1MIGNvbW1lbnRzLiBTZWUgWyM1OV0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzU5KSxcbiAqIFsjMTAyXShodHRwczovL2h0bWw1c2VjLm9yZy8jMTAyKSwgWyMxMDhdKGh0dHBzOi8vaHRtbDVzZWMub3JnLyMxMDgpLCBhbmRcbiAqIFsjMTMzXShodHRwczovL2h0bWw1c2VjLm9yZy8jMTMzKSBvZiB0aGVcbiAqIFtIVE1MNSBTZWN1cml0eSBDaGVhdHNoZWV0XShodHRwczovL2h0bWw1c2VjLm9yZy8pIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogV2hlbiB3b3JraW5nIHdpdGggSFRNTCB5b3Ugc2hvdWxkIGFsd2F5c1xuICogW3F1b3RlIGF0dHJpYnV0ZSB2YWx1ZXNdKGh0dHA6Ly93b25rby5jb20vcG9zdC9odG1sLWVzY2FwaW5nKSB0byByZWR1Y2VcbiAqIFhTUyB2ZWN0b3JzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZSgnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+ICdmcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZShzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNVbmVzY2FwZWRIdG1sLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlVW5lc2NhcGVkSHRtbCwgZXNjYXBlSHRtbENoYXIpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXNjYXBlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlcyBvdmVyIGBvYmplY3RgXG4gKiBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IGFuZFxuICogaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwga2V5LCBvYmplY3QpLiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uXG4gKiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4zLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uZm9yT3duUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5mb3JPd24obmV3IEZvbywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yT3duKG9iamVjdCwgdHlwZW9mIGl0ZXJhdGVlID09ICdmdW5jdGlvbicgPyBpdGVyYXRlZSA6IGlkZW50aXR5KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yT3duO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggd29yZHMgY29tcG9zZWQgb2YgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMuICovXG52YXIgcmVBc2NpaVdvcmQgPSAvW15cXHgwMC1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHg3Zl0rL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIExhdGluIFVuaWNvZGUgbGV0dGVycyAoZXhjbHVkaW5nIG1hdGhlbWF0aWNhbCBvcGVyYXRvcnMpLiAqL1xudmFyIHJlTGF0aW4gPSAvW1xceGMwLVxceGQ2XFx4ZDgtXFx4ZjZcXHhmOC1cXHhmZlxcdTAxMDAtXFx1MDE3Zl0vZztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZlxcXFx1ZmUyMC1cXFxcdWZlMjMnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmMCcsXG4gICAgcnNEaW5nYmF0UmFuZ2UgPSAnXFxcXHUyNzAwLVxcXFx1MjdiZicsXG4gICAgcnNMb3dlclJhbmdlID0gJ2EtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZicsXG4gICAgcnNNYXRoT3BSYW5nZSA9ICdcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3JyxcbiAgICByc05vbkNoYXJSYW5nZSA9ICdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmYnLFxuICAgIHJzUHVuY3R1YXRpb25SYW5nZSA9ICdcXFxcdTIwMDAtXFxcXHUyMDZmJyxcbiAgICByc1NwYWNlUmFuZ2UgPSAnIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDAnLFxuICAgIHJzVXBwZXJSYW5nZSA9ICdBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGUnLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJyxcbiAgICByc0JyZWFrUmFuZ2UgPSByc01hdGhPcFJhbmdlICsgcnNOb25DaGFyUmFuZ2UgKyByc1B1bmN0dWF0aW9uUmFuZ2UgKyByc1NwYWNlUmFuZ2U7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc0Fwb3MgPSBcIlsnXFx1MjAxOV1cIixcbiAgICByc0JyZWFrID0gJ1snICsgcnNCcmVha1JhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UgKyAnXScsXG4gICAgcnNEaWdpdHMgPSAnXFxcXGQrJyxcbiAgICByc0RpbmdiYXQgPSAnWycgKyByc0RpbmdiYXRSYW5nZSArICddJyxcbiAgICByc0xvd2VyID0gJ1snICsgcnNMb3dlclJhbmdlICsgJ10nLFxuICAgIHJzTWlzYyA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgcnNCcmVha1JhbmdlICsgcnNEaWdpdHMgKyByc0RpbmdiYXRSYW5nZSArIHJzTG93ZXJSYW5nZSArIHJzVXBwZXJSYW5nZSArICddJyxcbiAgICByc0ZpdHogPSAnXFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdJyxcbiAgICByc01vZGlmaWVyID0gJyg/OicgKyByc0NvbWJvICsgJ3wnICsgcnNGaXR6ICsgJyknLFxuICAgIHJzTm9uQXN0cmFsID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNSZWdpb25hbCA9ICcoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9JyxcbiAgICByc1N1cnJQYWlyID0gJ1tcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXScsXG4gICAgcnNVcHBlciA9ICdbJyArIHJzVXBwZXJSYW5nZSArICddJyxcbiAgICByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgcmVnZXhlcy4gKi9cbnZhciByc0xvd2VyTWlzYyA9ICcoPzonICsgcnNMb3dlciArICd8JyArIHJzTWlzYyArICcpJyxcbiAgICByc1VwcGVyTWlzYyA9ICcoPzonICsgcnNVcHBlciArICd8JyArIHJzTWlzYyArICcpJyxcbiAgICByc09wdExvd2VyQ29udHIgPSAnKD86JyArIHJzQXBvcyArICcoPzpkfGxsfG18cmV8c3x0fHZlKSk/JyxcbiAgICByc09wdFVwcGVyQ29udHIgPSAnKD86JyArIHJzQXBvcyArICcoPzpEfExMfE18UkV8U3xUfFZFKSk/JyxcbiAgICByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPycsXG4gICAgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JyxcbiAgICByc09wdEpvaW4gPSAnKD86JyArIHJzWldKICsgJyg/OicgKyBbcnNOb25Bc3RyYWwsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzT3B0VmFyICsgcmVPcHRNb2QgKyAnKSonLFxuICAgIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbixcbiAgICByc0Vtb2ppID0gJyg/OicgKyBbcnNEaW5nYmF0LCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc1NlcTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYXBvc3Ryb3BoZXMuICovXG52YXIgcmVBcG9zID0gUmVnRXhwKHJzQXBvcywgJ2cnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3NdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrcykgYW5kXG4gKiBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzIGZvciBzeW1ib2xzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3NfZm9yX1N5bWJvbHMpLlxuICovXG52YXIgcmVDb21ib01hcmsgPSBSZWdFeHAocnNDb21ibywgJ2cnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggY29tcGxleCBvciBjb21wb3VuZCB3b3Jkcy4gKi9cbnZhciByZVVuaWNvZGVXb3JkID0gUmVnRXhwKFtcbiAgcnNVcHBlciArICc/JyArIHJzTG93ZXIgKyAnKycgKyByc09wdExvd2VyQ29udHIgKyAnKD89JyArIFtyc0JyZWFrLCByc1VwcGVyLCAnJCddLmpvaW4oJ3wnKSArICcpJyxcbiAgcnNVcHBlck1pc2MgKyAnKycgKyByc09wdFVwcGVyQ29udHIgKyAnKD89JyArIFtyc0JyZWFrLCByc1VwcGVyICsgcnNMb3dlck1pc2MsICckJ10uam9pbignfCcpICsgJyknLFxuICByc1VwcGVyICsgJz8nICsgcnNMb3dlck1pc2MgKyAnKycgKyByc09wdExvd2VyQ29udHIsXG4gIHJzVXBwZXIgKyAnKycgKyByc09wdFVwcGVyQ29udHIsXG4gIHJzRGlnaXRzLFxuICByc0Vtb2ppXG5dLmpvaW4oJ3wnKSwgJ2cnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHN0cmluZ3MgdGhhdCBuZWVkIGEgbW9yZSByb2J1c3QgcmVnZXhwIHRvIG1hdGNoIHdvcmRzLiAqL1xudmFyIHJlSGFzVW5pY29kZVdvcmQgPSAvW2Etel1bQS1aXXxbQS1aXXsyLH1bYS16XXxbMC05XVthLXpBLVpdfFthLXpBLVpdWzAtOV18W15hLXpBLVowLTkgXS87XG5cbi8qKiBVc2VkIHRvIG1hcCBMYXRpbiBVbmljb2RlIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycy4gKi9cbnZhciBkZWJ1cnJlZExldHRlcnMgPSB7XG4gIC8vIExhdGluLTEgU3VwcGxlbWVudCBibG9jay5cbiAgJ1xceGMwJzogJ0EnLCAgJ1xceGMxJzogJ0EnLCAnXFx4YzInOiAnQScsICdcXHhjMyc6ICdBJywgJ1xceGM0JzogJ0EnLCAnXFx4YzUnOiAnQScsXG4gICdcXHhlMCc6ICdhJywgICdcXHhlMSc6ICdhJywgJ1xceGUyJzogJ2EnLCAnXFx4ZTMnOiAnYScsICdcXHhlNCc6ICdhJywgJ1xceGU1JzogJ2EnLFxuICAnXFx4YzcnOiAnQycsICAnXFx4ZTcnOiAnYycsXG4gICdcXHhkMCc6ICdEJywgICdcXHhmMCc6ICdkJyxcbiAgJ1xceGM4JzogJ0UnLCAgJ1xceGM5JzogJ0UnLCAnXFx4Y2EnOiAnRScsICdcXHhjYic6ICdFJyxcbiAgJ1xceGU4JzogJ2UnLCAgJ1xceGU5JzogJ2UnLCAnXFx4ZWEnOiAnZScsICdcXHhlYic6ICdlJyxcbiAgJ1xceGNjJzogJ0knLCAgJ1xceGNkJzogJ0knLCAnXFx4Y2UnOiAnSScsICdcXHhjZic6ICdJJyxcbiAgJ1xceGVjJzogJ2knLCAgJ1xceGVkJzogJ2knLCAnXFx4ZWUnOiAnaScsICdcXHhlZic6ICdpJyxcbiAgJ1xceGQxJzogJ04nLCAgJ1xceGYxJzogJ24nLFxuICAnXFx4ZDInOiAnTycsICAnXFx4ZDMnOiAnTycsICdcXHhkNCc6ICdPJywgJ1xceGQ1JzogJ08nLCAnXFx4ZDYnOiAnTycsICdcXHhkOCc6ICdPJyxcbiAgJ1xceGYyJzogJ28nLCAgJ1xceGYzJzogJ28nLCAnXFx4ZjQnOiAnbycsICdcXHhmNSc6ICdvJywgJ1xceGY2JzogJ28nLCAnXFx4ZjgnOiAnbycsXG4gICdcXHhkOSc6ICdVJywgICdcXHhkYSc6ICdVJywgJ1xceGRiJzogJ1UnLCAnXFx4ZGMnOiAnVScsXG4gICdcXHhmOSc6ICd1JywgICdcXHhmYSc6ICd1JywgJ1xceGZiJzogJ3UnLCAnXFx4ZmMnOiAndScsXG4gICdcXHhkZCc6ICdZJywgICdcXHhmZCc6ICd5JywgJ1xceGZmJzogJ3knLFxuICAnXFx4YzYnOiAnQWUnLCAnXFx4ZTYnOiAnYWUnLFxuICAnXFx4ZGUnOiAnVGgnLCAnXFx4ZmUnOiAndGgnLFxuICAnXFx4ZGYnOiAnc3MnLFxuICAvLyBMYXRpbiBFeHRlbmRlZC1BIGJsb2NrLlxuICAnXFx1MDEwMCc6ICdBJywgICdcXHUwMTAyJzogJ0EnLCAnXFx1MDEwNCc6ICdBJyxcbiAgJ1xcdTAxMDEnOiAnYScsICAnXFx1MDEwMyc6ICdhJywgJ1xcdTAxMDUnOiAnYScsXG4gICdcXHUwMTA2JzogJ0MnLCAgJ1xcdTAxMDgnOiAnQycsICdcXHUwMTBhJzogJ0MnLCAnXFx1MDEwYyc6ICdDJyxcbiAgJ1xcdTAxMDcnOiAnYycsICAnXFx1MDEwOSc6ICdjJywgJ1xcdTAxMGInOiAnYycsICdcXHUwMTBkJzogJ2MnLFxuICAnXFx1MDEwZSc6ICdEJywgICdcXHUwMTEwJzogJ0QnLCAnXFx1MDEwZic6ICdkJywgJ1xcdTAxMTEnOiAnZCcsXG4gICdcXHUwMTEyJzogJ0UnLCAgJ1xcdTAxMTQnOiAnRScsICdcXHUwMTE2JzogJ0UnLCAnXFx1MDExOCc6ICdFJywgJ1xcdTAxMWEnOiAnRScsXG4gICdcXHUwMTEzJzogJ2UnLCAgJ1xcdTAxMTUnOiAnZScsICdcXHUwMTE3JzogJ2UnLCAnXFx1MDExOSc6ICdlJywgJ1xcdTAxMWInOiAnZScsXG4gICdcXHUwMTFjJzogJ0cnLCAgJ1xcdTAxMWUnOiAnRycsICdcXHUwMTIwJzogJ0cnLCAnXFx1MDEyMic6ICdHJyxcbiAgJ1xcdTAxMWQnOiAnZycsICAnXFx1MDExZic6ICdnJywgJ1xcdTAxMjEnOiAnZycsICdcXHUwMTIzJzogJ2cnLFxuICAnXFx1MDEyNCc6ICdIJywgICdcXHUwMTI2JzogJ0gnLCAnXFx1MDEyNSc6ICdoJywgJ1xcdTAxMjcnOiAnaCcsXG4gICdcXHUwMTI4JzogJ0knLCAgJ1xcdTAxMmEnOiAnSScsICdcXHUwMTJjJzogJ0knLCAnXFx1MDEyZSc6ICdJJywgJ1xcdTAxMzAnOiAnSScsXG4gICdcXHUwMTI5JzogJ2knLCAgJ1xcdTAxMmInOiAnaScsICdcXHUwMTJkJzogJ2knLCAnXFx1MDEyZic6ICdpJywgJ1xcdTAxMzEnOiAnaScsXG4gICdcXHUwMTM0JzogJ0onLCAgJ1xcdTAxMzUnOiAnaicsXG4gICdcXHUwMTM2JzogJ0snLCAgJ1xcdTAxMzcnOiAnaycsICdcXHUwMTM4JzogJ2snLFxuICAnXFx1MDEzOSc6ICdMJywgICdcXHUwMTNiJzogJ0wnLCAnXFx1MDEzZCc6ICdMJywgJ1xcdTAxM2YnOiAnTCcsICdcXHUwMTQxJzogJ0wnLFxuICAnXFx1MDEzYSc6ICdsJywgICdcXHUwMTNjJzogJ2wnLCAnXFx1MDEzZSc6ICdsJywgJ1xcdTAxNDAnOiAnbCcsICdcXHUwMTQyJzogJ2wnLFxuICAnXFx1MDE0Myc6ICdOJywgICdcXHUwMTQ1JzogJ04nLCAnXFx1MDE0Nyc6ICdOJywgJ1xcdTAxNGEnOiAnTicsXG4gICdcXHUwMTQ0JzogJ24nLCAgJ1xcdTAxNDYnOiAnbicsICdcXHUwMTQ4JzogJ24nLCAnXFx1MDE0Yic6ICduJyxcbiAgJ1xcdTAxNGMnOiAnTycsICAnXFx1MDE0ZSc6ICdPJywgJ1xcdTAxNTAnOiAnTycsXG4gICdcXHUwMTRkJzogJ28nLCAgJ1xcdTAxNGYnOiAnbycsICdcXHUwMTUxJzogJ28nLFxuICAnXFx1MDE1NCc6ICdSJywgICdcXHUwMTU2JzogJ1InLCAnXFx1MDE1OCc6ICdSJyxcbiAgJ1xcdTAxNTUnOiAncicsICAnXFx1MDE1Nyc6ICdyJywgJ1xcdTAxNTknOiAncicsXG4gICdcXHUwMTVhJzogJ1MnLCAgJ1xcdTAxNWMnOiAnUycsICdcXHUwMTVlJzogJ1MnLCAnXFx1MDE2MCc6ICdTJyxcbiAgJ1xcdTAxNWInOiAncycsICAnXFx1MDE1ZCc6ICdzJywgJ1xcdTAxNWYnOiAncycsICdcXHUwMTYxJzogJ3MnLFxuICAnXFx1MDE2Mic6ICdUJywgICdcXHUwMTY0JzogJ1QnLCAnXFx1MDE2Nic6ICdUJyxcbiAgJ1xcdTAxNjMnOiAndCcsICAnXFx1MDE2NSc6ICd0JywgJ1xcdTAxNjcnOiAndCcsXG4gICdcXHUwMTY4JzogJ1UnLCAgJ1xcdTAxNmEnOiAnVScsICdcXHUwMTZjJzogJ1UnLCAnXFx1MDE2ZSc6ICdVJywgJ1xcdTAxNzAnOiAnVScsICdcXHUwMTcyJzogJ1UnLFxuICAnXFx1MDE2OSc6ICd1JywgICdcXHUwMTZiJzogJ3UnLCAnXFx1MDE2ZCc6ICd1JywgJ1xcdTAxNmYnOiAndScsICdcXHUwMTcxJzogJ3UnLCAnXFx1MDE3Myc6ICd1JyxcbiAgJ1xcdTAxNzQnOiAnVycsICAnXFx1MDE3NSc6ICd3JyxcbiAgJ1xcdTAxNzYnOiAnWScsICAnXFx1MDE3Nyc6ICd5JywgJ1xcdTAxNzgnOiAnWScsXG4gICdcXHUwMTc5JzogJ1onLCAgJ1xcdTAxN2InOiAnWicsICdcXHUwMTdkJzogJ1onLFxuICAnXFx1MDE3YSc6ICd6JywgICdcXHUwMTdjJzogJ3onLCAnXFx1MDE3ZSc6ICd6JyxcbiAgJ1xcdTAxMzInOiAnSUonLCAnXFx1MDEzMyc6ICdpaicsXG4gICdcXHUwMTUyJzogJ09lJywgJ1xcdTAxNTMnOiAnb2UnLFxuICAnXFx1MDE0OSc6IFwiJ25cIiwgJ1xcdTAxN2YnOiAnc3MnXG59O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnJlZHVjZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAgYXNcbiAqICB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZWR1Y2UoYXJyYXksIGl0ZXJhdGVlLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbi8qKlxuICogU3BsaXRzIGFuIEFTQ0lJIGBzdHJpbmdgIGludG8gYW4gYXJyYXkgb2YgaXRzIHdvcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqL1xuZnVuY3Rpb24gYXNjaWlXb3JkcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZUFzY2lpV29yZCkgfHwgW107XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5T2Yob2JqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmRlYnVycmAgdG8gY29udmVydCBMYXRpbi0xIFN1cHBsZW1lbnQgYW5kIExhdGluIEV4dGVuZGVkLUFcbiAqIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGxldHRlciBUaGUgbWF0Y2hlZCBsZXR0ZXIgdG8gZGVidXJyLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZGVidXJyZWQgbGV0dGVyLlxuICovXG52YXIgZGVidXJyTGV0dGVyID0gYmFzZVByb3BlcnR5T2YoZGVidXJyZWRMZXR0ZXJzKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHN0cmluZ2AgY29udGFpbnMgYSB3b3JkIGNvbXBvc2VkIG9mIFVuaWNvZGUgc3ltYm9scy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYSB3b3JkIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGVXb3JkKHN0cmluZykge1xuICByZXR1cm4gcmVIYXNVbmljb2RlV29yZC50ZXN0KHN0cmluZyk7XG59XG5cbi8qKlxuICogU3BsaXRzIGEgVW5pY29kZSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVXb3JkcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZVVuaWNvZGVXb3JkKSB8fCBbXTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5jYW1lbENhc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY29tYmluZSBlYWNoIHdvcmQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb21wb3VuZGVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVDb21wb3VuZGVyKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gYXJyYXlSZWR1Y2Uod29yZHMoZGVidXJyKHN0cmluZykucmVwbGFjZShyZUFwb3MsICcnKSksIGNhbGxiYWNrLCAnJyk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZWJ1cnJzIGBzdHJpbmdgIGJ5IGNvbnZlcnRpbmdcbiAqIFtMYXRpbi0xIFN1cHBsZW1lbnRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhdGluLTFfU3VwcGxlbWVudF8oVW5pY29kZV9ibG9jaykjQ2hhcmFjdGVyX3RhYmxlKVxuICogYW5kIFtMYXRpbiBFeHRlbmRlZC1BXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MYXRpbl9FeHRlbmRlZC1BKVxuICogbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzIGFuZCByZW1vdmluZ1xuICogW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBkZWJ1cnIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBkZWJ1cnJlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVidXJyKCdkw6lqw6AgdnUnKTtcbiAqIC8vID0+ICdkZWphIHZ1J1xuICovXG5mdW5jdGlvbiBkZWJ1cnIoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiBzdHJpbmcgJiYgc3RyaW5nLnJlcGxhY2UocmVMYXRpbiwgZGVidXJyTGV0dGVyKS5yZXBsYWNlKHJlQ29tYm9NYXJrLCAnJyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG9cbiAqIFtrZWJhYiBjYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNTcGVjaWFsX2Nhc2Vfc3R5bGVzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUga2ViYWIgY2FzZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmtlYmFiQ2FzZSgnRm9vIEJhcicpO1xuICogLy8gPT4gJ2Zvby1iYXInXG4gKlxuICogXy5rZWJhYkNhc2UoJ2Zvb0JhcicpO1xuICogLy8gPT4gJ2Zvby1iYXInXG4gKlxuICogXy5rZWJhYkNhc2UoJ19fRk9PX0JBUl9fJyk7XG4gKiAvLyA9PiAnZm9vLWJhcidcbiAqL1xudmFyIGtlYmFiQ2FzZSA9IGNyZWF0ZUNvbXBvdW5kZXIoZnVuY3Rpb24ocmVzdWx0LCB3b3JkLCBpbmRleCkge1xuICByZXR1cm4gcmVzdWx0ICsgKGluZGV4ID8gJy0nIDogJycpICsgd29yZC50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbi8qKlxuICogU3BsaXRzIGBzdHJpbmdgIGludG8gYW4gYXJyYXkgb2YgaXRzIHdvcmRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge1JlZ0V4cHxzdHJpbmd9IFtwYXR0ZXJuXSBUaGUgcGF0dGVybiB0byBtYXRjaCB3b3Jkcy5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLm1hcGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLndvcmRzKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gWydmcmVkJywgJ2Jhcm5leScsICdwZWJibGVzJ11cbiAqXG4gKiBfLndvcmRzKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycsIC9bXiwgXSsvZyk7XG4gKiAvLyA9PiBbJ2ZyZWQnLCAnYmFybmV5JywgJyYnLCAncGViYmxlcyddXG4gKi9cbmZ1bmN0aW9uIHdvcmRzKHN0cmluZywgcGF0dGVybiwgZ3VhcmQpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcGF0dGVybiA9IGd1YXJkID8gdW5kZWZpbmVkIDogcGF0dGVybjtcblxuICBpZiAocGF0dGVybiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGhhc1VuaWNvZGVXb3JkKHN0cmluZykgPyB1bmljb2RlV29yZHMoc3RyaW5nKSA6IGFzY2lpV29yZHMoc3RyaW5nKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nLm1hdGNoKHBhdHRlcm4pIHx8IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtlYmFiQ2FzZTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBVTk9SREVSRURfQ09NUEFSRV9GTEFHID0gMSxcbiAgICBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC8sXG4gICAgcmVMZWFkaW5nRG90ID0gL15cXC4vLFxuICAgIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXksXG4gICAgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgICBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3JyksXG4gICAgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyksXG4gICAgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKSxcbiAgICBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGNhY2hlIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gY2FjaGUuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhY2hlID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBrZXkgaW4gT2JqZWN0KG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuXG4gKiAgVGhlIGJpdG1hc2sgbWF5IGJlIGNvbXBvc2VkIG9mIHRoZSBmb2xsb3dpbmcgZmxhZ3M6XG4gKiAgICAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgICAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3QodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgaWYgKCFvYmpJc0Fycikge1xuICAgIG9ialRhZyA9IGdldFRhZyhvYmplY3QpO1xuICAgIG9ialRhZyA9IG9ialRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb2JqVGFnO1xuICB9XG4gIGlmICghb3RoSXNBcnIpIHtcbiAgICBvdGhUYWcgPSBnZXRUYWcob3RoZXIpO1xuICAgIG90aFRhZyA9IG90aFRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb3RoVGFnO1xuICB9XG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcgJiYgIWlzSG9zdE9iamVjdChvYmplY3QpLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnICYmICFpc0hvc3RPYmplY3Qob3RoZXIpLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtBcnJheX0gbWF0Y2hEYXRhIFRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSwgY3VzdG9taXplcikge1xuICB2YXIgaW5kZXggPSBtYXRjaERhdGEubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gaW5kZXgsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gIWxlbmd0aDtcbiAgfVxuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIgZGF0YSA9IG1hdGNoRGF0YVtpbmRleF07XG4gICAgaWYgKChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSlcbiAgICAgICAgICA/IGRhdGFbMV0gIT09IG9iamVjdFtkYXRhWzBdXVxuICAgICAgICAgIDogIShkYXRhWzBdIGluIG9iamVjdClcbiAgICAgICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgZGF0YSA9IG1hdGNoRGF0YVtpbmRleF07XG4gICAgdmFyIGtleSA9IGRhdGFbMF0sXG4gICAgICAgIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHNyY1ZhbHVlID0gZGF0YVsxXTtcblxuICAgIGlmIChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSkge1xuICAgICAgaWYgKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdGFjayA9IG5ldyBTdGFjaztcbiAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSwgc3RhY2spO1xuICAgICAgfVxuICAgICAgaWYgKCEocmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBjdXN0b21pemVyLCBVTk9SREVSRURfQ09NUEFSRV9GTEFHIHwgUEFSVElBTF9DT01QQVJFX0ZMQUcsIHN0YWNrKVxuICAgICAgICAgICAgOiByZXN1bHRcbiAgICAgICAgICApKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXRlcmF0ZWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IFt2YWx1ZT1fLmlkZW50aXR5XSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhbiBpdGVyYXRlZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgaXRlcmF0ZWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJdGVyYXRlZSh2YWx1ZSkge1xuICAvLyBEb24ndCBzdG9yZSB0aGUgYHR5cGVvZmAgcmVzdWx0IGluIGEgdmFyaWFibGUgdG8gYXZvaWQgYSBKSVQgYnVnIGluIFNhZmFyaSA5LlxuICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjAzNCBmb3IgbW9yZSBkZXRhaWxzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgPyBiYXNlTWF0Y2hlc1Byb3BlcnR5KHZhbHVlWzBdLCB2YWx1ZVsxXSlcbiAgICAgIDogYmFzZU1hdGNoZXModmFsdWUpO1xuICB9XG4gIHJldHVybiBwcm9wZXJ0eSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBtYXRjaERhdGEgPSBnZXRNYXRjaERhdGEoc291cmNlKTtcbiAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc1Byb3BlcnR5YCB3aGljaCBkb2Vzbid0IGNsb25lIGBzcmNWYWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSB2YWx1ZSB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkocGF0aCwgc3JjVmFsdWUpIHtcbiAgaWYgKGlzS2V5KHBhdGgpICYmIGlzU3RyaWN0Q29tcGFyYWJsZShzcmNWYWx1ZSkpIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUodG9LZXkocGF0aCksIHNyY1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIG9ialZhbHVlID0gZ2V0KG9iamVjdCwgcGF0aCk7XG4gICAgcmV0dXJuIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIG9ialZhbHVlID09PSBzcmNWYWx1ZSlcbiAgICAgID8gaGFzSW4ob2JqZWN0LCBwYXRoKVxuICAgICAgOiBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIHVuZGVmaW5lZCwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHVsbEF0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGluZGl2aWR1YWxcbiAqIGluZGV4ZXMgb3IgY2FwdHVyaW5nIHRoZSByZW1vdmVkIGVsZW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtudW1iZXJbXX0gaW5kZXhlcyBUaGUgaW5kZXhlcyBvZiBlbGVtZW50cyB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVB1bGxBdChhcnJheSwgaW5kZXhlcykge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBpbmRleGVzLmxlbmd0aCA6IDAsXG4gICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBpbmRleCA9IGluZGV4ZXNbbGVuZ3RoXTtcbiAgICBpZiAobGVuZ3RoID09IGxhc3RJbmRleCB8fCBpbmRleCAhPT0gcHJldmlvdXMpIHtcbiAgICAgIHZhciBwcmV2aW91cyA9IGluZGV4O1xuICAgICAgaWYgKGlzSW5kZXgoaW5kZXgpKSB7XG4gICAgICAgIHNwbGljZS5jYWxsKGFycmF5LCBpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNLZXkoaW5kZXgsIGFycmF5KSkge1xuICAgICAgICB2YXIgcGF0aCA9IGNhc3RQYXRoKGluZGV4KSxcbiAgICAgICAgICAgIG9iamVjdCA9IHBhcmVudChhcnJheSwgcGF0aCk7XG5cbiAgICAgICAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgICAgICAgZGVsZXRlIG9iamVjdFt0b0tleShsYXN0KHBhdGgpKV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZWxldGUgYXJyYXlbdG9LZXkoaW5kZXgpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNsaWNlYCB3aXRob3V0IGFuIGl0ZXJhdGVlIGNhbGwgZ3VhcmQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9MF0gVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlU2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gLXN0YXJ0ID4gbGVuZ3RoID8gMCA6IChsZW5ndGggKyBzdGFydCk7XG4gIH1cbiAgZW5kID0gZW5kID4gbGVuZ3RoID8gbGVuZ3RoIDogZW5kO1xuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5ndGg7XG4gIH1cbiAgbGVuZ3RoID0gc3RhcnQgPiBlbmQgPyAwIDogKChlbmQgLSBzdGFydCkgPj4+IDApO1xuICBzdGFydCA+Pj49IDA7XG5cbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGFycmF5W2luZGV4ICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IHN0cmluZ1RvUGF0aCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghc2Vlbi5oYXMob3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLmFkZChvdGhJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShcbiAgICAgICAgICBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHxcbiAgICAgICAgICAgIGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10oYXJyYXkpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgb3RoZXIgPSBvdGhlci5idWZmZXI7XG5cbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBDb2VyY2UgYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCBhbmQgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzLlxuICAgICAgLy8gSW52YWxpZCBkYXRlcyBhcmUgY29lcmNlZCB0byBgTmFOYC5cbiAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRztcbiAgICAgIGNvbnZlcnQgfHwgKGNvbnZlcnQgPSBzZXRUb0FycmF5KTtcblxuICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICBiaXRtYXNrIHw9IFVOT1JERVJFRF9DT01QQVJFX0ZMQUc7XG5cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgICAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICBpZiAoc3ltYm9sVmFsdWVPZikge1xuICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHRydWU7XG4gIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBvYmplY3QpO1xuXG4gIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5LCBvdGhlciwgb2JqZWN0LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKVxuICAgICAgICAgIDogY29tcGFyZWRcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBtYXRjaCBkYXRhIG9mIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaERhdGEob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBrZXlzKG9iamVjdCksXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBrZXkgPSByZXN1bHRbbGVuZ3RoXSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgIHJlc3VsdFtsZW5ndGhdID0gW2tleSwgdmFsdWUsIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSldO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSxcbi8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UgPCAxNCwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGV4aXN0cyBvbiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYXNGdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjayBwcm9wZXJ0aWVzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzUGF0aChvYmplY3QsIHBhdGgsIGhhc0Z1bmMpIHtcbiAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aF0gOiBjYXN0UGF0aChwYXRoKTtcblxuICB2YXIgcmVzdWx0LFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKTtcbiAgICBpZiAoIShyZXN1bHQgPSBvYmplY3QgIT0gbnVsbCAmJiBoYXNGdW5jKG9iamVjdCwga2V5KSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBvYmplY3QgPSBvYmplY3Rba2V5XTtcbiAgfVxuICBpZiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0ID8gb2JqZWN0Lmxlbmd0aCA6IDA7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICFpc09iamVjdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gKiBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUoa2V5LCBzcmNWYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gc3JjVmFsdWUgJiZcbiAgICAgIChzcmNWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gT2JqZWN0KG9iamVjdCkpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBwYXJlbnQgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIFRoZSBwYXRoIHRvIGdldCB0aGUgcGFyZW50IHZhbHVlIG9mLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHBhcmVudCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gcGFyZW50KG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gcGF0aC5sZW5ndGggPT0gMSA/IG9iamVjdCA6IGJhc2VHZXQob2JqZWN0LCBiYXNlU2xpY2UocGF0aCwgMCwgLTEpKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZShmdW5jdGlvbihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChyZUxlYWRpbmdEb3QudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubGFzdChbMSwgMiwgM10pO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiBsYXN0KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIHJldHVybiBsZW5ndGggPyBhcnJheVtsZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBlbGVtZW50cyBmcm9tIGBhcnJheWAgdGhhdCBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3JcbiAqIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHRoZSByZW1vdmVkIGVsZW1lbnRzLiBUaGUgcHJlZGljYXRlIGlzIGludm9rZWRcbiAqIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gKlxuICogKipOb3RlOioqIFVubGlrZSBgXy5maWx0ZXJgLCB0aGlzIG1ldGhvZCBtdXRhdGVzIGBhcnJheWAuIFVzZSBgXy5wdWxsYFxuICogdG8gcHVsbCBlbGVtZW50cyBmcm9tIGFuIGFycmF5IGJ5IHZhbHVlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV1cbiAqICBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgcmVtb3ZlZCBlbGVtZW50cy5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5ID0gWzEsIDIsIDMsIDRdO1xuICogdmFyIGV2ZW5zID0gXy5yZW1vdmUoYXJyYXksIGZ1bmN0aW9uKG4pIHtcbiAqICAgcmV0dXJuIG4gJSAyID09IDA7XG4gKiB9KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheSk7XG4gKiAvLyA9PiBbMSwgM11cbiAqXG4gKiBjb25zb2xlLmxvZyhldmVucyk7XG4gKiAvLyA9PiBbMiwgNF1cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAoIShhcnJheSAmJiBhcnJheS5sZW5ndGgpKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluZGV4ZXMgPSBbXSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgPSBiYXNlSXRlcmF0ZWUocHJlZGljYXRlLCAzKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgaW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9XG4gIH1cbiAgYmFzZVB1bGxBdChhcnJheSwgaW5kZXhlcyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gQXNzaWduIGNhY2hlIHRvIGBfLm1lbW9pemVgLlxubWVtb2l6ZS5DYWNoZSA9IE1hcENhY2hlO1xuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IF8uY3JlYXRlKHsgJ2EnOiBfLmNyZWF0ZSh7ICdiJzogMiB9KSB9KTtcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EuYicpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2InKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGhhc0luKG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgaGFzUGF0aChvYmplY3QsIHBhdGgsIGJhc2VIYXNJbik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBhIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFtcbiAqICAgeyAnYSc6IHsgJ2InOiAyIH0gfSxcbiAqICAgeyAnYSc6IHsgJ2InOiAxIH0gfVxuICogXTtcbiAqXG4gKiBfLm1hcChvYmplY3RzLCBfLnByb3BlcnR5KCdhLmInKSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqXG4gKiBfLm1hcChfLnNvcnRCeShvYmplY3RzLCBfLnByb3BlcnR5KFsnYScsICdiJ10pKSwgJ2EuYicpO1xuICogLy8gPT4gWzEsIDJdXG4gKi9cbmZ1bmN0aW9uIHByb3BlcnR5KHBhdGgpIHtcbiAgcmV0dXJuIGlzS2V5KHBhdGgpID8gYmFzZVByb3BlcnR5KHRvS2V5KHBhdGgpKSA6IGJhc2VQcm9wZXJ0eURlZXAocGF0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluY2x1ZGVzYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIHNwZWNpZnlpbmcgYW4gaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gISFsZW5ndGggJiYgYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCAwKSA+IC0xO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoY29tcGFyYXRvcih2YWx1ZSwgYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUlzTmFOLCBmcm9tSW5kZXgpO1xuICB9XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYU5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbnVtYmVyIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYE5hTmAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHNlZW4gPSByZXN1bHQ7XG5cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4gIH1cbiAgZWxzZSBpZiAobGVuZ3RoID49IExBUkdFX0FSUkFZX1NJWkUpIHtcbiAgICB2YXIgc2V0ID0gaXRlcmF0ZWUgPyBudWxsIDogY3JlYXRlU2V0KGFycmF5KTtcbiAgICBpZiAoc2V0KSB7XG4gICAgICByZXR1cm4gc2V0VG9BcnJheShzZXQpO1xuICAgIH1cbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gY2FjaGVIYXM7XG4gICAgc2VlbiA9IG5ldyBTZXRDYWNoZTtcbiAgfVxuICBlbHNlIHtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIHZhbHVlID0gKGNvbXBhcmF0b3IgfHwgdmFsdWUgIT09IDApID8gdmFsdWUgOiAwO1xuICAgIGlmIChpc0NvbW1vbiAmJiBjb21wdXRlZCA9PT0gY29tcHV0ZWQpIHtcbiAgICAgIHZhciBzZWVuSW5kZXggPSBzZWVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChzZWVuSW5kZXgtLSkge1xuICAgICAgICBpZiAoc2VlbltzZWVuSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWluY2x1ZGVzKHNlZW4sIGNvbXB1dGVkLCBjb21wYXJhdG9yKSkge1xuICAgICAgaWYgKHNlZW4gIT09IHJlc3VsdCkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzZXQgb2JqZWN0IG9mIGB2YWx1ZXNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhZGQgdG8gdGhlIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBzZXQuXG4gKi9cbnZhciBjcmVhdGVTZXQgPSAhKFNldCAmJiAoMSAvIHNldFRvQXJyYXkobmV3IFNldChbLC0wXSkpWzFdKSA9PSBJTkZJTklUWSkgPyBub29wIDogZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiBuZXcgU2V0KHZhbHVlcyk7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiBhbiBhcnJheSwgdXNpbmdcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGluIHdoaWNoIG9ubHkgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZWFjaFxuICogZWxlbWVudCBpcyBrZXB0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUgZnJlZSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy51bmlxKFsyLCAxLCAyXSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqL1xuZnVuY3Rpb24gdW5pcShhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VVbmlxKGFycmF5KVxuICAgIDogW107XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYHVuZGVmaW5lZGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLm5vb3ApO1xuICogLy8gPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICovXG5mdW5jdGlvbiBub29wKCkge1xuICAvLyBObyBvcGVyYXRpb24gcGVyZm9ybWVkLlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXE7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiXG4vLyBodHRwczovL2dpdGh1Yi5jb20vTWF0dC1Fc2NoL3ZpcnR1YWwtZG9tL2Jsb2IvbWFzdGVyL3ZpcnR1YWwtaHlwZXJzY3JpcHQvcGFyc2UtdGFnLmpzXG5cbnZhciBzcGxpdCA9IHJlcXVpcmUoJ2Jyb3dzZXItc3BsaXQnKVxuXG52YXIgY2xhc3NJZFNwbGl0ID0gLyhbXFwuI10/W2EtekEtWjAtOVxcdTAwN0YtXFx1RkZGRl86LV0rKS9cbnZhciBub3RDbGFzc0lkID0gL15cXC58Iy9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZVNlbGVjdG9yIChzZWxlY3RvciwgdXBwZXIpIHtcbiAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnJ1xuICB2YXIgdGFnTmFtZVxuICB2YXIgaWQgPSAnJ1xuICB2YXIgY2xhc3NlcyA9IFtdXG5cbiAgdmFyIHRhZ1BhcnRzID0gc3BsaXQoc2VsZWN0b3IsIGNsYXNzSWRTcGxpdClcblxuICBpZiAobm90Q2xhc3NJZC50ZXN0KHRhZ1BhcnRzWzFdKSB8fCBzZWxlY3RvciA9PT0gJycpIHtcbiAgICB0YWdOYW1lID0gJ2RpdidcbiAgfVxuXG4gIHZhciBwYXJ0LCB0eXBlLCBpXG5cbiAgZm9yIChpID0gMDsgaSA8IHRhZ1BhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgcGFydCA9IHRhZ1BhcnRzW2ldXG5cbiAgICBpZiAoIXBhcnQpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdHlwZSA9IHBhcnQuY2hhckF0KDApXG5cbiAgICBpZiAoIXRhZ05hbWUpIHtcbiAgICAgIHRhZ05hbWUgPSBwYXJ0XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnLicpIHtcbiAgICAgIGNsYXNzZXMucHVzaChwYXJ0LnN1YnN0cmluZygxLCBwYXJ0Lmxlbmd0aCkpXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnIycpIHtcbiAgICAgIGlkID0gcGFydC5zdWJzdHJpbmcoMSwgcGFydC5sZW5ndGgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0YWdOYW1lOiB1cHBlciA9PT0gdHJ1ZSA/IHRhZ05hbWUudG9VcHBlckNhc2UoKSA6IHRhZ05hbWUsXG4gICAgaWQ6IGlkLFxuICAgIGNsYXNzTmFtZTogY2xhc3Nlcy5qb2luKCcgJylcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgY2hlY2tGb3JFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XHJcbiAgICAgICAgc3VwZXIoZXJyb3IpO1xyXG4gICAgICAgIGNvbnN0IGlzRXJyb3IgPSBgXHJcbiAgICAgICAgPGgzIHN0eWxlPVwiY29sb3I6IHJlZDtcIj5UeXBlRXJyb3I6ICR7dGhpcy5tZXNzYWdlfTwvaDM+XHJcbiAgICAgICAgPHA+PC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1jb25cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNjN2UyZjE7IGJvcmRlcjogMnB4IHNvbGlkICMzOGI2ZmY7IHBhZGRpbmc6IDhweCAxMnB4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdj4ke3RoaXMuc3RhY2t9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yXCIpLmlubmVySFRNTCA9IGlzRXJyb3I7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBjaGVja0ZvckVycm9yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBxdWlja19lcnJvcl8xID0gcmVxdWlyZShcInF1aWNrLWVycm9yXCIpO1xyXG5jb25zdCBzbmFiYmRvbSA9IHJlcXVpcmUoXCJzbmFiYmRvbVwiKTtcclxuY29uc3QgcHJvcHNfMSA9IHJlcXVpcmUoXCJzbmFiYmRvbS9tb2R1bGVzL3Byb3BzXCIpO1xyXG5jb25zdCByZWNvbmNpbGUgPSBzbmFiYmRvbS5pbml0KFtwcm9wc18xLmRlZmF1bHRdKTtcclxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcclxuY29uc3Qgc25hYmJkb21fMSA9IHJlcXVpcmUoXCJzbmFiYmRvbVwiKTtcclxuY29uc3QgaW5pdCA9IHJlcXVpcmUoJ3NuYWJiZG9tLXRvLWh0bWwvaW5pdCcpO1xyXG5jb25zdCBtb2R1bGVzID0gcmVxdWlyZSgnc25hYmJkb20tdG8taHRtbC9tb2R1bGVzJyk7XHJcbmNvbnN0IHRvSFRNTCA9IGluaXQoW1xyXG4gICAgbW9kdWxlcy5jbGFzcyxcclxuICAgIG1vZHVsZXMucHJvcHMsXHJcbiAgICBtb2R1bGVzLmF0dHJpYnV0ZXMsXHJcbiAgICBtb2R1bGVzLnN0eWxlXHJcbl0pO1xyXG4vLyBpbnRlcmZhY2UgSVF1aWNrIHtcclxuLy8gICAgIHJlYWRvbmx5ICRlbDogRWxlbWVudCxcclxuLy8gfVxyXG4vLyBmdW5jdGlvbiB3YXRjaEVmZmVjdChmbjpQIGFueSkge1xyXG4vLyAgICAgdGhpcy5hY3RpdmVFZmZlY3QgPSBmblxyXG4vLyAgICAgZm4oKVxyXG4vLyAgICAgdGhpcy5hY3RpdmVFZmZlY3QgPSBudWxsXHJcbi8vIH1cclxuY2xhc3MgRGVwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSBuZXcgU2V0KCk7XHJcbiAgICB9XHJcbiAgICBkZXBlbmQoYWN0aXZlRWZmZWN0KSB7XHJcbiAgICAgICAgaWYgKGFjdGl2ZUVmZmVjdClcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5hZGQoYWN0aXZlRWZmZWN0KTtcclxuICAgIH1cclxuICAgIG5vdGlmeSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKHN1YikgPT4ge1xyXG4gICAgICAgICAgICBzdWIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgIHQucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7IH1cclxuICAgIHNldFN0YXRlKHBhcnRpYWxTdGF0ZSkge1xyXG4gICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgLi4uX3RoaXMuc3RhdGUsXHJcbiAgICAgICAgICAgIC4uLnBhcnRpYWxTdGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgUXVpY2suX191cGRhdGVyKF90aGlzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcihlbCwgcikge1xyXG4gICAgICAgIHJlY29uY2lsZShyb290LCBlbCk7XHJcbiAgICB9XHJcbn1cclxuY29uc3QgX3B0ID0gQ29tcG9uZW50LnByb3RvdHlwZTtcclxuX3B0LmlzUXVpY2tDbGFzc0NvbXBvbmVudCA9IHRydWU7XHJcbmNvbnN0IHJlbmRlciA9IGFzeW5jIChlbCwgcikgPT4ge1xyXG4gICAgcmVjb25jaWxlKHJvb3QsIGVsKTtcclxufTtcclxuY29uc3QgJGluaXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuICAgIGZhdi5ocmVmID0gXCIvZmF2aWNvbi5pY29cIjtcclxuICAgIGZhdi5yZWwgPSBcImljb25cIjtcclxuICAgIGNvbnN0IGggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIik7XHJcbiAgICBjb25zb2xlLmxvZyhoKTtcclxufTtcclxuY29uc3QgJGxpc3RlbmVyID0gKHRhcmdldCwgdHlwZSwgZm4sIHByZXZlbnQpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChwcmV2ZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IFwiXCIgfHwgIXRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdChgdGFyZ2V0IG5vdCBwYXNzZWQgdG8gbGlzdGVuZXJgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuY29uc3QgdXNlID0gKGZ1bmMpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgICAgICBmdW5jO1xyXG4gICAgfSk7XHJcbn07XHJcbmNvbnN0IHZpZXcgPSAodmlldykgPT4ge1xyXG4gICAgY29uc3QgcmVuZGVyVmlld3RvSFRNTCA9IHRvSFRNTCh2aWV3KTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpLmlubmVySFRNTCA9IHJlbmRlclZpZXd0b0hUTUw7XHJcbn07XHJcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgcHJvcHMgPSB7fSwgLi4uY2hpbGRyZW4pID0+IHtcclxuICAgIGNoaWxkcmVuID0gY2hpbGRyZW4uZmxhdCgpO1xyXG4gICAgaWYgKHR5cGUucHJvdG90eXBlICYmIHR5cGUucHJvdG90eXBlLmlzUW5kUmVhY3RDbGFzc0NvbXBvbmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlID0gbmV3IHR5cGUocHJvcHMpO1xyXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJbnN0YW5jZS5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgKHR5cGUpID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdHlwZShwcm9wcyk7XHJcbiAgICB9XHJcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gICAgbGV0IGRhdGFQcm9wcyA9IHt9O1xyXG4gICAgbGV0IGV2ZW50UHJvcHMgPSB7fTtcclxuICAgIGZvciAobGV0IHByb3BLZXkgaW4gcHJvcHMpIHtcclxuICAgICAgICAvLyBldmVudCBwcm9wcyBhbHdheXMgc3RhcnR3aXRoIG9uIGVnLiBvbkNsaWNrLCBvbkNoYW5nZSBldGMuXHJcbiAgICAgICAgaWYgKHByb3BLZXkuc3RhcnRzV2l0aCgnb24nKSkge1xyXG4gICAgICAgICAgICAvLyBvbkNsaWNrIC0+IGNsaWNrXHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gcHJvcEtleS5zdWJzdHJpbmcoMikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgZXZlbnRQcm9wc1tldmVudF0gPSBwcm9wc1twcm9wS2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGFQcm9wc1twcm9wS2V5XSA9IHByb3BzW3Byb3BLZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzbmFiYmRvbV8xLmgodHlwZSwgeyBwcm9wcyB9LCBjaGlsZHJlbik7XHJcbn07XHJcbmNvbnN0IF9fdXBkYXRlciA9IChpbnN0YW5jZSkgPT4geyByZXR1cm4gaW5zdGFuY2U7IH07XHJcbmNvbnN0ICRjb25maWcgPSAoZW52KSA9PiB7XHJcbiAgICBpZiAoZW52ID09PSBcInByb2R1Y3Rpb25cIikge1xyXG4gICAgfVxyXG4gICAgaWYgKGVudiA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVudiB8fCBlbnYgPT09IFwiXCIpIHtcclxuICAgIH1cclxufTtcclxuY29uc3QgUXVpY2sgPSB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICB1c2UsXHJcbiAgICB2aWV3LFxyXG4gICAgY3JlYXRlRWxlbWVudCxcclxuICAgIF9fdXBkYXRlcixcclxuICAgICRjb25maWcsXHJcbiAgICByZW5kZXIsXHJcbiAgICAkaW5pdCxcclxuICAgICRsaXN0ZW5lclxyXG59O1xyXG5RdWljay51c2UoUXVpY2suJGluaXQpO1xyXG5RdWljay51c2UoUXVpY2suJGxpc3RlbmVyKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gUXVpY2s7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMudXNlUmVmID0gZXhwb3J0cy5RdWlja1JvdXRlckxpbmsgPSBleHBvcnRzLmNyZWF0ZVBvcFN0YXRlID0gZXhwb3J0cy5RdWlja1JvdXRlciA9IHZvaWQgMDtcclxuY29uc3QgcXVpY2tqc19jb21wb25lbnRfMSA9IHJlcXVpcmUoXCJxdWlja2pzLWNvbXBvbmVudFwiKTtcclxuY29uc3QgcXVpY2tfZXJyb3JfMSA9IHJlcXVpcmUoXCJxdWljay1lcnJvclwiKTtcclxuY29uc3QgcGF0aFRvUmVnZXggPSAocGF0aCkgPT4gbmV3IFJlZ0V4cChcIl5cIiArIHBhdGgucmVwbGFjZSgvXFwvL2csIFwiXFxcXC9cIikucmVwbGFjZSgvOlxcdysvZywgXCIoLispXCIpICsgXCIkXCIpO1xyXG5jb25zdCBnZXRQYXJhbXMgPSAobWF0Y2gpID0+IHtcclxuICAgIGlmIChtYXRjaC5yZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ldyBxdWlja19lcnJvcl8xLmRlZmF1bHQoXCJtaXNzaW5nIHJlcXVpcmVkIHBhcmFtc1wiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbHVlcyA9IG1hdGNoLnJlc3VsdC5zbGljZSgxKTtcclxuICAgIGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKG1hdGNoLnJvdXRlLnBhdGgubWF0Y2hBbGwoLzooXFx3KykvZykpLm1hcCgocmVzdWx0KSA9PiByZXN1bHRbMV0pO1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGtleXMubWFwKChrZXksIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVzW2ldXTtcclxuICAgIH0pKTtcclxufTtcclxuY2xhc3MgUXVpY2tSb3V0ZXIge1xyXG4gICAgYXN5bmMgdXNlUm91dGUocm91dGVzLCB1cmwpIHtcclxuICAgICAgICBpZiAocm91dGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KFwicm91dGVzIGNhbm5vdCBiZSBlbXB0eVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDaGVjayBpZiByb3V0ZSBtYXRjaGVzIFVSTFxyXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSByb3V0ZXMubWFwKChyb3V0ZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IHJvdXRlLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBsb2NhdGlvbi5wYXRobmFtZS5tYXRjaChwYXRoVG9SZWdleChyb3V0ZS5wYXRoKSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZmluZE1hdGNoID0gbWF0Y2hlcy5maW5kKChtYXRjaCkgPT4gbWF0Y2gucmVzdWx0ICE9PSBudWxsKTtcclxuICAgICAgICBpZiAoIWZpbmRNYXRjaCkge1xyXG4gICAgICAgICAgICBmaW5kTWF0Y2ggPSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogcm91dGVzLmZpbmQoKHJvdXRlKSA9PiByb3V0ZS5wYXRoID09PSBcIi9lcnJvclwiKSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogW2xvY2F0aW9uLnBhdGhuYW1lXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IGZpbmRNYXRjaC5yb3V0ZS52aWV3KGdldFBhcmFtcyhmaW5kTWF0Y2gpKTtcclxuICAgICAgICAgICAgcXVpY2tqc19jb21wb25lbnRfMS5kZWZhdWx0LnZpZXcoYXdhaXQgdmlldy5yZW5kZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgZmluZE1hdGNoLnJvdXRlLnZpZXcoZ2V0UGFyYW1zKGZpbmRNYXRjaCkpO1xyXG4gICAgICAgIHF1aWNranNfY29tcG9uZW50XzEuZGVmYXVsdC52aWV3KGF3YWl0IHZpZXcucmVuZGVyKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0VGl0bGUoZmluZE1hdGNoLnJvdXRlLnRpdGxlKTtcclxuICAgICAgICByZXR1cm4gcm91dGVzO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgZ2V0Um91dGUoY2FsbGJhY2spIHtcclxuICAgICAgICBjb25zdCBmcm9tID0gZG9jdW1lbnQucmVmZXJyZXI7XHJcbiAgICAgICAgY29uc3QgdG8gPSBsb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBGdW5jdGlvbjtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZnVsbFBhdGg6IGxvY2F0aW9uLmhyZWYsXHJcbiAgICAgICAgICAgICAgICBwYXRobmFtZTogbG9jYXRpb24ucGF0aG5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgY2FsbGJhY2socm91dGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvLFxyXG4gICAgICAgICAgICBmcm9tLCByb3V0ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBjcmVhdGVOYXZpZ2F0aW9uKHJvdXRlcykge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQubG9jYWxOYW1lID09PSBcImFcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuZXh0ZXJuYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gZS50YXJnZXQuaHJlZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIGUudGFyZ2V0LmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgUXVpY2tSb3V0ZXIucHJvdG90eXBlLnVzZVJvdXRlKHJvdXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgaWYgKHRpdGxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIlF1aWNrIEFwcFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5RdWlja1JvdXRlciA9IFF1aWNrUm91dGVyO1xyXG47XHJcbmZ1bmN0aW9uIGNyZWF0ZVBvcFN0YXRlKHJvdXRlcykge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgUXVpY2tSb3V0ZXIucHJvdG90eXBlLnVzZVJvdXRlKHJvdXRlcyk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVBvcFN0YXRlID0gY3JlYXRlUG9wU3RhdGU7XHJcbmNsYXNzIFF1aWNrUm91dGVyTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgY29uc3QgdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbGlua1RvID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RvJyk7XHJcbiAgICAgICAgaWYgKCFsaW5rVG8pIHtcclxuICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdChgdG8gYXR0cmlidXRlIG11c3QgYmUgc3BlY2lmaWVkIHRvIHJvdXRlLCBxdWljay1saW5rIHJldHVybmVkICR7bGlua1RvfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjdXN0b21UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgY3VzdG9tVGFnLmhyZWYgPSBsaW5rVG87XHJcbiAgICAgICAgY3VzdG9tVGFnLmlubmVySFRNTCA9IHRoaXMuaW5uZXJIVE1MO1xyXG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZShcInJlZlwiKSkge1xyXG4gICAgICAgICAgICBjdXN0b21UYWcuaWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcInJlZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIikpIHtcclxuICAgICAgICAgICAgY3VzdG9tVGFnLmlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUoY3VzdG9tVGFnLCB0aGlzKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgICAgIGlmICh0aGlzLmlubmVySFRNTCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBjdXN0b21UYWcuaW5uZXJUZXh0ID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJJID0gdGhpcy5hdHRyaWJ1dGVzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmliQSA9IHRoaXMuYXR0cmlidXRlc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJJLm5hbWUgPT09IFwidG9cIikge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tVGFnLnNldEF0dHJpYnV0ZShgJHthdHRyaWJJLm5hbWV9YCwgYCR7YXR0cmliSS52YWx1ZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUXVpY2tSb3V0ZXJMaW5rID0gUXVpY2tSb3V0ZXJMaW5rO1xyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdxdWljay1yb3V0ZXItbGluaycsIFF1aWNrUm91dGVyTGluayk7XHJcbnF1aWNranNfY29tcG9uZW50XzEuZGVmYXVsdC51c2UoUXVpY2tSb3V0ZXJMaW5rKTtcclxuY2xhc3MgdXNlUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXBwPy5jaGlsZHJlbik7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy51c2VSZWYgPSB1c2VSZWY7XHJcbiIsIlxuLy8gQWxsIFNWRyBjaGlsZHJlbiBlbGVtZW50cywgbm90IGluIHRoaXMgbGlzdCwgc2hvdWxkIHNlbGYtY2xvc2VcblxuZXhwb3J0cy5DT05UQUlORVIgPSB7XG4gIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1NWRy9pbnRyby5odG1sI1Rlcm1Db250YWluZXJFbGVtZW50XG4gICdhJzogdHJ1ZSxcbiAgJ2RlZnMnOiB0cnVlLFxuICAnZ2x5cGgnOiB0cnVlLFxuICAnZyc6IHRydWUsXG4gICdtYXJrZXInOiB0cnVlLFxuICAnbWFzayc6IHRydWUsXG4gICdtaXNzaW5nLWdseXBoJzogdHJ1ZSxcbiAgJ3BhdHRlcm4nOiB0cnVlLFxuICAnc3ZnJzogdHJ1ZSxcbiAgJ3N3aXRjaCc6IHRydWUsXG4gICdzeW1ib2wnOiB0cnVlLFxuICAndGV4dCc6IHRydWUsXG5cbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHL2ludHJvLmh0bWwjVGVybURlc2NyaXB0aXZlRWxlbWVudFxuICAnZGVzYyc6IHRydWUsXG4gICdtZXRhZGF0YSc6IHRydWUsXG4gICd0aXRsZSc6IHRydWVcbn1cblxuLy8gaHR0cDovL3d3dy53My5vcmcvaHRtbC93Zy9kcmFmdHMvaHRtbC9tYXN0ZXIvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xuXG5leHBvcnRzLlZPSUQgPSB7XG4gIGFyZWE6IHRydWUsXG4gIGJhc2U6IHRydWUsXG4gIGJyOiB0cnVlLFxuICBjb2w6IHRydWUsXG4gIGVtYmVkOiB0cnVlLFxuICBocjogdHJ1ZSxcbiAgaW1nOiB0cnVlLFxuICBpbnB1dDogdHJ1ZSxcbiAga2V5Z2VuOiB0cnVlLFxuICBsaW5rOiB0cnVlLFxuICBtZXRhOiB0cnVlLFxuICBwYXJhbTogdHJ1ZSxcbiAgc291cmNlOiB0cnVlLFxuICB0cmFjazogdHJ1ZSxcbiAgd2JyOiB0cnVlXG59XG4iLCJcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcbnZhciBwYXJzZVNlbGVjdG9yID0gcmVxdWlyZSgncGFyc2Utc2VsJylcbnZhciBWT0lEX0VMRU1FTlRTID0gcmVxdWlyZSgnLi9lbGVtZW50cycpLlZPSURcbnZhciBDT05UQUlORVJfRUxFTUVOVFMgPSByZXF1aXJlKCcuL2VsZW1lbnRzJykuQ09OVEFJTkVSXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5pdCAobW9kdWxlcykge1xuICBmdW5jdGlvbiBwYXJzZSAodm5vZGUsIG5vZGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICB2YXIgYXR0cmlidXRlcyA9IG5ldyBNYXAoW1xuICAgICAgLy8gVGhlc2UgY2FuIGJlIG92ZXJ3cml0dGVuIGJlY2F1c2UgdGhhdOKAmXMgd2hhdCBoYXBwZW5zIGluIHNuYWJiZG9tXG4gICAgICBbJ2lkJywgbm9kZS5pZF0sXG4gICAgICBbJ2NsYXNzJywgbm9kZS5jbGFzc05hbWVdXG4gICAgXSlcblxuICAgIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZm4sIGluZGV4KSB7XG4gICAgICBmbih2bm9kZSwgYXR0cmlidXRlcylcbiAgICB9KVxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgICByZXN1bHQucHVzaChrZXkgKyAnPVwiJyArIHZhbHVlICsgJ1wiJylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJylcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJUb1N0cmluZyAodm5vZGUpIHtcbiAgICBpZiAodHlwZW9mIHZub2RlID09PSAndW5kZWZpbmVkJyB8fCB2bm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgaWYgKCF2bm9kZS5zZWwgJiYgdHlwZW9mIHZub2RlLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZXNjYXBlKHZub2RlLnRleHQpXG4gICAgfVxuXG4gICAgdm5vZGUuZGF0YSA9IHZub2RlLmRhdGEgfHwge31cblxuICAgIC8vIFN1cHBvcnQgdGh1bmtzXG4gICAgaWYgKHZub2RlLmRhdGEuaG9vayAmJlxuICAgICAgdHlwZW9mIHZub2RlLmRhdGEuaG9vay5pbml0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2Ygdm5vZGUuZGF0YS5mbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdm5vZGUuZGF0YS5ob29rLmluaXQodm5vZGUpXG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSBwYXJzZVNlbGVjdG9yKHZub2RlLnNlbClcbiAgICB2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZVxuICAgIHZhciBhdHRyaWJ1dGVzID0gcGFyc2Uodm5vZGUsIG5vZGUpXG4gICAgdmFyIHN2ZyA9IHZub2RlLmRhdGEubnMgPT09ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbiAgICB2YXIgdGFnID0gW11cblxuICAgIGlmICh0YWdOYW1lID09PSAnIScpIHtcbiAgICAgIHJldHVybiAnPCEtLScgKyB2bm9kZS50ZXh0ICsgJy0tPidcbiAgICB9XG5cbiAgICAvLyBPcGVuIHRhZ1xuICAgIHRhZy5wdXNoKCc8JyArIHRhZ05hbWUpXG4gICAgaWYgKGF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICB0YWcucHVzaCgnICcgKyBhdHRyaWJ1dGVzKVxuICAgIH1cbiAgICBpZiAoc3ZnICYmIENPTlRBSU5FUl9FTEVNRU5UU1t0YWdOYW1lXSAhPT0gdHJ1ZSkge1xuICAgICAgdGFnLnB1c2goJyAvJylcbiAgICB9XG4gICAgdGFnLnB1c2goJz4nKVxuXG4gICAgLy8gQ2xvc2UgdGFnLCBpZiBuZWVkZWRcbiAgICBpZiAoKFZPSURfRUxFTUVOVFNbdGFnTmFtZV0gIT09IHRydWUgJiYgIXN2ZykgfHxcbiAgICAgICAgKHN2ZyAmJiBDT05UQUlORVJfRUxFTUVOVFNbdGFnTmFtZV0gPT09IHRydWUpKSB7XG4gICAgICBpZiAodm5vZGUuZGF0YS5wcm9wcyAmJiB2bm9kZS5kYXRhLnByb3BzLmlubmVySFRNTCkge1xuICAgICAgICB0YWcucHVzaCh2bm9kZS5kYXRhLnByb3BzLmlubmVySFRNTClcbiAgICAgIH0gZWxzZSBpZiAodm5vZGUudGV4dCkge1xuICAgICAgICB0YWcucHVzaChlc2NhcGUodm5vZGUudGV4dCkpXG4gICAgICB9IGVsc2UgaWYgKHZub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgdGFnLnB1c2gocmVuZGVyVG9TdHJpbmcoY2hpbGQpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGFnLnB1c2goJzwvJyArIHRhZ05hbWUgKyAnPicpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRhZy5qb2luKCcnKVxuICB9XG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gZGF0YS5hdHRyc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF0dHJzTW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzIHx8IHt9XG5cbiAgZm9yT3duKGF0dHJzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KGtleSwgZXNjYXBlKHZhbHVlKSlcbiAgfSlcbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIHJlbW92ZSA9IHJlcXVpcmUoJ2xvZGFzaC5yZW1vdmUnKVxudmFyIHVuaXEgPSByZXF1aXJlKCdsb2Rhc2gudW5pcScpXG5cbi8vIGRhdGEuY2xhc3NcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGFzc01vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHZhbHVlc1xuICB2YXIgX2FkZCA9IFtdXG4gIHZhciBfcmVtb3ZlID0gW11cbiAgdmFyIGNsYXNzZXMgPSB2bm9kZS5kYXRhLmNsYXNzIHx8IHt9XG4gIHZhciBleGlzdGluZyA9IGF0dHJpYnV0ZXMuZ2V0KCdjbGFzcycpXG4gIGV4aXN0aW5nID0gZXhpc3RpbmcubGVuZ3RoID4gMCA/IGV4aXN0aW5nLnNwbGl0KCcgJykgOiBbXVxuXG4gIGZvck93bihjbGFzc2VzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgX2FkZC5wdXNoKGtleSlcbiAgICB9IGVsc2Uge1xuICAgICAgX3JlbW92ZS5wdXNoKGtleSlcbiAgICB9XG4gIH0pXG5cbiAgdmFsdWVzID0gcmVtb3ZlKHVuaXEoZXhpc3RpbmcuY29uY2F0KF9hZGQpKSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIF9yZW1vdmUuaW5kZXhPZih2YWx1ZSkgPCAwXG4gIH0pXG5cbiAgaWYgKHZhbHVlcy5sZW5ndGgpIHtcbiAgICBhdHRyaWJ1dGVzLnNldCgnY2xhc3MnLCB2YWx1ZXMuam9pbignICcpKVxuICB9XG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gZGF0YS5kYXRhc2V0XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGF0YXNldE1vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIGRhdGFzZXQgPSB2bm9kZS5kYXRhLmRhdGFzZXQgfHwge31cblxuICBmb3JPd24oZGF0YXNldCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBhdHRyaWJ1dGVzLnNldChgZGF0YS0ke2tleX1gLCBlc2NhcGUodmFsdWUpKVxuICB9KVxufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2xhc3M6IHJlcXVpcmUoJy4vY2xhc3MnKSxcbiAgcHJvcHM6IHJlcXVpcmUoJy4vcHJvcHMnKSxcbiAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gIGRhdGFzZXQ6IHJlcXVpcmUoJy4vZGF0YXNldCcpXG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL2VsZW1lbnRcbnZhciBvbWl0ID0gW1xuICAnYXR0cmlidXRlcycsXG4gICdjaGlsZEVsZW1lbnRDb3VudCcsXG4gICdjaGlsZHJlbicsXG4gICdjbGFzc0xpc3QnLFxuICAnY2xpZW50SGVpZ2h0JyxcbiAgJ2NsaWVudExlZnQnLFxuICAnY2xpZW50VG9wJyxcbiAgJ2NsaWVudFdpZHRoJyxcbiAgJ2N1cnJlbnRTdHlsZScsXG4gICdmaXJzdEVsZW1lbnRDaGlsZCcsXG4gICdpbm5lckhUTUwnLFxuICAnbGFzdEVsZW1lbnRDaGlsZCcsXG4gICduZXh0RWxlbWVudFNpYmxpbmcnLFxuICAnb25nb3Rwb2ludGVyY2FwdHVyZScsXG4gICdvbmxvc3Rwb2ludGVyY2FwdHVyZScsXG4gICdvbndoZWVsJyxcbiAgJ291dGVySFRNTCcsXG4gICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJyxcbiAgJ3J1bnRpbWVTdHlsZScsXG4gICdzY3JvbGxIZWlnaHQnLFxuICAnc2Nyb2xsTGVmdCcsXG4gICdzY3JvbGxMZWZ0TWF4JyxcbiAgJ3Njcm9sbFRvcCcsXG4gICdzY3JvbGxUb3BNYXgnLFxuICAnc2Nyb2xsV2lkdGgnLFxuICAndGFiU3RvcCcsXG4gICd0YWdOYW1lJ1xuXVxuXG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI2Jvb2xlYW4tYXR0cmlidXRlc1xudmFyIGJvb2xlYW5BdHRyaWJ1dGVzID0gW1xuICAnZGlzYWJsZWQnLFxuICAndmlzaWJsZScsXG4gICdjaGVja2VkJyxcbiAgJ3JlYWRvbmx5JyxcbiAgJ3JlcXVpcmVkJyxcbiAgJ2FsbG93ZnVsbHNjcmVlbicsXG4gICdhdXRvZm9jdXMnLFxuICAnYXV0b3BsYXknLFxuICAnY29tcGFjdCcsXG4gICdjb250cm9scycsXG4gICdkZWZhdWx0JyxcbiAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgJ2hpZGRlbicsXG4gICdpc21hcCcsXG4gICdpdGVtc2NvcGUnLFxuICAnbG9vcCcsXG4gICdtdWx0aXBsZScsXG4gICdtdXRlZCcsXG4gICdub3Jlc2l6ZScsXG4gICdub3NoYWRlJyxcbiAgJ25vdmFsaWRhdGUnLFxuICAnbm93cmFwJyxcbiAgJ29wZW4nLFxuICAncmV2ZXJzZWQnLFxuICAnc2VhbWxlc3MnLFxuICAnc2VsZWN0ZWQnLFxuICAnc29ydGFibGUnLFxuICAndHJ1ZXNwZWVkJyxcbiAgJ3R5cGVtdXN0bWF0Y2gnXG5dXG5cbi8vIGRhdGEucHJvcHNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcm9wc01vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcyB8fCB7fVxuXG4gIGZvck93bihwcm9wcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBpZiAob21pdC5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChrZXkgPT09ICdodG1sRm9yJykge1xuICAgICAga2V5ID0gJ2ZvcidcbiAgICB9XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzTmFtZScpIHtcbiAgICAgIGtleSA9ICdjbGFzcydcbiAgICB9XG5cbiAgICB2YXIgbGtleSA9IGtleS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKH5ib29sZWFuQXR0cmlidXRlcy5pbmRleE9mKGxrZXkpKSB7XG4gICAgICBpZiAodmFsdWUpIHsgLy8gc2V0IGF0dHIgb25seSB3aGVuIHRydXRoeVxuICAgICAgICBhdHRyaWJ1dGVzLnNldChsa2V5LCBsa2V5KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJ1dGVzLnNldChsa2V5LCBlc2NhcGUodmFsdWUpKVxuICAgIH1cbiAgfSlcbn1cbiIsIlxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKVxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxudmFyIGtlYmFiQ2FzZSA9IHJlcXVpcmUoJ2xvZGFzaC5rZWJhYmNhc2UnKVxuXG4vLyBkYXRhLnN0eWxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGVNb2R1bGUgKHZub2RlLCBhdHRyaWJ1dGVzKSB7XG4gIHZhciB2YWx1ZXMgPSBbXVxuICB2YXIgc3R5bGUgPSB2bm9kZS5kYXRhLnN0eWxlIHx8IHt9XG5cbiAgLy8gbWVyZ2UgaW4gYGRlbGF5ZWRgIHByb3BlcnRpZXNcbiAgaWYgKHN0eWxlLmRlbGF5ZWQpIHtcbiAgICBhc3NpZ24oc3R5bGUsIHN0eWxlLmRlbGF5ZWQpXG4gIH1cblxuICBmb3JPd24oc3R5bGUsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgLy8gb21pdCBob29rIG9iamVjdHNcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB2YXIga2ViYWJLZXkgPSBrZWJhYkNhc2Uoa2V5KVxuICAgICAgdmFsdWVzLnB1c2goKGtleS5tYXRjaCgvXi0tLiovKSA/ICctLScgKyBrZWJhYktleSA6IGtlYmFiS2V5KSArICc6ICcgKyBlc2NhcGUodmFsdWUpKVxuICAgIH1cbiAgfSlcblxuICBpZiAodmFsdWVzLmxlbmd0aCkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KCdzdHlsZScsIHZhbHVlcy5qb2luKCc7ICcpKVxuICB9XG59XG4iLCJpbXBvcnQgeyB2bm9kZSB9IGZyb20gJy4vdm5vZGUnO1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnLi9pcyc7XG5mdW5jdGlvbiBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKSB7XG4gICAgZGF0YS5ucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgaWYgKHNlbCAhPT0gJ2ZvcmVpZ25PYmplY3QnICYmIGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkRGF0YSA9IGNoaWxkcmVuW2ldLmRhdGE7XG4gICAgICAgICAgICBpZiAoY2hpbGREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhZGROUyhjaGlsZERhdGEsIGNoaWxkcmVuW2ldLmNoaWxkcmVuLCBjaGlsZHJlbltpXS5zZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGlzLnByaW1pdGl2ZShjaGlsZHJlbltpXSkpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSB2bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgdW5kZWZpbmVkKTtcbn1cbjtcbmV4cG9ydCBkZWZhdWx0IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG59XG5mdW5jdGlvbiByZW1vdmVDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG59XG5mdW5jdGlvbiBuZXh0U2libGluZyhub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG59XG5mdW5jdGlvbiB0YWdOYW1lKGVsbSkge1xuICAgIHJldHVybiBlbG0udGFnTmFtZTtcbn1cbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KG5vZGUsIHRleHQpIHtcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cbmZ1bmN0aW9uIGdldFRleHRDb250ZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudDtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XG59XG5mdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xufVxuZnVuY3Rpb24gaXNDb21tZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gODtcbn1cbmV4cG9ydCB2YXIgaHRtbERvbUFwaSA9IHtcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnROUzogY3JlYXRlRWxlbWVudE5TLFxuICAgIGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcbiAgICBjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuICAgIGluc2VydEJlZm9yZTogaW5zZXJ0QmVmb3JlLFxuICAgIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gICAgcGFyZW50Tm9kZTogcGFyZW50Tm9kZSxcbiAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBzZXRUZXh0Q29udGVudDogc2V0VGV4dENvbnRlbnQsXG4gICAgZ2V0VGV4dENvbnRlbnQ6IGdldFRleHRDb250ZW50LFxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgIGlzVGV4dDogaXNUZXh0LFxuICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxufTtcbmV4cG9ydCBkZWZhdWx0IGh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcCIsImV4cG9ydCB2YXIgYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZXhwb3J0IGZ1bmN0aW9uIHByaW1pdGl2ZShzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcyA9PT0gJ251bWJlcic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy5qcy5tYXAiLCJpbXBvcnQgdm5vZGUgZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBodG1sRG9tQXBpIGZyb20gJy4vaHRtbGRvbWFwaSc7XG5mdW5jdGlvbiBpc1VuZGVmKHMpIHsgcmV0dXJuIHMgPT09IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gaXNEZWYocykgeyByZXR1cm4gcyAhPT0gdW5kZWZpbmVkOyB9XG52YXIgZW1wdHlOb2RlID0gdm5vZGUoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuZnVuY3Rpb24gc2FtZVZub2RlKHZub2RlMSwgdm5vZGUyKSB7XG4gICAgcmV0dXJuIHZub2RlMS5rZXkgPT09IHZub2RlMi5rZXkgJiYgdm5vZGUxLnNlbCA9PT0gdm5vZGUyLnNlbDtcbn1cbmZ1bmN0aW9uIGlzVm5vZGUodm5vZGUpIHtcbiAgICByZXR1cm4gdm5vZGUuc2VsICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeChjaGlsZHJlbiwgYmVnaW5JZHgsIGVuZElkeCkge1xuICAgIHZhciBpLCBtYXAgPSB7fSwga2V5LCBjaDtcbiAgICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgICAgICBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAga2V5ID0gY2gua2V5O1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG1hcFtrZXldID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufVxudmFyIGhvb2tzID0gWydjcmVhdGUnLCAndXBkYXRlJywgJ3JlbW92ZScsICdkZXN0cm95JywgJ3ByZScsICdwb3N0J107XG5leHBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmV4cG9ydCB7IHRodW5rIH0gZnJvbSAnLi90aHVuayc7XG5leHBvcnQgZnVuY3Rpb24gaW5pdChtb2R1bGVzLCBkb21BcGkpIHtcbiAgICB2YXIgaSwgaiwgY2JzID0ge307XG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbERvbUFwaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGhvb2sgPSBtb2R1bGVzW2pdW2hvb2tzW2ldXTtcbiAgICAgICAgICAgIGlmIChob29rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjYnNbaG9va3NbaV1dLnB1c2goaG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlOb2RlQXQoZWxtKSB7XG4gICAgICAgIHZhciBpZCA9IGVsbS5pZCA/ICcjJyArIGVsbS5pZCA6ICcnO1xuICAgICAgICB2YXIgYyA9IGVsbS5jbGFzc05hbWUgPyAnLicgKyBlbG0uY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHJldHVybiB2bm9kZShhcGkudGFnTmFtZShlbG0pLnRvTG93ZXJDYXNlKCkgKyBpZCArIGMsIHt9LCBbXSwgdW5kZWZpbmVkLCBlbG0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVSbUNiKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJtQ2IoKSB7XG4gICAgICAgICAgICBpZiAoLS1saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBhcGkucGFyZW50Tm9kZShjaGlsZEVsbSk7XG4gICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudF8xLCBjaGlsZEVsbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmluaXQpKSB7XG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW4sIHNlbCA9IHZub2RlLnNlbDtcbiAgICAgICAgaWYgKHNlbCA9PT0gJyEnKSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIHZub2RlLnRleHQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVDb21tZW50KHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBQYXJzZSBzZWxlY3RvclxuICAgICAgICAgICAgdmFyIGhhc2hJZHggPSBzZWwuaW5kZXhPZignIycpO1xuICAgICAgICAgICAgdmFyIGRvdElkeCA9IHNlbC5pbmRleE9mKCcuJywgaGFzaElkeCk7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IGhhc2hJZHggPiAwID8gaGFzaElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgZG90ID0gZG90SWR4ID4gMCA/IGRvdElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdGFnID0gaGFzaElkeCAhPT0gLTEgfHwgZG90SWR4ICE9PSAtMSA/IHNlbC5zbGljZSgwLCBNYXRoLm1pbihoYXNoLCBkb3QpKSA6IHNlbDtcbiAgICAgICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBpc0RlZihkYXRhKSAmJiBpc0RlZihpID0gZGF0YS5ucykgPyBhcGkuY3JlYXRlRWxlbWVudE5TKGksIHRhZylcbiAgICAgICAgICAgICAgICA6IGFwaS5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgICAgICBpZiAoaGFzaCA8IGRvdClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdpZCcsIHNlbC5zbGljZShoYXNoICsgMSwgZG90KSk7XG4gICAgICAgICAgICBpZiAoZG90SWR4ID4gMClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdjbGFzcycsIHNlbC5zbGljZShkb3QgKyAxKS5yZXBsYWNlKC9cXC4vZywgJyAnKSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmNyZWF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuY3JlYXRlW2ldKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgICAgICAgICAgIGlmIChpLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkuaW5zZXJ0KVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlLmVsbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpLCBiZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludm9rZURlc3Ryb3lIb29rKHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBqLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5kZXN0cm95W2ldKHZub2RlKTtcbiAgICAgICAgICAgIGlmICh2bm9kZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB2bm9kZS5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gbnVsbCAmJiB0eXBlb2YgaSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBpXzEgPSB2b2lkIDAsIGxpc3RlbmVycyA9IHZvaWQgMCwgcm0gPSB2b2lkIDAsIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKGNoLnNlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBjYnMucmVtb3ZlLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJtID0gY3JlYXRlUm1DYihjaC5lbG0sIGxpc3RlbmVycyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaV8xID0gMDsgaV8xIDwgY2JzLnJlbW92ZS5sZW5ndGg7ICsraV8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2JzLnJlbW92ZVtpXzFdKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZihpXzEgPSBjaC5kYXRhKSAmJiBpc0RlZihpXzEgPSBpXzEuaG9vaykgJiYgaXNEZWYoaV8xID0gaV8xLnJlbW92ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfMShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHsgLy8gVGV4dCBub2RlXG4gICAgICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRFbG0sIGNoLmVsbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKHBhcmVudEVsbSwgb2xkQ2gsIG5ld0NoLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIG9sZFN0YXJ0SWR4ID0gMCwgbmV3U3RhcnRJZHggPSAwO1xuICAgICAgICB2YXIgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFswXTtcbiAgICAgICAgdmFyIG9sZEVuZFZub2RlID0gb2xkQ2hbb2xkRW5kSWR4XTtcbiAgICAgICAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBuZXdTdGFydFZub2RlID0gbmV3Q2hbMF07XG4gICAgICAgIHZhciBuZXdFbmRWbm9kZSA9IG5ld0NoW25ld0VuZElkeF07XG4gICAgICAgIHZhciBvbGRLZXlUb0lkeDtcbiAgICAgICAgdmFyIGlkeEluT2xkO1xuICAgICAgICB2YXIgZWxtVG9Nb3ZlO1xuICAgICAgICB2YXIgYmVmb3JlO1xuICAgICAgICB3aGlsZSAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4ICYmIG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgbWlnaHQgaGF2ZSBiZWVuIG1vdmVkIGxlZnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZEVuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld1N0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld0VuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgcmlnaHRcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBvbGRTdGFydFZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgbGVmdFxuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGRLZXlUb0lkeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHhJbk9sZCA9IG9sZEtleVRvSWR4W25ld1N0YXJ0Vm5vZGUua2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZihpZHhJbk9sZCkpIHsgLy8gTmV3IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbVRvTW92ZS5zZWwgIT09IG5ld1N0YXJ0Vm5vZGUuc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUoZWxtVG9Nb3ZlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGVsbVRvTW92ZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggfHwgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRJZHggPiBvbGRFbmRJZHgpIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXdDaFtuZXdFbmRJZHggKyAxXSA9PSBudWxsID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGhvb2s7XG4gICAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YSkgJiYgaXNEZWYoaG9vayA9IGkuaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucHJlcGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHZhciBjaCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAob2xkVm5vZGUgPT09IHZub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodm5vZGUuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rO1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkpICYmIGlzRGVmKGkgPSBpLnVwZGF0ZSkpXG4gICAgICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpICYmIGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRDaCAhPT0gY2gpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkcmVuKGVsbSwgb2xkQ2gsIGNoLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKVxuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmKGhvb2spICYmIGlzRGVmKGkgPSBob29rLnBvc3RwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGF0Y2gob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBlbG0sIHBhcmVudDtcbiAgICAgICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnByZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wcmVbaV0oKTtcbiAgICAgICAgaWYgKCFpc1Zub2RlKG9sZFZub2RlKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgICAgIHBhcmVudCA9IGFwaS5wYXJlbnROb2RlKGVsbSk7XG4gICAgICAgICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnQsIHZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKGVsbSkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnQsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRlZFZub2RlUXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KGluc2VydGVkVm5vZGVRdWV1ZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wb3N0Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnBvc3RbaV0oKTtcbiAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zbmFiYmRvbS5qcy5tYXAiLCJpbXBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmZ1bmN0aW9uIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuaykge1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbiAgICB2bm9kZS5kYXRhLmZuID0gdGh1bmsuZGF0YS5mbjtcbiAgICB2bm9kZS5kYXRhLmFyZ3MgPSB0aHVuay5kYXRhLmFyZ3M7XG4gICAgdGh1bmsuZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdGh1bmsuY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICB0aHVuay50ZXh0ID0gdm5vZGUudGV4dDtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG59XG5mdW5jdGlvbiBpbml0KHRodW5rKSB7XG4gICAgdmFyIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIHZub2RlID0gY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgY3VyLmFyZ3MpO1xuICAgIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuayk7XG59XG5mdW5jdGlvbiBwcmVwYXRjaChvbGRWbm9kZSwgdGh1bmspIHtcbiAgICB2YXIgaSwgb2xkID0gb2xkVm5vZGUuZGF0YSwgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgb2xkQXJncyA9IG9sZC5hcmdzLCBhcmdzID0gY3VyLmFyZ3M7XG4gICAgaWYgKG9sZC5mbiAhPT0gY3VyLmZuIHx8IG9sZEFyZ3MubGVuZ3RoICE9PSBhcmdzLmxlbmd0aCkge1xuICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvbGRBcmdzW2ldICE9PSBhcmdzW2ldKSB7XG4gICAgICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvcHlUb1RodW5rKG9sZFZub2RlLCB0aHVuayk7XG59XG5leHBvcnQgdmFyIHRodW5rID0gZnVuY3Rpb24gdGh1bmsoc2VsLCBrZXksIGZuLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcmdzID0gZm47XG4gICAgICAgIGZuID0ga2V5O1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBoKHNlbCwge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgaG9vazogeyBpbml0OiBpbml0LCBwcmVwYXRjaDogcHJlcGF0Y2ggfSxcbiAgICAgICAgZm46IGZuLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgdGh1bms7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHVuay5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0IGRlZmF1bHQgdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZVByb3BzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBrZXksIGN1ciwgb2xkLCBlbG0gPSB2bm9kZS5lbG0sIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5wcm9wcywgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzO1xuICAgIGlmICghb2xkUHJvcHMgJiYgIXByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZFByb3BzID09PSBwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZFByb3BzID0gb2xkUHJvcHMgfHwge307XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgICAgICBpZiAoIXByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbG1ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICBjdXIgPSBwcm9wc1trZXldO1xuICAgICAgICBvbGQgPSBvbGRQcm9wc1trZXldO1xuICAgICAgICBpZiAob2xkICE9PSBjdXIgJiYgKGtleSAhPT0gJ3ZhbHVlJyB8fCBlbG1ba2V5XSAhPT0gY3VyKSkge1xuICAgICAgICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnByb3BzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZVByb3BzLCB1cGRhdGU6IHVwZGF0ZVByb3BzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnByb3BzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcHMuanMubWFwIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiXHJcbmltcG9ydCB7IFF1aWNrUm91dGVyLCBjcmVhdGVQb3BTdGF0ZSB9IGZyb20gXCJxdWlja2pzLXJvdXRlclwiO1xyXG5jb25zdCByb3V0ZXIgPSBuZXcgUXVpY2tSb3V0ZXI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4uLy4uL3NyYy92aWV3cy9BcHBcIlxyXG5pbXBvcnQgQWJvdXQgZnJvbSBcIi4uLy4uL3NyYy92aWV3cy9BYm91dFwiXHJcbmltcG9ydCBOb3RGb3VuZCBmcm9tIFwiLi4vLi4vc3JjL3ZpZXdzL05vdGZvdW5kXCJcclxuY29uc3QgIHJvdXRlcyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnLycsXHJcbiAgICAgICAgdmlldzogQXBwLFxyXG4gICAgICAgIHRpdGxlOiBcIkhvbWVcIixcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJy9hYm91dCcsXHJcbiAgICAgICAgdGl0bGU6IFwiQWJvdXRcIixcclxuICAgICAgICB2aWV3OiBBYm91dFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnL2Vycm9yJyxcclxuICAgICAgICB2aWV3OiBOb3RGb3VuZCxcclxuICAgICAgICB0aXRsZTogXCJQYWdlIE5vdCBGb3VuZFwiLFxyXG4gICAgfSxcclxuXTtcclxuXHJcblF1aWNrLnVzZShyb3V0ZXIudXNlUm91dGUocm91dGVzKSk7XHJcbnJvdXRlci5jcmVhdGVOYXZpZ2F0aW9uKHJvdXRlcylcclxuY3JlYXRlUG9wU3RhdGUocm91dGVzKVxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXMiLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYm91dCBleHRlbmRzIFF1aWNrLkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICBzdXBlcihwYXJhbXMpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbiBhYm91dC1jb24gdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTAgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgdG89XCIvXCIgY2xhc3NOYW1lPVwibXItMyB1bmRlcmxpbmVcIj5Ib21lPC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5LW5vcm1hbCB1bmRlcmxpbmUgYWN0aXZlXCIgdG89XCIvYWJvdXRcIj5BYm91dDwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nbyBtdC0xMCB3LTEwIHAtMSBtYXgtdy1tZCBibG9jayBtbC1hdXRvIG1yLWF1dG8gYW5pbWF0ZS1ib3VuY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInF1aWNrLWxvZ28gdy04XCIgc3JjPVwiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vc2VydmVyeWd1a2VuL2ltYWdlL3VwbG9hZC92MTYxNTE4ODk5Mi9RdWlja0pTL2xvZ28vcXVpY2tqcy1sb2dvX3dqeDNkdy5zdmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJvdXQtcGFnZSB0ZXh0LWNlbnRlciBtdC01IHRleHQtM3hsIHRleHQtYmxhY2sgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNXhsIHAtMSB3Yy10eHRcIj5BYm91dCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnktbm9ybWFsXCI+UXVpY2suanM8L3NwYW4+IDwvaDE+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGV0YWlsIHAtMTAgbWwtNCBtci00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm10LTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICBRdWlja0pTIGlzIGEgSmF2YVNjcmlwdCBsaWJyYXJ5IGZvciBidWlsZGluZyBzaW5nbGUgcGFnZSBzZXJ2ZXItcmVuZGVyZWQgd2ViIGFwcGxpY2F0aW9ucy5cclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJtdC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFF1aWNrSlMgY29tZXMgd2l0aCBhIGN1c3RvbSBwcmUtY29uZmlndXJlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudC4gV2Ugc2F2ZSB5b3UgdGltZSBidWlsZGluZyB5b3VyIGFwcGxpY2F0aW9ucy4gV2UgdGFrZSBhd2F5IHRoZSBoYXJkIHBhcnRzLCBzbyB5b3UgY2FuIGZvY3VzIG9uIGJ1aWxkaW5nIGFwcGxpY2F0aW9ucyByYXRoZXIgc2V0dGluZyB1cCBzZXJ2ZXJzIGFuZCBjb25maWd1cmF0aW9ucy5cclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJtdC02IGZvbnQtYm9sZFwiPkVjb3N5c3RlbSB8IEV4dGVybmFsIGxpbmtzPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibXQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHF1aWNrLXJvdXRlci1saW5rIHRvPVwiaHR0cHM6Ly9xdWlja2pzLm9yZ1wiIGRhdGEtZXh0ZXJuYWwgY2xhc3NOYW1lPVwibXItMyB1bmRlcmxpbmVcIj5RdWlja2pzLWNvbXBvbmVudDwvcXVpY2stcm91dGVyLWxpbms+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxxdWljay1yb3V0ZXItbGluayB0bz1cImh0dHBzOi8vcXVpY2tqcy5vcmdcIiBkYXRhLWV4dGVybmFsIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+UXVpY2tqcy1yb3V0ZXI8L3F1aWNrLXJvdXRlci1saW5rPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48cXVpY2stcm91dGVyLWxpbmsgdG89XCJodHRwczovL3F1aWNranMub3JnXCIgZGF0YS1leHRlcm5hbCBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPlF1aWNranMtZG9tPC9xdWljay1yb3V0ZXItbGluaz48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiXHJcbmltcG9ydCBXZWxjb21lIGZyb20gXCIuL1dlbGNvbWVcIjtcclxuaW1wb3J0IExpc3QgZnJvbSBcIi4vTGlzdFwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIFF1aWNrLkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgICAgICBzdXBlcihwYXJhbXMpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb24gbWItMTRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtOCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJtci0zIHRleHQtcHJpbWFyeS1ub3JtYWwgdW5kZXJsaW5lIGFjdGl2ZVwiPkhvbWU8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9hYm91dFwiIGNsYXNzTmFtZT1cInVuZGVybGluZVwiPkFib3V0PC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvIG10LTUgdy0xMCBwLTEgbWF4LXctbWQgYmxvY2sgbWwtYXV0byBtci1hdXRvIGFuaW1hdGUtYm91bmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJxdWljay1sb2dvIHctOFwiIHNyYz1cImh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL3NlcnZlcnlndWtlbi9pbWFnZS91cGxvYWQvdjE2MTUxODg5OTIvUXVpY2tKUy9sb2dvL3F1aWNranMtbG9nb193angzZHcuc3ZnXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlbGNvbWUgdGV4dC1jZW50ZXIgbXQtMiB0ZXh0LTN4bCB0ZXh0LWJsYWNrIGZvbnQtYm9sZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxXZWxjb21lIG5hbWU9e1wiUXVpY2suanNcIn0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWMgbXQtNiB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoND5HZXQgc3RhcnRlZCBieSBlZGl0aW5nIDxzcGFuIGNsYXNzTmFtZT1cImJnLXNub3cgdGV4dC1zbSBmb250LW1lZGl1bSBwLTJcIj5zcmMvdmlld3MvQXBwLmpzPC9zcGFuPjwvaDQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXBwLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdCAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIjtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gTGlzdCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LW1haW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtY29uIG10LTEwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC0xIGZsZXgganVzdGlmeS1hcm91bmRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdCByb3VuZGVkIHAtMyB3LTUvMTIgY3Vyc29yLXBvaW50ZXIgbWF4LXctbWQgIGJvcmRlciBib3JkZXItZ3JheS0yMDAgbXQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ibGFjayBmbGV4IGl0ZW1zLWNlbnRlciBtdC0yXCI+RG9jdW1lbnRhdCA8c3BhbiBjbGFzc05hbWU9XCJtbC0yXCI+PHN2ZyBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIHctNiAtbWItMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTE0IDVsNyA3bTAgMGwtNyA3bTctN0gzXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+PC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIGZvbnQtbWVkaXVtIG10LTIgbWItM1wiPkNoZWNrIG91dCBkb2N1bWVudGF0aW9uIG9uIGhvdyB0byBnZXQgc3RhcnRlZCBhbmQgc2V0dXAgeW91ciBwcm9qZWN0IHdpdGggUXVpY2suanMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Qgcm91bmRlZCBzaGFkb3ctc20gcC0zIHctNS8xMiBjdXJzb3ItcG9pbnRlciBtYXgtdy1tZCBib3JkZXIgIGJvcmRlci1ncmF5LTIwMCBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIG10LTJcIj5MZWFybiA8c3BhbiBjbGFzc05hbWU9XCJtbC0yXCI+PHN2ZyBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIHctNiAtbWItMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTE0IDVsNyA3bTAgMGwtNyA3bTctN0gzXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+PC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIGZvbnQtbWVkaXVtIG10LTIgbWItM1wiPkxlYXJuIGFib3V0IFF1aWNrLmpzIGFuZCBpdCdzIGVjb3N5c3RlbS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC0yIGZsZXgganVzdGlmeS1hcm91bmRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdCByb3VuZGVkIHNoYWRvdy1zbSBwLTMgdy01LzEyIGN1cnNvci1wb2ludGVyIG1heC13LW1kIGJvcmRlciBib3JkZXItZ3JheS0yMDAgIG10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGkgY2xhc3NOYW1lPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtYmxhY2sgZmxleCBpdGVtcy1jZW50ZXIgbXQtMlwiPkV4YW1wbGVzIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTJcIj48c3ZnIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdy02IC1tYi0xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIGQ9XCJNMTQgNWw3IDdtMCAwbC03IDdtNy03SDNcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz48L3NwYW4+PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8L2RpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgZm9udC1tZWRpdW0gbXQtMiBtYi0zXCI+Q2hlY2sgb3V0IG9uIHByb2plY3RzIGNyZWF0ZWQgd2l0aCBRdWljay5qczwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0IHJvdW5kZWQgc2hhZG93LXNtIHAtMyB3LTUvMTIgbWF4LXctbWQgYm9yZGVyIGN1cnNvci1wb2ludGVyICBib3JkZXItZ3JheS0yMDAgIG10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGkgY2xhc3NOYW1lPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtYmxhY2sgZmxleCBpdGVtcy1jZW50ZXIgbXQtMlwiPkRlcGxveSA8c3BhbiBjbGFzc05hbWU9XCJtbC0yXCI+PHN2ZyBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIHctNiAtbWItMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTE0IDVsNyA3bTAgMGwtNyA3bTctN0gzXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+PC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIGZvbnQtbWVkaXVtIG10LTIgbWItM1wiPldlJ2xsIHNob3cgeW91IGhvdyB0byBkZXBsb3kgeW91ciBRdWljay5qcyBhcHBsaWNhdGlvbiB0byBwcm9kdWN0aW9uLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0XHJcblxyXG4iLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RGb3VuZCBleHRlbmRzIFF1aWNrLkNvbXBvbmVudHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJvdXQtcGFnZSB0ZXh0LWNlbnRlciBtdC0xMCB0ZXh0LTN4bCB0ZXh0LWJsYWNrIGZvbnQtYm9sZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBwLTEgd2MtdHh0XCI+NDA0IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeS1ub3JtYWxcIj5OT1QgRk9VTkQ8L3NwYW4+IDwvaDE+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTAgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgdG89XCIvXCIgY2xhc3NOYW1lPVwibXItMyB1bmRlcmxpbmVcIj5Ib21lPC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8cXVpY2stcm91dGVyLWxpbmsgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5LW5vcm1hbCB1bmRlcmxpbmUgYWN0aXZlXCIgdG89XCIvYWJvdXRcIj5BYm91dDwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufVxyXG4iLCIvLyBRdWljayBuZWVkcyB0byBiZSBpbXBvcnRlZCB0byB1c2UganN4XHJcbmltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIjtcclxuXHJcblxyXG5jb25zdCBXZWxjb21lID0gKHsgbmFtZSB9KSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxoMSBjbGFzc05hbWU9IFwidGV4dC01eGwgcC0xIHdjLXR4dFwiID5XZWxjb21lIHRvIDwgc3BhbiBjbGFzc05hbWUgPSBcInRleHQtcHJpbWFyeS1ub3JtYWxcIiA+IHsgbmFtZSB9ISA8L3NwYW4+PC9oMT5cclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2VsY29tZSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCI7XHJcbmltcG9ydCByb3V0ZXMgZnJvbSBcIi4uL3NyYy9yb3V0ZXIvcm91dGVzXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==