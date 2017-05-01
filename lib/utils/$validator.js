const enforce = require("enforce");

module.exports = {
  _checks: new enforce.Enforce(),
  /**
   * @public
   * @param {String} key
   * @param {String} msg
   * @description
   * checks if a property is not null and not undefined
  **/
  required: function(key, msg) {
    this._checks.add(key, enforce.required(msg));
  },
  /**
   * @public
   * @param {String} key
   * @param {String} msg
   * @description
   * checks if a property length is not zero
  **/
  notEmptyString: function(key, msg) {
    this._checks.add(key, enforce.notEmptyString(msg));
  },
  /**
   * @public
   * @param {String} key
   * @param {String} property
   * @param {String} msg
   * @description
   * checks if a property has the same (strict) value as another one
  **/
  sameAs: function(key, property, msg) {
    this._checks.add(key, enforce.sameAs(property, msgs));
  },
  /**
   * @public
   * @return {object}
   * @description
   * returns lists validation objct
  **/
  lists: function() {
    var self = this;
    return {
      /**
       * @public
       * @param {String} key
       * @param {Array} list
       * @param {String} msg
       * @description
       * checks if a property is inside a list of items
      **/
      inside: function(key, list, msg) {
        self._checks.add(key, enforce.lists.inside(list, msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {Array} list
       * @param {String} msg
       * @description
       * checks if the property is not inside the a list of items
      **/
      outside: function(key, list, msg) {
        self._checks.add(key, enforce.lists.outside(list, msg));
      }
    };
  },
  /**
   * @public
   * @return {object}
   * @description
   * returns ranges validation object
  **/
  ranges: function() {
    var self = this;
    return {
      /**
       * @public
       * @param {String} key
       * @param {Number} min
       * @param {Number} max
       * @param {String} msg
       * @description
       * checks if a value is inside a specific range of numbers
      **/
      number: function(key, min, max, msg) {
        self._checks.add(key, enforce.ranges.number(min, max, msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {Integer} min
       * @param {Integer} max
       * @param {String} msg
       * @description
       * does the same as the above but for the length property
      **/
      length: function(key, min, max, msg) {
        self._checks.add(key, enforce.ranges.length(min, max, msg));
      }
    };
  },
  /**
   * @public
   * @return {object}
   * @description
   * returns security validation object
  **/
  security: function() {
    var self = this;
    return {
      /**
       * @public
       * @param {String} key
       * @param {object} opts
       * @param {String} msg
       * @description
       * checks if a value matches a username format
      **/
      username: function(key, opts, msg) {
        self._checks.add(key, enforce.security.username(opts, msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {String} checks
       * @param {String} msg
       * @description
       * checks if a value has some types of characters and minimal length
      **/
      password: function(key, checks, msg) {
        self._checks.add(key, enforce.security.password(checks, msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {Array|String} types
       * @param {String} msg
       * @description
       * checks if a value is a valid credit card number
      **/
      creditcard: function(key, types, msg) {
        self._checks.add(key, enforce.security.creditcard(types, msg));
      }
    };
  },
  /**
   * @public
   * @return {object}
   * @description
   * returns patterns validation object
  **/
  patterns: function() {
    var self = this;
    return {
      /**
       * @public
       * @param {String} key
       * @param {Regex} pattern
       * @param {String} modifiers
       * @param {String} msg
       * @description
       * checks if property passes a specific regular expression
      **/
      match: function(key, pattern, modifiers, msg) {
        self._checks.add(key, enforce.patterns.match(pattern, modifiers, msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {String} msg
       * @description
       * checks if a property matches insensitive hexademical characters
      **/
      hexString: function(key, msg) {
        self._checks.add(key, enforce.patterns.hexString(msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {String} msg
       * @description
       * checks if a property matches valid e-mail addresses
      **/
      email: function(key, msg) {
        self._checks.add(key, enforce.patterns.email(msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {String} msg
       * @description
       * checks if a property matches valid IPv4 address
      **/
      ipv4: function(key, msg) {
        self._checks.add(key, enforce.patterns.ipv4(msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {String} msg
       * @description
       * checks if a property matches valid IPv6 address
      **/
      ipv6: function(key, msg) {
        self._checks.add(key, enforce.patterns.ipv6(msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {String} msg
       * @description
       * checks if a property matches valid MAC address
      **/
      mac: function(key, msg) {
        self._checks.add(key, enforce.patterns.mac(msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {String} msg
       * @description
       * checks if a property matches valid UUID version 3
      **/
      uuid3: function(key, msg) {
        self._checks.add(key, enforce.patterns.uuid3(msg));
      },
      /**
       * @public
       * @param {String} key
       * @param {String} msg
       * @description
       * checks if a property matches valid UUID version 4
      **/
      uuid4: function(key, msg) {
        self._checks.add(key, enforce.patterns.uuid4(msg));
      }
    };
  },
  /**
   * @public
   * @param {object} obj
   * @param {Function} callback
   * @description
   * check the given object
  **/
  validate: function(obj, callback) {
    this._checks.check(obj, callback);
  }
};
