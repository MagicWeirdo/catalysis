const mime = require("mime");

module.exports = {
  /**
   * @public
   * @param {String} path
   * @return {String}
   * @description
   * get the mime-type associated with the file
  **/
  lookup: function(path) {
    return mime.lookup(path);
  },
  /**
   * @public
   * @param {String} type
   * @return {String}
   * @description
   * get the extension for the type
  **/
  extension: function(type) {
    return mime.extension(type);
  },
  /**
   * @public
   * @param {object} options
   * @description
   * add custom mime/extension mappings
  **/
  define: function(options) {
    mime.define(options);
  }
};
