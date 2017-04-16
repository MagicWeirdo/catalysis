const path = require("path");
const fs = require("fs");

/**
 * @description
 * add render function to response
**/
module.exports = function($config, $mime, $cache, $templateEngine, $logger, req, res) {
  res.render = function(view, data) {
    // check if debug is enabled
    if($config.debug === true) {
      let filePath = path.join($config.basePath, "view", view);
      if(fs.existsSync(filePath)) {
        let arr = [];
        fs.readFile(filePath, "utf8", function(err, str) {
          if(err) {
            $logger.error(err.message);
          }

          // render
          let renderedHtml = $templateEngine.render(str, data);

          // send to client
          res.writeHead(200, {
            "Content-Type": $mime.lookup(view),
            "Content-Length": Buffer.byteLength(renderedHtml, "utf8")
          });

          res.end(renderedHtml);
        });
      }else {
        $logger.error("view " + view + " does not exist");
      }
    }else {
      // if the view is not cached
      if($cache.isCached(view) === false) {
        // cache the view
        let filePath = path.join($config.basePath, "view", view);
        if(fs.existsSync(filePath)) {
          $cache.newBufferSync(view, filePath);
        }else {
          $logger.error("view: " + view + " does not exist");
        }
      }

      let str = $cache.getBuffer(view).buffer.toString();
      let renderedHtml = $templateEngine.render(str, data);

      // send to client
      res.writeHead(200, {
        "Content-Type": $mime.lookup(view),
        "Content-Length": Buffer.byteLength(renderedHtml, "utf8")
      });

      res.end(renderedHtml);
    }
  };
};
