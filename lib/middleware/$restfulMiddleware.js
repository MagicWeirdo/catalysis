/**
 * @description
 * add json facilities to request and response object
**/
module.exports = function(req, res) {
  req.readAsJson = function(callback) {
    var arr = [];
    req.on("data", function(chunk) {
      arr.push(chunk);
    });

    req.on("end", function() {
      var data = Buffer.concat(arr).toString();

      try {
        var jsonData = JSON.parse(data);
        callback(jsonData);
      }catch(err) {
        res.send400();
      }
    });
  };

  res.sendAsJson = function(statusCode, data) {
    var jsonData = JSON.stringify(data);

    res.writeHead(statusCode, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(jsonData, "utf8")
    });

    res.end(jsonData);
  };
};
