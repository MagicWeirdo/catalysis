const fs = require("fs");

module.exports = {
  _caches: {},
  /**
   * @public
   * @param {String} alias
   * @return {Boolean}
   * @description
   * check if the file is cached or not
  **/
  isCached: function(alias) {
    return this._caches[alias] !== undefined;
  },
  /**
   * @public
   * @param {String} alias
   * @param {String} filePath
   * @param {Function} callback
   * @description
   * new a cache or replace origin cache to store the specified file
  **/
  newBuffer: function(alias, filePath, callback) {
    var self = this;

    // check if the file exists or not
    if(fs.existsSync(filePath)) {
      fs.readFile(filePath, function(err, data) {
        if(err) {
          $logger.error(err.message);
        }

        // cache the file
        self._caches[alias] = {
          buffer: data,
          size: Buffer.byteLength(data, "utf8")
        };

        callback(self._caches[alias]);
      });
    }else {
      $logger.error("file: " + filePath + " does not exist");
    }
  },
  /**
   * @public
   * @param {String} alias
   * @param {String} filePath
   * @description
   * new a cache or replace origin cache to store the specified file
  **/
  newBufferSync: function(alias, filePath) {
    // check if the file exists or not
    if(fs.existsSync(filePath)) {
      var buffer = fs.readFileSync(filePath);

      // cache
      this._caches[alias] = {
        buffer: buffer,
        size: Buffer.byteLength(buffer, "utf8")
      };
    }else {
      $logger.error("file: " + filePath + " does not exist");
    }
  },
  /**
   * @public
   * @param {String} alias
   * @return {Buffer}
   * @description
   * get the buffer from cache
  **/
  getBuffer(alias) {
    return this._caches[alias];
  }
};
