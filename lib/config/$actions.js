const path = require("path");

module.exports = {
  _cache: {},
  _basePath: $config.basePath,
  _options: $config.actions,
  /**
   * @public
   * @return {Array}
   * @desc
   * loading all actions
  **/
  loadAll: function() {
    const self = this;

    const actions = [];
    self._options.forEach(option => {
      actions.push({
        method: option.method,
        path: option.path,
        callback: self._getCallback(option.action)
      });

      $logger.log('LOADING ACTION - %s %s', option.method, option.path);
    });

    return actions;
  },
  /**
   * @private
   * @param {String} option
   * @return {Function}
   * @desc
   * get callback
  **/
  _getCallback: function(option) {
    const re = new RegExp(/(.+)\.(.+)/);
    const result = re.exec(option);

    if(result === null) {
      $logger.error('invalid action %s defined in config/setting.js', action);
    }

    const controller = result[1];
    const action = result[2];

    if(this._cache[controller] === undefined) {
      const directory = path.join(this._basePath, 'api/controllers', controller + '.js');
      this._cache[controller] = require(directory);
    }

    return this._cache[controller][action];
  }
};
