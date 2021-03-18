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
/* harmony import */ var _views_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/App */ "./src/views/App.js");
/* harmony import */ var _views_About__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/About */ "./src/views/About.js");
/* harmony import */ var _views_Notfound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../views/Notfound */ "./src/views/Notfound.js");


const router = new quickjs_router__WEBPACK_IMPORTED_MODULE_1__.QuickRouter();



const routes = [{
  path: '/',
  view: _views_App__WEBPACK_IMPORTED_MODULE_2__.default,
  title: "Home"
}, {
  path: '/about',
  title: "About",
  view: _views_About__WEBPACK_IMPORTED_MODULE_3__.default
}, {
  path: '/error',
  view: _views_Notfound__WEBPACK_IMPORTED_MODULE_4__.default,
  title: "Page Not Found"
}];
quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.runBeforeDomLoaded(router.useRoute(routes));
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
    }, quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("h4", null, "Get g started by editing ", quickjs_component__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2Jyb3dzZXItc3BsaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmZvcm93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZWJhYmNhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVtb3ZlL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcGFyc2Utc2VsL2luZGV4LmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvcXVpY2stZXJyb3IvcXVpY2stZXJyb3IuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLWNvbXBvbmVudC9saWIvcXVpY2suanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9xdWlja2pzLXJvdXRlci9saWIvcXVpY2stcm91dGVyLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvaW5pdC5qcyIsIndlYnBhY2s6Ly9xdWlja2pzLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tLXRvLWh0bWwvbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9ub2RlX21vZHVsZXMvc25hYmJkb20tdG8taHRtbC9tb2R1bGVzL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS10by1odG1sL21vZHVsZXMvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uLi9zcmMvaC50cyIsIndlYnBhY2s6Ly9xdWlja2pzLy4uL3NyYy9odG1sZG9tYXBpLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL2lzLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3NuYWJiZG9tLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3RodW5rLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL3Zub2RlLnRzIiwid2VicGFjazovL3F1aWNranMvLi4vc3JjL21vZHVsZXMvcHJvcHMudHMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy9yb3V0ZXIvcm91dGVzLmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvQWJvdXQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9BcHAuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9MaXN0LmpzIiwid2VicGFjazovL3F1aWNranMvLi9zcmMvdmlld3MvTm90Zm91bmQuanMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy8uL3NyYy92aWV3cy9XZWxjb21lLmpzIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3F1aWNranMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9xdWlja2pzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcXVpY2tqcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL3F1aWNranMvLi9wdWJsaWMvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInNwbGl0IiwidW5kZWYiLCJuYXRpdmVTcGxpdCIsIlN0cmluZyIsInByb3RvdHlwZSIsImNvbXBsaWFudEV4ZWNOcGNnIiwiZXhlYyIsInNlbGYiLCJzdHIiLCJzZXBhcmF0b3IiLCJsaW1pdCIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsIm91dHB1dCIsImZsYWdzIiwiaWdub3JlQ2FzZSIsIm11bHRpbGluZSIsImV4dGVuZGVkIiwic3RpY2t5IiwibGFzdExhc3RJbmRleCIsIlJlZ0V4cCIsInNvdXJjZSIsInNlcGFyYXRvcjIiLCJtYXRjaCIsImxhc3RJbmRleCIsImxhc3RMZW5ndGgiLCJpbmRleCIsImxlbmd0aCIsInB1c2giLCJzbGljZSIsInJlcGxhY2UiLCJpIiwiYXJndW1lbnRzIiwiQXJyYXkiLCJhcHBseSIsInRlc3QiLCJJTkZJTklUWSIsInN5bWJvbFRhZyIsInJlVW5lc2NhcGVkSHRtbCIsInJlSGFzVW5lc2NhcGVkSHRtbCIsImh0bWxFc2NhcGVzIiwiZnJlZUdsb2JhbCIsImdsb2JhbCIsImZyZWVTZWxmIiwicm9vdCIsIkZ1bmN0aW9uIiwiYmFzZVByb3BlcnR5T2YiLCJvYmplY3QiLCJrZXkiLCJ1bmRlZmluZWQiLCJlc2NhcGVIdG1sQ2hhciIsIm9iamVjdFByb3RvIiwib2JqZWN0VG9TdHJpbmciLCJTeW1ib2wiLCJzeW1ib2xQcm90byIsInN5bWJvbFRvU3RyaW5nIiwiYmFzZVRvU3RyaW5nIiwidmFsdWUiLCJpc1N5bWJvbCIsInJlc3VsdCIsImlzT2JqZWN0TGlrZSIsImVzY2FwZSIsInN0cmluZyIsIk1BWF9TQUZFX0lOVEVHRVIiLCJhcmdzVGFnIiwiZnVuY1RhZyIsImdlblRhZyIsInJlSXNVaW50IiwiYmFzZVRpbWVzIiwibiIsIml0ZXJhdGVlIiwib3ZlckFyZyIsImZ1bmMiLCJ0cmFuc2Zvcm0iLCJhcmciLCJoYXNPd25Qcm9wZXJ0eSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwibmF0aXZlS2V5cyIsImtleXMiLCJhcnJheUxpa2VLZXlzIiwiaW5oZXJpdGVkIiwiaXNBcnJheSIsImlzQXJndW1lbnRzIiwic2tpcEluZGV4ZXMiLCJpc0luZGV4IiwiYmFzZUZvciIsImNyZWF0ZUJhc2VGb3IiLCJiYXNlRm9yT3duIiwiYmFzZUtleXMiLCJpc1Byb3RvdHlwZSIsImZyb21SaWdodCIsImtleXNGdW5jIiwiaXRlcmFibGUiLCJwcm9wcyIsIkN0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvIiwiaXNBcnJheUxpa2VPYmplY3QiLCJpc0FycmF5TGlrZSIsImlzTGVuZ3RoIiwiaXNGdW5jdGlvbiIsInRhZyIsImlzT2JqZWN0IiwidHlwZSIsImZvck93biIsImlkZW50aXR5IiwicmVBc2NpaVdvcmQiLCJyZUxhdGluIiwicnNBc3RyYWxSYW5nZSIsInJzQ29tYm9NYXJrc1JhbmdlIiwicnNDb21ib1N5bWJvbHNSYW5nZSIsInJzRGluZ2JhdFJhbmdlIiwicnNMb3dlclJhbmdlIiwicnNNYXRoT3BSYW5nZSIsInJzTm9uQ2hhclJhbmdlIiwicnNQdW5jdHVhdGlvblJhbmdlIiwicnNTcGFjZVJhbmdlIiwicnNVcHBlclJhbmdlIiwicnNWYXJSYW5nZSIsInJzQnJlYWtSYW5nZSIsInJzQXBvcyIsInJzQnJlYWsiLCJyc0NvbWJvIiwicnNEaWdpdHMiLCJyc0RpbmdiYXQiLCJyc0xvd2VyIiwicnNNaXNjIiwicnNGaXR6IiwicnNNb2RpZmllciIsInJzTm9uQXN0cmFsIiwicnNSZWdpb25hbCIsInJzU3VyclBhaXIiLCJyc1VwcGVyIiwicnNaV0oiLCJyc0xvd2VyTWlzYyIsInJzVXBwZXJNaXNjIiwicnNPcHRMb3dlckNvbnRyIiwicnNPcHRVcHBlckNvbnRyIiwicmVPcHRNb2QiLCJyc09wdFZhciIsInJzT3B0Sm9pbiIsImpvaW4iLCJyc1NlcSIsInJzRW1vamkiLCJyZUFwb3MiLCJyZUNvbWJvTWFyayIsInJlVW5pY29kZVdvcmQiLCJyZUhhc1VuaWNvZGVXb3JkIiwiZGVidXJyZWRMZXR0ZXJzIiwiYXJyYXlSZWR1Y2UiLCJhcnJheSIsImFjY3VtdWxhdG9yIiwiaW5pdEFjY3VtIiwiYXNjaWlXb3JkcyIsImRlYnVyckxldHRlciIsImhhc1VuaWNvZGVXb3JkIiwidW5pY29kZVdvcmRzIiwiY3JlYXRlQ29tcG91bmRlciIsImNhbGxiYWNrIiwid29yZHMiLCJkZWJ1cnIiLCJrZWJhYkNhc2UiLCJ3b3JkIiwidG9Mb3dlckNhc2UiLCJwYXR0ZXJuIiwiZ3VhcmQiLCJMQVJHRV9BUlJBWV9TSVpFIiwiRlVOQ19FUlJPUl9URVhUIiwiSEFTSF9VTkRFRklORUQiLCJVTk9SREVSRURfQ09NUEFSRV9GTEFHIiwiUEFSVElBTF9DT01QQVJFX0ZMQUciLCJhcnJheVRhZyIsImJvb2xUYWciLCJkYXRlVGFnIiwiZXJyb3JUYWciLCJtYXBUYWciLCJudW1iZXJUYWciLCJvYmplY3RUYWciLCJwcm9taXNlVGFnIiwicmVnZXhwVGFnIiwic2V0VGFnIiwic3RyaW5nVGFnIiwid2Vha01hcFRhZyIsImFycmF5QnVmZmVyVGFnIiwiZGF0YVZpZXdUYWciLCJmbG9hdDMyVGFnIiwiZmxvYXQ2NFRhZyIsImludDhUYWciLCJpbnQxNlRhZyIsImludDMyVGFnIiwidWludDhUYWciLCJ1aW50OENsYW1wZWRUYWciLCJ1aW50MTZUYWciLCJ1aW50MzJUYWciLCJyZUlzRGVlcFByb3AiLCJyZUlzUGxhaW5Qcm9wIiwicmVMZWFkaW5nRG90IiwicmVQcm9wTmFtZSIsInJlUmVnRXhwQ2hhciIsInJlRXNjYXBlQ2hhciIsInJlSXNIb3N0Q3RvciIsInR5cGVkQXJyYXlUYWdzIiwiZnJlZUV4cG9ydHMiLCJub2RlVHlwZSIsImZyZWVNb2R1bGUiLCJtb2R1bGVFeHBvcnRzIiwiZnJlZVByb2Nlc3MiLCJwcm9jZXNzIiwibm9kZVV0aWwiLCJiaW5kaW5nIiwiZSIsIm5vZGVJc1R5cGVkQXJyYXkiLCJpc1R5cGVkQXJyYXkiLCJhcnJheVNvbWUiLCJwcmVkaWNhdGUiLCJiYXNlUHJvcGVydHkiLCJiYXNlVW5hcnkiLCJnZXRWYWx1ZSIsImlzSG9zdE9iamVjdCIsIm1hcFRvQXJyYXkiLCJtYXAiLCJzaXplIiwiZm9yRWFjaCIsInNldFRvQXJyYXkiLCJzZXQiLCJhcnJheVByb3RvIiwiZnVuY1Byb3RvIiwiY29yZUpzRGF0YSIsIm1hc2tTcmNLZXkiLCJ1aWQiLCJJRV9QUk9UTyIsImZ1bmNUb1N0cmluZyIsInJlSXNOYXRpdmUiLCJVaW50OEFycmF5Iiwic3BsaWNlIiwiRGF0YVZpZXciLCJnZXROYXRpdmUiLCJNYXAiLCJQcm9taXNlIiwiU2V0IiwiV2Vha01hcCIsIm5hdGl2ZUNyZWF0ZSIsImRhdGFWaWV3Q3RvclN0cmluZyIsInRvU291cmNlIiwibWFwQ3RvclN0cmluZyIsInByb21pc2VDdG9yU3RyaW5nIiwic2V0Q3RvclN0cmluZyIsIndlYWtNYXBDdG9yU3RyaW5nIiwic3ltYm9sVmFsdWVPZiIsInZhbHVlT2YiLCJIYXNoIiwiZW50cmllcyIsImNsZWFyIiwiZW50cnkiLCJoYXNoQ2xlYXIiLCJfX2RhdGFfXyIsImhhc2hEZWxldGUiLCJoYXMiLCJoYXNoR2V0IiwiZGF0YSIsImhhc2hIYXMiLCJoYXNoU2V0IiwiZ2V0IiwiTGlzdENhY2hlIiwibGlzdENhY2hlQ2xlYXIiLCJsaXN0Q2FjaGVEZWxldGUiLCJhc3NvY0luZGV4T2YiLCJwb3AiLCJsaXN0Q2FjaGVHZXQiLCJsaXN0Q2FjaGVIYXMiLCJsaXN0Q2FjaGVTZXQiLCJNYXBDYWNoZSIsIm1hcENhY2hlQ2xlYXIiLCJtYXBDYWNoZURlbGV0ZSIsImdldE1hcERhdGEiLCJtYXBDYWNoZUdldCIsIm1hcENhY2hlSGFzIiwibWFwQ2FjaGVTZXQiLCJTZXRDYWNoZSIsInZhbHVlcyIsImFkZCIsInNldENhY2hlQWRkIiwic2V0Q2FjaGVIYXMiLCJTdGFjayIsInN0YWNrQ2xlYXIiLCJzdGFja0RlbGV0ZSIsInN0YWNrR2V0Iiwic3RhY2tIYXMiLCJzdGFja1NldCIsImNhY2hlIiwicGFpcnMiLCJlcSIsImJhc2VHZXQiLCJwYXRoIiwiaXNLZXkiLCJjYXN0UGF0aCIsInRvS2V5IiwiYmFzZUdldFRhZyIsImJhc2VIYXNJbiIsImJhc2VJc0VxdWFsIiwib3RoZXIiLCJjdXN0b21pemVyIiwiYml0bWFzayIsInN0YWNrIiwiYmFzZUlzRXF1YWxEZWVwIiwiZXF1YWxGdW5jIiwib2JqSXNBcnIiLCJvdGhJc0FyciIsIm9ialRhZyIsIm90aFRhZyIsImdldFRhZyIsIm9iaklzT2JqIiwib3RoSXNPYmoiLCJpc1NhbWVUYWciLCJlcXVhbEFycmF5cyIsImVxdWFsQnlUYWciLCJvYmpJc1dyYXBwZWQiLCJvdGhJc1dyYXBwZWQiLCJvYmpVbndyYXBwZWQiLCJvdGhVbndyYXBwZWQiLCJlcXVhbE9iamVjdHMiLCJiYXNlSXNNYXRjaCIsIm1hdGNoRGF0YSIsIm5vQ3VzdG9taXplciIsIm9ialZhbHVlIiwic3JjVmFsdWUiLCJiYXNlSXNOYXRpdmUiLCJpc01hc2tlZCIsImJhc2VJc1R5cGVkQXJyYXkiLCJiYXNlSXRlcmF0ZWUiLCJiYXNlTWF0Y2hlc1Byb3BlcnR5IiwiYmFzZU1hdGNoZXMiLCJwcm9wZXJ0eSIsImdldE1hdGNoRGF0YSIsIm1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIiwiaXNTdHJpY3RDb21wYXJhYmxlIiwiaGFzSW4iLCJiYXNlUHJvcGVydHlEZWVwIiwiYmFzZVB1bGxBdCIsImluZGV4ZXMiLCJwcmV2aW91cyIsInBhcmVudCIsImxhc3QiLCJiYXNlU2xpY2UiLCJzdGFydCIsImVuZCIsInN0cmluZ1RvUGF0aCIsImlzUGFydGlhbCIsImFyckxlbmd0aCIsIm90aExlbmd0aCIsInN0YWNrZWQiLCJzZWVuIiwiYXJyVmFsdWUiLCJvdGhWYWx1ZSIsImNvbXBhcmVkIiwib3RoSW5kZXgiLCJieXRlTGVuZ3RoIiwiYnl0ZU9mZnNldCIsImJ1ZmZlciIsIm5hbWUiLCJtZXNzYWdlIiwiY29udmVydCIsIm9ialByb3BzIiwib2JqTGVuZ3RoIiwib3RoUHJvcHMiLCJza2lwQ3RvciIsIm9iakN0b3IiLCJvdGhDdG9yIiwiaXNLZXlhYmxlIiwiQXJyYXlCdWZmZXIiLCJyZXNvbHZlIiwiY3RvclN0cmluZyIsImhhc1BhdGgiLCJoYXNGdW5jIiwibWVtb2l6ZSIsIm51bWJlciIsInF1b3RlIiwicmVtb3ZlIiwicmVzb2x2ZXIiLCJUeXBlRXJyb3IiLCJtZW1vaXplZCIsImFyZ3MiLCJDYWNoZSIsImRlZmF1bHRWYWx1ZSIsImFycmF5SW5jbHVkZXMiLCJiYXNlSW5kZXhPZiIsImFycmF5SW5jbHVkZXNXaXRoIiwiY29tcGFyYXRvciIsImJhc2VGaW5kSW5kZXgiLCJmcm9tSW5kZXgiLCJiYXNlSXNOYU4iLCJjYWNoZUhhcyIsImJhc2VVbmlxIiwiaW5jbHVkZXMiLCJpc0NvbW1vbiIsImNyZWF0ZVNldCIsIm91dGVyIiwiY29tcHV0ZWQiLCJzZWVuSW5kZXgiLCJub29wIiwidW5pcSIsImdldE93blByb3BlcnR5U3ltYm9scyIsInByb3BJc0VudW1lcmFibGUiLCJ0b09iamVjdCIsInZhbCIsInNob3VsZFVzZU5hdGl2ZSIsImFzc2lnbiIsInRlc3QxIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInRlc3QyIiwiZnJvbUNoYXJDb2RlIiwib3JkZXIyIiwidGVzdDMiLCJsZXR0ZXIiLCJlcnIiLCJ0YXJnZXQiLCJmcm9tIiwidG8iLCJzeW1ib2xzIiwicyIsInJlcXVpcmUiLCJjbGFzc0lkU3BsaXQiLCJub3RDbGFzc0lkIiwicGFyc2VTZWxlY3RvciIsInNlbGVjdG9yIiwidXBwZXIiLCJ0YWdOYW1lIiwiaWQiLCJjbGFzc2VzIiwidGFnUGFydHMiLCJwYXJ0IiwiY2hhckF0Iiwic3Vic3RyaW5nIiwidG9VcHBlckNhc2UiLCJjbGFzc05hbWUiLCJjaGVja0ZvckVycm9yIiwiRXJyb3IiLCJlcnJvciIsImlzRXJyb3IiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwicXVpY2tfZXJyb3JfMSIsInNuYWJiZG9tIiwicHJvcHNfMSIsInJlY29uY2lsZSIsImluaXQiLCJkZWZhdWx0Iiwic25hYmJkb21fMSIsIm1vZHVsZXMiLCJ0b0hUTUwiLCJjbGFzcyIsImF0dHJpYnV0ZXMiLCJzdHlsZSIsIkRlcCIsInN1YnNjcmliZXJzIiwiZGVwZW5kIiwiYWN0aXZlRWZmZWN0Iiwibm90aWZ5Iiwic3ViIiwiQ29tcG9uZW50IiwicGFyYW1zIiwidCIsImNvbXBvbmVudERpZE1vdW50Iiwic2V0U3RhdGUiLCJwYXJ0aWFsU3RhdGUiLCJfdGhpcyIsInN0YXRlIiwiUXVpY2siLCJfX3VwZGF0ZXIiLCJyZW5kZXIiLCJlbCIsInIiLCJfcHQiLCJpc1F1aWNrQ2xhc3NDb21wb25lbnQiLCJjb21wb25lbnQiLCJfaW5pdCIsImZhdiIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwicmVsIiwiaCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiJCIsInF1ZXJ5U2VsZWN0b3IiLCJjb21wb25lbnRMb2FkZWQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsImxpc3RlbmVyIiwiZm4iLCJwcmV2ZW50IiwicnVuQmVmb3JlRG9tTG9hZGVkIiwidmlldyIsInJlbmRlclZpZXd0b0hUTUwiLCJjaGlsZHJlbiIsImZsYXQiLCJpc1FuZFJlYWN0Q2xhc3NDb21wb25lbnQiLCJjb21wb25lbnRJbnN0YW5jZSIsImRhdGFQcm9wcyIsImV2ZW50UHJvcHMiLCJwcm9wS2V5Iiwic3RhcnRzV2l0aCIsImV2ZW50IiwiaW5zdGFuY2UiLCJjb25maWciLCJlbnYiLCJxdWlja2pzX2NvbXBvbmVudF8xIiwicGF0aFRvUmVnZXgiLCJnZXRQYXJhbXMiLCJyb3V0ZSIsIm1hdGNoQWxsIiwiUXVpY2tSb3V0ZXIiLCJ1c2VSb3V0ZSIsInJvdXRlcyIsInVybCIsIm1hdGNoZXMiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiZmluZE1hdGNoIiwiZmluZCIsInNldFRpdGxlIiwidGl0bGUiLCJnZXRSb3V0ZSIsInJlZmVycmVyIiwibmV4dCIsImZ1bGxQYXRoIiwiY3JlYXRlTmF2aWdhdGlvbiIsIndpbmRvdyIsInByZXZlbnREZWZhdWx0IiwibG9jYWxOYW1lIiwiZGF0YXNldCIsImV4dGVybmFsIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImNyZWF0ZVBvcFN0YXRlIiwiUXVpY2tSb3V0ZXJMaW5rIiwiSFRNTEVsZW1lbnQiLCJsaW5rVG8iLCJnZXRBdHRyaWJ1dGUiLCJjdXN0b21UYWciLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiaW5uZXJUZXh0IiwiYXR0cmliSSIsImEiLCJhdHRyaWJBIiwic2V0QXR0cmlidXRlIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJ1c2VSZWYiLCJhcHAiLCJjaGlsZCIsImFyZWEiLCJiYXNlIiwiYnIiLCJjb2wiLCJlbWJlZCIsImhyIiwiaW1nIiwiaW5wdXQiLCJrZXlnZW4iLCJsaW5rIiwibWV0YSIsInBhcmFtIiwidHJhY2siLCJ3YnIiLCJWT0lEX0VMRU1FTlRTIiwiQ09OVEFJTkVSX0VMRU1FTlRTIiwicGFyc2UiLCJ2bm9kZSIsIm5vZGUiLCJyZW5kZXJUb1N0cmluZyIsInNlbCIsInRleHQiLCJob29rIiwic3ZnIiwibnMiLCJhdHRyc01vZHVsZSIsImF0dHJzIiwiY2xhc3NNb2R1bGUiLCJfYWRkIiwiX3JlbW92ZSIsImV4aXN0aW5nIiwiY29uY2F0IiwiaW5kZXhPZiIsImRhdGFzZXRNb2R1bGUiLCJvbWl0IiwiYm9vbGVhbkF0dHJpYnV0ZXMiLCJwcm9wc01vZHVsZSIsImxrZXkiLCJzdHlsZU1vZHVsZSIsImRlbGF5ZWQiLCJrZWJhYktleSIsInJvdXRlciIsIkFwcCIsIkFib3V0IiwiTm90Rm91bmQiLCJMaXN0IiwiV2VsY29tZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxNQUFNLENBQUNDLE9BQVAsR0FBa0IsU0FBU0MsS0FBVCxDQUFlQyxLQUFmLEVBQXNCO0FBRXRDLE1BQUlDLFdBQVcsR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCSixLQUFuQztBQUFBLE1BQ0VLLGlCQUFpQixHQUFHLE9BQU9DLElBQVAsQ0FBWSxFQUFaLEVBQWdCLENBQWhCLE1BQXVCTCxLQUQ3QztBQUFBLE1BRUU7QUFDQU0sTUFIRjs7QUFLQUEsTUFBSSxHQUFHLFVBQVNDLEdBQVQsRUFBY0MsU0FBZCxFQUF5QkMsS0FBekIsRUFBZ0M7QUFDckM7QUFDQSxRQUFJQyxNQUFNLENBQUNQLFNBQVAsQ0FBaUJRLFFBQWpCLENBQTBCQyxJQUExQixDQUErQkosU0FBL0IsTUFBOEMsaUJBQWxELEVBQXFFO0FBQ25FLGFBQU9QLFdBQVcsQ0FBQ1csSUFBWixDQUFpQkwsR0FBakIsRUFBc0JDLFNBQXRCLEVBQWlDQyxLQUFqQyxDQUFQO0FBQ0Q7O0FBQ0QsUUFBSUksTUFBTSxHQUFHLEVBQWI7QUFBQSxRQUNFQyxLQUFLLEdBQUcsQ0FBQ04sU0FBUyxDQUFDTyxVQUFWLEdBQXVCLEdBQXZCLEdBQTZCLEVBQTlCLEtBQXFDUCxTQUFTLENBQUNRLFNBQVYsR0FBc0IsR0FBdEIsR0FBNEIsRUFBakUsS0FBd0VSLFNBQVMsQ0FBQ1MsUUFBVixHQUFxQixHQUFyQixHQUEyQixFQUFuRyxNQUF5RztBQUNoSFQsYUFBUyxDQUFDVSxNQUFWLEdBQW1CLEdBQW5CLEdB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Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7Ozs7Ozs7Ozs7O0FDSkEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBDcm9zcy1Ccm93c2VyIFNwbGl0IDEuMS4xXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDEyIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPlxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICogRUNNQVNjcmlwdCBjb21wbGlhbnQsIHVuaWZvcm0gY3Jvc3MtYnJvd3NlciBzcGxpdCBtZXRob2RcbiAqL1xuXG4vKipcbiAqIFNwbGl0cyBhIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3MgdXNpbmcgYSByZWdleCBvciBzdHJpbmcgc2VwYXJhdG9yLiBNYXRjaGVzIG9mIHRoZVxuICogc2VwYXJhdG9yIGFyZSBub3QgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdCBhcnJheS4gSG93ZXZlciwgaWYgYHNlcGFyYXRvcmAgaXMgYSByZWdleCB0aGF0IGNvbnRhaW5zXG4gKiBjYXB0dXJpbmcgZ3JvdXBzLCBiYWNrcmVmZXJlbmNlcyBhcmUgc3BsaWNlZCBpbnRvIHRoZSByZXN1bHQgZWFjaCB0aW1lIGBzZXBhcmF0b3JgIGlzIG1hdGNoZWQuXG4gKiBGaXhlcyBicm93c2VyIGJ1Z3MgY29tcGFyZWQgdG8gdGhlIG5hdGl2ZSBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdGAgYW5kIGNhbiBiZSB1c2VkIHJlbGlhYmx5XG4gKiBjcm9zcy1icm93c2VyLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gc3BsaXQuXG4gKiBAcGFyYW0ge1JlZ0V4cHxTdHJpbmd9IHNlcGFyYXRvciBSZWdleCBvciBzdHJpbmcgdG8gdXNlIGZvciBzZXBhcmF0aW5nIHRoZSBzdHJpbmcuXG4gKiBAcGFyYW0ge051bWJlcn0gW2xpbWl0XSBNYXhpbXVtIG51bWJlciBvZiBpdGVtcyB0byBpbmNsdWRlIGluIHRoZSByZXN1bHQgYXJyYXkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIHN1YnN0cmluZ3MuXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEJhc2ljIHVzZVxuICogc3BsaXQoJ2EgYiBjIGQnLCAnICcpO1xuICogLy8gLT4gWydhJywgJ2InLCAnYycsICdkJ11cbiAqXG4gKiAvLyBXaXRoIGxpbWl0XG4gKiBzcGxpdCgnYSBiIGMgZCcsICcgJywgMik7XG4gKiAvLyAtPiBbJ2EnLCAnYiddXG4gKlxuICogLy8gQmFja3JlZmVyZW5jZXMgaW4gcmVzdWx0IGFycmF5XG4gKiBzcGxpdCgnLi53b3JkMSB3b3JkMi4uJywgLyhbYS16XSspKFxcZCspL2kpO1xuICogLy8gLT4gWycuLicsICd3b3JkJywgJzEnLCAnICcsICd3b3JkJywgJzInLCAnLi4nXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiBzcGxpdCh1bmRlZikge1xuXG4gIHZhciBuYXRpdmVTcGxpdCA9IFN0cmluZy5wcm90b3R5cGUuc3BsaXQsXG4gICAgY29tcGxpYW50RXhlY05wY2cgPSAvKCk/Py8uZXhlYyhcIlwiKVsxXSA9PT0gdW5kZWYsXG4gICAgLy8gTlBDRzogbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBcbiAgICBzZWxmO1xuXG4gIHNlbGYgPSBmdW5jdGlvbihzdHIsIHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIGBuYXRpdmVTcGxpdGBcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNlcGFyYXRvcikgIT09IFwiW29iamVjdCBSZWdFeHBdXCIpIHtcbiAgICAgIHJldHVybiBuYXRpdmVTcGxpdC5jYWxsKHN0ciwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfVxuICAgIHZhciBvdXRwdXQgPSBbXSxcbiAgICAgIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gXCJpXCIgOiBcIlwiKSArIChzZXBhcmF0b3IubXVsdGlsaW5lID8gXCJtXCIgOiBcIlwiKSArIChzZXBhcmF0b3IuZXh0ZW5kZWQgPyBcInhcIiA6IFwiXCIpICsgLy8gUHJvcG9zZWQgZm9yIEVTNlxuICAgICAgKHNlcGFyYXRvci5zdGlja3kgPyBcInlcIiA6IFwiXCIpLFxuICAgICAgLy8gRmlyZWZveCAzK1xuICAgICAgbGFzdExhc3RJbmRleCA9IDAsXG4gICAgICAvLyBNYWtlIGBnbG9iYWxgIGFuZCBhdm9pZCBgbGFzdEluZGV4YCBpc3N1ZXMgYnkgd29ya2luZyB3aXRoIGEgY29weVxuICAgICAgc2VwYXJhdG9yID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArIFwiZ1wiKSxcbiAgICAgIHNlcGFyYXRvcjIsIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgc3RyICs9IFwiXCI7IC8vIFR5cGUtY29udmVydFxuICAgIGlmICghY29tcGxpYW50RXhlY05wY2cpIHtcbiAgICAgIC8vIERvZXNuJ3QgbmVlZCBmbGFncyBneSwgYnV0IHRoZXkgZG9uJ3QgaHVydFxuICAgICAgc2VwYXJhdG9yMiA9IG5ldyBSZWdFeHAoXCJeXCIgKyBzZXBhcmF0b3Iuc291cmNlICsgXCIkKD8hXFxcXHMpXCIsIGZsYWdzKTtcbiAgICB9XG4gICAgLyogVmFsdWVzIGZvciBgbGltaXRgLCBwZXIgdGhlIHNwZWM6XG4gICAgICogSWYgdW5kZWZpbmVkOiA0Mjk0OTY3Mjk1IC8vIE1hdGgucG93KDIsIDMyKSAtIDFcbiAgICAgKiBJZiAwLCBJbmZpbml0eSwgb3IgTmFOOiAwXG4gICAgICogSWYgcG9zaXRpdmUgbnVtYmVyOiBsaW1pdCA9IE1hdGguZmxvb3IobGltaXQpOyBpZiAobGltaXQgPiA0Mjk0OTY3Mjk1KSBsaW1pdCAtPSA0Mjk0OTY3Mjk2O1xuICAgICAqIElmIG5lZ2F0aXZlIG51bWJlcjogNDI5NDk2NzI5NiAtIE1hdGguZmxvb3IoTWF0aC5hYnMobGltaXQpKVxuICAgICAqIElmIG90aGVyOiBUeXBlLWNvbnZlcnQsIHRoZW4gdXNlIHRoZSBhYm92ZSBydWxlc1xuICAgICAqL1xuICAgIGxpbWl0ID0gbGltaXQgPT09IHVuZGVmID8gLTEgPj4+IDAgOiAvLyBNYXRoLnBvdygyLCAzMikgLSAxXG4gICAgbGltaXQgPj4+IDA7IC8vIFRvVWludDMyKGxpbWl0KVxuICAgIHdoaWxlIChtYXRjaCA9IHNlcGFyYXRvci5leGVjKHN0cikpIHtcbiAgICAgIC8vIGBzZXBhcmF0b3IubGFzdEluZGV4YCBpcyBub3QgcmVsaWFibGUgY3Jvc3MtYnJvd3NlclxuICAgICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICBvdXRwdXQucHVzaChzdHIuc2xpY2UobGFzdExhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGAgZm9yXG4gICAgICAgIC8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3Vwc1xuICAgICAgICBpZiAoIWNvbXBsaWFudEV4ZWNOcGNnICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBtYXRjaFswXS5yZXBsYWNlKHNlcGFyYXRvcjIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hbaV0gPSB1bmRlZjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgIGlmIChvdXRwdXQubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXBhcmF0b3IubGFzdEluZGV4ID09PSBtYXRjaC5pbmRleCkge1xuICAgICAgICBzZXBhcmF0b3IubGFzdEluZGV4Kys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxhc3RMYXN0SW5kZXggPT09IHN0ci5sZW5ndGgpIHtcbiAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3IudGVzdChcIlwiKSkge1xuICAgICAgICBvdXRwdXQucHVzaChcIlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goc3RyLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dC5sZW5ndGggPiBsaW1pdCA/IG91dHB1dC5zbGljZSgwLCBsaW1pdCkgOiBvdXRwdXQ7XG4gIH07XG5cbiAgcmV0dXJuIHNlbGY7XG59KSgpO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggSFRNTCBlbnRpdGllcyBhbmQgSFRNTCBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlVW5lc2NhcGVkSHRtbCA9IC9bJjw+XCInYF0vZyxcbiAgICByZUhhc1VuZXNjYXBlZEh0bWwgPSBSZWdFeHAocmVVbmVzY2FwZWRIdG1sLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIG1hcCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuICovXG52YXIgaHRtbEVzY2FwZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5OycsXG4gICdgJzogJyYjOTY7J1xufTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eU9mKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogVXNlZCBieSBgXy5lc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAqL1xudmFyIGVzY2FwZUh0bWxDaGFyID0gYmFzZVByb3BlcnR5T2YoaHRtbEVzY2FwZXMpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGNoYXJhY3RlcnMgXCImXCIsIFwiPFwiLCBcIj5cIiwgJ1wiJywgXCInXCIsIGFuZCBcIlxcYFwiIGluIGBzdHJpbmdgIHRvXG4gKiB0aGVpciBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXRpZXMuXG4gKlxuICogKipOb3RlOioqIE5vIG90aGVyIGNoYXJhY3RlcnMgYXJlIGVzY2FwZWQuIFRvIGVzY2FwZSBhZGRpdGlvbmFsXG4gKiBjaGFyYWN0ZXJzIHVzZSBhIHRoaXJkLXBhcnR5IGxpYnJhcnkgbGlrZSBbX2hlX10oaHR0cHM6Ly9tdGhzLmJlL2hlKS5cbiAqXG4gKiBUaG91Z2ggdGhlIFwiPlwiIGNoYXJhY3RlciBpcyBlc2NhcGVkIGZvciBzeW1tZXRyeSwgY2hhcmFjdGVycyBsaWtlXG4gKiBcIj5cIiBhbmQgXCIvXCIgZG9uJ3QgbmVlZCBlc2NhcGluZyBpbiBIVE1MIGFuZCBoYXZlIG5vIHNwZWNpYWwgbWVhbmluZ1xuICogdW5sZXNzIHRoZXkncmUgcGFydCBvZiBhIHRhZyBvciB1bnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuIFNlZVxuICogW01hdGhpYXMgQnluZW5zJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2FtYmlndW91cy1hbXBlcnNhbmRzKVxuICogKHVuZGVyIFwic2VtaS1yZWxhdGVkIGZ1biBmYWN0XCIpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQmFja3RpY2tzIGFyZSBlc2NhcGVkIGJlY2F1c2UgaW4gSUUgPCA5LCB0aGV5IGNhbiBicmVhayBvdXQgb2ZcbiAqIGF0dHJpYnV0ZSB2YWx1ZXMgb3IgSFRNTCBjb21tZW50cy4gU2VlIFsjNTldKGh0dHBzOi8vaHRtbDVzZWMub3JnLyM1OSksXG4gKiBbIzEwMl0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEwMiksIFsjMTA4XShodHRwczovL2h0bWw1c2VjLm9yZy8jMTA4KSwgYW5kXG4gKiBbIzEzM10oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEzMykgb2YgdGhlXG4gKiBbSFRNTDUgU2VjdXJpdHkgQ2hlYXRzaGVldF0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFdoZW4gd29ya2luZyB3aXRoIEhUTUwgeW91IHNob3VsZCBhbHdheXNcbiAqIFtxdW90ZSBhdHRyaWJ1dGUgdmFsdWVzXShodHRwOi8vd29ua28uY29tL3Bvc3QvaHRtbC1lc2NhcGluZykgdG8gcmVkdWNlXG4gKiBYU1MgdmVjdG9ycy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGUoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJyk7XG4gKiAvLyA9PiAnZnJlZCwgYmFybmV5LCAmYW1wOyBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiBlc2NhcGUoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzVW5lc2NhcGVkSHRtbC50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVVuZXNjYXBlZEh0bWwsIGVzY2FwZUh0bWxDaGFyKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBhbmRcbiAqIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS4gVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZVxuICogYXJndW1lbnRzOiAodmFsdWUsIGtleSwgb2JqZWN0KS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvblxuICogZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQHNlZSBfLmZvck93blJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uZm9yT3duKG5ldyBGb28sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gKi9cbmZ1bmN0aW9uIGZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvck93bihvYmplY3QsIHR5cGVvZiBpdGVyYXRlZSA9PSAnZnVuY3Rpb24nID8gaXRlcmF0ZWUgOiBpZGVudGl0eSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvck93bjtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHdvcmRzIGNvbXBvc2VkIG9mIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlQXNjaWlXb3JkID0gL1teXFx4MDAtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4N2ZdKy9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBMYXRpbiBVbmljb2RlIGxldHRlcnMgKGV4Y2x1ZGluZyBtYXRoZW1hdGljYWwgb3BlcmF0b3JzKS4gKi9cbnZhciByZUxhdGluID0gL1tcXHhjMC1cXHhkNlxceGQ4LVxceGY2XFx4ZjgtXFx4ZmZcXHUwMTAwLVxcdTAxN2ZdL2c7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTIzJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZjAnLFxuICAgIHJzRGluZ2JhdFJhbmdlID0gJ1xcXFx1MjcwMC1cXFxcdTI3YmYnLFxuICAgIHJzTG93ZXJSYW5nZSA9ICdhLXpcXFxceGRmLVxcXFx4ZjZcXFxceGY4LVxcXFx4ZmYnLFxuICAgIHJzTWF0aE9wUmFuZ2UgPSAnXFxcXHhhY1xcXFx4YjFcXFxceGQ3XFxcXHhmNycsXG4gICAgcnNOb25DaGFyUmFuZ2UgPSAnXFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmJyxcbiAgICByc1B1bmN0dWF0aW9uUmFuZ2UgPSAnXFxcXHUyMDAwLVxcXFx1MjA2ZicsXG4gICAgcnNTcGFjZVJhbmdlID0gJyBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwJyxcbiAgICByc1VwcGVyUmFuZ2UgPSAnQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlJyxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZicsXG4gICAgcnNCcmVha1JhbmdlID0gcnNNYXRoT3BSYW5nZSArIHJzTm9uQ2hhclJhbmdlICsgcnNQdW5jdHVhdGlvblJhbmdlICsgcnNTcGFjZVJhbmdlO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBcG9zID0gXCJbJ1xcdTIwMTldXCIsXG4gICAgcnNCcmVhayA9ICdbJyArIHJzQnJlYWtSYW5nZSArICddJyxcbiAgICByc0NvbWJvID0gJ1snICsgcnNDb21ib01hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlICsgJ10nLFxuICAgIHJzRGlnaXRzID0gJ1xcXFxkKycsXG4gICAgcnNEaW5nYmF0ID0gJ1snICsgcnNEaW5nYmF0UmFuZ2UgKyAnXScsXG4gICAgcnNMb3dlciA9ICdbJyArIHJzTG93ZXJSYW5nZSArICddJyxcbiAgICByc01pc2MgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArIHJzQnJlYWtSYW5nZSArIHJzRGlnaXRzICsgcnNEaW5nYmF0UmFuZ2UgKyByc0xvd2VyUmFuZ2UgKyByc1VwcGVyUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzVXBwZXIgPSAnWycgKyByc1VwcGVyUmFuZ2UgKyAnXScsXG4gICAgcnNaV0ogPSAnXFxcXHUyMDBkJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIHJlZ2V4ZXMuICovXG52YXIgcnNMb3dlck1pc2MgPSAnKD86JyArIHJzTG93ZXIgKyAnfCcgKyByc01pc2MgKyAnKScsXG4gICAgcnNVcHBlck1pc2MgPSAnKD86JyArIHJzVXBwZXIgKyAnfCcgKyByc01pc2MgKyAnKScsXG4gICAgcnNPcHRMb3dlckNvbnRyID0gJyg/OicgKyByc0Fwb3MgKyAnKD86ZHxsbHxtfHJlfHN8dHx2ZSkpPycsXG4gICAgcnNPcHRVcHBlckNvbnRyID0gJyg/OicgKyByc0Fwb3MgKyAnKD86RHxMTHxNfFJFfFN8VHxWRSkpPycsXG4gICAgcmVPcHRNb2QgPSByc01vZGlmaWVyICsgJz8nLFxuICAgIHJzT3B0VmFyID0gJ1snICsgcnNWYXJSYW5nZSArICddPycsXG4gICAgcnNPcHRKb2luID0gJyg/OicgKyByc1pXSiArICcoPzonICsgW3JzTm9uQXN0cmFsLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc09wdFZhciArIHJlT3B0TW9kICsgJykqJyxcbiAgICByc1NlcSA9IHJzT3B0VmFyICsgcmVPcHRNb2QgKyByc09wdEpvaW4sXG4gICAgcnNFbW9qaSA9ICcoPzonICsgW3JzRGluZ2JhdCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNTZXE7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGFwb3N0cm9waGVzLiAqL1xudmFyIHJlQXBvcyA9IFJlZ0V4cChyc0Fwb3MsICdnJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3MpIGFuZFxuICogW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrcyBmb3Igc3ltYm9sc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzX2Zvcl9TeW1ib2xzKS5cbiAqL1xudmFyIHJlQ29tYm9NYXJrID0gUmVnRXhwKHJzQ29tYm8sICdnJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGNvbXBsZXggb3IgY29tcG91bmQgd29yZHMuICovXG52YXIgcmVVbmljb2RlV29yZCA9IFJlZ0V4cChbXG4gIHJzVXBwZXIgKyAnPycgKyByc0xvd2VyICsgJysnICsgcnNPcHRMb3dlckNvbnRyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciwgJyQnXS5qb2luKCd8JykgKyAnKScsXG4gIHJzVXBwZXJNaXNjICsgJysnICsgcnNPcHRVcHBlckNvbnRyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciArIHJzTG93ZXJNaXNjLCAnJCddLmpvaW4oJ3wnKSArICcpJyxcbiAgcnNVcHBlciArICc/JyArIHJzTG93ZXJNaXNjICsgJysnICsgcnNPcHRMb3dlckNvbnRyLFxuICByc1VwcGVyICsgJysnICsgcnNPcHRVcHBlckNvbnRyLFxuICByc0RpZ2l0cyxcbiAgcnNFbW9qaVxuXS5qb2luKCd8JyksICdnJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBzdHJpbmdzIHRoYXQgbmVlZCBhIG1vcmUgcm9idXN0IHJlZ2V4cCB0byBtYXRjaCB3b3Jkcy4gKi9cbnZhciByZUhhc1VuaWNvZGVXb3JkID0gL1thLXpdW0EtWl18W0EtWl17Mix9W2Etel18WzAtOV1bYS16QS1aXXxbYS16QS1aXVswLTldfFteYS16QS1aMC05IF0vO1xuXG4vKiogVXNlZCB0byBtYXAgTGF0aW4gVW5pY29kZSBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMuICovXG52YXIgZGVidXJyZWRMZXR0ZXJzID0ge1xuICAvLyBMYXRpbi0xIFN1cHBsZW1lbnQgYmxvY2suXG4gICdcXHhjMCc6ICdBJywgICdcXHhjMSc6ICdBJywgJ1xceGMyJzogJ0EnLCAnXFx4YzMnOiAnQScsICdcXHhjNCc6ICdBJywgJ1xceGM1JzogJ0EnLFxuICAnXFx4ZTAnOiAnYScsICAnXFx4ZTEnOiAnYScsICdcXHhlMic6ICdhJywgJ1xceGUzJzogJ2EnLCAnXFx4ZTQnOiAnYScsICdcXHhlNSc6ICdhJyxcbiAgJ1xceGM3JzogJ0MnLCAgJ1xceGU3JzogJ2MnLFxuICAnXFx4ZDAnOiAnRCcsICAnXFx4ZjAnOiAnZCcsXG4gICdcXHhjOCc6ICdFJywgICdcXHhjOSc6ICdFJywgJ1xceGNhJzogJ0UnLCAnXFx4Y2InOiAnRScsXG4gICdcXHhlOCc6ICdlJywgICdcXHhlOSc6ICdlJywgJ1xceGVhJzogJ2UnLCAnXFx4ZWInOiAnZScsXG4gICdcXHhjYyc6ICdJJywgICdcXHhjZCc6ICdJJywgJ1xceGNlJzogJ0knLCAnXFx4Y2YnOiAnSScsXG4gICdcXHhlYyc6ICdpJywgICdcXHhlZCc6ICdpJywgJ1xceGVlJzogJ2knLCAnXFx4ZWYnOiAnaScsXG4gICdcXHhkMSc6ICdOJywgICdcXHhmMSc6ICduJyxcbiAgJ1xceGQyJzogJ08nLCAgJ1xceGQzJzogJ08nLCAnXFx4ZDQnOiAnTycsICdcXHhkNSc6ICdPJywgJ1xceGQ2JzogJ08nLCAnXFx4ZDgnOiAnTycsXG4gICdcXHhmMic6ICdvJywgICdcXHhmMyc6ICdvJywgJ1xceGY0JzogJ28nLCAnXFx4ZjUnOiAnbycsICdcXHhmNic6ICdvJywgJ1xceGY4JzogJ28nLFxuICAnXFx4ZDknOiAnVScsICAnXFx4ZGEnOiAnVScsICdcXHhkYic6ICdVJywgJ1xceGRjJzogJ1UnLFxuICAnXFx4ZjknOiAndScsICAnXFx4ZmEnOiAndScsICdcXHhmYic6ICd1JywgJ1xceGZjJzogJ3UnLFxuICAnXFx4ZGQnOiAnWScsICAnXFx4ZmQnOiAneScsICdcXHhmZic6ICd5JyxcbiAgJ1xceGM2JzogJ0FlJywgJ1xceGU2JzogJ2FlJyxcbiAgJ1xceGRlJzogJ1RoJywgJ1xceGZlJzogJ3RoJyxcbiAgJ1xceGRmJzogJ3NzJyxcbiAgLy8gTGF0aW4gRXh0ZW5kZWQtQSBibG9jay5cbiAgJ1xcdTAxMDAnOiAnQScsICAnXFx1MDEwMic6ICdBJywgJ1xcdTAxMDQnOiAnQScsXG4gICdcXHUwMTAxJzogJ2EnLCAgJ1xcdTAxMDMnOiAnYScsICdcXHUwMTA1JzogJ2EnLFxuICAnXFx1MDEwNic6ICdDJywgICdcXHUwMTA4JzogJ0MnLCAnXFx1MDEwYSc6ICdDJywgJ1xcdTAxMGMnOiAnQycsXG4gICdcXHUwMTA3JzogJ2MnLCAgJ1xcdTAxMDknOiAnYycsICdcXHUwMTBiJzogJ2MnLCAnXFx1MDEwZCc6ICdjJyxcbiAgJ1xcdTAxMGUnOiAnRCcsICAnXFx1MDExMCc6ICdEJywgJ1xcdTAxMGYnOiAnZCcsICdcXHUwMTExJzogJ2QnLFxuICAnXFx1MDExMic6ICdFJywgICdcXHUwMTE0JzogJ0UnLCAnXFx1MDExNic6ICdFJywgJ1xcdTAxMTgnOiAnRScsICdcXHUwMTFhJzogJ0UnLFxuICAnXFx1MDExMyc6ICdlJywgICdcXHUwMTE1JzogJ2UnLCAnXFx1MDExNyc6ICdlJywgJ1xcdTAxMTknOiAnZScsICdcXHUwMTFiJzogJ2UnLFxuICAnXFx1MDExYyc6ICdHJywgICdcXHUwMTFlJzogJ0cnLCAnXFx1MDEyMCc6ICdHJywgJ1xcdTAxMjInOiAnRycsXG4gICdcXHUwMTFkJzogJ2cnLCAgJ1xcdTAxMWYnOiAnZycsICdcXHUwMTIxJzogJ2cnLCAnXFx1MDEyMyc6ICdnJyxcbiAgJ1xcdTAxMjQnOiAnSCcsICAnXFx1MDEyNic6ICdIJywgJ1xcdTAxMjUnOiAnaCcsICdcXHUwMTI3JzogJ2gnLFxuICAnXFx1MDEyOCc6ICdJJywgICdcXHUwMTJhJzogJ0knLCAnXFx1MDEyYyc6ICdJJywgJ1xcdTAxMmUnOiAnSScsICdcXHUwMTMwJzogJ0knLFxuICAnXFx1MDEyOSc6ICdpJywgICdcXHUwMTJiJzogJ2knLCAnXFx1MDEyZCc6ICdpJywgJ1xcdTAxMmYnOiAnaScsICdcXHUwMTMxJzogJ2knLFxuICAnXFx1MDEzNCc6ICdKJywgICdcXHUwMTM1JzogJ2onLFxuICAnXFx1MDEzNic6ICdLJywgICdcXHUwMTM3JzogJ2snLCAnXFx1MDEzOCc6ICdrJyxcbiAgJ1xcdTAxMzknOiAnTCcsICAnXFx1MDEzYic6ICdMJywgJ1xcdTAxM2QnOiAnTCcsICdcXHUwMTNmJzogJ0wnLCAnXFx1MDE0MSc6ICdMJyxcbiAgJ1xcdTAxM2EnOiAnbCcsICAnXFx1MDEzYyc6ICdsJywgJ1xcdTAxM2UnOiAnbCcsICdcXHUwMTQwJzogJ2wnLCAnXFx1MDE0Mic6ICdsJyxcbiAgJ1xcdTAxNDMnOiAnTicsICAnXFx1MDE0NSc6ICdOJywgJ1xcdTAxNDcnOiAnTicsICdcXHUwMTRhJzogJ04nLFxuICAnXFx1MDE0NCc6ICduJywgICdcXHUwMTQ2JzogJ24nLCAnXFx1MDE0OCc6ICduJywgJ1xcdTAxNGInOiAnbicsXG4gICdcXHUwMTRjJzogJ08nLCAgJ1xcdTAxNGUnOiAnTycsICdcXHUwMTUwJzogJ08nLFxuICAnXFx1MDE0ZCc6ICdvJywgICdcXHUwMTRmJzogJ28nLCAnXFx1MDE1MSc6ICdvJyxcbiAgJ1xcdTAxNTQnOiAnUicsICAnXFx1MDE1Nic6ICdSJywgJ1xcdTAxNTgnOiAnUicsXG4gICdcXHUwMTU1JzogJ3InLCAgJ1xcdTAxNTcnOiAncicsICdcXHUwMTU5JzogJ3InLFxuICAnXFx1MDE1YSc6ICdTJywgICdcXHUwMTVjJzogJ1MnLCAnXFx1MDE1ZSc6ICdTJywgJ1xcdTAxNjAnOiAnUycsXG4gICdcXHUwMTViJzogJ3MnLCAgJ1xcdTAxNWQnOiAncycsICdcXHUwMTVmJzogJ3MnLCAnXFx1MDE2MSc6ICdzJyxcbiAgJ1xcdTAxNjInOiAnVCcsICAnXFx1MDE2NCc6ICdUJywgJ1xcdTAxNjYnOiAnVCcsXG4gICdcXHUwMTYzJzogJ3QnLCAgJ1xcdTAxNjUnOiAndCcsICdcXHUwMTY3JzogJ3QnLFxuICAnXFx1MDE2OCc6ICdVJywgICdcXHUwMTZhJzogJ1UnLCAnXFx1MDE2Yyc6ICdVJywgJ1xcdTAxNmUnOiAnVScsICdcXHUwMTcwJzogJ1UnLCAnXFx1MDE3Mic6ICdVJyxcbiAgJ1xcdTAxNjknOiAndScsICAnXFx1MDE2Yic6ICd1JywgJ1xcdTAxNmQnOiAndScsICdcXHUwMTZmJzogJ3UnLCAnXFx1MDE3MSc6ICd1JywgJ1xcdTAxNzMnOiAndScsXG4gICdcXHUwMTc0JzogJ1cnLCAgJ1xcdTAxNzUnOiAndycsXG4gICdcXHUwMTc2JzogJ1knLCAgJ1xcdTAxNzcnOiAneScsICdcXHUwMTc4JzogJ1knLFxuICAnXFx1MDE3OSc6ICdaJywgICdcXHUwMTdiJzogJ1onLCAnXFx1MDE3ZCc6ICdaJyxcbiAgJ1xcdTAxN2EnOiAneicsICAnXFx1MDE3Yyc6ICd6JywgJ1xcdTAxN2UnOiAneicsXG4gICdcXHUwMTMyJzogJ0lKJywgJ1xcdTAxMzMnOiAnaWonLFxuICAnXFx1MDE1Mic6ICdPZScsICdcXHUwMTUzJzogJ29lJyxcbiAgJ1xcdTAxNDknOiBcIiduXCIsICdcXHUwMTdmJzogJ3NzJ1xufTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhbiBBU0NJSSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIGFzY2lpV29yZHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVBc2NpaVdvcmQpIHx8IFtdO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eU9mKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogVXNlZCBieSBgXy5kZWJ1cnJgIHRvIGNvbnZlcnQgTGF0aW4tMSBTdXBwbGVtZW50IGFuZCBMYXRpbiBFeHRlbmRlZC1BXG4gKiBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXIgVGhlIG1hdGNoZWQgbGV0dGVyIHRvIGRlYnVyci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGRlYnVycmVkIGxldHRlci5cbiAqL1xudmFyIGRlYnVyckxldHRlciA9IGJhc2VQcm9wZXJ0eU9mKGRlYnVycmVkTGV0dGVycyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIGNvbnRhaW5zIGEgd29yZCBjb21wb3NlZCBvZiBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgd29yZCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNVbmljb2RlV29yZChzdHJpbmcpIHtcbiAgcmV0dXJuIHJlSGFzVW5pY29kZVdvcmQudGVzdChzdHJpbmcpO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhIFVuaWNvZGUgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICovXG5mdW5jdGlvbiB1bmljb2RlV29yZHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVVbmljb2RlV29yZCkgfHwgW107XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uY2FtZWxDYXNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGNvbWJpbmUgZWFjaCB3b3JkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29tcG91bmRlciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29tcG91bmRlcihjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIGFycmF5UmVkdWNlKHdvcmRzKGRlYnVycihzdHJpbmcpLnJlcGxhY2UocmVBcG9zLCAnJykpLCBjYWxsYmFjaywgJycpO1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVidXJycyBgc3RyaW5nYCBieSBjb252ZXJ0aW5nXG4gKiBbTGF0aW4tMSBTdXBwbGVtZW50XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MYXRpbi0xX1N1cHBsZW1lbnRfKFVuaWNvZGVfYmxvY2spI0NoYXJhY3Rlcl90YWJsZSlcbiAqIGFuZCBbTGF0aW4gRXh0ZW5kZWQtQV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGF0aW5fRXh0ZW5kZWQtQSlcbiAqIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycyBhbmQgcmVtb3ZpbmdcbiAqIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3NdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrcykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZGVidXJyLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZGVidXJyZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlYnVycignZMOpasOgIHZ1Jyk7XG4gKiAvLyA9PiAnZGVqYSB2dSdcbiAqL1xuZnVuY3Rpb24gZGVidXJyKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gc3RyaW5nICYmIHN0cmluZy5yZXBsYWNlKHJlTGF0aW4sIGRlYnVyckxldHRlcikucmVwbGFjZShyZUNvbWJvTWFyaywgJycpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvXG4gKiBba2ViYWIgY2FzZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2Nhc2UjU3BlY2lhbF9jYXNlX3N0eWxlcykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGtlYmFiIGNhc2VkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5rZWJhYkNhc2UoJ0ZvbyBCYXInKTtcbiAqIC8vID0+ICdmb28tYmFyJ1xuICpcbiAqIF8ua2ViYWJDYXNlKCdmb29CYXInKTtcbiAqIC8vID0+ICdmb28tYmFyJ1xuICpcbiAqIF8ua2ViYWJDYXNlKCdfX0ZPT19CQVJfXycpO1xuICogLy8gPT4gJ2Zvby1iYXInXG4gKi9cbnZhciBrZWJhYkNhc2UgPSBjcmVhdGVDb21wb3VuZGVyKGZ1bmN0aW9uKHJlc3VsdCwgd29yZCwgaW5kZXgpIHtcbiAgcmV0dXJuIHJlc3VsdCArIChpbmRleCA/ICctJyA6ICcnKSArIHdvcmQudG9Mb3dlckNhc2UoKTtcbn0pO1xuXG4vKipcbiAqIFNwbGl0cyBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtSZWdFeHB8c3RyaW5nfSBbcGF0dGVybl0gVGhlIHBhdHRlcm4gdG8gbWF0Y2ggd29yZHMuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy53b3JkcygnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+IFsnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcyddXG4gKlxuICogXy53b3JkcygnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnLCAvW14sIF0rL2cpO1xuICogLy8gPT4gWydmcmVkJywgJ2Jhcm5leScsICcmJywgJ3BlYmJsZXMnXVxuICovXG5mdW5jdGlvbiB3b3JkcyhzdHJpbmcsIHBhdHRlcm4sIGd1YXJkKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHBhdHRlcm4gPSBndWFyZCA/IHVuZGVmaW5lZCA6IHBhdHRlcm47XG5cbiAgaWYgKHBhdHRlcm4gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoYXNVbmljb2RlV29yZChzdHJpbmcpID8gdW5pY29kZVdvcmRzKHN0cmluZykgOiBhc2NpaVdvcmRzKHN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIHN0cmluZy5tYXRjaChwYXR0ZXJuKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZWJhYkNhc2U7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyA9IDEsXG4gICAgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvLFxuICAgIHJlTGVhZGluZ0RvdCA9IC9eXFwuLyxcbiAgICByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5LFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGUoZW50cmllcyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfX1snZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBjYWNoZSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChjYWNoZSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGNhY2hlLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYWNoZSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGNhY2hlLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aF0gOiBjYXN0UGF0aChwYXRoKTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaGFzSW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VIYXNJbihvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYga2V5IGluIE9iamVjdChvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLlxuICogIFRoZSBiaXRtYXNrIG1heSBiZSBjb21wb3NlZCBvZiB0aGUgZm9sbG93aW5nIGZsYWdzOlxuICogICAgIDEgLSBVbm9yZGVyZWQgY29tcGFyaXNvblxuICogICAgIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0KHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBnZXRUYWcob2JqZWN0KTtcbiAgICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gZ2V0VGFnKG90aGVyKTtcbiAgICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG90aFRhZztcbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnICYmICFpc0hvc3RPYmplY3Qob2JqZWN0KSxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG90aGVyKSxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc01hdGNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IG1hdGNoRGF0YSBUaGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3MgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGluZGV4ID0gbWF0Y2hEYXRhLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IGluZGV4LFxuICAgICAgbm9DdXN0b21pemVyID0gIWN1c3RvbWl6ZXI7XG5cbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIGRhdGFbMl0pXG4gICAgICAgICAgPyBkYXRhWzFdICE9PSBvYmplY3RbZGF0YVswXV1cbiAgICAgICAgICA6ICEoZGF0YVswXSBpbiBvYmplY3QpXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIHZhciBrZXkgPSBkYXRhWzBdLFxuICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBzcmNWYWx1ZSA9IGRhdGFbMV07XG5cbiAgICBpZiAobm9DdXN0b21pemVyICYmIGRhdGFbMl0pIHtcbiAgICAgIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RhY2sgPSBuZXcgU3RhY2s7XG4gICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgY3VzdG9taXplciwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHLCBzdGFjaylcbiAgICAgICAgICAgIDogcmVzdWx0XG4gICAgICAgICAgKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLml0ZXJhdGVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBbdmFsdWU9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYW4gaXRlcmF0ZWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGl0ZXJhdGVlLlxuICovXG5mdW5jdGlvbiBiYXNlSXRlcmF0ZWUodmFsdWUpIHtcbiAgLy8gRG9uJ3Qgc3RvcmUgdGhlIGB0eXBlb2ZgIHJlc3VsdCBpbiBhIHZhcmlhYmxlIHRvIGF2b2lkIGEgSklUIGJ1ZyBpbiBTYWZhcmkgOS5cbiAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTYwMzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSlcbiAgICAgID8gYmFzZU1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pXG4gICAgICA6IGJhc2VNYXRjaGVzKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gcHJvcGVydHkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lc24ndCBjbG9uZSBgc291cmNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzKHNvdXJjZSkge1xuICB2YXIgbWF0Y2hEYXRhID0gZ2V0TWF0Y2hEYXRhKHNvdXJjZSk7XG4gIGlmIChtYXRjaERhdGEubGVuZ3RoID09IDEgJiYgbWF0Y2hEYXRhWzBdWzJdKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKG1hdGNoRGF0YVswXVswXSwgbWF0Y2hEYXRhWzBdWzFdKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PT0gc291cmNlIHx8IGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lc24ndCBjbG9uZSBgc3JjVmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KHBhdGgsIHNyY1ZhbHVlKSB7XG4gIGlmIChpc0tleShwYXRoKSAmJiBpc1N0cmljdENvbXBhcmFibGUoc3JjVmFsdWUpKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKHRvS2V5KHBhdGgpLCBzcmNWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBvYmpWYWx1ZSA9IGdldChvYmplY3QsIHBhdGgpO1xuICAgIHJldHVybiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBvYmpWYWx1ZSA9PT0gc3JjVmFsdWUpXG4gICAgICA/IGhhc0luKG9iamVjdCwgcGF0aClcbiAgICAgIDogYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCB1bmRlZmluZWQsIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgfCBQQVJUSUFMX0NPTVBBUkVfRkxBRyk7XG4gIH07XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUHJvcGVydHlgIHdoaWNoIHN1cHBvcnRzIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5RGVlcChwYXRoKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnB1bGxBdGAgd2l0aG91dCBzdXBwb3J0IGZvciBpbmRpdmlkdWFsXG4gKiBpbmRleGVzIG9yIGNhcHR1cmluZyB0aGUgcmVtb3ZlZCBlbGVtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7bnVtYmVyW119IGluZGV4ZXMgVGhlIGluZGV4ZXMgb2YgZWxlbWVudHMgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQdWxsQXQoYXJyYXksIGluZGV4ZXMpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gaW5kZXhlcy5sZW5ndGggOiAwLFxuICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleGVzW2xlbmd0aF07XG4gICAgaWYgKGxlbmd0aCA9PSBsYXN0SW5kZXggfHwgaW5kZXggIT09IHByZXZpb3VzKSB7XG4gICAgICB2YXIgcHJldmlvdXMgPSBpbmRleDtcbiAgICAgIGlmIChpc0luZGV4KGluZGV4KSkge1xuICAgICAgICBzcGxpY2UuY2FsbChhcnJheSwgaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzS2V5KGluZGV4LCBhcnJheSkpIHtcbiAgICAgICAgdmFyIHBhdGggPSBjYXN0UGF0aChpbmRleCksXG4gICAgICAgICAgICBvYmplY3QgPSBwYXJlbnQoYXJyYXksIHBhdGgpO1xuXG4gICAgICAgIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgICAgICAgIGRlbGV0ZSBvYmplY3RbdG9LZXkobGFzdChwYXRoKSldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGFycmF5W3RvS2V5KGluZGV4KV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICB9XG4gIGVuZCA9IGVuZCA+IGxlbmd0aCA/IGxlbmd0aCA6IGVuZDtcbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuZ3RoO1xuICB9XG4gIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgc3RhcnQgPj4+PSAwO1xuXG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBzdHJpbmdUb1BhdGgodmFsdWUpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChhcnJheSk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBVTk9SREVSRURfQ09NUEFSRV9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIXNlZW4uaGFzKG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5hZGQob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAob2JqZWN0LmJ5dGVPZmZzZXQgIT0gb3RoZXIuYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gQ29lcmNlIGJvb2xlYW5zIHRvIGAxYCBvciBgMGAgYW5kIGRhdGVzIHRvIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vIEludmFsaWQgZGF0ZXMgYXJlIGNvZXJjZWQgdG8gYE5hTmAuXG4gICAgICByZXR1cm4gZXEoK29iamVjdCwgK290aGVyKTtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICB2YXIgY29udmVydCA9IG1hcFRvQXJyYXk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUc7XG4gICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgIGlmIChvYmplY3Quc2l6ZSAhPSBvdGhlci5zaXplICYmICFpc1BhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgYml0bWFzayB8PSBVTk9SREVSRURfQ09NUEFSRV9GTEFHO1xuXG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgICAgIHZhciByZXN1bHQgPSBlcXVhbEFycmF5cyhjb252ZXJ0KG9iamVjdCksIGNvbnZlcnQob3RoZXIpLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlT2YuY2FsbChvYmplY3QpID09IHN5bWJvbFZhbHVlT2YuY2FsbChvdGhlcik7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyxcbiAgICAgIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3Mgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbWF0Y2ggZGF0YSBvZiBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hEYXRhKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0ga2V5cyhvYmplY3QpLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB2YXIga2V5ID0gcmVzdWx0W2xlbmd0aF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV07XG5cbiAgICByZXN1bHRbbGVuZ3RoXSA9IFtrZXksIHZhbHVlLCBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4vLyBmb3IgZGF0YSB2aWV3cyBpbiBFZGdlIDwgMTQsIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzLlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBleGlzdHMgb24gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIHJlc3VsdCxcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgaWYgKCEocmVzdWx0ID0gb2JqZWN0ICE9IG51bGwgJiYgaGFzRnVuYyhvYmplY3QsIGtleSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cbiAgaWYgKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiAwO1xuICByZXR1cm4gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlmIHN1aXRhYmxlIGZvciBzdHJpY3RcbiAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAhaXNPYmplY3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgbWF0Y2hlc1Byb3BlcnR5YCBmb3Igc291cmNlIHZhbHVlcyBzdWl0YWJsZVxuICogZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSB2YWx1ZSB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKGtleSwgc3JjVmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0W2tleV0gPT09IHNyY1ZhbHVlICYmXG4gICAgICAoc3JjVmFsdWUgIT09IHVuZGVmaW5lZCB8fCAoa2V5IGluIE9iamVjdChvYmplY3QpKSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgcGFyZW50IHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCB0byBnZXQgdGhlIHBhcmVudCB2YWx1ZSBvZi5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwYXJlbnQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHBhcmVudChvYmplY3QsIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgubGVuZ3RoID09IDEgPyBvYmplY3QgOiBiYXNlR2V0KG9iamVjdCwgYmFzZVNsaWNlKHBhdGgsIDAsIC0xKSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemUoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAocmVMZWFkaW5nRG90LnRlc3Qoc3RyaW5nKSkge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxhc3QgZWxlbWVudCBvZiBgYXJyYXlgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBvZiBgYXJyYXlgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmxhc3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gbGFzdChhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gbGVuZ3RoID8gYXJyYXlbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgZWxlbWVudHMgZnJvbSBgYXJyYXlgIHRoYXQgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yXG4gKiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiB0aGUgcmVtb3ZlZCBlbGVtZW50cy4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkXG4gKiB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICpcbiAqICoqTm90ZToqKiBVbmxpa2UgYF8uZmlsdGVyYCwgdGhpcyBtZXRob2QgbXV0YXRlcyBgYXJyYXlgLiBVc2UgYF8ucHVsbGBcbiAqIHRvIHB1bGwgZWxlbWVudHMgZnJvbSBhbiBhcnJheSBieSB2YWx1ZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldXG4gKiAgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHJlbW92ZWQgZWxlbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheSA9IFsxLCAyLCAzLCA0XTtcbiAqIHZhciBldmVucyA9IF8ucmVtb3ZlKGFycmF5LCBmdW5jdGlvbihuKSB7XG4gKiAgIHJldHVybiBuICUgMiA9PSAwO1xuICogfSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXkpO1xuICogLy8gPT4gWzEsIDNdXG4gKlxuICogY29uc29sZS5sb2coZXZlbnMpO1xuICogLy8gPT4gWzIsIDRdXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKCEoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKSkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmRleGVzID0gW10sXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgcHJlZGljYXRlID0gYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMyk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIGluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgfVxuICB9XG4gIGJhc2VQdWxsQXQoYXJyYXksIGluZGV4ZXMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgJiYgdHlwZW9mIHJlc29sdmVyICE9ICdmdW5jdGlvbicpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHZhciBtZW1vaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBrZXkgPSByZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3MpIDogYXJnc1swXSxcbiAgICAgICAgY2FjaGUgPSBtZW1vaXplZC5jYWNoZTtcblxuICAgIGlmIChjYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGNhY2hlLmdldChrZXkpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICBtZW1vaXplZC5jYWNoZSA9IGNhY2hlLnNldChrZXksIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgbWVtb2l6ZWQuY2FjaGUgPSBuZXcgKG1lbW9pemUuQ2FjaGUgfHwgTWFwQ2FjaGUpO1xuICByZXR1cm4gbWVtb2l6ZWQ7XG59XG5cbi8vIEFzc2lnbiBjYWNoZSB0byBgXy5tZW1vaXplYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLiBJZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgcmV0dXJuZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9XSB9O1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICogLy8gPT4gJ2RlZmF1bHQnXG4gKi9cbmZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGlzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSBfLmNyZWF0ZSh7ICdhJzogXy5jcmVhdGUoeyAnYic6IDIgfSkgfSk7XG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhLmInKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdiJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBoYXNJbihvYmplY3QsIHBhdGgpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBiYXNlSGFzSW4pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbXG4gKiAgIHsgJ2EnOiB7ICdiJzogMiB9IH0sXG4gKiAgIHsgJ2EnOiB7ICdiJzogMSB9IH1cbiAqIF07XG4gKlxuICogXy5tYXAob2JqZWN0cywgXy5wcm9wZXJ0eSgnYS5iJykpO1xuICogLy8gPT4gWzIsIDFdXG4gKlxuICogXy5tYXAoXy5zb3J0Qnkob2JqZWN0cywgXy5wcm9wZXJ0eShbJ2EnLCAnYiddKSksICdhLmInKTtcbiAqIC8vID0+IFsxLCAyXVxuICovXG5mdW5jdGlvbiBwcm9wZXJ0eShwYXRoKSB7XG4gIHJldHVybiBpc0tleShwYXRoKSA/IGJhc2VQcm9wZXJ0eSh0b0tleShwYXRoKSkgOiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmNsdWRlc2AgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBzcGVjaWZ5aW5nIGFuIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlc1dpdGgoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmF0b3IodmFsdWUsIGFycmF5W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgYGZyb21JbmRleGAgYm91bmRzIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUgZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgcmVzdWx0ID0gW10sXG4gICAgICBzZWVuID0gcmVzdWx0O1xuXG4gIGlmIChjb21wYXJhdG9yKSB7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuICB9XG4gIGVsc2UgaWYgKGxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFKSB7XG4gICAgdmFyIHNldCA9IGl0ZXJhdGVlID8gbnVsbCA6IGNyZWF0ZVNldChhcnJheSk7XG4gICAgaWYgKHNldCkge1xuICAgICAgcmV0dXJuIHNldFRvQXJyYXkoc2V0KTtcbiAgICB9XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICBpbmNsdWRlcyA9IGNhY2hlSGFzO1xuICAgIHNlZW4gPSBuZXcgU2V0Q2FjaGU7XG4gIH1cbiAgZWxzZSB7XG4gICAgc2VlbiA9IGl0ZXJhdGVlID8gW10gOiByZXN1bHQ7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUpIDogdmFsdWU7XG5cbiAgICB2YWx1ZSA9IChjb21wYXJhdG9yIHx8IHZhbHVlICE9PSAwKSA/IHZhbHVlIDogMDtcbiAgICBpZiAoaXNDb21tb24gJiYgY29tcHV0ZWQgPT09IGNvbXB1dGVkKSB7XG4gICAgICB2YXIgc2VlbkluZGV4ID0gc2Vlbi5sZW5ndGg7XG4gICAgICB3aGlsZSAoc2VlbkluZGV4LS0pIHtcbiAgICAgICAgaWYgKHNlZW5bc2VlbkluZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpbmNsdWRlcyhzZWVuLCBjb21wdXRlZCwgY29tcGFyYXRvcikpIHtcbiAgICAgIGlmIChzZWVuICE9PSByZXN1bHQpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc2V0IG9iamVjdCBvZiBgdmFsdWVzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYWRkIHRvIHRoZSBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgc2V0LlxuICovXG52YXIgY3JlYXRlU2V0ID0gIShTZXQgJiYgKDEgLyBzZXRUb0FycmF5KG5ldyBTZXQoWywtMF0pKVsxXSkgPT0gSU5GSU5JVFkpID8gbm9vcCA6IGZ1bmN0aW9uKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFNldCh2YWx1ZXMpO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGR1cGxpY2F0ZS1mcmVlIHZlcnNpb24gb2YgYW4gYXJyYXksIHVzaW5nXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpbiB3aGljaCBvbmx5IHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGVhY2hcbiAqIGVsZW1lbnQgaXMga2VwdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcShbMiwgMSwgMl0pO1xuICogLy8gPT4gWzIsIDFdXG4gKi9cbmZ1bmN0aW9uIHVuaXEoYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlVW5pcShhcnJheSlcbiAgICA6IFtdO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4zLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAqL1xuZnVuY3Rpb24gbm9vcCgpIHtcbiAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxO1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL01hdHQtRXNjaC92aXJ0dWFsLWRvbS9ibG9iL21hc3Rlci92aXJ0dWFsLWh5cGVyc2NyaXB0L3BhcnNlLXRhZy5qc1xuXG52YXIgc3BsaXQgPSByZXF1aXJlKCdicm93c2VyLXNwbGl0JylcblxudmFyIGNsYXNzSWRTcGxpdCA9IC8oW1xcLiNdP1thLXpBLVowLTlcXHUwMDdGLVxcdUZGRkZfOi1dKykvXG52YXIgbm90Q2xhc3NJZCA9IC9eXFwufCMvXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VTZWxlY3RvciAoc2VsZWN0b3IsIHVwcGVyKSB7XG4gIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgJydcbiAgdmFyIHRhZ05hbWVcbiAgdmFyIGlkID0gJydcbiAgdmFyIGNsYXNzZXMgPSBbXVxuXG4gIHZhciB0YWdQYXJ0cyA9IHNwbGl0KHNlbGVjdG9yLCBjbGFzc0lkU3BsaXQpXG5cbiAgaWYgKG5vdENsYXNzSWQudGVzdCh0YWdQYXJ0c1sxXSkgfHwgc2VsZWN0b3IgPT09ICcnKSB7XG4gICAgdGFnTmFtZSA9ICdkaXYnXG4gIH1cblxuICB2YXIgcGFydCwgdHlwZSwgaVxuXG4gIGZvciAoaSA9IDA7IGkgPCB0YWdQYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHBhcnQgPSB0YWdQYXJ0c1tpXVxuXG4gICAgaWYgKCFwYXJ0KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHR5cGUgPSBwYXJ0LmNoYXJBdCgwKVxuXG4gICAgaWYgKCF0YWdOYW1lKSB7XG4gICAgICB0YWdOYW1lID0gcGFydFxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJy4nKSB7XG4gICAgICBjbGFzc2VzLnB1c2gocGFydC5zdWJzdHJpbmcoMSwgcGFydC5sZW5ndGgpKVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJyMnKSB7XG4gICAgICBpZCA9IHBhcnQuc3Vic3RyaW5nKDEsIHBhcnQubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdGFnTmFtZTogdXBwZXIgPT09IHRydWUgPyB0YWdOYW1lLnRvVXBwZXJDYXNlKCkgOiB0YWdOYW1lLFxuICAgIGlkOiBpZCxcbiAgICBjbGFzc05hbWU6IGNsYXNzZXMuam9pbignICcpXG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIGNoZWNrRm9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgICAgIHN1cGVyKGVycm9yKTtcclxuICAgICAgICBjb25zdCBpc0Vycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIDxzdHlsZT5cclxuICAgICAgICAgICAgICAgIGJvZHkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDojYzdlMmYxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiAxMDB2aDsgYmFja2dyb3VuZDojYzdlMmYxOyBwYWRkaW5nOiAyMHB4O1wiPlxyXG4gICAgICAgICAgICA8aDMgc3R5bGU9XCJjb2xvcjogcmVkO1wiPlR5cGVFcnJvcjogJHt0aGlzLm1lc3NhZ2V9PC9oMz5cclxuICAgICAgICAgICAgPHA+PC9wPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItY29uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjYzdlMmYxOyBib3JkZXI6IDJweCBzb2xpZCAjMzhiNmZmOyBwYWRkaW5nOiA4cHggMTJweDtcIj5cclxuICAgICAgICAgICAgICAgIDxkaXY+JHt0aGlzLnN0YWNrfTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgYDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JcIikuaW5uZXJIVE1MID0gaXNFcnJvcigpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gY2hlY2tGb3JFcnJvcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgcXVpY2tfZXJyb3JfMSA9IHJlcXVpcmUoXCJxdWljay1lcnJvclwiKTtcclxuY29uc3Qgc25hYmJkb20gPSByZXF1aXJlKFwic25hYmJkb21cIik7XHJcbmNvbnN0IHByb3BzXzEgPSByZXF1aXJlKFwic25hYmJkb20vbW9kdWxlcy9wcm9wc1wiKTtcclxuY29uc3QgcmVjb25jaWxlID0gc25hYmJkb20uaW5pdChbcHJvcHNfMS5kZWZhdWx0XSk7XHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XHJcbmNvbnN0IHNuYWJiZG9tXzEgPSByZXF1aXJlKFwic25hYmJkb21cIik7XHJcbmNvbnN0IGluaXQgPSByZXF1aXJlKCdzbmFiYmRvbS10by1odG1sL2luaXQnKTtcclxuY29uc3QgbW9kdWxlcyA9IHJlcXVpcmUoJ3NuYWJiZG9tLXRvLWh0bWwvbW9kdWxlcycpO1xyXG5jb25zdCB0b0hUTUwgPSBpbml0KFttb2R1bGVzLmNsYXNzLCBtb2R1bGVzLnByb3BzLCBtb2R1bGVzLmF0dHJpYnV0ZXMsIG1vZHVsZXMuc3R5bGVdKTtcclxuLy8gaW50ZXJmYWNlIElRdWljayB7XHJcbi8vICAgICByZWFkb25seSAkZWw6IEVsZW1lbnQsXHJcbi8vIH1cclxuLy8gZnVuY3Rpb24gd2F0Y2hFZmZlY3QoZm46UCBhbnkpIHtcclxuLy8gICAgIHRoaXMuYWN0aXZlRWZmZWN0ID0gZm5cclxuLy8gICAgIGZuKClcclxuLy8gICAgIHRoaXMuYWN0aXZlRWZmZWN0ID0gbnVsbFxyXG4vLyB9XHJcbmNsYXNzIERlcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gbmV3IFNldCgpO1xyXG4gICAgfVxyXG4gICAgZGVwZW5kKGFjdGl2ZUVmZmVjdCkge1xyXG4gICAgICAgIGlmIChhY3RpdmVFZmZlY3QpXHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuYWRkKGFjdGl2ZUVmZmVjdCk7XHJcbiAgICB9XHJcbiAgICBub3RpZnkoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzdWIpID0+IHtcclxuICAgICAgICAgICAgc3ViKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIGxldCB0ID0gdGhpcztcclxuICAgICAgICB0LnBhcmFtcyA9IHBhcmFtcztcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkgeyB9XHJcbiAgICBzZXRTdGF0ZShwYXJ0aWFsU3RhdGUpIHtcclxuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIC4uLl90aGlzLnN0YXRlLFxyXG4gICAgICAgICAgICAuLi5wYXJ0aWFsU3RhdGUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBRdWljay5fX3VwZGF0ZXIoX3RoaXMpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKGVsLCByKSB7XHJcbiAgICAgICAgcmVjb25jaWxlKHJvb3QsIGVsKTtcclxuICAgIH1cclxufVxyXG5jb25zdCBfcHQgPSBDb21wb25lbnQucHJvdG90eXBlO1xyXG5fcHQuaXNRdWlja0NsYXNzQ29tcG9uZW50ID0gdHJ1ZTtcclxuY29uc3QgcmVuZGVyID0gKGNvbXBvbmVudCwgcm9vdCkgPT4ge1xyXG4gICAgaWYgKCFjb21wb25lbnQpIHtcclxuICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KCdDYW5ub3QgcmVuZGVyIHdpdGhvdXQgY29tcG9uZW50Jyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXJvb3QpIHtcclxuICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KCdDYW5ub3QgcmVuZGVyIHdpdGhvdXQgRE9NIGVsZW1lbnQnKTtcclxuICAgIH1cclxuICAgIGlmICghY29tcG9uZW50ICYmICFyb290KSB7XHJcbiAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdCgnQ2Fubm90IHJlbmRlciB3aXRob3V0IENvbXBvbmVudCBhbmQgRE9NIGVsZW1lbnQnKTtcclxuICAgIH1cclxuICAgIHJlY29uY2lsZShyb290LCBjb21wb25lbnQpO1xyXG59O1xyXG5jb25zdCBfaW5pdCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGZhdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgIGZhdi5ocmVmID0gJy9mYXZpY29uLmljbyc7XHJcbiAgICBmYXYucmVsID0gJ2ljb24nO1xyXG4gICAgY29uc3QgaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJyk7XHJcbn07XHJcbmNvbnN0ICQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxufTtcclxuY29uc3QgY29tcG9uZW50TG9hZGVkID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgbGlzdGVuZXIgPSAodGFyZ2V0LCB0eXBlLCBmbiwgcHJldmVudCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5jb25zdCBydW5CZWZvcmVEb21Mb2FkZWQgPSAoZnVuYykgPT4ge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBmdW5jO1xyXG4gICAgfSk7XHJcbn07XHJcbmNvbnN0IHZpZXcgPSAodmlldykgPT4ge1xyXG4gICAgY29uc3QgcmVuZGVyVmlld3RvSFRNTCA9IHRvSFRNTCh2aWV3KTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKS5pbm5lckhUTUwgPSByZW5kZXJWaWV3dG9IVE1MO1xyXG59O1xyXG5jb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIHByb3BzID0ge30sIC4uLmNoaWxkcmVuKSA9PiB7XHJcbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmZsYXQoKTtcclxuICAgIGlmICh0eXBlLnByb3RvdHlwZSAmJiB0eXBlLnByb3RvdHlwZS5pc1FuZFJlYWN0Q2xhc3NDb21wb25lbnQpIHtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IG5ldyB0eXBlKHByb3BzKTtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50SW5zdGFuY2UucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiB0eXBlKHByb3BzKTtcclxuICAgIH1cclxuICAgIHByb3BzID0gcHJvcHMgfHwge307XHJcbiAgICBsZXQgZGF0YVByb3BzID0ge307XHJcbiAgICBsZXQgZXZlbnRQcm9wcyA9IHt9O1xyXG4gICAgZm9yIChsZXQgcHJvcEtleSBpbiBwcm9wcykge1xyXG4gICAgICAgIC8vIGV2ZW50IHByb3BzIGFsd2F5cyBzdGFydHdpdGggb24gZWcuIG9uQ2xpY2ssIG9uQ2hhbmdlIGV0Yy5cclxuICAgICAgICBpZiAocHJvcEtleS5zdGFydHNXaXRoKCdvbicpKSB7XHJcbiAgICAgICAgICAgIC8vIG9uQ2xpY2sgLT4gY2xpY2tcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBwcm9wS2V5LnN1YnN0cmluZygyKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBldmVudFByb3BzW2V2ZW50XSA9IHByb3BzW3Byb3BLZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGF0YVByb3BzW3Byb3BLZXldID0gcHJvcHNbcHJvcEtleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNuYWJiZG9tXzEuaCh0eXBlLCB7IHByb3BzIH0sIGNoaWxkcmVuKTtcclxufTtcclxuY29uc3QgX191cGRhdGVyID0gKGluc3RhbmNlKSA9PiB7XHJcbiAgICByZXR1cm4gaW5zdGFuY2U7XHJcbn07XHJcbmNvbnN0IGNvbmZpZyA9IChlbnYpID0+IHtcclxuICAgIGlmIChlbnYgPT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgfVxyXG4gICAgaWYgKGVudiA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgfVxyXG4gICAgaWYgKCFlbnYgfHwgZW52ID09PSAnJykge1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBRdWljayA9IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIHJ1bkJlZm9yZURvbUxvYWRlZCxcclxuICAgIHZpZXcsXHJcbiAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgX191cGRhdGVyLFxyXG4gICAgY29uZmlnLFxyXG4gICAgcmVuZGVyLFxyXG4gICAgX2luaXQsXHJcbiAgICBsaXN0ZW5lcixcclxuICAgICQsXHJcbiAgICBjb21wb25lbnRMb2FkZWQsXHJcbn07XHJcblF1aWNrLnJ1bkJlZm9yZURvbUxvYWRlZChRdWljay5faW5pdCk7XHJcblF1aWNrLnJ1bkJlZm9yZURvbUxvYWRlZChRdWljay5saXN0ZW5lcik7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFF1aWNrO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnVzZVJlZiA9IGV4cG9ydHMuUXVpY2tSb3V0ZXJMaW5rID0gZXhwb3J0cy5jcmVhdGVQb3BTdGF0ZSA9IGV4cG9ydHMuUXVpY2tSb3V0ZXIgPSB2b2lkIDA7XHJcbmNvbnN0IHF1aWNranNfY29tcG9uZW50XzEgPSByZXF1aXJlKFwicXVpY2tqcy1jb21wb25lbnRcIik7XHJcbmNvbnN0IHF1aWNrX2Vycm9yXzEgPSByZXF1aXJlKFwicXVpY2stZXJyb3JcIik7XHJcbmNvbnN0IHBhdGhUb1JlZ2V4ID0gKHBhdGgpID0+IG5ldyBSZWdFeHAoJ14nICsgcGF0aC5yZXBsYWNlKC9cXC8vZywgJ1xcXFwvJykucmVwbGFjZSgvOlxcdysvZywgJyguKyknKSArICckJyk7XHJcbmNvbnN0IGdldFBhcmFtcyA9IChtYXRjaCkgPT4ge1xyXG4gICAgaWYgKG1hdGNoLnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdCgnbWlzc2luZyByZXF1aXJlZCBwYXJhbXMnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbHVlcyA9IG1hdGNoLnJlc3VsdC5zbGljZSgxKTtcclxuICAgIGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKG1hdGNoLnJvdXRlLnBhdGgubWF0Y2hBbGwoLzooXFx3KykvZykpLm1hcCgocmVzdWx0KSA9PiByZXN1bHRbMV0pO1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGtleXMubWFwKChrZXksIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVzW2ldXTtcclxuICAgIH0pKTtcclxufTtcclxuY2xhc3MgUXVpY2tSb3V0ZXIge1xyXG4gICAgYXN5bmMgdXNlUm91dGUocm91dGVzLCB1cmwpIHtcclxuICAgICAgICBpZiAocm91dGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBuZXcgcXVpY2tfZXJyb3JfMS5kZWZhdWx0KCdyb3V0ZXMgY2Fubm90IGJlIGVtcHR5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcm91dGUgbWF0Y2hlcyBVUkxcclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcm91dGVzLm1hcCgocm91dGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiByb3V0ZSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogbG9jYXRpb24ucGF0aG5hbWUubWF0Y2gocGF0aFRvUmVnZXgocm91dGUucGF0aCkpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBmaW5kTWF0Y2ggPSBtYXRjaGVzLmZpbmQoKG1hdGNoKSA9PiBtYXRjaC5yZXN1bHQgIT09IG51bGwpO1xyXG4gICAgICAgIGlmICghZmluZE1hdGNoKSB7XHJcbiAgICAgICAgICAgIGZpbmRNYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiByb3V0ZXMuZmluZCgocm91dGUpID0+IHJvdXRlLnBhdGggPT09ICcvZXJyb3InKSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogW2xvY2F0aW9uLnBhdGhuYW1lXSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBmaW5kTWF0Y2gucm91dGUudmlldyhnZXRQYXJhbXMoZmluZE1hdGNoKSk7XHJcbiAgICAgICAgICAgIHF1aWNranNfY29tcG9uZW50XzEuZGVmYXVsdC52aWV3KGF3YWl0IHZpZXcucmVuZGVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IGZpbmRNYXRjaC5yb3V0ZS52aWV3KGdldFBhcmFtcyhmaW5kTWF0Y2gpKTtcclxuICAgICAgICBxdWlja2pzX2NvbXBvbmVudF8xLmRlZmF1bHQudmlldyhhd2FpdCB2aWV3LnJlbmRlcigpKTtcclxuICAgICAgICB0aGlzLnNldFRpdGxlKGZpbmRNYXRjaC5yb3V0ZS50aXRsZSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcztcclxuICAgIH1cclxuICAgIGdldFJvdXRlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uc3QgZnJvbSA9IGRvY3VtZW50LnJlZmVycmVyO1xyXG4gICAgICAgIGNvbnN0IHRvID0gbG9jYXRpb24uaHJlZjtcclxuICAgICAgICBjb25zdCBuZXh0ID0gRnVuY3Rpb247XHJcbiAgICAgICAgY29uc3Qgcm91dGUgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZ1bGxQYXRoOiBsb2NhdGlvbi5ocmVmLFxyXG4gICAgICAgICAgICAgICAgcGF0aG5hbWU6IGxvY2F0aW9uLnBhdGhuYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgY2FsbGJhY2socm91dGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvLFxyXG4gICAgICAgICAgICBmcm9tLFxyXG4gICAgICAgICAgICByb3V0ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlTmF2aWdhdGlvbihyb3V0ZXMpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5sb2NhbE5hbWUgPT09ICdhJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuZXh0ZXJuYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gZS50YXJnZXQuaHJlZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIGUudGFyZ2V0LmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgUXVpY2tSb3V0ZXIucHJvdG90eXBlLnVzZVJvdXRlKHJvdXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgaWYgKHRpdGxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnUXVpY2sgQXBwJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUXVpY2tSb3V0ZXIgPSBRdWlja1JvdXRlcjtcclxuZnVuY3Rpb24gY3JlYXRlUG9wU3RhdGUocm91dGVzKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XHJcbiAgICAgICAgUXVpY2tSb3V0ZXIucHJvdG90eXBlLnVzZVJvdXRlKHJvdXRlcyk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVBvcFN0YXRlID0gY3JlYXRlUG9wU3RhdGU7XHJcbmNsYXNzIFF1aWNrUm91dGVyTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgY29uc3QgdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbGlua1RvID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RvJyk7XHJcbiAgICAgICAgaWYgKCFsaW5rVG8pIHtcclxuICAgICAgICAgICAgbmV3IHF1aWNrX2Vycm9yXzEuZGVmYXVsdChgdG8gYXR0cmlidXRlIG11c3QgYmUgc3BlY2lmaWVkIHRvIHJvdXRlLCBxdWljay1saW5rIHJldHVybmVkICR7bGlua1RvfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjdXN0b21UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgY3VzdG9tVGFnLmhyZWYgPSBsaW5rVG87XHJcbiAgICAgICAgY3VzdG9tVGFnLmlubmVySFRNTCA9IHRoaXMuaW5uZXJIVE1MO1xyXG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgncmVmJykpIHtcclxuICAgICAgICAgICAgY3VzdG9tVGFnLmlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3JlZicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJykpIHtcclxuICAgICAgICAgICAgY3VzdG9tVGFnLmlkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGN1c3RvbVRhZywgdGhpcyk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgICBpZiAodGhpcy5pbm5lckhUTUwgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbVRhZy5pbm5lclRleHQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJJID0gdGhpcy5hdHRyaWJ1dGVzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBhID0gMDsgYSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmliQSA9IHRoaXMuYXR0cmlidXRlc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJJLm5hbWUgPT09ICd0bycpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBocmVmID0gJ2hyZWYnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYkkubmFtZSA9PT0gaHJlZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVRhZy5zZXRBdHRyaWJ1dGUoYCR7YXR0cmliSS5uYW1lfWAsIGAke2F0dHJpYkkudmFsdWV9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlF1aWNrUm91dGVyTGluayA9IFF1aWNrUm91dGVyTGluaztcclxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncXVpY2stcm91dGVyLWxpbmsnLCBRdWlja1JvdXRlckxpbmspO1xyXG5xdWlja2pzX2NvbXBvbmVudF8xLmRlZmF1bHQucnVuQmVmb3JlRG9tTG9hZGVkKFF1aWNrUm91dGVyTGluayk7XHJcbmNsYXNzIHVzZVJlZiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBhcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcHA/LmNoaWxkcmVuKTtcclxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuZ2V0QXR0cmlidXRlKCdpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnVzZVJlZiA9IHVzZVJlZjtcclxuIiwiXG4vLyBBbGwgU1ZHIGNoaWxkcmVuIGVsZW1lbnRzLCBub3QgaW4gdGhpcyBsaXN0LCBzaG91bGQgc2VsZi1jbG9zZVxuXG5leHBvcnRzLkNPTlRBSU5FUiA9IHtcbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHL2ludHJvLmh0bWwjVGVybUNvbnRhaW5lckVsZW1lbnRcbiAgJ2EnOiB0cnVlLFxuICAnZGVmcyc6IHRydWUsXG4gICdnbHlwaCc6IHRydWUsXG4gICdnJzogdHJ1ZSxcbiAgJ21hcmtlcic6IHRydWUsXG4gICdtYXNrJzogdHJ1ZSxcbiAgJ21pc3NpbmctZ2x5cGgnOiB0cnVlLFxuICAncGF0dGVybic6IHRydWUsXG4gICdzdmcnOiB0cnVlLFxuICAnc3dpdGNoJzogdHJ1ZSxcbiAgJ3N5bWJvbCc6IHRydWUsXG4gICd0ZXh0JzogdHJ1ZSxcblxuICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcvaW50cm8uaHRtbCNUZXJtRGVzY3JpcHRpdmVFbGVtZW50XG4gICdkZXNjJzogdHJ1ZSxcbiAgJ21ldGFkYXRhJzogdHJ1ZSxcbiAgJ3RpdGxlJzogdHJ1ZVxufVxuXG4vLyBodHRwOi8vd3d3LnczLm9yZy9odG1sL3dnL2RyYWZ0cy9odG1sL21hc3Rlci9zeW50YXguaHRtbCN2b2lkLWVsZW1lbnRzXG5cbmV4cG9ydHMuVk9JRCA9IHtcbiAgYXJlYTogdHJ1ZSxcbiAgYmFzZTogdHJ1ZSxcbiAgYnI6IHRydWUsXG4gIGNvbDogdHJ1ZSxcbiAgZW1iZWQ6IHRydWUsXG4gIGhyOiB0cnVlLFxuICBpbWc6IHRydWUsXG4gIGlucHV0OiB0cnVlLFxuICBrZXlnZW46IHRydWUsXG4gIGxpbms6IHRydWUsXG4gIG1ldGE6IHRydWUsXG4gIHBhcmFtOiB0cnVlLFxuICBzb3VyY2U6IHRydWUsXG4gIHRyYWNrOiB0cnVlLFxuICB3YnI6IHRydWVcbn1cbiIsIlxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxudmFyIHBhcnNlU2VsZWN0b3IgPSByZXF1aXJlKCdwYXJzZS1zZWwnKVxudmFyIFZPSURfRUxFTUVOVFMgPSByZXF1aXJlKCcuL2VsZW1lbnRzJykuVk9JRFxudmFyIENPTlRBSU5FUl9FTEVNRU5UUyA9IHJlcXVpcmUoJy4vZWxlbWVudHMnKS5DT05UQUlORVJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbml0IChtb2R1bGVzKSB7XG4gIGZ1bmN0aW9uIHBhcnNlICh2bm9kZSwgbm9kZSkge1xuICAgIHZhciByZXN1bHQgPSBbXVxuICAgIHZhciBhdHRyaWJ1dGVzID0gbmV3IE1hcChbXG4gICAgICAvLyBUaGVzZSBjYW4gYmUgb3ZlcndyaXR0ZW4gYmVjYXVzZSB0aGF04oCZcyB3aGF0IGhhcHBlbnMgaW4gc25hYmJkb21cbiAgICAgIFsnaWQnLCBub2RlLmlkXSxcbiAgICAgIFsnY2xhc3MnLCBub2RlLmNsYXNzTmFtZV1cbiAgICBdKVxuXG4gICAgbW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChmbiwgaW5kZXgpIHtcbiAgICAgIGZuKHZub2RlLCBhdHRyaWJ1dGVzKVxuICAgIH0pXG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGtleSArICc9XCInICsgdmFsdWUgKyAnXCInKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbmRlclRvU3RyaW5nICh2bm9kZSkge1xuICAgIGlmICh0eXBlb2Ygdm5vZGUgPT09ICd1bmRlZmluZWQnIHx8IHZub2RlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICBpZiAoIXZub2RlLnNlbCAmJiB0eXBlb2Ygdm5vZGUudGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlc2NhcGUodm5vZGUudGV4dClcbiAgICB9XG5cbiAgICB2bm9kZS5kYXRhID0gdm5vZGUuZGF0YSB8fCB7fVxuXG4gICAgLy8gU3VwcG9ydCB0aHVua3NcbiAgICBpZiAodm5vZGUuZGF0YS5ob29rICYmXG4gICAgICB0eXBlb2Ygdm5vZGUuZGF0YS5ob29rLmluaXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiB2bm9kZS5kYXRhLmZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2bm9kZS5kYXRhLmhvb2suaW5pdCh2bm9kZSlcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IHBhcnNlU2VsZWN0b3Iodm5vZGUuc2VsKVxuICAgIHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lXG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBwYXJzZSh2bm9kZSwgbm9kZSlcbiAgICB2YXIgc3ZnID0gdm5vZGUuZGF0YS5ucyA9PT0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ1xuICAgIHZhciB0YWcgPSBbXVxuXG4gICAgaWYgKHRhZ05hbWUgPT09ICchJykge1xuICAgICAgcmV0dXJuICc8IS0tJyArIHZub2RlLnRleHQgKyAnLS0+J1xuICAgIH1cblxuICAgIC8vIE9wZW4gdGFnXG4gICAgdGFnLnB1c2goJzwnICsgdGFnTmFtZSlcbiAgICBpZiAoYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgIHRhZy5wdXNoKCcgJyArIGF0dHJpYnV0ZXMpXG4gICAgfVxuICAgIGlmIChzdmcgJiYgQ09OVEFJTkVSX0VMRU1FTlRTW3RhZ05hbWVdICE9PSB0cnVlKSB7XG4gICAgICB0YWcucHVzaCgnIC8nKVxuICAgIH1cbiAgICB0YWcucHVzaCgnPicpXG5cbiAgICAvLyBDbG9zZSB0YWcsIGlmIG5lZWRlZFxuICAgIGlmICgoVk9JRF9FTEVNRU5UU1t0YWdOYW1lXSAhPT0gdHJ1ZSAmJiAhc3ZnKSB8fFxuICAgICAgICAoc3ZnICYmIENPTlRBSU5FUl9FTEVNRU5UU1t0YWdOYW1lXSA9PT0gdHJ1ZSkpIHtcbiAgICAgIGlmICh2bm9kZS5kYXRhLnByb3BzICYmIHZub2RlLmRhdGEucHJvcHMuaW5uZXJIVE1MKSB7XG4gICAgICAgIHRhZy5wdXNoKHZub2RlLmRhdGEucHJvcHMuaW5uZXJIVE1MKVxuICAgICAgfSBlbHNlIGlmICh2bm9kZS50ZXh0KSB7XG4gICAgICAgIHRhZy5wdXNoKGVzY2FwZSh2bm9kZS50ZXh0KSlcbiAgICAgIH0gZWxzZSBpZiAodm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgdm5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICB0YWcucHVzaChyZW5kZXJUb1N0cmluZyhjaGlsZCkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICB0YWcucHVzaCgnPC8nICsgdGFnTmFtZSArICc+JylcbiAgICB9XG5cbiAgICByZXR1cm4gdGFnLmpvaW4oJycpXG4gIH1cbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxuXG4vLyBkYXRhLmF0dHJzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXR0cnNNb2R1bGUgKHZub2RlLCBhdHRyaWJ1dGVzKSB7XG4gIHZhciBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnMgfHwge31cblxuICBmb3JPd24oYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgYXR0cmlidXRlcy5zZXQoa2V5LCBlc2NhcGUodmFsdWUpKVxuICB9KVxufVxuIiwiXG52YXIgZm9yT3duID0gcmVxdWlyZSgnbG9kYXNoLmZvcm93bicpXG52YXIgcmVtb3ZlID0gcmVxdWlyZSgnbG9kYXNoLnJlbW92ZScpXG52YXIgdW5pcSA9IHJlcXVpcmUoJ2xvZGFzaC51bmlxJylcblxuLy8gZGF0YS5jbGFzc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsYXNzTW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgdmFsdWVzXG4gIHZhciBfYWRkID0gW11cbiAgdmFyIF9yZW1vdmUgPSBbXVxuICB2YXIgY2xhc3NlcyA9IHZub2RlLmRhdGEuY2xhc3MgfHwge31cbiAgdmFyIGV4aXN0aW5nID0gYXR0cmlidXRlcy5nZXQoJ2NsYXNzJylcbiAgZXhpc3RpbmcgPSBleGlzdGluZy5sZW5ndGggPiAwID8gZXhpc3Rpbmcuc3BsaXQoJyAnKSA6IFtdXG5cbiAgZm9yT3duKGNsYXNzZXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICBfYWRkLnB1c2goa2V5KVxuICAgIH0gZWxzZSB7XG4gICAgICBfcmVtb3ZlLnB1c2goa2V5KVxuICAgIH1cbiAgfSlcblxuICB2YWx1ZXMgPSByZW1vdmUodW5pcShleGlzdGluZy5jb25jYXQoX2FkZCkpLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gX3JlbW92ZS5pbmRleE9mKHZhbHVlKSA8IDBcbiAgfSlcblxuICBpZiAodmFsdWVzLmxlbmd0aCkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KCdjbGFzcycsIHZhbHVlcy5qb2luKCcgJykpXG4gIH1cbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxuXG4vLyBkYXRhLmRhdGFzZXRcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXRhc2V0TW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgZGF0YXNldCA9IHZub2RlLmRhdGEuZGF0YXNldCB8fCB7fVxuXG4gIGZvck93bihkYXRhc2V0LCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGF0dHJpYnV0ZXMuc2V0KGBkYXRhLSR7a2V5fWAsIGVzY2FwZSh2YWx1ZSkpXG4gIH0pXG59XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjbGFzczogcmVxdWlyZSgnLi9jbGFzcycpLFxuICBwcm9wczogcmVxdWlyZSgnLi9wcm9wcycpLFxuICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKSxcbiAgZGF0YXNldDogcmVxdWlyZSgnLi9kYXRhc2V0Jylcbn1cbiIsIlxudmFyIGZvck93biA9IHJlcXVpcmUoJ2xvZGFzaC5mb3Jvd24nKVxudmFyIGVzY2FwZSA9IHJlcXVpcmUoJ2xvZGFzaC5lc2NhcGUnKVxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvZWxlbWVudFxudmFyIG9taXQgPSBbXG4gICdhdHRyaWJ1dGVzJyxcbiAgJ2NoaWxkRWxlbWVudENvdW50JyxcbiAgJ2NoaWxkcmVuJyxcbiAgJ2NsYXNzTGlzdCcsXG4gICdjbGllbnRIZWlnaHQnLFxuICAnY2xpZW50TGVmdCcsXG4gICdjbGllbnRUb3AnLFxuICAnY2xpZW50V2lkdGgnLFxuICAnY3VycmVudFN0eWxlJyxcbiAgJ2ZpcnN0RWxlbWVudENoaWxkJyxcbiAgJ2lubmVySFRNTCcsXG4gICdsYXN0RWxlbWVudENoaWxkJyxcbiAgJ25leHRFbGVtZW50U2libGluZycsXG4gICdvbmdvdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ29ubG9zdHBvaW50ZXJjYXB0dXJlJyxcbiAgJ29ud2hlZWwnLFxuICAnb3V0ZXJIVE1MJyxcbiAgJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnLFxuICAncnVudGltZVN0eWxlJyxcbiAgJ3Njcm9sbEhlaWdodCcsXG4gICdzY3JvbGxMZWZ0JyxcbiAgJ3Njcm9sbExlZnRNYXgnLFxuICAnc2Nyb2xsVG9wJyxcbiAgJ3Njcm9sbFRvcE1heCcsXG4gICdzY3JvbGxXaWR0aCcsXG4gICd0YWJTdG9wJyxcbiAgJ3RhZ05hbWUnXG5dXG5cbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjYm9vbGVhbi1hdHRyaWJ1dGVzXG52YXIgYm9vbGVhbkF0dHJpYnV0ZXMgPSBbXG4gICdkaXNhYmxlZCcsXG4gICd2aXNpYmxlJyxcbiAgJ2NoZWNrZWQnLFxuICAncmVhZG9ubHknLFxuICAncmVxdWlyZWQnLFxuICAnYWxsb3dmdWxsc2NyZWVuJyxcbiAgJ2F1dG9mb2N1cycsXG4gICdhdXRvcGxheScsXG4gICdjb21wYWN0JyxcbiAgJ2NvbnRyb2xzJyxcbiAgJ2RlZmF1bHQnLFxuICAnZm9ybW5vdmFsaWRhdGUnLFxuICAnaGlkZGVuJyxcbiAgJ2lzbWFwJyxcbiAgJ2l0ZW1zY29wZScsXG4gICdsb29wJyxcbiAgJ211bHRpcGxlJyxcbiAgJ211dGVkJyxcbiAgJ25vcmVzaXplJyxcbiAgJ25vc2hhZGUnLFxuICAnbm92YWxpZGF0ZScsXG4gICdub3dyYXAnLFxuICAnb3BlbicsXG4gICdyZXZlcnNlZCcsXG4gICdzZWFtbGVzcycsXG4gICdzZWxlY3RlZCcsXG4gICdzb3J0YWJsZScsXG4gICd0cnVlc3BlZWQnLFxuICAndHlwZW11c3RtYXRjaCdcbl1cblxuLy8gZGF0YS5wcm9wc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHByb3BzTW9kdWxlICh2bm9kZSwgYXR0cmlidXRlcykge1xuICB2YXIgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzIHx8IHt9XG5cbiAgZm9yT3duKHByb3BzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGlmIChvbWl0LmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGtleSA9PT0gJ2h0bWxGb3InKSB7XG4gICAgICBrZXkgPSAnZm9yJ1xuICAgIH1cbiAgICBpZiAoa2V5ID09PSAnY2xhc3NOYW1lJykge1xuICAgICAga2V5ID0gJ2NsYXNzJ1xuICAgIH1cblxuICAgIHZhciBsa2V5ID0ga2V5LnRvTG93ZXJDYXNlKClcbiAgICBpZiAofmJvb2xlYW5BdHRyaWJ1dGVzLmluZGV4T2YobGtleSkpIHtcbiAgICAgIGlmICh2YWx1ZSkgeyAvLyBzZXQgYXR0ciBvbmx5IHdoZW4gdHJ1dGh5XG4gICAgICAgIGF0dHJpYnV0ZXMuc2V0KGxrZXksIGxrZXkpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGF0dHJpYnV0ZXMuc2V0KGxrZXksIGVzY2FwZSh2YWx1ZSkpXG4gICAgfVxuICB9KVxufVxuIiwiXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXG52YXIgZm9yT3duID0gcmVxdWlyZSgnbG9kYXNoLmZvcm93bicpXG52YXIgZXNjYXBlID0gcmVxdWlyZSgnbG9kYXNoLmVzY2FwZScpXG52YXIga2ViYWJDYXNlID0gcmVxdWlyZSgnbG9kYXNoLmtlYmFiY2FzZScpXG5cbi8vIGRhdGEuc3R5bGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHlsZU1vZHVsZSAodm5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgdmFyIHZhbHVlcyA9IFtdXG4gIHZhciBzdHlsZSA9IHZub2RlLmRhdGEuc3R5bGUgfHwge31cblxuICAvLyBtZXJnZSBpbiBgZGVsYXllZGAgcHJvcGVydGllc1xuICBpZiAoc3R5bGUuZGVsYXllZCkge1xuICAgIGFzc2lnbihzdHlsZSwgc3R5bGUuZGVsYXllZClcbiAgfVxuXG4gIGZvck93bihzdHlsZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAvLyBvbWl0IGhvb2sgb2JqZWN0c1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHZhciBrZWJhYktleSA9IGtlYmFiQ2FzZShrZXkpXG4gICAgICB2YWx1ZXMucHVzaCgoa2V5Lm1hdGNoKC9eLS0uKi8pID8gJy0tJyArIGtlYmFiS2V5IDoga2ViYWJLZXkpICsgJzogJyArIGVzY2FwZSh2YWx1ZSkpXG4gICAgfVxuICB9KVxuXG4gIGlmICh2YWx1ZXMubGVuZ3RoKSB7XG4gICAgYXR0cmlidXRlcy5zZXQoJ3N0eWxlJywgdmFsdWVzLmpvaW4oJzsgJykpXG4gIH1cbn1cbiIsImltcG9ydCB7IHZub2RlIH0gZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaChzZWwsIGIsIGMpIHtcbiAgICB2YXIgZGF0YSA9IHt9LCBjaGlsZHJlbiwgdGV4dCwgaTtcbiAgICBpZiAoYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRhdGEgPSBiO1xuICAgICAgICBpZiAoaXMuYXJyYXkoYykpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYykpIHtcbiAgICAgICAgICAgIHRleHQgPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgJiYgYy5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2NdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXMuYXJyYXkoYikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYikpIHtcbiAgICAgICAgICAgIHRleHQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIgJiYgYi5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2JdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaXMucHJpbWl0aXZlKGNoaWxkcmVuW2ldKSlcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXSA9IHZub2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkcmVuW2ldLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxbMF0gPT09ICdzJyAmJiBzZWxbMV0gPT09ICd2JyAmJiBzZWxbMl0gPT09ICdnJyAmJlxuICAgICAgICAoc2VsLmxlbmd0aCA9PT0gMyB8fCBzZWxbM10gPT09ICcuJyB8fCBzZWxbM10gPT09ICcjJykpIHtcbiAgICAgICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCk7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuO1xuZXhwb3J0IGRlZmF1bHQgaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWguanMubWFwIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0IHZhciBodG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0IGRlZmF1bHQgaHRtbERvbUFwaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxkb21hcGkuanMubWFwIiwiZXhwb3J0IHZhciBhcnJheSA9IEFycmF5LmlzQXJyYXk7XG5leHBvcnQgZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzLmpzLm1hcCIsImltcG9ydCB2bm9kZSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCAqIGFzIGlzIGZyb20gJy4vaXMnO1xuaW1wb3J0IGh0bWxEb21BcGkgZnJvbSAnLi9odG1sZG9tYXBpJztcbmZ1bmN0aW9uIGlzVW5kZWYocykgeyByZXR1cm4gcyA9PT0gdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc0RlZihzKSB7IHJldHVybiBzICE9PSB1bmRlZmluZWQ7IH1cbnZhciBlbXB0eU5vZGUgPSB2bm9kZSgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5mdW5jdGlvbiBzYW1lVm5vZGUodm5vZGUxLCB2bm9kZTIpIHtcbiAgICByZXR1cm4gdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJiB2bm9kZTEuc2VsID09PSB2bm9kZTIuc2VsO1xufVxuZnVuY3Rpb24gaXNWbm9kZSh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5zZWwgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gICAgdmFyIGksIG1hcCA9IHt9LCBrZXksIGNoO1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICAgIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICBrZXkgPSBjaC5rZXk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbWFwW2tleV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59XG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knLCAncHJlJywgJ3Bvc3QnXTtcbmV4cG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZXhwb3J0IHsgdGh1bmsgfSBmcm9tICcuL3RodW5rJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KG1vZHVsZXMsIGRvbUFwaSkge1xuICAgIHZhciBpLCBqLCBjYnMgPSB7fTtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sRG9tQXBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaG9vayA9IG1vZHVsZXNbal1baG9va3NbaV1dO1xuICAgICAgICAgICAgaWYgKGhvb2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNic1tob29rc1tpXV0ucHVzaChob29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbXB0eU5vZGVBdChlbG0pIHtcbiAgICAgICAgdmFyIGlkID0gZWxtLmlkID8gJyMnICsgZWxtLmlkIDogJyc7XG4gICAgICAgIHZhciBjID0gZWxtLmNsYXNzTmFtZSA/ICcuJyArIGVsbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcbiAgICAgICAgcmV0dXJuIHZub2RlKGFwaS50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSArIGlkICsgYywge30sIFtdLCB1bmRlZmluZWQsIGVsbSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IoY2hpbGRFbG0sIGxpc3RlbmVycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcm1DYigpIHtcbiAgICAgICAgICAgIGlmICgtLWxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IGFwaS5wYXJlbnROb2RlKGNoaWxkRWxtKTtcbiAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50XzEsIGNoaWxkRWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbiwgc2VsID0gdm5vZGUuc2VsO1xuICAgICAgICBpZiAoc2VsID09PSAnIScpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgdm5vZGUudGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFBhcnNlIHNlbGVjdG9yXG4gICAgICAgICAgICB2YXIgaGFzaElkeCA9IHNlbC5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICB2YXIgZG90SWR4ID0gc2VsLmluZGV4T2YoJy4nLCBoYXNoSWR4KTtcbiAgICAgICAgICAgIHZhciBoYXNoID0gaGFzaElkeCA+IDAgPyBoYXNoSWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkb3QgPSBkb3RJZHggPiAwID8gZG90SWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0YWcgPSBoYXNoSWR4ICE9PSAtMSB8fCBkb3RJZHggIT09IC0xID8gc2VsLnNsaWNlKDAsIE1hdGgubWluKGhhc2gsIGRvdCkpIDogc2VsO1xuICAgICAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IGlzRGVmKGRhdGEpICYmIGlzRGVmKGkgPSBkYXRhLm5zKSA/IGFwaS5jcmVhdGVFbGVtZW50TlMoaSwgdGFnKVxuICAgICAgICAgICAgICAgIDogYXBpLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgICAgIGlmIChoYXNoIDwgZG90KVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2VsLnNsaWNlKGhhc2ggKyAxLCBkb3QpKTtcbiAgICAgICAgICAgIGlmIChkb3RJZHggPiAwKVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgc2VsLnNsaWNlKGRvdCArIDEpLnJlcGxhY2UoL1xcLi9nLCAnICcpKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaS5pbnNlcnQpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGUuZWxtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGosIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpXG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0odm5vZGUpO1xuICAgICAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHZub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBudWxsICYmIHR5cGVvZiBpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGlfMSA9IHZvaWQgMCwgbGlzdGVuZXJzID0gdm9pZCAwLCBybSA9IHZvaWQgMCwgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYoY2guc2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKGNoLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpXzEgPSAwOyBpXzEgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYnMucmVtb3ZlW2lfMV0oY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmKGlfMSA9IGNoLmRhdGEpICYmIGlzRGVmKGlfMSA9IGlfMS5ob29rKSAmJiBpc0RlZihpXzEgPSBpXzEucmVtb3ZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaV8xKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyAvLyBUZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudEVsbSwgY2guZWxtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ocGFyZW50RWxtLCBvbGRDaCwgbmV3Q2gsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgb2xkU3RhcnRJZHggPSAwLCBuZXdTdGFydElkeCA9IDA7XG4gICAgICAgIHZhciBvbGRFbmRJZHggPSBvbGRDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgICAgICB2YXIgb2xkRW5kVm5vZGUgPSBvbGRDaFtvbGRFbmRJZHhdO1xuICAgICAgICB2YXIgbmV3RW5kSWR4ID0gbmV3Q2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICAgICAgdmFyIG5ld0VuZFZub2RlID0gbmV3Q2hbbmV3RW5kSWR4XTtcbiAgICAgICAgdmFyIG9sZEtleVRvSWR4O1xuICAgICAgICB2YXIgaWR4SW5PbGQ7XG4gICAgICAgIHZhciBlbG1Ub01vdmU7XG4gICAgICAgIHZhciBiZWZvcmU7XG4gICAgICAgIHdoaWxlIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggJiYgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdOyAvLyBWbm9kZSBtaWdodCBoYXZlIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2xkRW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3U3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3RW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlKSkgeyAvLyBWbm9kZSBtb3ZlZCByaWdodFxuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcob2xkRW5kVm5vZGUuZWxtKSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlKSkgeyAvLyBWbm9kZSBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleVRvSWR4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeEluT2xkID0gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkgeyAvLyBOZXcgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtVG9Nb3ZlLnNlbCAhPT0gbmV3U3RhcnRWbm9kZS5zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgZWxtVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCB8fCBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ld0NoW25ld0VuZElkeCArIDFdID09IG51bGwgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4ICsgMV0uZWxtO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgaG9vaztcbiAgICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5kYXRhKSAmJiBpc0RlZihob29rID0gaS5ob29rKSAmJiBpc0RlZihpID0gaG9vay5wcmVwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2bm9kZS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy51cGRhdGVbaV0ob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSlcbiAgICAgICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZENoICE9PSBjaClcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMoZWxtLCBudWxsLCBjaCwgMCwgY2gubGVuZ3RoIC0gMSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9sZFZub2RlLnRleHQgIT09IHZub2RlLnRleHQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCB2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEZWYoaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucG9zdHBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwYXRjaChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGVsbSwgcGFyZW50O1xuICAgICAgICB2YXIgaW5zZXJ0ZWRWbm9kZVF1ZXVlID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucHJlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnByZVtpXSgpO1xuICAgICAgICBpZiAoIWlzVm5vZGUob2xkVm5vZGUpKSB7XG4gICAgICAgICAgICBvbGRWbm9kZSA9IGVtcHR5Tm9kZUF0KG9sZFZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2FtZVZub2RlKG9sZFZub2RlLCB2bm9kZSkpIHtcbiAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICAgICAgcGFyZW50ID0gYXBpLnBhcmVudE5vZGUoZWxtKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudCwgdm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcoZWxtKSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudCwgW29sZFZub2RlXSwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGluc2VydGVkVm5vZGVRdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldLmRhdGEuaG9vay5pbnNlcnQoaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnBvc3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucG9zdFtpXSgpO1xuICAgICAgICByZXR1cm4gdm5vZGU7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNuYWJiZG9tLmpzLm1hcCIsImltcG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZnVuY3Rpb24gY29weVRvVGh1bmsodm5vZGUsIHRodW5rKSB7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xuICAgIHZub2RlLmRhdGEuZm4gPSB0aHVuay5kYXRhLmZuO1xuICAgIHZub2RlLmRhdGEuYXJncyA9IHRodW5rLmRhdGEuYXJncztcbiAgICB0aHVuay5kYXRhID0gdm5vZGUuZGF0YTtcbiAgICB0aHVuay5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHRodW5rLnRleHQgPSB2bm9kZS50ZXh0O1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbn1cbmZ1bmN0aW9uIGluaXQodGh1bmspIHtcbiAgICB2YXIgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgdm5vZGUgPSBjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBjdXIuYXJncyk7XG4gICAgY29weVRvVGh1bmsodm5vZGUsIHRodW5rKTtcbn1cbmZ1bmN0aW9uIHByZXBhdGNoKG9sZFZub2RlLCB0aHVuaykge1xuICAgIHZhciBpLCBvbGQgPSBvbGRWbm9kZS5kYXRhLCBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciBvbGRBcmdzID0gb2xkLmFyZ3MsIGFyZ3MgPSBjdXIuYXJncztcbiAgICBpZiAob2xkLmZuICE9PSBjdXIuZm4gfHwgb2xkQXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG9sZEFyZ3NbaV0gIT09IGFyZ3NbaV0pIHtcbiAgICAgICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weVRvVGh1bmsob2xkVm5vZGUsIHRodW5rKTtcbn1cbmV4cG9ydCB2YXIgdGh1bmsgPSBmdW5jdGlvbiB0aHVuayhzZWwsIGtleSwgZm4sIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3MgPSBmbjtcbiAgICAgICAgZm4gPSBrZXk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGgoc2VsLCB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBob29rOiB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCB9LFxuICAgICAgICBmbjogZm4sXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCB0aHVuaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRodW5rLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnQgZGVmYXVsdCB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdXBkYXRlUHJvcHMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgY3VyLCBvbGQsIGVsbSA9IHZub2RlLmVsbSwgb2xkUHJvcHMgPSBvbGRWbm9kZS5kYXRhLnByb3BzLCBwcm9wcyA9IHZub2RlLmRhdGEucHJvcHM7XG4gICAgaWYgKCFvbGRQcm9wcyAmJiAhcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkUHJvcHMgPT09IHByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkUHJvcHMgPSBvbGRQcm9wcyB8fCB7fTtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIGZvciAoa2V5IGluIG9sZFByb3BzKSB7XG4gICAgICAgIGlmICghcHJvcHNba2V5XSkge1xuICAgICAgICAgICAgZGVsZXRlIGVsbVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgICAgIG9sZCA9IG9sZFByb3BzW2tleV07XG4gICAgICAgIGlmIChvbGQgIT09IGN1ciAmJiAoa2V5ICE9PSAndmFsdWUnIHx8IGVsbVtrZXldICE9PSBjdXIpKSB7XG4gICAgICAgICAgICBlbG1ba2V5XSA9IGN1cjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMucHJvcHNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlUHJvcHMsIHVwZGF0ZTogdXBkYXRlUHJvcHMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMucHJvcHNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wcy5qcy5tYXAiLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCJcclxuaW1wb3J0IHsgUXVpY2tSb3V0ZXIsIGNyZWF0ZVBvcFN0YXRlIH0gZnJvbSBcInF1aWNranMtcm91dGVyXCI7XHJcbmNvbnN0IHJvdXRlciA9IG5ldyBRdWlja1JvdXRlcjtcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi4vdmlld3MvQXBwXCJcclxuaW1wb3J0IEFib3V0IGZyb20gXCIuLi92aWV3cy9BYm91dFwiXHJcbmltcG9ydCBOb3RGb3VuZCBmcm9tIFwiLi4vdmlld3MvTm90Zm91bmRcIlxyXG5jb25zdCAgcm91dGVzID0gW1xyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICcvJyxcclxuICAgICAgICB2aWV3OiBBcHAsXHJcbiAgICAgICAgdGl0bGU6IFwiSG9tZVwiLFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnL2Fib3V0JyxcclxuICAgICAgICB0aXRsZTogXCJBYm91dFwiLFxyXG4gICAgICAgIHZpZXc6IEFib3V0XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICcvZXJyb3InLFxyXG4gICAgICAgIHZpZXc6IE5vdEZvdW5kLFxyXG4gICAgICAgIHRpdGxlOiBcIlBhZ2UgTm90IEZvdW5kXCIsXHJcbiAgICB9LFxyXG5dO1xyXG5cclxuUXVpY2sucnVuQmVmb3JlRG9tTG9hZGVkKHJvdXRlci51c2VSb3V0ZShyb3V0ZXMpKTtcclxucm91dGVyLmNyZWF0ZU5hdmlnYXRpb24ocm91dGVzKVxyXG5jcmVhdGVQb3BTdGF0ZShyb3V0ZXMpXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcyIsImltcG9ydCBRdWljayBmcm9tIFwicXVpY2tqcy1jb21wb25lbnRcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFib3V0IGV4dGVuZHMgUXVpY2suQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIHN1cGVyKHBhcmFtcylcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uIGFib3V0LWNvbiB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPkhvbWU8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDxxdWljay1yb3V0ZXItbGluayBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnktbm9ybWFsIHVuZGVybGluZSBhY3RpdmVcIiB0bz1cIi9hYm91dFwiPkFib3V0PC9xdWljay1yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvIG10LTEwIHctMTAgcC0xIG1heC13LW1kIGJsb2NrIG1sLWF1dG8gbXItYXV0byBhbmltYXRlLWJvdW5jZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicXVpY2stbG9nbyB3LThcIiBzcmM9XCJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9zZXJ2ZXJ5Z3VrZW4vaW1hZ2UvdXBsb2FkL3YxNjE1MTg4OTkyL1F1aWNrSlMvbG9nby9xdWlja2pzLWxvZ29fd2p4M2R3LnN2Z1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYm91dC1wYWdlIHRleHQtY2VudGVyIG10LTUgdGV4dC0zeGwgdGV4dC1ibGFjayBmb250LWJvbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgcC0xIHdjLXR4dFwiPkFib3V0IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeS1ub3JtYWxcIj5RdWljay5qczwvc3Bhbj4gPC9oMT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXRhaWwgcC0xMCBtbC00IG1yLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibXQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgIFF1aWNrSlMgaXMgYSBKYXZhU2NyaXB0IGxpYnJhcnkgZm9yIGJ1aWxkaW5nIHNpbmdsZSBwYWdlIHNlcnZlci1yZW5kZXJlZCB3ZWIgYXBwbGljYXRpb25zLlxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm10LTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUXVpY2tKUyBjb21lcyB3aXRoIGEgY3VzdG9tIHByZS1jb25maWd1cmVkIGRldmVsb3BtZW50IGVudmlyb25tZW50LiBXZSBzYXZlIHlvdSB0aW1lIGJ1aWxkaW5nIHlvdXIgYXBwbGljYXRpb25zLiBXZSB0YWtlIGF3YXkgdGhlIGhhcmQgcGFydHMsIHNvIHlvdSBjYW4gZm9jdXMgb24gYnVpbGRpbmcgYXBwbGljYXRpb25zIHJhdGhlciBzZXR0aW5nIHVwIHNlcnZlcnMgYW5kIGNvbmZpZ3VyYXRpb25zLlxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm10LTYgZm9udC1ib2xkXCI+RWNvc3lzdGVtIHwgRXh0ZXJuYWwgbGlua3M8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48cXVpY2stcm91dGVyLWxpbmsgdG89XCJodHRwczovL3F1aWNranMub3JnXCIgZGF0YS1leHRlcm5hbCBjbGFzc05hbWU9XCJtci0zIHVuZGVybGluZVwiPlF1aWNranMtY29tcG9uZW50PC9xdWljay1yb3V0ZXItbGluaz48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHF1aWNrLXJvdXRlci1saW5rIHRvPVwiaHR0cHM6Ly9xdWlja2pzLm9yZ1wiIGRhdGEtZXh0ZXJuYWwgY2xhc3NOYW1lPVwibXItMyB1bmRlcmxpbmVcIj5RdWlja2pzLXJvdXRlcjwvcXVpY2stcm91dGVyLWxpbms+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxxdWljay1yb3V0ZXItbGluayB0bz1cImh0dHBzOi8vcXVpY2tqcy5vcmdcIiBkYXRhLWV4dGVybmFsIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+UXVpY2tqcy1kb208L3F1aWNrLXJvdXRlci1saW5rPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCJcclxuaW1wb3J0IFdlbGNvbWUgZnJvbSBcIi4vV2VsY29tZVwiO1xyXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9MaXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUXVpY2suQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIHN1cGVyKHBhcmFtcylcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbiBtYi0xNFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC04IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cIm1yLTMgdGV4dC1wcmltYXJ5LW5vcm1hbCB1bmRlcmxpbmUgYWN0aXZlXCI+SG9tZTwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL2Fib3V0XCIgY2xhc3NOYW1lPVwidW5kZXJsaW5lXCI+QWJvdXQ8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ28gbXQtNSB3LTEwIHAtMSBtYXgtdy1tZCBibG9jayBtbC1hdXRvIG1yLWF1dG8gYW5pbWF0ZS1ib3VuY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInF1aWNrLWxvZ28gdy04XCIgc3JjPVwiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vc2VydmVyeWd1a2VuL2ltYWdlL3VwbG9hZC92MTYxNTE4ODk5Mi9RdWlja0pTL2xvZ28vcXVpY2tqcy1sb2dvX3dqeDNkdy5zdmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VsY29tZSB0ZXh0LWNlbnRlciBtdC0yIHRleHQtM3hsIHRleHQtYmxhY2sgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFdlbGNvbWUgbmFtZT17XCJRdWljay5qc1wifSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYyBtdC02IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGg0PkdldCBnIHN0YXJ0ZWQgYnkgZWRpdGluZyA8c3BhbiBjbGFzc05hbWU9XCJiZy1zbm93IHRleHQtc20gZm9udC1tZWRpdW0gcC0yXCI+c3JjL3ZpZXdzL0FwcC5qczwvc3Bhbj48L2g0PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCI7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIExpc3QoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1tYWluXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LWNvbiBtdC0xMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtMSBmbGV4IGp1c3RpZnktYXJvdW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Qgcm91bmRlZCBwLTMgdy01LzEyIGN1cnNvci1wb2ludGVyIG1heC13LW1kICBib3JkZXIgYm9yZGVyLWdyYXktMjAwIG10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGkgY2xhc3NOYW1lPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtYmxhY2sgZmxleCBpdGVtcy1jZW50ZXIgbXQtMlwiPkRvY3VtZW50YXQgPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5DaGVjayBvdXQgZG9jdW1lbnRhdGlvbiBvbiBob3cgdG8gZ2V0IHN0YXJ0ZWQgYW5kIHNldHVwIHlvdXIgcHJvamVjdCB3aXRoIFF1aWNrLmpzLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0IHJvdW5kZWQgc2hhZG93LXNtIHAtMyB3LTUvMTIgY3Vyc29yLXBvaW50ZXIgbWF4LXctbWQgYm9yZGVyICBib3JkZXItZ3JheS0yMDAgbXQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ibGFjayBmbGV4IGl0ZW1zLWNlbnRlciBtdC0yXCI+TGVhcm4gPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5MZWFybiBhYm91dCBRdWljay5qcyBhbmQgaXQncyBlY29zeXN0ZW0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtMiBmbGV4IGp1c3RpZnktYXJvdW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Qgcm91bmRlZCBzaGFkb3ctc20gcC0zIHctNS8xMiBjdXJzb3ItcG9pbnRlciBtYXgtdy1tZCBib3JkZXIgYm9yZGVyLWdyYXktMjAwICBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIG10LTJcIj5FeGFtcGxlcyA8c3BhbiBjbGFzc05hbWU9XCJtbC0yXCI+PHN2ZyBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIHctNiAtbWItMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTE0IDVsNyA3bTAgMGwtNyA3bTctN0gzXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+PC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWJsYWNrIGZvbnQtbWVkaXVtIG10LTIgbWItM1wiPkNoZWNrIG91dCBvbiBwcm9qZWN0cyBjcmVhdGVkIHdpdGggUXVpY2suanM8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdCByb3VuZGVkIHNoYWRvdy1zbSBwLTMgdy01LzEyIG1heC13LW1kIGJvcmRlciBjdXJzb3ItcG9pbnRlciAgYm9yZGVyLWdyYXktMjAwICBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIG10LTJcIj5EZXBsb3kgPHNwYW4gY2xhc3NOYW1lPVwibWwtMlwiPjxzdmcgY2xhc3NOYW1lPVwidGV4dC1ibGFjayB3LTYgLW1iLTFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xNCA1bDcgN20wIDBsLTcgN203LTdIM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LW1lZGl1bSBtdC0yIG1iLTNcIj5XZSdsbCBzaG93IHlvdSBob3cgdG8gZGVwbG95IHlvdXIgUXVpY2suanMgYXBwbGljYXRpb24gdG8gcHJvZHVjdGlvbi48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdFxyXG5cclxuIiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBRdWljay5Db21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFib3V0LXBhZ2UgdGV4dC1jZW50ZXIgbXQtMTAgdGV4dC0zeGwgdGV4dC1ibGFjayBmb250LWJvbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC01eGwgcC0xIHdjLXR4dFwiPjQwNCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnktbm9ybWFsXCI+Tk9UIEZPVU5EPC9zcGFuPiA8L2gxPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEwIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cIm1yLTMgdW5kZXJsaW5lXCI+SG9tZTwvcXVpY2stcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPHF1aWNrLXJvdXRlci1saW5rIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeS1ub3JtYWwgdW5kZXJsaW5lIGFjdGl2ZVwiIHRvPVwiL2Fib3V0XCI+QWJvdXQ8L3F1aWNrLXJvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiLy8gUXVpY2sgbmVlZHMgdG8gYmUgaW1wb3J0ZWQgdG8gdXNlIGpzeFxyXG5pbXBvcnQgUXVpY2sgZnJvbSBcInF1aWNranMtY29tcG9uZW50XCI7XHJcblxyXG5cclxuY29uc3QgV2VsY29tZSA9ICh7IG5hbWUgfSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8aDEgY2xhc3NOYW1lPSBcInRleHQtNXhsIHAtMSB3Yy10eHRcIiA+V2VsY29tZSB0byA8IHNwYW4gY2xhc3NOYW1lID0gXCJ0ZXh0LXByaW1hcnktbm9ybWFsXCIgPiB7IG5hbWUgfSEgPC9zcGFuPjwvaDE+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlbGNvbWUiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiaW1wb3J0IFF1aWNrIGZyb20gXCJxdWlja2pzLWNvbXBvbmVudFwiO1xyXG5pbXBvcnQgcm91dGVzIGZyb20gXCIuLi9zcmMvcm91dGVyL3JvdXRlc1wiOyJdLCJzb3VyY2VSb290IjoiIn0=