const path = require("path");

module.exports = {
  /**
   * @public
   * @param {http.Server} httpServer
   * @desc
   * boostrap WebSocket with the given HTTP server
  **/
  boot: function(httpServer) {
    this._io = require("socket.io")(httpServer);

    // boostrap with definition
    var callback = require(path.join($config.basePath, "api/websocket/websocket.js"));
    callback();

    $logger.log('WEBSOCKET IS ENABLED');
  }
};
