const path = require("path");

module.exports = {
  scope: "singleton",
  name: "$socketIO",
  factory: function($config, $injector) {
    return {
      /**
       * @public
       * @param {http.Server}
       * @desc
       * boostrap WebSocket with the given HTTP server
      **/
      bootstrap: function(httpServer) {
        this._io = require("socket.io")(httpServer);

        // boostrap with definition
        var callback = require(path.join($config.basePath, "api/websocket/websocket.js"));
        $injector.inject(callback)(this._io);
      }
    };
  }
};
