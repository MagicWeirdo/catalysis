const url = require("url");

module.exports = {
  scope: "singleton",
  name: "$urlDispatcher",
  factory: function($config, $actions, $statics) {
    return {
      /**
       * @public
       * @param {http.IncomingMessage} req
       * @param {http.ServerResponse} res
       * @return {Function|null}
      **/
      dispatch: function(req, res) {
        var method = req.method;
        var parsedUrl = url.parse(req.url, true);

        // dispatch to action
        for(var i = 0;i < $actions.length;i++) {
          let action = $actions[i];

          if(action.method === method && action.matcher.match(parsedUrl.pathname)) {
            // add queryParams attribute to request object
            req.queryParams = parsedUrl.query;

            // check if it has path parameters
            if(action.matcher.hasPathParams()) {
              // add pathParams attribute to request object
              req.pathParams = action.matcher.getPathParams();
            }

            return action.callback;
          }
        }

        // get pathname
        var pathname = parsedUrl.pathname;

        // dispatch to statics
        if("GET" === method && pathname.startsWith($config.static_root)) {
          return $statics.getHandler(pathname);
        }

        return null;
      }
    };
  }
};
