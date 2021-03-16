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

/***/ "./quick.config.js":
/*!*************************!*\
  !*** ./quick.config.js ***!
  \*************************/
/***/ ((module) => {

module.exports = {
  mode: "production"
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
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      className: "mr-3 underline"
    }, "Quickjs-component")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
      className: "mr-3 underline"
    }, "Quickjs-router")), quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("li", null, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("quick-router-link", {
      to: "/",
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
}) => {
  return quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h1", {
    className: "text-5xl p-1 wc-txt"
  }, "Welcome ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/* harmony import */ var _quick_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../quick.config */ "./quick.config.js");
/* harmony import */ var _quick_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_quick_config__WEBPACK_IMPORTED_MODULE_2__);




if ((_quick_config__WEBPACK_IMPORTED_MODULE_2___default().mode) === "production") {
  setTimeout(() => {
    document.getElementsByTagName("script")[1].remove();

    console.error = function () {};
  }, 0);
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItc3BsaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmZvcm93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZWJhYmNhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVtb3ZlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcGFyc2Utc2VsL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcXVpY2stZXJyb3IvcXVpY2stZXJyb3IuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLWNvbXBvbmVudC9saWIvcXVpY2suanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLXJvdXRlci9saWIvcXVpY2stcm91dGVyLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvaW5pdC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uLi9zcmMvaC50cyIsIndlYnBhY2s6Ly9xdWlja2pzLy4uL3NyYy9odG1sZG9tYXBpLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL2lzLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3NuYWJiZG9tLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3RodW5rLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3Zub2RlLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL21vZHVsZXMvcHJvcHMudHMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3F1aWNrLmNvbmZpZy5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vc3JjL3JvdXRlci9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9BYm91dC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vc3JjL3ZpZXdzL0FwcC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vc3JjL3ZpZXdzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9Ob3Rmb3VuZC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vc3JjL3ZpZXdzL1dlbGNvbWUuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9xdWlja2pzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9xdWlja2pzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9xdWlja2pzLy4vcHVibGljL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzcGxpdCIsInVuZGVmIiwibmF0aXZlU3BsaXQiLCJTdHJpbmciLCJwcm90b3R5cGUiLCJjb21wbGlhbnRFeGVjTnBjZyIsImV4ZWMiLCJzZWxmIiwic3RyIiwic2VwYXJhdG9yIiwibGltaXQiLCJPYmplY3QiLCJ0b1N0cmluZyIsImNhbGwiLCJvdXRwdXQiLCJmbGFncyIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJleHRlbmRlZCIsInN0aWNreSIsImxhc3RMYXN0SW5kZXgiLCJSZWdFeHAiLCJzb3VyY2UiLCJzZXBhcmF0b3IyIiwibWF0Y2giLCJsYXN0SW5kZXgiLCJsYXN0TGVuZ3RoIiwiaW5kZXgiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJyZXBsYWNlIiwiaSIsImFyZ3VtZW50cyIsIkFycmF5IiwiYXBwbHkiLCJ0ZXN0IiwiSU5GSU5JVFkiLCJzeW1ib2xUYWciLCJyZVVuZXNjYXBlZEh0bWwiLCJyZUhhc1VuZXNjYXBlZEh0bWwiLCJodG1sRXNjYXBlcyIsImZyZWVHbG9iYWwiLCJnbG9iYWwiLCJmcmVlU2VsZiIsInJvb3QiLCJGdW5jdGlvbiIsImJhc2VQcm9wZXJ0eU9mIiwib2JqZWN0Iiwia2V5IiwidW5kZWZpbmVkIiwiZXNjYXBlSHRtbENoYXIiLCJvYmplY3RQcm90byIsIm9iamVjdFRvU3RyaW5nIiwiU3ltYm9sIiwic3ltYm9sUHJvdG8iLCJzeW1ib2xUb1N0cmluZyIsImJhc2VUb1N0cmluZyIsInZhbHVlIiwiaXNTeW1ib2wiLCJyZXN1bHQiLCJpc09iamVjdExpa2UiLCJlc2NhcGUiLCJzdHJpbmciLCJNQVhfU0FGRV9JTlRFR0VSIiwiYXJnc1RhZyIsImZ1bmNUYWciLCJnZW5UYWciLCJyZUlzVWludCIsImJhc2VUaW1lcyIsIm4iLCJpdGVyYXRlZSIsIm92ZXJBcmciLCJmdW5jIiwidHJhbnNmb3JtIiwiYXJnIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIm5hdGl2ZUtleXMiLCJrZXlzIiwiYXJyYXlMaWtlS2V5cyIsImluaGVyaXRlZCIsImlzQXJyYXkiLCJpc0FyZ3VtZW50cyIsInNraXBJbmRleGVzIiwiaXNJbmRleCIsImJhc2VGb3IiLCJjcmVhdGVCYXNlRm9yIiwiYmFzZUZvck93biIsImJhc2VLZXlzIiwiaXNQcm90b3R5cGUiLCJmcm9tUmlnaHQiLCJrZXlzRnVuYyIsIml0ZXJhYmxlIiwicHJvcHMiLCJDdG9yIiwiY29uc3RydWN0b3IiLCJwcm90byIsImlzQXJyYXlMaWtlT2JqZWN0IiwiaXNBcnJheUxpa2UiLCJpc0xlbmd0aCIsImlzRnVuY3Rpb24iLCJ0YWciLCJpc09iamVjdCIsInR5cGUiLCJmb3JPd24iLCJpZGVudGl0eSIsInJlQXNjaWlXb3JkIiwicmVMYXRpbiIsInJzQXN0cmFsUmFuZ2UiLCJyc0NvbWJvTWFya3NSYW5nZSIsInJzQ29tYm9TeW1ib2xzUmFuZ2UiLCJyc0RpbmdiYXRSYW5nZSIsInJzTG93ZXJSYW5nZSIsInJzTWF0aE9wUmFuZ2UiLCJyc05vbkNoYXJSYW5nZSIsInJzUHVuY3R1YXRpb25SYW5nZSIsInJzU3BhY2VSYW5nZSIsInJzVXBwZXJSYW5nZSIsInJzVmFyUmFuZ2UiLCJyc0JyZWFrUmFuZ2UiLCJyc0Fwb3MiLCJyc0JyZWFrIiwicnNDb21ibyIsInJzRGlnaXRzIiwicnNEaW5nYmF0IiwicnNMb3dlciIsInJzTWlzYyIsInJzRml0eiIsInJzTW9kaWZpZXIiLCJyc05vbkFzdHJhbCIsInJzUmVnaW9uYWwiLCJyc1N1cnJQYWlyIiwicnNVcHBlciIsInJzWldKIiwicnNMb3dlck1pc2MiLCJyc1VwcGVyTWlzYyIsInJzT3B0TG93ZXJDb250ciIsInJzT3B0VXBwZXJDb250ciIsInJlT3B0TW9kIiwicnNPcHRWYXIiLCJyc09wdEpvaW4iLCJqb2luIiwicnNTZXEiLCJyc0Vtb2ppIiwicmVBcG9zIiwicmVDb21ib01hcmsiLCJyZVVuaWNvZGVXb3JkIiwicmVIYXNVbmljb2RlV29yZCIsImRlYnVycmVkTGV0dGVycyIsImFycmF5UmVkdWNlIiwiYXJyYXkiLCJhY2N1bXVsYXRvciIsImluaXRBY2N1bSIsImFzY2lpV29yZHMiLCJkZWJ1cnJMZXR0ZXIiLCJoYXNVbmljb2RlV29yZCIsInVuaWNvZGVXb3JkcyIsImNyZWF0ZUNvbXBvdW5kZXIiLCJjYWxsYmFjayIsIndvcmRzIiwiZGVidXJyIiwia2ViYWJDYXNlIiwid29yZCIsInRvTG93ZXJDYXNlIiwicGF0dGVybiIsImd1YXJkIiwiTEFSR0VfQVJSQVlfU0laRSIsIkZVTkNfRVJST1JfVEVYVCIsIkhBU0hfVU5ERUZJTkVEIiwiVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyIsIlBBUlRJQUxfQ09NUEFSRV9GTEFHIiwiYXJyYXlUYWciLCJib29sVGFnIiwiZGF0ZVRhZyIsImVycm9yVGFnIiwibWFwVGFnIiwibnVtYmVyVGFnIiwib2JqZWN0VGFnIiwicHJvbWlzZVRhZyIsInJlZ2V4cFRhZyIsInNldFRhZyIsInN0cmluZ1RhZyIsIndlYWtNYXBUYWciLCJhcnJheUJ1ZmZlclRhZyIsImRhdGFWaWV3VGFnIiwiZmxvYXQzMlRhZyIsImZsb2F0NjRUYWciLCJpbnQ4VGFnIiwiaW50MTZUYWciLCJpbnQzMlRhZyIsInVpbnQ4VGFnIiwidWludDhDbGFtcGVkVGFnIiwidWludDE2VGFnIiwidWludDMyVGFnIiwicmVJc0RlZXBQcm9wIiwicmVJc1BsYWluUHJvcCIsInJlTGVhZGluZ0RvdCIsInJlUHJvcE5hbWUiLCJyZVJlZ0V4cENoYXIiLCJyZUVzY2FwZUNoYXIiLCJyZUlzSG9zdEN0b3IiLCJ0eXBlZEFycmF5VGFncyIsImZyZWVFeHBvcnRzIiwibm9kZVR5cGUiLCJmcmVlTW9kdWxlIiwibW9kdWxlRXhwb3J0cyIsImZyZWVQcm9jZXNzIiwicHJvY2VzcyIsIm5vZGVVdGlsIiwiYmluZGluZyIsImUiLCJub2RlSXNUeXBlZEFycmF5IiwiaXNUeXBlZEFycmF5IiwiYXJyYXlTb21lIiwicHJlZGljYXRlIiwiYmFzZVByb3BlcnR5IiwiYmFzZVVuYXJ5IiwiZ2V0VmFsdWUiLCJpc0hvc3RPYmplY3QiLCJtYXBUb0FycmF5IiwibWFwIiwic2l6ZSIsImZvckVhY2giLCJzZXRUb0FycmF5Iiwic2V0IiwiYXJyYXlQcm90byIsImZ1bmNQcm90byIsImNvcmVKc0RhdGEiLCJtYXNrU3JjS2V5IiwidWlkIiwiSUVfUFJPVE8iLCJmdW5jVG9TdHJpbmciLCJyZUlzTmF0aXZlIiwiVWludDhBcnJheSIsInNwbGljZSIsIkRhdGFWaWV3IiwiZ2V0TmF0aXZlIiwiTWFwIiwiUHJvbWlzZSIsIlNldCIsIldlYWtNYXAiLCJuYXRpdmVDcmVhdGUiLCJkYXRhVmlld0N0b3JTdHJpbmciLCJ0b1NvdXJjZSIsIm1hcEN0b3JTdHJpbmciLCJwcm9taXNlQ3RvclN0cmluZyIsInNldEN0b3JTdHJpbmciLCJ3ZWFrTWFwQ3RvclN0cmluZyIsInN5bWJvbFZhbHVlT2YiLCJ2YWx1ZU9mIiwiSGFzaCIsImVudHJpZXMiLCJjbGVhciIsImVudHJ5IiwiaGFzaENsZWFyIiwiX19kYXRhX18iLCJoYXNoRGVsZXRlIiwiaGFzIiwiaGFzaEdldCIsImRhdGEiLCJoYXNoSGFzIiwiaGFzaFNldCIsImdldCIsIkxpc3RDYWNoZSIsImxpc3RDYWNoZUNsZWFyIiwibGlzdENhY2hlRGVsZXRlIiwiYXNzb2NJbmRleE9mIiwicG9wIiwibGlzdENhY2hlR2V0IiwibGlzdENhY2hlSGFzIiwibGlzdENhY2hlU2V0IiwiTWFwQ2FjaGUiLCJtYXBDYWNoZUNsZWFyIiwibWFwQ2FjaGVEZWxldGUiLCJnZXRNYXBEYXRhIiwibWFwQ2FjaGVHZXQiLCJtYXBDYWNoZUhhcyIsIm1hcENhY2hlU2V0IiwiU2V0Q2FjaGUiLCJ2YWx1ZXMiLCJhZGQiLCJzZXRDYWNoZUFkZCIsInNldENhY2hlSGFzIiwiU3RhY2siLCJzdGFja0NsZWFyIiwic3RhY2tEZWxldGUiLCJzdGFja0dldCIsInN0YWNrSGFzIiwic3RhY2tTZXQiLCJjYWNoZSIsInBhaXJzIiwiZXEiLCJiYXNlR2V0IiwicGF0aCIsImlzS2V5IiwiY2FzdFBhdGgiLCJ0b0tleSIsImJhc2VHZXRUYWciLCJiYXNlSGFzSW4iLCJiYXNlSXNFcXVhbCIsIm90aGVyIiwiY3VzdG9taXplciIsImJpdG1hc2siLCJzdGFjayIsImJhc2VJc0VxdWFsRGVlcCIsImVxdWFsRnVuYyIsIm9iaklzQXJyIiwib3RoSXNBcnIiLCJvYmpUYWciLCJvdGhUYWciLCJnZXRUYWciLCJvYmpJc09iaiIsIm90aElzT2JqIiwiaXNTYW1lVGFnIiwiZXF1YWxBcnJheXMiLCJlcXVhbEJ5VGFnIiwib2JqSXNXcmFwcGVkIiwib3RoSXNXcmFwcGVkIiwib2JqVW53cmFwcGVkIiwib3RoVW53cmFwcGVkIiwiZXF1YWxPYmplY3RzIiwiYmFzZUlzTWF0Y2giLCJtYXRjaERhdGEiLCJub0N1c3RvbWl6ZXIiLCJvYmpWYWx1ZSIsInNyY1ZhbHVlIiwiYmFzZUlzTmF0aXZlIiwiaXNNYXNrZWQiLCJiYXNlSXNUeXBlZEFycmF5IiwiYmFzZUl0ZXJhdGVlIiwiYmFzZU1hdGNoZXNQcm9wZXJ0eSIsImJhc2VNYXRjaGVzIiwicHJvcGVydHkiLCJnZXRNYXRjaERhdGEiLCJtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSIsImlzU3RyaWN0Q29tcGFyYWJsZSIsImhhc0luIiwiYmFzZVByb3BlcnR5RGVlcCIsImJhc2VQdWxsQXQiLCJpbmRleGVzIiwicHJldmlvdXMiLCJwYXJlbnQiLCJsYXN0IiwiYmFzZVNsaWNlIiwic3RhcnQiLCJlbmQiLCJzdHJpbmdUb1BhdGgiLCJpc1BhcnRpYWwiLCJhcnJMZW5ndGgiLCJvdGhMZW5ndGgiLCJzdGFja2VkIiwic2VlbiIsImFyclZhbHVlIiwib3RoVmFsdWUiLCJjb21wYXJlZCIsIm90aEluZGV4IiwiYnl0ZUxlbmd0aCIsImJ5dGVPZmZzZXQiLCJidWZmZXIiLCJuYW1lIiwibWVzc2FnZSIsImNvbnZlcnQiLCJvYmpQcm9wcyIsIm9iakxlbmd0aCIsIm90aFByb3BzIiwic2tpcEN0b3IiLCJvYmpDdG9yIiwib3RoQ3RvciIsImlzS2V5YWJsZSIsIkFycmF5QnVmZmVyIiwicmVzb2x2ZSIsImN0b3JTdHJpbmciLCJoYXNQYXRoIiwiaGFzRnVuYyIsIm1lbW9pemUiLCJudW1iZXIiLCJxdW90ZSIsInJlbW92ZSIsInJlc29sdmVyIiwiVHlwZUVycm9yIiwibWVtb2l6ZWQiLCJhcmdzIiwiQ2FjaGUiLCJkZWZhdWx0VmFsdWUiLCJhcnJheUluY2x1ZGVzIiwiYmFzZUluZGV4T2YiLCJhcnJheUluY2x1ZGVzV2l0aCIsImNvbXBhcmF0b3IiLCJiYXNlRmluZEluZGV4IiwiZnJvbUluZGV4IiwiYmFzZUlzTmFOIiwiY2FjaGVIYXMiLCJiYXNlVW5pcSIsImluY2x1ZGVzIiwiaXNDb21tb24iLCJjcmVhdGVTZXQiLCJvdXRlciIsImNvbXB1dGVkIiwic2VlbkluZGV4Iiwibm9vcCIsInVuaXEiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJwcm9wSXNFbnVtZXJhYmxlIiwidG9PYmplY3QiLCJ2YWwiLCJzaG91bGRVc2VOYXRpdmUiLCJhc3NpZ24iLCJ0ZXN0MSIsImdldE93blByb3BlcnR5TmFtZXMiLCJ0ZXN0MiIsImZyb21DaGFyQ29kZSIsIm9yZGVyMiIsInRlc3QzIiwibGV0dGVyIiwiZXJyIiwidGFyZ2V0IiwiZnJvbSIsInRvIiwic3ltYm9scyIsInMiLCJyZXF1aXJlIiwiY2xhc3NJZFNwbGl0Iiwibm90Q2xhc3NJZCIsInBhcnNlU2VsZWN0b3IiLCJzZWxlY3RvciIsInVwcGVyIiwidGFnTmFtZSIsImlkIiwiY2xhc3NlcyIsInRhZ1BhcnRzIiwicGFydCIsImNoYXJBdCIsInN1YnN0cmluZyIsInRvVXBwZXJDYXNlIiwiY2xhc3NOYW1lIiwiY2hlY2tGb3JFcnJvciIsIkVycm9yIiwiZXJyb3IiLCJpc0Vycm9yIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsInF1aWNrX2Vycm9yXzEiLCJzbmFiYmRvbSIsInByb3BzXzEiLCJyZWNvbmNpbGUiLCJpbml0IiwiZGVmYXVsdCIsInNuYWJiZG9tXzEiLCJtb2R1bGVzIiwidG9IVE1MIiwiY2xhc3MiLCJhdHRyaWJ1dGVzIiwic3R5bGUiLCJEZXAiLCJzdWJzY3JpYmVycyIsImRlcGVuZCIsImFjdGl2ZUVmZmVjdCIsIm5vdGlmeSIsInN1YiIsIkNvbXBvbmVudCIsInBhcmFtcyIsInQiLCJjb21wb25lbnREaWRNb3VudCIsInNldFN0YXRlIiwicGFydGlhbFN0YXRlIiwiX3RoaXMiLCJzdGF0ZSIsIlF1aWNrIiwiX191cGRhdGVyIiwicmVuZGVyIiwiZWwiLCJyIiwiX3B0IiwiaXNRdWlja0NsYXNzQ29tcG9uZW50IiwiJGluaXQiLCJmYXYiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsInJlbCIsImgiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNvbnNvbGUiLCJsb2ciLCIkbGlzdGVuZXIiLCJmbiIsInByZXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJ1c2UiLCJ2aWV3IiwicmVuZGVyVmlld3RvSFRNTCIsInF1ZXJ5U2VsZWN0b3IiLCJjaGlsZHJlbiIsImZsYXQiLCJpc1FuZFJlYWN0Q2xhc3NDb21wb25lbnQiLCJjb21wb25lbnRJbnN0YW5jZSIsImRhdGFQcm9wcyIsImV2ZW50UHJvcHMiLCJwcm9wS2V5Iiwic3RhcnRzV2l0aCIsImV2ZW50IiwiaW5zdGFuY2UiLCIkY29uZmlnIiwiZW52IiwicXVpY2tqc19jb21wb25lbnRfMSIsInBhdGhUb1JlZ2V4IiwiZ2V0UGFyYW1zIiwicm91dGUiLCJtYXRjaEFsbCIsIlF1aWNrUm91dGVyIiwidXNlUm91dGUiLCJyb3V0ZXMiLCJ1cmwiLCJtYXRjaGVzIiwibG9jYXRpb24iLCJwYXRobmFtZSIsImZpbmRNYXRjaCIsImZpbmQiLCJzZXRUaXRsZSIsInRpdGxlIiwiZ2V0Um91dGUiLCJyZWZlcnJlciIsIm5leHQiLCJmdWxsUGF0aCIsImNyZWF0ZU5hdmlnYXRpb24iLCJ3aW5kb3ciLCJsb2NhbE5hbWUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY3JlYXRlUG9wU3RhdGUiLCJRdWlja1JvdXRlckxpbmsiLCJIVE1MRWxlbWVudCIsImxpbmtUbyIsImdldEF0dHJpYnV0ZSIsImN1c3RvbVRhZyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJpbm5lclRleHQiLCJhdHRyaWJJIiwiYSIsImF0dHJpYkEiLCJzZXRBdHRyaWJ1dGUiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsInVzZVJlZiIsImFwcCIsImNoaWxkIiwiYXJlYSIsImJhc2UiLCJiciIsImNvbCIsImVtYmVkIiwiaHIiLCJpbWciLCJpbnB1dCIsImtleWdlbiIsImxpbmsiLCJtZXRhIiwicGFyYW0iLCJ0cmFjayIsIndiciIsIlZPSURfRUxFTUVOVFMiLCJDT05UQUlORVJfRUxFTUVOVFMiLCJwYXJzZSIsInZub2RlIiwibm9kZSIsInJlbmRlclRvU3RyaW5nIiwic2VsIiwidGV4dCIsImhvb2siLCJzdmciLCJucyIsImF0dHJzTW9kdWxlIiwiYXR0cnMiLCJjbGFzc01vZHVsZSIsIl9hZGQiLCJfcmVtb3ZlIiwiZXhpc3RpbmciLCJjb25jYXQiLCJpbmRleE9mIiwiZGF0YXNldE1vZHVsZSIsImRhdGFzZXQiLCJvbWl0IiwiYm9vbGVhbkF0dHJpYnV0ZXMiLCJwcm9wc01vZHVsZSIsImxrZXkiLCJzdHlsZU1vZHVsZSIsImRlbGF5ZWQiLCJrZWJhYktleSIsIm1vZGUiLCJyb3V0ZXIiLCJBcHAiLCJBYm91dCIsIk5vdEZvdW5kIiwiQWJvdXREZXRhaWwiLCJMaXN0IiwiV2VsY29tZSIsImNvbmZpZyIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWtCLFNBQVNDLEtBQVQsQ0FBZUMsS0FBZixFQUFzQjtBQUV0QyxNQUFJQyxXQUFXLEdBQUdDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkosS0FBbkM7QUFBQSxNQUNFSyxpQkFBaUIsR0FBRyxPQUFPQyxJQUFQLENBQVksRUFBWixFQUFnQixDQUFoQixNQUF1QkwsS0FEN0M7QUFBQSxNQUVFO0FBQ0FNLE1BSEY7O0FBS0FBLE1BQUksR0FBRyxVQUFTQyxHQUFULEVBQWNDLFNBQWQsRUFBeUJDLEtBQXpCLEVBQWdDO0FBQ3JDO0FBQ0EsUUFBSUMsTUFBTSxDQUFDUCxTQUFQLENBQWlCUSxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JKLFNBQS9CLE1BQThDLGlCQUFsRCxFQUFxRTtBQUNuRSxhQUFPUCxXQUFXLENBQUNXLElBQVosQ0FBaUJMLEdBQWpCLEVBQXNCQyxTQUF0QixFQUFpQ0MsS0FBakMsQ0FBUDtBQUNEOztBQUNELFFBQUlJLE1BQU0sR0FBRyxFQUFiO0FBQUEsUUFDRUMsS0FBSyxHQUFHLENBQUNOLFNBQVMsQ0FBQ08sVUFBVixHQUF1QixHQUF2QixHQUE2QixFQUE5QixLQUFxQ1AsU0FBUyxDQUFDUSxTQUFWLEdBQXNCLEdBQXRCLEdBQTRCLEVBQWpFLEtB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QVQsQ0FBOEIsUUFBOUIsRUFBd0MsQ0FBeEMsRUFBMkN4RyxNQUEzQzs7QUFDQXlHLFdBQU8sQ0FBQzdDLEtBQVIsR0FBZ0IsWUFBVSxDQUFFLENBQTVCO0FBQ0EsR0FIUyxFQUdSLENBSFEsQ0FBVjtBQUlGLEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBDcm9zcy1Ccm93c2VyIFNwbGl0IDEuMS4xXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDEyIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPlxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICogRUNNQVNjcmlwdCBjb21wbGlhbnQsIHVuaWZvcm0gY3Jvc3MtYnJvd3NlciBzcGxpdCBtZXRob2RcbiAqL1xuXG4vKipcbiAqIFNwbGl0cyBhIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3MgdXNpbmcgYSByZWdleCBvciBzdHJpbmcgc2VwYXJhdG9yLiBNYXRjaGVzIG9mIHRoZVxuICogc2VwYXJhdG9yIGFyZSBub3QgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdCBhcnJheS4gSG93ZXZlciwgaWYgYHNlcGFyYXRvcmAgaXMgYSByZWdleCB0aGF0IGNvbnRhaW5zXG4gKiBjYXB0dXJpbmcgZ3JvdXBzLCBiYWNrcmVmZXJlbmNlcyBhcmUgc3BsaWNlZCBpbnRvIHRoZSByZXN1bHQgZWFjaCB0aW1lIGBzZXBhcmF0b3JgIGlzIG1hdGNoZWQuXG4gKiBGaXhlcyBicm93c2VyIGJ1Z3MgY29tcGFyZWQgdG8gdGhlIG5hdGl2ZSBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdGAgYW5kIGNhbiBiZSB1c2VkIHJlbGlhYmx5XG4gKiBjcm9zcy1icm93c2VyLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gc3BsaXQuXG4gKiBAcGFyYW0ge1JlZ0V4cHxTdHJpbmd9IHNlcGFyYXRvciBSZWdleCBvciBzdHJpbmcgdG8gdXNlIGZvciBzZXBhcmF0aW5nIHRoZSBzdHJpbmcuXG4gKiBAcGFyYW0ge051bWJlcn0gW2xpbWl0XSBNYXhpbXVtIG51bWJlciBvZiBpdGVtcyB0byBpbmNsdWRlIGluIHRoZSByZXN1bHQgYXJyYXkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIHN1YnN0cmluZ3MuXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEJhc2ljIHVzZVxuICogc3BsaXQoJ2EgYiBjIGQnLCAnICcpO1xuICogLy8gLT4gWydhJywgJ2InLCAnYycsICdkJ11cbiAqXG4gKiAvLyBXaXRoIGxpbWl0XG4gKiBzcGxpdCgnYSBiIGMgZCcsICcgJywgMik7XG4gKiAvLyAtPiBbJ2EnLCAnYiddXG4gKlxuICogLy8gQmFja3JlZmVyZW5jZXMgaW4gcmVzdWx0IGFycmF5XG4gKiBzcGxpdCgnLi53b3JkMSB3b3JkMi4uJywgLyhbYS16XSspKFxcZCspL2kpO1xuICogLy8gLT4gWycuLicsICd3b3JkJywgJzEnLCAnICcsICd3b3JkJywgJzInLCAnLi4nXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiBzcGxpdCh1bmRlZikge1xuXG4gIHZhciBuYXRpdmVTcGxpdCA9IFN0cmluZy5wcm90b3R5cGUuc3BsaXQsXG4gICAgY29tcGxpYW50RXhlY05wY2cgPSAvKCk/Py8uZXhlYyhcIlwiKVsxXSA9PT0gdW5kZWYsXG4gICAgLy8gTlBDRzogbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBcbiAgICBzZWxmO1xuXG4gIHNlbGYgPSBmdW5jdGlvbihzdHIsIHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIGBuYXRpdmVTcGxpdGBcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNlcGFyYXRvcikgIT09IFwiW29iamVjdCBSZWdFeHBdXCIpIHtcbiAgICAgIHJldHVybiBuYXRpdmVTcGxpdC5jYWxsKHN0ciwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfVxuICAgIHZhciBvdXRwdXQgPSBbXSxcbiAgICAgIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gXCJpXCIgOiBcIlwiKSArIChzZXBhcmF0b3IubXVsdGlsaW5lID8gXCJtXCIgOiBcIlwiKSArIChzZXBhcmF0b3IuZXh0ZW5kZWQgPyBcInhcIiA6IFwiXCIpICsgLy8gUHJvcG9zZWQgZm9yIEVTNlxuICAgICAgKHNlcGFyYXRvci5zdGlja3kgPyBcInlcIiA6IFwiXCIpLFxuICAgICAgLy8gRmlyZWZveCAzK1xuICAgICAgbGFzdExhc3RJbmRleCA9IDAsXG4gICAgICAvLyBNYWtlIGBnbG9iYWxgIGFuZCBhdm9pZCBgbGFzdEluZGV4YCBpc3N1ZXMgYnkgd29ya2luZyB3aXRoIGEgY29weVxuICAgICAgc2VwYXJhdG9yID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArIFwiZ1wiKSxcbiAgICAgIHNlcGFyYXRvcjIsIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgc3RyICs9IFwiXCI7IC8vIFR5cGUtY29udmVydFxuICAgIGlmICghY29tcGxpYW50RXhlY05wY2cpIHtcbiAgICAgIC8vIERvZXNuJ3QgbmVlZCBmbGFncyBneSwgYnV0IHRoZXkgZG9uJ3QgaHVydFxuICAgICAgc2VwYXJhdG9yMiA9IG5ldyBSZWdFeHAoXCJeXCIgKyBzZXBhcmF0b3Iuc291cmNlICsgXCIkKD8hXFxcXHMpXCIsIGZsYWdzKTtcbiAgICB9XG4gICAgLyogVmFsdWVzIGZvciBgbGltaXRgLCBwZXIgdGhlIHNwZWM6XG4gICAgICogSWYgdW5kZWZpbmVkOiA0Mjk0OTY3Mjk1IC8vIE1hdGgucG93KDIsIDMyKSAtIDFcbiAgICAgKiBJZiAwLCBJbmZpbml0eSwgb3IgTmFOOiAwXG4gICAgICogSWYgcG9zaXRpdmUgbnVtYmVyOiBsaW1pdCA9IE1hdGguZmxvb3IobGltaXQpOyBpZiAobGltaXQgPiA0Mjk0OTY3Mjk1KSBsaW1pdCAtPSA0Mjk0OTY3Mjk2O1xuICAgICAqIElmIG5lZ2F0aXZlIG51bWJlcjogNDI5NDk2NzI5NiAtIE1hdGguZmxvb3IoTWF0aC5hYnMobGltaXQpKVxuICAgICAqIElmIG90aGVyOiBUeXBlLWNvbnZlcnQsIHRoZW4gdXNlIHRoZSBhYm92ZSBydWxlc1xuICAgICAqL1xuICAgIGxpbWl0ID0gbGltaXQgPT09IHVuZGVmID8gLTEgPj4+IDAgOiAvLyBNYXRoLnBvdygyLCAzMikgLSAxXG4gICAgbGltaXQgPj4+IDA7IC8vIFRvVWludDMyKGxpbWl0KVxuICAgIHdoaWxlIChtYXRjaCA9IHNlcGFyYXRvci5leGVjKHN0cikpIHtcbiAgICAgIC8vIGBzZXBhcmF0b3IubGFzdEluZGV4YCBpcyBub3QgcmVsaWFibGUgY3Jvc3MtYnJvd3NlclxuICAgICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICBvdXRwdXQucHVzaChzdHIuc2xpY2UobGFzdExhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGAgZm9yXG4gICAgICAgIC8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3Vwc1xuICAgICAgICBpZiAoIWNvbXBsaWFudEV4ZWNOcGNnICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBtYXRjaFswXS5yZXBsYWNlKHNlcGFyYXRvcjIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hbaV0gPSB1bmRlZjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgIGlmIChvdXRwdXQubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXBhcmF0b3IubGFzdEluZGV4ID09PSBtYXRjaC5pbmRleCkge1xuICAgICAgICBzZXBhcmF0b3IubGFzdEluZGV4Kys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxhc3RMYXN0SW5kZXggPT09IHN0ci5sZW5ndGgpIHtcbiAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3IudGVzdChcIlwiKSkge1xuICAgICAgICBvdXRwdXQucHVzaChcIlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goc3RyLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dC5sZW5ndGggPiBsaW1pdCA/IG91dHB1dC5zbGljZSgwLCBsaW1pdCkgOiBvdXRwdXQ7XG4gIH07XG5cbiAgcmV0dXJuIHNlbGY7XG59KSgpO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggSFRNTCBlbnRpdGllcyBhbmQgSFRNTCBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlVW5lc2NhcGVkSHRtbCA9IC9bJjw+XCInYF0vZyxcbiAgICByZUhhc1VuZXNjYXBlZEh0bWwgPSBSZWdFeHAocmVVbmVzY2FwZWRIdG1sLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIG1hcCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuICovXG52YXIgaHRtbEVzY2FwZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5OycsXG4gICdgJzogJyYjOTY7J1xufTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eU9mKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogVXNlZCBieSBgXy5lc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAqL1xudmFyIGVzY2FwZUh0bWxDaGFyID0gYmFzZVByb3BlcnR5T2YoaHRtbEVzY2FwZXMpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGNoYXJhY3RlcnMgXCImXCIsIFwiPFwiLCBcIj5cIiwgJ1wiJywgXCInXCIsIGFuZCBcIlxcYFwiIGluIGBzdHJpbmdgIHRvXG4gKiB0aGVpciBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXRpZXMuXG4gKlxuICogKipOb3RlOioqIE5vIG90aGVyIGNoYXJhY3RlcnMgYXJlIGVzY2FwZWQuIFRvIGVzY2FwZSBhZGRpdGlvbmFsXG4gKiBjaGFyYWN0ZXJzIHVzZSBhIHRoaXJkLXBhcnR5IGxpYnJhcnkgbGlrZSBbX2hlX10oaHR0cHM6Ly9tdGhzLmJlL2hlKS5cbiAqXG4gKiBUaG91Z2ggdGhlIFwiPlwiIGNoYXJhY3RlciBpcyBlc2NhcGVkIGZvciBzeW1tZXRyeSwgY2hhcmFjdGVycyBsaWtlXG4gKiBcIj5cIiBhbmQgXCIvXCIgZG9uJ3QgbmVlZCBlc2NhcGluZyBpbiBIVE1MIGFuZCBoYXZlIG5vIHNwZWNpYWwgbWVhbmluZ1xuICogdW5sZXNzIHRoZXkncmUgcGFydCBvZiBhIHRhZyBvciB1bnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuIFNlZVxuICogW01hdGhpYXMgQnluZW5zJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2FtYmlndW91cy1hbXBlcnNhbmRzKVxuICogKHVuZGVyIFwic2VtaS1yZWxhdGVkIGZ1biBmYWN0XCIpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQmFja3RpY2tzIGFyZSBlc2NhcGVkIGJlY2F1c2UgaW4gSUUgPCA5LCB0aGV5IGNhbiBicmVhayBvdXQgb2ZcbiAqIGF0dHJpYnV0ZSB2YWx1ZXMgb3IgSFRNTCBjb21tZW50cy4gU2VlIFsjNTldKGh0dHBzOi8vaHRtbDVzZWMub3JnLyM1OSksXG4gKiBbIzEwMl0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEwMiksIFsjMTA4XShodHRwczovL2h0bWw1c2VjLm9yZy8jMTA4KSwgYW5kXG4gKiBbIzEzM10oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEzMykgb2YgdGhlXG4gKiBbSFRNTDUgU2VjdXJpdHkgQ2hlYXRzaGVldF0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFdoZW4gd29ya2luZyB3aXRoIEhUTUwgeW91IHNob3VsZCBhbHdheXNcbiAqIFtxdW90ZSBhdHRyaWJ1dGUgdmFsdWVzXShodHRwOi8vd29ua28uY29tL3Bvc3QvaHRtbC1lc2NhcGluZykgdG8gcmVkdWNlXG4gKiBYU1MgdmVjdG9ycy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGUoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJyk7XG4gKiAvLyA9PiAnZnJlZCwgYmFybmV5LCAmYW1wOyBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiBlc2NhcGUoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzVW5lc2NhcGVkSHRtbC50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVVuZXNjYXBlZEh0bWwsIGVzY2FwZUh0bWxDaGFyKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBhbmRcbiAqIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS4gVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZVxuICogYXJndW1lbnRzOiAodmFsdWUsIGtleSwgb2JqZWN0KS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvblxuICogZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQHNlZSBfLmZvck93blJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uZm9yT3duKG5ldyBGb28sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gKi9cbmZ1bmN0aW9uIGZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvck93bihvYmplY3QsIHR5cGVvZiBpdGVyYXRlZSA9PSAnZnVuY3Rpb24nID8gaXRlcmF0ZWUgOiBpZGVudGl0eSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvck93bjtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHdvcmRzIGNvbXBvc2VkIG9mIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlQXNjaWlXb3JkID0gL1teXFx4MDAtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4N2ZdKy9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBMYXRpbiBVbmljb2RlIGxldHRlcnMgKGV4Y2x1ZGluZyBtYXRoZW1hdGljYWwgb3BlcmF0b3JzKS4gKi9cbnZhciByZUxhdGluID0gL1tcXHhjMC1cXHhkNlxceGQ4LVxceGY2XFx4ZjgtXFx4ZmZcXHUwMTAwLVxcdTAxN2ZdL2c7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTIzJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZjAnLFxuICAgIHJzRGluZ2JhdFJhbmdlID0gJ1xcXFx1MjcwMC1cXFxcdTI3YmYnLFxuICAgIHJzTG93ZXJSYW5nZSA9ICdhLXpcXFxceGRmLVxcXFx4ZjZcXFxceGY4LVxcXFx4ZmYnLFxuICAgIHJzTWF0aE9wUmFuZ2UgPSAnXFxcXHhhY1xcXFx4YjFcXFxceGQ3XFxcXHhmNycsXG4gICAgcnNOb25DaGFyUmFuZ2UgPSAnXFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmJyxcbiAgICByc1B1bmN0dWF0aW9uUmFuZ2UgPSAnXFxcXHUyMDAwLVxcXFx1MjA2ZicsXG4gICAgcnNTcGFjZVJhbmdlID0gJyBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwJyxcbiAgICByc1VwcGVyUmFuZ2UgPSAnQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlJyxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZicsXG4gICAgcnNCcmVha1JhbmdlID0gcnNNYXRoT3BSYW5nZSArIHJzTm9uQ2hhclJhbmdlICsgcnNQdW5jdHVhdGlvblJhbmdlICsgcnNTcGFjZVJhbmdlO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBcG9zID0gXCJbJ1xcdTIwMTldXCIsXG4gICAgcnNCcmVhayA9ICdbJyArIHJzQnJlYWtSYW5nZSArICddJyxcbiAgICByc0NvbWJvID0gJ1snICsgcnNDb21ib01hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlICsgJ10nLFxuICAgIHJzRGlnaXRzID0gJ1xcXFxkKycsXG4gICAgcnNEaW5nYmF0ID0gJ1snICsgcnNEaW5nYmF0UmFuZ2UgKyAnXScsXG4gICAgcnNMb3dlciA9ICdbJyArIHJzTG93ZXJSYW5nZSArICddJyxcbiAgICByc01pc2MgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArIHJzQnJlYWtSYW5nZSArIHJzRGlnaXRzICsgcnNEaW5nYmF0UmFuZ2UgKyByc0xvd2VyUmFuZ2UgKyByc1VwcGVyUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzVXBwZXIgPSAnWycgKyByc1VwcGVyUmFuZ2UgKyAnXScsXG4gICAgcnNaV0ogPSAnXFxcXHUyMDBkJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIHJlZ2V4ZXMuICovXG52YXIgcnNMb3dlck1pc2MgPSAnKD86JyArIHJzTG93ZXIgKyAnfCcgKyByc01pc2MgKyAnKScsXG4gICAgcnNVcHBlck1pc2MgPSAnKD86JyArIHJzVXBwZXIgKyAnfCcgKyByc01pc2MgKyAnKScsXG4gICAgcnNPcHRMb3dlckNvbnRyID0gJyg/OicgKyByc0Fwb3MgKyAnKD86ZHxsbHxtfHJlfHN8dHx2ZSkpPycsXG4gICAgcnNPcHRVcHBlckNvbnRyID0gJyg/OicgKyByc0Fwb3MgKyAnKD86RHxMTHxNfFJFfFN8VHxWRSkpPycsXG4gICAgcmVPcHRNb2QgPSByc01vZGlmaWVyICsgJz8nLFxuICAgIHJzT3B0VmFyID0gJ1snICsgcnNWYXJSYW5nZSArICddPycsXG4gICAgcnNPcHRKb2luID0gJyg/OicgKyByc1pXSiArICcoPzonICsgW3JzTm9uQXN0cmFsLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc09wdFZhciArIHJlT3B0TW9kICsgJykqJyxcbiAgICByc1NlcSA9IHJzT3B0VmFyICsgcmVPcHRNb2QgKyByc09wdEpvaW4sXG4gICAgcnNFbW9qaSA9ICcoPzonICsgW3JzRGluZ2JhdCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNTZXE7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGFwb3N0cm9waGVzLiAqL1xudmFyIHJlQXBvcyA9IFJlZ0V4cChyc0Fwb3MsICdnJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3MpIGFuZFxuICogW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrcyBmb3Igc3ltYm9sc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzX2Zvcl9TeW1ib2xzKS5cbiAqL1xudmFyIHJlQ29tYm9NYXJrID0gUmVnRXhwKHJzQ29tYm8sICdnJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGNvbXBsZXggb3IgY29tcG91bmQgd29yZHMuICovXG52YXIgcmVVbmljb2RlV29yZCA9IFJlZ0V4cChbXG4gIHJzVXBwZXIgKyAnPycgKyByc0xvd2VyICsgJysnICsgcnNPcHRMb3dlckNvbnRyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciwgJyQnXS5qb2luKCd8JykgKyAnKScsXG4gIHJzVXBwZXJNaXNjICsgJysnICsgcnNPcHRVcHBlckNvbnRyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciArIHJzTG93ZXJNaXNjLCAnJCddLmpvaW4oJ3wnKSArICcpJyxcbiAgcnNVcHBlciArICc/JyArIHJzTG93ZXJNaXNjICsgJysnICsgcnNPcHRMb3dlckNvbnRyLFxuICByc1VwcGVyICsgJysnICsgcnNPcHRVcHBlckNvbnRyLFxuICByc0RpZ2l0cyxcbiAgcnNFbW9qaVxuXS5qb2luKCd8JyksICdnJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBzdHJpbmdzIHRoYXQgbmVlZCBhIG1vcmUgcm9idXN0IHJlZ2V4cCB0byBtYXRjaCB3b3Jkcy4gKi9cbnZhciByZUhhc1VuaWNvZGVXb3JkID0gL1thLXpdW0EtWl18W0EtWl17Mix9W2Etel18WzAtOV1bYS16QS1aXXxbYS16QS1aXVswLTldfFteYS16QS1aMC05IF0vO1xuXG4vKiogVXNlZCB0byBtYXAgTGF0aW4gVW5pY29kZSBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMuICovXG52YXIgZGVidXJyZWRMZXR0ZXJzID0ge1xuICAvLyBMYXRpbi0xIFN1cHBsZW1lbnQgYmxvY2suXG4gICdcXHhjMCc6ICdBJywgICdcXHhjMSc6ICdBJywgJ1xceGMyJzogJ0EnLCAnXFx4YzMnOiAnQScsICdcXHhjNCc6ICdBJywgJ1xceGM1JzogJ0EnLFxuICAnXFx4ZTAnOiAnYScsICAnXFx4ZTEnOiAnYScsICdcXHhlMic6ICdhJywgJ1xceGUzJzogJ2EnLCAnXFx4ZTQnOiAnYScsICdcXHhlNSc6ICdhJyxcbiAgJ1xceGM3JzogJ0MnLCAgJ1xceGU3JzogJ2MnLFxuICAnXFx4ZDAnOiAnRCcsICAnXFx4ZjAnOiAnZCcsXG4gICdcXHhjOCc6ICdFJywgICdcXHhjOSc6ICdFJywgJ1xceGNhJzogJ0UnLCAnXFx4Y2InOiAnRScsXG4gICdcXHhlOCc6ICdlJywgICdcXHhlOSc6ICdlJywgJ1xceGVhJzogJ2UnLCAnXFx4ZWInOiAnZScsXG4gICdcXHhjYyc6ICdJJywgICdcXHhjZCc6ICdJJywgJ1xceGNlJzogJ0knLCAnXFx4Y2YnOiAnSScsXG4gICdcXHhlYyc6ICdpJywgICdcXHhlZCc6ICdpJywgJ1xceGVlJzogJ2knLCAnXFx4ZWYnOiAnaScsXG4gICdcXHhkMSc6ICdOJywgICdcXHhmMSc6ICduJyxcbiAgJ1xceGQyJzogJ08nLCAgJ1xceGQzJzogJ08nLCAnXFx4ZDQnOiAnTycsICdcXHhkNSc6ICdPJywgJ1xceGQ2JzogJ08nLCAnXFx4ZDgnOiAnTycsXG4gICdcXHhmMic6ICdvJywgICdcXHhmMyc6ICdvJywgJ1xceGY0JzogJ28nLCAnXFx4ZjUnOiAnbycsICdcXHhmNic6ICdvJywgJ1xceGY4JzogJ28nLFxuICAnXFx4ZDknOiAnVScsICAnXFx4ZGEnOiAnVScsICdcXHhkYic6ICdVJywgJ1xceGRjJzogJ1UnLFxuICAnXFx4ZjknOiAndScsICAnXFx4ZmEnOiAndScsICdcXHhmYic6ICd1JywgJ1xceGZjJzogJ3UnLFxuICAnXFx4ZGQnOiAnWScsICAnXFx4ZmQnOiAneScsICdcXHhmZic6ICd5JyxcbiAgJ1xceGM2JzogJ0FlJywgJ1xceGU2JzogJ2FlJyxcbiAgJ1xceGRlJzogJ1RoJywgJ1xceGZlJzogJ3RoJyxcbiAgJ1xceGRmJzogJ3NzJyxcbiAgLy8gTGF0aW4gRXh0ZW5kZWQtQSBibG9jay5cbiAgJ1xcdTAxMDAnOiAnQScsICAnXFx1MDEwMic6ICdBJywgJ1xcdTAxMDQnOiAnQScsXG4gICdcXHUwMTAxJzogJ2EnLCAgJ1xcdTAxMDMnOiAnYScsICdcXHUwMTA1JzogJ2EnLFxuICAnXFx1MDEwNic6ICdDJywgICdcXHUwMTA4JzogJ0MnLCAnXFx1MDEwYSc6ICdDJywgJ1xcdTAxMGMnOiAnQycsXG4gICdcXHUwMTA3JzogJ2MnLCAgJ1xcdTAxMDknOiAnYycsICdcXHUwMTBiJzogJ2MnLCAnXFx1MDEwZCc6ICdjJyxcbiAgJ1xcdTAxMGUnOiAnRCcsICAnXFx1MDExMCc6ICdEJywgJ1xcdTAxMGYnOiAnZCcsICdcXHUwMTExJzogJ2QnLFxuICAnXFx1MDExMic6ICdFJywgICdcXHUwMTE0JzogJ0UnLCAnXFx1MDExNic6ICdFJywgJ1xcdTAxMTgnOiAnRScsICdcXHUwMTFhJzogJ0UnLFxuICAnXFx1MDExMyc6ICdlJywgICdcXHUwMTE1JzogJ2UnLCAnXFx1MDExNyc6ICdlJywgJ1xcdTAxMTknOiAnZScsICdcXHUwMTFiJzogJ2UnLFxuICAnXFx1MDExYyc6ICdHJywgICdcXHUwMTFlJzogJ0cnLCAnXFx1MDEyMCc6ICdHJywgJ1xcdTAxMjInOiAnRycsXG4gICdcXHUwMTFkJzogJ2cnLCAgJ1xcdTAxMWYnOiAnZycsICdcXHUwMTIxJzogJ2cnLCAnXFx1MDEyMyc6ICdnJyxcbiAgJ1xcdTAxMjQnOiAnSCcsICAnXFx1MDEyNic6ICdIJywgJ1xcdTAxMjUnOiAnaCcsICdcXHUwMTI3JzogJ2gnLFxuICAnXFx1MDEyOCc6ICdJJywgICdcXHUwMTJhJzogJ0knLCAnXFx1MDEyYyc6ICdJJywgJ1xcdTAxMmUnOiAnSScsICdcXHUwMTMwJzogJ0knLFxuICAnXFx1MDEyOSc6ICdpJywgICdcXHUwMTJiJzogJ2knLCAnXFx1MDEyZCc6ICdpJywgJ1xcdTAxMmYnOiAnaScsICdcXHUwMTMxJzogJ2knLFxuICAnXFx1MDEzNCc6ICdKJywgICdcXHUwMTM1JzogJ2onLFxuICAnXFx1MDEzNic6ICdLJywgICdcXHUwMTM3JzogJ2snLCAnXFx1MDEzOCc6ICdrJyxcbiAgJ1xcdTAxMzknOiAnTCcsICAnXFx1MDEzYic6ICdMJywgJ1xcdTAxM2QnOiAnTCcsICdcXHUwMTNmJzogJ0wnLCAnXFx1MDE0MSc6ICdMJyxcbiAgJ1xcdTAxM2EnOiAnbCcsICAnXFx1MDEzYyc6ICdsJywgJ1xcdTAxM2UnOiAnbCcsICdcXHUwMTQwJzogJ2wnLCAnXFx1MDE0Mic6ICdsJyxcbiAgJ1xcdTAxNDMnOiAnTicsICAnXFx1MDE0NSc6ICdOJywgJ1xcdTAxNDcnOiAnTicsICdcXHUwMTRhJzogJ04nLFxuICAnXFx1MDE0NCc6ICduJywgICdcXHUwMTQ2JzogJ24nLCAnXFx1MDE0OCc6ICduJywgJ1xcdTAxNGInOiAnbicsXG4gICdcXHUwMTRjJzogJ08nLCAgJ1xcdTAxNGUnOiAnTycsICdcXHUwMTUwJzogJ08nLFxuICAnXFx1MDE0ZCc6ICdvJywgICdcXHUwMTRmJzogJ28nLCAnXFx1MDE1MSc6ICdvJyxcbiAgJ1xcdTAxNTQnOiAnUicsICAnXFx1MDE1Nic6ICdSJywgJ1xcdTAxNTgnOiAnUicsXG4gICdcXHUwMTU1JzogJ3InLCAgJ1xcdTAxNTcnOiAncicsICdcXHUwMTU5JzogJ3InLFxuICAnXFx1MDE1YSc6ICdTJywgICdcXHUwMTVjJzogJ1MnLCAnXFx1MDE1ZSc6ICdTJywgJ1xcdTAxNjAnOiAnUycsXG4gICdcXHUwMTViJzogJ3MnLCAgJ1xcdTAxNWQnOiAncycsICdcXHUwMTVmJzogJ3MnLCAnXFx1MDE2MSc6ICdzJyxcbiAgJ1xcdTAxNjInOiAnVCcsICAnXFx1MDE2NCc6ICdUJywgJ1xcdTAxNjYnOiAnVCcsXG4gICdcXHUwMTYzJzogJ3QnLCAgJ1xcdTAxNjUnOiAndCcsICdcXHUwMTY3JzogJ3QnLFxuICAnXFx1MDE2OCc6ICdVJywgICdcXHUwMTZhJzogJ1UnLCAnXFx1MDE2Yyc6ICdVJywgJ1xcdTAxNmUnOiAnVScsICdcXHUwMTcwJzogJ1UnLCAnXFx1MDE3Mic6ICdVJyxcbiAgJ1xcdTAxNjknOiAndScsICAnXFx1MDE2Yic6ICd1JywgJ1xcdTAxNmQnOiAndScsICdcXHUwMTZmJzogJ3UnLCAnXFx1MDE3MSc6ICd1JywgJ1xcdTAxNzMnOiAndScsXG4gICdcXHUwMTc0JzogJ1cnLCAgJ1xcdTAxNzUnOiAndycsXG4gICdcXHUwMTc2JzogJ1knLCAgJ1xcdTAxNzcnOiAneScsICdcXHUwMTc4JzogJ1knLFxuICAnXFx1MDE3OSc6ICdaJywgICdcXHUwMTdiJzogJ1onLCAnXFx1MDE3ZCc6ICdaJyxcbiAgJ1xcdTAxN2EnOiAneicsICAnXFx1MDE3Yyc6ICd6JywgJ1xcdTAxN2UnOiAneicsXG4gICdcXHUwMTMyJzogJ0lKJywgJ1xcdTAxMzMnOiAnaWonLFxuICAnXFx1MDE1Mic6ICdPZScsICdcXHUwMTUzJzogJ29lJyxcbiAgJ1xcdTAxNDknOiBcIiduXCIsICdcXHUwMTdmJzogJ3NzJ1xufTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhbiBBU0NJSSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIGFzY2lpV29yZHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVBc2NpaVdvcmQpIHx8IFtdO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eU9mKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogVXNlZCBieSBgXy5kZWJ1cnJgIHRvIGNvbnZlcnQgTGF0aW4tMSBTdXBwbGVtZW50IGFuZCBMYXRpbiBFeHRlbmRlZC1BXG4gKiBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXIgVGhlIG1hdGNoZWQgbGV0dGVyIHRvIGRlYnVyci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGRlYnVycmVkIGxldHRlci5cbiAqL1xudmFyIGRlYnVyckxldHRlciA9IGJhc2VQcm9wZXJ0eU9mKGRlYnVycmVkTGV0dGVycyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIGNvbnRhaW5zIGEgd29yZCBjb21wb3NlZCBvZiBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgd29yZCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNVbmljb2RlV29yZChzdHJpbmcpIHtcbiAgcmV0dXJuIHJlSGFzVW5pY29kZVdvcmQudGVzdChzdHJpbmcpO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhIFVuaWNvZGUgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICovXG5mdW5jdGlvbiB1bmljb2RlV29yZHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVVbmljb2RlV29yZCkgfHwgW107XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uY2FtZWxDYXNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGNvbWJpbmUgZWFjaCB3b3JkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29tcG91bmRlciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29tcG91bmRlcihjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIGFycmF5UmVkdWNlKHdvcmRzKGRlYnVycihzdHJpbmcpLnJlcGxhY2UocmVBcG9zLCAnJykpLCBjYWxsYmFjaywgJycpO1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVidXJycyBgc3RyaW5nYCBieSBjb252ZXJ0aW5nXG4gKiBbTGF0aW4tMSBTdXBwbGVtZW50XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MYXRpbi0xX1N1cHBsZW1lbnRfKFVuaWNvZGVfYmxvY2spI0NoYXJhY3Rlcl90YWJsZSlcbiAqIGFuZCBbTGF0aW4gRXh0ZW5kZWQtQV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGF0aW5fRXh0ZW5kZWQtQSlcbiAqIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycyBhbmQgcmVtb3ZpbmdcbiAqIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3NdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrcykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZGVidXJyLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZGVidXJyZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlYnVycignZMOpasOgIHZ1Jyk7XG4gKiAvLyA9PiAnZGVqYSB2dSdcbiAqL1xuZnVuY3Rpb24gZGVidXJyKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gc3RyaW5nICYmIHN0cmluZy5yZXBsYWNlKHJlTGF0aW4sIGRlYnVyckxldHRlcikucmVwbGFjZShyZUNvbWJvTWFyaywgJycpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvXG4gKiBba2ViYWIgY2FzZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2Nhc2UjU3BlY2lhbF9jYXNlX3N0eWxlcykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGtlYmFiIGNhc2VkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5rZWJhYkNhc2UoJ0ZvbyBCYXInKTtcbiAqIC8vID0+ICdmb28tYmFyJ1xuICpcbiAqIF8ua2ViYWJDYXNlKCdmb29CYXInKTtcbiAqIC8vID0+ICdmb28tYmFyJ1xuICpcbiAqIF8ua2ViYWJDYXNlKCdfX0ZPT19CQVJfXycpO1xuICogLy8gPT4gJ2Zvby1iYXInXG4gKi9cbnZhciBrZWJhYkNhc2UgPSBjcmVhdGVDb21wb3VuZGVyKGZ1bmN0aW9uKHJlc3VsdCwgd29yZCwgaW5kZXgpIHtcbiAgcmV0dXJuIHJlc3VsdCArIChpbmRleCA/ICctJyA6ICcnKSArIHdvcmQudG9Mb3dlckNhc2UoKTtcbn0pO1xuXG4vKipcbiAqIFNwbGl0cyBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtSZWdFeHB8c3RyaW5nfSBbcGF0dGVybl0gVGhlIHBhdHRlcm4gdG8gbWF0Y2ggd29yZHMuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy53b3JkcygnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+IFsnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcyddXG4gKlxuICogXy53b3JkcygnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnLCAvW14sIF0rL2cpO1xuICogLy8gPT4gWydmcmVkJywgJ2Jhcm5leScsICcmJywgJ3BlYmJsZXMnXVxuICovXG5mdW5jdGlvbiB3b3JkcyhzdHJpbmcsIHBhdHRlcm4sIGd1YXJkKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHBhdHRlcm4gPSBndWFyZCA/IHVuZGVmaW5lZCA6IHBhdHRlcm47XG5cbiAgaWYgKHBhdHRlcm4gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoYXNVbmljb2RlV29yZChzdHJpbmcpID8gdW5pY29kZVdvcmRzKHN0cmluZykgOiBhc2NpaVdvcmRzKHN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIHN0cmluZy5tYXRjaChwYXR0ZXJuKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZWJhYkNhc2U7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyA9IDEsXG4gICAgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvLFxuICAgIHJlTGVhZGluZ0RvdCA9IC9eXFwuLyxcbiAgICByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5LFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGUoZW50cmllcyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfX1snZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBjYWNoZSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChjYWNoZSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGNhY2hlLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYWNoZSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGNhY2hlLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aF0gOiBjYXN0UGF0aChwYXRoKTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaGFzSW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VIYXNJbihvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYga2V5IGluIE9iamVjdChvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLlxuICogIFRoZSBiaXRtYXNrIG1heSBiZSBjb21wb3NlZCBvZiB0aGUgZm9sbG93aW5nIGZsYWdzOlxuICogICAgIDEgLSBVbm9yZGVyZWQgY29tcGFyaXNvblxuICogICAgIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0KHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBnZXRUYWcob2JqZWN0KTtcbiAgICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gZ2V0VGFnKG90aGVyKTtcbiAgICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG90aFRhZztcbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnICYmICFpc0hvc3RPYmplY3Qob2JqZWN0KSxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG90aGVyKSxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc01hdGNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IG1hdGNoRGF0YSBUaGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3MgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGluZGV4ID0gbWF0Y2hEYXRhLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IGluZGV4LFxuICAgICAgbm9DdXN0b21pemVyID0gIWN1c3RvbWl6ZXI7XG5cbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIGRhdGFbMl0pXG4gICAgICAgICAgPyBkYXRhWzFdICE9PSBvYmplY3RbZGF0YVswXV1cbiAgICAgICAgICA6ICEoZGF0YVswXSBpbiBvYmplY3QpXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIHZhciBrZXkgPSBkYXRhWzBdLFxuICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBzcmNWYWx1ZSA9IGRhdGFbMV07XG5cbiAgICBpZiAobm9DdXN0b21pemVyICYmIGRhdGFbMl0pIHtcbiAgICAgIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RhY2sgPSBuZXcgU3RhY2s7XG4gICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgY3VzdG9taXplciwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHLCBzdGFjaylcbiAgICAgICAgICAgIDogcmVzdWx0XG4gICAgICAgICAgKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLml0ZXJhdGVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBbdmFsdWU9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYW4gaXRlcmF0ZWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGl0ZXJhdGVlLlxuICovXG5mdW5jdGlvbiBiYXNlSXRlcmF0ZWUodmFsdWUpIHtcbiAgLy8gRG9uJ3Qgc3RvcmUgdGhlIGB0eXBlb2ZgIHJlc3VsdCBpbiBhIHZhcmlhYmxlIHRvIGF2b2lkIGEgSklUIGJ1ZyBpbiBTYWZhcmkgOS5cbiAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTYwMzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSlcbiAgICAgID8gYmFzZU1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pXG4gICAgICA6IGJhc2VNYXRjaGVzKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gcHJvcGVydHkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lc24ndCBjbG9uZSBgc291cmNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzKHNvdXJjZSkge1xuICB2YXIgbWF0Y2hEYXRhID0gZ2V0TWF0Y2hEYXRhKHNvdXJjZSk7XG4gIGlmIChtYXRjaERhdGEubGVuZ3RoID09IDEgJiYgbWF0Y2hEYXRhWzBdWzJdKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKG1hdGNoRGF0YVswXVswXSwgbWF0Y2hEYXRhWzBdWzFdKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PT0gc291cmNlIHx8IGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lc24ndCBjbG9uZSBgc3JjVmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KHBhdGgsIHNyY1ZhbHVlKSB7XG4gIGlmIChpc0tleShwYXRoKSAmJiBpc1N0cmljdENvbXBhcmFibGUoc3JjVmFsdWUpKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKHRvS2V5KHBhdGgpLCBzcmNWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBvYmpWYWx1ZSA9IGdldChvYmplY3QsIHBhdGgpO1xuICAgIHJldHVybiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBvYmpWYWx1ZSA9PT0gc3JjVmFsdWUpXG4gICAgICA/IGhhc0luKG9iamVjdCwgcGF0aClcbiAgICAgIDogYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCB1bmRlZmluZWQsIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgfCBQQVJUSUFMX0NPTVBBUkVfRkxBRyk7XG4gIH07XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUHJvcGVydHlgIHdoaWNoIHN1cHBvcnRzIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5RGVlcChwYXRoKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnB1bGxBdGAgd2l0aG91dCBzdXBwb3J0IGZvciBpbmRpdmlkdWFsXG4gKiBpbmRleGVzIG9yIGNhcHR1cmluZyB0aGUgcmVtb3ZlZCBlbGVtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7bnVtYmVyW119IGluZGV4ZXMgVGhlIGluZGV4ZXMgb2YgZWxlbWVudHMgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQdWxsQXQoYXJyYXksIGluZGV4ZXMpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gaW5kZXhlcy5sZW5ndGggOiAwLFxuICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleGVzW2xlbmd0aF07XG4gICAgaWYgKGxlbmd0aCA9PSBsYXN0SW5kZXggfHwgaW5kZXggIT09IHByZXZpb3VzKSB7XG4gICAgICB2YXIgcHJldmlvdXMgPSBpbmRleDtcbiAgICAgIGlmIChpc0luZGV4KGluZGV4KSkge1xuICAgICAgICBzcGxpY2UuY2FsbChhcnJheSwgaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzS2V5KGluZGV4LCBhcnJheSkpIHtcbiAgICAgICAgdmFyIHBhdGggPSBjYXN0UGF0aChpbmRleCksXG4gICAgICAgICAgICBvYmplY3QgPSBwYXJlbnQoYXJyYXksIHBhdGgpO1xuXG4gICAgICAgIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgICAgICAgIGRlbGV0ZSBvYmplY3RbdG9LZXkobGFzdChwYXRoKSldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGFycmF5W3RvS2V5KGluZGV4KV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICB9XG4gIGVuZCA9IGVuZCA+IGxlbmd0aCA/IGxlbmd0aCA6IGVuZDtcbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuZ3RoO1xuICB9XG4gIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgc3RhcnQgPj4+PSAwO1xuXG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBzdHJpbmdUb1BhdGgodmFsdWUpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChhcnJheSk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBVTk9SREVSRURfQ09NUEFSRV9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIXNlZW4uaGFzKG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5hZGQob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAob2JqZWN0LmJ5dGVPZmZzZXQgIT0gb3RoZXIuYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gQ29lcmNlIGJvb2xlYW5zIHRvIGAxYCBvciBgMGAgYW5kIGRhdGVzIHRvIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vIEludmFsaWQgZGF0ZXMgYXJlIGNvZXJjZWQgdG8gYE5hTmAuXG4gICAgICByZXR1cm4gZXEoK29iamVjdCwgK290aGVyKTtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICB2YXIgY29udmVydCA9IG1hcFRvQXJyYXk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUc7XG4gICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgIGlmIChvYmplY3Quc2l6ZSAhPSBvdGhlci5zaXplICYmICFpc1BhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgYml0bWFzayB8PSBVTk9SREVSRURfQ09NUEFSRV9GTEFHO1xuXG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgICAgIHZhciByZXN1bHQgPSBlcXVhbEFycmF5cyhjb252ZXJ0KG9iamVjdCksIGNvbnZlcnQob3RoZXIpLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlT2YuY2FsbChvYmplY3QpID09IHN5bWJvbFZhbHVlT2YuY2FsbChvdGhlcik7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyxcbiAgICAgIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3Mgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbWF0Y2ggZGF0YSBvZiBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hEYXRhKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0ga2V5cyhvYmplY3QpLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB2YXIga2V5ID0gcmVzdWx0W2xlbmd0aF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV07XG5cbiAgICByZXN1bHRbbGVuZ3RoXSA9IFtrZXksIHZhbHVlLCBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4vLyBmb3IgZGF0YSB2aWV3cyBpbiBFZGdlIDwgMTQsIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzLlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBleGlzdHMgb24gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIHJlc3VsdCxcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgaWYgKCEocmVzdWx0ID0gb2JqZWN0ICE9IG51bGwgJiYgaGFzRnVuYyhvYmplY3QsIGtleSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cbiAgaWYgKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiAwO1xuICByZXR1cm4gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlmIHN1aXRhYmxlIGZvciBzdHJpY3RcbiAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAhaXNPYmplY3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgbWF0Y2hlc1Byb3BlcnR5YCBmb3Igc291cmNlIHZhbHVlcyBzdWl0YWJsZVxuICogZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSB2YWx1ZSB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKGtleSwgc3JjVmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0W2tleV0gPT09IHNyY1ZhbHVlICYmXG4gICAgICAoc3JjVmFsdWUgIT09IHVuZGVmaW5lZCB8fCAoa2V5IGluIE9iamVjdChvYmplY3QpKSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgcGFyZW50IHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCB0byBnZXQgdGhlIHBhcmVudCB2YWx1ZSBvZi5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwYXJlbnQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHBhcmVudChvYmplY3QsIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgubGVuZ3RoID09IDEgPyBvYmplY3QgOiBiYXNlR2V0KG9iamVjdCwgYmFzZVNsaWNlKHBhdGgsIDAsIC0xKSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemUoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAocmVMZWFkaW5nRG90LnRlc3Qoc3RyaW5nKSkge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxhc3QgZWxlbWVudCBvZiBgYXJyYXlgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBvZiBgYXJyYXlgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmxhc3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gbGFzdChhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gbGVuZ3RoID8gYXJyYXlbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgZWxlbWVudHMgZnJvbSBgYXJyYXlgIHRoYXQgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yXG4gKiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiB0aGUgcmVtb3ZlZCBlbGVtZW50cy4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkXG4gKiB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICpcbiAqICoqTm90ZToqKiBVbmxpa2UgYF8uZmlsdGVyYCwgdGhpcyBtZXRob2QgbXV0YXRlcyBgYXJyYXlgLiBVc2UgYF8ucHVsbGBcbiAqIHRvIHB1bGwgZWxlbWVudHMgZnJvbSBhbiBhcnJheSBieSB2YWx1ZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldXG4gKiAgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHJlbW92ZWQgZWxlbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheSA9IFsxLCAyLCAzLCA0XTtcbiAqIHZhciBldmVucyA9IF8ucmVtb3ZlKGFycmF5LCBmdW5jdGlvbihuKSB7XG4gKiAgIHJldHVybiBuICUgMiA9PSAwO1xuICogfSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXkpO1xuICogLy8gPT4gWzEsIDNdXG4gKlxuICogY29uc29sZS5sb2coZXZlbnMpO1xuICogLy8gPT4gWzIsIDRdXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKCEoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKSkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmRleGVzID0gW10sXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgcHJlZGljYXRlID0gYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMyk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIGluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgfVxuICB9XG4gIGJhc2VQdWxsQXQoYXJyYXksIGluZGV4ZXMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgJiYgdHlwZW9mIHJlc29sdmVyICE9ICdmdW5jdGlvbicpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHZhciBtZW1vaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBrZXkgPSByZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3MpIDogYXJnc1swXSxcbiAgICAgICAgY2FjaGUgPSBtZW1vaXplZC5jYWNoZTtcblxuICAgIGlmIChjYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGNhY2hlLmdldChrZXkpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICBtZW1vaXplZC5jYWNoZSA9IGNhY2hlLnNldChrZXksIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgbWVtb2l6ZWQuY2FjaGUgPSBuZXcgKG1lbW9pemUuQ2FjaGUgfHwgTWFwQ2FjaGUpO1xuICByZXR1cm4gbWVtb2l6ZWQ7XG59XG5cbi8vIEFzc2lnbiBjYWNoZSB0byBgXy5tZW1vaXplYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLiBJZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgcmV0dXJuZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9XSB9O1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICogLy8gPT4gJ2RlZmF1bHQnXG4gKi9cbmZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGlzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSBfLmNyZWF0ZSh7ICdhJzogXy5jcmVhdGUoeyAnYic6IDIgfSkgfSk7XG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhLmInKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdiJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBoYXNJbihvYmplY3QsIHBhdGgpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBiYXNlSGFzSW4pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbXG4gKiAgIHsgJ2EnOiB7ICdiJzogMiB9IH0sXG4gKiAgIHsgJ2EnOiB7ICdiJzogMSB9IH1cbiAqIF07XG4gKlxuICogXy5tYXAob2JqZWN0cywgXy5wcm9wZXJ0eSgnYS5iJykpO1xuICogLy8gPT4gWzIsIDFdXG4gKlxuICogXy5tYXAoXy5zb3J0Qnkob2JqZWN0cywgXy5wcm9wZXJ0eShbJ2EnLCAnYiddKSksICdhLmInKTtcbiAqIC8vID0+IFsxLCAyXVxuICovXG5mdW5jdGlvbiBwcm9wZXJ0eShwYXRoKSB7XG4gIHJldHVybiBpc0tleShwYXRoKSA/IGJhc2VQcm9wZXJ0eSh0b0tleShwYXRoKSkgOiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmNsdWRlc2AgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBzcGVjaWZ5aW5nIGFuIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlc1dpdGgoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmF0b3IodmFsdWUsIGFycmF5W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgYGZyb21JbmRleGAgYm91bmRzIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUgZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgcmVzdWx0ID0gW10sXG4gICAgICBzZWVuID0gcmVzdWx0O1xuXG4gIGlmIChjb21wYXJhdG9yKSB7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuICB9XG4gIGVsc2UgaWYgKGxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFKSB7XG4gICAgdmFyIHNldCA9IGl0ZXJhdGVlID8gbnVsbCA6IGNyZWF0ZVNldChhcnJheSk7XG4gICAgaWYgKHNldCkge1xuICAgICAgcmV0dXJuIHNldFRvQXJyYXkoc2V0KTtcbiAgICB9XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICBpbmNsdWRlcyA9IGNhY2hlSGFzO1xuICAgIHNlZW4gPSBuZXcgU2V0Q2FjaGU7XG4gIH1cbiAgZWxzZSB7XG4gICAgc2VlbiA9IGl0ZXJhdGVlID8gW10gOiByZXN1bHQ7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUpIDogdmFsdWU7XG5cbiAgICB2YWx1ZSA9IChjb21wYXJhdG9yIHx8IHZhbHVlICE9PSAwKSA/IHZhbHVlIDogMDtcbiAgICBpZiAoaXNDb21tb24gJiYgY29tcHV0ZWQgPT09IGNvbXB1dGVkKSB7XG4gICAgICB2YXIgc2VlbkluZGV4ID0gc2Vlbi5sZW5ndGg7XG4gICAgICB3aGlsZSAoc2VlbkluZGV4LS0pIHtcbiAgICAgICAgaWYgKHNlZW5bc2VlbkluZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpbmNsdWRlcyhzZWVuLCBjb21wdXRlZCwgY29tcGFyYXRvcikpIHtcbiAgICAgIGlmIChzZWVuICE9PSByZXN1bHQpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc2V0IG9iamVjdCBvZiBgdmFsdWVzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYWRkIHRvIHRoZSBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgc2V0LlxuICovXG52YXIgY3JlYXRlU2V0ID0gIShTZXQgJiYgKDEgLyBzZXRUb0FycmF5KG5ldyBTZXQoWywtMF0pKVsxXSkgPT0gSU5GSU5JVFkpID8gbm9vcCA6IGZ1bmN0aW9uKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFNldCh2YWx1ZXMpO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGR1cGxpY2F0ZS1mcmVlIHZlcnNpb24gb2YgYW4gYXJyYXksIHVzaW5nXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpbiB3aGljaCBvbmx5IHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGVhY2hcbiAqIGVsZW1lbnQgaXMga2VwdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcShbMiwgMSwgMl0pO1xuICogLy8gPT4gWzIsIDFdXG4gKi9cbmZ1bmN0aW9uIHVuaXEoYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlVW5pcShhcnJheSlcbiAgICA6IFtdO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4zLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAqL1xuZnVuY3Rpb24gbm9vcCgpIHtcbiAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxO1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL01hdHQtRXNjaC92aXJ0dWFsLWRvbS9ibG9iL21hc3Rlci92aXJ0dWFsLWh5cGVyc2NyaXB0L3BhcnNlLXRhZy5qc1xuXG52YXIgc3BsaXQgPSByZXF1aXJlKCdicm93c2VyLXNwbGl0JylcblxudmFyIGNsYXNzSWRTcGxpdCA9IC8oW1xcLiNdP1thLXpBLVowLTlcXHUwMDdGLVxcdUZGRkZfOi1dKykvXG52YXIgbm90Q2xhc3NJZCA9IC9eXFwufCMvXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VTZWxlY3RvciAoc2VsZWN0b3IsIHVwcGVyKSB7XG4gIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgJydcbiAgdmFyIHRhZ05hbWVcbiAgdmFyIGlkID0gJydcbiAgdmFyIGNsYXNzZXMgPSBbXVxuXG4gIHZhciB0YWdQYXJ0cyA9IHNwbGl0KHNlbGVjdG9yLCBjbGFzc0lkU3BsaXQpXG5cbiAgaWYgKG5vdENsYXNzSWQudGVzdCh0YWdQYXJ0c1sxXSkgfHwgc2VsZWN0b3IgPT09ICcnKSB7XG4gICAgdGFnTmFtZSA9ICdkaXYnXG4gIH1cblxuICB2YXIgcGFydCwgdHlwZSwgaVxuXG4gIGZvciAoaSA9IDA7IGkgPCB0YWdQYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHBhcnQgPSB0YWdQYXJ0c1tpXVxuXG4gICAgaWYgKCFwYXJ0KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHR5cGUgPSBwYXJ0LmNoYXJBdCgwKVxuXG4gICAgaWYgKCF0YWdOYW1lKSB7XG4gICAgICB0YWdOYW1lID0gcGFydFxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJy4nKSB7XG4gICAgICBjbGFzc2VzLnB1c2gocGFydC5zdWJzdHJpbmcoMSwgcGFydC5sZW5ndGgpKVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJyMnKSB7XG4gICAgICBpZCA9IHBhcnQuc3Vic3RyaW5nKDEsIHBhcnQubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdGFnTmFtZTogdXBwZXIgPT09IHRydWUgPyB0YWdOYW1lLnRvVXBwZXJDYXNlKCkgOiB0YWdOYW1lLFxuICAgIGlkOiBpZCxcbiAgICBjbGFzc05hbWU6IGNsYXNzZXMuam9pbignICcpXG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIGNoZWNrRm9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgICAgIHN1cGVyKGVycm9yKTtcclxuICAgICAgICBjb25zdCBpc0Vycm9yID0gYFxyXG4gICAgICAgIDxoMyBzdHlsZT1cImNvbG9yOiByZWQ7XCI+VHlwZUVycm9yOiAke3RoaXMubWVzc2FnZX08L2gzPlxyXG4gICAgICAgIDxwPjwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItY29uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjYzdlMmYxOyBib3JkZXI6IDJweCBzb2xpZCAjMzhiNmZmOyBwYWRkaW5nOiA4cHggMTJweDtcIj5cclxuICAgICAgICAgICAgICAgIDxkaXY+JHt0aGlzLnN0YWNrfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvclwiKS5pbm5lckhUTUwgPSBpc0Vycm9yO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gY2hlY2tGb3JFcnJvcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgcXVpY2tfZXJyb3JfMSA9IHJlcXVpcmUoXCJxdWljay1lcnJvclwiKTtcclxuY29uc3Qgc25hYmJkb20gPSByZXF1aXJlKFwic25hYmJkb21cIik7XHJcbmNvbnN0IHByb3BzXzEgPSByZXF1aXJlKFwic25hYmJkb20vbW9kdWxlcy9wcm9wc1wiKTtcclxuY29uc3QgcmVjb25jaWxlID0gc25hYmJkb20uaW5pdChbcHJvcHNfMS5kZWZhdWx0XSk7XHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XHJcbmNvbnN0IHNuYWJiZG9tXzEgPSByZXF1aXJlKFwic25hYmJkb21cIik7XHJcbmNvbnN0IGluaXQgPSByZXF1aXJlKCdzbmFiYmRvbS10by1odG1sL2luaXQnKTtcclxuY29uc3QgbW9kdWxlcyA9IHJlcXVpcmUoJ3NuYWJiZG9tLXRvLWh0bWwvbW9kdWxlcycpO1xyXG5jb25zdCB0b0hUTUwgPSBpbml0KFtcclxuICAgIG1vZHVsZXMuY2xhc3MsXHJcbiAgICBtb2R1bGVzLnByb3BzLFxyXG4gICAgbW9kdWxlcy5hdHRyaWJ1dGVzLFxyXG4gICAgbW9kdWxlcy5zdHlsZVxyXG5dKTtcclxuLy8gaW50ZXJmYWNlIElRdWljayB7XHJcbi8vICAgICByZWFkb25seSAkZWw6IEVsZW1lbnQsXHJcbi8vIH1cclxuLy8gZnVuY3Rpb24gd2F0Y2hFZmZlY3QoZm46UCBhbnkpIHtcclxuLy8gICAgIHRoaXMuYWN0aXZlRWZmZWN0ID0gZm5cclxuLy8gICAgIGZuKClcclxuLy8gICAgIHRoaXMuYWN0aXZlRWZmZWN0ID0gbnVsbFxyXG4vLyB9XHJcbmNsYXNzIERlcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gbmV3IFNldCgpO1xyXG4gICAgfVxyXG4gICAgZGVwZW5kKGFjdGl2ZUVmZmVjdCkge1xyXG4gICAgICAgIGlmIChhY3RpdmVFZmZlY3QpXHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuYWRkKGFjdGl2ZUVmZmVjdCk7XHJcbiAgICB9XHJcbiAgICBub3RpZnkoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzdWIpID0+IHtcclxuICAgICAgICAgICAgc3ViKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIGxldCB0ID0gdGhpcztcclxuICAgICAgICB0LnBhcmFtcyA9IHBhcmFtcztcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkgeyB9XHJcbiAgICBzZXRTdGF0ZShwYXJ0aWFsU3RhdGUpIHtcclxuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIC4uLl90aGlzLnN0YXRlLFxyXG4gICAgICAgICAgICAuLi5wYXJ0aWFsU3RhdGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIFF1aWNrLl9fdXBkYXRlcihfdGhpcyk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoZWwsIHIpIHtcclxuICAgICAgICByZWNvbmNpbGUocm9vdCwgZWwpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IF9wdCA9IENvbXBvbmVudC5wcm90b3R5cGU7XHJcbl9wdC5pc1F1aWNrQ2xhc3NDb21wb25lbnQgPSB0cnVlO1xyXG5jb25zdCByZW5kZXIgPSBhc3luYyAoZWwsIHIpID0+IHtcclxuICAgIHJlY29uY2lsZShyb290LCBlbCk7XHJcbn07XHJcbmNvbnN0ICRpbml0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcbiAgICBmYXYuaHJlZiA9IFwiL2Zhdmljb24uaWNvXCI7XHJcbiAgICBmYXYucmVsID0gXCJpY29uXCI7XHJcbiAgICBjb25zdCBoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpO1xyXG4gICAgY29uc29sZS5sb2coaCk7XHJcbn07XHJcbmNvbnN0ICRsaXN0ZW5lciA9ICh0YXJnZXQsIHR5cGUsIGZuLCBwcmV2ZW50KSA9PiB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAocHJldmVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBcIlwiIHx8ICF0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBxdWlja19lcnJvcl8xLmRlZmF1bHQoYHRhcmdldCBub3QgcGFzc2VkIHRvIGxpc3RlbmVyYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBmbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IHVzZSA9IChmdW5jKSA9PiB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgZnVuYztcclxuICAgIH0pO1xyXG59O1xyXG5jb25zdCB2aWV3ID0gKHZpZXcpID0+IHtcclxuICAgIGNvbnN0IHJlbmRlclZpZXd0b0hUTUwgPSB0b0hUTUwodmlldyk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcFwiKS5pbm5lckhUTUwgPSByZW5kZXJWaWV3dG9IVE1MO1xyXG59O1xyXG5jb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIHByb3BzID0ge30sIC4uLmNoaWxkcmVuKSA9PiB7XHJcbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmZsYXQoKTtcclxuICAgIGlmICh0eXBlLnByb3RvdHlwZSAmJiB0eXBlLnByb3RvdHlwZS5pc1FuZFJlYWN0Q2xhc3NDb21wb25lbnQpIHtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IG5ldyB0eXBlKHByb3BzKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50SW5zdGFuY2UucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mICh0eXBlKSA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGUocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcclxuICAgIGxldCBkYXRhUHJvcHMgPSB7fTtcclxuICAgIGxldCBldmVudFByb3BzID0ge307XHJcbiAgICBmb3IgKGxldCBwcm9wS2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgLy8gZXZlbnQgcHJvcHMgYWx3YXlzIHN0YXJ0d2l0aCBvbiBlZy4gb25DbGljaywgb25DaGFuZ2UgZXRjLlxyXG4gICAgICAgIGlmIChwcm9wS2V5LnN0YXJ0c1dpdGgoJ29uJykpIHtcclxuICAgICAgICAgICAgLy8gb25DbGljayAtPiBjbGlja1xyXG4gICAgICAgICAgICBjb25zdCBldmVudCA9IHByb3BLZXkuc3Vic3RyaW5nKDIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGV2ZW50UHJvcHNbZXZlbnRdID0gcHJvcHNbcHJvcEtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhUHJvcHNbcHJvcEtleV0gPSBwcm9wc1twcm9wS2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc25hYmJkb21fMS5oKHR5cGUsIHsgcHJvcHMgfSwgY2hpbGRyZW4pO1xyXG59O1xyXG5jb25zdCBfX3VwZGF0ZXIgPSAoaW5zdGFuY2UpID0+IHsgcmV0dXJuIGluc3RhbmNlOyB9O1xyXG5jb25zdCAkY29uZmlnID0gKGVudikgPT4ge1xyXG4gICAgaWYgKGVudiA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICAgIH1cclxuICAgIGlmIChlbnYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xyXG4gICAgfVxyXG4gICAgaWYgKCFlbnYgfHwgZW52ID09PSBcIlwiKSB7XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IFF1aWNrID0ge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgdXNlLFxyXG4gICAgdmlldyxcclxuICAgIGNyZWF0ZUVsZW1lbnQsXHJcbiAgICBfX3VwZGF0ZXIsXHJcbiAgICAkY29uZmlnLFxyXG4gICAgcmVuZGVyLFxyXG4gICAgJGluaXQsXHJcbiAgICAkbGlzdGVuZXJcclxufTtcclxuUXVpY2sudXNlKFF1aWNrLiRpbml0KTtcclxuUXVpY2sudXNlKFF1aWNrLiRsaXN0ZW5lcik7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFF1aWNrO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnVzZVJlZiA9IGV4cG9ydHMuUXVpY2tSb3V0ZXJMaW5rID0gZXhwb3J0cy5jcmVhdGVQb3BTdGF0ZSA9IGV4cG9ydHMuUXVpY2tSb3V0ZXIgPSB2b2lkIDA7XHJcbmNvbnN0IHF1aWNranNfY29tcG9uZW50XzEgPSByZXF1aXJlKFwicXVpY2tqcy1jb21wb25lbnRcIik7XHJcbmNvbnN0IHF1aWNrX2Vycm9yXzEgPSByZXF1aXJlKFwicXVpY2stZXJyb3JcIik7XHJcbmNvbnN0IHBhdGhUb1JlZ2V4ID0gKHBhdGgpID0+IG5ldyBSZWdFeHAoXCJeXCIgKyBwYXRoLnJlcGxhY2UoL1xcLy9nLCBcIlxcXFwvXCIpLnJlcGxhY2UoLzpcXHcrL2csIFwiKC4rKVwiKSArIFwiJFwiKTtcclxuY29uc3QgZ2V0UGFyYW1zID0gKG1hdGNoKSA9PiB7XHJcbiAgICBpZiAobWF0Y2gucmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KFwibWlzc2luZyByZXF1aXJlZCBwYXJhbXNcIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBtYXRjaC5yZXN1bHQuc2xpY2UoMSk7XHJcbiAgICBjb25zdCBrZXlzID0gQXJyYXkuZnJvbShtYXRjaC5yb3V0ZS5wYXRoLm1hdGNoQWxsKC86KFxcdyspL2cpKS5tYXAoKHJlc3VsdCkgPT4gcmVzdWx0WzFdKTtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhrZXlzLm1hcCgoa2V5LCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlc1tpXV07XHJcbiAgICB9KSk7XHJcbn07XHJcbmNsYXNzIFF1aWNrUm91dGVyIHtcclxuICAgIGFzeW5jIHVzZVJvdXRlKHJvdXRlcywgdXJsKSB7XHJcbiAgICAgICAgaWYgKHJvdXRlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdChcInJvdXRlcyBjYW5ub3QgYmUgZW1wdHlcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcm91dGUgbWF0Y2hlcyBVUkxcclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcm91dGVzLm1hcCgocm91dGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiByb3V0ZSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogbG9jYXRpb24ucGF0aG5hbWUubWF0Y2gocGF0aFRvUmVnZXgocm91dGUucGF0aCkpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGZpbmRNYXRjaCA9IG1hdGNoZXMuZmluZCgobWF0Y2gpID0+IG1hdGNoLnJlc3VsdCAhPT0gbnVsbCk7XHJcbiAgICAgICAgaWYgKCFmaW5kTWF0Y2gpIHtcclxuICAgICAgICAgICAgZmluZE1hdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IHJvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGUucGF0aCA9PT0gXCIvZXJyb3JcIiksXHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtsb2NhdGlvbi5wYXRobmFtZV1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBmaW5kTWF0Y2gucm91dGUudmlldyhnZXRQYXJhbXMoZmluZE1hdGNoKSk7XHJcbiAgICAgICAgICAgIHF1aWNranNfY29tcG9uZW50XzEuZGVmYXVsdC52aWV3KGF3YWl0IHZpZXcucmVuZGVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IGZpbmRNYXRjaC5yb3V0ZS52aWV3KGdldFBhcmFtcyhmaW5kTWF0Y2gpKTtcclxuICAgICAgICBxdWlja2pzX2NvbXBvbmVudF8xLmRlZmF1bHQudmlldyhhd2FpdCB2aWV3LnJlbmRlcigpKTtcclxuICAgICAgICB0aGlzLnNldFRpdGxlKGZpbmRNYXRjaC5yb3V0ZS50aXRsZSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcztcclxuICAgIH1cclxuICAgIDtcclxuICAgIGdldFJvdXRlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uc3QgZnJvbSA9IGRvY3VtZW50LnJlZmVycmVyO1xyXG4gICAgICAgIGNvbnN0IHRvID0gbG9jYXRpb24uaHJlZjtcclxuICAgICAgICBjb25zdCBuZXh0ID0gRnVuY3Rpb247XHJcbiAgICAgICAgY29uc3Qgcm91dGUgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZ1bGxQYXRoOiBsb2NhdGlvbi5ocmVmLFxyXG4gICAgICAgICAgICAgICAgcGF0aG5hbWU6IGxvY2F0aW9uLnBhdGhuYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGNhbGxiYWNrKHJvdXRlKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0byxcclxuICAgICAgICAgICAgZnJvbSwgcm91dGVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgY3JlYXRlTmF2aWdhdGlvbihyb3V0ZXMpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmxvY2FsTmFtZSA9PT0gXCJhXCIpIHtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIGUudGFyZ2V0LmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgUXVpY2tSb3V0ZXIucHJvdG90eXBlLnVzZVJvdXRlKHJvdXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgaWYgKHRpdGxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIlF1aWNrIEFwcFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5RdWlja1JvdXRlciA9IFF1aWNrUm91dGVyO1xyXG47XHJcbmZ1bmN0aW9uIGNyZWF0ZVBvcFN0YXRlKHJvdXRlcykge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgUXVpY2tSb3V0ZXIucHJvdG90eXBlLnVzZVJvdXRlKHJvdXRlcyk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVBvcFN0YXRlID0gY3JlYXRlUG9wU3RhdGU7XHJcbmNsYXNzIFF1aWNrUm91dGVyTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgY29uc3QgdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbGlua1RvID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RvJyk7XHJcbiAgICAgICAgaWYgKCFsaW5rVG8pIHtcclxuICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdChgdG8gYXR0cmlidXRlIG11c3QgYmUgc3BlY2lmaWVkIHRvIHJvdXRlLCBxdWljay1saW5rIHJldHVybmVkICR7bGlua1RvfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjdXN0b21UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgY3VzdG9tVGFnLmhyZWYgPSBsaW5rVG87XHJcbiAgICAgICAgY3VzdG9tVGFnLmlubmVySFRNTCA9IHRoaXMuaW5uZXJIVE1MO1xyXG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZShcInJlZlwiKSkge1xyXG4gICAgICAgICAgICBjdXN0b21UYWcuaWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcInJlZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIikpIHtcclxuICAgICAgICAgICAgY3VzdG9tVGFnLmlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUoY3VzdG9tVGFnLCB0aGlzKTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgICAgIGlmICh0aGlzLmlubmVySFRNTCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBjdXN0b21UYWcuaW5uZXJUZXh0ID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJJID0gdGhpcy5hdHRyaWJ1dGVzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmliQSA9IHRoaXMuYXR0cmlidXRlc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJJLm5hbWUgPT09IFwidG9cIikge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tVGFnLnNldEF0dHJpYnV0ZShgJHthdHRyaWJJLm5hbWV9YCwgYCR7YXR0cmliSS52YWx1ZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUXVpY2tSb3V0ZXJMaW5rID0gUXVpY2tSb3V0ZXJMaW5rO1xyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdxdWljay1yb3V0ZXItbGluaycsIFF1aWNrUm91dGVyTGluayk7XHJcbnF1aWNranNfY29tcG9uZW50XzEuZGVmYXVsdC51c2UoUXVpY2tSb3V0ZXJMaW5rKTtcclxuY2xhc3MgdXNlUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXBwPy5jaGlsZHJlbik7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy51c2VSZWYgPSB1c2VSZWY7XHJcbiIsIlxuLy8gQWxsIFNWRyBjaGlsZHJlbiBlbGVtZW50cywgbm90IGluIHRoaXMgbGlzdCwgc2hvdWxkIHNlbGYtY2xvc2VcblxuZXhwb3J0cy5DT05UQUlORVIgPSB7XG4gIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1NWRy9pbnRyby5odG1sI1Rlcm1Db250YWluZXJFbGVtZW50XG4gICdhJzogdHJ1ZSxcbiAgJ2RlZnMnOiB0cnVlLFxuICAnZ2x5cGgnOiB0cnVlLFxuICAnZyc6IHRydWUsXG4gICdtYXJrZXInOiB0cnVlLFxuICAnbWFzayc6IHRydWUsXG4gICdtaXNzaW5nLWdseXBoJzogdHJ1ZSxcbiAgJ3BhdHRlcm4nOiB0cnVlLFxuICAnc3ZnJzogdHJ1ZSxcbiAgJ3N3aXRjaCc6IHRydWUsXG4gICdzeW1ib2wnOiB0cnVlLFxuICAndGV4dCc6IHRydWUsXG5cbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHL2ludHJvLmh0bWwjVGVybURlc2NyaXB0aXZlRWxlbWVudFxuICAnZGVzYyc6IHRydWUsXG4gICdtZXRhZGF0YSc6IHRydWUsXG4gICd0aXRsZSc6IHRydWVcbn1cblxuLy8gaHR0cDovL3d3dy53My5vcmcvaHRtbC93Zy9kcmFmdHMvaHRtbC9tYXN0ZXIvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xuXG5leHBvcnRzLlZPSUQgPSB7XG4gIGFyZWE6IHRydWUsXG4gIGJhc2U6IHRydWUsXG4gIGJyOiB0cnVlLFxuICBjb2w6IHRydWUsXG4gIGVtYmVkOiB0cnVlLFxuICBocjogdHJ1ZSxcbiAgaW1nOiB0cnVlLFxuICBpbnB1dDogdHJ1ZSxcbiAga2V5Z2VuOiB0cnVlLFxuICBsaW5rOiB0cnVlLFxuICBtZXRhOiB0cnVlLFxuICBwYXJhbTogdHJ1ZSxcbiAgc291cmNlOiB0cnVlLFxuICB0cmFjazogdHJ1ZSxcbiAgd2JyOiB0cnVlXG59XG4iLCJcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcbnZhciBwYXJzZVNlbGVjdG9yID0gcmVxdWlyZSgncGFyc2Utc2VsJylcbnZhciBWT0lEX0VMRU1FTlRTID0gcmVxdWlyZSgnLi9lbGVtZW50cycpLlZPSURcbnZhciBDT05UQUlORVJfRUxFTUVOVFMgPSByZXF1aXJlKCcuL2VsZW1lbnRzJykuQ09OVEFJTkVSXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5pdCAobW9kdWxlcykge1xuICBmdW5jdGlvbiBwYXJzZSAodm5vZGUsIG5vZGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICB2YXIgYXR0cmlidXRlcyA9IG5ldyBNYXAoW1xuICAgICAgLy8gVGhlc2UgY2FuIGJlIG92ZXJ3cml0dGVuIGJlY2F1c2UgdGhhdOKAmXMgd2hhdCBoYXBwZW5zIGluIHNuYWJiZG9tXG4gICAgICBbJ2lkJywgbm9kZS5pZF0sXG4gICAgICBbJ2NsYXNzJywgbm9kZS5jbGFzc05hbWVdXG4gICAgXSlcblxuICAgIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZm4sIGluZGV4KSB7XG4gICAgICBmbih2bm9kZSwgYXR0cmlidXRlcylcbiAgICB9KVxuICAgIGF0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgICByZXN1bHQucHVzaChrZXkgKyAnPVwiJyArIHZhbHVlICsgJ1wiJylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJylcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJUb1N0cmluZyAodm5vZGUpIHtcbiAgICBpZiAodHlwZW9mIHZub2RlID09PSAndW5kZWZpbmVkJyB8fCB2bm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgaWYgKCF2bm9kZS5zZWwgJiYgdHlwZW9mIHZub2RlLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZXNjYXBlKHZub2RlLnRleHQpXG4gICAgfVxuXG4gICAgdm5vZGUuZGF0YSA9IHZub2RlLmRhdGEgfHwge31cblxuICAgIC8vIFN1cHBvcnQgdGh1bmtzXG4gICAgaWYgKHZub2RlLmRhdGEuaG9vayAmJlxuICAgICAgdHlwZW9mIHZub2RlLmRhdGEuaG9vay5pbml0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2Ygdm5vZGUuZGF0YS5mbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdm5vZGUuZGF0YS5ob29rLmluaXQodm5vZGUpXG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSBwYXJzZVNlbGVjdG9yKHZub2RlLnNlbClcbiAgICB2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZVxuICAgIHZhciBhdHRyaWJ1dGVzID0gcGFyc2Uodm5vZGUsIG5vZGUpXG4gICAgdmFyIHN2ZyA9IHZub2RlLmRhdGEubnMgPT09ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbiAgICB2YXIgdGFnID0gW11cblxuICAgIGlmICh0YWdOYW1lID09PSAnIScpIHtcbiAgICAgIHJldHVybiAnPCEtLScgKyB2bm9kZS50ZXh0ICsgJy0tPidcbiAgICB9XG5cbiAgICAvLyBPcGVuIHRhZ1xuICAgIHRhZy5wdXNoKCc8JyArIHRhZ05hbWUpXG4gICAgaWYgKGF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICB0YWcucHVzaCgnICcgKyBhdHRyaWJ1dGVzKVxuICAgIH1cbiAgICBpZiAoc3ZnICYmIENPTlRBSU5FUl9FTEVNRU5UU1t0YWdOYW1lXSAhPT0gdHJ1ZSkge1xuICAgICAgdGFnLnB1c2goJyAvJylcbiAgICB9XG4gICAgdGFnLnB1c2goJz4nKVxuXG4gICAgLy8gQ2xvc2UgdGFnLCBpZiBuZWVkZWRcbiAgICBpZiAoKFZPSURfRUxFTUVOVFNbdGFnTmFtZV0gIT09IHRydWUgJiYgIXN2ZykgfHxcbiAgICAgICAgKHN2ZyAmJiBDT05UQUlORVJfRUxFTUVOVFNbdGFnTmFtZV0gPT09IHRydWUpKSB7XG4gICAgICBpZiAodm5vZGUuZGF0YS5wcm9wcyAmJiB2bm9kZS5kYXRhLnByb3BzLmlubmVySFRNTCkge1xuICAgICAgICB0YWcucHVzaCh2bm9kZS5kYXRhLnByb3BzLmlubmVySFRNTClcbiAgICAgIH0gZWxzZSBpZiAodm5vZGUudGV4dCkge1xuICAgICAgICB0YWcucHVzaChlc2NhcGUodm5vZGUudGV4dCkpXG4gICAgICB9IGVsc2UgaWYgKHZub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgdGFnLnB1c2gocmVuZGVyVG9TdHJpbmcoY2hpbGQpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGFnLnB1c2goJzwvJyArIHRhZ05hbWUgKyAnPicpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRhZy5qb2luKCcnKVxuICB9XG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gZGF0YS5hdHRyc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF0dHJzTW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzIHx8IHt9XG5cbiAgZm9yT3duKGF0dHJzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KGtleSwgZXNjYXBlKHZhbHVlKSlcbiAgfSlcbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIHJlbW92ZSA9IHJlcXVpcmUoJ2xvZGFzaC5yZW1vdmUnKVxudmFyIHVuaXEgPSByZXF1aXJlKCdsb2Rhc2gudW5pcScpXG5cbi8vIGRhdGEuY2xhc3NcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGFzc01vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHZhbHVlc1xuICB2YXIgX2FkZCA9IFtdXG4gIHZhciBfcmVtb3ZlID0gW11cbiAgdmFyIGNsYXNzZXMgPSB2bm9kZS5kYXRhLmNsYXNzIHx8IHt9XG4gIHZhciBleGlzdGluZyA9IGF0dHJpYnV0ZXMuZ2V0KCdjbGFzcycpXG4gIGV4aXN0aW5nID0gZXhpc3RpbmcubGVuZ3RoID4gMCA/IGV4aXN0aW5nLnNwbGl0KCcgJykgOiBbXVxuXG4gIGZvck93bihjbGFzc2VzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgX2FkZC5wdXNoKGtleSlcbiAgICB9IGVsc2Uge1xuICAgICAgX3JlbW92ZS5wdXNoKGtleSlcbiAgICB9XG4gIH0pXG5cbiAgdmFsdWVzID0gcmVtb3ZlKHVuaXEoZXhpc3RpbmcuY29uY2F0KF9hZGQpKSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIF9yZW1vdmUuaW5kZXhPZih2YWx1ZSkgPCAwXG4gIH0pXG5cbiAgaWYgKHZhbHVlcy5sZW5ndGgpIHtcbiAgICBhdHRyaWJ1dGVzLnNldCgnY2xhc3MnLCB2YWx1ZXMuam9pbignICcpKVxuICB9XG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gZGF0YS5kYXRhc2V0XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGF0YXNldE1vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIGRhdGFzZXQgPSB2bm9kZS5kYXRhLmRhdGFzZXQgfHwge31cblxuICBmb3JPd24oZGF0YXNldCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBhdHRyaWJ1dGVzLnNldChgZGF0YS0ke2tleX1gLCBlc2NhcGUodmFsdWUpKVxuICB9KVxufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2xhc3M6IHJlcXVpcmUoJy4vY2xhc3MnKSxcbiAgcHJvcHM6IHJlcXVpcmUoJy4vcHJvcHMnKSxcbiAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gIGRhdGFzZXQ6IHJlcXVpcmUoJy4vZGF0YXNldCcpXG59XG4iLCJcbnZhciBmb3JPd24gPSByZXF1aXJlKCdsb2Rhc2guZm9yb3duJylcbnZhciBlc2NhcGUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlJylcblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL2VsZW1lbnRcbnZhciBvbWl0ID0gW1xuICAnYXR0cmlidXRlcycsXG4gICdjaGlsZEVsZW1lbnRDb3VudCcsXG4gICdjaGlsZHJlbicsXG4gICdjbGFzc0xpc3QnLFxuICAnY2xpZW50SGVpZ2h0JyxcbiAgJ2NsaWVudExlZnQnLFxuICAnY2xpZW50VG9wJyxcbiAgJ2NsaWVudFdpZHRoJyxcbiAgJ2N1cnJlbnRTdHlsZScsXG4gICdmaXJzdEVsZW1lbnRDaGlsZCcsXG4gICdpbm5lckhUTUwnLFxuICAnbGFzdEVsZW1lbnRDaGlsZCcsXG4gICduZXh0RWxlbWVudFNpYmxpbmcnLFxuICAnb25nb3Rwb2ludGVyY2FwdHVyZScsXG4gICdvbmxvc3Rwb2ludGVyY2FwdHVyZScsXG4gICdvbndoZWVsJyxcbiAgJ291dGVySFRNTCcsXG4gICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJyxcbiAgJ3J1bnRpbWVTdHlsZScsXG4gICdzY3JvbGxIZWlnaHQnLFxuICAnc2Nyb2xsTGVmdCcsXG4gICdzY3JvbGxMZWZ0TWF4JyxcbiAgJ3Njcm9sbFRvcCcsXG4gICdzY3JvbGxUb3BNYXgnLFxuICAnc2Nyb2xsV2lkdGgnLFxuICAndGFiU3RvcCcsXG4gICd0YWdOYW1lJ1xuXVxuXG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI2Jvb2xlYW4tYXR0cmlidXRlc1xudmFyIGJvb2xlYW5BdHRyaWJ1dGVzID0gW1xuICAnZGlzYWJsZWQnLFxuICAndmlzaWJsZScsXG4gICdjaGVja2VkJyxcbiAgJ3JlYWRvbmx5JyxcbiAgJ3JlcXVpcmVkJyxcbiAgJ2FsbG93ZnVsbHNjcmVlbicsXG4gICdhdXRvZm9jdXMnLFxuICAnYXV0b3BsYXknLFxuICAnY29tcGFjdCcsXG4gICdjb250cm9scycsXG4gICdkZWZhdWx0JyxcbiAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgJ2hpZGRlbicsXG4gICdpc21hcCcsXG4gICdpdGVtc2NvcGUnLFxuICAnbG9vcCcsXG4gICdtdWx0aXBsZScsXG4gICdtdXRlZCcsXG4gICdub3Jlc2l6ZScsXG4gICdub3NoYWRlJyxcbiAgJ25vdmFsaWRhdGUnLFxuICAnbm93cmFwJyxcbiAgJ29wZW4nLFxuICAncmV2ZXJzZWQnLFxuICAnc2VhbWxlc3MnLFxuICAnc2VsZWN0ZWQnLFxuICAnc29ydGFibGUnLFxuICAndHJ1ZXNwZWVkJyxcbiAgJ3R5cGVtdXN0bWF0Y2gnXG5dXG5cbi8vIGRhdGEucHJvcHNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcm9wc01vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcyB8fCB7fVxuXG4gIGZvck93bihwcm9wcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBpZiAob21pdC5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChrZXkgPT09ICdodG1sRm9yJykge1xuICAgICAga2V5ID0gJ2ZvcidcbiAgICB9XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzTmFtZScpIHtcbiAgICAgIGtleSA9ICdjbGFzcydcbiAgICB9XG5cbiAgICB2YXIgbGtleSA9IGtleS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKH5ib29sZWFuQXR0cmlidXRlcy5pbmRleE9mKGxrZXkpKSB7XG4gICAgICBpZiAodmFsdWUpIHsgLy8gc2V0IGF0dHIgb25seSB3aGVuIHRydXRoeVxuICAgICAgICBhdHRyaWJ1dGVzLnNldChsa2V5LCBsa2V5KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJ1dGVzLnNldChsa2V5LCBlc2NhcGUodmFsdWUpKVxuICAgIH1cbiAgfSlcbn1cbiIsIlxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKVxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxudmFyIGtlYmFiQ2FzZSA9IHJlcXVpcmUoJ2xvZGFzaC5rZWJhYmNhc2UnKVxuXG4vLyBkYXRhLnN0eWxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGVNb2R1bGUgKHZub2RlLCBhdHRyaWJ1dGVzKSB7XG4gIHZhciB2YWx1ZXMgPSBbXVxuICB2YXIgc3R5bGUgPSB2bm9kZS5kYXRhLnN0eWxlIHx8IHt9XG5cbiAgLy8gbWVyZ2UgaW4gYGRlbGF5ZWRgIHByb3BlcnRpZXNcbiAgaWYgKHN0eWxlLmRlbGF5ZWQpIHtcbiAgICBhc3NpZ24oc3R5bGUsIHN0eWxlLmRlbGF5ZWQpXG4gIH1cblxuICBmb3JPd24oc3R5bGUsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgLy8gb21pdCBob29rIG9iamVjdHNcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB2YXIga2ViYWJLZXkgPSBrZWJhYkNhc2Uoa2V5KVxuICAgICAgdmFsdWVzLnB1c2goKGtleS5tYXRjaCgvXi0tLiovKSA/ICctLScgKyBrZWJhYktleSA6IGtlYmFiS2V5KSArICc6ICcgKyBlc2NhcGUodmFsdWUpKVxuICAgIH1cbiAgfSlcblxuICBpZiAodmFsdWVzLmxlbmd0aCkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KCdzdHlsZScsIHZhbHVlcy5qb2luKCc7ICcpKVxuICB9XG59XG4iLCJpbXBvcnQgeyB2bm9kZSB9IGZyb20gJy4vdm5vZGUnO1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnLi9pcyc7XG5mdW5jdGlvbiBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKSB7XG4gICAgZGF0YS5ucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgaWYgKHNlbCAhPT0gJ2ZvcmVpZ25PYmplY3QnICYmIGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkRGF0YSA9IGNoaWxkcmVuW2ldLmRhdGE7XG4gICAgICAgICAgICBpZiAoY2hpbGREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhZGROUyhjaGlsZERhdGEsIGNoaWxkcmVuW2ldLmNoaWxkcmVuLCBjaGlsZHJlbltpXS5zZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGlzLnByaW1pdGl2ZShjaGlsZHJlbltpXSkpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSB2bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgdW5kZWZpbmVkKTtcbn1cbjtcbmV4cG9ydCBkZWZhdWx0IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG59XG5mdW5jdGlvbiByZW1vdmVDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG59XG5mdW5jdGlvbiBuZXh0U2libGluZyhub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG59XG5mdW5jdGlvbiB0YWdOYW1lKGVsbSkge1xuICAgIHJldHVybiBlbG0udGFnTmFtZTtcbn1cbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KG5vZGUsIHRleHQpIHtcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cbmZ1bmN0aW9uIGdldFRleHRDb250ZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudDtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XG59XG5mdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xufVxuZnVuY3Rpb24gaXNDb21tZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gODtcbn1cbmV4cG9ydCB2YXIgaHRtbERvbUFwaSA9IHtcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnROUzogY3JlYXRlRWxlbWVudE5TLFxuICAgIGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcbiAgICBjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuICAgIGluc2VydEJlZm9yZTogaW5zZXJ0QmVmb3JlLFxuICAgIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gICAgcGFyZW50Tm9kZTogcGFyZW50Tm9kZSxcbiAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBzZXRUZXh0Q29udGVudDogc2V0VGV4dENvbnRlbnQsXG4gICAgZ2V0VGV4dENvbnRlbnQ6IGdldFRleHRDb250ZW50LFxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgIGlzVGV4dDogaXNUZXh0LFxuICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxufTtcbmV4cG9ydCBkZWZhdWx0IGh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcCIsImV4cG9ydCB2YXIgYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZXhwb3J0IGZ1bmN0aW9uIHByaW1pdGl2ZShzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcyA9PT0gJ251bWJlcic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy5qcy5tYXAiLCJpbXBvcnQgdm5vZGUgZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBodG1sRG9tQXBpIGZyb20gJy4vaHRtbGRvbWFwaSc7XG5mdW5jdGlvbiBpc1VuZGVmKHMpIHsgcmV0dXJuIHMgPT09IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gaXNEZWYocykgeyByZXR1cm4gcyAhPT0gdW5kZWZpbmVkOyB9XG52YXIgZW1wdHlOb2RlID0gdm5vZGUoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuZnVuY3Rpb24gc2FtZVZub2RlKHZub2RlMSwgdm5vZGUyKSB7XG4gICAgcmV0dXJuIHZub2RlMS5rZXkgPT09IHZub2RlMi5rZXkgJiYgdm5vZGUxLnNlbCA9PT0gdm5vZGUyLnNlbDtcbn1cbmZ1bmN0aW9uIGlzVm5vZGUodm5vZGUpIHtcbiAgICByZXR1cm4gdm5vZGUuc2VsICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeChjaGlsZHJlbiwgYmVnaW5JZHgsIGVuZElkeCkge1xuICAgIHZhciBpLCBtYXAgPSB7fSwga2V5LCBjaDtcbiAgICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgICAgICBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAga2V5ID0gY2gua2V5O1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG1hcFtrZXldID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufVxudmFyIGhvb2tzID0gWydjcmVhdGUnLCAndXBkYXRlJywgJ3JlbW92ZScsICdkZXN0cm95JywgJ3ByZScsICdwb3N0J107XG5leHBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmV4cG9ydCB7IHRodW5rIH0gZnJvbSAnLi90aHVuayc7XG5leHBvcnQgZnVuY3Rpb24gaW5pdChtb2R1bGVzLCBkb21BcGkpIHtcbiAgICB2YXIgaSwgaiwgY2JzID0ge307XG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbERvbUFwaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGhvb2sgPSBtb2R1bGVzW2pdW2hvb2tzW2ldXTtcbiAgICAgICAgICAgIGlmIChob29rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjYnNbaG9va3NbaV1dLnB1c2goaG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlOb2RlQXQoZWxtKSB7XG4gICAgICAgIHZhciBpZCA9IGVsbS5pZCA/ICcjJyArIGVsbS5pZCA6ICcnO1xuICAgICAgICB2YXIgYyA9IGVsbS5jbGFzc05hbWUgPyAnLicgKyBlbG0uY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHJldHVybiB2bm9kZShhcGkudGFnTmFtZShlbG0pLnRvTG93ZXJDYXNlKCkgKyBpZCArIGMsIHt9LCBbXSwgdW5kZWZpbmVkLCBlbG0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVSbUNiKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJtQ2IoKSB7XG4gICAgICAgICAgICBpZiAoLS1saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBhcGkucGFyZW50Tm9kZShjaGlsZEVsbSk7XG4gICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudF8xLCBjaGlsZEVsbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmluaXQpKSB7XG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW4sIHNlbCA9IHZub2RlLnNlbDtcbiAgICAgICAgaWYgKHNlbCA9PT0gJyEnKSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIHZub2RlLnRleHQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVDb21tZW50KHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBQYXJzZSBzZWxlY3RvclxuICAgICAgICAgICAgdmFyIGhhc2hJZHggPSBzZWwuaW5kZXhPZignIycpO1xuICAgICAgICAgICAgdmFyIGRvdElkeCA9IHNlbC5pbmRleE9mKCcuJywgaGFzaElkeCk7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IGhhc2hJZHggPiAwID8gaGFzaElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgZG90ID0gZG90SWR4ID4gMCA/IGRvdElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdGFnID0gaGFzaElkeCAhPT0gLTEgfHwgZG90SWR4ICE9PSAtMSA/IHNlbC5zbGljZSgwLCBNYXRoLm1pbihoYXNoLCBkb3QpKSA6IHNlbDtcbiAgICAgICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBpc0RlZihkYXRhKSAmJiBpc0RlZihpID0gZGF0YS5ucykgPyBhcGkuY3JlYXRlRWxlbWVudE5TKGksIHRhZylcbiAgICAgICAgICAgICAgICA6IGFwaS5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgICAgICBpZiAoaGFzaCA8IGRvdClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdpZCcsIHNlbC5zbGljZShoYXNoICsgMSwgZG90KSk7XG4gICAgICAgICAgICBpZiAoZG90SWR4ID4gMClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdjbGFzcycsIHNlbC5zbGljZShkb3QgKyAxKS5yZXBsYWNlKC9cXC4vZywgJyAnKSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmNyZWF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuY3JlYXRlW2ldKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgICAgICAgICAgIGlmIChpLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkuaW5zZXJ0KVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlLmVsbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpLCBiZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludm9rZURlc3Ryb3lIb29rKHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBqLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5kZXN0cm95W2ldKHZub2RlKTtcbiAgICAgICAgICAgIGlmICh2bm9kZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB2bm9kZS5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gbnVsbCAmJiB0eXBlb2YgaSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBpXzEgPSB2b2lkIDAsIGxpc3RlbmVycyA9IHZvaWQgMCwgcm0gPSB2b2lkIDAsIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKGNoLnNlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBjYnMucmVtb3ZlLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJtID0gY3JlYXRlUm1DYihjaC5lbG0sIGxpc3RlbmVycyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaV8xID0gMDsgaV8xIDwgY2JzLnJlbW92ZS5sZW5ndGg7ICsraV8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2JzLnJlbW92ZVtpXzFdKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZihpXzEgPSBjaC5kYXRhKSAmJiBpc0RlZihpXzEgPSBpXzEuaG9vaykgJiYgaXNEZWYoaV8xID0gaV8xLnJlbW92ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfMShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHsgLy8gVGV4dCBub2RlXG4gICAgICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRFbG0sIGNoLmVsbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKHBhcmVudEVsbSwgb2xkQ2gsIG5ld0NoLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIG9sZFN0YXJ0SWR4ID0gMCwgbmV3U3RhcnRJZHggPSAwO1xuICAgICAgICB2YXIgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFswXTtcbiAgICAgICAgdmFyIG9sZEVuZFZub2RlID0gb2xkQ2hbb2xkRW5kSWR4XTtcbiAgICAgICAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBuZXdTdGFydFZub2RlID0gbmV3Q2hbMF07XG4gICAgICAgIHZhciBuZXdFbmRWbm9kZSA9IG5ld0NoW25ld0VuZElkeF07XG4gICAgICAgIHZhciBvbGRLZXlUb0lkeDtcbiAgICAgICAgdmFyIGlkeEluT2xkO1xuICAgICAgICB2YXIgZWxtVG9Nb3ZlO1xuICAgICAgICB2YXIgYmVmb3JlO1xuICAgICAgICB3aGlsZSAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4ICYmIG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgbWlnaHQgaGF2ZSBiZWVuIG1vdmVkIGxlZnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZEVuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld1N0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld0VuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgcmlnaHRcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBvbGRTdGFydFZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgbGVmdFxuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGRLZXlUb0lkeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHhJbk9sZCA9IG9sZEtleVRvSWR4W25ld1N0YXJ0Vm5vZGUua2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZihpZHhJbk9sZCkpIHsgLy8gTmV3IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbVRvTW92ZS5zZWwgIT09IG5ld1N0YXJ0Vm5vZGUuc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUoZWxtVG9Nb3ZlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGVsbVRvTW92ZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggfHwgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRJZHggPiBvbGRFbmRJZHgpIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXdDaFtuZXdFbmRJZHggKyAxXSA9PSBudWxsID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGhvb2s7XG4gICAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YSkgJiYgaXNEZWYoaG9vayA9IGkuaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucHJlcGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHZhciBjaCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAob2xkVm5vZGUgPT09IHZub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodm5vZGUuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rO1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkpICYmIGlzRGVmKGkgPSBpLnVwZGF0ZSkpXG4gICAgICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpICYmIGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRDaCAhPT0gY2gpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkcmVuKGVsbSwgb2xkQ2gsIGNoLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKVxuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmKGhvb2spICYmIGlzRGVmKGkgPSBob29rLnBvc3RwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGF0Y2gob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBlbG0sIHBhcmVudDtcbiAgICAgICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnByZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wcmVbaV0oKTtcbiAgICAgICAgaWYgKCFpc1Zub2RlKG9sZFZub2RlKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgICAgIHBhcmVudCA9IGFwaS5wYXJlbnROb2RlKGVsbSk7XG4gICAgICAgICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnQsIHZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKGVsbSkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnQsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRlZFZub2RlUXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KGluc2VydGVkVm5vZGVRdWV1ZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wb3N0Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnBvc3RbaV0oKTtcbiAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zbmFiYmRvbS5qcy5tYXAiLCJpbXBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmZ1bmN0aW9uIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuaykge1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbiAgICB2bm9kZS5kYXRhLmZuID0gdGh1bmsuZGF0YS5mbjtcbiAgICB2bm9kZS5kYXRhLmFyZ3MgPSB0aHVuay5kYXRhLmFyZ3M7XG4gICAgdGh1bmsuZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdGh1bmsuY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICB0aHVuay50ZXh0ID0gdm5vZGUudGV4dDtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG59XG5mdW5jdGlvbiBpbml0KHRodW5rKSB7XG4gICAgdmFyIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIHZub2RlID0gY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgY3VyLmFyZ3MpO1xuICAgIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuayk7XG59XG5mdW5jdGlvbiBwcmVwYXRjaChvbGRWbm9kZSwgdGh1bmspIHtcbiAgICB2YXIgaSwgb2xkID0gb2xkVm5vZGUuZGF0YSwgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgb2xkQXJncyA9IG9sZC5hcmdzLCBhcmdzID0gY3VyLmFyZ3M7XG4gICAgaWYgKG9sZC5mbiAhPT0gY3VyLmZuIHx8IG9sZEFyZ3MubGVuZ3RoICE9PSBhcmdzLmxlbmd0aCkge1xuICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvbGRBcmdzW2ldICE9PSBhcmdzW2ldKSB7XG4gICAgICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvcHlUb1RodW5rKG9sZFZub2RlLCB0aHVuayk7XG59XG5leHBvcnQgdmFyIHRodW5rID0gZnVuY3Rpb24gdGh1bmsoc2VsLCBrZXksIGZuLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcmdzID0gZm47XG4gICAgICAgIGZuID0ga2V5O1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBoKHNlbCwge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgaG9vazogeyBpbml0OiBpbml0LCBwcmVwYXRjaDogcHJlcGF0Y2ggfSxcbiAgICAgICAgZm46IGZuLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgdGh1bms7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHVuay5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0IGRlZmF1bHQgdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZVByb3BzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBrZXksIGN1ciwgb2xkLCBlbG0gPSB2bm9kZS5lbG0sIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5wcm9wcywgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzO1xuICAgIGlmICghb2xkUHJvcHMgJiYgIXByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZFByb3BzID09PSBwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZFByb3BzID0gb2xkUHJvcHMgfHwge307XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgICAgICBpZiAoIXByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbG1ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICBjdXIgPSBwcm9wc1trZXldO1xuICAgICAgICBvbGQgPSBvbGRQcm9wc1trZXldO1xuICAgICAgICBpZiAob2xkICE9PSBjdXIgJiYgKGtleSAhPT0gJ3ZhbHVlJyB8fCBlbG1ba2V5XSAhPT0gY3VyKSkge1xuICAgICAgICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnByb3BzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZVByb3BzLCB1cGRhdGU6IHVwZGF0ZVByb3BzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnByb3BzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcHMuanMubWFwIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb2RlOiBcInByb2R1Y3Rpb25cIlxyXG59IiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiXHJcbmltcG9ydCB7IFF1aWNrUm91dGVyLCBjcmVhdGVQb3BTdGF0ZSB9IGZyb20gXCJxdWlja2pzLXJvdXRlclwiO1xyXG5jb25zdCByb3V0ZXIgPSBuZXcgUXVpY2tSb3V0ZXI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4uLy4uL3NyYy92aWV3cy9BcHBcIlxyXG5pbXBvcnQgQWJvdXQgZnJvbSBcIi4uLy4uL3NyYy92aWV3cy9BYm91dFwiXHJcbmltcG9ydCBOb3RGb3VuZCBmcm9tIFwiLi4vLi4vc3JjL3ZpZXdzL05vdGZvdW5kXCJcclxuY29uc3QgIHJvdXRlcyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnLycsXHJcbiAgICAgICAgdmlldzogQXBwLFxyXG4gICAgICAgIHRpdGxlOiBcIkhvbWVcIixcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJy9hYm91dCcsXHJcbiAgICAgICAgdGl0bGU6IFwiQWJvdXRcIixcclxuICAgICAgICB2aWV3OiBBYm91dFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnL2Vycm9yJyxcclxuICAgICAgICB2aWV3OiBOb3RGb3VuZCxcclxuICAgICAgICB0aXRsZTogXCJQYWdlIE5vdCBGb3VuZFwiLFxyXG4gICAgfSxcclxuXTtcclxuXHJcblF1aWNrLnVzZShyb3V0ZXIudXNlUm91dGUocm91dGVzKSk7XHJcbnJvdXRlci5jcmVhdGVOYXZpZ2F0aW9uKHJvdXRlcylcclxuY3JlYXRlUG9wU3RhdGUocm91dGVzKVxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXMiLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCJcclxuXHJcblxyXG5jb25zdCBBYm91dERldGFpbCA9IFwiUXVpY2suanMgaXMgYSBjb25maWd1cmVkIHNlcnZlciBzaWRlICBzaW5nbGUgcGFnZSBhcHBsaWNhdGlvbiB0aGF0IGxldHMgeW91IGNyZWF0ZSB5b3VyIG93biBzZXZlciBzaWRlIGFwcGxpY2F0aW9uIGluIG5vIHRpbWUuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFib3V0IGV4dGVuZHMgUXVpY2suQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIHN1cGVyKHBhcmFtcylcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uIGFib3V0LWNvbiB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPkhvbWU8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnktbm9ybWFsIHVuZGVybGluZSBhY3RpdmVcIiB0bz1cIi9hYm91dFwiPkFib3V0PC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvIG10LTEwIHctMTAgcC0xIG1heC13LW1kIGJsb2NrIG1sLWF1dG8gbXItYXV0byBhbmltYXRlLWJvdW5jZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicXVpY2stbG9nbyB3LThcIiBzcmM9XCJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9zZXJ2ZXJ5Z3VrZW4vaW1hZ2UvdXBsb2FkL3YxNjE1MTg4OTkyL1F1aWNrSlMvbG9nby9xdWlja2pzLWxvZ29fd2p4M2R3LnN2Z1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYm91dC1wYWdlIHRleHQtY2VudGVyIG10LTUgdGV4dC0zeGwgdGV4dC1ibGFjayBmb250LWJvbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgcC0xIHdjLXR4dFwiPkFib3V0IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeS1ub3JtYWxcIj5RdWljay5qczwvc3Bhbj4gPC9oMT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWwgcC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm10LTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge0Fib3V0RGV0YWlsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm10LTYgZm9udC1ib2xkXCI+RWNvc3lzdGVtIHwgRXh0ZXJuYWwgbGlua3M8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48cXVpY2stcm91dGVyLWxpbmsgdG89XCIvXCIgY2xhc3NOYW1lPVwibXItMyB1bmRlcmxpbmVcIj5RdWlja2pzLWNvbXBvbmVudDwvcXVpY2stcm91dGVyLWxpbms+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPlF1aWNranMtcm91dGVyPC9xdWljay1yb3V0ZXItbGluaz48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+UXVpY2tqcy1kb208L3F1aWNrLXJvdXRlci1saW5rPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCJcclxuaW1wb3J0IFdlbGNvbWUgZnJvbSBcIi4vV2VsY29tZVwiO1xyXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9MaXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUXVpY2suQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIHN1cGVyKHBhcmFtcylcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJtci0zIHRleHQtcHJpbWFyeS1ub3JtYWwgdW5kZXJsaW5lIGFjdGl2ZVwiPkhvbWU8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9hYm91dFwiIGNsYXNzTmFtZT1cInVuZGVybGluZVwiPkFib3V0PC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvIG10LTEwIHctMTAgcC0xIG1heC13LW1kIGJsb2NrIG1sLWF1dG8gbXItYXV0byBhbmltYXRlLWJvdW5jZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicXVpY2stbG9nbyB3LThcIiBzcmM9XCJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9zZXJ2ZXJ5Z3VrZW4vaW1hZ2UvdXBsb2FkL3YxNjE1MTg4OTkyL1F1aWNrSlMvbG9nby9xdWlja2pzLWxvZ29fd2p4M2R3LnN2Z1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWxjb21lIHRleHQtY2VudGVyIG10LTUgdGV4dC0zeGwgdGV4dC1ibGFjayBmb250LWJvbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8V2VsY29tZSBuYW1lPXtcIlF1aWNrLmpzXCJ9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjIG10LTYgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQ+R2V0IHN0YXJ0ZWQgYnkgZWRpdGluZyA8c3BhbiBjbGFzc05hbWU9XCJiZy1zbm93IHRleHQtc20gZm9udC1tZWRpdW0gcC0yXCI+c3JjL3ZpZXdzL0FwcC5qczwvc3Bhbj48L2g0PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCI7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIExpc3QoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1tYWluXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LWNvbiBtdC0xMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtMSBmbGV4IGp1c3RpZnktYXJvdW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Qgcm91bmRlZCBzaGFkb3ctc20gcC0yIHctNS8xMiBjdXJzb3ItcG9pbnRlciBtYXgtdy1tZCAgYm9yZGVyICAgYm9yZGVyLWdyYXktMjAwIG10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGkgY2xhc3NOYW1lPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtYmxhY2sgZmxleCBpdGVtcy1jZW50ZXIgbXQtMlwiPkRvY3VtZW50YXRpb24gPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5DaGVjayBvdXQgZG9jdW1lbnRhdGlvbiBvbiBob3cgdG8gZ2V0IHN0YXJ0ZWQgYW5kIHNldHVwIHlvdXIgcHJvamVjdCB3aXRoIFF1aWNrLmpzLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0IHJvdW5kZWQgc2hhZG93LXNtIHAtMiB3LTUvMTIgY3Vyc29yLXBvaW50ZXIgbWF4LXctbWQgYm9yZGVyICBib3JkZXItZ3JheS0yMDAgbXQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ibGFjayBmbGV4IGl0ZW1zLWNlbnRlciBtdC0yXCI+TGVhcm4gPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5MZWFybiBhYm91dCBRdWljay5qcyBhbmQgaXQncyBlY29zeXN0ZW0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtMiBmbGV4IGp1c3RpZnktYXJvdW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Qgcm91bmRlZCBzaGFkb3ctc20gcC0yIHctNS8xMiBjdXJzb3ItcG9pbnRlciBtYXgtdy1tZCBib3JkZXIgYm9yZGVyLWdyYXktMjAwICBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIG10LTJcIj5FeGFtcGxlcyA8c3BhbiBjbGFzc05hbWU9XCJtbC0yXCI+PHN2ZyBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIHctNiAtbWItMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTE0IDVsNyA3bTAgMGwtNyA3bTctN0gzXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+PC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIGZvbnQtbWVkaXVtIG10LTIgbWItM1wiPkNoZWNrIG91dCBvbiBwcm9qZWN0cyBjcmVhdGVkIHdpdGggUXVpY2suanM8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdCByb3VuZGVkIHNoYWRvdy1zbSBwLTIgdy01LzEyIG1heC13LW1kIGJvcmRlciBjdXJzb3ItcG9pbnRlciAgYm9yZGVyLWdyYXktMjAwICBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIG10LTJcIj5EZXBsb3kgPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5XZSdsbCBzaG93IHlvdSBob3cgdG8gZGVwbG95IHlvdXIgUXVpY2suanMgYXBwbGljYXRpb24gdG8gcHJvZHVjdGlvbi48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdFxyXG5cclxuIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBRdWljay5Db21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFib3V0LXBhZ2UgdGV4dC1jZW50ZXIgbXQtMTAgdGV4dC0zeGwgdGV4dC1ibGFjayBmb250LWJvbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgcC0xIHdjLXR4dFwiPjQwNCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnktbm9ybWFsXCI+Tk9UIEZPVU5EPC9zcGFuPiA8L2gxPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEwIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+SG9tZTwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeS1ub3JtYWwgdW5kZXJsaW5lIGFjdGl2ZVwiIHRvPVwiL2Fib3V0XCI+QWJvdXQ8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiLy8gUXVpY2sgbmVlZHMgdG8gYmUgaW5pdGFpbGl6ZWQgdG8gdXNlIGpzeFxyXG5pbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCI7XHJcblxyXG5cclxuY29uc3QgV2VsY29tZSA9ICh7IG5hbWUgfSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8aDEgY2xhc3NOYW1lPSBcInRleHQtNXhsIHAtMSB3Yy10eHRcIiA+V2VsY29tZSA8IHNwYW4gY2xhc3NOYW1lID0gXCJ0ZXh0LXByaW1hcnktbm9ybWFsXCIgPiB7IG5hbWUgfSEgPC9zcGFuPjwvaDE+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlbGNvbWUiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCI7XHJcbmltcG9ydCByb3V0ZXMgZnJvbSBcIi4uL3NyYy9yb3V0ZXIvcm91dGVzXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL3F1aWNrLmNvbmZpZ1wiO1xyXG5cclxuaWYoY29uZmlnLm1vZGUgPT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMV0ucmVtb3ZlKCk7XHJcbiAgICBjb25zb2xlLmVycm9yID0gZnVuY3Rpb24oKXt9XHJcbiAgIH0sMClcclxufSJdLCJzb3VyY2VSb290IjoiIn0=