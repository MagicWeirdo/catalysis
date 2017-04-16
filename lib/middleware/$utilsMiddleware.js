/**
 * @description
 * add response utilities
**/
module.exports = function(req, res) {
  /**
   * @description
   * request syntax error
  **/
  res.send400 = function() {
    res.statusCode = 400;
    res.end();
  };

  /**
   * @description
   * forbidden
  **/
  res.send403 = function() {
    res.statusCode = 403;
    res.end();
  };

  /**
   * @description
   * resource not found
  **/
  res.send404 = function() {
    res.statusCode = 404;
    res.end();
  };

  /**
   * @description
   * server internal error
  **/
  res.send500 = function() {
    res.statusCode = 500;
    res.end();
  };

  /**
   * @description
   * Service unavailable
  **/
  res.send503 = function() {
    res.statusCode = 503;
    res.end();
  };

  /**
   * @description
   * redirect
  **/
  res.redirect = function(location) {
    res.writeHead(302, {
      "Location": location
    });
    
    res.end();
  };
};
