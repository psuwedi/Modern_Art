/*
 * Simple jQuery Dialog
 * https://github.com/filamentgroup/dialog
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Author: @scottjehl
 * Contributors: @johnbender
 * Licensed under the MIT, GPL licenses.
 */


(function( w, $ ){
  w.componentNamespace = w.componentNamespace || w;

  var pluginName = "dialog", cl, ev,
    nullHash = "dialog",
    doc = w.document,
    docElem = doc.documentElement,
    body = doc.body,
    $html = $( docElem );


  var Dialog = w.componentNamespace.Dialog = function( element ){
    this.$el = $( element );
    this.$background = !this.$el.is( '[data-nobg]' ) ?
      $( doc.createElement('div') ).addClass( cl.bkgd ).appendTo( "body") :
      $( [] );
    this.hash = this.$el.attr( "id" ) + "-dialog";

    this.isOpen = false;
    this.positionMedia = this.$el.attr( 'data-set-position-media' );
    this.isTransparentBackground = this.$el.is( '[data-transbg]' );
  };

  Dialog.events = ev = {
    open: pluginName + "-open",
    opened: pluginName + "-opened",
    close: pluginName + "-close",
    closed: pluginName + "-closed"
  };

  Dialog.classes = cl = {
    open: pluginName + "-open",
    opened: pluginName + "-opened",
    content: pluginName + "-content",
    close: pluginName + "-close",
    closed: pluginName + "-closed",
    bkgd: pluginName + "-background",
    bkgdOpen: pluginName + "-background-open",
    bkgdTrans: pluginName + "-background-trans"
  };

  Dialog.prototype.isSetScrollPosition = function() {
    return !this.positionMedia ||
      ( w.matchMedia && w.matchMedia( this.positionMedia ).matches );
  };

  Dialog.prototype.destroy = function() {
    this.$background.remove();
  };

  Dialog.prototype.open = function( e ) {
    if( this.$background.length ) {
      this.$background[ 0 ].style.height = Math.max( docElem.scrollHeight, docElem.clientHeight ) + "px";
    }
    this.$el.addClass( cl.open );
    this.$background.addClass( cl.bkgdOpen );
    this._setBackgroundTransparency();

    if( this.isSetScrollPosition() ) {
      this.scroll = "pageYOffset" in w ? w.pageYOffset : ( docElem.scrollY || docElem.scrollTop || ( body && body.scrollY ) || 0 );
      this.$el[ 0 ].style.top = this.scroll + "px";
    } else {
      this.$el[ 0 ].style.top = '';
    }

    $html.addClass( cl.open );
    this.isOpen = true;

    location.hash = this.hash;

    if( doc.activeElement ){
      this.focused = doc.activeElement;
    }
    this.$el[ 0 ].focus();

    this.$el.trigger( ev.opened );
  };

  Dialog.prototype._setBackgroundTransparency = function() {
    if( this.isTransparentBackground ){
      this.$background.addClass( cl.bkgdTrans );
    }
  };

  Dialog.prototype.close = function(){
    if( !this.isOpen ){
      return;
    }

    this.$el.removeClass( cl.open );

    this.$background.removeClass( cl.bkgdOpen );
    $html.removeClass( cl.open );

    if( this.focused ){
      this.focused.focus();
    }

    if( this.isSetScrollPosition() ) {
      w.scrollTo( 0, this.scroll );
    }

    this.isOpen = false;

    this.$el.trigger( ev.closed );
  };
}( this, jQuery ));

(function( w, $ ){
  var Dialog = w.componentNamespace.Dialog, doc = document;

  $.fn.dialog = function( transbg ){
    return this.each(function(){
      var $el = $( this ), dialog = new Dialog( this );

      $el.data( "instance", dialog );

      $el.addClass( Dialog.classes.content )
        .attr( "role", "dialog" )
        .attr( "tabindex", 0 )
        .bind( Dialog.events.open, function(){
          dialog.open();
        })
        .bind( Dialog.events.close, function(){
          dialog.close();
        })
        .bind( "click", function( e ){
          if( $( e.target ).is( "." + Dialog.classes.close ) ){
            w.history.back();
            e.preventDefault();
          }
        });

      dialog.$background.bind( "click", function( e ) {
        w.history.back();
      });

      // close on hashchange if open (supports back button closure)
      $( w ).bind( "hashchange", function( e ){
        var hash = w.location.hash.replace( "#", "" );

        if( hash !== dialog.hash ){
          dialog.close();
        }
      });

      // open on matching a[href=#id] click
      $( doc ).bind( "click", function( e ){
        var $a = $( e.target ).closest( "a" );

        if( !dialog.isOpen && $a.length && $a.attr( "href" ) ){

          // catch invalid selector exceptions
          try {
            var $matchingDialog = $( $a.attr( "href" ) );
          } catch ( error ) {
            // TODO should check the type of exception, it's not clear how well
            //      the error name "SynatxError" is supported
            return;
          }

          if( $matchingDialog.length && $matchingDialog.is( $el ) ){
            $matchingDialog.trigger( Dialog.events.open );
            e.preventDefault();
          }
        }
      });

      // close on escape key
      $( doc ).bind( "keyup", function( e ){
        if( e.which === 27 ){
          dialog.close();
        }
      });
    });
  };

  // auto-init
  $(function(){
    $( ".dialog" ).dialog();
  });
}( this, jQuery ));
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
	Autosize 3.0.18
	license: MIT
	http://www.jacklmoore.com/autosize
*/

!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),l="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(l)&&(l=0),s()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,e.style.overflowY=t,r()}function o(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}function r(){var t=e.style.height,n=o(e),r=document.documentElement&&document.documentElement.scrollTop;e.style.height="auto";var i=e.scrollHeight+l;return 0===e.scrollHeight?void(e.style.height=t):(e.style.height=i+"px",u=e.clientWidth,n.forEach(function(e){e.node.scrollTop=e.scrollTop}),void(r&&(document.documentElement.scrollTop=r)))}function s(){r();var t=window.getComputedStyle(e,null),o=Math.round(parseFloat(t.height)),i=Math.round(parseFloat(e.style.height));if(o!==i?"visible"!==t.overflowY&&n("visible"):"hidden"!==t.overflowY&&n("hidden"),a!==o){a=o;var s=d("autosize:resized");try{e.dispatchEvent(s)}catch(l){}}}if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!i.has(e)){var l=null,u=e.clientWidth,a=null,c=function(){e.clientWidth!==u&&s()},p=function(t){window.removeEventListener("resize",c,!1),e.removeEventListener("input",s,!1),e.removeEventListener("keyup",s,!1),e.removeEventListener("autosize:destroy",p,!1),e.removeEventListener("autosize:update",s,!1),Object.keys(t).forEach(function(n){e.style[n]=t[n]}),i["delete"](e)}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",p,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",s,!1),window.addEventListener("resize",c,!1),e.addEventListener("input",s,!1),e.addEventListener("autosize:update",s,!1),e.style.overflowX="hidden",e.style.wordWrap="break-word",i.set(e,{destroy:p,update:s}),t()}}function o(e){var t=i.get(e);t&&t.destroy()}function r(e){var t=i.get(e);t&&t.update()}var i="function"==typeof Map?new Map:function(){var e=[],t=[];return{has:function(t){return e.indexOf(t)>-1},get:function(n){return t[e.indexOf(n)]},set:function(n,o){-1===e.indexOf(n)&&(e.push(n),t.push(o))},"delete":function(n){var o=e.indexOf(n);o>-1&&(e.splice(o,1),t.splice(o,1))}}}(),d=function(e){return new Event(e)};try{new Event("test")}catch(s){d=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}var l=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(l=function(e){return e},l.destroy=function(e){return e},l.update=function(e){return e}):(l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},l.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e}),t.exports=l});
(function() {
  $(document).ready(function() {
    return $(".email-lesson").on("click", function(event) {
      var button, url;
      url = $(this).parent().attr("action");
      button = $(this);
      $(this).prop('disabled', true);
      $(this).html("sending...");
      $.ajax({
        type: "put",
        dataType: "json",
        url: url
      }).done(function(data) {
        button.hide();
        return $('.email-lesson-sent').show();
      });
      event.preventDefault();
    });
  });

}).call(this);
(function() {
  $(document).ready(function() {
    $(".dialog .close-modal").click(function(e) {
      e.preventDefault();
      return $(".dialog").trigger("dialog-close");
    });
    $("#share").on("ajax:error", function(e, data) {
      return $(e.target).renderFormErrors("share", data.responseJSON);
    }).on("ajax:success", function() {
      $("#share_invitee_email").val("");
      $('#share-email-box').hide();
      return $('#share-thanks').show();
    });
    return $('#share-again').on('click', function(event) {
      $('#share-email-box').show();
      return $('#share-thanks').hide();
    });
  });

}).call(this);
(function() {
  $(document).ready(function() {
    var autosaveAnswer;
    autosaveAnswer = function(input) {
      var assignment_id, question, question_container, values;
      assignment_id = input.closest(".auto-submit").data("assignment-id");
      question_container = input.closest(".unanswered, .incorrect");
      values = {};
      values["question_id"] = input.data("question_id");
      values["version"] = input.data("question_version");
      values["kind"] = input.data("kind");
      values["lesson_segment_id"] = $(".lesson-segment-title").data("lessonSegmentId");
      values["thought"] = "";
      values["choice_id"] = "";
      values["choice_tf"] = "";
      values["date_mm"] = "";
      values["date_dd"] = "";
      values["date_yyyy"] = "";
      question = {};
      question["question"] = values;
      if (input.data("choice_id") !== "") {
        question["question"]["choice"] = input.data("choice_id");
      }
      if (input.data("choice_tf") !== "") {
        question["question"]["choice_tf"] = input.data("choice_tf");
      }
      if (input.data("date_mm") === true || input.data("date_dd") || input.data("date_yyyy")) {
        question["question"]["date_mm"] = $("#question_" + values["question_id"] + "_date_mm").val();
        question["question"]["date_dd"] = $("#question_" + values["question_id"] + "_date_dd").val();
        question["question"]["date_yyyy"] = $("#question_" + values["question_id"] + "_date_yyyy").val();
      }
      if (input.data("thought") === true) {
        question["question"]["thought"] = input.val();
      }
      $.ajax({
        type: "post",
        data: question,
        url: "/assignments/" + assignment_id + "/save",
        dataType: "json"
      }).error(function(data) {}).done(function(data) {
        if (data) {
          if (!$(".answer-saved." + data["question_id"]).is(":visible")) {
            $(".answer-saved." + data["question_id"]).fadeIn(500).fadeOut(3000);
          }
          $(".current-segment .questions-completed").html(data["completed_for_segment"]);
          question_container.removeClass("unanswered");
          if (data.answer && data.answer.correct) {
            question_container.removeClass("incorrect");
          }
          if (data["completed_all_questions"]) {
            $(".submit-section").hide();
            $(".submit-all").show();
          } else {
            $(".submit-section").show();
            $(".submit-all").hide();
          }
        }
      });
    };
    jQuery(window).load(function() {
      var question;
      if (window.location.hash.indexOf("question") !== -1) {
        question = window.location.hash.replace("question-", "");
        $("html, body").animate({
          scrollTop: $(question).offset().top
        }, "slow");
      }
    });
    $(".open-new-question").on("click", function(event) {
      $(this).parent(".lesson-padding").next(".question-hide").removeClass("question-hide");
      $(this).parent(".lesson-padding").remove();
      event.preventDefault();
    });
    $(".auto-submit :input").change(function() {
      autosaveAnswer($(this));
    });
    $(".auto-submit textarea").bind("input propertychange", function() {
      autosaveAnswer($(this));
    });
  });

}).call(this);
(function() {


}).call(this);
/*
 * jQuery Plugin: Tokenizing Autocomplete Text Entry
 * Version 1.6.0
 *
 * Copyright (c) 2009 James Smith (http://loopj.com)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 */


(function ($) {
// Default settings
var DEFAULT_SETTINGS = {
	// Search settings
    method: "GET",
    contentType: "json",
    queryParam: "q",
    searchDelay: 300,
    minChars: 1,
    propertyToSearch: "name",
    jsonContainer: null,

	// Display settings
    hintText: "Type in a search term",
    noResultsText: "No results",
    searchingText: "Searching...",
    deleteText: "&times;",
    animateDropdown: true,

	// Tokenization settings
    tokenLimit: null,
    tokenDelimiter: ",",
    preventDuplicates: false,

	// Output settings
    tokenValue: "id",

	// Prepopulation settings
    prePopulate: null,
    processPrePopulate: false,

	// Manipulation settings
    idPrefix: "token-input-",

	// Formatters
    resultsFormatter: function(item){ return "<li>" + item[this.propertyToSearch]+ "</li>" },
    tokenFormatter: function(item) { return "<li><p>" + item[this.propertyToSearch] + "</p></li>" },

	// Callbacks
    onResult: null,
    onAdd: null,
    onDelete: null,
    onReady: null
};

// Default classes to use when theming
var DEFAULT_CLASSES = {
    tokenList: "token-input-list",
    token: "token-input-token",
    tokenDelete: "token-input-delete-token",
    selectedToken: "token-input-selected-token",
    highlightedToken: "token-input-highlighted-token",
    dropdown: "token-input-dropdown",
    dropdownItem: "token-input-dropdown-item",
    dropdownItem2: "token-input-dropdown-item2",
    selectedDropdownItem: "token-input-selected-dropdown-item",
    inputToken: "token-input-input-token"
};

// Input box position "enum"
var POSITION = {
    BEFORE: 0,
    AFTER: 1,
    END: 2
};

// Keys "enum"
var KEY = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    NUMPAD_ENTER: 108,
    COMMA: 188
};

// Additional public (exposed) methods
var methods = {
    init: function(url_or_data_or_function, options) {
        var settings = $.extend({}, DEFAULT_SETTINGS, options || {});

        return this.each(function () {
            $(this).data("tokenInputObject", new $.TokenList(this, url_or_data_or_function, settings));
        });
    },
    clear: function() {
        this.data("tokenInputObject").clear();
        return this;
    },
    add: function(item) {
        this.data("tokenInputObject").add(item);
        return this;
    },
    remove: function(item) {
        this.data("tokenInputObject").remove(item);
        return this;
    },
    get: function() {
    	return this.data("tokenInputObject").getTokens();
   	}
}

// Expose the .tokenInput function to jQuery as a plugin
$.fn.tokenInput = function (method) {
    // Method calling and initialization logic
    if(methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
        return methods.init.apply(this, arguments);
    }
};

// TokenList class for each input
$.TokenList = function (input, url_or_data, settings) {
    //
    // Initialization
    //

    // Configure the data source
    if($.type(url_or_data) === "string" || $.type(url_or_data) === "function") {
        // Set the url to query against
        settings.url = url_or_data;

        // If the URL is a function, evaluate it here to do our initalization work
        var url = computeURL();

        // Make a smart guess about cross-domain if it wasn't explicitly specified
        if(settings.crossDomain === undefined) {
            if(url.indexOf("://") === -1) {
                settings.crossDomain = false;
            } else {
                settings.crossDomain = (location.href.split(/\/+/g)[1] !== url.split(/\/+/g)[1]);
            }
        }
    } else if(typeof(url_or_data) === "object") {
        // Set the local data to search through
        settings.local_data = url_or_data;
    }

    // Build class names
    if(settings.classes) {
        // Use custom class names
        settings.classes = $.extend({}, DEFAULT_CLASSES, settings.classes);
    } else if(settings.theme) {
        // Use theme-suffixed default class names
        settings.classes = {};
        $.each(DEFAULT_CLASSES, function(key, value) {
            settings.classes[key] = value + "-" + settings.theme;
        });
    } else {
        settings.classes = DEFAULT_CLASSES;
    }


    // Save the tokens
    var saved_tokens = [];

    // Keep track of the number of tokens in the list
    var token_count = 0;

    // Basic cache to save on db hits
    var cache = new $.TokenList.Cache();

    // Keep track of the timeout, old vals
    var timeout;
    var input_val;

    // Create a new text input an attach keyup events
    var input_box = $("<input type=\"text\"  autocomplete=\"off\">")
        .css({
            outline: "none"
        })
        .attr("id", settings.idPrefix + input.id)
        .focus(function () {
            if (settings.tokenLimit === null || settings.tokenLimit !== token_count) {
                show_dropdown_hint();
            }
        })
        .blur(function () {
            hide_dropdown();
            $(this).val("");
        })
        .bind("keyup keydown blur update", resize_input)
        .keydown(function (event) {
            var previous_token;
            var next_token;

            switch(event.keyCode) {
                case KEY.LEFT:
                case KEY.RIGHT:
                case KEY.UP:
                case KEY.DOWN:
                    if(!$(this).val()) {
                        previous_token = input_token.prev();
                        next_token = input_token.next();

                        if((previous_token.length && previous_token.get(0) === selected_token) || (next_token.length && next_token.get(0) === selected_token)) {
                            // Check if there is a previous/next token and it is selected
                            if(event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) {
                                deselect_token($(selected_token), POSITION.BEFORE);
                            } else {
                                deselect_token($(selected_token), POSITION.AFTER);
                            }
                        } else if((event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) && previous_token.length) {
                            // We are moving left, select the previous token if it exists
                            select_token($(previous_token.get(0)));
                        } else if((event.keyCode === KEY.RIGHT || event.keyCode === KEY.DOWN) && next_token.length) {
                            // We are moving right, select the next token if it exists
                            select_token($(next_token.get(0)));
                        }
                    } else {
                        var dropdown_item = null;

                        if(event.keyCode === KEY.DOWN || event.keyCode === KEY.RIGHT) {
                            dropdown_item = $(selected_dropdown_item).next();
                        } else {
                            dropdown_item = $(selected_dropdown_item).prev();
                        }

                        if(dropdown_item.length) {
                            select_dropdown_item(dropdown_item);
                        }
                        return false;
                    }
                    break;

                case KEY.BACKSPACE:
                    previous_token = input_token.prev();

                    if(!$(this).val().length) {
                        if(selected_token) {
                            delete_token($(selected_token));
                            hidden_input.change();
                        } else if(previous_token.length) {
                            select_token($(previous_token.get(0)));
                        }

                        return false;
                    } else if($(this).val().length === 1) {
                        hide_dropdown();
                    } else {
                        // set a timeout just long enough to let this function finish.
                        setTimeout(function(){do_search();}, 5);
                    }
                    break;

                case KEY.TAB:
                case KEY.ENTER:
                case KEY.NUMPAD_ENTER:
                case KEY.COMMA:
                  if(selected_dropdown_item) {
                    add_token($(selected_dropdown_item).data("tokeninput"));
                    hidden_input.change();
                    return false;
                  }
                  break;

                case KEY.ESCAPE:
                  hide_dropdown();
                  return true;

                default:
                    if(String.fromCharCode(event.which)) {
                        // set a timeout just long enough to let this function finish.
                        setTimeout(function(){do_search();}, 5);
                    }
                    break;
            }
        });

    // Keep a reference to the original input box
    var hidden_input = $(input)
                           .hide()
                           .val("")
                           .focus(function () {
                               input_box.focus();
                           })
                           .blur(function () {
                               input_box.blur();
                           });

    // Keep a reference to the selected token and dropdown item
    var selected_token = null;
    var selected_token_index = 0;
    var selected_dropdown_item = null;

    // The list to store the token items in
    var token_list = $("<ul />")
        .addClass(settings.classes.tokenList)
        .click(function (event) {
            var li = $(event.target).closest("li");
            if(li && li.get(0) && $.data(li.get(0), "tokeninput")) {
                toggle_select_token(li);
            } else {
                // Deselect selected token
                if(selected_token) {
                    deselect_token($(selected_token), POSITION.END);
                }

                // Focus input box
                input_box.focus();
            }
        })
        .mouseover(function (event) {
            var li = $(event.target).closest("li");
            if(li && selected_token !== this) {
                li.addClass(settings.classes.highlightedToken);
            }
        })
        .mouseout(function (event) {
            var li = $(event.target).closest("li");
            if(li && selected_token !== this) {
                li.removeClass(settings.classes.highlightedToken);
            }
        })
        .insertBefore(hidden_input);

    // The token holding the input box
    var input_token = $("<li />")
        .addClass(settings.classes.inputToken)
        .appendTo(token_list)
        .append(input_box);

    // The list to store the dropdown items in
    var dropdown = $("<div>")
        .addClass(settings.classes.dropdown)
        .appendTo("body")
        .hide();

    // Magic element to help us resize the text input
    var input_resizer = $("<tester/>")
        .insertAfter(input_box)
        .css({
            position: "absolute",
            top: -9999,
            left: -9999,
            width: "100%",
            fontSize: input_box.css("fontSize"),
            fontFamily: input_box.css("fontFamily"),
            fontWeight: input_box.css("fontWeight"),
            letterSpacing: input_box.css("letterSpacing"),
            whiteSpace: "nowrap"
        });

    // Pre-populate list if items exist
    hidden_input.val("");
    var li_data = settings.prePopulate || hidden_input.data("pre");
    if(settings.processPrePopulate && $.isFunction(settings.onResult)) {
        li_data = settings.onResult.call(hidden_input, li_data);
    }
    if(li_data && li_data.length) {
        $.each(li_data, function (index, value) {
            insert_token(value);
            checkTokenLimit();
        });
    }

    // Initialization is done
    if($.isFunction(settings.onReady)) {
        settings.onReady.call();
    }

    //
    // Public functions
    //

    this.clear = function() {
        token_list.children("li").each(function() {
            if ($(this).children("input").length === 0) {
                delete_token($(this));
            }
        });
    }

    this.add = function(item) {
        add_token(item);
    }

    this.remove = function(item) {
        token_list.children("li").each(function() {
            if ($(this).children("input").length === 0) {
                var currToken = $(this).data("tokeninput");
                var match = true;
                for (var prop in item) {
                    if (item[prop] !== currToken[prop]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    delete_token($(this));
                }
            }
        });
    }

    this.getTokens = function() {
   		return saved_tokens;
   	}

    //
    // Private functions
    //

    function checkTokenLimit() {
        if(settings.tokenLimit !== null && token_count >= settings.tokenLimit) {
            input_box.hide();
            hide_dropdown();
            return;
        }
    }

    function resize_input() {
        if(input_val === (input_val = input_box.val())) {return;}

        // Enter new content into resizer and resize input accordingly
        var escaped = input_val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        input_resizer.html(escaped);
        // input_box.width(input_resizer.width() + 30);
    }

    function is_printable_character(keycode) {
        return ((keycode >= 48 && keycode <= 90) ||     // 0-1a-z
                (keycode >= 96 && keycode <= 111) ||    // numpad 0-9 + - / * .
                (keycode >= 186 && keycode <= 192) ||   // ; = , - . / ^
                (keycode >= 219 && keycode <= 222));    // ( \ ) '
    }

    // Inner function to a token to the list
    function insert_token(item) {
        var this_token = settings.tokenFormatter(item);
        this_token = $(this_token)
          .addClass(settings.classes.token)
          .insertBefore(input_token);

        // The 'delete token' button
        $("<span>" + settings.deleteText + "</span>")
            .addClass(settings.classes.tokenDelete)
            .appendTo(this_token)
            .click(function () {
                delete_token($(this).parent());
                hidden_input.change();
                return false;
            });

        // Store data on the token
        var token_data = {"id": item.id};
        token_data[settings.propertyToSearch] = item[settings.propertyToSearch];
        $.data(this_token.get(0), "tokeninput", item);

        // Save this token for duplicate checking
        saved_tokens = saved_tokens.slice(0,selected_token_index).concat([token_data]).concat(saved_tokens.slice(selected_token_index));
        selected_token_index++;

        // Update the hidden input
        update_hidden_input(saved_tokens, hidden_input);

        token_count += 1;

        // Check the token limit
        if(settings.tokenLimit !== null && token_count >= settings.tokenLimit) {
            input_box.hide();
            hide_dropdown();
        }

        return this_token;
    }

    // Add a token to the token list based on user input
    function add_token (item) {
        var callback = settings.onAdd;

        // See if the token already exists and select it if we don't want duplicates
        if(token_count > 0 && settings.preventDuplicates) {
            var found_existing_token = null;
            token_list.children().each(function () {
                var existing_token = $(this);
                var existing_data = $.data(existing_token.get(0), "tokeninput");
                if(existing_data && existing_data.id === item.id) {
                    found_existing_token = existing_token;
                    return false;
                }
            });

            if(found_existing_token) {
                select_token(found_existing_token);
                input_token.insertAfter(found_existing_token);
                input_box.focus();
                return;
            }
        }

        // Insert the new tokens
        if(settings.tokenLimit == null || token_count < settings.tokenLimit) {
            insert_token(item);
            checkTokenLimit();
        }

        // Clear input box
        input_box.val("");

        // Don't show the help dropdown, they've got the idea
        hide_dropdown();

        // Execute the onAdd callback if defined
        if($.isFunction(callback)) {
            callback.call(hidden_input,item);
        }
    }

    // Select a token in the token list
    function select_token (token) {
        token.addClass(settings.classes.selectedToken);
        selected_token = token.get(0);

        // Hide input box
        input_box.val("");

        // Hide dropdown if it is visible (eg if we clicked to select token)
        hide_dropdown();
    }

    // Deselect a token in the token list
    function deselect_token (token, position) {
        token.removeClass(settings.classes.selectedToken);
        selected_token = null;

        if(position === POSITION.BEFORE) {
            input_token.insertBefore(token);
            selected_token_index--;
        } else if(position === POSITION.AFTER) {
            input_token.insertAfter(token);
            selected_token_index++;
        } else {
            input_token.appendTo(token_list);
            selected_token_index = token_count;
        }

        // Show the input box and give it focus again
        input_box.focus();
    }

    // Toggle selection of a token in the token list
    function toggle_select_token(token) {
        var previous_selected_token = selected_token;

        if(selected_token) {
            deselect_token($(selected_token), POSITION.END);
        }

        if(previous_selected_token === token.get(0)) {
            deselect_token(token, POSITION.END);
        } else {
            select_token(token);
        }
    }

    // Delete a token from the token list
    function delete_token (token) {
        // Remove the id from the saved list
        var token_data = $.data(token.get(0), "tokeninput");
        var callback = settings.onDelete;

        var index = token.prevAll().length;
        if(index > selected_token_index) index--;

        // Delete the token
        token.remove();
        selected_token = null;

        // Show the input box and give it focus again
        input_box.focus();

        // Remove this token from the saved list
        saved_tokens = saved_tokens.slice(0,index).concat(saved_tokens.slice(index+1));
        if(index < selected_token_index) selected_token_index--;

        // Update the hidden input
        update_hidden_input(saved_tokens, hidden_input);

        token_count -= 1;

        if(settings.tokenLimit !== null) {
            input_box
                .show()
                .val("")
                .focus();
        }

        // Execute the onDelete callback if defined
        if($.isFunction(callback)) {
            callback.call(hidden_input,token_data);
        }
    }

    // Update the hidden input box value
    function update_hidden_input(saved_tokens, hidden_input) {
        var token_values = $.map(saved_tokens, function (el) {
            return el[settings.tokenValue];
        });
        hidden_input.val(token_values.join(settings.tokenDelimiter));

    }

    // Hide and clear the results dropdown
    function hide_dropdown () {
        dropdown.hide().empty();
        selected_dropdown_item = null;
    }

    function show_dropdown() {
        dropdown
            .css({
                position: "absolute",
                top: $(token_list).offset().top + $(token_list).outerHeight(),
                left: $(token_list).offset().left,
                zindex: 999
            })
            .show();
    }

    function show_dropdown_searching () {
        if(settings.searchingText) {
            dropdown.html("<p>"+settings.searchingText+"</p>");
            show_dropdown();
        }
    }

    function show_dropdown_hint () {
        if(settings.hintText) {
            dropdown.html("<p>"+settings.hintText+"</p>");
            show_dropdown();
        }
    }

    // Highlight the query part of the search term
    function highlight_term(value, term) {
        return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
    }

    function find_value_and_highlight_term(template, value, term) {
        return template.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "g"), highlight_term(value, term));
    }

    // Populate the results dropdown with some results
    function populate_dropdown (query, results) {
        if(results && results.length) {
            dropdown.empty();
            var dropdown_ul = $("<ul>")
                .appendTo(dropdown)
                .mouseover(function (event) {
                    select_dropdown_item($(event.target).closest("li"));
                })
                .mousedown(function (event) {
                    add_token($(event.target).closest("li").data("tokeninput"));
                    hidden_input.change();
                    return false;
                })
                .hide();

            $.each(results, function(index, value) {
                var this_li = settings.resultsFormatter(value);

                this_li = find_value_and_highlight_term(this_li ,value[settings.propertyToSearch], query);

                this_li = $(this_li).appendTo(dropdown_ul);

                if(index % 2) {
                    this_li.addClass(settings.classes.dropdownItem);
                } else {
                    this_li.addClass(settings.classes.dropdownItem2);
                }

                if(index === 0) {
                    select_dropdown_item(this_li);
                }

                $.data(this_li.get(0), "tokeninput", value);
            });

            show_dropdown();

            if(settings.animateDropdown) {
                dropdown_ul.slideDown("fast");
            } else {
                dropdown_ul.show();
            }
        } else {
            if(settings.noResultsText) {
                dropdown.html("<p>"+settings.noResultsText+"</p>");
                show_dropdown();
            }
        }
    }

    // Highlight an item in the results dropdown
    function select_dropdown_item (item) {
        if(item) {
            if(selected_dropdown_item) {
                deselect_dropdown_item($(selected_dropdown_item));
            }

            item.addClass(settings.classes.selectedDropdownItem);
            selected_dropdown_item = item.get(0);
        }
    }

    // Remove highlighting from an item in the results dropdown
    function deselect_dropdown_item (item) {
        item.removeClass(settings.classes.selectedDropdownItem);
        selected_dropdown_item = null;
    }

    // Do a search and show the "searching" dropdown if the input is longer
    // than settings.minChars
    function do_search() {
        var query = input_box.val().toLowerCase();

        if(query && query.length) {
            if(selected_token) {
                deselect_token($(selected_token), POSITION.AFTER);
            }

            if(query.length >= settings.minChars) {
                show_dropdown_searching();
                clearTimeout(timeout);

                timeout = setTimeout(function(){
                    run_search(query);
                }, settings.searchDelay);
            } else {
                hide_dropdown();
            }
        }
    }

    // Do the actual search
    function run_search(query) {
        var cache_key = query + computeURL();
        var cached_results = cache.get(cache_key);
        if(cached_results) {
            populate_dropdown(query, cached_results);
        } else {
            // Are we doing an ajax search or local data search?
            if(settings.url) {
                var url = computeURL();
                // Extract exisiting get params
                var ajax_params = {};
                ajax_params.data = {};
                if(url.indexOf("?") > -1) {
                    var parts = url.split("?");
                    ajax_params.url = parts[0];

                    var param_array = parts[1].split("&");
                    $.each(param_array, function (index, value) {
                        var kv = value.split("=");
                        ajax_params.data[kv[0]] = kv[1];
                    });
                } else {
                    ajax_params.url = url;
                }

                // Prepare the request
                ajax_params.data[settings.queryParam] = query;
                ajax_params.type = settings.method;
                ajax_params.dataType = settings.contentType;
                if(settings.crossDomain) {
                    ajax_params.dataType = "jsonp";
                }

                // Attach the success callback
                ajax_params.success = function(results) {
                  if($.isFunction(settings.onResult)) {
                      results = settings.onResult.call(hidden_input, results);
                  }
                  cache.add(cache_key, settings.jsonContainer ? results[settings.jsonContainer] : results);

                  // only populate the dropdown if the results are associated with the active search query
                  if(input_box.val().toLowerCase() === query) {
                      populate_dropdown(query, settings.jsonContainer ? results[settings.jsonContainer] : results);
                  }
                };

                // Make the request
                $.ajax(ajax_params);
            } else if(settings.local_data) {
                // Do the search through local data
                var results = $.grep(settings.local_data, function (row) {
                    return row[settings.propertyToSearch].toLowerCase().indexOf(query.toLowerCase()) > -1;
                });

                if($.isFunction(settings.onResult)) {
                    results = settings.onResult.call(hidden_input, results);
                }
                cache.add(cache_key, results);
                populate_dropdown(query, results);
            }
        }
    }

    // compute the dynamic URL
    function computeURL() {
        var url = settings.url;
        if(typeof settings.url == 'function') {
            url = settings.url.call();
        }
        return url;
    }
};

// Really basic cache for the results
$.TokenList.Cache = function (options) {
    var settings = $.extend({
        max_size: 500
    }, options);

    var data = {};
    var size = 0;

    var flush = function () {
        data = {};
        size = 0;
    };

    this.add = function (query, results) {
        if(size > settings.max_size) {
            flush();
        }

        if(!data[query]) {
            size += 1;
        }

        data[query] = results;
    };

    this.get = function (query) {
        return data[query];
    };
};
}(jQuery));
(function() {
  $(document).ready(function() {
    var field;
    field = $(".autocomplete_teachers");
    if (field.length > 0) {
      field.autocomplete({
        source: function(request, response) {
          $.ajax({
            url: field.data('url'),
            dataType: "json",
            data: {
              featureClass: "P",
              style: "full",
              maxRows: 20,
              name_startsWith: request.term
            },
            success: function(data) {
              response($.map(data, function(item) {
                return {
                  label: item.teacher.personal_name + " " + item.teacher.family_name + " (" + item.teacher.id + ")",
                  value: item.teacher.id
                };
              }));
            }
          });
        },
        minLength: 2,
        select: function(event, ui) {
          ui.item;
        },
        open: function() {
          $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function() {
          $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
      });
    }
  });

}).call(this);
(function() {
  $(function() {
    return $(".c-select").each(function(_, el) {
      var initValues, options, placeholder, url;
      $(el).after(function() {
        return '<div class="c-select__dropdown"></div>';
      });
      options = {
        theme: "wbs",
        minimumResultsForSearch: -1,
        dropdownParent: $(el).siblings('.c-select__dropdown')
      };
      placeholder = $(el).data('placeholder');
      if (placeholder) {
        options["placeholder"] = placeholder;
      }
      if ($(el).data("allow-clear")) {
        options["allowClear"] = true;
      }
      url = $(el).data("url");
      if (url) {
        options["ajax"] = {
          url: $(el).data("url"),
          dataType: "json",
          delay: 250,
          processResults: function(data, params) {
            return {
              results: data.data.map(function(item) {
                return {
                  id: item.id,
                  text: item.attributes.text
                };
              })
            };
          },
          cache: true
        };
      }
      initValues = $(el).data("init-values");
      if (initValues) {
        options["data"] = initValues;
      }
      return $(el).select2(options);
    });
  });

}).call(this);
(function() {
  $(function() {
    return $('.open-comment').on("click", function(event) {
      event.preventDefault();
      $(this).next(".comment-hide").css("display", "block");
      $(this).next(".comment-hide").find("textarea").focus();
      $(this).remove();
    });
  });

}).call(this);
(function() {
  $(document).ready(function() {
    $(".dont-show-suggestion").on("click", function(event) {
      var checkbox, label, url;
      url = "/admin/dont_show/" + $(this).data("suggestion-id");
      checkbox = $(this);
      label = $(this).next();
      $.ajax({
        type: "post",
        url: url
      }).done(function(data) {
        checkbox.attr("class", "do-show-suggestion");
        label.css("textDecoration", "line-through");
      }).error(function() {
        $(this).prop("checked", false);
        alert("There was a problem. Please try again later.");
      });
    });
    $(".dont-show-important-suggestion").on("click", function(event) {
      var bar, url;
      url = "/admin/dont_show/" + $(this).data("suggestion-id");
      bar = $(this).parent();
      $.ajax({
        type: "post",
        url: url
      }).done(function(data) {
        bar.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
          $(this).hide();
        }).addClass("fadeOutUp");
      }).error(function(data) {});
      event.preventDefault();
    });
    $(".do-show-suggestion").on("click", function(event) {
      var checkbox, label, url;
      url = "/admin/do_show/" + $(this).data("suggestion-id");
      checkbox = $(this);
      label = $(this).next();
      $.ajax({
        type: "post",
        url: url
      }).done(function(data) {
        checkbox.attr("class", "dont-show-suggestion");
        label.css("textDecoration", "none");
      }).error(function() {
        $(this).prop("checked", false);
        alert("There was a problem. Please try again later.");
      });
    });
  });

}).call(this);
(function() {
  $.fn.clearFormErrors = function() {
    return $(this).find(".field-with-errors").removeClass("field-with-errors").find(".help-text").remove();
  };

  $.fn.renderFormErrors = function(modelName, errors) {
    $(this).clearFormErrors();
    return $.each(errors, function(key, value) {
      var field, focus;
      field = $("#" + modelName + "_" + key);
      if (!focus) {
        field.focus();
        focus = true;
      }
      return field.closest(".field").addClass("field-with-errors").append("<span class='help-text error'>" + value[0] + "<span>");
    });
  };

  $(document).ready(function() {
    return $("[data-disable-on-click=true]").on("click", function() {
      return this.disabled = true;
    });
  });

}).call(this);
(function() {
  var autosaveComment, hideEditCommentForm, makeBodyAreaDynamic, showEditCommentForm;

  autosaveComment = function(textarea) {
    var id, location, val;
    if (localStorage) {
      val = $(textarea).val();
      id = $(textarea).attr('id');
      if ($.trim(val) === '') {
        return localStorage.removeItem(id);
      } else {
        location = window.location.pathname + "#" + id;
        return localStorage.setItem(id, JSON.stringify({
          text: val,
          url: location
        }));
      }
    }
  };

  makeBodyAreaDynamic = function(comment) {
    var width;
    width = comment.find('.comment-body p').css('width');
    autosize(comment.find('textarea'));
    if (parseInt(width) > 285) {
      comment.find('textarea').css('width', width);
    }
    comment.find('textarea').css('padding', 3);
    comment.find('textarea').css('overflow-y', 'hidden');
    return comment.find('textarea').css('display', 'block');
  };

  showEditCommentForm = function(comment) {
    var editTextarea;
    if (!localStorage) {
      return;
    }
    editTextarea = comment.find('.comment-edit-form textarea')[0];
    if (editTextarea) {
      makeBodyAreaDynamic(comment);
    }
    comment.find(".comment-edit-form").show();
    if (editTextarea) {
      editTextarea.dispatchEvent(new Event('input'));
    }
    comment.find(".comment-actions").hide();
    return comment.find(".comment-body").hide();
  };

  hideEditCommentForm = function(comment) {
    if (!localStorage) {
      return;
    }
    comment.find(".comment-actions").show();
    comment.find(".comment-edit-form").hide();
    comment.find(".comment-body").show();
    return localStorage.removeItem(comment.find("textarea").attr("id"));
  };

  $('.finalize').on('click', function(e) {
    var comment, lsComment;
    if (!localStorage) {
      return true;
    }
    lsComment = Object.keys(localStorage).find(function(e) {
      return e.startsWith('comment');
    });
    comment = JSON.parse(localStorage.getItem(lsComment));
    if (comment) {
      e.preventDefault();
      return swal({
        title: $(this).data('pending-comments-confirm'),
        type: 'warning',
        buttons: ['Cancel', 'Ok']
      }).then(function() {
        Object.keys(localStorage).map(function(item) {
          if (item.startsWith('comment')) {
            return localStorage.removeItem(item);
          }
        });
        return $(e.target).closest("form").submit();
      }, function() {
        return swal.noop;
      });
    }
  });

  $(".insert-scripture").on("click", function(e) {
    var commentBox;
    e.preventDefault();
    commentBox = $(this).closest(".comment-create-container").find(".js-comment-box");
    commentBox.val(commentBox.val() + $(this).data("reference"));
    return autosaveComment(commentBox);
  });

  $(document).on("click", ".comment-actions .edit", function(e) {
    e.preventDefault();
    return showEditCommentForm($(this).closest(".comment"));
  });

  $(document).on("click", ".comment-edit-form button[type=reset]", function(e) {
    e.preventDefault();
    return hideEditCommentForm($(this).closest(".comment"));
  });

  $(".grade-segment-navigation").on("change", function(event) {
    var url;
    url = $('option:selected', this).data('url');
    if (!url) {
      return;
    }
    return window.location = url;
  });

  $("textarea.autosave-comment").bind("input propertychange", function() {
    return autosaveComment(this);
  });

  $(document).on("ajax:success", ".create-comment", function() {
    var id, textarea;
    textarea = $(this).find('textarea.autosave-comment');
    textarea.val("");
    if (localStorage) {
      id = textarea.attr("id");
      return localStorage.removeItem(id);
    }
  });

  $(document).on("ajax:success", ".edit-comment-form", function() {
    var textarea;
    textarea = $(this).find('textarea.autosave-comment');
    textarea.val('');
    return localStorage.removeItem(textarea.attr("id"));
  });

  $(document).on("ajax:success", ".delete-comment", function() {
    return $(this).closest(".clearfix").remove();
  });

  $(document).ready(function() {
    if (localStorage === null) {
      return;
    }
    return $('textarea.autosave-comment').each(function(_, textarea) {
      var commentHideBtn, val;
      val = localStorage.getItem($(textarea).attr('id'));
      if (val !== null) {
        val = JSON.parse(val);
        $(textarea).html(val.text);
        if ($(textarea).hasClass('js-comment-box')) {
          commentHideBtn = $(textarea).closest(".comment-hide");
          commentHideBtn.css("display", "block");
          commentHideBtn.find("textarea").focus();
          return commentHideBtn.prev(".open-comment").remove();
        } else {
          return showEditCommentForm($(textarea).closest(".comment"));
        }
      }
    });
  });

}).call(this);
(function() {
  $(document).ready(function() {
    var $helpItems;
    $('.js-help-close').on('click', function() {
      if ($('.js-help-box').hasClass('is-active')) {
        $('.js-help-box').removeClass('is-active');
        $('.js-help-open').addClass('is-active');
      }
    });
    $('.js-help-open').on('click', function() {
      if ($('.js-help-open').hasClass('is-active')) {
        $('.js-help-box').addClass('is-active');
        $('.js-help-open').removeClass('is-active');
      }
    });
    $helpItems = $('.help--item');
    return $('.help-side--list').on('click', 'li a', function(e) {
      var helpItem;
      helpItem = $(this).attr('href');
      e.preventDefault();
      $('.help--item').removeClass('is-active');
      $('.help-content--inner').removeClass('is-active');
      $(helpItem).addClass('is-active');
      $(this).parent().addClass('is-active');
    });
  });

}).call(this);
(function() {
  $(document).ready(function() {
    $(".send-to-lists a").click(function(e) {
      var recipients;
      e.preventDefault();
      recipients = $(this).closest(".recipients");
      recipients.hide();
      recipients.find("select.select2").val("").trigger("change");
      return $(this).closest("form").find(".lists").show();
    });
    return $(".send-to-users a").click(function(e) {
      var lists;
      e.preventDefault();
      lists = $(this).closest(".lists");
      lists.hide();
      lists.find("select.select2").val("").trigger("change");
      return $(this).closest("form").find(".recipients").show();
    });
  });

}).call(this);
(function() {
  $(document).on("ajax:success", ".read-message a", function(e, data) {
    var conversation;
    conversation = $(e.target).closest(".conversation");
    return $(e.target).fadeOut(400, function() {
      $(e.target).closest(".read-message").remove();
      if (conversation.find(".read-message")) {
        return conversation.removeClass("unread").addClass("read");
      }
    });
  });

  $(document).ready(function() {
    var os;
    os = new OnScreen({
      tolerance: 0,
      debounce: 100,
      container: window
    });
    return os.on("enter", ".read-message", function(e) {
      return $(e).find("a[data-remote='true']").trigger("click");
    });
  });

}).call(this);
(function() {
  $(document).on("ajax:success", "#new_accounts_credit_card", function(e, response) {
    return $("[data-toggle=modal]").prop("checked", false).trigger("change");
  }).on("ajax:complete", "#new_accounts_credit_card", function(e, status) {
    console.log("complete:" + e);
    return $(e.target).trigger("reset");
  });

}).call(this);
/*!
	Autosize 1.18.13
	license: MIT
	http://www.jacklmoore.com/autosize
*/

(function ($) {
	var
	defaults = {
		className: 'autosizejs',
		id: 'autosizejs',
		append: '\n',
		callback: false,
		resizeDelay: 10,
		placeholder: true
	},

	// border:0 is unnecessary, but avoids a bug in Firefox on OSX
	copy = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',

	// line-height is conditionally included because IE7/IE8/old Opera do not return the correct value.
	typographyStyles = [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'fontStyle',
		'letterSpacing',
		'textTransform',
		'wordSpacing',
		'textIndent',
		'whiteSpace'
	],

	// to keep track which textarea is being mirrored when adjust() is called.
	mirrored,

	// the mirror element, which is used to calculate what size the mirrored element should be.
	mirror = $(copy).data('autosize', true)[0];

	// test that line-height can be accurately copied.
	mirror.style.lineHeight = '99px';
	if ($(mirror).css('lineHeight') === '99px') {
		typographyStyles.push('lineHeight');
	}
	mirror.style.lineHeight = '';

	$.fn.autosize = function (options) {
		if (!this.length) {
			return this;
		}

		options = $.extend({}, defaults, options || {});

		if (mirror.parentNode !== document.body) {
			$(document.body).append(mirror);
		}

		return this.each(function () {
			var
			ta = this,
			$ta = $(ta),
			maxHeight,
			minHeight,
			boxOffset = 0,
			callback = $.isFunction(options.callback),
			originalStyles = {
				height: ta.style.height,
				overflow: ta.style.overflow,
				overflowY: ta.style.overflowY,
				wordWrap: ta.style.wordWrap,
				resize: ta.style.resize
			},
			timeout,
			width = $ta.width(),
			taResize = $ta.css('resize');

			if ($ta.data('autosize')) {
				// exit if autosize has already been applied, or if the textarea is the mirror element.
				return;
			}
			$ta.data('autosize', true);

			if ($ta.css('box-sizing') === 'border-box' || $ta.css('-moz-box-sizing') === 'border-box' || $ta.css('-webkit-box-sizing') === 'border-box'){
				boxOffset = $ta.outerHeight() - $ta.height();
			}

			// IE8 and lower return 'auto', which parses to NaN, if no min-height is set.
			minHeight = Math.max(parseInt($ta.css('minHeight'), 10) - boxOffset || 0, $ta.height());

			$ta.css({
				overflow: 'hidden',
				overflowY: 'hidden',
				wordWrap: 'break-word' // horizontal overflow is hidden, so break-word is necessary for handling words longer than the textarea width
			});

			if (taResize === 'vertical') {
				$ta.css('resize','none');
			} else if (taResize === 'both') {
				$ta.css('resize', 'horizontal');
			}

			// The mirror width must exactly match the textarea width, so using getBoundingClientRect because it doesn't round the sub-pixel value.
			// window.getComputedStyle, getBoundingClientRect returning a width are unsupported, but also unneeded in IE8 and lower.
			function setWidth() {
				var width;
				var style = window.getComputedStyle ? window.getComputedStyle(ta, null) : false;
				
				if (style) {

					width = ta.getBoundingClientRect().width;

					if (width === 0 || typeof width !== 'number') {
						width = parseInt(style.width,10);
					}

					$.each(['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'], function(i,val){
						width -= parseInt(style[val],10);
					});
				} else {
					width = $ta.width();
				}

				mirror.style.width = Math.max(width,0) + 'px';
			}

			function initMirror() {
				var styles = {};

				mirrored = ta;
				mirror.className = options.className;
				mirror.id = options.id;
				maxHeight = parseInt($ta.css('maxHeight'), 10);

				// mirror is a duplicate textarea located off-screen that
				// is automatically updated to contain the same text as the
				// original textarea.  mirror always has a height of 0.
				// This gives a cross-browser supported way getting the actual
				// height of the text, through the scrollTop property.
				$.each(typographyStyles, function(i,val){
					styles[val] = $ta.css(val);
				});
				
				$(mirror).css(styles).attr('wrap', $ta.attr('wrap'));

				setWidth();

				// Chrome-specific fix:
				// When the textarea y-overflow is hidden, Chrome doesn't reflow the text to account for the space
				// made available by removing the scrollbar. This workaround triggers the reflow for Chrome.
				if (window.chrome) {
					var width = ta.style.width;
					ta.style.width = '0px';
					var ignore = ta.offsetWidth;
					ta.style.width = width;
				}
			}

			// Using mainly bare JS in this function because it is going
			// to fire very often while typing, and needs to very efficient.
			function adjust() {
				var height, original;

				if (mirrored !== ta) {
					initMirror();
				} else {
					setWidth();
				}

				if (!ta.value && options.placeholder) {
					// If the textarea is empty, copy the placeholder text into 
					// the mirror control and use that for sizing so that we 
					// don't end up with placeholder getting trimmed.
					mirror.value = ($ta.attr("placeholder") || '');
				} else {
					mirror.value = ta.value;
				}

				mirror.value += options.append || '';
				mirror.style.overflowY = ta.style.overflowY;
				original = parseInt(ta.style.height,10);

				// Setting scrollTop to zero is needed in IE8 and lower for the next step to be accurately applied
				mirror.scrollTop = 0;

				mirror.scrollTop = 9e4;

				// Using scrollTop rather than scrollHeight because scrollHeight is non-standard and includes padding.
				height = mirror.scrollTop;

				if (maxHeight && height > maxHeight) {
					ta.style.overflowY = 'scroll';
					height = maxHeight;
				} else {
					ta.style.overflowY = 'hidden';
					if (height < minHeight) {
						height = minHeight;
					}
				}

				height += boxOffset;

				if (original !== height) {
					ta.style.height = height + 'px';
					if (callback) {
						options.callback.call(ta,ta);
					}
					$ta.trigger('autosize.resized');
				}
			}

			function resize () {
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					var newWidth = $ta.width();

					if (newWidth !== width) {
						width = newWidth;
						adjust();
					}
				}, parseInt(options.resizeDelay,10));
			}

			if ('onpropertychange' in ta) {
				if ('oninput' in ta) {
					// Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
					// so binding to onkeyup to catch most of those occasions.  There is no way that I
					// know of to detect something like 'cut' in IE9.
					$ta.on('input.autosize keyup.autosize', adjust);
				} else {
					// IE7 / IE8
					$ta.on('propertychange.autosize', function(){
						if(event.propertyName === 'value'){
							adjust();
						}
					});
				}
			} else {
				// Modern Browsers
				$ta.on('input.autosize', adjust);
			}

			// Set options.resizeDelay to false if using fixed-width textarea elements.
			// Uses a timeout and width check to reduce the amount of times adjust needs to be called after window resize.

			if (options.resizeDelay !== false) {
				$(window).on('resize.autosize', resize);
			}

			// Event for manual triggering if needed.
			// Should only be needed when the value of the textarea is changed through JavaScript rather than user input.
			$ta.on('autosize.resize', adjust);

			// Event for manual triggering that also forces the styles to update as well.
			// Should only be needed if one of typography styles of the textarea change, and the textarea is already the target of the adjust method.
			$ta.on('autosize.resizeIncludeStyle', function() {
				mirrored = null;
				adjust();
			});

			$ta.on('autosize.destroy', function(){
				mirrored = null;
				clearTimeout(timeout);
				$(window).off('resize', resize);
				$ta
					.off('autosize')
					.off('.autosize')
					.css(originalStyles)
					.removeData('autosize');
			});

			// Call adjust in case the textarea already contains text.
			adjust();
		});
	};
}(jQuery || $)); // jQuery or jQuery-like library, such as Zepto
;
(function() {
  $(function() {
    var $postMessage, convertToSlug, fileInputs;
    $("form#new_post").on("submit", function() {
      return $(this).find('[type="submit"]').attr("disabled", true);
    });
    $postMessage = $('.post-message textarea');
    $postMessage.autosize();
    $('.js-autosize').autosize();
    fileInputs = function() {
      var $button, $fakeFile, $this, $val, newVal, valArray;
      $this = $(this);
      $val = $this.val();
      valArray = $val.split("\\");
      newVal = valArray[valArray.length - 1];
      $button = $this.next();
      $fakeFile = $('.file-holder');
      if (newVal !== "") {
        $button.parent().removeClass('secondary');
        $button.parent().addClass('info');
        if ($fakeFile.length === 0) {
          $fakeFile.text(newVal);
        } else {
          $fakeFile.text(newVal);
        }
      }
    };
    $(".file-upload input[type=file]").bind("change focus click", fileInputs);
    $('.js-campaign-domain-input').keyup(function() {
      var sanitized;
      sanitized = convertToSlug($('.js-campaign-domain-input').val());
      $('.js-campaign-subdomain').html(sanitized);
      $('#campaign_subdomain').val(sanitized);
    });
    convertToSlug = function(Text) {
      return Text.toLowerCase().replace(/[^\w ]+/g, "").replace(RegExp(" +", "g"), "-");
    };
  });

}).call(this);
(function() {
  $(document).ready(function() {
    $(".explanation-hide").click(function() {
      var id;
      $(this).hide();
      id = $(this).parent().attr("id").slice($(this).parent().attr("id").lastIndexOf("_") + 1);
      $("#explanations_" + id + " .explanation-show").show();
      $("#explanations_" + id + " .truncate").toggle();
      $("#explanations_" + id + " .panel").toggle();
    });
    $(".explanation-show").click(function() {
      var id;
      $(this).hide();
      id = $(this).parent().attr("id").slice($(this).parent().attr("id").lastIndexOf("_") + 1);
      $("#explanations_" + id + " .explanation-hide").show();
      $("#explanations_" + id + " .truncate").toggle();
      $("#explanations_" + id + " .panel").toggle();
    });
  });

}).call(this);
/**
* autoNumeric.js
* @author: Bob Knothe
* @author: Sokolov Yura
* @version: 1.9.26 - 2014-10-07 GMT 2:00 PM
*
* Created by Robert J. Knothe on 2010-10-25. Please report any bugs to https://github.com/BobKnothe/autoNumeric
* Created by Sokolov Yura on 2010-11-07
*
* Copyright (c) 2011 Robert J. Knothe http://www.decorplanit.com/plugin/
*
* The MIT License (http://www.opensource.org/licenses/mit-license.php)
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

(function ($) {
    "use strict";
    /*jslint browser: true*/
    /*global jQuery: false*/
    /* Cross browser routine for getting selected range/cursor position
     */
    function getElementSelection(that) {
        var position = {};
        if (that.selectionStart === undefined) {
            that.focus();
            var select = document.selection.createRange();
            position.length = select.text.length;
            select.moveStart('character', -that.value.length);
            position.end = select.text.length;
            position.start = position.end - position.length;
        } else {
            position.start = that.selectionStart;
            position.end = that.selectionEnd;
            position.length = position.end - position.start;
        }
        return position;
    }
    /**
     * Cross browser routine for setting selected range/cursor position
     */
    function setElementSelection(that, start, end) {
        if (that.selectionStart === undefined) {
            that.focus();
            var r = that.createTextRange();
            r.collapse(true);
            r.moveEnd('character', end);
            r.moveStart('character', start);
            r.select();
        } else {
            that.selectionStart = start;
            that.selectionEnd = end;
        }
    }
    /**
     * run callbacks in parameters if any
     * any parameter could be a callback:
     * - a function, which invoked with jQuery element, parameters and this parameter name and returns parameter value
     * - a name of function, attached to $(selector).autoNumeric.functionName(){} - which was called previously
     */
    function runCallbacks($this, settings) {
        /**
         * loops through the settings object (option array) to find the following
         * k = option name example k=aNum
         * val = option value example val=0123456789
         */
        $.each(settings, function (k, val) {
            if (typeof val === 'function') {
                settings[k] = val($this, settings, k);
            } else if (typeof $this.autoNumeric[val] === 'function') {
                /**
                 * calls the attached function from the html5 data example: data-a-sign="functionName"
                 */
                settings[k] = $this.autoNumeric[val]($this, settings, k);
            }
        });
    }
    function convertKeyToNumber(settings, key) {
        if (typeof (settings[key]) === 'string') {
            settings[key] *= 1;
        }
    }
    /**
     * Preparing user defined options for further usage
     * merge them with defaults appropriately
     */
    function autoCode($this, settings) {
        runCallbacks($this, settings);
        settings.oEvent = null;
        settings.tagList = ['b', 'caption', 'cite', 'code', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ins', 'kdb', 'label', 'li', 'output', 'p', 'q', 's', 'sample', 'span', 'strong', 'td', 'th', 'u', 'var'];
        var vmax = settings.vMax.toString().split('.'),
            vmin = (!settings.vMin && settings.vMin !== 0) ? [] : settings.vMin.toString().split('.');
        convertKeyToNumber(settings, 'vMax');
        convertKeyToNumber(settings, 'vMin');
        convertKeyToNumber(settings, 'mDec'); /** set mDec if not defined by user */
        settings.mDec = (settings.mRound === 'CHF') ? '2' : settings.mDec;
        settings.allowLeading = true;
        settings.aNeg = settings.vMin < 0 ? '-' : '';
        vmax[0] = vmax[0].replace('-', '');
        vmin[0] = vmin[0].replace('-', '');
        settings.mInt = Math.max(vmax[0].length, vmin[0].length, 1);
        if (settings.mDec === null) {
            var vmaxLength = 0,
                vminLength = 0;
            if (vmax[1]) {
                vmaxLength = vmax[1].length;
            }
            if (vmin[1]) {
                vminLength = vmin[1].length;
            }
            settings.mDec = Math.max(vmaxLength, vminLength);
        } /** set alternative decimal separator key */
        if (settings.altDec === null && settings.mDec > 0) {
            if (settings.aDec === '.' && settings.aSep !== ',') {
                settings.altDec = ',';
            } else if (settings.aDec === ',' && settings.aSep !== '.') {
                settings.altDec = '.';
            }
        }
        /** cache regexps for autoStrip */
        var aNegReg = settings.aNeg ? '([-\\' + settings.aNeg + ']?)' : '(-?)';
        settings.aNegRegAutoStrip = aNegReg;
        settings.skipFirstAutoStrip = new RegExp(aNegReg + '[^-' + (settings.aNeg ? '\\' + settings.aNeg : '') + '\\' + settings.aDec + '\\d]' + '.*?(\\d|\\' + settings.aDec + '\\d)');
        settings.skipLastAutoStrip = new RegExp('(\\d\\' + settings.aDec + '?)[^\\' + settings.aDec + '\\d]\\D*$');
        var allowed = '-' + settings.aNum + '\\' + settings.aDec;
        settings.allowedAutoStrip = new RegExp('[^' + allowed + ']', 'gi');
        settings.numRegAutoStrip = new RegExp(aNegReg + '(?:\\' + settings.aDec + '?(\\d+\\' + settings.aDec + '\\d+)|(\\d*(?:\\' + settings.aDec + '\\d*)?))');
        return settings;
    }
    /**
     * strip all unwanted characters and leave only a number alert
     */
    function autoStrip(s, settings, strip_zero) {
        if (settings.aSign) { /** remove currency sign */
            while (s.indexOf(settings.aSign) > -1) {
                s = s.replace(settings.aSign, '');
            }
        }
        s = s.replace(settings.skipFirstAutoStrip, '$1$2'); /** first replace anything before digits */
        s = s.replace(settings.skipLastAutoStrip, '$1'); /** then replace anything after digits */
        s = s.replace(settings.allowedAutoStrip, ''); /** then remove any uninterested characters */
        if (settings.altDec) {
            s = s.replace(settings.altDec, settings.aDec);
        } /** get only number string */
        var m = s.match(settings.numRegAutoStrip);
        s = m ? [m[1], m[2], m[3]].join('') : '';
        if ((settings.lZero === 'allow' || settings.lZero === 'keep') && strip_zero !== 'strip') {
            var parts = [],
                nSign = '';
            parts = s.split(settings.aDec);
            if (parts[0].indexOf('-') !== -1) {
                nSign = '-';
                parts[0] = parts[0].replace('-', '');
            }
            if (parts[0].length > settings.mInt && parts[0].charAt(0) === '0') { /** strip leading zero if need */
                parts[0] = parts[0].slice(1);
            }
            s = nSign + parts.join(settings.aDec);
        }
        if ((strip_zero && settings.lZero === 'deny') || (strip_zero && settings.lZero === 'allow' && settings.allowLeading === false)) {
            var strip_reg = '^' + settings.aNegRegAutoStrip + '0*(\\d' + (strip_zero === 'leading' ? ')' : '|$)');
            strip_reg = new RegExp(strip_reg);
            s = s.replace(strip_reg, '$1$2');
        }
        return s;
    }
    /**
     * places or removes brackets on negative values
     */
    function negativeBracket(s, nBracket, oEvent) { /** oEvent = settings.oEvent */
        nBracket = nBracket.split(',');
        if (oEvent === 'set' || oEvent === 'focusout') {
            s = s.replace('-', '');
            s = nBracket[0] + s + nBracket[1];
        } else if ((oEvent === 'get' || oEvent === 'focusin' || oEvent === 'pageLoad') && s.charAt(0) === nBracket[0]) {
            s = s.replace(nBracket[0], '-');
            s = s.replace(nBracket[1], '');
        }
        return s;
    }
    /**
     * truncate decimal part of a number
     */
    function truncateDecimal(s, aDec, mDec) {
        if (aDec && mDec) {
            var parts = s.split(aDec);
            /** truncate decimal part to satisfying length
             * cause we would round it anyway */
            if (parts[1] && parts[1].length > mDec) {
                if (mDec > 0) {
                    parts[1] = parts[1].substring(0, mDec);
                    s = parts.join(aDec);
                } else {
                    s = parts[0];
                }
            }
        }
        return s;
    }
    /**
     * prepare number string to be converted to real number
     */
    function fixNumber(s, aDec, aNeg) {
        if (aDec && aDec !== '.') {
            s = s.replace(aDec, '.');
        }
        if (aNeg && aNeg !== '-') {
            s = s.replace(aNeg, '-');
        }
        if (!s.match(/\d/)) {
            s += '0';
        }
        return s;
    }
    /**
     * function to handle numbers less than 0 that are stored in Exponential notation ex: .0000001 stored as 1e-7
     */
    function checkValue(value, settings) {
        if (value) {
            var checkSmall = +value;
            if (checkSmall < 0.000001 && checkSmall > -1) {
                value = +value;
                if (value < 0.000001 && value > 0) {
                    value = (value + 10).toString();
                    value = value.substring(1);
                }
                if (value < 0 && value > -1) {
                    value = (value - 10).toString();
                    value = '-' + value.substring(2);
                }
                value = value.toString();
            } else {
                var parts = value.split('.');
                if (parts[1] !== undefined) {
                    if (+parts[1] === 0) {
                        value = parts[0];
                    } else {
                        parts[1] = parts[1].replace(/0*$/, '');
                        value = parts.join('.');
                    }
                }
            }
        }
        return (settings.lZero === 'keep') ? value : value.replace(/^0*(\d)/, '$1');
    }
    /**
     * prepare real number to be converted to our format
     */
    function presentNumber(s, aDec, aNeg) {
        if (aNeg && aNeg !== '-') {
            s = s.replace('-', aNeg);
        }
        if (aDec && aDec !== '.') {
            s = s.replace('.', aDec);
        }
        return s;
    }
    /**
     * checking that number satisfy format conditions
     * and lays between settings.vMin and settings.vMax
     * and the string length does not exceed the digits in settings.vMin and settings.vMax
     */
    function autoCheck(s, settings) {
        s = autoStrip(s, settings);
        s = truncateDecimal(s, settings.aDec, settings.mDec);
        s = fixNumber(s, settings.aDec, settings.aNeg);
        var value = +s;
        if (settings.oEvent === 'set' && (value < settings.vMin || value > settings.vMax)) {
            $.error("The value (" + value + ") from the 'set' method falls outside of the vMin / vMax range");
        }
        return value >= settings.vMin && value <= settings.vMax;
    }
    /**
     * private function to check for empty value
     */
    function checkEmpty(iv, settings, signOnEmpty) {
        if (iv === '' || iv === settings.aNeg) {
            if (settings.wEmpty === 'zero') {
                return iv + '0';
            }
            if (settings.wEmpty === 'sign' || signOnEmpty) {
                return iv + settings.aSign;
            }
            return iv;
        }
        return null;
    }
    /**
     * private function that formats our number
     */
    function autoGroup(iv, settings) {
        iv = autoStrip(iv, settings);
        var testNeg = iv.replace(',', '.'),
            empty = checkEmpty(iv, settings, true);
        if (empty !== null) {
            return empty;
        }
        var digitalGroup = '';
        if (settings.dGroup === 2) {
            digitalGroup = /(\d)((\d)(\d{2}?)+)$/;
        } else if (settings.dGroup === 4) {
            digitalGroup = /(\d)((\d{4}?)+)$/;
        } else {
            digitalGroup = /(\d)((\d{3}?)+)$/;
        } /** splits the string at the decimal string */
        var ivSplit = iv.split(settings.aDec);
        if (settings.altDec && ivSplit.length === 1) {
            ivSplit = iv.split(settings.altDec);
        } /** assigns the whole number to the a varibale (s) */
        var s = ivSplit[0];
        if (settings.aSep) {
            while (digitalGroup.test(s)) { /** re-inserts the thousand sepparator via a regualer expression */
                s = s.replace(digitalGroup, '$1' + settings.aSep + '$2');
            }
        }
        if (settings.mDec !== 0 && ivSplit.length > 1) {
            if (ivSplit[1].length > settings.mDec) {
                ivSplit[1] = ivSplit[1].substring(0, settings.mDec);
            } /** joins the whole number with the deciaml value */
            iv = s + settings.aDec + ivSplit[1];
        } else { /** if whole numbers only */
            iv = s;
        }
        if (settings.aSign) {
            var has_aNeg = iv.indexOf(settings.aNeg) !== -1;
            iv = iv.replace(settings.aNeg, '');
            iv = settings.pSign === 'p' ? settings.aSign + iv : iv + settings.aSign;
            if (has_aNeg) {
                iv = settings.aNeg + iv;
            }
        }
        if (settings.oEvent === 'set' && testNeg < 0 && settings.nBracket !== null) { /** removes the negative sign and places brackets */
            iv = negativeBracket(iv, settings.nBracket, settings.oEvent);
        }
        return iv;
    }
    /**
     * round number after setting by pasting or $().autoNumericSet()
     * private function for round the number
     * please note this handled as text - JavaScript math function can return inaccurate values
     * also this offers multiple rounding methods that are not easily accomplished in JavaScript
     */
    function autoRound(iv, settings) { /** value to string */
        iv = (iv === '') ? '0' : iv.toString();
        convertKeyToNumber(settings, 'mDec'); /** set mDec to number needed when mDec set by 'update method */
        if (settings.mRound === 'CHF') {
            iv = (Math.round(iv * 20) / 20).toString();
        }
        var ivRounded = '',
            i = 0,
            nSign = '',
            rDec = (typeof (settings.aPad) === 'boolean' || settings.aPad === null) ? (settings.aPad ? settings.mDec : 0) : +settings.aPad;
        var truncateZeros = function (ivRounded) { /** truncate not needed zeros */
            var regex = (rDec === 0) ? (/(\.(?:\d*[1-9])?)0*$/) : rDec === 1 ? (/(\.\d(?:\d*[1-9])?)0*$/) : new RegExp('(\\.\\d{' + rDec + '}(?:\\d*[1-9])?)0*$');
            ivRounded = ivRounded.replace(regex, '$1'); /** If there are no decimal places, we don't need a decimal point at the end */
            if (rDec === 0) {
                ivRounded = ivRounded.replace(/\.$/, '');
            }
            return ivRounded;
        };
        if (iv.charAt(0) === '-') { /** Checks if the iv (input Value)is a negative value */
            nSign = '-';
            iv = iv.replace('-', ''); /** removes the negative sign will be added back later if required */
        }
        if (!iv.match(/^\d/)) { /** append a zero if first character is not a digit (then it is likely to be a dot)*/
            iv = '0' + iv;
        }
        if (nSign === '-' && +iv === 0) { /** determines if the value is zero - if zero no negative sign */
            nSign = '';
        }
        if ((+iv > 0 && settings.lZero !== 'keep') || (iv.length > 0 && settings.lZero === 'allow')) { /** trims leading zero's if needed */
            iv = iv.replace(/^0*(\d)/, '$1');
        }
        var dPos = iv.lastIndexOf('.'), /** virtual decimal position */
            vdPos = (dPos === -1) ? iv.length - 1 : dPos, /** checks decimal places to determine if rounding is required */
            cDec = (iv.length - 1) - vdPos; /** check if no rounding is required */
        if (cDec <= settings.mDec) {
            ivRounded = iv; /** check if we need to pad with zeros */
            if (cDec < rDec) {
                if (dPos === -1) {
                    ivRounded += '.';
                }
                var zeros = '000000';
                while (cDec < rDec) {
                    zeros = zeros.substring(0, rDec - cDec);
                    ivRounded += zeros;
                    cDec += zeros.length;
                }
            } else if (cDec > rDec) {
                ivRounded = truncateZeros(ivRounded);
            } else if (cDec === 0 && rDec === 0) {
                ivRounded = ivRounded.replace(/\.$/, '');
            }
            if (settings.mRound !== 'CHF') {
                return (+ivRounded === 0) ? ivRounded : nSign + ivRounded;
            }
            if (settings.mRound === 'CHF') {
                dPos = ivRounded.lastIndexOf('.');
                iv = ivRounded;
            }

        } /** rounded length of the string after rounding */
        var rLength = dPos + settings.mDec,
            tRound = +iv.charAt(rLength + 1),
            ivArray = iv.substring(0, rLength + 1).split(''),
            odd = (iv.charAt(rLength) === '.') ? (iv.charAt(rLength - 1) % 2) : (iv.charAt(rLength) % 2),
            onePass = true;
        if (odd !== 1) {
            odd = (odd === 0 && (iv.substring(rLength + 2, iv.length) > 0)) ? 1 : 0;
        }
        if ((tRound > 4 && settings.mRound === 'S') || /** Round half up symmetric */
                (tRound > 4 && settings.mRound === 'A' && nSign === '') || /** Round half up asymmetric positive values */
                (tRound > 5 && settings.mRound === 'A' && nSign === '-') || /** Round half up asymmetric negative values */
                (tRound > 5 && settings.mRound === 's') || /** Round half down symmetric */
                (tRound > 5 && settings.mRound === 'a' && nSign === '') || /** Round half down asymmetric positive values */
                (tRound > 4 && settings.mRound === 'a' && nSign === '-') || /** Round half down asymmetric negative values */
                (tRound > 5 && settings.mRound === 'B') || /** Round half even "Banker's Rounding" */
                (tRound === 5 && settings.mRound === 'B' && odd === 1) || /** Round half even "Banker's Rounding" */
                (tRound > 0 && settings.mRound === 'C' && nSign === '') || /** Round to ceiling toward positive infinite */
                (tRound > 0 && settings.mRound === 'F' && nSign === '-') || /** Round to floor toward negative infinite */
                (tRound > 0 && settings.mRound === 'U') ||
                (settings.mRound === 'CHF')) { /** round up away from zero */
            for (i = (ivArray.length - 1); i >= 0; i -= 1) { /** Round up the last digit if required, and continue until no more 9's are found */
                if (ivArray[i] !== '.') {
                    if (settings.mRound === 'CHF' && ivArray[i] <= 2 && onePass) {
                        ivArray[i] = 0;
                        onePass = false;
                        break;
                    }
                    if (settings.mRound === 'CHF' && ivArray[i] <= 7 && onePass) {
                        ivArray[i] = 5;
                        onePass = false;
                        break;
                    }
                    if (settings.mRound === 'CHF' && onePass) {
                        ivArray[i] = 10;
                        onePass = false;
                    } else {
                        ivArray[i] = +ivArray[i] + 1;
                    }
                    if (ivArray[i] < 10) {
                        break;
                    }
                    if (i > 0) {
                        ivArray[i] = '0';
                    }
                }
            }
        }
        ivArray = ivArray.slice(0, rLength + 1); /** Reconstruct the string, converting any 10's to 0's */
        ivRounded = truncateZeros(ivArray.join('')); /** return rounded value */
        return (+ivRounded === 0) ? ivRounded : nSign + ivRounded;
    }
    /**
     * Holder object for field properties
     */
    function AutoNumericHolder(that, settings) {
        this.settings = settings;
        this.that = that;
        this.$that = $(that);
        this.formatted = false;
        this.settingsClone = autoCode(this.$that, this.settings);
        this.value = that.value;
    }
    AutoNumericHolder.prototype = {
        init: function (e) {
            this.value = this.that.value;
            this.settingsClone = autoCode(this.$that, this.settings);
            this.ctrlKey = e.ctrlKey;
            this.cmdKey = e.metaKey;
            this.shiftKey = e.shiftKey;
            this.selection = getElementSelection(this.that); /** keypress event overwrites meaningful value of e.keyCode */
            if (e.type === 'keydown' || e.type === 'keyup') {
                this.kdCode = e.keyCode;
            }
            this.which = e.which;
            this.processed = false;
            this.formatted = false;
        },
        setSelection: function (start, end, setReal) {
            start = Math.max(start, 0);
            end = Math.min(end, this.that.value.length);
            this.selection = {
                start: start,
                end: end,
                length: end - start
            };
            if (setReal === undefined || setReal) {
                setElementSelection(this.that, start, end);
            }
        },
        setPosition: function (pos, setReal) {
            this.setSelection(pos, pos, setReal);
        },
        getBeforeAfter: function () {
            var value = this.value,
                left = value.substring(0, this.selection.start),
                right = value.substring(this.selection.end, value.length);
            return [left, right];
        },
        getBeforeAfterStriped: function () {
            var parts = this.getBeforeAfter();
            parts[0] = autoStrip(parts[0], this.settingsClone);
            parts[1] = autoStrip(parts[1], this.settingsClone);
            return parts;
        },
        /**
         * strip parts from excess characters and leading zeroes
         */
        normalizeParts: function (left, right) {
            var settingsClone = this.settingsClone;
            right = autoStrip(right, settingsClone); /** if right is not empty and first character is not aDec, */
            /** we could strip all zeros, otherwise only leading */
            var strip = right.match(/^\d/) ? true : 'leading';
            left = autoStrip(left, settingsClone, strip); /** prevents multiple leading zeros from being entered */
            if ((left === '' || left === settingsClone.aNeg) && settingsClone.lZero === 'deny') {
                if (right > '') {
                    right = right.replace(/^0*(\d)/, '$1');
                }
            }
            var new_value = left + right; /** insert zero if has leading dot */
            if (settingsClone.aDec) {
                var m = new_value.match(new RegExp('^' + settingsClone.aNegRegAutoStrip + '\\' + settingsClone.aDec));
                if (m) {
                    left = left.replace(m[1], m[1] + '0');
                    new_value = left + right;
                }
            } /** insert zero if number is empty and io.wEmpty == 'zero' */
            if (settingsClone.wEmpty === 'zero' && (new_value === settingsClone.aNeg || new_value === '')) {
                left += '0';
            }
            return [left, right];
        },
        /**
         * set part of number to value keeping position of cursor
         */
        setValueParts: function (left, right) {
            var settingsClone = this.settingsClone,
                parts = this.normalizeParts(left, right),
                new_value = parts.join(''),
                position = parts[0].length;
            if (autoCheck(new_value, settingsClone)) {
                new_value = truncateDecimal(new_value, settingsClone.aDec, settingsClone.mDec);
                if (position > new_value.length) {
                    position = new_value.length;
                }
                this.value = new_value;
                this.setPosition(position, false);
                return true;
            }
            return false;
        },
        /**
         * helper function for expandSelectionOnSign
         * returns sign position of a formatted value
         */
        signPosition: function () {
            var settingsClone = this.settingsClone,
                aSign = settingsClone.aSign,
                that = this.that;
            if (aSign) {
                var aSignLen = aSign.length;
                if (settingsClone.pSign === 'p') {
                    var hasNeg = settingsClone.aNeg && that.value && that.value.charAt(0) === settingsClone.aNeg;
                    return hasNeg ? [1, aSignLen + 1] : [0, aSignLen];
                }
                var valueLen = that.value.length;
                return [valueLen - aSignLen, valueLen];
            }
            return [1000, -1];
        },
        /**
         * expands selection to cover whole sign
         * prevents partial deletion/copying/overwriting of a sign
         */
        expandSelectionOnSign: function (setReal) {
            var sign_position = this.signPosition(),
                selection = this.selection;
            if (selection.start < sign_position[1] && selection.end > sign_position[0]) { /** if selection catches something except sign and catches only space from sign */
                if ((selection.start < sign_position[0] || selection.end > sign_position[1]) && this.value.substring(Math.max(selection.start, sign_position[0]), Math.min(selection.end, sign_position[1])).match(/^\s*$/)) { /** then select without empty space */
                    if (selection.start < sign_position[0]) {
                        this.setSelection(selection.start, sign_position[0], setReal);
                    } else {
                        this.setSelection(sign_position[1], selection.end, setReal);
                    }
                } else { /** else select with whole sign */
                    this.setSelection(Math.min(selection.start, sign_position[0]), Math.max(selection.end, sign_position[1]), setReal);
                }
            }
        },
        /**
         * try to strip pasted value to digits
         */
        checkPaste: function () {
            if (this.valuePartsBeforePaste !== undefined) {
                var parts = this.getBeforeAfter(),
                    oldParts = this.valuePartsBeforePaste;
                delete this.valuePartsBeforePaste; /** try to strip pasted value first */
                parts[0] = parts[0].substr(0, oldParts[0].length) + autoStrip(parts[0].substr(oldParts[0].length), this.settingsClone);
                if (!this.setValueParts(parts[0], parts[1])) {
                    this.value = oldParts.join('');
                    this.setPosition(oldParts[0].length, false);
                }
            }
        },
        /**
         * process pasting, cursor moving and skipping of not interesting keys
         * if returns true, further processing is not performed
         */
        skipAllways: function (e) {
            var kdCode = this.kdCode,
                which = this.which,
                ctrlKey = this.ctrlKey,
                cmdKey = this.cmdKey,
                shiftKey = this.shiftKey; /** catch the ctrl up on ctrl-v */
            if (((ctrlKey || cmdKey) && e.type === 'keyup' && this.valuePartsBeforePaste !== undefined) || (shiftKey && kdCode === 45)) {
                this.checkPaste();
                return false;
            }
            /** codes are taken from http://www.cambiaresearch.com/c4/702b8cd1-e5b0-42e6-83ac-25f0306e3e25/Javascript-Char-Codes-Key-Codes.aspx
             * skip Fx keys, windows keys, other special keys
             */
            if ((kdCode >= 112 && kdCode <= 123) || (kdCode >= 91 && kdCode <= 93) || (kdCode >= 9 && kdCode <= 31) || (kdCode < 8 && (which === 0 || which === kdCode)) || kdCode === 144 || kdCode === 145 || kdCode === 45) {
                return true;
            }
            if ((ctrlKey || cmdKey) && kdCode === 65) { /** if select all (a=65)*/
                return true;
            }
            if ((ctrlKey || cmdKey) && (kdCode === 67 || kdCode === 86 || kdCode === 88)) { /** if copy (c=67) paste (v=86) or cut (x=88) */
                if (e.type === 'keydown') {
                    this.expandSelectionOnSign();
                }
                if (kdCode === 86 || kdCode === 45) { /** try to prevent wrong paste */
                    if (e.type === 'keydown' || e.type === 'keypress') {
                        if (this.valuePartsBeforePaste === undefined) {
                            this.valuePartsBeforePaste = this.getBeforeAfter();
                        }
                    } else {
                        this.checkPaste();
                    }
                }
                return e.type === 'keydown' || e.type === 'keypress' || kdCode === 67;
            }
            if (ctrlKey || cmdKey) {
                return true;
            }
            if (kdCode === 37 || kdCode === 39) { /** jump over thousand separator */
                var aSep = this.settingsClone.aSep,
                    start = this.selection.start,
                    value = this.that.value;
                if (e.type === 'keydown' && aSep && !this.shiftKey) {
                    if (kdCode === 37 && value.charAt(start - 2) === aSep) {
                        this.setPosition(start - 1);
                    } else if (kdCode === 39 && value.charAt(start + 1) === aSep) {
                        this.setPosition(start + 1);
                    }
                }
                return true;
            }
            if (kdCode >= 34 && kdCode <= 40) {
                return true;
            }
            return false;
        },
        /**
         * process deletion of characters
         * returns true if processing performed
         */
        processAllways: function () {
            var parts; /** process backspace or delete */
            if (this.kdCode === 8 || this.kdCode === 46) {
                if (!this.selection.length) {
                    parts = this.getBeforeAfterStriped();
                    if (this.kdCode === 8) {
                        parts[0] = parts[0].substring(0, parts[0].length - 1);
                    } else {
                        parts[1] = parts[1].substring(1, parts[1].length);
                    }
                    this.setValueParts(parts[0], parts[1]);
                } else {
                    this.expandSelectionOnSign(false);
                    parts = this.getBeforeAfterStriped();
                    this.setValueParts(parts[0], parts[1]);
                }
                return true;
            }
            return false;
        },
        /**
         * process insertion of characters
         * returns true if processing performed
         */
        processKeypress: function () {
            var settingsClone = this.settingsClone,
                cCode = String.fromCharCode(this.which),
                parts = this.getBeforeAfterStriped(),
                left = parts[0],
                right = parts[1]; /** start rules when the decimal character key is pressed */
            /** always use numeric pad dot to insert decimal separator */
            if (cCode === settingsClone.aDec || (settingsClone.altDec && cCode === settingsClone.altDec) || ((cCode === '.' || cCode === ',') && this.kdCode === 110)) { /** do not allow decimal character if no decimal part allowed */
                if (!settingsClone.mDec || !settingsClone.aDec) {
                    return true;
                } /** do not allow decimal character before aNeg character */
                if (settingsClone.aNeg && right.indexOf(settingsClone.aNeg) > -1) {
                    return true;
                } /** do not allow decimal character if other decimal character present */
                if (left.indexOf(settingsClone.aDec) > -1) {
                    return true;
                }
                if (right.indexOf(settingsClone.aDec) > 0) {
                    return true;
                }
                if (right.indexOf(settingsClone.aDec) === 0) {
                    right = right.substr(1);
                }
                this.setValueParts(left + settingsClone.aDec, right);
                return true;
            }
            /**
             * start rule on negative sign & prevent minus if not allowed
             */
            if (cCode === '-' || cCode === '+') {
                if (!settingsClone.aNeg) {
                    return true;
                } /** caret is always after minus */
                if (left === '' && right.indexOf(settingsClone.aNeg) > -1) {
                    left = settingsClone.aNeg;
                    right = right.substring(1, right.length);
                } /** change sign of number, remove part if should */
                if (left.charAt(0) === settingsClone.aNeg) {
                    left = left.substring(1, left.length);
                } else {
                    left = (cCode === '-') ? settingsClone.aNeg + left : left;
                }
                this.setValueParts(left, right);
                return true;
            } /** digits */
            if (cCode >= '0' && cCode <= '9') { /** if try to insert digit before minus */
                if (settingsClone.aNeg && left === '' && right.indexOf(settingsClone.aNeg) > -1) {
                    left = settingsClone.aNeg;
                    right = right.substring(1, right.length);
                }
                if (settingsClone.vMax <= 0 && settingsClone.vMin < settingsClone.vMax && this.value.indexOf(settingsClone.aNeg) === -1 && cCode !== '0') {
                    left = settingsClone.aNeg + left;
                }
                this.setValueParts(left + cCode, right);
                return true;
            } /** prevent any other character */
            return true;
        },
        /**
         * formatting of just processed value with keeping of cursor position
         */
        formatQuick: function () {
            var settingsClone = this.settingsClone,
                parts = this.getBeforeAfterStriped(),
                leftLength = this.value;
            if ((settingsClone.aSep === '' || (settingsClone.aSep !== '' && leftLength.indexOf(settingsClone.aSep) === -1)) && (settingsClone.aSign === '' || (settingsClone.aSign !== '' && leftLength.indexOf(settingsClone.aSign) === -1))) {
                var subParts = [],
                    nSign = '';
                subParts = leftLength.split(settingsClone.aDec);
                if (subParts[0].indexOf('-') > -1) {
                    nSign = '-';
                    subParts[0] = subParts[0].replace('-', '');
                    parts[0] = parts[0].replace('-', '');
                }
                if (subParts[0].length > settingsClone.mInt && parts[0].charAt(0) === '0') { /** strip leading zero if need */
                    parts[0] = parts[0].slice(1);
                }
                parts[0] = nSign + parts[0];
            }
            var value = autoGroup(this.value, this.settingsClone),
                position = value.length;
            if (value) {
                /** prepare regexp which searches for cursor position from unformatted left part */
                var left_ar = parts[0].split(''),
                    i = 0;
                for (i; i < left_ar.length; i += 1) { /** thanks Peter Kovari */
                    if (!left_ar[i].match('\\d')) {
                        left_ar[i] = '\\' + left_ar[i];
                    }
                }
                var leftReg = new RegExp('^.*?' + left_ar.join('.*?'));
                /** search cursor position in formatted value */
                var newLeft = value.match(leftReg);
                if (newLeft) {
                    position = newLeft[0].length;
                    /** if we are just before sign which is in prefix position */
                    if (((position === 0 && value.charAt(0) !== settingsClone.aNeg) || (position === 1 && value.charAt(0) === settingsClone.aNeg)) && settingsClone.aSign && settingsClone.pSign === 'p') {
                        /** place caret after prefix sign */
                        position = this.settingsClone.aSign.length + (value.charAt(0) === '-' ? 1 : 0);
                    }
                } else if (settingsClone.aSign && settingsClone.pSign === 's') {
                    /** if we could not find a place for cursor and have a sign as a suffix */
                    /** place carret before suffix currency sign */
                    position -= settingsClone.aSign.length;
                }
            }
            this.that.value = value;
            this.setPosition(position);
            this.formatted = true;
        }
    };
    /** thanks to Anthony & Evan C */
    function autoGet(obj) {
        if (typeof obj === 'string') {
            obj = obj.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
            obj = '#' + obj.replace(/(:|\.)/g, '\\$1');
            /** obj = '#' + obj.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1'); */
            /** possible modification to replace the above 2 lines */
        }
        return $(obj);
    }

    function getHolder($that, settings, update) {
        var data = $that.data('autoNumeric');
        if (!data) {
            data = {};
            $that.data('autoNumeric', data);
        }
        var holder = data.holder;
        if ((holder === undefined && settings) || update) {
            holder = new AutoNumericHolder($that.get(0), settings);
            data.holder = holder;
        }
        return holder;
    }
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this),
                    settings = $this.data('autoNumeric'), /** attempt to grab 'autoNumeric' settings, if they don't exist returns "undefined". */
                    tagData = $this.data(); /** attempt to grab HTML5 data, if they don't exist we'll get "undefined".*/
                if (typeof settings !== 'object') { /** If we couldn't grab settings, create them from defaults and passed options. */
                    var defaults = {
                        /** allowed numeric values
                         * please do not modify
                         */
                        aNum: '0123456789',
                        /** allowed thousand separator characters
                         * comma = ','
                         * period "full stop" = '.'
                         * apostrophe is escaped = '\''
                         * space = ' '
                         * none = ''
                         * NOTE: do not use numeric characters
                         */
                        aSep: ',',
                        /** digital grouping for the thousand separator used in Format
                         * dGroup: '2', results in 99,99,99,999 common in India for values less than 1 billion and greater than -1 billion
                         * dGroup: '3', results in 999,999,999 default
                         * dGroup: '4', results in 9999,9999,9999 used in some Asian countries
                         */
                        dGroup: '3',
                        /** allowed decimal separator characters
                         * period "full stop" = '.'
                         * comma = ','
                         */
                        aDec: '.',
                        /** allow to declare alternative decimal separator which is automatically replaced by aDec
                         * developed for countries the use a comma ',' as the decimal character
                         * and have keyboards\numeric pads that have a period 'full stop' as the decimal characters (Spain is an example)
                         */
                        altDec: null,
                        /** allowed currency symbol
                         * Must be in quotes aSign: '$', a space is allowed aSign: '$ '
                         */
                        aSign: '',
                        /** placement of currency sign
                         * for prefix pSign: 'p',
                         * for suffix pSign: 's',
                         */
                        pSign: 'p',
                        /** maximum possible value
                         * value must be enclosed in quotes and use the period for the decimal point
                         * value must be larger than vMin
                         */
                        vMax: '9999999999999.99',
                        /** minimum possible value
                         * value must be enclosed in quotes and use the period for the decimal point
                         * value must be smaller than vMax
                         */
                        vMin: '0.00',
                        /** max number of decimal places = used to override decimal places set by the vMin & vMax values
                         * value must be enclosed in quotes example mDec: '3',
                         * This can also set the value via a call back function mDec: 'css:#
                         */
                        mDec: null,
                        /** method used for rounding
                         * mRound: 'S', Round-Half-Up Symmetric (default)
                         * mRound: 'A', Round-Half-Up Asymmetric
                         * mRound: 's', Round-Half-Down Symmetric (lower case s)
                         * mRound: 'a', Round-Half-Down Asymmetric (lower case a)
                         * mRound: 'B', Round-Half-Even "Bankers Rounding"
                         * mRound: 'U', Round Up "Round-Away-From-Zero"
                         * mRound: 'D', Round Down "Round-Toward-Zero" - same as truncate
                         * mRound: 'C', Round to Ceiling "Toward Positive Infinity"
                         * mRound: 'F', Round to Floor "Toward Negative Infinity"
                         */
                        mRound: 'S',
                        /** controls decimal padding
                         * aPad: true - always Pad decimals with zeros
                         * aPad: false - does not pad with zeros.
                         * aPad: `some number` - pad decimals with zero to number different from mDec
                         * thanks to Jonas Johansson for the suggestion
                         */
                        aPad: true,
                        /** places brackets on negative value -$ 999.99 to (999.99)
                         * visible only when the field does NOT have focus the left and right symbols should be enclosed in quotes and seperated by a comma
                         * nBracket: null, nBracket: '(,)', nBracket: '[,]', nBracket: '<,>' or nBracket: '{,}'
                         */
                        nBracket: null,
                        /** Displayed on empty string
                         * wEmpty: 'empty', - input can be blank
                         * wEmpty: 'zero', - displays zero
                         * wEmpty: 'sign', - displays the currency sign
                         */
                        wEmpty: 'empty',
                        /** controls leading zero behavior
                         * lZero: 'allow', - allows leading zeros to be entered. Zeros will be truncated when entering additional digits. On focusout zeros will be deleted.
                         * lZero: 'deny', - allows only one leading zero on values less than one
                         * lZero: 'keep', - allows leading zeros to be entered. on fousout zeros will be retained.
                         */
                        lZero: 'allow',
                        /** determine if the default value will be formatted on page ready.
                         * true = automatically formats the default value on page ready
                         * false = will not format the default value
                         */
                        aForm: true,
                        /** future use */
                        onSomeEvent: function () {}
                    };
                    settings = $.extend({}, defaults, tagData, options); /** Merge defaults, tagData and options */
                    if (settings.aDec === settings.aSep) {
                        $.error("autoNumeric will not function properly when the decimal character aDec: '" + settings.aDec + "' and thousand separator aSep: '" + settings.aSep + "' are the same character");
                        return this;
                    }
                    $this.data('autoNumeric', settings); /** Save our new settings */
                } else {
                    return this;
                }
                settings.runOnce = false;
                var holder = getHolder($this, settings);
                if ($.inArray($this.prop('tagName').toLowerCase(), settings.tagList) === -1 && $this.prop('tagName').toLowerCase() !== 'input') {
                    $.error("The <" + $this.prop('tagName').toLowerCase() + "> is not supported by autoNumeric()");
                    return this;
                }
                if (settings.runOnce === false && settings.aForm) {/** routine to format default value on page load */
                    if ($this.is('input[type=text], input[type=hidden], input[type=tel], input:not([type])')) {
                        var setValue = true;
                        if ($this[0].value === '' && settings.wEmpty === 'empty') {
                            $this[0].value = '';
                            setValue = false;
                        }
                        if ($this[0].value === '' && settings.wEmpty === 'sign') {
                            $this[0].value = settings.aSign;
                            setValue = false;
                        }
                        if (setValue) {
                            $this.autoNumeric('set', $this.val());
                        }
                    }
                    if ($.inArray($this.prop('tagName').toLowerCase(), settings.tagList) !== -1 && $this.text() !== '') {
                        $this.autoNumeric('set', $this.text());
                    }
                }
                settings.runOnce = true;
                if ($this.is('input[type=text], input[type=hidden], input[type=tel], input:not([type])')) { /**added hidden type */
                    $this.on('keydown.autoNumeric', function (e) {
                        holder = getHolder($this);
                        if (holder.settings.aDec === holder.settings.aSep) {
                            $.error("autoNumeric will not function properly when the decimal character aDec: '" + holder.settings.aDec + "' and thousand separator aSep: '" + holder.settings.aSep + "' are the same character");
                            return this;
                        }
                        if (holder.that.readOnly) {
                            holder.processed = true;
                            return true;
                        }
                        /** The below streamed code / comment allows the "enter" keydown to throw a change() event */
                        /** if (e.keyCode === 13 && holder.inVal !== $this.val()){
                            $this.change();
                            holder.inVal = $this.val();
                        }*/
                        holder.init(e);
                        holder.settings.oEvent = 'keydown';
                        if (holder.skipAllways(e)) {
                            holder.processed = true;
                            return true;
                        }
                        if (holder.processAllways()) {
                            holder.processed = true;
                            holder.formatQuick();
                            e.preventDefault();
                            return false;
                        }
                        holder.formatted = false;
                        return true;
                    });
                    $this.on('keypress.autoNumeric', function (e) {
                        var holder = getHolder($this),
                            processed = holder.processed;
                        holder.init(e);
                        holder.settings.oEvent = 'keypress';
                        if (holder.skipAllways(e)) {
                            return true;
                        }
                        if (processed) {
                            e.preventDefault();
                            return false;
                        }
                        if (holder.processAllways() || holder.processKeypress()) {
                            holder.formatQuick();
                            e.preventDefault();
                            return false;
                        }
                        holder.formatted = false;
                    });
                    $this.on('keyup.autoNumeric', function (e) {
                        var holder = getHolder($this);
                        holder.init(e);
                        holder.settings.oEvent = 'keyup';
                        var skip = holder.skipAllways(e);
                        holder.kdCode = 0;
                        delete holder.valuePartsBeforePaste;
                        if ($this[0].value === holder.settings.aSign) { /** added to properly place the caret when only the currency is present */
                            if (holder.settings.pSign === 's') {
                                setElementSelection(this, 0, 0);
                            } else {
                                setElementSelection(this, holder.settings.aSign.length, holder.settings.aSign.length);
                            }
                        }
                        if (skip) {
                            return true;
                        }
                        if (this.value === '') {
                            return true;
                        }
                        if (!holder.formatted) {
                            holder.formatQuick();
                        }
                    });
                    $this.on('focusin.autoNumeric', function () {
                        var holder = getHolder($this);
                        holder.settingsClone.oEvent = 'focusin';
                        if (holder.settingsClone.nBracket !== null) {
                            var checkVal = $this.val();
                            $this.val(negativeBracket(checkVal, holder.settingsClone.nBracket, holder.settingsClone.oEvent));
                        }
                        holder.inVal = $this.val();
                        var onempty = checkEmpty(holder.inVal, holder.settingsClone, true);
                        if (onempty !== null) {
                            $this.val(onempty);
                            if (holder.settings.pSign === 's') {
                                setElementSelection(this, 0, 0);
                            } else {
                                setElementSelection(this, holder.settings.aSign.length, holder.settings.aSign.length);
                            }
                        }
                    });
                    $this.on('focusout.autoNumeric', function () {
                        var holder = getHolder($this),
                            settingsClone = holder.settingsClone,
                            value = $this.val(),
                            origValue = value;
                        holder.settingsClone.oEvent = 'focusout';
                        var strip_zero = ''; /** added to control leading zero */
                        if (settingsClone.lZero === 'allow') { /** added to control leading zero */
                            settingsClone.allowLeading = false;
                            strip_zero = 'leading';
                        }
                        if (value !== '') {
                            value = autoStrip(value, settingsClone, strip_zero);
                            if (checkEmpty(value, settingsClone) === null && autoCheck(value, settingsClone, $this[0])) {
                                value = fixNumber(value, settingsClone.aDec, settingsClone.aNeg);
                                value = autoRound(value, settingsClone);
                                value = presentNumber(value, settingsClone.aDec, settingsClone.aNeg);
                            } else {
                                value = '';
                            }
                        }
                        var groupedValue = checkEmpty(value, settingsClone, false);
                        if (groupedValue === null) {
                            groupedValue = autoGroup(value, settingsClone);
                        }
                        if (groupedValue !== origValue) {
                            $this.val(groupedValue);
                        }
                        if (groupedValue !== holder.inVal) {
                            $this.change();
                            delete holder.inVal;
                        }
                        if (settingsClone.nBracket !== null && $this.autoNumeric('get') < 0) {
                            holder.settingsClone.oEvent = 'focusout';
                            $this.val(negativeBracket($this.val(), settingsClone.nBracket, settingsClone.oEvent));
                        }
                    });
                }
            });
        },
        /** method to remove settings and stop autoNumeric() */
        destroy: function () {
            return $(this).each(function () {
                var $this = $(this);
                $this.off('.autoNumeric');
                $this.removeData('autoNumeric');
            });
        },
        /** method to update settings - can call as many times */
        update: function (options) {
            return $(this).each(function () {
                var $this = autoGet($(this)),
                    settings = $this.data('autoNumeric');
                if (typeof settings !== 'object') {
                    $.error("You must initialize autoNumeric('init', {options}) prior to calling the 'update' method");
                    return this;
                }
                var strip = $this.autoNumeric('get');
                settings = $.extend(settings, options);
                getHolder($this, settings, true);
                if (settings.aDec === settings.aSep) {
                    $.error("autoNumeric will not function properly when the decimal character aDec: '" + settings.aDec + "' and thousand separator aSep: '" + settings.aSep + "' are the same character");
                    return this;
                }
                $this.data('autoNumeric', settings);
                if ($this.val() !== '' || $this.text() !== '') {
                    return $this.autoNumeric('set', strip);
                }
                return;
            });
        },
        /** returns a formatted strings for "input:text" fields Uses jQuery's .val() method*/
        set: function (valueIn) {
            if (valueIn === null) {
                return;
            }
            return $(this).each(function () {
                var $this = autoGet($(this)),
                    settings = $this.data('autoNumeric'),
                    value = valueIn.toString(),
                    testValue = valueIn.toString();
                if (typeof settings !== 'object') {
                    $.error("You must initialize autoNumeric('init', {options}) prior to calling the 'set' method");
                    return this;
                }
                /** routine to handle page re-load from back button */
                if (testValue !== $this.attr('value') && $this.prop('tagName').toLowerCase() === 'input' && settings.runOnce === false) {
                    value = (settings.nBracket !== null) ? negativeBracket($this.val(), settings.nBracket, 'pageLoad') : value;
                    value = autoStrip(value, settings);
                }
               /** allows locale decimal separator to be a comma */
                if ((testValue === $this.attr('value') || testValue === $this.text()) && settings.runOnce === false) {
                    value = value.replace(',', '.');
                }
                /** returns a empty string if the value being 'set' contains non-numeric characters and or more than decimal point (full stop) and will not be formatted */
                if (!$.isNumeric(+value)) {
                    return '';
                }
                value = checkValue(value, settings);
                settings.oEvent = 'set';
                value.toString();
                if (value !== '') {
                    value = autoRound(value, settings);
                }
                value = presentNumber(value, settings.aDec, settings.aNeg);
                if (!autoCheck(value, settings)) {
                    value = autoRound('', settings);
                }
                value = autoGroup(value, settings);
                if ($this.is('input[type=text], input[type=hidden], input[type=tel], input:not([type])')) { /**added hidden type */
                    return $this.val(value);
                }
                if ($.inArray($this.prop('tagName').toLowerCase(), settings.tagList) !== -1) {
                    return $this.text(value);
                }
                $.error("The <" + $this.prop('tagName').toLowerCase() + "> is not supported by autoNumeric()");
                return false;
            });
        },
        /** method to get the unformatted value from a specific input field, returns a numeric value */
        get: function () {
            var $this = autoGet($(this)),
                settings = $this.data('autoNumeric');
            if (typeof settings !== 'object') {
                $.error("You must initialize autoNumeric('init', {options}) prior to calling the 'get' method");
                return this;
            }
            settings.oEvent = 'get';
            var getValue = '';
            /** determine the element type then use .eq(0) selector to grab the value of the first element in selector */
            if ($this.is('input[type=text], input[type=hidden], input[type=tel], input:not([type])')) { /**added hidden type */
                getValue = $this.eq(0).val();
            } else if ($.inArray($this.prop('tagName').toLowerCase(), settings.tagList) !== -1) {
                getValue = $this.eq(0).text();
            } else {
                $.error("The <" + $this.prop('tagName').toLowerCase() + "> is not supported by autoNumeric()");
                return false;
            }
            if ((getValue === '' && settings.wEmpty === 'empty') || (getValue === settings.aSign && (settings.wEmpty === 'sign' || settings.wEmpty === 'empty'))) {
                return '';
            }
            if (settings.nBracket !== null && getValue !== '') {
                getValue = negativeBracket(getValue, settings.nBracket, settings.oEvent);
            }
            if (settings.runOnce || settings.aForm === false) {
                getValue = autoStrip(getValue, settings);
            }
            getValue = fixNumber(getValue, settings.aDec, settings.aNeg);
            if (+getValue === 0 && settings.lZero !== 'keep') {
                getValue = '0';
            }
            if (settings.lZero === 'keep') {
                return getValue;
            }
            getValue = checkValue(getValue, settings);
            return getValue; /** returned Numeric String */
        },
        /** method to get the unformatted value from multiple fields */
        getString: function () {
            var isAutoNumeric = false,
                $this = autoGet($(this)),
                str = $this.serialize(),
                parts = str.split('&'),
                formIndex = $('form').index($this),
                i = 0;
            for (i; i < parts.length; i += 1) {
                var miniParts = parts[i].split('='),
                    $field = $('form:eq(' + formIndex + ') input[name="' + decodeURIComponent(miniParts[0]) + '"]'),
                    settings = $field.data('autoNumeric');
                if (typeof settings === 'object') {
                    if (miniParts[1] !== null) {
                        miniParts[1] = $field.autoNumeric('get');
                        parts[i] = miniParts.join('=');
                        isAutoNumeric = true;
                    }
                }
            }
            if (isAutoNumeric === true) {
                return parts.join('&');
            }
            return str;
        },
        /** method to get the unformatted value from multiple fields */
        getArray: function () {
            var isAutoNumeric = false,
                $this = autoGet($(this)),
                formFields = $this.serializeArray(),
                formIndex = $('form').index($this);
            /*jslint unparam: true*/
            $.each(formFields, function (i, field) {
                var $field = $('form:eq(' + formIndex + ') input[name="' + decodeURIComponent(field.name) + '"]'),
                    settings = $field.data('autoNumeric');
                if (typeof settings === 'object') {
                    if (field.value !== '') {
                        field.value = $field.autoNumeric('get').toString();
                    }
                    isAutoNumeric = true;
                }
            });
            /*jslint unparam: false*/
            if (isAutoNumeric === true) {
                return formFields;
            }
            return this;
        },
        /** returns the settings object for those who need to look under the hood */
        getSettings: function () {
            var $this = autoGet($(this));
            return $this.eq(0).data('autoNumeric');
        }
    };
    $.fn.autoNumeric = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error('Method "' + method + '" is not supported by autoNumeric()');
    };
}(jQuery));
!function(global,factory){"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory():"function"==typeof define&&define.amd?define(factory):global.OnScreen=factory()}(this,function(){"use strict";function attach(){var container=this.options.container;if(container instanceof HTMLElement){var style=window.getComputedStyle(container);"static"===style.position&&(container.style.position="relative")}container.addEventListener("scroll",this._scroll),window.addEventListener("resize",this._scroll),this._scroll(),this.attached=!0}function inViewport(el){var options=arguments.length<=1||void 0===arguments[1]?{tolerance:0}:arguments[1];if(!el)throw new Error("You should specify the element you want to test");"string"==typeof el&&(el=document.querySelector(el));var elRect=el.getBoundingClientRect();return elRect.bottom-options.tolerance>0&&elRect.right-options.tolerance>0&&elRect.left+options.tolerance<(window.innerWidth||document.documentElement.clientWidth)&&elRect.top+options.tolerance<(window.innerHeight||document.documentElement.clientHeight)}function inContainer(el){var options=arguments.length<=1||void 0===arguments[1]?{tolerance:0,container:""}:arguments[1];if(!el)throw new Error("You should specity the element you want to test");if("string"==typeof el&&(el=document.querySelector(el)),"string"==typeof options&&(options={tolerance:0,container:document.querySelector(options)}),"string"==typeof options.container&&(options.container=document.querySelector(options.container)),options instanceof HTMLElement&&(options={tolerance:0,container:options}),!options.container)throw new Error("You should specify a container element");var containerRect=options.container.getBoundingClientRect();return el.offsetTop+el.clientHeight-options.tolerance>options.container.scrollTop&&el.offsetLeft+el.clientWidth-options.tolerance>options.container.scrollLeft&&el.offsetLeft+options.tolerance<containerRect.width+options.container.scrollLeft&&el.offsetTop+options.tolerance<containerRect.height+options.container.scrollTop}function eventHandler(){var trackedElements=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],options=arguments.length<=1||void 0===arguments[1]?{tolerance:0}:arguments[1],selectors=Object.keys(trackedElements),testVisibility=void 0;selectors.length&&(testVisibility=options.container===window?inViewport:inContainer,selectors.forEach(function(selector){trackedElements[selector].nodes.forEach(function(item){testVisibility(item.node,options)?(item.wasVisible=item.isVisible,item.isVisible=!0):(item.wasVisible=item.isVisible,item.isVisible=!1),item.isVisible===!0&&item.wasVisible===!1&&"function"==typeof trackedElements[selector].enter&&trackedElements[selector].enter(item.node),item.isVisible===!1&&item.wasVisible===!0&&"function"==typeof trackedElements[selector].leave&&trackedElements[selector].leave(item.node)})}))}function debouncedScroll(){var _this=this,timeout=void 0;return function(){clearTimeout(timeout),timeout=setTimeout(function(){eventHandler(_this.trackedElements,_this.options)},_this.options.throttle)}}function destroy(){this.options.container.removeEventListener("scroll",this._scroll),window.removeEventListener("resize",this._scroll),this.attached=!1}function off(event,selector){this.trackedElements.hasOwnProperty(selector)&&this.trackedElements[selector][event]&&delete this.trackedElements[selector][event],this.trackedElements[selector].enter||this.trackedElements[selector].leave||delete this.trackedElements[selector]}function on(event,selector,callback){var allowed=["enter","leave"];if(!event)throw new Error("No event given. Choose either enter or leave");if(!selector)throw new Error("No selector to track");if(allowed.indexOf(event)<0)throw new Error(event+" event is not supported");this.trackedElements.hasOwnProperty(selector)||(this.trackedElements[selector]={}),this.trackedElements[selector].nodes=[];for(var i=0;i<document.querySelectorAll(selector).length;i++){var item={isVisible:!1,wasVisible:!1,node:document.querySelectorAll(selector)[i]};this.trackedElements[selector].nodes.push(item)}"function"==typeof callback&&(this.trackedElements[selector][event]=callback)}function observeDOM(obj,callback){var MutationObserver=window.MutationObserver||window.WebKitMutationObserver,eventListenerSupported=window.addEventListener;if(MutationObserver){var obs=new MutationObserver(function(mutations){(mutations[0].addedNodes.length||mutations[0].removedNodes.length)&&callback()});obs.observe(obj,{childList:!0,subtree:!0})}else eventListenerSupported&&(obj.addEventListener("DOMNodeInserted",callback,!1),obj.addEventListener("DOMNodeRemoved",callback,!1))}function OnScreen(){var _this=this,options=arguments.length<=0||void 0===arguments[0]?{tolerance:0,debounce:100,container:window}:arguments[0];this.options={},this.trackedElements={},Object.defineProperties(this.options,{container:{configurable:!1,enumerable:!1,get:function(){var container=void 0;return"string"==typeof options.container?container=document.querySelector(options.container):options.container instanceof HTMLElement&&(container=options.container),container||window},set:function(value){options.container=value}},debounce:{get:function(){return parseInt(options.debounce,10)||100},set:function(value){options.debounce=value}},tolerance:{get:function(){return parseInt(options.tolerance,10)||0},set:function(value){options.tolerance=value}}}),Object.defineProperty(this,"_scroll",{enumerable:!1,configurable:!1,writable:!1,value:this._debouncedScroll.call(this)}),observeDOM(document.querySelector("body"),function(){Object.keys(_this.trackedElements).forEach(function(element){_this.on("enter",element),_this.on("leave",element)})}),this.attach()}return Object.defineProperties(OnScreen.prototype,{_debouncedScroll:{configurable:!1,writable:!1,enumerable:!1,value:debouncedScroll},attach:{configurable:!1,writable:!1,enumerable:!1,value:attach},destroy:{configurable:!1,writable:!1,enumerable:!1,value:destroy},off:{configurable:!1,writable:!1,enumerable:!1,value:off},on:{configurable:!1,writable:!1,enumerable:!1,value:on}}),OnScreen.check=inViewport,OnScreen});
(function() {
  var mark_read;

  mark_read = function(element) {
    return $.ajax({
      type: 'POST',
      url: $(element).children('.unread-mark').data('url')
    }).done(function(data) {
      $(element).removeClass('unread-message');
      $(element).children('.unread-mark').fadeOut(1600, function() {
        return $(this).remove();
      });
      if ($('.unread-message').length === 0 && $('.unread-message').length === 0) {
        return $('.message-status').remove();
      }
    });
  };

  $(document).ready(function() {
    var os;
    $('.js-currency').autoNumeric('init', {
      aSep: ',',
      aDec: '.',
      aSign: '$ '
    });
    os = new OnScreen({
      tolerance: 0,
      debounce: 100,
      container: window
    });
    return os.on('enter', '.unread-message', mark_read);
  });

}).call(this);
(function() {
  $(function() {
    return $("select.select2").each(function(_, el) {
      var initValues, options, placeholder, url;
      options = {};
      placeholder = $(el).data('placeholder');
      if (placeholder) {
        options["placeholder"] = placeholder;
      }
      if ($(el).data("allow-clear")) {
        options["allowClear"] = true;
      }
      url = $(el).data("url");
      if (url) {
        options["ajax"] = {
          url: $(el).data("url"),
          dataType: "json",
          delay: 250,
          processResults: function(data, params) {
            return {
              results: data.data.map(function(item) {
                return {
                  id: item.id,
                  text: item.attributes.text
                };
              })
            };
          },
          cache: true
        };
      }
      initValues = $(el).data("init-values");
      if (initValues) {
        options["data"] = initValues;
      }
      return $(el).select2(options);
    });
  });

}).call(this);
(function() {
  var typeIsArray;

  typeIsArray = Array.isArray || function(value) {
    return {}.toString.call(value) === '[object Array]';
  };

  $.rails.allowAction = function(link) {
    if (link.data("confirm") == null) {
      return true;
    }
    $.rails.showConfirmationDialog(link);
    return false;
  };

  $.rails.confirmed = function(link) {
    link.data("confirm", null);
    return link.trigger("click.rails");
  };

  $.rails.showConfirmationDialog = function(link) {
    var confirm, i, lastStep, len, step, steps, text;
    step = function(text) {
      return {
        text: text,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: link.data("confirm-button-text") || 'OK',
        cancelButtonText: link.data("cancel-button-text") || 'Cancel'
      };
    };
    steps = [];
    confirm = link.data("confirm");
    if (typeIsArray(confirm)) {
      for (i = 0, len = confirm.length; i < len; i++) {
        text = confirm[i];
        steps.push(step(text));
      }
    } else {
      steps.push(step(confirm));
    }
    lastStep = steps[steps.length - 1];
    if (this.isRemote(link)) {
      lastStep.showLoaderOnConfirm = true;
      lastStep.preConfirm = function() {
        return new Promise(function(resolve) {
          $(swal.getCancelButton()).hide();
          return $.rails.handleRemote(link).then(function() {
            return resolve();
          });
        });
      };
    }
    return swal.queue(steps).then(function(result) {
      if (result.dismiss) {
        return;
      }
      swal.resetDefaults();
      if (!$.rails.isRemote(link)) {
        return $.rails.confirmed(link);
      }
    }, function() {
      return swal.noop;
    });
  };

}).call(this);
(function() {
  $(document).ready(function() {
    return $("#understand-instruction").on("click", function(event) {
      var url;
      if ($(this).attr("href")) {
        url = $(this).attr("href");
        $.ajax({
          type: "post",
          url: url
        }).done(function(data) {}).error(function() {});
      }
      event.preventDefault();
    });
  });

}).call(this);
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
