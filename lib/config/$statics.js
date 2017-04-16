const fs = require("fs");
const path = require("path");
const url = require("url");

module.exports = {
  scope: "singleton",
  name: "$statics",
  factory: function($config, $mime, $cache, $logger) {
    return {
      _directory: path.join($config.basePath, "static"),
      _staticRoot: $config.static_root,
      /**
       * @public
       * @param {String} pathname
       * @return {Function}
       * @description
       * get the handler that handles the static file request
      **/
      getHandler: function(pathname) {
        var self = this;
        return function(req, res) {
          var relativePath = pathname.substring(self._staticRoot.length);
          var filePath = path.join(self._directory, relativePath);

          // check the existense of the file
          if(fs.existsSync(filePath)) {
            // if debug mode is on
            if($config.debug) {
              try {
                let stats = fs.statSync(filePath);

                res.writeHead(200, {
                  "Content-Type": $mime.lookup(relativePath),
                  "Content-Length": stats.size
                });

                let readStream = fs.createReadStream(filePath);
                readStream.pipe(res);
              }catch(err) {
                // if error occurs
                throw err;
              }
            }else {
              // if debug mode is off
              if($cache.isCached(relativePath) === false) {
                $cache.newBufferSync(relativePath, filePath);
              }

              let cache = $cache.getBuffer(relativePath);

              res.writeHead(200, {
                "Content-Type": $mime.lookup(relativePath),
                "Content-Length": cache.size
              });

              res.end(cache.buffer);
            }
          }else {
            // if file does not exist
            res.send404();
          }
        };
      }
    };
  }
};
