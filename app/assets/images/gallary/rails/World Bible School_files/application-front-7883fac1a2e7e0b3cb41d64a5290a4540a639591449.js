/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
// I18n.js
// =======
//
// This small library provides the Rails I18n API on the Javascript.
// You don't actually have to use Rails (or even Ruby) to use I18n.js.
// Just make sure you export all translations in an object like this:
//
//     I18n.translations.en = {
//       hello: "Hello World"
//     };
//
// See tests for specific formatting like numbers and dates.
//

// Using UMD pattern from
// https://github.com/umdjs/umd#regular-module
// `returnExports.js` version
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define("i18n", function(){ return factory(root);});
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(root);
  } else {
    // Browser globals (root is window)
    root.I18n = factory(root);
  }
}(this, function(global) {
  "use strict";

  // Use previously defined object if exists in current scope
  var I18n = global && global.I18n || {};

  // Just cache the Array#slice function.
  var slice = Array.prototype.slice;

  // Apply number padding.
  var padding = function(number) {
    return ("0" + number.toString()).substr(-2);
  };

  // Improved toFixed number rounding function with support for unprecise floating points
  // JavaScript's standard toFixed function does not round certain numbers correctly (for example 0.105 with precision 2).
  var toFixed = function(number, precision) {
    return decimalAdjust('round', number, -precision).toFixed(precision);
  };

  // Is a given variable an object?
  // Borrowed from Underscore.js
  var isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object'
  };

  var isFunction = function(func) {
    var type = typeof func;
    return type === 'function'
  };

  // Check if value is different than undefined and null;
  var isSet = function(value) {
    return typeof(value) !== 'undefined' && value !== null;
  };

  // Is a given value an array?
  // Borrowed from Underscore.js
  var isArray = function(val) {
    if (Array.isArray) {
      return Array.isArray(val);
    };
    return Object.prototype.toString.call(val) === '[object Array]';
  };

  var isString = function(val) {
    return typeof value == 'string' || Object.prototype.toString.call(val) === '[object String]';
  };

  var isNumber = function(val) {
    return typeof val == 'number' || Object.prototype.toString.call(val) === '[object Number]';
  };

  var isBoolean = function(val) {
    return val === true || val === false;
  };

  var decimalAdjust = function(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  var lazyEvaluate = function(message, scope) {
    if (isFunction(message)) {
      return message(scope);
    } else {
      return message;
    }
  }

  var merge = function (dest, obj) {
    var key, value;
    for (key in obj) if (obj.hasOwnProperty(key)) {
      value = obj[key];
      if (isString(value) || isNumber(value) || isBoolean(value) || isArray(value)) {
        dest[key] = value;
      } else {
        if (dest[key] == null) dest[key] = {};
        merge(dest[key], value);
      }
    }
    return dest;
  };

  // Set default days/months translations.
  var DATE = {
      day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    , abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    , month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    , abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    , meridian: ["AM", "PM"]
  };

  // Set default number format.
  var NUMBER_FORMAT = {
      precision: 3
    , separator: "."
    , delimiter: ","
    , strip_insignificant_zeros: false
  };

  // Set default currency format.
  var CURRENCY_FORMAT = {
      unit: "$"
    , precision: 2
    , format: "%u%n"
    , sign_first: true
    , delimiter: ","
    , separator: "."
  };

  // Set default percentage format.
  var PERCENTAGE_FORMAT = {
      unit: "%"
    , precision: 3
    , format: "%n%u"
    , separator: "."
    , delimiter: ""
  };

  // Set default size units.
  var SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];

  // Other default options
  var DEFAULT_OPTIONS = {
    // Set default locale. This locale will be used when fallback is enabled and
    // the translation doesn't exist in a particular locale.
      defaultLocale: "en"
    // Set the current locale to `en`.
    , locale: "en"
    // Set the translation key separator.
    , defaultSeparator: "."
    // Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
    , placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm
    // Set if engine should fallback to the default locale when a translation
    // is missing.
    , fallbacks: false
    // Set the default translation object.
    , translations: {}
    // Set missing translation behavior. 'message' will display a message
    // that the translation is missing, 'guess' will try to guess the string
    , missingBehaviour: 'message'
    // if you use missingBehaviour with 'message', but want to know that the
    // string is actually missing for testing purposes, you can prefix the
    // guessed string by setting the value here. By default, no prefix!
    , missingTranslationPrefix: ''
  };

  // Set default locale. This locale will be used when fallback is enabled and
  // the translation doesn't exist in a particular locale.
  I18n.reset = function() {
    var key;
    for (key in DEFAULT_OPTIONS) {
      this[key] = DEFAULT_OPTIONS[key];
    }
  };

  // Much like `reset`, but only assign options if not already assigned
  I18n.initializeOptions = function() {
    var key;
    for (key in DEFAULT_OPTIONS) if (!isSet(this[key])) {
      this[key] = DEFAULT_OPTIONS[key];
    }
  };
  I18n.initializeOptions();

  // Return a list of all locales that must be tried before returning the
  // missing translation message. By default, this will consider the inline option,
  // current locale and fallback locale.
  //
  //     I18n.locales.get("de-DE");
  //     // ["de-DE", "de", "en"]
  //
  // You can define custom rules for any locale. Just make sure you return a array
  // containing all locales.
  //
  //     // Default the Wookie locale to English.
  //     I18n.locales["wk"] = function(locale) {
  //       return ["en"];
  //     };
  //
  I18n.locales = {};

  // Retrieve locales based on inline locale, current locale or default to
  // I18n's detection.
  I18n.locales.get = function(locale) {
    var result = this[locale] || this[I18n.locale] || this["default"];

    if (isFunction(result)) {
      result = result(locale);
    }

    if (isArray(result) === false) {
      result = [result];
    }

    return result;
  };

  // The default locale list.
  I18n.locales["default"] = function(locale) {
    var locales = []
      , list = []
    ;

    // Handle the inline locale option that can be provided to
    // the `I18n.t` options.
    if (locale) {
      locales.push(locale);
    }

    // Add the current locale to the list.
    if (!locale && I18n.locale) {
      locales.push(I18n.locale);
    }

    // Add the default locale if fallback strategy is enabled.
    if (I18n.fallbacks && I18n.defaultLocale) {
      locales.push(I18n.defaultLocale);
    }

    // Locale code format 1:
    // According to RFC4646 (http://www.ietf.org/rfc/rfc4646.txt)
    // language codes for Traditional Chinese should be `zh-Hant`
    //
    // But due to backward compatibility
    // We use older version of IETF language tag
    // @see http://www.w3.org/TR/html401/struct/dirlang.html
    // @see http://en.wikipedia.org/wiki/IETF_language_tag
    //
    // Format: `language-code = primary-code ( "-" subcode )*`
    //
    // primary-code uses ISO639-1
    // @see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // @see http://www.iso.org/iso/home/standards/language_codes.htm
    //
    // subcode uses ISO 3166-1 alpha-2
    // @see http://en.wikipedia.org/wiki/ISO_3166
    // @see http://www.iso.org/iso/country_codes.htm
    //
    // @note
    //   subcode can be in upper case or lower case
    //   defining it in upper case is a convention only


    // Locale code format 2:
    // Format: `code = primary-code ( "-" region-code )*`
    // primary-code uses ISO 639-1
    // script-code uses ISO 15924
    // region-code uses ISO 3166-1 alpha-2
    // Example: zh-Hant-TW, en-HK, zh-Hant-CN
    //
    // It is similar to RFC4646 (or actually the same),
    // but seems to be limited to language, script, region

    // Compute each locale with its country code.
    // So this will return an array containing
    // `de-DE` and `de`
    // or
    // `zh-hans-tw`, `zh-hans`, `zh`
    // locales.
    locales.forEach(function(locale) {
      var localeParts = locale.split("-");
      var firstFallback = null;
      var secondFallback = null;
      if (localeParts.length === 3) {
        firstFallback = [
          localeParts[0],
          localeParts[1]
        ].join("-");
        secondFallback = localeParts[0];
      }
      else if (localeParts.length === 2) {
        firstFallback = localeParts[0];
      }

      if (list.indexOf(locale) === -1) {
        list.push(locale);
      }

      if (! I18n.fallbacks) {
        return;
      }

      [
        firstFallback,
        secondFallback
      ].forEach(function(nullableFallbackLocale) {
        // We don't want null values
        if (typeof nullableFallbackLocale === "undefined") { return; }
        if (nullableFallbackLocale === null) { return; }
        // We don't want duplicate values
        //
        // Comparing with `locale` first is faster than
        // checking whether value's presence in the list
        if (nullableFallbackLocale === locale) { return; }
        if (list.indexOf(nullableFallbackLocale) !== -1) { return; }

        list.push(nullableFallbackLocale);
      });
    });

    // No locales set? English it is.
    if (!locales.length) {
      locales.push("en");
    }

    return list;
  };

  // Hold pluralization rules.
  I18n.pluralization = {};

  // Return the pluralizer for a specific locale.
  // If no specify locale is found, then I18n's default will be used.
  I18n.pluralization.get = function(locale) {
    return this[locale] || this[I18n.locale] || this["default"];
  };

  // The default pluralizer rule.
  // It detects the `zero`, `one`, and `other` scopes.
  I18n.pluralization["default"] = function(count) {
    switch (count) {
      case 0: return ["zero", "other"];
      case 1: return ["one"];
      default: return ["other"];
    }
  };

  // Return current locale. If no locale has been set, then
  // the current locale will be the default locale.
  I18n.currentLocale = function() {
    return this.locale || this.defaultLocale;
  };

  // Check if value is different than undefined and null;
  I18n.isSet = isSet;

  // Find and process the translation using the provided scope and options.
  // This is used internally by some functions and should not be used as an
  // public API.
  I18n.lookup = function(scope, options) {
    options = options || {}

    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , fullScope
      , translations
    ;

    fullScope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = fullScope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }
      while (scopes.length) {
        translations = translations[scopes.shift()];

        if (translations === undefined || translations === null) {
          break;
        }
      }

      if (translations !== undefined && translations !== null) {
        return translations;
      }
    }

    if (isSet(options.defaultValue)) {
      return lazyEvaluate(options.defaultValue, scope);
    }
  };

  // lookup pluralization rule key into translations
  I18n.pluralizationLookupWithoutFallback = function(count, locale, translations) {
    var pluralizer = this.pluralization.get(locale)
      , pluralizerKeys = pluralizer(count)
      , pluralizerKey
      , message;

    if (isObject(translations)) {
      while (pluralizerKeys.length) {
        pluralizerKey = pluralizerKeys.shift();
        if (isSet(translations[pluralizerKey])) {
          message = translations[pluralizerKey];
          break;
        }
      }
    }

    return message;
  };

  // Lookup dedicated to pluralization
  I18n.pluralizationLookup = function(count, scope, options) {
    options = options || {}
    var locales = this.locales.get(options.locale).slice()
      , requestedLocale = locales[0]
      , locale
      , scopes
      , translations
      , message
    ;
    scope = this.getFullScope(scope, options);

    while (locales.length) {
      locale = locales.shift();
      scopes = scope.split(this.defaultSeparator);
      translations = this.translations[locale];

      if (!translations) {
        continue;
      }

      while (scopes.length) {
        translations = translations[scopes.shift()];
        if (!isObject(translations)) {
          break;
        }
        if (scopes.length == 0) {
          message = this.pluralizationLookupWithoutFallback(count, locale, translations);
        }
      }
      if (message != null && message != undefined) {
        break;
      }
    }

    if (message == null || message == undefined) {
      if (isSet(options.defaultValue)) {
        if (isObject(options.defaultValue)) {
          message = this.pluralizationLookupWithoutFallback(count, options.locale, options.defaultValue);
        } else {
          message = options.defaultValue;
        }
        translations = options.defaultValue;
      }
    }

    return { message: message, translations: translations };
  };

  // Rails changed the way the meridian is stored.
  // It started with `date.meridian` returning an array,
  // then it switched to `time.am` and `time.pm`.
  // This function abstracts this difference and returns
  // the correct meridian or the default value when none is provided.
  I18n.meridian = function() {
    var time = this.lookup("time");
    var date = this.lookup("date");

    if (time && time.am && time.pm) {
      return [time.am, time.pm];
    } else if (date && date.meridian) {
      return date.meridian;
    } else {
      return DATE.meridian;
    }
  };

  // Merge serveral hash options, checking if value is set before
  // overwriting any value. The precedence is from left to right.
  //
  //     I18n.prepareOptions({name: "John Doe"}, {name: "Mary Doe", role: "user"});
  //     #=> {name: "John Doe", role: "user"}
  //
  I18n.prepareOptions = function() {
    var args = slice.call(arguments)
      , options = {}
      , subject
    ;

    while (args.length) {
      subject = args.shift();

      if (typeof(subject) != "object") {
        continue;
      }

      for (var attr in subject) {
        if (!subject.hasOwnProperty(attr)) {
          continue;
        }

        if (isSet(options[attr])) {
          continue;
        }

        options[attr] = subject[attr];
      }
    }

    return options;
  };

  // Generate a list of translation options for default fallbacks.
  // `defaultValue` is also deleted from options as it is returned as part of
  // the translationOptions array.
  I18n.createTranslationOptions = function(scope, options) {
    var translationOptions = [{scope: scope}];

    // Defaults should be an array of hashes containing either
    // fallback scopes or messages
    if (isSet(options.defaults)) {
      translationOptions = translationOptions.concat(options.defaults);
    }

    // Maintain support for defaultValue. Since it is always a message
    // insert it in to the translation options as such.
    if (isSet(options.defaultValue)) {
      translationOptions.push({ message: options.defaultValue });
    }

    return translationOptions;
  };

  // Translate the given scope with the provided options.
  I18n.translate = function(scope, options) {
    options = options || {}

    var translationOptions = this.createTranslationOptions(scope, options);

    var translation;

    var optionsWithoutDefault = this.prepareOptions(options)
    delete optionsWithoutDefault.defaultValue

    // Iterate through the translation options until a translation
    // or message is found.
    var translationFound =
      translationOptions.some(function(translationOption) {
        if (isSet(translationOption.scope)) {
          translation = this.lookup(translationOption.scope, optionsWithoutDefault);
        } else if (isSet(translationOption.message)) {
          translation = lazyEvaluate(translationOption.message, scope);
        }

        if (translation !== undefined && translation !== null) {
          return true;
        }
      }, this);

    if (!translationFound) {
      return this.missingTranslation(scope, options);
    }

    if (typeof(translation) === "string") {
      translation = this.interpolate(translation, options);
    } else if (isObject(translation) && isSet(options.count)) {
      translation = this.pluralize(options.count, scope, options);
    }

    return translation;
  };

  // This function interpolates the all variables in the given message.
  I18n.interpolate = function(message, options) {
    options = options || {}
    var matches = message.match(this.placeholder)
      , placeholder
      , value
      , name
      , regex
    ;

    if (!matches) {
      return message;
    }

    var value;

    while (matches.length) {
      placeholder = matches.shift();
      name = placeholder.replace(this.placeholder, "$1");

      if (isSet(options[name])) {
        value = options[name].toString().replace(/\$/gm, "_#$#_");
      } else if (name in options) {
        value = this.nullPlaceholder(placeholder, message, options);
      } else {
        value = this.missingPlaceholder(placeholder, message, options);
      }

      regex = new RegExp(placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"));
      message = message.replace(regex, value);
    }

    return message.replace(/_#\$#_/g, "$");
  };

  // Pluralize the given scope using the `count` value.
  // The pluralized translation may have other placeholders,
  // which will be retrieved from `options`.
  I18n.pluralize = function(count, scope, options) {
    options = this.prepareOptions({count: String(count)}, options)
    var pluralizer, message, result;

    result = this.pluralizationLookup(count, scope, options);
    if (result.translations == undefined || result.translations == null) {
      return this.missingTranslation(scope, options);
    }

    if (result.message != undefined && result.message != null) {
      return this.interpolate(result.message, options);
    }
    else {
      pluralizer = this.pluralization.get(options.locale);
      return this.missingTranslation(scope + '.' + pluralizer(count)[0], options);
    }
  };

  // Return a missing translation message for the given parameters.
  I18n.missingTranslation = function(scope, options) {
    //guess intended string
    if(this.missingBehaviour == 'guess'){
      //get only the last portion of the scope
      var s = scope.split('.').slice(-1)[0];
      //replace underscore with space && camelcase with space and lowercase letter
      return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : '') +
          s.replace('_',' ').replace(/([a-z])([A-Z])/g,
          function(match, p1, p2) {return p1 + ' ' + p2.toLowerCase()} );
    }

    var localeForTranslation = (options != null && options.locale != null) ? options.locale : this.currentLocale();
    var fullScope           = this.getFullScope(scope, options);
    var fullScopeWithLocale = [localeForTranslation, fullScope].join(this.defaultSeparator);

    return '[missing "' + fullScopeWithLocale + '" translation]';
  };

  // Return a missing placeholder message for given parameters
  I18n.missingPlaceholder = function(placeholder, message, options) {
    return "[missing " + placeholder + " value]";
  };

  I18n.nullPlaceholder = function() {
    return I18n.missingPlaceholder.apply(I18n, arguments);
  };

  // Format number using localization rules.
  // The options will be retrieved from the `number.format` scope.
  // If this isn't present, then the following options will be used:
  //
  // - `precision`: `3`
  // - `separator`: `"."`
  // - `delimiter`: `","`
  // - `strip_insignificant_zeros`: `false`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toNumber = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.format")
      , NUMBER_FORMAT
    );

    var negative = number < 0
      , string = toFixed(Math.abs(number), options.precision).toString()
      , parts = string.split(".")
      , precision
      , buffer = []
      , formattedNumber
      , format = options.format || "%n"
      , sign = negative ? "-" : ""
    ;

    number = parts[0];
    precision = parts[1];

    while (number.length > 0) {
      buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
      number = number.substr(0, number.length -3);
    }

    formattedNumber = buffer.join(options.delimiter);

    if (options.strip_insignificant_zeros && precision) {
      precision = precision.replace(/0+$/, "");
    }

    if (options.precision > 0 && precision) {
      formattedNumber += options.separator + precision;
    }

    if (options.sign_first) {
      format = "%s" + format;
    }
    else {
      format = format.replace("%n", "%s%n");
    }

    formattedNumber = format
      .replace("%u", options.unit)
      .replace("%n", formattedNumber)
      .replace("%s", sign)
    ;

    return formattedNumber;
  };

  // Format currency with localization rules.
  // The options will be retrieved from the `number.currency.format` and
  // `number.format` scopes, in that order.
  //
  // Any missing option will be retrieved from the `I18n.toNumber` defaults and
  // the following options:
  //
  // - `unit`: `"$"`
  // - `precision`: `2`
  // - `format`: `"%u%n"`
  // - `delimiter`: `","`
  // - `separator`: `"."`
  //
  // You can also override these options by providing the `options` argument.
  //
  I18n.toCurrency = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.currency.format")
      , this.lookup("number.format")
      , CURRENCY_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Localize several values.
  // You can provide the following scopes: `currency`, `number`, or `percentage`.
  // If you provide a scope that matches the `/^(date|time)/` regular expression
  // then the `value` will be converted by using the `I18n.toTime` function.
  //
  // It will default to the value's `toString` function.
  //
  I18n.localize = function(scope, value, options) {
    options || (options = {});

    switch (scope) {
      case "currency":
        return this.toCurrency(value);
      case "number":
        scope = this.lookup("number.format");
        return this.toNumber(value, scope);
      case "percentage":
        return this.toPercentage(value);
      default:
        var localizedValue;

        if (scope.match(/^(date|time)/)) {
          localizedValue = this.toTime(scope, value);
        } else {
          localizedValue = value.toString();
        }

        return this.interpolate(localizedValue, options);
    }
  };

  // Parse a given `date` string into a JavaScript Date object.
  // This function is time zone aware.
  //
  // The following string formats are recognized:
  //
  //    yyyy-mm-dd
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ss
  //    yyyy-mm-dd[ T]hh:mm::ssZ
  //    yyyy-mm-dd[ T]hh:mm::ss+0000
  //    yyyy-mm-dd[ T]hh:mm::ss+00:00
  //    yyyy-mm-dd[ T]hh:mm::ss.123Z
  //
  I18n.parseDate = function(date) {
    var matches, convertedDate, fraction;
    // we have a date, so just return it.
    if (typeof(date) == "object") {
      return date;
    };

    matches = date.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/);

    if (matches) {
      for (var i = 1; i <= 6; i++) {
        matches[i] = parseInt(matches[i], 10) || 0;
      }

      // month starts on 0
      matches[2] -= 1;

      fraction = matches[7] ? 1000 * ("0" + matches[7]) : null;

      if (matches[8]) {
        convertedDate = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction));
      } else {
        convertedDate = new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction);
      }
    } else if (typeof(date) == "number") {
      // UNIX timestamp
      convertedDate = new Date();
      convertedDate.setTime(date);
    } else if (date.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/)) {
      // This format `Wed Jul 20 13:03:39 +0000 2011` is parsed by
      // webkit/firefox, but not by IE, so we must parse it manually.
      convertedDate = new Date();
      convertedDate.setTime(Date.parse([
        RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5
      ].join(" ")));
    } else if (date.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)) {
      // a valid javascript format with timezone info
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    } else {
      // an arbitrary javascript string
      convertedDate = new Date();
      convertedDate.setTime(Date.parse(date));
    }

    return convertedDate;
  };

  // Formats time according to the directives in the given format string.
  // The directives begins with a percent (%) character. Any text not listed as a
  // directive will be passed through to the output string.
  //
  // The accepted formats are:
  //
  //     %a  - The abbreviated weekday name (Sun)
  //     %A  - The full weekday name (Sunday)
  //     %b  - The abbreviated month name (Jan)
  //     %B  - The full month name (January)
  //     %c  - The preferred local date and time representation
  //     %d  - Day of the month (01..31)
  //     %-d - Day of the month (1..31)
  //     %H  - Hour of the day, 24-hour clock (00..23)
  //     %-H - Hour of the day, 24-hour clock (0..23)
  //     %I  - Hour of the day, 12-hour clock (01..12)
  //     %-I - Hour of the day, 12-hour clock (1..12)
  //     %m  - Month of the year (01..12)
  //     %-m - Month of the year (1..12)
  //     %M  - Minute of the hour (00..59)
  //     %-M - Minute of the hour (0..59)
  //     %p  - Meridian indicator (AM  or  PM)
  //     %S  - Second of the minute (00..60)
  //     %-S - Second of the minute (0..60)
  //     %w  - Day of the week (Sunday is 0, 0..6)
  //     %y  - Year without a century (00..99)
  //     %-y - Year without a century (0..99)
  //     %Y  - Year with century
  //     %z  - Timezone offset (+0545)
  //
  I18n.strftime = function(date, format) {
    var options = this.lookup("date")
      , meridianOptions = I18n.meridian()
    ;

    if (!options) {
      options = {};
    }

    options = this.prepareOptions(options, DATE);

    if (isNaN(date.getTime())) {
      throw new Error('I18n.strftime() requires a valid date object, but received an invalid date.');
    }

    var weekDay = date.getDay()
      , day = date.getDate()
      , year = date.getFullYear()
      , month = date.getMonth() + 1
      , hour = date.getHours()
      , hour12 = hour
      , meridian = hour > 11 ? 1 : 0
      , secs = date.getSeconds()
      , mins = date.getMinutes()
      , offset = date.getTimezoneOffset()
      , absOffsetHours = Math.floor(Math.abs(offset / 60))
      , absOffsetMinutes = Math.abs(offset) - (absOffsetHours * 60)
      , timezoneoffset = (offset > 0 ? "-" : "+") +
          (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) +
          (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes)
    ;

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    format = format.replace("%a", options.abbr_day_names[weekDay]);
    format = format.replace("%A", options.day_names[weekDay]);
    format = format.replace("%b", options.abbr_month_names[month]);
    format = format.replace("%B", options.month_names[month]);
    format = format.replace("%d", padding(day));
    format = format.replace("%e", day);
    format = format.replace("%-d", day);
    format = format.replace("%H", padding(hour));
    format = format.replace("%-H", hour);
    format = format.replace("%I", padding(hour12));
    format = format.replace("%-I", hour12);
    format = format.replace("%m", padding(month));
    format = format.replace("%-m", month);
    format = format.replace("%M", padding(mins));
    format = format.replace("%-M", mins);
    format = format.replace("%p", meridianOptions[meridian]);
    format = format.replace("%S", padding(secs));
    format = format.replace("%-S", secs);
    format = format.replace("%w", weekDay);
    format = format.replace("%y", padding(year));
    format = format.replace("%-y", padding(year).replace(/^0+/, ""));
    format = format.replace("%Y", year);
    format = format.replace("%z", timezoneoffset);

    return format;
  };

  // Convert the given dateString into a formatted date.
  I18n.toTime = function(scope, dateString) {
    var date = this.parseDate(dateString)
      , format = this.lookup(scope)
    ;

    if (date.toString().match(/invalid/i)) {
      return date.toString();
    }

    if (!format) {
      return date.toString();
    }

    return this.strftime(date, format);
  };

  // Convert a number into a formatted percentage value.
  I18n.toPercentage = function(number, options) {
    options = this.prepareOptions(
        options
      , this.lookup("number.percentage.format")
      , this.lookup("number.format")
      , PERCENTAGE_FORMAT
    );

    return this.toNumber(number, options);
  };

  // Convert a number into a readable size representation.
  I18n.toHumanSize = function(number, options) {
    var kb = 1024
      , size = number
      , iterations = 0
      , unit
      , precision
    ;

    while (size >= kb && iterations < 4) {
      size = size / kb;
      iterations += 1;
    }

    if (iterations === 0) {
      unit = this.t("number.human.storage_units.units.byte", {count: size});
      precision = 0;
    } else {
      unit = this.t("number.human.storage_units.units." + SIZE_UNITS[iterations]);
      precision = (size - Math.floor(size) === 0) ? 0 : 1;
    }

    options = this.prepareOptions(
        options
      , {unit: unit, precision: precision, format: "%n%u", delimiter: ""}
    );

    return this.toNumber(size, options);
  };

  I18n.getFullScope = function(scope, options) {
    options = options || {}

    // Deal with the scope as an array.
    if (isArray(scope)) {
      scope = scope.join(this.defaultSeparator);
    }

    // Deal with the scope option provided through the second argument.
    //
    //    I18n.t('hello', {scope: 'greetings'});
    //
    if (options.scope) {
      scope = [options.scope, scope].join(this.defaultSeparator);
    }

    return scope;
  };
  /**
   * Merge obj1 with obj2 (shallow merge), without modifying inputs
   * @param {Object} obj1
   * @param {Object} obj2
   * @returns {Object} Merged values of obj1 and obj2
   *
   * In order to support ES3, `Object.prototype.hasOwnProperty.call` is used
   * Idea is from:
   * https://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
   */
  I18n.extend = function ( obj1, obj2 ) {
    if (typeof(obj1) === "undefined" && typeof(obj2) === "undefined") {
      return {};
    }
    return merge(obj1, obj2);
  };

  // Set aliases, so we can save some typing.
  I18n.t = I18n.translate;
  I18n.l = I18n.localize;
  I18n.p = I18n.pluralize;

  return I18n;
}));
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
if ( !Array.prototype.forEach ) {

  Array.prototype.forEach = function forEach( callback, thisArg ) {

    var T, k;

    if ( this == null ) {
      throw new TypeError( "this is null or not defined" );
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) !== "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( thisArg ) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( Object.prototype.hasOwnProperty.call(O, k) ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisArg, t[i], i, t))
        return true;
    }

    return false;
  };
}
;

// Using UMD pattern from
// https://github.com/umdjs/umd#regular-module
// `returnExports.js` version
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["i18n"], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    factory(require("i18n"));
  } else {
    // Browser globals (root is window)
    factory(root.I18n);
  }
}(this, function(I18n) {
  "use strict";

  I18n.translations = {"cs":{"ransack":{"all":"každou","and":"a","any":"kteroukoliv","asc":"vzestupné","attribute":"atribut","combinator":"kombinátor","condition":"podmínka","desc":"sestupné","or":"nebo","predicate":"predikát","predicates":{"blank":"je prázdné","cont":"obsahuje","cont_all":"obsahuje všechny","cont_any":"obsahuje kterékoliv","does_not_match":"neodpovídá","does_not_match_all":"neodpovídá všem","does_not_match_any":"neodpovídá kterékoliv","end":"končí s","end_all":"končí se všemi","end_any":"končí s kteroukoliv","eq":"rovno","eq_all":"rovno všem","eq_any":"rovno kterékoliv","false":"není pravdivé","gt":"větší než","gt_all":"větší než všechny","gt_any":"větší než kterákoliv","gteq":"větší nebo rovno než","gteq_all":"větší nebo rovno než všechny","gteq_any":"větší nebo rovno než kterákoliv","in":"v","in_all":"ve všech","in_any":"v kterékoliv","lt":"menší než","lt_all":"menší než všechny","lt_any":"menší než kterákoliv","lteq":"menší nebo rovno než","lteq_all":"menší nebo rovno než všechny","lteq_any":"menší nebo rovno než kterákoliv","matches":"odpovídá","matches_all":"odpovídá všem","matches_any":"odpovídá kterékoliv","not_cont":"neobsahuje","not_cont_all":"neobsahuje všechny","not_cont_any":"neobsahuje kteroukoliv","not_end":"nekončí s","not_end_all":"nekončí se všemi","not_end_any":"nekončí s kteroukoliv","not_eq":"nerovno","not_eq_all":"nerovno všem","not_eq_any":"nerovno kterékoliv","not_in":"není v","not_in_all":"není ve všech","not_in_any":"není v kterékoliv","not_null":"není null","not_start":"nezačíná s","not_start_all":"nezačíná se všemi","not_start_any":"nezačíná s kteroukoliv","null":"je null","present":"je vyplněné","start":"začíná s","start_all":"začíná se všemi","start_any":"začíná s kteroukoliv","true":"je pravdivé"},"search":"vyhledávání","sort":"řazení","value":"hodnota"}},"da":{"ransack":{"all":"alle","and":"og","any":"anhver","asc":"opstigende","attribute":"attribut","combinator":"kombinering","condition":"betingelse","desc":"faldende","or":"eller","predicate":"predicate","predicates":{"blank":"er blank","cont":"indeholder","cont_all":"indeholder alle","cont_any":"indeholder nogen","does_not_match":"matcher ikke","does_not_match_all":"matcher ikke alle","does_not_match_any":"matcher ikke nogen","end":"slutter med","end_all":"slutter med alle","end_any":"slutter med nogen","eq":"lig med","eq_all":"lig med alle","eq_any":"lig med enhver","false":"er falsk","gt":"større end","gt_all":"større end alle","gt_any":"større end nogen","gteq":"større end eller lig med","gteq_all":"større end eller lig med alle","gteq_any":"større end eller lig med nogen","in":"i","in_all":"i alle","in_any":"i nogen","lt":"mindre end","lt_all":"mindre end alle","lt_any":"mindre end nogen","lteq":"mindre end eller lig med","lteq_all":"mindre end eller lig med alle","lteq_any":"mindre end eller lig med nogen","matches":"matcher","matches_all":"matcher alle","matches_any":"matcher enhver","not_cont":"indeholder ikke","not_cont_all":"indeholder ikke alle","not_cont_any":"indeholder ikke nogen","not_end":"slutter ikke med","not_end_all":"slutter ikke med alle","not_end_any":"slutter ikke med nogen","not_eq":"ikke lig med","not_eq_all":"ikke lig med alle","not_eq_any":"ikke lig med nogen","not_in":"ikke i","not_in_all":"ikke i alle","not_in_any":"ikke i nogen","not_null":"er ikke nul","not_start":"starter ikke med","not_start_all":"starter ikke med alle","not_start_any":"starter ikke med nogen","null":"er nul","present":"er til stede","start":"starter med","start_all":"starter med alle","start_any":"starter med nogen","true":"er sand"},"search":"søg","sort":"sorter","value":"værdi"}},"de":{"activemodel":{"errors":{"messages":{"email_address_not_routable":"kann nicht erreicht werden","invalid_email_address":"ist offensichtlich keine gültige E-Mail-Adresse"}}},"activerecord":{"errors":{"messages":{"email_address_not_routable":"kann nicht erreicht werden","invalid_email_address":"ist offensichtlich keine gültige E-Mail-Adresse"}}},"errors":{"messages":{"improbable_phone":"ist keine gültige Nummer"}},"ransack":{"all":"alle","and":"und","any":"beliebige","asc":"aufsteigend","attribute":"Attribut","combinator":"Kombinator","condition":"Bedingung","desc":"absteigend","or":"oder","predicate":"Eigenschaft","predicates":{"blank":"ist leer","cont":"enthält","cont_all":"enthält alle","cont_any":"enthält beliebige","does_not_match":"stimmt nicht überein","does_not_match_all":"stimmt nicht mit allen überein","does_not_match_any":"erfüllt ein beliebiger/s nicht","end":"endet mit","end_all":"endet mit allen","end_any":"endet mit beliebigen","eq":"gleicht","eq_all":"gleicht allen","eq_any":"gleicht beliebigen","false":"ist falsch","gt":"größer als","gt_all":"größer als alle","gt_any":"größer als ein beliebiger/s","gteq":"größer oder gleich","gteq_all":"größer oder gleich alle","gteq_any":"größer oder gleich als ein beliebiger/s","in":"in","in_all":"in allen","in_any":"ist nicht in einem beliebigen","lt":"kleiner als","lt_all":"kleiner als alle als alle","lt_any":"kleiner als ein beliebiger/s","lteq":"kleiner oder gleich","lteq_all":"kleiner oder gleich allen","lteq_any":"kleiner oder gleich beliebige","matches":"entspricht","matches_all":"stimmt mit allen überein","matches_any":"stimmt überein mit einem beliebigen","not_cont":"enthält nicht","not_cont_all":"enthält keine/s","not_cont_any":"enthält ein beliebiger/s nicht","not_end":"endet nicht mit","not_end_all":"endet nicht mit allen","not_end_any":"endet nicht mit beliebigen","not_eq":"ungleich","not_eq_all":"ungleich allen","not_eq_any":"ungleich beliebigen","not_in":"nicht in","not_in_all":"nicht in allen","not_in_any":"nicht in beliebige","not_null":"ist nicht null","not_start":"beginnt nicht mit","not_start_all":"beginnt nicht mit allen","not_start_any":"beginnt nicht mit beliebigen","null":"ist null","present":"ist vorhanden","start":"beginnt mit","start_all":"beginnt mit allen","start_any":"beginnt mit beliebigen","true":"ist wahr"},"search":"suchen","sort":"sortieren","value":"Wert"}},"en":{"activemodel":{"errors":{"messages":{"email_address_not_routable":"is not routable","invalid_email_address":"does not appear to be a valid e-mail address"}}},"activerecord":{"attributes":{"followup":{"can_share_contact":"","understands_purpose_of_baptism":"","wants_in_person_study":"","wants_introduction_to_church":"","wants_to_be_baptized":""},"student":{"address1":"Address"}},"errors":{"messages":{"accepted":"must be accepted","blank":"must be given","confirmation":"does not match its confirmation","email_address_not_routable":"is not routable","empty":"must be given","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is not available","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is not valid","invalid_email_address":"does not appear to be a valid e-mail address","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","not_a_number":"is not a number","odd":"must be odd","record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"many":"Cannot delete record because dependent %{record} exist","one":"Cannot delete record because a dependent %{record} exists"},"taken":"is not available","too_long":"is too long (no more than %{count} characters)","too_short":"is too short (no less than %{count} characters)","wrong_length":"is not the right length (must be %{count} characters)"},"models":{"course":{"attributes":{"intro":{"one_per_locale":"There can be only 1 intro course per locale"}}},"exam":{"attributes":{"status":{"questions_must_have_valid_answers":"cannot be published until all gradeable questions have correct answers."}}},"followup":{"attributes":{"can_share_contact":{"inclusion":"The student must give explicit permission to share contact information."},"understands_purpose_of_baptism":{"inclusion":"Does the student understand the purpose of baptism?"},"wants_in_person_study":{"inclusion":"Did the student request to study the Bible with somebody in person?"},"wants_introduction_to_church":{"inclusion":"Did the student request to be introduced to a local congregation?"},"wants_to_be_baptized":{"inclusion":"Did the student request baptism?"}}},"message":{"attributes":{"recipients":{"too_short":"You need more than one recipient. If you are using a list like \"hidden\" or \"active\" students, check to make sure you actually have hidden or active students."}}},"share":{"attributes":{"message":{"spam":"looks like spam"}}},"student":{"attributes":{"teacher_id":{"already_adopted":"that student has already been adopted","cannot_adopt":"cannot adopt this student","not_valid":"must be a valid registered teacher"}}},"user":{"attributes":{"email":{"taken":"is already taken. If you already have an account you can <a href=\"/login\">login here</a>."}}}},"template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}}}},"app":{"admin":{"account":{"address":"Address","city":"City","email":"Email","first_name":"First name","last_name":"Last name","mailing_address":"Mailing address","nation":"Nation","personal_information":"Personal Information","phone":"Phone","state":"State","update":"Update","your_account":"Your Account","zip":"Postal code"},"account_nav":{"contact_information":"Contact Information","contact_preferences":"Contact Preferences","language_preferences":"Language Preferences","reset_password":"Reset Password","student_notice":"Student Notice"},"assign":{"assign":"Assign","assign_certificate":"Assign Certificate","assign_lessons_to":"Assign Lessons to","complete":"Complete","exam_completed_times":"This exam has been completed <span class=\"label on\">%{number}</span> times","in_progress":"In Progress","master_series":"Assign the Master Series certificate","not_applicable":"N/A","problem_assigning":"There was a problem unassigning this exam. Please try again later.","problem_reassigning":"There was a problem reassigning this exam. Please try again later.","reassign":"Reassign","reassigned":"Reassigned","unassign":"Unassign"},"assignments":{"certificate":"Certificate","certificate_down":"certificate","email_certificates":"Email certificates","grade":"Grade exam","removed":"removed","review":"Review exam","sent":"sent"},"certificates":{"delete":"Delete"},"characteristics":{"age":"Age","age_baptized_without_water":"Age \"baptized\" without water","age_immersed":"Age immersed","age_sprinkled":"Age sprinkled","age_water_poured":"Age when water was poured on me","baptized_without_water":"I was \"baptized\" without the use of water.","congregation":"Congregation","congregation_city":"Congregation City","congregation_name":"Congregation Name","congregation_state":"Congregation State","date_of_birth":"Date of Birth","do_you_wish_to_explain":"Do you wish to explain your answers further?","female":"female","gender":"Gender","how_close_are_you_to_god":"How close are you to God?","i_am_changing":"I am changing","i_am_far_from_god":"I am far from God","i_am_lost":"I am \"lost\"","i_am_right_with_god":"I am right with God","i_am_very_close_to_god":"I am very close to God","i_do_not_know_born_again":"I do not know if I have been \"born again.\"","i_have_already_been_born_again":"I have already been \"born again.\"","i_have_already_been_saved":"I have already been \"saved\"","i_have_received_the_holy_spirit":"I have received the Holy Spirit","i_want_to_find_out_about_god":"I want to find out about God","i_was_dipped":"I was \"baptized\" when I was dipped under water.","i_was_lost_but_returned":"I did become \"lost,\" but I returned","i_was_poured":"I was \"baptized\" when water was poured on me.","i_was_sprinkled":"I was \"baptized\" when water was sprinkled on me","language":"Language","male":"male","marital_status":"Marital Status","my_baptism_was_for":"My baptism was for the following reason or purpose...","occupation":"Occupation","once_saved_fallen_away":"I have fallen away, though I was once saved","phone":"Phone","referred_by":"Referred by","religion":"Religion","when_how_saved":"When and how you were \"saved\" or \"born again\"","years_old":"%{age} years old"},"congregation":{"active_students":"Active Students","congregation_stats":"Congregation Stats","followups":"Members at your congregation have submitted %{count} requests for followup.","member_of":"According to our records, you are a member of the %{name} in %{city}, %{state}.","no_congregation_on_record":"We don't have your congregation on record. Can you send us a email and let us know where you worship? <a href=\"mailto:help@worldbibleschool.net\">help@worldbibleschool.net</a>","teachers_at":"WBS Internet teachers at your congregation","total_nations":"Total Nations","total_students":"Total Students","you_are_first":"You are the first WBS Internet teacher at your congregation. You're a pioneer! Let's recruit some more teachers."},"connect":{"active_student_definition":"For students \"active\" means they've submitted an exam or sent a message to their teacher.","active_students":"Active Students","active_teacher_definition":"For teachers \"active\" means they've adopted a student, graded an exam, or sent a message to a student.","active_teachers":"Active Teachers","adopted_students":"Adopted Students","campaign_registrations":"Campaign Registrations","campaign_students_taught":"Campaign Students Taught","campaigns":"Campaigns","connect_campaign_adoptions":"Connect Campaign Adoptions","details":"details","download":"Download Connect advertising collateral <a href=\"//worldbibleschool-production.s3.amazonaws.com/connect/Connect-Advertising-Collateral_20140519.zip\">here</a>. You will need Adobe InDesign to make edits. Or, contact us at <a href=\"mailto:connect@worldbibleschool.net\">connect@worldbibleschool.net</a> if you'd like us to make minor customizations for you.","graphs":"Graphs","has_no_students_waiting":"%{name} has no students waiting.","has_students_waiting":"%{name} has %{count} students waiting","need_help":"Need help? Contact us at <a href=\"mailto:connect@worldbibleschool.net\">connect@worldbibleschool.net</a>.","new_teachers":"New Teachers","overview":"Overview","stats_on_last_30_days":"All statistics are based on last 30 days.","stats_on_last_60_days":"All statistics are based on last 60 days.","student_overview":"Student Overview","students_taught":"Students Taught","teacher_overview":"Teacher overview","teachers":"Teachers","timeline":"Timeline","total_students":"Total Students","total_teachers":"Total Teachers","waiting_on_assignment":"waiting on an assignment","waiting_on_grade_for":"waiting on a grade for %{time}","waiting_students":"Waiting Students","wbs_connect":"WBS Connect","wbs_connect_campaigns":"WBS Connect Campaigns","wbs_connect_dashboard":"WBS Connect Dashboard"},"followup":{"ago":"ago","attempted_contact":"Attempted contact","before_you_submit":"Before you submit this student","cannot_complete":"Cannot complete","completed_request":"Completed request","contact_fup":"Contact followup partner","contact_teacher":"Contact teacher","followup_partner":"Followup Partner","followup_status":"Followup Status","followup_unavailable":"Followup is currently unavailable through this website in %{nation}. Please contact <a href= \"mailto:followup@worldbibleschool.net\">followup@worldbibleschool.net</a> for followup help with this student.","has_been_adopted":"%{name} has been adopted by %{partner}.","if_need_help":"If you need help, you can %{contact_link}.","instructions":"Instructions or Notes","instructions_for_instructions":"How can the student be contacted? Can you provide a phone number? When would the student like to be contacted? What questions does the student have that will need to be answered in person? What other relevant details can you provide?","is_waiting":"%{name} is waiting to be adopted by a followup worker.","label_can_share_contact":"Did %{name} give you permission to share their contact information?","label_understands_purpose_of_baptism":"Does %{name} understand the purpose of baptism?","label_wants_in_person_study":"Did %{name} request to study the Bible in person?","label_wants_introduction_to_church":"Did %{name} request to be introduced to a local congregation?","label_wants_to_be_baptized":"Did %{name} request baptism?","last_updated":"last updated %{time} ago","made_contact":"Made contact","no":"No","no_action_taken":"No action taken","no_updates_submitted":"No updates have been submitted.","not_updated":"not updated","please_note":"Please note that followup is not always easy. This is especially true in countries where it is difficult to communicate or travel. Please be prepared to be patient. Sometimes followup can take weeks.","please_submit_frequently":"Please submit status updates frequently. These status updates keep the teacher engaged. If you need to leave more details, leave a note on the %{timeline_link}.","request_completed":"This followup request has been completed.","request_in_person":"Requested in-person Bible study","request_introduction_to_church":"Requested introduction to the Church?","request_pending":"Followup request pending","requested_baptism":"Requested baptism","send_partner_message":"Send %{partner} a message","status":"Status","status_instructions":"Status Instructions","status_updates":"Status updates","submit_for_followup":"Submit for followup","submit_request":"Submit Request","title":"New request for followup","understands_baptism_purpose":"Understands the purpose of baptism","update_status":"Update status","yes":"Yes"},"grade":{"comment":"Comment","comments":"Comments","complete":"Mark as complete","confirm_reopen":"Yes, reopen this exam","correct_answer":"Correct answer","did_not_answer":"The student did not answer this question.","exam_graded":"The exam has been graded.","exam_reopened":"%{exam} has been reopened for %{student}.","explanation":"Explanation","false":false,"finalize":"Finalize","found_in":"Found in","insert_scripture":"Insert Scripture","left_blank":"The student left this question blank.","not_ready_for_grade":"That assignment has been reopened or has not yet been submitted by the student.","not_teacher":"This exam can only be graded by the student's teacher.","overview":"Overview","reopen":"Reopen exam","reopen_explanation":"Reopen the exam to allow the student to change answers already submitted.","saved":"saved","student_answer":"Student answer","submit":"Send grade","submit_and_assign":"Send grade and view assignments","sure_reopen":"Are you sure you want to reopen this exam? When the exam is reopened, you won't be able to review or grade it until the student submits it again.","true":true,"your_comments_for":"Last comments for %{name}"},"history":{"history_for":"History for"},"hub":{"add_student":"Invite a student to study","add_teacher":"Invite a friend to teacher","all_caught_up":"Congratulations! You are all caught up with your web students.","contact_instructions":"These are students who have not received a message in the last 30 days. You might consider reaching out to these students.","edit_notice":"Edit this notice","find_help":"Find video tutorials and useful tips in our <a href=\"%{help_url}\">Help</a> section. Or, send us an email at <a href=\"mailto:support@worldbibleschool.net\">support@worldbibleschool.net</a>.","followup_students_waiting":"Followup Students Waiting","help":"Get help","more_tips":"Can't find something? Check out our help section for lots more tips.","no_student_to_contact":"You do not have any web students that you have not contacted recently. When you do, we will show them here.","no_suggestions":"You have completed all our tips for now.","no_web_students":"You don't have any students yet. You use the <a href=\"%{board_url}\">Student Board</a> to adopt your first student. Or, use the <a href=\"%{link}\">Add student</a> link on the My Students page to add a student you already know.","notice":"Notice to your students","read_more_news":"Read more news","recent_news":"Recent News","students_to_contact":"Students to Contact","students_waiting":"Students Waiting","suggestion_more_info":"more info","suggestions":"Tips","the_hub":"The Hub"},"mailbox":{"and_more":"and more","answered":"%{name} answered","archive":"Archive","archived":"Archived","archived_messages":"Archived Messages","autocomplete_hint":"Type a student's name or ID","autocomplete_no_results":"No matches were found.","compose_message":"Compose Message","from":"From","from_me":"from me","inbox":"Inbox","message":"Message","message_about_question":"This message is about a question on %{name}. You can review the completed, graded exam <a href=\"%{link}\">here</a>.","message_archived":"That message has been archived.","message_delivered":"Your message has been delivered.","message_restored":"That message has been restored.","messages_to":"Messages between you and %{name}","messages_with":"Messages with","name_to_name":"to","need_teacher_before_reply":"You need a new teacher before you can reply to comments. Please contact us to continue.","next_page":"Next","no_messages_to_display":"There are no messages to display","no_subject":"No subject","previous_page":"Previous","read":"Read","recently_viewed":"Recently Viewed","reply":"Reply","responding_to_exam":"You are sending a message in response to a question on the exam %{name}.","restore":"Restore","send_message":"Send Message","send_to_teacher":"This message will be sent to your teacher, %{name}.","sent":"Sent","sent_messages":"Sent Messages","show_more":"show more","student_teacher_left":"%{name} left this comment:","subject":"Subject","teacher_left":"Your teacher left this comment:","to":"To","to_me":"to me","unread":"Unread","unread_messages":"Unread Messages","you_dont_have_students":"You do not have any students studying through this website. If you have \"web\" students (as opposed to \"email\" or \"postal\" students) you will be able to send them messages here."},"nav":{"account":"Account","administration":"Administration","congregation":"Congregation","course_preview":"Course Preview","courses":"Courses","dashboard":"Dashboard","help":"Help","home":"Home","logout":"Logout","mailbox":"Mailbox","news":"News","next_up":"Next Up","progress":"Progress","student_board":"Student Board","students":"My Students","the_hub":"The Hub","wbs_connect":"WBS Connect"},"news":{"by":"by","news":"WBS News","next_article":"Next article","previous_article":"Previous article","written":"Written on"},"preferences":{"contact_preferences":"Contact Preferences","languages":"Languages","notification_connect_stats":"I would like to receive email updates with statistics from WBS Connect or other campaigns to which I'm connected.","notification_followup_request_in_nation":"I would like email notifications when a new followup student is ready for my country.","notification_new_connect_student":"I would like to receive email notifications when new WBS Connect students are ready for a teacher.","notifications_general":"I would like to receive miscellaneous notifications, updates, or offers from WBS.","notify_new_mini_campaign_student":"I would like to receive email notifications when I get new students from campaigns that I sponsor.","student_waiting_reminder":"I would like to receive email reminders when I have students waiting on me.","submit":"Submit","updated":"Your preferences have been updated.","yes_for_email_lesson":"I would like to receive new lessons in email.","yes_for_exams_completed_notifications":"I would like to receive email notifications when Students finish exams.","yes_for_exams_graded_notifications":"I would like to receive email notifications when my exams are graded.","yes_for_messages_notifications":"I would like to receive email notifications when my study helper sends me a message.","yes_for_messages_notificiations_from_students":"I would like to receive email notifications when my students send me messages.","yes_for_new_article_notifications":"I would like to receive email notifications when there is a new article on The Hub.","yes_for_reminders_from_wbs":"I would like WBS to remind me when I have incomplete assignments waiting.","yes_for_teach_english":"I would like to teach English speaking students.","yes_for_teach_portuguese":"I would like to teach Portuguese speaking students.","yes_for_teach_spanish":"I would like to teach Spanish speaking students."},"preview":{"all_courses":"All Courses","preview_exam":"Preview exam"},"profile_picture":{"crop":"Crop","drag_and_drop":"Drag and drop a photo here or click here to choose a photo.","profile_picture":"Profile Picture","sending":"sending","tip_1":"Smile. If you don't smile, your messages to students will come across as grumpy or always serious.","tip_2":"Use a well-lit photo. Don't use something dark and blurry.","tip_3":"Use a photo of yourself (not a sports team, family member, favorite object, etc.)","tips_headline":"Profile photo tips"},"reset_password":{"change_your_password":"Change your password","confirm_password":"Confirm password","current_password":"Current password","error_confirm":"Please confirm your password.","error_match":"The password confirmation did not match the password.","new_password":"New password","password_changed":"Your password has been changed.","submit":"Submit"},"review":{"completed_on":"This exam was completed on %{date}.","correct_answer":"Correct Answer","explanation":"Explanation","false":false,"finished_reviewing":"Finished reviewing","graded_on":"This exam was graded on %{date}.","not_been_graded":"That exam has not been graded yet.","not_your_student":"That student is no longer your student.","overview":"Overview","question_not_answered":"This question was not answered.","reply_to_comment":"Reply to this comment","review":"Review","said":"said","show_less":"Show less","show_more":"Show more","teacher_comments":"Teacher comments","true":true,"your_answer":"Your Answer","your_study_helper_said":"Your study helper said"},"student":{"after_complete":"After you complete your first exam, your teacher will grade it. You will be able to see all graded exams here.","assignments":"Assignments","assignments_for_review":"Assignments for review","being_saved":"Your exam is being saved.","certificates":"Certificates","change_answer":"Change answer","close":"Close","complete_request":"Complete a course and request a certificate from your teacher.","complete_to_earn":"Complete this course to earn this certificate.","completed_under_50":"You completed the exam! But, your grade was under 50%. Please review the lesson and try again.","completed_under_70":"You completed the exam! But, your grade was under 70%. Please review the lesson and try again.","congratulations":"Congratulations!","continue":"Continue","day":"Day","do_you_need_help":"Do you need help with this question? Are you unsure how to respond? Use this space to ask your study helper about this question.","download":"Download","download_certificate":"Download Certificate","earn_master_series":"Complete all the courses to earn the Master Series certificate.","email":"Email","exam_saved":"Your exam has been saved.","false":"false","fb_share":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=%{thumbnail}&name=Study%20the%20Bible&caption=Come%20study%20the%20Bible%20with%20World%20Bible%20School&description=I'm%20studying%20the%20Bible%20with%20World%20Bible%20School.%20You%20should%20too.%20http%3A%2F%2Fwbs.cc%2FY0J8&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","fb_share_exam":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=http:%{thumbnail}&name=%{name}&caption=%{message}&description=Here%20is%20a%20link%20you%20can%20use%20the%20preview%20the%20lesson.%20I%20hope%20you%20will!%20http://www.worldbibleschool.org/preview/%{course}/%{exam}&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","fb_share_wisdom":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=%{thumbnail}&name=%{name}&caption=%{message}&description=%{url}&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","finished_exam_share_message":"I just finished \"%{name}\", Bible lesson from World Bible School.","first_you_said":"First, you said","get_started":"Get Started","graded":"Graded %{time} ago","graded_exams":"Graded Exams","grader_commented_here":"%{name} commented here","have_already_invited":"You have already invited this friend.","he_said":"%{name} said","hide_lesson":"Hide Lesson","master_series":"Master Series","master_series_congratulations":"Download the Master Series certificate","master_series_info":"The Master Series is the name of the World Bible School courses put together. You can assign the Master Series certificate to your student when all the other courses have been completed.","message":"Message","message_sent":"Your message has been sent. Thank you for spreading the word!","messages":"Messages","month":"Month","next_assignments":"Next assignments","next_section":"Next section","next_up":"Next Up","no_graded":"You have no graded exams","not_yet_assigned":"This lesson has not been assigned to you yet.","notice_from_teacher":"Notice from your study helper","preview_exam_share_message":"World Bible School has free, online Bible study tools. Check out the lesson, \"%{name}\"","progress":"Progress","read_lesson":"Read lesson","recent_teacher_comments":"Recent teacher comments","review":"Review","review_exam":"Review exam","save":"Save","save_and_submit":"Save and Submit","saved":"saved","send":"Send","send_a_message":"Send a message to your teacher","send_a_message_to_wbs":"Get help from WBS","share":"Share this site","share_again":"Share Again","share_with_another":"Share this site with another friend","share_with_friend":"Share this site with your friend","show_lesson":"Show Lesson","submit_answers":"Submit these answers","submit_assignment":"Submit Assignment","submit_notice":"You completed the exam! Your teacher will review the exam soon.","submit_whole_exam":"Submit and complete assignment","submitted":"Submitted","take_exam":"Take exam","teacher_commented_here":"Your teacher commented here","thanks_for_sharing":"Thanks for Sharing!","then_commenter_said":"Then %{name} said","then_study_helper_said":"Then your study helper said","true":"true","try_again":"Try Again","twitter_share":"https://twitter.com/intent/tweet?text=I'm%20studying%20the%20Bible%20with%20World%20Bible%20School.%20You%20should%20too.&tw_p=tweetbutton&url=http%3A%2F%2Fwbs.cc%2FduhN","twitter_share_exam":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=%{message}&tw_p=tweetbutton&url=http%3A%2F%2Fwww.worldbibleschool.org%2Fpreview%2F%{course}%2F%{exam}","twitter_share_wisdom":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=%{message}&tw_p=tweetbutton&url=%{url}","view_comments":"%{count} teacher comments","view_recent_grades":"View Recent Grades","what_is_next":"What is next?","working_on_match":"We are currently working on matching you with a teacher. The average wait time for a teacher right now is about %{time}. While you are waiting, you should share this site with your friends.","year":"Year","you_have_completed":"You have completed your exams.","you_have_completed_all":"You have completed all the WBS courses.","you_said":"You said","you_should_study":"I'm studying the Bible with World Bible School. You should too!","your_friends_email":"Your friend's email","your_study_helper":"Study helper","your_teacher_will_grade":"Your teacher is grading your exam and will return it soon."},"student_board":{"adopt":"Adopt %{mode} Student","adopt_followup":"Adopt request","adopt_without_mode":"Adopt","all_set":"All Set","are_you_sure_bypass_connect":"Are you sure you want to send this student to the general Student Board? This will be permanent.","are_you_sure_email_student":"This is an email student. You will have to communicate with this student over email, grade lessons manually, and keep records manually. Are you sure you want to adopt this email student?","are_you_sure_postal_student":"ATTENTION: This is a postal student. You must have printed lessons from WBS purchased and ready to send before adopting this student. Are you EQUIPPED to send printed materials IMMEDIATELY? For more information, see the Help page on Postal Teaching.","are_you_sure_web_student":"Are you sure you want to adopt this web student?","campaign":"Campaign","campaigns":"Campaigns","confirm_adopt":"Yes, adopt this student","connect":"Connect","filter":"Filter","filter_all":"All","filter_all_explanation":"Show all students regardless of mode of study.","filter_email":"Email","filter_email_explanation":"Show only students studying through email.","filter_followup":"Followup","filter_followup_explanation":"Show only requests for followup.","filter_postal":"Postal","filter_postal_explanation":"Show only students studying through postal mail.","filter_show":"Show","filter_students":"students","filter_web":"Web","filter_web_explanation":"Show only students studying through the website.","general_campaign":"general WBS advertising","lessons_completed":"Lessons completed","mode_all":"all modes","mode_email":"email","mode_postal":"postal mail","mode_web":"the website","name":"Name","no_students_available":"There are no students available to adopt at this time. Check back soon for more students.","problem_adopting_student":"There was a problem adopting this student. Try again later, or contact web@worldbibleschool.net.","problem_adopting_student_please":"There was a problem adopting this student. Please try again later.","problem_bypass_connect":"There was a problem moving that student to the general Student Board.","request_in_person":"Requested in-person Bible study","request_introduction_to_church":"Requested introduction to the Church?","requested_baptism":"Requested baptism","return":"Return","return_student":"Return to Student Board","send_to_board":"Send to Student Board","showing":"Showing <strong class=\"showing-mode\">all</strong> students from <strong>%{campaign}</strong>","showing_blurb":"Showing <strong class=\"available-count\"></strong> students wanting to learn through <strong class=\"showing-mode\"></strong>.","showing_blurb_default":"Showing <strong class=\"available-count\">%{count}</strong> students wanting to learn through <strong class=\"showing-mode\">%{mode}</strong>.","showing_blurb_followup":"Showing <strong class=\"available-count\"></strong> students waiting for followup help.","student_adopted":"Oops! That student has already been adopted by another teacher. We removed that student from the Student Board.","student_board":"Student Board","student_detail":"Student Detail","students_available_to_all_teachers":"Students available to all teachers","students_on_connect_page":"Students on this page are available to you because of your membership in the World Bible School group.","the_way":"The Way","understands_baptism_purpose":"Understands the purpose of baptism","unknown":"unknown","view_all":"View All","waiting":"waiting","waiting_divider":"Waiting over %{time}","waiting_divider_less":"Waiting less than %{time}","wbs":"WBS","would_you_like_connect":"Would your congregation like to recruit and teach students locally or at a mission point using a targeted WBS campaign? Learn more about the <a href=\"http://www.worldbibleschool.net/wbs-connect\">WBS Connect program here</a>.","you_have_more_than_five_waiting":"You have more than %{count} students waiting on you to grade an exam or assign a new one. Please catch those students up first, then come back to adopt new students.","you_have_more_than_limit_postal":"You have adopted %{count} postal students in the past 24 hours. Please wait a day and try again.","you_have_more_than_limit_web":"You have adopted %{count} web students in the past 24 hours. Please wait a day and try again.","your_recently_adopted":"Your recently adopted","your_session_has_expired":"Your login session has expired. Please logout, then login again."},"student_notice":{"explanation":"When active, this notice will be displayed to your web students when they log in to the website.","followup":"Followup","notice":"Notice","off":"Off","on":"On","student_notice":"Student Notice","update":"Update"},"students":{"a_to_z":"A-Z (last name)","add_student":"Add student","address":"Address","all":"All","all_students":"All students","assign_lessons_to":"Assign lessons to %{name}","assign_to_me":"Me","assign_to_someone_else":"Someone else","assign_to_teacher":"Teacher","assignments":"Assignments","by_id":"By ID","by_last_communication":"By Last Communication","city":"City","close":"Close","confirm_email":"Confirm Email","confirm_password":"Confirm password","deliver_information":"Delivery Information","download_email_courses":"Download Email Courses","email":"Email","email_download_url":"https://worldbibleschool-production.s3.amazonaws.com/World-Bible-School-Email.zip","email_is_already_taken":"Email is already taken. Contact web@worldbibleschool.net if you need help finding this student.","email_taken":"Email is already taken.","export_to_csv":"Export to CSV","family_name":"Last Name","female":"Female","filter":"Filter","following_exam_needs_grading":"The following exam needs grading","followup":"Followup","grade":"Grade","grade_exam":"Grade %{name}","has_been_added":"has been registered","has_been_registered":"has been registered","help_email_taken":"Email is already taken. Contact <a href=\\\"mailto:web@worldbibleschool.net\\\">web@worldbibleschool.net</a> if you need help finding this student.","hidden_students":"Hidden","hide":"Hide","hide_this_student":"Hide this student","language":"Language","last_communication":"Last communication","male":"Male","my_hidden_students":"My hidden students","name_for_certificate":"Name for certificate","nation":"Nation","needs_update":"needs update","no_students_yet":"You do not have any students yet. We should fix that. Click the Student Board link to view students who are ready for a teacher.","note_student_sent_email":"%{name} was sent an email with his or her login information. \"The Way\" was automatically assigned to this student.","options":"Options","overview":"Overview","password":"Password","personal_information":"Personal Information","personal_name":"First Name","postal_students":"Postal Students","preferences":"Preferences","problem_hiding":"There was a problem hiding this student. Please try again later.","problem_unhiding":"There was a problem unhiding this student. Please try again later.","register_a_new_student":"Register a new student","register_another":"Register another student","required":"Required","search":"Search your students","see_students_waiting":"Waiting on me","send_message":"Send message","show_all_students":"show all students","showing":"Showing <strong class=\"available-mystudents-count\">%{count}</strong> students.","sort":"Sort","sort_by_id":"ID (most recent first)","sort_by_last_comm":"last communication","state":"State","student_detail":"Student Detail","student_details":"Student Details","student_is_email":"%{name} is studying through email. You can download the latest email courses <a href=\"%{link}\">here</a>. You cannot assign lessons from this page. You can, however, assign certificates.","student_is_postal":"%{name} is studying through postal mail. You cannot assign lessons or certificates through this page.","student_navigation":"Student Navigation","students":"My Students","study_mode":"Study mode","study_mode_email":"email","study_mode_postal":"postal mail","study_mode_web":"web","studying_through_email":"%{name} is studying through email.","studying_through_postal":"%{name} is studying through postal mail.","studying_through_web":"%{name} is studying through the website.","submit":"Submit","timeline":"Timeline","unhide":"Unhide","unhide_this_student":"Unhide this student","update":"Update","view_history":"View History","view_visible_students":"view visible students","visible_students":"visible students","waiting":"Waiting","waiting_on_assignment":"waiting on an assignment","your_hidden_students":"Your hidden students","zip":"Zip"},"timeline":{"last_activity":"Last activity","last_login":"Last login","logged_in_na":"n/a","note_created":"Your note was created.","recent_activity":"Recent Activity","statistics":"Statistics","submit":"Add Note","timeline_for":"Timeline for"},"user":{"access_error":"That student is not your student to update.","additional_student_information":"Additional Student Information","address_1":"Address line 1","address_2":"Address line 2","address_3":"Address line 3","administrator":"administrator","all_assigned":"All of the available certificates have been granted to this student.","all_certificates_granted":"All of the available certificates have been granted to this student.","assignments":"Assignments","block_quote":"Block Quote","bold":"Bold","certificates":"Certificates","city":"City","course":"Course","decrease_indent":"Decrease Indent","email":"email","graduated":"Graduated","graduated_no":"No","graduated_yes":"Yes","increase_indent":"Increase Indent","insert_edit_link":"Insert/Edit Link","insert_remove_bulleted_list":"Insert/Remove Bulleted List","insert_remove_numbered_list":"Insert/Remove Numbered List","italic":"Italic","language":"Language","mode_of_study":"Mode of Study","nation":"nation","new_certificate":"New Certificate","no_certificates":"This student has not been assigned a certificate yet.","notes":"Notes","notes_update":"Your notes have been updated.","pending":"pending","personal_information":"Personal Information","postal":"postal","postal_location_information":"Postal/Location Information","problem_assigning":"There was a problem making that assignment. Please reload this page and try again.","profile_information":"Profile Information","send_an_email_to_teacher":"Email Teacher","send_message":"Send message","state":"State","strikethrough":"Strikethrough","student":"student","student_name":"Student's name","student_updated":"That student has been updated.","submit":"Submit","teacher":"Teacher","timeline":"Timeline","underline":"Underline","user_type":"user type","view_address":"View Address","view_all":"view all","web":"website","zip":"Postal code"}},"assignment_reopened":{"assignment":"Assignment","review":"Review your assignment","subject":"%{name} has been reopened","title":"Your teacher reopened an assignment for you."},"change_to_web":{"change_to_web":"Change to Web","change_your_password":"Create a new password for your account to start studying through the website.","create_my_password":"Create my password","description":"%{name} (%{id}) has changed mode of study to web. How would you like to proceed?","explain_password":"First, create a new password. You will use this password to login to this website in the future.","has_been_returned":"%{name} has been returned to the Student Board.","return_to_board":"Return student to board","share_with_coworker":"Share student with a coworker","short_description":"Change to web study","study_through_this_site":"<p class='mbf'>To change this, click below</p><a href='/change_to_web/%{confirmation}'class='button info tiny'>I would like to study through the website instead*</a><br/><p class='small'><em>*Please note that a few courses are not available through the website.</em></p>","subject":"WBS Student Changing to Web Study","teach_student":"Teach student on the website","thank_you_for_continuing":"Great! Thank you for continuing with %{name}.","thanks":"Your are now a web student. Thank you.","update":"Update"},"check_email":{"check_your_email":"Check your email","next_step":"Thank you for registering. The next step is to find an email from World Bible School. Click the \"Confirm Email\" link in that email to get your email lessons."},"confirmation":{"after_confirm":"After you confirm, World Bible School is going to give your email address to a World Bible School study helper. You will receive email lessons from this study helper.","change_email":"Confirm Email","change_to_web":"Some students elect to study through our website. Studying through the website keeps your email private, keeps your lessons and information in one spot, and is usually easier to use than email. If you would like to change to study through the web, please <a href=\"%{link}\">click here</a>.","please_confirm":"Please confirm your email address","subject":"World Bible School - Confirm Email","to_confirm":"To confirm your email address and get your first World Bible School lesson, please click the link below:"},"connect_statistics":{"active_teachers":"Active Teachers","followup_requests":"Followup Requests","new_teachers":"New Teachers","students_active":"Students Active","students_registered":"Students Registered","subject":"WBS Connect Updates","this_is_web_ads":"This is a WBS Web Ads campaign.","title":"%{month} Connect Updates","trend":"Trend","url_is":"The URL for this campaign is <strong>%{subdomain}.%{domain}</strong>"},"contact":{"contact_us":"Contact us","eager_to_hear":"We are eager to hear your questions or comments.","email":"Email","message":"Message","name":"Name","problem":"There was a problem sending your message. Please try again.","send":"Send","subject":"World Bible School Contact","thank_you":"Thank You!","thank_you_for_contacting":"Thank you for contacting us. We have received your message and will respond, usually in 48 hours.","title":"World Bible School"},"credit_card":{"card_number":"Card Number","credit_card_info":"Credit Card Info","cvc":"CVC","delete_this_card":"Delete this card","enter_new_card":"Enter new card","expiration":"Expiration (MM/YY)","no_card":"We don't have a credit card on file for you. The next time you use a credit card to make a donation on this site, your credit card information will be stored securely.","submit_new_card":"Submit New Card","updated_successfully":"Your card was updated successfully.","will_be_used":"Note: The card below will be used for your future donations through this website."},"exam_finished":{"exam":"Exam","grade":"Grade the exam","has_finished":"%{name} has finished an exam and is waiting for a grade and a word of encouragement from you.","subject":"%{name} has finished an exam","title":"%{name} has finished an exam"},"exam_graded":{"exam":"Exam","review":"Review your exam","subject":"%{name} has Been Graded","title":"Your teacher has finished grading your exam."},"followup_adopted":{"explanation":"%{partner} adopted %{student}. %{partner_first} will keep notes on progress. You can view those notes on the timeline page for this student. You can also send messages to %{partner_first} through the WBS website.","subject":"Your followup request has been adopted","title":"%{name} has been adopted.","view_timeline":"View timeline"},"followup_for_nation":{"explanation":"A student named %{student} is waiting to be helped with followup.","subject":"A new followup student is ready","title":"A new followup student from %{nation} is waiting.","view_student_board":"View Student Board"},"followup_left_note":{"explanation":"%{partner} left a note on %{student}.","subject":"%{name} left a note on your student","title":"%{name} left a note.","view_timeline":"View Timeline"},"followup_status_update":{"explanation":"%{name}'s followup request status has been updated to \"%{status}\".","subject":"%{name} updated a followup status","title":"%{name} updated the status.","view_timeline":"View Timeline"},"giving":{"amount":"Amount","can_study_by":"These students can study by...","card":"Card","card_number":"Card number","card_preferences":"Card preferences","cvc":"CVC","date":"Date","description":"Description","donation":"Donation","expiration_date":"Expiration date","expires":"Expires","give_summary":"Yes, I want to give $%{amount} to find %{price_per} students in %{location}.","help_us_find":"Help us find more students in %{location}.","help_us_find_count":"That will help us find %{price_per} seekers in %{location}.","is_this_secure":"Is this secure?","next":"Next","no":"No","now_good_time":"Is now a good time to give?","only_cards_charged_here":"Note: Only gifts processed through this website are displayed here. Any giving done offline or through worldbibleschool.net will not be shown.","postal_only":"Postal only","previous":"Previous","submit_donation":"Submit donation","thank_you_for_gift":"Thank you for your generous gift.","we_emailed_you_record":"We emailed you a gift record.","we_will_be_charging":"We will be charging this card. If you would like to change your card preferences, please view your %{card_link}.","web_only":"Web only","web_or_postal":"Web or Postal","would_you_like_to_teach":"Would you like to teach these students?","yes":"Yes"},"login":{"check_your_email":"Check your email for help.","could_not_find_account":"We could not find that email and password combination.","email":"Email","login":"Login","lost_password":"I forgot my password","or":"or","password":"Password","problem_with_login":"There was a problem with your login.","register":"Register","remember_me":"Remember me","submit":"Login"},"lost_password":{"address_not_found":"That email address was not found. Would you like to try a different email address? Or would you like to <a href=\"/register\">register</a>?","instructions":"Submit your email address. We will send you a link you can use to change your password.","invalid_email":"Please enter a valid email address.","link_sent":"A link to reset your password has been sent to %{email}. Please check your email.","lost_password":"Forgot your password?","not_for_web":"Your account was not created with a password to log in to the website. If you would like to study through the website, please contact us at <a href=\"mailto:web@worldbibleschool.net\">web@worldbibleschool.net</a>."},"mini_campaign_statistics":{"followup_requests":"Followup Requests","students_active":"Students Active","students_registered":"Students Registered","subject":"WBS Campaign Updates","title":"%{month} Campaign Updates","trend":"Trend"},"nav":{"contact":"Contact us","faqs":"FAQs","home":"Home","login":"Login","menu":"Menu","preview":"Preview","register":"Register","title":"World Bible School","tour":"Tour"},"new_article":{"explanation":"This article comes from \"The Hub\" on the WBS website.","read_more":"Read more","subject":"New Article from WBS"},"new_certificate":{"congratulations":"Congratulations!","subject":"You Have Earned a WBS Certificate","title":"You have a new certificate!","you_have_earned":"You have earned a certificate for %{name}. Your certificate is attached."},"new_lesson":{"enter_answers":"Enter Answers","enter_through_website":"Enter your answer for this question through the website.","forward_to_friend":"Forward this lesson to a friend. Sign up for free Bible study at %{link}.","subject":"New WBS Lesson: %{name}"},"new_message":{"reply":"Reply","sent_message":"%{name} sent you a message.","subject":"%{name} sent you a message","title":"You received a message on WBS"},"notifier":{"call_to_action":"Click this button","call_to_action_image":"click-button-en.jpg","contact_teacher":"If you would like to contact your teacher, you can do so through the mailbox on the website.","do_not_respond":"Please do not respond to this email. If you are having technical difficulties, please email <a href=\"mailto:support@worldbibleschool.net\">support@worldbibleschool.net</a>.","from":"World Bible School <no-reply@worldbibleschool.net>","from_support":"World Bible School <support@worldbibleschool.net>","god_bless":"God bless","logo":"email-logo.png","please_log_in_to":"Please log in to","title":"World Bible School","update_contact_preferences":"update your contact preferences"},"register":{"address":"Address","after_register_email":"After you register, we will send you an email to confirm your address. After you confirm you email, we will give your email address to a WBS study helper. Your study helper will send your lessons to your email.","after_register_postal":"After you register, we will give your address to a World Bible School study helper. In 3-6 weeks you will receive the first lesson from your study helper.","after_register_web":"After you register, you will be immediately redirected and will be able to start your first lesson. No waiting on emails or account set up.","city":"City","confirm_email":"Re-type your email","confirm_password":"Confirm your password","delivery_information":"Delivery Information","email":"Email","email_address":"Email","family_name":"Last Name","first_name":"First Name","have_slow_internet":"Do you have limited or unusually slow Internet service?","how_receive_lessons":"How do you prefer to receive your lessons?","i_live_in":"Country I live in","internet_unreliable":"Internet Unreliable?","password":"Password","personal_information":"Personal Information","postal":"Postal","postal_explanation":"Paper lessons mailed to you.","problem_internet":"Do you have little or no problem with your Internet service?","register":"Register","register_as_email":"register as an email student.","register_as_postal":"register as a postal student","register_with_web":"registering to study using the website","registering":"Registering...","required":"Required","start_today":"Start <span>Learning</span> the Bible Today","state":"State","submit":"Register","submit_email":"Register for email","submit_postal":"Register for postal","tagline":"Register for free with our secure sign-up form","thank_you_logged_in":"Thanks for registering. You are now logged in and ready to study.","title":"World Bible School","to_get_email":"We will share your email address with one of our teachers.","to_get_postal":"to get your lessons over postal mail. Your first lesson will arrive in 3-6 weeks.","type_password":"Create a password","unable_to_internet":"Are you unable to access the Internet on a regular basis?","we_recommend":"For most students with Internet access, we recommend","web":"Web","web_explanation":"Learn online or by email.","you_can":"You can","zip":"Zip"},"registration_from_connect":{"email_student":"This student registered to study by email and is available for assignment on the Student Board for this campaign.","name":"Name","postal_student":"This student registered to receive lessons by postal mail.","subject":"New Registration - Connect %{name}","title":"New Registration from the %{name} Connect Campaign","view_student_board":"View Student Board","web_student":"This student registered to study by web and is available to adopt on the Student Board.","why":"You are receiving this email because you are a member of a WBS Connect group. Other members of your group are also receiving this email. If the student is not on the Student Board, it may be because another member of your Connect group already adopted the student. If you would like to no longer receive these emails, <a href=\"%{link}\">click here to update your contact preferences</a>."},"reminder":{"followup_needs_status":{"subject":"Please send status updates"},"followup_newsletter":{"subject":"World Bible School Followup Updates"}},"reset_password":{"instructions":"Submit your new password below.","password_change":"Password Change","please_ignore":"If you did not request a new password, please ignore this email.","reset_my_password":"Reset my password","reset_password":"Reset your password","subject":"World Bible School - New Password","you_requested":"You have requested a password change."},"reset_password_link":{"subject":"World Bible School - Password Reset"},"share":{"register":"Register","share":"Invitation from %{name}","subject":"Invitation from %{name}","title":"Study the Bible with World Bible School","to_sign_up":"To sign up for free Bible lessons, use the link below:"},"share_teacher":{"apply":"Apply","background":"You've been invited by %{name} to teach with %{group}. World Bible School is a simple set of tools to help Christians tell the world about Jesus. In order to get started, please go to this link and complete an application.","subject":"WBS Invitation from %{name}"},"student_from_mini_campaign":{"email_student":"This student registered to study by email.","name":"Name","postal_student":"This student registered to receive lessons by postal mail.","subject":"New Student for You","title":"You've got a new WBS student","view_students":"View Students","web_student":"This student registered to study by web.","why":"You are receiving this email because you donated to find new students and elected to teach them."},"teacher":{"address_cont":"Address (cont)","agree_1":"As a WBS Study Helper, I agree that I am a member, in good standing, of the Lord's church. Christ has added me to God's family when I trusted His Gospel, repented of my sins and, as a believer, received immersion for the removal of my sins.","agree_1_sub_1":"\"In good standing\" means I continue to follow Christ faithfully. My dedication to Christ's way of life is evident to others.","agree_2":"As a WBS Study Helper, I agree to stand in basic agreement with the WBS courses. As I teach, I will review the WBS Master Series courses.","agree_2_sub_1":"\"Basic agreement\" means I believe, practice and teach the great truths taught by the Bible and thus by WBS.","agree_2_sub_2":"You can apply to teach without committing to take a student. In this way, you can review the Master Series.","agree_2_sub_3":"Alternatively, you can choose a student and review the Master Series alongside the student. If you find some material with which you cannot agree, you can simply let us know and we will transfer the student and cancel your account.","agree_2_sub_4":"From time-to-time WBS requests prospective teachers to study the Master Series as a student prior to becoming a teacher.","agree_3":"I will use the World Bible School Follow Up system.","agree_3_exp":"Your involvement as a World Bible School Study Helper is very important to the success of helping those seeking God through the study of the Bible. Ephesians 4:4 says, <i>\"There is one body and one Spirit, just as you were called to one hope when you were called.\"</i> As a World Bible School Study Helper you can help maintain this spirit of unity by using the proven method of the World Bible School Follow Up System. This system actually assists Study Helpers in the following ways:","agree_3_sub_1":"It helps Study Helpers avoid scams and fraud.","agree_3_sub_2":"It makes following up easier for Study Helpers by letting them focus on their study partners.","agree_3_sub_3":"It allows WBS to measure the effectiveness of this system for future improvement.","agree_3_sub_4":"It allows the efforts of both WBS and you to help ensure the new Christian will be paired with a faithful, encouraging congregation.","agree_4":"I have read and accept the WBS Teacher Agreement.","agree_4_sub_1":"The WBS Teacher Agreement can be found here:","agree_to":"In order to become a World Bible School teacher you must read and agree to the following points:","birth_year":"Birth year","city":"City","congregation_city":"Congregation City","congregation_information":"Congregation Information","congregation_name":"Congregation Name","congregation_state":"Congregation State/Region/Province","country":"Country","email":"Email","english":"English","family_name":"Last Name","female":"Female","first_name":"First Name","gender":"Gender","how_prefer":"How do you prefer to teach?","i_agree":"I agree","internet":"Internet","intro":"We are glad you are interested in becoming a World Bible School teacher. Sharing The Good News with the world is exciting work. We are eager to get you started with your first student.","mailing_address":"Mailing address","mailing_information":"Mailing Information","male":"Male","personal_information":"Personal Information","phone_number":"Phone number","portuguese":"Portuguese","postal":"Postal","questions_comments":"Questions/Comments","required":"Required","send":"Send","spanish":"Spanish","state":"State/Region/Province","title":"Teacher Application","wbs_teacher_agreement":"WBS Teacher Agreement","web_or_email":"Web or email","what_languages":"What languages would you like to teach?","zip":"Zip/Postal/Country Code"},"thank_you_donation_mini_campaign":{"email_updates":"By the way, we are going to send you a monthly report for your gift. You'll know how many students registered and which ones are actively studying. You'll even know when those students are referred to followup. Keep your eye out for that email to come on the first of each month.","info":"Thank you for giving to help us connect seekers to the Bible.","subject":"Thank you for Giving","title":"Thank you for your gift."},"waiting_registration_from_campaign":{"next_step":"Please login to the website and check your student board for this campaign. Then adopt the student or ask one of your Connect teachers to adopt the student.","subject":"Connect Student is Waiting","title":"At least one student from the %{name} Connect campaign is waiting."},"welcome":{"subject":"Welcome to World Bible School"},"welcome_followup":{"subject":"Congratulations Partner! (WBS)"},"welcome_teacher":{"subject":"Welcome to World Bible School"},"welcome_with_password":{"account_created_for_you":"A World Bible School account has been created for you. To study the Bible with us, log in with this information:","after_complete":"After you complete the first exam, we will assign a study helper to you. This study helper will guide you through the World Bible School courses.","god_bless":"God bless!","login":"Log in","login_url":"www.worldbibleschool.org/login","study_helper":"Your study helper is %{name}.","subject":"Welcome to World Bible School","url":"www.worldbibleschool.org","welcome":"Welcome to World Bible School"}},"authlogic":{"error_messages":{"email_invalid":"should look like an email address.","general_credentials_error":"Email/Password combination is not valid","login_blank":"can not be blank","login_not_found":"address was not found. Have you already registered?","no_authentication_details":"You did not provide any details for login.","password_blank":"can not be blank","password_invalid":"is not valid"}},"date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %e, %Y","message":"%b %d, %Y","month_year":"%b %Y","only_day":"%e","short":"%e %b","year_first":"%Y-%-m-%-d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"%{count} hours"},"about_x_months":{"one":"about 1 month","other":"%{count} months"},"about_x_years":{"one":"about 1 year","other":"%{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"1 minute","other":"%{count} minutes","zero":"less than a minute"},"less_than_x_seconds":{"one":"1 second","other":"%{count} seconds","zero":"less than 1 second"},"over_x_years":{"one":"over 1 year","other":"%{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"devise":{"confirmations":{"confirmed":"Your account was successfully confirmed.","send_instructions":"You will receive an email with instructions about how to confirm your account in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive an email with instructions about how to confirm your account in a few minutes."},"failure":{"already_authenticated":"You are already signed in.","inactive":"Your account is not activated yet.","invalid":"Oops, wrong email or password. Try again please.","last_attempt":"You have one more attempt before your account will be locked.","locked":"Your account is locked.","not_found_in_database":"Oops, wrong email or password. Try again please.","not_web_student_email":"<p class='login-error-postal mbl'>You are unable to log in to the website because you are currently studying the Bible through email.</p>","not_web_student_postal":"<p class='login-error-postal mbl'>You are unable to log in to the website because you are currently studying the Bible through postal.</p>","timeout":"Your session expired. Please sign in again to continue.","unauthenticated":"You need to sign in or sign up before continuing.","unconfirmed":"You have to confirm your account before continuing."},"mailer":{"confirmation_instructions":{"subject":"Confirmation instructions"},"email_changed":{"subject":"Email Changed"},"password_change":{"subject":"Password Changed"},"reset_password_instructions":{"subject":"Reset password instructions"},"reset_password_instructions_login_failure":{"can_we_help":"Can we help?","instructions":"It looks like you might be having some trouble logging in. In case you forgot your password, you can click the button below to get a new password. Or, if you don't want a new password, just ignore this email.","subject":"Having trouble logging in?"},"unlock_instructions":{"subject":"Unlock Instructions"}},"omniauth_callbacks":{"failure":"Could not authenticate you from %{kind} because \"%{reason}\".","success":"Successfully authenticated from %{kind} account."},"passwords":{"no_token":"You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.","send_instructions":"You will receive an email with instructions on how to reset your password in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.","updated":"Your password was changed successfully. You are now signed in.","updated_not_active":"Your password was changed successfully."},"registrations":{"destroyed":"Bye! Your account was successfully cancelled. We hope to see you again soon.","signed_up":"Welcome! You have signed up successfully.","signed_up_but_inactive":"You have signed up successfully. However, we could not sign you in because your account is not yet activated.","signed_up_but_locked":"You have signed up successfully. However, we could not sign you in because your account is locked.","signed_up_but_unconfirmed":"A message with a confirmation link has been sent to your email address. Please open the link to activate your account.","update_needs_confirmation":"You updated your account successfully, but we need to verify your new email address. Please check your email and click on the confirm link to finalize confirming your new email address.","updated":"You updated your account successfully."},"sessions":{"already_signed_out":"Signed out successfully.","signed_in":"Signed in successfully.","signed_out":"Signed out successfully."},"unlocks":{"send_instructions":"You will receive an email with instructions about how to unlock your account in a few minutes.","send_paranoid_instructions":"If your account exists, you will receive an email with instructions about how to unlock it in a few minutes.","unlocked":"Your account has been unlocked successfully. Please sign in to continue."}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","already_confirmed":"was already confirmed, please try signing in","blank":"can't be blank","carrierwave_download_error":"could not be downloaded","carrierwave_integrity_error":"is not of an allowed file type","carrierwave_processing_error":"failed to be processed","confirmation":"doesn't match %{attribute}","confirmation_period_expired":"needs to be confirmed within %{period}, please request a new one","content_type_blacklist_error":"You are not allowed to upload %{content_type} files","content_type_whitelist_error":"You are not allowed to upload %{content_type} files","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","expired":"has expired, please request a new one","extension_blacklist_error":"You are not allowed to upload %{extension} files, prohibited types: %{prohibited_types}","extension_whitelist_error":"You are not allowed to upload %{extension} files, allowed types: %{allowed_types}","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","improbable_phone":"is an invalid number","inclusion":"is not included in the list","invalid":"is invalid","invalid_currency":"must be a valid currency (eg. '100', '5%{decimal}24', or '123%{thousands}456%{decimal}78'). Got %{currency}","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","max_size_error":"File size should be less than %{max_size}","min_size_error":"File size should be greater than %{min_size}","mini_magick_processing_error":"Failed to manipulate with MiniMagick, maybe it is not an image? Original Error: %{e}","not_a_number":"is not a number","not_an_integer":"must be an integer","not_found":"not found","not_locked":"was not locked","not_saved":{"one":"1 error prohibited this %{resource} from being saved:","other":"%{count} errors prohibited this %{resource} from being saved:"},"odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","rmagick_processing_error":"Failed to manipulate with rmagick, maybe it is not an image?","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}}},"flash":{"actions":{"create":{"notice":"%{resource_name} was successfully created."},"destroy":{"alert":"%{resource_name} could not be destroyed.","notice":"%{resource_name} was successfully destroyed."},"update":{"notice":"%{resource_name} was successfully updated."}}},"helpers":{"page_entries_info":{"entry":{"one":"entry","other":"entries","zero":"entries"},"more_pages":{"display_entries":"Displaying %{entry_name} <b>%{first}&nbsp;-&nbsp;%{last}</b> of <b>%{total}</b> in total"},"one_page":{"display_entries":{"one":"Displaying <b>1</b> %{entry_name}","other":"Displaying <b>all %{count}</b> %{entry_name}","zero":"No %{entry_name} found"}}},"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","submit":"Save %{model}","update":"Update %{model}"}},"mailboxer":{"message_mailer":{"subject_new":"Mailboxer new message: %{subject}","subject_reply":"Mailboxer new reply: %{subject}"},"notification_mailer":{"subject":"Mailboxer new notification: %{subject}"}},"nations":{"ad":"Andorra","ae":"United Arab Emirates","af":"Afghanistan","ag":"Antigua and Barbuda","ai":"Anguilla","al":"Albania","am":"Armenia","an":"Netherlands Antilles","ao":"Angola","ar":"Argentina","as":"American Samoa","at":"Austria","au":"Australia","aw":"Aruba","az":"Azerbaijan","ba":"Bosnia and Herzegovina","bb":"Barbados","bd":"Bangladesh","be":"Belgium","bf":"Burkina Faso","bg":"Bulgaria","bh":"Bahrain","bi":"Burundi","bj":"Benin","bl":"Saint Barthelemy","bm":"Bermuda","bn":"Brunei Darussalam","bo":"Bolivia","bq":"Navassa Island","br":"Brazil","bs":"Bahamas","bt":"Bhutan","bw":"Botswana","by":"Belarus","bz":"Belize","ca":"Canada","cd":"Congo, the Democratic Republic of the","cf":"Central African Republic","cg":"Congo, Republic of the","ch":"Switzerland","ci":"Cote d'Ivoire","ck":"Cook Islands","cl":"Chile","cm":"Cameroon","cn":"China","co":"Colombia","cr":"Costa Rica","cs":"Serbia and Montenegro","cu":"Cuba","cv":"Cape Verde","cw":"Curacao","cy":"Cyprus","cz":"Czech Republic","de":"Germany","dj":"Djibouti","dk":"Denmark","dm":"Dominica","do":"Dominican Republic","dz":"Algeria","ec":"Ecuador","ee":"Estonia","eg":"Egypt","er":"Eritrea","es":"Spain","et":"Ethiopia","fi":"Finland","fj":"Fiji","fm":"Micronesia, Federated States of","fr":"France","ga":"Gabon","gb":"United Kingdom","gd":"Grenada","ge":"Georgia","gh":"Ghana","gm":"Gambia","gn":"Guinea","gq":"Equatorial Guinea","gr":"Greece","gt":"Guatemala","gu":"Guam","gw":"Guinea-Bissau","gy":"Guyana","hk":"Hong Kong","hn":"Honduras","hr":"Croatia","ht":"Haiti","hu":"Hungary","id":"Indonesia","ie":"Ireland","il":"Israel","in":"India","iq":"Iraq","ir":"Iran","is":"Iceland","it":"Italy","jm":"Jamaica","jo":"Jordan","jp":"Japan","ke":"Kenya","kg":"Kyrgyzstan","kh":"Cambodia","ki":"Kiribati","km":"Comoros","kn":"Saint Kitts and Nevis","kp":"North Korea","kr":"Korea, Republic of","kw":"Kuwait","ky":"Cayman Islands","kz":"Kazakhstan","la":"Lao People's Democratic Republic","lb":"Lebanon","lc":"Saint Lucia","li":"Liechtenstein","lk":"Sri Lanka","lr":"Liberia","ls":"Lesotho","lt":"Lithuania","lu":"Luxembourg","lv":"Latvia","ly":"Libya","ma":"Morocco","mc":"Monaco","md":"Moldova","me":"Montenegro","mf":"Saint Martin","mg":"Madagascar","mh":"Marshall Islands","mk":"Macedonia","ml":"Mali","mm":"Myanmar","mn":"Mongolia","mo":"Macau","mp":"Northern Mariana Islands","mq":"Martinique","mr":"Mauritania","ms":"Montserrat","mt":"Malta","mu":"Mauritius","mv":"Maldives","mw":"Malawi","mx":"Mexico","my":"Malaysia","mz":"Mozambique","na":"Namibia","nc":"New Caledonia","ne":"Niger","ng":"Nigeria","ni":"Nicaragua","nl":"Netherlands","no":"Norway","np":"Nepal","nr":"Nauru","nz":"New Zealand","om":"Oman","pa":"Panama","pe":"Peru","pf":"French Polynesia","pg":"Papua New Guinea","ph":"Philippines","pk":"Pakistan","pl":"Poland","pr":"Puerto Rico","ps":"Palestine","pt":"Portugal","pw":"Palau","py":"Paraguay","qa":"Qatar","rn":"Rapa Nui","ro":"Romania","ru":"Russia","rw":"Rwanda","sa":"Saudi Arabia","sb":"Solomon Islands","sc":"Seychelles","sd":"Sudan","se":"Sweden","sg":"Singapore","si":"Slovenia","sk":"Slovakia","sl":"Sierra Leone","sm":"San Marino","sn":"Senegal","so":"Somalia","sr":"Suriname","ss":"South Sudan, The Republic of","st":"Sao Tome and Principe","sv":"El Salvador","sx":"Sint Maarten","sy":"Syria","sz":"Swaziland","tc":"Turks and Caicos Islands","td":"Chad","tg":"Togo","th":"Thailand","tj":"Tajikistan","tk":"Tokelau","tl":"Timor-Leste","tm":"Turkmenistan","tn":"Tunisia","to":"Tonga","tr":"Turkey","tt":"Trinidad and Tobago","tv":"Tuvalu","tw":"Taiwan","tz":"Tanzania","ua":"Ukraine","ug":"Uganda","us":"United States of America","uy":"Uruguay","uz":"Uzbekistan","vc":"Saint Vincent and the Grenadines","ve":"Venezuela","vg":"Virgin Islands, British","vi":"Virgin Islands, U.S.","vn":"Vietnam","vu":"Vanuatu","wf":"Wallis and Futuna","ws":"Samoa","xk":"Kosova","ye":"Yemen","za":"South Africa","zm":"Zambia","zw":"Zimbabwe"},"number":{"currency":{"format":{"delimiter":",","format":"%u %n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"ransack":{"all":"all","and":"and","any":"any","asc":"ascending","attribute":"attribute","combinator":"combinator","condition":"condition","desc":"descending","or":"or","predicate":"predicate","predicates":{"blank":"is blank","cont":"contains","cont_all":"contains all","cont_any":"contains any","does_not_match":"doesn't match","does_not_match_all":"doesn't match all","does_not_match_any":"doesn't match any","end":"ends with","end_all":"ends with all","end_any":"ends with any","eq":"equals","eq_all":"equals all","eq_any":"equals any","false":"is false","gt":"greater than","gt_all":"greater than all","gt_any":"greater than any","gteq":"greater than or equal to","gteq_all":"greater than or equal to all","gteq_any":"greater than or equal to any","in":"in","in_all":"in all","in_any":"in any","lt":"less than","lt_all":"less than all","lt_any":"less than any","lteq":"less than or equal to","lteq_all":"less than or equal to all","lteq_any":"less than or equal to any","matches":"matches","matches_all":"matches all","matches_any":"matches any","not_cont":"doesn't contain","not_cont_all":"doesn't contain all","not_cont_any":"doesn't contain any","not_end":"doesn't end with","not_end_all":"doesn't end with all","not_end_any":"doesn't end with any","not_eq":"not equal to","not_eq_all":"not equal to all","not_eq_any":"not equal to any","not_in":"not in","not_in_all":"not in all","not_in_any":"not in any","not_null":"is not null","not_start":"doesn't start with","not_start_all":"doesn't start with all","not_start_any":"doesn't start with any","null":"is null","present":"is present","start":"starts with","start_all":"starts with all","start_any":"starts with any","true":"is true"},"search":"search","sort":"sort","value":"value"},"simple_form":{"error_notification":{"default_message":"Please review the problems below:"},"no":"No","required":{"mark":"*","text":"required"},"yes":"Yes"},"support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"time":{"am":"am","formats":{"certificate":"%B %d, %Y","certificate_month":"%B","datetime":{"formats":{"default":"%Y-%m-%dT%H:%M:%S%Z"}},"default":"%a %b %d %H:%M:%S %Z %Y","history":"%m/%d/%y","long":"%B %d, %Y %H:%M","medium":"%B %d, %Y","only_second":"%S","post":"%b %d, %Y %l:%M %p","short":"%d %b %H:%M","time":"%H:%M"},"pm":"pm"},"views":{"pagination":{"first":"&laquo; First","last":"Last &raquo;","next":"Next &rsaquo;","previous":"&lsaquo; Prev","truncate":"&hellip;"}}},"es":{"activemodel":{"errors":{"messages":{"email_address_not_routable":"no se puede enviar","invalid_email_address":"no parece ser una dirección válida de correo electrónico"}}},"activerecord":{"attributes":{"student":{"address1":null}},"errors":{"messages":{"accepted":"debe ser aceptado","blank":"no puede estar en blanco","confirmation":"no coincide con la confirmación","email_address_not_routable":"no se puede enviar","empty":"no puede estar vacío","equal_to":"debe ser igual a %{count}","even":"debe ser par","exclusion":"está reservado","greater_than":"debe ser mayor que %{count}","greater_than_or_equal_to":"debe ser mayor que o igual a %{count}","inclusion":"no está incluido en la lista","invalid":"no es válido","invalid_email_address":"no parece ser una dirección válida de correo electrónico","less_than":"debe ser menor que %{count}","less_than_or_equal_to":"debe ser menor que o igual a %{count}","not_a_number":"no es un número","odd":"debe ser impar","record_invalid":"La validación falló: %{errors}","restrict_dependent_destroy":{"many":"No se puede eliminar el registro porque el dependiente %{record} existe","one":"No se puede eliminar el registro porque un dependiente %{record} existe"},"taken":"no está disponible","too_long":"es demasiado largo (%{count} caracteres máximo)","too_short":"es demasiado corto (%{count} caracteres mínimo)","wrong_length":"no tiene la longitud correcta (%{count} caracteres exactos)"},"models":{"course":{"attributes":{"intro":{"one_per_locale":"Sólo puede haber 1 curso de introducción por cada localización"}}},"exam":{"attributes":{"status":{"questions_must_have_valid_answers":"no se puede publicar hasta que todas las preguntas calificables tengan respuestas correctas."}}},"followup":{"attributes":{"can_share_contact":{"inclusion":"El/la estudiante debe dar permiso explícito para compartir información de contacto."},"understands_purpose_of_baptism":{"inclusion":"¿El/la estudiante entiende el propósito del bautismo?"},"wants_in_person_study":{"inclusion":"¿El/la estudiante pidió estudiar la Biblia en persona?"},"wants_introduction_to_church":{"inclusion":"¿El/la estudiante pidió ser introducido/a a una congregación local?"},"wants_to_be_baptized":{"inclusion":"¿El/la estudiante pidió ser bautizado/a?"}}},"message":{"attributes":{"recipients":{"too_short":"Ud. necesita más de un destinatario. Si está usando una lista tal como estudiantes \"escondidos\" o \"activos,\" revise y asegure que actualmente tiene estudiantes escondidos o activos."}}},"share":{"attributes":{"message":{"spam":null}}},"student":{"attributes":{"teacher_id":{"already_adopted":"este/a estudiante ya fue adoptado/a","cannot_adopt":"este/a estudiante no se puede adoptar","not_valid":"debe ser un maestro registrado válido"}}},"user":{"attributes":{"email":{"taken":"ya se usa por alguien. Si ya tiene cuenta, puede <a href=\"/login\">iniciar una nueva sesión aquí</a>."}}}},"template":{"body":"Se encontraron problemas con los siguientes campos:","header":{"one":"No se pudo guardar este/a %{model} porque se encontró 1 error","other":"No se pudo guardar este/a %{model} porque se encontraron %{count} errores"}}}},"app":{"admin":{"account":{"address":"Dirección","city":"Ciudad","email":"correo electrónico","first_name":"Nombre(s)","last_name":"Apellido(s)","mailing_address":"Dirección para correo","nation":"Nación","personal_information":"Información personal","phone":"Teléfono","state":"Estado/provincia/región","update":"Actualizar","your_account":"Su Cuenta","zip":"Código postal"},"account_nav":{"contact_information":"Información de Contacto","contact_preferences":"Preferencias de Contacto","language_preferences":"Preferencias de idioma","reset_password":"Restablecer contraseña","student_notice":"Notificación para Estudiantes"},"assign":{"assign":"Asignar","assign_certificate":"Asignar Certificado","assign_lessons_to":"Asignar lecciones a","complete":"Completado","exam_completed_times":"Este examen ha sido completado <span class=\"label on\">%{number}</span> veces","in_progress":"In Progress","master_series":"Asignar el certificado de la Serie Maestra","not_applicable":"N/A","problem_assigning":"Se encontró un error al tratar de eliminar este examen de la lista de asignaciones. Favor de probarlo más tarde.","problem_reassigning":"Se encontró un error al tratar de reasignar este examen. Favor de probarlo más tarde.","reassign":"Reasignar","reassigned":"Reasignado","unassign":"No asignar"},"assignments":{"certificate":"Certificado","certificate_down":"certificado","email_certificates":"Certificados de correo electrónico","grade":"Calificar examen","removed":"eliminado","review":"Revisar examen","sent":"enviado"},"certificates":{"delete":"Cancelar"},"characteristics":{"age":"Edad","age_baptized_without_water":"Su edad al ser bautizado sin agua","age_immersed":"Su edad al ser bautizado por inmersión","age_sprinkled":"Su edad al ser bautizado por aspersión","age_water_poured":"u edad al ser bautizado por ablución (derramiento)","baptized_without_water":"Fui bautizado sin agua","congregation":"Congregación","congregation_city":"Ciudad en donde se reúne su congregación","congregation_name":"Nombre de la congregación","congregation_state":"Departamento gubernatal (estado/provincial) de la congregación","date_of_birth":"Fecha de nacimiento","do_you_wish_to_explain":"¿Quiere añadir una explicación a lo que ha respondido?","female":"Femenino","gender":"Género","how_close_are_you_to_god":"¿Cómo se siente en su relación con Dios?","i_am_changing":"Estoy cambiando","i_am_far_from_god":"Estoy lejos de Dios","i_am_lost":"Estoy \"perdido\"","i_am_right_with_god":"He sido justificado por Dios","i_am_very_close_to_god":"Me siento íntimo con Dios","i_do_not_know_born_again":"No sé si he sido “renacido”","i_have_already_been_born_again":"Ya he sido “renacido\"","i_have_already_been_saved":"Ya soy \"salvo\"","i_have_received_the_holy_spirit":"He recibido al Espíritu Santo","i_want_to_find_out_about_god":"Quiero saber más sobre Dios","i_was_dipped":"Fui bautizado por inmersión","i_was_lost_but_returned":"Me perdí pero me he vuelto","i_was_poured":"Fui bautizado por ablución (derramiento)","i_was_sprinkled":"Fui bautizado por aspersión","language":"Idioma","male":"Masculino","marital_status":"Estado Civil","my_baptism_was_for":"Fui bautizado por esta razón o este propósito...","occupation":"Ocupación","once_saved_fallen_away":"He caído de gracia aunque antes era \"salvo\"","phone":"Teléfono","referred_by":"Referido por","religion":"Religión","when_how_saved":"¿Cuándo y cómo vino a ser \"salvo\" o \"renacido\"?","years_old":"%{age} años de edad"},"congregation":{"active_students":"Estudiantes activos","congregation_stats":"Estadísticas sobre esta congregación","followups":"Miembros de su congregación han entregado %{count} solicitudes de seguimiento.","member_of":"Según nuestro registro, Ud. es miembro de la congregación %{name} en %{city}, %{state}.","no_congregation_on_record":"Su congregación no está registrada. ¿Podría enviarnos un mensaje y decirnos el nombre de su congregación? <a href=\"mailto:ayuda@escuelabiblicamundial.net\">ayuda@escuelabiblicamundial.net</a>","teachers_at":"Maestros EBM de en línea que son de su congregación","total_nations":"Total de naciones","total_students":"Total de estudiantes","you_are_first":"Ud. es el primer maestro de la EBM de su congregación. ¡Ud. es un pionero! Reclutemos más maestros."},"connect":{"active_student_definition":"Respecto a los estudiantes, \"activo\" quiere decir que han entregado un examen o enviado un mensaje a su maestro.","active_students":"Estudiantes Activos","active_teacher_definition":"Respecto a un maestro, \"activo\" quiere decir que ha adoptado a un estudiante, corregido un examen, o enviado un mensaje a un estudiante.","active_teachers":"Maestros Activos","adopted_students":"Estudiantes Adoptados","campaign_registrations":"Registros de Campañas","campaign_students_taught":"Estudiantes de Campañas que se están enseñando","campaigns":"Campañas","connect_campaign_adoptions":"Adopciones de Campañas Enlace","details":"detalles","download":"Descargar publicidad auxiliar de Enlace <a href=\"//wbsnet-production.s3.amazonaws.com/connect/Connect-Advertising-Collateral_20131002.zip\">aquí</a>. Para editar estos documentos, se necesita Adobe InDesign. O, contáctenos a <a href=\"mailto:connect@worldbibleschool.net\">connect@worldbibleschool.net</a> si le gustaría que nosotros le hagamos cambios menores para Ud.","graphs":"Gráficos","has_no_students_waiting":"%{name} no tiene ningún estudiante esperando.","has_students_waiting":"%{name} tiene %{count} estudiantes esperando","need_help":"¿Necesita ayuda? Contáctenos a <a href=\"mailto:connect@worldbibleschool.net\">connect@worldbibleschool.net</a>.","new_teachers":"Maestros Nuevos","overview":"Resumen","stats_on_last_30_days":"Todas las estadísticas se basan en los últimos 30 días.","stats_on_last_60_days":"Todas las estadísticas se basan en los últimos 60 días.","student_overview":"Resumen del Estudiante","students_taught":"Estudiantes Enseñados","teacher_overview":"Resumen del maestro","teachers":"Maestros","timeline":"Línea de Tiempo","total_students":"Total de Estudiantes","total_teachers":"Total de Maestros","waiting_on_assignment":"esperando una tarea","waiting_on_grade_for":"Esperando por una calificación desde hace %{time}","waiting_students":"Estudiantes que están esperando","wbs_connect":"Enlace EBM","wbs_connect_campaigns":"Campañas de Enlace EBM","wbs_connect_dashboard":"Tablero de Mandos de Enlace EBM"},"followup":{"ago":"hace","attempted_contact":"Intentó establecer contacto","before_you_submit":"Antes de enviar este estudiante","cannot_complete":"No se puede cumplir","completed_request":"Petición cumplida","contact_fup":"Contactar al socio de seguimiento","contact_teacher":"Contactar maestro","followup_partner":"Compañero/a de seguimiento","followup_status":"Estado del Seguimiento","followup_unavailable":"El seguimiento no está disponible en este momento a través de este sitio web en %{nation}. Por favor póngase en contacto con <a href= \"mailto:followup@worldbibleschool.net\">followup@worldbibleschool.net</a> por ayuda con el seguimiento de este estudiante.","has_been_adopted":"%{name} fue adoptado por %{partner}.","if_need_help":"Si Ud. necesita ayuda, puede %{contact_link}.","instructions":"Instrucciones o Apuntes","instructions_for_instructions":"¿Cómo se puede contactar al estudiante? ¿Nos puede dar un número de teléfono? ¿Cuándo desea el/la estudiante estar contactado? ¿Qué preguntas tiene el estudiante que necesitamos contestar en persona? ¿Qué otros detalles relevantes nos puede proporcionar Ud.?","is_waiting":"%{name} espera a ser adoptado por un socio de seguimiento.","label_can_share_contact":"¿%{name} le dio a Ud. permiso a compartir su información de contacto?","label_understands_purpose_of_baptism":"¿Entiende %{name} el propósito del bautismo?","label_wants_in_person_study":"¿Pidió %{name} estudiar la Biblia con alguien en persona?","label_wants_introduction_to_church":"¿Pidió %{name} ser introducido/a a una congregación local?","label_wants_to_be_baptized":"¿Pidió %{name} ser bautizado?","last_updated":"actualizado hace %{time}","made_contact":"Estableció contacto","no":"No","no_action_taken":"No se ha hecho ninguna acción","no_updates_submitted":"No se ha enviado ninguna actualización.","not_updated":"no actualizado","please_note":"Por favor note que el seguimiento no siempre es fácil. Esto es especialmente cierto en países donde es difícil comunicarse o viajar. Por favor prepárese para estar paciente. A veces el seguimiento puede costar semanas.","please_submit_frequently":"Por favor envié actualizaciones de estado frecuentemente. Estas actualizaciones hacen que el maestro se quede involucrado. Si Ud. necesita escribir más detalles, escriba una nota en %{timeline_link}.","request_completed":"La siguiente petición se ha cumplido.","request_in_person":"Pidió estudiar la Biblia en persona","request_introduction_to_church":"¿Pidió ser introducido/a a la Iglesia?","request_pending":"Petición de seguimiento pendiente","requested_baptism":"Pidió ser bautizado/a","send_partner_message":"Enviarle un mensaje a %{partner}","status":"Estado","status_instructions":"Instrucciones del Estado","status_updates":"Actualizaciones de estado","submit_for_followup":"Enviar para seguimiento","submit_request":"Enviar Petición","title":"Petición nueva de seguimiento","understands_baptism_purpose":"Entiende el propósito del bautismo","update_status":"Actualizar estado","yes":"Sí"},"grade":{"comment":"Comentar","comments":"Comentarios","complete":"Marca como completado","confirm_reopen":"Sí, reabrir examen","correct_answer":"Respuesta correcta","did_not_answer":"El estudiante no dio una respuesta a esta pregunta.","exam_graded":"El examen ha sido calificado.","exam_reopened":"%{exam} ha sido reabierto para %{student}.","explanation":"Explicación","finalize":"Finalizar","found_in":"Encontrado en","insert_scripture":"Inserte escritura","left_blank":"El estudiante no dio una respuesta a esta pregunta.","not_ready_for_grade":"Esa tarea se ha reabierto o todavía no ha sido entregado por el estudiante.","not_teacher":" Este examen solamente puede ser corregido por el maestro del estudiante.","overview":"Resumen","reopen":"Reabrir examen","reopen_explanation":"Reabrir el examen para permitir que el estudiante cambie las respuestas ya entregadas.","saved":"guardado","student_answer":"La respuesta del estudiante","submit":"Enviar la calificación","submit_and_assign":"Enviar la calificación y ver las asignaturas","sure_reopen":"¿Está Ud. seguro/a que quiere reabrir este examen? Cuando el examen se reabre, Ud. no va a poder repasarlo ni corregirlo hasta que el/la estudiante lo entregue de nuevo.","your_comments_for":"Últimos comentarios para %{name}"},"history":{"history_for":"Historial de"},"hub":{"add_student":"Invitar a un estudiante a estudiar","add_teacher":"Invitar a un amigo a ser maestro","all_caught_up":"¡Felicidades! Ud. está al día con sus estudiantes.","contact_instructions":"Los siguientes estudiantes no han recibido un mensaje durante los últimos 30 días. Considere poniéndose en contacto con ellos.","edit_notice":"Editar esta notificación","find_help":"Ver videos instructivos y consejos útiles en las páginas de <a href=\"%{help_url}\">ayuda</a>, o envíenos un mensaje en la dirección <a href=\"mailto:ayuda@escuelabiblicamundial.net\">ayuda@escuelabiblicamundial.net</a>.","followup_students_waiting":"Estudiantes de seguimiento esperando","help":"Obtener ayuda","more_tips":"¿No puede encontrar algo? Mira la sección de ayuda para encontrar muchos más consejos.","no_student_to_contact":"Ud. no tiene ningunos estudiantes de web que no ha contactado recientemente. Cuando tenga uno, se lo mostráramos aquí.","no_suggestions":"Ha completado todos los consejos que le ofrecemos en este momento.","no_web_students":"Usted no tiene ningún estudiante todavía. Use la <a href=\"%{board_url}\">Panel de Estudiantes </a> para adoptar a su primer estudiante. O, utilice el enlace <a href=\"%{link}\">Añadir a un estudiante</a> en la página Mis Estudiantes para añadir a un estudiante que Ud. ya conoce.","notice":"Notificación a sus estudiantes","read_more_news":"Leer más noticias","recent_news":"Noticias Recientes","students_to_contact":"Estudiantes a contactar","students_waiting":"Estudiantes esperando","suggestion_more_info":"más información","suggestions":"Consejos","the_hub":"El Centro"},"mailbox":{"and_more":"y más","answered":"%{name} respondió","archive":"Archivar","archived":"Archivados","archived_messages":"Mensajes archivados","autocomplete_hint":"Introduzca el nombre o número de identificación de un estudiante.","autocomplete_no_results":"No se encuentra ningún resultado.","compose_message":"Escribir mensaje","from":"De","from_me":"de mí","inbox":"Bandeja de entrada","message":"Mensaje","message_about_question":"Este mensaje tiene que ver con una pregunta de %{name}. <a href=\"%{link}\">Aquí</a> se puede ver el examen completado y calificado.","message_archived":"Ese mensaje ha sido archivado.","message_delivered":"Su mensaje ha sido entregado.","message_restored":"Ese mensaje ha sido restaurada.","messages_to":"Mensajes entre usted y %{name}","messages_with":"Mensajes con","name_to_name":"a","need_teacher_before_reply":"Ud. necesita un maestro nuevo antes de que pueda responder a los comentarios. Por favor póngase en contacto con nosotros para continuar.","next_page":"Siguiente","no_messages_to_display":"No hay mensajes para mostrar","no_subject":"Sin tema","previous_page":"Previo","read":"Leer","recently_viewed":"Recién visto","reply":"Responder","responding_to_exam":"Usted está enviando un mensaje en respuesta a una pregunta en el examen %{name}.","restore":"Restaurar","send_message":"Enviar mensaje","send_to_teacher":"Este mensaje se enviará a su maestro, %{name}.","sent":"Enviados","sent_messages":"Mensajes enviados","show_more":"mostrar más","student_teacher_left":"%{name} dejó este comentario:","subject":"Tema","teacher_left":"Su maestro dejó este comentario:","to":"A","to_me":"a mí","unread":"No leídos","unread_messages":"Mensajes por leer","you_dont_have_students":"Usted no tiene ningún estudiante que estudia por medio de este sitio web. Si tiene estudiantes en línea (no de correo electrónico o postal), puede enviarles mensajes aquí."},"nav":{"account":"Cuenta","administration":"Administración","congregation":"Congregación","course_preview":"Vista preliminar a los cursos","courses":"Cursos","dashboard":"Panel de Control","help":"Ayuda","home":"Inicio","logout":"Cerrar sesión","mailbox":"Correo","news":"Noticias","next_up":"Siguiente","progress":"Progreso","student_board":"Panel","students":"Estudiantes","the_hub":"El Centro","wbs_connect":"Enlace EBM"},"news":{"by":"de","news":"Noticias de la EBM","next_article":"Próximo artículo","previous_article":"Artículo anterior","written":"Escrito el"},"preferences":{"contact_preferences":"Preferencias de Contacto","languages":"Idiomas","notification_connect_stats":"Quisiera recibir informes por correo electrónico con estadísticas del Enlace EBM u otras campañas a las cuales estoy conectado.","notification_followup_request_in_nation":"Me gustaría recibir notificaciones por correo electrónico cuando haya un estudiante nuevo de seguimiento de mi país.","notification_new_connect_student":"Yo quisiera recibir mensajes electrónicos cuando estudiantes nuevos de Enlace EBM están listos para un maestro.","notifications_general":"Me gustaría recibir notificaciones misceláneas, actualizaciones u ofertas de la \"EBM\".","notify_new_mini_campaign_student":"Quisiera recibir notificaciones por correo electrónico cuando haya nuevos estudiantes de la campaña que apoyo.","student_waiting_reminder":"Me gustaría recibir notificación cuando un estudiante me espere.","submit":"Guardar","updated":"Sus preferencias han sido actualizadas.","yes_for_email_lesson":"Me gustaría recibir nuevas lecciones por correo electrónico.","yes_for_exams_completed_notifications":"Me gustaría recibir notificaciones al correo cuando estudiantes han terminado un examen.","yes_for_exams_graded_notifications":"Me gustaría recibir notificaciones por correo electrónico cuando se han calificado mis exámenes.","yes_for_messages_notifications":"Quiero recibir notificaciones por correo electrónico cuando mi ayudante de estudios me envíe un mensaje.","yes_for_messages_notificiations_from_students":"Me gustaría recibir notificaciones al correo para mensajes de las estudiantes.","yes_for_new_article_notifications":"Me gustaría recibir notificaciones a través de correo electrónico cuando haya nuevos artículos en El Centro.","yes_for_reminders_from_wbs":"Quiero que la EBM me recuerde cuando yo tenga tareas incompletas.","yes_for_teach_english":"Me gustaría enseñar a estudiantes que hablan inglés.","yes_for_teach_portuguese":"Me gustaría enseñar a estudiantes que hablan português.","yes_for_teach_spanish":"Me gustaría enseñar a estudiantes que hablan español."},"preview":{"all_courses":"Todos los cursos","preview_exam":"Prever el examen"},"profile_picture":{"crop":"Recortar","drag_and_drop":"Arrastre y suelte una foto aquí o haga clic aquí para seleccionar una foto.","profile_picture":"Foto de perfil","sending":"enviando","tip_1":"Sonría. Si Ud. no sonríe, los mensajes que envía a sus estudiantes dan la impresión de que Ud. es gruñón o muy serio.","tip_2":"Use una foto bien iluminada. No use una oscura y borrosa.","tip_3":"Use una foto de Ud. mismo (no la de un equipo deportivo, un pariente, un objeto querido, etc.)","tips_headline":"Consejos de fotos de perfil"},"reset_password":{"change_your_password":"Cambiar su contraseña","confirm_password":"Confirmar su contraseña","current_password":"Contraseña actual","error_confirm":"Favor de confirmar su contraseña.","error_match":"La confirmación no fue igual que la contraseña.","new_password":"Nueva contraseña","password_changed":"Su contraseña se ha cambiado.","submit":"Guardar"},"review":{"completed_on":"Este examen fue completado en %{date}.","correct_answer":"Respuesta correcta","explanation":"Explicación","finished_reviewing":"Terminar repaso","graded_on":"Este examen fue calificado en %{date}.","not_been_graded":"That exam has not been graded yet.","not_your_student":"That student is no longer your student.","overview":"Vista general","question_not_answered":"Esta pregunta no fue contestada.","reply_to_comment":"Responder a este comentario","review":"Repasar","said":"dijo","show_less":"Mostrar menos","show_more":"Ver más","teacher_comments":"Comentarios del maestro","your_answer":"Su Respuesta","your_study_helper_said":"Tu ayudante de estudios dijo"},"student":{"after_complete":"Después de que complete su primer examen, su maestro lo calificará.","assignments":"Asignaturas","assignments_for_review":"Tareas a revisar","being_saved":"Su examen se va a guardar.","certificates":"Certificados","change_answer":"Mudar respuesta","close":"Cerrar","complete_request":"Cumpla un curso y pídale al maestro un certificado.","complete_to_earn":"Complete este curso para obtener este certificado.","completed_under_50":"Has completado el examen! Sin embargo, su calificación fue inferior al 50%. Por favor, revise la lección y vuelva a intentarlo.","completed_under_70":"Has completado el examen! Sin embargo, su calificación fue inferior al 70%. Por favor, revise la lección y vuelva a intentarlo.","congratulations":"¡Felicitaciones!","continue":"Continuar","day":"Día","do_you_need_help":"¿Necesitas ayuda con esta pregunta? ¿No estás seguro de cómo responder? Usa este espacio para preguntar a tu ayudante de estudios sobre esta pregunta.","download":"Descargar","download_certificate":"Descargar Certificado","earn_master_series":"Complete todos los cursos para recibir el certificado de la Serie Maestra.","email":"Correo electrónico","exam_saved":"Su examen se ha guardado.","false":"false","fb_share":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=%{thumbnail}&name=La%20Biblia&caption=Estudiar%20la%20Biblia%20con%20nosotros%20&description=Estoy%20estudiando%20la%20Biblia%20con%20la%20Escuela%20Bíblica%20Mundial.%20¡Debes%20hacerlo%20también!%20http%3A%2F%2Fwbs.cc%2FwJoY&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","fb_share_exam":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=http:%{thumbnail}&name=%{name}&caption=%{message}&description=Use%20este%20enlace%20para%20prever%20la%20lección.%20http://www.escuelabiblicamundial.org/es/vista_preliminar/%{course}/%{exam}&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","fb_share_wisdom":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=%{thumbnail}&name=%{name}&caption=%{message}&description=%{url}&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","finished_exam_share_message":"Acabo de terminar la lección bíblica \"%{name}\" de la Escuela Bíblica Mundial.","first_you_said":"En primer lugar, Ud. ha dicho","get_started":"Comenzar","graded":"Calificado hace %{time}","graded_exams":"Exámenes calificados","grader_commented_here":"%{name} comentó aqui","have_already_invited":"Ya has invitado a este amigo.","he_said":"%{name} dijo","hide_lesson":"Esconder la lección","master_series":"Serie Maestra","master_series_congratulations":"Descargue el certificado de la Serie Maestra.","master_series_info":"La Serie Maestra es el nombre dado a la combinación de los cursos de la Escuela Bíblica Mundial disponibles en línea. Se puede asignar el certificado para la Serie Maestra cuando su estudiante ha completado todos los cursos de la EBM en línea","message":"Mensaje","message_sent":"Su mensaje ha sido enviado. Gracias por difundir la palabra!","messages":"Mensajes","month":"Mes","next_assignments":"Siguientes tareas","next_section":"Siguiente sección","next_up":"Siguiente","no_graded":"No tiene examen calificado","not_yet_assigned":"Esta lección aún no le ha sido asignado.","notice_from_teacher":"Aviso de su ayudante de estudio.","preview_exam_share_message":"La Escuela Bíblica Mundial tiene herramientas gratis de en línea para estudiar la Biblia. Revise la lección \"%{name}\"","progress":"Progreso","read_lesson":"Leer la lección","recent_teacher_comments":"Comentarios recientemente del maestro","review":"Repasar","review_exam":"Repasar el examen","save":"Guardar","save_and_submit":"Enviar","saved":"guardado","send":"Enviar","send_a_message":"Enviar mensaje al maestro","send_a_message_to_wbs":"Obter ajuda de EBM","share":"Compartir este sitio","share_again":"Comparte nuevo","share_with_another":"Comparta este sitio con otro amigo","share_with_friend":"Compartir este sitio con un amigo/a","show_lesson":"Mostrar la lección","submit_answers":"Entregar estas respuestas","submit_assignment":"Entregar tarea","submit_notice":"Ha cumplido su exámen. Su maestro calificará su examen y se lo devolverá a usted pronto.","submit_whole_exam":"Entregar y completar examen","submitted":"Entregado","take_exam":"Tomar el examen","teacher_commented_here":"Su maestro comentó aqui","thanks_for_sharing":"Gracias por compartir!","then_commenter_said":"Entonces dijo %{name}","then_study_helper_said":"Entonces tu ayudante de estudios dijo","true":"true","try_again":"Intentar de nuevo","twitter_share":"https://twitter.com/intent/tweet?text=Estoy%20estudiando%20la%20Biblia%20con%20la%20Escuela%20Bíblica%20Mundial.%20¡Debes%20hacerlo%20también!&tw_p=tweetbutton&url=http%3A%2F%2Fwbs.cc%2FU4KK","twitter_share_exam":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=%{message}&tw_p=tweetbutton&url=http%3A%2F%2Fwww.worldbibleschool.org%2Fpreview%2F%{course}%2F%{exam}","twitter_share_wisdom":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=%{message}&tw_p=tweetbutton&url=%{url}","view_comments":"%{count} comentarios del maestro","view_recent_grades":"Ver Notas Recientemente Agregadass","what_is_next":"¿Qué sigue?","working_on_match":"Estamos trabajando en este momento para emparejar a Ud. con un maestro. El promedio actual de tiempo de espera es alrededor de %{time}. Mientras Ud. está esperando, debería compartir este sitio con sus amigos.","year":"Año","you_have_completed":"Ha cumplido sus exámenes.","you_have_completed_all":"Ha cumplido todos los cursos de la EBM.","you_said":"Ud. ha dicho","you_should_study":"Estoy estudiando la Biblia con la Escuela Bíblica Mundial. ¡Debes hacerlo también!","your_friends_email":"la dirección electrónica de su amigo/a","your_study_helper":"Ayudante","your_teacher_will_grade":"Su maestro calificará su examen y se lo devolverá a usted pronto."},"student_board":{"adopt":"Adoptar estudiante de %{mode}","adopt_followup":"Solicitud para adoptar","adopt_without_mode":"Adoptar","all_set":"Estás al día","are_you_sure_bypass_connect":"Esta Ud. seguro de que quiere enviar a este estudiante al panel de estudiantes general? Este cambio será permanente.","are_you_sure_email_student":"Éste es un estudiante de correo electrónico. Ud. tendrá comunicación con este estudiante a través de correo electrónico, corregirá las lecciones manualmente, y llevará registro manualmente. ¿Está Ud. seguro de que quiere adoptar a este estudiante de correo electrónico?","are_you_sure_postal_student":"ATENCIÓN: Este es un estudiante postal. Ud. debe tener lecciones impresas compradas de la EBM, listas para enviar, antes de adoptar a este estudiante. ¿Está EQUIPADO para enviar materiales impresos INMEDIATAMENTE? Para más información, vea la página de ayuda sobre la Enseñanza Postal.","are_you_sure_web_student":"¿Está seguro de querer adoptar a este estudiante web?","campaign":"Campaña","campaigns":"Campañas","confirm_adopt":"Sí, adoptar a este estudiante","connect":"Conectar","filter":"Filtrar","filter_all":"todos","filter_all_explanation":"Mostrar todos los estudiantes sin considerar su medio de estudio.","filter_email":"correo electrónico","filter_email_explanation":"Mostrar solamente estudiantes que estudian a través de correo electrónico.","filter_followup":"followup students","filter_followup_explanation":"Mostrar solamente pedidas de seguimiento.","filter_postal":"postal","filter_postal_explanation":"Mostrar solamente estudiantes que estudian a través del correo.","filter_show":"Mostrar","filter_students":"estudiantes","filter_web":"en línea","filter_web_explanation":"Mostrar solamente estudiantes que estudian a través del sitio web.","general_campaign":"general publicidad de EBM","lessons_completed":"Lecciones completado","mode_all":"todos los medios","mode_email":"por correo electrónico","mode_postal":"por correspondencia","mode_web":"en línea","name":"Nombre","no_students_available":"No hay estudiantes disponibles para adoptar en este momento. Vuelva pronto para más estudiantes.","problem_adopting_student":"Hubo un problema al adoptar a este estudiante. Intente más tarde o contáctenos a web@escuelabiblicamundial.net.","problem_adopting_student_please":"Hubo un problema al adoptar a este estudiante. Por favor, intente de nuevo más tarde.","problem_bypass_connect":"Ocurrió un problema al mover este estudiante al panel de estudiantes general.","request_in_person":"Pidió estudiar la Biblia en persona","request_introduction_to_church":"¿Pidió ser introducido/a a la Iglesia?","requested_baptism":"Pidió ser bautizado","return":"Devolver","return_student":"Vuelva este estudiante al panel","send_to_board":"Envía al Panel","showing":"Mostrando <strong class=\"showing-mode\">todos</strong> los estudiantes de <strong>%{campaign}</strong>","showing_blurb":"Mostrando <strong class=\"available-count\"></strong> estudiantes que quieren aprender a través de <strong class=\"showing-mode\"></strong>.","showing_blurb_default":"Mostrando <strong class=\"available-count\">%{count}</strong> estudiantes.","showing_blurb_followup":"Mostrando <strong class=\"available-count\"></strong> estudiantes que esperan por ayuda con sequimiento.","student_adopted":"¡Ups! Ese estudiante ya fue adoptado por otro maestro. Le quitamos a ese estudiante del Panel de Estudiantes.","student_board":"Panel de estudiantes","student_detail":"Detalles de los estudiantes","students_available_to_all_teachers":"Estudiantes disponibles a cualquier maestro","students_on_connect_page":"Los estudiantes en esta página están disponibles a usted porque usted es miembro del grupo de la Escuela Bíblica Mundial.","the_way":"El Camino","understands_baptism_purpose":"Entiende el propósito del bautismo","unknown":"desconocido","view_all":"Ver todos","waiting":"esperando","waiting_divider":"Ha estado esperando %{time}","waiting_divider_less":"Ha estado esperando por menos de %{time}","wbs":"EBM","would_you_like_connect":"¿A su congregación le gustaría iniciar una campaña específica con la EBM para reclutar y enseñar a estudiantes en su comunidad o en una región donde apoyan obras misioneras? Aprenda más sobre el programa <a href=\"http://www.worldbibleschool.net/wbs-connect\">WBS Connect aquí</a>.","you_have_more_than_five_waiting":"Ud. tiene más de %{count} estudiantes esperando a que corrija un examen o asigne uno nuevo. Por favor póngales al día estos estudiantes primero, y regrese después para adoptar más estudiantes.","you_have_more_than_limit_postal":"Usted ha adoptado a %{count} estudiantes postales en las últimas 24 horas. Por favor, espere un día e intente otra vez.","you_have_more_than_limit_web":"Ud. ha adoptado a %{count} estudiantes web en los últimos 24 horas. Por favor, espere un día e intente otra vez.","your_recently_adopted":"Sus estudiantes recién adoptados","your_session_has_expired":"Su sesión ha caducado. Por favor, cierre de sesión, a continuación, vuelva a conectarse."},"student_notice":{"explanation":"Mientras esté activa, esta notificación se muestra a sus estudiantes cuando entran en sus cuantas en la página web.","followup":"Seguimiento","notice":"Notificación","off":"Desactivado","on":"Activado","student_notice":"Notificación para Estudiantes","update":"Actualizar"},"students":{"a_to_z":"A-Z (apellido)","add_student":"Agregar estudiante","address":"Dirección","all":"Todos","all_students":"Todos estudiantes","assign_lessons_to":"Asignar lecciones a %{name}","assign_to_me":"Yo","assign_to_someone_else":"Alguien más","assign_to_teacher":"Maestro","assignments":"Asignaturas","by_id":"Por ID","by_last_communication":"Por fecha de comunicación","city":"Ciudad","close":"Cerrar","confirm_email":"Confirmar correo electrónico","confirm_password":"Confirmar contraseña","deliver_information":"Información para recibir las lecciones","download_email_courses":"Descargar los cursos","email":"Correo electrónico","email_download_url":"https://worldbibleschool-production.s3.amazonaws.com/Escuela-Biblica-Mundial.zip","email_is_already_taken":"El correo ya está siendo utilizado. Favor de contactarnos a través de web@worldbibleschool.net si necesita ayuda buscando este estudiante.","email_taken":"El correo ya está siendo utilizado.","export_to_csv":"Exportar a CSV","family_name":"Apellido(s)","female":"Femenina","filter":"Filtrar","following_exam_needs_grading":"El siguiente examen necesita ser calificado","followup":"Seguimiento","grade":"Calificar","grade_exam":"Calificar %{name}","has_been_added":"se ha registrado","has_been_registered":"ha sido registrado.","help_email_taken":"El correo ya está siendo utilizado. Contactar <a href=\\\"mailto:web@worldbibleschool.net\\\">web@worldbibleschool.net</a> si usted necesita ayuda para encontrar a este estudiante.","hidden_students":"Ocultos","hide":"Ocultar","hide_this_student":"Ocultar esta estudiante","language":"Idioma","last_communication":"Última comunicación","male":"Masculino","my_hidden_students":"estudiantes ocultados","name_for_certificate":"Nombre para el certificado","nation":"Nación","needs_update":"necesita ser actualizado","no_students_yet":"You do not have any students yet. We should fix that. Click the Board link to view students who are ready for a teacher.","note_student_sent_email":"A %{name} se le envió un correo con su información de inicio de sesión. Se le asignó automáticamente \"El Camino\" a este estudiante.","options":"Opciones","overview":"Resumen","password":"Contraseña","personal_information":"Información personal","personal_name":"Nombre(s)","postal_students":"Estudiantes por correspondencia","preferences":"Preferencias","problem_hiding":"Se encontró un error al tratar de ocultar a este estudiante. Favor de probarlo más tarde.","problem_unhiding":"Se encontró un error al tratar de poner a la vista a este estudiante. Favor de probarlo más tarde.","register_a_new_student":"Registrar a un estudiante nuevo","register_another":"Registrarse otro estudiante","required":"Requerido","search":"Buscar sus estudiantes","see_students_waiting":"Esperándome","send_message":"Enviar Mensaje","show_all_students":"Ver todos los estudiantes","showing":"Mostrando <strong class=\"available-mystudents-count\">%{count}</strong> estudiantes.","sort":"Ordenando","sort_by_id":"ID (el más reciente primero)","sort_by_last_comm":"fecha de comunicación","state":"Estado","student_detail":"Student Detail","student_details":"Student Details","student_is_email":"%{name} estudia por correo electrónico. Ud. puede descargar los cursos más recientes de correo electrónico <a href=\"%{link}\">aquí</a>. Ud. no puede asignar lecciones desde esta página. Sin embargo, sí puede asignar certificados.","student_is_postal":"%{name} estudia por correo. Ud. no puede asignar lecciones ni certificados desde esta página.","student_navigation":"Navegación estudiantil","students":"Estudiantes","study_mode":"Manera de estudio","study_mode_email":"Por correo electrónico","study_mode_postal":"Por correspondencia","study_mode_web":"En línea","studying_through_email":"%{name} está estudiando a través de correo electrónico.","studying_through_postal":"%{name} está estudiando a través del correo postal.","studying_through_web":"%{name} está estudiando a través del sitio web.","submit":"Guardar","timeline":"Línea del Tiempo","unhide":"Mostrar","unhide_this_student":"Mostrar esta estudiante","update":"Actualizar","view_history":"Ver Historial","view_visible_students":"Ver estudiantes visibles","visible_students":"Estudiantes visibles","waiting":"Esperando","waiting_on_assignment":"Esperando una tarea","your_hidden_students":"Sus estudiantes ocultos","zip":"Código postal"},"timeline":{"last_activity":"Actividad más reciente","last_login":"Entrada más reciente","logged_in_na":"n/a","note_created":"Se creó su nota.","recent_activity":"Actividad reciente","statistics":"Estadísticas","submit":"Guardar Apuntes","timeline_for":"Línea del Tiempo de"},"user":{"access_error":"Ese estudiante no es su estudiante y Ud. no puede cambiar su información.","additional_student_information":"Información adicional de estudiante","address_1":"Dirección 1","address_2":"Dirección 2","address_3":"Dirección 3","administrator":"administrador","all_assigned":"Todos los certificados disponibles ya se le han otorgado a este estudiante.","all_certificates_granted":"Todos los certificados disponibles ya se le han otorgado a este estudiante.","assignments":"Asignaturas","block_quote":"Bloquear cita","bold":"fuerte","certificates":"Certificados","city":"Ciudad","course":"Curso","decrease_indent":"Disminuir el guión","email":"por correo electrónico","graduated":"Graduado","graduated_no":"No","graduated_yes":"Sí","increase_indent":"Aumentar guión","insert_edit_link":"Introducir/modificar enlace","insert_remove_bulleted_list":"Introducir/modificar lista con viñetas","insert_remove_numbered_list":"Introducir/modificar lista numerada","italic":"itálico","language":"Lengua","mode_of_study":"Manera de estudiar","nation":"nación","new_certificate":"Certificado nuevo","no_certificates":"Este estudiante aún no ha sido asignado un certificado.","notes":"Apuntes","notes_update":"Sus apuntes han sido actualizados.","pending":"pendiente","personal_information":"Información Personal","postal":"por correspondencia","postal_location_information":"Ubicación del usuario","problem_assigning":"Se encontró un error al tratar de hacer la asignación. Favor de recargar esta página y tratarlo de nuevo.","profile_information":"Información de perfil","send_an_email_to_teacher":"Enviar correo electrónico al maestro","send_message":"Enviar Mensaje","state":"Estado","strikethrough":"tachado","student":"estudiante","student_name":"Nombre de estudiante","student_updated":"El estudiante han sido actualizados.","submit":"Entregar","teacher":"Maestro","timeline":"Línea del Tiempo","underline":"subrayar","user_type":"Tipo de usuario","view_address":"Ver dirección","view_all":"Ver todos","web":"en línea","zip":"Estado/provincia/región"}},"assignment_reopened":{"assignment":"Assignment","review":"Review your assignment","subject":"%{name} has been reopened","title":"Your teacher reopened an assignment for you."},"change_to_web":{"change_to_web":"Cambiar a Internet","change_your_password":"Crear una contraseña nueva para tu cuenta para empezar a estudiar a través del sitio web.","create_my_password":"Crear mi contraseña","description":"%{name} (%{id}) ha cambiado su medio de estudio a Internet. ¿Cómo quiere seguir?","explain_password":"Primero, cree una contraseña nueva. Ud. usará esta contraseña para iniciar sesión en la página web en el futuro.","has_been_returned":"%{name} se ha regresado al Panel de Estudiantes.","return_to_board":"Regresar el estudiante al panel","share_with_coworker":"Compartir el estudiante con un compañero","short_description":"Cambiar a estudiar por Internet","study_through_this_site":"<p class='mbf'>Para cambiar esto, haga clic a continuación</p><a href='/change_to_web/%{confirmation}'class='button info tiny'>Me gustaría a cambio estudiar por la página web*</a><br/><p class='small'><em>*Por favor tome en cuenta que algunos cursos no están disponibles a través de la página web.</em></p>","subject":"Un estudiante de la EBM Hizo el Cambio a Estudiar por Internet","teach_student":"Enseñar el estudiante en el sitio web","thank_you_for_continuing":"¡Muy bien! Gracias por seguir con %{name}.","thanks":"Ahora usted es estudiante web. Gracious.","update":"Actualizar"},"check_email":{"check_your_email":"Revisar su correo electrónico","next_step":"Gracias por inscribirse. El próximo paso es buscar un mensaje electrónico de la Escuela Bíblica Mundial. Dentro de ese mensaje, haga clic en el vínculo para “Confirmar su dirección electrónica” para recibir lecciones por correo electrónico."},"confirmation":{"after_confirm":"Después de recibir su confirmación, la Escuela Bíblica Mundial le dará su dirección electrónica a un maestro de la EBM. Recibirá lecciones por correo electrónico desde este maestro.","change_email":"Confirmar dirección electrónica","change_to_web":"Muchos estudiantes eligen estudiar por medio de nnuestro sitio web. El estudio por medio del sitio web mantiene la seguridad de su dirección electrónica y guarda sus lecciones e información en un sólo lugar. Normalmente es más fácil que estudiar por correo electrónico. Si le gustaría estudiar por el sitio web en vez del correo electrónico, haga <a href=\"%{link}\">clic aquí</a>.","please_confirm":"Favor de confirmar su dirección electrónica","subject":"Escuela Bíblica Mundial - Confirmar su Dirección Electrónica","to_confirm":"Para confirmar su dirección electrónica y acceder su primera lección de la Escuela Bíblica Mundial, haga clic en el vínculo abajo:"},"connect_statistics":{"active_teachers":"Maestros Activos","followup_requests":"Solicitudes para Seguimiento","new_teachers":"Nuevos Maestros","students_active":"Estudiantes Activos","students_registered":"Estudiantes Inscritos","subject":"Actualizaciones a Enlace EBM","this_is_web_ads":"Ésta es una campaña de la EBM de Publicidad Web.","title":"Actualizaciones a Enlace en %{month}","trend":"Tendencia","url_is":"La URL de esta campaña es <strong>%{subdomain}.%{domain}</strong>"},"contact":{"contact_us":"Contáctenos","eager_to_hear":"Queremos recibir sus preguntas o comentarios.","email":"Correo electrónico","message":"Mensaje","name":"Nombre(s)","problem":"There was a problem sending your message. Please try again.","send":"Enviar","subject":"Escuela Bíblica Mundial Contacto","thank_you":"¡Gracias!","thank_you_for_contacting":"Gracias por comunicarse con nosotros. Hemos recibido su mensaje y responderemos pronto, usualmente dentro de 48 horas.","title":"Escuela Bíblica Mundial"},"credit_card":{"card_number":"Número de tarjeta","credit_card_info":"Información de la Tarjeta de Crédito","cvc":"Número de verificación","delete_this_card":"Borrar esta tarjeta","enter_new_card":"Registrar otra tarjeta","expiration":"Expiración (MM/AA)","no_card":"No se encuentra su tarjeta de crédito en nuestros archivos. La próxima vez que Ud. use una tarjeta de crédito para dar una donación en este sitio, la información de su tarjeta será guardada seguramente.","submit_new_card":"Registra tarjeta nueva","updated_successfully":"Su tarjeta fue actualizada exitosamente.","will_be_used":"Nota: La tarjeta de abajo se usará para futuras donaciones que se lleven a cabo en este sitio web."},"exam_finished":{"exam":"Examen","grade":"Calificar el examen","has_finished":"%{name} ha cumplido un examen y está esperando su calificación.","subject":"%{name} ha cumplido un examen","title":"%{name} ha cumplido un examen"},"exam_graded":{"exam":"Examen","review":"Repasar sus respuestas en el examen","subject":"%{name} ha sido calificado","title":"Su maestro ha terminado la calificación de su examen."},"followup_adopted":{"explanation":"%{partner} adoptó a %{student}. %{partner_first} anotará el progreso. Ud. puede ver esas notas en la página de la línea del tiempo de este/esta estudiante. También puede enviar mensajes a %{partner_first} a través del sitio de la EBM.","subject":"Su solicitud para seguimiento fue adoptada","title":"%{name} fue adoptado/a.","view_timeline":"Ver la línea del tiempo"},"followup_for_nation":{"explanation":"Un(a) estudiante llamado/a %{student} está esperando seguimiento.","subject":"Un estudiante nuevo está esperando.","title":"Un(a) nuevo/a estudiante de seguimiento de %{nation} está esperando.","view_student_board":"Ver Panel de Estudiantes"},"followup_left_note":{"explanation":"%{partner} escribió un apunte sobre %{student}.","subject":"%{name} escribió un apunte sobre su estudiante","title":"%{name} escribió un apunte.","view_timeline":"Ver la Línea del Tiempo"},"followup_status_update":{"explanation":"El estado de la petición para seguimiento de %{name} se ha actualizado a \"%{status}\".","subject":"%{name} actualizó el estado del seguimiento","title":"%{name} actualizó el estado.","view_timeline":"Ver la Línea del Tiempo"},"giving":{"amount":"Importe","can_study_by":"Estos estudiantes pueden estudiar a través de…","card":"Tarjeta","card_number":"Número de tarjeta","card_preferences":"Preferencias de Tarjeta","cvc":"Número de verificación","date":"Fecha","description":"Descripción","donation":"Donación","expiration_date":"Fecha de vencimiento","expires":"Expira","give_summary":"Sí, quiero dar $%{amount} para encontrar %{price_per} estudiantes en %{location}.","help_us_find":"Ayudarnos a encontrar más estudiantes en %{location}.","help_us_find_count":"Eso nos ayudará a encontrar %{price_per} buscadores en %{location}.","is_this_secure":"¿Es seguro?","next":"Siguiente","no":"No","now_good_time":"¿Es buena hora dar?","only_cards_charged_here":"Nota: Sólo los regalos dados a través de este sitio web se ven aquí. Cualquier donación dada fuera de línea o a través de escuelabiblicamundial.net no se ven.","postal_only":"Sólo correo","previous":"Anterior","submit_donation":"Entragar su donación","thank_you_for_gift":"Gracias por su generoso regalo.","we_emailed_you_record":"Hemos enviado a usted un recibo de su regalo por correo electrónico.","we_will_be_charging":"Cobraremos esta tarjeta. Si quisiera cambiar sus preferencias en cuanto a su tarjeta, por favor vea su %{card_link}.","web_only":"Sólo Internet","web_or_postal":"Internet o Correo","would_you_like_to_teach":"¿Quisiera enseñar a estos estudiantes?","yes":"Sí"},"login":{"check_your_email":"Revise su correo electrónico para recibir ayuda.","could_not_find_account":"No encontramos esa combinación de dirección y contraseña.","email":"Correo electrónico","login":"Iniciar sesión","lost_password":"Olvidé mi contraseña","or":"o","password":"Contraseña","problem_with_login":"Hubo un problema con su cuenta.","register":"Inscribirse","remember_me":"Mantener la sesión iniciada","submit":"Iniciar"},"lost_password":{"address_not_found":"La dirección electrónica no se puede encontrar. ¿Le gustaría entrar usando otra dirección? ¿O le gustaría <a href=\"/registro\">registrarse</a>?","instructions":"Escriba su dirección electrónica. Le enviaremos un vínculo que puede usar para cambiar su contraseña.","invalid_email":"Por favor, escriba una dirección electrónica que es válida.","link_sent":"El enlace para restablecer su contraseña se le ha enviado a la dirección %{email}. Favor de revisar su correo.","lost_password":"¿No tiene su contraseña?","not_for_web":"Su cuenta no fue creada con una contraseña para entrar en el sitio web. Si le gustaría estudiar por medio del sitio web, favor de contactarnos en <a href=\"mailto:support@escuelabiblicamundial.net\">support@escuelabiblicamundial.net</a>."},"mini_campaign_statistics":{"followup_requests":"Solicitudes de Seguimiento","students_active":"Estudiantes Activos","students_registered":"Estudiantes Inscritos","subject":"Actualizaciones a la Campaña EBM","title":"Actualizaciones a la Campaña en %{month}","trend":"Tendencia"},"nav":{"contact":"Contáctenos","faqs":"Preguntas frecuentes","home":"Inicio","login":"Iniciar sesión","menu":"Menú","preview":"Vista preliminar","register":"Inscribirse","title":"Escuela Bíblica Mundial","tour":"Recorrido"},"new_article":{"explanation":"Este artículo viene de El Centro del sitio Web de EBM.","read_more":"Leer más","subject":"Nuevo artículo de EBM"},"new_certificate":{"congratulations":"¡Felicitaciones!","subject":"Te has ganado un certificado de EBM","title":"¡Ha recibido un certificado nuevo!","you_have_earned":"Usted ha ganado un certificado por cumplir el curso %{name}. Su certificado se encuentra adjunto."},"new_lesson":{"enter_answers":"Entrega respuestas","enter_through_website":"Enviar su respuesta para esta pregunta a través del sitio web.","forward_to_friend":"Comparte esta lección con un amigo. Inscribese para estudios bíblicos gratis en %{link}.","subject":"Nueva lección de la EBM: %{name}"},"new_message":{"reply":"Responde","sent_message":"%{name} le envió un mensaje","subject":"%{name} le envió un mensaje","title":"Ha recibido un mensaje en EBM"},"notifier":{"call_to_action":"Clic este botón aquí","call_to_action_image":"click-button-es.jpg","contact_teacher":"Si te gustaría contactar a tu maestro, puedes lograrlo por medio de su buzón en el sitio web.","do_not_respond":"Por favor no respondas a este mensaje. Si estás experimentando dificultades técnicas, por favor envía un mensaje a <a href=\"mailto:ayuda@escuelabiblicamundial.net\">ayuda@escuelabiblicamundial.net</a>.","from":"Escuela Bíblica Mundial <sin-respuesta@escuelabiblicamundial.net>","from_support":"Escuela Bíblica Mundial <ayuda@escuelabiblicamundial.net>","god_bless":"Que Dios le bendiga","logo":"email-logo-es.png","please_log_in_to":"Por favor, inicie sesión nueva para","title":"Escuela Bíblica Mundial","update_contact_preferences":"actualizar sus preferencias de contacto"},"register":{"address":"Dirección","after_register_email":"Después de inscribirse,le enviaremos un mensaje electrónico para confirmar su dirección. Después de confirmar su dirección, le daremos su información a un maestro de la EBM que le enviará su primera lección.","after_register_postal":"Después de inscribirse, le daremos su dirección postal a un maestro de la Escuela Bíblica Mundial. Recibirá su primera lección del maestro en 3-6 semanas.","after_register_web":"Después de inscribirse, el sitio se dirigirá automáticamente y usted podrá empezar su primera lección. No hay que esperar ningún mensaje o inicio de cuenta.","city":"Ciudad","confirm_email":"Confirmar su dirección electrónica","confirm_password":"Confirmar su contraseña","delivery_information":"Información para recibir las lecciones","email":"Por correo electrónico","email_address":"Dirección electrónica","family_name":"Apellido(s)","first_name":"Nombre(s)","have_slow_internet":"¿Tiene usted acceso limitado o su servicio de Internet es muy lento?","how_receive_lessons":"¿Cómo prefiere estudiar y recibir sus lecciones?","i_live_in":"Vivo en","internet_unreliable":"¿Internet no fiable?","password":"Contraseña","personal_information":"Información personal","postal":"Postal","postal_explanation":"Lecciones impresas que te enviamos.","problem_internet":"¿Tiene usted muy pocos o ningún problema con su servicio de Internet?","register":"Inscribirse","register_as_email":"registrar para estudiar por correo electrónico.","register_as_postal":"registrar como un estudiante por correspondencia","register_with_web":"registren para estudiar a través de este sitio web","registering":"Registración en progreso...","required":"Información requirida","start_today":"Empiece a <span>aprender</span> acerca de la Biblia hoy","state":"Estado/provincia/región","submit":"Enviar","submit_email":"Estudiar por correo electrónico","submit_postal":"Estudiar por correspondencia","tagline":"Inscríbase gratis en nuestra página segura","thank_you_logged_in":"Gracias por registrase. Su primera lección está listo para estudiar. También hemos enviado su lección por correo electrónico.","title":"Escuela Bíblica Mundial","to_get_email":"Usted recibirá las lecturas y enseñanzas a través de su correo electrónico. Compartiremos la dirección de su correo electrónico con uno de nuestros maestros.","to_get_postal":"y recibirá las lecturas y enseñanzas a su correo. Sus primeras lecturas llegarán en aproximadamente 4 a 6 semanas.","type_password":"Escribir su contraseña","unable_to_internet":"¿No puede usted acceder al Internet frecuentemente?","we_recommend":"A la mayoría de nuestros estudiantes que tienen acceso al Internet les recomendamos que se","web":"En línea","web_explanation":"Aprender en línea o por correo electrónico.","you_can":"Usted se puede","zip":"Código postal"},"registration_from_connect":{"email_student":"Este estudiante se inscribió para estudiar por correo electrónico y está disponible para asignación a un maestro en el Panel de Estudiantes de esta campaña.","name":"Nombre","postal_student":"Este estudiante se inscribió para recibir lecciones por correo postal.","subject":"Nuevo Estudante - Enlace EBM %{name}","title":"Nueva registración de la campaña %{name}","view_student_board":"Ver el Panel","web_student":"Este estudiante se registró para estudiar por la web y está disponible para ser adoptado en el Panel de estudiantes","why":"Está recibiendo este mensaje porque Ud. es miembro de un grupo del Enlace EBM. Otros miembros de su grupo también están recibiendo este mensaje. Si el estudiante no se encuentra en el Panel de Estudiantes, puede ser porque algún otro miembro de su grupo Enlace ya adoptó a ese estudiante. Si Ud. ya no desea recibir estos mensajes, <a href=\"%{link}\">haga clic aquí para actualizar sus preferencias de contacto</a>."},"reminder":{"followup_needs_status":{"subject":"Por favor envíe noticias de estado"},"followup_newsletter":{"subject":"Noticias de Seguimiento de la Escuela Bíblica Mundial"}},"reset_password":{"instructions":"Puede crear su nueva contraseña abajo.","password_change":"Cambio de contraseña","please_ignore":"Si no solicitó una contraseña nueva, favor de no hacer caso a este mensaje.","reset_my_password":"Restablecer mi contraseña","reset_password":"Restablecer su contraseña","subject":"Escuela Bíblica Mundial - Nueva Contraseña","you_requested":"Usted ha solicitado un cambio de contraseña."},"reset_password_link":{"subject":"Escuela Bíblica Mundial - Restablecer su contraseña"},"share":{"register":"Registrar","share":"Invitación de %{name}","subject":"Invitación a %{name}","title":"Aprenda la Biblia con la Escuela Bíblica Mundial","to_sign_up":"Para inscribirse para recibir cursos de la Biblia gratis, haga clic en el enlace abajo:"},"share_teacher":{"apply":"Llenar una solicitud","background":"%{name} le invitó a enseñar con el grupo %{group}. La Escuela Bíblica Mundial ofrece un sencillo juego de herramientas que ayudan a los cristianos a contar al mundo sobre Jesús. Para iniciar, por favor vaya a este enlace para llenar una solicitud.","subject":"Invitación a la EBM de %{name}"},"student_from_mini_campaign":{"email_student":"Este estudiante va a estudiar por correo electrónico.","name":"Nombre","postal_student":"Este estudiante va a recibir lecciones por correo postal.","subject":"Nuevo Estudiante para Ud.","title":"Ud. tiene un nuevo estudiante EBM","view_students":"Ver estudiantes","web_student":"Este estudiante va a estudiar por Internet.","why":"Ud. recibió este mensaje porque donó para encontrar nuevos estudiantes y eligió enseñarles."},"teacher":{"address_cont":"Dirección postal (continuación)","agree_1":"Como Ayudante de Estudios de la EBM, afirmo que soy miembro, en buen estado, de la iglesia del Señor. Cristo me hizo parte de la familia de Dios cuando puse mi fe en Su Evangelio, me arrepentí de mis pecados y, como creyente, fui bautizado/a para la eliminación de mis pecados.","agree_1_sub_1":"\"En buen estado\" significa que sigo fielmente a Cristo. Mi dedicación a la forma de vida que Criso nos mostró es evidente a los demás.","agree_2":"Como Ayudante de Estudios de la EBM, me comprometo a estar de acuerdo básico con los cursos de la EBM. Mientras enseño, revisaré los cursos de la Serie Maestra de la EBM.","agree_2_sub_1":"\"Acuerdo básico\" significa que yo creo, practico y enseño las grandes verdades enseñadas por la Biblia y, por consiguiente, por la EBM.","agree_2_sub_2":"Ud. puede llenar una solicitud para enseñar sin comprometerse a aceptar a un estudiante. De esta forma, puede revisar la Serie Maestra.","agree_2_sub_3":"Alternativamente, Ud. puede elegir a un estudiante y revisar la Serie Maestra junto con el estudiante. Si encuentra algún material con el cual Ud. no puede estar de acuerdo, nos puede notificar y trasladaremos el estudiante a otro maestro y cancelar su cuenta.","agree_2_sub_4":"De vez en cuando la EBM pide a futuros maestros que estudien la Serie Maestra como estudiante antes de hacerse maestros.","agree_3":"Usaré el sistema de Seguimiento de la Escuela Bíblica Mundial.","agree_3_exp":"Su participación como Ayudante de Estudios de la Escuela Bíblica Mundial es muy importante para que sea exitoso el ayudar a aquellos que están buscando a Dios a través del estudio de la Biblia. Efesios 4:4 dice, <i>\"Hay un solo cuerpo y un solo Espíritu, así como también fueron llamados a una sola esperanza.\"</i> Como Ayudante de Estudios de la Escuela Bíblica Mundial, usted puede ayudar a mantener este espíritu de unidad usando el método aprobado del Sistema de Seguimiento de la Escuela Bíblica Mundial. El sistema ayuda a los Ayudantes de Estudios de las siguientes formas:","agree_3_sub_1":"Ayuda a los Ayudantes de Estudios a evitar fraudes.","agree_3_sub_2":"Hace que el seguimiento sea más fácil para el Ayudante de Estudios, permitiéndole enfocarse en sus estudiantes.","agree_3_sub_3":"Permita que la EBM mida la eficacia del sistema para poder mejorarlo en el futuro.","agree_3_sub_4":"Permite que los esfuerzos de la EBM y de Ud. aseguren que el nuevo cristiano se empareje con una iglesia fiel y alentadora.","agree_4":"Leí y estoy de acuerdo con el Acuerdo del Maestro EBM.","agree_4_sub_1":"El Acuerdo del Maestro EBM se encuentra aquí:","agree_to":"Para hacerse maestro/a de la Escuela Bíblica Mundial, debe leer y quedar en los siguientes puntos:","birth_year":"Año de nacimiento","city":"Cuidad","congregation_city":"Ciudad en donde la iglesia se encuentra","congregation_information":"Información sobre su Iglesia","congregation_name":"Nombre de la Iglesia","congregation_state":"Estado/Región/Provincia de la Iglesia","country":"País","email":"Correo electrónico","english":"Inglés","family_name":"Apellido(s)","female":"Mujer","first_name":"Nombre","gender":"Sexo","how_prefer":"¿Cómo prefiere Ud. enseñar?","i_agree":"Estoy de acuerdo","internet":"Internet","intro":"Nos alegra que Ud. está interesado en hacerse maestro/a de la Escuela Bíblica Mundial. Compartir las Buenas Nuevas con el mundo es un trabajo emocionante. Estamos esperando con ansias que empiece con su primer estudiante.","mailing_address":"Dirección postal","mailing_information":"Información de Correo","male":"Hombre","personal_information":"Información Personal","phone_number":"Número de teléfono","portuguese":"Portugués","postal":"Correo postal","questions_comments":"Preguntas/Comentarios","required":"Requerido","send":"Enviar","spanish":"Español","state":"Estado/Región/Provincia","title":"Solicitud para ser maestro/a","wbs_teacher_agreement":"Acuerdo del Maestro EBM","web_or_email":"Web o correo electrónico","what_languages":"¿En qué idioma(s) quisiera enseñar?","zip":"Código postal"},"thank_you_donation_mini_campaign":{"email_updates":"Por cierto, le enviaremos un reporte mensual respecto a su donación. Ud. sabrá cuántos estudiantes se inscriben y cuáles estudian activamente. También sabrá cuándo esos estudiantes se están anotados para recibir seguimiento. Esté pendiente de ese mensaje; se enviará el primero de cada mes.","info":"Gracias por dar para ayudarnos a conectar buscadores con la Biblia.","subject":"Gracias por dar","title":"Gracias por su regalo"},"waiting_registration_from_campaign":{"next_step":"Por favor, inicia sesión en el sitio web y revise su panel de estudiantes para esta campaña. Entonces, adopte al estudiante o pida a uno de sus meastros Enlace que adopte al estudiante.","subject":"Estudiante de Enlace EBM está esperando","title":"Por lo menos un estudiante de la campaña %{name} de Enlace está esperando."},"welcome":{"subject":"Bienvenido(a) a la Escuela Bíblica Mundial"},"welcome_followup":{"subject":"¡Felicitaciones socio! (EBM)"},"welcome_teacher":{"subject":"Bienvenido(a) a la Escuela Bíblica Mundial"},"welcome_with_password":{"account_created_for_you":"Una cuenta con la Escuela Bíblica Mundial ha sido creado para usted. Para estudiar la Biblia con nosotros, inicie una sesión con esta información:","after_complete":"Después de cumplir el primer examen, le designaremos a un maestro que servirá como guía mientras siga los cursos de la Escuela Bíblica Mundial.","god_bless":"¡Que Dios le bendiga!","login":"Iniciar sesión","login_url":"www.escuelabiblicamundial.org/iniciar","study_helper":"Su maestro es %{name}.","subject":"Bienvenido(a) a la Escuela Bíblica Mundial","url":"www.escuelabiblicamundial.org","welcome":"Bienvenido(a) a la Escuela Bíblica Mundial"}},"authlogic":{"error_messages":{"email_invalid":"debe ser similar a una dirección de correo electrónico.","general_credentials_error":"Correo electrónico/Contraseña combinación no es válido","login_blank":"no puede estar en blanco","login_not_found":"no es válido","no_authentication_details":"No dio detalles de iniciar sesión.","password_blank":"no puede estar en blanco","password_invalid":"no es válida"}},"date":{"abbr_day_names":["dom","lun","mar","mié","jue","vie","sáb"],"abbr_month_names":[null,"ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],"day_names":["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],"formats":{"default":"%d/%m/%Y","long":"%d de %B de %Y","message":"%d de %B de %Y","only_day":null,"short":"%d de %b","year_first":"%Y-%-d-%-m"},"month_names":[null,"enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],"order":["day","month","year"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"alrededor de 1 hora","other":"alrededor de %{count} horas"},"about_x_months":{"one":"alrededor de 1 mes","other":"alrededor de %{count} meses"},"about_x_years":{"one":"alrededor de 1 año","other":"alrededor de %{count} años"},"almost_x_years":{"one":"casi 1 año","other":"casi %{count} años"},"half_a_minute":"medio minuto","less_than_x_minutes":{"one":"menos de 1 minuto","other":"menos de %{count} minutos","zero":"menos de un minuto"},"less_than_x_seconds":{"one":"menos de 1 segundo","other":"menos de %{count} segundos","zero":"menos de 1 segundo"},"over_x_years":{"one":"más de 1 año","other":"más de %{count} años"},"x_days":{"one":"1 día","other":"%{count} días"},"x_minutes":{"one":"1 minuto","other":"%{count} minutos"},"x_months":{"one":"1 mes","other":"%{count} meses"},"x_seconds":{"one":"1 segundo","other":"%{count} segundos"}},"prompts":{"day":"Día","hour":"Hora","minute":"Minutos","month":"Mes","second":"Segundos","year":"Año"}},"devise":{"confirmations":{"confirmed":"Tu cuenta ha sido satisfactoriamente confirmada.","send_instructions":"Vas a recibir un correo con instrucciones sobre cómo confirmar tu cuenta en unos pocos minutos.","send_paranoid_instructions":"Si tu correo existe en nuestra base de datos, vas a recibir un correo con instrucciones sobre cómo confirmar tu cuenta en unos pocos minutos."},"failure":{"already_authenticated":"Ya has iniciado sesión.","inactive":"Tu cuenta aún no ha sido activada.","invalid":"Email o contraseña no válidos.","last_attempt":"Tienes un intento más antes de que tu cuenta sea bloqueada.","locked":"Tu cuenta está bloqueada.","not_found_in_database":"Email o contraseña no válidos.","not_web_student_email":"<p class='login-error-postal mbl'>Al momento usted no puede iniciar sesión porque está estudiando por correo electrónico.</p>","not_web_student_postal":"<p class='login-error-postal mbl'>Al momento usted no puede iniciar sesión porque está estudiando por correo postal.</p>","timeout":"Tu sesión expiró. Por favor, inicia sesión nuevamente para continuar.","unauthenticated":"Tienes que iniciar sesión o registrarte para poder continuar.","unconfirmed":"Tienes que confirmar tu cuenta para poder continuar."},"mailer":{"confirmation_instructions":{"subject":"Instrucciones de confirmación"},"email_changed":{"subject":null},"password_change":{"subject":"Contraseña cambiada"},"reset_password_instructions":{"subject":"Instrucciones de recuperación de contraseña"},"reset_password_instructions_login_failure":{"can_we_help":"Necesita ayuda?","instructions":"Parece que le esta presentando dificultad en iniciar sesión. Si le ha olvidado la contraseña, se puede hacer clic en el botón abajo para establecer una nueva contraseña. Si no desea una nueva contraseña se puede ignorar este mensaje.","subject":"Dificultades en iniciar sesión?"},"unlock_instructions":{"subject":"Instrucciones para desbloquear"}},"omniauth_callbacks":{"failure":"No has sido autorizado en la cuenta %{kind} porque \"%{reason}\".","success":"Has sido autorizado satisfactoriamente de la cuenta %{kind}."},"passwords":{"no_token":"No puedes acceder a esta página si no es a través de un enlace para resetear tu contraseña. Si has llegado hasta aquí desde el email para resetear tu contraseña, por favor asegúrate de que la URL introducida está completa.","send_instructions":"Vas a recibir un correo con instrucciones sobre cómo resetear tu contraseña en unos pocos minutos.","send_paranoid_instructions":"Si tu correo existe en nuestra base de datos, vas a recibir un correo con instrucciones sobre cómo resetear tu contraseña en tu bandeja de entrada.","updated":"Tu contraseña fue cambiada. Ya iniciaste sesión.","updated_not_active":"Tu contraseña fue cambiada."},"registrations":{"destroyed":"Fue grato tenerte con nosotros. Tu cuenta fue cancelada.","signed_up":"Bienvenido. Tu cuenta fue creada.","signed_up_but_inactive":"Tu cuenta ha sido creada correctamente. Sin embargo, no hemos podido iniciar la sesión porque tu cuenta aún no está activada.","signed_up_but_locked":"Tu cuenta ha sido creada correctamente. Sin embargo, no hemos podido iniciar la sesión porque que tu cuenta está bloqueada.","signed_up_but_unconfirmed":"Se ha enviado un mensaje con un enlace de confirmación a tu correo electrónico. Abre el enlace para activar tu cuenta.","update_needs_confirmation":"Has actualizado tu cuenta correctamente, pero es necesario confirmar tu nuevo correo electrónico. Por favor, comprueba tu correo y sigue el enlace de confirmación para finalizar la comprobación del nuevo correo eletrónico.","updated":"Tu cuenta fue actualizada."},"sessions":{"already_signed_out":"Sesión finalizada.","signed_in":"Sesión iniciada.","signed_out":"Sesión finalizada."},"unlocks":{"send_instructions":"Vas a recibir instrucciones para desbloquear tu cuenta en unos pocos minutos.","send_paranoid_instructions":"Si tu cuenta existe, vas a recibir instrucciones para desbloquear tu cuenta en unos pocos minutos.","unlocked":"Tu cuenta fue desbloqueada. Ya puedes iniciar sesión."}},"errors":{"connection_refused":"Ups! No se pudo conectar a la Consola Web de middleware.\nPor favor asegúrese de que un servidor de Rails Development se está ejecutando.\n","format":"%{attribute} %{message}","messages":{"accepted":"debe ser aceptado","already_confirmed":"ya fue confirmada, por favor intenta iniciar sesión","blank":"no puede estar en blanco","carrierwave_download_error":"no se pudo descargar","carrierwave_integrity_error":"no es un tipo de archivo permitido","carrierwave_processing_error":"no se procesó","confirmation":"no coincide con la confirmación","confirmation_period_expired":"necesita confirmarse dentro de %{period}, por favor solicita una nueva","content_type_blacklist_error":null,"content_type_whitelist_error":null,"empty":"no puede estar vacío","equal_to":"debe ser igual a %{count}","even":"debe ser par","exclusion":"está reservado","expired":"ha expirado, por favor solicita una nueva","extension_blacklist_error":null,"extension_whitelist_error":null,"greater_than":"debe ser mayor que %{count}","greater_than_or_equal_to":"debe ser mayor que o igual a %{count}","improbable_phone":null,"inclusion":"no está incluido en la lista","invalid":"no es válido","invalid_currency":null,"less_than":"debe ser menor que %{count}","less_than_or_equal_to":"debe ser menor que o igual a %{count}","max_size_error":null,"min_size_error":null,"mini_magick_processing_error":"Hubo un error al manipular con rmagick. ¿Tal vez no es una imagen? Error Original: %{e}","not_a_number":"no es un número","not_an_integer":"debe ser un entero","not_found":"no se encontró","not_locked":"no estaba bloqueada","not_saved":{"one":"Un error ocurrió al tratar de guardar %{resource}:","other":"%{count} errores ocurrieron al tratar de guardar %{resource}:"},"odd":"debe ser impar","other_than":"debe ser diferente de %{count}","present":"debe estar en blanco","rmagick_processing_error":"Hubo un error al manipular con rmagick. ¿Tal vez no es una imagen? Error Original: %{e}","taken":"ya está en uso","too_long":{"one":"es demasiado largo (máximo es de 1 carácter)","other":"es demasiado largo (%{count} carácteres máximo)"},"too_short":{"one":"es demasiado corto (el mínimo es de 1 carácter)","other":"es demasiado corto (%{count} carácteres mínimo)"},"wrong_length":{"one":"no tiene la longitud correcta (debe se de 1 carácter)","other":"no tiene la longitud correcta (debe ser %{count} carácteres)"}},"unacceptable_request":"Una versión compatible se espera en el encabezado Accept.\n","unavailable_session":"Sesión %{id} ya no se encuentra disponible en la memoria.\n\nSi Ud. ejecuta un servidor multi-procesos (como Unicorn o Puma) el proceso de\nesta solicitud, %{id}, no se almacena en la memoria. Considere cambiar el número de procesos / trabajadores a uno (1) o usar otro servidor en el desarrollo.\n"},"flash":{"actions":{"create":{"notice":"%{resource_name} fue creado con éxito."},"destroy":{"alert":"%{resource_name} no pudo ser destruido.","notice":"%{resource_name} fue destruido con éxito."},"update":{"notice":"%{resource_name} se ha actualizado con éxito."}}},"helpers":{"page_entries_info":{"entry":{"one":null,"other":null,"zero":null},"more_pages":{"display_entries":"Mostrando <b>%{first}&nbsp;-&nbsp;%{last}</b> %{entry_name} de <b>%{total}</b> en total"},"one_page":{"display_entries":{"one":"Mostrando <b>%{count}</b> %{entry_name}","other":"Mostrando <b>un total de %{count}</b> %{entry_name}","zero":"No se han encontrado %{entry_name}"}}},"select":{"prompt":"Por favor seleccione"},"submit":{"create":"Crear %{model}","submit":"Guardar %{model}","update":"Actualizar %{model}"}},"i18n_tasks":{"add_missing":{"added":{"one":null,"other":null}},"cmd":{"args":{"default_text":null,"desc":{"confirm":null,"data_format":null,"key_pattern":null,"key_pattern_to_rename":null,"locale_to_translate_from":null,"locales_filter":null,"missing_types":null,"new_key_name":null,"nostdin":null,"out_format":null,"pattern_router":null,"strict":null,"value":null}},"desc":{"add_missing":null,"check_normalized":null,"config":null,"data":null,"data_merge":null,"data_remove":null,"data_write":null,"eq_base":null,"find":null,"gem_path":null,"health":null,"irb":null,"missing":null,"mv":null,"normalize":null,"remove_unused":null,"rm":null,"translate_missing":null,"tree_convert":null,"tree_filter":null,"tree_merge":null,"tree_mv_key":null,"tree_rename_key":null,"tree_set_value":null,"tree_subtract":null,"tree_translate":null,"unused":null,"xlsx_report":null},"encourage":[null,null,null],"enum_list_opt":{"invalid":null},"enum_opt":{"invalid":null},"errors":{"invalid_format":null,"invalid_locale":null,"invalid_missing_type":{"one":null,"other":null},"pass_forest":null}},"common":{"base_value":null,"continue_q":null,"key":null,"locale":null,"n_more":null,"type":null,"value":null},"data_stats":{"text":null,"text_single_locale":null,"title":null},"google_translate":{"errors":{"no_api_key":null,"no_results":null}},"health":{"no_keys_detected":null},"missing":{"details_title":null,"none":null},"remove_unused":{"confirm":{"one":null,"other":null},"noop":null,"removed":null},"translate_missing":{"translated":null},"unused":{"none":null},"usages":{"none":null}},"mailboxer":{"message_mailer":{"subject_new":null,"subject_reply":null},"notification_mailer":{"subject":null}},"nations":{"ad":"Andorra","ae":"Emiratos Árabes Unidos","af":"Afganistán","ag":"Antigua y Barbuda","ai":"Anguilla","al":"Albania","am":"Armenia","an":"Antillas Holandesas","ao":"Angola","ar":"Argentina","as":"Samoa Americana","at":"Austria","au":"Australia","aw":"Aruba","az":"Azerbaiyán","ba":"Bosnia y Herzegovina","bb":"Barbados","bd":"Bangladesh","be":"Bélgica","bf":"Burkina Faso","bg":"Bulgaria","bh":"Bahrein","bi":"Burundi","bj":"Benin","bl":"San Bartolomé","bm":"Bermuda","bn":"Brunei Darussalam","bo":"Bolivia","bq":"Isla Navaza","br":"Brasil","bs":"Bahamas","bt":"Bután","bw":"Botswana","by":"Belarús","bz":"Belice","ca":"Canadá","cd":"Congo, La República Democrática del","cf":"República Centroafricana","cg":"Congo, República del","ch":"Suiza","ci":"Cote d'Ivoire","ck":"Islas Cook","cl":"Chile","cm":"Camerún","cn":"China","co":"Colombia","cr":"Costa Rica","cs":"Serbia y Montenegro","cu":"Cuba","cv":"Cabo Verde","cw":"Curazao","cy":"Chipre","cz":"La República Checa","de":"Alemania","dj":"Yibuti","dk":"Dinamarca","dm":"Dominica","do":"República Dominicana","dz":"Argelia","ec":"Ecuador","ee":"Estonia","eg":"Egipto","er":"Eritrea","es":"España","et":"Etiopía","fi":"Finlandia","fj":"Fiyi","fm":"Micronesia","fr":"Francia","ga":"Gabón","gb":"Reino Unido","gd":"Grenada","ge":"Georgia","gh":"Ghana","gm":"Gambia","gn":"Guinea","gq":"Guinea Ecuatorial","gr":"Grecia","gt":"Guatemala","gu":"Guam","gw":"Guinea-Bissau","gy":"Guyana","hk":"Hong Kong","hn":"Honduras","hr":"Croacia","ht":"Haití","hu":"Hungría","id":"Indonesia","ie":"Irlanda","il":"Israel","in":"India","iq":"Irak","ir":"Irán","is":"Islandia","it":"Italia","jm":"Jamaica","jo":"Jordania","jp":"Japón","ke":"Kenia","kg":"Kirguistán","kh":"Camboya","ki":"Kiribati","km":"Comoros","kn":"Saint Kitts y Nevis","kp":"Corea del Norte","kr":"Corea del Sur","kw":"Kuwait","ky":"Islas Caimán","kz":"Kazajstán","la":"Lao People's Democratic Republic","lb":"Líbano","lc":"Santa Lucía","li":"Liechtenstein","lk":"Sri Lanka","lr":"Liberia","ls":"Lesoto","lt":"Lituania","lu":"Luxemburgo","lv":"Letonia","ly":"Libia","ma":"Marruecos","mc":"Mónaco","md":"Moldova","me":"Montenegro","mf":"San Martín","mg":"Madagascar","mh":"Islas Marshall","mk":"Macedonia","ml":"Malí","mm":"Myanmar","mn":"Mongolia","mo":"Macao","mp":"Islas Marianas del Norte","mq":"Martinica","mr":"Mauritania","ms":"Montserrat","mt":"Malta","mu":"Mauritius","mv":"Maldivas","mw":"Malawi","mx":"México","my":"Malasia","mz":"Mozambique","na":"Namibia","nc":"Nueva Caldonia","ne":"Níger","ng":"Nigeria","ni":"Nicaragua","nl":"Países Bajos","no":"Noruega","np":"Nepal","nr":"Nauru","nz":"Nueva Zelanda","om":"Omán","pa":"Panamá","pe":"Perú","pf":"Polinesia francés","pg":"Papua Nueva Guinea","ph":"Filipinas","pk":"Pakistán","pl":"Polonia","pr":"Puerto Rico","ps":"Palestina","pt":"Portugal","pw":"Palau","py":"Paraguay","qa":"Qatar","rn":"Rapa Nui","ro":"Rumania","ru":"Rusia","rw":"Ruanda","sa":"Arabia Saudita","sb":"Islas Salomón","sc":"Seychelles","sd":"Sudán","se":"Suecia","sg":"Singapur","si":"Eslovenia","sk":"Eslovaquia","sl":"Sierra Leona","sm":"San Marino","sn":"Senegal","so":"Somalia","sr":"Suriname","ss":"Sur de Sudán, la República de","st":"Santo Tomé y Príncipe","sv":"El Salvador","sx":"Sint Maarten","sy":"Siria","sz":"Suazilandia","tc":"Islas Turcas y Caicos","td":"Chad","tg":"Togo","th":"Tailandia","tj":"Tayikistán","tk":"Tokelau","tl":"Timor-Leste","tm":"Turkmenistán","tn":"Túnez","to":"Tonga","tr":"Turquía","tt":"Trinidad y Tobago","tv":"Tuvalu","tw":"Taiwan","tz":"Tanzania","ua":"Ucrania","ug":"Uganda","us":"Estados Unidos de América","uy":"Uruguay","uz":"Uzbekistán","vc":"San Vicente y las Granadinas","ve":"Venezuela","vg":"Islas Vírgenes Británicas","vi":"Islas Vírgenes de EE.UU.","vn":"Vietnam","vu":"Vanuatu","wf":"Wallis y Futuna","ws":"Samoa","xk":"Kosova","ye":"Yemen","za":"Sudáfrica","zm":"Zambia","zw":"Zimbabue"},"number":{"currency":{"format":{"delimiter":".","format":"%n %u","precision":2,"separator":",","significant":false,"strip_insignificant_zeros":false,"unit":"€"}},"format":{"delimiter":".","precision":3,"separator":",","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"mil millones","million":"millón","quadrillion":"mil billones","thousand":"mil","trillion":"billón","unit":""}},"format":{"delimiter":"","precision":1,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":""}},"precision":{"format":{"delimiter":""}}},"ransack":{"all":"todo/a(s)","and":"y","any":"cualquier","asc":"ascendiente","attribute":"atributo","combinator":"combinador","condition":"condición","desc":"descendente","or":"o","predicate":"predicado","predicates":{"blank":"está en blanco","cont":"contiene","cont_all":"contiene todo/a","cont_any":"contiene cualquier","does_not_match":"no coincide","does_not_match_all":"no coincide con todo","does_not_match_any":"no coincide con ningun(a)","end":"termina con","end_all":"termina con todo/a(s)","end_any":"termina con cualquier","eq":"es igual a","eq_all":"es igual a todo/a(s)","eq_any":"es igual a cualquier","false":"es falso","gt":"mayor que","gt_all":"mayor que todo/a(s)","gt_any":"mayor que cualquier","gteq":"mayor que o igual a","gteq_all":"mayor que o igual a todo/a(s)","gteq_any":"mayor que o igual a cualquier","in":"en","in_all":"en todo/a(s)","in_any":"en cualquier","lt":"menor que","lt_all":"menor que todo/a(s)","lt_any":"menos que cualquier","lteq":"menos que o igual a","lteq_all":"menos que o igual a todo/a(s)","lteq_any":"menos que o igual a cualquier","matches":"coincide con","matches_all":"coincide con todo/a(s)","matches_any":"coincide con cualquier","not_cont":"no contiene","not_cont_all":"no contiene todo/a(s)","not_cont_any":"no contiene ningun(a)","not_end":"no termina con","not_end_all":"no termina con todo/a(s)","not_end_any":"no termina con ningun(a)","not_eq":"no es igual a","not_eq_all":"no es igual a todo/a(s)","not_eq_any":"no es igual a ningun(a)","not_in":"no está en","not_in_all":"no está en todo/a(s)","not_in_any":"no está en ningun(a)","not_null":"no es nulo","not_start":"no comienza con","not_start_all":"no comienza con todo/a(s)","not_start_any":"no comienza con ningun(a)","null":"es nulo","present":"está presente","start":"comienza con","start_all":"comienza con todo/a(s)","start_any":"comienza con cualquier","true":"es cierto"},"search":"buscar","sort":"clasificar","value":"valor"},"simple_form":{"error_notification":{"default_message":"Por favor revise los problemas abajo:"},"no":"No","required":{"mark":"*","text":"requerido"},"yes":"Sí"},"spree":{"date_picker":{"first_day":1},"not":false,"say_no":false},"support":{"array":{"last_word_connector":", y ","two_words_connector":" y ","words_connector":", "}},"time":{"am":"am","formats":{"certificate":"%B de %Y","certificate_month":"%B","datetime":{"formats":{"default":null}},"default":"%A, %d de %B de %Y %H:%M:%S %z","history":"%d/%m/%y","long":"%d de %B de %Y %H:%M","medium":null,"only_second":null,"post":null,"short":"%d de %b %H:%M","time":null},"pm":"pm"},"views":{"pagination":{"first":"&laquo; Primera","last":"Última &raquo;","next":"Siguiente &rsaquo;","previous":"&lsaquo; Anterior","truncate":"&hellip;"}}},"fr":{"activemodel":{"errors":{"messages":{"email_address_not_routable":"n’est pas routable","invalid_email_address":"ne semble pas être une adresse email valide"}}},"activerecord":{"attributes":{"student":{"address1":"Adresse"}},"errors":{"messages":{"accepted":"doit être accepté","blank":"doit être fourni","confirmation":"ne correspond pas à sa confirmation","email_address_not_routable":"n’est pas routable","empty":"doit être fourni\n","equal_to":"doit être égal à %{count}","even":"doit être pair","exclusion":"n’est pas disponible","greater_than":"doit être supérieur à %{count}","greater_than_or_equal_to":"doit être supérieur ou égal à %{count}","inclusion":"n’est pas dans la liste","invalid":"n’est pas valable","invalid_email_address":"ne semble pas être une adresse email valide","less_than":"doit être inférieur à %{count}","less_than_or_equal_to":"doit être inférieur ou égal à %{count}","not_a_number":"n’est pas un nombre","odd":"doit être impair","record_invalid":"Échec de validation : %{errors}","restrict_dependent_destroy":{"many":"Impossible de supprimer le dossier parce qu’il existe des %{record} dépendantes ","one":"Impossible de supprimer le dossier parce qu'il existe un %{record} dépendante"},"taken":"n’est pas disponible","too_long":"est trop long (pas plus de %{count} caractères)","too_short":"est trop court (pas moins de %{count} caractères)","wrong_length":"n’est pas de la bonne longueur (doit avoir %{count} caractères)"},"models":{"course":{"attributes":{"intro":{"one_per_locale":"Il ne peut y avoir qu’un seul cours d'introduction par endroit"}}},"exam":{"attributes":{"status":{"questions_must_have_valid_answers":"ne peut pas être publié jusqu’à ce que toutes les questions capables d'être corrigées aient des réponses correctes."}}},"followup":{"attributes":{"can_share_contact":{"inclusion":"L’étudiant doit donner la permission explicite de partager ses  coordonnées."},"understands_purpose_of_baptism":{"inclusion":"L’étudiant comprend-il le but du baptême ?"},"wants_in_person_study":{"inclusion":"L’étudiant a-t-il demandé à étudier la Bible avec quelqu’un en personne ?"},"wants_introduction_to_church":{"inclusion":"L’étudiant a-t-il demandé qu'on le présente à une assemblée locale ?"},"wants_to_be_baptized":{"inclusion":"L’étudiant a-t-il demandé le baptême ?"}}},"message":{"attributes":{"recipients":{"too_short":"Vous avez besoin de plus d'un destinataire. Si vous vous servez d'une liste d'étudiants « cachés » ou « actifs », assurez-vous que vous avez réellement des étudiants cachés ou actifs."}}},"share":{"attributes":{"message":{"spam":"ressemble à du spam"}}},"student":{"attributes":{"teacher_id":{"already_adopted":"cet étudiant a déjà été adopté","cannot_adopt":"ne peut pas adopter cet étudiant","not_valid":"doit être un enseignant valide enregistré"}}},"user":{"attributes":{"email":{"taken":"est déjà pris. Si vous avez déjà un compte, vous pouvez <a href=\"/login\">connecter ici</a>."}}}},"template":{"body":"Des problèmes se posaient avec les champs suivants :","header":{"one":"1 erreur a empêché ce %{model} d’être enregistré :","other":"%{count} erreurs ont empêché ce %{model} d’être enregistré :"}}}},"app":{"admin":{"account":{"address":"Adresse","city":"Ville","email":"Email","first_name":"Prénom","last_name":"Nom de famille","mailing_address":"Adresse postale","nation":"Pays","personal_information":"Renseignements personnels","phone":"Téléphone","state":"État / Province","update":"Mise à jour","your_account":"Votre compte","zip":"Code postal"},"account_nav":{"contact_information":"Coordonnées","contact_preferences":"Mode de correspondance privilégié","language_preferences":"Langue préférée","reset_password":"Réinitialiser mot de passe","student_notice":"Avis à l’étudiant"},"assign":{"assign":"Attribuer","assign_certificate":"Attribuer certificat","assign_lessons_to":"Attribuer leçons à","complete":"Complet","exam_completed_times":"Cet examen a été complété <span class=\"label\">%{number}</span> fois","in_progress":"En cours","master_series":"Attribuer le certificat du « Série du Maître »","not_applicable":"non applicable","problem_assigning":"Un problème est survenu dans l’annulation de l’attribution de cet examen. Veuillez réessayer plus tard.","problem_reassigning":"Un problème est survenu dans la réaffectation de cet examen. Veuillez réessayer plus tard.","reassign":"Réaffecter","reassigned":"Réaffecté","unassign":"Affectation annulée"},"assignments":{"certificate":"Certificat","certificate_down":"certificat","email_certificates":"Certificats par email","grade":"Corriger examen","removed":"supprimé","review":"Réviser l’examen ","sent":"envoyé"},"certificates":{"delete":"Supprimer"},"characteristics":{"age":"Âge","age_baptized_without_water":"Âge lorsque « baptisé(e) » sans eau","age_immersed":"Âge lorsque immergé(e)","age_sprinkled":"Âge lorsque aspergé(e)","age_water_poured":"Âge lorsque l'eau a été versée sur moi","baptized_without_water":"J’ai été « baptisé(e) » sans l’utilisation de l’eau.","congregation":"Assemblée","congregation_city":"Ville où se trouve l’assemblée","congregation_name":"Nom de l’assemblée","congregation_state":"État/province où se trouve l’assemblée","date_of_birth":"Date de naissance","do_you_wish_to_explain":"Souhaitez-vous expliquer davantage vos réponses ?","female":"féminin","gender":"Sexe","how_close_are_you_to_god":"À quel degré êtes-vous proche de Dieu ?","i_am_changing":"Je suis en train de changer","i_am_far_from_god":"Je suis loin de Dieu","i_am_lost":"Je suis « perdu(e) »","i_am_right_with_god":"Je suis en bonne relation avec Dieu","i_am_very_close_to_god":"Je suis très proche de Dieu","i_do_not_know_born_again":"Je ne sais pas si je suis « né(e) de nouveau ».","i_have_already_been_born_again":"Je suis déjà « né(e) de nouveau ».","i_have_already_been_saved":"J’ai déjà été sauvé(e)","i_have_received_the_holy_spirit":"J’ai reçu le Saint-Esprit","i_want_to_find_out_about_god":"Je veux en savoir plus sur Dieu","i_was_dipped":"J’ai été « baptisé(e) » lorsqu’on m’a plongé sous l’eau.","i_was_lost_but_returned":"J’ai été « perdu(e) », mais je suis revenu","i_was_poured":"J’ai été « baptisé(e) » lorsqu’on a versé de l’eau sur moi","i_was_sprinkled":"J’ai été « baptisé(e) » lorsqu’on m’a aspergé avec de l’eau.","language":"Langue","male":"masculin","marital_status":"État civil","my_baptism_was_for":"Mon baptême était pour la raison ou le but suivant…","occupation":"Profession","once_saved_fallen_away":"J’ai rechuté, bien que j’aie une fois été sauvé(e)","phone":"Téléphone","referred_by":"Parrainé par","religion":"Religion","when_how_saved":"Quand et comment avez-vous été « sauvé(e) » ou êtes-vous « né(e) de nouveau »","years_old":"%{age} ans (âge)"},"congregation":{"active_students":"Étudiants actifs","congregation_stats":"Statistique de l’assemblée","followups":"Membres de votre assemblée qui ont soumis %{count} demandes de suivi.","member_of":"Selon nos archives, vous êtes membre de l’assemblée %{name} à %{city} (ville), %{state} (état, province ou pays}.","no_congregation_on_record":"Votre assemblée ne se trouve pas dans nos archives. Pouvez-vous nous envoyer un email et nous faire savoir où vous adorez? <a href=\"mailto:help@worldbibleschool.net\">help@worldbibleschool.net</a>","teachers_at":"Enseignants EMB par Internet dans votre assemblée","total_nations":"Nombre des pays","total_students":"Effectif des étudiants","you_are_first":"Vous êtes le premier enseignant ÉMB par Internet dans votre assemblée. Vous êtes pionnier ! Recrutons quelques autres enseignants."},"connect":{"active_student_definition":"Pour ce qui concerne les étudiants, « actif » indique qu’ils ont soumis un examen ou envoyé un message à leur enseignant.","active_students":"Étudiants actifs","active_teacher_definition":"Pour ce qui concerne les enseignants, « actif » indique qu’ils ont adopte un étudiant, corrigé un devoir, ou envoyé un message à un étudiant.","active_teachers":"Enseignants actifs","adopted_students":"Etudiants adoptés","campaign_registrations":"Inscriptions par campagne","campaign_students_taught":"Étudiants inscrits par campagne enseignés","campaigns":"Campagnes","connect_campaign_adoptions":"Adoptions par « Campagne Connect »","details":"détails","download":"Télécharger Connect publicité accessoire <a href=\"//worldbibleschool-production.s3.amazonaws.com/connect/Connect-Advertising-Collateral_20140519.zip\">ici</a>. Vous aurez besoin d’Adobe InDesign pour effectuer des modifications. Ou, contactez-nous à l’adresse <a href=\"mailto:connect@worldbibleschool.net\">connect@worldbibleschool.net</a> si vous souhaitez que nous vous fassions des personnalisations mineures.","graphs":"Graphiques","has_no_students_waiting":"%{name} n’a pas d’étudiants en attente.","has_students_waiting":"%{name} a %{count} étudiants en attente","need_help":"Besoin d’aide ? Contactez-nous au <a href=\"mailto:connect@worldbibleschool.net\">connect@worldbibleschool.net</a>.","new_teachers":"Nouveaux enseignants","overview":"Aperçu","stats_on_last_30_days":"La statistique est basée sur les trente derniers jours.","stats_on_last_60_days":"La statistique est basée sur les soixante derniers jours.","student_overview":"Aperçu de l’étudiant","students_taught":"Étudiants enseignés","teacher_overview":"Aperçu de l’enseignant","teachers":"Enseignants","timeline":"Historique","total_students":"Effectif des étudiants","total_teachers":"Effectif du corps d’enseignants","waiting_on_assignment":"en attente d’une affectation","waiting_on_grade_for":"en attente d’une note pour %{time}","waiting_students":"En attente d’étudiants","wbs_connect":"ÉMB Connect","wbs_connect_campaigns":"Campagne ÉMB Connect","wbs_connect_dashboard":"Tableau de bord ÉMB Connect"},"followup":{"ago":"il y a","attempted_contact":"Tentative de contact","before_you_submit":"Avant de soumettre cet étudiant","cannot_complete":"Impossible de terminer","completed_request":"Demande complétée","contact_fup":"Contacter partenaire de suivi","contact_teacher":"Contacter enseignant","followup_partner":"Partenaire de suivi","followup_status":"État du suivi","followup_unavailable":"Le suivi n’est pas actuellement disponible au moyen de ce site Internet dans le pays suivant: %{nation}. Veuillez contacter <a href= \"mailto:followup@worldbibleschool.net\">followup@worldbibleschool.net</a> pour de l’aide avec le suivi de cet(te) étudiant(e).","has_been_adopted":"%{name} a été adopté(e) par %{partner}.","if_need_help":"Si vous avez besoin d’aide, vous pouvez %{contact_link}.","instructions":"Instructions ou notes","instructions_for_instructions":"Comment l’étudiant peut-il être contacté ? Pouvez-vous fournir un numéro de téléphone ? Quand est-ce que l’étudiant préfère être contacté ? L’étudiant a quelles questions auxquelles il faudra répondre en personne ? Quelles autres informations pertinentes pouvez-vous fournir ?","is_waiting":"%{name} est en attente d’être adopté par un travailleur de suivi.","label_can_share_contact":"%{name} vous a-t-il (a-t-elle) autorisé à partager ses coordonnées","label_understands_purpose_of_baptism":"%{name} comprend-il(elle) le but du baptême ?","label_wants_in_person_study":"%{name} a-t-il(elle) demandé à étudier la Bible avec quelqu’un en personne ?","label_wants_introduction_to_church":"%{name} a-t-il(elle) demandé d’être mis(e) en contact avec une assemblée locale ?","label_wants_to_be_baptized":"%{name} a-t-il(elle) demandé le baptême ?","last_updated":"dernière mise à jour il y a %{time}","made_contact":"Contact établi","no":"Non","no_action_taken":"Aucune action prise","no_updates_submitted":"Aucune mise à jour n’a été soumise","not_updated":"pas à jour","please_note":"Veuillez comprendre que le suivi n’est pas toujours facile. Cela est particulièrement vrai dans les pays ou la communication ou les déplacements sont difficiles. Armez-vous de patience. Parfois le suivi prend quelques semaines.","please_submit_frequently":"Veuillez soumettre fréquemment vos mises à jour. Ces mises à jour sur le suivi encouragent l’enseignant(e) à rester engagé(e). Si vous avez besoin de fournir plus de détails, laissez une note à %{timeline_link}.","request_completed":"Cette demande de suivi a été complétée.","request_in_person":"Étude biblique en personne a été demandée","request_introduction_to_church":"Présentation à l’Église a été demandée.","request_pending":"Demande de suivi en attente","requested_baptism":"Baptême demandé","send_partner_message":"Envoyer message à %{partner} ","status":"État du suivi","status_instructions":"Instructions relatives à l’état du suivi","status_updates":"Mises à jour","submit_for_followup":"Soumettre pour le suivi","submit_request":"Envoyer la demande","title":"Nouvelle demande de suivi","understands_baptism_purpose":"Comprend le but du baptême","update_status":"Mettre à jour","yes":"Oui"},"grade":{"comment":"Remarque","comments":"Remarques","complete":"Marquer comme complétée","confirm_reopen":"Oui, rouvrir cet examen","correct_answer":"Bonne réponse","did_not_answer":"L’étudiant n’a pas répondu à cette question.","exam_graded":"L'examen a été corrigé.","exam_reopened":"%{exam} a été rouvert pour %{student}.","explanation":"Explication","finalize":"Finaliser","found_in":"Trouvé dans","insert_scripture":"Insérez Écriture","left_blank":"L’étudiant n’a pas répondu à cette question.","not_ready_for_grade":"Ce devoir a été rouvert ou n’a pas encore été soumis par l’étudiant.","not_teacher":"Cet examen ne peut être corrigé que par l’enseignant de l’étudiant(e).","overview":"Aperçu","reopen":"Rouvrir examen","reopen_explanation":"Rouvrez l’examen pour permettre à l’étudiant de modifier les réponses déjà soumises.","saved":"enregistré","student_answer":"Réponse de l’étudiant","submit":"Envoyer note","submit_and_assign":"Envoyer la note et regarder la liste de devoirs","sure_reopen":"Êtes-vous sûr de vouloir rouvrir cet examen ? Lorsque l’examen est rouvert, vous ne serez pas en mesure de le réviser ou de le corriger jusqu'à ce que l’étudiant le soumette à nouveau.","your_comments_for":"Dernières remarques pour %{name}"},"history":{"history_for":"Historique pour"},"hub":{"add_student":"Inviter un étudiant à étudier","add_teacher":"Inviter un ami à devenir enseignant","all_caught_up":"Félicitations ! Vous êtes à jour en ce qui concerne vos étudiants qui suivent les cours par Internet.","contact_instructions":"Ce sont les étudiants qui n’ont pas reçu un message dans les 30 derniers jours. Vous pourriez envisager d’entrer en contact avec ces étudiants.","edit_notice":"Modifier cet avis","find_help":"Trouver des didacticiels vidéo et des conseils utiles dans notre <a href=\"%{help_url} \">section Aide</a>. Ou, envoyez-nous un email à l’adresse <a href=\"mailto:support@worldbibleschool.net\">support@worldbibleschool.net</a>.","followup_students_waiting":"Étudiants en attente de suivi","help":"Obtenir de l’aide","more_tips":"Vous ne pouvez pas trouver quelque chose ? Consultez notre section d’aide pour beaucoup plus de conseils.","no_student_to_contact":"Vous n’avez pas d’étudiants web que vous ne l’avez pas contactés récemment. Lorsque vous en aurez, nous les montrerons ici.","no_suggestions":"Vous avez terminé tous nos conseils pour l’instant.","no_web_students":"Vous n’avez pas encore d’étudiants. Utilisez le <a href=\"%{board_url}\">Tableau d’étudiants</a> pour adopter votre premier étudiant. Ou, utilisez le <a href=\"%{link} \">Ajouter étudiant</a> sur la page Mes étudiants pour ajouter un étudiant que vous connaissez déjà.","notice":"Avis à vos étudiants","read_more_news":"Lire plus de nouvelles","recent_news":"Dernières nouvelles","students_to_contact":"Étudiants à contacter","students_waiting":"Étudiants en attente","suggestion_more_info":"Plus d’infos","suggestions":"Conseils","the_hub":"Le Hub"},"mailbox":{"and_more":"et plus","answered":"%{name} répondu","archive":"Archives","archived":"archivé","archived_messages":"Messages archivés","autocomplete_hint":"Tapez le nom ou l’identifiant d’un étudiant","autocomplete_no_results":"Aucun resultat trouvé.","compose_message":"Rédiger un message","from":"de","from_me":"de ma part","inbox":"Boîte de réception","message":"Message","message_about_question":"Ce message concerne une question sur %{name}. Vous pouvez consulter l'examen complété et corrigé <a examen href=\"%{link} \"> ici </a>.","message_archived":"Ce message a été archivé.","message_delivered":"Votre message a été livré.","message_restored":"Ce message a été restauré.","messages_to":"Messages entre vous et %{name}","messages_with":"Messages avec","name_to_name":"à","need_teacher_before_reply":"Vous avez besoin d’un nouvel enseignant avant de pouvoir répondre aux commentaires. Veuillez nous contacter pour continuer.","next_page":"Suivant","no_messages_to_display":"Aucun message à afficher","no_subject":"Pas de sujet","previous_page":"Précédent","read":"Lire","recently_viewed":"Vu récemment","reply":"Répondre","responding_to_exam":"Vous envoyez un message en réponse à une question sur l’examen %{name}.","restore":"Restaurer","send_message":"Envoyer message","send_to_teacher":"Ce message sera envoyé à votre professeur, %{name}.","sent":"Envoyé","sent_messages":"Messages envoyés","show_more":"Afficher plus","student_teacher_left":"%{name} a laissé cette remarque","subject":"Sujet","teacher_left":"Votre enseignant a laissé ce commentaire","to":"À","to_me":"pour moi","unread":"Non lus","unread_messages":"Messages non lus","you_dont_have_students":"Vous n’avez pas d’étudiants qui étudient à travers ce site. Si vous avez des étudiants « Internet » (par opposition aux étudiants par email ou par la poste), vous pourrez leur envoyer des messages ici."},"nav":{"account":"Compte","administration":"Administration","congregation":"Assemblée","course_preview":"Aperçu du cours","courses":"Cours","dashboard":"Tableau de bord","help":"Aide","home":"Accueil","logout":"Déconnexion","mailbox":"Boîte aux lettres","news":"Nouvelles","next_up":"Suivant","progress":"Progrès","student_board":"Tableau d’étudiants","students":"Mes étudiants","the_hub":"Le Hub","wbs_connect":"ÉMB Connect"},"news":{"by":"par","news":"Nouvelles de l’ÉMB","next_article":"Article suivant","previous_article":"Article précédent","written":"Écrit le"},"preferences":{"contact_preferences":"Mode de correspondance préféré","languages":"Langues","notification_connect_stats":"Je souhaite recevoir des mises à jour avec statistiques de ÉMB Connect ou d’autres campagnes dans lesquelles je suis impliqué(e).","notification_followup_request_in_nation":"Je voudrais recevoir des avis par email quand un nouvel étudiant ayant besoin du suivi dans mon pays.","notification_new_connect_student":"Je voudrais recevoir des avis par email quand de nouveaux étudiants ÉMB Connect sont prêts pour un enseignant.","notifications_general":"Je souhaite recevoir des avis divers, des mises à jour ou des offres de la part de l’ÉMB.","notify_new_mini_campaign_student":"Je souhaite recevoir des avis par email lorsque je reçois de nouveaux étudiants grâce aux campagnes que je parraine.","student_waiting_reminder":"J’aimerais recevoir des rappels par email lorsque j’ai des étudiants m’attendent.","submit":"Soumettre","updated":"Vos préférences ont été mises à jour.","yes_for_email_lesson":"Je souhaite recevoir de nouvelles leçons par email.","yes_for_exams_completed_notifications":"Je souhaite recevoir des avis par email lorsque mes étudiants terminent des examens.","yes_for_exams_graded_notifications":"Je souhaite recevoir des avis par email lorsque mes examens sont corrigés.","yes_for_messages_notifications":"Je souhaite recevoir des notifications par email lorsque mon enseignant m’envoie un message.","yes_for_messages_notificiations_from_students":"Je souhaite recevoir des avis par email lorsque mes étudiants m’envoient des messages.","yes_for_new_article_notifications":"Je souhaite recevoir des avis par email lorsqu’un nouvel article paraît sur le Hub.","yes_for_reminders_from_wbs":"Je voudrais que l’ÉMB me rappelle lorsque j'ai des devoirs non-achevés qui m’attendent.","yes_for_teach_english":"Je voudrais enseigner des étudiants anglophones.","yes_for_teach_portuguese":"Je voudrais enseigner des étudiants de langue portugaise.","yes_for_teach_spanish":"Je voudrais enseigner des étudiants de langue espagnole."},"preview":{"all_courses":"Tous les cours","preview_exam":"Voir un aperçu de l’examen"},"profile_picture":{"crop":"Recadrer","drag_and_drop":"Glissez et déposez une photo ici ou cliquer ici pour choisir une photo.","profile_picture":"Photo de profil","sending":"expédition","tip_1":"Souriez. Si vous ne souriez pas, vos messages à vos étudiants apparaîtront comme grincheux ou toujours sérieux. ","tip_2":"Utilisez une photo bien éclairée. Ne pas utiliser quelque chose de sombre et floue.","tip_3":"Utilisez une photo de vous-même (et non pas d’une équipe sportive, d’un membre de la famille, d\\un objet favori, etc.).","tips_headline":"Conseils pour la photo de profil"},"reset_password":{"change_your_password":"Changez votre mot de passe","confirm_password":"Confirmez le mot de passe","current_password":"Mot de passe actuel","error_confirm":"Veuillez confirmer votre mot de passe.","error_match":"La confirmation du mot de passe ne correspond pas au mot de passe.","new_password":"Nouveau mot de passe","password_changed":"Votre mot de passe a été changé.","submit":"Soumettre"},"review":{"completed_on":"Cet examen a été achevé le %{date}.","correct_answer":"Bonne réponse","explanation":"Explication","finished_reviewing":"Révision terminée","graded_on":"Cet examen a été corrigé le %{date}.","not_been_graded":"Cet examen n’a pas encore été corrigé.","not_your_student":"Cet étudiant est plus votre étudiant.","overview":"Aperçu","question_not_answered":"L’étudiant n’a pas répondu à cette question.","reply_to_comment":"Répondre à ce commentaire","review":"Réviser","said":"a dit","show_less":"Afficher moins","show_more":"Afficher davantage","teacher_comments":"Remarques de l’enseignant","your_answer":"Votre réponse","your_study_helper_said":"Votre enseignant a dit"},"student":{"after_complete":"Après avoir terminé votre premier examen, votre enseignant en fera la correction. Vous pourrez voir ici tous les examens corrigés.","assignments":"Devoirs","assignments_for_review":"Devoirs à réviser","being_saved":"Votre examen est en cours d’enregistrement.","certificates":"Certificats","change_answer":"Changer réponse","close":"Fermer","complete_request":"Achevez un cours et demandez un certificat à votre enseignant.","complete_to_earn":"Traitez ce cours afin de gagner ce certificat.","completed_under_50":"Vous avez terminé l’examen ! Mais, votre note était inférieure à 50 %. S’il vous plaît, révisez la leçon et essayez à nouveau.","completed_under_70":"Vous avez terminé l’examen ! Mais, votre note était de moins de 70 %. S’il vous plaît, révisez la leçon et essayez à nouveau.","congratulations":"Félicitations !","continue":"Continuer","day":"Jour","do_you_need_help":"Avez-vous besoin d'aide avec cette question ? Êtes-vous incertain(e) de la bonne manière d'y répondre ? Utilisez cet espace pour demander votre enseignant de vous aider à mieux comprendre la question.","download":"Télécharger","download_certificate":"Télécharger le certificat","earn_master_series":"Achevez tous les cours pour gagner le certificat Série du Maître.","email":"Email","exam_saved":"Votre examen a été enregistré.","false":"faux","fb_share":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=%{thumbnail}&name=Study%20the%20Bible&caption=Come%20study%20the%20Bible%20with%20World%20Bible%20School&description=I'm%20studying%20the%20Bible%20with%20World%20Bible%20School.%20You%20should%20too.%20http%3A%2F%2Fwbs.cc%2FY0J8&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","fb_share_exam":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=http:%{thumbnail}&name=%{name}&caption=%{message}&description=Here%20is%20a%20link%20you%20can%20use%20the%20preview%20the%20lesson.%20I%20hope%20you%20will!%20http://www.worldbibleschool.org/preview/%{course}/%{exam}&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","fb_share_wisdom":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=%{thumbnail}&name=%{name}&caption=%{message}&description=%{url}&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","finished_exam_share_message":"Je viens de terminer « %{name} », leçon biblique de l’École Mondiale de la Bible.","first_you_said":"Tout d’abord, vous avez dit","get_started":"Commencer","graded":"Corrigé il y a %{time}","graded_exams":"Examens corrigés","grader_commented_here":"%{name} a laissé une remarque ici","have_already_invited":"Vous avez déjà invité cet ami.","he_said":"%{name} a dit","hide_lesson":"Masquer la leçon","master_series":"Série du Maître","master_series_congratulations":"Télécharger le certificat pour la Série du Maître","master_series_info":"La Série du Maître est le nom pour l’ensemble des cours de l'École Mondiale de la Bible. Vous pouvez attribuer le certificat pour la Série du Maître à votre étudiant lorsque tous les autres cours ont été achevés.","message":"Message","message_sent":"Votre message a été envoyé. Merci de nous avoir aidé à répandre la parole.","messages":"Messages","month":"Mois","next_assignments":"Prochains devoirs","next_section":"Section suivante","next_up":"Suivant","no_graded":"Vous n’avez plus d'examens corrigés","not_yet_assigned":"Cette leçon ne vous a pas encore été attribuée.","notice_from_teacher":"Avis de votre enseignant","preview_exam_share_message":"L’École Mondiale de la Bible a des outils gratuits pour l'étude de la Bible. Regardez la leçon, « %{name} »","progress":"Progrès","read_lesson":"Lire la leçon","recent_teacher_comments":"Remarques récente de l’enseignant","review":"Révision","review_exam":"Réviser l’examen ","save":"Enregistrer","save_and_submit":"Enregistrer et soumettre","saved":"enregistré","send":"Envoyer","send_a_message":"Envoyer un message à votre professeur","send_a_message_to_wbs":"Obtenir de l'aide de l’ÉMB","share":"Partager ce site","share_again":"Partager encore","share_with_another":"Partager ce site avec un autre ami","share_with_friend":"Partagez ce site avec votre ami","show_lesson":"Afficher la leçon","submit_answers":"Soumettre ces réponses","submit_assignment":"Soumettre leçon","submit_notice":"Vous avez terminé l'examen ! Votre professeur révisera bientôt l’examen.","submit_whole_exam":"Soumettez et complétez le devoir","submitted":"Soumis","take_exam":"Passez l’examen","teacher_commented_here":"Votre enseignant a laissé une remarque ici","thanks_for_sharing":"Merci d’avoir partagé !","then_commenter_said":"Ensuite %{name} a dit","then_study_helper_said":"Ensuite, votre enseignant a dit","true":"vrai","try_again":"Réessayer","twitter_share":"https://twitter.com/intent/tweet?text=I'm%20studying%20the%20Bible%20with%20World%20Bible%20School.%20You%20should%20too.&tw_p=tweetbutton&url=http%3A%2F%2Fwbs.cc%2FduhN","twitter_share_exam":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=%{message}&tw_p=tweetbutton&url=http%3A%2F%2Fwww.worldbibleschool.org%2Fpreview%2F%{course}%2F%{exam}","twitter_share_wisdom":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=%{message}&tw_p=tweetbutton&url=%{url}","view_comments":"%{count} remarques de l’enseignant","view_recent_grades":"Voir les notes récentes","what_is_next":"Qu’est-ce qui vient ensuite?","working_on_match":"Nous essayons actuellement de vous trouver un enseignant. Le temps d’attente moyen pour avoir un enseignant est en ce moment à propos de %{time}. En attendant, vous pouvez déjà faire connaître ce site à vos amis.","year":"Année","you_have_completed":"Vous avez terminé vos examens.","you_have_completed_all":"Vous avez terminé tous les cours ÉMB.","you_said":"Vous avez dit","you_should_study":"J’étudie la Bible à l’aide de l’École Mondiale de la Bible. Vous devriez faire autant !","your_friends_email":"L’adresse email de votre ami","your_study_helper":"Enseignant","your_teacher_will_grade":"Votre enseignant corrige votre examen et vous le rendra bientôt."},"student_board":{"adopt":"Adopter étudiant %{mode}","adopt_followup":"Adopter demande","adopt_without_mode":"Adopter","all_set":"Tout est en ordre","are_you_sure_bypass_connect":"Êtes-vous sûr de vouloir envoyer cet étudiant au tableau d’étudiants général ? Ce sera permanent.","are_you_sure_email_student":"Ceci est un étudiant par email. Vous aurez à communiquer avec cet étudiant par email, corriger ses leçons manuellement, et tenir des dossiers manuellement. Êtes-vous sûr de vouloir adopter cet étudiant email ?","are_you_sure_postal_student":"ATTENTION : Ceci est un étudiant postal. Vous devez avoir des leçons imprimées de l’ÉMB achetées et prêtes à envoyer avant d’adopter cet étudiant. Êtes-vous ÉQUIPÉ pour envoyer des documents imprimés IMMÉDIATEMENT ? Pour plus d’informations, consultez la page d’aide sur l’Enseignement Postal.","are_you_sure_web_student":"Êtes-vous sûr de vouloir adopter cet étudiant ?","campaign":"Campagne","campaigns":"Campagnes","confirm_adopt":"Oui, adoptez cet étudiant","connect":"Connect","filter":"Filtre","filter_all":"Tous","filter_all_explanation":"Afficher tous les étudiants quel que soit le mode d’étude.","filter_email":"Email","filter_email_explanation":"Afficher uniquement les étudiants qui étudient par email.","filter_followup":"Suivi","filter_followup_explanation":"Afficher uniquement les demandes de suivi.","filter_postal":"Postal","filter_postal_explanation":"Afficher uniquement les étudiants qui étudient par courrier postal.","filter_show":"Afficher","filter_students":"étudiants","filter_web":"Internet","filter_web_explanation":"Afficher uniquement les étudiants qui étudient au moyen du site.","general_campaign":"publicité générale ÉMB","lessons_completed":"Leçons complétées","mode_all":"tous les modes","mode_email":"Email","mode_postal":"Courrier postal","mode_web":"le site Internet","name":"Nom","no_students_available":"Il n’y a pas d’étudiants disponibles à adopter à ce moment. Revenez bientôt pour plus d’étudiants.","problem_adopting_student":"Un problème est survenu dans l’affectation de cet étudiant. Réessayez plus tard, ou bien contacter web@ecolemondialedelabible.net.","problem_adopting_student_please":"Un problème est survenu dans l’affectation de cet étudiant. Réessayez plus tard.","problem_bypass_connect":"Un problème est survenu dans le transfert de cet étudiant au tableau d’étudiants général.","request_in_person":"A demandé une étude biblique en personne","request_introduction_to_church":"Présentation à l’Église demandée ?","requested_baptism":"Baptême demandé","return":"Retour","return_student":"Retour au tableau d'étudiants","send_to_board":"Envoyer au tableau d’étudiants","showing":"Affichage <strong class=\"showing-mode\">tous</strong> étudiants de <strong>%{campaign}</ strong>","showing_blurb":"Affichage <strong class=\"available-count\"></strong> les étudiants désireux d’apprendre par<class = forte \"showing-mode\"></ strong>.","showing_blurb_default":"Affichage <strong class=\"available-count\">%{count}</strong> les étudiants désireux d'apprendre par <strong class=\"showing-mode\">%{mode}</strong>.","showing_blurb_followup":"Affichage <strong class=\"available-count\"></strong> les étudiants en attente de suivi.","student_adopted":"Oups ! Cet étudiant a déjà été adopté par un autre enseignant. Nous avons enlevé son nom du tableau d’étudiants.","student_board":"Tableau d’étudiants","student_detail":"Détails sur l’étudiant","students_available_to_all_teachers":"Étudiants disponibles à tous les enseignants","students_on_connect_page":"Les étudiants sur cette page vous sont disponibles en raison de votre appartenance au groupe École Mondiale de la Bible.","the_way":"La voie","understands_baptism_purpose":"Comprend le but du baptême","unknown":"Inconnu","view_all":"Regarder tout","waiting":"en attente","waiting_divider":"En attente depuis %{time}","waiting_divider_less":"En attente depuis moins de %{time}","wbs":"ÉMB","would_you_like_connect":"Votre assemblée voudrait-elle recruter et enseigner des étudiants locaux ou dans une autre localité spécifique en se servant d'une campagne ÉMB ciblée? Apprenez plus sur le <a href=\"http://www.worldbibleschool.net/wbs-connect\">programme ÉMB Connect ici</a>.","you_have_more_than_five_waiting":"Vous avez plus de %{count} étudiants qui vous attendent pour corriger un devoir ou en attribuer un nouveau. Veuillez mettre ces étudiants à jour d'abord et revenir ensuite pour en adopter de nouveaux.","you_have_more_than_limit_postal":"Vous avez adopté %{count} étudiants par courrier postal dans les dernières 24 heures. Veuillez attendre un jour et réessayer.","you_have_more_than_limit_web":"Vous avez adopte %{count} étudiants par Internet dans les dernières 24 heures. Veuillez attendre un jour et réessayer.","your_recently_adopted":"Adoptés récemment","your_session_has_expired":"Votre session a expiré. Veuillez vous déconnecte et puis vous connecter à nouveau. "},"student_notice":{"explanation":"Lorsqu’il est actif, cet avis sera affiché à vos élèves web lorsqu’ils se connectent sur le site.","followup":"Suivi","notice":"Avis","off":"Désactivé","on":"Activé","student_notice":"Avis de l’étudiant","update":"Mise à jour"},"students":{"a_to_z":"A-Z (nom de famille)","add_student":"Ajouter étudiant","address":"Adresse","all":"Tous","all_students":"Tous les étudiants","assign_lessons_to":"Attribuer des leçons à %{name}","assign_to_me":"Moi","assign_to_someone_else":"Quelqu’un d\\autre","assign_to_teacher":"Enseignant","assignments":"Devoirs","by_id":"Par numéro d’identité","by_last_communication":"Par dernière communication","city":"Ville","close":"Fermer","confirm_email":"Confirmer adresse email","confirm_password":"Confirmez le mot de passe","deliver_information":"Informations de livraison","download_email_courses":"Téléchargez cours par email","email":"Email","email_download_url":"https://worldbibleschool-production.s3.amazonaws.com/World-Bible-School-Email.zip","email_is_already_taken":"Cet email est déjà pris. Contactez web@ecolemondialedelabible.net si vous avez besoin d’aide pour trouver cet étudiant.","email_taken":"Cet email est déjà pris.","export_to_csv":"Exporter au format CSV","family_name":"Nom de famille","female":"féminin","filter":"Filtre","following_exam_needs_grading":"L’examen suivant a besoin d’être corrigé","followup":"Suivi","grade":"Note","grade_exam":"Note %{name}","has_been_added":"a été enregistré","has_been_registered":"a été enregistré","help_email_taken":"Cet email est déjà pris. Contactez <a href=\\\"mailto:web@worldbibleschool.net\\\">web@worldbibleschool.net</a> si vous avez besoin d’aide pour trouver cet étudiant.","hidden_students":"Masqué","hide":"Masquer","hide_this_student":"Masquer cet étudiant","language":"Langue","last_communication":"Dernière communication","male":"masculin","my_hidden_students":"Mes étudiants cachés","name_for_certificate":"Nom pour certificat","nation":"Pays","needs_update":"a besoin de mise à jour","no_students_yet":"Vous n’avez pas encore d’étudiants. Nous devrions remédier à cela. Cliquez sur le lien Tableau d’étudiants pour voir les étudiants qui sont prêts pour un enseignant.","note_student_sent_email":"Un email contenant des renseignements de connexion a été envoyé à %{name}. La leçon d’introduction a été attribuée automatiquement à cet étudiant.","options":"Options","overview":"Aperçu","password":"Mot de passe","personal_information":"Renseignements personnels","personal_name":"Prénom","postal_students":"Etudiants postaux","preferences":"Préférences","problem_hiding":"Un problème est survenu dans le masquage de cet étudiant. Réessayez plus tard.","problem_unhiding":"Un problème est survenu dans l’affichage de cet étudiant. Réessayez plus tard.","register_a_new_student":"Enregistrer un nouvel étudiant","register_another":"Enregistrer un autre étudiant","required":"Obligatoire","search":"Rechercher vos étudiants","see_students_waiting":"En attente d’une action de ma part","send_message":"Envoyer message","show_all_students":"Afficher tous les étudiants","showing":"Affichage <strong class=\"disponible-mystudents-count\">%{count}</strong> étudiants.","sort":"Trier","sort_by_id":"ID (le plus récent en premier)","sort_by_last_comm":"dernière communication","state":"État / Province","student_detail":"Détails sur l’étudiant","student_details":"Détails sur l’étudiant","student_is_email":"%{name} étudie par email. Vous pouvez télécharger les derniers cours email <a href=\"%{link}\">ici</a>. Vous ne pouvez pas affecter les leçons de cette page. Vous pouvez, toutefois, attribuer des certificats.","student_is_postal":"%{name} étudie par courrier postal. Vous ne pouvez pas affecter des leçons ou des certificats par cette page.","student_navigation":"Navigation étudiant","students":"Mes étudiants","study_mode":"Mode d’étude","study_mode_email":"email","study_mode_postal":"courrier postal","study_mode_web":"Internet","studying_through_email":"%{name} étudie par email.","studying_through_postal":"%{name} étudie par courrier postal.","studying_through_web":"%{name} étudie par le site.","submit":"Soumettre","timeline":"Historique","unhide":"Démasquer","unhide_this_student":"Démasquer cet étudiant","update":"Mettre à jour","view_history":"Voir l’historique","view_visible_students":"voir les étudiants visibles","visible_students":"étudiants visibles","waiting":"en attente","waiting_on_assignment":"en attente d’un devoir","your_hidden_students":"Vos étudiants cachés","zip":"Code postal"},"timeline":{"last_activity":"Dernière Activité","last_login":"Dernière connexion","logged_in_na":"non applicable","note_created":"Votre note a été créée.","recent_activity":"Activité récente","statistics":"Statistique","submit":"Ajouter une remarque","timeline_for":"Historique pour"},"user":{"access_error":"Ce n’est pas à vous de mettre à jour cet étudiant.","additional_student_information":"Informations supplémentaires de l’étudiant","address_1":"Adresse ligne 1","address_2":"Adresse ligne 2","address_3":"Adresse ligne 3","administrator":"administrateur","all_assigned":"Tous les certificats disponibles ont été accordés à cet étudiant.","all_certificates_granted":"Tous les certificats disponibles ont été accordés à cet étudiant.","assignments":"Devoirs","block_quote":"Citation longue","bold":"gras","certificates":"certificats","city":"Ville","course":"Cours","decrease_indent":"Diminuer le retrait","email":"email","graduated":"Cours achevés","graduated_no":"Non","graduated_yes":"Oui\n","increase_indent":"Augmenter le retrait","insert_edit_link":"Insérer / Modifier le lien","insert_remove_bulleted_list":"Insérer / Supprimer la liste à puces","insert_remove_numbered_list":"Insérer / Supprimer liste numérotée","italic":"Italique","language":"Langue","mode_of_study":"Mode d'étude","nation":"pays","new_certificate":"Nouveau certificat","no_certificates":"Un certificat n’a pas encore été attribué à cet étudiant.","notes":"Remarques","notes_update":"Vos remarques ont été mises à jour.","pending":"en attente","personal_information":"Renseignements personnels","postal":"Postal","postal_location_information":"Renseignements postaux/géographiques","problem_assigning":"Un problème est survenu en attribuant ce devoir. Veuillez rafraîchir la page et réessayer. ","profile_information":"Renseignements personnels","send_an_email_to_teacher":"Enseignant Email","send_message":"Envoyer message","state":"État / Province","strikethrough":"Barrer","student":"étudiant","student_name":"Nom de l’étudiant","student_updated":"Cet étudiant a été mis à jour.","submit":"Soumettre","teacher":"Enseignant","timeline":"Historique","underline":"Souligner","user_type":"Type d’utilisateur","view_address":"Voir Adresse","view_all":"Regarder tout","web":"site Internet","zip":"Code postal"}},"assignment_reopened":{"assignment":"Devoir","review":"Réviser votre devoir","subject":"%{name} a été rouvert","title":"Votre professeur a rouvert un devoir pour vous."},"change_to_web":{"change_to_web":"Changer à l’Internet","change_your_password":"Créer un nouveau mot de passe pour votre compte pour commencer à étudier sur le site web.","create_my_password":"Créer mon mot de passe","description":"%{name} (%{id}) a changé son mode d’étude à l’étude par Internet. Comment aimeriez-vous procéder ?","explain_password":"Tout d’abord, créer un nouveau mot de passe. Vous allez utiliser ce mot de passe pour accéder à ce site à l’avenir.","has_been_returned":"%{name} a été renvoyé au tableau d’étudiants.","return_to_board":"Renvoyer l’étudiant au tableau","share_with_coworker":"Partager étudiant avec un collègue","short_description":"Changer à l’étude par Internet","study_through_this_site":"<p class='mbf'>Pour changer ceci, cliquez ci-dessous</p> <a href='/change_to_web/%{confirmation}' class ='button info tiny'>Je voudrais étudier à travers le site web au lieu*</a><br/> <p class='small'><em>*Veuillez noter que quelques cours ne sont pas disponibles sur le site Internet.</em></p>","subject":"L’étudiant ÉMB passe à l’étude par Internet","teach_student":"Enseigner cet(te) étudiant(e) sur le site Internet","thank_you_for_continuing":"Génial ! Merci de continuer avec %{name}.","thanks":"Vous êtes maintenant un étudiant par Internet. Merci.","update":"Mise à jour"},"check_email":{"check_your_email":"Vérifiez votre email","next_step":"Merci de votre inscription. La prochaine étape est de trouver un email de l’École Mondiale de la Bible. Cliquez sur le lien « Confirmer email » dans ce message pour obtenir vos leçons par email."},"confirmation":{"after_confirm":"Après votre confirmation, l’École Mondiale de la Bible enverra votre adresse email à un enseignant de l’ÉMB. Vous recevrez des leçons par email de la part de cet enseignant. ","change_email":"Confirmer adresse email","change_to_web":"Certains étudiants choisissent d’étudier à travers notre site Internet. La sécurité de votre email ne sera pas compromis par l\\étude sur le site Web, maintient vos leçons et informations en un seul endroit, et est généralement plus facile à utiliser que le courrier électronique. Si vous voulez passer à l’étude sur le site Internet, veuillez <a href=\"%{link}\">cliquez ici</a>.","please_confirm":"Merci de confirmer votre adresse email","subject":"École Mondiale de la Bible – Confirmez adresse email","to_confirm":"Pour confirmer votre adresse email et obtenir votre première leçon École du Monde de la Bible, s’il vous plaît cliquez sur le lien ci-dessous :"},"connect_statistics":{"active_teachers":"Enseignants actifs","followup_requests":"Demandes de suivi","new_teachers":"Nouveaux enseignants","students_active":"Étudiants actifs","students_registered":"Étudiants inscrits","subject":"Mises à jour  de la campagne ÉMB Connect","this_is_web_ads":"Ceci est une campagne de publicité web ÉMB.","title":"%{month} Mises à jour de la campagne ÉMB Connect","trend":"Tendance","url_is":"L’adresse URL de cette campagne est <strong>%{subdomain}.%{domain}</strong>"},"contact":{"contact_us":"Contactez-nous","eager_to_hear":"Nous sommes impatients d’entendre vos questions ou commentaires.","email":"Email","message":"Message","name":"Nom","problem":"Un problème est survenu dans l’envoi de votre message. Veuillez réessayer plus tard.","send":"Envoyer","subject":"Contact École Mondiale de la Bible","thank_you":"Merci !","thank_you_for_contacting":"Merci de nous avoir contactés. Nous avons reçu votre message et répondrons, généralement dans les 48 heures.","title":"École Mondiale de la Bible"},"credit_card":{"card_number":"Numéro de carte","credit_card_info":"Données de carte bancaire","cvc":"CVC","delete_this_card":"Supprimer cette carte","enter_new_card":"Entrer nouvelle carte","expiration":"Date d’expiration (MM/AA)","no_card":"Votre dossier ne contient pas d’infos sur une carte bancaire. La prochaine fois que vous employez une carte bancaire pour faire un don sur ce site, vos données de carte bancaire seront enregistrées de manière sécurisée.","submit_new_card":"Soumettre nouvelle carte","updated_successfully":"Vos données de carte bancaires ont été modifiées avec succès.","will_be_used":"Note : La carte ci-dessous sera utilisée pour vos futurs dons sur ce site."},"exam_finished":{"exam":"Examen","grade":"Corriger examen","has_finished":"%{name} a terminé un examen et est en attente d’une note et un mot d’encouragement de votre part.","subject":"%{name} a terminé un examen","title":"%{name} a terminé un examen"},"exam_graded":{"exam":"Examen","review":"Réviser votre examen ","subject":"%{name} a été corrigé","title":"Votre enseignant a fini de corriger votre examen."},"followup_adopted":{"explanation":"%{partner} a adopté %{student}. %{partner_first} gardera des notes sur ses progrès.  Vous pouvez consulter ces notes sur la page « historique » pour cet étudiant. Vous pouvez également envoyer des messages à %{partner_first} sur le site d’ÉMB.","subject":"Un collaborateur s’est chargé de votre demande de suivi.","title":"%{name} a été adopté.","view_timeline":"Consulter l’historique"},"followup_for_nation":{"explanation":"Un étudiant nommé %{student} a besoin de suivi.","subject":"Un nouvel étudiant est en attente de suivi","title":"Un nouvel étudiant de %{nation} est en attente de suivi.","view_student_board":"Voir tableau d’étudiants"},"followup_left_note":{"explanation":"%{partner} a laissé une note sur %{student}.","subject":"%{name} a laissé une note sur votre étudiant","title":"%{name} a laissé une note.","view_timeline":"Consulter l’historique"},"followup_status_update":{"explanation":"La demande de suivi de %{name} a été mise à jour et son statut actuel est « %{status} ».","subject":"%{name} a modifié un statut de suivi","title":"%{name} a modifié le statut.","view_timeline":"Consulter l’historique"},"giving":{"amount":"Montant","can_study_by":"Ces étudiants peuvent étudier par…","card":"Carte","card_number":"Numéro de carte","card_preferences":"Carte préférée","cvc":"CVC","date":"Date","description":"Description","donation":"Don","expiration_date":"Date d’expiration","expires":"Expire","give_summary":"Oui, je veux donner $ %{amount} pour trouver %{price_per} étudiants dans le pays suivant : %{location}.","help_us_find":"Aidez-nous à recruter plus d’étudiants dans le pays suivant : %{location}.","help_us_find_count":"Ceci nous aidera à trouver %{price_per} chercheurs dans le pays suivant : %{location}.","is_this_secure":"Est-ce sécurisé ?","next":"Suivant","no":"Non","now_good_time":"Est-ce un moment favorable pour vous de donner ?","only_cards_charged_here":"Remarque : Seuls les dons traités par ce site sont affichés ici. Tout don fait hors ligne ou par worldbibleschool.net ne sera pas affiché.","postal_only":"Par courrier postal uniquement","previous":"Précédent","submit_donation":"Effectuer don","thank_you_for_gift":"Nous vous remercions pour votre don généreux.","we_emailed_you_record":"Nous vous avons envoyé par email un accusé de réception.","we_will_be_charging":"Nous facturerons cette carte. Si vous voudriez changer vos préférences de carte bancaire, veuillez consulter votre %{card_link}.","web_only":"Internet uniquement","web_or_postal":"Par Internet ou par Poste","would_you_like_to_teach":"Voudriez-vous enseigner ces étudiants ?","yes":"Oui\n"},"login":{"check_your_email":"Vérifiez votre email pour de l’aide.","could_not_find_account":"Nous n’avons pas pu retrouver cette combinaison d’adresse email/mot de passe.","email":"Email","login":"Identifiant","lost_password":"J'ai oublié mon mot de passe.","or":"ou","password":"Mot de passe","problem_with_login":"Un problème est survenu qui empêcha votre connexion.","register":"Inscrivez-vous","remember_me":"Retenir ?","submit":"Se connecter"},"lost_password":{"address_not_found":"Cette adresse email n’a pas été retrouvée. Voulez-vous essayer une autre adresse email ? Ou voulez-vous <a href=\"/register\">vous inscrire</a> ?","instructions":"Soumettez votre adresse email. Nous vous ferons parvenir un lien que vous pouvez utiliser pour changer votre mot de passe.","invalid_email":"Veuillez donner une adresse email valide.","link_sent":"Un lien pour réinitialiser votre mot de passe a été envoyé à %{email}. Merci de consulter vos emails.","lost_password":"Mot de passe oublié ?","not_for_web":"Votre compte n’a pas été créé avec un mot de passe pour vous connecter au site web. Si vous souhaitez étudier à travers le site, veuillez nous contacter à l’adresse <a href=\"mailto:web@worldbibleschool.net\">web@worldbibleschool.net</a>."},"mini_campaign_statistics":{"followup_requests":"Demandes de suivi","students_active":"Étudiants actifs","students_registered":"Étudiants inscrits","subject":"Mises à jour de la campagne ÉMB Connect","title":"Mises à jour de la campagne ÉMB Connect pour le mois de %{month}","trend":"Tendance"},"nav":{"contact":"Contactez-nous","faqs":"FAQ","home":"Accueil","login":"Connexion","menu":"Menu","preview":"Aperçu","register":"Inscrivez-vous","title":"École Mondiale de la Bible","tour":"Explorer"},"new_article":{"explanation":"Cet article provient du « Hub » sur le site ÉMB.","read_more":"En savoir plus","subject":"Nouvel article d’ÉMB"},"new_certificate":{"congratulations":"Félicitations !","subject":"Vous avez gagné un certificat ÉMB !","title":"Vous avez un nouveau certificat !","you_have_earned":"Vous avez obtenu un certificat pour %{name}. Votre certificat est joint."},"new_lesson":{"enter_answers":"Fournir réponses","enter_through_website":"Fournir votre réponse à cette question au moyen du site web.","forward_to_friend":"Faire suivre cette leçon à un ami. Inscrivez-vous pour une étude biblique gratuite à %{link}.","subject":"Nouvelle leçon ÉMB : %{name}"},"new_message":{"reply":"Répondre","sent_message":"%{name} vous a envoyé un message.","subject":"%{name} vous a envoyé un message.","title":"Vous avez reçu un message sur ÉMB"},"notifier":{"call_to_action":"Cliquez sur ce bouton","call_to_action_image":"cliquez-bouton-fr.jpg","contact_teacher":"Si vous souhaitez contacter votre enseignant, vous pouvez le faire à travers la boîte aux lettres sur le site.","do_not_respond":"Prière de ne pas répondre à cet email. Si vous rencontrez des difficultés techniques, veuillez envoyer un email <a href=\"mailto:support@worldbibleschool.net\">support@ecolemondialedelabible.net</a>.","from":"École Mondiale de la Bible <nepasrepondre@ecolemondialedelabible.net>","from_support":"École Mondiale de la Bible <support@ecolemondialedelabible.net>","god_bless":"Que Dieu bénisse","logo":"email-logo-fr.png","please_log_in_to":"Veuillez vous connecter à","title":"École Mondiale de la Bible","update_contact_preferences":"mettre à jour vos préférences de contact"},"register":{"address":"Adresse","after_register_email":"Après votre inscription, nous vous enverrons un email pour confirmer votre adresse. Une fois que vous aurez confirmé l’adresse, nous la donneront à un enseignant ÉMB. Votre enseignant enverra vos leçons à votre adresse email.","after_register_postal":"Après votre inscription, nous donnerons votre adresse à un enseignant de l’École Mondiale de la Bible.  Dans 3 à 6 semaines, vous recevrez la première leçon de la part de votre enseignant.","after_register_web":"Après votre inscription, vous serez immédiatement redirigé et pourrez commencer votre première leçon. Pas d’attente sur les emails ou la configuration d’un compte.","city":"Ville","confirm_email":"Saisissez encore votre email","confirm_password":"Confirmer votre mot de passe","delivery_information":"Informations de livraison","email":"Email","email_address":"Email","family_name":"Nom de famille","first_name":"Prénom","have_slow_internet":"Avez-vous un service Internet limité ou particulièrement lent ?","how_receive_lessons":"Comment préférez-vous recevoir vos leçons ?","i_live_in":"Pays où je réside","internet_unreliable":"Accès Internet non-fiable ?","password":"Mot de passe","personal_information":"Renseignements personnels","postal":"Postal","postal_explanation":"Leçons imprimées expédiées par voie postale.","problem_internet":"Avez-vous peu de problèmes (ou aucun problème) avec votre service Internet ?","register":"Inscrivez-vous","register_as_email":"s’inscrire pour l’étude par email","register_as_postal":"s’inscrire pour l’étude par voie postale","register_with_web":"s’inscrire pour l’étude sur le site Internet","registering":"Enregistrement…","required":"Obligatoire","start_today":"Début <span>Apprendre</span> la Bible Aujourd'hui","state":"État / Province","submit":"S’inscrire","submit_email":"S’inscrire pour l’étude par email","submit_postal":"S’inscrire pour l’étude par voie postale","tagline":"S’inscrire gratuitement avec notre formulaire d’inscription sécurisé","thank_you_logged_in":"Merci pour votre inscription. Vous êtes maintenant connecté et prêt à étudier.","title":"École Mondiale de la Bible","to_get_email":"Nous partagerons votre adresse email avec un de nos enseignants.","to_get_postal":"pour obtenir vos leçons par courrier postal. Votre première leçon arrivera dans 3-6 semaines.","type_password":"Créer un mot de passe","unable_to_internet":"Êtes-vous incapable d’accéder régulièrement à Internet ?","we_recommend":"Pour la plupart des étudiants ayant accès à Internet, nous recommandons","web":"Web","web_explanation":"Apprendre en ligne ou par email.","you_can":"Vous pouvez","zip":"Code postal"},"registration_from_connect":{"email_student":"Cet étudiant s’est inscrit pour l’étude par email et est disponible pour l’affectation au tableau d’étudiants pour cette campagne.","name":"Nom","postal_student":"Cet étudiant s’est inscrit pour recevoir des leçons par courrier postal.","subject":"Nouvelle Inscription – Se connecter %{name}","title":"Nouvelle inscription de la campagne Connect %{name}","view_student_board":"Voir tableau d’étudiants","web_student":"Cet étudiant s'est inscrit pour l’étude par Internet et peut être adopté sur le tableau d’étudiants.","why":"Vous recevez cet email parce que vous êtes membre d’un groupe ÉMB Connect. D’autres membres de votre groupe reçoivent également ce message. Si l’étudiant est pas sur le tableau d’étudiants, il se peut qu\\un autre membre de votre groupe Connect l’ait déjà adopté. Si vous souhaitez ne plus recevoir ces emails, <a href=\"%{link}\">cliquez ici pour mettre à jour vos préférences de contact</a>."},"reminder":{"followup_needs_status":{"subject":"Veuillez envoyer une mise à jour de statut"},"followup_newsletter":{"subject":"Mises à jour de suivi École Mondiale de la Bible"}},"reset_password":{"instructions":"Soumettez votre nouveau mot de passe ci-dessous.","password_change":"Changement de mot de passe","please_ignore":"Si vous n’avez pas demandé un nouveau mot de passe, veuillez ignorer cet email.","reset_my_password":"Réinitialiser mon mot de passe","reset_password":"Réinitialiser votre mot de passe","subject":"École Mondiale de la Bible – Nouveau mot de passe","you_requested":"Vous avez demandé un changement de mot de passe."},"reset_password_link":{"subject":"École Mondiale de la Bible – Mot de passe réinitialisé "},"share":{"register":"S’inscrire","share":"Invitation de %{name}","subject":"Invitation de %{name}","title":"Étudiez la Bible avec École Mondiale de la Bible","to_sign_up":"Pour vous inscrire à des cours bibliques gratuits, utilisez le lien ci-dessous :"},"share_teacher":{"apply":"Postuler","background":"Vous avez été invité par %{name} pour enseigner avec %{group}. École Mondiale de la Bible est un simple ensemble d’outils pour aider les chrétiens à enseigner le monde au sujet de Jésus. Pour commencer, veuillez cliquer sur ce lien et remplir une demande.","subject":"Invitation ÉMB de %{name}"},"student_from_mini_campaign":{"email_student":"Cet étudiant s’est inscrit pour étudier par courrier postal.","name":"Nom","postal_student":"Cet étudiant s’est inscrit pour recevoir des leçons par courrier postal.","subject":"Un nouvel étudiant pour vous","title":"Vous avez un nouvel étudiant ÉMB","view_students":"Voir étudiants","web_student":"Cet étudiant s’est inscrit pour étudier par Internet.","why":"Vous recevez ce courriel parce que vous avez fait un don pour nous aider à trouver de nouveaux étudiants et vous avez accepté de les enseigner."},"teacher":{"address_cont":"Adresse (suite)","agree_1":"En tant qu’enseignant ÉMB, j’atteste que je suis membre fidèle de l’Église du Seigneur. Le Christ m’a ajouté à la famille de Dieu quand j’ai cru à son Évangile, me suis repenti de mes péchés, et étant un croyant, me suis fait baptiser pour le pardon de mes péchés.","agree_1_sub_1":"« Fidèle » veut dire que je continue de servir le Christ selon sa Parole. Mon dévouement à la manière de vie enseignée par le Christ est manifeste aux autres.","agree_2":"En tant qu'enseignant, j’accepte de soutenir l’enseignement des cours ÉMB. En enseignant, je réviserai les cours de la Série du Maître ÉMB.","agree_2_sub_1":"« Soutenir » veut dire que je crois, je pratique et j’enseigne les vérités enseignées par la Bible et donc par ÉMB.","agree_2_sub_2":"Vous pouvez postuler pour être un enseignant sans vous engager d’adopter un étudiant. De cette façon vous pouvez d’abord réviser la Série du Maître.","agree_2_sub_3":"Ou bien, vous pouvez choisir un étudiant et réviser la Série du Maître en même temps que votre étudiant. Si vous trouvez des enseignements que vous ne pouvez pas accepter, vous pouvez simplement nous en informer ; nous transférerons votre étudiant à un autre enseignant et fermerons votre compte.  ","agree_2_sub_4":"De temps en temps, ÉMB demande aux futurs enseignants d’étudier la Série du Maître comme un étudiant avant de devenir un enseignant.","agree_3":"J’emploierai le système de suivi de l’École Mondiale de la Bible.","agree_3_exp":"Votre participation en tant qu’enseignant de l’École Mondiale de la Bible est très importante pour le succès de ceux qui cherchent Dieu à travers l’étude de la Bible. Éphésiens 4.4 dit : « <i>Il y a un seul corps et un seul Esprit, comme vous avez été appelés à une seule espérance par votre vocation.</i> » Comme enseignant de l’École Mondiale de la Bible, vous pouvez aider à maintenir cet esprit d’unité en utilisant la méthode éprouvée du système de suivi de l’École Mondiale de la Bible. Ce système aide effectivement les enseignants des manières suivantes :","agree_3_sub_1":"Il aide les enseignants à éviter les arnaques et la fraude. ","agree_3_sub_2":"Il rend le suivi plus facile pour les enseignants en leur permettant de fixer leur attention sur leurs étudiants.","agree_3_sub_3":"Il permet à l’ÉMB de mesurer l’efficacité de ce système afin de l’améliorer à l’avenir.","agree_3_sub_4":"Il permet aux efforts de l’ÉMB et à vos efforts de faciliter l’intégration du nouveau chrétien dans une assemblée fidèle et édifiante.","agree_4":"Je l’ai lu et accepté l’Accord de l’Enseignant ÉMB.","agree_4_sub_1":"L’Accord de l’Enseignant ÉMB peut se trouver ici :","agree_to":"Afin de devenir un enseignant de l’École Mondiale de la Bible vous devez lire et accepter les points suivants :","birth_year":"Année de naissance","city":"Ville","congregation_city":"Ville où se trouve l’assemblée","congregation_information":"Renseignements sur l’assemblée","congregation_name":"Nom de l’assemblée","congregation_state":"État / Région / Province où se trouve l’assemblée","country":"Pays","email":"Email","english":"anglais","family_name":"Nom de famille","female":"féminin","first_name":"Prénom","gender":"Sexe","how_prefer":"Comment préférez-vous enseigner ?","i_agree":"J’accepte","internet":"Internet","intro":"Nous sommes heureux que soyez intéressé par la possibilité d’être un enseignant ÉMB. Partager la bonne nouvelle avec le monde, c’est un travail passionnant. Nous sommes impatients de vous aider à démarrer avec votre premier étudiant.","mailing_address":"Adresse postale","mailing_information":"Informations de livraison","male":"masculin","personal_information":"Renseignements personnels","phone_number":"Numéro de téléphone","portuguese":"portugais","postal":"Postal","questions_comments":"Questions / Commentaires","required":"Obligatoire","send":"Envoyer","spanish":"espagnol","state":"État / Région / Province","title":"Formulaire de demande de l’enseignant","wbs_teacher_agreement":"Accord de l’Enseignant ÉMB.","web_or_email":"Web ou email","what_languages":"En quelles langues voulez-vous enseigner ?","zip":"Code postal / Code du pays"},"thank_you_donation_mini_campaign":{"email_updates":"Par ailleurs, nous allons vous envoyer un rapport mensuel compte tenu de votre contribution. Vous saurez combien d'étudiants se sont inscrits et ceux qui sont actifs. Vous saurez même quand ces étudiants font l’objet de suivi. Gardez un œil sur cet email à venir sur le premier de chaque mois. N’oubliez pas de guetter votre boîte email au début de chaque mois.","info":"Merci d’avoir donné pour nous aider à mettre ceux qui cherchent en contacte avec la Bible.","subject":"Merci d’avoir donné","title":"Merci pour votre contribution."},"waiting_registration_from_campaign":{"next_step":"Veuillez vous connecter au site et vérifier votre tableau d’étudiants pour cette campagne. Puis, adoptez l’étudiant ou demandez à l’un de vos enseignants dans la campagne Connecte d’adopter cet étudiant.","subject":"Un étudiant inscrit par la campagne Connect est en attente","title":"Au moins un étudiant inscrit par la campagne Connect de %{name} est en attente"},"welcome":{"subject":"Bienvenue à l’École Mondiale de la Bible"},"welcome_followup":{"subject":"Félicitations Partenaire ! (ÉMB)"},"welcome_teacher":{"subject":"Bienvenue à l’École Mondiale de la Bible"},"welcome_with_password":{"account_created_for_you":"Un compte École Mondiale de la Bible a été créé pour vous. Pour étudier la Bible avec nous, connectez-vous avec cette information :","after_complete":"Après avoir terminé le premier examen, nous vous attribuerons un enseignant. Cet enseignant vous guidera à travers les cours de l’École Mondiale de la Bible.","god_bless":"Que Dieu vous bénisse !","login":"Connectez-vous","login_url":"www.ecolemondialedelabible.org/login","study_helper":"Votre enseignant est %{name}.","subject":"Bienvenue à l’École Mondiale de la Bible","url":"www.ecolemondialedelabible.org","welcome":"Bienvenue à l’École Mondiale de la Bible"}},"authlogic":{"error_messages":{"email_invalid":"devrait ressembler à une adresse électronique.","general_credentials_error":"Combinaison email / mot de passe est incorrecte","login_blank":"ne peut être vide","login_not_found":"L’adresse n'a pas été retrouvée. Êtes-vous déjà inscrit ?","no_authentication_details":"Vous n’avez pas fourni de détails pour la connexion.","password_blank":"ne peut être vide","password_invalid":"n’est pas valable"}},"date":{"abbr_day_names":["dim","lun","mar","mer","jeu","ven","sam"],"abbr_month_names":[null,"jan.","fév.","mar.","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],"day_names":["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],"formats":{"default":"%d/%m/%Y","long":"%e %B %Y","message":"%-d %b %Y","month_year":"%b %Y","only_day":"%e","short":"%e %b","year_first":"%Y-%m-%d"},"month_names":[null,"janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],"order":["day","month","year"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"environ une heure","other":"environ %{count} heures"},"about_x_months":{"one":"environ un mois","other":"environ %{count} mois"},"about_x_years":{"one":"environ un an","other":"environ %{count} ans"},"almost_x_years":{"one":"presqu’un an","other":"presque %{count} ans"},"half_a_minute":"une demi-minute","less_than_x_minutes":{"one":"moins d’une minute","other":"moins de %{count} minutes","zero":"moins d’une minute"},"less_than_x_seconds":{"one":"moins d’une seconde","other":"moins de %{count} secondes","zero":"moins d’une seconde"},"over_x_years":{"one":"plus d’un an","other":"plus de %{count} ans"},"x_days":{"one":"1 jour","other":"%{count} jours"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 mois","other":"%{count} mois"},"x_seconds":{"one":"1 seconde","other":"%{count} secondes"}},"prompts":{"day":"Jour","hour":"Heure","minute":"Minute","month":"Mois","second":"Seconde","year":"Année"}},"devise":{"confirmations":{"confirmed":"Votre compte a été confirmé avec succès.","send_instructions":"Vous allez recevoir sous quelques minutes un courriel comportant des instructions pour confirmer votre compte.","send_paranoid_instructions":"Si votre courriel existe sur notre base de données, vous recevrez sous quelques minutes un message avec des instructions pour confirmer votre compte."},"failure":{"already_authenticated":"Vous êtes déjà connecté(e).","inactive":"Votre compte n’est pas encore activé.","invalid":"Courriel ou mot de passe incorrect.","last_attempt":"Il vous reste une chance avant que votre compte soit bloqué.","locked":"Votre compte est verrouillé.","not_found_in_database":"Courriel ou mot de passe incorrect.","not_web_student_email":"<p class='login-error-postal mbl'>Vous ne parvenez pas à vous connecter au site Internet parce que vous êtes actuellement inscrit pour étudier la Bible par email.</p>","not_web_student_postal":"<p class='login-error-postal mbl'>Vous ne parvenez pas à vous connecter au site Internet parce que vous êtes actuellement inscrit pour étudier la Bible par courrier.</p>","timeout":"Votre session est périmée, veuillez vous reconnecter pour continuer.","unauthenticated":"Vous devez vous connecter ou vous enregistrer pour continuer.","unconfirmed":"Vous devez confirmer votre compte avant de continuer."},"mailer":{"confirmation_instructions":{"subject":"Instructions de confirmation"},"email_changed":{"subject":"email changé"},"password_change":{"subject":"Mot de passe changé"},"reset_password_instructions":{"subject":"Instructions pour changer le mot de passe"},"reset_password_instructions_login_failure":{"can_we_help":"Pouvons-nous aider ?","instructions":"Il semble que vous avez une difficulté de connexion. Au cas où vous avez oublié votre mot de passe, vous pouvez cliquer sur le bouton ci-dessous pour obtenir un nouveau mot de passe. Ou, si vous ne voulez pas un nouveau mot de passe, ignorez simplement cet email.","subject":"Ayant des problèmes de connexion ?"},"unlock_instructions":{"subject":"Instructions pour déverrouiller le compte"}},"omniauth_callbacks":{"failure":"Nous ne pouvons pas vous authentifier depuis %{kind} pour la raison suivante : « %{reason} ».","success":"Autorisé avec succès par votre compte %{kind}."},"passwords":{"no_token":"Vous ne pouvez pas accéder à cette page si vous n’y accédez pas depuis un courriel de réinitialisation de mot de passe. Si vous venez en effet d’un tel courriel, vérifiez que vous avez copié l’adresse URL en entier.","send_instructions":"Vous allez recevoir sous quelques minutes un courriel vous indiquant comment réinitialiser votre mot de passe.","send_paranoid_instructions":"Si votre courriel existe dans notre base de données, vous recevrez un lien vous permettant de récupérer votre mot de passe.","updated":"Votre mot de passe a été modifié avec succès. Vous êtes maintenant connecté(e).","updated_not_active":"Votre mot de passe a été modifié avec succès."},"registrations":{"destroyed":"Au revoir ! Votre compte a été annulé avec succès. Nous espérons vous revoir bientôt.","signed_up":"Bienvenue ! Vous vous êtes enregistré(e) avec succès.","signed_up_but_inactive":"Vous vous êtes enregistré(e) avec succès. Cependant, nous n’avons pas pu vous connecter car votre compte n’a pas encore été activé.","signed_up_but_locked":"Vous vous êtes enregistré(e) avec succès. Cependant, nous n’avons pas pu vous connecter car votre compte est verrouillé.","signed_up_but_unconfirmed":"Un message avec un lien de confirmation vous a été envoyé par mail. Veuillez suivre ce lien pour activer votre compte.","update_needs_confirmation":"Vous avez modifié votre compte avec succès, mais nous devons vérifier votre nouvelle adresse de courriel. Veuillez consulter vos courriels et cliquer sur le lien de confirmation pour confirmer votre nouvelle adresse.","updated":"Votre compte a été modifié avec succès."},"sessions":{"already_signed_out":"Déconnecté(e).","signed_in":"Connecté(e) avec succès.","signed_out":"Déconnecté(e) avec succès."},"unlocks":{"send_instructions":"Vous allez recevoir sous quelques minutes un courriel comportant des instructions pour déverrouiller votre compte.","send_paranoid_instructions":"Si votre courriel existe sur notre base de données, vous recevrez sous quelques minutes un message avec des instructions pour déverrouiller votre compte.","unlocked":"Votre compte a été déverrouillé avec succès. Veuillez vous connecter."}},"errors":{"connection_refused":"Oups! Échec de connexion à la Console Web middleware.\nVeuillez vous assurer qu’un serveur de développement de rails est en cours d'exécution.","format":"%{attribute} %{message}","messages":{"accepted":"doit être accepté(e)","already_confirmed":"a déjà été confirmé(e)","blank":"doit être rempli(e)","carrierwave_download_error":"n’a pas pu être téléchargé","carrierwave_integrity_error":"n’est pas d'un type de fichier autorisé","carrierwave_processing_error":"n’a pas pu être traité","confirmation":"ne concorde pas avec %{attribute}","confirmation_period_expired":"doit être confirmé(e) en %{period}, veuillez en demander un(e) autre","content_type_blacklist_error":"Vous n'êtes pas autorisé à télécharger des fichiers %{content_type}","content_type_whitelist_error":"Vous n'êtes pas autorisé à télécharger des fichiers %{content_type} ","empty":"doit être rempli(e)","equal_to":"doit être égal à %{count}","even":"doit être pair","exclusion":"n’est pas disponible","expired":"est périmé, veuillez en demander un autre","extension_blacklist_error":"Vous n'êtes pas autorisé à télécharger des fichiers %{extension}, types interdits: %{prohibited_types}","extension_whitelist_error":"Vous n’êtes pas autorisé à télécharger des fichiers %{extension} , types autorisés : %{allowed_types}","greater_than":"doit être supérieur à %{count}","greater_than_or_equal_to":"doit être supérieur ou égal à %{count}","improbable_phone":"est un numéro non valide","inclusion":"n’est pas inclus(e) dans la liste","invalid":"n’est pas valide","invalid_currency":null,"less_than":"doit être inférieur à %{count}","less_than_or_equal_to":"doit être inférieur ou égal à %{count}","max_size_error":"La taille du fichier doit être inférieure à %{max_size}","min_size_error":"La taille du fichier doit être supérieure à %{min_size}","mini_magick_processing_error":"Échec de manipuler avec MiniMagick, peut-être que ce est pas une image ? Erreur d’origine: %{e}","not_a_number":"n’est pas un nombre","not_an_integer":"doit être un nombre entier","not_found":"n’a pas été trouvé(e)","not_locked":"n’était pas verrouillé(e)","not_saved":{"one":"une erreur a empêché ce (ou cette) %{resource} d’être enregistré(e) :","other":"%{count} erreurs ont empêché ce (ou cette) %{resource} d’être enregistré(e) :"},"odd":"doit être impair","other_than":"doit être différent de %{count}","present":"doit être vide","rmagick_processing_error":"Échec de manipuler avec rmagick, peut-être que ce n’est pas une image ?","taken":"n’est pas disponible","too_long":{"one":"est trop long (pas plus d’un caractère)","other":"est trop long (pas plus de %{count} caractères)"},"too_short":{"one":"est trop court (au moins un caractère)","other":"est trop court (au moins %{count} caractères)"},"wrong_length":{"one":"ne fait pas la bonne longueur (doit comporter un seul caractère)","other":"ne fait pas la bonne longueur (doit comporter %{count} caractères)"}},"unacceptable_request":"Une version prise en charge est attendue dans l’entête « Accepter »","unavailable_session":"La séance %{id} n’est plus disponible dans la mémoire.\n\nSi, par hasard, vous avez affaire à un serveur multi-processus (comme Unicorn ou Puma) le processus auquel  \ncette demande correspond ne conserve pas %{id} en mémoire. Considérez la possibilité de changer le nombre de\nprocessus / travailleurs à un (1) ou d'utiliser un autre serveur pour le développement."},"flash":{"actions":{"create":{"notice":"%{resource_name} a été créé avec succès."},"destroy":{"alert":"%{resource_name} n’a pas pu être détruits.","notice":"%{resource_name} a été détruit avec succès."},"update":{"notice":"%{resource_name} a été mis à jour avec succès."}}},"helpers":{"page_entries_info":{"entry":{"one":"entrée","other":"entrées","zero":"entrées"},"more_pages":{"display_entries":"%{entry_name}  <b>%{first} - %{last}</b> sur <b>%{total}</b> au total"},"one_page":{"display_entries":{"one":"<b>%{count}</b> %{entry_name}","other":"<b>tous les %{count}</b> %{entry_name}","zero":"Aucun %{entry_name} trouvé"}}},"select":{"prompt":"Veuillez sélectionner"},"submit":{"create":"Créer un(e) %{model}","submit":"Enregistrer ce(tte) %{model}","update":"Modifier ce(tte) %{model}"}},"i18n":{"transliterate":{"rule":{"À":"A","Â":"A","Æ":"Ae","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Î":"I","Ï":"I","Ô":"O","Ù":"U","Û":"U","Ü":"U","à":"a","â":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","î":"i","ï":"i","ô":"o","ù":"u","û":"u","ü":"u","ÿ":"y","Œ":"Oe","œ":"oe","Ÿ":"Y"}}},"i18n_tasks":{"add_missing":{"added":{"one":"Added %{count} key","other":"Added %{count} keys"}},"cmd":{"args":{"default_text":"Default: %{value}","desc":{"confirm":"Confirmer automatiquement","data_format":"Data format: %{valid_text}.","key_pattern":"Filter by key pattern (e.g. 'common.*')","key_pattern_to_rename":"Full key (pattern) to rename. Required","locale_to_translate_from":"Locale to translate from","locales_filter":"Locale(s) to process. Special: base","missing_types":"Filter by types: %{valid}","new_key_name":"New name, interpolates original name as %{key}. Required","nostdin":"Do not read from stdin","out_format":"Output format: %{valid_text}","pattern_router":"Use pattern router: keys moved per config data.write","strict":"Avoid inferring dynamic key usages such as t(\"cats.#{cat}.name\"). Takes precedence over the config setting if set.","value":"Value. Interpolates: %{value}, %{human_key}, %{key}, %{default}, %{value_or_human_key}, %{value_or_default_or_human_key}"}},"desc":{"add_missing":"add missing keys to locale data","check_normalized":"vérifiez que toutes les données de traduction sont normalisées","config":"display i18n-tasks configuration","data":"show locale data","data_merge":"merge locale data with trees","data_remove":"remove keys present in tree from data","data_write":"replace locale data with tree","eq_base":"show translations equal to base value","find":"show where keys are used in the code","gem_path":"show path to the gem","health":"is everything OK?","irb":"start REPL session within i18n-tasks context","missing":"show missing translations","mv":"rename/merge the keys in locale data that match the given pattern","normalize":"normalize translation data: sort and move to the right files","remove_unused":"remove unused keys","rm":"remove the keys in locale data that match the given pattern","translate_missing":"translate missing keys with Google Translate","tree_convert":"convert tree between formats","tree_filter":"filter tree by key pattern","tree_merge":"merge trees","tree_mv_key":"rename/merge/remove the keys matching the given pattern","tree_rename_key":"rename tree node","tree_set_value":"set values of keys, optionally match a pattern","tree_subtract":"tree A minus the keys in tree B","tree_translate":"Google Translate a tree to root locales","unused":"show unused translations","xlsx_report":"save missing and unused translations to an Excel file"},"encourage":["Good job!","Well done!","Perfect!"],"enum_list_opt":{"invalid":"%{invalid} is not in: %{valid}."},"enum_opt":{"invalid":"%{invalid} is not one of: %{valid}."},"errors":{"invalid_format":"invalid format: %{invalid}. valid: %{valid}.","invalid_locale":"invalid locale: %{invalid}","invalid_missing_type":{"one":"invalid type: %{invalid}. valid: %{valid}.","other":"unknown types: %{invalid}. valid: %{valid}."},"pass_forest":"pass locale forest"}},"common":{"base_value":"Base Value","continue_q":"Continue?","key":"Key","locale":"Locale","n_more":"Locale%{count} more","type":"Type","value":"Value"},"data_stats":{"text":"has %{key_count} keys across %{locale_count} locales. On average, values are %{value_chars_avg} characters long, keys have %{key_segments_avg} segments, a locale has %{per_locale_avg} keys.","text_single_locale":"has %{key_count} keys in total. On average, values are %{value_chars_avg} characters long, keys have %{key_segments_avg} segments.","title":"Forest (%{locales})"},"google_translate":{"errors":{"no_api_key":"Set Google API key via GOOGLE_TRANSLATE_API_KEY environment variable or translation.api_key in config/i18n-tasks.yml. Get the key at https://code.google.com/apis/console.","no_results":"Google Translate returned no results. Make sure billing information is set at https://code.google.com/apis/console."}},"health":{"no_keys_detected":"No keys detected. Check data.read in config/i18n-tasks.yml."},"missing":{"details_title":"Value in other locales or source","none":"No translations are missing."},"remove_unused":{"confirm":{"one":"%{count} translation will be removed from %{locales}.","other":"%{count} translation will be removed from %{locales}."},"noop":"No unused keys to remove","removed":"Removed %{count} keys"},"translate_missing":{"translated":"Translated %{count} keys"},"unused":{"none":"Every translation is in use."},"usages":{"none":"No key usages found."}},"mailboxer":{"message_mailer":{"subject_new":"Mailboxer nouveau message: %{subject}\n","subject_reply":"Mailboxer new reply: %{subject}"},"notification_mailer":{"subject":"Mailboxer new notification: %{subject}"}},"nations":{"ad":"Andorre","ae":"Émirats arabes unis","af":"Afghanistan","ag":"Antigua-et-Barbuda","ai":"Anguilla","al":"Albanie","am":"Arménie","an":"Antilles néerlandaises","ao":"Angola","ar":"Argentine","as":"Samoa américaines","at":"Autriche","au":"Australie","aw":"Aruba","az":"Azerbaïdjan","ba":"Bosnie Herzégovine","bb":"Barbade","bd":"Bangladesh","be":"Belgique","bf":"Burkina Faso","bg":"Bulgarie","bh":"Bahreïn","bi":"Burundi","bj":"Bénin","bl":"Saint-Barthélemy","bm":"Bermudes","bn":"Brunei Darussalam","bo":"Bolivie","bq":"Navassa Island","br":"Brésil","bs":"Bahamas","bt":"Bhoutan","bw":"Botswana","by":"Biélorussie","bz":"Belize","ca":"Canada","cd":"Congo, La République démocratique du","cf":"République Centrafricaine","cg":"Congo, République du","ch":"Suisse","ci":"Côte d’Ivoire","ck":"Iles Cook","cl":"Chili","cm":"Cameroun","cn":"Chine","co":"Colombie","cr":"Costa Rica","cs":"Serbie et Monténégro","cu":"Cuba","cv":"Cap-Vert","cw":"Curaçao","cy":"Chypre","cz":"République Tchèque","de":"Allemagne","dj":"Djibouti","dk":"Danemark","dm":"Dominique","do":"République Dominicaine","dz":"Algérie","ec":"Equateur","ee":"Estonie","eg":"Egypte","er":"Erythrée","es":"Espagne","et":"Ethiopie","fi":"Finlande","fj":"Fidji","fm":"Micronésie, les États fédérés","fr":"France","ga":"Gabon","gb":"Royaume-Uni","gd":"Grenade","ge":"Géorgie","gh":"Ghana","gm":"Gambie","gn":"Guinée","gq":"Guinée Equatoriale","gr":"Grèce","gt":"Guatemala","gu":"Guam","gw":"Guinée-Bissau","gy":"Guyane","hk":"Hong-Kong","hn":"Honduras","hr":"Croatie","ht":"Haïti","hu":"Hongrie","id":"Indonésie","ie":"Irlande","il":"Israël","in":"Inde","iq":"Irak","ir":"Iran","is":"Islande","it":"Italie","jm":"Jamaïque","jo":"Jordanie","jp":"Japon","ke":"Kenya","kg":"Kirghizstan","kh":"Cambodge","ki":"Kiribati","km":"Comores","kn":"Saint-Kitts-et-Nevis","kp":"Corée du Nord","kr":"Corée, République de","kw":"Koweit","ky":"Îles Caïmans","kz":"Kazakhstan","la":"République démocratique populaire lao","lb":"Liban","lc":"Sainte-Lucie","li":"Liechtenstein","lk":"Sri Lanka","lr":"Libéria","ls":"Lesotho","lt":"Lituanie","lu":"Luxembourg","lv":"Lettonie","ly":"Libye","ma":"Maroc","mc":"Monaco","md":"Moldova","me":"Monténégro","mf":"Saint Martin","mg":"Madagascar","mh":"Iles Marshall","mk":"Macédoine","ml":"Mali","mm":"Myanmar","mn":"Mongolie","mo":"Macau","mp":"Îles Mariannes du Nord","mq":"Martinique","mr":"Mauritanie","ms":"Montserrat","mt":"Malte","mu":"Ile Maurice","mv":"Maldives","mw":"Malawi","mx":"Mexique","my":"Malaisie","mz":"Mozambique","na":"Namibie","nc":"Nouvelle Calédonie","ne":"Niger","ng":"Nigéria","ni":"Nicaragua","nl":"Pays-Bas","no":"Norvège","np":"Népal","nr":"Nauru","nz":"Nouvelle Zélande","om":"Oman","pa":"Panama","pe":"Pérou","pf":"Polynésie française","pg":"Papouasie Nouvelle Guinée","ph":"Philippines","pk":"Pakistan","pl":"Pologne","pr":"Porto Rico","ps":"Palestine","pt":"Portugal","pw":"Palau","py":"Paraguay","qa":"Qatar","rn":"Rapa Nui","ro":"Roumanie","ru":"Russie","rw":"Rwanda","sa":"Arabie Saoudite","sb":"Iles Salomon","sc":"Seychelles","sd":"Soudan","se":"Suède","sg":"Singapour","si":"Slovénie","sk":"Slovaquie","sl":"Sierra Leone","sm":"San Marino","sn":"Sénégal","so":"Somalie","sr":"Suriname","ss":"Sud-Soudan, la République de","st":"Sao Tomé et Principe","sv":"Le Salvador","sx":"Saint Martin","sy":"Syrie","sz":"Swaziland","tc":"Îles Turques et Caïques","td":"Tchad","tg":"Togo","th":"Thaïlande","tj":"Tadjikistan","tk":"Tokelau","tl":"Timor-Leste","tm":"Turkménistan","tn":"Tunisie","to":"Tonga","tr":"Turquie","tt":"Trinité-et-Tobago","tv":"Tuvalu","tw":"Taiwan","tz":"Tanzanie","ua":"Ukraine","ug":"Ouganda","us":"États-Unis d’Amerique","uy":"Uruguay","uz":"Ouzbékistan","vc":"Saint-Vincent-et-les Grenadines","ve":"Venezuela","vg":"Îles, Vierges britanniques","vi":"Îles, Vierges américaines","vn":"Viêt-Nam","vu":"Vanuatu","wf":"Wallis et Futuna","ws":"Samoa","xk":"Kosova","ye":"Yémen","za":"Afrique du Sud","zm":"Zambie","zw":"Zimbabwe"},"number":{"currency":{"format":{"delimiter":" ","format":"%n %u","precision":2,"separator":",","significant":false,"strip_insignificant_zeros":false,"unit":"€"}},"format":{"delimiter":" ","precision":3,"separator":",","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Milliard","million":"million","quadrillion":"million de milliards","thousand":"millier","trillion":"billion","unit":""}},"format":{"delimiter":"","precision":2,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"octet","other":"octets"},"gb":"Go","kb":"ko","mb":"Mo","tb":"To"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"ransack":{"all":"Tous","and":"et","any":"au moins un","asc":"ascendant","attribute":"attribut","combinator":"combinateur","condition":"condition","desc":"descendant","or":"ou","predicate":"prédicat","predicates":{"blank":"est vide","cont":"contient","cont_all":"contient tous","cont_any":"contient au moins un","does_not_match":"ne correspond pas","does_not_match_all":"ne correspond pas à tous","does_not_match_any":"ne correspond à aucun","end":"se termine par","end_all":"se termine par tous","end_any":"se termine par au moins un","eq":"est égal à","eq_all":"est égal à tous","eq_any":"est égal à au moins un","false":"est faux","gt":"supérieure à","gt_all":"supérieure à tous","gt_any":"supérieure à au moins un","gteq":"supérieur ou égal à","gteq_all":"supérieur ou égal à tous","gteq_any":"supérieur ou égal à au moins un","in":"dans","in_all":"en tous","in_any":"dans au moins un","lt":"inférieur à","lt_all":"inférieur à tous","lt_any":"inférieur à au moins un","lteq":"inférieur  ou égal à","lteq_all":"inférieur ou égal à tous","lteq_any":"inférieur ou égal à au moins un","matches":"correspond à","matches_all":"correspond à tous","matches_any":"correspond à au moins un","not_cont":"ne contient pas","not_cont_all":"ne contient pas tous","not_cont_any":"ne contient pas au moins un","not_end":"ne se termine pas par","not_end_all":"ne se termine pas par tous","not_end_any":"ne se termine pas avec au moins un","not_eq":"pas égal à","not_eq_all":"pas égal à tous","not_eq_any":"pas est égal à au moins un","not_in":"pas dans","not_in_all":"pas dans tous","not_in_any":"pas dans au moins un","not_null":"n’est pas nul","not_start":"ne commence pas par","not_start_all":"ne commence pas par tous","not_start_any":"ne commence pas par au moins un","null":"est nul","present":"est présent","start":"commence par","start_all":"commence par tous","start_any":"commence par au moins un","true":"est vrai"},"search":"rechercher","sort":"trier","value":"valeur"},"simple_form":{"error_notification":{"default_message":"Veuillez examiner les problèmes ci-dessous :"},"no":"Non","required":{"mark":"*","text":"Obligatoire"},"yes":"Oui"},"spree":{"date_picker":{"first_day":0}},"support":{"array":{"last_word_connector":" et ","two_words_connector":" et ","words_connector":", "}},"time":{"am":"am","formats":{"certificate":"%-d %B %Y","certificate_month":"%B","default":"%d %B %Y %Hh %Mmin %Ss","history":"%d/%b/%y","long":"%A %d %B %Y %Hh%M","medium":"%d %B, %Y","short":"%d %b %Hh%M"},"pm":"pm"},"views":{"pagination":{"first":"&laquo; Premier","last":"Dernier &raquo;","next":"Suivant &rsaquo;","previous":"&lsaquo; Précédent","truncate":"&hellip;"}}},"he":{"errors":{"messages":{"improbable_phone":"אינו תקין"}}},"hu":{"ransack":{"all":"mindegyik","and":"és","any":"bármely","asc":"növekvő","attribute":"attribute","combinator":"combinator","condition":"feltétel","desc":"csökkenő","or":"vagy","predicate":"állítás","predicates":{"blank":"üres","cont":"tartalmazza","cont_all":"mindet tartalmazza","cont_any":"bármelyiket tartalmazza","does_not_match":"nem egyezik","does_not_match_all":"nem egyezik az összessel","does_not_match_any":"nem egyezik semelyikkel","end":"így végződik","end_all":"ezekkel végződik","end_any":"bármelyikkel végződik","eq":"egyenlő","eq_all":"minddel egyenlő","eq_any":"bármelyikkel egyenlő","false":"hamis","gt":"nagyobb, mint","gt_all":"mindegyiknél nagyobb","gt_any":"bármelyiknél nagyobb","gteq":"nagyobb vagy egyenlő, mint","gteq_all":"mindegyiknél nagyobb vagy egyenlő","gteq_any":"bármelyiknél nagyobb vagy egyenlő","in":"értéke","in_all":"értéke mindegyik","in_any":"értéke bármelyik","lt":"kisebb, mint","lt_all":"mindegyiknél kisebb","lt_any":"bármelyiknél kisebb","lteq":"kisebb vagy egyenlő, mint","lteq_all":"mindegyiknél kisebb vagy egyenlő","lteq_any":"bármelyiknél kisebb vagy egyenlő","matches":"egyezik","matches_all":"minddel egyezik","matches_any":"bármelyikkel egyezik","not_cont":"nem tartalmazza","not_cont_all":"nem tartalmazza mindet","not_cont_any":"egyiket sem tartalmazza","not_end":"nem úgy végződik","not_end_all":"nem ezekkel végződik","not_end_any":"nem ezek egyikével végződik","not_eq":"nem egyenlő","not_eq_all":"nem egyenlő egyikkel sem","not_eq_any":"nem egyenlő bármelyikkel","not_in":"nem ez az értéke","not_in_all":"értéke nem ezek az elemek","not_in_any":"értéke egyik sem","not_null":"nem null","not_start":"nem így kezdődik","not_start_all":"nem ezekkel kezdődik","not_start_any":"nem ezek egyikével kezdődik","null":"null","present":"létezik","start":"így kezdődik","start_all":"ezekkel kezdődik","start_any":"bármelyikkel kezdődik","true":"igaz"},"search":"keresés","sort":"rendezés","value":"érték"}},"id":{"ransack":{"all":"semua","and":"dan","any":"apapun","asc":"ascending","attribute":"atribut","combinator":"kombinasi","condition":"kondisi","desc":"descending","or":"atau","predicate":"predikat","predicates":{"blank":"kosong","cont":"mengandung","cont_all":"mengandung semua","cont_any":"mengandung beberapa","does_not_match":"tidak mirip dengan","does_not_match_all":"tidak mirip semua dengan","does_not_match_any":"tidak mirip beberapa dengan","end":"diakhiri dengan","end_all":"diakhiri semua dengan","end_any":"diakhiri beberapa dengan","eq":"sama dengan","eq_all":"sama seluruhnya dengan","eq_any":"sama beberapa dengan","false":"bernilai salah","gt":"lebih besar daripada","gt_all":"lebih besar semua dengan","gt_any":"lebih besar beberapa dengan","gteq":"lebih besar atau sama dengan","gteq_all":"semua lebih besar atau sama dengan","gteq_any":"beberapa lebih besar atau sama dengan","in":"di","in_all":"di semua","in_any":"di beberapa","lt":"kurang dari","lt_all":"kurang seluruhnya dengan","lt_any":"kurang beberapa dengan","lteq":"kurang lebih","lteq_all":"kurang lebih semua dengan","lteq_any":"kurang lebih beberapa dengan","matches":"mirip","matches_all":"mirip semua dengan","matches_any":"mirip beberapa dengan","not_cont":"tidak mengandung","not_cont_all":"tidak mengandung semua","not_cont_any":"tidak mengandung beberapa","not_end":"tidak diakhiri dengan","not_end_all":"tidak diakhiri dengan semua","not_end_any":"tidak diakhiri dengan beberapa","not_eq":"tidak sama dengan","not_eq_all":"tidak semua seluruhnya dengan","not_eq_any":"tidak sama beberapa dengan","not_in":"tidak di","not_in_all":"tidak semua di","not_in_any":"tidak di beberapa","not_null":"tidak null","not_start":"tidak diawali dengan","not_start_all":"tidak diawali semua dengan","not_start_any":"tidak diawali beberapa dengan","null":"null","present":"ada","start":"diawali dengan","start_all":"diawali semua dengan","start_any":"diawali beberapa dengan","true":"bernilai benar"},"search":"cari","sort":"urutan","value":"data"}},"it":{"errors":{"messages":{"improbable_phone":"non è un numero valido"}},"ransack":{"all":"tutti","and":"e","any":"qualsiasi","asc":"crescente","attribute":"attributo","combinator":"combinatore","condition":"condizione","desc":"decrescente","or":"o","predicate":"predicato","predicates":{"blank":"è vuoto","cont":"contiene","cont_all":"contiene tutti","cont_any":"contiene almeno un","does_not_match":"non corrisponde","does_not_match_all":"non corrisponde con nessuno","does_not_match_any":"non corrisponde ad uno qualsiasi","end":"finisce con","end_all":"finisce con tutti","end_any":"finisce con almeno un","eq":"uguale a","eq_all":"uguale ad ognuno","eq_any":"uguale ad almeno un","false":"è falso","gt":"maggiore di","gt_all":"maggiore di tutti","gt_any":"maggiore di almeno un","gteq":"maggiore o uguale a","gteq_all":"maggiore o uguale a tutti","gteq_any":"maggiore o uguale ad almeno un","in":"in","in_all":"in tutti","in_any":"in almeno un","lt":"minore di","lt_all":"minore di tutti","lt_any":"minore di almeno un","lteq":"minore o uguale a","lteq_all":"minore o uguale a tutti","lteq_any":"minore o uguale ad almeno un","matches":"combacia con","matches_all":"combacia con tutti","matches_any":"combacia con almeno un","not_cont":"non contiene","not_cont_all":"non contiene nessuno","not_cont_any":"non contiene un qualsiasi","not_end":"non finisce con","not_end_all":"non finisce con nessuno","not_end_any":"non finisce con uno qualsiasi","not_eq":"diverso da","not_eq_all":"diverso da tutti","not_eq_any":"diverso da uno qualsiasi","not_in":"non in","not_in_all":"non in tutti","not_in_any":"non in almeno un","not_null":"non è nullo","not_start":"non inizia con","not_start_all":"non inizia con nessuno","not_start_any":"non inizia con uno qualsiasi","null":"è nullo","present":"è presente","start":"inizia con","start_all":"inizia con tutti","start_any":"inizia con almeno un","true":"è vero"},"search":"cerca","sort":"ordinamento","value":"valore"}},"ja":{"errors":{"messages":{"improbable_phone":"は正しい電話番号ではありません"}},"ransack":{"all":"全て","and":"と","any":"いずれか","asc":"昇順","attribute":"属性","combinator":"組み合わせ","condition":"状態","desc":"降順","or":"あるいは","predicate":"は以下である","predicates":{"blank":"は空である","cont":"は以下を含む","cont_all":"は以下の全てを含む","cont_any":"はいずれかを含む","does_not_match":"は以下と合致していない","does_not_match_all":"は以下の全てに合致していない","does_not_match_any":"は以下のいずれかに合致していない","end":"は以下で終わる","end_all":"は以下の全てで終わる","end_any":"は以下のいずれかで終わる","eq":"は以下と等しい","eq_all":"は以下の全てに等しい","eq_any":"は以下のいずれかに等しい","false":"偽","gt":"は以下より大きい","gt_all":"は以下の全てより大きい","gt_any":"は以下のいずれかより大きい","gteq":"は以下より大きいか等しい","gteq_all":"は以下の全てより大きいか等しい","gteq_any":"は以下のいずれかより大きいか等しい","in":"は以下の範囲内である","in_all":"は以下の全ての範囲内である","in_any":"は以下のいずれかの範囲内である","lt":"は以下よりも小さい","lt_all":"は以下の全てよりも小さい","lt_any":"は以下のいずれかより小さい","lteq":"は以下より小さいか等しい","lteq_all":"は以下の全てより小さいか等しい","lteq_any":"は以下のいずれかより小さいか等しい","matches":"は以下と合致している","matches_all":"は以下の全てと合致している","matches_any":"は以下のいずれかと合致している","not_cont":"は含まない","not_cont_all":"は以下の全てを含まない","not_cont_any":"は以下のいずれかを含まない","not_end":"は以下のどれでも終わらない","not_end_all":"は以下の全てで終わらない","not_end_any":"は以下のいずれかで終わらない","not_eq":"は以下と等しくない","not_eq_all":"は以下の全てと等しくない","not_eq_any":"は以下のいずれかに等しくない","not_in":"は以下の範囲内でない","not_in_all":"は以下の全ての範囲内","not_in_any":"は以下のいずれかの範囲内でない","not_null":"は無効ではない","not_start":"は以下で始まらない","not_start_all":"は以下の全てで始まらない","not_start_any":"は以下のいずれかで始まらない","null":"無効","present":"は存在する","start":"は以下で始まる","start_all":"は以下の全てで始まる","start_any":"は以下のどれかで始まる","true":"真"},"search":"検索","sort":"分類","value":"値"}},"km":{"errors":{"messages":{"improbable_phone":"គឺជាលេខមិនត្រឹមត្រូវ"}}},"nl":{"errors":{"messages":{"improbable_phone":"is geen geldig nummer"}},"ransack":{"all":"alle","and":"en","any":"enig","asc":"oplopend","attribute":"attribuut","combinator":"combinator","condition":"conditie","desc":"aflopend","or":"of","predicate":"eigenschap","predicates":{"blank":"is afwezig","cont":"bevat","cont_all":"bevat alle","cont_any":"bevat enig","does_not_match":"evenaart niet","does_not_match_all":"evenaart niet voor alle","does_not_match_any":"evenaart niet voor enig","end":"eindigt met","end_all":"eindigt met alle","end_any":"eindigt met enig","eq":"gelijk","eq_all":"gelijk alle","eq_any":"gelijk enig","false":"is niet waar","gt":"groter dan","gt_all":"groter dan alle","gt_any":"groter dan enig","gteq":"groter dan of gelijk aan","gteq_all":"groter dan of gelijk aan alle","gteq_any":"groter dan of gelijk aan enig","in":"in","in_all":"in alle","in_any":"in enig","lt":"kleiner dan","lt_all":"kleiner dan alle","lt_any":"kleiner dan enig","lteq":"kleiner dan of gelijk aan","lteq_all":"kleiner dan of gelijk aan alle","lteq_any":"kleiner dan of gelijk aan enig","matches":"evenaart","matches_all":"evenaart alle","matches_any":"evenaart enig","not_cont":"bevat niet","not_cont_all":"bevat niet alle","not_cont_any":"bevat niet enig","not_end":"eindigt niet met","not_end_all":"eindigt niet met alle","not_end_any":"eindigt niet met enig","not_eq":"niet gelijk aan","not_eq_all":"niet gelijk aan alle","not_eq_any":"niet gelijk aan enig","not_in":"niet in","not_in_all":"niet in alle","not_in_any":"niet in enig","not_null":"is niet null","not_start":"start niet met","not_start_all":"start niet met alle","not_start_any":"start niet met enig","null":"is null","present":"is aanwezig","start":"start met","start_all":"start met alle","start_any":"start met enig","true":"is waar"},"search":"zoeken","sort":"sorteren","value":"waarde"}},"pl":{"activemodel":{"errors":{"messages":{"email_address_not_routable":"jest nieosiągalny","invalid_email_address":"nieprawidłowy adres e-mail"}}},"activerecord":{"errors":{"messages":{"email_address_not_routable":"jest nieosiągalny","invalid_email_address":"nieprawidłowy adres e-mail"}}}},"pt":{"activemodel":{"errors":{"messages":{"email_address_not_routable":"não é encaminhável","invalid_email_address":"não parece ser um endereço de e-mail válido"}}},"activerecord":{"attributes":{"student":{"address1":null}},"errors":{"messages":{"accepted":"deve ser aceito","blank":"não pode ficar em branco","confirmation":"não está de acordo com a confirmação","email_address_not_routable":"não é encaminhável","empty":"não pode ficar vazio","equal_to":"deve ser igual a %{count}","even":"deve ser par","exclusion":"não está disponível","greater_than":"deve ser maior que %{count}","greater_than_or_equal_to":"deve ser maior ou igual a %{count}","inclusion":"não está incluído na lista","invalid":"não é válido","invalid_email_address":"não parece ser um endereço de e-mail válido","less_than":"deve ser menor que %{count}","less_than_or_equal_to":"deve ser menor ou igual a %{count}","not_a_number":"não é um número","odd":"deve ser ímpar","record_invalid":"A validação falhou: %{errors}","restrict_dependent_destroy":{"many":"Não é possível excluir o registro porque existem %{record} dependentes","one":"Não é possível excluir o registro porque existe um %{record} dependente"},"taken":"não está disponível","too_long":"é muito longo (máximo: %{count} caracteres)","too_short":"é muito curto (mínimo: %{count} caracteres)","wrong_length":"não possui o tamanho esperado (%{count} caracteres)"},"models":{"course":{"attributes":{"intro":{"one_per_locale":"Pode haver apenas 1 curso introdutório por localidade"}}},"exam":{"attributes":{"status":{"questions_must_have_valid_answers":"não pode ser publicado até que todas as perguntas passíveis de avaliação tenham respostas corretas."}}},"followup":{"attributes":{"can_share_contact":{"inclusion":"O aluno deve dar permissão explícita para compartilhar informações de contato."},"understands_purpose_of_baptism":{"inclusion":"O aluno entende o propósito do batismo?"},"wants_in_person_study":{"inclusion":"O aluno pediu um estudo pessoal?"},"wants_introduction_to_church":{"inclusion":"O aluno pediu para ser apresentado a uma igreja local?"},"wants_to_be_baptized":{"inclusion":"O aluno pediu o batismo?"}}},"message":{"attributes":{"recipients":{"too_short":"Você precisa mais de um recipiente. Se você estiver usando uma lista de alunos \"ocultos\" ou \"ativos\".  Verifique para se certificar se você realmente tem alunos \"ocultos\" ou \"ativos\"."}}},"share":{"attributes":{"message":{"spam":null}}},"student":{"attributes":{"teacher_id":{"already_adopted":"esse aluno já foi adotado","cannot_adopt":"não pode adotar este aluno","not_valid":"deve ser um professor registrado e válido"}}},"user":{"attributes":{"email":{"taken":"já en uso. Si já se-inscreveu pode <a href=\"/login\">login aqui</a>."}}}},"template":{"body":"Por favor, verifique o(s) seguinte(s) campo(s):","header":{"one":"Não foi possível gravar %{model}: 1 erro","other":"Não foi possível gravar %{model}: %{count} erros."}}}},"app":{"admin":{"account":{"address":"Endereço","city":"Cidade","email":"Email","first_name":"Primeiro Nome","last_name":"Sobrenome","mailing_address":"Endereço Postal","nation":"País","personal_information":"Informação Pessoal","phone":"Telefone","state":"Estado","update":"Atualizar","your_account":"Sua conta","zip":"Cep"},"account_nav":{"contact_information":"Informações de contato","contact_preferences":"Preferenciais de Contato","language_preferences":"Idioma Preferido","reset_password":"Redefinir a senha","student_notice":"Aviso ao Aluno"},"assign":{"assign":"Enviar","assign_certificate":"Enviar Certificado","assign_lessons_to":"Enviar exercícios","complete":"Completou","exam_completed_times":"Este exercício foi concluído <span class=\"label on\">%{number}</span> vezes","in_progress":"In Progress","master_series":"Enviar Certificado do Série Mestre","not_applicable":"N/A","problem_assigning":"Houve um problema não atribuído a este exercício. Por favor, tente novamente mais tarde.","problem_reassigning":"Houve um problema reatribuído este exercício. Por favor, tente novamente mais tarde.","reassign":"Reenviar","reassigned":"Reenviado","unassign":"Cancelar"},"assignments":{"certificate":"Certificado","certificate_down":"certificado","email_certificates":"Certificados do e-mail","grade":"Corrigir exercício","removed":"cancelada","review":"Rever exercício","sent":"enviada"},"certificates":{"delete":"Cancelar"},"characteristics":{"age":"Idade","age_baptized_without_water":"Idade \"batizado\" sem água","age_immersed":"Idade por imersão","age_sprinkled":"Idade por aspersão","age_water_poured":"Idade quando a água foi derramada sobre mim","baptized_without_water":"Eu fui batizado sem usar água.","congregation":"Congregação","congregation_city":"Cidade da congregação","congregation_name":"Nome da congregação","congregation_state":"Estado da congregação","date_of_birth":"Data de nascimento","do_you_wish_to_explain":"Você gostaria de explicar mais suas respostas?","female":"feminino","gender":"Sexo","how_close_are_you_to_god":"Quão perto você é de Deus?","i_am_changing":"Eu estou mudando","i_am_far_from_god":"Eu estou longe de Deus","i_am_lost":"Eu estou \"perdido\"","i_am_right_with_god":"Eu estou bem com Deus","i_am_very_close_to_god":"Eu estou muito perto de Deus","i_do_not_know_born_again":"Eu não sei se eu \"nasci de novo.\"","i_have_already_been_born_again":"Eu já \"nasci de novo.\"","i_have_already_been_saved":"Eu sou \"salvo\"","i_have_received_the_holy_spirit":"Eu recebi o Espírito Santo","i_want_to_find_out_about_god":"Eu quero saber sobre Deus","i_was_dipped":"I was \"baptized\" quando eu fui mergulhado sob a água.","i_was_lost_but_returned":"Eu me tornei um \"perdido,\" mas eu voltei","i_was_poured":"I was \"baptized\" quando a água foi derramada sobre mim.","i_was_sprinkled":"Eu fui batizado por aspersão","language":"Idioma","male":"masculino","marital_status":"Estado civil","my_baptism_was_for":"Meu batismo foi pela seguinte razão ou propósito...","occupation":"Ocupação","once_saved_fallen_away":"Eu me afastei, contudo, eu já fui salvo uma vez","phone":"Telefone","referred_by":"Indicado por","religion":"Religião","when_how_saved":"Quando e como você foi  \"salvo\" ou \"nasceu de novo\"","years_old":"%{age} anos"},"congregation":{"active_students":"Alunos Ativos","congregation_stats":"Estatísticas da congregação","followups":"Membros da sua congregação enviaram %{count} pedidos para acompanhamento.","member_of":"De acordo com nossos registros, você é membro da %{name} em %{city}, %{state}.","no_congregation_on_record":"Nós não temos sua congregação nos registros. Você poderia enviar-nos um email e nos informar onde você se congrega? <a href=\"mailto:ajuda@escolabiblicamundial.net\">ajuda@escolabiblicamundial.net</a>","teachers_at":"Professores da EBM em sua congregação","total_nations":"Total de Países","total_students":"Total de Alunos","you_are_first":"Você é o primeiro professor da EBM em sua congregação. Você é um pioneiro! Vamos recrutar mais professores."},"connect":{"active_student_definition":"Para alunos \"ativos\" significa que eles enviaram um teste ou mandaram uma mensagem para seu professor.","active_students":"Alunos Ativos","active_teacher_definition":"Para professores, \"ativo\" significa que eles adotaram um aluno, avaliaram uma prova ou enviaram uma mensagem a um aluno.","active_teachers":"Professores Ativos","adopted_students":"Alunos Adotados","campaign_registrations":"Inscrições da Campanha","campaign_students_taught":"Alunos Ensinados da Campanha","campaigns":"Campanhas","connect_campaign_adoptions":"Adoções da Campanha Enlace","details":"detalhes","download":"Baixar material de publicidade Enlace <a href=\"//wbsnet-production.s3.amazonaws.com/connect/Connect-Advertising-Collateral_20131002.zip\">aqui</a>. Você precisará de Adobe InDesign para editar. Ou, nos contate em <a href=\"mailto:connect@worldbibleschool.net\">connect@worldbibleschool.net</a> e você gostaria que fizéssemos pequenas costumizações para você.","graphs":"Gráficos","has_no_students_waiting":"%{name} não tem alunos esperando.","has_students_waiting":"%{name} tem %{count} alunos esperando","need_help":"Precisa de ajuda? Nos contate em <a href=\"mailto:connect@worldbibleschool.net\">connect@worldbibleschool.net</a>.","new_teachers":"Novos Professores","overview":"Visão Geral","stats_on_last_30_days":"Todas as estatísticas são baseadas nos últimos 30 dias.","stats_on_last_60_days":"Todas as estatísticas são baseadas nos últimos 60 dias.","student_overview":"Visão geral do aluno","students_taught":"Alunos Ensinados","teacher_overview":"Visão geral do professor","teachers":"Professores","timeline":"Linha do tempo","total_students":"Alunos Totais","total_teachers":"Professores Totais","waiting_on_assignment":"esperando a proxima lição","waiting_on_grade_for":"esperando correção há %{time}","waiting_students":"Alunos Esperando","wbs_connect":"Enlace EBM","wbs_connect_campaigns":"Campanha Enlace EBM","wbs_connect_dashboard":"Painel Enlace EBM"},"followup":{"ago":"atrás","attempted_contact":"Tentou contato","before_you_submit":"Antes de submeter esse aluno","cannot_complete":"Não pode completar","completed_request":"Solicitação completada","contact_fup":"Contatar parceiro de acompanhamento","contact_teacher":"Contatar professor","followup_partner":"Parceiro de Acompanhamento","followup_status":"Status do Acompanhamento","followup_unavailable":"Acompanhamento está atualmente indisponível através desse website em %{nation}. Por favor, contate <a href= \"mailto:followup@worldbibleschool.net\">followup@worldbibleschool.net</a> para ajuda de acompanhamento para este aluno.","has_been_adopted":"%{name} foi adotado(a) por %{partner}.","if_need_help":"Se você precisar de ajuda, você pode %{contact_link}.","instructions":"Instruções ou Anotações","instructions_for_instructions":"Como o aluno pode ser contatado? Você pode fornecer um número de telefone? Quando o aluno quer ser contatado? Que perguntas o aluno tem que necessitará ser respondida pessoalmente? Quais outros detalhes relevantes você pode fornecer?","is_waiting":"%{name} está esperando ser adotado(a) por um agente de acompanhamento.","label_can_share_contact":"%{name} lhe deu permissão para compartilhar sua informação de contato?","label_understands_purpose_of_baptism":"%{name} entende o propósito do batismo?","label_wants_in_person_study":"%{name} pediu um estudo bíblico pessoal?","label_wants_introduction_to_church":"%{name} pediu para ser apresentado à uma congregação local?","label_wants_to_be_baptized":"%{name} pediu batismo?","last_updated":"última atualização %{time} atrás","made_contact":"Fez contato","no":"Não","no_action_taken":"Nenhuma ação realizada","no_updates_submitted":"Nenhuma atualização foi submetida.","not_updated":"não atualizado","please_note":"Por favor, entenda que o acompanhamento não é sempre fácil. Isso é particularmente observado em países onde a comunicação ou as viagens são difícies. Por favor se prepare para ser paciente. Algumas vezes o acompanhamento pode levar semanas.","please_submit_frequently":"Por favor submeter atualização de status frequentemente. Essas atualizações de status mantém o professor envolvido. Se você precisar deixar mais detalhes, deixe uma anotação no %{timeline_link}.","request_completed":"Esta solicitação de  acompanhamento foi completada.","request_in_person":"Solicitou estudo bíblico pessoal","request_introduction_to_church":"Pediu apresentação à igreja?","request_pending":"Pedido de acompanhamento pendente","requested_baptism":"Solicitou batismo","send_partner_message":"Enviar %{parceiro} uma mensagem","status":"Status","status_instructions":"Instrução de status","status_updates":"Atualizações de status","submit_for_followup":"Submeter para acompanhamento","submit_request":"Submeter Pedido","title":"Novo pedido para acompanhamento","understands_baptism_purpose":"Entende o propósito do batismo","update_status":"Atualização de status","yes":"Sim"},"grade":{"comment":"Comentar","comments":"Comentários","complete":"Marcar como completa","confirm_reopen":"Sim, reabrir exercício","correct_answer":"Resposta correta","did_not_answer":"O aluno não respondeu esta pergunta.","exam_graded":"Foi dado o resultado ao exercício.","exam_reopened":"%{exam} foi reaberto por %{student}.","explanation":"Explicação","finalize":"Finalizar","found_in":"Encontrado em","insert_scripture":"Insira escritura","left_blank":"O aluno deixou esta pergunta em branco.","not_ready_for_grade":"Aquela lição foi reaberta ou não foi ainda enviada pelo aluno.","not_teacher":"Esse exercício só pode ser corrigido pelo professor do aluno.","overview":"Visão Geral","reopen":"Reabrir exercício","reopen_explanation":"Reabrir o exercício permitirá que o aluno mude suas respostas já submetidas anteriormente.","saved":"salvo","student_answer":"Resposta do aluno","submit":"Enviar resultado","submit_and_assign":"Enviar resultado do exercício e ver exercícios","sure_reopen":"Você tem certeza que quer reabrir esse exercício? Quando um exercício é reaberto, você não poderá revisar ou corrigir o mesmo até que o aluno o reenvie.","your_comments_for":"Últimos comentários para %{name}"},"history":{"history_for":"História para"},"hub":{"add_student":"Convidar um aluno para estudar","add_teacher":"Convidar amigo para ser professor","all_caught_up":"Parabéns! Você está em dias com os seus alunos.","contact_instructions":"Esses são alunos que não receberam nenhuma mensagem nos últimos 30 dias. Considere fazer um contato com esses alunos.","edit_notice":"Editar esse aviso","find_help":"Encontrar tutoriais em vídeo e dicas úteis em nossa <a href=\"%{help_url}\">Ajuda</a> seção. Ou, envie um e-mail para <a href=\"mailto:ajuda@escolabiblicamundial.net\">ajuda@escolabiblicamundial.net</a>.","followup_students_waiting":"Alunos do Acompanhamento Esperando","help":"Obter ajuda","more_tips":"Não pode encontrar algo? Dê uma olhada em nossa sessão de ajuda e você encontrará muitas dicas que poderão ajudá-lo.","no_student_to_contact":"Você não tem nenhum aluno do website que não tenha contatado. Quando você tiver, nós mostraremos aqui.","no_suggestions":"Você completou todas as dicas agora.","no_web_students":"Você ainda não tem alunos. Use o <a href=\"%{board_url}\">Painel de Alunos</a> para adotar seu primeiro aluno. Ou então clique no link <a href=\"%{link}\">Adicionar aluno</a> na página Meus Alunos para adicionar um aluno que você já conhece.","notice":"Aviso para seus alunos","read_more_news":"Leia mais notícias","recent_news":"Notícias Recentes","students_to_contact":"Alunos para contatar","students_waiting":"Alunos Esperando","suggestion_more_info":"mais informações","suggestions":"Dicas","the_hub":"O Centro"},"mailbox":{"and_more":"e mais","answered":"%{name} respondido","archive":"Arquivar","archived":"Arquivo","archived_messages":"Arquivar Mensagens","autocomplete_hint":"Digite o nome do aluno ou o seu número.","autocomplete_no_results":"Não foram encontrados.","compose_message":"Escrever Mensagem","from":"De","from_me":"De mim","inbox":"Caixa de Entrada","message":"Mensagem","message_about_question":"Esta mensagem é sobre %{name}. Você pode rever o resultado da tarefa concluída <a href=\"%{link}\">aqui</a>.","message_archived":"A mensagem foi arquivada.","message_delivered":"Sua mensagem foi enviada.","message_restored":"A mensagem foi restaurada.","messages_to":"Mensagens entre você e %{name}","messages_with":"Mensagens com","name_to_name":"para","need_teacher_before_reply":"Você precisa de um novo professor para poder responder a estes comentários. Favor entrar em contato conosco para poder continuar.","next_page":"Próximo","no_messages_to_display":"Não há novas mensagens","no_subject":"Sin assunto","previous_page":"Anterior","read":"Ler","recently_viewed":"Visualizado recentemente","reply":"Reponder","responding_to_exam":"Você está enviando uma mensagem em resposta a uma pergunta no seu exercício %{name}.","restore":"Restaurar","send_message":"Enviar Mensagem","send_to_teacher":"Esta mensagem será enviada para o seu professor, %{name}.","sent":"Enviadas","sent_messages":"Mensagens Enviadas","show_more":"mostrar mais","student_teacher_left":"%{name} escreveu:","subject":"Assunto","teacher_left":"Seu professor escreveu:","to":"Para","to_me":"para mim","unread":"Não lidas","unread_messages":"Mensagens não lidas","you_dont_have_students":"Você não tem alunos estudando através deste site no momento. Se você tem alunos no \"site\" (através de \"e-mail\" ou \"correios\") você poderá enviar-lhes mensagens aqui."},"nav":{"account":"Conta","administration":"Administração","congregation":"Congregação","course_preview":"Visualização do curso","courses":"Cursos","dashboard":"Painel de Controle","help":"Ajuda","home":"Início","logout":"Sair","mailbox":"Mensagens","news":"Notícias","next_up":"Próximo Passo","progress":"Progresso","student_board":"Painel","students":"Alunos","the_hub":"O Centro","wbs_connect":"Enlace EBM"},"news":{"by":"por","news":"Notícias da EBM","next_article":"Próximo artigo","previous_article":"Artigo anterior","written":"Escrito em"},"preferences":{"contact_preferences":"Preferências de contato","languages":"Idiomas","notification_connect_stats":"Eu gostaria de receber atualizações por e-mail com estatísticas do Enlace EBM ou outras campanhas às quais estou conectado.","notification_followup_request_in_nation":"Eu gostaria de receber um email avisando quando houver aluno do meu país pronto para o acompanhamento.","notification_new_connect_student":"Eu gostaria de receber notificações de email quando novos alunos do Enlace EBM estiverem prontos para ter um professor.","notifications_general":"Eu gostaria de receber notificações variado, atualizações ou ofertas da EBM.","notify_new_mini_campaign_student":"Eu gostaria de receber notificações por e-mail quando receber novos alunos de campanhas que eu patrocino.","student_waiting_reminder":"Gostaria de ser notificado por email quando eu tiver alunos me esperando.","submit":"Enviar","updated":"Suas preferências foram atualizadas.","yes_for_email_lesson":"Gostaria de receber novas lições de e-mail.","yes_for_exams_completed_notifications":"Eu gostaria de receber notificações de e-mail quando alunos terminarem suas provas.","yes_for_exams_graded_notifications":"Eu gostaria de receber notificações de e-mail com os resultados das minhas provas.","yes_for_messages_notifications":"Gostaria de receber notificações de email quando meu professor me mandar uma mensagem.","yes_for_messages_notificiations_from_students":"Gostaria de receber notificações de email quando meus alunos me mandar umas mensagens.","yes_for_new_article_notifications":"Eu gostaria de receber notificações de e-mail quando há um novo artigo da EBM.","yes_for_reminders_from_wbs":"Gostaria que a EBM me lembrasse quando eu houver lições incompletas esperando para terminar.","yes_for_teach_english":"Eu gostaria de ensinar aos alunos que falam inglês.","yes_for_teach_portuguese":"Eu gostaria de ensinar aos alunos que falam português.","yes_for_teach_spanish":"Eu gostaria de ensinar aos alunos que falam espanhol."},"preview":{"all_courses":"Todos os Cursos","preview_exam":"Visualizar exercício"},"profile_picture":{"crop":"Recortar","drag_and_drop":"Arraste e poste a foto aqui ou clique para escolher uma foto.","profile_picture":"Foto do Perfil","sending":"enviando","tip_1":"Sorria. Se você não sorrir você estará dando a ideia de que é uma pessoa mal humorada ou séria demais.","tip_2":"Não poste algo escuro ou fora de foco.","tip_3":"Use uma foto sua (não use foto de time, membro da família, objeto favorito, etc)","tips_headline":"Dicas da foto do perfil"},"reset_password":{"change_your_password":"Mudar a senha","confirm_password":"Confirmar a senha","current_password":"Senha atual","error_confirm":"Por favor, confirme sua senha.","error_match":"A confirmação não corresponde a senha.","new_password":"Nova senha","password_changed":"Sua senha foi alterada.","submit":"Enviar"},"review":{"completed_on":"Este exercício foi concluído em %{date}.","correct_answer":"Resposta correta","explanation":"Explicação","finished_reviewing":"Terminar revisão","graded_on":"O resultado deste exercício foi dado em %{date}.","not_been_graded":"Este exame ainda não foi avaliado.","not_your_student":"Este aluno já não é mais o seu aluno.","overview":"Visão Geral","question_not_answered":"A Pergunta não foi respondida.","reply_to_comment":"Responder a este comentário","review":"Rever","said":"disse","show_less":"Mostrar menos","show_more":"Mostrar mais","teacher_comments":"Comentários do professor","your_answer":"Sua resposta","your_study_helper_said":"Seu professor disse"},"student":{"after_complete":"Depois de concluir seu primeiro exercício, seu professor dará a nota. Você será capaz de ver todas as notas dos exercícios aqui.","assignments":"Exercícios","assignments_for_review":"Exercícios para rever","being_saved":"Seu exercício está sendo salvo.","certificates":"Certificados","change_answer":"Mudar resposta","close":"Fechar","complete_request":"Complete um curso e peça ao seu professor o certificado.","complete_to_earn":"Complete este curso para receber este certificado.","completed_under_50":"Você completou seu exercício! Mas, seu resultado está abaixo de 50%. Por favor, reveja a lição e tente novamente.","completed_under_70":"Você completou seu exercício! Mas, seu resultado está abaixo de 70%. Por favor, reveja a lição e tente novamente.","congratulations":"Parabéns!","continue":"Continue","day":"Dia","do_you_need_help":"Você precisa de ajuda com esta pergunta? Não tem certeza de como responder? Use este espaço para tirar dúvidas sobre esta questão com o seu auxiliar de estudos.","download":"Baixar","download_certificate":"Baixar Certificado","earn_master_series":"Complete todo o curso para ganhar o certificado Série Mestre.","email":"Email","exam_saved":"Seu exercício foi salvo.","false":"false","fb_share":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=%{thumbnail}&name=A%20Bíblia&caption=Estudar%20a%20Bíblia%20conosco&description=Eu%20estou%20estudando%20a%20Bíblia%20com%20a%20Escola%20Bíblica%20Mundial.%20Você%20deve%20estudar%20também!%20http%3A%2F%2Fwbs.cc%2Fzdfe&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","fb_share_exam":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=http:%{thumbnail}&name=%{name}&caption=%{message}&description=Aqui%20está%20um%20link%20que%20você%20pode%20usar%20para%20ver%20a%20lição.%20http://www.escolabiblicamundial.org/pt/visualizacao/%{course}/%{exam}&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","fb_share_wisdom":"https://www.facebook.com/dialog/feed?app_id=225419660933533&link=https://developers.facebook.com/docs/reference/dialogs/&picture=%{thumbnail}&name=%{name}&caption=%{message}&description=%{url}&redirect_uri=https%3A%2F%2Fwww.worldbibleschool.org/admin","finished_exam_share_message":"Eu terminei \"%{name}\" a lição bíblica da Escola Bíblica Mundial.","first_you_said":"Primeiro, você disse","get_started":"Inicie","graded":"Resultado %{time} atrás","graded_exams":"Resultados dos exercícios","grader_commented_here":"%{name} comentou aqui","have_already_invited":"Você já convidou este amigo.","he_said":"%{name} disse","hide_lesson":"Ocultar a lição","master_series":"Série Mestre","master_series_congratulations":"Baixe o certificado Série Mestre","master_series_info":"O Série Mestre é nome da coleção de todos os cursos da EBM ajuntados. Alunos são aptos para receber o certificado Série Mestre quando eles têm completo todos os estudos.","message":"Mensagem","message_sent":"Sua mensagem foi enviada. Obrigado por proclamar a Palavra!","messages":"Mensagens","month":"Mês","next_assignments":"Próximos exercícios","next_section":"Próxima seção","next_up":"Próximo Passo","no_graded":"Você não tem resultado de exercícios","not_yet_assigned":"Essa lição ainda não foi designada para você.","notice_from_teacher":"Notice from your study helper","preview_exam_share_message":"A Escola Bíblica Mundial tem ferramentas gratuitas de estudos bíblicos online. Observe a lição \"%{name}\"","progress":"Progresso","read_lesson":"Ler a lição","recent_teacher_comments":"Comentários recentes do professor","review":"Verificar","review_exam":"rever o exercício","save":"Salvar","save_and_submit":"Salvar e enviar","saved":"salvo","send":"Enviar","send_a_message":"Enviar uma mensagem para o professor","send_a_message_to_wbs":"Enviar uma mensagem à EBM","share":"Compartilhe este site","share_again":"Compartilhe novamente","share_with_another":"Compartilhe este dite com outro amigo","share_with_friend":"Compartilhe este site com um amigo","show_lesson":"Mostrar a lição","submit_answers":"Enviar essas respostas","submit_assignment":"Enviar exercício","submit_notice":"Você completou este exercício! Seu professor irá rever seu exercício em breve.","submit_whole_exam":"Submit e completar exercício","submitted":"Enviado","take_exam":"Fazer o exercício","teacher_commented_here":"Seu professor comentou aqui","thanks_for_sharing":"Obrigado por compartilhar!","then_commenter_said":"Então %{name} disse","then_study_helper_said":"Então seu professor disse","true":"true","try_again":"Tente de novo","twitter_share":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=Eu%20estou%20estudando%20a%20Bíblia%20com%20a%20Escola%20Bíblica%20Mundial.%20Você%20deve%20estudar%20também!&tw_p=tweetbutton&url=http%3A%2F%2Fwbs.cc%2FMTnS","twitter_share_exam":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=%{message}&tw_p=tweetbutton&url=http%3A%2F%2Fwww.worldbibleschool.org%2Fpreview%2F%{course}%2F%{exam}","twitter_share_wisdom":"https://twitter.com/intent/tweet?original_referer=%{referer}&text=%{message}&tw_p=tweetbutton&url=%{url}","view_comments":"%{count} teacher comments","view_recent_grades":"Vejas os resultados recentes.","what_is_next":"Qual o próximo passo?","working_on_match":"Nós estamos no processo de escolher um professor para você. O tempo de espera estimado é de aproximadamente %{time}. Enquanto você aguarda, aproveite para compartilhar esse site com seus amigos.","year":"Ano","you_have_completed":"Você completou seus exercícios.","you_have_completed_all":"Você completou todos os cursos da EBM.","you_said":"Então você disse","you_should_study":"Eu estou estudando a Bíblia com a Escola Bíblica Mundial. Você deve estudar também!","your_friends_email":"E-mail dos seus amigos","your_study_helper":"Professor","your_teacher_will_grade":"Seu professor dará o resultado do seu exercício e retornará em breve."},"student_board":{"adopt":"Adotar Aluno do modo %{mode}","adopt_followup":"Pedido de adoção","adopt_without_mode":"Adotar","all_set":"Sem Pendências","are_you_sure_bypass_connect":"Tem certeza que quer enviar esse aluno para o painel geral de alunos? Isso será definitivo.","are_you_sure_email_student":"Este é um aluno do modo e-mail. Você terá que comunicar-se com ele por e-mail, avaliar lições manualmente, além de manter registros manualmente. Tem certeza de que deseja adotar este aluno do modo e-mail?","are_you_sure_postal_student":"ATENÇÃO: Este é um aluno do modo correio. Você deverá ter imprimido as lições adquiridas da EBM e as preparado para enviar antes de adotar o aluno. Você está EQUIPADO para enviar materiais impressos IMEDIATAMENTE? Consulte a página de Ajuda sobre Ensino Postal para obter mais informações.","are_you_sure_web_student":"Tem certeza de que deseja adotar este aluno do modo web?","campaign":"Campanha","campaigns":"Campanhas","confirm_adopt":"Sim, adotar este aluno","connect":"Conectar","filter":"Filtrar","filter_all":"Todos os alunos","filter_all_explanation":"Mostrar todos os alunos independentemente do modo de estudo.","filter_email":"Alunos por e-mail","filter_email_explanation":"Mostrar somente alunos estudando através do email.","filter_followup":"Alunos do acompanhamento","filter_followup_explanation":"Mostrar somente pedidos de acompanhamento.","filter_postal":"Alunos por correio","filter_postal_explanation":"Mostrar somente alunos estudando através do correio postal.","filter_show":"Mostrar","filter_students":"alunos","filter_web":"Alunos do site","filter_web_explanation":"Mostrar somente alunos estudando através do website.","general_campaign":"publicidade geral da EBM","lessons_completed":"Exercícios concluída","mode_all":"todos os modos","mode_email":"e-mail","mode_postal":"correios","mode_web":"web","name":"Nome","no_students_available":"No momento não há alunos disponíveis para adoção. Volte em breve para verificar se há alunos.","problem_adopting_student":"Houve um problema ao adotar este aluno. Tente novamente mais tarde ou entre em contato com web@worldbibleschool.net.","problem_adopting_student_please":"Houve um problema ao adotar este aluno. Por favor, tente novamente mais tarde.","problem_bypass_connect":"Houve problema na transferência desse aluno para o painel geral de alunos.","request_in_person":"Solicitou estudo bíblico pessoal","request_introduction_to_church":"Solicitou apresentação à igreja?","requested_baptism":"Solicitou batismo","return":"Voltar","return_student":"Voltar para o painel","send_to_board":"Enviar para o painel","showing":"Mostrar <strong class=\"showing-mode\">todos</strong> alunos de <strong>%{campaign}</strong>","showing_blurb":"Mostrando <strong class=\"available-count\"></strong> alunos esperando aprender através de <strong class=\"showing-mode\"></strong>.","showing_blurb_default":"Mostrando <strong class=\"available-count\">%{count}</strong> alunos.","showing_blurb_followup":"Mostrando <strong class=\"available-count\"></strong> alunos esperando por acompanhamento.","student_adopted":"Ops! Esse aluno já foi adotado por outro professor. Já retiramos esse aluno do Painel de Alunos.","student_board":"Painel de alunos","student_detail":"Detalhe do aluno","students_available_to_all_teachers":"Aluno disponível para todos professores","students_on_connect_page":"Alunos nesta página estão disponíveis para você por causa da sua participação no grupo da Escola Bíblica Mundial.","the_way":"O Caminho","understands_baptism_purpose":"Entende o propósito do batismo","unknown":"desconhecido","view_all":"Ver todos","waiting":"esperando","waiting_divider":"Esperando mais de %{time}","waiting_divider_less":"Esperando menos de %{time}","wbs":"EBM","would_you_like_connect":"Será que sua congregação gostaria de recrutar e ensinar alunos da localidade ou em um ponto-alvo de missão usando a campanha da EBM? Saiba mais sobre o <a href=\"http://www.worldbibleschool.net/wbs-connect\">Programa EBM Enlace aqui</a>.","you_have_more_than_five_waiting":"Você tem mais de %{count} alunos esperando que você avalie uma prova ou atribua outra. Por favor, recupere o atraso com esses alunos primeiro e depois volte para adotar novos alunos.","you_have_more_than_limit_postal":"Você adotou %{count} alunos do modo correio nas últimas 24 horas. Por favor, aguarde um dia e tente novamente.","you_have_more_than_limit_web":"Você adotou %{count} alunos web nas últimas 24 horas. Por favor, aguarde um dia e tente novamente.","your_recently_adopted":"Seus recém-adotados","your_session_has_expired":"Sua sessão de login expirou. Por favor saia, em seguida, faça login novamente."},"student_notice":{"explanation":"Quando ativado, esse aviso aparecerá para seus alunos do website quando eles fizerem o login.","followup":"Acompanhamento","notice":"Aviso","off":"Desligado","on":"Ligado","student_notice":"Aviso ao Aluno","update":"Atualizar"},"students":{"a_to_z":"A-Z (sobrenome)","add_student":"Adicionar aluno","address":"Endereço","all":"Todos","all_students":"Todos alunos","assign_lessons_to":"Enviar exercícios a %{name}","assign_to_me":"Eu","assign_to_someone_else":"Outra pessoa","assign_to_teacher":"Professor","assignments":"Exercícios","by_id":"Por ID","by_last_communication":"Por última comunicação","city":"Cidade","close":"Fechar","confirm_email":"Confirme o E-mail","confirm_password":"Confirm password","deliver_information":"Informações para a entrega","download_email_courses":"Baixar cursos por e-mail","email":"E-mail","email_download_url":"https://d31u8k69oz2z0a.cloudfront.net/World-Bible-School-Email.zip","email_is_already_taken":"E-mail já existe. Contact ajuda@escolabiblicamundial.net se você precisa de ajuda encontre este aluno.","email_taken":"Este e-mail já existe.","export_to_csv":"Exportar to CSV","family_name":"Sobrenome","female":"Feminino","filter":"Filtrar","following_exam_needs_grading":"O seguinte exercício precisa ser avaliado","followup":"Acompanhamento","grade":"Corrigir","grade_exam":"Corrigir %{name}","has_been_added":"foi registrado","has_been_registered":"foi registrado","help_email_taken":"E-mail já existe. Contato <a href=\\\"mailto:ajuda@escolabiblicamundial.net\\\">ajuda@escolabiblicamundial.net</a> se você precisa de ajuda encontre este aluno.","hidden_students":"Ocultos","hide":"Ocultar","hide_this_student":"Ocultar este aluno","language":"Idioma","last_communication":"Última comunicação","male":"Masculino","my_hidden_students":"alunos ocultos","name_for_certificate":"Name for certificate","nation":"País","needs_update":"precisa ser atualizado","no_students_yet":"You do not have any students yet. We should fix that. Click the Board link to view students who are ready for a teacher.","note_student_sent_email":"Foi enviado um e-mail para %{name} com os dados de login dele(a). \"O Caminho\" foi atribuído a este(a) aluno(a) automaticamente.","options":"Opções","overview":"Informações Gerais","password":"Password","personal_information":"Informação pessoal","personal_name":"Nome","postal_students":"Alunos por correio","preferences":"Preferências","problem_hiding":"Houve um problema ocultando este aluno. Por favor, tente novamente mais tarde.","problem_unhiding":"Houve um problema exibindo este aluno. Por favor, tente novamente mais tarde.","register_a_new_student":"Registrar um novo aluno","register_another":"Registrar outro aluno","required":"Obrigatório","search":"Buscar seus alunos","see_students_waiting":"Esperando por mim","send_message":"Enviar mensagem","show_all_students":"mostrar todos os alunos","showing":"Mostrando <strong class=\"available-mystudents-count\">%{count}</strong> alunos.","sort":"Ordem","sort_by_id":"ID (mais recente)","sort_by_last_comm":"última comunicação","state":"Estado","student_detail":"Student Detail","student_details":"Dados do Aluno","student_is_email":"%{name} está estudando através de email. Você pode baixar os últimos cursos de email aqui. Você não pode enviar lições dessa página. Você pode, entretanto, enviar certificados.","student_is_postal":"%{name} está estudando através do correio postal. Você não pode enviar lições ou certificados dessa página","student_navigation":"Navegação do aluno","students":"Alunos","study_mode":"Mode de estudo","study_mode_email":"E-mail","study_mode_postal":"Correios","study_mode_web":"Site","studying_through_email":"%{name} está estudando através do email.","studying_through_postal":"%{name} está estudando através do correio postal.","studying_through_web":"%{name} está estudando através do website.","submit":"Enviar","timeline":"Linha do Tempo","unhide":"Exibir","unhide_this_student":"Exibir este aluno","update":"Atualizar","view_history":"Ver histórico","view_visible_students":"ver alunos visíveis","visible_students":"Alunos visíveis","waiting":"Esperando","waiting_on_assignment":"esperando a proxima lição","your_hidden_students":"Seus alunos ocultos","zip":"Cep"},"timeline":{"last_activity":"Última atividade","last_login":"Último login","logged_in_na":"n/a","note_created":"Sua anotação foi criada.","recent_activity":"Atividade recente","statistics":"Estatística","submit":"Salvar Anotações","timeline_for":"Linha do Tempo para"},"user":{"access_error":"Esse aluno não é seu aluno, você não pode fazer atualizações para ele.","additional_student_information":"Informação adicional do aluno","address_1":"Endereço linha 1","address_2":"Endereço linha 2","address_3":"Endereço linha 3","administrator":"administrador","all_assigned":"Todos os certificados disponíveis foram concedidos a este aluno.","all_certificates_granted":"Todos os certificados disponíveis foram concedidos a este aluno.","assignments":"Exercícios","block_quote":"Block Quote","bold":"Negrito","certificates":"Certificados","city":"Cidade","course":"Curso","decrease_indent":"Decrease Indent","email":"e-mail","graduated":"Graduado","graduated_no":"Não","graduated_yes":"Sim","increase_indent":"Increase Indent","insert_edit_link":"Inserir/Editar Link","insert_remove_bulleted_list":"Inserir/Remover lista com marcadores","insert_remove_numbered_list":"Inserir/Remover lista numerada","italic":"Itálico","language":"Idioma","mode_of_study":"Modo de estudo","nation":"país","new_certificate":"Novo certificado","no_certificates":"Ainda não foi enviado um certificado para esse aluno.","notes":"Notas","notes_update":"Sua notas foram atualizadas.","pending":"pendente","personal_information":"Informação Pessoal","postal":"correios","postal_location_information":"Endereço/Informação de localização","problem_assigning":"Houve um problema fazendo a atribuição. Por favor, recarregue a página e tente novamente.","profile_information":"Informação do Perfil","send_an_email_to_teacher":"E-mail do Professor","send_message":"Enviar mensagem","state":"Estado","strikethrough":"Strikethrough","student":"aluno","student_name":"Nome do aluno","student_updated":"O aluno fora atualizado.","submit":"Enviar","teacher":"Professor","timeline":"Linha do Tempo","underline":"Sublinhar","user_type":"tipo de usuário","view_address":"Ver Endereço","view_all":"visualizar todos","web":"website","zip":"Cep"}},"assignment_reopened":{"assignment":"Assignment","review":"Review your assignment","subject":"%{name} has been reopened","title":"Your teacher reopened an assignment for you."},"change_to_web":{"change_to_web":"Mudar para Web","change_your_password":"Crie uma nova senha para sua conta para iniciar seus estudos através do website.","create_my_password":"Crie minha senha","description":"%{name} (%{id}) mudou o modo de estudo para web. Como você gostaria de proceder?","explain_password":"Primeiro, crie uma senha nova. Você deve usar essa senha daqui por diante para fazer seu login no website.","has_been_returned":"%{name} retornou para o Painel de Alunos.","return_to_board":"Devolver aluno para o Painel","share_with_coworker":"Compartilhar aluno com parceiro","short_description":"Mude para estudo pela web","study_through_this_site":"<p class='mbf'>Para alterar isto, clique abaixo</p><a href='/change_to_web/%{confirmation}'class='button info tiny'>Eu gostaria de estudar através do site em vez disso*</a><br/><p class='small'><em>*Tenha em mente que alguns cursos não estão disponíveis através do site.</em></p>","subject":"Aluno da EBM mudando para Estudo pela Web","teach_student":"Ensinar aluno no website","thank_you_for_continuing":"Ótimo! Obrigado por continuar com %{name}.","thanks":"Agora você é um aluno de web. Obrigado.","update":"Atualizar"},"check_email":{"check_your_email":"Verifique o seu email","next_step":"Obrigado pela sua insrcrição. O proximo passo é achar um email da Escola Bíblica Mundial. Clicar no link \"Confirmar Email\" e receberá suas lições."},"confirmation":{"after_confirm":"Apos a confirmação, Escola Bíblica Mundial entregará seu email a um do ajudantes do curso. Você receberá lições via email do seu ajudante.","change_email":"Confirmar seu Email","change_to_web":"Alguns alunos escolham os estudos via o website. Estudando pelo website mantem seus estudos confidencial, mantem suas lições organizados em um só lugar, e geralmente é mais facil usar do que o email. Se você gostaria de mudar para estudar via o website, Por favor <a href=\"%{link}\">click here</a>.","please_confirm":"Por favor confirmar seu endereço de email","subject":"Escola Bíblica Mundial - Confirmar seu Email","to_confirm":"Para confirmar seu endereço de email e receber sua primerra lição da Escola Bíblica Mundial, por favor clicar no link em baixo:"},"connect_statistics":{"active_teachers":"Professores Ativos","followup_requests":"Pedidos de Acompanhamento","new_teachers":"Novos Professores","students_active":"Alunos Ativos","students_registered":"Alunos Inscritos","subject":"Estatísticas da Enlace EBM","this_is_web_ads":"Esse é uma campanha da anúncio da web.","title":"Atualizações do Enlace de %{month}","trend":"Tendência","url_is":"O URL para essa campanha é <strong>%{subdomain}.%{domain}</strong>"},"contact":{"contact_us":"Fale conosco","eager_to_hear":"Estamos ansiosos para ouvir suas perguntas e comentários.","email":"Email","message":"Mesagem","name":"Nome","problem":"Houve um problema no envio de sua mensagem. Por favor tente de novo.","send":"Enviar","subject":"Escola Bíblica Mundial Contato","thank_you":"Obrigado!","thank_you_for_contacting":"Obrigado por entrar em contato conosco. Recebemos sua mensagem e geralmente respondaremos dentro de 48 horas.We have received.","title":"Escola Bíblica Mundial"},"credit_card":{"card_number":"Número do cartão","credit_card_info":"Informações do cartão de crédito","cvc":"CVC","delete_this_card":"Deletar esse cartão","enter_new_card":"Entrar novo cartão","expiration":"Validade (MM/AA)","no_card":"Nós não temos um cartão de crédito arquivado para você. A próxima vez que você usar um cartão de crédito para fazer uma doação para esse site, as suas informações serão arquivadas com segurança e confidencialidade.","submit_new_card":"Submeter novo cartão","updated_successfully":"A atualização do seu cartão foi realizada com sucesso.","will_be_used":"Aviso: O cartão abaixo será usado para suas futuras doações através deste website."},"exam_finished":{"exam":"Exam","grade":"Corrige o exame","has_finished":"%{name} completou um exame e está esperando uma nota.","subject":"%{name} completou um exame","title":"%{name} completou um exame"},"exam_graded":{"exam":"Exame","review":"Verificar seu exame","subject":"%{name} foi corregido","title":"Seu professor já corregiu seu exame."},"followup_adopted":{"explanation":"%{partner} adotou %{student}. %{partner_first} fará notas do progresso. Você poderá visualizar essas notas na página com a linha do tempo deste aluno. Você também pode enviar mensagens para %{partner_first} através do site da EBM.","subject":"Seu pedido de acompanhamento foi adotado","title":"%{name} foi adotado(a).","view_timeline":"Visualizar linha do tempo"},"followup_for_nation":{"explanation":"Um aluno chamado %{student} está esperando acompanhamento.","subject":"Um novo aluno está pronto para acompanhamento.","title":"Um novo aluno para Acompanhamento de/o %{nation} está esperando.","view_student_board":"Ver Painel"},"followup_left_note":{"explanation":"%{partner} fez uma anotação para %{student}.","subject":"%{name} fez anotação para seu aluno","title":"%{name} fez uma anotação.","view_timeline":"Ver Linha do Tempo"},"followup_status_update":{"explanation":"%{name}‘s  solicitação de acompanhamento foi atualizada para \"%{status}\".","subject":"%{name} atualizou o status do acompanhamento para %{description}.","title":"“%{name} atualizou status.","view_timeline":"Ver Linha do Tempo"},"giving":{"amount":"Valor","can_study_by":"Esses alunos podem estudar por...","card":"Cartão","card_number":"Número do cartão","card_preferences":"cartão de preferência","cvc":"CVC","date":"Data","description":"Descrição","donation":"Doação","expiration_date":"Válido até","expires":"Validade","give_summary":"Sim, eu quero doar $%{amount} para encontrar %{price_per} alunos em %{location}.","help_us_find":"Nos ajude a encontrar mais alunos em %{location}.","help_us_find_count":"Isso nos ajudará a encontrar %{price_per} alunos em %{location}.","is_this_secure":"Isso é seguro?","next":"Próximo","no":"Não","now_good_time":"Agora é um bom momento para fazer uma doação?","only_cards_charged_here":"Aviso: Só as contribuições processadas através desse website são exibidas aqui. Doações feitas offline ou através da www.worldbibleschool.net não serão mostradas.","postal_only":"Correio Postal somente","previous":"Anterior","submit_donation":"Submeter doação","thank_you_for_gift":"Obrigado por sua generosa contribuição.","we_emailed_you_record":"Verifique se o seu e-mail um recibo de seu presente.","we_will_be_charging":"Nós estaremos cobrando desse cartão. Se você preferir trocar suas preferências de cartão, por favor, veja seu %{card_link}.","web_only":"Website somente","web_or_postal":"Website ou Postal","would_you_like_to_teach":"Você gostaria de ensinar esses alunos?","yes":"Sim"},"login":{"check_your_email":"Verifique seu email para obter ajuda.","could_not_find_account":"Não encontramos este email com esta senha.","email":"Email","login":"Login","lost_password":"Esqueci minha senha","or":"ou","password":"senha","problem_with_login":"Ouvi um erro com seu login.","register":"Registar","remember_me":"Lembre-se de mim","submit":"Login"},"lost_password":{"address_not_found":"Esse endereço de email não foi encontrado. Quer tentar outro email? Ou would quer <a href=\"/register\">register</a>?","instructions":"Digite seu endereço de email e lhe enviaremos um link que pode usar para mudar sua senha.","invalid_email":"Por favor digite um endereço de email valido.","link_sent":"Um link para mudar sua senha foi enviado para %{email}. Por favor verifique o seu email.","lost_password":"Esqueceu sua senha?","not_for_web":"Sua inscrição não foi criada com uma senha para estudar via o website. Se quiser estudar via o website, por entre em contato conosco no <a href=\"mailto:ajuda@escolabiblicamundial.net\">ajuda@escolabiblicamundial.net</a>."},"mini_campaign_statistics":{"followup_requests":"Pedidos de Acompanhamento","students_active":"Alunos Ativos","students_registered":"Alunos Inscritos","subject":"Atualizações da Campanha EBM","title":"Atualizações da Campanha %{month}","trend":"Tendência"},"nav":{"contact":"Fale Conosco","faqs":"Perguntas Frequentes","home":"Início","login":"Login","menu":"Menu","preview":"Visualização","register":"Inscrever-se","title":"Escola Bíblica Mundial","tour":"Sobre"},"new_article":{"explanation":"Esse artigo foi escrito para a EBM.","read_more":"Leia mais","subject":"Novo artigo de EBM"},"new_certificate":{"congratulations":"Parabéns!","subject":"Você mereceu o Certidão da EBM","title":"Você tem um novo Certidão!","you_have_earned":"You have earned a certificate for %{name}. O seu certidão está annexado."},"new_lesson":{"enter_answers":"Digite respostas","enter_through_website":"Digite sua resposta para esta questão através do site.","forward_to_friend":"Encaminhe essa lição para um amigo.  Se inscreva para receber um curso bíblico gratuito na %{link}.","subject":"Nova lição de WBS: %{name}"},"new_message":{"reply":"Responder","sent_message":"%{name} Lhe enviou uma mensagem.","subject":"%{name} lhe enviou uma mensagem","title":"Você recebeu uma mensagem da EBM"},"notifier":{"call_to_action":"Clique este botão aqui","call_to_action_image":"click-button-pt.jpg","contact_teacher":"Se você quiser contatar seu professor, você pode fazer isso usando a caixa de mensagem do site.","do_not_respond":"Por favor não responda a esse email. Se você estiver tendo dificuldade técnicas, por favor envie uma email para: <a href=\"mailto:ajuda@escolabiblicamundial.net\">ajuda@escolabiblicamundial.net</a>.","from":"Escola Bíblica Mundial <sem-resposta@escolabiblicamundial.net>","from_support":"Escola Bíblica Mundial <ajuda@escolabiblicamundial.net>","god_bless":"Deus abençoe","logo":"email-logo-pt.png","please_log_in_to":"Por favor faça login para","title":"Escola Bíblica Mundial","update_contact_preferences":"Atualize suas preferencias de contatos"},"register":{"address":"Endereço","after_register_email":"Depois de inscrever-se, lhe enviaremos um email para confirmar seu email. Depois de confirmar seu email, lhe daremos o email do seu ajudante. Seu ajudante no curso lhe enviará suas lições via email.","after_register_postal":"Depois de inscrever-se, daremos seu endereço a seu ajudante do curso de Escola Bíblica Mundial. Dentro de 3 a 6 semanas você receberá a primeira lição do seu ajudante.","after_register_web":"Depois de inscrever-se, você será redirecionado e pode iniciar sua primeira lição. Não precisa esperar pela inicialização do seu email ou sua inscrição.","city":"Cidade","confirm_email":"Seu email de novo","confirm_password":"Digite sua senha de novo","delivery_information":"Informação para entrega","email":"Email","email_address":"Email","family_name":"Sobre Nome","first_name":"Primeiro Nome","have_slow_internet":"Você tem Internet limitado ou muito lento?","how_receive_lessons":"Como você prefere receber suas lições?","i_live_in":"País","internet_unreliable":"Seu Internet é inconsistente?","password":"Senha","personal_information":"Informação Pessoal","postal":"Correio","postal_explanation":"Lições impressas enviadas para você.","problem_internet":"Você tem pouca ou nenhuma interrução no seu serviço de Internet?","register":"Inscreva-se","register_as_email":"registrar pelos estudos via email.","register_as_postal":"registar pelos estudos via correio","register_with_web":"regestrar nos estudos via o Website","registering":"Inscrevendo...","required":"Obrigatório","start_today":"Comece a <span>Aprender</span> a Bíblia Hoje","state":"Estado","submit":"Inscrever-se","submit_email":"Inscrever-se por email","submit_postal":"Inscrever-se pelo correio","tagline":"Inscreva-se gratuitamente através do nosso formulário seguro","thank_you_logged_in":"Obrigado; você já está registrado e ativo e está pronto para estudar.","title":"Escola Bíblica Mundial","to_get_email":"Entregaremos seu email a um dos nossos professores.","to_get_postal":"para receber suas lições via correio.  Sua primeira lição chegará em 3-6 semanas.","type_password":"Digite sua senha","unable_to_internet":"Você não tem opportunidade de acessar o Internet regularmente?","we_recommend":"Para a maioria dos alunos via acceso de Internet, recomendamos","web":"Web","web_explanation":"Estude online ou por email.","you_can":"Você pode","zip":"CEP"},"registration_from_connect":{"email_student":"Este aluno se-inscreveu para estudar via email e está desponivel no painel de alunos nesta campanha.","name":"Nome","postal_student":"Este aluno registrou para estudar via correio.","subject":"Inscrição novo - Conectar %{name}","title":"Inscrição novo de %{name} Campanha Conectar","view_student_board":"Ver Painel","web_student":"Este aluno inscreveu-se para estudar pelo site e está disponível para adoção no Painel de Alunos.","why":"Você está recebendo este e-mail porque é membro de um grupo Enlace EBM. Outros membros do seu grupo também estão recebendo este e-mail. Se o aluno não se encontra no Painel de Alunos, pode ser porque outro membro do seu grupo Enlace já o adotou. Se não quiser mais receber estes e-mails, <a href=\"%{link}\">clique aqui para atualizar suas preferências de contato</a>."},"reminder":{"followup_needs_status":{"subject":"Por favor, nos envie atualizações de status"},"followup_newsletter":{"subject":"Atualizações de Acompanhamento da Escola Bíblica Mundial"}},"reset_password":{"instructions":"Digite sua senha nova em baixo.","password_change":"Mudar Senha","please_ignore":"Se você não pediu para mudar sua senha, por favor ignore este email.","reset_my_password":"Mudar sua senha","reset_password":"Mudar sua senha","subject":"Escola Bíblica Mundial - Senha Nova","you_requested":"Você pediu para mudar sua senha."},"reset_password_link":{"subject":"Escola Bíblica Mundial - Mudar Senha"},"share":{"register":"Registar","share":"Convite de %{name}","subject":"Invitation from %{name}","title":"Aprende da Bíblia com a Escola Bíblica Mundial","to_sign_up":"Para se inscrever para receber lições gratuitas, Clicar no link em baixo:"},"share_teacher":{"apply":"Aplicar","background":"Você foi convidado por %{name} para ensinar com %{group}. A Escola Bíblica Mundial contém ferramentas simples para ajudar cristãos a contarem sobre Jesus ao mundo. Para começar, acesse este link e preencha uma inscrição.","subject":"Convite da EBM de %{name}"},"student_from_mini_campaign":{"email_student":"Esse aluno se inscreveu para estudar por email.","name":"Nome","postal_student":"Esse aluno se inscreveu para receber as lições por correio postal.","subject":"Novo Aluno para Você","title":"Você tem um novo aluno da EBM","view_students":"Ver Alunos","web_student":"Esse aluno se inscreveu para estudar pelo website.","why":"Você está recebendo esse email porque você doou para encontrar alunos e os escolheu para ensiná-los."},"teacher":{"address_cont":"Endereço (cont)","agree_1":"Na qualidade de Auxiliar de Estudos da EBM, eu concordo que sou um membro, em pleno gozo de meus direitos, da igreja do Senhor. Cristo me incluiu na família de Deus quando confiei em Seu Evangelho, arrependi-me de meus pecados, e, como fiel, recebi imersão para a eliminação dos meus pecados.","agree_1_sub_1":"\"Em pleno gozo de meus direitos\" significa que continuo seguindo a Cristo com fé. A minha dedicação ao modo de vida de Cristo é evidente a outras pessoas.","agree_2":"Na qualidade de Auxiliar de Estudos da EBM, eu concordo em permanecer em acordo básico com os cursos da EBM. Conforme leciono, farei a revisão dos cursos da Série Mestre da EBM.","agree_2_sub_1":"\"Acordo básico\" significa que eu acredito, pratico e ensino as grandes verdades ensinadas pela Bíblia e, portanto, pela EBM.","agree_2_sub_2":"Você pode se inscrever para lecionar sem se comprometer a assumir um aluno. Desta forma, você pode revisar a Série Mestre.","agree_2_sub_3":"Outra opção é escolher um aluno e revisar a Série Mestre paralelamente. Se encontrar algum material com o qual não pode concordar, pode simplesmente nos avisar e nós transferiremos o aluno e cancelaremos sua conta.","agree_2_sub_4":"De tempos em tempos, a EBM solicita que professores em potencial estudem a Série Mestre como alunos antes de se tornarem professores.","agree_3":"Eu usarei o sistema de Acompanhamento da Escola Bíblica Mundial.","agree_3_exp":"Seu envolvimento como Auxiliar de Estudos da Escola Bíblica Mundial é muito importante para ajudar com êxito aqueles que procuram Deus através do estudo da Bíblia. Efésios 4:4 diz: <i>\"Há um só corpo e um só Espírito, assim como a esperança para a qual vocês foram chamados é uma só.\"</i> Na qualidade de Auxiliar de Estudos da Escola Bíblica Mundial, você pode ajudar a manter este espírito de unidade com o método comprovado do Sistema de Acompanhamento da Escola Bíblica Mundial. Este sistema realmente ajuda os Auxiliares de Estudo das seguintes maneiras:","agree_3_sub_1":"Ajuda os Auxiliares de Estudos a evitarem golpes e fraude.","agree_3_sub_2":"Facilita o acompanhamento para os Auxiliares de Estudos, permitindo que eles se concentrem em seus parceiros de estudos.","agree_3_sub_3":"Permite que a EBM avalie a eficácia deste sistema para melhorias futuras.","agree_3_sub_4":"Permite os esforços tanto da EBM quanto seus para ajudar a garantir que o novo cristão será juntado a uma congregação fiel e encorajadora.","agree_4":"Eu li e aceito o Contrato de Professor da EBM.","agree_4_sub_1":"Você pode encontrar o Contrato de Professor da EMB aqui:","agree_to":"A fim de tornar-se um professor na Escola Bíblica Mundial, você deve ler e concordar com os pontos a seguir:","birth_year":"Ano de nascimento","city":"Cidade","congregation_city":"Cidade da Congregação","congregation_information":"Informações da Congregação","congregation_name":"Nome da Congregação","congregation_state":"Estado/Região/Província da Congregação","country":"País","email":"E-mail","english":"Inglês","family_name":"Sobrenome","female":"Mulher","first_name":"Nome","gender":"Sexo","how_prefer":"Como você prefere lecionar?","i_agree":"Concordo","internet":"Internet","intro":"Estamos contentes que você está interessado em se tornar um professor na Escola Bíblica Mundial. É um trabalho muito emocionante partilhar a Boa Nova com o mundo. Estamos ansiosos para você começar com seu primeiro aluno.","mailing_address":"Endereço para correspondência","mailing_information":"Informações para Correspondência","male":"Homem","personal_information":"Informações Pessoais","phone_number":"Telefone","portuguese":"Português","postal":"Correio","questions_comments":"Perguntas/Comentários","required":"Obrigatório","send":"Enviar","spanish":"Espanhol","state":"Estado/Região/Província","title":"Inscrição de Professor","wbs_teacher_agreement":"Contrato de Professor da EBM","web_or_email":"Web ou e-mail","what_languages":"Em quais idiomas você gostaria de lecionar?","zip":"CEP/Código Postal/Código do país"},"thank_you_donation_mini_campaign":{"email_updates":"Temos o propósito de lhe enviar um relatório mensal por sua doação. Você saberá quantos alunos se inscrever em e quais estão estudando ativamente. Você saberá também quais alunos estão sendo encaminhados para o “Acompanhamento”. Fique atento, pois, no primeiro dia de cada mês, você estará recebendo seu email informativo.","info":"Obrigado pola doação para nos ajudar a encontrar pessoas que estão buscando conhecimento bíblico.","subject":"Obrigado por contribuir","title":"Obrigado por sua contribuição."},"waiting_registration_from_campaign":{"next_step":"Efetue login no site e verifique esta campanha no seu painel de alunos. Em seguida, adote o aluno ou peça que um dos seus professores Enlace o adote.","subject":"Aluno de Enlace EBM está esperando","title":"Pelo menos um aluno do %{name} campanha está esperando. Por favor log in no website e verifique seu painel de alunos desta campanha. Depois escolha um aluno ou peça a um dos professores da Enlace EBM para escolher o aluno."},"welcome":{"subject":"Seja bem vindo à Escola Bíblica Mundial"},"welcome_followup":{"subject":"Parabéns, Parceiro! (EBM)"},"welcome_teacher":{"subject":"Seja bem vindo à Escola Bíblica Mundial"},"welcome_with_password":{"account_created_for_you":"Uma inscrição da Escola Bíblica Mundial foi criado por você. Para estudar a Bíblia conosco, faz login com estas informações:","after_complete":"Depois de completar seu primeiro exame After you complete the first exam, we will especifcaremos um ajudante de curso para lhe guir pelos cursos da Escola Bíblica Mundial.","god_bless":"Que Deus te abençoe!","login":"Login","login_url":"www.escolabibliamundial.org/login","study_helper":"O nome do seu ajudante é %{name}.","subject":"Seja bem vindo à Escola Bíblica Mundial","url":"www.escolabiblicamundial.org","welcome":"Seja bem vindo à Escola Bíblica Mundial"}},"authlogic":{"error_messages":{"email_invalid":"deve aparecer como um endereço de email.","general_credentials_error":"Email/Senha combinação não é válida","login_blank":"preenchimento obrigatório","login_not_found":"não é válido","no_authentication_details":"Você não deu detalhes para o login.","password_blank":"preenchimento obrigatório","password_invalid":"não é válido"}},"date":{"abbr_day_names":["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],"abbr_month_names":[null,"Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],"day_names":["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],"formats":{"default":"%d/%m/%Y","long":"%d de %B de %Y","message":"%d de %B de %Y","only_day":null,"short":"%d de %B","year_first":"%Y-%-d-%-m"},"month_names":[null,"Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],"order":["day","month","year"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"aproximadamente 1 hora","other":"aproximadamente %{count} horas"},"about_x_months":{"one":"aproximadamente 1 mês","other":"aproximadamente %{count} meses"},"about_x_years":{"one":"aproximadamente 1 ano","other":"aproximadamente %{count} anos"},"almost_x_years":{"one":"quase 1 ano","other":"quase %{count} anos"},"half_a_minute":"meio minuto","less_than_x_minutes":{"one":"menos de um minuto","other":"menos de %{count} minutos","zero":"menos que um minuto"},"less_than_x_seconds":{"one":"menos de 1 segundo","other":"menos de %{count} segundos","zero":"menos que 1 segundo"},"over_x_years":{"one":"mais de 1 ano","other":"mais de %{count} anos"},"x_days":{"one":"1 dia","other":"%{count} dias"},"x_minutes":{"one":"1 minuto","other":"%{count} minutos"},"x_months":{"one":"1 mês","other":"%{count} meses"},"x_seconds":{"one":"1 segundo","other":"%{count} segundos"}},"prompts":{"day":"Dia","hour":"Hora","minute":"Minuto","month":"Mês","second":"Segundo","year":"Ano"}},"devise":{"confirmations":{"confirmed":"Sua conta foi confirmada com sucesso.","send_instructions":"Você receberá um email com instruções para confirmar sua conta em alguns minutos.","send_paranoid_instructions":"Se seu endereço de email existir em nosso banco de dados, você receberá um email com instruções para confirmar sua conta em alguns minutos."},"failure":{"already_authenticated":"Você já está logado.","inactive":"Sua conta ainda não foi ativada.","invalid":"%{authentication_keys} ou senha inválida.","last_attempt":"Você tem mais uma tentativa antes de sua conta ser bloqueada.","locked":"Sua conta está bloqueada.","not_found_in_database":"%{authentication_keys} ou senha inválida.","not_web_student_email":"<p class='login-error-postal mbl'>Sua conta é uma conta de estudo por email.</p>","not_web_student_postal":"<p class='login-error-postal mbl'>Sua conta é uma conta de estudo por correio postal.</p>","timeout":"Sua sessão expirou. Por favor, faça login novamente para continuar.","unauthenticated":"Você precisa entrar ou registrar-se antes de continuar.","unconfirmed":"Você precisa confirmar seu endereço de email antes de continuar."},"mailer":{"confirmation_instructions":{"subject":"Instruções de confirmação"},"email_changed":{"subject":"Email alterado"},"password_change":{"subject":"Senha alterada"},"reset_password_instructions":{"subject":"Instruções de redefinição de senha"},"reset_password_instructions_login_failure":{"can_we_help":"Posso ajudar?","instructions":"Parece que você está tendo problemas em fazer seu login. Caso você tenha esquecido sua senha, você pode clicar no botão abaixo para obter uma nova senha. Ou, se você não quiser uma nova senha, ignore esse email.","subject":"Está tendo problemas de fazer seu login?"},"unlock_instructions":{"subject":"Instruções de desbloqueio"}},"omniauth_callbacks":{"failure":"Não foi possível autenticá-lo em %{kind} porque \"%{reason}\".","success":"Autenticado com sucesso em %{kind}."},"passwords":{"no_token":"Você não pode acessar esta página para redefinição, por favor tenha certeza de que usou a URL completa recebida.","send_instructions":"Você receberá, em breve, um email com instruções de como redefinir sua senha.","send_paranoid_instructions":"Se seu endereço de email existir em nosso banco de dados, você receberá um link de redefinição de senha em alguns minutos.","updated":"Sua senha foi atualizada com sucesso. Você agora está logado.","updated_not_active":"Sua senha foi atualizada com sucesso."},"registrations":{"destroyed":"Tchau! Sua conta foi cancelada com êxito. Esperamos ver você de novo em breve!","signed_up":"Bem-vindo! Você se registrou com êxito.","signed_up_but_inactive":"Você se registrou com êxito. Entretanto, precisa confirmar sua conta antes de fazer login.","signed_up_but_locked":"Você se registrou com sucesso. Entretando, sua conta está bloqueada, e não foi possível fazer login.","signed_up_but_unconfirmed":"Uma mensagem com um link de confirmação foi enviada para seu endereço de email. Por favor, siga o link para ativar sua conta.","update_needs_confirmation":"Você atualizou sua conta com sucesso, mas nós precisamos verificar seu endereço de email. Por favor, cheque sua caixa de entrada e siga o link recebido.","updated":"Sua conta foi atualizada com sucesso."},"sessions":{"already_signed_out":"Saiu com sucesso.","signed_in":"Logado com sucesso.","signed_out":"Saiu com sucesso."},"unlocks":{"send_instructions":"Você receberá um email com instruções para desbloquear sua conta em alguns minutos.","send_paranoid_instructions":"Se sua conta existir, você receberá um email com instruções para desbloqueá-la em alguns minutos.","unlocked":"Sua conta foi desbloqueada com sucesso. Por favor, faça login para continuar."}},"errors":{"connection_refused":"Ops! Falha na conexão com o middleware do Console da Web.\nConfirme que um servidor de desenvolvimento em Rails esteja sendo executado.","format":"%{attribute} %{message}","messages":{"accepted":"deve ser aceito","already_confirmed":"já foi confirmado, por favor faça login","blank":"não pode ficar em branco","carrierwave_download_error":"não pôde ser baixado","carrierwave_integrity_error":"não é um arquivo de tipo permitido","carrierwave_processing_error":"não foi processado corretamente","confirmation":"não está de acordo com a confirmação","confirmation_period_expired":"precisava ser confirmada em %{period}, por favor solicite um novo link","content_type_blacklist_error":null,"content_type_whitelist_error":null,"empty":"não pode ficar vazio","equal_to":"deve ser igual a %{count}","even":"deve ser par","exclusion":"não está disponível","expired":"expirou, por favor solicite uma nova","extension_blacklist_error":null,"extension_whitelist_error":null,"greater_than":"deve ser maior que %{count}","greater_than_or_equal_to":"deve ser maior ou igual a %{count}","improbable_phone":null,"inclusion":"não está incluído na lista","invalid":"não é válido","invalid_currency":null,"less_than":"deve ser menor que %{count}","less_than_or_equal_to":"deve ser menor ou igual a %{count}","max_size_error":null,"min_size_error":null,"mini_magick_processing_error":"Não foi manipulado corretamente com MiniMagick. Talvez não seja uma imagem. Erro original: %{e}","not_a_number":"não é um número","not_an_integer":"não é um número inteiro","not_found":"não encontrado","not_locked":"não está bloqueada","not_saved":{"one":"1 erro impediu que %{resource} fosse salvo(a):","other":"%{count} erros impediram que %{resource} fosse salvo(a):"},"odd":"deve ser ímpar","other_than":"deve ser diferente de %{count}","present":"deve ficar em branco","rmagick_processing_error":"Não foi manipulado corretamente com rmagick. Talvez não seja uma imagem. Erro original: %{e}","taken":"não está disponível","too_long":{"one":"é muito longo (máximo: 1 caractere)","other":"é muito longo (máximo: %{count} caracteres)"},"too_short":{"one":"é muito curto (mínimo: 1 caractere)","other":"é muito curto (mínimo: %{count} caracteres)"},"wrong_length":{"one":"tem o tamanho incorreto (deverá ter 1 caractere)","other":"tem o tamanho incorreto (deverá ter %{count} caracteres)"}},"unacceptable_request":"Espera-se uma versão compatível no título Aceitar.","unavailable_session":"A sessão %{id} não está mais disponível na memória.\n\nSe acontecer de você rodar em um servidor multiprocesso (como Unicorn ou Puma), o processo\neste hit de solicitação não armazena %{id} na memória. Considere mudar o número de\nprocessos/trabalhadores para um (1) ou usar um servidor diferente no desenvolvimento."},"flash":{"actions":{"create":{"notice":"%{resource_name} foi criado com sucesso."},"destroy":{"alert":"Não foi possível destruir %{resource_name}.","notice":"%{resource_name} foi destruído com sucesso."},"update":{"notice":"%{resource_name} foi atualizado com sucesso."}}},"helpers":{"page_entries_info":{"entry":{"one":null,"other":null,"zero":null},"more_pages":{"display_entries":"Exibindo %{entry_name} <b>%{first}&nbsp;-&nbsp;%{last}</b> de <b>%{total}</b> no total"},"one_page":{"display_entries":{"one":"Exibindo <b>1</b> %{entry_name}","other":"Exibindo <b>todos os %{count}</b> %{entry_name}","zero":"Nenhum(a) %{entry_name} encontrado(a)"}}},"select":{"prompt":"Por favor selecione"},"submit":{"create":"Criar %{model}","submit":"Salvar %{model}","update":"Atualizar %{model}"}},"i18n_tasks":{"add_missing":{"added":{"one":null,"other":null}},"cmd":{"args":{"default_text":null,"desc":{"confirm":null,"data_format":null,"key_pattern":null,"key_pattern_to_rename":null,"locale_to_translate_from":null,"locales_filter":null,"missing_types":null,"new_key_name":null,"nostdin":null,"out_format":null,"pattern_router":null,"strict":null,"value":null}},"desc":{"add_missing":null,"check_normalized":null,"config":null,"data":null,"data_merge":null,"data_remove":null,"data_write":null,"eq_base":null,"find":null,"gem_path":null,"health":null,"irb":null,"missing":null,"mv":null,"normalize":null,"remove_unused":null,"rm":null,"translate_missing":null,"tree_convert":null,"tree_filter":null,"tree_merge":null,"tree_mv_key":null,"tree_rename_key":null,"tree_set_value":null,"tree_subtract":null,"tree_translate":null,"unused":null,"xlsx_report":null},"encourage":[null,null,null],"enum_list_opt":{"invalid":null},"enum_opt":{"invalid":null},"errors":{"invalid_format":null,"invalid_locale":null,"invalid_missing_type":{"one":null,"other":null},"pass_forest":null}},"common":{"base_value":null,"continue_q":null,"key":null,"locale":null,"n_more":null,"type":null,"value":null},"data_stats":{"text":null,"text_single_locale":null,"title":null},"google_translate":{"errors":{"no_api_key":null,"no_results":null}},"health":{"no_keys_detected":null},"missing":{"details_title":null,"none":null},"remove_unused":{"confirm":{"one":null,"other":null},"noop":null,"removed":null},"translate_missing":{"translated":null},"unused":{"none":null},"usages":{"none":null}},"mailboxer":{"message_mailer":{"subject_new":null,"subject_reply":null},"notification_mailer":{"subject":null}},"nations":{"ad":"Andorra","ae":"Emirados Árabes Unidos","af":"Afeganistão","ag":"Antígua e Barbuda","ai":"Anguilla","al":"Albânia","am":"Armênia","an":"Antilhas Holandesas","ao":"Angola","ar":"Argentina","as":"Samoa Americana","at":"Austria","au":"Austrália","aw":"Aruba","az":"Azerbaijão","ba":"Bósnia e Herzegovina","bb":"Barbados","bd":"Bangladesh","be":"Bélgica","bf":"Burkina Faso","bg":"Bulgária","bh":"Bahrein","bi":"Burundi","bj":"Benin","bl":"São Bartolomeu","bm":"Bermudas","bn":"Brunei Darussalam","bo":"Bolívia","bq":"Ilha de Navassa","br":"Brasil","bs":"Bahamas","bt":"Butão","bw":"Botswana","by":"Bielorrússia","bz":"Belize","ca":"Canadá","cd":"Congo, República Democrática do","cf":"Central Africano República","cg":"Congo, República do","ch":"Suíça","ci":"Cote d'Ivoire","ck":"Ilhas Cook","cl":"Chile","cm":"Camarões","cn":"China","co":"Colômbia","cr":"Costa Rica","cs":"Sérvia e Montenegro","cu":"Cuba","cv":"Cabo Verde","cw":"Curaçao","cy":"Chipre","cz":"República Checa","de":"Alemanha","dj":"Djibouti","dk":"Dinamarca","dm":"Dominica","do":"República Dominicana","dz":"Argélia","ec":"Equador","ee":"Estônia","eg":"Egito","er":"Eritreia","es":"Espanha","et":"Etiópia","fi":"Finlândia","fj":"Fiji","fm":"Micronésia","fr":"França","ga":"Gabão","gb":"Reino Unido","gd":"Granada","ge":"Geórgia","gh":"Gana","gm":"Gâmbia","gn":"Guiné","gq":"Guiné Equatorial","gr":"Grécia","gt":"Guatemala","gu":"Guam","gw":"Guiné-Bissau","gy":"Guiana","hk":"Hong Kong","hn":"Honduras","hr":"Croácia","ht":"Haiti","hu":"Hungria","id":"Indonésia","ie":"Irlanda","il":"Israel","in":"India","iq":"Iraque","ir":"Irã","is":"Islândia","it":"Itália","jm":"Jamaica","jo":"Jordânia","jp":"Japão","ke":"Quênia","kg":"Quirguistão","kh":"Camboja","ki":"Kiribati","km":"Comores","kn":"São Cristóvão e Nevis","kp":"Coréia do Norte","kr":"Coréia, República da","kw":"Kuweit","ky":"Ilhas Cayman","kz":"Cazaquistão","la":"República Democrática Popular do Laos","lb":"Líbano","lc":"Santa Lúcia","li":"Liechtenstein","lk":"Sri Lanka","lr":"Libéria","ls":"Lesoto","lt":"Lituânia","lu":"Luxemburgo","lv":"Látvia","ly":"Líbia","ma":"Marrocos","mc":"Mônaco","md":"Moldávia","me":"Montenegro","mf":"Ilha de São Martinho","mg":"Madagáscar","mh":"Ilhas Marshall","mk":"Macedónia","ml":"Mali","mm":"Mianmar","mn":"Mongólia","mo":"Macau","mp":"Ilhas Marianas do Norte","mq":"Martinica","mr":"Mauritânia","ms":"Montserrat","mt":"Malta","mu":"Maurício","mv":"Maldivas","mw":"Malavi","mx":"México","my":"Malásia","mz":"Moçambique","na":"Namíbia","nc":"Nova Caldonia","ne":"Níger","ng":"Nigéria","ni":"Nicarágua","nl":"Holanda","no":"Noruega","np":"Nepal","nr":"Nauru","nz":"Nova Zelândia","om":"Omã","pa":"Panamá","pe":"Peru","pf":"Polinésia Francesa","pg":"Papua Nova Guiné","ph":"Filipinas","pk":"Paquistão","pl":"Polônia","pr":"Porto Rico","ps":"Palestina","pt":"Portugal","pw":"Palau","py":"Paraguai","qa":"Catar","rn":"Ilha de Páscoa","ro":"Romênia","ru":"Rússia","rw":"Ruanda","sa":"Arábia Saudita","sb":"Ilhas Salomão","sc":"Seychelles","sd":"Sudão","se":"Suécia","sg":"Cingapura","si":"Eslovenia","sk":"Eslováquia","sl":"Serra Leoa","sm":"San Marino","sn":"Senegal","so":"Somália","sr":"Suriname","ss":"Sudão do Sul, República da","st":"São Tomé e Príncipe","sv":"El Salvador","sx":"Sint Maarten","sy":"Síria","sz":"Suazilândia","tc":"Ilhas Turks e Caicos","td":"Chade","tg":"Togo","th":"Tailândia","tj":"Tajiquistão","tk":"Toquelau","tl":"Timor-Leste","tm":"Turcomenistão","tn":"Tunísia","to":"Tonga","tr":"Turquia","tt":"Trinidad e Tobago","tv":"Tuvalu","tw":"Taiwan","tz":"Tanzânia","ua":"Ucrânia","ug":"Uganda","us":"Estados Unidos da América","uy":"Uruguai","uz":"Uzbequistão","vc":"São Vicente e Granadinas","ve":"Venezuela","vg":"Ilhas Virgens Britânicas","vi":"Ilhas Virgens dos EUA","vn":"Vietnã","vu":"Vanuatu","wf":"Wallis e Futuna","ws":"Samoa","xk":"Kosova","ye":"Iémen","za":"África do Sul","zm":"Zâmbia","zw":"Zimbábue"},"number":{"currency":{"format":{"delimiter":".","format":"%u %n","precision":2,"separator":",","significant":false,"strip_insignificant_zeros":false,"unit":"R$"}},"format":{"delimiter":".","precision":3,"separator":",","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Bilhões","million":"Milhões","quadrillion":"Quatrilhões","thousand":"mil","trillion":"Trilhões","unit":""}},"format":{"delimiter":".","precision":2,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":"."}},"precision":{"format":{"delimiter":"."}}},"ransack":{"all":"todos","and":"e","any":"qualquer","asc":"crescente","attribute":"atributo","combinator":"combinador","condition":"condição","desc":"decrescente","or":"ou","predicate":"predicado","predicates":{"blank":"está em branco","cont":"contém","cont_all":"contém todos","cont_any":"contém qualquer","does_not_match":"não corresponde","does_not_match_all":"não corresponde a todos","does_not_match_any":"não corresponde a nenhum","end":"termina com","end_all":"termina com todos","end_any":"termina com qualquer","eq":"é igual a","eq_all":"é igual a todos","eq_any":"é igual a qualquer","false":"é falso","gt":"maior do que","gt_all":"maior do que todos","gt_any":"maior do que qualquer","gteq":"maior ou igual a","gteq_all":"maior ou igual a todos","gteq_any":"maior ou igual a qualquer","in":"em","in_all":"em todos","in_any":"em qualquer","lt":"menor do que","lt_all":"menor do que todos","lt_any":"menor do que qualquer","lteq":"menor ou igual a","lteq_all":"menor ou igual a todos","lteq_any":"menor ou igual a qualquer","matches":"corresponde","matches_all":"corresponde a todos","matches_any":"corresponde a qualquer","not_cont":"não contém","not_cont_all":"não contém todos","not_cont_any":"não contém nenhum","not_end":"não termina com","not_end_all":"não termina com todos","not_end_any":"não termina com qualquer","not_eq":"não é igual a","not_eq_all":"não é igual a todos","not_eq_any":"não é igual a qualquer","not_in":"não está em","not_in_all":"não está em todos","not_in_any":"não está em qualquer","not_null":"não é nulo","not_start":"não começa com","not_start_all":"não começa com todos","not_start_any":"não começar com qualquer","null":"é nulo","present":"está presente","start":"começa com","start_all":"começa com todos","start_any":"começa com qualquer","true":"é verdadeiro"},"search":"buscar","sort":"ordenar","value":"valor"},"simple_form":{"error_notification":{"default_message":"Por favor, reveja os problemas abaixo:"},"no":"Não","required":{"mark":"*","text":"obrigatório"},"yes":"Sim"},"spree":{"say_no":false,"say_yes":true},"support":{"array":{"last_word_connector":" e ","two_words_connector":" e ","words_connector":", "}},"time":{"am":"am","formats":{"certificate":null,"certificate_month":null,"datetime":{"formats":{"default":null}},"default":"%A, %d de %B de %Y, %H:%M h","history":null,"long":"%A, %d de %B de %Y, %H:%M h","medium":null,"only_second":null,"post":null,"short":"%d/%m, %H:%M h","time":null},"pm":"pm"},"views":{"pagination":{"first":"&laquo; Primeiro","last":"Último &raquo;","next":"Próx. &rsaquo;","previous":"&lsaquo; Ant.","truncate":"&hellip;"}}},"pt-BR":{"ransack":{"all":"todos","and":"e","any":"algum","asc":"ascendente","attribute":"atributo","combinator":"combinador","condition":"condição","desc":"descendente","or":"ou","predicate":"predicado","predicates":{"blank":"está em branco","cont":"contém","cont_all":"contém todos","cont_any":"contém algum","does_not_match":"não corresponde","does_not_match_all":"não corresponde a todos","does_not_match_any":"não corresponde a algum","end":"termina com","end_all":"termina com todos","end_any":"termina com algum","eq":"igual","eq_all":"igual a todos","eq_any":"igual a algum","false":"é falso","gt":"maior que","gt_all":"maior que todos","gt_any":"maior que algum","gteq":"maior que ou igual a","gteq_all":"maior que ou igual a todos","gteq_any":"maior que ou igual a algum","in":"em","in_all":"em todos","in_any":"em algum","lt":"menor que","lt_all":"menor que todos","lt_any":"menor que algum","lteq":"menor ou igual a","lteq_all":"menor ou igual a todos","lteq_any":"menor ou igual a algum","matches":"corresponde","matches_all":"corresponde a todos","matches_any":"corresponde a algum","not_cont":"não contém","not_cont_all":"não contém todos","not_cont_any":"não contém algum","not_end":"não termina com","not_end_all":"não termina com todos","not_end_any":"não termina com algum","not_eq":"não é igual a","not_eq_all":"não é igual a todos","not_eq_any":"não é igual a algum","not_in":"não em","not_in_all":"não em todos","not_in_any":"não em algum","not_null":"não é nulo","not_start":"não começa com","not_start_all":"não começa com algum","not_start_any":"não começa com algum","null":"é nulo","present":"está presente","start":"começa com","start_all":"começa com todos","start_any":"começa com algum","true":"é verdadeiro"},"search":"pesquisar","sort":"classificar","value":"valor"}},"ro":{"ransack":{"all":"toate","and":"și","any":"oricare","asc":"crescător","attribute":"atribut","combinator":"combinator","condition":"condiție","desc":"descrescător","or":"sau","predicate":"predicat","predicates":{"blank":"este gol","cont":"conține","cont_all":"conține toate","cont_any":"conține unul din","does_not_match":"nu corespunde","does_not_match_all":"nu corespunde cu toate","does_not_match_any":"nu corespunde cu nici un","end":"se termină cu","end_all":"se termină cu toate","end_any":"se termină cu unul din","eq":"egal cu","eq_all":"egal cu toate","eq_any":"egal cu unul din","false":"este fals","gt":"mai mare de","gt_all":"mai mare decât toate","gt_any":"mai mare decât cel puțin unul din","gteq":"mai mare sau egal decât","gteq_all":"mai mare sau egal decât toate","gteq_any":"mai mare sau egal decât cel puțin unul din","in":"inclus în","in_all":"inclus în toate","in_any":"inclus într-unul din","lt":"mai mic de","lt_all":"mai mic decât toate","lt_any":"mai mic decât cel puțin unul din","lteq":"mai mic sau egal decât","lteq_all":"mai mic sau egal decât toate","lteq_any":"mai mic sau egal decât cel puțin unul din","matches":"corespunde","matches_all":"corespunde cu toate","matches_any":"corespunde cu unul din","not_cont":"nu conține","not_cont_all":"nu conține toate","not_cont_any":"nu conține unul din","not_end":"nu se termină cu","not_end_all":"nu se termină cu toate","not_end_any":"nu se termină cu unul din","not_eq":"diferit de","not_eq_all":"nu este egal cu toate","not_eq_any":"diferit de toate","not_in":"nu este inclus în","not_in_all":"nu este inclus în toate","not_in_any":"nu este inclus într-unul din","not_null":"nu este nul","not_start":"nu începe","not_start_all":"nu începe cu toate","not_start_any":"nu începe cu unul din","null":"este nul","present":"este prezent","start":"începe cu","start_all":"începe cu toate","start_any":"începe cu unul din","true":"este adevărat"},"search":"caută","sort":"sortează","value":"valoare"}},"ru":{"errors":{"messages":{"improbable_phone":"является недействительным номером"}}},"tr":{"errors":{"messages":{"improbable_phone":"geçersiz numara"}},"ransack":{"all":"hepsi","and":"ve","any":"herhangi","asc":"artan","attribute":"nitelik","combinator":"birleştirici","condition":"şart","desc":"azalan","or":"veya","predicate":"doğrula","predicates":{"blank":"boş","cont":"içeren","cont_all":"hepsini içeren","cont_any":"herhangi birini içeren","does_not_match":"eşleşmeyen","does_not_match_all":"hiçbiri ile eşleşmeyen","does_not_match_any":"herhangi biri ile eşleşmeyen","end":"ile biten","end_all":"hepsi ile biten","end_any":"herhangi biriyle biten","eq":"eşit","eq_all":"hepsine eşit","eq_any":"herhangi birine eşit","false":"yanlış","gt":"daha büyük ","gt_all":"hepsinden daha büyük","gt_any":"herhangi birinden daha büyük","gteq":"daha büyük veya eşit","gteq_all":"daha büyük veya hepsine eşit","gteq_any":"daha büyük veya herhangi birine eşit","in":"içinde","in_all":"hepsinde","in_any":"herhangi birinde","lt":"daha küçük","lt_all":"hepsinden küçük","lt_any":"herhangi birinden küçük","lteq":"daha küçük veya eşit","lteq_all":"daha küçük veya hepsine eşit","lteq_any":"daha küçük veya herhangi birine eşit","matches":"eşleşen","matches_all":"hepsi ile eşleşen","matches_any":"herhangi biri ile eşleşen","not_cont":"içermeyen","not_cont_all":"hiçbirini birini içermeyen","not_cont_any":"herhangi birini içermeyen","not_end":"ile bitmeyen","not_end_all":"hiçbiriyle bitmeyen","not_end_any":"herhangi biriyle bitmeyen","not_eq":"eşit değil","not_eq_all":"hiçbirine eşit değil","not_eq_any":"herhangi birine eşit değil","not_in":"içinde değil","not_in_all":"hiçbirinde değil","not_in_any":"herhangi birinde değil","not_null":"geçerli","not_start":"ile başlamayan","not_start_all":"hiçbiriyle başlamayan","not_start_any":"herhangi biriyle başlamayan","null":"geçersiz","present":"mevcut","start":"ile başlayan","start_all":"hepsiyle başlayan","start_any":"herhangi biriyle başlayan","true":"doğru"},"search":"ara","sort":"sırala","value":"değer"}},"uk":{"errors":{"messages":{"improbable_phone":"є недійсним номером"}}},"zh-CN":{"ransack":{"all":"所有","and":"并且","any":"任意","asc":"升序","attribute":"属性","combinator":"条件组合(combinator)","condition":"条件","desc":"降序","or":"或者","predicate":"基于(predicate)","predicates":{"blank":"为空","cont":"包含","cont_all":"包含所有值","cont_any":"包含任意一个值","does_not_match":"不符合","does_not_match_all":"不符合所有条件","does_not_match_any":"符合任意条件","end":"以改值结尾","end_all":"以所有值结尾","end_any":"以任意一个值结尾","eq":"等于","eq_all":"等于所有值","eq_any":"等于任意值","false":"等于false","gt":"大于","gt_all":"大于所有值","gt_any":"大于任意一个值","gteq":"大于等于","gteq_all":"大于等于所有值","gteq_any":"大于等于任意一个值","in":"被包含","in_all":"被所有值包含","in_any":"被任意值包含","lt":"小于","lt_all":"小于所有值","lt_any":"小于任意一个值","lteq":"小于等于","lteq_all":"小于等于所有值","lteq_any":"小于等于任意一个值","matches":"符合","matches_all":"符合所有条件","matches_any":"符合任意条件","not_cont":"不包含","not_cont_all":"不包含所有值","not_cont_any":"不包含任意一个值","not_end":"不以改值结尾","not_end_all":"不以所有值结尾","not_end_any":"不以任意一个值结尾","not_eq":"不等于","not_eq_all":"不等于所有值","not_eq_any":"不等于任意值","not_in":"不被包含","not_in_all":"不被所有值包含","not_in_any":"不被任意值包含","not_null":"不是null","not_start":"不以改值开始","not_start_all":"不以所有值开始","not_start_any":"不以任意一个值开始","null":"是null","present":"有值","start":"以改值开始","start_all":"以所有值开始","start_any":"以任意一个值开始","true":"等于true"},"search":"搜索","sort":"排序","value":"数值"}},"zh-TW":{"ransack":{"all":"所有","and":"而且","any":"任何","asc":"升冪排序","attribute":"屬性","combinator":"條件組合","condition":"條件","desc":"降冪排序","or":"或者","predicate":"基於","predicates":{"blank":"為空","cont":"包含","cont_all":"包含所有值","cont_any":"包含任何一個值","does_not_match":"不符合","does_not_match_all":"不符合所有條件","does_not_match_any":"不符合任何一個條件","end":"以某個值結尾","end_all":"以所有值結尾","end_any":"以任何一個值結尾","eq":"等於","eq_all":"等於所有值","eq_any":"等於任何一個值","false":"為假","gt":"大於","gt_all":"大於所有值","gt_any":"大於任何一個值","gteq":"大於或等於","gteq_all":"大於或等於所有值","gteq_any":"大於或等於任何一個值","in":"被包含於","in_all":"被包含於所有值","in_any":"被包含於任何一個值","lt":"小於","lt_all":"小於所有值","lt_any":"小於任何一個值","lteq":"小於或等於","lteq_all":"小於或等於所有值","lteq_any":"小於或等於任何一個值","matches":"符合","matches_all":"符合所有條件","matches_any":"符合任何一個條件","not_cont":"不包含","not_cont_all":"不包含所有值","not_cont_any":"不包含任何一個值","not_end":"不以某個值結尾","not_end_all":"不以所有值結尾","not_end_any":"不以任何一個值結尾","not_eq":"不等於","not_eq_all":"不等於所有值","not_eq_any":"不等於任何一個值","not_in":"不被包含於","not_in_all":"不被包含於所有值","not_in_any":"不被包含於任何一個值","not_null":"不為 null","not_start":"不以某個值開始","not_start_all":"不以所有值開始","not_start_any":"不以任何一值開始","null":"為 null","present":"有值","start":"以某個值開始","start_all":"以所有值開始","start_any":"以任何一個值開始","true":"為真"},"search":"搜尋","sort":"排序","value":"數值"}}};
}));



/*!
 * Select2 4.0.3
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =
(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
    var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
        var superMethod = superMethods[m];

        DecoratedClass.prototype[superMethod] =
          SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;
    var params = slice.call(arguments, 1);

    this.listeners = this.listeners || {};

    // Params should always come in as an array
    if (params == null) {
      params = [];
    }

    // If there are no arguments to the event, use a temporary object
    if (params.length === 0) {
      params.push({});
    }

    // Set the `_type` of the first object to the event
    params[0]._type = event;

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') {
      var $jqNodes = $();

      $.map($nodes, function (node) {
        $jqNodes = $jqNodes.add(node);
      });

      $nodes = $jqNodes;
    }

    $element.append($nodes);
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
    var $results = $(
      '<ul class="select2-results__options" role="tree"></ul>'
    );

    if (this.options.get('multiple')) {
      $results.attr('aria-multiselectable', 'true');
    }

    this.$results = $results;

    return $results;
  };

  Results.prototype.clear = function () {
    this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="treeitem" aria-live="assertive"' +
      ' class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    $message[0].className += ' select2-results__message';

    this.$results.append($message);
  };

  Results.prototype.hideMessages = function () {
    this.$results.find('.select2-results__message').remove();
  };

  Results.prototype.append = function (data) {
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) {
      if (this.$results.children().length === 0) {
        this.trigger('results:message', {
          message: 'noResults'
        });
      }

      return;
    }

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) {
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    }

    this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
    var sorter = this.options.get('sorter');

    return sorter(data);
  };

  Results.prototype.highlightFirstItem = function () {
    var $options = this.$results
      .find('.select2-results__option[aria-selected]');

    var $selected = $options.filter('[aria-selected=true]');

    // Check if there are any selected options
    if ($selected.length > 0) {
      // If there are selected options, highlight the first
      $selected.first().trigger('mouseenter');
    } else {
      // If there are no selected options, highlight the first option
      // in the dropdown
      $options.first().trigger('mouseenter');
    }

    this.ensureHighlightVisible();
  };

  Results.prototype.setClasses = function () {
    var self = this;

    this.data.current(function (selected) {
      var selectedIds = $.map(selected, function (s) {
        return s.id.toString();
      });

      var $options = self.$results
        .find('.select2-results__option[aria-selected]');

      $options.each(function () {
        var $option = $(this);

        var item = $.data(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && $.inArray(id, selectedIds) > -1)) {
          $option.attr('aria-selected', 'true');
        } else {
          $option.attr('aria-selected', 'false');
        }
      });

    });
  };

  Results.prototype.showLoading = function (params) {
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    var loading = {
      disabled: true,
      loading: true,
      text: loadingMore(params)
    };
    var $loading = this.option(loading);
    $loading.className += ' loading-results';

    this.$results.prepend($loading);
  };

  Results.prototype.hideLoading = function () {
    this.$results.find('.loading-results').remove();
  };

  Results.prototype.option = function (data) {
    var option = document.createElement('li');
    option.className = 'select2-results__option';

    var attrs = {
      'role': 'treeitem',
      'aria-selected': 'false'
    };

    if (data.disabled) {
      delete attrs['aria-selected'];
      attrs['aria-disabled'] = 'true';
    }

    if (data.id == null) {
      delete attrs['aria-selected'];
    }

    if (data._resultId != null) {
      option.id = data._resultId;
    }

    if (data.title) {
      option.title = data.title;
    }

    if (data.children) {
      attrs.role = 'group';
      attrs['aria-label'] = data.text;
      delete attrs['aria-selected'];
    }

    for (var attr in attrs) {
      var val = attrs[attr];

      option.setAttribute(attr, val);
    }

    if (data.children) {
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      var $label = $(label);
      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) {
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      }

      var $childrenContainer = $('<ul></ul>', {
        'class': 'select2-results__options select2-results__options--nested'
      });

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    } else {
      this.template(data, option);
    }

    $.data(option, 'data', data);

    return option;
  };

  Results.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) {
      self.clear();
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
        self.highlightFirstItem();
      }
    });

    container.on('results:append', function (params) {
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('query', function (params) {
      self.hideMessages();
      self.showLoading(params);
    });

    container.on('select', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
      self.highlightFirstItem();
    });

    container.on('unselect', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
      self.highlightFirstItem();
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    });

    container.on('results:toggle', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      $highlighted.trigger('mouseup');
    });

    container.on('results:select', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      var data = $highlighted.data('data');

      if ($highlighted.attr('aria-selected') == 'true') {
        self.trigger('close', {});
      } else {
        self.trigger('select', {
          data: data
        });
      }
    });

    container.on('results:previous', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      // If we are already at te top, don't move further
      if (currentIndex === 0) {
        return;
      }

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) {
        nextIndex = 0;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextTop - currentOffset < 0) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:next', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) {
        return;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextBottom > currentOffset) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:focus', function (params) {
      params.element.addClass('select2-results__option--highlighted');
    });

    container.on('results:message', function (params) {
      self.displayMessage(params);
    });

    if ($.fn.mousewheel) {
      this.$results.on('mousewheel', function (e) {
        var top = self.$results.scrollTop();

        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) {
          self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        } else if (isAtBottom) {
          self.$results.scrollTop(
            self.$results.get(0).scrollHeight - self.$results.height()
          );

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
      function (evt) {
      var $this = $(this);

      var data = $this.data('data');

      if ($this.attr('aria-selected') === 'true') {
        if (self.options.get('multiple')) {
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        } else {
          self.trigger('close', {});
        }

        return;
      }

      self.trigger('select', {
        originalEvent: evt,
        data: data
      });
    });

    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
      function (evt) {
      var data = $(this).data('data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted');

      self.trigger('results:focus', {
        data: data,
        element: $(this)
      });
    });
  };

  Results.prototype.getHighlightedResults = function () {
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  };

  Results.prototype.destroy = function () {
    this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) {
      return;
    }

    var $options = this.$results.find('[aria-selected]');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) {
      this.$results.scrollTop(0);
    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
      this.$results.scrollTop(nextOffset);
    }
  };

  Results.prototype.template = function (result, container) {
    var template = this.options.get('templateResult');
    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, container);

    if (content == null) {
      container.style.display = 'none';
    } else if (typeof content === 'string') {
      container.innerHTML = escapeMarkup(content);
    } else {
      $(container).append(content);
    }
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      ' aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (this.$element.data('old-tabindex') != null) {
      this._tabindex = this.$element.data('old-tabindex');
    } else if (this.$element.attr('tabindex') != null) {
      this._tabindex = this.$element.attr('tabindex');
    }

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);

    this.$selection = $selection;

    return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-container';
    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('blur', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) {
        evt.preventDefault();
      }
    });

    container.on('results:focus', function (params) {
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.focus();

      self._detachCloseHandler(container);
    });

    container.on('enable', function () {
      self.$selection.attr('tabindex', self._tabindex);
    });

    container.on('disable', function () {
      self.$selection.attr('tabindex', '-1');
    });
  };

  BaseSelection.prototype._handleBlur = function (evt) {
    var self = this;

    // This needs to be delayed as the active element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () {
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) {
        return;
      }

      self.trigger('blur', evt);
    }, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {
    var self = this;

    $(document.body).on('mousedown.select2.' + container.id, function (e) {
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () {
        var $this = $(this);

        if (this == $select[0]) {
          return;
        }

        var $element = $this.data('element');

        $element.select2('close');
      });
    });
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
    $(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
    this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
    throw new Error('The `update` method must be defined in child classes.');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered').attr('id', id);
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('focus', function (evt) {
      if (!container.isOpen()) {
        self.$selection.focus();
      }
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });
  };

  SingleSelection.prototype.clear = function () {
    this.$selection.find('.select2-selection__rendered').empty();
  };

  SingleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);
    $rendered.prop('title', selection.title || selection.text);
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
    MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.options.get('disabled')) {
          return;
        }

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = $selection.data('data');

        self.trigger('unselect', {
          originalEvent: evt,
          data: data
        });
      }
    );
  };

  MultipleSelection.prototype.clear = function () {
    this.$selection.find('.select2-selection__rendered').empty();
  };

  MultipleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
          '&times;' +
        '</span>' +
      '</li>'
    );

    return $container;
  };

  MultipleSelection.prototype.update = function (data) {
    this.clear();

    if (data.length === 0) {
      return;
    }

    var $selections = [];

    for (var d = 0; d < data.length; d++) {
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      $selection.append(formatted);
      $selection.prop('title', selection.title || selection.text);

      $selection.data('data', selection);

      $selections.push($selection);
    }

    var $rendered = this.$selection.find('.select2-selection__rendered');

    Utils.appendMany($rendered, $selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) {
  function Placeholder (decorated, $element, options) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder.addClass('select2-selection__placeholder')
                .removeClass('select2-selection__choice');

    return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) {
      return decorated.call(this, data);
    }

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys'
], function ($, KEYS) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) {
      if (this.options.get('debug') && window.console && console.error) {
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      }
    }

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) {
        self._handleClear(evt);
    });

    container.on('keypress', function (evt) {
      self._handleKeyboardClear(evt, container);
    });
  };

  AllowClear.prototype._handleClear = function (_, evt) {
    // Ignore the event if it is disabled
    if (this.options.get('disabled')) {
      return;
    }

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) {
      return;
    }

    evt.stopPropagation();

    var data = $clear.data('data');

    for (var d = 0; d < data.length; d++) {
      var unselectData = {
        data: data[d]
      };

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) {
        return;
      }
    }

    this.$element.val(this.placeholder.id).trigger('change');

    this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
    if (container.isOpen()) {
      return;
    }

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
      this._handleClear(evt);
    }
  };

  AllowClear.prototype.update = function (decorated, data) {
    decorated.call(this, data);

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) {
      return;
    }

    var $remove = $(
      '<span class="select2-selection__clear">' +
        '&times;' +
      '</span>'
    );
    $remove.data('data', data);

    this.$selection.find('.select2-selection__rendered').prepend($remove);
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
    var $search = $(
      '<li class="select2-search select2-search--inline">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
        ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
      '</li>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    var $rendered = decorated.call(this);

    this._transferTabIndex();

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self.$search.trigger('focus');
    });

    container.on('close', function () {
      self.$search.val('');
      self.$search.removeAttr('aria-activedescendant');
      self.$search.trigger('focus');
    });

    container.on('enable', function () {
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    });

    container.on('disable', function () {
      self.$search.prop('disabled', true);
    });

    container.on('focus', function (evt) {
      self.$search.trigger('focus');
    });

    container.on('results:focus', function (params) {
      self.$search.attr('aria-activedescendant', params.id);
    });

    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
        var $previousChoice = self.$searchContainer
          .prev('.select2-selection__choice');

        if ($previousChoice.length > 0) {
          var item = $previousChoice.data('data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        }
      }
    });

    // Try to detect the IE version should the `documentMode` property that
    // is stored on the document. This is only implemented in IE and is
    // slightly cleaner than doing a user agent check.
    // This property is not available in Edge, but Edge also doesn't have
    // this bug.
    var msie = document.documentMode;
    var disableInputEvents = msie && msie <= 11;

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents) {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      }
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents && evt.type === 'input') {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
          return;
        }

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) {
          return;
        }

        self.handleSearch(evt);
      }
    );
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
    this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.$selection.find('.select2-selection__rendered')
                   .append(this.$searchContainer);

    this.resizeSearch();
    if (searchHadFocus) {
      this.$search.focus();
    }
  };

  Search.prototype.handleSearch = function () {
    this.resizeSearch();

    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
    this.trigger('unselect', {
      data: item
    });

    this.$search.val(item.text);
    this.handleSearch();
  };

  Search.prototype.resizeSearch = function () {
    this.$search.css('width', '25px');

    var width = '';

    if (this.$search.attr('placeholder') !== '') {
      width = this.$selection.find('.select2-selection__rendered').innerWidth();
    } else {
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    }

    this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting'
    ];

    var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) {
      // Ignore events that should not be relayed
      if ($.inArray(name, relayEvents) === -1) {
        return;
      }

      // The parameters should always be an object
      params = params || {};

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, {
        params: params
      });

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if ($.inArray(name, preventableEvents) === -1) {
        return;
      }

      params.prevented = evt.isDefaultPrevented();
    });
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
    this.dict = dict || {};
  }

  Translation.prototype.all = function () {
    return this.dict;
  };

  Translation.prototype.get = function (key) {
    return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
    this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
    if (!(path in Translation._cache)) {
      var translations = require(path);

      Translation._cache[path] = translations;
    }

    return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () {
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    });

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if ($(data.element).is('option')) {
      data.element.selected = true;

      this.$element.trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if ($.inArray(id, val) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if ($(data.element).is('option')) {
      data.element.selected = false;

      this.$element.trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      $.removeData(this, 'data');
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) {
        return;
      }

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    $.data(option, 'data', normalizedData);

    return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = $.data($option[0], 'data');

    if (data != null) {
      return data;
    }

    if ($option.is('option')) {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if ($option.is('optgroup')) {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    $.data($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (!$.isPlainObject(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id && this.container != null) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    var data = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);

    this.addOptions(this.convertToOptions(data));
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) {
      this.processResults = this.ajaxOptions.processResults;
    }

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
    var defaults = {
      data: function (params) {
        return $.extend({}, params, {
          q: params.term
        });
      },
      transport: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      }
    };

    return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
    return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
    var matches = [];
    var self = this;

    if (this._request != null) {
      // JSONP requests cannot always be aborted
      if ($.isFunction(this._request.abort)) {
        this._request.abort();
      }

      this._request = null;
    }

    var options = $.extend({
      type: 'GET'
    }, this.ajaxOptions);

    if (typeof options.url === 'function') {
      options.url = options.url.call(this.$element, params);
    }

    if (typeof options.data === 'function') {
      options.data = options.data.call(this.$element, params);
    }

    function request () {
      var $request = options.transport(options, function (data) {
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) {
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !$.isArray(results.results)) {
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          }
        }

        callback(results);
      }, function () {
        // Attempt to detect if a request was aborted
        // Only works if the transport exposes a status property
        if ($request.status && $request.status === '0') {
          return;
        }

        self.trigger('results:message', {
          message: 'errorLoading'
        });
      });

      self._request = $request;
    }

    if (this.ajaxOptions.delay && params.term != null) {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    } else {
      request();
    }
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) {
      this.createTag = createTag;
    }

    var insertTag = options.get('insertTag');

    if (insertTag !== undefined) {
        this.insertTag = insertTag;
    }

    decorated.call(this, $element, options);

    if ($.isArray(tags)) {
      for (var t = 0; t < tags.length; t++) {
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      }
    }
  }

  Tags.prototype.query = function (decorated, params, callback) {
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) {
      decorated.call(this, params, callback);
      return;
    }

    function wrapper (obj, child) {
      var data = obj.results;

      for (var i = 0; i < data.length; i++) {
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper({
            results: option.children
          }, true)
        );

        var checkText = option.text === params.term;

        if (checkText || checkChildren) {
          if (child) {
            return false;
          }

          obj.data = data;
          callback(obj);

          return;
        }
      }

      if (child) {
        return true;
      }

      var tag = self.createTag(params);

      if (tag != null) {
        var $option = self.option(tag);
        $option.attr('data-select2-tag', true);

        self.addOptions([$option]);

        self.insertTag(data, tag);
      }

      obj.results = data;

      callback(obj);
    }

    decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
    var term = $.trim(params.term);

    if (term === '') {
      return null;
    }

    return {
      id: term,
      text: term
    };
  };

  Tags.prototype.insertTag = function (_, data, tag) {
    data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
    var tag = this._lastTag;

    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () {
      if (this.selected) {
        return;
      }

      $(this).remove();
    });
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) {
      this.tokenizer = tokenizer;
    }

    decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
    var self = this;

    function createAndSelect (data) {
      // Normalize the data object so we can use it for checks
      var item = self._normalizeItem(data);

      // Check if the data object already exists as a tag
      // Select it if it doesn't
      var $existingOptions = self.$element.find('option').filter(function () {
        return $(this).val() === item.id;
      });

      // If an existing option wasn't found for it, create the option
      if (!$existingOptions.length) {
        var $option = self.option(item);
        $option.attr('data-select2-tag', true);

        self._removeOldTags();
        self.addOptions([$option]);
      }

      // Select the item, now that we know there is an option for it
      select(item);
    }

    function select (data) {
      self.trigger('select', {
        data: data
      });
    }

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, createAndSelect);

    if (tokenData.term !== params.term) {
      // Replace the search term if we have the search box
      if (this.$search.length) {
        this.$search.val(tokenData.term);
        this.$search.focus();
      }

      params.term = tokenData.term;
    }

    decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) {
      return {
        id: params.term,
        text: params.term
      };
    };

    while (i < term.length) {
      var termChar = term[i];

      if ($.inArray(termChar, separators) === -1) {
        i++;

        continue;
      }

      var part = term.substr(0, i);
      var partParams = $.extend({}, params, {
        term: part
      });

      var data = createTag(partParams);

      if (data == null) {
        i++;
        continue;
      }

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    }

    return {
      term: term
    };
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooShort',
        args: {
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooLong',
        args: {
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }
        decorated.call(self, params, callback);
      });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  };

  Dropdown.prototype.bind = function () {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
    // Should be implmented in subclasses
  };

  Dropdown.prototype.destroy = function () {
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function Search () { }

  Search.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
        ' spellcheck="false" role="textbox" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    $rendered.prepend($search);

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) {
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    });

    this.$search.on('keyup input', function (evt) {
      self.handleSearch(evt);
    });

    container.on('open', function () {
      self.$search.attr('tabindex', 0);

      self.$search.focus();

      window.setTimeout(function () {
        self.$search.focus();
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);

      self.$search.val('');
    });

    container.on('focus', function () {
      if (container.isOpen()) {
        self.$search.focus();
      }
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer.removeClass('select2-search--hide');
        } else {
          self.$searchContainer.addClass('select2-search--hide');
        }
      }
    });
  };

  Search.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
    return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) {
      var item = data[d];

      if (this.placeholder.id === item.id) {
        modifiedData.splice(d, 1);
      }
    }

    return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
    this.lastParams = {};

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) {
      this.$results.append(this.$loadingMore);
    }
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    container.on('query:append', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    this.$results.on('scroll', function () {
      var isLoadMoreVisible = $.contains(
        document.documentElement,
        self.$loadingMore[0]
      );

      if (self.loading || !isLoadMoreVisible) {
        return;
      }

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var loadingMoreOffset = self.$loadingMore.offset().top +
        self.$loadingMore.outerHeight(false);

      if (currentOffset + 50 >= loadingMoreOffset) {
        self.loadMore();
      }
    });
  };

  InfiniteScroll.prototype.loadMore = function () {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
    return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
    var $option = $(
      '<li ' +
      'class="select2-results__option select2-results__option--load-more"' +
      'role="treeitem" aria-disabled="true"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = options.get('dropdownParent') || $(document.body);

    decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var setupResultsEvents = false;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self._showDropdown();
      self._attachPositioningHandler(container);

      if (!setupResultsEvents) {
        setupResultsEvents = true;

        container.on('results:all', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });

        container.on('results:append', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
      }
    });

    container.on('close', function () {
      self._hideDropdown();
      self._detachPositioningHandler(container);
    });

    this.$dropdownContainer.on('mousedown', function (evt) {
      evt.stopPropagation();
    });
  };

  AttachBody.prototype.destroy = function (decorated) {
    decorated.call(this);

    this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown.removeClass('select2');
    $dropdown.addClass('select2-container--open');

    $dropdown.css({
      position: 'absolute',
      top: -999999
    });

    this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);

    this.$dropdownContainer = $container;

    return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
    this.$dropdownContainer.detach();
  };

  AttachBody.prototype._attachPositioningHandler =
      function (decorated, container) {
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () {
      $(this).data('select2-scroll-position', {
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      });
    });

    $watchers.on(scrollEvent, function (ev) {
      var position = $(this).data('select2-scroll-position');
      $(this).scrollTop(position.y);
    });

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) {
      self._positionDropdown();
      self._resizeDropdown();
    });
  };

  AttachBody.prototype._detachPositioningHandler =
      function (decorated, container) {
    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.off(scrollEvent);

    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  };

  AttachBody.prototype._positionDropdown = function () {
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

    var newDirection = null;

    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = {
      height: this.$container.outerHeight(false)
    };

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = $offsetParent.offset();

    css.top -= parentOffset.top;
    css.left -= parentOffset.left;

    if (!isCurrentlyAbove && !isCurrentlyBelow) {
      newDirection = 'below';
    }

    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      newDirection = 'above';
    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      newDirection = 'below';
    }

    if (newDirection == 'above' ||
      (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - parentOffset.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
    var css = {
      width: this.$container.outerWidth(false) + 'px'
    };

    if (this.options.get('dropdownAutoWidth')) {
      css.minWidth = css.width;
      css.position = 'relative';
      css.width = 'auto';
    }

    this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
    var count = 0;

    for (var d = 0; d < data.length; d++) {
      var item = data[d];

      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    }

    return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) {
      this.minimumResultsForSearch = Infinity;
    }

    decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
    if (countResults(params.data.results) < this.minimumResultsForSearch) {
      return false;
    }

    return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[

], function () {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function (params) {
      self._handleSelectOnClose(params);
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
    if (params && params.originalSelect2Event != null) {
      var event = params.originalSelect2Event;

      // Don't select an item if the close event was triggered from a select or
      // unselect event
      if (event._type === 'select' || event._type === 'unselect') {
        return;
      }
    }

    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) {
      return;
    }

    var data = $highlightedResults.data('data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) {
      return;
    }

    this.trigger('select', {
        data: data
    });
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) {
      self._selectTriggered(evt);
    });

    container.on('unselect', function (evt) {
      self._selectTriggered(evt);
    });
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && originalEvent.ctrlKey) {
      return;
    }

    this.trigger('close', {
      originalEvent: originalEvent,
      originalSelect2Event: evt
    });
  };

  return CloseOnSelect;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
    errorLoading: function () {
      return 'The results could not be loaded.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) {
        message += 's';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    },
    loadingMore: function () {
      return 'Loading more results…';
    },
    maximumSelected: function (args) {
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) {
        message += 's';
      }

      return message;
    },
    noResults: function () {
      return 'No results found';
    },
    searching: function () {
      return 'Searching…';
    }
  };
});

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

             EnglishTranslation) {
  function Defaults () {
    this.reset();
  }

  Defaults.prototype.apply = function (options) {
    options = $.extend(true, {}, this.defaults, options);

    if (options.dataAdapter == null) {
      if (options.ajax != null) {
        options.dataAdapter = AjaxData;
      } else if (options.data != null) {
        options.dataAdapter = ArrayData;
      } else {
        options.dataAdapter = SelectData;
      }

      if (options.minimumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      }

      if (options.maximumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      }

      if (options.maximumSelectionLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      }

      if (options.tags) {
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      }

      if (options.tokenSeparators != null || options.tokenizer != null) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      }

      if (options.query != null) {
        var Query = require(options.amdBase + 'compat/query');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Query
        );
      }

      if (options.initSelection != null) {
        var InitSelection = require(options.amdBase + 'compat/initSelection');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          InitSelection
        );
      }
    }

    if (options.resultsAdapter == null) {
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      }

      if (options.placeholder != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      }

      if (options.selectOnClose) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      }
    }

    if (options.dropdownAdapter == null) {
      if (options.multiple) {
        options.dropdownAdapter = Dropdown;
      } else {
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      }

      if (options.minimumResultsForSearch !== 0) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      }

      if (options.closeOnSelect) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      }

      if (
        options.dropdownCssClass != null ||
        options.dropdownCss != null ||
        options.adaptDropdownCssClass != null
      ) {
        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      }

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    }

    if (options.selectionAdapter == null) {
      if (options.multiple) {
        options.selectionAdapter = MultipleSelection;
      } else {
        options.selectionAdapter = SingleSelection;
      }

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }

      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }

      if (options.multiple) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      }

      if (
        options.containerCssClass != null ||
        options.containerCss != null ||
        options.adaptContainerCssClass != null
      ) {
        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          ContainerCSS
        );
      }

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    }

    if (typeof options.language === 'string') {
      // Check if the language is specified with a region
      if (options.language.indexOf('-') > 0) {
        // Extract the region information if it is included
        var languageParts = options.language.split('-');
        var baseLanguage = languageParts[0];

        options.language = [options.language, baseLanguage];
      } else {
        options.language = [options.language];
      }
    }

    if ($.isArray(options.language)) {
      var languages = new Translation();
      options.language.push('en');

      var languageNames = options.language;

      for (var l = 0; l < languageNames.length; l++) {
        var name = languageNames[l];
        var language = {};

        try {
          // Try to load it with the original name
          language = Translation.loadPath(name);
        } catch (e) {
          try {
            // If we couldn't load it, check if it wasn't the full path
            name = this.defaults.amdLanguageBase + name;
            language = Translation.loadPath(name);
          } catch (ex) {
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files.
            if (options.debug && window.console && console.warn) {
              console.warn(
                'Select2: The language file for "' + name + '" could not be ' +
                'automatically loaded. A fallback will be used instead.'
              );
            }

            continue;
          }
        }

        languages.extend(language);
      }

      options.translations = languages;
    } else {
      var baseTranslation = Translation.loadPath(
        this.defaults.amdLanguageBase + 'en'
      );
      var customTranslation = new Translation(options.language);

      customTranslation.extend(baseTranslation);

      options.translations = customTranslation;
    }

    return options;
  };

  Defaults.prototype.reset = function () {
    function stripDiacritics (text) {
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) {
        return DIACRITICS[a] || a;
      }

      return text.replace(/[^\u0000-\u007E]/g, match);
    }

    function matcher (params, data) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // If it doesn't contain the term, don't return anything
      return null;
    }

    this.defaults = {
      amdBase: './',
      amdLanguageBase: './i18n/',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: EnglishTranslation,
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      sorter: function (data) {
        return data;
      },
      templateResult: function (result) {
        return result.text;
      },
      templateSelection: function (selection) {
        return selection.text;
      },
      theme: 'default',
      width: 'resolve'
    };
  };

  Defaults.prototype.set = function (key, value) {
    var camelKey = $.camelCase(key);

    var data = {};
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) {
  function Options (options, $element) {
    this.options = options;

    if ($element != null) {
      this.fromElement($element);
    }

    this.options = Defaults.apply(this.options);

    if ($element && $element.is('input')) {
      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

      this.options.dataAdapter = Utils.Decorate(
        this.options.dataAdapter,
        InputCompat
      );
    }
  }

  Options.prototype.fromElement = function ($e) {
    var excludedData = ['select2'];

    if (this.options.multiple == null) {
      this.options.multiple = $e.prop('multiple');
    }

    if (this.options.disabled == null) {
      this.options.disabled = $e.prop('disabled');
    }

    if (this.options.language == null) {
      if ($e.prop('lang')) {
        this.options.language = $e.prop('lang').toLowerCase();
      } else if ($e.closest('[lang]').prop('lang')) {
        this.options.language = $e.closest('[lang]').prop('lang');
      }
    }

    if (this.options.dir == null) {
      if ($e.prop('dir')) {
        this.options.dir = $e.prop('dir');
      } else if ($e.closest('[dir]').prop('dir')) {
        this.options.dir = $e.closest('[dir]').prop('dir');
      } else {
        this.options.dir = 'ltr';
      }
    }

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if ($e.data('select2Tags')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      }

      $e.data('data', $e.data('select2Tags'));
      $e.data('tags', true);
    }

    if ($e.data('ajaxUrl')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      }

      $e.attr('ajax--url', $e.data('ajaxUrl'));
      $e.data('ajax--url', $e.data('ajaxUrl'));
    }

    var dataset = {};

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
      dataset = $.extend(true, {}, $e[0].dataset, $e.data());
    } else {
      dataset = $e.data();
    }

    var data = $.extend(true, {}, dataset);

    data = Utils._convertData(data);

    for (var key in data) {
      if ($.inArray(key, excludedData) > -1) {
        continue;
      }

      if ($.isPlainObject(this.options[key])) {
        $.extend(this.options[key], data[key]);
      } else {
        this.options[key] = data[key];
      }
    }

    return this;
  };

  Options.prototype.get = function (key) {
    return this.options[key];
  };

  Options.prototype.set = function (key, val) {
    this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
    if ($element.data('select2') != null) {
      $element.data('select2').destroy();
    }

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || {};

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    $element.data('old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) {
      self.trigger('selection:update', {
        data: initialData
      });
    });

    // Hide the original select
    $element.addClass('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    $element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
    var id = '';

    if ($element.attr('id') != null) {
      id = $element.attr('id');
    } else if ($element.attr('name') != null) {
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    } else {
      id = Utils.generateChars(4);
    }

    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = 'select2-' + id;

    return id;
  };

  Select2.prototype._placeContainer = function ($container) {
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) {
      $container.css('width', width);
    }
  };

  Select2.prototype._resolveWidth = function ($element, method) {
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') {
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) {
        return styleWidth;
      }

      return this._resolveWidth($element, 'element');
    }

    if (method == 'element') {
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) {
        return 'auto';
      }

      return elementWidth + 'px';
    }

    if (method == 'style') {
      var style = $element.attr('style');

      if (typeof(style) !== 'string') {
        return null;
      }

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) {
          return matches[1];
        }
      }

      return null;
    }

    return method;
  };

  Select2.prototype._bindAdapters = function () {
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
    var self = this;

    this.$element.on('change.select2', function () {
      self.dataAdapter.current(function (data) {
        self.trigger('selection:update', {
          data: data
        });
      });
    });

    this.$element.on('focus.select2', function (evt) {
      self.trigger('focus', evt);
    });

    this._syncA = Utils.bind(this._syncAttributes, this);
    this._syncS = Utils.bind(this._syncSubtree, this);

    if (this.$element[0].attachEvent) {
      this.$element[0].attachEvent('onpropertychange', this._syncA);
    }

    var observer = window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    ;

    if (observer != null) {
      this._observer = new observer(function (mutations) {
        $.each(mutations, self._syncA);
        $.each(mutations, self._syncS);
      });
      this._observer.observe(this.$element[0], {
        attributes: true,
        childList: true,
        subtree: false
      });
    } else if (this.$element[0].addEventListener) {
      this.$element[0].addEventListener(
        'DOMAttrModified',
        self._syncA,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeInserted',
        self._syncS,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeRemoved',
        self._syncS,
        false
      );
    }
  };

  Select2.prototype._registerDataEvents = function () {
    var self = this;

    this.dataAdapter.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerSelectionEvents = function () {
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () {
      self.toggleDropdown();
    });

    this.selection.on('focus', function (params) {
      self.focus(params);
    });

    this.selection.on('*', function (name, params) {
      if ($.inArray(name, nonRelayEvents) !== -1) {
        return;
      }

      self.trigger(name, params);
    });
  };

  Select2.prototype._registerDropdownEvents = function () {
    var self = this;

    this.dropdown.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerResultsEvents = function () {
    var self = this;

    this.results.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerEvents = function () {
    var self = this;

    this.on('open', function () {
      self.$container.addClass('select2-container--open');
    });

    this.on('close', function () {
      self.$container.removeClass('select2-container--open');
    });

    this.on('enable', function () {
      self.$container.removeClass('select2-container--disabled');
    });

    this.on('disable', function () {
      self.$container.addClass('select2-container--disabled');
    });

    this.on('blur', function () {
      self.$container.removeClass('select2-container--focus');
    });

    this.on('query', function (params) {
      if (!self.isOpen()) {
        self.trigger('open', {});
      }

      this.dataAdapter.query(params, function (data) {
        self.trigger('results:all', {
          data: data,
          query: params
        });
      });
    });

    this.on('query:append', function (params) {
      this.dataAdapter.query(params, function (data) {
        self.trigger('results:append', {
          data: data,
          query: params
        });
      });
    });

    this.on('keypress', function (evt) {
      var key = evt.which;

      if (self.isOpen()) {
        if (key === KEYS.ESC || key === KEYS.TAB ||
            (key === KEYS.UP && evt.altKey)) {
          self.close();

          evt.preventDefault();
        } else if (key === KEYS.ENTER) {
          self.trigger('results:select', {});

          evt.preventDefault();
        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
          self.trigger('results:toggle', {});

          evt.preventDefault();
        } else if (key === KEYS.UP) {
          self.trigger('results:previous', {});

          evt.preventDefault();
        } else if (key === KEYS.DOWN) {
          self.trigger('results:next', {});

          evt.preventDefault();
        }
      } else {
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) {
          self.open();

          evt.preventDefault();
        }
      }
    });
  };

  Select2.prototype._syncAttributes = function () {
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.options.get('disabled')) {
      if (this.isOpen()) {
        this.close();
      }

      this.trigger('disable', {});
    } else {
      this.trigger('enable', {});
    }
  };

  Select2.prototype._syncSubtree = function (evt, mutations) {
    var changed = false;
    var self = this;

    // Ignore any mutation events raised for elements that aren't options or
    // optgroups. This handles the case when the select element is destroyed
    if (
      evt && evt.target && (
        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
      )
    ) {
      return;
    }

    if (!mutations) {
      // If mutation events aren't supported, then we can only assume that the
      // change affected the selections
      changed = true;
    } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
      for (var n = 0; n < mutations.addedNodes.length; n++) {
        var node = mutations.addedNodes[n];

        if (node.selected) {
          changed = true;
        }
      }
    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
      changed = true;
    }

    // Only re-pull the data if we think there is a change
    if (changed) {
      this.dataAdapter.current(function (currentData) {
        self.trigger('selection:update', {
          data: currentData
        });
      });
    }
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = {
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting'
    };

    if (args === undefined) {
      args = {};
    }

    if (name in preTriggerMap) {
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = {
        prevented: false,
        name: name,
        args: args
      };

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) {
        args.prevented = true;

        return;
      }
    }

    actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
    if (this.options.get('disabled')) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  Select2.prototype.open = function () {
    if (this.isOpen()) {
      return;
    }

    this.trigger('query', {});
  };

  Select2.prototype.close = function () {
    if (!this.isOpen()) {
      return;
    }

    this.trigger('close', {});
  };

  Select2.prototype.isOpen = function () {
    return this.$container.hasClass('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
    return this.$container.hasClass('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) {
      return;
    }

    this.$container.addClass('select2-container--focus');
    this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    }

    if (args == null || args.length === 0) {
      args = [true];
    }

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  };

  Select2.prototype.data = function () {
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) {
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    }

    var data = [];

    this.dataAdapter.current(function (currentData) {
      data = currentData;
    });

    return data;
  };

  Select2.prototype.val = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    }

    if (args == null || args.length === 0) {
      return this.$element.val();
    }

    var newVal = args[0];

    if ($.isArray(newVal)) {
      newVal = $.map(newVal, function (obj) {
        return obj.toString();
      });
    }

    this.$element.val(newVal).trigger('change');
  };

  Select2.prototype.destroy = function () {
    this.$container.remove();

    if (this.$element[0].detachEvent) {
      this.$element[0].detachEvent('onpropertychange', this._syncA);
    }

    if (this._observer != null) {
      this._observer.disconnect();
      this._observer = null;
    } else if (this.$element[0].removeEventListener) {
      this.$element[0]
        .removeEventListener('DOMAttrModified', this._syncA, false);
      this.$element[0]
        .removeEventListener('DOMNodeInserted', this._syncS, false);
      this.$element[0]
        .removeEventListener('DOMNodeRemoved', this._syncS, false);
    }

    this._syncA = null;
    this._syncS = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex', this.$element.data('old-tabindex'));

    this.$element.removeClass('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  };

  Select2.prototype.render = function () {
    var $container = $(
      '<span class="select2 select2-container">' +
        '<span class="selection"></span>' +
        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
      '</span>'
    );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container.addClass('select2-container--' + this.options.get('theme'));

    $container.data('element', this.$element);

    return $container;
  };

  return Select2;
});

S2.define('jquery-mousewheel',[
  'jquery'
], function ($) {
  // Used to shim jQuery.mousewheel for non-full builds.
  return $;
});

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults'
], function ($, _, Select2, Defaults) {
  if ($.fn.select2 == null) {
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) {
      options = options || {};

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend(true, {}, options);

          var instance = new Select2($(this), instanceOptions);
        });

        return this;
      } else if (typeof options === 'string') {
        var ret;
        var args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
          var instance = $(this).data('select2');

          if (instance == null && window.console && console.error) {
            console.error(
              'The select2(\'' + options + '\') method was called on an ' +
              'element that is not using Select2.'
            );
          }

          ret = instance[options].apply(instance, args);
        });

        // Check if we should be returning `this`
        if ($.inArray(options, thisMethods) > -1) {
          return this;
        }

        return ret;
      } else {
        throw new Error('Invalid arguments for Select2: ' + options);
      }
    };
  }

  if ($.fn.select2.defaults == null) {
    $.fn.select2.defaults = Defaults;
  }

  return Select2;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
    define: S2.define,
    require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));
function CardJs(elem){this.elem=jQuery(elem),this.captureName=!!this.elem.data("capture-name")&&this.elem.data("capture-name"),this.iconColour=!!this.elem.data("icon-colour")&&this.elem.data("icon-colour"),this.stripe=!!this.elem.data("stripe")&&this.elem.data("stripe"),this.stripe&&(this.captureName=!1),this.initCardNumberInput(),this.initNameInput(),this.initExpiryMonthInput(),this.initExpiryYearInput(),this.initCvcInput(),this.elem.empty(),this.setupCardNumberInput(),this.setupNameInput(),this.setupExpiryInput(),this.setupCvcInput(),this.iconColour&&this.setIconColour(this.iconColour),this.refreshCreditCardTypeIcon()}!function($){var methods={init:function(){return this.data("cardjs",new CardJs(this)),this},cardNumber:function(){return this.data("cardjs").getCardNumber()},cardType:function(){return this.data("cardjs").getCardType()},name:function(){return this.data("cardjs").getName()},expiryMonth:function(){return this.data("cardjs").getExpiryMonth()},expiryYear:function(){return this.data("cardjs").getExpiryYear()},cvc:function(){return this.data("cardjs").getCvc()}};$.fn.CardJs=function(methodOrOptions){return methods[methodOrOptions]?methods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof methodOrOptions&&methodOrOptions?void $.error("Method "+methodOrOptions+" does not exist on jQuery.CardJs"):methods.init.apply(this,arguments)}}(jQuery),$(function(){$(".card-js").each(function(i,obj){$(obj).CardJs()})}),CardJs.prototype.constructor=CardJs,CardJs.KEYS={0:48,9:57,NUMPAD_0:96,NUMPAD_9:105,DELETE:46,BACKSPACE:8,ARROW_LEFT:37,ARROW_RIGHT:39,ARROW_UP:38,ARROW_DOWN:40,HOME:36,END:35,TAB:9,A:65,X:88,C:67,V:86},CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_VISA_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_MASTERCARD_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_DISCOVER_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_JCB_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_AMEX_MASK="XXXX XXXXXX XXXXX",CardJs.CREDIT_CARD_NUMBER_DINERS_MASK="XXXX XXXX XXXX XX",CardJs.prototype.creditCardNumberMask=CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK,CardJs.CREDIT_CARD_NUMBER_PLACEHOLDER="Card number",CardJs.NAME_PLACEHOLDER="Name on card",CardJs.EXPIRY_MASK="XX / XX",CardJs.EXPIRY_PLACEHOLDER="MM / YY",CardJs.EXPIRY_USE_DROPDOWNS=!1,CardJs.EXPIRY_NUMBER_OF_YEARS=10,CardJs.CVC_MASK_3="XXX",CardJs.CVC_MASK_4="XXXX",CardJs.CVC_PLACEHOLDER="CVC",CardJs.CREDIT_CARD_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="3px" width="24px" height="17px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M182.385,14.258c-2.553-2.553-5.621-3.829-9.205-3.829H42.821c-3.585,0-6.653,1.276-9.207,3.829c-2.553,2.553-3.829,5.621-3.829,9.206v99.071c0,3.585,1.276,6.654,3.829,9.207c2.554,2.553,5.622,3.829,9.207,3.829H173.18c3.584,0,6.652-1.276,9.205-3.829s3.83-5.622,3.83-9.207V23.464C186.215,19.879,184.938,16.811,182.385,14.258z M175.785,122.536c0,0.707-0.258,1.317-0.773,1.834c-0.516,0.515-1.127,0.772-1.832,0.772H42.821c-0.706,0-1.317-0.258-1.833-0.773c-0.516-0.518-0.774-1.127-0.774-1.834V73h135.571V122.536z M175.785,41.713H40.214v-18.25c0-0.706,0.257-1.316,0.774-1.833c0.516-0.515,1.127-0.773,1.833-0.773H173.18c0.705,0,1.316,0.257,1.832,0.773c0.516,0.517,0.773,1.127,0.773,1.833V41.713z"/><rect class="svg" x="50.643" y="104.285" width="20.857" height="10.429"/><rect class="svg" x="81.929" y="104.285" width="31.286" height="10.429"/></g></svg>',CardJs.LOCK_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="3px" width="24px" height="17px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M152.646,70.067c-1.521-1.521-3.367-2.281-5.541-2.281H144.5V52.142c0-9.994-3.585-18.575-10.754-25.745c-7.17-7.17-15.751-10.755-25.746-10.755s-18.577,3.585-25.746,10.755C75.084,33.567,71.5,42.148,71.5,52.142v15.644h-2.607c-2.172,0-4.019,0.76-5.54,2.281c-1.521,1.52-2.281,3.367-2.281,5.541v46.929c0,2.172,0.76,4.019,2.281,5.54c1.521,1.52,3.368,2.281,5.54,2.281h78.214c2.174,0,4.02-0.76,5.541-2.281c1.52-1.521,2.281-3.368,2.281-5.54V75.607C154.93,73.435,154.168,71.588,152.646,70.067z M128.857,67.786H87.143V52.142c0-5.757,2.037-10.673,6.111-14.746c4.074-4.074,8.989-6.11,14.747-6.11s10.673,2.036,14.746,6.11c4.073,4.073,6.11,8.989,6.11,14.746V67.786z"/></svg>',CardJs.CALENDAR_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M172.691,23.953c-2.062-2.064-4.508-3.096-7.332-3.096h-10.428v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.554-2.553-5.621-3.83-9.207-3.83h-5.213c-3.586,0-6.654,1.277-9.207,3.83c-2.554,2.553-3.83,5.622-3.83,9.206v7.822H92.359v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.553-2.553-5.622-3.83-9.207-3.83h-5.214c-3.585,0-6.654,1.277-9.207,3.83c-2.553,2.553-3.83,5.622-3.83,9.206v7.822H50.643c-2.825,0-5.269,1.032-7.333,3.096s-3.096,4.509-3.096,7.333v104.287c0,2.823,1.032,5.267,3.096,7.332c2.064,2.064,4.508,3.096,7.333,3.096h114.714c2.824,0,5.27-1.032,7.332-3.096c2.064-2.064,3.096-4.509,3.096-7.332V31.286C175.785,28.461,174.754,26.017,172.691,23.953z M134.073,13.036c0-0.761,0.243-1.386,0.731-1.874c0.488-0.488,1.113-0.733,1.875-0.733h5.213c0.762,0,1.385,0.244,1.875,0.733c0.488,0.489,0.732,1.114,0.732,1.874V36.5c0,0.761-0.244,1.385-0.732,1.874c-0.49,0.488-1.113,0.733-1.875,0.733h-5.213c-0.762,0-1.387-0.244-1.875-0.733s-0.731-1.113-0.731-1.874V13.036z M71.501,13.036c0-0.761,0.244-1.386,0.733-1.874c0.489-0.488,1.113-0.733,1.874-0.733h5.214c0.761,0,1.386,0.244,1.874,0.733c0.488,0.489,0.733,1.114,0.733,1.874V36.5c0,0.761-0.244,1.386-0.733,1.874c-0.489,0.488-1.113,0.733-1.874,0.733h-5.214c-0.761,0-1.386-0.244-1.874-0.733c-0.488-0.489-0.733-1.113-0.733-1.874V13.036z M165.357,135.572H50.643V52.143h114.714V135.572z"/></svg>',CardJs.USER_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M107.999,73c8.638,0,16.011-3.056,22.12-9.166c6.111-6.11,9.166-13.483,9.166-22.12c0-8.636-3.055-16.009-9.166-22.12c-6.11-6.11-13.484-9.165-22.12-9.165c-8.636,0-16.01,3.055-22.12,9.165c-6.111,6.111-9.166,13.484-9.166,22.12c0,8.637,3.055,16.01,9.166,22.12C91.99,69.944,99.363,73,107.999,73z"/><path class="svg" d="M165.07,106.037c-0.191-2.743-0.571-5.703-1.141-8.881c-0.57-3.178-1.291-6.124-2.16-8.84c-0.869-2.715-2.037-5.363-3.504-7.943c-1.466-2.58-3.15-4.78-5.052-6.6s-4.223-3.272-6.965-4.358c-2.744-1.086-5.772-1.63-9.085-1.63c-0.489,0-1.63,0.584-3.422,1.752s-3.815,2.472-6.069,3.911c-2.254,1.438-5.188,2.743-8.799,3.909c-3.612,1.168-7.237,1.752-10.877,1.752c-3.639,0-7.264-0.584-10.876-1.752c-3.611-1.166-6.545-2.471-8.799-3.909c-2.254-1.439-4.277-2.743-6.069-3.911c-1.793-1.168-2.933-1.752-3.422-1.752c-3.313,0-6.341,0.544-9.084,1.63s-5.065,2.539-6.966,4.358c-1.901,1.82-3.585,4.02-5.051,6.6s-2.634,5.229-3.503,7.943c-0.869,2.716-1.589,5.662-2.159,8.84c-0.571,3.178-0.951,6.137-1.141,8.881c-0.19,2.744-0.285,5.554-0.285,8.433c0,6.517,1.983,11.664,5.948,15.439c3.965,3.774,9.234,5.661,15.806,5.661h71.208c6.572,0,11.84-1.887,15.806-5.661c3.966-3.775,5.948-8.921,5.948-15.439C165.357,111.591,165.262,108.78,165.07,106.037z"/></g></svg>',CardJs.MAIL_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M177.171,19.472c-2.553-2.553-5.622-3.829-9.206-3.829H48.036c-3.585,0-6.654,1.276-9.207,3.829C36.276,22.025,35,25.094,35,28.679v88.644c0,3.585,1.276,6.652,3.829,9.205c2.553,2.555,5.622,3.83,9.207,3.83h119.929c3.584,0,6.653-1.275,9.206-3.83c2.554-2.553,3.829-5.621,3.829-9.205V28.679C181,25.094,179.725,22.025,177.171,19.472zM170.57,117.321c0,0.706-0.258,1.317-0.774,1.833s-1.127,0.773-1.832,0.773H48.035c-0.706,0-1.317-0.257-1.833-0.773c-0.516-0.516-0.774-1.127-0.774-1.833V54.75c1.738,1.955,3.612,3.748,5.622,5.377c14.557,11.189,26.126,20.368,34.708,27.538c2.77,2.336,5.024,4.155,6.762,5.459s4.087,2.62,7.047,3.951s5.744,1.995,8.351,1.995H108h0.081c2.606,0,5.392-0.664,8.351-1.995c2.961-1.331,5.311-2.647,7.049-3.951c1.737-1.304,3.992-3.123,6.762-5.459c8.582-7.17,20.15-16.349,34.707-27.538c2.01-1.629,3.885-3.422,5.621-5.377V117.321z M170.57,30.797v0.896c0,3.204-1.262,6.776-3.787,10.713c-2.525,3.938-5.256,7.075-8.188,9.41c-10.484,8.257-21.373,16.865-32.672,25.827c-0.326,0.271-1.277,1.073-2.852,2.403c-1.574,1.331-2.824,2.351-3.748,3.056c-0.924,0.707-2.131,1.562-3.625,2.566s-2.865,1.752-4.114,2.24s-2.417,0.732-3.503,0.732H108h-0.082c-1.086,0-2.253-0.244-3.503-0.732c-1.249-0.488-2.621-1.236-4.114-2.24c-1.493-1.004-2.702-1.859-3.625-2.566c-0.923-0.705-2.173-1.725-3.748-3.056c-1.575-1.33-2.526-2.132-2.852-2.403c-11.297-8.962-22.187-17.57-32.67-25.827c-7.985-6.3-11.977-14.013-11.977-23.138c0-0.706,0.258-1.317,0.774-1.833c0.516-0.516,1.127-0.774,1.833-0.774h119.929c0.434,0.244,0.814,0.312,1.141,0.204c0.326-0.11,0.57,0.094,0.732,0.61c0.163,0.516,0.312,0.76,0.448,0.733c0.136-0.027,0.218,0.312,0.245,1.019c0.025,0.706,0.039,1.061,0.039,1.061V30.797z"/></svg>',CardJs.INFORMATION_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M97.571,41.714h20.859c1.411,0,2.633-0.516,3.666-1.548c1.031-1.031,1.547-2.254,1.547-3.666V20.857c0-1.412-0.516-2.634-1.549-3.667c-1.031-1.031-2.254-1.548-3.666-1.548H97.571c-1.412,0-2.634,0.517-3.666,1.548c-1.032,1.032-1.548,2.255-1.548,3.667V36.5c0,1.412,0.516,2.635,1.548,3.666C94.937,41.198,96.159,41.714,97.571,41.714z"/><path class="svg" d="M132.523,111.048c-1.031-1.032-2.254-1.548-3.666-1.548h-5.215V62.571c0-1.412-0.516-2.634-1.547-3.666c-1.033-1.032-2.255-1.548-3.666-1.548H87.143c-1.412,0-2.634,0.516-3.666,1.548c-1.032,1.032-1.548,2.254-1.548,3.666V73c0,1.412,0.516,2.635,1.548,3.666c1.032,1.032,2.254,1.548,3.666,1.548h5.215V109.5h-5.215c-1.412,0-2.634,0.516-3.666,1.548c-1.032,1.032-1.548,2.254-1.548,3.666v10.429c0,1.412,0.516,2.635,1.548,3.668c1.032,1.03,2.254,1.547,3.666,1.547h41.714c1.412,0,2.634-0.517,3.666-1.547c1.031-1.033,1.547-2.256,1.547-3.668v-10.429C134.07,113.302,133.557,112.08,132.523,111.048z"/></g></svg>',CardJs.keyCodeFromEvent=function(e){return e.which||e.keyCode},CardJs.keyIsCommandFromEvent=function(e){return e.ctrlKey||e.metaKey},CardJs.keyIsNumber=function(e){return CardJs.keyIsTopNumber(e)||CardJs.keyIsKeypadNumber(e)},CardJs.keyIsTopNumber=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return keyCode>=CardJs.KEYS[0]&&keyCode<=CardJs.KEYS[9]},CardJs.keyIsKeypadNumber=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return keyCode>=CardJs.KEYS.NUMPAD_0&&keyCode<=CardJs.KEYS.NUMPAD_9},CardJs.keyIsDelete=function(e){return CardJs.keyCodeFromEvent(e)==CardJs.KEYS.DELETE},CardJs.keyIsBackspace=function(e){return CardJs.keyCodeFromEvent(e)==CardJs.KEYS.BACKSPACE},CardJs.keyIsDeletion=function(e){return CardJs.keyIsDelete(e)||CardJs.keyIsBackspace(e)},CardJs.keyIsArrow=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return keyCode>=CardJs.KEYS.ARROW_LEFT&&keyCode<=CardJs.KEYS.ARROW_DOWN},CardJs.keyIsNavigation=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return keyCode==CardJs.KEYS.HOME||keyCode==CardJs.KEYS.END},CardJs.keyIsKeyboardCommand=function(e){var keyCode=CardJs.keyCodeFromEvent(e);return CardJs.keyIsCommandFromEvent(e)&&(keyCode==CardJs.KEYS.A||keyCode==CardJs.KEYS.X||keyCode==CardJs.KEYS.C||keyCode==CardJs.KEYS.V)},CardJs.keyIsTab=function(e){return CardJs.keyCodeFromEvent(e)==CardJs.KEYS.TAB},CardJs.copyAllElementAttributes=function(source,destination){$.each(source[0].attributes,function(idx,attr){destination.attr(attr.nodeName,attr.nodeValue)})},CardJs.numbersOnlyString=function(string){for(var numbersOnlyString="",i=0;i<string.length;i++){var currentChar=string.charAt(i),isValid=!isNaN(parseInt(currentChar));isValid&&(numbersOnlyString+=currentChar)}return numbersOnlyString},CardJs.applyFormatMask=function(string,mask){for(var formattedString="",numberPos=0,j=0;j<mask.length;j++){var currentMaskChar=mask[j];if("X"==currentMaskChar){var digit=string.charAt(numberPos);if(!digit)break;formattedString+=string.charAt(numberPos),numberPos++}else formattedString+=currentMaskChar}return formattedString},CardJs.cardTypeFromNumber=function(number){if(re=new RegExp("^30[0-5]"),null!=number.match(re))return"Diners - Carte Blanche";if(re=new RegExp("^(30[6-9]|36|38)"),null!=number.match(re))return"Diners";if(re=new RegExp("^35(2[89]|[3-8][0-9])"),null!=number.match(re))return"JCB";if(re=new RegExp("^3[47]"),null!=number.match(re))return"AMEX";if(re=new RegExp("^(4026|417500|4508|4844|491(3|7))"),null!=number.match(re))return"Visa Electron";var re=new RegExp("^4");return null!=number.match(re)?"Visa":(re=new RegExp("^5[1-5]"),null!=number.match(re)?"Mastercard":(re=new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"),null!=number.match(re)?"Discover":""))},CardJs.caretStartPosition=function(element){return"number"==typeof element.selectionStart&&element.selectionStart},CardJs.caretEndPosition=function(element){return"number"==typeof element.selectionEnd&&element.selectionEnd},CardJs.setCaretPosition=function(element,caretPos){if(null!=element)if(element.createTextRange){var range=element.createTextRange();range.move("character",caretPos),range.select()}else element.selectionStart?(element.focus(),element.setSelectionRange(caretPos,caretPos)):element.focus()},CardJs.normaliseCaretPosition=function(mask,caretPosition){var numberPos=0;if(caretPosition<0||caretPosition>mask.length)return 0;for(var i=0;i<mask.length;i++){if(i==caretPosition)return numberPos;"X"==mask[i]&&numberPos++}return numberPos},CardJs.denormaliseCaretPosition=function(mask,caretPosition){var numberPos=0;if(caretPosition<0||caretPosition>mask.length)return 0;for(var i=0;i<mask.length;i++){if(numberPos==caretPosition)return i;"X"==mask[i]&&numberPos++}return mask.length},CardJs.filterNumberOnlyKey=function(e){var isNumber=CardJs.keyIsNumber(e),isDeletion=CardJs.keyIsDeletion(e),isArrow=CardJs.keyIsArrow(e),isNavigation=CardJs.keyIsNavigation(e),isKeyboardCommand=CardJs.keyIsKeyboardCommand(e),isTab=CardJs.keyIsTab(e);isNumber||isDeletion||isArrow||isNavigation||isKeyboardCommand||isTab||e.preventDefault()},CardJs.digitFromKeyCode=function(keyCode){return keyCode>=CardJs.KEYS[0]&&keyCode<=CardJs.KEYS[9]?keyCode-CardJs.KEYS[0]:keyCode>=CardJs.KEYS.NUMPAD_0&&keyCode<=CardJs.KEYS.NUMPAD_9?keyCode-CardJs.KEYS.NUMPAD_0:null},CardJs.handleMaskedNumberInputKey=function(e,mask){CardJs.filterNumberOnlyKey(e);var keyCode=e.which||e.keyCode,element=e.target,caretStart=CardJs.caretStartPosition(element),caretEnd=CardJs.caretEndPosition(element),normalisedStartCaretPosition=CardJs.normaliseCaretPosition(mask,caretStart),normalisedEndCaretPosition=CardJs.normaliseCaretPosition(mask,caretEnd),newCaretPosition=caretStart,isNumber=CardJs.keyIsNumber(e),isDelete=CardJs.keyIsDelete(e),isBackspace=CardJs.keyIsBackspace(e);if(isNumber||isDelete||isBackspace){e.preventDefault();var rawText=$(element).val(),numbersOnly=CardJs.numbersOnlyString(rawText),digit=CardJs.digitFromKeyCode(keyCode),rangeHighlighted=normalisedEndCaretPosition>normalisedStartCaretPosition;rangeHighlighted&&(numbersOnly=numbersOnly.slice(0,normalisedStartCaretPosition)+numbersOnly.slice(normalisedEndCaretPosition)),caretStart!=mask.length&&(isNumber&&rawText.length<=mask.length&&(numbersOnly=numbersOnly.slice(0,normalisedStartCaretPosition)+digit+numbersOnly.slice(normalisedStartCaretPosition),newCaretPosition=Math.max(CardJs.denormaliseCaretPosition(mask,normalisedStartCaretPosition+1),CardJs.denormaliseCaretPosition(mask,normalisedStartCaretPosition+2)-1)),isDelete&&(numbersOnly=numbersOnly.slice(0,normalisedStartCaretPosition)+numbersOnly.slice(normalisedStartCaretPosition+1))),0!=caretStart&&isBackspace&&!rangeHighlighted&&(numbersOnly=numbersOnly.slice(0,normalisedStartCaretPosition-1)+numbersOnly.slice(normalisedStartCaretPosition),newCaretPosition=CardJs.denormaliseCaretPosition(mask,normalisedStartCaretPosition-1)),$(element).val(CardJs.applyFormatMask(numbersOnly,mask)),CardJs.setCaretPosition(element,newCaretPosition)}},CardJs.handleCreditCardNumberKey=function(e,cardMask){CardJs.handleMaskedNumberInputKey(e,cardMask)},CardJs.handleCreditCardNumberChange=function(e){},CardJs.handleExpiryKey=function(e){CardJs.handleMaskedNumberInputKey(e,CardJs.EXPIRY_MASK)},CardJs.prototype.getCardNumber=function(){return this.cardNumberInput.val()},CardJs.prototype.getCardType=function(){return CardJs.cardTypeFromNumber(this.getCardNumber())},CardJs.prototype.getName=function(){return this.nameInput.val()},CardJs.prototype.getExpiryMonth=function(){return this.expiryMonthInput.val()},CardJs.prototype.getExpiryYear=function(){return this.expiryYearInput.val()},CardJs.prototype.getCvc=function(){return this.cvcInput.val()},CardJs.prototype.setIconColour=function(colour){this.elem.find(".icon .svg").css({fill:colour})},CardJs.prototype.setIconColour=function(colour){this.elem.find(".icon .svg").css({fill:colour})},CardJs.prototype.refreshCreditCardTypeIcon=function(){this.setCardTypeIconFromNumber(CardJs.numbersOnlyString(this.cardNumberInput.val()))},CardJs.prototype.clearCardTypeIcon=function(){this.elem.find(".card-number-wrapper .card-type-icon").removeClass("show")},CardJs.prototype.setCardTypeIconAsVisa=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show visa")},CardJs.prototype.setCardTypeIconAsMasterCard=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show master-card")},CardJs.prototype.setCardTypeIconAsAmericanExpress=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show american-express")},CardJs.prototype.setCardTypeIconAsDiscover=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show discover")},CardJs.prototype.setCardTypeIconAsDiners=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show diners")},CardJs.prototype.setCardTypeIconAsJcb=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show jcb")},CardJs.prototype.setCardTypeIconFromNumber=function(number){switch(CardJs.cardTypeFromNumber(number)){case"Visa Electron":case"Visa":this.setCardTypeAsVisa();break;case"Mastercard":this.setCardTypeAsMasterCard();break;case"AMEX":this.setCardTypeAsAmericanExpress();break;case"Discover":this.setCardTypeAsDiscover();break;case"Diners - Carte Blanche":case"Diners":this.setCardTypeAsDiners();break;case"JCB":this.setCardTypeAsJcb();break;default:this.clearCardType()}},CardJs.prototype.setCardMask=function(cardMask){this.creditCardNumberMask=cardMask,this.cardNumberInput.attr("maxlength",cardMask.length)},CardJs.prototype.setCvc3=function(){this.cvcInput.attr("maxlength",CardJs.CVC_MASK_3.length)},CardJs.prototype.setCvc4=function(){this.cvcInput.attr("maxlength",CardJs.CVC_MASK_4.length)},CardJs.prototype.clearCardType=function(){this.clearCardTypeIcon(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsVisa=function(){this.setCardTypeIconAsVisa(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_VISA_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsMasterCard=function(){this.setCardTypeIconAsMasterCard(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_MASTERCARD_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsAmericanExpress=function(){this.setCardTypeIconAsAmericanExpress(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_AMEX_MASK),this.setCvc4()},CardJs.prototype.setCardTypeAsDiscover=function(){this.setCardTypeIconAsDiscover(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DISCOVER_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsDiners=function(){this.setCardTypeIconAsDiners(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DINERS_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsJcb=function(){this.setCardTypeIconAsJcb(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_JCB_MASK),this.setCvc3()},CardJs.prototype.initCardNumberInput=function(){var $this=this;this.cardNumberInput=this.elem.find(".card-number"),this.cardNumberInput[0]?this.cardNumberInput.detach():this.cardNumberInput=$("<input class='card-number' />"),this.cardNumberInput.attr("type","tel"),this.cardNumberInput.attr("placeholder")||this.cardNumberInput.attr("placeholder",CardJs.CREDIT_CARD_NUMBER_PLACEHOLDER),this.cardNumberInput.attr("maxlength",this.creditCardNumberMask.length),this.cardNumberInput.attr("x-autocompletetype","cc-number"),this.cardNumberInput.attr("autocompletetype","cc-number"),this.cardNumberInput.attr("autocorrect","off"),this.cardNumberInput.attr("spellcheck","off"),this.cardNumberInput.attr("autocapitalize","off"),this.cardNumberInput.keydown(function(e){CardJs.handleCreditCardNumberKey(e,$this.creditCardNumberMask)}),this.cardNumberInput.keyup(function(e){$this.refreshCreditCardTypeIcon()}),this.cardNumberInput.change(CardJs.handleCreditCardNumberChange)},CardJs.prototype.initNameInput=function(){this.nameInput=this.elem.find(".name"),this.nameInput[0]?(this.captureName=!0,this.nameInput.detach()):this.nameInput=$("<input class='name' />"),this.nameInput.attr("placeholder")||this.nameInput.attr("placeholder",CardJs.NAME_PLACEHOLDER)},CardJs.prototype.initExpiryMonthInput=function(){this.expiryMonthInput=this.elem.find(".expiry-month"),this.expiryMonthInput[0]?this.expiryMonthInput.detach():this.expiryMonthInput=$("<input class='expiry-month' />")},CardJs.prototype.initExpiryYearInput=function(){this.expiryYearInput=this.elem.find(".expiry-year"),this.expiryYearInput[0]?this.expiryYearInput.detach():this.expiryYearInput=$("<input class='expiry-year' />")},CardJs.prototype.initCvcInput=function(){this.cvcInput=this.elem.find(".cvc"),this.cvcInput[0]?this.cvcInput.detach():this.cvcInput=$("<input class='cvc' />"),this.cvcInput.attr("type","tel"),this.cvcInput.attr("placeholder")||this.cvcInput.attr("placeholder",CardJs.CVC_PLACEHOLDER),this.cvcInput.attr("maxlength",CardJs.CVC_MASK_3.length),this.cvcInput.attr("x-autocompletetype","cc-csc"),this.cvcInput.attr("autocompletetype","cc-csc"),this.cvcInput.attr("autocorrect","off"),this.cvcInput.attr("spellcheck","off"),this.cvcInput.attr("autocapitalize","off"),this.cvcInput.keydown(CardJs.filterNumberOnlyKey)},CardJs.prototype.setupCardNumberInput=function(){this.stripe&&this.cardNumberInput.attr("data-stripe","number"),this.elem.append("<div class='card-number-wrapper'></div>");var wrapper=this.elem.find(".card-number-wrapper");wrapper.append(this.cardNumberInput),wrapper.append("<div class='card-type-icon'></div>"),wrapper.append("<div class='icon'></div>"),wrapper.find(".icon").append(CardJs.CREDIT_CARD_SVG)},CardJs.prototype.setupNameInput=function(){if(this.captureName){this.elem.append("<div class='name-wrapper'></div>");var wrapper=this.elem.find(".name-wrapper");wrapper.append(this.nameInput),wrapper.append("<div class='icon'></div>"),wrapper.find(".icon").append(CardJs.USER_SVG)}},CardJs.prototype.setupExpiryInput=function(){this.elem.append("<div class='expiry-container'><div class='expiry-wrapper'></div></div>");var expiryInput,wrapper=this.elem.find(".expiry-wrapper");if(this.EXPIRY_USE_DROPDOWNS){expiryInput=$("<div></div>");var expiryMonthNew=$("<select><option value='any' selected='' hidden=''>MM</option><option value='1'>01</option><option value='2'>02</option><option value='3'>03</option><option value='4'>04</option><option value='5'>05</option><option value='6'>06</option><option value='7'>07</option><option value='8'>08</option><option value='9'>09</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option></select>"),expiryMonthOld=this.expiryMonthInput;CardJs.copyAllElementAttributes(expiryMonthOld,expiryMonthNew),this.expiryMonthInput.remove(),this.expiryMonthInput=expiryMonthNew;for(var expiryYearNew=$("<select><option value='any' selected='' hidden=''>YY</option></select>"),currentYear=parseInt((new Date).getFullYear().toString().substring(2,4)),i=0;i<CardJs.EXPIRY_NUMBER_OF_YEARS;i++)expiryYearNew.append("<option value='"+currentYear+"'>"+currentYear+"</option>"),currentYear=(currentYear+1)%100;var expiryYearOld=this.expiryYearInput;CardJs.copyAllElementAttributes(expiryYearOld,expiryYearNew),this.expiryYearInput.remove(),this.expiryYearInput=expiryYearNew,expiryInput.append(this.expiryMonthInput),expiryInput.append(this.expiryYearInput)}else{expiryInput=$("<div></div>"),this.expiryMonthInput=$("<input type='hidden' name='expiry-month' />"),this.expiryYearInput=$("<input type='hidden' name='expiry-year' />"),this.stripe&&(this.expiryMonthInput.attr("data-stripe","exp-month"),this.expiryYearInput.attr("data-stripe","exp-year")),this.expiryMonthYearInput=$("<input class='expiry' />"),this.expiryMonthYearInput.attr("type","tel"),this.expiryMonthYearInput.attr("placeholder")||this.expiryMonthYearInput.attr("placeholder",CardJs.EXPIRY_PLACEHOLDER),this.expiryMonthYearInput.attr("maxlength",CardJs.EXPIRY_MASK.length),this.expiryMonthYearInput.attr("x-autocompletetype","cc-exp"),this.expiryMonthYearInput.attr("autocompletetype","cc-exp"),this.expiryMonthYearInput.attr("autocorrect","off"),this.expiryMonthYearInput.attr("spellcheck","off"),this.expiryMonthYearInput.attr("autocapitalize","off");var $this=this;this.expiryMonthYearInput.keydown(function(e){CardJs.handleExpiryKey(e);var val=$this.expiryMonthYearInput.val();1==val.length&&parseInt(val)>1&&CardJs.keyIsNumber(e)&&$this.expiryMonthYearInput.val(CardJs.applyFormatMask("0"+val,CardJs.EXPIRY_MASK)),$this.EXPIRY_USE_DROPDOWNS||null==$this.expiryMonthYearInput||($this.expiryMonthInput.val($this.expiryMonth()),$this.expiryYearInput.val(7==val.length?val.substr(5,2):null))}),this.expiryMonthYearInput.on("blur input",function(e){$this.updateHiddenExpiryFields()}),this.cardNumberInput.on("blur input",function(e){$this.updateHiddenExpiryFields()}),this.expiryMonthYearInput.blur(function(e){$this.refreshExpiryMonthValidation()}),expiryInput.append(this.expiryMonthYearInput),expiryInput.append(this.expiryMonthInput),expiryInput.append(this.expiryYearInput)}wrapper.append(expiryInput),wrapper.append("<div class='icon'></div>"),wrapper.find(".icon").append(CardJs.CALENDAR_SVG)},CardJs.prototype.setupCvcInput=function(){this.stripe&&this.cvcInput.attr("data-stripe","cvc"),this.elem.append("<div class='cvc-container'><div class='cvc-wrapper'></div></div>");var wrapper=this.elem.find(".cvc-wrapper");wrapper.append(this.cvcInput),wrapper.append("<div class='icon'></div>"),wrapper.find(".icon").append(CardJs.LOCK_SVG)},CardJs.prototype.expiryMonth=function(){if(!this.EXPIRY_USE_DROPDOWNS&&null!=this.expiryMonthYearInput){var val=this.expiryMonthYearInput.val();return val.length>=2?parseInt(val.substr(0,2)):null}return null},CardJs.isValidMonth=function(expiryMonth){return expiryMonth>=1&&expiryMonth<=12},CardJs.isExpiryValid=function(month,year){var today=new Date,currentMonth=today.getMonth()+1,currentYear=""+today.getFullYear();return 2==(""+year).length&&(year=currentYear.substring(0,2)+""+year),currentMonth=parseInt(currentMonth),currentYear=parseInt(currentYear),month=parseInt(month),year=parseInt(year),CardJs.isValidMonth(month)&&(year>currentYear||year==currentYear&&month>=currentMonth)},CardJs.prototype.refreshExpiryMonthValidation=function(){CardJs.isExpiryValid(this.getExpiryMonth(),this.getExpiryYear())?this.setExpiryMonthAsValid():this.setExpiryMonthAsInvalid()},CardJs.prototype.updateHiddenExpiryFields=function(){var vals=this.expiryMonthYearInput.val().match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);if(null!=vals){var month=vals[1],year=vals[2];this.expiryMonthInput.val(month),this.expiryYearInput.val(year),this.expiryMonthYearInput.val(month+" / "+year)}},CardJs.prototype.setExpiryMonthAsValid=function(){this.EXPIRY_USE_DROPDOWNS||this.expiryMonthYearInput.parent().removeClass("has-error")},CardJs.prototype.setExpiryMonthAsInvalid=function(){this.EXPIRY_USE_DROPDOWNS||this.expiryMonthYearInput.parent().addClass("has-error")};
/*!
* sweetalert2 v7.18.0
* Released under the MIT License.
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sweetalert2 = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var consolePrefix = 'SweetAlert2:';

/**
 * Filter the unique values into a new array
 * @param arr
 */
var uniqueArray = function uniqueArray(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
};

/**
 * Converts `inputOptions` into an array of `[value, label]`s
 * @param inputOptions
 */
var formatInputOptions = function formatInputOptions(inputOptions) {
  var result = [];
  if (inputOptions instanceof Map) {
    inputOptions.forEach(function (value, key) {
      result.push([key, value]);
    });
  } else {
    Object.keys(inputOptions).forEach(function (key) {
      result.push([key, inputOptions[key]]);
    });
  }
  return result;
};

/**
 * Standardise console warnings
 * @param message
 */
var warn = function warn(message) {
  console.warn(consolePrefix + ' ' + message);
};

/**
 * Standardise console errors
 * @param message
 */
var error = function error(message) {
  console.error(consolePrefix + ' ' + message);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
var previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */
var warnOnce = function warnOnce(message) {
  if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
var callIfFunction = function callIfFunction(arg) {
  return typeof arg === 'function' ? arg() : arg;
};

var isThenable = function isThenable(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.then === 'function';
};

var DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'overlay',
  close: 'close',
  esc: 'esc',
  timer: 'timer'
});

var version = "7.18.0";

var argsToParams = function argsToParams(args) {
  var params = {};
  switch (_typeof(args[0])) {
    case 'string':
      ['title', 'html', 'type'].forEach(function (name, index) {
        if (args[index] !== undefined) {
          params[name] = args[index];
        }
      });
      break;

    case 'object':
      _extends(params, args[0]);
      break;

    default:
      error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
      return false;
  }
  return params;
};

/**
 * Adapt a legacy inputValidator for use with expectRejections=false
 */
var adaptInputValidator = function adaptInputValidator(legacyValidator) {
  return function adaptedInputValidator(inputValue, extraParams) {
    return legacyValidator.call(this, inputValue, extraParams).then(function () {
      return undefined;
    }, function (validationError) {
      return validationError;
    });
  };
};

var swalPrefix = 'swal2-';

var prefix = function prefix(items) {
  var result = {};
  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

var swalClasses = prefix(['container', 'shown', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'icon-text', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

// Remember state in cases where opening and handling a modal will fiddle with it.
var states = {
  previousActiveElement: null,
  previousBodyPadding: null
};

var hasClass = function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return false;
};

var focusInput = function focusInput(input) {
  input.focus();

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};

var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
  if (!target || !classList) {
    return;
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }
  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        add ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      add ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};

var addClass = function addClass(target, classList) {
  addOrRemoveClass(target, classList, true);
};

var removeClass = function removeClass(target, classList) {
  addOrRemoveClass(target, classList, false);
};

var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

var show = function show(elem) {
  elem.style.opacity = '';
  elem.style.display = elem.id === swalClasses.content ? 'block' : 'flex';
};

var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var empty = function empty(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// borrowed from jquery $(elem).is(':visible') implementation
var isVisible = function isVisible(elem) {
  return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

var removeStyleProperty = function removeStyleProperty(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

// Reset previous window keydown handler and focued element
var resetPrevState = function resetPrevState() {
  if (states.previousActiveElement && states.previousActiveElement.focus) {
    var x = window.scrollX;
    var y = window.scrollY;
    states.previousActiveElement.focus();
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      // IE doesn't have scrollX/scrollY support
      window.scrollTo(x, y);
    }
  }
};

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};

var elementByClass = function elementByClass(className) {
  var container = getContainer();
  return container ? container.querySelector('.' + className) : null;
};

var getPopup = function getPopup() {
  return elementByClass(swalClasses.popup);
};

var getIcons = function getIcons() {
  var popup = getPopup();
  return popup.querySelectorAll('.' + swalClasses.icon);
};

var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};

var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};

var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};

var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses.progresssteps);
};

var getValidationError = function getValidationError() {
  return elementByClass(swalClasses.validationerror);
};

var getConfirmButton = function getConfirmButton() {
  return elementByClass(swalClasses.confirm);
};

var getCancelButton = function getCancelButton() {
  return elementByClass(swalClasses.cancel);
};

var getButtonsWrapper = function getButtonsWrapper() {
  warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
  return elementByClass(swalClasses.actions);
};

var getActions = function getActions() {
  return elementByClass(swalClasses.actions);
};

var getFooter = function getFooter() {
  return elementByClass(swalClasses.footer);
};

var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
};

var getFocusableElements = function getFocusableElements() {
  var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
  // sort according to tabindex
  .sort(function (a, b) {
    a = parseInt(a.getAttribute('tabindex'));
    b = parseInt(b.getAttribute('tabindex'));
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });

  // https://github.com/jkup/focusable/blob/master/index.js
  var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]'));

  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
};

var isModal = function isModal() {
  return !document.body.classList.contains(swalClasses['toast-shown']);
};

var isToast = function isToast() {
  return document.body.classList.contains(swalClasses['toast-shown']);
};

var isLoading = function isLoading() {
  return getPopup().hasAttribute('data-loading');
};

// Detect Node env
var isNodeEnv = function isNodeEnv() {
  return typeof window === 'undefined' || typeof document === 'undefined';
};

var sweetHTML = ('\n <div aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">\n       <span class="' + swalClasses['icon-text'] + '">?</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">\n       <span class="' + swalClasses['icon-text'] + '">!</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">\n       <span class="' + swalClasses['icon-text'] + '">i</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

/*
 * Add modal + backdrop to DOM
 */
var init = function init(params) {
  // Clean up the old popup if it exists
  var c = getContainer();
  if (c) {
    c.parentNode.removeChild(c);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
  }

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;

  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  targetElement.appendChild(container);

  var popup = getPopup();
  var content = getContent();
  var input = getChildByClass(content, swalClasses.input);
  var file = getChildByClass(content, swalClasses.file);
  var range = content.querySelector('.' + swalClasses.range + ' input');
  var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
  var select = getChildByClass(content, swalClasses.select);
  var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
  var textarea = getChildByClass(content, swalClasses.textarea);

  // a11y
  popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
  if (!params.toast) {
    popup.setAttribute('aria-modal', 'true');
  }

  var resetValidationError = function resetValidationError() {
    SweetAlert.isVisible() && SweetAlert.resetValidationError();
  };

  input.oninput = resetValidationError;
  file.onchange = resetValidationError;
  select.onchange = resetValidationError;
  checkbox.onchange = resetValidationError;
  textarea.oninput = resetValidationError;

  range.oninput = function () {
    resetValidationError();
    rangeOutput.value = range.value;
  };

  range.onchange = function () {
    resetValidationError();
    range.nextSibling.value = range.value;
  };

  return popup;
};

var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
  if (!param) {
    return hide(target);
  }

  if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
    target.innerHTML = '';
    if (0 in param) {
      for (var i = 0; i in param; i++) {
        target.appendChild(param[i].cloneNode(true));
      }
    } else {
      target.appendChild(param.cloneNode(true));
    }
  } else if (param) {
    target.innerHTML = param;
  } else {}
  show(target);
};

var animationEndEvent = function () {
  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var testEl = document.createElement('div');
  var transEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd oanimationend',
    'animation': 'animationend'
  };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i];
    }
  }

  return false;
}();

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    return 0;
  }
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = document.body.style.paddingRight;
    document.body.style.paddingRight = measureScrollbar() + 'px';
  }
};

var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding;
    states.previousBodyPadding = null;
  }
};

// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
  }
};

var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  type: null,
  toast: false,
  customClass: '',
  target: 'body',
  backdrop: true,
  animation: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: null,
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: null,
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusCancel: false,
  showCloseButton: false,
  closeButtonAriaLabel: 'Close this dialog',
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageAlt: '',
  imageClass: null,
  timer: null,
  width: null,
  padding: null,
  background: null,
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: null,
  onBeforeOpen: null,
  onAfterClose: null,
  onOpen: null,
  onClose: null,
  useRejections: false,
  expectRejections: false
};

var deprecatedParams = ['useRejections', 'expectRejections'];

/**
 * Is valid parameter
 * @param {String} paramName
 */
var isValidParameter = function isValidParameter(paramName) {
  return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
};

/**
 * Is deprecated parameter
 * @param {String} paramName
 */
var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
  return deprecatedParams.indexOf(paramName) !== -1;
};

/**
 * Show relevant warnings for given params
 *
 * @param params
 */
var showWarningsForParams = function showWarningsForParams(params) {
  for (var param in params) {
    if (!isValidParameter(param)) {
      warn('Unknown parameter "' + param + '"');
    }
    if (isDeprecatedParameter(param)) {
      warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
    }
  }
};

var globalState = {
  popupParams: _extends({}, defaultParams)
};

/*
 * Global function to close sweetAlert
 */
var close = function close(onClose, onAfterClose) {
  var container = getContainer();
  var popup = getPopup();
  if (!popup) {
    return;
  }

  if (onClose !== null && typeof onClose === 'function') {
    onClose(popup);
  }

  removeClass(popup, swalClasses.show);
  addClass(popup, swalClasses.hide);
  clearTimeout(popup.timeout);

  if (!isToast()) {
    resetPrevState();
    window.onkeydown = globalState.previousWindowKeyDown;
    globalState.windowOnkeydownOverridden = false;
  }

  var removePopupAndResetState = function removePopupAndResetState() {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
    }

    if (onAfterClose !== null && typeof onAfterClose === 'function') {
      setTimeout(function () {
        onAfterClose();
      });
    }
  };

  // If animation is supported, animate
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      if (hasClass(popup, swalClasses.hide)) {
        removePopupAndResetState();
      }
    });
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState();
  }
};

/*
 * Global function to determine if swal2 popup is shown
 */
var isVisible$1 = function isVisible() {
  return !!getPopup();
};

/*
 * Global function to click 'Confirm' button
 */
var clickConfirm = function clickConfirm() {
  return getConfirmButton().click();
};

/*
 * Global function to click 'Cancel' button
 */
var clickCancel = function clickCancel() {
  return getCancelButton().click();
};

/**
 * Returns an extended version of `Swal` containing `params` as defaults.
 * Useful for reusing Swal configuration.
 *
 * For example:
 *
 * Before:
 * const textPromptOptions = { input: 'text', showCancelButton: true }
 * const {value: firstName} = await Swal({ ...textPromptOptions, title: 'What is your first name?' })
 * const {value: lastName} = await Swal({ ...textPromptOptions, title: 'What is your last name?' })
 *
 * After:
 * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
 * const {value: firstName} = await TextPrompt.fire('What is your first name?')
 * const {value: lastName} = await TextPrompt.fire('What is your last name?')
 *
 * @param params
 */
function mixin(mixinParams) {
  var Swal = this;
  return function (_Swal) {
    inherits(MixinSwal, _Swal);

    function MixinSwal() {
      classCallCheck(this, MixinSwal);
      return possibleConstructorReturn(this, (MixinSwal.__proto__ || Object.getPrototypeOf(MixinSwal)).apply(this, arguments));
    }

    createClass(MixinSwal, [{
      key: "_main",
      value: function _main(params) {
        return get(MixinSwal.prototype.__proto__ || Object.getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, _extends({}, mixinParams, params));
      }
    }]);
    return MixinSwal;
  }(Swal);
}

// private global state for the queue feature
var currentSteps = [];

/*
 * Global function for chaining sweetAlert popups
 */
var queue = function queue(steps) {
  var swal = this;
  currentSteps = steps;
  var resetQueue = function resetQueue() {
    currentSteps = [];
    document.body.removeAttribute('data-swal2-queue-step');
  };
  var queueResult = [];
  return new Promise(function (resolve, reject) {
    (function step(i, callback) {
      if (i < currentSteps.length) {
        document.body.setAttribute('data-swal2-queue-step', i);

        swal(currentSteps[i]).then(function (result) {
          if (typeof result.value !== 'undefined') {
            queueResult.push(result.value);
            step(i + 1, callback);
          } else {
            resetQueue();
            resolve({ dismiss: result.dismiss });
          }
        });
      } else {
        resetQueue();
        resolve({ value: queueResult });
      }
    })(0);
  });
};

/*
 * Global function for getting the index of current popup in queue
 */
var getQueueStep = function getQueueStep() {
  return document.body.getAttribute('data-swal2-queue-step');
};

/*
 * Global function for inserting a popup to the queue
 */
var insertQueueStep = function insertQueueStep(step, index) {
  if (index && index < currentSteps.length) {
    return currentSteps.splice(index, 0, step);
  }
  return currentSteps.push(step);
};

/*
 * Global function for deleting a popup from the queue
 */
var deleteQueueStep = function deleteQueueStep(index) {
  if (typeof currentSteps[index] !== 'undefined') {
    currentSteps.splice(index, 1);
  }
};

/**
 * Set default params for each popup
 * @param {Object} userParams
 */
var setDefaults = function setDefaults(userParams) {
  if (!userParams || (typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
    return error('the argument for setDefaults() is required and has to be a object');
  }

  showWarningsForParams(userParams);

  // assign valid params from userParams to popupParams
  for (var param in userParams) {
    if (isValidParameter(param)) {
      globalState.popupParams[param] = userParams[param];
    }
  }
};

/**
 * Reset default params for each popup
 */
var resetDefaults = function resetDefaults() {
  globalState.popupParams = _extends({}, defaultParams);
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
var showLoading = function showLoading() {
  var popup = getPopup();
  if (!popup) {
    SweetAlert('');
  }
  popup = getPopup();
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();

  show(actions);
  show(confirmButton);
  addClass([popup, actions], swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;

  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

function fire() {
  var Swal = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Swal, [null].concat(args)))();
}



var staticMethods = Object.freeze({
	isValidParameter: isValidParameter,
	isDeprecatedParameter: isDeprecatedParameter,
	argsToParams: argsToParams,
	adaptInputValidator: adaptInputValidator,
	close: close,
	closePopup: close,
	closeModal: close,
	closeToast: close,
	isVisible: isVisible$1,
	clickConfirm: clickConfirm,
	clickCancel: clickCancel,
	getTitle: getTitle,
	getContent: getContent,
	getImage: getImage,
	getButtonsWrapper: getButtonsWrapper,
	getActions: getActions,
	getConfirmButton: getConfirmButton,
	getCancelButton: getCancelButton,
	getFooter: getFooter,
	isLoading: isLoading,
	mixin: mixin,
	queue: queue,
	getQueueStep: getQueueStep,
	insertQueueStep: insertQueueStep,
	deleteQueueStep: deleteQueueStep,
	setDefaults: setDefaults,
	resetDefaults: resetDefaults,
	showLoading: showLoading,
	enableLoading: showLoading,
	fire: fire
});

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
function hideLoading() {
  var domCache = this._domCache;
  if (!this.params.showConfirmButton) {
    hide(domCache.confirmButton);
    if (!this.params.showCancelButton) {
      hide(domCache.actions);
    }
  }
  removeClass([domCache.popup, domCache.actions], swalClasses.loading);
  domCache.popup.removeAttribute('aria-busy');
  domCache.popup.removeAttribute('data-loading');
  domCache.confirmButton.disabled = false;
  domCache.cancelButton.disabled = false;
}

// Get input element by specified type or, if type isn't specified, by params.input
function getInput(inputType) {
  var domCache = this._domCache;
  inputType = inputType || this.params.input;
  if (!inputType) {
    return null;
  }
  switch (inputType) {
    case 'select':
    case 'textarea':
    case 'file':
      return getChildByClass(domCache.content, swalClasses[inputType]);
    case 'checkbox':
      return domCache.popup.querySelector('.' + swalClasses.checkbox + ' input');
    case 'radio':
      return domCache.popup.querySelector('.' + swalClasses.radio + ' input:checked') || domCache.popup.querySelector('.' + swalClasses.radio + ' input:first-child');
    case 'range':
      return domCache.popup.querySelector('.' + swalClasses.range + ' input');
    default:
      return getChildByClass(domCache.content, swalClasses.input);
  }
}

function enableButtons() {
  this._domCache.confirmButton.disabled = false;
  this._domCache.cancelButton.disabled = false;
}

function disableButtons() {
  this._domCache.confirmButton.disabled = true;
  this._domCache.cancelButton.disabled = true;
}

function enableConfirmButton() {
  this._domCache.confirmButton.disabled = false;
}

function disableConfirmButton() {
  this._domCache.confirmButton.disabled = true;
}

function enableInput() {
  var input = this.getInput();
  if (!input) {
    return false;
  }
  if (input.type === 'radio') {
    var radiosContainer = input.parentNode.parentNode;
    var radios = radiosContainer.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
      radios[i].disabled = false;
    }
  } else {
    input.disabled = false;
  }
}

function disableInput() {
  var input = this.getInput();
  if (!input) {
    return false;
  }
  if (input && input.type === 'radio') {
    var radiosContainer = input.parentNode.parentNode;
    var radios = radiosContainer.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
      radios[i].disabled = true;
    }
  } else {
    input.disabled = true;
  }
}

// Show block with validation error
function showValidationError(error) {
  var domCache = this._domCache;
  domCache.validationError.innerHTML = error;
  var popupComputedStyle = window.getComputedStyle(domCache.popup);
  domCache.validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
  domCache.validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
  show(domCache.validationError);

  var input = this.getInput();
  if (input) {
    input.setAttribute('aria-invalid', true);
    input.setAttribute('aria-describedBy', swalClasses.validationerror);
    focusInput(input);
    addClass(input, swalClasses.inputerror);
  }
}

// Hide block with validation error
function resetValidationError() {
  var domCache = this._domCache;
  if (domCache.validationError) {
    hide(domCache.validationError);
  }

  var input = this.getInput();
  if (input) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedBy');
    removeClass(input, swalClasses.inputerror);
  }
}

var defaultInputValidators = {
  email: function email(string) {
    return (/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.reject('Invalid email address')
    );
  },
  url: function url(string) {
    // taken from https://stackoverflow.com/a/3809435/1331425
    return (/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(string) ? Promise.resolve() : Promise.reject('Invalid URL')
    );
  }
};

/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */
function setParameters(params) {
  // Use default `inputValidator` for supported input types if not provided
  if (!params.inputValidator) {
    Object.keys(defaultInputValidators).forEach(function (key) {
      if (params.input === key) {
        params.inputValidator = params.expectRejections ? defaultInputValidators[key] : SweetAlert.adaptInputValidator(defaultInputValidators[key]);
      }
    });
  }

  // Determine if the custom target element is valid
  if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }

  var popup = void 0;
  var oldPopup = getPopup();
  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  // If the model target has changed, refresh the popup
  if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
    popup = init(params);
  } else {
    popup = oldPopup || init(params);
  }

  // Set popup width
  if (params.width) {
    popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
  }

  // Set popup padding
  if (params.padding) {
    popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
  }

  // Set popup background
  if (params.background) {
    popup.style.background = params.background;
  }
  var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }

  var container = getContainer();
  var title = getTitle();
  var content = getContent().querySelector('#' + swalClasses.content);
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  var closeButton = getCloseButton();
  var footer = getFooter();

  // Title
  if (params.titleText) {
    title.innerText = params.titleText;
  } else if (params.title) {
    title.innerHTML = params.title.split('\n').join('<br />');
  }

  if (typeof params.backdrop === 'string') {
    getContainer().style.background = params.backdrop;
  } else if (!params.backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }

  // Content as HTML
  if (params.html) {
    parseHtmlToContainer(params.html, content);

    // Content as plain text
  } else if (params.text) {
    content.textContent = params.text;
    show(content);
  } else {
    hide(content);
  }

  // Position
  if (params.position in swalClasses) {
    addClass(container, swalClasses[params.position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }

  // Grow
  if (params.grow && typeof params.grow === 'string') {
    var growClass = 'grow-' + params.grow;
    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }

  // Animation
  if (typeof params.animation === 'function') {
    params.animation = params.animation.call();
  }

  // Close button
  if (params.showCloseButton) {
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    show(closeButton);
  } else {
    hide(closeButton);
  }

  // Default Class
  popup.className = swalClasses.popup;
  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  }

  // Custom Class
  if (params.customClass) {
    addClass(popup, params.customClass);
  }

  // Progress steps
  var progressStepsContainer = getProgressSteps();
  var currentProgressStep = parseInt(params.currentProgressStep === null ? SweetAlert.getQueueStep() : params.currentProgressStep, 10);
  if (params.progressSteps && params.progressSteps.length) {
    show(progressStepsContainer);
    empty(progressStepsContainer);
    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    params.progressSteps.forEach(function (step, index) {
      var circle = document.createElement('li');
      addClass(circle, swalClasses.progresscircle);
      circle.innerHTML = step;
      if (index === currentProgressStep) {
        addClass(circle, swalClasses.activeprogressstep);
      }
      progressStepsContainer.appendChild(circle);
      if (index !== params.progressSteps.length - 1) {
        var line = document.createElement('li');
        addClass(line, swalClasses.progressline);
        if (params.progressStepsDistance) {
          line.style.width = params.progressStepsDistance;
        }
        progressStepsContainer.appendChild(line);
      }
    });
  } else {
    hide(progressStepsContainer);
  }

  // Icon
  var icons = getIcons();
  for (var _i = 0; _i < icons.length; _i++) {
    hide(icons[_i]);
  }
  if (params.type) {
    var validType = false;
    for (var iconType in iconTypes) {
      if (params.type === iconType) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      error('Unknown alert type: ' + params.type);
      return false;
    }
    var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
    show(icon);

    // Animate icon
    if (params.animation) {
      addClass(icon, 'swal2-animate-' + params.type + '-icon');
    }
  }

  // Custom image
  var image = getImage();
  if (params.imageUrl) {
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt);
    show(image);

    if (params.imageWidth) {
      image.setAttribute('width', params.imageWidth);
    } else {
      image.removeAttribute('width');
    }

    if (params.imageHeight) {
      image.setAttribute('height', params.imageHeight);
    } else {
      image.removeAttribute('height');
    }

    image.className = swalClasses.image;
    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  } else {
    hide(image);
  }

  // Cancel button
  if (params.showCancelButton) {
    cancelButton.style.display = 'inline-block';
  } else {
    hide(cancelButton);
  }

  // Confirm button
  if (params.showConfirmButton) {
    removeStyleProperty(confirmButton, 'display');
  } else {
    hide(confirmButton);
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(actions);
  } else {
    show(actions);
  }

  // Edit text on confirm and cancel buttons
  confirmButton.innerHTML = params.confirmButtonText;
  cancelButton.innerHTML = params.cancelButtonText;

  // ARIA labels for confirm and cancel buttons
  confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
  cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

  // Add buttons custom classes
  confirmButton.className = swalClasses.confirm;
  addClass(confirmButton, params.confirmButtonClass);
  cancelButton.className = swalClasses.cancel;
  addClass(cancelButton, params.cancelButtonClass);

  // Buttons styling
  if (params.buttonsStyling) {
    addClass([confirmButton, cancelButton], swalClasses.styled);

    // Buttons background colors
    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }
    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    }

    // Loading state
    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  } else {
    removeClass([confirmButton, cancelButton], swalClasses.styled);

    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  // Footer
  parseHtmlToContainer(params.footer, footer);

  // CSS animation
  if (params.animation === true) {
    removeClass(popup, swalClasses.noanimation);
  } else {
    addClass(popup, swalClasses.noanimation);
  }

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
  }
}

/**
 * Animations
 *
 * @param animation
 * @param onBeforeOpen
 * @param onComplete
 */
var openPopup = function openPopup(animation, onBeforeOpen, onOpen) {
  var container = getContainer();
  var popup = getPopup();

  if (onBeforeOpen !== null && typeof onBeforeOpen === 'function') {
    onBeforeOpen(popup);
  }

  if (animation) {
    addClass(popup, swalClasses.show);
    addClass(container, swalClasses.fade);
    removeClass(popup, swalClasses.hide);
  } else {
    removeClass(popup, swalClasses.fade);
  }
  show(popup);

  // scrolling is 'hidden' until animation is done, after that 'auto'
  container.style.overflowY = 'hidden';
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      container.style.overflowY = 'auto';
    });
  } else {
    container.style.overflowY = 'auto';
  }

  addClass([document.documentElement, document.body, container], swalClasses.shown);
  if (isModal()) {
    fixScrollbar();
    iOSfix();
  }
  states.previousActiveElement = document.activeElement;
  if (onOpen !== null && typeof onOpen === 'function') {
    setTimeout(function () {
      onOpen(popup);
    });
  }
};

function _main(userParams) {
  var _this = this;

  showWarningsForParams(userParams);

  var params = this.params = _extends({}, globalState.popupParams, userParams);
  setParameters(params);
  Object.freeze(params);

  var domCache = this._domCache = {
    popup: getPopup(),
    container: getContainer(),
    content: getContent(),
    actions: getActions(),
    confirmButton: getConfirmButton(),
    cancelButton: getCancelButton(),
    closeButton: getCloseButton(),
    validationError: getValidationError(),
    progressSteps: getProgressSteps()
  };

  var constructor = this.constructor;

  return new Promise(function (resolve, reject) {
    // functions to handle all resolving/rejecting/settling
    var succeedWith = function succeedWith(value) {
      constructor.closePopup(params.onClose, params.onAfterClose); // TODO: make closePopup an *instance* method
      if (params.useRejections) {
        resolve(value);
      } else {
        resolve({ value: value });
      }
    };
    var dismissWith = function dismissWith(dismiss) {
      constructor.closePopup(params.onClose, params.onAfterClose);
      if (params.useRejections) {
        reject(dismiss);
      } else {
        resolve({ dismiss: dismiss });
      }
    };
    var errorWith = function errorWith(error$$1) {
      constructor.closePopup(params.onClose, params.onAfterClose);
      reject(error$$1);
    };

    // Close on timer
    if (params.timer) {
      domCache.popup.timeout = setTimeout(function () {
        return dismissWith('timer');
      }, params.timer);
    }

    // Get the value of the popup input
    var getInputValue = function getInputValue() {
      var input = _this.getInput();
      if (!input) {
        return null;
      }
      switch (params.input) {
        case 'checkbox':
          return input.checked ? 1 : 0;
        case 'radio':
          return input.checked ? input.value : null;
        case 'file':
          return input.files.length ? input.files[0] : null;
        default:
          return params.inputAutoTrim ? input.value.trim() : input.value;
      }
    };

    // input autofocus
    if (params.input) {
      setTimeout(function () {
        var input = _this.getInput();
        if (input) {
          focusInput(input);
        }
      }, 0);
    }

    var confirm = function confirm(value) {
      if (params.showLoaderOnConfirm) {
        constructor.showLoading(); // TODO: make showLoading an *instance* method
      }

      if (params.preConfirm) {
        _this.resetValidationError();
        var preConfirmPromise = Promise.resolve().then(function () {
          return params.preConfirm(value, params.extraParams);
        });
        if (params.expectRejections) {
          preConfirmPromise.then(function (preConfirmValue) {
            return succeedWith(preConfirmValue || value);
          }, function (validationError) {
            _this.hideLoading();
            if (validationError) {
              _this.showValidationError(validationError);
            }
          });
        } else {
          preConfirmPromise.then(function (preConfirmValue) {
            if (isVisible(domCache.validationError) || preConfirmValue === false) {
              _this.hideLoading();
            } else {
              succeedWith(preConfirmValue || value);
            }
          }, function (error$$1) {
            return errorWith(error$$1);
          });
        }
      } else {
        succeedWith(value);
      }
    };

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var confirmButton = domCache.confirmButton,
          cancelButton = domCache.cancelButton;

      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

      switch (e.type) {
        case 'click':
          // Clicked 'confirm'
          if (targetedConfirm && constructor.isVisible()) {
            _this.disableButtons();
            if (params.input) {
              var inputValue = getInputValue();

              if (params.inputValidator) {
                _this.disableInput();
                var validationPromise = Promise.resolve().then(function () {
                  return params.inputValidator(inputValue, params.extraParams);
                });
                if (params.expectRejections) {
                  validationPromise.then(function () {
                    _this.enableButtons();
                    _this.enableInput();
                    confirm(inputValue);
                  }, function (validationError) {
                    _this.enableButtons();
                    _this.enableInput();
                    if (validationError) {
                      _this.showValidationError(validationError);
                    }
                  });
                } else {
                  validationPromise.then(function (validationError) {
                    _this.enableButtons();
                    _this.enableInput();
                    if (validationError) {
                      _this.showValidationError(validationError);
                    } else {
                      confirm(inputValue);
                    }
                  }, function (error$$1) {
                    return errorWith(error$$1);
                  });
                }
              } else {
                confirm(inputValue);
              }
            } else {
              confirm(true);
            }

            // Clicked 'cancel'
          } else if (targetedCancel && constructor.isVisible()) {
            _this.disableButtons();
            dismissWith(constructor.DismissReason.cancel);
          }
          break;
        default:
      }
    };

    var buttons = domCache.popup.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onButtonEvent;
      buttons[i].onmouseover = onButtonEvent;
      buttons[i].onmouseout = onButtonEvent;
      buttons[i].onmousedown = onButtonEvent;
    }

    // Closing popup by close button
    domCache.closeButton.onclick = function () {
      dismissWith(constructor.DismissReason.close);
    };

    if (params.toast) {
      // Closing popup by internal click
      domCache.popup.onclick = function (e) {
        if (params.showConfirmButton || params.showCancelButton || params.showCloseButton || params.input) {
          return;
        }
        constructor.closePopup(params.onClose, params.onAfterClose);
        dismissWith(constructor.DismissReason.close);
      };
    } else {
      var ignoreOutsideClick = false;

      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      domCache.popup.onmousedown = function () {
        domCache.container.onmouseup = function (e) {
          domCache.container.onmouseup = undefined;
          // We only check if the mouseup target is the container because usually it doesn't
          // have any other direct children aside of the popup
          if (e.target === domCache.container) {
            ignoreOutsideClick = true;
          }
        };
      };

      // Ignore click events that had mousedown on the container but mouseup on the popup
      domCache.container.onmousedown = function () {
        domCache.popup.onmouseup = function (e) {
          domCache.popup.onmouseup = undefined;
          // We also need to check if the mouseup target is a child of the popup
          if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };

      domCache.container.onclick = function (e) {
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return;
        }
        if (e.target !== domCache.container) {
          return;
        }
        if (callIfFunction(params.allowOutsideClick)) {
          dismissWith(constructor.DismissReason.backdrop);
        }
      };
    }

    // Reverse buttons (Confirm on the right side)
    if (params.reverseButtons) {
      domCache.confirmButton.parentNode.insertBefore(domCache.cancelButton, domCache.confirmButton);
    } else {
      domCache.confirmButton.parentNode.insertBefore(domCache.confirmButton, domCache.cancelButton);
    }

    // Focus handling
    var setFocus = function setFocus(index, increment) {
      var focusableElements = getFocusableElements(params.focusCancel);
      // search for visible elements and select the next possible match
      for (var _i = 0; _i < focusableElements.length; _i++) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        // determine if element is visible
        var el = focusableElements[index];
        if (isVisible(el)) {
          return el.focus();
        }
      }
    };

    var handleKeyDown = function handleKeyDown(event) {
      var e = event || window.event;

      var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
      ];

      if (e.key === 'Enter' && !e.isComposing) {
        if (e.target === _this.getInput()) {
          if (['textarea', 'file'].indexOf(params.input) !== -1) {
            return; // do not submit
          }

          constructor.clickConfirm();
          e.preventDefault();
        }

        // TAB
      } else if (e.key === 'Tab') {
        var targetElement = e.target || e.srcElement;

        var focusableElements = getFocusableElements(params.focusCancel);
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
        for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
          if (targetElement === focusableElements[_i2]) {
            btnIndex = _i2;
            break;
          }
        }

        if (!e.shiftKey) {
          // Cycle to the next button
          setFocus(btnIndex, 1);
        } else {
          // Cycle to the prev button
          setFocus(btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault();

        // ARROWS - switch focus between buttons
      } else if (arrowKeys.indexOf(e.key) !== -1) {
        // focus Cancel button if Confirm button is currently focused
        if (document.activeElement === domCache.confirmButton && isVisible(domCache.cancelButton)) {
          domCache.cancelButton.focus();
          // and vice versa
        } else if (document.activeElement === domCache.cancelButton && isVisible(domCache.confirmButton)) {
          domCache.confirmButton.focus();
        }

        // ESC
      } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(params.allowEscapeKey) === true) {
        dismissWith(constructor.DismissReason.esc);
      }
    };

    if (params.toast && globalState.windowOnkeydownOverridden) {
      window.onkeydown = globalState.previousWindowKeyDown;
      globalState.windowOnkeydownOverridden = false;
    }

    if (!params.toast && !globalState.windowOnkeydownOverridden) {
      globalState.previousWindowKeyDown = window.onkeydown;
      globalState.windowOnkeydownOverridden = true;
      window.onkeydown = handleKeyDown;
    }

    _this.enableButtons();
    _this.hideLoading();
    _this.resetValidationError();

    if (params.input) {
      addClass(document.body, swalClasses['has-input']);
    }

    // inputs
    var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var input = void 0;
    for (var _i3 = 0; _i3 < inputTypes.length; _i3++) {
      var inputClass = swalClasses[inputTypes[_i3]];
      var inputContainer = getChildByClass(domCache.content, inputClass);
      input = _this.getInput(inputTypes[_i3]);

      // set attributes
      if (input) {
        for (var j in input.attributes) {
          if (input.attributes.hasOwnProperty(j)) {
            var attrName = input.attributes[j].name;
            if (attrName !== 'type' && attrName !== 'value') {
              input.removeAttribute(attrName);
            }
          }
        }
        for (var attr in params.inputAttributes) {
          input.setAttribute(attr, params.inputAttributes[attr]);
        }
      }

      // set class
      inputContainer.className = inputClass;
      if (params.inputClass) {
        addClass(inputContainer, params.inputClass);
      }

      hide(inputContainer);
    }

    var populateInputOptions = void 0;
    switch (params.input) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        input = getChildByClass(domCache.content, swalClasses.input);
        input.value = params.inputValue;
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'file':
        input = getChildByClass(domCache.content, swalClasses.file);
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'range':
        var range = getChildByClass(domCache.content, swalClasses.range);
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = params.inputValue;
        rangeInput.type = params.input;
        rangeOutput.value = params.inputValue;
        show(range);
        break;
      case 'select':
        var select = getChildByClass(domCache.content, swalClasses.select);
        select.innerHTML = '';
        if (params.inputPlaceholder) {
          var placeholder = document.createElement('option');
          placeholder.innerHTML = params.inputPlaceholder;
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions.forEach(function (_ref) {
            var _ref2 = slicedToArray(_ref, 2),
                optionValue = _ref2[0],
                optionLabel = _ref2[1];

            var option = document.createElement('option');
            option.value = optionValue;
            option.innerHTML = optionLabel;
            if (params.inputValue.toString() === optionValue.toString()) {
              option.selected = true;
            }
            select.appendChild(option);
          });
          show(select);
          select.focus();
        };
        break;
      case 'radio':
        var radio = getChildByClass(domCache.content, swalClasses.radio);
        radio.innerHTML = '';
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions.forEach(function (_ref3) {
            var _ref4 = slicedToArray(_ref3, 2),
                radioValue = _ref4[0],
                radioLabel = _ref4[1];

            var radioInput = document.createElement('input');
            var radioLabelElement = document.createElement('label');
            radioInput.type = 'radio';
            radioInput.name = swalClasses.radio;
            radioInput.value = radioValue;
            if (params.inputValue.toString() === radioValue.toString()) {
              radioInput.checked = true;
            }
            radioLabelElement.innerHTML = radioLabel;
            radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
            radio.appendChild(radioLabelElement);
          });
          show(radio);
          var radios = radio.querySelectorAll('input');
          if (radios.length) {
            radios[0].focus();
          }
        };
        break;
      case 'checkbox':
        var checkbox = getChildByClass(domCache.content, swalClasses.checkbox);
        var checkboxInput = _this.getInput('checkbox');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = 1;
        checkboxInput.id = swalClasses.checkbox;
        checkboxInput.checked = Boolean(params.inputValue);
        var label = checkbox.getElementsByTagName('span');
        if (label.length) {
          checkbox.removeChild(label[0]);
        }
        label = document.createElement('span');
        label.innerHTML = params.inputPlaceholder;
        checkbox.appendChild(label);
        show(checkbox);
        break;
      case 'textarea':
        var textarea = getChildByClass(domCache.content, swalClasses.textarea);
        textarea.value = params.inputValue;
        textarea.placeholder = params.inputPlaceholder;
        show(textarea);
        break;
      case null:
        break;
      default:
        error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + params.input + '"');
        break;
    }

    if (params.input === 'select' || params.input === 'radio') {
      var processInputOptions = function processInputOptions(inputOptions) {
        return populateInputOptions(formatInputOptions(inputOptions));
      };
      if (isThenable(params.inputOptions)) {
        constructor.showLoading();
        params.inputOptions.then(function (inputOptions) {
          _this.hideLoading();
          processInputOptions(inputOptions);
        });
      } else if (_typeof(params.inputOptions) === 'object') {
        processInputOptions(params.inputOptions);
      } else {
        error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(params.inputOptions));
      }
    } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(params.input) !== -1 && isThenable(params.inputValue)) {
      constructor.showLoading();
      hide(input);
      params.inputValue.then(function (inputValue) {
        input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : inputValue + '';
        show(input);
        _this.hideLoading();
      }).catch(function (err) {
        error('Error in inputValue promise: ' + err);
        input.value = '';
        show(input);
        _this.hideLoading();
      });
    }

    openPopup(params.animation, params.onBeforeOpen, params.onOpen);

    if (!params.toast) {
      if (!callIfFunction(params.allowEnterKey)) {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      } else if (params.focusCancel && isVisible(domCache.cancelButton)) {
        domCache.cancelButton.focus();
      } else if (params.focusConfirm && isVisible(domCache.confirmButton)) {
        domCache.confirmButton.focus();
      } else {
        setFocus(-1, 1);
      }
    }

    // fix scroll
    domCache.container.scrollTop = 0;
  });
}



var instanceMethods = Object.freeze({
	hideLoading: hideLoading,
	disableLoading: hideLoading,
	getInput: getInput,
	enableButtons: enableButtons,
	disableButtons: disableButtons,
	enableConfirmButton: enableConfirmButton,
	disableConfirmButton: disableConfirmButton,
	enableInput: enableInput,
	disableInput: disableInput,
	showValidationError: showValidationError,
	resetValidationError: resetValidationError,
	_main: _main
});

var currentInstance = void 0;

// SweetAlert constructor
function SweetAlert() {
  // Prevent run in Node env
  if (typeof window === 'undefined') {
    return;
  }

  // Check for the existence of Promise
  if (typeof Promise === 'undefined') {
    error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
  }

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (typeof args[0] === 'undefined') {
    error('SweetAlert2 expects at least 1 attribute!');
    return false;
  }

  // handle things when constructor is invoked without the `new` keyword
  if (!(this instanceof SweetAlert)) {
    return new (Function.prototype.bind.apply(SweetAlert, [null].concat(args)))();
  }

  currentInstance = this;

  this._promise = this._main(this.constructor.argsToParams(args));
}

// `catch` cannot be the name of a module export, so we define our thenable methods here instead
SweetAlert.prototype.then = function (onFulfilled, onRejected) {
  return this._promise.then(onFulfilled, onRejected);
};
SweetAlert.prototype.catch = function (onRejected) {
  return this._promise.catch(onRejected);
};
SweetAlert.prototype.finally = function (onFinally) {
  return this._promise.finally(onFinally);
};

// Assign instance methods from src/instanceMethods/*.js to prototype
_extends(SweetAlert.prototype, instanceMethods);

// Assign static methods from src/staticMethods/*.js to constructor
_extends(SweetAlert, staticMethods);

// Proxy to instance methods to constructor, for now, for backwards compatibility
Object.keys(instanceMethods).forEach(function (key) {
  SweetAlert[key] = function () {
    if (currentInstance) {
      var _currentInstance;

      return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
    }
  };
});

SweetAlert.DismissReason = DismissReason;

SweetAlert.noop = function () {};

SweetAlert.version = version;

SweetAlert.default = SweetAlert;

/**
 * Set default params if `window._swalDefaults` is an object
 */
if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
  SweetAlert.setDefaults(window._swalDefaults);
}

return SweetAlert;

})));
if (typeof window !== 'undefined' && window.Sweetalert2){  window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2}
;
if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = function bind(obj) {
    var args = Array.prototype.slice.call(arguments, 1),
      self = this,
      nop = function() {
      },
      bound = function() {
        return self.apply(
          this instanceof nop ? this : (obj || {}), args.concat(
            Array.prototype.slice.call(arguments)
          )
        );
      };
    nop.prototype = this.prototype || {};
    bound.prototype = new nop();
    return bound;
  };
}
;
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
        (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}
;
!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:u)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void u(n.promise,i)}r(n.promise,o)}))}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void f(e);if("function"==typeof i)return void s(t(i,n),e)}e._state=1,e._value=n,f(e)}catch(r){u(e,r)}}function u(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function s(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,u(n,e))})}catch(o){if(t)return;t=!0,u(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function o(r,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(e){o(r,e)},t)}n[r]=u,0===--i&&e(n)}catch(c){t(c)}}if(0===n.length)return e([]);for(var i=n.length,r=0;r<n.length;r++)o(r,n[r])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);
$(function() {
  $(document).on("click", ".alert-box .close", function(e) {
    $(e.target).closest(".alert-box").fadeOut("fast");
  });
});
function CardJs(t){this.elem=jQuery(t),this.captureName=!!this.elem.data("capture-name")&&this.elem.data("capture-name"),this.iconColour=!!this.elem.data("icon-colour")&&this.elem.data("icon-colour"),this.stripe=!!this.elem.data("stripe")&&this.elem.data("stripe"),this.stripe&&(this.captureName=!1),this.initCardNumberInput(),this.initNameInput(),this.initExpiryMonthInput(),this.initExpiryYearInput(),this.initCvcInput(),this.elem.empty(),this.setupCardNumberInput(),this.setupNameInput(),this.setupExpiryInput(),this.setupCvcInput(),this.iconColour&&this.setIconColour(this.iconColour),this.refreshCreditCardTypeIcon()}CardJs.prototype.constructor=CardJs,CardJs.KEYS={0:48,9:57,NUMPAD_0:96,NUMPAD_9:105,DELETE:46,BACKSPACE:8,ARROW_LEFT:37,ARROW_RIGHT:39,ARROW_UP:38,ARROW_DOWN:40,HOME:36,END:35,TAB:9,A:65,X:88,C:67,V:86},CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_VISA_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_MASTERCARD_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_DISCOVER_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_JCB_MASK="XXXX XXXX XXXX XXXX",CardJs.CREDIT_CARD_NUMBER_AMEX_MASK="XXXX XXXXXX XXXXX",CardJs.CREDIT_CARD_NUMBER_DINERS_MASK="XXXX XXXX XXXX XX",CardJs.prototype.creditCardNumberMask=CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK,CardJs.CREDIT_CARD_NUMBER_PLACEHOLDER="Card number",CardJs.NAME_PLACEHOLDER="Name on card",CardJs.EXPIRY_MASK="XX / XX",CardJs.EXPIRY_PLACEHOLDER="MM / YY",CardJs.EXPIRY_USE_DROPDOWNS=!1,CardJs.EXPIRY_NUMBER_OF_YEARS=10,CardJs.CVC_MASK_3="XXX",CardJs.CVC_MASK_4="XXXX",CardJs.CVC_PLACEHOLDER="CVC",CardJs.CREDIT_CARD_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="3px" width="24px" height="17px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M182.385,14.258c-2.553-2.553-5.621-3.829-9.205-3.829H42.821c-3.585,0-6.653,1.276-9.207,3.829c-2.553,2.553-3.829,5.621-3.829,9.206v99.071c0,3.585,1.276,6.654,3.829,9.207c2.554,2.553,5.622,3.829,9.207,3.829H173.18c3.584,0,6.652-1.276,9.205-3.829s3.83-5.622,3.83-9.207V23.464C186.215,19.879,184.938,16.811,182.385,14.258z M175.785,122.536c0,0.707-0.258,1.317-0.773,1.834c-0.516,0.515-1.127,0.772-1.832,0.772H42.821c-0.706,0-1.317-0.258-1.833-0.773c-0.516-0.518-0.774-1.127-0.774-1.834V73h135.571V122.536z M175.785,41.713H40.214v-18.25c0-0.706,0.257-1.316,0.774-1.833c0.516-0.515,1.127-0.773,1.833-0.773H173.18c0.705,0,1.316,0.257,1.832,0.773c0.516,0.517,0.773,1.127,0.773,1.833V41.713z"/><rect class="svg" x="50.643" y="104.285" width="20.857" height="10.429"/><rect class="svg" x="81.929" y="104.285" width="31.286" height="10.429"/></g></svg>',CardJs.LOCK_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="3px" width="24px" height="17px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M152.646,70.067c-1.521-1.521-3.367-2.281-5.541-2.281H144.5V52.142c0-9.994-3.585-18.575-10.754-25.745c-7.17-7.17-15.751-10.755-25.746-10.755s-18.577,3.585-25.746,10.755C75.084,33.567,71.5,42.148,71.5,52.142v15.644h-2.607c-2.172,0-4.019,0.76-5.54,2.281c-1.521,1.52-2.281,3.367-2.281,5.541v46.929c0,2.172,0.76,4.019,2.281,5.54c1.521,1.52,3.368,2.281,5.54,2.281h78.214c2.174,0,4.02-0.76,5.541-2.281c1.52-1.521,2.281-3.368,2.281-5.54V75.607C154.93,73.435,154.168,71.588,152.646,70.067z M128.857,67.786H87.143V52.142c0-5.757,2.037-10.673,6.111-14.746c4.074-4.074,8.989-6.11,14.747-6.11s10.673,2.036,14.746,6.11c4.073,4.073,6.11,8.989,6.11,14.746V67.786z"/></svg>',CardJs.CALENDAR_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M172.691,23.953c-2.062-2.064-4.508-3.096-7.332-3.096h-10.428v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.554-2.553-5.621-3.83-9.207-3.83h-5.213c-3.586,0-6.654,1.277-9.207,3.83c-2.554,2.553-3.83,5.622-3.83,9.206v7.822H92.359v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.553-2.553-5.622-3.83-9.207-3.83h-5.214c-3.585,0-6.654,1.277-9.207,3.83c-2.553,2.553-3.83,5.622-3.83,9.206v7.822H50.643c-2.825,0-5.269,1.032-7.333,3.096s-3.096,4.509-3.096,7.333v104.287c0,2.823,1.032,5.267,3.096,7.332c2.064,2.064,4.508,3.096,7.333,3.096h114.714c2.824,0,5.27-1.032,7.332-3.096c2.064-2.064,3.096-4.509,3.096-7.332V31.286C175.785,28.461,174.754,26.017,172.691,23.953z M134.073,13.036c0-0.761,0.243-1.386,0.731-1.874c0.488-0.488,1.113-0.733,1.875-0.733h5.213c0.762,0,1.385,0.244,1.875,0.733c0.488,0.489,0.732,1.114,0.732,1.874V36.5c0,0.761-0.244,1.385-0.732,1.874c-0.49,0.488-1.113,0.733-1.875,0.733h-5.213c-0.762,0-1.387-0.244-1.875-0.733s-0.731-1.113-0.731-1.874V13.036z M71.501,13.036c0-0.761,0.244-1.386,0.733-1.874c0.489-0.488,1.113-0.733,1.874-0.733h5.214c0.761,0,1.386,0.244,1.874,0.733c0.488,0.489,0.733,1.114,0.733,1.874V36.5c0,0.761-0.244,1.386-0.733,1.874c-0.489,0.488-1.113,0.733-1.874,0.733h-5.214c-0.761,0-1.386-0.244-1.874-0.733c-0.488-0.489-0.733-1.113-0.733-1.874V13.036z M165.357,135.572H50.643V52.143h114.714V135.572z"/></svg>',CardJs.USER_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M107.999,73c8.638,0,16.011-3.056,22.12-9.166c6.111-6.11,9.166-13.483,9.166-22.12c0-8.636-3.055-16.009-9.166-22.12c-6.11-6.11-13.484-9.165-22.12-9.165c-8.636,0-16.01,3.055-22.12,9.165c-6.111,6.111-9.166,13.484-9.166,22.12c0,8.637,3.055,16.01,9.166,22.12C91.99,69.944,99.363,73,107.999,73z"/><path class="svg" d="M165.07,106.037c-0.191-2.743-0.571-5.703-1.141-8.881c-0.57-3.178-1.291-6.124-2.16-8.84c-0.869-2.715-2.037-5.363-3.504-7.943c-1.466-2.58-3.15-4.78-5.052-6.6s-4.223-3.272-6.965-4.358c-2.744-1.086-5.772-1.63-9.085-1.63c-0.489,0-1.63,0.584-3.422,1.752s-3.815,2.472-6.069,3.911c-2.254,1.438-5.188,2.743-8.799,3.909c-3.612,1.168-7.237,1.752-10.877,1.752c-3.639,0-7.264-0.584-10.876-1.752c-3.611-1.166-6.545-2.471-8.799-3.909c-2.254-1.439-4.277-2.743-6.069-3.911c-1.793-1.168-2.933-1.752-3.422-1.752c-3.313,0-6.341,0.544-9.084,1.63s-5.065,2.539-6.966,4.358c-1.901,1.82-3.585,4.02-5.051,6.6s-2.634,5.229-3.503,7.943c-0.869,2.716-1.589,5.662-2.159,8.84c-0.571,3.178-0.951,6.137-1.141,8.881c-0.19,2.744-0.285,5.554-0.285,8.433c0,6.517,1.983,11.664,5.948,15.439c3.965,3.774,9.234,5.661,15.806,5.661h71.208c6.572,0,11.84-1.887,15.806-5.661c3.966-3.775,5.948-8.921,5.948-15.439C165.357,111.591,165.262,108.78,165.07,106.037z"/></g></svg>',CardJs.MAIL_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><path class="svg" d="M177.171,19.472c-2.553-2.553-5.622-3.829-9.206-3.829H48.036c-3.585,0-6.654,1.276-9.207,3.829C36.276,22.025,35,25.094,35,28.679v88.644c0,3.585,1.276,6.652,3.829,9.205c2.553,2.555,5.622,3.83,9.207,3.83h119.929c3.584,0,6.653-1.275,9.206-3.83c2.554-2.553,3.829-5.621,3.829-9.205V28.679C181,25.094,179.725,22.025,177.171,19.472zM170.57,117.321c0,0.706-0.258,1.317-0.774,1.833s-1.127,0.773-1.832,0.773H48.035c-0.706,0-1.317-0.257-1.833-0.773c-0.516-0.516-0.774-1.127-0.774-1.833V54.75c1.738,1.955,3.612,3.748,5.622,5.377c14.557,11.189,26.126,20.368,34.708,27.538c2.77,2.336,5.024,4.155,6.762,5.459s4.087,2.62,7.047,3.951s5.744,1.995,8.351,1.995H108h0.081c2.606,0,5.392-0.664,8.351-1.995c2.961-1.331,5.311-2.647,7.049-3.951c1.737-1.304,3.992-3.123,6.762-5.459c8.582-7.17,20.15-16.349,34.707-27.538c2.01-1.629,3.885-3.422,5.621-5.377V117.321z M170.57,30.797v0.896c0,3.204-1.262,6.776-3.787,10.713c-2.525,3.938-5.256,7.075-8.188,9.41c-10.484,8.257-21.373,16.865-32.672,25.827c-0.326,0.271-1.277,1.073-2.852,2.403c-1.574,1.331-2.824,2.351-3.748,3.056c-0.924,0.707-2.131,1.562-3.625,2.566s-2.865,1.752-4.114,2.24s-2.417,0.732-3.503,0.732H108h-0.082c-1.086,0-2.253-0.244-3.503-0.732c-1.249-0.488-2.621-1.236-4.114-2.24c-1.493-1.004-2.702-1.859-3.625-2.566c-0.923-0.705-2.173-1.725-3.748-3.056c-1.575-1.33-2.526-2.132-2.852-2.403c-11.297-8.962-22.187-17.57-32.67-25.827c-7.985-6.3-11.977-14.013-11.977-23.138c0-0.706,0.258-1.317,0.774-1.833c0.516-0.516,1.127-0.774,1.833-0.774h119.929c0.434,0.244,0.814,0.312,1.141,0.204c0.326-0.11,0.57,0.094,0.732,0.61c0.163,0.516,0.312,0.76,0.448,0.733c0.136-0.027,0.218,0.312,0.245,1.019c0.025,0.706,0.039,1.061,0.039,1.061V30.797z"/></svg>',CardJs.INFORMATION_SVG='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="4px" width="24px" height="16px" viewBox="0 0 216 146" enable-background="new 0 0 216 146" xml:space="preserve"><g><path class="svg" d="M97.571,41.714h20.859c1.411,0,2.633-0.516,3.666-1.548c1.031-1.031,1.547-2.254,1.547-3.666V20.857c0-1.412-0.516-2.634-1.549-3.667c-1.031-1.031-2.254-1.548-3.666-1.548H97.571c-1.412,0-2.634,0.517-3.666,1.548c-1.032,1.032-1.548,2.255-1.548,3.667V36.5c0,1.412,0.516,2.635,1.548,3.666C94.937,41.198,96.159,41.714,97.571,41.714z"/><path class="svg" d="M132.523,111.048c-1.031-1.032-2.254-1.548-3.666-1.548h-5.215V62.571c0-1.412-0.516-2.634-1.547-3.666c-1.033-1.032-2.255-1.548-3.666-1.548H87.143c-1.412,0-2.634,0.516-3.666,1.548c-1.032,1.032-1.548,2.254-1.548,3.666V73c0,1.412,0.516,2.635,1.548,3.666c1.032,1.032,2.254,1.548,3.666,1.548h5.215V109.5h-5.215c-1.412,0-2.634,0.516-3.666,1.548c-1.032,1.032-1.548,2.254-1.548,3.666v10.429c0,1.412,0.516,2.635,1.548,3.668c1.032,1.03,2.254,1.547,3.666,1.547h41.714c1.412,0,2.634-0.517,3.666-1.547c1.031-1.033,1.547-2.256,1.547-3.668v-10.429C134.07,113.302,133.557,112.08,132.523,111.048z"/></g></svg>',CardJs.keyCodeFromEvent=function(t){return t.which||t.keyCode},CardJs.keyIsCommandFromEvent=function(t){return t.ctrlKey||t.metaKey},CardJs.keyIsNumber=function(t){return CardJs.keyIsTopNumber(t)||CardJs.keyIsKeypadNumber(t)},CardJs.keyIsTopNumber=function(t){var e=CardJs.keyCodeFromEvent(t);return e>=CardJs.KEYS[0]&&e<=CardJs.KEYS[9]},CardJs.keyIsKeypadNumber=function(t){var e=CardJs.keyCodeFromEvent(t);return e>=CardJs.KEYS.NUMPAD_0&&e<=CardJs.KEYS.NUMPAD_9},CardJs.keyIsDelete=function(t){return CardJs.keyCodeFromEvent(t)==CardJs.KEYS.DELETE},CardJs.keyIsBackspace=function(t){return CardJs.keyCodeFromEvent(t)==CardJs.KEYS.BACKSPACE},CardJs.keyIsDeletion=function(t){return CardJs.keyIsDelete(t)||CardJs.keyIsBackspace(t)},CardJs.keyIsArrow=function(t){var e=CardJs.keyCodeFromEvent(t);return e>=CardJs.KEYS.ARROW_LEFT&&e<=CardJs.KEYS.ARROW_DOWN},CardJs.keyIsNavigation=function(t){var e=CardJs.keyCodeFromEvent(t);return e==CardJs.KEYS.HOME||e==CardJs.KEYS.END},CardJs.keyIsKeyboardCommand=function(t){var e=CardJs.keyCodeFromEvent(t);return CardJs.keyIsCommandFromEvent(t)&&(e==CardJs.KEYS.A||e==CardJs.KEYS.X||e==CardJs.KEYS.C||e==CardJs.KEYS.V)},CardJs.keyIsTab=function(t){return CardJs.keyCodeFromEvent(t)==CardJs.KEYS.TAB},CardJs.copyAllElementAttributes=function(t,e){$.each(t[0].attributes,function(t,r){e.attr(r.nodeName,r.nodeValue)})},CardJs.numbersOnlyString=function(t){for(var e="",r=0;r<t.length;r++){var a=t.charAt(r);!isNaN(parseInt(a))&&(e+=a)}return e},CardJs.applyFormatMask=function(t,e){for(var r="",a=0,s=0;s<e.length;s++){var n=e[s];if("X"==n){if(!t.charAt(a))break;r+=t.charAt(a),a++}else r+=n}return r},CardJs.cardTypeFromNumber=function(t){if(e=new RegExp("^30[0-5]"),null!=t.match(e))return"Diners - Carte Blanche";if(e=new RegExp("^(30[6-9]|36|38)"),null!=t.match(e))return"Diners";if(e=new RegExp("^35(2[89]|[3-8][0-9])"),null!=t.match(e))return"JCB";if(e=new RegExp("^3[47]"),null!=t.match(e))return"AMEX";if(e=new RegExp("^(4026|417500|4508|4844|491(3|7))"),null!=t.match(e))return"Visa Electron";var e=new RegExp("^4");return null!=t.match(e)?"Visa":(e=new RegExp("^5[1-5]"),null!=t.match(e)?"Mastercard":(e=new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"),null!=t.match(e)?"Discover":""))},CardJs.caretStartPosition=function(t){return"number"==typeof t.selectionStart&&t.selectionStart},CardJs.caretEndPosition=function(t){return"number"==typeof t.selectionEnd&&t.selectionEnd},CardJs.setCaretPosition=function(t,e){if(null!=t)if(t.createTextRange){var r=t.createTextRange();r.move("character",e),r.select()}else t.selectionStart?(t.focus(),t.setSelectionRange(e,e)):t.focus()},CardJs.normaliseCaretPosition=function(t,e){var r=0;if(e<0||e>t.length)return 0;for(var a=0;a<t.length;a++){if(a==e)return r;"X"==t[a]&&r++}return r},CardJs.denormaliseCaretPosition=function(t,e){var r=0;if(e<0||e>t.length)return 0;for(var a=0;a<t.length;a++){if(r==e)return a;"X"==t[a]&&r++}return t.length},CardJs.filterNumberOnlyKey=function(t){var e=CardJs.keyIsNumber(t),r=CardJs.keyIsDeletion(t),a=CardJs.keyIsArrow(t),s=CardJs.keyIsNavigation(t),n=CardJs.keyIsKeyboardCommand(t),i=CardJs.keyIsTab(t);e||r||a||s||n||i||t.preventDefault()},CardJs.digitFromKeyCode=function(t){return t>=CardJs.KEYS[0]&&t<=CardJs.KEYS[9]?t-CardJs.KEYS[0]:t>=CardJs.KEYS.NUMPAD_0&&t<=CardJs.KEYS.NUMPAD_9?t-CardJs.KEYS.NUMPAD_0:null},CardJs.handleMaskedNumberInputKey=function(t,e){CardJs.filterNumberOnlyKey(t);var r=t.which||t.keyCode,a=t.target,s=CardJs.caretStartPosition(a),n=CardJs.caretEndPosition(a),i=CardJs.normaliseCaretPosition(e,s),p=CardJs.normaliseCaretPosition(e,n),c=s,o=CardJs.keyIsNumber(t),d=CardJs.keyIsDelete(t),C=CardJs.keyIsBackspace(t);if(o||d||C){t.preventDefault();var u=$(a).val(),h=CardJs.numbersOnlyString(u),l=CardJs.digitFromKeyCode(r),y=p>i;y&&(h=h.slice(0,i)+h.slice(p)),s!=e.length&&(o&&u.length<=e.length&&(h=h.slice(0,i)+l+h.slice(i),c=Math.max(CardJs.denormaliseCaretPosition(e,i+1),CardJs.denormaliseCaretPosition(e,i+2)-1)),d&&(h=h.slice(0,i)+h.slice(i+1))),0!=s&&C&&!y&&(h=h.slice(0,i-1)+h.slice(i),c=CardJs.denormaliseCaretPosition(e,i-1)),$(a).val(CardJs.applyFormatMask(h,e)),CardJs.setCaretPosition(a,c)}},CardJs.handleCreditCardNumberKey=function(t,e){CardJs.handleMaskedNumberInputKey(t,e)},CardJs.handleCreditCardNumberChange=function(t){},CardJs.handleExpiryKey=function(t){CardJs.handleMaskedNumberInputKey(t,CardJs.EXPIRY_MASK)},CardJs.prototype.getCardNumber=function(){return this.cardNumberInput.val()},CardJs.prototype.getCardType=function(){return CardJs.cardTypeFromNumber(this.getCardNumber())},CardJs.prototype.getName=function(){return this.nameInput.val()},CardJs.prototype.getExpiryMonth=function(){return this.expiryMonthInput.val()},CardJs.prototype.getExpiryYear=function(){return this.expiryYearInput.val()},CardJs.prototype.getCvc=function(){return this.cvcInput.val()},CardJs.prototype.setIconColour=function(t){this.elem.find(".icon .svg").css({fill:t})},CardJs.prototype.setIconColour=function(t){this.elem.find(".icon .svg").css({fill:t})},CardJs.prototype.refreshCreditCardTypeIcon=function(){this.setCardTypeIconFromNumber(CardJs.numbersOnlyString(this.cardNumberInput.val()))},CardJs.prototype.refreshCreditCardNumberFormat=function(){var t=CardJs.numbersOnlyString($(this.cardNumberInput).val()),e=CardJs.applyFormatMask(t,this.creditCardNumberMask);$(this.cardNumberInput).val(e)},CardJs.prototype.refreshExpiryMonthYearInput=function(){var t=CardJs.numbersOnlyString($(this.expiryMonthYearInput).val()),e=CardJs.applyFormatMask(t,CardJs.EXPIRY_MASK);$(this.expiryMonthYearInput).val(e)},CardJs.prototype.refreshCvc=function(){var t=CardJs.numbersOnlyString($(this.cvcInput).val()),e=CardJs.applyFormatMask(t,this.creditCardNumberMask);$(this.cvcInput).val(e)},CardJs.prototype.setCardTypeIconFromNumber=function(t){switch(CardJs.cardTypeFromNumber(t)){case"Visa Electron":case"Visa":this.setCardTypeAsVisa();break;case"Mastercard":this.setCardTypeAsMasterCard();break;case"AMEX":this.setCardTypeAsAmericanExpress();break;case"Discover":this.setCardTypeAsDiscover();break;case"Diners - Carte Blanche":case"Diners":this.setCardTypeAsDiners();break;case"JCB":this.setCardTypeAsJcb();break;default:this.clearCardType()}},CardJs.prototype.setCardMask=function(t){this.creditCardNumberMask=t,this.cardNumberInput.attr("maxlength",t.length)},CardJs.prototype.setCvc3=function(){this.cvcInput.attr("maxlength",CardJs.CVC_MASK_3.length)},CardJs.prototype.setCvc4=function(){this.cvcInput.attr("maxlength",CardJs.CVC_MASK_4.length)},CardJs.prototype.clearCardTypeIcon=function(){this.elem.find(".card-number-wrapper .card-type-icon").removeClass("show")},CardJs.prototype.setCardTypeIconAsVisa=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show visa")},CardJs.prototype.setCardTypeIconAsMasterCard=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show master-card")},CardJs.prototype.setCardTypeIconAsAmericanExpress=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show american-express")},CardJs.prototype.setCardTypeIconAsDiscover=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show discover")},CardJs.prototype.setCardTypeIconAsDiners=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show diners")},CardJs.prototype.setCardTypeIconAsJcb=function(){this.elem.find(".card-number-wrapper .card-type-icon").attr("class","card-type-icon show jcb")},CardJs.prototype.clearCardType=function(){this.clearCardTypeIcon(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DEFAULT_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsVisa=function(){this.setCardTypeIconAsVisa(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_VISA_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsMasterCard=function(){this.setCardTypeIconAsMasterCard(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_MASTERCARD_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsAmericanExpress=function(){this.setCardTypeIconAsAmericanExpress(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_AMEX_MASK),this.setCvc4()},CardJs.prototype.setCardTypeAsDiscover=function(){this.setCardTypeIconAsDiscover(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DISCOVER_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsDiners=function(){this.setCardTypeIconAsDiners(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_DINERS_MASK),this.setCvc3()},CardJs.prototype.setCardTypeAsJcb=function(){this.setCardTypeIconAsJcb(),this.setCardMask(CardJs.CREDIT_CARD_NUMBER_JCB_MASK),this.setCvc3()},CardJs.prototype.initCardNumberInput=function(){this.cardNumberInput=CardJs.detachOrCreateElement(this.elem,".card-number","<input class='card-number' />"),CardJs.elementHasAttribute(this.cardNumberInput,"name")||this.cardNumberInput.attr("name","card-number"),CardJs.elementHasAttribute(this.cardNumberInput,"placeholder")||this.cardNumberInput.attr("placeholder",CardJs.CREDIT_CARD_NUMBER_PLACEHOLDER),this.cardNumberInput.attr("type","tel"),this.cardNumberInput.attr("maxlength",this.creditCardNumberMask.length),this.cardNumberInput.attr("x-autocompletetype","cc-number"),this.cardNumberInput.attr("autocompletetype","cc-number"),this.cardNumberInput.attr("autocorrect","off"),this.cardNumberInput.attr("spellcheck","off"),this.cardNumberInput.attr("autocapitalize","off");var t=this;this.cardNumberInput.keydown(function(e){CardJs.handleCreditCardNumberKey(e,t.creditCardNumberMask)}),this.cardNumberInput.keyup(function(){t.refreshCreditCardTypeIcon()}),this.cardNumberInput.on("paste",function(){setTimeout(function(){t.refreshCreditCardNumberFormat(),t.refreshCreditCardTypeIcon()},1)})},CardJs.prototype.initNameInput=function(){this.captureName=null!=this.elem.find(".name")[0],this.nameInput=CardJs.detachOrCreateElement(this.elem,".name","<input class='name' />"),CardJs.elementHasAttribute(this.nameInput,"name")||this.nameInput.attr("name","card-number"),CardJs.elementHasAttribute(this.nameInput,"placeholder")||this.nameInput.attr("placeholder",CardJs.NAME_PLACEHOLDER)},CardJs.prototype.initExpiryMonthInput=function(){this.expiryMonthInput=CardJs.detachOrCreateElement(this.elem,".expiry-month","<input class='expiry-month' />")},CardJs.prototype.initExpiryYearInput=function(){this.expiryYearInput=CardJs.detachOrCreateElement(this.elem,".expiry-year","<input class='expiry-year' />")},CardJs.prototype.initCvcInput=function(){this.cvcInput=CardJs.detachOrCreateElement(this.elem,".cvc","<input class='cvc' />"),CardJs.elementHasAttribute(this.cvcInput,"placeholder")||this.cvcInput.attr("placeholder",CardJs.CVC_PLACEHOLDER),this.cvcInput.attr("type","tel"),this.cvcInput.attr("maxlength",CardJs.CVC_MASK_3.length),this.cvcInput.attr("x-autocompletetype","cc-csc"),this.cvcInput.attr("autocompletetype","cc-csc"),this.cvcInput.attr("autocorrect","off"),this.cvcInput.attr("spellcheck","off"),this.cvcInput.attr("autocapitalize","off");var t=this;this.cvcInput.keydown(CardJs.filterNumberOnlyKey),this.cvcInput.on("paste",function(){setTimeout(function(){t.refreshCvc()},1)})},CardJs.prototype.setupCardNumberInput=function(){this.stripe&&this.cardNumberInput.attr("data-stripe","number"),this.elem.append("<div class='card-number-wrapper'></div>");var t=this.elem.find(".card-number-wrapper");t.append(this.cardNumberInput),t.append("<div class='card-type-icon'></div>"),t.append("<div class='icon'></div>"),t.find(".icon").append(CardJs.CREDIT_CARD_SVG)},CardJs.prototype.setupNameInput=function(){if(this.captureName){this.elem.append("<div class='name-wrapper'></div>");var t=this.elem.find(".name-wrapper");t.append(this.nameInput),t.append("<div class='icon'></div>"),t.find(".icon").append(CardJs.USER_SVG)}},CardJs.prototype.setupExpiryInput=function(){this.elem.append("<div class='expiry-container'><div class='expiry-wrapper'></div></div>");var t,e=this.elem.find(".expiry-wrapper");if(this.EXPIRY_USE_DROPDOWNS){t=$("<div></div>");var r=$("<select><option value='any' selected='' hidden=''>MM</option><option value='1'>01</option><option value='2'>02</option><option value='3'>03</option><option value='4'>04</option><option value='5'>05</option><option value='6'>06</option><option value='7'>07</option><option value='8'>08</option><option value='9'>09</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option></select>"),a=this.expiryMonthInput;CardJs.copyAllElementAttributes(a,r),this.expiryMonthInput.remove(),this.expiryMonthInput=r;for(var s=$("<select><option value='any' selected='' hidden=''>YY</option></select>"),n=parseInt((new Date).getFullYear().toString().substring(2,4)),i=0;i<CardJs.EXPIRY_NUMBER_OF_YEARS;i++)s.append("<option value='"+n+"'>"+n+"</option>"),n=(n+1)%100;var p=this.expiryYearInput;CardJs.copyAllElementAttributes(p,s),this.expiryYearInput.remove(),this.expiryYearInput=s,t.append(this.expiryMonthInput),t.append(this.expiryYearInput)}else{t=$("<div></div>"),"hidden"!=this.expiryMonthInput.attr("type")&&this.expiryMonthInput.attr("type","hidden"),"hidden"!=this.expiryYearInput.attr("type")&&this.expiryYearInput.attr("type","hidden"),this.stripe&&(this.expiryMonthInput.attr("data-stripe","exp-month"),this.expiryYearInput.attr("data-stripe","exp-year")),this.expiryMonthYearInput=CardJs.detachOrCreateElement(this.elem,".expiry","<input class='expiry' />"),CardJs.elementHasAttribute(this.expiryMonthYearInput,"placeholder")||this.expiryMonthYearInput.attr("placeholder",CardJs.EXPIRY_PLACEHOLDER),this.expiryMonthYearInput.attr("type","tel"),this.expiryMonthYearInput.attr("maxlength",CardJs.EXPIRY_MASK.length),this.expiryMonthYearInput.attr("x-autocompletetype","cc-exp"),this.expiryMonthYearInput.attr("autocompletetype","cc-exp"),this.expiryMonthYearInput.attr("autocorrect","off"),this.expiryMonthYearInput.attr("spellcheck","off"),this.expiryMonthYearInput.attr("autocapitalize","off");var c=this;this.expiryMonthYearInput.keydown(function(t){CardJs.handleExpiryKey(t);var e=c.expiryMonthYearInput.val();1==e.length&&parseInt(e)>1&&CardJs.keyIsNumber(t)&&c.expiryMonthYearInput.val(CardJs.applyFormatMask("0"+e,CardJs.EXPIRY_MASK)),c.EXPIRY_USE_DROPDOWNS||null==c.expiryMonthYearInput||(c.expiryMonthInput.val(c.expiryMonth()),c.expiryYearInput.val(7==e.length?e.substr(5,2):null))}),this.expiryMonthYearInput.blur(function(){c.refreshExpiryMonthValidation()}),this.expiryMonthYearInput.on("paste",function(){setTimeout(function(){c.refreshExpiryMonthYearInput()},1)}),t.append(this.expiryMonthYearInput),t.append(this.expiryMonthInput),t.append(this.expiryYearInput)}e.append(t),e.append("<div class='icon'></div>"),e.find(".icon").append(CardJs.CALENDAR_SVG)},CardJs.prototype.setupCvcInput=function(){this.stripe&&this.cvcInput.attr("data-stripe","cvc"),this.elem.append("<div class='cvc-container'><div class='cvc-wrapper'></div></div>");var t=this.elem.find(".cvc-wrapper");t.append(this.cvcInput),t.append("<div class='icon'></div>"),t.find(".icon").append(CardJs.LOCK_SVG)},CardJs.prototype.expiryMonth=function(){if(!this.EXPIRY_USE_DROPDOWNS&&null!=this.expiryMonthYearInput){var t=this.expiryMonthYearInput.val();return t.length>=2?parseInt(t.substr(0,2)):null}return null},CardJs.prototype.refreshExpiryMonthValidation=function(){CardJs.isExpiryValid(this.getExpiryMonth(),this.getExpiryYear())?this.setExpiryMonthAsValid():this.setExpiryMonthAsInvalid()},CardJs.prototype.setExpiryMonthAsValid=function(){this.EXPIRY_USE_DROPDOWNS||this.expiryMonthYearInput.parent().removeClass("has-error")},CardJs.prototype.setExpiryMonthAsInvalid=function(){this.EXPIRY_USE_DROPDOWNS||this.expiryMonthYearInput.parent().addClass("has-error")},CardJs.elementHasAttribute=function(t,e){var r=$(t).attr(e);return void 0!==r&&!1!==r},CardJs.detachOrCreateElement=function(t,e,r){var a=t.find(e);return a[0]?a.detach():a=$(r),a},CardJs.isValidMonth=function(t){return t>=1&&t<=12},CardJs.isExpiryValid=function(t,e){var r=new Date,a=r.getMonth()+1,s=""+r.getFullYear();return 2==(""+e).length&&(e=s.substring(0,2)+""+e),a=parseInt(a),s=parseInt(s),t=parseInt(t),e=parseInt(e),CardJs.isValidMonth(t)&&(e>s||e==s&&t>=a)};
$(function() {
  var showMoreSelector = "[data-toggle=showCollapsed]";
  var collapsedListSelector = "ul[data-type=collapsed]";
  $(document).on("click", showMoreSelector, function(e) {
    e.preventDefault();
    $(this).closest(collapsedListSelector).find("li").show();
    $(this).hide();
  });
  $(document).ready(function() {
    $(collapsedListSelector).each(function() {
      var initialItems = $(this).data("initial-items") || 3;
      var totalItems = $(this).find("li").length;
      $(this).find("li:nth-child(-n+"+ initialItems +")").show();
      if(initialItems > totalItems) $(this).find(showMoreSelector).hide();
    });
  });
});
$(function() {
  $("[data-toggle='modal']").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
      $(".modal-bourbon .alert-box").hide();
    }
  });

  $(".modal-fade-screen, .modal-close").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });

  $(".modal-bourbon label button").on("click", function (e) {
    $(e.target).parent("label").trigger("click");
  });
});
(function defineMustache(global,factory){if(typeof exports==="object"&&exports&&typeof exports.nodeName!=="string"){factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],factory)}else{global.Mustache={};factory(global.Mustache)}})(this,function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n")stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){value=context.view;names=name.split(".");index=0;while(value!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(value,names[index]);value=value[names[index++]]}}else{value=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials){var tokens=this.parse(template);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,originalTemplate);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.renderPartial=function renderPartial(token,context,partials){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)return this.renderTokens(this.parse(value),context,partials,value)};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="2.2.1";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer});
$(function() {
  function genSequenceJsonApi(objects_type, order) {
    return {
      data: {
        type: "api-v1-sequences",
        attributes: {
          objects_type: objects_type,
          order: order,
        }
      }
    };
  }
  if ($("[data-type=sortable]").length) {
    $("[data-type=sortable]").sortable({ handle: ".sortable-handle" });
  }
  $("[data-trigger=saveSortOrder]").click(function() {
    var innerHtml = $(this).html();
    var data = genSequenceJsonApi(
      $(this).data("objects-type"),
      $("#" + this.dataset["target"] + " [data-type=sortable]").sortable("toArray")
    );
    var spinner = $(this).data("disable-with");
    $.ajax($(this).data("url"), {
      context: this,
      beforeSend: function() {
        $(this).html(spinner);
        return true;
      },
      dataType: "json",
      type: "POST",
      data: data,
      success: function() {
        swal({ text: "Successfully saved", type: "success" });
      },
      error: function() {
        swal({ text: "Please, try again later", type: "error"});
      },
      complete: function() {
        $(this).html(innerHtml);
      }
    });
  });
});
(function() {
  $('.connect-costs-export').on('click', function(e) {
    var conditions, form;
    e.preventDefault();
    form = $(this).closest('form');
    conditions = (form.serialize()) + "&format=csv";
    return window.location = (form.attr('action')) + "?" + conditions;
  });

}).call(this);
$(document).ready(function() {
  var localizedHosts = {
    "en": "worldbibleschool.org",
    "es": "escuelabiblicamundial.org",
    "fr": "ecolemondialedelabible.org",
    "pt": "escolabiblicamundial.org"
  };
  var languageSelector = $('.language-selector select');
  var currentLocale = $('body').data('current-locale');

  languageSelector.val(currentLocale);
  languageSelector.change(function() {
    var selectedLocale = languageSelector.val();
    var protocol = window.location.protocol + '//';
    var host = localizedHosts[selectedLocale];
    var pathname = window.location.pathname.split('/').filter(Boolean);
    var params = window.location.search;

    if (pathname.includes(currentLocale)) { pathname.splice(0, 1) }
    window.location.href = protocol + host + "/" + pathname.join('/') + params;
  });
});
(function() {
  var activatePostal, activateSelectedMode, activateWeb;

  activatePostal = function() {
    $(".webInfo").fadeOut();
    $("label[for=student_email] em").fadeOut();
    $(".webInfo input").each(function() {
      return $(this).prop("disabled", true);
    });
    $(".postalInfo input").each(function() {
      return $(this).prop("disabled", false);
    });
    return $(".postalInfo").fadeIn();
  };

  activateWeb = function() {
    $(".postalInfo").fadeOut();
    $("label[for=student_email] em").fadeIn();
    $(".webInfo input").each(function() {
      return $(this).prop("disabled", false);
    });
    $(".postalInfo input").each(function() {
      return $(this).prop("disabled", true);
    });
    return $(".webInfo").fadeIn();
  };

  activateSelectedMode = function(mode) {
    switch (mode) {
      case 'web':
        return activateWeb();
      case 'postal':
        return activatePostal();
    }
  };

  $(document).ready(function() {
    $("#student_birth_year").change(function(event) {
      var age, theDate, theYear;
      theDate = new Date;
      theYear = theDate.getFullYear();
      age = theYear - $("#student_birth_year").val() - 1;
      if (age < 13) {
        $("input[name='student[mode]']").attr("checked", false);
        $("#student_mode_postal").prop("checked", true);
        $(".js-web-radio").hide();
        $(".js-under-13").show();
        return activatePostal();
      } else {
        if ($(".js-web-only")[0]) {
          activateWeb();
        } else {
          $(".js-web-radio").show();
        }
        return $(".js-under-13").hide();
      }
    });
    if ($("#register-form").length) {
      activateSelectedMode($("form").data("mode"));
    }
    return $("input[name='student[mode]']").on("change", function() {
      return activateSelectedMode($(this).val());
    });
  });

}).call(this);
(function() {
  $(document).ready(function() {
    $(document).on("click touchstart", "#menu-toggle", function(event) {
      event.stopPropagation();
      event.preventDefault();
      $(".sidebar-nav").toggleClass("is-open");
      $(".page-wrapper").toggleClass("sidebar-nav-open");
    });
    $(document).on("click touchstart", "#nav-close, .page-wrapper", function(event) {
      $(".sidebar-nav").removeClass("is-open");
      $(".page-wrapper").removeClass("sidebar-nav-open");
    });
    $(".js-dropdown").on("click", function() {
      $(".js-dropdown-menu").toggleClass("is-open");
    });
    $('#new_contact').on('submit', function() {
      var $button;
      $button = $(this).find('button');
      return $button.attr('disabled', 'true');
    });
  });

}).call(this);
//fgnass.github.com/spin.js#v2.0.1
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(e(f,{left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//












;
