const path = require("path");

module.exports = {
  _basePath: $config.basePath,
  _options: $config.middlewares,
  /**
   * @private
   * @return {Array}
   * @desc
   * loading all middlewares
  **/
  loadAll: function() {
    const self = this;

    const middlewares = [];

    self._options.forEach(option => {
      middlewares.push(self._getCallback(option));

      $logger.log('LOADING MIDDLEWARE - %s', option);
    });

    return middlewares;
  },
  /**
   * @private
   * @param {String} option
   * @return {Function}
   * @desc
   * get the callback of the middleware
  **/
  _getCallback: function(option) {
    return require(path.join(this._basePath, 'api/middlewares', option + '.js'));
  }
};
