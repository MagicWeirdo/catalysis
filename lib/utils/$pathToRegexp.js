const pathToRegexp = require("path-to-regexp");

module.exports = {
  scope: "singleton",
  name: "$pathToRegexp",
  factory: function() {
    return {
      /**
       * @public
       * @param {String} path
       * @param {Array} keys
       * @param {object} options
       * @return {RegExp}
       * @description
       *
      **/
      exec: function(path, keys, options) {
        return pathToRegexp(path, keys, options);
      },
      /**
       * @public
       * @param {String} path
       * @return {RegExp}
       * @description
       *
      **/
      parse: function(path) {
        return pathToRegexp.parse(path);
      },
      /**
       * @public
       * @param {String} path
       * @return {RegExp}
       * @description
       *
      **/
      compile: function(path) {
        return pathToRegexp.compile(path);
      }
    };
  }
};
