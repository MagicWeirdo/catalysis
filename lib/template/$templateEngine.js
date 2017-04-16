const ejs = require("ejs");

module.exports = {
  scope: "singleton",
  name: "$templateEngine",
  factory: function($config) {
    return {
      /**
       * @public
       * @param {String} str
       * @param {object} options
       * @return {?}
       * @description
       * compile HTML string ready to render data
      **/
      compile: function(str, options) {
        return ejs.compile(str, options);
      },
      /**
       * @public
       * @param {String} str
       * @param {object} data
       * @param {object} options
       * @return {String}
       * @description
       * render HTML string
      **/
      render: function(str, data, options) {
        return ejs.render(str, data, options);
      },
      /**
       * @public
       * @param {String} filename
       * @param {object} data
       * @param {object} options
       * @param {Function} callback
       * @description
       * render the specified file with given data
      **/
      renderFile: function(filename, data, options, callback) {
        ejs.renderFile(filename, data, options, callback);
      }
    };
  }
};
