const http = require("http");

module.exports = {
  scope: "singleton",
  name: "$server",
  factory: function($config, $orm, $requestHandler, $socketIO, $logger) {
    return {
      run: function() {
        var self = this;

        // if database is configured
        if($config.database) {
          // initialize $orm
          $orm.initialize(function() {
            self._bootstrap();
          });
        }else {
          self._bootstrap();
        }
      },
      _bootstrap: function() {
        // bootstrap server
        var hostname = $config.hostname;
        var port = $config.port;

        this._server = http.createServer(function(req, res) {
          $requestHandler.handle(req, res);
        });

        // check if WebSocket is enabled
        if($config.enable_websocket) {
          $socketIO.bootstrap(this._server);
        }

        this._server.listen(port, hostname, function() {
          $logger.log("Server running at http://%s:%s/", hostname, port);
        });
      }
    };
  }
};
