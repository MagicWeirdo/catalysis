const express = require('express');
const path = require('path');

module.exports = {
  boot: function() {
    const app = express();

    const actions = $actions.loadAll();
    actions.forEach(action => {
      switch(action.method) {
        case 'DELETE':
          app.delete(action.path, action.callback);
          break;
        case 'GET':
          app.get(action.path, action.callback);
          break;
        case 'POST':
          app.post(action.path, action.callback);
          break;
        case 'PUT':
          app.put(action.path, action.callback);
          break;
        default:
          $logger.error('ACTION %s %s NOT SUPPORTED', action.method, action.path);
      }
    });

    const middlewares = $middlewares.loadAll();
    middlewares.forEach(middleware => {
      app.use(middleware);
    });

    app.use($config.static_root, express.static(path.join($config.basePath, 'static')));

    if($config.enable_websocket) {
      const server = require('http').createServer(app);
      $socketIO.boot(server);
    }

    if($config.database) {
      $orm.boot(() => {
        const { hostname, port } = $config;
        app.listen(port, hostname, () => {
          $logger.log('SERVER RUNNING AT http://%s:%s/', hostname, port);
        });
      });
    }else {
      const { hostname, port } = $config;
      app.listen(port, hostname, () => {
        $logger.log('SERVER RUNNING AT http://%s:%s/', hostname, port);
      });
    }
  }
};
