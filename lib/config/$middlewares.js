const path = require("path");

module.exports = {
  scope: "singleton",
  name: "$middlewares",
  factory: function($injector) {
    return {
      _middlewares: [],
      /**
       * @public
       * @param {Function} middleware
       * @description
       * use the middleware
      **/
      uses: function(middleware) {
        this._middlewares.push(middleware);
      },
      /**
       * @public
       * @param {http.IncomingMessage} req
       * @param {http.ServerResponse} res
       * @description
       * process by all middlewares
      **/
      process: function(req, res) {
        this._middlewares.forEach(function(middleware) {
          $injector.inject(middleware)(req, res);
        });
      }
    };
  }
};
