const multiparty = require("multiparty");
const path = require("path");

/**
 * @description
 * add multipart form data reading feature
**/
module.exports = function($config, $logger, req, res) {
  req.readAsMultipart = function(callback) {
    var form = new multiparty.Form({uploadDir: path.join($config.basePath, "files")});

    form.parse(req, function(err, fields, files) {
      if(err) {
        $logger.log(err.message);
      }else {
        callback(fields, files);
      }
    });
  };
};
