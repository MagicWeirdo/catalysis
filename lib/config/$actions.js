const path = require("path");

module.exports = {
  scope: "singleton",
  name: "$actions",
  factory: function($config, $pathToRegexp, $logger) {
    // action loader to load actions
    var actionLoader = {
      _cache: {},
      /**
       * @public
       * @param {String} basePath
       * @param {object} options
       * @description
       * setup the configuration
      **/
      config: function(basePath, options) {
        this._basePath = basePath;
        this._options = options;
      },
      /**
       * @public
       * @return {Array}
       * @description
       * load all actions
      **/
      loadAll: function() {
        var self = this;
        var options = this._options;

        // load actions
        var actions = [];
        options.forEach(function(option) {
          // compile to regular expression
          let keys = [];
          let re = $pathToRegexp.exec(option.url, keys);

          // only get the names
          keys = keys.map(function(key) {
            return key.name;
          });

          actions.push({
            method: option.method,
            matcher: {
              _pattern: re,
              _keys: keys,
              _values: [],
              /**
               * @public
               * @param {String} url
               * @return {Boolean}
               * @description
               * match the url against the action
              **/
              match: function(url) {
                var regex = new RegExp(this._pattern);
                var result = regex.exec(url);

                if(result !== null) {
                  // reset
                  this._values = [];
                  for(var i = 1;i < result.length;i++) {
                    this._values.push(result[i]);
                  }

                  return true;
                }else {
                  return false;
                }
              },
              /**
               * @public
               * @return {Boolean}
               * @description
               * check if it has path variables or not
              **/
              hasPathParams: function() {
                return this._keys.length > 0;
              },
              /**
               * @public
               * @return {object}
               * @description
               * get the path params
              **/
              getPathParams: function() {
                var params = {};
                for(var i = 0;i < this._keys.length;i++) {
                  // TODO: bug
                  params[this._keys[i]] = this._values[i];
                }

                return params;
              }
            },
            callback: self._getCallback(option.action)
          });
        });

        // load file serve as action


        return actions;
      },
      /**
       * @private
       * @param {String} action
       * @return {Function}
       * @description
       * load callback of the given action
      **/
      _getCallback: function(action) {
        var re = new RegExp(/(.+)\.(.+)/);
        var result = re.exec(action);

        // if not match
        if(result === null) {
          $logger.error("invalid action " + action + " defined in config/setting.js");
        }

        var controller = result[1];
        var action = result[2];

        if(this._cache[controller] === undefined) {
          var des = path.join(this._basePath, "api/controllers", controller + ".js");
          this._cache[controller] = require(des);
        }

        return this._cache[controller][action];
      }
    };

    // load & return actions
    actionLoader.config($config.basePath, $config.actions);
    return actionLoader.loadAll();
  }
};
