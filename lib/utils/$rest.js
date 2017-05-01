const http = require("http");

module.exports = {
  /**
   * @private
   * @param {http.ServerResponse} res
   * @param {Function} callback
   * @desc
   * tranform response in to json
  **/
  _transformResponse: function(res, callback) {
    var arr = [];
    res.on("data", function(chunk) {
      arr.push(chunk);
    });

    res.on("end", function() {
      var data = Buffer.concat(arr).toString();

      var jsonData = JSON.parse(data);

      callback({
        data: jsonData,
        status: res.statusCode,
        headers: res.headers,
        statusMessage: res.statusMessage
      });
    });
  },
  /**
   * @public
   * @param {Object} config
   * @return {Promise}
   * @desc
   * perform RESTful GET request
  **/
  get: function(config) {
    var self = this;
    return {
      then: function(callback) {
        // set method
        config.method = "GET";

        // create a request
        var req = http.request(config, function(res) {
          self._transformResponse(res, callback);
        });

        // send
        req.end();
      }
    };
  },
  /**
   * @public
   * @param {Object} config
   * @return {Promise}
   * @desc
   * perform RESTful DELETE request
  **/
  delete: function(config) {
    var self = this;
    return {
      then: function(callback) {
        // set method
        config.method = "DELETE";

        // create a request
        var req = http.request(config, function(res) {
          self._transformResponse(res, callback);
        });

        // send
        req.end();
      }
    };
  },
  /**
   * @public
   * @param {Object} config
   * @param {Object} data
   * @return {Promise}
   * @desc
   * perform RESTful POST request
  **/
  post: function(config, data) {
    var self = this;
    return {
      then: function(callback) {
        // set method
        config.method = "POST";

        // tranform object to json string
        var jsonData = JSON.stringify(data);

        // add extra headers
        config.headers = {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(jsonData, "utf8")
        };

        // create a request
        var req = http.request(config, function(res) {
          self._transformResponse(res, callback);
        });

        // send data
        req.end(jsonData);
      }
    }
  },
  /**
   * @public
   * @param {Object} config
   * @param {Object} data
   * @return {Promise}
   * @desc
   * perform RESTful PUT request
  **/
  put: function(config, data) {
    var self = this;
    return {
      then: function(callback) {
        // set method
        config.method = "PUT";

        // tranform object to json string
        var jsonData = JSON.stringify(data);

        // add extra headers
        config.headers = {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(jsonData, "utf8")
        };

        // create a request
        var req = http.request(config, function(res) {
          self._transformResponse(res, callback);
        });

        // send data
        req.end(jsonData);
      }
    };
  },
  /**
   * @public
   * @param {Object} config
   * @param {Object} data
   * @return {Promise}
   * @desc
   * perform RESTful PATCH request
  **/
  patch: function(config, data) {
    var self = this;
    return {
      then: function(callback) {
        // set method
        config.method = "PATCH";

        // tranform object to json string
        var jsonData = JSON.stringify(data);

        // add extra headers
        config.headers = {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(jsonData, "utf8")
        };

        // create a request
        var req = http.request(config, function(res) {
          self._transformResponse(res, callback);
        });

        // send data
        req.end(jsonData);
      }
    };
  }
};
